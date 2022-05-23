<template>
  <div>
    <model-header
      :isHidden="isHidden"
      :close="toggleHidden"
      :headers="headers"
      :toggleRunning="toggleRunning"
      :isRunning="isRunning"
    />
    <div v-if="!isHidden" class="grid grid-cols-3 min-h-screen">
      <div class="col-span-2 grid items-center">
        <div>
          <div class="flex flex-col justify-center items-center mb-20">
            <h1 class="mx-auto font-extrabold text-4xl">Playground</h1>
            <h1 class="mx-auto mt-2 font-semibold text-lg text-grey">
              Test the structure of your neural network
            </h1>
          </div>
          <div>
            <model-build
              v-if="!isLoading"
              :num_hidden="num_hidden"
              :layers="layers"
              :mappings="mappings"
              :width="width"
              :height="height"
              :isRunning="isRunning"
              :epochs="headers[1].value"
              :toggleRunning="toggleRunning"
              :training="training"
            />
            <div
              v-if="isLoading"
              class="flex flex-col justify-center items-center"
            >
             <div class="loader">Loading...</div>
            </div>
          </div>
        </div>
      </div>
      <model-sidebar
        @restart="updateParams"
        :batch="headers[0].value"
        :epoch="headers[1].value"
        :lrate="headers[2].value"
        :loss="headers[3].value"
        :numRecords="dataset.rows.length"
        :isRunning="isRunning"
        :graph="[accuracy, loss]"
        :final="final"
      />
    </div>
    <div v-if="isHidden" class="grid items-center min-h-screen">
      <div class="flex flex-col justify-center items-center mt-20 mb-20">
        <h1 class="mx-auto font-extrabold text-4xl">Playground</h1>
        <h1 class="mx-auto mt-2 font-medium text-lg text-grey">
          Test the structure of your neural network
        </h1>
      </div>
      <div>
        <model-build
          v-if="!isLoading"
          :num_hidden="num_hidden"
          :layers="layers"
          :mappings="mappings"
          :width="width"
          :height="height"
          :isRunning="isRunning"
          :epochs="headers[1].value"
          :toggleRunning="toggleRunning"
          :training="training"
        />
        <div v-if="isLoading" class="flex flex-col justify-center items-center">
          <div class="loader">Loading...</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RMHeader from "@/components/elements/RMHeader.vue";
import RMSidebar from "@/components/elements/RMSidebar.vue";
import RModel from "@/components/elements/RModel.vue";
import * as d3 from "d3";

export default {
  components: {
    "model-header": RMHeader,
    "model-sidebar": RMSidebar,
    "model-build": RModel,
  },
  data() {
    return {
      isRunning: false,
      isLoading: true,
      problem: "regression",
      width: 900,
      height: 500,
      num_hidden: 1,
      activation: [],
      layers: [],
      mappings: [],
      isHidden: true,
      headers: [
        { header: "Batch Size", value: 1 },
        { header: "Epoch No.", value: 10 },
        { header: "Learning Rate", value: 0.01 },
        { header: "Loss Function", value: "MSE" },
        { header: "Problem Type", value: "Classification" },
      ],
      evaluation: {},
      training: {},
    };
  },
  computed: {
    dataset() {
      return JSON.parse(localStorage.getItem("final-dataset"));
    },
    final(){
      return [
        { title: "Overall Model Accuracy", value: String(this.evaluation.acc.toFixed(5) * 100) + "%" },
        { title: "Overall Model Loss", value: String(this.evaluation.loss.toFixed(5) * 100) + "%" }
      ]
    },
    accuracy() {
      const eps = this.training.epochs;
      const acc = this.training.acc_hist;
      var data = [];

      for(var i=0; i < eps.length; i++){
        data.push({
          epoch: eps[i],
          acc: acc[i] * 100
        })
      }
      return {
        data: data,
        title: "Accuracy Progression",
      };
    },
    loss() {

      const eps = this.training.epochs;
      const loss =  this.training.loss_hist;
      var data = [];

      for(var i=0; i < eps.length; i++){
        data.push({
          epoch: eps[i],
          loss: loss[i] * 100
        })
      }
      return {
        data: data,
        title: "Loss Progression",
      };

    },
  },
  methods: {
    createmapping() {
      const id = (d) => d.id;
      let newmappings = [];
      const l_scale = d3
        .scaleBand()
        .domain(this.layers.map(id))
        .range([0, this.width]);

      var y = d3.scaleLinear().rangeRound([0, this.height / 5]);

      for (let layer = 0; layer < this.layers.length - 1; layer++) {
        const sourcelayer = this.layers[layer];
        const targetlayer = this.layers[layer + 1];

        sourcelayer.nodes.forEach((sourcenode) => {
          targetlayer.nodes.forEach((targetnode) => {
            newmappings = [
              ...newmappings,
              {
                sourceid: sourcenode.id,
                sourcelayer: sourcenode.layer,
                sourcex: l_scale(sourcenode.layer) + 68,
                sourcey: y(sourcenode.id) + 50,
                targetid: targetnode.id,
                targetlayer: targetnode.layer,
                targetx: l_scale(targetnode.layer) + 30,
                targety: y(targetnode.id) + 50,
              },
            ];
          });
        });
      }
      this.mappings = newmappings;
    },
    deleteNodeMapping(sourcelayer, sourceid) {
      let removed;
      for (let mapping = 0; mapping < this.mappings.length; mapping++) {
        if (
          this.mappings[mapping].sourcelayer == sourcelayer &&
          this.mappings[mapping].sourceid == sourceid
        ) {
          removed = this.mappings.splice(mapping, 1);
        } else {
          if (
            this.mappings[mapping].targetlayer == sourcelayer &&
            this.mappings[mapping].targetid == sourceid
          ) {
            removed = this.mappings.splice(mapping, 1);
          }
        }
      }
    },
    deleteLayerMapping(sourcelayer) {
      let removed;
      for (let mapping = 0; mapping < this.mappings.length; mapping++) {
        if (this.mappings[mapping].sourcelayer == sourcelayer) {
          removed = this.mappings.splice(mapping, 1);
        } else {
          if (this.mappings[mapping].targetlayer == sourcelayer) {
            removed = this.mappings.splice(mapping, 1);
          }
        }
      }
    },
    toggleHidden() {
      this.isHidden = !this.isHidden;
    },
    toggleRunning() {
      this.isRunning = !this.isRunning;
    },
    updateParams(data) {
      for (var obj in data) {
        this.headers = this.headers.map((d) => {
          if (d.header == data[obj].title) {
            return { header: d.header, value: data[obj].value };
          } else {
            return d;
          }
        });
      }
      this.updateModel();
      this.isRunning = false;
    },
    async updateModel() {
      const dataSnap = JSON.parse(localStorage.getItem("data-snap"));
      this.isLoading = true;

      this.problem = dataSnap.problem;
      this.layers = dataSnap.layers;
      this.activation = dataSnap.activation;
      this.num_hidden = dataSnap.num_hidden;

      const dataset = this.dataset;
      const train = Number(localStorage.getItem("train"));
      const hlayer = this.layers
        .filter((d) => d.name.includes("hidden"))
        .map((d) => Number(d.nodes.length));
      const act = this.activation.map((d) => d.toLowerCase());

      localStorage.setItem(
        "data-snap",
        JSON.stringify({
          num_hidden: this.num_hidden,
          layers: this.layers,
          problem: this.problem,
          activation: this.activation,
        })
      );

      this.$http
        .post(
          `${process.env.VUE_APP_API_URL}/model/run`,
          {
            data: dataset,
            layers: hlayer ,
            activations: act,
            lr: this.headers[2].value,
            batch_size: this.headers[0].value,
            epochs: this.headers[1].value,
            prob: this.problem,
            train: train,
          }
        ).then((response) => {
          const newData = response.data;
          this.evaluation = newData.evaluation;
          this.training = newData.training;
          this.isLoading = !this.isLoading;
        });

    },
  },
  created() {
    const dataSnap = JSON.parse(localStorage.getItem("data-snap"));

    this.num_hidden = this.$route.params.hidden || dataSnap.num_hidden;
    this.layers = this.$route.params.struct
      ? JSON.parse(this.$route.params.struct)
      : JSON.parse(localStorage.getItem("layer-struct"));
    this.activation = this.$route.params.activation || dataSnap.activation;
    this.problem = this.$route.params.name || this.dataset.name;
    this.headers = this.headers.map((d) => {
      if (d.header == "Problem Type") {
        return {
          header: d.header,
          value: this.$route.params.problem || this.dataset.analysisType,
        };
      } else {
        return d;
      }
    });

    localStorage.setItem(
      "data-snap",
      JSON.stringify({
        num_hidden: this.num_hidden,
        layers: this.layers,
        problem: this.problem,
        activation: this.activation,
      })
    );

    this.createmapping();
  },
  mounted() {
    this.updateModel();
  },
};
</script>
<style scoped>
.loader {
  margin: 100px auto;
  font-size: 25px;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  position: relative;
  text-indent: -9999em;
  -webkit-animation: load5 1.1s infinite ease;
  animation: load5 1.1s infinite ease;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}
@-webkit-keyframes load5 {
  0%,
  100% {
    box-shadow: 0em -2.6em 0em 0em #04adff,
      1.8em -1.8em 0 0em rgba(4, 173, 255, 0.2),
      2.5em 0em 0 0em rgba(4, 173, 255, 0.2),
      1.75em 1.75em 0 0em rgba(4, 173, 255, 0.2),
      0em 2.5em 0 0em rgba(4, 173, 255, 0.2),
      -1.8em 1.8em 0 0em rgba(4, 173, 255, 0.2),
      -2.6em 0em 0 0em rgba(4, 173, 255, 0.5),
      -1.8em -1.8em 0 0em rgba(4, 173, 255, 0.7);
  }
  12.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(4, 173, 255, 0.7),
      1.8em -1.8em 0 0em #04adff, 2.5em 0em 0 0em rgba(4, 173, 255, 0.2),
      1.75em 1.75em 0 0em rgba(4, 173, 255, 0.2),
      0em 2.5em 0 0em rgba(4, 173, 255, 0.2),
      -1.8em 1.8em 0 0em rgba(4, 173, 255, 0.2),
      -2.6em 0em 0 0em rgba(4, 173, 255, 0.2),
      -1.8em -1.8em 0 0em rgba(4, 173, 255, 0.5);
  }
  25% {
    box-shadow: 0em -2.6em 0em 0em rgba(4, 173, 255, 0.5),
      1.8em -1.8em 0 0em rgba(4, 173, 255, 0.7), 2.5em 0em 0 0em #04adff,
      1.75em 1.75em 0 0em rgba(4, 173, 255, 0.2),
      0em 2.5em 0 0em rgba(4, 173, 255, 0.2),
      -1.8em 1.8em 0 0em rgba(4, 173, 255, 0.2),
      -2.6em 0em 0 0em rgba(4, 173, 255, 0.2),
      -1.8em -1.8em 0 0em rgba(4, 173, 255, 0.2);
  }
  37.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(4, 173, 255, 0.2),
      1.8em -1.8em 0 0em rgba(4, 173, 255, 0.5),
      2.5em 0em 0 0em rgba(4, 173, 255, 0.7), 1.75em 1.75em 0 0em #04adff,
      0em 2.5em 0 0em rgba(4, 173, 255, 0.2),
      -1.8em 1.8em 0 0em rgba(4, 173, 255, 0.2),
      -2.6em 0em 0 0em rgba(4, 173, 255, 0.2),
      -1.8em -1.8em 0 0em rgba(4, 173, 255, 0.2);
  }
  50% {
    box-shadow: 0em -2.6em 0em 0em rgba(4, 173, 255, 0.2),
      1.8em -1.8em 0 0em rgba(4, 173, 255, 0.2),
      2.5em 0em 0 0em rgba(4, 173, 255, 0.5),
      1.75em 1.75em 0 0em rgba(4, 173, 255, 0.7), 0em 2.5em 0 0em #04adff,
      -1.8em 1.8em 0 0em rgba(4, 173, 255, 0.2),
      -2.6em 0em 0 0em rgba(4, 173, 255, 0.2),
      -1.8em -1.8em 0 0em rgba(4, 173, 255, 0.2);
  }
  62.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(4, 173, 255, 0.2),
      1.8em -1.8em 0 0em rgba(4, 173, 255, 0.2),
      2.5em 0em 0 0em rgba(4, 173, 255, 0.2),
      1.75em 1.75em 0 0em rgba(4, 173, 255, 0.5),
      0em 2.5em 0 0em rgba(4, 173, 255, 0.7), -1.8em 1.8em 0 0em #04adff,
      -2.6em 0em 0 0em rgba(4, 173, 255, 0.2),
      -1.8em -1.8em 0 0em rgba(4, 173, 255, 0.2);
  }
  75% {
    box-shadow: 0em -2.6em 0em 0em rgba(4, 173, 255, 0.2),
      1.8em -1.8em 0 0em rgba(4, 173, 255, 0.2),
      2.5em 0em 0 0em rgba(4, 173, 255, 0.2),
      1.75em 1.75em 0 0em rgba(4, 173, 255, 0.2),
      0em 2.5em 0 0em rgba(4, 173, 255, 0.5),
      -1.8em 1.8em 0 0em rgba(4, 173, 255, 0.7), -2.6em 0em 0 0em #04adff,
      -1.8em -1.8em 0 0em rgba(4, 173, 255, 0.2);
  }
  87.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(4, 173, 255, 0.2),
      1.8em -1.8em 0 0em rgba(4, 173, 255, 0.2),
      2.5em 0em 0 0em rgba(4, 173, 255, 0.2),
      1.75em 1.75em 0 0em rgba(4, 173, 255, 0.2),
      0em 2.5em 0 0em rgba(4, 173, 255, 0.2),
      -1.8em 1.8em 0 0em rgba(4, 173, 255, 0.5),
      -2.6em 0em 0 0em rgba(4, 173, 255, 0.7), -1.8em -1.8em 0 0em #04adff;
  }
}
@keyframes load5 {
  0%,
  100% {
    box-shadow: 0em -2.6em 0em 0em #04adff,
      1.8em -1.8em 0 0em rgba(4, 173, 255, 0.2),
      2.5em 0em 0 0em rgba(4, 173, 255, 0.2),
      1.75em 1.75em 0 0em rgba(4, 173, 255, 0.2),
      0em 2.5em 0 0em rgba(4, 173, 255, 0.2),
      -1.8em 1.8em 0 0em rgba(4, 173, 255, 0.2),
      -2.6em 0em 0 0em rgba(4, 173, 255, 0.5),
      -1.8em -1.8em 0 0em rgba(4, 173, 255, 0.7);
  }
  12.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(4, 173, 255, 0.7),
      1.8em -1.8em 0 0em #04adff, 2.5em 0em 0 0em rgba(4, 173, 255, 0.2),
      1.75em 1.75em 0 0em rgba(4, 173, 255, 0.2),
      0em 2.5em 0 0em rgba(4, 173, 255, 0.2),
      -1.8em 1.8em 0 0em rgba(4, 173, 255, 0.2),
      -2.6em 0em 0 0em rgba(4, 173, 255, 0.2),
      -1.8em -1.8em 0 0em rgba(4, 173, 255, 0.5);
  }
  25% {
    box-shadow: 0em -2.6em 0em 0em rgba(4, 173, 255, 0.5),
      1.8em -1.8em 0 0em rgba(4, 173, 255, 0.7), 2.5em 0em 0 0em #04adff,
      1.75em 1.75em 0 0em rgba(4, 173, 255, 0.2),
      0em 2.5em 0 0em rgba(4, 173, 255, 0.2),
      -1.8em 1.8em 0 0em rgba(4, 173, 255, 0.2),
      -2.6em 0em 0 0em rgba(4, 173, 255, 0.2),
      -1.8em -1.8em 0 0em rgba(4, 173, 255, 0.2);
  }
  37.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(4, 173, 255, 0.2),
      1.8em -1.8em 0 0em rgba(4, 173, 255, 0.5),
      2.5em 0em 0 0em rgba(4, 173, 255, 0.7), 1.75em 1.75em 0 0em #04adff,
      0em 2.5em 0 0em rgba(4, 173, 255, 0.2),
      -1.8em 1.8em 0 0em rgba(4, 173, 255, 0.2),
      -2.6em 0em 0 0em rgba(4, 173, 255, 0.2),
      -1.8em -1.8em 0 0em rgba(4, 173, 255, 0.2);
  }
  50% {
    box-shadow: 0em -2.6em 0em 0em rgba(4, 173, 255, 0.2),
      1.8em -1.8em 0 0em rgba(4, 173, 255, 0.2),
      2.5em 0em 0 0em rgba(4, 173, 255, 0.5),
      1.75em 1.75em 0 0em rgba(4, 173, 255, 0.7), 0em 2.5em 0 0em #04adff,
      -1.8em 1.8em 0 0em rgba(4, 173, 255, 0.2),
      -2.6em 0em 0 0em rgba(4, 173, 255, 0.2),
      -1.8em -1.8em 0 0em rgba(4, 173, 255, 0.2);
  }
  62.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(4, 173, 255, 0.2),
      1.8em -1.8em 0 0em rgba(4, 173, 255, 0.2),
      2.5em 0em 0 0em rgba(4, 173, 255, 0.2),
      1.75em 1.75em 0 0em rgba(4, 173, 255, 0.5),
      0em 2.5em 0 0em rgba(4, 173, 255, 0.7), -1.8em 1.8em 0 0em #04adff,
      -2.6em 0em 0 0em rgba(4, 173, 255, 0.2),
      -1.8em -1.8em 0 0em rgba(4, 173, 255, 0.2);
  }
  75% {
    box-shadow: 0em -2.6em 0em 0em rgba(4, 173, 255, 0.2),
      1.8em -1.8em 0 0em rgba(4, 173, 255, 0.2),
      2.5em 0em 0 0em rgba(4, 173, 255, 0.2),
      1.75em 1.75em 0 0em rgba(4, 173, 255, 0.2),
      0em 2.5em 0 0em rgba(4, 173, 255, 0.5),
      -1.8em 1.8em 0 0em rgba(4, 173, 255, 0.7), -2.6em 0em 0 0em #04adff,
      -1.8em -1.8em 0 0em rgba(4, 173, 255, 0.2);
  }
  87.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(4, 173, 255, 0.2),
      1.8em -1.8em 0 0em rgba(4, 173, 255, 0.2),
      2.5em 0em 0 0em rgba(4, 173, 255, 0.2),
      1.75em 1.75em 0 0em rgba(4, 173, 255, 0.2),
      0em 2.5em 0 0em rgba(4, 173, 255, 0.2),
      -1.8em 1.8em 0 0em rgba(4, 173, 255, 0.5),
      -2.6em 0em 0 0em rgba(4, 173, 255, 0.7), -1.8em -1.8em 0 0em #04adff;
  }
}
</style>

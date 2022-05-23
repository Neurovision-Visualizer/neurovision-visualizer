<template>
  <aside>
    <div
      class="bg-primary_light py-8 px-10 w-full h-full flex flex-col justify-between"
      id="v-step-0"
    >
      <div class="mb-8">
        <div class="mb-10">
          <tabbed-menu :selected="selected" :changeSelected="changeSelected" />
        </div>
        <div>
          <div v-if="selected == 1">
            <sidebar-input
              v-for="(header, i) in headers"
              :key="i"
              :type="header.type"
              :title="header.title"
              :value="header.value"
              :options="header.options"
              :change="header.change"
              :id="'v-step-' + (i + 1)"
              :index="i"
              :functionName="header.method"
              :variation="true"
            />
          </div>
          <div v-if="selected == 2">
            <sidebar-input
              v-for="(item, i) in final"
              :key="i"
              type="input-nd"
              :title="item.title"
              :value="item.value"
            />
            <graph
              v-for="(values, i) in graphs"
              :key="i"
              :values="values"
              :width="420"
              :height="220"
              :isRunning="isRunning"
              :index="i"
              :epochs="epoch"
            />
          </div>
        </div>
      </div>
      <div class="flex flex-col justify-center">
        <div class="flex justify-center m-0 mb-4">
          <button
            @click="update"
            className="w-3/5 bg-primary text-white font-bold py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-2"
            type="button"
            id="v-step-6"
          >
            Restart Simulation
          </button>
        </div>
      </div>
    </div>
    <v-tour
      name="myTour"
      :steps="steps"
      :options="myOptions"
      class="text-xl"
    ></v-tour>
    <modal
      :topic="title"
      :message="message"
      v-show="isModalVisible"
      @close="toggleModal"
    />
  </aside>
</template>

<script>
import InfograpicModal from "@/components/elements/Infographic.vue";
import SidebarInput from "@/components/elements/SidebarInput.vue";
import TabbedMenu from "@/components/elements/TabbedMenu.vue";
import Graph from "@/components/elements/Graph.vue";
import { dangerNotification } from "@/controllers/toasts/toasts.js";
import { modelTour } from "@/controllers/tour/animationCustomization.js";


export default {
  props: ["batch", "epoch", "lrate", "loss", "numRecords", 'graph', 'isRunning', "final"],
  components: {
    "sidebar-input": SidebarInput,
    "tabbed-menu": TabbedMenu,
    "modal": InfograpicModal,
    "graph": Graph,
},
  data() {
    return {
      title: "",
      message: "",
      isModalVisible: false,
      batch_size: 1,
      epochs: 100,
      l_rate: 0.01,
      loss_f: "MSE",
      steps: modelTour,
      selected: 1,
      graphs: [],
      isTourVisible: localStorage.getItem("isTourVisible") === "true",
      myOptions: {
        useKeyboardNavigation: false,
        labels: {
          buttonSkip: "Skip Tour",
          buttonPrevious: "Previous Step",
          buttonNext: "Next Step",
          buttonStop: "Finish",
        },
      },
      headers: [
        {
          title: "Batch Size",
          type: "input-n",
          value: "",
          options: [],
          change: this.changeParam,
          method: this.showMessage
        },
        {
          title: "Epochs",
          type: "input-n",
          value: "",
          options: [],
          change: this.changeParam,
          method: this.showMessage
        },
        {
          title: "Learning Rate",
          type: "input-n",
          value: "",
          options: [],
          change: this.changeParam,
          method: this.showMessage
        },
        {
          title: "Loss Function",
          type: "input-d",
          value: "Mean Squared Error (MSE)",
          options: [],
          change: "",
          method: this.showMessage
        },
        {
          title: "Optimization Algorithm",
          type: "input-d",
          value: "Stochastic Gradient Descent",
          options: [],
          change: "",
          method: this.showMessage
        },
      ],
    };
  },
  created() {
    this.batch_size = this.batch || 1;
    this.epochs = this.epoch || 100;
    this.l_rate = this.lrate || 0.01;
    this.loss_f = this.loss || "MSE";
    this.graphs = this.graph;
  },
  mounted: function () {
    if (this.isTourVisible) {
      this.showTour();
    }
  },
  updated(){
    this.batch_size = this.batch;
    this.epochs = this.epoch;
    this.l_rate = this.lrate;
    this.graphs = this.graph;
  },
  methods: {
    showTour() {
      this.$tours["myTour"].start();
    },
    toggleModal() {
      this.isModalVisible = !this.isModalVisible;
    },
    showMessage(index) {
      switch(index){
        case 0:
          this.title = "Batch Size";
          this.message = `The term batch size refers to as the number of training examples used in a single iteration. 
          It controls the number of training samples that are worked through before updating the internal parameters of the model.`;
        break;
        case 1:
          this.title = "Epochs";
          this.message = `Epochs refers to the number of passes a machine learning algorithm has finished in an entire training dataset.`;
        break;
        case 2:
          this.title = "Learning Rate";
          this.message = `The learning rate of a neural network is the rate that controls the amount of 
     change to the model in response to the estimated error each time the model weights are updated.`;
        break;
        case 3:
          this.title = "Loss Function";
          this.message = `A Loss Function is the method by which a specific algorithm is observed to 
    measure how well it models the given data. The loss function typically measures how far an estimated 
    value is from its true value in order to gradually reduce the error in predictions.`;
        break;
        case 4:
          this.title = "Optimization Algorithm";
          this.message = `An optimization algorithm is a process that compares numerous solutions iteratively 
     until an ideal solution is identified. It is referred to as a  collection of mathematical techniques used 
     for machine learning to discover the best possible option given the limitations.`;
        break;
      }
      this.toggleModal();
    },
    changeSelected(option) {
      this.selected = option;
    },
    changeParam(data) {
      switch (data.index) {
        case 0:
          this.batch_size = data.value;
          break;
        case 1:
          this.epochs = data.value;
          break;
        case 2:
          this.l_rate = data.value;
          break;
      }
    },
    changeLoss(data) {
      switch (data.value) {
        case "mse":
          this.loss_f = "MSE";
          break;
        case "bce":
          this.loss_f = "Binary Cross Entropy";
          break;
        default:
          this.loss_f = "MSE";
          break;
      }
    },
    update() {
      try{
        this.batch_size = Number(this.batch_size);
        this.epochs = Number(this.epochs);
        this.l_rate = Number(this.l_rate);

        if(this.batch_size > this.numRecords) throw "Batch Size Exceeds Dataset Records";
        if(this.batch_size <= 0) throw "Batch Size should be valid and greater than zero";
        if(this.epochs <= 0) throw "Epochs should be valid and greater than zero";
        if(this.l_rate <= 0) throw "Learning Rate should be valid and greater than zero";
      }catch(e){
        dangerNotification(e); // Display to the User than Param Update is Illegal
        return;
      }

      this.$emit("restart", [
        { title: "Batch Size", value: this.batch_size },
        { title: "Epoch No.", value: this.epochs },
        { title: "Learning Rate", value: this.l_rate },
        { title: "Loss Function", value: this.loss_f },
      ]);
    },
  },
};
</script>
<style scoped>
.v-tour__target--highlighted {
  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
}
</style>

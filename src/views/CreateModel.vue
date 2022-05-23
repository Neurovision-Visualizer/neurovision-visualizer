<template>
  <div>
    <model-header :show="showDatasetPreviewModal" />
    <div class="grid grid-cols-3 min-h-screen">
      <div class="col-span-2 grid items-center">
        <div>
          <div class="flex flex-col justify-center items-center mt-20 mb-20">
            <h1 class="mx-auto font-extrabold text-4xl">
              Build Your Neural Network
            </h1>
            <h1 class="mx-auto mt-2 font-medium text-lg text-grey">
              Build the structure of your neural network
            </h1>
          </div>
          <model-build
            :num_hidden="num_hidden"
            :layers="layers"
            :addNode="addNode"
            :subNode="subNode"
            :subLayer="subLayer"
            :addLayer="addLayer"
            :width="width"
            :height="height"
          />
        </div>
      </div>
      <model-sidebar
        :layers="num_hidden"
        :output="output"
        @progress="nextStep"
      />
    </div>
    <dataset-preview-modal
      v-if="isModalVisible"
      @close="closeModal"
      :title="dataset.title"
      :description="dataset.description"
      :data="dataset"
      :problem-type="dataset.analysisType"
    />
  </div>
</template>

<script>
import CMHeader from "@/components/elements/CMHeader.vue";
import CMSidebar from "@/components/elements/CMSidebar.vue";
import CModel from "@/components/elements/CModel.vue";
import DatasetPreviewModal from "@/components/elements/DatasetPreviewModal.vue";
import { dangerNotification } from "@/controllers/toasts/toasts.js";

export default {
  components: {
    "model-header": CMHeader,
    "model-sidebar": CMSidebar,
    "model-build": CModel,
    "dataset-preview-modal": DatasetPreviewModal,
  },
  data() {
    return {
      width: 800,
      height: 500,
      num_hidden: 1,
      layers: [],
      isModalVisible: false,
      output: "",
      isLoading: true,
    };
  },
  computed: {
    dataset() {
      return JSON.parse(localStorage.getItem("base-dataset"));
    },
  },
  methods: {
    addLayer() {
      if (this.num_hidden < 3) {
        this.num_hidden = this.num_hidden + 1;
      } else {
        dangerNotification("Constraint: Maximum Number of Hidden Layers is 3");
        return;
      }

      const output = this.layers[this.layers.length - 1];

      this.layers.splice(-1, 1);
      this.layers = [
        ...this.layers,
        {
          id: this.layers.length,
          name: `hidden-${this.layers.length}`,
          nodes: [{ id: 0, layer: this.layers.length }],
        },
      ];

      output.id = this.layers.length;
      for (var i = 0; i < output.nodes.length; i++)
        output.nodes[i].layer = this.layers.length;

      this.layers.push(output);
    },
    subLayer() {
      if (this.num_hidden > 1) {
        this.num_hidden = this.num_hidden - 1;
      } else {
        dangerNotification("Constraint: Minimum Number of Hidden Layers is 1");
        return;
      }

      const output = this.layers[this.layers.length - 1];

      this.layers.splice(-2, 2);
      output.id = this.layers.length;
      for (var i = 0; i < output.nodes.length; i++)
        output.nodes[i].layer = this.layers.length;
      this.layers.push(output);
    },
    addNode(index) {
      const layer = this.layers[index];
      if (layer.nodes.length < 4) {
        layer.nodes.push({
          id: layer.nodes.length,
          layer: layer.id,
        });
      } else {
        dangerNotification(
          "Constraint: Maximum Number of Nodes in a Layer is 4"
        );
        return;
      }
    },
    subNode(index) {
      const layer = this.layers[index];
      if (layer.nodes.length > 1) {
        layer.nodes.splice(-1, 1);
      } else {
        dangerNotification(
          "Constraint: Minimum Number of Nodes in a Layer is 1"
        );
        return;
      }
    },
    showDatasetPreviewModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    nextStep(data) {
      const activations = data.activation;
      var result = [];
      for (var i = 0; i < this.num_hidden; i++) {
        if (activations[i] == "") {
          result.push("ReLu");
        } else {
          result.push(activations[i]);
        }
      }

      localStorage.setItem("layer-struct", JSON.stringify(this.layers));
      localStorage.setItem('final-dataset', JSON.stringify(this.dataset));
      
      this.$router.push({
        name: "run",
        params: {
          struct: JSON.stringify(this.layers),
          activation: result,
          hidden: this.num_hidden,
          problem: this.dataset.analysisType,
          name: this.dataset.name,
        },
      });
    },
    setInputs(name) {
      var input = {};
      switch (name) {
        case "house_price":
          input = {
            id: 0,
            name: "input",
            nodes: [
              { id: 0, layer: 0 },
              { id: 1, layer: 0 },
              { id: 2, layer: 0 },
              { id: 3, layer: 0 },
              { id: 4, layer: 0 },
            ],
          };
          break;
        case "heart_disease":
          input = {
            id: 0,
            name: "input",
            nodes: [
              { id: 0, layer: 0 },
              { id: 1, layer: 0 },
              { id: 2, layer: 0 },
              { id: 3, layer: 0 },
              { id: 4, layer: 0 },
            ],
          };
          break;
        case "iris":
          input = {
            id: 0,
            name: "input",
            nodes: [
              { id: 0, layer: 0 },
              { id: 1, layer: 0 },
              { id: 2, layer: 0 },
              { id: 3, layer: 0 },
            ],
          };
          break;
      }
      return input;
    },
    setOutputs(name) {
      var output = {};
      switch (name) {
        case "house_price":
          output = {
            id: 2,
            name: "output",
            nodes: [{ id: 0, layer: 2, output: true }],
          };
          this.output = "ReLu";
          break;
        case "heart_disease":
          output = {
            id: 2,
            name: "output",
            nodes: [{ id: 0, layer: 2, output: true }],
          };
          this.output = "Sigmoid";
          break;
        case "iris":
          output = {
            id: 2,
            name: "output",
            nodes: [
              { id: 0, layer: 2, output: true },
              { id: 1, layer: 2, output: true },
              { id: 2, layer: 2, output: true },
            ],
          };
          this.output = "Softmax";
          break;
      }
      return output;
    },
  },
  created() {
    const name = this.dataset.name;
    this.layers.push(this.setInputs(name));
    this.layers.push({
      id: 1,
      name: "hidden-1",
      nodes: [{ id: 0, layer: 1 }],
    });
    this.layers.push(this.setOutputs(name));
    
  },
};
</script>

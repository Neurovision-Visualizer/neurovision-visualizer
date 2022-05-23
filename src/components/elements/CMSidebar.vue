<template>
  <aside id="v-step-0">
    <div
      class="bg-primary_light py-8 px-10 w-full h-full flex flex-col justify-between"
    >
      <div class="mb-8">
        <div class="mb-10">
          <h3 class="text-2xl font-bold m-0">Activation Functions</h3>
          <p class="text-sm font-regular mt-4">
            This function is included in an artificial neural network in an
            effort to aid the network in learning complex patterns in the data.
            It imitates the simulation of a biological neuron in order to
            generate the output of a neuron given a set of input. Similarly to a
            biological neuron, it fires when inputs are large enough or pass a
            threshold value otherwise, it does nothing. Types of activation
            functions within the scope of this application include: Binary,
            Linear, Sigmoid, ReLu, Tanh, Exponential Linear Unit, Softplus,
            Swish, Softsign, Parametric ReLU and ReLU6
          </p>
        </div>
        <div>
          <sidebar-input
            type="select"
            :title="'Hidden Layer 1 ' + title"
            :options="options"
            :change="changeActFcn"
            :index="0"
            :id="'v-step-' + 1"
            :functionName="showMessage"
            :variation="true"
          />
          <sidebar-input
            v-if="layers >= 2"
            type="select"
            :title="'Hidden Layer 2 ' + title"
            :options="options"
            :change="changeActFcn"
            :index="1"
            :functionName="showMessage"
            :variation="true"
          />
          <sidebar-input
            v-if="layers >= 3"
            type="select"
            :title="'Hidden Layer 3 ' + title"
            :options="options"
            :change="changeActFcn"
            :index="2"
            :functionName="showMessage"
            :variation="true"
          />
          <sidebar-input
            type="input-d"
            :title="'Output Layer ' + title"
            :value="output"
            :id="'v-step-' + 2"
            :index="3"
            :functionName="showMessage"
            :variation="true"
          />
        </div>
      </div>
      <div class="flex flex-col justify-center">
        <div class="flex justify-center m-0 mb-4" @click="resetDataset()">
          <router-link
            className="w-2/5 bg-grey_dark text-white text-center font-bold py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-2"
            :to="{
              name: 'dataset',
              params: { isRunning: true },
            }"
          >
            Previous Step
          </router-link>
          <button
            id="v-step-5"
            @click="update"
            className="w-1/3 bg-primary text-white text-center font-semibold py-3 rounded shadow hover:shadow-md outline outline-1"
          >
            Next Step
          </button>
        </div>
        <p class="px-4 mx-auto font-thin text-sm">Step 4 of 5</p>
      </div>
    </div>
    <v-tour
      name="myTour"
      :steps="steps"
      :options="myOptions"
      class="text-xl"
    ></v-tour>
    <modal
      :topic="heading"
      :message="message"
      v-show="isModalVisible"
      @close="toggleModal"
    />
  </aside>
</template>

<script>
import InfograpicModal from "@/components/elements/Infographic.vue";
import SidebarInput from "@/components/elements/SidebarInput.vue";
import { buildTour } from "@/controllers/tour/buildCustomization";

export default {
  emits: ["progress"],
  props: {
    output: String,
    layers: Number,
  },
  components: {
    "sidebar-input": SidebarInput,
    modal: InfograpicModal,
  },
  data() {
    return {
      heading: "",
      message: "",
      isModalVisible: false,
      isTourVisible: localStorage.getItem("isTourVisible") === "true",
      options: [
        { title: "ReLu", value: "relu" },
        { title: "Sigmoid", value: "sigm" },
        { title: "Softmax", value: "smax" },
      ],
      myOptions: {
        useKeyboardNavigation: false,
        labels: {
          buttonSkip: "Skip Tour",
          buttonPrevious: "Previous Step",
          buttonNext: "Next Step",
          buttonStop: "Finish",
        },
      },
      title: "Activation Function",
      act_layers: ["", "", ""],
      steps: buildTour,
    };
  },
  methods: {
    changeActFcn(data) {
      switch (data.value) {
        case "sigm":
          this.act_layers[data.index] = "Sigmoid";
          break;
        case "smax":
          this.act_layers[data.index] = "Softmax";
          break;
        case "relu":
          this.act_layers[data.index] = "ReLu";
          break;
      }
    },
    resetDataset() {
      const backupDataset = localStorage.getItem("backup-dataset");
      localStorage.setItem("base-dataset", backupDataset);
    },
    showTour() {
      this.$tours["myTour"].start();
    },
    update() {
      this.$emit("progress", { activation: this.act_layers });
    },
    toggleModal() {
      this.isModalVisible = !this.isModalVisible;
    },
    showMessage(index) {
      switch (index) {
        case 0:
        case 1:
        case 2:
          this.heading = `Hidden Layer ${index + 1} Activation Function`;
          this.message = `An activation function is a function used in artificial neural networks which 
          outputs a small value for small inputs, and a larger value if its inputs exceed a threshold. 
          This activation function is for Hidden Layer ${index + 1}`;
          break;
        case 3:
          this.heading = "Output Layer Activation Function";
          this.message = `An activation function is a function used in artificial neural networks which 
          outputs a small value for small inputs, and a larger value if its inputs exceed a threshold. 
          This activation function is for the Output Layer`;
          break;
      }
      this.toggleModal();
    },
  },
  mounted: function () {
    if (this.isTourVisible) {
      this.showTour();
    }
  },
};
</script>
<style scoped>
.v-tour__target--highlighted {
  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
}
</style>

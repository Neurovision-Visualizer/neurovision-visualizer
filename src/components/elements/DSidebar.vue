<template>
  <aside id="v-step-0">
    <div
      class="bg-primary_light pr-5 py-5 w-full h-full flex flex-col justify-between"
    >
      <div class="w-full pl-8 pr-12">
        <h3 class="text-lg font-bold py-2">Dataset - {{ datasettitle }}</h3>
        <p class="text-s font-regular py-2">
          {{ description }}
        </p>
      </div>
      <div class="w-full">
        <form class="pl-10 py-6 flex flex-col justify-center">
          <div class="py-4">
            <sidebar-input
              type="input-d"
              title="Type of Analysis"
              :value="analysisType"
              :id="'v-step-' + 1"
              :functionName="showAnalysisType"
            />
          </div>
          <sidebar-input
            type="select"
            title="Training Data Percentage"
            :options="splitoptions"
            :change="changeTrain"
            :index="2"
            :id="'v-step-' + 2"
            :functionName="showTrain"
          />
          <sidebar-input
            type="select"
            title="Perform Normalization"
            :options="normalizeoptions"
            :change="changeNormal"
            :index="2"
            :id="'v-step-' + 3"
            :functionName="showNormalization"
          />
          <div class="my-6 flex justify-center">
            <router-link
              className="mr-3 bg-grey_dark text-white text-xs font-semibold px-4 py-3 rounded shadow hover:shadow-md hover:bg-gray-600 transition-colors"
              :to="{
                name: 'select',
              }"
            >
              Previous Step
            </router-link>
            <button
              id="v-step-4"
              @click="nextStep"
              class="bg-primary text-center text-white text-xs font-semibold px-4 py-3 rounded shadow hover:shadow-md hover:bg-blue-500 transition-colors duration-200"
            >
              Next Step
            </button>
          </div>
          <p class="px-4 mx-auto font-thin text-sm">Step 2 of 5</p>
        </form>
      </div>
    </div>

    <v-tour
      name="myTour"
      :steps="steps"
      :options="myOptions"
      class="text-xl"
    ></v-tour>
    <Modal
      :topic="title"
      :message="message"
      v-show="isModalVisible"
      @close="closeModal"
    />
  </aside>
</template>
<script>
// import DataTable from "@/components/elements/DataTable.vue";
import infographics_icon from "@/assets/icons/infographics_icon.svg";
import InfograpicModal from "@/components/elements/Infographic.vue";
import SidebarInput from "@/components/elements/SidebarInput.vue";
import { customizationTour } from "@/controllers/tour/dataCustomization.js";

export default {
  components: {
    Modal: InfograpicModal,
    "sidebar-input": SidebarInput,
  },
  props: {
    analysisType: String,
    datasettitle: String,
    description: String,
  },
  data() {
    return {
      splitoptions: [
        { title: "10%", value: "10" },
        { title: "20%", value: "20" },
        { title: "30%", value: "30" },
        { title: "40%", value: "40" },
        { title: "50%", value: "50" },
      ],
      normalizeoptions: [
        { title: "Yes", value: "yes" },
        { title: "No", value: "no" },
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
      steps: customizationTour,
      infographics_icon: infographics_icon,
      trainSplit: 10,
      normalizeDataset: true,
      isModalVisible: false,
      isTourVisible: localStorage.getItem("isTourVisible") === "true",
      message: "Helloo",
      title: "My Title",
      selected: this.analysis,
    };
  },
  mounted: function () {
    if (this.isTourVisible) {
      this.showTour();
    }
  },
  methods: {
    showTour() {
      this.$tours["myTour"].start();
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    showTrain() {
      this.title = "Training Data Percentage";
      this.message = `Refers to the percentage of data being used to train and teach the model 
      the hidden features or patterns in the data.
      Example: Training data is fed to the neural network continuously, in order for the model to 
      continue to learn the features of the data. `;
      this.showModal();
    },
    showNormalization() {
      this.title = "Normalization";
      this.message = `The process of transforming or changing the columns in a dataset to a common
       scale is referred to as Normalization.
       Example: In the process known as Min-Max scaling, values are rescaled to ensure that the 
       values are within a specified range varying between 0 and 1. The process of scaling these 
       values on a common scale is known as normalization.`;
      this.showModal();
    },
    showAnalysisType() {
      switch (this.analysisType) {
        case "Binary Classification":
          this.title = "Binary Classification";
          this.message = `A type of classification that predicts categorical variables and categorizes
           the output into two classes. This is especially important when predicting a possible outcome
            based on a series of data given.
            Example: A patient displaying multiple symptoms for a particular disease is predicted to be 
            ‘healthy’ or ‘carrying the disease’ based on the two possible outcomes of their diagnosis. 
            This outcome is categorized into two classes known as positive and negative. `;
          break;
        case "Multivariate Classification":
          this.title = "Multivariate Classification";
          this.message = `The term ‘multivariate’ refers to having one or more variables. It is the process
           by which data contains observations with more than one variable or outcome being measured.
           Example: The measurement of a star in terms of different variables such as its color, luminosity 
           and environment`;
          break;
        case "Prediction":
          this.title = "Prediction";
          this.message = `The end result or output of an algorithm that has been trained on a dataset 
          containing  already existing data and new data in an effort to determine a particular outcome.
          Example: Determining or predicting the weather forecast for a particular day based on a historical 
          dataset and new data gathered.`;
          break;
        default:
          this.title = "Type of Analysis";
          this.message = `There are several different types of problems that can be modeled using neural networks. 
          These include: Binary Classification, Multivariate Classification, Prediction and Regression.`;
          break;
      }

      this.showModal();
    },
    changeTrain(data) {
      this.trainSplit = Number(data.value);
    },
    changeNormal(data) {
      switch (data.value) {
        case "yes":
          this.normalizeDataset = true;
          break;
        case "no":
          this.normalizeDataset = false;
          break;
        default:
          this.normalizeDataset = true;
          break;
      }
    },
    nextStep() {
      localStorage.setItem("train", this.trainSplit || 10);
      localStorage.setItem("normalize", this.normalizeDataset || true);
      this.$router.push({
        name: "feature",
      });
    },
  },
};
</script>
<style scoped>
.v-tour__target--highlighted {
  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
}
</style>

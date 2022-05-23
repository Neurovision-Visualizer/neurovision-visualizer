<template>
  <div class="flex flex-col items-center justify-center h-screen mt-5">
    <div class="flex flex-row justify-between" id="v-step-0">
      <h1 class="font-bold text-4xl my-2">Welcome to Neurovision!</h1>
    </div>
    <p class="font-medium text-grey text-lg text-center mb-3">
      Select your dataset to start learning about neural networks!
    </p>
    <div class="grid grid-cols-3 mt-5" id="v-step-1">
      <article v-for="(dataset, index) in datasets" :key="index">
        <selector-item
          :image="dataset.image"
          :title="dataset.title"
          :summary="dataset.summary"
          :dataset-index="index"
          :selected="index == selectedDataset"
          @select="selectDataset"
          v-bind="index"
        ></selector-item>
      </article>
    </div>
    <div class="mx-auto mt-10">
      <button
        @click="showDatasetPreviewModal()"
        class="text-white bg-gray-500 font-semibold rounded-md py-3 px-4 hover:bg-gray-600 transition-colors duration-200"
        id="v-step-2"
      >
        Preview Selected Dataset
      </button>

      <router-link
        class="text-white bg-primary hover:bg-blue-500 rounded-md py-3 px-4 mx-3 transition-colors duration-200"
        id="v-step-3"
        :to="{
          name: 'dataset',
          params: {
            analysisType: analysisType,
            title: title,
            description: description,
          },
        }"
      >
        Next Step
      </router-link>
    </div>
    <div class="mt-5 mb-2">
      <p class="text-center font-medium text-primary_dark mb-4">
        Not sure which to select? Preview each dataset to learn more!
      </p>
    </div>

    <dataset-preview-modal
      v-if="isModalVisible && selectDataset"
      @close="closeModal"
      :title="datasets[selectedDataset].title"
      :description="datasets[selectedDataset].description"
      :data="dataset"
      :problem-type="datasets[selectedDataset].problemType"
    />
    <v-tour
      name="myTour"
      :steps="steps"
      :options="myOptions"
      class="text-xl w-4/5"
    ></v-tour>
  </div>
</template>
<script>
import SelectorItem from "@/components/elements/SelectorItem.vue";
import DatasetPreviewModal from "@/components/elements/DatasetPreviewModal.vue";
import {
  heartDiseaseData,
  irisPredictionData,
  housePredictionData,
} from "@/constants/dataset.constants";
import { datasetSelectionTour } from "@/controllers/tour/datasetSelection.js";
import { dangerNotification } from "@/controllers/toasts/toasts.js";

export default {
  data() {
    return {
      datasets: [heartDiseaseData, irisPredictionData, housePredictionData],
      analysisType: "Prediction",
      title: "",
      description: "",
      selectedDataset: undefined,
      isModalVisible: false,
      isTourVisible: localStorage.getItem("isTourVisible") === "true",
      data: null,
      dataset: {
        headings: [],
        rows: [],
      },
      steps: datasetSelectionTour,
      myOptions: {
        useKeyboardNavigation: false,
        labels: {
          buttonSkip: "Skip Tour",
          buttonPrevious: "Previous Step",
          buttonNext: "Next Step",
          buttonStop: "Finish",
        },
      },
    };
  },
  methods: {
    showDatasetPreviewModal() {
      if (this.selectedDataset === undefined) {
        dangerNotification(
          "No Dataset selected. Please select a dataset to continue"
        );
      } else {
        this.isModalVisible = true;
      }
    },

    closeModal() {
      this.isModalVisible = false;
    },

    selectDataset(dataset) {
      // Set the selected dataset
      this.selectedDataset = dataset;

      const datasetObj = this.datasets[this.selectedDataset];
      const name = this.datasets[dataset].name;

      // Extract key values
      this.analysisType = datasetObj.problemType;
      this.title = datasetObj.title;
      this.description = datasetObj.description;
      this.summary = datasetObj.summary;

      // Fetch the data
      this.$http
        .get(
          `${process.env.VUE_APP_API_URL}/data?dataset=${this.datasets[dataset].name}`,
          {}
        )
        .then((response) => {
          const newData = response.data.dataset;
          const data = {
            headings: newData.columns,
            rows: newData.data,
            analysisType: this.analysisType,
            title: this.title,
            description: this.summary,
            index: newData.index,
            name: datasetObj.name,
          };
          this.dataset = data;
          localStorage.setItem("base-dataset", JSON.stringify(data));
        });
    },
    showTour() {
      this.$tours["myTour"].start();
    },
  },
  components: {
    "selector-item": SelectorItem,
    "dataset-preview-modal": DatasetPreviewModal,
  },

  watch: {
    data: {
      handler(newValue, oldValue) {
        //console.log(newValue);
        // Note: `newValue` will be equal to `oldValue` here
        // on nested mutations as long as the object itself
        // hasn't been replaced.
      },
      deep: true,
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

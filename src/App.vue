<template>
  <div>
    <navbar />
    <router-view />
  </div>
</template>
<script>
import NavBar from "@/components/elements/NavBar.vue";
import MyInfographic from "@/components/elements/Infographic.vue";
import DatasetSelection from "@/views/DatasetSelection.vue";
import CustomizeDataset from "@/views/CustomizeDataset.vue";
import CreateModel from "@/views/CreateModel.vue";

export default {
  components: {
    navbar: NavBar,
    MyInfographic: MyInfographic,
    "dataset-selection": DatasetSelection,
    // eslint-disable-next-line vue/no-unused-components
    "customize-dataset": CustomizeDataset,
    // eslint-disable-next-line vue/no-unused-components
    "create-model": CreateModel,
  },
};
</script>

<style>
@import "./assets/styles/variables.css";
@import "./assets/styles/animations.css";
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600;700&display=swap");
@import "~shepherd.js/dist/css/shepherd.css";
#selectable {
  cursor: pointer;
}

.v-step {
  background-color: white !important;
  border: 3px solid #20a4f3 !important;
  font-size: 0.8em !important;
  border-radius: 15px !important;
}

.v-step__arrow {
  display: none;
}
.v-step__button {
  color: #20a4f3 !important;
}

.v-step__content {
  color: #282828;
}

.v-step__header {
  color: #282828;
  border-radius: 15px !important;
  background-color: white !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>

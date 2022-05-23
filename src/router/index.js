import { createRouter, createWebHistory } from "vue-router";
import DatasetSelection from "@/views/DatasetSelection.vue";
import CustomizeDataset from "@/views/CustomizeDataset.vue";
import PreQuiz from "@/views/PreQuiz.vue";
import PostQuiz from "@/views/PostQuiz.vue";
import CreateModel from "@/views/CreateModel.vue";
import FeatureEngineering from "@/views/FeatureEngineering.vue";
import RunModel from "@/views/RunModel.vue";
import Landing from "@/views/Landing.vue";
import Tour from "@/views/Tour.vue";

const routes = [
  {
    path: "/",
    name: "landing",
    component: Landing,
  },
  {
    path: "/select",
    name: "select",
    component: DatasetSelection,
  },
  {
    path: "/dataset",
    name: "dataset",
    component: CustomizeDataset,
  },
  {
    path: "/create",
    name: "create",
    component: CreateModel,
  },
  {
    path: "/run",
    name: "run",
    component: RunModel,
  },
  {
    path: "/tour",
    name: "tour",
    component: Tour,
  },
  {
    path: "/prequiz",
    name: "prequiz",
    component: PreQuiz,
  },
  {
    path: "/postquiz",
    name: "postquiz",
    component: PostQuiz,
  },
  {
    path: "/feature",
    name: "feature",
    component: FeatureEngineering,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

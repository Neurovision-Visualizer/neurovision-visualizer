<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <div class="flex flex-row justify-between items-center mb-4">
      <img :src="neurovision_logo" alt="info" class="items-center mx-4" />
      <span class="font-bold text-3xl mx-4">Welcome to Neurovision!</span>
    </div>
    <div class="flex flex-col my-4 w-2/5 items-center justify-center">
      <span
        class="font-regular text-xl text-center mx-4 mb-4 items-center justify-center"
        >An educational tool that walks users through the construction of a
        basic neural network model whilst giving insights on various concepts of
        neural networks. The aim of this application is to allow users to gain a
        better understanding of neural networks, how they work and some basic
        concepts involved.</span
      >
    </div>
    <div class="flex flex-col mt-12 w-2/5 items-center justify-center">
      <span
        class="font-bold text-2xl text-center mx-4 items-center justify-center"
        >Select Option to Start Application</span
      >
      <div class="mt-2">
        <p class="text-center font-medium mb-4 text-primary_dark">
          It is recommened that new users start the application with the
          pre-quiz!
        </p>
      </div>
    </div>
    <div class="mx-auto my-4">
      <router-link
        class="text-white bg-primary rounded-md py-3 px-4 mx-3 transition-colors duration-200 cursor-pointer hover:bg-blue-700"
        id="v-step-3"
        :to="{
          name: 'prequiz',
        }"
      >
        Start Pre Quiz
      </router-link>
      <router-link
        class="text-white bg-gray-500 rounded-md py-3 px-4 mx-3 transition-colors duration-200 cursor-pointer hover:bg-blue-700"
        id="v-step-3"
        :to="{
          name: 'select',
        }"
      >
        Start Without Tutorial
      </router-link>
      <router-link
        class="text-white bg-gray-500 rounded-md py-3 px-4 mx-3 transition-colors duration-200 cursor-pointer hover:bg-blue-700"
        id="v-step-3"
        @click="showTour()"
        :to="{
          name: 'select',
        }"
      >
        Start With Tutorial
      </router-link>
    </div>
  </div>
</template>
<script>
import neurovision_logo from "@/assets/neurovision_logo.svg";
export default {
  data() {
    return {
      neurovision_logo: neurovision_logo,
    };
  },
  methods: {
    showTour() {
      localStorage.setItem("isTourVisible", JSON.stringify(true));
    },
  },
  mounted: function () {
    localStorage.setItem("isTourVisible", JSON.stringify(false));
  },
};
</script>

<template>
  <div>
    <div id="v-step-0">
      A DOM element on your page. The first step will pop on this element
      because its ID is 'v-step-0'.
    </div>
    <div class="v-step-1">
      A DOM element on your page. The second step will pop on this element
      because its ID is 'v-step-1'.
    </div>
    <div data-v-step="2">
      A DOM element on your page. The third and final step will pop on this
      element because its ID is 'v-step-2'.
    </div>
    <button
      class="w-1/3 bg-primary text-center text-white text-xs font-semibold px-4 py-3 rounded shadow hover:shadow-md outline outline-1 lg:mr-1 lg:mb-0 ml-3 mb-3"
      @click="show()"
    >
      Next Step
    </button>

    <v-tour name="myTour" :steps="steps"></v-tour>
  </div>
</template>

<script>
export default {
  name: "Tour",
  data() {
    return {
      steps: [
        {
          target: "#v-step-0", // We're using document.querySelector() under the hood
          content: `Discover <strong>Vue Tour</strong>!`,
        },
        {
          target: ".v-step-1",
          content: "An awesome plugin made with Vue.js!",
        },
        {
          target: '[data-v-step="2"]',
          content:
            "Try it, you'll love it!<br>You can put HTML in the steps and completely customize the DOM to suit your needs.",
          params: {
            placement: "top",
          },
        },
      ],
    };
  },
  mounted: function () {
    this.$tours["myTour"].start();
  },
  methods: {
    show() {
      console.log("button pressed");
    },
  },
};
</script>

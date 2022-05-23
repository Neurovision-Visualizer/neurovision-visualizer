<template>
  <div class="flex flex-col items-center">
    <article
      class="shadow-lg w-52 h-52 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer hover:bg-primary_light"
      :class="{ 'border-2 border-primary parent': selected }"
      id="selectable"
      @click="toggleSelected"
    >
      <div v-if="image">
        <img
          :src="image"
          :alt="title"
          :class="{ 'filter-primary': selected }"
        />
      </div>
    </article>

    <div class="text-center my-3 w-3/5 text-sm">
      <h1
        class="text-lg font-bold text-primary_dark"
        :class="{ 'text-primary': selected }"
      >
        {{ title }}
      </h1>
      <p
        :class="{ 'text-primary': selected, 'text-gray-600': !selected }"
        class="transition-colors duration-400"
      >
        {{ summary }}
      </p>
    </div>
    <transition name="fade">
      <div v-if="selected">
        <svg
          class="checkmark"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
        >
          <circle
            class="checkmark__circle"
            cx="26"
            cy="26"
            r="25"
            fill="none"
          />
          <path
            class="checkmark__check"
            fill="none"
            d="M14.1 27.2l7.1 7.2 16.7-16.8"
          />
        </svg>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "selection-item",
  props: {
    image: String,
    itemNo: Number,
    title: String,
    summary: String,
    selected: Boolean,
    datasetIndex: Number,
    selected: false,
  },

  data() {
    return {};
  },

  methods: {
    toggleSelected() {
      this.$emit("select", this.datasetIndex);
    },
  },
};
</script>
<style scoped>
.filter-primary {
  filter: invert(54%) sepia(69%) saturate(3318%) hue-rotate(179deg)
    brightness(104%) contrast(91%);
}
.checkmark__circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: var(--primary);
  fill: none;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: relative;
  top: -16.3em;
  left: 5.6em;
  stroke-width: 2;
  stroke: #fff;
  stroke-miterlimit: 10;
  box-shadow: inset 0px 0px 0px var(--primary);
  animation: fill 0.4s ease-in-out 0.4s forwards,
    scale 0.3s ease-in-out 0.9s both;
}

.checkmark__check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}
</style>

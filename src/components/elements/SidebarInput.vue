<template>
  <div class="mb-10">
    <div v-if="type == 'select'" :id="id">
      <div class="flex flex-row justify-between mb-3">
        <p class="text-s font-semibold my-4">{{ title }}</p>
        <img
          :src="infographics_icon"
          alt="info"
          class="items-center hover:cursor-pointer"
          @click="check()"
        />
      </div>
      <select
        class="bg-white rounded-sm outline outline-1 outline-white focus:outline-primary h-12 pl-2 text-base w-full"
        @change="changeValue($event)"
      >
        <option v-for="(item, i) in options" :key="i" :value="item.value">
          {{ item.title }}
        </option>
      </select>
    </div>
    <div v-if="type == 'input'" :id="id">
      <div class="flex flex-row justify-between mb-3">
        <p class="text-base font-semibold">{{ title }}</p>
        <img
          :src="infographics_icon"
          alt="info"
          class="items-center hover:cursor-pointer"
          @click="check()"
        />
      </div>
      <input
        class="bg-white rounded outline outline-1 outline-white focus:outline-primary h-12 text-base w-full p-2"
        value=""
        placeholder="Enter number"
        @input="changeInput($event)"
      />
    </div>
    <div v-if="type == 'input-n'" :id="id">
      <div class="flex flex-row justify-between mb-3">
        <p class="text-base font-semibold">{{ title }}</p>
        <img
          :src="infographics_icon"
          alt="info"
          class="items-center hover:cursor-pointer"
          @click="check()"
        />
      </div>
      <input
        class="bg-white rounded outline outline-1 outline-white focus:outline-primary h-12 text-base w-full p-2"
        value=""
        placeholder="Enter number"
        type="number"
        @input="changeInput($event)"
      />
    </div>
    <div v-if="type == 'input-d'" :id="id">
      <div class="flex flex-row justify-between mb-3">
        <p class="text-base font-semibold">{{ title }}</p>
        <img
          :src="infographics_icon"
          alt="info"
          class="items-center hover:cursor-pointer"
          @click="check()"
        />
      </div>
      <input
        class="bg-white rounded outline outline-1 outline-white focus:outline-primary h-12 text-base w-full p-2"
        :value="value"
        disabled
      />
    </div>
    <div v-if="type == 'input-nd'" class="w-full m-0 p-0">
      <p class="text-base font-semibold mb-4">{{ title }}</p>
      <input
        class="bg-white rounded outline outline-1 outline-white focus:outline-primary h-12 text-base w-full p-2"
        :value="value"
        disabled
      />
    </div>
  </div>
</template>

<script>
import infographics_icon from "@/assets/icons/infographics_icon.svg";

export default {
  props: [
    "type",
    "options",
    "title",
    "value",
    "change",
    "index",
    "id",
    "functionName",
    "variation",
  ],
  data() {
    return {
      infographics_icon: infographics_icon,
    };
  },
  methods: {
    changeValue(event) {
      const value = event.target.value;
      this.change({ index: this.index, value: value });
    },
    changeInput(event) {
      const value = event.target.value;
      this.change({ index: this.index, value: value });
    },
    check() {
      this.variation ? this.functionName(this.index) : this.functionName();
    },
  },
};
</script>
<style scoped>
.v-tour__target--highlighted {
  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
}
</style>

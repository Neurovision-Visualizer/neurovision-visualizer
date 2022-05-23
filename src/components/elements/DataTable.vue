<template>
  <div
    class="shadow-md sm:rounded-lg overflow-scroll w-full p-0"
    :class="height"
  >
    <table class="w-full text-sm text-left">
      <thead class="text-xs text-gray-700 uppercase bg-gray-100">
        <tr>
          <th
            v-for="(heading, index) in headings"
            class="px-6 py-3"
            :key="index"
            :class="{ 'bg-red-100 text-red-900': index_highlighted === index }"
          >
            {{ heading }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in rows"
          :key="index"
          class="border-b odd:bg-white even:bg-gray-50"
        >
          <td
            v-for="(detail, detailIndex) in row"
            :key="detailIndex"
            class="px-6 py-4"
            :class="{
              'bg-red-100 ': index_highlighted === detailIndex,
            }"
          >
            {{ detail }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  rows: [Object],
  headings: [String],
  height: String,
  index_highlighted: Number,
});
</script>

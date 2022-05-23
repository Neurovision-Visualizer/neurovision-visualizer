<template>
  <!-- Main modal -->
  <transition name="modal-fade">
    <div class="modal-backdrop" @click="close">
      <div class="custom-modal w-3/5">
        <header id="modal-header" class="flex items-start">
          <div>
            <h1 class="text-3xl font-bold">{{ title }}</h1>
            <p class="text-gray-700 my-3">{{ description }}</p>
            <p class="my-3 font-semibold">Problem Type: {{ problemType }}</p>
            <p class="my-3 font-semibold">No Records: {{ data.rows.length }}</p>
          </div>

          <span @click="close" class="absolute right-72">
            <svg
              class="h-9 w-9 text-grey hover:fill-primary transition-colors ease-in-out duration-400"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path
                d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
              />
            </svg>
          </span>
        </header>
        <h4 class="text-primary font-semibold mb-3">Data Preview</h4>
        <section id="modal-body" class="rounded">
          <data-table
            :headings="data.headings"
            :rows="data.rows"
            :height="'h-40'"
          ></data-table>
        </section>
      </div>
    </div>
  </transition>
</template>
<script>
import DataTable from "@/components/elements/DataTable.vue";

export default {
  props: {
    title: String,
    description: String,
    data: {
      headings: Array,
      rows: [],
    },
    problemType: String,
  },

  components: {
    "data-table": DataTable,
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>
<script setup></script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.custom-modal {
  background: #ffffff;
  border-radius: 5px;
  overflow-x: auto;
  display: flex;
  padding: 35px 60px;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: #4aae9b;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}

.btn-green {
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
}

.hidden {
}
</style>

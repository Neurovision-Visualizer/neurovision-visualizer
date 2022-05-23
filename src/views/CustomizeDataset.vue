<template>
  <div
    class="pl-12 flex flex-col flex-wrap h-full md:items-center lg:items-start md:flex-row md:flex-nowrap"
  >
    <div
      class="flex-shrink-0 w-full md:w-2/3 mx-auto text-left md:mx-8 md:text-left pt-28"
    >
      <data-table
        class="w-full mr-8"
        :headings="dataset.headings"
        :rows="dataset.rows"
        :height="'h-96'"
      ></data-table>
    </div>
    <d-sidebar
      class="w-1/3"
      :analysisType="analysisType"
      :datasettitle="dataset.title"
      :description="dataset.description"
    />
  </div>
</template>
<script>
import DataTable from "@/components/elements/DataTable.vue";
import DSideBar from "@/components/elements/DSidebar.vue";
export default {
  components: {
    "data-table": DataTable,
    "d-sidebar": DSideBar,
  },
  data() {
    return {
      analysisType: "",
      title: "",
      description: "",
      dataset: [],
    };
  },

  mounted() {
    this.analysisType = this.$route.params.analysisType;
    this.title = this.$route.params.title;
    this.description = this.$route.params.description;
    this.dataset = JSON.parse(localStorage.getItem("base-dataset"));
  },
  update() {
    this.analysisType = this.$route.params.analysisType;
    this.title = this.$route.params.title;
    this.description = this.$route.params.description;
  },
};
</script>

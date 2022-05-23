<template>
  <section>
    <div class="flex justify-center items-center mb-5">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        height="30px"
        viewBox="0 0 48 48"
        width="30px"
        fill="#5D5FEF"
        @click="addLayer()"
        class="mr-1"
      >
        <path d="M22.5 34H25.5V25.5H34V22.5H25.5V14H22.5V22.5H14V25.5H22.5ZM9 42Q7.8 42 6.9 41.1Q6 40.2 6 39V9Q6 7.8 6.9 6.9Q7.8 6 9 6H39Q40.2 6 41.1 6.9Q42 7.8 42 9V39Q42 40.2 41.1 41.1Q40.2 42 39 42Z"/>
      </svg>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        height="30px"
        viewBox="0 0 48 48"
        width="30px"
        fill="#535353"
        @click="subLayer()"
        class="mr-1"
      >
        <path d="M12.5 25.4H35.55V22.4H12.5ZM9 42Q7.8 42 6.9 41.1Q6 40.2 6 39V9Q6 7.8 6.9 6.9Q7.8 6 9 6H39Q40.2 6 41.1 6.9Q42 7.8 42 9V39Q42 40.2 41.1 41.1Q40.2 42 39 42Z"/>
      </svg>
      <h1 class="text-base text-secondary font-extrabold my-auto mr-2 ">{{ num_hidden }}</h1>
      <h1 class="text-base text-secondary font-base my-auto">Hidden Layers</h1>
    </div>

    <div class="border-t-2 border-r-2 border-l-2 border-secondary h-2 w-8/12 mx-auto"></div>
    <div id="chart5" class="flex justify-center items-center mb-5"></div>

    <div class="flex justify-center items-center">
      <div class="flex justify-center items-center mb-5 mr-16">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          height="30px"
          viewBox="0 0 48 48"
          width="30px"
          fill="#5D5FEF"
          @click="() => {
            this.addNode(1);
            this.createModel();
          }"
          class="mr-1"
        >
          <path d="M22.5 34H25.5V25.5H34V22.5H25.5V14H22.5V22.5H14V25.5H22.5ZM9 42Q7.8 42 6.9 41.1Q6 40.2 6 39V9Q6 7.8 6.9 6.9Q7.8 6 9 6H39Q40.2 6 41.1 6.9Q42 7.8 42 9V39Q42 40.2 41.1 41.1Q40.2 42 39 42Z"/>
        </svg>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          height="30px"
          viewBox="0 0 48 48"
          width="30px"
          fill="#535353"
          @click="() => {
            this.subNode(1);
            this.createModel()
          }"
          class="mr-1"
        >
          <path d="M12.5 25.4H35.55V22.4H12.5ZM9 42Q7.8 42 6.9 41.1Q6 40.2 6 39V9Q6 7.8 6.9 6.9Q7.8 6 9 6H39Q40.2 6 41.1 6.9Q42 7.8 42 9V39Q42 40.2 41.1 41.1Q40.2 42 39 42Z"/>
        </svg>
      </div>
      <div
        v-if="layers.length >= 4"
        class="flex justify-center items-center mb-5 mr-16"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          height="30px"
          viewBox="0 0 48 48"
          width="30px"
          fill="#5D5FEF"
          @click="() => {
            this.addNode(2);
            this.createModel();
          }"
          class="mr-1"
        >
          <path d="M22.5 34H25.5V25.5H34V22.5H25.5V14H22.5V22.5H14V25.5H22.5ZM9 42Q7.8 42 6.9 41.1Q6 40.2 6 39V9Q6 7.8 6.9 6.9Q7.8 6 9 6H39Q40.2 6 41.1 6.9Q42 7.8 42 9V39Q42 40.2 41.1 41.1Q40.2 42 39 42Z"/>
        </svg>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          height="30px"
          viewBox="0 0 48 48"
          width="30px"
          fill="#535353"
          @click="() => {
            this.subNode(2);
            this.createModel();
          }"
          class="mr-1"
        >
          <path d="M12.5 25.4H35.55V22.4H12.5ZM9 42Q7.8 42 6.9 41.1Q6 40.2 6 39V9Q6 7.8 6.9 6.9Q7.8 6 9 6H39Q40.2 6 41.1 6.9Q42 7.8 42 9V39Q42 40.2 41.1 41.1Q40.2 42 39 42Z"/>
        </svg>
      </div>
      <div
        v-if="layers.length >= 5"
        class="flex justify-center items-center mb-5"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          height="30px"
          viewBox="0 0 48 48"
          width="30px"
          fill="#5D5FEF"
          @click="() => {
            this.addNode(3);
            this.createModel();
          }"
          class="mr-1"
        >
          <path d="M22.5 34H25.5V25.5H34V22.5H25.5V14H22.5V22.5H14V25.5H22.5ZM9 42Q7.8 42 6.9 41.1Q6 40.2 6 39V9Q6 7.8 6.9 6.9Q7.8 6 9 6H39Q40.2 6 41.1 6.9Q42 7.8 42 9V39Q42 40.2 41.1 41.1Q40.2 42 39 42Z"/>
        </svg>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          height="30px"
          viewBox="0 0 48 48"
          width="30px"
          fill="#535353"
          @click="() => {
            this.subNode(3);
            this.createModel();
          }"
          class="mr-1"
        >
          <path d="M12.5 25.4H35.55V22.4H12.5ZM9 42Q7.8 42 6.9 41.1Q6 40.2 6 39V9Q6 7.8 6.9 6.9Q7.8 6 9 6H39Q40.2 6 41.1 6.9Q42 7.8 42 9V39Q42 40.2 41.1 41.1Q40.2 42 39 42Z"/>
        </svg>
      </div>
    </div>
    <div id="node" class="bg-primary"></div>
  </section>
</template>

<script>
import * as d3 from "d3";
import add from "@/assets/icons/add.svg";
import minus from "@/assets/icons/minus.svg";

export default {
  name: "CModel",
  props: ["num_hidden", "layers", "addNode", "subNode", "addLayer", "subLayer", "width", "height"],
  data() {
    return {
      add,
      minus,
    };
  },
  methods: {
    createModel() {
      d3.select("#chart5").select("svg").remove();
      const svg = d3
        .select("#chart5")
        .append("svg")
        .attr("width", this.width)
        .attr("height", this.height);

      const id = (d) => d.id;

      const l_scale = d3
        .scaleBand()
        .domain(this.layers.map(id))
        .range([0, this.width]);

      const layers = svg
        .selectAll(".layer")
        .data(this.layers)
        .enter()
        .append("g")
        .style("transform", `translate(${30}px, ${0}px)`);

      var y = d3.scaleLinear().rangeRound([0, this.height / 5]);

      const nodes = layers
        .selectAll("rect")
        .data((d) => d.nodes)
        .enter()
        .append("circle")
        .attr("id", (d) => d.id)
        .style("fill", function (d) {
          if(d.layer == 0){
            return "#20A4F3"
          }else if(d.output){
            return "#20A4F3"
          }else{
            return "#5D5FEF"
          }
        })
        .attr("r", 20)
        .attr("cy", function (d) {
          return y(d.id) + 50;
        })
        .attr("cx", (d) => l_scale(d.layer) + 50);

    },
  },
  mounted() {
    this.createModel();
  },
  updated(){
    this.createModel();
  }
};
</script>

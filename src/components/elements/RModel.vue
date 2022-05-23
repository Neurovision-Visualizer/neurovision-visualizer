<template>
  <section>
    <div v-if="isRunning == true" class="flex justify-center items-center mb-5">
      <div
        id="epochs"
        class="bg-violet-400 ml-4 w-44 h-12 rounded outline outline-1 outline-white flex flex-col items-center justify-center text-base"
      >
        Epoch: {{ epochNum }}
      </div>
      <div
        id="epochs"
        class="bg-violet-400 ml-4 w-44 h-12 rounded outline outline-1 outline-white flex flex-col items-center justify-center text-base"
      >
        Accuracy: {{ getAccuracy() }}
      </div>
      <div
        id="epochs"
        class="bg-violet-400 ml-4 w-44 h-12 rounded outline outline-1 outline-white flex flex-col items-center justify-center text-base"
      >
        Loss: {{ getLoss() }}
      </div>
    </div>
    <div id="chart5" class="flex justify-center items-center mb-5"></div>
  </section>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "CModel",
  props: [
    "num_hidden",
    "layers",
    "mappings",
    "width",
    "height",
    "epochs",
    "isRunning",
    "toggleRunning",
    "training",
  ],
  data() {
    return {
      epochNum: 1,
      epochWatcher: this.epochs,
      // accuracy: [
      //   0.0012, 0.0023, 0.0157, 0.0259, 0.03604, 0.0412, 0.0423, 0.0457, 0.0559,
      //   0.0664,
      // ],
      // loss: [
      //   0.0052, 0.0073, 0.0167, 0.0299, 0.0356, 0.0456, 0.0493, 0.0512, 0.0612,
      //   0.0653,
      // ],
      accuracy: this.training.acc_hist,
      loss: this.training.loss_hist,
    };
  },
  computed: {
    boundedWidth: function () {
      return this.width - this.margin.left - this.margin.right;
    },
    boundedHeight: function () {
      return this.height - this.margin.top - this.margin.bottom;
    },
  },
  methods: {
    // epochNumTimer() {
    //   if (this.epochNum < 100) {
    //     setTimeout(() => {
    //       this.epochNum += 1;
    //     }, 700);
    //   }
    // },
    getAccuracy() {
      return Number(this.accuracy[(this.epochNum - 1)].toFixed(7)); // % 10];
    },
    getLoss() {
      return Number(this.loss[(this.epochNum - 1)].toFixed(7)); // % 10];
    },
    increaseEpoch(epoch) {
      if (epoch == this.epochWatcher) {
        this.epochNum += 1;
        this.epochWatcher -= 1;
      }
    },
    createModel() {
      // console.log(this.training);
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
        .style("transform", `translate(${40}px, ${0}px)`);

      var y = d3.scaleLinear().rangeRound([0, this.height / 5]);

      const nodes = layers
        .selectAll("rect")
        .data((d) => d.nodes)
        .enter()
        .append("circle")
        .attr("id", (d) => d.id)
        .style("fill", function (d) {
          if (d.layer == 0) {
            return "#20A4F3";
          } else if (d.output) {
            return "#20A4F3";
          } else {
            return "#5D5FEF";
          }
        })
        .attr("r", 20)
        .attr("cy", function (d) {
          return y(d.id) + 50;
        })
        .attr("cx", (d) => l_scale(d.layer) + 50);

      const len = 3;
      const links = nodes
        .select("circle")
        .data(this.mappings)
        .enter()
        .append("line")
        .style("stroke", "grey")
        .style("stroke-width", 3)
        .attr("x1", (d) => d.sourcex)
        .attr("y1", (d) => d.sourcey)
        .attr("x2", (d) => d.targetx)
        .attr("y2", (d) => d.targety)
        .interrupt();

      const update = () => {
        this.toggleRunning();
      };

      const increase = (epoch) => this.increaseEpoch(epoch);
      function forward(epoch) {
        links
          .interrupt()
          .selection()
          .style("stroke", "green")
          .style("stroke-width", 5)
          .attr("stroke-dasharray", 10 + " " + 10)
          .attr("stroke-dashoffset", 250)
          .interrupt()
          .selection()
          .transition()
          .style("stroke", "green")
          .duration(700)
          .ease(d3.easeQuadIn)
          .attr("stroke-dashoffset", 100)
          .on("end", (event) => {
            if (epoch > 1) {
              // console.log(event);
              increase(epoch);
              forward(epoch - 1);
            } else {
              update();
            }
          });
      }

      function backward(epoch) {
        links
          .transition()
          .style("stroke", "green")
          .duration(1)
          .ease(d3.easeLinear)
          .attr("stroke-dashoffset", 20)
          .style("stroke", "green")
          .on("end", (event) => {
            if (epoch > 1) {
              // console.log(event);
              increase(epoch);
              forward(epoch - 1);
            }
          });
      }

      const epochs = this.epochs;
      if (this.isRunning) {
        // this.epochNumTimer();
        forward(epochs);
      } else {
        this.epochNum = 1;
      }
    },
  },
  mounted() {
    this.createModel();
  },
  updated() {
    this.createModel();
  },
  // watch() {
  //   this.epochNum = this.epochWatcher;
  // },
};
</script>

<style scoped>
.icon {
  width: 30px;
  margin-right: 5px;
}

h2 {
  margin: 0;
  margin-right: 10px;
}
</style>

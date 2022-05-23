export const datasetSelectionTour = [
  {
    target: "#v-step-0",
    header: {
      title: "<strong>Welcome to Neurovision</strong>",
    },
    content: `Where we learn all the basis of neural networks! `,
    params: {
      placement: "right",
      highlight: true,
    },
  },
  {
    target: "#v-step-1",
    header: {
      title: "<strong>Select Dataset</strong>",
    },
    content: `<p align='left'>This is where we select a dataset for building the neural network model. 
      As shown there are currently three (3) datasets to chose from. 
      Each dataset represents a different type of analysis that can be performed. <br /> <br />
      <strong>Go ahead and select a dataset.</strong></p>`,
    params: {
      placement: "top",
      highlight: true,
    },
  },
  {
    target: "#v-step-2",
    header: {
      title: "<strong>Preview Dataset</strong>",
    },
    content: `<p align='left'>Given that you have selected a dataset for modeling, you can now preview the 
      contents of that dataset. By previewing dataset you will be able to see the name of the 
      dataset, its description, the type of analysis that dataset relates to, the number of records 
      in the dataset and have a look at the records</p>`,
    params: {
      placement: "left",
      highlight: false,
    },
  },
  {
    target: "#v-step-3",
    header: {
      title: "<strong>Next Step</strong>",
    },
    content: `<p align='left'>Assuming that you have previewed the dataset selected it is now time to move to the 
      next step of the process, <strong>Customizing the Dataset</strong></p> `,
    params: {
      placement: "right",
      highlight: false,
    },
  },
];

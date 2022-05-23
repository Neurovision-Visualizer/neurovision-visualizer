export const customizationTour = [
  {
    target: "#v-step-0",
    header: {
      title: "<strong>Dataset Customization</strong>",
    },
    content: `<p align='left'> This involves customizing the dataset selected for modeling by deciding the training data percentage
     as well as if the model should perform normalization on data before running. Dataset customization is important 
     because it allows for the cleaing of data before use as well as configuring the data to a standard form.</p>`,
    params: {
      placement: "left",
      highlight: true,
    },
  },
  {
    target: "#v-step-1",
    header: {
      title: "<strong>Type of Analysis</strong>",
    },
    content: `<p align='left'>The type of analysis the dataset relates to is essentially the type of machine learning problem 
     to be modeled. There are several types of problems that can be modeled using neural networks:
     <br />1. Binary Classification <br /> 2. Multivariate Classification <br /> 3. Prediction <br /> 4. Regression 

     <br /><br /><em style="color:#c4c4c4;">To gain more information on the specific type of analysis the dataset selected 
     relates to after this tour click the infographic tooltip icon on the right!</em> </p>`,
    params: {
      placement: "left",
      highlight: true,
    },
  },
  {
    target: "#v-step-2",
    header: {
      title: "<strong>Train Data Percentage</strong>",
    },
    content: `<p align='left'> This refers to the percentage of data being used to train and teach the model 
     the hidden features or patterns in the data. Train data is an essential component of every machine 
     learning model and helps them make accurate predictions or perform a desired task.

     <br /><br /><strong><em style="color:#E5E5E5;">To gain more information on the train data percentage after this 
     tour click the infographic tooltip icon on the right!</em></strong> </p>`,
    params: {
      placement: "left",
      highlight: true,
    },
  },
  {
    target: "#v-step-3",
    header: {
      title: "<strong>Normalization</strong>",
    },
    content: `<p align='left'>Normalizatiobn refers to the process of transforming or changing the columns in a dataset 
     to a common scale. It generally involves adjusting the scale of values to a similar metric or adjusting
     the time scales to be able to compare like periods 
     
     <br /><br /><strong><em style="color:#E5E5E5;">To gain more information on 
     normalization after this tour click the infographic tooltip icon on the right!</em></strong> </p>`,
    params: {
      placement: "left",
      highlight: true,
    },
  },
  {
    target: "#v-step-4",
    header: {
      title: "<strong>Next Step</strong>",
    },
    content: `<p align='left'>Assuming that you have finished customizing the dataset it is now time to move to the 
      next step of the process, <strong>Feature Extraction</strong> `,
    params: {
      placement: "left",
      highlight: true,
    },
  },
];

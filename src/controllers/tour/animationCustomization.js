export const modelTour = [
  {
    target: "#v-step-0",
    header: {
      title: "<strong>Customize Model Parameters</strong>",
    },
    content: `<p align='left'>The customization of model parameters involves the editing of different model attributes
     for the neural network. It includes customizing the batch size of the model, the learning algorithm,
     the number of epochs used, the model loss function and its optimization algorith. </p>`,
    params: {
      placement: "left",
      highlight: true,
    },
  },
  {
    target: "#v-step-1",
    header: {
      title: "<strong>Batch Size</strong>",
    },
    content: `<p align='left'> The term batch size refers to as the number of training examples used in a single iteration. 
     It controls the number of training samples that are worked through before updating the internal 
     parameters of the model.<br />For the purpose of this tool the the batch mode used is mini-batch.
     <strong><em>Mini-Batch Processing</em></strong> splits the training dataset into small 
     batches that are used to calculate model error and update model coefficients.

     <br /><br /><strong><em style="color:#E5E5E5;">To gain more information on batch size after this 
     tour click the infographic tooltip icon on the right!</em></strong> </p>`,
    params: {
      placement: "left",
      highlight: true,
    },
  },
  {
    target: "#v-step-2",
    header: {
      title: "<strong>Epochs</strong>",
    },
    content: `<p align='left'> Epochs refers to the number of passes a machine learning algorithm has finished 
     in an entire training dataset. Typically th number of epochs is large, often hundreds (100s) or thousands (1000s). This
     allows the learning algorithm to run until the error from the model has been sufficiently minimized. 

     <br /><br /><strong><em style="color:#E5E5E5;">To gain more information on epochs after this tour
      click the infographic tooltip icon on the right!</em></strong> </p>`,
    params: {
      placement: "left",
      highlight: true,
    },
  },
  {
    target: "#v-step-3",
    header: {
      title: "<strong>Learning Rate</strong>",
    },
    content: `<p align='left'> The learning rate of a neural network is the rate that controls the amount of 
     change to the model in response to the estimated error each time the model weights are updated. Typically
     the learning rate of a neural network model is small positive value, often in the range between 0.0 and 1.0.

     <br /><br /><strong><em style="color:#E5E5E5;">To gain more information on network learning rate after this tour
      click the infographic tooltip icon on the right!</em></strong> </p>`,
    params: {
      placement: "left",
      highlight: true,
    },
  },
  {
    target: "#v-step-4",
    header: {
      title: "<strong>Loss Function</strong>",
    },
    content: `<p align='left'> A Loss Function is the method by which a specific algorithm is observed to 
    measure how well it models the given data. The loss function typically measures how far an estimated 
    value is from its true value in order to gradually reduce the error in predictions. There are basic types
    of loss functions: <br /> 1. Binary Cross Entropy <br /> 2. Mean Squared Error <br /> For the purpose of this
    application <strong>Mean Squared Error</strong> will be used.


     <br /><br /><strong><em style="color:#E5E5E5;">To gain more information on loss functions after this tour
      click the infographic tooltip icon on the right!</em></strong> </p>`,
    params: {
      placement: "left",
      highlight: true,
    },
  },
  {
    target: "#v-step-5",
    header: {
      title: "<strong>Optimization Algorithm</strong>",
    },
    content: `<p align='left'> An optimization algorithm is a process that compares numerous solutions iteratively 
     until an ideal solution is identified. It is referred to as a  collection of mathematical techniques used 
     for machine learning to discover the best possible option given the limitations. For the purpose of this
     application the optimization algoritm that will be used is <strong>Stochrastic Gradient Descent.</strong> 

     <br /><br /><strong><em style="color:#E5E5E5;">To gain more information on optimization algorithms after this tour
      click the infographic tooltip icon on the right!</em></strong> </p>`,
    params: {
      placement: "left",
      highlight: true,
    },
  },
  {
    target: "#v-step-6",
    content: `<strong>Hooray!, now that you've learnt how to customize the parameters, here comes the fun part ! 
    <br /> <br /> Let's start the simulation and observe the changes in the Neural Network</strong> !`,
    params: {
      placement: "left",
      highlight: true,
    },
  },
];

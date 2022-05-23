import {
  getHeartPredictionData,
  getHousePredictionData,
  getIrisPredictionData,
} from "@/controllers/dataControllers/dataset.controller";

import Heart from "@/assets/icons/heart.svg";
import Flower from "@/assets/icons/flower.svg";
import House from "@/assets/icons/house.svg";

const housePredictionData = {
  title: "House Price Prediction",
  description: `By analyzing and observing the real estate markets within the Sydney and Melbourne region, 
  we are better able to predict the trajectory of property prices to indicate the economic health of one’s 
  country as well as its overall market condition. By using the data provided in Kaggle,an online community 
  of data scientists and machine learning practitioners, we are using a wide range of property sales records
  in an unknown format with unknown data quality issues in order to clean the data and use it to make 
  predictions. `,
  summary: `Predict the value of a house based on various key attributes about the house!`,
  problemType: "Mutiple Regression",
  image: House,
  name: "house_price",
};

const heartDiseaseData = {
  title: "Heart Disease",
  description: ` The Heart Disease Prediction, uses data that classifies whether or not an individual has heart
   disease based on the features presented in the data. Through the use of clinical parameters, we attempt 
   to predict if a patient has this disease or not through the use of logistic regression 
   also known as classification.`,
  summary: `Predict how likely someone is to recieve a heart attack given various factors!`,
  problemType: "Binary Classification",
  image: Heart,
  name: "heart_disease",
};

const irisPredictionData = {
  title: "Iris Prediction",
  description: ` The Iris prediction begins with the importing of preloaded datasets in order to gain 
  information on the features and statistics of the Iris species. The data is then categorized into a 
  dictionary which is then placed into data frames for ease of use and visibility. With the data being 
  categorized into four features which are the length and width of both the sepals and petals of the Iris,
  we are better able to understand the data presented. This step allows us to see the features and class 
  determination of the flowers together so that we can begin to clean our data and analyze the 
  relationships between features and target variables. As such, having cleaned and explored the data, 
  we are better able to make accurate predictions on the Iris dataset.`,
  summary: `Iris Prediction involves predicting variations in iris petals and sepals. `,
  problemType: "Multivariate Classification",
  image: Flower,
  name: "iris",
  data: getIrisPredictionData(),
};

export { housePredictionData, irisPredictionData, heartDiseaseData };

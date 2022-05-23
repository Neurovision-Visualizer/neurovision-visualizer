import axios from "axios";

export default axios.create({
  baseURL: process.env.NEUROVISION_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

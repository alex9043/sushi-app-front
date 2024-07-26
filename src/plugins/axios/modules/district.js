import axios from "@/plugins/axios/axios.js";

export const getDistricts = () => {
  return axios.get("/districts");
};

import axios from "@/plugins/axios/axios.js";

export const register = (payload) => {
  return axios.post("/auth/sign-up", payload);
};

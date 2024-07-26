import axios from "@/plugins/axios/axios.js";

export const register = (payload) => {
  return axios.post("/auth/sign-up", payload);
};

export const login = (payload) => {
  return axios.post("/auth/sign-in", payload);
};

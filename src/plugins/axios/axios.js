import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(
        `Error: ${error.response.status} - ${error.response.statusText}`
      );
    }
    return Promise.reject(error);
  }
);

export default axios;

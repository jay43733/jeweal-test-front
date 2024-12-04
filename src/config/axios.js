import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error("AXIOS Request Error:", error);
    return Promise.reject(error);
  }
);

export default axios;

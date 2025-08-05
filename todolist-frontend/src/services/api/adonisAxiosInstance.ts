import axios from "axios";
import { API_URL_ADONIS } from "../../constants";

const apiClient = axios.create({
  baseURL: API_URL_ADONIS,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default apiClient;

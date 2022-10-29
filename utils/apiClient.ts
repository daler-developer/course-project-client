import axios, { AxiosError } from "axios";
import { AxiosErrorResponseType } from "../types";

const apiClient = axios.create();

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers!["Authorization"] = "Bearer " + token;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (e: AxiosError) => {
    const status = e.response!.status;

    if (status === 401) {
      localStorage.removeItem("accessToken");
      window.location.replace("/login");

      return;
    }

    throw e;
  }
);

export default apiClient;

import axios from "axios";
import { AxiosErrorResponseType } from "../types";

const apiClient = axios.create();

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers!["Authorization"] = "Bearer " + token;
  }

  return config;
});

// apiClient.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (e: AxiosErrorResponseType) => {
//     const status = e.status;

//     if (status === "401") {
//       localStorage.removeItem("auth-token");
//       window.location.replace("/login");
//     }

//     throw e;
//   }
// );

export default apiClient;

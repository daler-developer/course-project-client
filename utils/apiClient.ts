import axios from "axios";

console.log(process.env.NODE_ENV);

const apiClient = axios.create({
  ...(process.env.NODE_ENV === "production" && {
    baseURL: "https://daler-course-project-server.herokuapp.com",
  }),
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers!["Authorization"] = "Bearer " + token;
  }

  return config;
});

export default apiClient;

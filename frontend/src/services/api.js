import Axios from "axios";

export const clientApi = Axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 5000,
});

// request interceptors

clientApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

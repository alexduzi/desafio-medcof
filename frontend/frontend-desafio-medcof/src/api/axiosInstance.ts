import axios from "axios";
import { BACKEND_BASE_URL } from "../constants";

// Create an Axios instance with default options
const axiosInstance = axios.create({
  baseURL: BACKEND_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  if (config.baseURL?.includes('login') || config.baseURL?.includes('register')) return config;
  
  const token = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") as string).accessToken
    : null;

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
import { useAuthStore } from "@/store/useAuthStore";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const API = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response) {
      console.error("Response error:", error.response.data);

      if (error.response.status === 401) {
        await useAuthStore.getState().logout();
      }
    } else if (error.request) {
      console.error("Request error: No response received");
    } else {
      console.error("Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default API;

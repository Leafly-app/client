import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/store/useAuthStore";

const API = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
  timeout: 20000,
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
  (error: AxiosError) => Promise.reject(error),
);

API.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response) {
      const isAuthRequest =
        error.config?.url?.includes("/signin") || error.config?.url?.includes("/signup");

      if (error.response.status === 401 && !isAuthRequest) {
        await useAuthStore.getState().logout();
      }
    }

    return Promise.reject(error);
  },
);

export default API;

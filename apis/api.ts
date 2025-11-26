import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import { Alert } from "react-native";
import { router } from "expo-router";

const API = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token;

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
        const errorMessage =
          (error.response.data as any)?.message || "토큰이 만료되었습니다. 다시 로그인해주세요.";

        await useAuthStore.getState().logout();

        Alert.alert(
          "인증 만료",
          errorMessage,
          [
            {
              text: "확인",
              onPress: () => {
                router.replace("/");
              },
            },
          ],
          { cancelable: false },
        );
      }
    }

    return Promise.reject(error);
  },
);

export default API;

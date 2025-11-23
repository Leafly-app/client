import { router } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";
import { login } from "@/apis/auth";
import type { LoginFormData } from "@/schemas/auth";
import { useAuthStore } from "@/store/useAuthStore";
import { getUserFromToken } from "@/utils/jwt";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const loginAction = useAuthStore((state) => state.login);

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await login(data);

      if (response.isSuccess && response.data.token) {
        const user = getUserFromToken(response.data.token);

        if (!user) {
          Alert.alert("로그인 실패", "사용자 정보를 불러올 수 없습니다.");
          return false;
        }

        await loginAction(user, response.data.token);
        router.replace("/(tabs)/explore");
        return true;
      }

      Alert.alert("로그인 실패", response.message);
      return false;
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        "로그인 중 오류가 발생했습니다.";
      Alert.alert("로그인 실패", errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleLogin,
    isLoading,
  };
};

import { login } from "@/apis/auth";
import type { LoginFormData } from "@/schemas/auth";
import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";
import { Alert } from "react-native";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const loginAction = useAuthStore((state) => state.login);

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await login(data);

      if (response.isSuccess) {
        await loginAction(
          response.data.user,
          response.data.accessToken,
          response.data.refreshToken
        );
        return true;
      }

      Alert.alert("로그인 실패", response.message);
      return false;
    } catch (error: any) {
      Alert.alert("오류", error?.response?.data?.message || "로그인 중 오류가 발생했습니다.");
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

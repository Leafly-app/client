import { login, signup } from "@/apis/auth";
import type { SignupFormData } from "@/schemas/auth";
import { useAuthStore } from "@/store/useAuthStore";
import { getUserFromToken } from "@/utils/jwt";
import { useState } from "react";
import { Alert } from "react-native";

export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const loginAction = useAuthStore((state) => state.login);

  const handleSignup = async (data: SignupFormData) => {
    setIsLoading(true);
    try {
      const signupResponse = await signup(data);

      if (!signupResponse.isSuccess) {
        Alert.alert("회원가입 실패", signupResponse.message);
        return false;
      }

      const loginResponse = await login({
        email: data.email,
        password: data.password,
      });

      if (loginResponse.isSuccess && loginResponse.data.token) {
        const user = getUserFromToken(loginResponse.data.token);

        if (!user) {
          Alert.alert("로그인 실패", "사용자 정보를 불러올 수 없습니다.");
          return false;
        }

        await loginAction(user, loginResponse.data.token);
        return true;
      }

      Alert.alert("로그인 실패", loginResponse.message);
      return false;
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        "회원가입 중 오류가 발생했습니다.";
      Alert.alert("회원가입 실패", errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleSignup,
    isLoading,
  };
};

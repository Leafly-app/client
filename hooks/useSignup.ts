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

      try {
        const loginResponse = await login({
          email: data.email,
          password: data.password,
        });

        if (!loginResponse.isSuccess) {
          Alert.alert(
            "로그인 실패",
            "회원가입은 완료되었으나 자동 로그인에 실패했습니다. 다시 로그인해주세요.",
          );
          return false;
        }

        if (!loginResponse.data.token) {
          Alert.alert("로그인 실패", "인증 토큰을 받아올 수 없습니다.");
          return false;
        }

        const user = getUserFromToken(loginResponse.data.token);

        if (!user) {
          Alert.alert("로그인 실패", "사용자 정보를 불러올 수 없습니다.");
          return false;
        }

        await loginAction(user, loginResponse.data.token);
        return true;
      } catch (loginError: unknown) {
        const loginErrorMessage =
          (loginError as { response?: { data?: { message?: string } } })?.response?.data?.message ||
          "자동 로그인 중 오류가 발생했습니다.";
        Alert.alert(
          "로그인 실패",
          `회원가입은 완료되었으나 ${loginErrorMessage}\n다시 로그인해주세요.`,
        );
        return false;
      }
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

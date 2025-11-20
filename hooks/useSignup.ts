import { signup } from "@/apis/auth";
import type { SignupFormData } from "@/schemas/auth";
import { useState } from "react";
import { Alert } from "react-native";

export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (data: SignupFormData) => {
    setIsLoading(true);
    try {
      const response = await signup(data);

      if (response.isSuccess) {
        Alert.alert("회원가입 성공", "로그인 페이지로 이동합니다.", [{ text: "확인" }]);
        return true;
      }

      Alert.alert("회원가입 실패", response.message);
      return false;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "회원가입 중 오류가 발생했습니다.";
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

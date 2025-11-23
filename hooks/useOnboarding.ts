import { submitOnboarding } from "@/apis/auth";
import type { OnboardingRequest } from "@/types/onboarding";
import { router } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

export const useOnboarding = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: OnboardingRequest) => {
    setIsLoading(true);
    try {
      const response = await submitOnboarding(data);

      if (!response.isSuccess) {
        Alert.alert("온보딩 실패", response.message || "온보딩 처리에 실패했습니다.");
        return false;
      }

      router.replace("/(tabs)");
      return true;
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        "온보딩 중 오류가 발생했습니다.";
      Alert.alert("온보딩 실패", errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleSubmit,
    isLoading,
  };
};

import type { ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ProgressBar } from "./ProgressBar";

interface OnboardingLayoutProps {
  currentStep: number;
  totalSteps: number;
  title: string;
  description: string;
  children: ReactNode;
  onNext: () => void;
  onBack?: () => void;
  isLastStep?: boolean;
  isNextDisabled?: boolean;
  isLoading?: boolean;
}

export function OnboardingLayout({
  currentStep,
  totalSteps,
  title,
  description,
  children,
  onNext,
  onBack,
  isLastStep = false,
  isNextDisabled = false,
  isLoading = false,
}: OnboardingLayoutProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-1 bg-white"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <View className="flex-1 px-6">
        {onBack && (
          <View className="pt-4 pb-4">
            <TouchableOpacity onPress={onBack} className="w-8 h-8">
              <Text className="text-heading-24-regular text-gray-800">&lt;</Text>
            </TouchableOpacity>
          </View>
        )}

        <View className={onBack ? "pb-8" : "pt-8 pb-8"}>
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        </View>

        <Text className="text-heading-24-bold mb-2">{title}</Text>

        <Text className="text-body-12-regular text-gray-600 mb-8">{description}</Text>

        <View className="flex-1">{children}</View>

        <View className="pb-6">
          <TouchableOpacity
            className={`py-4 rounded-lg items-center justify-center ${
              isNextDisabled || isLoading ? "bg-gray-300" : "bg-primary-600"
            }`}
            onPress={onNext}
            disabled={isNextDisabled || isLoading}
            activeOpacity={0.8}
          >
            {isLoading ? (
              <Text className="text-body-16-semibold text-gray-500">로딩 중...</Text>
            ) : (
              <Text
                className={`text-body-16-semibold ${isNextDisabled ? "text-gray-500" : "text-white"}`}
              >
                {isLastStep ? "완료" : "다음"}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

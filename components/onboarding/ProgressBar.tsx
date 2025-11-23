import { View } from "react-native";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  return (
    <View className="w-full h-2 bg-gray-300 rounded-full overflow-hidden flex-row">
      <View className="h-full bg-primary-600" style={{ flex: currentStep }} />
      <View className="h-full bg-transparent" style={{ flex: totalSteps - currentStep }} />
    </View>
  );
}

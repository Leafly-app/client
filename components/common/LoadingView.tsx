import { colors } from "@/styles/colors";
import { ActivityIndicator, Text, View } from "react-native";

interface LoadingViewProps {
  message?: string;
}

export default function LoadingView({ message = "로딩 중..." }: LoadingViewProps) {
  return (
    <View className="flex-1 bg-gray-200 items-center justify-center">
      <ActivityIndicator size="large" color={colors.primary[600]} />
      <Text className="text-body-14-regular text-gray-500 mt-4">{message}</Text>
    </View>
  );
}

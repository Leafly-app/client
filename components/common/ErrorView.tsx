import { Text, View } from "react-native";

interface ErrorViewProps {
  message: string;
}

export default function ErrorView({ message }: ErrorViewProps) {
  return (
    <View className="flex-1 bg-gray-200 items-center justify-center">
      <Text className="text-body-14-regular text-gray-500">{message}</Text>
    </View>
  );
}

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { colors } from "@/styles/colors";

interface AuthHeaderProps {
  title: string;
}

export default function AuthHeader({ title }: AuthHeaderProps) {
  const router = useRouter();

  const handleBackPress = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(tabs)/explore");
    }
  };

  return (
    <View className="flex-row items-center justify-between mb-8">
      <TouchableOpacity onPress={handleBackPress} className="p-2">
        <Ionicons name="arrow-back" size={24} color={colors.gray[900]} />
      </TouchableOpacity>
      <Text className="text-2xl font-pretendard-bold">{title}</Text>
      <View className="w-8" />
    </View>
  );
}

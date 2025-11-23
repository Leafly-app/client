import { Ionicons } from "@expo/vector-icons";
import { Text, TextInput, type TextInputProps, View } from "react-native";
import { colors } from "@/styles/colors";

interface AuthInputProps extends TextInputProps {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  error?: string;
}

export default function AuthInput({ label, icon, error, ...props }: AuthInputProps) {
  return (
    <View className="w-full mb-4">
      <Text className="text-gray-700 text-sm font-pretendard-medium mb-2">{label}</Text>
      <View
        className={`flex-row items-center bg-gray-100 rounded-md p-3 border ${
          error ? "border-red-500" : "border-gray-200"
        }`}
      >
        {icon && <Ionicons name={icon} size={20} color={colors.gray[600]} className="mr-2" />}
        <TextInput
          className="flex-1 text-base font-pretendard-regular"
          placeholderTextColor={colors.gray[500]}
          {...props}
        />
      </View>
      {error && (
        <Text className="text-red-600 text-sm font-pretendard-regular mt-1">{error}</Text>
      )}
    </View>
  );
}

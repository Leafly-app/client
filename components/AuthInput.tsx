import React from "react";
import { TextInput, View, Text, TextInputProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface AuthInputProps extends TextInputProps {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  error?: string;
}

export default function AuthInput({ label, icon, error, ...props }: AuthInputProps) {
  return (
    <View className="w-full mb-4">
      <Text className="text-gray-700 text-base font-medium mb-2">{label}</Text>
      <View
        className={`flex-row items-center bg-gray-100 rounded-md p-3 border ${
          error ? "border-red-500" : "border-gray-200"
        }`}
      >
        {icon && <Ionicons name={icon} size={20} color="gray" className="mr-2" />}
        <TextInput
          className="flex-1 text-base"
          placeholderTextColor="#A0A0A0"
          {...props}
        />
      </View>
      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
    </View>
  );
}

import GoBackIcon from "@/assets/images/goback.svg";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface HeaderProps {
  title: string;
  onBackPress: () => void;
}

export default function Header({ title, onBackPress }: HeaderProps) {
  return (
    <View className="flex-row items-center justify-center px-5 py-3 bg-white border-b border-gray-200">
      <TouchableOpacity activeOpacity={0.7} onPress={onBackPress} className="absolute left-5">
        <GoBackIcon width={24} height={24} fill="#000000" />
      </TouchableOpacity>
      <Text className="text-heading-20-bold text-gray-900">{title}</Text>
    </View>
  );
}

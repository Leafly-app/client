import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Scan() {
  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center">
      <Text className="text-lg text-gray-600">스캔 화면</Text>
    </SafeAreaView>
  );
}

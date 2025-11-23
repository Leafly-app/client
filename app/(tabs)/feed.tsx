import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FeedScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center">
        <Text className="text-heading-20-bold text-gray-900">피드</Text>
        <Text className="text-body-14-regular text-gray-500 mt-2">피드 화면</Text>
      </View>
    </SafeAreaView>
  );
}

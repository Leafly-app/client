import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const QuickActions = React.memo(() => {
  const router = useRouter();

  return (
    <View className="flex-row px-5 mt-6 gap-3">
      <TouchableOpacity
        activeOpacity={0.7}
        className="bg-white border border-gray-300 rounded-xl items-center justify-center"
        style={{ elevation: 1, width: 176, height: 60, paddingVertical: 12, paddingHorizontal: 20 }}
        onPress={() => router.push("/(tabs)/scan")}
      >
        <Text className="text-body-14-bold text-gray-800">ISBN 스캔</Text>
        <Text className="text-body-10-regular text-gray-500 mt-1">빠른 등록</Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.7}
        className="bg-white border border-gray-300 rounded-xl items-center justify-center"
        style={{ elevation: 1, width: 176, height: 60, paddingVertical: 12, paddingHorizontal: 20 }}
        onPress={() => router.push("/(tabs)/write")}
      >
        <Text className="text-body-14-bold text-gray-800">독후감 작성</Text>
        <Text className="text-body-10-regular text-gray-500 mt-1">감상 기록하기</Text>
      </TouchableOpacity>
    </View>
  );
});

QuickActions.displayName = "QuickActions";

export default QuickActions;

import React from "react";
import { Text, View } from "react-native";

const HomeBanner = React.memo(() => {
  return (
    <View className="mx-5 mt-2">
      <View className="bg-gray-200 rounded-2xl overflow-hidden" style={{ height: 320 }}>
        <View className="flex-1 items-center justify-center">
          <Text className="text-body-14-regular text-gray-500 mt-3">추천 도서 큐레이션</Text>
        </View>
      </View>
    </View>
  );
});

HomeBanner.displayName = "HomeBanner";

export default HomeBanner;

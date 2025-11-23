import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const TODAY_RECOMMENDATIONS = [
  { id: 1, title: "데미안", author: "헤르만 헤세" },
  { id: 2, title: "데미안", author: "헤르만 헤세" },
  { id: 3, title: "데미안", author: "헤르만 헤세" },
  { id: 4, title: "데미안", author: "헤르만 헤세" },
];

const TodayRecommendations = React.memo(() => {
  return (
    <View className="mt-10">
      <Text className="text-heading-20-bold text-gray-900 px-5 mb-4">오늘의 추천</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      >
        {TODAY_RECOMMENDATIONS.map((book) => (
          <TouchableOpacity
            key={book.id}
            activeOpacity={0.7}
            className="mr-4"
            style={{ width: 130 }}
          >
            <View
              className="bg-gray-300 rounded-lg overflow-hidden mb-3"
              style={{ width: 130, height: 180, elevation: 2 }}
            ></View>
            <Text className="text-body-14-semibold text-gray-900 mb-1" numberOfLines={1}>
              {book.title}
            </Text>
            <Text className="text-body-12-regular text-gray-600" numberOfLines={1}>
              {book.author}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
});

TodayRecommendations.displayName = "TodayRecommendations";

export default TodayRecommendations;

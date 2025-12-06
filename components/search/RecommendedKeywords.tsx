import { Text, TouchableOpacity, View } from "react-native";

interface RecommendedKeywordsProps {
  keywords: string[];
  onKeywordPress: (keyword: string) => void;
}

export function RecommendedKeywords({ keywords, onKeywordPress }: RecommendedKeywordsProps) {
  return (
    <View>
      <Text className="text-body-16-semibold text-gray-900 mb-2">추천 검색어</Text>
      <View className="flex-row flex-wrap gap-2">
        {keywords.map((keyword) => (
          <TouchableOpacity
            key={keyword}
            onPress={() => onKeywordPress(keyword)}
            className="bg-primary-100 rounded-full px-2 py-1"
          >
            <Text numberOfLines={1} className="text-body-12-regular text-gray-800">
              {keyword}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

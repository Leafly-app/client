import BookRecommendations from "@/components/book/BookRecommendations";
import IcRelation from "@/components/icons/IcRelation";
import { Text, View } from "react-native";

interface BookRecommendationsSectionProps {
  recommendations: {
    isbn: string;
    title: string;
    author: string;
    cover: string;
  }[];
  onBookPress: (isbn: string) => void;
}

export default function BookRecommendationsSection({
  recommendations,
  onBookPress,
}: BookRecommendationsSectionProps) {
  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <View>
      <View className="flex-row items-center gap-2 mb-3">
        <IcRelation width={16} height={16} stroke="#2563EB" />
        <Text className="text-body-14-semibold text-gray-900">이런 책은 어떠세요?</Text>
      </View>

      <BookRecommendations recommendations={recommendations} onBookPress={onBookPress} />
    </View>
  );
}

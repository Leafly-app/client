import { ScrollView, Text, View } from "react-native";
import BookCardV2 from "@/components/common/BookCardV2";

interface BookRecommendationsProps {
  recommendations: {
    isbn: string;
    title: string;
    author: string;
    cover: string;
  }[];
  onBookPress: (isbn: string) => void;
}

export default function BookRecommendations({
  recommendations,
  onBookPress,
}: BookRecommendationsProps) {
  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <View className="bg-white mx-4 mt-4 mb-4 rounded-xl p-4" style={{ elevation: 2 }}>
      <Text className="text-body-16-bold text-gray-900 mb-3">이런 책은 어떠세요?</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row gap-4">
          {recommendations.map((book) => (
            <BookCardV2
              key={book.isbn}
              title={book.title}
              author={book.author}
              cover={book.cover}
              onPress={() => onBookPress(book.isbn)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

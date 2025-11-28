import BookCardV2 from "@/components/common/BookCardV2";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, View } from "react-native";

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
    <LinearGradient
      colors={["#CFE8CA", "rgba(255, 255, 255, 0.00)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      className="rounded-lg py-4 overflow-hidden"
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12 }}
      >
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
    </LinearGradient>
  );
}

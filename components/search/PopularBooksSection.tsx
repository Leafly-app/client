import BookCarousel, { type Book as CarouselBook } from "@/components/common/BookCarousel";
import { Text, View } from "react-native";

interface PopularBooksSectionProps {
  books: CarouselBook[];
}

export function PopularBooksSection({ books }: PopularBooksSectionProps) {
  return (
    <View>
      <Text className="text-body-16-semibold text-gray-900 mb-2">인기 도서</Text>
      <BookCarousel books={books} />
    </View>
  );
}

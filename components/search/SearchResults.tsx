import BookCard from "@/components/common/BookCard";
import type { SearchBook } from "@/types/book";
import { ActivityIndicator, Text, View } from "react-native";

interface SearchResultsProps {
  books: SearchBook[];
  isLoading: boolean;
  onBookPress: (book: SearchBook) => void;
  onLikeToggle: (isbn: string, isLiked: boolean) => void;
}

export function SearchResults({ books, isLoading, onBookPress, onLikeToggle }: SearchResultsProps) {
  if (isLoading) {
    return (
      <View className="py-20 items-center justify-center">
        <ActivityIndicator size="large" color="#0BAE39" />
        <Text className="text-body-14-regular text-gray-500 mt-4">검색 중...</Text>
      </View>
    );
  }

  if (books.length === 0) {
    return null;
  }

  return (
    <View className="px-5 py-4">
      <Text className="text-body-14-semibold text-gray-900 mb-3">검색 결과 ({books.length})</Text>
      {books
        .filter((book) => book.isbn && book.isbn.trim() !== "")
        .map((book) => (
          <BookCard
            key={book.isbn}
            isbn={book.isbn}
            title={book.title || "제목 없음"}
            author={book.author || "저자 없음"}
            cover={book.cover}
            isLiked={book.isLiked}
            onPress={() => onBookPress(book)}
            onLikeToggle={onLikeToggle}
          />
        ))}
    </View>
  );
}

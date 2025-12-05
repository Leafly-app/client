import { SearchResultBookCard } from "@/components/search/SearchResultBookCard";
import type { SearchBook } from "@/types/book";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

interface SearchResultsListProps {
  books: SearchBook[];
  isLoading: boolean;
  mode?: string;
  onBookPress: (book: SearchBook) => void;
  onLikeToggle: (isbn: string, isLiked: boolean) => void;
}

export function SearchResultsList({
  books,
  isLoading,
  onBookPress,
  onLikeToggle,
}: SearchResultsListProps) {
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (books.length === 0) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-body-12-regular text-gray-700">해당 책이 없습니다.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={books}
      keyExtractor={(item) => item.isbn}
      renderItem={({ item }) => (
        <SearchResultBookCard
          book={item}
          onPress={() => onBookPress(item)}
          onLikeToggle={onLikeToggle}
        />
      )}
      contentContainerStyle={{
        padding: 20,
        gap: 12,
      }}
      showsVerticalScrollIndicator={false}
    />
  );
}

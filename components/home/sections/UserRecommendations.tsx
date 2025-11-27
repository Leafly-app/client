import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import BookCard from "@/components/common/BookCard";
import { useRecommendedBooks } from "@/hooks/useRecommendedBooks";
import { useLibraryUpdateStore } from "@/store/libraryUpdateStore";
import { colors } from "@/styles/colors";

const UserRecommendations = React.memo(() => {
  const router = useRouter();
  const { books, isLoading, updateBookLikeStatus } = useRecommendedBooks();
  const setNeedsUpdate = useLibraryUpdateStore((state) => state.setNeedsUpdate);

  const handleLikeToggle = (isbn: string, isLiked: boolean) => {
    updateBookLikeStatus(isbn, isLiked);
    setNeedsUpdate(true);
  };

  return (
    <View className="mt-10 px-5 pb-6">
      <Text className="text-heading-20-bold text-gray-900 mb-4">회원님을 위한 추천</Text>
      {isLoading ? (
        <View className="py-20 items-center justify-center">
          <ActivityIndicator size="large" color={colors.primary[600]} />
          <Text className="text-body-14-regular text-gray-500 mt-4">
            추천 도서를 가져오는 중...
          </Text>
        </View>
      ) : books.length > 0 ? (
        books.map((book, index) => (
          <BookCard
            key={`${book.isbn}-${index}`}
            isbn={book.isbn}
            title={book.title}
            author={book.author}
            cover={book.cover}
            reason={book.reason}
            isLiked={book.isLiked}
            rating={book.rating}
            showReason
            onPress={() => router.push(`/book/${book.isbn}`)}
            onLikeToggle={handleLikeToggle}
          />
        ))
      ) : (
        <View className="py-20 items-center justify-center">
          <Text className="text-body-14-regular text-gray-500">추천 도서가 없습니다.</Text>
        </View>
      )}
    </View>
  );
});

UserRecommendations.displayName = "UserRecommendations";

export default UserRecommendations;

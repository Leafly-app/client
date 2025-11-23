import BookCard from "@/components/home/BookCard";
import { useRecommendedBooks } from "@/hooks/useRecommendedBooks";
import { colors } from "@/styles/colors";
import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

const UserRecommendations = React.memo(() => {
  const router = useRouter();
  const { books, isLoading } = useRecommendedBooks();

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
        books.map((book) => (
          <BookCard
            key={book.isbn}
            title={book.title}
            author={book.author}
            cover={book.cover}
            reason={book.reason}
            isLiked={book.isLiked}
            showReason
            onPress={() => router.push(`/book/${book.isbn}`)}
            onLikePress={() => {}}
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

import BookActionButtons from "@/components/book/BookActionButtons";
import BookAISummaryCard from "@/components/book/BookAISummaryCard";
import BookDetailCard from "@/components/book/BookDetailCard";
import BookRecommendations from "@/components/book/BookRecommendations";
import Header from "@/components/common/Header";
import { useBookDetail } from "@/hooks/useBookDetail";
import { colors } from "@/styles/colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BookDetailScreen() {
  const router = useRouter();
  const { isbn } = useLocalSearchParams<{ isbn: string }>();
  const { bookData, isLoading } = useBookDetail(isbn || "");

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
        <Header title="도서 정보" onBackPress={() => router.back()} />
        <View className="flex-1 bg-gray-200 items-center justify-center">
          <ActivityIndicator size="large" color={colors.primary[600]} />
          <Text className="text-body-14-regular text-gray-500 mt-4">로딩 중...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!bookData) {
    return (
      <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
        <Header title="도서 정보" onBackPress={() => router.back()} />
        <View className="flex-1 bg-gray-200 items-center justify-center">
          <Text className="text-body-14-regular text-gray-500">책 정보를 불러올 수 없습니다.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const { bookDetail, aiSummary, aiTags, recommendations, isLiked } = bookData;
  const hasRecommendations = recommendations && recommendations.length > 0;

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <Header title="도서 정보" onBackPress={() => router.back()} />

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 bg-gray-200">
        <BookDetailCard bookDetail={bookDetail} />

        {aiSummary && <BookAISummaryCard aiSummary={aiSummary} aiTags={aiTags} />}

        <BookRecommendations
          recommendations={recommendations || []}
          onBookPress={(bookIsbn) => router.push(`/book/${bookIsbn}` as any)}
        />

        {hasRecommendations && (
          <View className="px-4 pb-6">
            <BookActionButtons
              isLiked={isLiked}
              onAddToLibrary={() => {}}
              onToggleLike={() => {}}
            />
          </View>
        )}
      </ScrollView>

      {!hasRecommendations && (
        <View className="px-4 pb-6 bg-gray-200">
          <BookActionButtons isLiked={isLiked} onAddToLibrary={() => {}} onToggleLike={() => {}} />
        </View>
      )}
    </SafeAreaView>
  );
}

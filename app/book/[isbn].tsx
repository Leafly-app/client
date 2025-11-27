import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BookActionButtons from "@/components/book/BookActionButtons";
import BookAISummaryCard from "@/components/book/BookAISummaryCard";
import BookDetailCard from "@/components/book/BookDetailCard";
import BookRecommendations from "@/components/book/BookRecommendations";
import Header from "@/components/common/Header";
import LibraryStatusBottomSheet from "@/components/common/LibraryStatusBottomSheet";
import { useAddToLibrary } from "@/hooks/useAddToLibrary";
import { useBookDetail } from "@/hooks/useBookDetail";
import { useToggleLike } from "@/hooks/useToggleLike";
import { useLibraryUpdateStore } from "@/store/libraryUpdateStore";
import { colors } from "@/styles/colors";
import type { LibraryStatus } from "@/types/library/library";

export default function BookDetailScreen() {
  const router = useRouter();
  const { isbn } = useLocalSearchParams<{ isbn: string }>();
  const { bookData, isLoading, updateIsLiked } = useBookDetail(isbn || "");
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const { addToLibrary } = useAddToLibrary();
  const { toggle: toggleLike } = useToggleLike();
  const setNeedsUpdate = useLibraryUpdateStore((state) => state.setNeedsUpdate);

  const handleAddToLibrary = () => {
    setBottomSheetVisible(true);
  };

  const handleStatusSelect = async (status: LibraryStatus) => {
    setBottomSheetVisible(false);

    if (!bookData) return;

    const result = await addToLibrary(isbn, {
      title: bookData.bookDetail.title,
      author: bookData.bookDetail.author,
      cover: bookData.bookDetail.cover,
      status,
    });

    if (result.success) {
      setNeedsUpdate(true);
    }
  };

  const handleToggleLike = async () => {
    if (!bookData) return;

    const previousIsLiked = bookData.isLiked;
    updateIsLiked(!previousIsLiked);

    const bookInfo = !previousIsLiked
      ? {
          title: bookData.bookDetail.title,
          author: bookData.bookDetail.author,
          cover: bookData.bookDetail.cover,
        }
      : null;

    const result = await toggleLike(isbn, bookInfo);

    if (result.success) {
      setNeedsUpdate(true);
    } else {
      updateIsLiked(previousIsLiked);
    }
  };

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
              onAddToLibrary={handleAddToLibrary}
              onToggleLike={handleToggleLike}
            />
          </View>
        )}
      </ScrollView>

      {!hasRecommendations && (
        <View className="px-4 pb-6 bg-gray-200">
          <BookActionButtons
            isLiked={isLiked}
            onAddToLibrary={handleAddToLibrary}
            onToggleLike={handleToggleLike}
          />
        </View>
      )}

      <LibraryStatusBottomSheet
        visible={bottomSheetVisible}
        onClose={() => setBottomSheetVisible(false)}
        onSelect={handleStatusSelect}
      />
    </SafeAreaView>
  );
}

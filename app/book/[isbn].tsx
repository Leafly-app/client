import BookActionButtons from "@/components/book/BookActionButtons";
import BookAISummarySection from "@/components/book/BookAISummarySection";
import BookDescriptionSection from "@/components/book/BookDescriptionSection";
import BookInfoSection from "@/components/book/BookInfoSection";
import BookRecommendationsSection from "@/components/book/BookRecommendationsSection";
import ErrorView from "@/components/common/ErrorView";
import Header from "@/components/common/Header";
import LibraryStatusBottomSheet from "@/components/common/LibraryStatusBottomSheet";
import LoadingView from "@/components/common/LoadingView";
import { useAddToLibrary } from "@/hooks/useAddToLibrary";
import { useBookDetail } from "@/hooks/useBookDetail";
import { useToggleLike } from "@/hooks/useToggleLike";
import { useLibraryUpdateStore } from "@/store/libraryUpdateStore";
import type { LibraryStatus } from "@/types/library/library";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { ImageBackground, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BookDetailScreen() {
  const router = useRouter();
  const { isbn } = useLocalSearchParams<{ isbn: string }>();
  const { bookData, isLoading, updateIsLiked } = useBookDetail(isbn || "");
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const { addToLibrary } = useAddToLibrary();
  const { toggle: toggleLike } = useToggleLike();
  const setNeedsUpdate = useLibraryUpdateStore((state) => state.setNeedsUpdate);

  const handleAddToLibrary = useCallback(() => {
    setBottomSheetVisible(true);
  }, []);

  const handleStatusSelect = useCallback(
    async (status: LibraryStatus) => {
      setBottomSheetVisible(false);
      if (!bookData) return;

      const result = await addToLibrary(isbn, {
        title: bookData.bookDetail.title,
        author: bookData.bookDetail.author,
        cover: bookData.bookDetail.cover,
        status,
      });

      if (result.success) setNeedsUpdate(true);
    },
    [bookData, isbn, addToLibrary, setNeedsUpdate],
  );

  const handleToggleLike = useCallback(async () => {
    if (!bookData) return;

    const previousIsLiked = bookData.isLiked;
    updateIsLiked(!previousIsLiked);

    const bookInfo = {
      title: bookData.bookDetail.title,
      author: bookData.bookDetail.author,
      cover: bookData.bookDetail.cover,
    };

    const result = await toggleLike(isbn, bookInfo);

    if (result.success) {
      setNeedsUpdate(true);
    } else {
      updateIsLiked(previousIsLiked);
    }
  }, [bookData, isbn, toggleLike, setNeedsUpdate, updateIsLiked]);

  const handleBackPress = useCallback(() => router.back(), [router]);

  if (isLoading || !bookData) {
    return (
      <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
        <Header
          state="default"
          hasBack
          hasSearch={false}
          titleType="text"
          title=""
          onBackPress={handleBackPress}
        />
        {isLoading ? <LoadingView /> : <ErrorView message="책 정보를 불러올 수 없습니다." />}
      </SafeAreaView>
    );
  }

  const { bookDetail, aiSummary, aiTags, recommendations, isLiked } = bookData;
  const hasRecommendations = recommendations && recommendations.length > 0;

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <Header
        state="default"
        hasBack
        hasSearch={false}
        titleType="text"
        title={bookDetail.title}
        onBackPress={handleBackPress}
      />

      <ImageBackground
        source={require("@/assets/images/bg_leaf.png")}
        resizeMode="cover"
        className="flex-1"
      >
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          <View className="pt-3 px-4 gap-5">
            <BookInfoSection
              cover={bookDetail.cover}
              title={bookDetail.title}
              author={bookDetail.author}
              publisher={bookDetail.publisher}
              pubDate={bookDetail.pubDate}
            />

            {aiSummary && <BookAISummarySection summary={aiSummary} tags={aiTags} />}

            {bookDetail.description && (
              <BookDescriptionSection description={bookDetail.description} />
            )}

            {hasRecommendations && (
              <BookRecommendationsSection
                recommendations={recommendations || []}
                onBookPress={(bookIsbn) => router.push(`/book/${bookIsbn}`)}
              />
            )}
          </View>
        </ScrollView>
      </ImageBackground>

      <BookActionButtons
        isLiked={isLiked}
        onAddToLibrary={handleAddToLibrary}
        onToggleLike={handleToggleLike}
      />

      <LibraryStatusBottomSheet
        visible={bottomSheetVisible}
        onClose={() => setBottomSheetVisible(false)}
        onSelect={handleStatusSelect}
      />
    </SafeAreaView>
  );
}

import FeedStats from "@/components/feed/FeedStats";
import ReviewGrid from "@/components/feed/ReviewGrid";
import { IcFilter } from "@/components/icons";
import ScreenLayout from "@/components/layouts/ScreenLayout";
import {
  DEFAULT_FEED_RATING_OPTIONS,
  FilterBottomSheet,
} from "@/components/search/FilterBottomSheet";
import { useReviewList } from "@/hooks/useReviewList";
import { colors } from "@/styles/colors";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { ActivityIndicator, Dimensions, Text, View } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = (SCREEN_WIDTH - 32 - 16) / 3;

export default function FeedScreen() {
  const router = useRouter();
  const { reviews, isLoading, error } = useReviewList();
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const filteredReviews = useMemo(() => {
    if (selectedRating !== null) {
      return reviews.filter((review) => review.rating === selectedRating);
    }
    return reviews;
  }, [reviews, selectedRating]);

  const handleReviewPress = (reviewId: number) => {
    router.push(`/review/${reviewId}` as any);
  };

  const handleFilterPress = () => {
    setShowFilterSheet(true);
  };

  const handleFilterApply = (_categories: string[], rating: number | null) => {
    setSelectedRating(rating);
  };

  const currentAverage =
    filteredReviews.length > 0
      ? filteredReviews.reduce((sum, r) => sum + r.rating, 0) / filteredReviews.length
      : 0;

  return (
    <ScreenLayout
      enableStickyHeader
      headerConfig={{
        hasSearch: true,
        titleType: "logo",
        searchIcon: <IcFilter width={24} height={24} />,
        isFilterActive: selectedRating !== null,
        onSearchPress: handleFilterPress,
      }}
    >
      {isLoading ? (
        <View className="py-20 items-center justify-center">
          <ActivityIndicator size="large" color={colors.primary[600]} />
          <Text className="text-body-14-regular text-gray-500 mt-4">독후감을 불러오는 중...</Text>
        </View>
      ) : error ? (
        <View className="py-20 items-center justify-center">
          <Text className="text-body-14-regular text-gray-500">{error}</Text>
        </View>
      ) : filteredReviews.length > 0 ? (
        <>
          <FeedStats reviewCount={filteredReviews.length} averageRating={currentAverage} />
          <ReviewGrid
            reviews={filteredReviews}
            cardWidth={CARD_WIDTH}
            onReviewPress={handleReviewPress}
          />
        </>
      ) : (
        <View className="py-20 items-center justify-center">
          <Text className="text-body-14-regular text-gray-500">독후감이 없습니다.</Text>
        </View>
      )}

      <FilterBottomSheet
        visible={showFilterSheet}
        onClose={() => setShowFilterSheet(false)}
        onApply={handleFilterApply}
        initialCategories={[]}
        initialRating={selectedRating}
        ratingOptions={DEFAULT_FEED_RATING_OPTIONS}
      />
    </ScreenLayout>
  );
}

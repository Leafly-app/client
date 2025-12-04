import FeedStats from "@/components/feed/FeedStats";
import ReviewGrid from "@/components/feed/ReviewGrid";
import { type SortOption } from "@/components/feed/SortDropdown";
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
  const [selectedSort, setSelectedSort] = useState<SortOption>("latest");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const filteredAndSortedReviews = useMemo(() => {
    let filtered = [...reviews];

    if (selectedRating !== null) {
      filtered = filtered.filter((review) => review.rating === selectedRating);
    }

    switch (selectedSort) {
      case "latest":
        return filtered.sort(
          (a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime(),
        );
      case "oldest":
        return filtered.sort(
          (a, b) => new Date(a.createAt).getTime() - new Date(b.createAt).getTime(),
        );
      case "highRating":
        return filtered.sort((a, b) => b.rating - a.rating);
      case "lowRating":
        return filtered.sort((a, b) => a.rating - b.rating);
      default:
        return filtered;
    }
  }, [reviews, selectedSort, selectedRating]);

  const handleReviewPress = (reviewId: number) => {
    router.push(`/review/${reviewId}` as any);
  };

  const handleFilterPress = () => {
    setShowFilterSheet(true);
  };

  const handleFilterApply = (_categories: string[], rating: number | null) => {
    setSelectedRating(rating);
  };

  const averageRating =
    reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;

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
      ) : filteredAndSortedReviews.length > 0 ? (
        <>
          <FeedStats reviewCount={filteredAndSortedReviews.length} averageRating={averageRating} />
          <ReviewGrid
            reviews={filteredAndSortedReviews}
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

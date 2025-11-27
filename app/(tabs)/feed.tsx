import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { ActivityIndicator, Dimensions, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FilterSection from "@/components/feed/FilterSection";
import ReviewGrid from "@/components/feed/ReviewGrid";
import SortDropdown, { type SortOption } from "@/components/feed/SortDropdown";
import HomeHeader from "@/components/home/sections/HomeHeader";
import { useReviewList } from "@/hooks/useReviewList";
import { colors } from "@/styles/colors";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = (SCREEN_WIDTH - 40 - 32) / 3;

export default function FeedScreen() {
  const router = useRouter();
  const { reviews, count, isLoading, error } = useReviewList();
  const [selectedSort, setSelectedSort] = useState<SortOption>("latest");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const sortedReviews = useMemo(() => {
    const sorted = [...reviews];
    switch (selectedSort) {
      case "latest":
        return sorted.sort(
          (a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime(),
        );
      case "oldest":
        return sorted.sort(
          (a, b) => new Date(a.createAt).getTime() - new Date(b.createAt).getTime(),
        );
      case "highRating":
        return sorted.sort((a, b) => b.rating - a.rating);
      case "lowRating":
        return sorted.sort((a, b) => a.rating - b.rating);
      default:
        return sorted;
    }
  }, [reviews, selectedSort]);

  const handleReviewPress = (reviewId: number) => {
    router.push(`/review/${reviewId}` as any);
  };

  const handleFilterPress = () => {};

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <HomeHeader />

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <FilterSection onFilterPress={handleFilterPress} />

        <View className="flex-row items-center justify-between px-5 py-3">
          <Text className="text-body-14-regular text-gray-700">
            총 <Text className="text-body-14-bold text-primary-600">{count}</Text>권
          </Text>
          <SortDropdown
            selectedSort={selectedSort}
            onSortChange={setSelectedSort}
            showDropdown={showSortDropdown}
            onToggleDropdown={() => setShowSortDropdown(!showSortDropdown)}
          />
        </View>

        {isLoading ? (
          <View className="py-20 items-center justify-center">
            <ActivityIndicator size="large" color={colors.primary[600]} />
            <Text className="text-body-14-regular text-gray-500 mt-4">독후감을 불러오는 중...</Text>
          </View>
        ) : error ? (
          <View className="py-20 items-center justify-center">
            <Text className="text-body-14-regular text-gray-500">{error}</Text>
          </View>
        ) : sortedReviews.length > 0 ? (
          <ReviewGrid
            reviews={sortedReviews}
            cardWidth={CARD_WIDTH}
            onReviewPress={handleReviewPress}
          />
        ) : (
          <View className="py-20 items-center justify-center">
            <Text className="text-body-14-regular text-gray-500">독후감이 없습니다.</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

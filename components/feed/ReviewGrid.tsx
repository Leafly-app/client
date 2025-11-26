import BookCardV2 from "@/components/home/BookCardV2";
import type { Review } from "@/types/review";
import { formatDate } from "@/utils/formatDate";
import React from "react";
import { FlatList, View } from "react-native";

interface ReviewGridProps {
  reviews: Review[];
  cardWidth: number;
  onReviewPress: (reviewId: number) => void;
}

const ReviewGrid = React.memo<ReviewGridProps>(({ reviews, cardWidth, onReviewPress }) => {
  return (
    <View className="px-5 pb-6">
      <FlatList
        data={reviews}
        keyExtractor={(item) => `review-${item.reviewId}`}
        numColumns={3}
        scrollEnabled={false}
        columnWrapperStyle={{ gap: 16, marginBottom: 20 }}
        renderItem={({ item }) => (
          <BookCardV2
            title={item.title}
            cover={item.thumbnail}
            width={cardWidth}
            rating={item.rating}
            date={formatDate(item.createAt)}
            onPress={() => onReviewPress(item.reviewId)}
          />
        )}
      />
    </View>
  );
});

ReviewGrid.displayName = "ReviewGrid";

export default ReviewGrid;

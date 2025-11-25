import StarOffIcon from "@/assets/images/review/review_star_off.svg";
import StarOnIcon from "@/assets/images/review/review_star_on.svg";
import React from "react";
import { TouchableOpacity, View } from "react-native";

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  size?: number;
}

const StarRating = React.memo<StarRatingProps>(({ rating, onRatingChange, size = 24 }) => {
  return (
    <View className="flex-row items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity
          key={star}
          activeOpacity={0.7}
          onPress={() => onRatingChange(star)}
          className="mr-1"
        >
          {star <= rating ? (
            <StarOnIcon width={size} height={size} />
          ) : (
            <StarOffIcon width={size} height={size} />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
});

StarRating.displayName = "StarRating";

export default StarRating;

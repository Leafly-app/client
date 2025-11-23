import { colors } from "@/styles/colors";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";

interface BookCardProps {
  title: string;
  author: string;
  cover: string;
  reason?: string;
  isLiked: boolean;
  onPress?: () => void;
  onLikePress?: () => void;
  showReason?: boolean;
}

const BookCard = React.memo<BookCardProps>(function BookCard({
  title,
  author,
  cover,
  reason,
  isLiked,
  onPress,
  onLikePress,
  showReason = false,
}: BookCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className="flex-row bg-white rounded-xl p-4 mb-3 border border-gray-200"
      style={{ elevation: 1 }}
    >
      <View
        className="bg-gray-300 rounded-lg overflow-hidden mr-4"
        style={{ width: 85, height: 115 }}
      >
        {cover ? (
          <Image source={{ uri: cover }} className="w-full h-full" resizeMode="cover" />
        ) : (
          <View className="flex-1 items-center justify-center">
            <View className="w-10 h-12 bg-gray-500 rounded" />
          </View>
        )}
      </View>
      <View className="flex-1 justify-center pr-2">
        {showReason && reason ? (
          <Text className="text-body-12-regular text-gray-500 mb-2" numberOfLines={2}>
            {reason}
          </Text>
        ) : null}
        <Text className="text-body-14-bold text-gray-900 mb-1" numberOfLines={1}>
          {title}
        </Text>
        <Text className="text-body-12-regular text-gray-600" numberOfLines={1}>
          {author}
        </Text>
      </View>
      {onLikePress && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onLikePress}
          className="justify-center items-center pl-2"
        >
          <Svg width={26} height={26} viewBox="0 0 24 24" fill="none">
            <Path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill={isLiked ? colors.primary[600] : "none"}
              stroke={isLiked ? colors.primary[600] : colors.gray[400]}
              strokeWidth={2}
            />
          </Svg>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
});

export default BookCard;

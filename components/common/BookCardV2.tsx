import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Star from "@/assets/images/review/review_star_on.svg";
import { formatDate } from "@/utils/formatDate";

interface BookCardV2Props {
  title: string;
  author?: string;
  cover: string;
  onPress?: () => void;
  rating?: number;
  date?: string;
}

const BookCardV2 = React.memo<BookCardV2Props>(function BookCardV2({
  title,
  author,
  cover,
  onPress,
  rating,
  date,
}) {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={{ width: 80 }}>
      <View
        className="bg-gray-300 rounded overflow-hidden mb-1"
        style={{ width: 80, height: 115, aspectRatio: 16 / 23 }}
      >
        {cover ? (
          <Image source={{ uri: cover }} className="w-full h-full" resizeMode="cover" />
        ) : (
          <View className="flex-1 items-center justify-center">
            <View className="w-12 h-14 bg-gray-500 rounded" />
          </View>
        )}
      </View>
      <Text className="text-body-10-bold text-gray-900" numberOfLines={1}>
        {title}
      </Text>
      {rating !== undefined && date ? (
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-1">
            <Star width={10} height={10} />
            <Text className="text-body-8-regular text-gray-700">{rating}</Text>
          </View>
          <Text className="text-body-8-regular text-gray-700">{formatDate(date)}</Text>
        </View>
      ) : (
        <Text className="text-body-8-regular text-gray-700" numberOfLines={1}>
          {author}
        </Text>
      )}
    </TouchableOpacity>
  );
});

export default BookCardV2;

import { IcStarFilled } from "@/components/icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface BookCardV2Props {
  author: string;
  cover: string;
  onPress?: () => void;
  rating: number;
  date: string;
  width: number;
}

const BookCardV2 = React.memo<BookCardV2Props>(function BookCardV2({
  author,
  cover,
  onPress,
  rating,
  date,
  width,
}) {
  const imageHeight = (width * 153.67) / 115.0;

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={{ width }}>
      <View
        className="bg-gray-300 rounded overflow-hidden"
        style={{ width, height: imageHeight, aspectRatio: 115.0 / 153.67, marginBottom: 4 }}
      >
        {cover ? (
          <Image source={{ uri: cover }} className="w-full h-full" resizeMode="cover" />
        ) : (
          <View className="flex-1 items-center justify-center">
            <View className="w-12 h-14 bg-gray-500 rounded" />
          </View>
        )}
      </View>
      <Text
        className="text-body-10-bold text-gray-900"
        numberOfLines={1}
        style={{ marginBottom: 4 }}
      >
        {author}
      </Text>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center" style={{ gap: 2.04 }}>
          <IcStarFilled width={12} height={12} color="#FACC15" />
          <Text className="text-body-8-semibold" style={{ color: "#FACC15" }}>
            {rating}
          </Text>
        </View>
        <Text className="text-body-8-regular text-gray-700">{date}</Text>
      </View>
    </TouchableOpacity>
  );
});

export default BookCardV2;

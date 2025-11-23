import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface BookCardV2Props {
  title: string;
  author: string;
  cover: string;
  onPress?: () => void;
}

const BookCardV2 = React.memo<BookCardV2Props>(function BookCardV2({
  title,
  author,
  cover,
  onPress,
}) {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} className="mr-4" style={{ width: 130 }}>
      <View
        className="bg-gray-300 rounded-lg overflow-hidden mb-3"
        style={{ width: 130, height: 180 }}
      >
        {cover ? (
          <Image source={{ uri: cover }} className="w-full h-full" resizeMode="cover" />
        ) : (
          <View className="flex-1 items-center justify-center">
            <View className="w-12 h-14 bg-gray-500 rounded" />
          </View>
        )}
      </View>
      <Text className="text-body-14-semibold text-gray-900 mb-1" numberOfLines={1}>
        {title}
      </Text>
      <Text className="text-body-12-regular text-gray-600" numberOfLines={1}>
        {author}
      </Text>
    </TouchableOpacity>
  );
});

export default BookCardV2;

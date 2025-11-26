import React from "react";
import { Image, Text, View } from "react-native";

interface BookDetailCardProps {
  bookDetail: {
    title: string;
    author: string;
    publisher: string;
    pubDate: string;
    priceStandard?: number;
    isbn13: string;
    cover?: string;
    description?: string;
  };
}

export default function BookDetailCard({ bookDetail }: BookDetailCardProps) {
  return (
    <View className="bg-white mx-4 mt-4 rounded-xl p-4" style={{ elevation: 2 }}>
      <View className="flex-row">
        <View
          className="bg-gray-300 rounded-lg overflow-hidden mr-4"
          style={{ width: 96, height: 160 }}
        >
          {bookDetail.cover ? (
            <Image
              source={{ uri: bookDetail.cover }}
              className="w-full h-full"
              resizeMode="cover"
            />
          ) : (
            <View className="flex-1 items-center justify-center">
              <View className="w-12 h-16 bg-gray-500 rounded" />
            </View>
          )}
        </View>

        <View className="flex-1">
          <Text className="text-body-16-bold text-gray-900 mb-2" numberOfLines={2}>
            {bookDetail.title}
          </Text>
          <Text className="text-body-14-regular text-gray-600 mb-2">{bookDetail.author}</Text>
          <Text className="text-body-12-regular text-gray-500 mb-2">
            {bookDetail.publisher} | {bookDetail.pubDate}
          </Text>
          {bookDetail.priceStandard && (
            <Text className="text-body-14-semibold text-gray-900 mb-2">
              {bookDetail.priceStandard.toLocaleString()}원
            </Text>
          )}
          <Text className="text-body-12-regular text-gray-500">ISBN: {bookDetail.isbn13}</Text>
        </View>
      </View>

      {bookDetail.description && (
        <View className="mt-4 pt-4 border-t border-gray-200">
          <Text className="text-body-14-regular text-gray-700 leading-6">
            {bookDetail.description}
          </Text>
        </View>
      )}
    </View>
  );
}

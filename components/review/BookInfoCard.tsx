import StarRating from "@/components/common/StarRating";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface BookInfoCardProps {
  book: {
    title: string;
    author: string;
    cover: string;
    isbn: string;
    category: string;
  } | null;
  rating: number;
  onRatingChange: (rating: number) => void;
  onSelectBook?: () => void;
}

const BookInfoCard = React.memo<BookInfoCardProps>(
  ({ book, rating, onRatingChange, onSelectBook }) => {
    if (!book) {
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onSelectBook || (() => {})}
          className="bg-white mx-4 mt-4 rounded-xl p-6 items-center justify-center"
          style={{ elevation: 2, minHeight: 150 }}
        >
          <Text className="text-body-14-semibold text-gray-900 mb-1">책 선택하기</Text>
          <Text className="text-body-12-regular text-gray-500">
            독후감을 작성할 책을 검색해주세요
          </Text>
        </TouchableOpacity>
      );
    }

    return (
      <View className="bg-white mx-4 mt-4 rounded-xl p-4" style={{ elevation: 2 }}>
        <View className="flex-row">
          <View
            className="bg-gray-300 rounded-lg overflow-hidden mr-4"
            style={{ width: 85, height: 115 }}
          >
            {book.cover ? (
              <Image source={{ uri: book.cover }} className="w-full h-full" resizeMode="cover" />
            ) : (
              <View className="flex-1 items-center justify-center">
                <View className="w-10 h-12 bg-gray-500 rounded" />
              </View>
            )}
          </View>

          <View className="flex-1 justify-center">
            <Text className="text-body-16-bold text-gray-900 mb-2" numberOfLines={2}>
              {book.title}
            </Text>
            <Text className="text-body-14-regular text-gray-600 mb-3">{book.author}</Text>

            <StarRating rating={rating} onRatingChange={onRatingChange} />
          </View>
        </View>
      </View>
    );
  }
);

BookInfoCard.displayName = "BookInfoCard";

export default BookInfoCard;

import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GoBackIcon from "@/assets/images/goback.svg";
import HeartIcon from "@/assets/images/heart.svg";
import BookCardV2 from "@/components/home/BookCardV2";
import { useBookDetail } from "@/hooks/useBookDetail";
import { colors } from "@/styles/colors";

export default function BookDetailScreen() {
  const router = useRouter();
  const { isbn } = useLocalSearchParams<{ isbn: string }>();
  const { bookData, isLoading } = useBookDetail(isbn || "");

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
        <View className="flex-row items-center px-5 py-3 bg-white border-b border-gray-200">
          <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
            <GoBackIcon width={24} height={24} fill="#000000" />
          </TouchableOpacity>
          <Text className="text-heading-20-bold text-gray-900 ml-4">도서 정보</Text>
        </View>
        <View className="flex-1 bg-gray-200 items-center justify-center">
          <ActivityIndicator size="large" color={colors.primary[600]} />
          <Text className="text-body-14-regular text-gray-500 mt-4">로딩 중...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!bookData) {
    return (
      <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
        <View className="flex-row items-center px-5 py-3 bg-white border-b border-gray-200">
          <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
            <GoBackIcon width={24} height={24} fill="#000000" />
          </TouchableOpacity>
          <Text className="text-heading-20-bold text-gray-900 ml-4">도서 정보</Text>
        </View>
        <View className="flex-1 bg-gray-200 items-center justify-center">
          <Text className="text-body-14-regular text-gray-500">책 정보를 불러올 수 없습니다.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const { bookDetail, aiSummary, aiTags, recommendations, isLiked } = bookData;

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      {/* 헤더 */}
      <View className="flex-row items-center px-5 py-3 bg-white border-b border-gray-200">
        <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
          <GoBackIcon width={24} height={24} fill="#000000" />
        </TouchableOpacity>
        <Text className="text-heading-20-bold text-gray-900 ml-4">도서 정보</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 bg-gray-200">
        {/* 도서 정보 카드 */}
        <View className="bg-white mx-4 mt-4 rounded-xl p-4" style={{ elevation: 2 }}>
          <View className="flex-row">
            {/* 왼쪽: 책 표지 */}
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

            {/* 오른쪽: 책 정보 */}
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

          {/* 책 설명 */}
          {bookDetail.description && (
            <View className="mt-4 pt-4 border-t border-gray-200">
              <Text className="text-body-14-regular text-gray-700 leading-6">
                {bookDetail.description}
              </Text>
            </View>
          )}
        </View>

        {/* AI 요약 카드 */}
        {aiSummary && (
          <View className="bg-white mx-4 mt-4 rounded-xl p-4" style={{ elevation: 2 }}>
            <Text className="text-body-16-bold text-gray-900 mb-3">AI 요약</Text>
            <Text className="text-body-14-regular text-gray-700 leading-6">{aiSummary}</Text>
            {aiTags && aiTags.length > 0 && (
              <View className="flex-row flex-wrap gap-2 mt-3">
                {aiTags.map((tag, index) => (
                  <View key={index} className="bg-gray-200 rounded-full px-3 py-1">
                    <Text className="text-body-12-regular text-gray-700">{tag}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

        {/* 이런 책은 어떠세요? 카드 */}
        {recommendations && recommendations.length > 0 && (
          <View className="bg-white mx-4 mt-4 mb-4 rounded-xl p-4" style={{ elevation: 2 }}>
            <Text className="text-body-16-bold text-gray-900 mb-3">이런 책은 어떠세요?</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {recommendations.map((book) => (
                <BookCardV2
                  key={book.isbn}
                  title={book.title}
                  author={book.author}
                  cover={book.cover}
                  onPress={() => router.push(`/book/${book.isbn}` as any)}
                />
              ))}
            </ScrollView>
          </View>
        )}

        {/* 내 서재에 추가 버튼 */}
        <View className="px-4 pb-6">
          <View className="flex-row gap-3">
            <TouchableOpacity
              activeOpacity={0.7}
              className="flex-1 bg-gray-600 rounded-xl py-4 items-center"
              onPress={() => {
                // 서재에 추가 기능 구현 예정
              }}
            >
              <Text className="text-body-16-bold text-white">내 서재에 추가</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              className="w-14 h-14 rounded-xl bg-gray-600 items-center justify-center"
              onPress={() => {
                // 좋아요 기능 구현 예정
              }}
            >
              <HeartIcon
                width={24}
                height={24}
                fill={isLiked ? colors.primary[600] : colors.gray[400]}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

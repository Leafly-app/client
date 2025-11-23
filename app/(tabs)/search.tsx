import GoBackIcon from "@/assets/images/goback.svg";
import SearchIcon from "@/assets/images/search/search_search.svg";
import BookCard from "@/components/home/BookCard";
import { useSearchBooks } from "@/hooks/useSearchBooks";
import { colors } from "@/styles/colors";
import type { BookGenre } from "@/types/book";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const GENRE_OPTIONS: BookGenre[] = [
  "소설/시/희곡",
  "에세이",
  "자기계발",
  "과학",
  "역사",
  "경제경영",
  "예술/대중문화",
  "인문학",
  "가정/요리/뷰티",
  "여행",
  "건강/취미/레저",
];

export default function SearchScreen() {
  const router = useRouter();
  const { books, isLoading, search } = useSearchBooks();
  const [keyword, setKeyword] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<BookGenre[]>([]);

  const toggleGenre = (genre: BookGenre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleSearch = () => {
    if (keyword.trim().length < 2) {
      return;
    }
    search(keyword.trim(), selectedGenres.length > 0 ? selectedGenres : null);
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      {/* 상단 검색바 */}
      <View className="flex-row items-center px-5 py-3 bg-white border-b border-gray-200">
        <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()} className="mr-3">
          <GoBackIcon width={24} height={24} fill="#000000" />
        </TouchableOpacity>
        <View className="flex-1 flex-row items-center bg-gray-100 rounded-xl px-4 py-2">
          <TextInput
            className="flex-1 text-body-14-regular text-gray-900"
            placeholder="도서명 · 저자 · ISBN 검색"
            placeholderTextColor="#9CA3AF"
            value={keyword}
            onChangeText={setKeyword}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          <TouchableOpacity activeOpacity={0.7} onPress={handleSearch}>
            <SearchIcon width={24} height={24} fill="#000000" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 카테고리별 찾기 섹션 */}
        <View className="px-5 py-4">
          <Text className="text-body-14-semibold text-gray-900 mb-3">카테고리별 찾기</Text>
          <View className="flex-row flex-wrap gap-2">
            {GENRE_OPTIONS.map((genre) => {
              const isSelected = selectedGenres.includes(genre);
              return (
                <TouchableOpacity
                  key={genre}
                  activeOpacity={0.7}
                  onPress={() => toggleGenre(genre)}
                  className={`rounded-full px-4 py-2 ${
                    isSelected ? "bg-primary-600" : "bg-gray-100"
                  }`}
                >
                  <Text
                    className={`text-body-12-regular ${
                      isSelected ? "text-white" : "text-gray-700"
                    }`}
                  >
                    {genre}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* 인기 도서 섹션 */}
        <View className="px-5 py-4">
          <Text className="text-body-14-semibold text-gray-900 mb-3">인기 도서</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[1, 2, 3, 4].map((item) => (
              <TouchableOpacity
                key={item}
                activeOpacity={0.7}
                className="mr-4"
                style={{ width: 130 }}
              >
                <View
                  className="bg-gray-300 rounded-lg overflow-hidden mb-3"
                  style={{ width: 130, height: 180 }}
                >
                  <View className="flex-1 items-center justify-center">
                    <View className="w-12 h-14 bg-gray-500 rounded" />
                  </View>
                </View>
                <Text className="text-body-14-semibold text-gray-900 mb-1" numberOfLines={1}>
                  데미안
                </Text>
                <Text className="text-body-12-regular text-gray-600" numberOfLines={1}>
                  헤르만 헤세
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* 검색 결과 섹션 */}
        {isLoading ? (
          <View className="py-20 items-center justify-center">
            <ActivityIndicator size="large" color={colors.primary[600]} />
            <Text className="text-body-14-regular text-gray-500 mt-4">검색 중...</Text>
          </View>
        ) : books.length > 0 ? (
          <View className="px-5 py-4">
            <Text className="text-body-14-semibold text-gray-900 mb-3">
              검색 결과 ({books.length})
            </Text>
            {books
              .filter((book) => book.isbn && book.isbn.trim() !== "")
              .map((book) => (
                <BookCard
                  key={book.isbn}
                  title={book.title}
                  author={book.author}
                  cover={book.cover}
                  isLiked={book.isLiked}
                  onPress={() => router.push(`/book/${book.isbn}` as any)}
                  onLikePress={() => {
                    // 좋아요 기능 구현 예정
                  }}
                />
              ))}
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

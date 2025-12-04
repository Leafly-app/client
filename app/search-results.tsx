import Header from "@/components/common/Header";
import IcFilter from "@/components/icons/IcFilter";
import {
  DEFAULT_SEARCH_RATING_OPTIONS,
  FilterBottomSheet,
} from "@/components/search/FilterBottomSheet";
import { SearchResultBookCard } from "@/components/search/SearchResultBookCard";
import type { CategoryType } from "@/constants/categories";
import { useSearchBooks } from "@/hooks/useSearchBooks";
import { useLibraryUpdateStore } from "@/store/libraryUpdateStore";
import type { BookGenre, SearchBook } from "@/types/book";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// CategoryType을 BookGenre로 변환
const CATEGORY_TO_GENRE_MAP: Record<CategoryType, BookGenre> = {
  all: "전체",
  literature: "소설/시/희곡",
  essay: "에세이",
  development: "자기계발",
  science: "과학",
  history: "역사",
  economy: "경제경영",
  art: "예술/대중문화",
  humanity: "인문학",
  lifestyle: "가정/요리/뷰티",
  trip: "여행",
  health: "건강/취미/레저",
};

export default function SearchResultsScreen() {
  const router = useRouter();
  const { keyword, categories: categoriesParam, mode } = useLocalSearchParams<{
    keyword: string;
    categories?: string;
    mode?: string;
  }>();
  const { books, isLoading, search, updateBookLikeStatus } = useSearchBooks();
  const setNeedsUpdate = useLibraryUpdateStore((state) => state.setNeedsUpdate);
  const insets = useSafeAreaInsets();
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<CategoryType[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const filteredBooks = books.filter((book) => {
    if (selectedRating !== null && book.rating !== undefined) {
      return book.rating >= selectedRating;
    }
    return true;
  });

  useEffect(() => {
    if (keyword && keyword.trim().length >= 2) {
      const initialCategories = categoriesParam
        ? (categoriesParam.split(",").map((c) => c.trim()) as CategoryType[])
        : [];

      const hasAll = initialCategories.includes("all");
      const genres: BookGenre[] | null =
        initialCategories.length > 0 && !hasAll
          ? initialCategories.map((cat) => CATEGORY_TO_GENRE_MAP[cat])
          : null;

      search(keyword.trim(), genres);
      setSelectedCategories(initialCategories);
      setSelectedRating(null);
    }
  }, [keyword, categoriesParam, search]);

  const handleLikeToggle = (isbn: string, isLiked: boolean) => {
    updateBookLikeStatus(isbn, isLiked);
    setNeedsUpdate(true);
  };

  const handleBookPress = (book: SearchBook) => {
    if (mode === "review") {
      router.replace({
        pathname: "/review/create",
        params: {
          bookTitle: book.title,
          bookAuthor: book.author,
          bookCover: book.cover,
          bookIsbn: book.isbn,
          bookCategory: book.categoryName || "",
        },
      });
    } else {
      router.push(`/book/${book.isbn}` as any);
    }
  };

  const handleFilterPress = () => {
    setShowFilterSheet(true);
  };

  const handleFilterApply = (categories: CategoryType[], rating: number | null) => {
    setSelectedCategories(categories);
    setSelectedRating(rating);

    if (!keyword || keyword.trim().length < 2) return;

    const hasAll = categories.includes("all");
    const genres: BookGenre[] | null =
      categories.length > 0 && !hasAll ? categories.map((cat) => CATEGORY_TO_GENRE_MAP[cat]) : null;

    search(keyword.trim(), genres);
  };

  return (
    <View className="flex-1 bg-gray-50" style={{ paddingTop: insets.top }}>
      <Header
        state="default"
        hasBack
        hasSearch
        titleType="text"
        title="검색 결과"
        searchIcon={<IcFilter width={24} height={24} />}
        isFilterActive={selectedCategories.length > 0 || selectedRating !== null}
        onBackPress={() => router.back()}
        onSearchPress={handleFilterPress}
      />

      <FlatList
        data={filteredBooks}
        keyExtractor={(item) => item.isbn}
        renderItem={({ item }) => (
          <SearchResultBookCard
            book={item}
            onPress={() => handleBookPress(item)}
            onLikeToggle={handleLikeToggle}
          />
        )}
        contentContainerStyle={{
          padding: 20,
          gap: 12, // 0.75rem
        }}
        showsVerticalScrollIndicator={false}
      />

      <FilterBottomSheet
        visible={showFilterSheet}
        onClose={() => setShowFilterSheet(false)}
        onApply={handleFilterApply}
        initialCategories={selectedCategories}
        initialRating={selectedRating}
        ratingOptions={DEFAULT_SEARCH_RATING_OPTIONS}
      />
    </View>
  );
}

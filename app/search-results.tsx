import { getBooksByCategory } from "@/apis/book";
import Header from "@/components/common/Header";
import IcFilter from "@/components/icons/IcFilter";
import {
  DEFAULT_SEARCH_RATING_OPTIONS,
  FilterBottomSheet,
} from "@/components/search/FilterBottomSheet";
import { SearchResultsList } from "@/components/search/SearchResultsList";
import type { CategoryType } from "@/constants/categories";
import { CATEGORIES, categoryToAPIGenre } from "@/constants/categories";
import { useSearchBooks } from "@/hooks/useSearchBooks";
import { useLibraryUpdateStore } from "@/store/libraryUpdateStore";
import type { BookGenre, SearchBook } from "@/types/book";
import { CATEGORY_TO_GENRE_MAP } from "@/utils/categoryMappers";
import { filterByCategory } from "@/utils/filterUtils";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SearchResultsScreen() {
  const router = useRouter();
  const {
    keyword,
    categories: categoriesParam,
    mode,
    category,
  } = useLocalSearchParams<{
    keyword?: string;
    categories?: string;
    mode?: string;
    category?: CategoryType;
  }>();
  const { books, search, updateBookLikeStatus } = useSearchBooks();
  const setNeedsUpdate = useLibraryUpdateStore((state) => state.setNeedsUpdate);
  const insets = useSafeAreaInsets();
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<CategoryType[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 카테고리 모드인지 확인
  const isCategoryMode = !!category;
  const categoryData = isCategoryMode ? CATEGORIES.find((cat) => cat.id === category) : null;

  const [categoryBooks, setCategoryBooks] = useState<SearchBook[]>([]);

  const filteredBooks = useMemo(() => {
    const booksToFilter = isCategoryMode ? categoryBooks : books;
    const categoryFiltered = filterByCategory(
      booksToFilter,
      selectedCategories,
      CATEGORY_TO_GENRE_MAP,
      (book) => book.category,
    );

    if (selectedRating === null) {
      return categoryFiltered;
    }

    return categoryFiltered.filter((book) => book.rating >= selectedRating);
  }, [books, categoryBooks, isCategoryMode, selectedCategories, selectedRating]);

  // Category mode: fetch books by category
  useEffect(() => {
    if (isCategoryMode && category) {
      const fetchCategoryBooks = async () => {
        try {
          setIsLoading(true);
          const apiGenre = categoryToAPIGenre(category);
          const response = await getBooksByCategory(apiGenre);

          if (response.isSuccess) {
            setCategoryBooks(response.data || []);
          }
        } catch (error) {
          console.error("Failed to fetch category books:", error);
          setCategoryBooks([]);
        } finally {
          setIsLoading(false);
        }
      };

      fetchCategoryBooks();
      setSelectedCategories([]);
      setSelectedRating(null);
    }
  }, [isCategoryMode, category]);

  // Keyword search mode
  useEffect(() => {
    if (!isCategoryMode && keyword && keyword.trim().length >= 2) {
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
  }, [isCategoryMode, keyword, categoriesParam, search]);

  const handleLikeToggle = (isbn: string, isLiked: boolean) => {
    updateBookLikeStatus(isbn, isLiked);
    setNeedsUpdate(true);
  };

  const handleBookPress = (book: SearchBook) => {
    if (mode === "review") {
      router.replace({
        pathname: "/(tabs)/write",
        params: {
          bookTitle: book.title,
          bookAuthor: book.author,
          bookCover: book.cover,
          bookIsbn: book.isbn,
          bookCategory: book.category || "",
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
  };

  return (
    <View className="flex-1 bg-gray-50" style={{ paddingTop: insets.top }}>
      <Header
        state="default"
        hasBack
        hasSearch
        titleType="text"
        title={categoryData?.label || "검색 결과"}
        searchIcon={<IcFilter width={24} height={24} />}
        isFilterActive={selectedCategories.length > 0 || selectedRating !== null}
        onBackPress={() => router.back()}
        onSearchPress={handleFilterPress}
      />

      <SearchResultsList
        books={filteredBooks}
        isLoading={isLoading}
        mode={mode}
        onBookPress={handleBookPress}
        onLikeToggle={handleLikeToggle}
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

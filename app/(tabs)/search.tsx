import { CategoryList, type CategoryType } from "@/components/common/CategoryList";
import SearchHeader from "@/components/common/SearchHeader";
import { SearchResults } from "@/components/search/SearchResults";
import { useSearchBooks } from "@/hooks/useSearchBooks";
import { useLibraryUpdateStore } from "@/store/libraryUpdateStore";
import type { BookGenre, SearchBook } from "@/types/book";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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

export default function SearchScreen() {
  const router = useRouter();
  const { mode, keyword: urlKeyword } = useLocalSearchParams<{ mode?: string; keyword?: string }>();
  const isReviewMode = mode === "review";
  const { books, isLoading, search, updateBookLikeStatus } = useSearchBooks();
  const [keyword, setKeyword] = useState(urlKeyword || "");
  const [selectedCategories, setSelectedCategories] = useState<CategoryType[]>([]);
  const setNeedsUpdate = useLibraryUpdateStore((state) => state.setNeedsUpdate);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (urlKeyword && urlKeyword.trim().length >= 2) {
      search(urlKeyword.trim(), null);
    }
  }, [urlKeyword]);

  const handleLikeToggle = (isbn: string, isLiked: boolean) => {
    updateBookLikeStatus(isbn, isLiked);
    setNeedsUpdate(true);
  };

  const toggleCategory = (category: CategoryType) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    );
  };

  const handleSearch = () => {
    if (keyword.trim().length < 2) {
      return;
    }
    const selectedGenres =
      selectedCategories.length > 0
        ? selectedCategories.filter((cat) => cat !== "all").map((cat) => CATEGORY_TO_GENRE_MAP[cat])
        : null;
    search(keyword.trim(), selectedGenres);
  };

  const handleBookPress = (book: SearchBook) => {
    if (isReviewMode) {
      router.push({
        pathname: "/review/create",
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

  return (
    <View className="flex-1 bg-gray-200" style={{ paddingTop: insets.top }}>
      <SearchHeader
        keyword={keyword}
        onKeywordChange={setKeyword}
        onBackPress={() => router.back()}
        onSubmit={handleSearch}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-5 py-4">
          <Text className="text-body-16-semibold text-gray-900 mb-2">카테고리별 찾기</Text>
          <CategoryList selectedCategories={selectedCategories} onCategoryPress={toggleCategory} />
        </View>
        <SearchResults
          books={books}
          isLoading={isLoading}
          onBookPress={handleBookPress}
          onLikeToggle={handleLikeToggle}
        />
      </ScrollView>
    </View>
  );
}

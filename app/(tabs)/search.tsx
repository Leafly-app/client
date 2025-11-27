import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GenreFilter } from "@/components/search/GenreFilter";
import { SearchHeader } from "@/components/search/SearchHeader";
import { SearchResults } from "@/components/search/SearchResults";
import { useSearchBooks } from "@/hooks/useSearchBooks";
import { useLibraryUpdateStore } from "@/store/libraryUpdateStore";
import type { BookGenre, SearchBook } from "@/types/book";

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
  const { mode, keyword: urlKeyword } = useLocalSearchParams<{ mode?: string; keyword?: string }>();
  const isReviewMode = mode === "review";
  const { books, isLoading, search, updateBookLikeStatus } = useSearchBooks();
  const [keyword, setKeyword] = useState(urlKeyword || "");
  const [selectedGenres, setSelectedGenres] = useState<BookGenre[]>([]);
  const setNeedsUpdate = useLibraryUpdateStore((state) => state.setNeedsUpdate);

  useEffect(() => {
    if (urlKeyword && urlKeyword.trim().length >= 2) {
      search(urlKeyword.trim(), null);
    }
  }, [urlKeyword]);

  const handleLikeToggle = (isbn: string, isLiked: boolean) => {
    updateBookLikeStatus(isbn, isLiked);
    setNeedsUpdate(true);
  };

  const toggleGenre = (genre: BookGenre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre],
    );
  };

  const handleSearch = () => {
    if (keyword.trim().length < 2) {
      return;
    }
    search(keyword.trim(), selectedGenres.length > 0 ? selectedGenres : null);
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
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <SearchHeader
        keyword={keyword}
        onKeywordChange={setKeyword}
        onSearch={handleSearch}
        onBack={() => router.back()}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <GenreFilter
          genres={GENRE_OPTIONS}
          selectedGenres={selectedGenres}
          onToggle={toggleGenre}
        />
        <SearchResults
          books={books}
          isLoading={isLoading}
          onBookPress={handleBookPress}
          onLikeToggle={handleLikeToggle}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

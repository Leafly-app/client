import { useState } from "react";
import { Alert } from "react-native";
import { searchBooks } from "@/apis/book";
import type { BookGenre, SearchBook } from "@/types/book";

export const useSearchBooks = () => {
  const [books, setBooks] = useState<SearchBook[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (keyword: string, genres: BookGenre[] | null) => {
    if (keyword.length < 2) {
      Alert.alert("알림", "검색어는 2글자 이상 입력해주세요.");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const response = await searchBooks(keyword, genres);

      if (response.isSuccess && response.data) {
        setBooks(response.data);
      } else {
        const errorMsg = response.message || "검색에 실패했습니다.";
        setError(errorMsg);
        setBooks([]);
      }
    } catch (err: any) {
      const errorMessage = err.message || "네트워크 오류가 발생했습니다.";
      setError(errorMessage);
      setBooks([]);
      Alert.alert("오류", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    setBooks([]);
    setError(null);
  };

  return {
    books,
    isLoading,
    error,
    search,
    clearSearch,
  };
};

import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { getRecommendedBooks } from "@/apis/book";
import type { Book } from "@/types/book";

export const useRecommendedBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getRecommendedBooks();

      if (response.isSuccess) {
        setBooks(response.data || []);
      } else {
        const errorMsg = response.message || "책을 불러오는데 실패했습니다.";
        setError(errorMsg);
      }
    } catch (err) {
      const errorMessage = (err as Error).message || "네트워크 오류가 발생했습니다.";
      setError(errorMessage);
      Alert.alert("오류", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return {
    books,
    isLoading,
    error,
    refetch: fetchBooks,
  };
};

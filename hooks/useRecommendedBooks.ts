import { getRecommendedBooks } from "@/apis/book";
import type { RecommendedBook } from "@/types/book";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export const useRecommendedBooks = () => {
  const [books, setBooks] = useState<RecommendedBook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getRecommendedBooks();

      if (response.isSuccess && response.data) {
        const booksWithId = response.data.map((book) => ({
          ...book,
          id: book.isbn,
        }));
        setBooks(booksWithId);
      } else {
        const errorMsg = response.message || "책을 불러오는데 실패했습니다.";
        setError(errorMsg);
      }
    } catch (err: any) {
      const errorMessage = err.message || "네트워크 오류가 발생했습니다.";
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

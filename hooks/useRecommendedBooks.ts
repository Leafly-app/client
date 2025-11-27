import { getRecommendedBooks } from "@/apis/book";
import type { Book } from "@/types/book";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

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

  const updateBookLikeStatus = (isbn: string, isLiked: boolean) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book.isbn === isbn ? { ...book, isLiked } : book)),
    );
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: fetchBooks는 안정적인 함수이므로 의존성에서 제외
  useEffect(() => {
    fetchBooks();
  }, []);

  return {
    books,
    isLoading,
    error,
    refetch: fetchBooks,
    updateBookLikeStatus,
  };
};

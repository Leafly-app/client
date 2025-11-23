import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { getBookDetail } from "@/apis/bookDetail";
import type { BookDetailResponse } from "@/types/bookDetail";

export const useBookDetail = (isbn: string) => {
  const [bookData, setBookData] = useState<BookDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await getBookDetail(isbn);

        if (response.isSuccess && response.data) {
          setBookData(response.data);
        } else {
          throw new Error("책 정보를 불러올 수 없습니다.");
        }
      } catch (err: any) {
        const errorMessage = err.message || "책 정보를 불러오는데 실패했습니다.";
        setError(errorMessage);
        Alert.alert("오류", errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookData();
  }, [isbn]);

  return {
    bookData,
    isLoading,
    error,
  };
};

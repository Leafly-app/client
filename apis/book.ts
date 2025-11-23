import type { ApiResponse } from "@/types/api";
import type { Book, BookGenre, SearchBook } from "@/types/book";
import API from "./api";

export const getRecommendedBooks = async (): Promise<ApiResponse<Book[]>> => {
  try {
    const response = await API.get<ApiResponse<Book[]>>("/api/recommendations");
    return response.data;
  } catch (error) {
    if ((error as { response?: { status?: number } })?.response?.status === 404) {
      return {
        isSuccess: true,
        timestamp: new Date().toISOString(),
        code: "NOT_FOUND",
        httpStatus: 404,
        message: "추천 도서를 준비 중입니다.",
        data: [],
      };
    }
    throw error;
  }
};

export const searchBooks = async (
  keyword: string,
  genres: BookGenre[] | null,
): Promise<ApiResponse<SearchBook[]>> => {
  const response = await API.post<ApiResponse<SearchBook[]>>(
    `/api/books?keyword=${encodeURIComponent(keyword)}`,
    { genres },
  );
  return response.data;
};

import type { ApiResponse } from "@/types/api";
import type { Book, SearchBook } from "@/types/book";
import API from "./api";

export const getRecommendedBooks = async (): Promise<ApiResponse<Book[]>> => {
  try {
    const response = await API.get<ApiResponse<Book[]>>("/api/recommendations");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchBooks = async (
  keyword: string,
  genres: string[] | null,
): Promise<ApiResponse<SearchBook[]>> => {
  try {
    const response = await API.post<ApiResponse<SearchBook[]>>(
      `/api/books?keyword=${encodeURIComponent(keyword)}`,
      { genres },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

import type { ApiResponse } from "@/types/api";
import type { Book, SearchBook } from "@/types/book";
import type { ToggleLikeRequest, ToggleLikeResponse } from "@/types/book/like";
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
  categories: string[] | null,
): Promise<ApiResponse<SearchBook[]>> => {
  const response = await API.post<ApiResponse<SearchBook[]>>(
    `/api/books?keyword=${encodeURIComponent(keyword)}`,
    { categories },
  );

  return response.data;
};

export const toggleLike = async (
  isbn: string,
  data: ToggleLikeRequest,
): Promise<ApiResponse<ToggleLikeResponse>> => {
  const response = await API.post<ApiResponse<ToggleLikeResponse>>(`/api/bookmarks/${isbn}`, data);
  return response.data;
};

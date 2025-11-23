import type { ApiResponse } from "@/types/api";
import type { BookDetailResponse } from "@/types/bookDetail";
import API from "./api";

export const getBookDetail = async (isbn: string): Promise<ApiResponse<BookDetailResponse>> => {
  try {
    const response = await API.get<ApiResponse<BookDetailResponse>>(`/api/books/${isbn}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

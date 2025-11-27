import type { ApiResponse } from "@/types/api";
import type { BookDetailResponse } from "@/types/bookDetail";
import API from "./api";

export const uploadOCRImage = async (
  imageUri: string,
): Promise<ApiResponse<BookDetailResponse>> => {
  try {
    const formData = new FormData();

    const fileData = {
      uri: imageUri,
      name: "book_scan.jpg",
      type: "image/jpeg",
    };

    formData.append("file", fileData as any);

    const response = await API.post<ApiResponse<BookDetailResponse>>("/api/books/ocr", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },

      timeout: 30000,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

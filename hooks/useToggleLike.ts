import { useState } from "react";
import { toggleLike } from "@/apis/book";
import type { ToggleLikeRequest } from "@/types/book/like";

export const useToggleLike = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggle = async (isbn: string, bookData: ToggleLikeRequest | null) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await toggleLike(isbn, bookData);

      if (response.isSuccess && response.data) {
        return {
          success: true,
          isLiked: response.data.status === "on",
        };
      }
      throw new Error(response.message || "좋아요 처리에 실패했습니다.");
    } catch (err: unknown) {
      let errorMessage = "좋아요 처리 중 오류가 발생했습니다.";

      if (err && typeof err === "object" && "response" in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        if (axiosErr.response?.data?.message) {
          errorMessage = axiosErr.response.data.message;
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return { toggle, isLoading, error };
};

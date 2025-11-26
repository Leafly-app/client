import { createReview } from "@/apis/review";
import type { CreateReviewRequest } from "@/types/review";
import { useState } from "react";

export const useCreateReview = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (data: CreateReviewRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await createReview(data);

      if (response.isSuccess) {
        return { success: true, data: response };
      }
      throw new Error(response.message || "독후감 작성에 실패했습니다.");
    } catch (err: any) {
      const errorMessage =
        err instanceof Error ? err.message : "독후감 작성 중 오류가 발생했습니다.";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return { submit, isLoading, error };
};

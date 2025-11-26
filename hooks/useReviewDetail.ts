import { deleteReview, getReviewDetail } from "@/apis/review";
import type { ReviewDetail } from "@/types/review";
import { useCallback, useEffect, useState } from "react";

export const useReviewDetail = (reviewId: number) => {
  const [reviewDetail, setReviewDetail] = useState<ReviewDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReviewDetail = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await getReviewDetail(reviewId);

      if (response.isSuccess) {
        setReviewDetail(response.data);
      } else {
        setError(response.message || "독후감을 불러오는데 실패했습니다.");
      }
    } catch (err: any) {
      if (err.response?.status === 403) {
        setError("권한이 없습니다.");
      } else if (err.response?.status === 404) {
        setError("독후감을 찾을 수 없습니다.");
      } else {
        setError("독후감을 불러오는 중 문제가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [reviewId]);

  const handleDeleteReview = async () => {
    try {
      setIsDeleting(true);
      const response = await deleteReview(reviewId);

      if (response.isSuccess) {
        return { success: true };
      }
      return { success: false, error: response.message || "독후감 삭제에 실패했습니다." };
    } catch (err: any) {
      if (err.response?.status === 403) {
        return { success: false, error: "본인이 작성한 리뷰만 삭제할 수 있습니다." };
      } else if (err.response?.status === 404) {
        return { success: false, error: "해당 독후감을 찾을 수 없습니다." };
      }
      return { success: false, error: "독후감 삭제 중 문제가 발생했습니다." };
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    if (reviewId) {
      fetchReviewDetail();
    }
  }, [reviewId, fetchReviewDetail]);

  return {
    reviewDetail,
    isLoading,
    isDeleting,
    error,
    refetch: fetchReviewDetail,
    deleteReview: handleDeleteReview,
  };
};

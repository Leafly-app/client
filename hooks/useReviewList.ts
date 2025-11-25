import { getReviews } from "@/apis/review";
import type { Review } from "@/types/review";
import { useEffect, useState } from "react";

export const useReviewList = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await getReviews();

      if (response.isSuccess) {
        setReviews(response.data.reviews);
        setCount(response.data.count);
      } else {
        setError(response.message || "독후감 리스트를 불러오는데 실패했습니다.");
      }
    } catch (err) {
      setError("독후감 리스트를 불러오는 중 문제가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return {
    reviews,
    count,
    isLoading,
    error,
    refetch: fetchReviews,
  };
};

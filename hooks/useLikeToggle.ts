import { useToggleLike } from "@/hooks/useToggleLike";
import { useEffect, useState } from "react";

interface BookInfo {
  title: string;
  author: string;
  cover: string;
}

export function useLikeToggle(
  isbn: string,
  bookInfo: BookInfo,
  initialIsLiked: boolean,
  onSuccess?: (isbn: string, isLiked: boolean) => void,
) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const { toggle: toggleLike } = useToggleLike();

  useEffect(() => {
    setIsLiked(initialIsLiked);
  }, [initialIsLiked]);

  const handleLikePress = async (e?: unknown) => {
    if (e && typeof e === "object" && "stopPropagation" in e) {
      (e as { stopPropagation: () => void }).stopPropagation();
    }

    const previousIsLiked = isLiked;
    const newIsLiked = !previousIsLiked;
    setIsLiked(newIsLiked);

    const result = await toggleLike(isbn, bookInfo);

    if (result.success) {
      onSuccess?.(isbn, newIsLiked);
    } else {
      setIsLiked(previousIsLiked);
    }
  };

  return { isLiked, handleLikePress };
}

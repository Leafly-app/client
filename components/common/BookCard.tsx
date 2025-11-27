import HeartIcon from "@/assets/images/ic_heart.svg";
import StarIcon from "@/assets/images/ic_star.svg";
import { useToggleLike } from "@/hooks/useToggleLike";
import { colors } from "@/styles/colors";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface BookCardProps {
  isbn: string;
  title: string;
  author: string;
  cover: string;
  reason?: string;
  rating?: number;
  isLiked: boolean;
  onPress?: () => void;
  showReason?: boolean;
  onLikeToggle?: (isbn: string, isLiked: boolean) => void;
}

const BookCard = React.memo<BookCardProps>(function BookCard({
  isbn,
  title,
  author,
  cover,
  reason,
  rating,
  isLiked: initialIsLiked,
  onPress,
  showReason = false,
  onLikeToggle,
}: BookCardProps) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const { toggle: toggleLike } = useToggleLike();

  useEffect(() => {
    setIsLiked(initialIsLiked);
  }, [initialIsLiked]);

  const handleLikePress = async (e: any) => {
    e.stopPropagation();

    // 1. 낙관적 업데이트 (UI 먼저 변경)
    const previousIsLiked = isLiked;
    const newIsLiked = !previousIsLiked;
    setIsLiked(newIsLiked);

    // 2. 서버 요청 (취소 시에도 데이터 전송 권장)
    const bookInfo = { title, author, cover };
    const result = await toggleLike(isbn, bookInfo);

    if (result.success) {
      onLikeToggle?.(isbn, newIsLiked);
    } else {
      // 3. 실패 시 롤백
      console.error("좋아요 실패:", result.error);
      setIsLiked(previousIsLiked);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      // 컨테이너: px-0.75rem(3), py-0.5rem(2), rounded-0.5rem(lg)
      className="relative flex-row justify-between px-3 py-2 mb-3 bg-white border border-gray-300 rounded-lg"
      style={{ elevation: 1 }}
    >
      {/* 왼쪽: 표지 섹션 */}
      {/* w-4rem(16), h-5.71875rem(약 91.5px), flex-shrink-0 */}
      <View
        className="bg-gray-300 rounded-sm overflow-hidden flex-shrink-0 mr-3"
        style={{ width: 64, height: 91.5, aspectRatio: 64 / 91.5 }}
      >
        {cover ? (
          <Image source={{ uri: cover }} className="w-full h-full" resizeMode="cover" />
        ) : (
          <View className="flex-1 items-center justify-center">
            <View className="w-10 h-12 bg-gray-500 rounded" />
          </View>
        )}
      </View>

      {/* 오른쪽: 내용 섹션 (flex-1로 남은 공간 차지) */}
      <View className="flex-1 justify-center">
        {/* 제목: Body Text/12px - Bold */}
        <Text className="text-body-12-bold text-gray-900 pr-6" numberOfLines={1}>
          {title}
        </Text>

        {/* 저자: Body Text/10px - Regular, mb-0.25rem(1) */}
        <Text className="text-body-10-regular text-gray-600 mb-1" numberOfLines={1}>
          {author}
        </Text>

        {/* 별점 섹션: gap-0.25rem(1), mb-0.5rem(2) */}
        {rating !== undefined && (
          <View className="flex-row items-center gap-1 mb-2">
            <StarIcon />
            <Text className="text-body-10-regular text-gray-900">{rating}</Text>
          </View>
        )}

        {/* 이유 섹션: primary-500, radius-6.25rem, padding-x-0.5rem(2) */}
        {showReason && reason && (
          <View
            className="bg-primary-500 px-2 self-start justify-center"
            style={{ borderRadius: 100, height: 20 }} // 6.25rem은 매우 큼(사실상 full), 높이 보정
          >
            <Text className="text-body-10-regular text-white" numberOfLines={1}>
              {reason}
            </Text>
          </View>
        )}
      </View>

      {/* 하트 아이콘 (우측 상단 고정) */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleLikePress}
        className="absolute"
        style={{ top: 8, right: 8, zIndex: 10 }}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <HeartIcon width={12} height={12} fill={isLiked ? "#EF4444" : colors.gray[400]} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
});

export default BookCard;

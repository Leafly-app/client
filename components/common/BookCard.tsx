import { IcHeartFilled, IcStarFilled } from "@/components/icons";
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

  const handleLikePress = async (e: unknown) => {
    if (typeof e === "object" && e !== null && "stopPropagation" in e) {
      (e as { stopPropagation: () => void }).stopPropagation();
    }
    const previousIsLiked = isLiked;
    const newIsLiked = !previousIsLiked;
    setIsLiked(newIsLiked);

    const bookInfo = { title, author, cover };
    const result = await toggleLike(isbn, bookInfo);

    if (result.success) {
      onLikeToggle?.(isbn, newIsLiked);
    } else {
      console.error("좋아요 실패:", result.error);
      setIsLiked(previousIsLiked);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className="relative flex-row justify-between px-3 py-2 mb-3 bg-white border border-gray-300 rounded-lg"
      style={{ elevation: 1 }}
    >
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

      <View className="flex-1 justify-center">
        <Text className="text-body-12-bold text-gray-900 pr-6" numberOfLines={1}>
          {title}
        </Text>

        <Text className="text-body-10-regular text-gray-600 mb-1" numberOfLines={1}>
          {author}
        </Text>

        {rating !== undefined && (
          <View className="flex-row items-center gap-1 mb-2">
            <IcStarFilled width={13} height={13} />
            <Text className="text-body-10-regular text-gray-900">{rating}</Text>
          </View>
        )}

        {showReason && reason && (
          <View
            className="bg-primary-500 px-2 self-start justify-center"
            style={{ borderRadius: 100, height: 20 }}
          >
            <Text className="text-body-10-regular text-white" numberOfLines={1}>
              {reason}
            </Text>
          </View>
        )}
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleLikePress}
        className="absolute"
        style={{ top: 8, right: 8, zIndex: 10 }}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <IcHeartFilled width={12} height={12} fill={isLiked ? "#EF4444" : colors.gray[400]} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
});

export default BookCard;

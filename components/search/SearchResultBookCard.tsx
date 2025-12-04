import { IcHeartFilled, IcHeartOutline, IcStarFilled } from "@/components/icons";
import IcCategoryLiterature from "@/components/icons/IcCategoryLiterature";
import { useToggleLike } from "@/hooks/useToggleLike";
import { colors } from "@/styles/colors";
import type { SearchBook } from "@/types/book";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface SearchResultBookCardProps {
  book: SearchBook;
  onPress: () => void;
  onLikeToggle?: (isbn: string, isLiked: boolean) => void;
}

export function SearchResultBookCard({ book, onPress, onLikeToggle }: SearchResultBookCardProps) {
  const [isLiked, setIsLiked] = useState(book.isLiked);
  const { toggle: toggleLike } = useToggleLike();

  useEffect(() => {
    setIsLiked(book.isLiked);
  }, [book.isLiked]);

  const handleLikePress = async (e: unknown) => {
    if (typeof e === "object" && e !== null && "stopPropagation" in e) {
      (e as { stopPropagation: () => void }).stopPropagation();
    }
    const previousIsLiked = isLiked;
    const newIsLiked = !previousIsLiked;
    setIsLiked(newIsLiked);

    const bookInfo = {
      title: book.title,
      author: book.author,
      cover: book.cover,
    };
    const result = await toggleLike(book.isbn, bookInfo);

    if (result.success) {
      onLikeToggle?.(book.isbn, newIsLiked);
    } else {
      console.error("좋아요 실패:", result.error);
      setIsLiked(previousIsLiked);
    }
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      className="rounded-lg border border-gray-300 px-3 py-2"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.90)" }}
      activeOpacity={0.7}
    >
      <View className="flex-row">
        <Image
          source={{ uri: book.cover }}
          className="w-20 h-[7.1875rem] rounded"
          style={{ aspectRatio: 16 / 23 }}
          resizeMode="cover"
        />

        <View className="flex-1 ml-2.5 justify-center gap-2">
          {book.category && (
            <View className="flex-row items-center self-start bg-primary-100 rounded-full px-2 py-1">
              <IcCategoryLiterature width={12} height={12} color={colors.gray[700]} />
              <Text className="text-body-8-regular text-gray-900 ml-1">{book.category}</Text>
            </View>
          )}

          <View className="gap-1">
            <Text className="text-body-14-bold text-gray-900" numberOfLines={2}>
              {book.title}
            </Text>
            <Text className="text-body-12-regular text-gray-700" numberOfLines={1}>
              {book.author}
            </Text>
          </View>

          {book.rating !== undefined && (
            <View className="flex-row items-center gap-1">
              <IcStarFilled width={14} height={14} color="#FACC15" />
              <Text className="text-body-12-regular text-gray-900">{book.rating.toFixed(1)}</Text>
            </View>
          )}
        </View>

        <TouchableOpacity
          onPress={handleLikePress}
          className="absolute right-3 top-[1.31rem]"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          {isLiked ? (
            <IcHeartFilled width={12} height={12} fill={colors.error.DEFAULT} />
          ) : (
            <IcHeartOutline width={12} height={12} stroke={colors.gray[400]} />
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

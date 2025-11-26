import HeartIcon from "@/assets/images/heart.svg";
import Button from "@/components/common/Button";
import { colors } from "@/styles/colors";
import React from "react";
import { TouchableOpacity, View } from "react-native";

interface BookActionButtonsProps {
  isLiked: boolean;
  onAddToLibrary: () => void;
  onToggleLike: () => void;
}

export default function BookActionButtons({
  isLiked,
  onAddToLibrary,
  onToggleLike,
}: BookActionButtonsProps) {
  return (
    <View className="flex-row gap-3">
      <Button text="내 서재에 추가" onPress={onAddToLibrary} variant="primary" />

      <TouchableOpacity
        activeOpacity={0.7}
        className="w-14 h-14 rounded-xl bg-gray-600 items-center justify-center"
        onPress={onToggleLike}
      >
        <HeartIcon width={24} height={24} fill={isLiked ? colors.primary[600] : colors.gray[400]} />
      </TouchableOpacity>
    </View>
  );
}

import { BottomSheet } from "@/components/common/BottomSheet";
import { IcStarFilled } from "@/components/icons";
import type { CategoryType } from "@/constants/categories";
import { CATEGORIES } from "@/constants/categories";
import { colors } from "@/styles/colors";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface RatingOption {
  label: string;
  value: number;
}

interface FilterBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onApply: (selectedCategories: CategoryType[], selectedRating: number | null) => void;
  initialCategories?: CategoryType[];
  initialRating?: number | null;
  ratingOptions?: RatingOption[];
}

export const DEFAULT_SEARCH_RATING_OPTIONS: RatingOption[] = [
  { label: "9.0 이상", value: 9.0 },
  { label: "8.0 이상", value: 8.0 },
  { label: "7.0 이상", value: 7.0 },
];

export const DEFAULT_FEED_RATING_OPTIONS: RatingOption[] = [
  { label: "1.0", value: 1.0 },
  { label: "2.0", value: 2.0 },
  { label: "3.0", value: 3.0 },
  { label: "4.0", value: 4.0 },
  { label: "5.0", value: 5.0 },
];

export function FilterBottomSheet({
  visible,
  onClose,
  onApply,
  initialCategories = [],
  initialRating = null,
  ratingOptions = DEFAULT_SEARCH_RATING_OPTIONS,
}: FilterBottomSheetProps) {
  const [selectedCategories, setSelectedCategories] = useState<CategoryType[]>(initialCategories);
  const [selectedRating, setSelectedRating] = useState<number | null>(initialRating);

  const toggleCategory = (categoryId: CategoryType) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    );
  };

  const handleApply = () => {
    onApply(selectedCategories, selectedRating);
    onClose();
  };

  return (
    <BottomSheet visible={visible} onClose={onClose} title="필터">
      <View className="pt-4">
        <View className="mb-6">
          <Text className="text-body-12-semibold text-gray-900 mb-2">카테고리</Text>
          <View className="flex-row flex-wrap" style={{ gap: 9 }}>
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategories.includes(category.id);
              const IconComponent = category.icon;
              return (
                <TouchableOpacity
                  key={category.id}
                  activeOpacity={0.7}
                  onPress={() => toggleCategory(category.id)}
                  className={`flex-row items-center rounded-full ${isSelected ? "bg-primary-100" : "bg-gray-200"}`}
                  style={{ paddingHorizontal: 10, paddingVertical: 6, gap: 4 }}
                >
                  <IconComponent width={16} height={16} color={colors.gray[900]} />
                  <Text className="text-body-10-regular text-gray-900">{category.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-body-12-semibold text-gray-900 mb-2">별점</Text>
          <View className="flex-row flex-wrap" style={{ gap: 9 }}>
            {ratingOptions.map((option) => {
              const isSelected = selectedRating === option.value;
              return (
                <TouchableOpacity
                  key={option.value}
                  activeOpacity={0.7}
                  onPress={() => setSelectedRating(isSelected ? null : option.value)}
                  className={`flex-row items-center rounded-full ${isSelected ? "bg-primary-100" : "bg-gray-200"}`}
                  style={{ paddingHorizontal: 10, paddingVertical: 2, gap: 4 }}
                >
                  <IcStarFilled width={10} height={10} color="#FACC15" />
                  <Text className="text-body-10-regular text-gray-900">{option.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleApply}
          className="bg-primary-500 rounded-lg py-4 items-center"
        >
          <Text className="text-body-16-semibold text-white">적용하기</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
}

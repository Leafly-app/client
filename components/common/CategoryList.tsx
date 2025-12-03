import { CATEGORIES, type CategoryData, type CategoryType } from "@/constants/categories";
import { colors } from "@/styles/colors";
import { Text, TouchableOpacity, View } from "react-native";

export type { CategoryType };

interface CategoryCardProps {
  category: CategoryData;
  isSelected?: boolean;
  onPress?: () => void;
}

function CategoryCard({ category, isSelected = false, onPress }: CategoryCardProps) {
  const IconComponent = category.icon;

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-[48%] h-[4.5rem] rounded-lg px-4 py-5 ${isSelected ? "opacity-70 bg-gray-200" : "bg-white"}`}
      activeOpacity={0.7}
    >
      <View className="flex-row items-center gap-2">
        <View
          className="w-8 h-8 rounded-full items-center justify-center"
          style={{ backgroundColor: category.color }}
        >
          <IconComponent width={12} height={12} color={colors.white} />
        </View>
        <Text
          className="text-body-14-semibold flex-1"
          style={{ color: category.color }}
          numberOfLines={1}
        >
          {category.label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

interface CategoryListProps {
  selectedCategories?: CategoryType[];
  onCategoryPress?: (categoryId: CategoryType) => void;
}

export function CategoryList({ selectedCategories = [], onCategoryPress }: CategoryListProps) {
  return (
    <View className="flex-row flex-wrap gap-2">
      {CATEGORIES.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          isSelected={selectedCategories.includes(category.id)}
          onPress={() => onCategoryPress?.(category.id)}
        />
      ))}
    </View>
  );
}

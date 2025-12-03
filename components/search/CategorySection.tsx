import { CategoryList, type CategoryType } from "@/components/common/CategoryList";
import { Text, View } from "react-native";

interface CategorySectionProps {
  selectedCategories: CategoryType[];
  onCategoryPress: (category: CategoryType) => void;
}

export function CategorySection({ selectedCategories, onCategoryPress }: CategorySectionProps) {
  return (
    <View>
      <Text className="text-body-16-semibold text-gray-900 mb-2">카테고리별 찾기</Text>
      <CategoryList selectedCategories={selectedCategories} onCategoryPress={onCategoryPress} />
    </View>
  );
}

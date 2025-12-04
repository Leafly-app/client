import { CategoryList, type CategoryType } from "@/components/onboarding/OnboardingLayout";
import { useState } from "react";
import { View } from "react-native";

interface GenreStepProps {
  onGenresSelect?: (genres: CategoryType[]) => void;
  initialGenres?: CategoryType[];
}

export function GenreStep({ onGenresSelect, initialGenres }: GenreStepProps) {
  const [selectedGenres, setSelectedGenres] = useState<CategoryType[]>(initialGenres ?? []);

  const handleCategoryPress = (categoryId: CategoryType) => {
    if (categoryId === "all") return;

    const newSelectedGenres = selectedGenres.includes(categoryId)
      ? selectedGenres.filter((g) => g !== categoryId)
      : [...selectedGenres, categoryId];

    setSelectedGenres(newSelectedGenres);
    onGenresSelect?.(newSelectedGenres);
  };

  return (
    <View className="flex-1">
      <CategoryList selectedCategories={selectedGenres} onCategoryPress={handleCategoryPress} />
    </View>
  );
}

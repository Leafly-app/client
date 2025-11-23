import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { GENRE_OPTIONS } from "@/constants/onboarding";
import type { GenreType } from "@/types/onboarding";

interface GenreStepProps {
  onGenresSelect?: (genres: GenreType[]) => void;
}

export function GenreStep({ onGenresSelect }: GenreStepProps) {
  const [selectedGenres, setSelectedGenres] = useState<GenreType[]>([]);

  const handleToggle = (genre: GenreType) => {
    const newSelectedGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter((g) => g !== genre)
      : [...selectedGenres, genre];

    setSelectedGenres(newSelectedGenres);
    onGenresSelect?.(newSelectedGenres);
  };

  return (
    <View className="flex-1">
      <View className="flex-row flex-wrap gap-4">
        {GENRE_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.value}
            className={`border rounded-lg px-4 py-4 ${
              selectedGenres.includes(option.value)
                ? "border-primary-600 bg-primary-50"
                : "border-gray-300"
            }`}
            style={{ flexBasis: "45%" }}
            onPress={() => handleToggle(option.value)}
          >
            <Text
              className={`text-base text-center ${
                selectedGenres.includes(option.value)
                  ? "text-primary-600 font-semibold"
                  : "text-gray-800"
              }`}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

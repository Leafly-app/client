import type { BookGenre } from "@/types/book";
import { Text, TouchableOpacity, View } from "react-native";

interface GenreFilterProps {
  genres: BookGenre[];
  selectedGenres: BookGenre[];
  onToggle: (genre: BookGenre) => void;
}

export function GenreFilter({ genres, selectedGenres, onToggle }: GenreFilterProps) {
  return (
    <View className="px-5 py-4">
      <Text className="text-body-14-semibold text-gray-900 mb-3">카테고리별 찾기</Text>
      <View className="flex-row flex-wrap gap-2">
        {genres.map((genre) => {
          const isSelected = selectedGenres.includes(genre);
          return (
            <TouchableOpacity
              key={genre}
              activeOpacity={0.7}
              onPress={() => onToggle(genre)}
              className={`rounded-full px-4 py-2 ${isSelected ? "bg-primary-600" : "bg-gray-100"}`}
            >
              <Text
                className={`text-body-12-regular ${isSelected ? "text-white" : "text-gray-700"}`}
              >
                {genre}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

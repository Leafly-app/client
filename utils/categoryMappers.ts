import { CATEGORIES, type CategoryType } from "@/constants/categories";
import type { BookGenre } from "@/types/book";

export const CATEGORY_TO_GENRE_MAP: Record<CategoryType, BookGenre> = {
  all: "전체",
  literature: "소설/시/희곡",
  essay: "에세이",
  development: "자기계발",
  science: "과학",
  history: "역사",
  economy: "경제경영",
  art: "예술/대중문화",
  humanity: "인문학",
  lifestyle: "가정/요리/뷰티",
  trip: "여행",
  health: "건강/취미/레저",
};

export const CATEGORY_TO_LABEL_MAP = CATEGORIES.reduce(
  (acc, cat) => {
    acc[cat.id] = cat.label;
    return acc;
  },
  {} as Record<CategoryType, string>,
);

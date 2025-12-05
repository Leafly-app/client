import IcCategoryAll from "@/components/icons/IcCategoryAll";
import IcCategoryArt from "@/components/icons/IcCategoryArt";
import IcCategoryDevelopment from "@/components/icons/IcCategoryDevelopment";
import IcCategoryEconomy from "@/components/icons/IcCategoryEconomy";
import IcCategoryEssay from "@/components/icons/IcCategoryEssay";
import IcCategoryHealth from "@/components/icons/IcCategoryHealth";
import IcCategoryHistory from "@/components/icons/IcCategoryHistory";
import IcCategoryHumanity from "@/components/icons/IcCategoryHumanity";
import IcCategoryLifestyle from "@/components/icons/IcCategoryLifestyle";
import IcCategoryLiterature from "@/components/icons/IcCategoryLiterature";
import IcCategoryScience from "@/components/icons/IcCategoryScience";
import IcCategoryTrip from "@/components/icons/IcCategoryTrip";
import { colors } from "@/styles/colors";
import type { SvgProps } from "react-native-svg";

export type CategoryType =
  | "all"
  | "literature"
  | "essay"
  | "development"
  | "science"
  | "history"
  | "economy"
  | "art"
  | "humanity"
  | "lifestyle"
  | "trip"
  | "health";

export type GenreEnum =
  | "소설"
  | "에세이"
  | "자기계발"
  | "과학"
  | "역사"
  | "경제"
  | "예술"
  | "철학"
  | "심리학"
  | "요리"
  | "건강"
  | "여행";

export type BookGenreAPI =
  | "FICTION"
  | "ESSAY"
  | "SELF_IMPROVEMENT"
  | "SCIENCE"
  | "HISTORY"
  | "ECONOMY"
  | "ART"
  | "HUMANITIES"
  | "HOME"
  | "TRAVEL"
  | "HEALTH"
  | "ALL";

export interface CategoryData {
  id: CategoryType;
  label: string;
  color: string;
  icon: React.ComponentType<SvgProps>;
  backendValue: GenreEnum | null;
}

export const CATEGORIES: CategoryData[] = [
  { id: "all", label: "전체", color: colors.category.all, icon: IcCategoryAll, backendValue: null },
  {
    id: "literature",
    label: "소설/시/희곡",
    color: colors.category.literature,
    icon: IcCategoryLiterature,
    backendValue: "소설",
  },
  {
    id: "essay",
    label: "에세이",
    color: colors.category.essay,
    icon: IcCategoryEssay,
    backendValue: "에세이",
  },
  {
    id: "development",
    label: "자기계발",
    color: colors.category.development,
    icon: IcCategoryDevelopment,
    backendValue: "자기계발",
  },
  {
    id: "science",
    label: "과학",
    color: colors.category.science,
    icon: IcCategoryScience,
    backendValue: "과학",
  },
  {
    id: "history",
    label: "역사",
    color: colors.category.history,
    icon: IcCategoryHistory,
    backendValue: "역사",
  },
  {
    id: "economy",
    label: "경제경영",
    color: colors.category.economy,
    icon: IcCategoryEconomy,
    backendValue: "경제",
  },
  {
    id: "art",
    label: "예술/대중문화",
    color: colors.category.art,
    icon: IcCategoryArt,
    backendValue: "예술",
  },
  {
    id: "humanity",
    label: "인문학",
    color: colors.category.humanity,
    icon: IcCategoryHumanity,
    backendValue: "철학",
  },
  {
    id: "lifestyle",
    label: "가정/요리/뷰티",
    color: colors.category.lifestyle,
    icon: IcCategoryLifestyle,
    backendValue: "요리",
  },
  {
    id: "trip",
    label: "여행",
    color: colors.category.trip,
    icon: IcCategoryTrip,
    backendValue: "여행",
  },
  {
    id: "health",
    label: "건강/취미/레저",
    color: colors.category.health,
    icon: IcCategoryHealth,
    backendValue: "건강",
  },
];

export function categoryToGenre(categoryId: CategoryType): GenreEnum | null {
  const category = CATEGORIES.find((cat) => cat.id === categoryId);
  return category?.backendValue ?? null;
}

export function getAllGenres(): GenreEnum[] {
  return CATEGORIES.filter((cat) => cat.backendValue !== null).map(
    (cat) => cat.backendValue as GenreEnum,
  );
}

export function categoriesToGenres(categories: CategoryType[]): GenreEnum[] {
  if (categories.includes("all")) {
    return getAllGenres();
  }
  return categories
    .map((cat) => categoryToGenre(cat))
    .filter((genre): genre is GenreEnum => genre !== null);
}

export function categoryToAPIGenre(categoryId: CategoryType): BookGenreAPI {
  const mapping: Record<CategoryType, BookGenreAPI> = {
    all: "ALL",
    literature: "FICTION",
    essay: "ESSAY",
    development: "SELF_IMPROVEMENT",
    science: "SCIENCE",
    history: "HISTORY",
    economy: "ECONOMY",
    art: "ART",
    humanity: "HUMANITIES",
    lifestyle: "HOME",
    trip: "TRAVEL",
    health: "HEALTH",
  };
  return mapping[categoryId];
}

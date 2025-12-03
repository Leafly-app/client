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

export interface CategoryData {
  id: CategoryType;
  label: string;
  color: string;
  icon: React.ComponentType<SvgProps>;
}

export const CATEGORIES: CategoryData[] = [
  { id: "all", label: "전체", color: colors.category.all, icon: IcCategoryAll },
  {
    id: "literature",
    label: "소설/시/희곡",
    color: colors.category.literature,
    icon: IcCategoryLiterature,
  },
  { id: "essay", label: "에세이", color: colors.category.essay, icon: IcCategoryEssay },
  {
    id: "development",
    label: "자기계발",
    color: colors.category.development,
    icon: IcCategoryDevelopment,
  },
  { id: "science", label: "과학", color: colors.category.science, icon: IcCategoryScience },
  { id: "history", label: "역사", color: colors.category.history, icon: IcCategoryHistory },
  {
    id: "economy",
    label: "경제경영",
    color: colors.category.economy,
    icon: IcCategoryEconomy,
  },
  {
    id: "art",
    label: "예술/대중문화",
    color: colors.category.art,
    icon: IcCategoryArt,
  },
  {
    id: "humanity",
    label: "인문학",
    color: colors.category.humanity,
    icon: IcCategoryHumanity,
  },
  {
    id: "lifestyle",
    label: "가정/요리/뷰티",
    color: colors.category.lifestyle,
    icon: IcCategoryLifestyle,
  },
  { id: "trip", label: "여행", color: colors.category.trip, icon: IcCategoryTrip },
  { id: "health", label: "건강/취미/레저", color: colors.category.health, icon: IcCategoryHealth },
];

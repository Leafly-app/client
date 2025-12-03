export type SortOption = "latest" | "oldest" | "highRating" | "lowRating";

export interface SortOptionData {
  value: SortOption;
  label: string;
}

export const SORT_OPTIONS: SortOptionData[] = [
  { value: "latest", label: "최신순" },
  { value: "oldest", label: "오래된순" },
  { value: "highRating", label: "별점 높은순" },
  { value: "lowRating", label: "별점 낮은순" },
];

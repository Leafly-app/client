import type { ApiResponse } from "./api";

export type Gender = "남자" | "여자" | "기타" | "선택안함";

export type ReadingPurpose = "취미" | "자기계발" | "학습" | "업무" | "힐링";

export type ReadingFrequency = "매일" | "주 2~3회" | "주 1회" | "월 1~2회" | "가끔";

export type GenreType =
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

export interface OnboardingRequest {
  birthYear: string;
  gender: Gender;
  readingPurpose: ReadingPurpose;
  readingFrequency: ReadingFrequency;
  favoriteGenres: GenreType[];
}

export type OnboardingResponse = ApiResponse<null>;

export interface Book {
  reason: string;
  isbn: string;
  title: string;
  author: string;
  cover: string;
  rating: number;
  isLiked: boolean;
}

export interface RecommendedBook extends Book {
  id: string;
}

export interface SearchBook {
  isbn: string;
  title: string;
  author: string;
  cover: string;
  category: string;
  rating: number;
  isLiked: boolean;
}

export type BookGenre =
  | "소설/시/희곡"
  | "에세이"
  | "자기계발"
  | "과학"
  | "역사"
  | "경제경영"
  | "예술/대중문화"
  | "인문학"
  | "가정/요리/뷰티"
  | "여행"
  | "건강/취미/레저";

export interface SearchBooksParams {
  keyword: string;
  genres: BookGenre[] | null;
}

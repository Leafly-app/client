export interface BookDetailInfo {
  title: string;
  author: string;
  publisher: string;
  pubDate: string;
  description: string;
  isbn13: string;
  cover: string;
  priceStandard: number;
  priceSales: number;
}

export interface BookRecommendation {
  isbn: string;
  title: string;
  author: string;
  cover: string;
}

export interface BookDetailResponse {
  bookDetail: BookDetailInfo;
  aiSummary: string;
  aiTags: string[];
  recommendations: BookRecommendation[];
  isLiked: boolean;
}

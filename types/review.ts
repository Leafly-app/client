export interface CreateReviewRequest {
  title: string;
  author: string;
  thumbnail: string;
  rating: number;
  category: string;
  reviewTitle?: string;
  content: string;
  images?: string[];
}

export interface CreateReviewResponse {
  isSuccess: boolean;
  timestamp: string;
  code: string;
  httpStatus: number;
  message: string;
  data: null;
}

export interface Review {
  reviewId: number;
  title: string;
  thumbnail: string;
  rating: number;
  createAt: string;
}

export interface GetReviewsResponse {
  isSuccess: boolean;
  timestamp: string;
  code: string;
  httpStatus: number;
  message: string;
  data: {
    count: number;
    reviews: Review[];
  };
}

export interface ReviewDetail {
  title: string;
  thumbnail: string;
  author: string;
  tags: string[];
  rating: number;
  reviewTitle: string;
  createAt: string;
  content: string;
  images: string[];
}

export interface GetReviewDetailResponse {
  isSuccess: boolean;
  timestamp: string;
  code: string;
  httpStatus: number;
  message: string;
  data: ReviewDetail;
}

export interface DraftReview {
  selectedBook: {
    title: string;
    author: string;
    cover: string;
    isbn: string;
    category: string;
  };
  rating: number;
  title: string;
  content: string;
  images: string[];
  savedAt: string;
}

export interface DeleteReviewResponse {
  isSuccess: boolean;
  timestamp: string;
  code: string;
  httpStatus: number;
  message: string;
  data: null;
}

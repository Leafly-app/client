import type {
  CreateReviewRequest,
  CreateReviewResponse,
  DeleteReviewResponse,
  GetReviewDetailResponse,
  GetReviewsResponse,
} from "@/types/review";
import API from "./api";

export const createReview = async (data: CreateReviewRequest): Promise<CreateReviewResponse> => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("author", data.author);
  formData.append("thumbnail", data.thumbnail);
  formData.append("rating", data.rating.toString());
  formData.append("category", data.category);
  formData.append("content", data.content);
  formData.append("isbn", data.isbn);

  if (data.reviewTitle) {
    formData.append("reviewTitle", data.reviewTitle);
  }

  if (data.images && data.images.length > 0) {
    for (let i = 0; i < Math.min(data.images.length, 3); i++) {
      const uri = data.images[i];
      const filename = uri.split("/").pop() || `image_${i}.jpg`;
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : "image/jpeg";

      formData.append("images", {
        uri,
        name: filename,
        type,
      } as any);
    }
  }

  const response = await API.post<CreateReviewResponse>("/api/bookreviews", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getReviews = async (): Promise<GetReviewsResponse> => {
  const response = await API.get<GetReviewsResponse>("/api/bookreviews");
  return response.data;
};

export const getReviewDetail = async (reviewId: number): Promise<GetReviewDetailResponse> => {
  const response = await API.get<GetReviewDetailResponse>(`/api/bookreviews/${reviewId}`);
  return response.data;
};

export const deleteReview = async (reviewId: number): Promise<DeleteReviewResponse> => {
  const response = await API.delete<DeleteReviewResponse>(`/api/bookreviews/${reviewId}`);
  return response.data;
};

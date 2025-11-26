import type { ApiResponse } from "@/types/api";
import type { AddToLibraryRequest } from "@/types/library/library";
import API from "./api";

export const addToLibrary = async (
  isbn: string,
  data: AddToLibraryRequest,
): Promise<ApiResponse<null>> => {
  const response = await API.post<ApiResponse<null>>(`/api/libraries/${isbn}`, data);
  return response.data;
};

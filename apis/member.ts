import type { ApiResponse } from "@/types/api";
import type { MemberProfile } from "@/types/member/member";
import API from "./api";

export const getMemberProfile = async (): Promise<ApiResponse<MemberProfile>> => {
  try {
    const response = await API.get<ApiResponse<MemberProfile>>("/api/members");
    return response.data;
  } catch (error) {
    throw error;
  }
};

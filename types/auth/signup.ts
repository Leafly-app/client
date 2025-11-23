import type { ApiResponse } from "../api";

export interface SignupRequest {
  email: string;
  password: string;
  passwordCheck: string;
  nickname: string;
}

export type SignupResponse = ApiResponse<null>;

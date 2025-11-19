import { ApiResponse } from "../api";
import { UserInfo } from "./user";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginData {
  accessToken: string;
  refreshToken: string;
  user: UserInfo;
}

export type LoginResponse = ApiResponse<LoginData>;

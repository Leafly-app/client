import { ApiResponse } from "../api";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginData {
  token: string;
}

export type LoginResponse = ApiResponse<LoginData>;

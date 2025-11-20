import type { LoginRequest, LoginResponse } from "@/types/auth/login";
import type { SignupRequest, SignupResponse } from "@/types/auth/signup";
import API from "./api";

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await API.post<LoginResponse>("/api/members/signin", data);
  return response.data;
};

export const signup = async (data: SignupRequest): Promise<SignupResponse> => {
  const response = await API.post<SignupResponse>("/api/members/signup", data);
  return response.data;
};

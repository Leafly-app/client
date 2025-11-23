import type { LoginRequest, LoginResponse } from "@/types/auth/login";
import type { SignupRequest, SignupResponse } from "@/types/auth/signup";
import type { OnboardingRequest, OnboardingResponse } from "@/types/onboarding";
import API from "./api";

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await API.post<LoginResponse>("/api/members/signin", data);
  return response.data;
};

export const signup = async (data: SignupRequest): Promise<SignupResponse> => {
  const response = await API.post<SignupResponse>("/api/members/signup", data);
  return response.data;
};

export const submitOnboarding = async (data: OnboardingRequest): Promise<OnboardingResponse> => {
  const response = await API.post<OnboardingResponse>("/api/members/onboarding", data);
  return response.data;
};

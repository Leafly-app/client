import { UserInfo } from "@/types/auth/user";

interface JwtPayload {
  sub: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
}

export const decodeJwt = (token: string): JwtPayload | null => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    const payload = parts[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
};

export const getUserFromToken = (token: string): UserInfo | null => {
  const payload = decodeJwt(token);
  if (!payload) {
    return null;
  }

  return {
    email: payload.sub,
    nickname: payload.name,
  };
};

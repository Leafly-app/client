import type { UserInfo } from "@/types/auth/user";

interface JwtPayload {
  sub: string;
  email?: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
}

const base64UrlDecode = (base64Url: string): string => {
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

  const padding = base64.length % 4;
  if (padding > 0) {
    base64 += "=".repeat(4 - padding);
  }

  try {
    if (typeof atob !== "undefined") {
      return atob(base64);
    } else {
      return Buffer.from(base64, "base64").toString("utf8");
    }
  } catch (error) {
    throw new Error(`Failed to decode base64: ${error}`);
  }
};

export const decodeJwt = (token: string): JwtPayload | null => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return null;
    }

    const payload = parts[1];
    const decoded = JSON.parse(base64UrlDecode(payload));
    return decoded;
  } catch {
    return null;
  }
};

export const getUserFromToken = (token: string): UserInfo | null => {
  const payload = decodeJwt(token);
  if (!payload) {
    return null;
  }

  return {
    id: payload.sub,
    email: payload.email || payload.sub,
    nickname: payload.name,
  };
};

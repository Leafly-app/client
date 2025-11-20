import { UserInfo } from "@/types/auth/user";

interface JwtPayload {
  sub: string;
  email?: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
}

const base64UrlDecode = (base64Url: string): string => {
  // Convert base64url to base64
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

  // Add padding
  const padding = base64.length % 4;
  if (padding > 0) {
    base64 += '='.repeat(4 - padding);
  }

  // Decode using atob if available, fallback to Buffer for Expo/Node
  try {
    if (typeof atob !== 'undefined') {
      return atob(base64);
    } else {
      // Fallback for environments without atob (Node.js/Expo)
      return Buffer.from(base64, 'base64').toString('utf8');
    }
  } catch (error) {
    throw new Error(`Failed to decode base64: ${error}`);
  }
};

export const decodeJwt = (token: string): JwtPayload | null => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    const payload = parts[1];
    const decoded = JSON.parse(base64UrlDecode(payload));
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
    id: payload.sub,
    email: payload.email || payload.sub,
    nickname: payload.name,
  };
};

import type { UserInfo } from "@/types/auth/user";
import { secureStorage } from "@/utils/secureStorage";
import { create } from "zustand";

interface AuthState {
  user: UserInfo | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setUser: (user: UserInfo) => void;
  setTokens: (accessToken: string, refreshToken: string) => Promise<void>;
  login: (user: UserInfo, token: string) => Promise<void>;
  logout: () => Promise<void>;
  loadTokens: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: true,
    }),

  setTokens: async (accessToken, refreshToken) => {
    await secureStorage.setTokens(accessToken, refreshToken);
    set({
      accessToken,
      refreshToken,
    });
  },

  login: async (user, token) => {
    await secureStorage.setTokens(token, token);
    set({
      user,
      accessToken: token,
      refreshToken: token,
      isAuthenticated: true,
    });
  },

  logout: async () => {
    await secureStorage.clearTokens();
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    });
  },

  loadTokens: async () => {
    try {
      const { accessToken, refreshToken } = await secureStorage.getTokens();
      if (accessToken && refreshToken) {
        set({
          accessToken,
          refreshToken,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        set({ isLoading: false });
      }
    } catch {
      set({ isLoading: false });
    }
  },
}));

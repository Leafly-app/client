import { create } from "zustand";
import type { UserInfo } from "@/types/auth/user";
import { secureStorage } from "@/utils/secureStorage";

interface AuthState {
  user: UserInfo | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setUser: (user: UserInfo) => void;
  setToken: (token: string) => Promise<void>;
  login: (user: UserInfo, token: string) => Promise<void>;
  logout: () => Promise<void>;
  loadToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: true,
    }),

  setToken: async (token) => {
    await secureStorage.setToken(token);
    set({
      token,
    });
  },

  login: async (user, token) => {
    await secureStorage.setToken(token);
    set({
      user,
      token,
      isAuthenticated: true,
    });
  },

  logout: async () => {
    await secureStorage.clearToken();
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },

  loadToken: async () => {
    try {
      const token = await secureStorage.getToken();
      if (token) {
        set({
          token,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        set({ isLoading: false });
      }
    } catch (err) {
      console.error("Failed to load token:", err);
      set({ isLoading: false });
    }
  },
}));

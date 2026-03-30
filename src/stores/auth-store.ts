import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Profile } from "../lib/database.types";

interface DemoProfile {
  id: string;
  nickname: string;
  email: string | null;
  team_id: string;
  team_name: string;
  team_color: string;
  avatar_url: string | null;
}

interface AuthState {
  /** True once the initial session check has completed */
  initialized: boolean;
  /** Supabase user ID or "demo-user" in offline mode */
  userId: string | null;
  /** User profile data */
  profile: Profile | DemoProfile | null;
  /** True when Supabase is not configured (demo/dev mode) */
  isDemo: boolean;

  setInitialized: () => void;
  setUser: (userId: string, profile: Profile | DemoProfile) => void;
  setProfile: (profile: Profile | DemoProfile) => void;
  setDemo: (profile: DemoProfile) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      initialized: false,
      userId: null,
      profile: null,
      isDemo: false,

      setInitialized: () => set({ initialized: true }),

      setUser: (userId, profile) =>
        set({ userId, profile, initialized: true }),

      setProfile: (profile) => set({ profile }),

      setDemo: (profile) =>
        set({
          userId: "demo-user",
          profile,
          isDemo: true,
          initialized: true,
        }),

      logout: () =>
        set({
          userId: null,
          profile: null,
          isDemo: false,
        }),
    }),
    {
      name: "wc2026-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        userId: state.userId,
        profile: state.profile,
        isDemo: state.isDemo,
      }),
    },
  ),
);

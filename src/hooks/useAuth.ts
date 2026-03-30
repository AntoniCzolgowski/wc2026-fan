import { useEffect } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { getProfile } from "../lib/auth";
import { useAuthStore } from "../stores/auth-store";

/**
 * Initialize auth state on app mount.
 * Checks for existing session and subscribes to auth changes.
 */
export function useAuthInit() {
  const { initialized, setUser, setInitialized, logout } = useAuthStore();

  useEffect(() => {
    if (initialized) return;

    if (!isSupabaseConfigured()) {
      // In demo mode, check if there's a persisted demo session
      setInitialized();
      return;
    }

    // Check existing session
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (user) {
        const profile = await getProfile(user.id);
        if (profile) {
          setUser(user.id, profile);
          return;
        }
      }
      setInitialized();
    });

    // Subscribe to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        const profile = await getProfile(session.user.id);
        if (profile) {
          setUser(session.user.id, profile);
        }
      } else if (event === "SIGNED_OUT") {
        logout();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [initialized, setUser, setInitialized, logout]);
}

/**
 * Access auth state in components.
 */
export function useAuth() {
  return useAuthStore();
}

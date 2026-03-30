import { supabase, isSupabaseConfigured } from "./supabase";
import type { ProfileInsert } from "./database.types";

export interface SignUpData {
  email: string;
  password: string;
  nickname: string;
  teamId: string;
  teamName: string;
  teamColor: string;
}

export interface SignInData {
  email: string;
  password: string;
}

/**
 * Register a new user. Creates auth account + profile row.
 */
export async function signUp(data: SignUpData) {
  if (!isSupabaseConfigured()) {
    return { user: null, error: null, demo: true };
  }

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (authError) {
    return { user: null, error: authError.message };
  }

  if (!authData.user) {
    return { user: null, error: "Failed to create account" };
  }

  const profile: ProfileInsert = {
    id: authData.user.id,
    nickname: data.nickname,
    email: data.email,
    team_id: data.teamId,
    team_name: data.teamName,
    team_color: data.teamColor,
  };

  const { error: profileError } = await supabase
    .from("profiles")
    .insert(profile as never);

  if (profileError) {
    return { user: null, error: profileError.message };
  }

  return { user: authData.user, error: null };
}

/**
 * Sign in with email and password.
 */
export async function signIn(data: SignInData) {
  if (!isSupabaseConfigured()) {
    return { user: null, error: null, demo: true };
  }

  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    return { user: null, error: error.message };
  }

  return { user: authData.user, error: null };
}

/**
 * Sign out the current user.
 */
export async function signOut() {
  if (!isSupabaseConfigured()) return;
  await supabase.auth.signOut();
}

/**
 * Get the currently signed-in user (from cached session).
 */
export async function getCurrentUser() {
  if (!isSupabaseConfigured()) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

/**
 * Fetch the profile for the current user.
 */
export async function getProfile(userId: string) {
  if (!isSupabaseConfigured()) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) return null;
  return data;
}

/**
 * Update user profile fields.
 */
export async function updateProfile(
  userId: string,
  updates: { nickname?: string; team_id?: string; team_name?: string; team_color?: string },
) {
  if (!isSupabaseConfigured()) {
    return { error: null, demo: true };
  }

  const { error } = await supabase
    .from("profiles")
    .update({ ...updates, updated_at: new Date().toISOString() } as never)
    .eq("id", userId);

  return { error: error?.message ?? null };
}

/**
 * Check if a nickname is already taken.
 */
export async function isNicknameAvailable(nickname: string): Promise<boolean> {
  if (!isSupabaseConfigured()) return true;

  const { count } = await supabase
    .from("profiles")
    .select("id", { count: "exact", head: true })
    .ilike("nickname", nickname);

  return count === 0;
}

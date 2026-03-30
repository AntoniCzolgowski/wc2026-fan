/**
 * Supabase database types — generated from the schema.
 * These types are used to provide type safety for all database operations.
 *
 * For now, manually maintained. When the Supabase project is live,
 * regenerate with: npx supabase gen types typescript --project-id <id>
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          nickname: string;
          email: string | null;
          phone: string | null;
          team_id: string;
          team_name: string;
          team_color: string;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          nickname: string;
          email?: string | null;
          phone?: string | null;
          team_id: string;
          team_name: string;
          team_color: string;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          nickname?: string;
          email?: string | null;
          phone?: string | null;
          team_id?: string;
          team_name?: string;
          team_color?: string;
          avatar_url?: string | null;
          updated_at?: string;
        };
      };
      brackets: {
        Row: {
          id: string;
          user_id: string;
          mode: "simple" | "advanced";
          total_points: number;
          is_locked: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          mode?: "simple" | "advanced";
          total_points?: number;
          is_locked?: boolean;
        };
        Update: {
          mode?: "simple" | "advanced";
          total_points?: number;
          is_locked?: boolean;
          updated_at?: string;
        };
      };
      bracket_groups: {
        Row: {
          id: string;
          bracket_id: string;
          group_letter: string;
          predicted_order: string[];
        };
        Insert: {
          id?: string;
          bracket_id: string;
          group_letter: string;
          predicted_order: string[];
        };
        Update: {
          predicted_order?: string[];
        };
      };
      bracket_entries: {
        Row: {
          id: string;
          bracket_id: string;
          match_id: string;
          stage: string;
          predicted_home_score: number | null;
          predicted_away_score: number | null;
          predicted_winner: string | null;
          points_awarded: number;
        };
        Insert: {
          id?: string;
          bracket_id: string;
          match_id: string;
          stage: string;
          predicted_home_score?: number | null;
          predicted_away_score?: number | null;
          predicted_winner?: string | null;
        };
        Update: {
          predicted_home_score?: number | null;
          predicted_away_score?: number | null;
          predicted_winner?: string | null;
          points_awarded?: number;
        };
      };
      game_scores: {
        Row: {
          id: string;
          user_id: string;
          game: "score_the_goal" | "guess_the_player" | "guess_the_flag" | "guess_the_city";
          score: number;
          metadata: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          game: "score_the_goal" | "guess_the_player" | "guess_the_flag" | "guess_the_city";
          score: number;
          metadata?: Json;
        };
        Update: never;
      };
      daily_challenge_results: {
        Row: {
          id: string;
          user_id: string;
          challenge_date: string;
          answers: Json;
          score: number;
          total_time_ms: number;
        };
        Insert: {
          id?: string;
          user_id: string;
          challenge_date: string;
          answers: Json;
          score: number;
          total_time_ms: number;
        };
        Update: never;
      };
      private_leagues: {
        Row: {
          id: string;
          name: string;
          invite_code: string;
          created_by: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          invite_code?: string;
          created_by: string;
        };
        Update: {
          name?: string;
        };
      };
      league_members: {
        Row: {
          league_id: string;
          user_id: string;
          joined_at: string;
        };
        Insert: {
          league_id: string;
          user_id: string;
        };
        Update: never;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      bracket_mode: "simple" | "advanced";
      game_type: "score_the_goal" | "guess_the_player" | "guess_the_flag" | "guess_the_city";
    };
  };
}

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type ProfileInsert = Database["public"]["Tables"]["profiles"]["Insert"];
export type Bracket = Database["public"]["Tables"]["brackets"]["Row"];
export type GameScore = Database["public"]["Tables"]["game_scores"]["Row"];
export type DailyChallengeResult = Database["public"]["Tables"]["daily_challenge_results"]["Row"];

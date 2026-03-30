import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { TeamPicker } from "./TeamPicker";
import { IconZap, IconCheck, IconTrophy } from "../ui/icons";
import { useAuthStore } from "../../stores/auth-store";
import { isSupabaseConfigured } from "../../lib/supabase";
import { signUp } from "../../lib/auth";
import type { Team } from "../../lib/constants";
import "./registration.css";

export function RegistrationScreen() {
  const navigate = useNavigate();
  const { userId, setDemo, setUser } = useAuthStore();

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect if already logged in
  if (userId) {
    navigate("/", { replace: true });
    return null;
  }

  const nicknameError = validateNickname(nickname);
  const emailError = email.length > 0 ? validateEmail(email) : undefined;
  const canSubmit =
    nickname.length >= 2 &&
    !nicknameError &&
    !emailError &&
    selectedTeam !== null;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit || !selectedTeam) return;

    setLoading(true);
    setError(null);

    try {
      if (!isSupabaseConfigured()) {
        // Demo mode — store locally
        setDemo({
          id: "demo-user",
          nickname: nickname.trim(),
          email: email || null,
          team_id: selectedTeam.id,
          team_name: selectedTeam.name,
          team_color: selectedTeam.color,
          avatar_url: null,
        });
        navigate("/", { replace: true });
        return;
      }

      // Live Supabase mode
      if (!email) {
        setError("Email is required for account creation");
        setLoading(false);
        return;
      }

      const result = await signUp({
        email,
        password: generateTempPassword(),
        nickname: nickname.trim(),
        teamId: selectedTeam.id,
        teamName: selectedTeam.name,
        teamColor: selectedTeam.color,
      });

      if (result.error) {
        setError(result.error);
        setLoading(false);
        return;
      }

      if (result.user) {
        setUser(result.user.id, {
          id: result.user.id,
          nickname: nickname.trim(),
          email,
          phone: null,
          team_id: selectedTeam.id,
          team_name: selectedTeam.name,
          team_color: selectedTeam.color,
          avatar_url: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
      }

      navigate("/", { replace: true });
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="reg-screen">
      <form className="reg-content" onSubmit={handleSubmit} noValidate>
        {/* Logo */}
        <div className="reg-logo">
          <div className="reg-logo__icon">
            <IconTrophy size={28} style={{ color: "white" }} />
          </div>
          <div className="reg-logo__title">FIFA WORLD CUP 2026</div>
          <div className="reg-logo__subtitle">USA · Mexico · Canada</div>
        </div>

        <h2 className="reg-heading">Pick Your Experience</h2>

        {/* Nickname */}
        <Input
          label="Nickname"
          placeholder="Enter your nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          error={nickname.length > 0 ? nicknameError : undefined}
          maxLength={20}
          autoComplete="username"
          autoFocus
        />

        {/* Email */}
        <Input
          label="Email or Phone"
          placeholder="email@example.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
          autoComplete="email"
          hint={isSupabaseConfigured() ? undefined : "Optional in demo mode"}
        />

        {/* Team Picker */}
        <TeamPicker selectedTeamId={selectedTeam?.id ?? null} onSelect={setSelectedTeam} />

        {/* Selected team indicator */}
        <div className="reg-selected-team">
          {selectedTeam && (
            <>
              <span className="reg-selected-team__dot">
                <IconCheck size={12} style={{ color: "white" }} />
              </span>
              {selectedTeam.name} selected
            </>
          )}
        </div>

        {/* Error */}
        {error && <div className="reg-form-error" role="alert">{error}</div>}

        {/* Submit */}
        <Button type="submit" disabled={!canSubmit} loading={loading}>
          <IconZap size={16} />
          LET'S GO
        </Button>
      </form>
    </div>
  );
}

/* ───── Validation helpers ───── */

function validateNickname(value: string): string | undefined {
  if (value.length === 0) return undefined;
  if (value.length < 2) return "At least 2 characters";
  if (value.length > 20) return "Max 20 characters";
  if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
    return "Letters, numbers, - and _ only";
  }
  return undefined;
}

function validateEmail(value: string): string | undefined {
  if (value.length === 0) return undefined;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return "Enter a valid email";
  }
  return undefined;
}

/**
 * Generate a random password for the initial signup.
 * Users will authenticate via magic link in production.
 */
function generateTempPassword(): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => chars[b % chars.length]).join("");
}

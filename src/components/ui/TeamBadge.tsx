import { getTeam, getFlagUrl } from "../../lib/constants";

interface TeamBadgeProps {
  teamId: string;
  size?: "sm" | "md" | "lg";
  showName?: boolean;
  showStripe?: boolean;
}

export function TeamBadge({
  teamId,
  size = "md",
  showName = true,
  showStripe = false,
}: TeamBadgeProps) {
  const team = getTeam(teamId);
  if (!team) return null;

  const flagSize = size === "sm" ? 24 : size === "lg" ? 48 : 32;

  return (
    <span className="team-badge">
      <FlagIcon code={team.code} size={flagSize} />
      {showName && <span className="team-badge__name">{team.name}</span>}
      {showStripe && (
        <span
          className="team-badge__stripe"
          style={{ backgroundColor: team.color }}
        />
      )}
    </span>
  );
}

interface FlagIconProps {
  code: string;
  size?: number;
}

export function FlagIcon({ code, size = 32 }: FlagIconProps) {
  const url = getFlagUrl(code);

  if (!url) {
    return (
      <span
        className={`flag flag--${size <= 24 ? "sm" : size <= 32 ? "md" : "lg"}`}
        style={{
          background: "var(--color-bg-secondary)",
          border: "1px dashed var(--color-text-muted)",
          width: size,
          height: size,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 10,
          color: "var(--color-text-muted)",
        }}
        aria-label="TBD"
      >
        ?
      </span>
    );
  }

  return (
    <img
      src={url}
      alt={`${code} flag`}
      className={`flag flag--${size <= 24 ? "sm" : size <= 32 ? "md" : "lg"}`}
      style={{ width: size, height: size, objectFit: "cover" }}
      loading="lazy"
    />
  );
}

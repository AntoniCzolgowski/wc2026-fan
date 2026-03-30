import { TEAMS, getFlagUrl } from "../../lib/constants";
import type { Team } from "../../lib/constants";
import "./registration.css";

interface TeamPickerProps {
  selectedTeamId: string | null;
  onSelect: (team: Team) => void;
}

export function TeamPicker({ selectedTeamId, onSelect }: TeamPickerProps) {
  // Show qualified teams first (non-playoff), then playoff slots
  const sortedTeams = [...TEAMS].sort((a, b) => {
    const aPlayoff = a.id.startsWith("playoff") ? 1 : 0;
    const bPlayoff = b.id.startsWith("playoff") ? 1 : 0;
    if (aPlayoff !== bPlayoff) return aPlayoff - bPlayoff;
    return a.name.localeCompare(b.name);
  });

  return (
    <div>
      <h3 className="reg-section-title">Your Team</h3>
      <div className="team-grid" role="radiogroup" aria-label="Select your team">
        {sortedTeams
          .filter((t) => !t.id.startsWith("playoff"))
          .map((team) => (
            <TeamCell
              key={team.id}
              team={team}
              selected={selectedTeamId === team.id}
              onSelect={onSelect}
            />
          ))}
      </div>
    </div>
  );
}

function TeamCell({
  team,
  selected,
  onSelect,
}: {
  team: Team;
  selected: boolean;
  onSelect: (t: Team) => void;
}) {
  const flagUrl = getFlagUrl(team.code);

  return (
    <button
      className={`team-cell ${selected ? "team-cell--selected" : ""}`}
      onClick={() => onSelect(team)}
      role="radio"
      aria-checked={selected}
      aria-label={team.name}
      type="button"
    >
      {flagUrl ? (
        <img
          src={flagUrl}
          alt=""
          className="team-cell__flag"
          loading="lazy"
        />
      ) : (
        <span className="team-cell__flag team-cell__flag--placeholder">?</span>
      )}
      <span className="team-cell__code">{team.code.toUpperCase().replace("GB-", "")}</span>
    </button>
  );
}

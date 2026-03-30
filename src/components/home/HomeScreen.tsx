import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  WORLD_CUP_START,
  MATCHES,
  getNextMatch,
  getTeam,
  getCity,
  getFlagUrl,
} from "../../lib/constants";
import { daysUntil, formatShortDate, formatTime } from "../../lib/format";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import {
  IconSun,
  IconPlay,
  IconGames,
  IconTrophy,
  IconChart,
  IconUser,
} from "../ui/icons";
import "./home.css";

export function HomeScreen() {
  const { profile } = useAuth();
  const navigate = useNavigate();

  const days = daysUntil(WORLD_CUP_START);
  const nextMatch = getNextMatch();

  const teamFlag = profile?.team_id
    ? getFlagUrl(getTeam(profile.team_id)?.code ?? "xx")
    : "";

  return (
    <div className="home">
      {/* Greeting */}
      <div className="home-greeting">
        <div className="home-greeting__text">
          <h2>Hi, {profile?.nickname ?? "Fan"}!</h2>
          <p>Let's play</p>
        </div>
        {teamFlag && (
          <img
            src={teamFlag}
            alt={`${profile?.team_name ?? ""} flag`}
            className="home-greeting__flag"
          />
        )}
      </div>

      {/* Countdown */}
      <div className="home-countdown">
        <div>
          <div className="home-countdown__number">{days}</div>
          <div className="home-countdown__label">days to go</div>
        </div>
        <div className="home-countdown__right">
          <div className="home-countdown__event">World Cup 2026</div>
          <div className="home-countdown__date">
            June 11 · Opening Match
          </div>
        </div>
      </div>

      {/* Daily Challenge */}
      <div className="home-daily">
        <div className="home-daily__header">
          <span className="home-daily__tag">
            <IconSun size={16} />
            Daily Challenge
          </span>
          <Badge variant="success">NEW</Badge>
        </div>
        <p className="home-daily__desc">
          5 questions · Same for everyone worldwide
        </p>
        <Button
          onClick={() => navigate("/games")}
          style={{ height: 44, fontSize: "var(--text-sm)" }}
        >
          <IconPlay size={14} />
          PLAY NOW
        </Button>
      </div>

      {/* Next Match */}
      {nextMatch && <NextMatchCard matchId={nextMatch.id} />}

      {/* Quick Links */}
      <div className="home-quicklinks">
        <button className="home-quicklink" onClick={() => navigate("/games")}>
          <IconGames size={24} style={{ color: "var(--color-primary)" }} />
          <span className="home-quicklink__name">Games</span>
        </button>
        <button className="home-quicklink" onClick={() => navigate("/bracket")}>
          <IconTrophy size={24} style={{ color: "var(--color-gold)" }} />
          <span className="home-quicklink__name">Bracket</span>
        </button>
        <button
          className="home-quicklink"
          onClick={() => navigate("/leaderboard")}
        >
          <IconChart size={24} style={{ color: "var(--color-pitch-green)" }} />
          <span className="home-quicklink__name">Leaders</span>
        </button>
        <button className="home-quicklink" onClick={() => {}}>
          <IconUser size={24} style={{ color: "var(--color-text-secondary)" }} />
          <span className="home-quicklink__name">Profile</span>
        </button>
      </div>
    </div>
  );
}

function NextMatchCard({ matchId }: { matchId: string }) {
  const match = MATCHES.find((m) => m.id === matchId);
  if (!match) return null;

  const homeTeam = match.homeTeamId ? getTeam(match.homeTeamId) : null;
  const awayTeam = match.awayTeamId ? getTeam(match.awayTeamId) : null;
  const city = getCity(match.cityId);
  const matchDate = new Date(match.date);

  return (
    <div className="home-match">
      <div className="home-match__label">Next Match</div>
      <div className="home-match__teams">
        {homeTeam && (
          <div className="home-match__team">
            <img
              src={getFlagUrl(homeTeam.code)}
              alt=""
              className="home-match__team-flag"
              loading="lazy"
            />
            <span className="home-match__team-name">{homeTeam.name}</span>
          </div>
        )}
        <span className="home-match__vs">VS</span>
        {awayTeam && (
          <div className="home-match__team">
            <img
              src={getFlagUrl(awayTeam.code)}
              alt=""
              className="home-match__team-flag"
              loading="lazy"
            />
            <span className="home-match__team-name">{awayTeam.name}</span>
          </div>
        )}
      </div>
      <div className="home-match__info">
        {formatShortDate(matchDate)} · {formatTime(matchDate)}
        {city && ` · ${city.stadium}, ${city.name}`}
      </div>
    </div>
  );
}

# FIFA World Cup 2026 Fan Experience App — Implementation Plan (v2)

## Context

**Repo:** `https://github.com/AntoniCzolgowski/wc2026-fan` (standalone, branch `main`)
**Local path:** `/Users/antoniczolgowski/Library/CloudStorage/OneDrive-Personal/Pulpit/CuBoulder/App`
**Dev server:** `npm run dev` → `http://127.0.0.1:5174` (host: 0.0.0.0 for mobile testing)

**Phase 0 + 1 are COMPLETE.** This plan covers everything from Phase 1.5 onward.

**Current state:**
- Vite + React 19 + TypeScript 5.8 scaffold
- Design system: tokens.css, global.css, components.css
- UI primitives: Button, Card, Input, Badge, TopBar, BottomNav, Modal, TeamBadge, icons
- Shared: ErrorBoundary, LoadingSpinner, ProtectedRoute
- Libs: supabase.ts (has demo mode — TO BE REMOVED in Phase 1.5), auth.ts, constants.ts (48 teams, 16 cities, 12 groups), format.ts, database.types.ts
- Stores: auth-store (Zustand + persist)
- Hooks: useAuth
- Router: React Router v7
- RegistrationScreen, HomeScreen, 35 tests passing, production build verified

**Infrastructure already configured:**
- Supabase project: `cpvimamnfiiuuvovjjkr` (East US / North Virginia)
  - URL: `https://cpvimamnfiiuuvovjjkr.supabase.co`
  - Publishable key: `sb_publishable_UwFSQmZMFpcCqJY3eQcivA_D-7PpkW7`
- Fly.io account: `antoni.czolgowski@gmail.com` — logged in, card added
- Vercel: connected to GitHub, deploying `wc2026-fan` repo
- `.env` present locally (gitignored): `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY`

---

## Architecture Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Backend/DB | **Supabase** | Auth, PostgreSQL, RLS, real-time presence. East US region. |
| WebSocket server | **Fly.io Node.js + Socket.io** | Multi-region: Warsaw (waw) + Chicago (ord). ~$60-96/year. |
| Navigation | **React Router v7** | Real URLs, shareable links, back button |
| State mgmt | **Zustand** | Lightweight, persist middleware |
| Drag-and-drop | **@dnd-kit** | React 19 compatible |
| Animations | **Framer Motion** | Swipe gesture detection for penalty kick |
| Styling | **Vanilla CSS + custom properties** | No Tailwind |
| Language | **Bilingual PL/EN toggle** | All UI strings + quiz questions in both languages |
| Penalty mechanic | **Swipe/flick gesture** | Framer Motion panInfo → direction + speed + curve → physics |
| Physics engine | **Custom Canvas 2D** | `game-physics.ts`: Magnus effect, drag, keeper AI |
| Live results | **api-football.com** | Paid ~$15/month. Real WC 2026 fixtures, live scores. Subscribe May 2026. |
| Bracket data | **Hardcoded 80 matches** | Full group stage (72) + knockout skeleton in constants.ts |
| 1v1 matchmaking | **Room code** | Creator gets 6-char code, shares with friend. Private only. |
| 1v1 modes | **Ultimate + Series** | Ultimate: 1× Quiz→Flag→City→Player→Penalty. Series: 5× each (25 rounds). |
| Waiting room | **Intermediate stats screen** | One player finishes early → sees stats + opponent progress. Results only after BOTH done. |
| Friend competition | **Leagues** | Friend groups called "leagues". Compete on bracket, quiz, game scores. |
| PWA distribution | **Add to Home Screen** | iOS Safari. Zero cost. All features work. Push on iOS 16.4+. |
| Bracket scoring | **Tiered** | Winner=5pts, exact score=15pts, correct group position=3pts, perfect group=20pts bonus |
| Quiz difficulty | **Flat pool** | No difficulty tiers. ~100-150 curated bilingual questions. |
| Demo mode | **None** | App requires real Supabase. No localStorage fallbacks. |

---

## New Dependencies (to add to package.json)

```json
{
  "dependencies": {
    "socket.io-client": "^4.8.0"
  },
  "devDependencies": {
    "i18next": "^24.0.0",
    "react-i18next": "^15.0.0"
  }
}
```

New service: `ws-server/` — Node.js + Socket.io deployed to Fly.io (separate directory in repo root)

---

## i18n Architecture (`src/lib/i18n.ts`)

```typescript
// Two language stores: 'pl' and 'en'
// Context: useTranslation() hook from react-i18next
// Toggle: stored in Zustand lang-store + localStorage
// src/locales/pl.json — all Polish UI strings
// src/locales/en.json — all English UI strings
// Question JSON fields: { pl: "...", en: "..." }
```

Language toggle: settings screen + small PL/EN chip in TopBar.

---

## WebSocket Server Architecture (`ws-server/`)

```
ws-server/
  package.json        (Node 20, socket.io ^4.8, express)
  tsconfig.json
  Dockerfile
  fly.toml            (regions: [waw, ord])
  src/
    index.ts          # Express healthcheck + Socket.io attach
    rooms.ts          # Map<code, RoomState>
    games/
      session.ts      # Generic game session (rounds, scores, state machine)
```

**Room state machine:** WAITING → BOTH_READY → GAME_N_ACTIVE → GAME_N_DONE → ... → ALL_DONE → RESULTS

**Key socket events:**
- `create_room` → server returns 6-char room code
- `join_room(code)` → both players connected, BOTH_READY
- `player_ready` → start countdown
- `round_result(score, time_ms)` → server updates room state
- `opponent_progress` → sent to waiting player (intermediate screen)
- `game_over` → emitted when BOTH players complete all rounds

**Disconnect handling:**
- Socket.io: `reconnection: true, reconnectionDelay: 1000, reconnectionAttempts: 5`
- Server: 45s reconnect window on disconnect
- After 45s: `player_forfeit` emitted → opponent gets full points for that round
- No `beforeunload` warning (unreliable iOS Safari)

---

## 1v1 Game Flow

```
Player A creates room → gets code "WC-4821"
Player B enters code → both connected → Countdown 3...2...1...GO!

Both play simultaneously (independent):
  Round 1: Quiz question (same for both)
  Round 2: Flag quiz (same for both)
  Round 3: City photo (same for both)
  Round 4: Player silhouette (same for both)
  Round 5: Penalty kick (each vs keeper AI)

If A finishes before B:
  → A sees: "Waiting for [B's nickname]..." + own scores + B's progress bar

When B finishes:
  → Both see results simultaneously → winner + round breakdown

Series mode: same flow but 25 rounds (5 × each mini-game)
```

---

## Quiz Question Database

**Source:** 6 documents (3 CSVs + 3 PDFs, ~600 Polish football quiz questions) — user has these.
**Target:** ~120-150 questions after filtering.
**Criteria:** WC history, great players (international), great clubs (international), Polish football (subset). Exclude: very local Polish league trivia.

**Format (`src/assets/questions/mixed.json`):**
```json
[
  {
    "id": "q001",
    "pl": "Kto strzelił słynnego gola ręką na MŚ 1986?",
    "en": "Who scored the famous Hand of God goal at WC 1986?",
    "options": {
      "pl": ["Diego Maradona", "Ronaldo", "Pelé", "Zidane"],
      "en": ["Diego Maradona", "Ronaldo", "Pelé", "Zidane"]
    },
    "correct": 0,
    "category": "history"
  }
]
```

**Categories:** history, players, clubs, poland, geography, format2026, culture

---

## Full WC 2026 Schedule (hardcode in constants.ts)

- Group stage: 72 matches (12 groups × 6 matches), June 11 – July 2, 2026
- Round of 32: 16 matches, July 4–7
- Round of 16: 8 matches, July 9–12
- Quarter-finals: 4 matches, July 14–15
- Semi-finals: 2 matches, July 18–19
- Third place + Final: July 19, 2026

Currently ~9 matches in constants.ts. Phase 8 fills all 80.

---

## Supabase Schema (to run in SQL Editor)

```sql
-- PROFILES (check if exists, may need extension)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nickname TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL,
  favorite_team TEXT NOT NULL,
  lang TEXT NOT NULL DEFAULT 'pl',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- GAME SCORES
CREATE TABLE IF NOT EXISTS game_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  game_type TEXT NOT NULL, -- 'quiz'|'flag'|'city'|'player'|'penalty'
  score INTEGER NOT NULL,
  played_at TIMESTAMPTZ DEFAULT now()
);

-- DAILY CHALLENGE RESULTS
CREATE TABLE IF NOT EXISTS daily_challenge_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  challenge_date DATE NOT NULL,
  score INTEGER NOT NULL,
  total_time_ms INTEGER NOT NULL,
  results JSONB NOT NULL,
  UNIQUE(user_id, challenge_date)
);

-- LEAGUES
CREATE TABLE IF NOT EXISTS leagues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  invite_code TEXT NOT NULL UNIQUE DEFAULT substr(md5(random()::text), 1, 8),
  created_by UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS league_members (
  league_id UUID REFERENCES leagues(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (league_id, user_id)
);

-- BRACKET PREDICTIONS
CREATE TABLE IF NOT EXISTS bracket_predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  league_id UUID REFERENCES leagues(id) ON DELETE SET NULL,
  mode TEXT NOT NULL DEFAULT 'simple', -- 'simple'|'advanced'
  prediction JSONB NOT NULL,
  points INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, league_id)
);

-- 1V1 DUEL RESULTS
CREATE TYPE IF NOT EXISTS match_mode AS ENUM ('ultimate', 'series');
CREATE TABLE IF NOT EXISTS duel_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_code TEXT NOT NULL,
  player_a UUID REFERENCES profiles(id),
  player_b UUID REFERENCES profiles(id),
  mode match_mode NOT NULL,
  winner UUID REFERENCES profiles(id),
  player_a_score INTEGER NOT NULL,
  player_b_score INTEGER NOT NULL,
  round_breakdown JSONB NOT NULL,
  played_at TIMESTAMPTZ DEFAULT now()
);

-- RLS: enable on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_challenge_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE leagues ENABLE ROW LEVEL SECURITY;
ALTER TABLE league_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE bracket_predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE duel_results ENABLE ROW LEVEL SECURITY;

-- RLS POLICIES (profiles)
CREATE POLICY "Users can read all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- RLS POLICIES (game_scores)
CREATE POLICY "Users can read all scores" ON game_scores FOR SELECT USING (true);
CREATE POLICY "Users can insert own scores" ON game_scores FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS POLICIES (daily_challenge_results)
CREATE POLICY "Users can read all daily results" ON daily_challenge_results FOR SELECT USING (true);
CREATE POLICY "Users can insert own daily result" ON daily_challenge_results FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS POLICIES (leagues)
CREATE POLICY "Anyone can read leagues" ON leagues FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create leagues" ON leagues FOR INSERT WITH CHECK (auth.uid() = created_by);

-- RLS POLICIES (league_members)
CREATE POLICY "Anyone can read league members" ON league_members FOR SELECT USING (true);
CREATE POLICY "Users can join leagues" ON league_members FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS POLICIES (bracket_predictions)
CREATE POLICY "Anyone can read bracket predictions" ON bracket_predictions FOR SELECT USING (true);
CREATE POLICY "Users can manage own predictions" ON bracket_predictions FOR ALL USING (auth.uid() = user_id);

-- RLS POLICIES (duel_results)
CREATE POLICY "Anyone can read duel results" ON duel_results FOR SELECT USING (true);
CREATE POLICY "Service can insert duel results" ON duel_results FOR INSERT WITH CHECK (true);
```

---

## Implementation Phases

### ✅ Phase 0: Foundation — COMPLETE
### ✅ Phase 1: Registration + Home — COMPLETE

---

### Phase 1.5: Supabase Production Setup ← NEXT

**Goal:** Run schema SQL in Supabase, remove all demo mode code.

1. Go to Supabase Dashboard → SQL Editor → run the full schema above
2. Remove `isDemoMode` logic from `src/lib/supabase.ts` and `src/stores/auth-store.ts`
3. Remove demo-mode branching from `src/lib/auth.ts`, `src/hooks/useAuth.ts`, `src/components/registration/RegistrationScreen.tsx`
4. Verify: `npm run dev` → registration flow writes to Supabase profiles table

---

### Phase 2: Bilingual System (i18n)

- `src/lib/i18n.ts` — i18next setup
- `src/locales/pl.json` + `src/locales/en.json` — all UI strings
- `src/stores/lang-store.ts` — Zustand lang preference + persist
- Wrap all existing UI text with `t()` calls
- TopBar: PL/EN chip toggle

---

### Phase 3: Quiz Question Database

- User uploads 6 documents (3 CSVs + 3 PDFs, ~600 Polish questions)
- Filter to ~150 WC/international/Polish-relevant questions
- Translate to bilingual PL+EN
- Add 4 answer options per question (1 correct + 3 distractors)
- Output: `src/assets/questions/mixed.json`

---

### Phase 4: Trivia Mini-Games (Solo)

Shared: QuestionCard, AnswerButton, CountdownTimer, ProgressRing, GameOverCard, MiniLeaderboard
Games: GuessTheFlag, GuessTheCity, GuessThePlayer, QuizGame
Hub: GamesHub (2×2 grid)
Data: flags.json (28), cities.json (16), players.json (100)

---

### Phase 5: Penalty Kick Engine (Solo)

- `src/lib/game-physics.ts` — Magnus effect, drag, keeper AI, post collision
- `src/components/games/GoalCanvas.tsx` — HTML5 Canvas renderer
- `src/components/games/ScoreTheGoal.tsx` — Framer Motion swipe → physics

---

### Phase 6: 1v1 Multiplayer Infrastructure

- `ws-server/` — Node.js + Socket.io, deploy to Fly.io (waw + ord regions)
- `src/hooks/useGameRoom.ts` — Socket.io client hook
- UI: DuelLobby, DuelWaitingRoom, DuelIntermediate, DuelResults

---

### Phase 7: 1v1 Game Modes (Ultimate + Series)

- `src/lib/duel-engine.ts` — question selection, scoring, winner determination
- `src/components/duel/DuelGame.tsx` — orchestrates all 5 rounds

Scoring: Quiz/Flag/City/Player correct = 100pts + time bonus (max 50pts). Penalty goal = 150pts.

---

### Phase 8: Full WC 2026 Schedule + Bracket Simple Mode

- Extend constants.ts to all 80 matches
- `src/lib/bracket-engine.ts`, `src/stores/bracket-store.ts`
- GroupStageEditor (dnd-kit drag), KnockoutBracket, BracketHub

---

### Phase 9: Bracket Advanced Mode + Friend Leagues

- ScoreInput.tsx, FIFA tiebreaker logic in bracket-engine.ts
- LeagueCreate, LeagueJoin, LeagueList, LeagueLeaderboard

---

### Phase 10: Live Results Tab (api-football.com)

- `src/lib/results-api.ts` — proxied via Supabase Edge Function
- ResultsScreen, MatchRow, GroupTable
- Subscribe to api-football.com ~May 2026

---

### Phase 11: Daily Challenge (Wordle-style)

- `src/lib/daily-challenge.ts` — seeded RNG, deterministic questions
- DailyChallenge.tsx, DailyChallengeResult.tsx, share text

---

### Phase 12: PWA + Push Notifications

- public/manifest.json, public/sw.js (service worker)
- Offline trivia, push notifications (iOS 16.4+)

---

## Phase Order Summary

| Phase | Feature | Status |
|-------|---------|--------|
| ✅ 0 | Foundation | DONE |
| ✅ 1 | Registration + Home | DONE |
| 1.5 | Supabase schema + remove demo mode | **NEXT** |
| 2 | Bilingual PL/EN | — |
| 3 | Quiz Question DB | — |
| 4 | Trivia mini-games | — |
| 5 | Penalty engine | — |
| 6 | 1v1 infra (Fly.io WS server) | — |
| 7 | 1v1 game modes | — |
| 8 | Full schedule + bracket simple | — |
| 9 | Bracket advanced + leagues | — |
| 10 | Live results | — |
| 11 | Daily challenge | — |
| 12 | PWA + push | — |

---

## Verification (per phase)

1. `npm run dev` → renders at 375px
2. `npm run test` → all tests pass
3. Supabase Dashboard → data written correctly
4. Two browser tabs → 1v1 works end-to-end
5. Chrome DevTools Device Toolbar → touch gestures work
6. iPhone Safari → PWA installable

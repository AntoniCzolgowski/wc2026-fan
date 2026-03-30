/* ================================================================
 * FIFA World Cup 2026 — Static Data Constants
 *
 * 48 teams, 12 groups, 16 host cities, match schedule.
 * Source: FIFA official draw (Dec 2025) + existing repo data.
 * ================================================================ */

export interface Team {
  id: string;
  name: string;
  code: string; // ISO 3166-1 alpha-2 (for flag-icons)
  color: string;
  group: string;
  confederation: string;
}

export interface GroupDef {
  letter: string;
  teams: string[]; // team IDs
}

export interface HostCity {
  id: string;
  name: string;
  country: string;
  stadium: string;
  capacity: number;
  lat: number;
  lng: number;
}

export interface Match {
  id: string;
  stage: "group" | "r32" | "r16" | "qf" | "sf" | "third" | "final";
  group?: string;
  homeTeamId: string | null;
  awayTeamId: string | null;
  cityId: string;
  date: string; // ISO date string
  matchday?: number;
}

/* ───── WORLD CUP START DATE ───── */
export const WORLD_CUP_START = new Date(2026, 5, 11); // June 11, 2026 (month is 0-indexed)
export const WORLD_CUP_FINAL = new Date(2026, 6, 19); // July 19, 2026

/* ───── 48 TEAMS ───── */
export const TEAMS: Team[] = [
  // Group A
  { id: "argentina", name: "Argentina", code: "ar", color: "#74ACDF", group: "A", confederation: "CONMEBOL" },
  { id: "austria", name: "Austria", code: "at", color: "#ED2939", group: "A", confederation: "UEFA" },
  { id: "jordan", name: "Jordan", code: "jo", color: "#007A3D", group: "A", confederation: "AFC" },
  { id: "playoff-a", name: "Playoff A", code: "xx", color: "#7C3AED", group: "A", confederation: "TBD" },

  // Group B
  { id: "brazil", name: "Brazil", code: "br", color: "#009739", group: "B", confederation: "CONMEBOL" },
  { id: "scotland", name: "Scotland", code: "gb-sct", color: "#005EB8", group: "B", confederation: "UEFA" },
  { id: "colombia", name: "Colombia", code: "co", color: "#FCD116", group: "B", confederation: "CONMEBOL" },
  { id: "playoff-d", name: "Playoff D", code: "xx", color: "#A855F7", group: "B", confederation: "TBD" },

  // Group C
  { id: "usa", name: "United States", code: "us", color: "#002868", group: "C", confederation: "CONCACAF" },
  { id: "england", name: "England", code: "gb-eng", color: "#C8102E", group: "C", confederation: "UEFA" },
  { id: "qatar", name: "Qatar", code: "qa", color: "#8A1538", group: "C", confederation: "AFC" },
  { id: "south-africa", name: "South Africa", code: "za", color: "#007749", group: "C", confederation: "CAF" },

  // Group D
  { id: "france", name: "France", code: "fr", color: "#002654", group: "D", confederation: "UEFA" },
  { id: "saudi-arabia", name: "Saudi Arabia", code: "sa", color: "#006C35", group: "D", confederation: "AFC" },
  { id: "australia", name: "Australia", code: "au", color: "#FFCD00", group: "D", confederation: "AFC" },
  { id: "tunisia", name: "Tunisia", code: "tn", color: "#E70013", group: "D", confederation: "CAF" },

  // Group E
  { id: "germany", name: "Germany", code: "de", color: "#1F2937", group: "E", confederation: "UEFA" },
  { id: "uruguay", name: "Uruguay", code: "uy", color: "#6CB4EE", group: "E", confederation: "CONMEBOL" },
  { id: "south-korea", name: "South Korea", code: "kr", color: "#CD2E3A", group: "E", confederation: "AFC" },
  { id: "curacao", name: "Curacao", code: "cw", color: "#0057B8", group: "E", confederation: "CONCACAF" },

  // Group F
  { id: "portugal", name: "Portugal", code: "pt", color: "#006600", group: "F", confederation: "UEFA" },
  { id: "ecuador", name: "Ecuador", code: "ec", color: "#FFD100", group: "F", confederation: "CONMEBOL" },
  { id: "croatia", name: "Croatia", code: "hr", color: "#171796", group: "F", confederation: "UEFA" },
  { id: "uzbekistan", name: "Uzbekistan", code: "uz", color: "#0099B5", group: "F", confederation: "AFC" },

  // Group G
  { id: "mexico", name: "Mexico", code: "mx", color: "#006847", group: "G", confederation: "CONCACAF" },
  { id: "netherlands", name: "Netherlands", code: "nl", color: "#F97316", group: "G", confederation: "UEFA" },
  { id: "algeria", name: "Algeria", code: "dz", color: "#006233", group: "G", confederation: "CAF" },
  { id: "cape-verde", name: "Cape Verde", code: "cv", color: "#003893", group: "G", confederation: "CAF" },

  // Group H
  { id: "spain", name: "Spain", code: "es", color: "#AA151B", group: "H", confederation: "UEFA" },
  { id: "poland", name: "Poland", code: "pl", color: "#DC143C", group: "H", confederation: "UEFA" },
  { id: "japan", name: "Japan", code: "jp", color: "#BC002D", group: "H", confederation: "AFC" },
  { id: "paraguay", name: "Paraguay", code: "py", color: "#D52B1E", group: "H", confederation: "CONMEBOL" },

  // Group I
  { id: "italy", name: "Italy", code: "it", color: "#008C45", group: "I", confederation: "UEFA" },
  { id: "switzerland", name: "Switzerland", code: "ch", color: "#D52B1E", group: "I", confederation: "UEFA" },
  { id: "iran", name: "Iran", code: "ir", color: "#239F40", group: "I", confederation: "AFC" },
  { id: "playoff-b", name: "Playoff B", code: "xx", color: "#8B5CF6", group: "I", confederation: "TBD" },

  // Group J
  { id: "canada", name: "Canada", code: "ca", color: "#FF0000", group: "J", confederation: "CONCACAF" },
  { id: "senegal", name: "Senegal", code: "sn", color: "#00853F", group: "J", confederation: "CAF" },
  { id: "cameroon", name: "Cameroon", code: "cm", color: "#007A5E", group: "J", confederation: "CAF" },
  { id: "playoff-c", name: "Playoff C", code: "xx", color: "#8B5CF6", group: "J", confederation: "TBD" },

  // Group K
  { id: "serbia", name: "Serbia", code: "rs", color: "#C6363C", group: "K", confederation: "UEFA" },
  { id: "denmark", name: "Denmark", code: "dk", color: "#C60C30", group: "K", confederation: "UEFA" },
  { id: "egypt", name: "Egypt", code: "eg", color: "#CE1126", group: "K", confederation: "CAF" },
  { id: "costa-rica", name: "Costa Rica", code: "cr", color: "#002B7F", group: "K", confederation: "CONCACAF" },

  // Group L
  { id: "nigeria", name: "Nigeria", code: "ng", color: "#008751", group: "L", confederation: "CAF" },
  { id: "turkey", name: "Turkey", code: "tr", color: "#E30A17", group: "L", confederation: "UEFA" },
  { id: "peru", name: "Peru", code: "pe", color: "#D91023", group: "L", confederation: "CONMEBOL" },
  { id: "indonesia", name: "Indonesia", code: "id", color: "#FF0000", group: "L", confederation: "AFC" },
];

/* ───── 12 GROUPS ───── */
export const GROUPS: GroupDef[] = [
  { letter: "A", teams: ["argentina", "austria", "jordan", "playoff-a"] },
  { letter: "B", teams: ["brazil", "scotland", "colombia", "playoff-d"] },
  { letter: "C", teams: ["usa", "england", "qatar", "south-africa"] },
  { letter: "D", teams: ["france", "saudi-arabia", "australia", "tunisia"] },
  { letter: "E", teams: ["germany", "uruguay", "south-korea", "curacao"] },
  { letter: "F", teams: ["portugal", "ecuador", "croatia", "uzbekistan"] },
  { letter: "G", teams: ["mexico", "netherlands", "algeria", "cape-verde"] },
  { letter: "H", teams: ["spain", "poland", "japan", "paraguay"] },
  { letter: "I", teams: ["italy", "switzerland", "iran", "playoff-b"] },
  { letter: "J", teams: ["canada", "senegal", "cameroon", "playoff-c"] },
  { letter: "K", teams: ["serbia", "denmark", "egypt", "costa-rica"] },
  { letter: "L", teams: ["nigeria", "turkey", "peru", "indonesia"] },
];

/* ───── 16 HOST CITIES ───── */
export const HOST_CITIES: HostCity[] = [
  { id: "new-york", name: "New York / NJ", country: "USA", stadium: "MetLife Stadium", capacity: 82500, lat: 40.8128, lng: -74.0742 },
  { id: "los-angeles", name: "Los Angeles", country: "USA", stadium: "SoFi Stadium", capacity: 70240, lat: 33.9535, lng: -118.339 },
  { id: "dallas", name: "Dallas", country: "USA", stadium: "AT&T Stadium", capacity: 80000, lat: 32.7473, lng: -97.0945 },
  { id: "houston", name: "Houston", country: "USA", stadium: "NRG Stadium", capacity: 72220, lat: 29.6847, lng: -95.4107 },
  { id: "atlanta", name: "Atlanta", country: "USA", stadium: "Mercedes-Benz Stadium", capacity: 71000, lat: 33.7554, lng: -84.4005 },
  { id: "philadelphia", name: "Philadelphia", country: "USA", stadium: "Lincoln Financial Field", capacity: 69176, lat: 39.9008, lng: -75.1675 },
  { id: "miami", name: "Miami", country: "USA", stadium: "Hard Rock Stadium", capacity: 64767, lat: 25.958, lng: -80.2389 },
  { id: "seattle", name: "Seattle", country: "USA", stadium: "Lumen Field", capacity: 68740, lat: 47.5952, lng: -122.3316 },
  { id: "san-francisco", name: "San Francisco", country: "USA", stadium: "Levi's Stadium", capacity: 68500, lat: 37.4033, lng: -121.9694 },
  { id: "kansas-city", name: "Kansas City", country: "USA", stadium: "Arrowhead Stadium", capacity: 76416, lat: 39.0489, lng: -94.484 },
  { id: "boston", name: "Boston", country: "USA", stadium: "Gillette Stadium", capacity: 65878, lat: 42.0909, lng: -71.2643 },
  { id: "mexico-city", name: "Mexico City", country: "Mexico", stadium: "Estadio Azteca", capacity: 87523, lat: 19.3029, lng: -99.1505 },
  { id: "monterrey", name: "Monterrey", country: "Mexico", stadium: "Estadio BBVA", capacity: 53500, lat: 25.6018, lng: -100.0098 },
  { id: "guadalajara", name: "Guadalajara", country: "Mexico", stadium: "Estadio Akron", capacity: 49850, lat: 20.6824, lng: -103.4625 },
  { id: "toronto", name: "Toronto", country: "Canada", stadium: "BMO Field", capacity: 45500, lat: 43.6332, lng: -79.4186 },
  { id: "vancouver", name: "Vancouver", country: "Canada", stadium: "BC Place", capacity: 54500, lat: 49.2768, lng: -123.112 },
];

/* ───── SAMPLE MATCHES (Group Stage — key matchups) ───── */
export const MATCHES: Match[] = [
  // Group A
  { id: "a-md1-1", stage: "group", group: "A", homeTeamId: "argentina", awayTeamId: "austria", cityId: "dallas", date: "2026-06-12T18:00:00-05:00", matchday: 1 },
  { id: "a-md1-2", stage: "group", group: "A", homeTeamId: "jordan", awayTeamId: "playoff-a", cityId: "houston", date: "2026-06-12T15:00:00-05:00", matchday: 1 },
  // Group C
  { id: "c-md1-1", stage: "group", group: "C", homeTeamId: "usa", awayTeamId: "south-africa", cityId: "los-angeles", date: "2026-06-12T21:00:00-05:00", matchday: 1 },
  { id: "c-md1-2", stage: "group", group: "C", homeTeamId: "england", awayTeamId: "qatar", cityId: "philadelphia", date: "2026-06-13T15:00:00-05:00", matchday: 1 },
  // Group G
  { id: "g-md1-1", stage: "group", group: "G", homeTeamId: "mexico", awayTeamId: "cape-verde", cityId: "mexico-city", date: "2026-06-14T20:00:00-06:00", matchday: 1 },
  { id: "g-md1-2", stage: "group", group: "G", homeTeamId: "netherlands", awayTeamId: "algeria", cityId: "dallas", date: "2026-06-14T18:00:00-05:00", matchday: 1 },
  // Group H
  { id: "h-md1-1", stage: "group", group: "H", homeTeamId: "spain", awayTeamId: "paraguay", cityId: "miami", date: "2026-06-14T15:00:00-05:00", matchday: 1 },
  { id: "h-md1-2", stage: "group", group: "H", homeTeamId: "poland", awayTeamId: "japan", cityId: "kansas-city", date: "2026-06-14T18:00:00-05:00", matchday: 1 },
  // Opening match
  { id: "opening", stage: "group", group: "C", homeTeamId: "usa", awayTeamId: "england", cityId: "new-york", date: "2026-06-11T20:00:00-05:00", matchday: 1 },
];

/* ───── HELPERS ───── */

const teamMap = new Map(TEAMS.map((t) => [t.id, t]));
const cityMap = new Map(HOST_CITIES.map((c) => [c.id, c]));

export function getTeam(id: string): Team | undefined {
  return teamMap.get(id);
}

export function getCity(id: string): HostCity | undefined {
  return cityMap.get(id);
}

export function getTeamsByGroup(groupLetter: string): Team[] {
  return TEAMS.filter((t) => t.group === groupLetter);
}

/**
 * Get the next upcoming match from now.
 */
export function getNextMatch(): Match | undefined {
  const now = Date.now();
  return MATCHES
    .filter((m) => new Date(m.date).getTime() > now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
}

/**
 * Get the flag CSS class for a country code.
 * Uses flag-icons package convention if installed,
 * otherwise returns a data attribute for CSS-based flags.
 */
export function getFlagUrl(code: string): string {
  if (code === "xx") return "";
  const normalized = code.toLowerCase();
  return `https://flagcdn.com/w80/${normalized}.png`;
}

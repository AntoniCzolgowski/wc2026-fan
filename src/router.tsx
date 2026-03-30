import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { RegistrationScreen } from "./components/registration/RegistrationScreen";
import { HomeScreen } from "./components/home/HomeScreen";

/**
 * Application routes.
 *
 * The App component provides the shared layout (TopBar + BottomNav).
 * ProtectedRoute inside App handles auth gating.
 *
 * Future phases will add:
 * - /games, /games/score-the-goal, /games/guess-player, etc.
 * - /bracket, /bracket/groups, /bracket/knockout
 * - /leaderboard
 * - /profile
 */
export const router = createBrowserRouter([
  {
    path: "/register",
    element: <RegistrationScreen />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomeScreen />,
      },
      // Phase 2+: Games routes
      {
        path: "games",
        element: <PlaceholderPage title="Games" />,
      },
      // Phase 5+: Bracket routes
      {
        path: "bracket",
        element: <PlaceholderPage title="Bracket" />,
      },
      // Phase 7: Leaderboard
      {
        path: "leaderboard",
        element: <PlaceholderPage title="Leaderboard" />,
      },
    ],
  },
]);

/**
 * Placeholder for routes that will be built in future phases.
 */
function PlaceholderPage({ title }: { title: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "4rem 2rem",
        textAlign: "center",
        gap: "0.5rem",
      }}
    >
      <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>{title}</h2>
      <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}>
        Coming soon
      </p>
    </div>
  );
}

import { Outlet, useNavigate, useLocation, Navigate } from "react-router-dom";
import { useAuthInit, useAuth } from "./hooks/useAuth";
import { BottomNav } from "./components/ui/BottomNav";
import { LoadingSpinner } from "./components/shared/LoadingSpinner";
import { ErrorBoundary } from "./components/shared/ErrorBoundary";

export function App() {
  useAuthInit();
  const { initialized, userId } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Show loading while checking auth
  if (!initialized) {
    return (
      <div className="app-layout">
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  // Redirect to registration if not authenticated
  if (!userId) {
    return <Navigate to="/register" replace />;
  }

  const currentPath = location.pathname;

  return (
    <div className="app-layout">
      <ErrorBoundary>
        <main className="app-content">
          <Outlet />
        </main>
      </ErrorBoundary>

      <BottomNav
        active={
          currentPath === "/"
            ? "home"
            : currentPath.startsWith("/games")
              ? "games"
              : currentPath.startsWith("/bracket")
                ? "bracket"
                : currentPath.startsWith("/leaderboard")
                  ? "leaders"
                  : "home"
        }
        onNavigate={(tab) => {
          const routes: Record<string, string> = {
            home: "/",
            games: "/games",
            bracket: "/bracket",
            leaders: "/leaderboard",
          };
          navigate(routes[tab] ?? "/");
        }}
      />
    </div>
  );
}

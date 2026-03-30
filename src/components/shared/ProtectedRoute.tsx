import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { LoadingSpinner } from "./LoadingSpinner";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * Wraps routes that require authentication.
 * Redirects to /register if not signed in.
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { initialized, userId } = useAuth();

  if (!initialized) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50dvh",
        }}
      >
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!userId) {
    return <Navigate to="/register" replace />;
  }

  return <>{children}</>;
}

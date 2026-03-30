import type { ReactNode } from "react";

interface BadgeProps {
  variant?: "primary" | "success" | "warning" | "danger";
  children: ReactNode;
}

export function Badge({ variant = "primary", children }: BadgeProps) {
  return <span className={`badge badge--${variant}`}>{children}</span>;
}

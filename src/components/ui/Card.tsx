import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "highlight" | "outlined";
  children: ReactNode;
}

export function Card({
  variant = "default",
  children,
  className = "",
  ...props
}: CardProps) {
  const variantClass =
    variant === "highlight"
      ? "card--highlight"
      : variant === "outlined"
        ? "card--outlined"
        : "";

  return (
    <div className={`card ${variantClass} ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

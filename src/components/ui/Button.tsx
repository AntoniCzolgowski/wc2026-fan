import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "icon";
  size?: "default" | "sm";
  children: ReactNode;
  loading?: boolean;
}

export function Button({
  variant = "primary",
  size = "default",
  children,
  loading = false,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  const variantClass = `btn--${variant}`;
  const sizeClass = size === "sm" ? "btn--sm" : "";

  return (
    <button
      className={`btn ${variantClass} ${sizeClass} ${className}`.trim()}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span
          className="spinner__circle"
          style={{ width: 20, height: 20, borderWidth: 2 }}
        />
      ) : (
        children
      )}
    </button>
  );
}

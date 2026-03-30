interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
}

export function LoadingSpinner({ size = "md" }: LoadingSpinnerProps) {
  return (
    <div className={`spinner spinner--${size}`} role="status" aria-label="Loading">
      <div className="spinner__circle" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}

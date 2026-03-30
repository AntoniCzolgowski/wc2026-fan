import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { IconChevronLeft } from "./icons";

interface TopBarProps {
  title: string;
  showBack?: boolean;
  right?: ReactNode;
}

export function TopBar({ title, showBack = false, right }: TopBarProps) {
  const navigate = useNavigate();

  return (
    <header className="topbar">
      {showBack && (
        <button
          className="topbar__back"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <IconChevronLeft size={20} />
        </button>
      )}
      <h1 className="topbar__title">{title}</h1>
      {right && <div className="topbar__right">{right}</div>}
    </header>
  );
}

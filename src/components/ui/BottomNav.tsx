import { IconHome, IconGames, IconTrophy, IconChart } from "./icons";

export type NavTab = "home" | "games" | "bracket" | "leaders";

interface BottomNavProps {
  active: NavTab;
  onNavigate: (tab: NavTab) => void;
}

const tabs: { id: NavTab; label: string; Icon: typeof IconHome }[] = [
  { id: "home", label: "Home", Icon: IconHome },
  { id: "games", label: "Games", Icon: IconGames },
  { id: "bracket", label: "Bracket", Icon: IconTrophy },
  { id: "leaders", label: "Leaders", Icon: IconChart },
];

export function BottomNav({ active, onNavigate }: BottomNavProps) {
  return (
    <nav className="bottomnav" role="navigation" aria-label="Main navigation">
      {tabs.map(({ id, label, Icon }) => (
        <button
          key={id}
          className="bottomnav__item"
          aria-current={active === id ? "page" : undefined}
          onClick={() => onNavigate(id)}
        >
          <span className="bottomnav__icon">
            <Icon size={20} />
          </span>
          {label}
        </button>
      ))}
    </nav>
  );
}

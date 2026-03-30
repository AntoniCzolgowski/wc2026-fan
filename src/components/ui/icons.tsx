/**
 * SVG icon components. Inline SVGs for zero network requests,
 * tree-shakeable, and consistent sizing.
 *
 * All icons accept `size` (default 24) and spread remaining props to <svg>.
 */

import type { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

function Icon({ size = 24, children, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  );
}

export function IconHome(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </Icon>
  );
}

export function IconGames(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="2" y="6" width="20" height="12" rx="3" />
      <line x1="8" y1="10" x2="8" y2="14" />
      <line x1="6" y1="12" x2="10" y2="12" />
      <circle cx="16" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="18" cy="12" r="1" fill="currentColor" stroke="none" />
    </Icon>
  );
}

export function IconTrophy(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 9H4a2 2 0 01-2-2V4a2 2 0 012-2h2" />
      <path d="M18 9h2a2 2 0 002-2V4a2 2 0 00-2-2h-2" />
      <path d="M8 2h8v6a4 4 0 01-8 0V2z" />
      <path d="M10 12v2a2 2 0 002 2 2 2 0 002-2v-2" />
      <line x1="8" y1="18" x2="16" y2="18" />
      <line x1="12" y1="16" x2="12" y2="18" />
      <line x1="7" y1="22" x2="17" y2="22" />
      <line x1="8" y1="18" x2="7" y2="22" />
      <line x1="16" y1="18" x2="17" y2="22" />
    </Icon>
  );
}

export function IconChart(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="4" y="14" width="4" height="8" />
      <rect x="10" y="6" width="4" height="16" />
      <rect x="16" y="10" width="4" height="12" />
    </Icon>
  );
}

export function IconChevronLeft(props: IconProps) {
  return (
    <Icon strokeWidth={2.5} {...props}>
      <polyline points="15 18 9 12 15 6" />
    </Icon>
  );
}

export function IconUser(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </Icon>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <Icon strokeWidth={3} {...props}>
      <polyline points="20 6 9 17 4 12" />
    </Icon>
  );
}

export function IconX(props: IconProps) {
  return (
    <Icon strokeWidth={3} {...props}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </Icon>
  );
}

export function IconZap(props: IconProps) {
  return (
    <Icon fill="currentColor" stroke="none" {...props}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10" />
    </Icon>
  );
}

export function IconPlay(props: IconProps) {
  return (
    <Icon fill="currentColor" stroke="none" {...props}>
      <polygon points="5 3 19 12 5 21" />
    </Icon>
  );
}

export function IconStar(props: IconProps) {
  return (
    <Icon fill="currentColor" stroke="none" {...props}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
    </Icon>
  );
}

export function IconSun(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </Icon>
  );
}

export function IconFlame(props: IconProps) {
  return (
    <Icon fill="currentColor" stroke="none" {...props}>
      <path d="M12 22c-4.97 0-9-2.686-9-6C3 7 12 2 12 2s9 5 9 14c0 3.314-4.03 6-9 6zM12 18a3 3 0 003-3c0-3-3-5.5-3-5.5S9 12 9 15a3 3 0 003 3z" />
    </Icon>
  );
}

export function IconFlag(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </Icon>
  );
}

export function IconCity(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="1" y="8" width="6" height="14" />
      <rect x="9" y="2" width="6" height="20" />
      <rect x="17" y="6" width="6" height="16" />
    </Icon>
  );
}

export function IconLock(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </Icon>
  );
}

export function IconPlus(props: IconProps) {
  return (
    <Icon strokeWidth={2.5} {...props}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </Icon>
  );
}

export function IconShare(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </Icon>
  );
}

export function IconGrip(props: IconProps) {
  return (
    <Icon fill="currentColor" stroke="none" {...props}>
      <circle cx="9" cy="6" r="1.5" />
      <circle cx="15" cy="6" r="1.5" />
      <circle cx="9" cy="12" r="1.5" />
      <circle cx="15" cy="12" r="1.5" />
      <circle cx="9" cy="18" r="1.5" />
      <circle cx="15" cy="18" r="1.5" />
    </Icon>
  );
}

export function IconSilhouette(props: IconProps) {
  return (
    <Icon fill="currentColor" stroke="none" {...props}>
      <circle cx="12" cy="6" r="4" />
      <path d="M5 20c0-4 3-7 7-7s7 3 7 7" />
    </Icon>
  );
}

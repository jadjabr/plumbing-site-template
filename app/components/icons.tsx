// Inline stroke icons shared across components. All inherit `currentColor`.
import type { ReactNode } from "react";

function Icon({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

type IconProps = { className?: string };

export function PhoneIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </Icon>
  );
}

export function MessageIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </Icon>
  );
}

export function ShieldCheckIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </Icon>
  );
}

export function ClockIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </Icon>
  );
}

export function WrenchIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </Icon>
  );
}

export function StarIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </Icon>
  );
}

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Icon>
  );
}

export function HomeIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
    </Icon>
  );
}

export function BuildingIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01" />
    </Icon>
  );
}

export function DropletIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
    </Icon>
  );
}

export function DrainIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 9h8M7 12h10M8 15h8" />
    </Icon>
  );
}

export function WaterHeaterIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <rect x="6" y="2" width="12" height="20" rx="3" />
      <path d="M6 7h12" />
      <path d="M10 16c0-1.5 2-2.5 2-4 0 1.5 2 2.5 2 4a2 2 0 0 1-4 0z" />
    </Icon>
  );
}

export function PipeIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M3 7h8a6 6 0 0 1 6 6v8" />
      <path d="M3 13h7a1 1 0 0 1 1 1v7" />
      <path d="M3 5v10M9 21h10" />
    </Icon>
  );
}

export function FaucetIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M4 9h9a3 3 0 0 1 3 3v2" />
      <path d="M4 13h7" />
      <path d="M4 7v8M8 5h4M10 5v4" />
      <path d="M16 18v.01M16 21v.01" />
    </Icon>
  );
}

export function SumpPumpIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M12 3v9M8 7l4-4 4 4" />
      <path d="M2 16c2-1.3 3.3-1.3 5 0s3 1.3 5 0 3.3-1.3 5 0 3 1.3 5 0" />
      <path d="M2 20c2-1.3 3.3-1.3 5 0s3 1.3 5 0 3.3-1.3 5 0 3 1.3 5 0" />
    </Icon>
  );
}

export function SirenIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M7 18v-6a5 5 0 1 1 10 0v6" />
      <path d="M5 21a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1z" />
      <path d="M12 2v1M21 12h1M2 12h1M4.9 4.9l.7.7M19.1 4.9l-.7.7" />
    </Icon>
  );
}

export function SewerIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6" />
      <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
    </Icon>
  );
}

export function BackflowIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="m17 2 4 4-4 4" />
      <path d="M3 11V9a3 3 0 0 1 3-3h15" />
      <path d="m7 22-4-4 4-4" />
      <path d="M21 13v2a3 3 0 0 1-3 3H3" />
    </Icon>
  );
}

export function GaugeIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="m12 14 4-4" />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </Icon>
  );
}

export function FilterIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
    </Icon>
  );
}

export function ClipboardCheckIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="m9 14 2 2 4-4" />
    </Icon>
  );
}

export function HardHatIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1z" />
      <path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5" />
      <path d="M4 15v-3a6 6 0 0 1 6-6" />
      <path d="M14 6a6 6 0 0 1 6 6v3" />
    </Icon>
  );
}

export function CheckCircleIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="m8 12 3 3 5-6" />
    </Icon>
  );
}

export function AlertCircleIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4M12 16h.01" />
    </Icon>
  );
}

export function ChevronDownIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="m6 9 6 6 6-6" />
    </Icon>
  );
}

export function TagIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M12.59 2.59A2 2 0 0 0 11.17 2H4a2 2 0 0 0-2 2v7.17a2 2 0 0 0 .59 1.42l8.7 8.7a2.43 2.43 0 0 0 3.42 0l6.58-6.58a2.43 2.43 0 0 0 0-3.42z" />
      <path d="M7.5 7.5h.01" />
    </Icon>
  );
}

export function MapPinIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </Icon>
  );
}

export function PauseIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M9 5v14M15 5v14" />
    </Icon>
  );
}

export function PlayIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M7 4.5v15l12-7.5z" />
    </Icon>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </Icon>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </Icon>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </Icon>
  );
}

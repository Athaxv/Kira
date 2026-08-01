import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function base(props: IconProps): IconProps {
  return {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
    ...props,
  };
}

export function UsersIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export function FolderIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    </svg>
  );
}

export function GaugeIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m12 14 4-4" />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </svg>
  );
}

export function UserCheckIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="m16 11 2 2 4-4" />
    </svg>
  );
}

export function MessageIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function RefreshIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 16h5v5" />
    </svg>
  );
}

export function PaintbrushIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m14.6 9.6-5.2 5.2c-.8.8-2.2.8-3 0l-.5-.5c-.8-.8-.8-2.2 0-3l5.2-5.2" />
      <path d="m16 8 2-2" />
      <path d="M10 20h4" />
      <path d="M5 11.5 3 21l9.5-2" />
    </svg>
  );
}

export function SparklesIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M9.9 2.1 11 6l3.9 1.1L11 8.2 9.9 12 8.8 8.2 4.9 7.1 8.8 6z" />
      <path d="M18 11.5 19 14l2.5.7L19 15.4 18 18l-1-2.6-2.5-.7L17 14z" />
      <path d="m5.5 15 .7 2.1L8.5 18l-2.3.7-.7 2.1-.7-2.1L3 18l2.3-.9z" />
    </svg>
  );
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export function DatabaseIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5" />
      <path d="M3 12c0 1.7 4 3 9 3s9-1.3 9-3" />
    </svg>
  );
}

export function ShieldCheckIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M20 13c0 5-3.5 7.5-7.7 8.9a2 2 0 0 1-1.26 0C6.5 20.5 3 18 3 13V6a2 2 0 0 1 1.3-1.9l7-2.7a2 2 0 0 1 1.4 0l7 2.7A2 2 0 0 1 20 6z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function PuzzleIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M19.4 14a2 2 0 0 0-2.4-2.4 2 2 0 0 1-2.4-2.4V7a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2.2A2 2 0 0 1 3.6 11 2 2 0 0 0 2 13v3a2 2 0 0 0 2 2h2.2a2 2 0 0 1 2.4 2.4 2 2 0 0 0 2.4 2.4H14a2 2 0 0 0 2-2v-2.2a2 2 0 0 1 2.4-2.4 2 2 0 0 0 2.4-2.4V14z" />
    </svg>
  );
}

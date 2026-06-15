/*
 * Small line-symbol icons for inventory part categories. Stroke-based,
 * currentColor, classic schematic look — meant to sit in a neutral chip.
 */

type Props = { size?: number; className?: string };

function base(size: number, className: string | undefined, children: React.ReactNode) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const Diode = (s: number, c?: string) =>
  base(s, c, (
    <>
      <line x1="2" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="22" y2="12" />
      <path d="M6 6 L6 18 L17 12 Z" />
      <line x1="17" y1="6" x2="17" y2="18" />
    </>
  ));

const Resistor = (s: number, c?: string) =>
  base(s, c, (
    <>
      <line x1="2" y1="12" x2="4.5" y2="12" />
      <polyline points="4.5,12 6.5,7 9.5,17 12.5,7 15.5,17 18,12" />
      <line x1="18" y1="12" x2="22" y2="12" />
    </>
  ));

const Capacitor = (s: number, c?: string) =>
  base(s, c, (
    <>
      <line x1="2" y1="12" x2="10" y2="12" />
      <line x1="10" y1="5" x2="10" y2="19" />
      <line x1="14" y1="5" x2="14" y2="19" />
      <line x1="14" y1="12" x2="22" y2="12" />
    </>
  ));

const Transistor = (s: number, c?: string) =>
  base(s, c, (
    <>
      <circle cx="13" cy="12" r="8" />
      <line x1="2" y1="12" x2="9" y2="12" />
      <line x1="9" y1="7" x2="9" y2="17" />
      <line x1="9" y1="9.5" x2="17" y2="5.5" />
      <line x1="9" y1="14.5" x2="17" y2="18.5" />
    </>
  ));

const Chip = (s: number, c?: string) =>
  base(s, c, (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <line x1="10" y1="4" x2="10" y2="7" />
      <line x1="14" y1="4" x2="14" y2="7" />
      <line x1="10" y1="17" x2="10" y2="20" />
      <line x1="14" y1="17" x2="14" y2="20" />
      <line x1="4" y1="10" x2="7" y2="10" />
      <line x1="4" y1="14" x2="7" y2="14" />
      <line x1="17" y1="10" x2="20" y2="10" />
      <line x1="17" y1="14" x2="20" y2="14" />
    </>
  ));

const Connector = (s: number, c?: string) =>
  base(s, c, (
    <>
      <path d="M4 8 h8 a4 4 0 0 1 4 4 a4 4 0 0 1 -4 4 h-8 Z" />
      <line x1="16" y1="12" x2="22" y2="12" />
      <line x1="7" y1="8" x2="7" y2="16" />
      <line x1="10" y1="8" x2="10" y2="16" />
    </>
  ));

const Fuse = (s: number, c?: string) =>
  base(s, c, (
    <>
      <line x1="2" y1="12" x2="5" y2="12" />
      <line x1="19" y1="12" x2="22" y2="12" />
      <rect x="5" y="8.5" width="14" height="7" rx="3.5" />
      <path d="M7 12 q5 -4 10 0" />
    </>
  ));

const Cable = (s: number, c?: string) =>
  base(s, c, (
    <>
      <path d="M3 7 a4 4 0 0 0 4 4 h10 a4 4 0 0 1 4 4" />
      <line x1="3" y1="5" x2="3" y2="9" />
      <line x1="21" y1="15" x2="21" y2="19" />
    </>
  ));

const Generic = (s: number, c?: string) =>
  base(s, c, (
    <>
      <path d="M12 2.5 L21 7 L21 17 L12 21.5 L3 17 L3 7 Z" />
      <line x1="3" y1="7" x2="12" y2="11.5" />
      <line x1="21" y1="7" x2="12" y2="11.5" />
      <line x1="12" y1="11.5" x2="12" y2="21.5" />
    </>
  ));

const MAP: Record<string, (s: number, c?: string) => React.ReactNode> = {
  Diodă: Diode,
  Rezistor: Resistor,
  Condensator: Capacitor,
  Tranzistor: Transistor,
  "Circuit integrat": Chip,
  Conector: Connector,
  Siguranță: Fuse,
  Cablu: Cable,
  Altele: Generic,
};

export default function PartIcon({
  category,
  size = 18,
  className,
}: {
  category: string | null | undefined;
  size?: number;
  className?: string;
}) {
  const render = MAP[category ?? "Altele"] ?? Generic;
  return <>{render(size, className)}</>;
}

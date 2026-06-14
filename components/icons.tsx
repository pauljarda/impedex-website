import type { ReactNode } from "react";

/* ── Custom schematic-style icon set (hand-drawn, electronics themed) ── */

export type CustomIconProps = { size?: number; className?: string };

function SchematicIcon({ size = 24, className, children }: CustomIconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function IconSolder(p: CustomIconProps) {
  return (
    <SchematicIcon {...p}>
      <path d="M3.5 20.5 L10 14" />
      <path d="M9.5 14.5 L13.5 10.5 L15.5 12.5 L11.5 16.5 Z" />
      <path d="M15 11 C16.8 9.2 16.2 7.6 18 6.5 C19.2 5.8 20 6.5 20.5 7.2" opacity="0.85" />
      <circle cx="3.9" cy="20.1" r="1" fill="currentColor" stroke="none" />
      <path d="M7.5 11.5 c-0.5-1 0.5-1.4 0-2.4" opacity="0.45" />
    </SchematicIcon>
  );
}

export function IconClockPulse(p: CustomIconProps) {
  return (
    <SchematicIcon {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M5.8 12 H8 l1.4-2.6 1.9 5 1.4-2.4 H18.2" opacity="0.9" />
      <circle cx="12" cy="5" r="0.8" fill="currentColor" stroke="none" opacity="0.7" />
    </SchematicIcon>
  );
}

export function IconShieldTrace(p: CustomIconProps) {
  return (
    <SchematicIcon {...p}>
      <path d="M12 3 L19 5.8 V11.3 C19 15.9 16.1 19.1 12 20.8 C7.9 19.1 5 15.9 5 11.3 V5.8 Z" />
      <path d="M12 7.5 V10.2 M12 10.2 L9.6 12.6 M12 10.2 L14.4 12.6" opacity="0.85" />
      <circle cx="9.6" cy="12.6" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="14.4" cy="12.6" r="0.9" fill="currentColor" stroke="none" />
    </SchematicIcon>
  );
}

export function IconVan(p: CustomIconProps) {
  return (
    <SchematicIcon {...p}>
      <path d="M2.5 7.5 H14 V16 H2.5 Z" />
      <path d="M14 10 H17.8 L20.8 13.2 V16 H14" />
      <path d="M15.2 10 V12.6 H18.4" opacity="0.7" />
      <circle cx="6.8" cy="17.6" r="1.7" />
      <circle cx="16.8" cy="17.6" r="1.7" />
      <path d="M0.8 10.2 H1.9 M0.8 13.2 H1.9" opacity="0.5" />
    </SchematicIcon>
  );
}

export function IconTvWave(p: CustomIconProps) {
  return (
    <SchematicIcon {...p}>
      <rect x="3" y="6.5" width="18" height="12" rx="2" />
      <path d="M9 6.5 L12 3.5 L15 6.5" opacity="0.7" />
      <path d="M6.8 12.5 q1.3-2.6 2.6 0 t2.6 0 t2.6 0 t2.6 0" opacity="0.9" />
      <path d="M9.5 18.5 v1.3 M14.5 18.5 v1.3" />
    </SchematicIcon>
  );
}

export function IconPhonePulse(p: CustomIconProps) {
  return (
    <SchematicIcon {...p}>
      <rect x="7.5" y="3" width="9" height="18" rx="2.2" />
      <path d="M10.8 5.2 h2.4" opacity="0.7" />
      <path d="M9.5 13 l1.2-1.8 1.6 3.2 1.2-1.8" opacity="0.9" />
      <circle cx="12" cy="18.4" r="0.85" fill="currentColor" stroke="none" opacity="0.8" />
    </SchematicIcon>
  );
}

export function IconPcb(p: CustomIconProps) {
  return (
    <SchematicIcon {...p}>
      <rect x="8" y="8" width="8" height="8" rx="1.4" />
      <circle cx="12" cy="12" r="1.3" opacity="0.9" />
      <path d="M10.5 8 V5.5 M13.5 8 V5.5 M10.5 16 v2.5 M13.5 16 v2.5 M8 10.5 H5.5 M8 13.5 H5.5 M16 10.5 h2.5 M16 13.5 h2.5" opacity="0.85" />
      <path d="M16 8 L18.7 5.3" />
      <circle cx="19.3" cy="4.7" r="1" fill="currentColor" stroke="none" />
      <path d="M8 16 L5.3 18.7" />
      <circle cx="4.7" cy="19.3" r="1" fill="currentColor" stroke="none" />
    </SchematicIcon>
  );
}

export function IconSolar(p: CustomIconProps) {
  return (
    <SchematicIcon {...p}>
      <path d="M6.5 13.5 L9.5 7 H20 L17 13.5 Z" />
      <path d="M10.8 9.2 H17.6 M9.7 11.3 H16.6 M13.2 7 L10.2 13.5" opacity="0.6" />
      <path d="M13 13.5 V17.5 M10 17.5 H16" />
      <circle cx="4.8" cy="4.8" r="1.9" />
      <path d="M4.8 1.5 V2.4 M1.5 4.8 H2.4 M7.2 2.4 L6.6 3 M2.4 7.2 L3 6.6" opacity="0.8" />
    </SchematicIcon>
  );
}

export function IconDoc(p: CustomIconProps) {
  return (
    <SchematicIcon {...p}>
      <path d="M6 3 H14.5 L18.5 7 V21 H6 Z" />
      <path d="M14.5 3 V7 H18.5" opacity="0.8" />
      <path d="M9 12 H15.5 M9 15 H15.5 M9 18 H12.5" opacity="0.7" />
    </SchematicIcon>
  );
}

export function IconMultimeter(p: CustomIconProps) {
  return (
    <SchematicIcon {...p}>
      <rect x="7" y="2.8" width="10" height="13.5" rx="2" />
      <circle cx="12" cy="8" r="2.4" />
      <path d="M12 8 L13.6 6.4" />
      <path d="M9.3 13.2 h1.6 M13.1 13.2 h1.6" opacity="0.6" />
      <path d="M9.5 16.3 C9.5 19.3 6.2 18.6 6.2 21.2 M14.5 16.3 C14.5 19.3 17.8 18.6 17.8 21.2" opacity="0.9" />
      <circle cx="6.2" cy="21.6" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="17.8" cy="21.6" r="0.9" fill="currentColor" stroke="none" />
    </SchematicIcon>
  );
}

export function IconBoxCheck(p: CustomIconProps) {
  return (
    <SchematicIcon {...p}>
      <path d="M4 8.2 L12 4.2 L20 8.2 V15.8 L12 19.8 L4 15.8 Z" />
      <path d="M4 8.2 L12 12.2 L20 8.2 M12 12.2 V19.8" opacity="0.7" />
      <path d="M16.8 4.6 l1.3 1.3 L20.4 3.4" />
    </SchematicIcon>
  );
}

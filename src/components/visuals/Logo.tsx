import { cn } from "@/lib/cn";

/** Y glyph in a 100×120 box — shared by the logo, favicon and hero visual. */
export const Y_POINTS: [number, number][] = [
  [0, 0], [28, 0], [50, 36], [72, 0], [100, 0], [64, 59], [64, 120], [36, 120], [36, 59],
];

const toPath = (pts: [number, number][], s: number, ox: number, oy: number) =>
  pts.map(([x, y], i) => `${i ? "L" : "M"}${(x * s + ox).toFixed(2)} ${(y * s + oy).toFixed(2)}`).join(" ") + " Z";

/** Extruded "Y" mark: a channel letter seen in three-quarter view. */
export function LogoMark({ className }: { className?: string }) {
  const s = 0.2;
  return (
    <svg viewBox="0 0 32 32" className={cn("shrink-0", className)} aria-hidden focusable="false">
      <path d={toPath(Y_POINTS, s, 9, 4)} fill="none" stroke="#2f6bff" strokeWidth="1.2" strokeLinejoin="round" />
      {Y_POINTS.map(([x, y], i) => (
        <line key={i} x1={x * s + 5} y1={y * s + 7} x2={x * s + 9} y2={y * s + 4} stroke="#2f6bff" strokeWidth="1" />
      ))}
      <path d={toPath(Y_POINTS, s, 5, 7)} fill="#f2f5fa" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)} dir="ltr">
      <LogoMark className="size-8" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.05rem] font-semibold tracking-[-0.02em] text-fg">YESIR</span>
        <span className="mt-1 font-mono text-[0.58rem] tracking-[0.42em] text-fg-muted">DESIGN</span>
      </span>
    </span>
  );
}

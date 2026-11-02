import type { ReactNode } from "react";

export type MockupFinish = "pvc" | "plexiglas" | "dibond";

/**
 * Presents a rendered plaque on a soft wall background with a material-aware shadow.
 * Purely decorative: the plaque SVG passed as children stays production-clean.
 */
export function PlaqueMockup({
  children,
  finish = "pvc",
  wall = true,
  className = "",
}: {
  children: ReactNode;
  finish?: MockupFinish;
  wall?: boolean;
  className?: string;
}) {
  const shadow =
    finish === "plexiglas"
      ? "drop-shadow(0 18px 22px rgb(11 31 58 / 0.28)) drop-shadow(0 4px 6px rgb(11 31 58 / 0.18))"
      : "drop-shadow(0 8px 12px rgb(11 31 58 / 0.22)) drop-shadow(0 2px 3px rgb(11 31 58 / 0.16))";

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={
        wall
          ? {
              backgroundColor: "#ece7df",
              backgroundImage:
                "radial-gradient(ellipse at 50% 18%, rgb(255 255 255 / 0.75), transparent 62%), linear-gradient(180deg, #f1ede6 0%, #e4ddd2 100%)",
            }
          : { backgroundColor: "#f4f6f9" }
      }
    >
      {wall && (
        // Subtle plaster grain.
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.22] mix-blend-multiply" aria-hidden="true">
          <filter id="wall-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix values="0 0 0 0 0.45  0 0 0 0 0.4  0 0 0 0 0.35  0 0 0 0.55 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#wall-grain)" />
        </svg>
      )}
      <div className="relative w-full" style={{ filter: wall ? shadow : "drop-shadow(0 1px 2px rgb(11 31 58 / 0.15))" }}>
        {children}
        {wall && finish === "plexiglas" && (
          // Glossy reflection on acrylic.
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(115deg, rgb(255 255 255 / 0.35) 0%, rgb(255 255 255 / 0) 38%, rgb(255 255 255 / 0) 70%, rgb(255 255 255 / 0.12) 100%)" }}
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );
}

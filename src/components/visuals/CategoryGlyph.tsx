import type { CategoryId } from "@/content/catalog";
import { cn } from "@/lib/cn";

/** Custom line glyphs for the five service categories (no emoji, no stock icons). */
export function CategoryGlyph({ id, className }: { id: CategoryId; className?: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg viewBox="0 0 48 48" className={cn("size-12", className)} aria-hidden focusable="false">
      {id === "web" && (
        <g {...common}>
          <rect x="5" y="9" width="38" height="28" rx="1.5" />
          <path d="M5 15h38" />
          <path d="M11 22h14M11 27h10" />
          <path d="m31 25 8 3-3.5 1.5L34 33z" fill="currentColor" />
        </g>
      )}
      {id === "signage" && (
        <g {...common}>
          <path d="M9 37 17 11h6l8 26" />
          <path d="M12 28h16" />
          <path d="M23 11l5-4h6l-8 26M31 37l5-4" opacity="0.55" />
          <path d="M40 14v6M43 17h-6" />
        </g>
      )}
      {id === "marketing" && (
        <g {...common}>
          <circle cx="20" cy="26" r="13" />
          <circle cx="20" cy="26" r="7" />
          <circle cx="20" cy="26" r="1.5" fill="currentColor" />
          <path d="M20 26 39 7M33 7h6v6" />
        </g>
      )}
      {id === "automation" && (
        <g {...common}>
          <rect x="5" y="8" width="11" height="9" rx="1" />
          <rect x="32" y="8" width="11" height="9" rx="1" />
          <rect x="18.5" y="31" width="11" height="9" rx="1" />
          <path d="M16 12.5h16M10.5 17v6.5h13.5V31M37.5 17v6.5H24" />
        </g>
      )}
      {id === "products" && (
        <g {...common}>
          <rect x="7" y="7" width="13" height="13" />
          <rect x="28" y="7" width="13" height="13" />
          <rect x="7" y="28" width="13" height="13" />
          <path d="M11 11h5v5h-5zM32 11h5v5h-5zM11 32h5v5h-5z" fill="currentColor" stroke="none" />
          <path d="M28 28h5v5M41 28v13h-8M28 41v-3" />
        </g>
      )}
    </svg>
  );
}

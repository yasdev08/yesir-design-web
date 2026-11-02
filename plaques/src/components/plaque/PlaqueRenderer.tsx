import { useId } from "react";
import { getSize, type SizeId } from "@/config/sizes";
import { getTemplate, type PlaqueTemplate, type Shape } from "@/config/templates";
import { NAVY } from "@/config/professions";
import { resolveSlots } from "@/lib/plaque/format";
import { estimateTextWidth, fitText, type TextMeasurer } from "@/lib/plaque/text-fit";
import type { ColorRef, FontRef, PlaqueContent } from "@/lib/plaque/types";
import { PlaqueIcon } from "./icons";

export interface PlaqueFonts {
  latin: string;
  arabic: string;
}

export const DEFAULT_PLAQUE_FONTS: PlaqueFonts = {
  latin: "Montserrat, 'Montserrat Fallback', Arial, sans-serif",
  arabic: "Cairo, 'Cairo Fallback', Tahoma, sans-serif",
};

export interface PlaqueRendererProps {
  content: PlaqueContent;
  /** Template id or a full template object. */
  template: string | PlaqueTemplate;
  size: SizeId;
  /** CSS font-family stacks (pass next/font families in the app). */
  fonts?: PlaqueFonts;
  /** Text measurer used for auto-fit. Defaults to built-in font metrics. */
  measure?: TextMeasurer;
  /** Draw the four Plexiglas standoffs (mockup only — not for production files). */
  standoffs?: boolean;
  /** Set width/height in millimetres (for exported production files). */
  physical?: boolean;
  className?: string;
  /** Accessible label. */
  title?: string;
}

const LINE_HEIGHT = 1.22;
/** Distance from the text box vertical centre to the baseline, in em, per font. */
const BASELINE: Record<FontRef, number> = { latin: 0.35, arabic: 0.36 };
const WEIGHT_CLAMP: Record<FontRef, [number, number]> = { latin: [400, 800], arabic: [400, 700] };
/** Standoff (entretoise) centre distance from the edges, and cap radius, in mm. */
const STANDOFF_OFFSET = 25;
const STANDOFF_RADIUS = 9;

function color(ref: ColorRef, accent: string): string {
  switch (ref) {
    case "accent":
      return accent;
    case "ink":
      return NAVY;
    case "paper":
      return "#FFFFFF";
    case "muted":
      return "#5A6A80";
    case "line":
      return "#CDD5E0";
    default:
      return ref;
  }
}

function renderShape(shape: Shape, key: number, W: number, H: number, accent: string) {
  const px = (v: number) => (v / 100) * W;
  const py = (v: number) => (v / 100) * H;
  switch (shape.type) {
    case "rect":
      return <rect key={key} x={px(shape.x)} y={py(shape.y)} width={px(shape.w)} height={py(shape.h)} fill={color(shape.fill, accent)} opacity={shape.opacity} />;
    case "frame": {
      const i = py(shape.inset);
      return (
        <rect
          key={key}
          x={i}
          y={i}
          width={W - 2 * i}
          height={H - 2 * i}
          rx={shape.radius ? py(shape.radius) : undefined}
          fill={shape.fill ? color(shape.fill, accent) : "none"}
          stroke={color(shape.stroke, accent)}
          strokeWidth={py(shape.strokeWidth)}
        />
      );
    }
    case "line":
      return (
        <line
          key={key}
          x1={px(shape.x1)}
          y1={py(shape.y1)}
          x2={px(shape.x2)}
          y2={py(shape.y2)}
          stroke={color(shape.stroke, accent)}
          strokeWidth={py(shape.strokeWidth)}
          strokeLinecap="round"
        />
      );
    case "circle":
      return (
        <circle
          key={key}
          cx={px(shape.cx)}
          cy={py(shape.cy)}
          r={py(shape.r)}
          fill={color(shape.fill, accent)}
          stroke={shape.stroke ? color(shape.stroke, accent) : undefined}
          strokeWidth={shape.strokeWidth ? py(shape.strokeWidth) : undefined}
        />
      );
  }
}

/**
 * Pure SVG plaque renderer: content + template + size in, SVG out.
 * One SVG user unit = 1 mm, so the output is at production scale.
 */
export function PlaqueRenderer({
  content,
  template: templateRef,
  size: sizeId,
  fonts = DEFAULT_PLAQUE_FONTS,
  measure = estimateTextWidth,
  standoffs = false,
  physical = false,
  className,
  title,
}: PlaqueRendererProps) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const template = typeof templateRef === "string" ? getTemplate(templateRef) : templateRef;
  const { widthMm: W, heightMm: H } = getSize(sizeId);
  const accent = content.accent;
  const slots = resolveSlots(content);
  const py = (v: number) => (v / 100) * H;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${W} ${H}`}
      width={physical ? `${W}mm` : undefined}
      height={physical ? `${H}mm` : undefined}
      className={className}
      role="img"
      aria-label={title ?? [slots.name, slots.titleFr].filter(Boolean).join(" — ")}
      data-template={template.id}
      data-size={sizeId}
    >
      <rect width={W} height={H} fill={color(template.background, accent)} />
      {template.shapes.map((s, i) => renderShape(s, i, W, H, accent))}

      {template.icon && (
        <PlaqueIcon
          id={content.icon}
          cx={(template.icon.cx / 100) * W}
          cy={py(template.icon.cy)}
          size={py(template.icon.size)}
          color={color(template.icon.color, accent)}
        />
      )}

      {template.zones.map((zone) => {
        const raw = slots[zone.slot];
        if (!raw) return null;
        const text = zone.uppercase ? raw.toLocaleUpperCase("fr-FR") : raw;
        const box = { x: (zone.x / 100) * W, y: py(zone.y), w: (zone.w / 100) * W, h: py(zone.h) };
        const [minW, maxW] = WEIGHT_CLAMP[zone.font];
        const weight = Math.min(maxW, Math.max(minW, zone.weight));
        const tracking = zone.tracking ?? 0;
        const { lines, fontSize } = fitText(text, {
          width: box.w,
          height: box.h,
          maxSize: py(zone.size),
          maxLines: zone.maxLines ?? 1,
          lineHeight: LINE_HEIGHT,
          tracking,
          font: zone.font,
          weight,
          measure,
        });
        const rtl = zone.font === "arabic";
        const x = zone.align === "left" ? box.x : zone.align === "right" ? box.x + box.w : box.x + box.w / 2;
        // With direction="rtl", "start" is the right edge.
        const anchor =
          zone.align === "center" ? "middle" : (zone.align === "left") !== rtl ? "start" : "end";
        const blockH = lines.length * fontSize * LINE_HEIGHT;
        const firstCenter = box.y + (box.h - blockH) / 2 + (fontSize * LINE_HEIGHT) / 2;
        return (
          <text
            key={zone.slot}
            data-slot={zone.slot}
            data-zone={`${round(box.x)} ${round(box.y)} ${round(box.w)} ${round(box.h)}`}
            x={x}
            fontFamily={rtl ? fonts.arabic : fonts.latin}
            fontWeight={weight}
            fontSize={round(fontSize)}
            fill={color(zone.color, accent)}
            textAnchor={anchor}
            direction={rtl ? "rtl" : "ltr"}
            letterSpacing={tracking ? round(tracking * fontSize) : undefined}
          >
            {lines.map((line, i) => (
              <tspan key={i} x={x} y={round(firstCenter + i * fontSize * LINE_HEIGHT + fontSize * BASELINE[zone.font])}>
                {line}
              </tspan>
            ))}
          </text>
        );
      })}

      {standoffs && (
        <g aria-hidden="true">
          <defs>
            <radialGradient id={`cap-${uid}`} cx="35%" cy="30%" r="75%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="45%" stopColor="#d9dee5" />
              <stop offset="100%" stopColor="#8b95a3" />
            </radialGradient>
          </defs>
          {[
            [STANDOFF_OFFSET, STANDOFF_OFFSET],
            [W - STANDOFF_OFFSET, STANDOFF_OFFSET],
            [STANDOFF_OFFSET, H - STANDOFF_OFFSET],
            [W - STANDOFF_OFFSET, H - STANDOFF_OFFSET],
          ].map(([cx, cy]) => (
            <g key={`${cx}-${cy}`}>
              <circle cx={cx + 1.2} cy={cy + 1.6} r={STANDOFF_RADIUS} fill="#000" opacity={0.18} />
              <circle cx={cx} cy={cy} r={STANDOFF_RADIUS} fill={`url(#cap-${uid})`} stroke="#7d8794" strokeWidth={0.5} />
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}

function round(n: number): number {
  return Math.round(n * 100) / 100;
}

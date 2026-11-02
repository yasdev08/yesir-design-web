import type { IconId } from "@/components/plaque/icons";

export type DayId = "sam" | "dim" | "lun" | "mar" | "mer" | "jeu" | "ven";

export interface TimeRange {
  /** "08:00" (24h). */
  from: string;
  to: string;
}

export interface OpeningHours {
  dayFrom: DayId;
  dayTo: DayId;
  /** One or two ranges (morning / afternoon). */
  ranges: TimeRange[];
}

/** Everything printed on the plaque. Produced by the configurator, consumed by PlaqueRenderer. */
export interface PlaqueContent {
  name: string;
  titleFr: string;
  titleAr: string;
  specialty?: string;
  hours?: OpeningHours | null;
  phone?: string;
  address?: string;
  /** Profession pictogram and accent colour (both come from the profession by default). */
  icon: IconId;
  accent: string;
}

/** Text slots a template can place. Derived from PlaqueContent by `resolveSlots`. */
export type Slot = "name" | "titleFr" | "titleAr" | "specialty" | "hoursFr" | "hoursAr" | "phone" | "address" | "contact";

/** Colour reference used in templates: a token or a literal hex colour. */
export type ColorRef = "accent" | "ink" | "paper" | "muted" | "line" | `#${string}`;

export type FontRef = "latin" | "arabic";

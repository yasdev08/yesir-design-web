import type { DayId, OpeningHours, PlaqueContent, Slot } from "./types";

export const days: { id: DayId; fr: string; ar: string }[] = [
  { id: "sam", fr: "Samedi", ar: "السبت" },
  { id: "dim", fr: "Dimanche", ar: "الأحد" },
  { id: "lun", fr: "Lundi", ar: "الإثنين" },
  { id: "mar", fr: "Mardi", ar: "الثلاثاء" },
  { id: "mer", fr: "Mercredi", ar: "الأربعاء" },
  { id: "jeu", fr: "Jeudi", ar: "الخميس" },
  { id: "ven", fr: "Vendredi", ar: "الجمعة" },
];

const day = (id: DayId) => days.find((d) => d.id === id) ?? days[0];

/** "08:00" → "08h", "08:30" → "08h30". */
export function timeFr(t: string): string {
  const [h = "", m = "00"] = t.split(":");
  return m === "00" ? `${h}h` : `${h}h${m}`;
}

/** "Du Samedi au Jeudi — 08h à 12h et de 13h à 17h" */
export function formatHoursFr(h: OpeningHours): string {
  const d = h.dayFrom === h.dayTo ? `Le ${day(h.dayFrom).fr}` : `Du ${day(h.dayFrom).fr} au ${day(h.dayTo).fr}`;
  const ranges = h.ranges.filter((r) => r.from && r.to);
  if (!ranges.length) return d;
  const [a, b] = ranges;
  const times = b
    ? `${timeFr(a.from)} à ${timeFr(a.to)} et de ${timeFr(b.from)} à ${timeFr(b.to)}`
    : `de ${timeFr(a.from)} à ${timeFr(a.to)}`;
  return `${d} — ${times}`;
}

/** "من السبت إلى الخميس — من 08:00 إلى 12:00 ومن 13:00 إلى 17:00" */
export function formatHoursAr(h: OpeningHours): string {
  const d = h.dayFrom === h.dayTo ? `يوم ${day(h.dayFrom).ar}` : `من ${day(h.dayFrom).ar} إلى ${day(h.dayTo).ar}`;
  const ranges = h.ranges.filter((r) => r.from && r.to);
  if (!ranges.length) return d;
  const [a, b] = ranges;
  const times = b ? `من ${a.from} إلى ${a.to} ومن ${b.from} إلى ${b.to}` : `من ${a.from} إلى ${a.to}`;
  return `${d} — ${times}`;
}

/** "0550123456" → "0550 12 34 56". Leaves anything else untouched. */
export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (/^0[567]\d{8}$/.test(digits)) return digits.replace(/^(\d{4})(\d{2})(\d{2})(\d{2})$/, "$1 $2 $3 $4");
  if (/^0\d{8}$/.test(digits)) return digits.replace(/^(\d{3})(\d{2})(\d{2})(\d{2})$/, "$1 $2 $3 $4");
  return phone.trim();
}

/** Maps the plaque content to the text of every template slot (empty string = slot hidden). */
export function resolveSlots(c: PlaqueContent): Record<Slot, string> {
  const phone = c.phone?.trim() ? `Tél.\u00A0${formatPhone(c.phone)}` : "";
  const address = c.address?.trim() ?? "";
  return {
    name: c.name.trim(),
    titleFr: c.titleFr.trim(),
    titleAr: c.titleAr.trim(),
    specialty: c.specialty?.trim() ?? "",
    hoursFr: c.hours ? formatHoursFr(c.hours) : "",
    hoursAr: c.hours ? formatHoursAr(c.hours) : "",
    phone,
    address,
    // Non-breaking spaces: SVG collapses ordinary whitespace.
    contact: [phone, address].filter(Boolean).join("\u00A0\u00A0•\u00A0\u00A0"),
  };
}

import type { Locale } from "@/i18n/config";

type L = Record<Locale, string>;

/**
 * Business facts used by the restaurant landing page (and its structured data).
 * Edit here — components never hard-code these values.
 */
export const business = {
  name: "YESIR DESIGN",
  tagline: { fr: "Du pixel à la façade", en: "From pixel to facade", ar: "من البكسل إلى الواجهة" } satisfies L,
  phone: {
    /** As displayed to people. */
    display: "0555 34 37 65",
    /** E.164, for tel: links and schema.org. */
    e164: "+213555343765",
    /** wa.me format: international, digits only. */
    whatsapp: "213555343765",
  },
  address: {
    street: "29 rue Colonel AEK",
    district: "Maraval",
    city: "Oran",
    country: "DZ",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("29 rue Colonel AEK, Maraval, Oran, Algérie"),
  },
  hours: {
    opens: "09:00",
    closes: "22:00",
    /** schema.org openingHours */
    schema: "Mo-Su 09:00-22:00",
    label: { fr: "Tous les jours, 9:00 – 22:00", en: "Every day, 9:00 – 22:00", ar: "يوميًا، 9:00 – 22:00" } satisfies L,
  },
  serviceArea: {
    label: {
      fr: "Oran + toute l'Algérie (menu QR livré à distance)",
      en: "Oran + all of Algeria (QR menu delivered remotely)",
      ar: "وهران + كامل التراب الجزائري (قائمة QR تُسلَّم عن بُعد)",
    } satisfies L,
    schema: ["Oran", "Algérie"],
  },
  delivery: {
    typicalDays: { min: 5, max: 7 },
    maxDays: 15,
  },
  /** Landing-page palette (see globals.css .landing). */
  colors: { blue: "#2A4DFF", lightBlue: "#6B8BFF", ink: "#0B0B0D", surface: "#F6F6F8", white: "#FFFFFF" },
};

export const telHref = `tel:${business.phone.e164}`;

/** wa.me link with a prefilled message. */
export function waHref(text: string) {
  return `https://wa.me/${business.phone.whatsapp}?text=${encodeURIComponent(text)}`;
}

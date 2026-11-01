export const locales = ["fr", "ar", "en"] as const;
export type Locale = (typeof locales)[number];

/** French is the primary language of the site. */
export const defaultLocale: Locale = "fr";

export const localeMeta: Record<
  Locale,
  { label: string; short: string; dir: "ltr" | "rtl"; htmlLang: string; ogLocale: string }
> = {
  fr: { label: "Français", short: "FR", dir: "ltr", htmlLang: "fr-DZ", ogLocale: "fr_DZ" },
  ar: { label: "العربية", short: "ع", dir: "rtl", htmlLang: "ar-DZ", ogLocale: "ar_DZ" },
  en: { label: "English", short: "EN", dir: "ltr", htmlLang: "en", ogLocale: "en_US" },
};

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Prefix an internal path with a locale: localePath("fr", "/services") -> "/fr/services". */
export function localePath(locale: Locale, path = "/"): string {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean}`;
}

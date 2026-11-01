import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { defaultLocale, localeMeta, locales, localePath, type Locale } from "@/i18n/config";

export function absoluteUrl(path = "/") {
  return `${siteConfig.url}${path}`;
}

/** hreflang map for a locale-independent path. */
export function languageAlternates(path: string) {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[localeMeta[l].htmlLang] = absoluteUrl(localePath(l, path));
  languages["x-default"] = absoluteUrl(localePath(defaultLocale, path));
  return languages;
}

export function buildMetadata({
  locale,
  path,
  title,
  description,
  absoluteTitle = false,
  noIndex = false,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  /** When true, the title template ("%s — YESIR DESIGN") is not applied. */
  absoluteTitle?: boolean;
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(localePath(locale, path));
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: "website",
      url,
      title: absoluteTitle ? title : `${title} — ${siteConfig.name}`,
      description,
      siteName: siteConfig.name,
      locale: localeMeta[locale].ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeMeta[l].ogLocale),
    },
    twitter: { card: "summary_large_image", title, description },
    robots: noIndex ? { index: false, follow: true } : undefined,
  };
}

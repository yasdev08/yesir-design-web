import { notFound } from "next/navigation";
import { locale as rootLocale } from "next/root-params";
import { hasLocale, type Locale } from "./config";
import fr from "./dictionaries/fr";
import ar from "./dictionaries/ar";
import en from "./dictionaries/en";
import frContent from "@/content/copy/fr";
import arContent from "@/content/copy/ar";
import enContent from "@/content/copy/en";

const dictionaries = { fr, ar, en } as const;
const contents = { fr: frContent, ar: arContent, en: enContent } as const;

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

export function getContent(locale: Locale) {
  return contents[locale];
}

/** Current locale from the `[locale]` root segment (Server Components only). */
export async function getLocale(): Promise<Locale> {
  const value = await rootLocale();
  if (!hasLocale(value)) notFound();
  return value;
}

/** Locale + UI dictionary + localized content, in one call. */
export async function getI18n() {
  const locale = await getLocale();
  return { locale, t: dictionaries[locale], c: contents[locale] };
}

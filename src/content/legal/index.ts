import type { Locale } from "@/i18n/config";
import fr from "./fr";
import ar from "./ar";
import en from "./en";

const legal = { fr, ar, en };
export const getLegal = (locale: Locale) => legal[locale];

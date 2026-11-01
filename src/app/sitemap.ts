import type { MetadataRoute } from "next";
import { projects, serviceSlugs } from "@/content/catalog";
import { locales, localePath } from "@/i18n/config";
import { absoluteUrl, languageAlternates } from "@/lib/seo";
import { routes } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: routes.services, priority: 0.9, changeFrequency: "monthly" },
    ...serviceSlugs.map((slug) => ({ path: routes.service(slug), priority: 0.8, changeFrequency: "monthly" as const })),
    { path: routes.projects, priority: 0.7, changeFrequency: "weekly" },
    ...projects.map((p) => ({ path: routes.project(p.slug), priority: 0.6, changeFrequency: "monthly" as const })),
    { path: routes.about, priority: 0.6, changeFrequency: "monthly" },
    { path: routes.contact, priority: 0.7, changeFrequency: "yearly" },
    { path: routes.quote, priority: 0.8, changeFrequency: "yearly" },
    { path: routes.privacy, priority: 0.2, changeFrequency: "yearly" },
    { path: routes.terms, priority: 0.2, changeFrequency: "yearly" },
  ];
  return paths.flatMap(({ path, priority, changeFrequency }) =>
    locales.map((locale) => ({
      url: absoluteUrl(localePath(locale, path)),
      changeFrequency,
      priority: locale === "fr" ? priority : Math.max(0.1, priority - 0.1),
      alternates: { languages: languageAlternates(path) },
    })),
  );
}

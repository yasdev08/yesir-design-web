import type { ProjectSlug, ServiceSlug } from "@/content/catalog";

/** Locale-independent route paths (French slugs are shared across languages). */
export const routes = {
  home: "/",
  services: "/services",
  service: (slug: ServiceSlug) => `/services/${slug}`,
  projects: "/projets",
  project: (slug: ProjectSlug) => `/projets/${slug}`,
  about: "/agence",
  contact: "/contact",
  quote: "/devis",
  privacy: "/confidentialite",
  terms: "/conditions",
} as const;

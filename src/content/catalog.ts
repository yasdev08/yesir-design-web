/**
 * Language-independent structure of services and projects.
 * Localized copy lives in `src/content/copy/{fr,ar,en}.ts`.
 */

export const categoryIds = ["web", "signage", "marketing", "automation", "products"] as const;
export type CategoryId = (typeof categoryIds)[number];

export type Tier = "core" | "growth" | "systems";

export const serviceSlugs = [
  "creation-site-web",
  "site-e-commerce",
  "applications-web",
  "enseignes-lumineuses",
  "print-supports",
  "publicite-meta-google",
  "seo-local",
  "automatisation-whatsapp",
  "menu-digital",
  "outils-digitaux",
] as const;
export type ServiceSlug = (typeof serviceSlugs)[number];

export const projectSlugs = [
  "mb-pub",
  "menus-digitaux-restaurants",
  "signcraft-3d",
  "storeiq",
  "pharmacie-digitale",
  "yesir-design",
] as const;
export type ProjectSlug = (typeof projectSlugs)[number];

/**
 * completed   — delivered for a client
 * concept     — study / proposal not commissioned by a client
 * internal    — product or tool built by YESIR DESIGN
 * in-progress — currently being produced
 */
export type ProjectStatus = "completed" | "concept" | "internal" | "in-progress";

export type CoverVariant = "web" | "menu" | "editor3d" | "pos" | "pharmacy" | "brand";

export interface Category {
  id: CategoryId;
  tier: Tier;
  /** Index shown in the UI (01, 02…) — also the display order. */
  index: string;
  services: ServiceSlug[];
}

export interface Service {
  slug: ServiceSlug;
  category: CategoryId;
  related: ProjectSlug[];
}

export interface Project {
  slug: ProjectSlug;
  category: CategoryId;
  status: ProjectStatus;
  services: ServiceSlug[];
  cover: CoverVariant;
  featured: boolean;
  /**
   * Real project visuals in /public (e.g. "/projects/mb-pub/home.webp").
   * When empty, an art-directed SVG illustration is shown and labelled as such.
   */
  images: { src: string; width: number; height: number }[];
  /** Public URL of the live project, if any and if the client agrees. */
  url?: string;
}

export const categories: Category[] = [
  {
    id: "web",
    tier: "core",
    index: "01",
    services: ["creation-site-web", "site-e-commerce", "applications-web"],
  },
  {
    id: "signage",
    tier: "core",
    index: "02",
    services: ["enseignes-lumineuses", "print-supports"],
  },
  {
    id: "marketing",
    tier: "growth",
    index: "03",
    services: ["publicite-meta-google", "seo-local"],
  },
  {
    id: "automation",
    tier: "systems",
    index: "04",
    services: ["automatisation-whatsapp"],
  },
  {
    id: "products",
    tier: "systems",
    index: "05",
    services: ["menu-digital", "outils-digitaux"],
  },
];

export const services: Service[] = [
  { slug: "creation-site-web", category: "web", related: ["mb-pub", "yesir-design"] },
  { slug: "site-e-commerce", category: "web", related: ["storeiq", "mb-pub"] },
  { slug: "applications-web", category: "web", related: ["storeiq", "signcraft-3d"] },
  { slug: "enseignes-lumineuses", category: "signage", related: ["signcraft-3d", "pharmacie-digitale"] },
  { slug: "print-supports", category: "signage", related: ["yesir-design", "menus-digitaux-restaurants"] },
  { slug: "publicite-meta-google", category: "marketing", related: ["yesir-design", "mb-pub"] },
  { slug: "seo-local", category: "marketing", related: ["pharmacie-digitale", "mb-pub"] },
  { slug: "automatisation-whatsapp", category: "automation", related: ["pharmacie-digitale", "storeiq"] },
  { slug: "menu-digital", category: "products", related: ["menus-digitaux-restaurants"] },
  { slug: "outils-digitaux", category: "products", related: ["storeiq", "menus-digitaux-restaurants"] },
];

/**
 * IMPORTANT: statuses must reflect reality. Update them here as projects
 * progress — they are displayed publicly on every project card and page.
 */
export const projects: Project[] = [
  {
    slug: "mb-pub",
    category: "web",
    status: "completed",
    services: ["creation-site-web", "seo-local"],
    cover: "web",
    featured: true,
    images: [],
  },
  {
    slug: "menus-digitaux-restaurants",
    category: "products",
    status: "completed",
    services: ["menu-digital", "print-supports"],
    cover: "menu",
    featured: true,
    images: [],
  },
  {
    slug: "signcraft-3d",
    category: "signage",
    status: "internal",
    services: ["applications-web", "enseignes-lumineuses"],
    cover: "editor3d",
    featured: true,
    images: [],
  },
  {
    slug: "storeiq",
    category: "products",
    status: "internal",
    services: ["applications-web", "outils-digitaux"],
    cover: "pos",
    featured: true,
    images: [],
  },
  {
    slug: "pharmacie-digitale",
    category: "automation",
    status: "concept",
    services: ["seo-local", "automatisation-whatsapp", "enseignes-lumineuses"],
    cover: "pharmacy",
    featured: false,
    images: [],
  },
  {
    slug: "yesir-design",
    category: "marketing",
    status: "internal",
    services: ["creation-site-web", "publicite-meta-google", "print-supports"],
    cover: "brand",
    featured: false,
    images: [],
  },
];

export const getCategory = (id: CategoryId) => categories.find((c) => c.id === id)!;
export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

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
  "enseignes-facades",
  "maison-crousty-menu-tv",
  "wonder-food-menus",
  "panneaux-qr",
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
  /** Partner credited on the project (shown publicly), e.g. "MB Pub". */
  partner?: string;
}

const img = (slug: string, count: number, width: number, height: number) =>
  Array.from({ length: count }, (_, i) => ({ src: `/projects/${slug}/${String(i + 1).padStart(2, "0")}.jpg`, width, height }));

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
  { slug: "enseignes-lumineuses", category: "signage", related: ["enseignes-facades", "panneaux-qr", "signcraft-3d"] },
  { slug: "print-supports", category: "signage", related: ["wonder-food-menus", "panneaux-qr", "yesir-design"] },
  { slug: "publicite-meta-google", category: "marketing", related: ["yesir-design", "mb-pub"] },
  { slug: "seo-local", category: "marketing", related: ["pharmacie-digitale", "mb-pub"] },
  { slug: "automatisation-whatsapp", category: "automation", related: ["pharmacie-digitale", "storeiq"] },
  { slug: "menu-digital", category: "products", related: ["maison-crousty-menu-tv", "wonder-food-menus", "menus-digitaux-restaurants"] },
  { slug: "outils-digitaux", category: "products", related: ["panneaux-qr", "storeiq"] },
];

/**
 * IMPORTANT: statuses must reflect reality. Update them here as projects
 * progress — they are displayed publicly on every project card and page.
 */
export const projects: Project[] = [
  {
    slug: "enseignes-facades",
    category: "signage",
    status: "completed",
    services: ["enseignes-lumineuses"],
    cover: "brand",
    featured: true,
    partner: "MB Pub",
    images: img("enseignes-facades", 7, 1350, 1800),
  },
  {
    slug: "maison-crousty-menu-tv",
    category: "products",
    status: "completed",
    services: ["menu-digital"],
    cover: "menu",
    featured: true,
    images: img("maison-crousty-menu-tv", 3, 2400, 1350),
  },
  {
    slug: "wonder-food-menus",
    category: "signage",
    status: "completed",
    services: ["print-supports", "menu-digital"],
    cover: "menu",
    featured: true,
    partner: "MB Pub",
    images: [
      { src: "/projects/wonder-food-menus/01.jpg", width: 2600, height: 1467 },
      { src: "/projects/wonder-food-menus/02.jpg", width: 2600, height: 1470 },
      { src: "/projects/wonder-food-menus/03.jpg", width: 2600, height: 1473 },
      { src: "/projects/wonder-food-menus/04.jpg", width: 2600, height: 1459 },
    ],
  },
  {
    slug: "panneaux-qr",
    category: "products",
    status: "completed",
    services: ["outils-digitaux", "print-supports"],
    cover: "menu",
    featured: true,
    images: [
      { src: "/projects/panneaux-qr/01.jpg", width: 933, height: 1400 },
      { src: "/projects/panneaux-qr/02.jpg", width: 860, height: 1120 },
    ],
  },
  {
    slug: "mb-pub",
    category: "web",
    status: "completed",
    services: ["creation-site-web", "seo-local"],
    cover: "web",
    featured: false,
    images: [],
  },
  {
    slug: "menus-digitaux-restaurants",
    category: "products",
    status: "completed",
    services: ["menu-digital", "print-supports"],
    cover: "menu",
    featured: false,
    images: [],
  },
  {
    slug: "signcraft-3d",
    category: "signage",
    status: "internal",
    services: ["applications-web", "enseignes-lumineuses"],
    cover: "editor3d",
    featured: false,
    images: [],
  },
  {
    slug: "storeiq",
    category: "products",
    status: "internal",
    services: ["applications-web", "outils-digitaux"],
    cover: "pos",
    featured: false,
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

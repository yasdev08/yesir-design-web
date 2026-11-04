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
  "maison-crousty",
  "bendenia-food",
  "meat-love",
  "cyno-protection-service",
  "wonder-food",
  "maison-mia",
  "mb-pub",
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
  { slug: "creation-site-web", category: "web", related: ["cyno-protection-service", "bendenia-food"] },
  { slug: "site-e-commerce", category: "web", related: ["bendenia-food", "storeiq"] },
  { slug: "applications-web", category: "web", related: ["storeiq", "signcraft-3d"] },
  { slug: "enseignes-lumineuses", category: "signage", related: ["signcraft-3d", "pharmacie-digitale"] },
  { slug: "print-supports", category: "signage", related: ["maison-mia", "bendenia-food"] },
  { slug: "publicite-meta-google", category: "marketing", related: ["yesir-design", "maison-crousty"] },
  { slug: "seo-local", category: "marketing", related: ["pharmacie-digitale", "maison-mia"] },
  { slug: "automatisation-whatsapp", category: "automation", related: ["bendenia-food", "pharmacie-digitale"] },
  { slug: "menu-digital", category: "products", related: ["maison-crousty", "wonder-food"] },
  { slug: "outils-digitaux", category: "products", related: ["meat-love", "storeiq"] },
];

/**
 * IMPORTANT: statuses must reflect reality. Update them here as projects
 * progress — they are displayed publicly on every project card and page.
 */
export const projects: Project[] = [
  {
    slug: "maison-crousty",
    category: "products",
    status: "completed",
    services: ["menu-digital"],
    cover: "menu",
    featured: true,
    images: [
      { src: "/projects/maison-crousty/cover.jpg", width: 1600, height: 1000 },
      { src: "/projects/maison-crousty/poster.jpg", width: 1600, height: 900 },
      { src: "/projects/maison-crousty/screen-2.jpg", width: 800, height: 450 },
      { src: "/projects/maison-crousty/screen-3.jpg", width: 800, height: 450 },
    ],
  },
  {
    slug: "bendenia-food",
    category: "web",
    status: "completed",
    services: ["creation-site-web", "print-supports"],
    cover: "web",
    featured: true,
    images: [
      { src: "/projects/bendenia-food/portfolio.jpg", width: 1600, height: 1000 },
      { src: "/projects/bendenia-food/home.jpg", width: 413, height: 893 },
      { src: "/projects/bendenia-food/contact.jpg", width: 413, height: 893 },
    ],
    url: "https://bendenia-food.vercel.app",
  },
  {
    slug: "meat-love",
    category: "products",
    status: "completed",
    services: ["menu-digital", "creation-site-web"],
    cover: "menu",
    featured: true,
    images: [
      { src: "/projects/meat-love/portfolio.jpg", width: 1600, height: 1000 },
      { src: "/projects/meat-love/home.jpg", width: 413, height: 893 },
      { src: "/projects/meat-love/dish.jpg", width: 413, height: 893 },
    ],
    url: "https://meat-love-hazel.vercel.app",
  },
  {
    slug: "cyno-protection-service",
    category: "web",
    status: "completed",
    services: ["creation-site-web"],
    cover: "web",
    featured: true,
    images: [
      { src: "/projects/cyno-protection-service/portfolio.jpg", width: 1600, height: 1000 },
      { src: "/projects/cyno-protection-service/home.jpg", width: 413, height: 893 },
      { src: "/projects/cyno-protection-service/services.jpg", width: 413, height: 893 },
    ],
  },
  {
    slug: "wonder-food",
    category: "products",
    status: "completed",
    services: ["menu-digital"],
    cover: "menu",
    featured: false,
    images: [
      { src: "/projects/wonder-food/portfolio.jpg", width: 1600, height: 1000 },
      { src: "/projects/wonder-food/poster.jpg", width: 586, height: 1200 },
    ],
    url: "https://wonderfood-menu.vercel.app",
  },
  {
    slug: "maison-mia",
    category: "web",
    status: "completed",
    services: ["creation-site-web", "print-supports"],
    cover: "web",
    featured: false,
    images: [
      { src: "/projects/maison-mia/portfolio.jpg", width: 1600, height: 1000 },
      { src: "/projects/maison-mia/plaque.jpg", width: 860, height: 1120 },
    ],
  },
  {
    // TODO(owner): confirm what was delivered for MB Pub and its status before featuring it.
    slug: "mb-pub",
    category: "web",
    status: "completed",
    services: ["creation-site-web", "seo-local"],
    cover: "web",
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

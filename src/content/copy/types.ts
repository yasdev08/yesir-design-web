import type { CategoryId, ProjectSlug, ServiceSlug } from "../catalog";

export interface CategoryCopy {
  name: string;
  /** Short line used in navigation and cards. */
  tagline: string;
  description: string;
  /** Full list of prestations in this category. */
  items: string[];
}

export interface ServiceCopy {
  name: string;
  /** One-sentence card description. */
  short: string;
  seoTitle: string;
  metaDescription: string;
  headline: string;
  headlineAccent: string;
  lead: string;
  problems: { title: string; text: string }[];
  deliverables: string[];
  process: { title: string; text: string }[];
  clients: string[];
  includes: string[];
}

export interface ProjectCopy {
  name: string;
  /** Project type, e.g. "Site web & présence digitale". */
  kind: string;
  summary: string;
  context: string;
  approach: string;
  scope: string[];
  /** Alt text describing the cover visual. */
  coverAlt: string;
}

export interface ContentCopy {
  categories: Record<CategoryId, CategoryCopy>;
  services: Record<ServiceSlug, ServiceCopy>;
  projects: Record<ProjectSlug, ProjectCopy>;
}

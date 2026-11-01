import Link from "next/link";
import Image from "next/image";
import { ViewTransition } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/catalog";
import type { ContentCopy } from "@/content/copy/types";
import type { Dictionary } from "@/i18n/dictionaries/fr";
import { localePath, type Locale } from "@/i18n/config";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/cn";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ProjectCover } from "@/components/visuals/ProjectCover";

export function ProjectVisual({ project, c, idPrefix, className, priority }: { project: Project; c: ContentCopy; idPrefix: string; className?: string; priority?: boolean }) {
  const copy = c.projects[project.slug];
  const image = project.images[0];
  return (
    <ViewTransition name={`project-${project.slug}`} share="morph" default="none">
      <div className={cn("relative overflow-hidden bg-ink-900", className)}>
        {image ? (
          <Image src={image.src} alt={copy.coverAlt} width={image.width} height={image.height} priority={priority} className="size-full object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
        ) : (
          <ProjectCover id={`${idPrefix}-${project.slug}`} variant={project.cover} alt={copy.coverAlt} label={copy.name} className="size-full" />
        )}
      </div>
    </ViewTransition>
  );
}

export function ProjectCard({
  project,
  locale,
  t,
  c,
  size = "md",
  idPrefix = "card",
}: {
  project: Project;
  locale: Locale;
  t: Dictionary;
  c: ContentCopy;
  size?: "md" | "lg";
  idPrefix?: string;
}) {
  const copy = c.projects[project.slug];
  return (
    <article className="group relative" data-reveal>
      <Link href={localePath(locale, routes.project(project.slug))} className="block focus-visible:outline-offset-4">
        <div className="relative overflow-hidden border border-line">
          <ProjectVisual
            project={project}
            c={c}
            idPrefix={idPrefix}
            className={cn("transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.035]", size === "lg" ? "aspect-[4/3]" : "aspect-[4/3]")}
          />
          <div className="absolute start-4 top-4">
            <StatusBadge status={project.status} t={t} />
          </div>
          <span className="absolute end-4 top-4 inline-flex size-10 items-center justify-center bg-signal text-white opacity-0 transition-all duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
            <ArrowUpRight aria-hidden className="size-4 rtl:-scale-x-100" strokeWidth={1.75} />
          </span>
        </div>
        <div className="mt-5 flex items-start justify-between gap-6">
          <div>
            <h3 className={cn("font-medium text-fg transition-colors group-hover:text-signal-soft", size === "lg" ? "text-h3" : "text-xl")}>{copy.name}</h3>
            <p className="mt-2 text-fg-muted">{copy.summary}</p>
          </div>
          <p className="shrink-0 pt-1 font-mono text-xs uppercase text-fg-subtle">{copy.kind}</p>
        </div>
      </Link>
    </article>
  );
}

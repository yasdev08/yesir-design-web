import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { restaurantProjects } from "@/content/projects";
import type { RestaurantsCopy } from "@/content/restaurants-copy";
import type { Locale } from "@/i18n/config";
import { hasPublicAsset } from "@/lib/public-asset";
import { MediaPlaceholder } from "./MediaPlaceholder";
import { WaLink } from "./ContactLinks";

export function Projects({ copy, locale }: { copy: RestaurantsCopy; locale: Locale }) {
  const pr = copy.projects;
  return (
    <section aria-labelledby="projects-title" className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-lp-sky rtl:tracking-normal">{pr.eyebrow}</p>
      <h2 id="projects-title" className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl rtl:tracking-normal">{pr.title}</h2>
      <ul className="mt-10 grid gap-6 md:grid-cols-2">
        {restaurantProjects.map((project) => {
          const cover = hasPublicAsset(project.cover) ? project.cover : undefined;
          const shots = (project.screenshots ?? []).filter((s) => hasPublicAsset(s));
          return (
            <li key={project.slug} className="flex flex-col overflow-hidden rounded-2xl border border-lp-line bg-lp-ink-2">
              <div className="relative aspect-[16/10] w-full">
                {cover ? (
                  <Image src={cover} alt={`${project.name} — ${project.line[locale]}`} fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover" />
                ) : (
                  <MediaPlaceholder label={copy.proof.imagePlaceholder} className="absolute inset-0" />
                )}
              </div>
              {shots.length > 0 && (
                <ul className="grid grid-cols-3 gap-2 px-4 pt-4">
                  {shots.map((src, i) => (
                    <li key={src} className="relative aspect-[9/16] overflow-hidden rounded-md border border-lp-line">
                      <Image src={src} alt={`${project.name} — ${i + 1}`} fill sizes="(min-width: 768px) 170px, 30vw" className="object-cover" />
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-xl font-semibold">{project.name}</h3>
                <p className="mt-1 text-sm text-lp-sky">{project.kind[locale]}</p>
                <p className="mt-3 text-lp-muted">{project.line[locale]}</p>
                <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row sm:items-center">
                  <WaLink message={copy.messages.same(project.name)} track={`project-${project.slug}`} className="w-full sm:w-auto">
                    {pr.cta}
                  </WaLink>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-12 items-center justify-center gap-2 px-2 font-medium text-lp-sky underline-offset-4 hover:underline"
                    >
                      {pr.live}
                      <span className="sr-only"> — {project.name}</span>
                      <ArrowUpRight aria-hidden className="size-4 rtl:-scale-x-100" />
                    </a>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

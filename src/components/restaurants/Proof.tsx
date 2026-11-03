import { restaurantProjects } from "@/content/projects";
import type { RestaurantsCopy } from "@/content/restaurants-copy";
import type { Locale } from "@/i18n/config";
import { hasPublicAsset } from "@/lib/public-asset";
import { cn } from "@/lib/cn";
import { LazyVideo } from "./LazyVideo";
import { MediaPlaceholder } from "./MediaPlaceholder";

const reels = [
  { slug: "maison-crousty", aspect: "aspect-video", span: "md:col-span-2" },
  { slug: "wonder-food", aspect: "aspect-[9/16] max-h-[70vh] mx-auto md:max-h-none", span: "" },
] as const;

export function Proof({ copy, locale }: { copy: RestaurantsCopy; locale: Locale }) {
  return (
    <section aria-labelledby="proof-title" className="mx-auto max-w-6xl px-4 pb-16">
      <h2 id="proof-title" className="sr-only">{copy.proof.title}</h2>
      <div className="grid items-start gap-4 md:grid-cols-3">
        {reels.map(({ slug, aspect, span }) => {
          const project = restaurantProjects.find((p) => p.slug === slug)!;
          const hasVideo = hasPublicAsset(project.video);
          const poster = hasPublicAsset(project.poster) ? project.poster : undefined;
          return (
            <figure key={slug} className={cn("overflow-hidden rounded-xl border border-lp-line bg-lp-ink-2", span)}>
              <div className={cn("relative w-full", aspect)}>
                {hasVideo ? (
                  <LazyVideo src={project.video!} poster={poster} label={`${project.name} — ${project.line[locale]}`} className="absolute inset-0 size-full object-cover" />
                ) : (
                  <MediaPlaceholder label={copy.proof.placeholder} className="absolute inset-0" />
                )}
              </div>
              <figcaption className="px-4 py-3">
                <span className="block font-semibold">{project.name}</span>
                <span className="block text-sm text-lp-muted">{project.line[locale]}</span>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}

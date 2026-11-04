import Image from "next/image";
import { restaurantProjects } from "@/content/projects";
import type { RestaurantsCopy } from "@/content/restaurants-copy";
import type { Locale } from "@/i18n/config";
import { hasPublicAsset } from "@/lib/public-asset";
import { cn } from "@/lib/cn";
import { LazyVideo } from "./LazyVideo";
import { MediaPlaceholder } from "./MediaPlaceholder";

// Column widths make the 16:9 TV reel and the 9:16 phone reel the same height on desktop
// (9/16 ÷ 16/9 = 81/256 ≈ 0.316).
const reels = [
  { slug: "maison-crousty", aspect: "aspect-video", span: "" },
  { slug: "wonder-food", aspect: "aspect-[9/16]", span: "mx-auto w-full max-w-xs md:max-w-none" },
] as const;

export function Proof({ copy, locale }: { copy: RestaurantsCopy; locale: Locale }) {
  return (
    <section aria-labelledby="proof-title" className="mx-auto max-w-6xl px-4 pb-16">
      <h2 id="proof-title" className="sr-only">{copy.proof.title}</h2>
      <div className="grid items-start gap-4 md:grid-cols-[1fr_0.316fr]">
        {reels.map(({ slug, aspect, span }) => {
          const project = restaurantProjects.find((p) => p.slug === slug)!;
          const hasVideo = hasPublicAsset(project.video);
          const poster = hasPublicAsset(project.poster) ? project.poster : undefined;
          return (
            <figure key={slug} className={cn("overflow-hidden rounded-xl border border-lp-line bg-lp-ink-2", span)}>
              <div className={cn("relative w-full", aspect)}>
                {hasVideo ? (
                  <LazyVideo src={project.video!} poster={poster} label={`${project.name} — ${project.line[locale]}`} className="absolute inset-0 size-full object-cover" />
                ) : poster ? (
                  // No reel yet: show the real still so the proof is never empty.
                  <Image src={poster} alt={`${project.name} — ${project.line[locale]}`} fill preload={slug === "maison-crousty"} sizes={slug === "wonder-food" ? "(min-width: 768px) 270px, 320px" : "(min-width: 768px) 840px, 100vw"} className="object-cover object-top" />
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

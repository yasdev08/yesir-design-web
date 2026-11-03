import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { getProject, isPortrait, projects, projectSlugs } from "@/content/catalog";
import { localePath } from "@/i18n/config";
import { getContent, getDictionary, getI18n, getLocale } from "@/i18n/server";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { routes } from "@/lib/routes";
import { Arrow } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ProjectVisual } from "@/components/portfolio/ProjectCard";
import { Breadcrumbs } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageTransition } from "@/components/layout/PageTransition";
import { JsonLd } from "@/components/seo/JsonLd";

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

async function resolve(params: Promise<{ slug: string }>) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return project;
}

export async function generateMetadata({ params }: PageProps<"/[locale]/projets/[slug]">): Promise<Metadata> {
  const project = await resolve(params);
  const locale = await getLocale();
  const t = getDictionary(locale);
  const copy = getContent(locale).projects[project.slug];
  return buildMetadata({ locale, path: routes.project(project.slug), title: `${copy.name} — ${copy.kind}`, description: `${copy.summary} ${t.status[project.status]}.` });
}

export default async function ProjectPage({ params }: PageProps<"/[locale]/projets/[slug]">) {
  const project = await resolve(params);
  const { locale, t, c } = await getI18n();
  const href = (p: string) => localePath(locale, p);
  const copy = c.projects[project.slug];
  const pp = t.projectPage;
  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];
  const portrait = isPortrait(project);

  return (
    <PageTransition>
      <article>
        <header className="relative overflow-hidden pb-12 pt-36 md:pt-44">
          <div className="bg-blueprint bg-blueprint-fade absolute inset-0" aria-hidden />
          <div className="container-site relative">
            <Breadcrumbs
              label={t.common.breadcrumbHome}
              items={[{ href: href("/"), name: t.common.breadcrumbHome }, { href: href(routes.projects), name: t.nav.projects }, { name: copy.name }]}
            />
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <StatusBadge status={project.status} t={t} />
              <span className="font-mono text-xs uppercase text-fg-subtle">{copy.kind}</span>
            </div>
            <h1 className="mt-6 text-display font-medium">{copy.name}</h1>
            <p className="mt-6 max-w-3xl text-lead text-fg-muted">{copy.summary}</p>
          </div>
        </header>

        <div className="container-site">
          <figure>
            <ProjectVisual project={project} c={c} idPrefix="detail" priority className="aspect-[16/10] border border-line md:aspect-[16/8]" />
            {project.images.length === 0 && (
              <figcaption className="mt-3 font-mono text-[0.68rem] uppercase tracking-wider text-fg-subtle">{t.common.illustrationNote}</figcaption>
            )}
          </figure>
        </div>

        <div className="container-site grid gap-16 py-section-sm lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <dl className="divide-y divide-line border-y border-line">
              <div className="py-5">
                <dt className="font-mono text-eyebrow uppercase text-fg-subtle">{pp.status}</dt>
                <dd className="mt-2">
                  {t.status[project.status]}
                  <span className="mt-1 block text-sm text-fg-muted">{t.statusHelp[project.status]}</span>
                </dd>
              </div>
              {project.partner && (
                <div className="py-5">
                  <dt className="font-mono text-eyebrow uppercase text-fg-subtle">{pp.partner}</dt>
                  <dd className="mt-2">{project.partner}</dd>
                </div>
              )}
              <div className="py-5">
                <dt className="font-mono text-eyebrow uppercase text-fg-subtle">{pp.category}</dt>
                <dd className="mt-2">{c.categories[project.category].name}</dd>
              </div>
              <div className="py-5">
                <dt className="font-mono text-eyebrow uppercase text-fg-subtle">{pp.services}</dt>
                <dd className="mt-3">
                  <ul className="space-y-2">
                    {project.services.map((slug) => (
                      <li key={slug}>
                        <Link href={href(routes.service(slug))} className="link-underline text-signal-soft hover:text-fg">
                          {c.services[slug].name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              {project.url && (
                <div className="py-5">
                  <dd>
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-fg hover:text-signal-soft">
                      {project.url.replace(/^https?:\/\//, "")}
                      <ArrowUpRight aria-hidden className="size-4" />
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </aside>

          <div className="space-y-16 lg:col-span-7 lg:col-start-6">
            <section aria-labelledby="context">
              <Eyebrow index="01"><span id="context">{pp.context}</span></Eyebrow>
              <p className="mt-6 text-xl leading-relaxed text-fg md:text-2xl" data-reveal>{copy.context}</p>
            </section>
            <section aria-labelledby="approach">
              <Eyebrow index="02"><span id="approach">{pp.approach}</span></Eyebrow>
              <p className="mt-6 text-lg leading-relaxed text-fg-muted" data-reveal>{copy.approach}</p>
            </section>
            <section aria-labelledby="scope">
              <Eyebrow index="03"><span id="scope">{pp.scope}</span></Eyebrow>
              <ul className="mt-6 border-t border-line">
                {copy.scope.map((item, i) => (
                  <li key={item} className="flex items-baseline gap-5 border-b border-line py-4" data-reveal>
                    <span className="font-mono text-xs text-fg-subtle">{String(i + 1).padStart(2, "0")}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        {project.images.length > 1 && (
          <section aria-labelledby="gallery" className="container-site pb-section-sm">
            <Eyebrow index="04"><span id="gallery">{pp.gallery}</span></Eyebrow>
            {/* Full gallery (the hero above is cropped): portrait sets in 3 columns, landscape in 2 */}
            <ul className={portrait ? "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" : "mt-8 grid gap-6 md:grid-cols-2"}>
              {project.images.map((img, i) => (
                <li key={img.src}>
                  <Image
                    src={img.src}
                    alt={copy.imageAlts?.[i] ?? copy.coverAlt}
                    width={img.width}
                    height={img.height}
                    loading="lazy"
                    className="h-auto w-full border border-line bg-ink-900"
                    sizes={portrait ? "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" : "(min-width: 768px) 50vw, 100vw"}
                  />
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>

      <nav aria-label={pp.next} className="border-t border-line">
        <Link href={href(routes.project(next.slug))} className="group/btn group container-site flex items-center justify-between gap-8 py-14">
          <span>
            <span className="font-mono text-eyebrow uppercase text-fg-subtle">{pp.next}</span>
            <span className="mt-3 block text-h2 font-medium transition-colors group-hover:text-signal-soft">{c.projects[next.slug].name}</span>
          </span>
          <Arrow className="size-8 text-signal-soft" />
        </Link>
      </nav>

      <CtaBand title={pp.ctaTitle} accent="" lead={pp.ctaLead} />
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: t.common.breadcrumbHome, path: "/" },
            { name: t.nav.projects, path: routes.projects },
            { name: copy.name, path: routes.project(project.slug) },
          ],
          locale,
        )}
      />
    </PageTransition>
  );
}

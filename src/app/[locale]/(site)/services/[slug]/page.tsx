import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { categories, getService, projects, serviceSlugs, type ServiceSlug } from "@/content/catalog";
import { localePath } from "@/i18n/config";
import { getContent, getI18n, getLocale } from "@/i18n/server";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { routes } from "@/lib/routes";
import { ButtonLink, Arrow } from "@/components/ui/Button";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import { CategoryGlyph } from "@/components/visuals/CategoryGlyph";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { Breadcrumbs, PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageTransition } from "@/components/layout/PageTransition";
import { JsonLd } from "@/components/seo/JsonLd";
import { restaurantsCopy } from "@/content/restaurants-copy";

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

async function resolve(params: Promise<{ slug: string }>) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  return service;
}

export async function generateMetadata({ params }: PageProps<"/[locale]/services/[slug]">): Promise<Metadata> {
  const service = await resolve(params);
  const locale = await getLocale();
  const copy = getContent(locale).services[service.slug];
  return buildMetadata({ locale, path: routes.service(service.slug), title: copy.seoTitle, description: copy.metaDescription });
}

export default async function ServicePage({ params }: PageProps<"/[locale]/services/[slug]">) {
  const service = await resolve(params);
  const { locale, t, c } = await getI18n();
  const href = (p: string) => localePath(locale, p);
  const copy = c.services[service.slug];
  const category = categories.find((cat) => cat.id === service.category)!;
  const catCopy = c.categories[category.id];
  const sp = t.servicePage;
  const related = service.related.map((slug) => projects.find((p) => p.slug === slug)!).filter(Boolean);
  const others = categories
    .flatMap((cat) => cat.services)
    .filter((slug): slug is ServiceSlug => slug !== service.slug)
    .sort((a, b) => Number(getService(b)!.category === service.category) - Number(getService(a)!.category === service.category))
    .slice(0, 4);

  return (
    <PageTransition>
      <PageHero
        eyebrow={`${sp.categoryLabel} ${category.index} — ${catCopy.name}`}
        title={copy.headline}
        accent={copy.headlineAccent}
        lead={copy.lead}
        breadcrumbs={
          <Breadcrumbs
            label={t.common.breadcrumbHome}
            items={[{ href: href("/"), name: t.common.breadcrumbHome }, { href: href(routes.services), name: t.nav.services }, { name: copy.name }]}
          />
        }
        aside={
          <div className="border border-line bg-ink-900 p-6" data-reveal>
            <CategoryGlyph id={category.id} className="size-10 text-signal-soft" />
            <p className="mt-5 text-lg font-medium">{copy.name}</p>
            <p className="mt-2 text-sm text-fg-muted">{copy.short}</p>
            <ButtonLink href={`${href(routes.quote)}?service=${service.slug}`} className="mt-6 w-full" arrow>
              {t.common.requestQuote}
            </ButtonLink>
          </div>
        }
      />

      {service.slug === "menu-digital" && (
        <section aria-label={sp.restaurantsBanner.title} className="border-b border-line bg-signal/10">
          <div className="container-site flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-lg font-medium text-fg">{sp.restaurantsBanner.title}</p>
              <p className="mt-1 text-fg-muted">
                {restaurantsCopy(locale).hero.priceHint} · {restaurantsCopy(locale).hero.sub}
              </p>
            </div>
            <ButtonLink href={href(routes.restaurants)} arrow className="self-start md:self-auto">
              {sp.restaurantsBanner.cta}
            </ButtonLink>
          </div>
        </section>
      )}

      {/* Problems solved */}
      <Section labelledBy="problems">
        <SectionHeading eyebrow={copy.name} index="01" title={<span id="problems">{sp.problems}</span>} />
        <ol className="mt-14 grid gap-px border border-line bg-line md:grid-cols-3">
          {copy.problems.map((p, i) => (
            <li key={p.title} className="bg-ink-950 p-8" data-reveal>
              <span className="font-mono text-xs text-signal-soft">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-6 text-xl font-medium">{p.title}</h3>
              <p className="mt-3 text-fg-muted">{p.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Deliverables + clients */}
      <Section tone="raised" className="border-y border-line" labelledBy="deliverables">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow index="02">{sp.deliverables}</Eyebrow>
            <h2 id="deliverables" className="sr-only">{sp.deliverables}</h2>
            <ul className="mt-10 border-t border-line">
              {copy.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-4 border-b border-line py-5 text-lg" data-reveal>
                  <Check aria-hidden className="mt-1 size-5 shrink-0 text-signal" strokeWidth={1.75} />
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-12 lg:col-span-5">
            <div>
              <Eyebrow index="03">{sp.clients}</Eyebrow>
              <ul className="mt-8 flex flex-wrap gap-2">
                {copy.clients.map((cl) => (
                  <li key={cl} className="border border-line-strong px-3.5 py-2 text-sm text-fg">{cl}</li>
                ))}
              </ul>
            </div>
            <div>
              <Eyebrow index="04">{sp.includes}</Eyebrow>
              <ul className="mt-8 space-y-2.5 text-fg-muted">
                {copy.includes.map((inc) => (
                  <li key={inc} className="flex items-center gap-3">
                    <span aria-hidden className="size-1.5 bg-signal" />
                    {inc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Process */}
      <Section labelledBy="svc-process">
        <SectionHeading eyebrow={copy.name} index="05" title={<span id="svc-process">{sp.process}</span>} />
        <ol className="mt-14 grid md:grid-cols-4">
          {copy.process.map((step, i) => (
            <li key={step.title} className="relative border-s border-line pb-10 ps-8 md:border-s-0 md:border-t md:pe-8 md:ps-0 md:pt-10" data-reveal>
              <span aria-hidden className="absolute -start-[5px] top-1 size-[9px] bg-signal md:-top-[5px] md:start-0" />
              <span className="font-mono text-xs text-fg-subtle">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-xl font-medium">{step.title}</h3>
              <p className="mt-3 text-fg-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Related projects */}
      {related.length > 0 && (
        <Section tone="raised" className="border-y border-line" labelledBy="related">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow={t.nav.projects} index="06" title={<span id="related">{sp.related}</span>} />
            <ButtonLink href={href(routes.projects)} variant="secondary" arrow className="self-start">
              {t.common.allProjects}
            </ButtonLink>
          </div>
          <div className="mt-14 grid gap-12 md:grid-cols-2">
            {related.map((p) => (
              <ProjectCard key={p.slug} project={p} locale={locale} t={t} c={c} idPrefix="related" />
            ))}
          </div>
        </Section>
      )}

      {/* Other services — internal linking */}
      <Section labelledBy="others">
        <h2 id="others" className="text-h3 font-medium">{sp.otherServices}</h2>
        <ul className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {others.map((slug) => (
            <li key={slug} className="bg-ink-950">
              <Link href={href(routes.service(slug))} className="group/btn flex h-full flex-col justify-between gap-8 p-6 transition-colors hover:bg-ink-900">
                <span>
                  <span className="block text-lg font-medium">{c.services[slug].name}</span>
                  <span className="mt-2 block text-sm text-fg-muted">{c.services[slug].short}</span>
                </span>
                <Arrow className="text-signal-soft" />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand title={sp.ctaTitle} accent="" lead={sp.ctaLead} />
      <JsonLd
        data={[
          serviceSchema({ name: copy.name, description: copy.metaDescription, path: routes.service(service.slug), locale, category: catCopy.name }),
          breadcrumbSchema(
            [
              { name: t.common.breadcrumbHome, path: "/" },
              { name: t.nav.services, path: routes.services },
              { name: copy.name, path: routes.service(service.slug) },
            ],
            locale,
          ),
        ]}
      />
    </PageTransition>
  );
}

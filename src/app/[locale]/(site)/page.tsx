import Link from "next/link";
import { categories, projects, type Category } from "@/content/catalog";
import type { ContentCopy } from "@/content/copy/types";
import { localePath, type Locale } from "@/i18n/config";
import { getI18n } from "@/i18n/server";
import type { Dictionary } from "@/i18n/dictionaries/fr";
import { routes } from "@/lib/routes";
import { faqSchema } from "@/lib/schema";
import { cn } from "@/lib/cn";
import { Arrow, ButtonLink } from "@/components/ui/Button";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { HeroVisual } from "@/components/visuals/HeroVisual";
import { CategoryGlyph } from "@/components/visuals/CategoryGlyph";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { Faq } from "@/components/sections/Faq";
import { PageTransition } from "@/components/layout/PageTransition";
import { JsonLd } from "@/components/seo/JsonLd";

export default async function HomePage() {
  const { locale, t, c } = await getI18n();
  const href = (p: string) => localePath(locale, p);
  const h = t.home;
  const featured = projects.filter((p) => p.featured).slice(0, 4);

  return (
    <PageTransition>
      {/* ---------------------------------------------------------- HERO */}
      <section className="relative overflow-hidden pt-28 md:pt-32" aria-labelledby="hero-title">
        <div className="bg-blueprint bg-blueprint-fade absolute inset-0" aria-hidden />
        <div aria-hidden className="glow-blob absolute end-[-25%] top-[-25%] size-[70rem]" />
        <div className="container-site relative">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-7">
              <Eyebrow>{h.hero.eyebrow}</Eyebrow>
              <h1 id="hero-title" className="mt-8 text-display font-medium">
                <span className="block">{h.hero.titleA}</span>
                <span className="block">
                  {h.hero.titleB} <em className="accent text-signal-soft">{h.hero.titleAccent}</em>
                </span>
              </h1>
              <p className="mt-8 max-w-xl text-lead text-fg-muted">{h.hero.lead}</p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={href(routes.quote)} size="lg" arrow>
                  {t.common.startProject}
                </ButtonLink>
                <ButtonLink href={href(routes.projects)} size="lg" variant="secondary">
                  {t.common.exploreWork}
                </ButtonLink>
              </div>
            </div>
            <figure className="relative mx-auto w-full max-w-[34rem] lg:col-span-5 lg:max-w-none">
              <HeroVisual title={h.hero.figure} />
              <figcaption className="mt-2 font-mono text-[0.68rem] uppercase tracking-wider text-fg-subtle">{h.hero.figure}</figcaption>
            </figure>
          </div>

          <dl className="mt-16 grid grid-cols-2 border-t border-line md:mt-20 md:grid-cols-4">
            {h.hero.specs.map((spec, i) => (
              <div key={spec} className="border-b border-e border-line py-5 pe-4 md:border-b-0 [&:nth-child(2)]:border-e-0 md:[&:nth-child(2)]:border-e">
                <dt className="font-mono text-[0.68rem] text-fg-subtle">{String(i + 1).padStart(2, "0")}</dt>
                <dd className="mt-1 text-fg">{spec}</dd>
              </div>
            ))}
            <div className="col-span-2 py-5 md:col-span-1 md:ps-6">
              <dt className="font-mono text-[0.68rem] uppercase text-fg-subtle">{h.hero.areaLabel}</dt>
              <dd className="mt-1 text-fg">{t.common.serviceArea}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ------------------------------------------------------ MANIFESTO */}
      <section className="py-section" aria-label={h.manifesto.eyebrow}>
        <div className="container-site grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Eyebrow>{h.manifesto.eyebrow}</Eyebrow>
          </div>
          <p className="text-h2 font-medium text-fg-muted lg:col-span-9" data-reveal>
            {h.manifesto.text} <span className="text-fg">{h.manifesto.accent}</span>
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------- SERVICES */}
      <Section className="pt-0" labelledBy="services-title">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading eyebrow={h.services.eyebrow} index="01" title={<span id="services-title">{h.services.title}</span>} lead={h.services.lead} />
          <ButtonLink href={href(routes.services)} variant="secondary" arrow className="self-start lg:self-auto">
            {t.common.allServices}
          </ButtonLink>
        </div>
        <ServiceGrid locale={locale} t={t} c={c} />
      </Section>

      {/* ------------------------------------------------------- PROJECTS */}
      <Section tone="raised" labelledBy="projects-title" className="border-y border-line">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading eyebrow={h.projects.eyebrow} index="02" title={<span id="projects-title">{h.projects.title}</span>} lead={h.projects.lead} />
          <ul className="flex flex-wrap gap-2" aria-label={t.projectsPage.legend}>
            {(["completed", "concept", "internal", "in-progress"] as const).map((s) => (
              <li key={s}>
                <StatusBadge status={s} t={t} />
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-12">
          {featured.map((project, i) => (
            <div key={project.slug} className={cn(i % 4 === 0 || i % 4 === 3 ? "md:col-span-7" : "md:col-span-5", i % 4 === 1 && "md:mt-24")}>
              <ProjectCard project={project} locale={locale} t={t} c={c} size={i % 4 === 0 || i % 4 === 3 ? "lg" : "md"} idPrefix="home" />
            </div>
          ))}
        </div>
        <div className="mt-16 flex justify-center">
          <ButtonLink href={href(routes.projects)} variant="secondary" size="lg" arrow>
            {t.common.allProjects}
          </ButtonLink>
        </div>
      </Section>

      {/* ------------------------------------------------------------ WHY */}
      <Section tone="light" labelledBy="why-title">
        <SectionHeading tone="light" eyebrow={h.why.eyebrow} index="03" title={<span id="why-title">{h.why.title}</span>} />
        <ol className="mt-16 grid border-t border-paper-line md:grid-cols-2">
          {h.why.items.map((item, i) => (
            <li key={item.title} className="border-b border-paper-line py-10 md:odd:border-e md:odd:pe-12 md:even:ps-12" data-reveal>
              <span className="font-mono text-sm text-signal">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-5 text-h3 font-medium text-ink-text">{item.title}</h3>
              <p className="mt-4 max-w-lg text-ink-text-muted">{item.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* -------------------------------------------------------- PROCESS */}
      <Section labelledBy="process-title">
        <SectionHeading eyebrow={h.process.eyebrow} index="04" title={<span id="process-title">{h.process.title}</span>} />
        <ol className="relative mt-16 grid gap-0 md:grid-cols-5">
          {h.process.steps.map((step, i) => (
            <li key={step.title} className="relative border-s border-line ps-8 pb-12 md:border-s-0 md:border-t md:pb-0 md:pe-6 md:ps-0 md:pt-10" data-reveal>
              <span aria-hidden className="absolute -start-[5px] top-1 size-[9px] bg-signal md:-top-[5px] md:start-0" />
              <span className="font-mono text-xs text-fg-subtle">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-xl font-medium">{step.title}</h3>
              <p className="mt-3 text-fg-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ----------------------------------------------------- INDUSTRIES */}
      <Section tone="raised" labelledBy="industries-title" className="border-y border-line">
        <SectionHeading eyebrow={h.industries.eyebrow} index="05" title={<span id="industries-title">{h.industries.title}</span>} />
        <ul className="mt-16 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {h.industries.items.map((item, i) => (
            <li key={item.name} className="group bg-ink-900 p-7 transition-colors hover:bg-ink-850">
              <span className="font-mono text-xs text-fg-subtle transition-colors group-hover:text-signal-soft">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-6 text-lg font-medium">{item.name}</h3>
              <p className="mt-2 text-sm text-fg-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* ------------------------------------------------------------ FAQ */}
      <Section labelledBy="faq-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow={h.faq.eyebrow} index="06" title={<span id="faq-title">{h.faq.title}</span>} />
          </div>
          <div className="lg:col-span-8">
            <Faq items={h.faq.items} />
          </div>
        </div>
      </Section>

      <CtaBand />
      <JsonLd data={faqSchema(h.faq.items)} />
    </PageTransition>
  );
}

/** Hierarchy: core expertises are large, growth spans wide, systems are compact. */
function ServiceGrid({ locale, t, c }: { locale: Locale; t: Dictionary; c: ContentCopy }) {
  const layout: Record<Category["tier"], string> = {
    core: "lg:col-span-6 lg:min-h-[30rem]",
    growth: "lg:col-span-12",
    systems: "lg:col-span-6",
  };
  return (
    <div className="mt-16 grid gap-px border border-line bg-line lg:grid-cols-12">
      {categories.map((cat) => {
        const copy = c.categories[cat.id];
        const first = cat.services[0];
        return (
          <article key={cat.id} className={cn("group relative flex flex-col bg-ink-950 p-7 transition-colors hover:bg-ink-900 md:p-10", layout[cat.tier])} data-reveal>
            <div className="flex items-start justify-between gap-6">
              <CategoryGlyph id={cat.id} className={cn("text-signal-soft transition-colors group-hover:text-signal", cat.tier === "core" ? "size-14" : "size-11")} />
              <span className="font-mono text-xs text-fg-subtle">
                {cat.index} — {t.tiers[cat.tier]}
              </span>
            </div>
            <div className={cn("mt-10", cat.tier === "growth" && "lg:grid lg:grid-cols-2 lg:gap-12")}>
              <div>
                <h3 className={cn("font-medium", cat.tier === "core" ? "text-h2" : "text-h3")}>
                  <Link href={localePath(locale, routes.service(first))} className="after:absolute after:inset-0">
                    {copy.name}
                  </Link>
                </h3>
                <p className="mt-4 max-w-lg text-fg-muted">{copy.description}</p>
              </div>
              <ul className={cn("relative z-10 mt-8 flex flex-wrap gap-2", cat.tier === "growth" && "lg:mt-0 lg:content-start")}>
                {copy.items.map((item) => (
                  <li key={item} className="border border-line-strong px-3 py-1.5 text-[0.82rem] text-fg-muted">{item}</li>
                ))}
              </ul>
            </div>
            <div className="mt-auto flex items-center gap-3 pt-10 text-sm text-fg-muted transition-colors group-hover:text-fg">
              <span className="group/btn inline-flex items-center gap-3">
                {t.common.viewService}
                <Arrow />
              </span>
            </div>
          </article>
        );
      })}
    </div>
  );
}

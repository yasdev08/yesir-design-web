import type { Metadata } from "next";
import { localePath } from "@/i18n/config";
import { getDictionary, getI18n, getLocale } from "@/i18n/server";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { routes } from "@/lib/routes";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import { LogoMark } from "@/components/visuals/Logo";
import { Breadcrumbs, PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageTransition } from "@/components/layout/PageTransition";
import { JsonLd } from "@/components/seo/JsonLd";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getDictionary(locale);
  return buildMetadata({ locale, path: routes.about, title: t.about.metaTitle, description: t.about.metaDescription });
}

export default async function AboutPage() {
  const { locale, t } = await getI18n();
  const a = t.about;

  return (
    <PageTransition>
      <PageHero
        eyebrow={a.eyebrow}
        title={a.title}
        accent={a.titleAccent}
        lead={a.lead}
        breadcrumbs={<Breadcrumbs label={t.common.breadcrumbHome} items={[{ href: localePath(locale, "/"), name: t.common.breadcrumbHome }, { name: t.nav.about }]} />}
        aside={<LogoMark className="ms-auto hidden size-56 opacity-90 lg:block" />}
      />

      <Section labelledBy="story">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow index="01">{a.storyTitle}</Eyebrow>
            <h2 id="story" className="sr-only">{a.storyTitle}</h2>
          </div>
          <div className="space-y-8 lg:col-span-8">
            {a.story.map((p, i) => (
              <p key={i} className={i === 0 ? "text-h3 font-medium leading-snug text-fg" : "text-lead text-fg-muted"} data-reveal>
                {p}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="light" labelledBy="principles">
        <SectionHeading tone="light" eyebrow={a.principlesTitle} index="02" title={<span id="principles">{t.home.why.title}</span>} />
        <ul className="mt-14 grid gap-px border border-paper-line bg-paper-line md:grid-cols-2 lg:grid-cols-4">
          {a.principles.map((p, i) => (
            <li key={p.title} className="bg-paper p-8" data-reveal>
              <span className="font-mono text-xs text-signal-strong">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-6 text-xl font-medium text-ink-text">{p.title}</h3>
              <p className="mt-3 text-ink-text-muted">{p.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="capabilities">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow index="03">{a.capabilitiesTitle}</Eyebrow>
            <h2 id="capabilities" className="sr-only">{a.capabilitiesTitle}</h2>
          </div>
          <ul className="grid gap-px self-start border border-line bg-line sm:grid-cols-2 lg:col-span-8">
            {a.capabilities.map((cap, i) => (
              <li key={cap} className="flex items-baseline gap-4 bg-ink-950 p-6 text-lg" data-reveal>
                <span className="font-mono text-xs text-fg-subtle">{String(i + 1).padStart(2, "0")}</span>
                {cap}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="raised" className="border-y border-line" labelledBy="area">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow index="04">{a.areaTitle}</Eyebrow>
          </div>
          <div className="lg:col-span-8">
            <h2 id="area" className="text-h2 font-medium">
              {t.common.serviceArea}
            </h2>
            <p className="mt-6 max-w-2xl text-lead text-fg-muted">{a.areaText}</p>
          </div>
        </div>
      </Section>

      <CtaBand />
      <JsonLd data={breadcrumbSchema([{ name: t.common.breadcrumbHome, path: "/" }, { name: t.nav.about, path: routes.about }], locale)} />
    </PageTransition>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { categories } from "@/content/catalog";
import { localePath } from "@/i18n/config";
import { getDictionary, getI18n, getLocale } from "@/i18n/server";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/cn";
import { Arrow } from "@/components/ui/Button";
import { CategoryGlyph } from "@/components/visuals/CategoryGlyph";
import { Breadcrumbs, PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageTransition } from "@/components/layout/PageTransition";
import { JsonLd } from "@/components/seo/JsonLd";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getDictionary(locale);
  return buildMetadata({ locale, path: routes.services, title: t.servicesPage.metaTitle, description: t.servicesPage.metaDescription });
}

export default async function ServicesPage() {
  const { locale, t, c } = await getI18n();
  const href = (p: string) => localePath(locale, p);
  const s = t.servicesPage;

  return (
    <PageTransition>
      <PageHero
        eyebrow={s.eyebrow}
        title={s.title}
        accent={s.titleAccent}
        lead={s.lead}
        breadcrumbs={<Breadcrumbs label={t.common.breadcrumbHome} items={[{ href: href("/"), name: t.common.breadcrumbHome }, { name: t.nav.services }]} />}
      />

      {categories.map((cat, ci) => {
        const copy = c.categories[cat.id];
        const isCore = cat.tier === "core";
        return (
          <section key={cat.id} id={cat.id} aria-labelledby={`cat-${cat.id}`} className={cn("border-b border-line py-section-sm", ci % 2 === 1 && "bg-ink-900")}>
            <div className="container-site grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5" data-reveal>
                <div className="flex items-center gap-4">
                  <CategoryGlyph id={cat.id} className={cn("text-signal-soft", isCore ? "size-14" : "size-11")} />
                  <span className="font-mono text-xs text-fg-subtle">
                    {cat.index} — {t.tiers[cat.tier]}
                  </span>
                </div>
                <h2 id={`cat-${cat.id}`} className={cn("mt-8 font-medium", isCore ? "text-h2" : "text-h3")}>
                  {copy.name}
                </h2>
                <p className="mt-5 max-w-md text-fg-muted">{copy.description}</p>
                <p className="mt-8 font-mono text-eyebrow uppercase text-fg-subtle">{s.includes}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {copy.items.map((item) => (
                    <li key={item} className="border border-line-strong px-3 py-1.5 text-[0.82rem] text-fg-muted">{item}</li>
                  ))}
                </ul>
              </div>
              <ul className="grid gap-px self-start border border-line bg-line lg:col-span-7">
                {cat.services.map((slug, i) => {
                  const svc = c.services[slug];
                  return (
                    <li key={slug} className="bg-ink-950" data-reveal>
                      <Link href={href(routes.service(slug))} className="group/btn group flex flex-col gap-6 p-7 transition-colors hover:bg-ink-850 md:flex-row md:items-center md:justify-between md:p-9">
                        <div>
                          <span className="font-mono text-xs text-fg-subtle">{cat.index}.{i + 1}</span>
                          <h3 className="mt-3 text-h3 font-medium transition-colors group-hover:text-signal-soft">{svc.name}</h3>
                          <p className="mt-3 max-w-lg text-fg-muted">{svc.short}</p>
                        </div>
                        <span className="inline-flex shrink-0 items-center gap-3 text-sm text-fg-muted group-hover:text-fg">
                          {s.explore}
                          <Arrow />
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        );
      })}

      <CtaBand />
      <JsonLd data={breadcrumbSchema([{ name: t.common.breadcrumbHome, path: "/" }, { name: t.nav.services, path: routes.services }], locale)} />
    </PageTransition>
  );
}

import type { Metadata } from "next";
import { categories, projects } from "@/content/catalog";
import { localePath } from "@/i18n/config";
import { getDictionary, getI18n, getLocale } from "@/i18n/server";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { routes } from "@/lib/routes";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { ProjectFilter } from "@/components/portfolio/ProjectFilter";
import { Breadcrumbs, PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageTransition } from "@/components/layout/PageTransition";
import { JsonLd } from "@/components/seo/JsonLd";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getDictionary(locale);
  return buildMetadata({ locale, path: routes.projects, title: t.projectsPage.metaTitle, description: t.projectsPage.metaDescription });
}

export default async function ProjectsPage() {
  const { locale, t, c } = await getI18n();
  const p = t.projectsPage;
  const filters = categories
    .map((cat) => ({ id: cat.id, label: c.categories[cat.id].name, count: projects.filter((pr) => pr.category === cat.id).length }))
    .filter((f) => f.count > 0);

  return (
    <PageTransition>
      <PageHero
        eyebrow={p.eyebrow}
        title={p.title}
        accent={p.titleAccent}
        lead={p.lead}
        breadcrumbs={<Breadcrumbs label={t.common.breadcrumbHome} items={[{ href: localePath(locale, "/"), name: t.common.breadcrumbHome }, { name: t.nav.projects }]} />}
      >
        <div className="mt-10">
          <p className="font-mono text-eyebrow uppercase text-fg-subtle">{p.legend}</p>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            {(["completed", "concept", "internal", "in-progress"] as const).map((s) => (
              <div key={s} className="flex items-center gap-3">
                <dt><StatusBadge status={s} t={t} /></dt>
                <dd className="text-sm text-fg-muted">{t.statusHelp[s]}</dd>
              </div>
            ))}
          </dl>
        </div>
      </PageHero>

      <section className="py-section-sm" aria-label={p.eyebrow}>
        <div className="container-site">
          <ProjectFilter
            label={p.filterLabel}
            allLabel={p.filterAll}
            emptyLabel={p.empty}
            filters={filters}
            items={projects.map((project) => ({
              key: project.slug,
              category: project.category,
              node: <ProjectCard project={project} locale={locale} t={t} c={c} idPrefix="grid" />,
            }))}
          />
        </div>
      </section>

      <CtaBand />
      <JsonLd data={breadcrumbSchema([{ name: t.common.breadcrumbHome, path: "/" }, { name: t.nav.projects, path: routes.projects }], locale)} />
    </PageTransition>
  );
}

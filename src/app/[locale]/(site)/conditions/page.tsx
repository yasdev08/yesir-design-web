import type { Metadata } from "next";
import { getDictionary, getI18n, getLocale } from "@/i18n/server";
import { getLegal } from "@/content/legal";
import { buildMetadata } from "@/lib/seo";
import { routes } from "@/lib/routes";
import { LegalPage } from "@/components/sections/LegalPage";
import { PageTransition } from "@/components/layout/PageTransition";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getDictionary(locale);
  return buildMetadata({ locale, path: routes.terms, title: t.legal.termsTitle, description: t.legal.termsDescription });
}

export default async function Page() {
  const { locale, t } = await getI18n();
  const legal = getLegal(locale);
  return (
    <PageTransition>
      <LegalPage locale={locale} t={t} title={t.legal.termsTitle} intro={legal.terms.intro} sections={legal.terms.sections} updated={legal.updated} />
    </PageTransition>
  );
}

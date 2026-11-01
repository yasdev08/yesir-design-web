import Link from "next/link";
import { localePath } from "@/i18n/config";
import { getI18n } from "@/i18n/server";
import { buttonClasses, Arrow } from "@/components/ui/Button";

export default async function NotFound() {
  const { locale, t } = await getI18n();
  return (
    <section className="bg-blueprint relative flex min-h-[80vh] items-center pt-28">
      <div className="container-site">
        <p className="font-mono text-eyebrow uppercase text-signal-soft">404</p>
        <h1 className="mt-6 max-w-3xl text-h1 font-medium">{t.notFound.title}</h1>
        <p className="mt-6 max-w-xl text-lead text-fg-muted">{t.notFound.lead}</p>
        <Link href={localePath(locale, "/")} className={buttonClasses("primary", "lg", "mt-10")}>
          {t.notFound.back}
          <Arrow />
        </Link>
      </div>
    </section>
  );
}

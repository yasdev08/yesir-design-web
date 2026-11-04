import Link from "next/link";
import { business } from "@/content/business";
import { restaurantsCopy } from "@/content/restaurants-copy";
import { localePath } from "@/i18n/config";
import { getI18n } from "@/i18n/server";
import { routes } from "@/lib/routes";
import { Logo } from "@/components/visuals/Logo";
import { WaLink } from "@/components/restaurants/ContactLinks";

async function CurrentYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

/**
 * Minimal chrome for campaign landing pages: logo + WhatsApp only, so nothing
 * competes with the main call to action.
 */
export default async function LandingLayout({ children }: LayoutProps<"/[locale]">) {
  const { locale, t } = await getI18n();
  const copy = restaurantsCopy(locale);
  return (
    <div className="bg-lp-ink text-white">
      <header className="sticky top-0 z-40 border-b border-lp-line bg-lp-ink/95" style={{ viewTransitionName: "site-header" }}>
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
          <Link href={localePath(locale, "/")} prefetch={false} aria-label={copy.nav.home} className="flex min-h-11 items-center">
            <Logo className="h-8" />
          </Link>
          <WaLink message={copy.messages.base} track="header" className="min-h-11 px-4 text-sm">
            {copy.nav.whatsapp}
          </WaLink>
        </div>
      </header>
      <main id="main">{children}</main>
      <footer className="border-t border-lp-line max-md:pb-24">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-lp-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear /> {business.name} · {business.tagline[locale]}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li><Link href={localePath(locale, "/")} prefetch={false} className="inline-flex min-h-11 items-center hover:text-white">{t.nav.home}</Link></li>
            <li><Link href={localePath(locale, routes.privacy)} prefetch={false} className="inline-flex min-h-11 items-center hover:text-white">{t.footer.privacy}</Link></li>
            <li><Link href={localePath(locale, routes.terms)} prefetch={false} className="inline-flex min-h-11 items-center hover:text-white">{t.footer.terms}</Link></li>
            {(
              [
                ["Instagram", business.social.instagram],
                ["Facebook", business.social.facebook],
                ["TikTok", business.social.tiktok],
              ] as const
            ).map(([label, url]) => (
              <li key={label}>
                <a href={url} target="_blank" rel="noopener noreferrer me" className="inline-flex min-h-11 items-center hover:text-white">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </div>
  );
}

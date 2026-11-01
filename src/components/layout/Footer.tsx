import Link from "next/link";
import { categories } from "@/content/catalog";
import { siteConfig } from "@/config/site";
import { localePath } from "@/i18n/config";
import { getI18n } from "@/i18n/server";
import { routes } from "@/lib/routes";
import { getChannels } from "@/lib/contact";
import { ChannelIcon } from "@/components/ui/ChannelIcon";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/visuals/Logo";

async function CurrentYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

export async function Footer() {
  const { locale, t, c } = await getI18n();
  const href = (p: string) => localePath(locale, p);
  const channels = getChannels(t);
  const socials = Object.entries(siteConfig.social).filter(([, url]) => Boolean(url)) as [string, string][];
  const socialNames: Record<string, string> = { instagram: "Instagram", facebook: "Facebook", linkedin: "LinkedIn", tiktok: "TikTok" };

  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink-950">
      <div className="container-site py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo className="h-12" />
            <p className="mt-6 max-w-sm text-fg-muted">{t.footer.tagline}</p>
            <p className="mt-6 font-mono text-xs text-fg-subtle">{t.footer.area}</p>
            <ButtonLink href={href(routes.quote)} className="mt-8" arrow>
              {t.common.startProject}
            </ButtonLink>
          </div>

          <nav aria-label={t.footer.servicesTitle} className="lg:col-span-3">
            <h2 className="font-mono text-eyebrow uppercase text-fg-subtle">{t.footer.servicesTitle}</h2>
            <ul className="mt-5 space-y-3">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link href={href(routes.service(cat.services[0]))} className="link-underline text-fg-muted hover:text-fg">
                    {c.categories[cat.id].name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t.footer.agencyTitle} className="lg:col-span-2">
            <h2 className="font-mono text-eyebrow uppercase text-fg-subtle">{t.footer.agencyTitle}</h2>
            <ul className="mt-5 space-y-3">
              {[
                [routes.services, t.nav.services],
                [routes.projects, t.nav.projects],
                [routes.about, t.nav.about],
                [routes.contact, t.nav.contact],
                [routes.quote, t.common.requestQuote],
              ].map(([path, label]) => (
                <li key={path}>
                  <Link href={href(path)} className="link-underline text-fg-muted hover:text-fg">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="font-mono text-eyebrow uppercase text-fg-subtle">{t.footer.contactTitle}</h2>
            <ul className="mt-5 space-y-3">
              {channels.map((ch) => (
                <li key={ch.kind}>
                  <a
                    href={ch.href}
                    {...(ch.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group inline-flex items-center gap-3 text-fg-muted hover:text-fg"
                  >
                    <ChannelIcon kind={ch.kind} className="text-signal-soft" />
                    <span dir="ltr" className="link-underline">{ch.value}</span>
                  </a>
                </li>
              ))}
              <li>
                <Link href={href(routes.contact)} className="link-underline text-fg-muted hover:text-fg">
                  {t.contactPage.formTitle}
                </Link>
              </li>
            </ul>
            {socials.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-2" aria-label={t.footer.followUs}>
                {socials.map(([key, url]) => (
                  <li key={key}>
                    <a href={url} target="_blank" rel="noopener noreferrer me" className="inline-flex h-9 items-center border border-line-strong px-3 text-xs text-fg-muted hover:border-signal-soft hover:text-fg">
                      {socialNames[key]}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="container-site" aria-hidden>
        <p className="select-none whitespace-nowrap text-[clamp(3rem,13.5vw,12.5rem)] leading-[0.85] tracking-[0.06em] text-ink-800" style={{ fontFamily: "var(--font-michroma), sans-serif" }} dir="ltr">
          YESIR
        </p>
      </div>

      <div className="border-t border-line">
        <div className="container-site flex flex-col gap-4 py-6 text-sm text-fg-subtle md:flex-row md:items-center md:justify-between">
          <p>
            © <CurrentYear /> {siteConfig.legalName}. {t.footer.rights}
          </p>
          <ul className="flex gap-6">
            <li><Link href={href(routes.privacy)} className="hover:text-fg">{t.footer.privacy}</Link></li>
            <li><Link href={href(routes.terms)} className="hover:text-fg">{t.footer.terms}</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

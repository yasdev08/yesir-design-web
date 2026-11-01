import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { categories, getService } from "@/content/catalog";
import { localePath } from "@/i18n/config";
import { getI18n } from "@/i18n/server";
import { routes } from "@/lib/routes";
import { getChannels } from "@/lib/contact";
import { buttonClasses, Arrow } from "@/components/ui/Button";
import { CategoryGlyph } from "@/components/visuals/CategoryGlyph";
import { Logo } from "@/components/visuals/Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";
import { NavLink } from "./NavLinks";

export async function Header() {
  const { locale, t, c } = await getI18n();
  const href = (p: string) => localePath(locale, p);
  const items = [
    { href: href(routes.services), label: t.nav.services },
    { href: href(routes.projects), label: t.nav.projects },
    { href: href(routes.about), label: t.nav.about },
    { href: href(routes.contact), label: t.nav.contact },
  ];
  const channels = getChannels(t);

  return (
    <header className="site-header fixed inset-x-0 top-0 z-50" style={{ viewTransitionName: "site-header" }}>
      <div className="header-bg absolute inset-0 -z-10 border-b border-transparent" aria-hidden />
      <div className="container-site flex h-[4.5rem] items-center justify-between gap-6">
        <Link href={href("/")} className="shrink-0" aria-label={`YESIR DESIGN — ${t.nav.home}`}>
          <Logo className="h-9 lg:h-10" />
        </Link>

        <nav aria-label={t.nav.mainLabel} className="hidden lg:block">
          <ul className="flex items-center gap-9">
            <li className="group/mega relative">
              <span className="inline-flex items-center gap-1.5">
                <NavLink href={items[0].href}>{items[0].label}</NavLink>
                <ChevronDown aria-hidden className="size-3.5 text-fg-subtle transition-transform group-hover/mega:rotate-180 group-focus-within/mega:rotate-180" />
              </span>
              {/* CSS-only mega panel (hover & keyboard focus) */}
              <div className="invisible absolute start-1/2 top-full w-[min(56rem,90vw)] -translate-x-1/2 pt-4 opacity-0 transition-[opacity,visibility,translate] duration-300 group-hover/mega:visible group-hover/mega:opacity-100 group-focus-within/mega:visible group-focus-within/mega:opacity-100 rtl:translate-x-1/2">
                <div className="grid grid-cols-5 border border-line bg-ink-900/98 shadow-2xl shadow-black/50">
                  {categories.map((cat) => (
                    <div key={cat.id} className="border-e border-line p-5 last:border-e-0">
                      <CategoryGlyph id={cat.id} className="size-8 text-signal-soft" />
                      <p className="mt-4 font-mono text-[0.65rem] text-fg-subtle">{cat.index}</p>
                      <p className="mt-1 text-sm font-medium leading-snug text-fg">{c.categories[cat.id].name}</p>
                      <ul className="mt-4 space-y-2">
                        {cat.services.map((slug) => (
                          <li key={slug}>
                            <Link href={href(routes.service(getService(slug)!.slug))} className="link-underline text-[0.83rem] leading-snug text-fg-muted hover:text-fg">
                              {c.services[slug].name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <Link href={items[0].href} className="group/btn flex items-center justify-between border border-t-0 border-line bg-ink-850 px-5 py-3 text-sm text-fg-muted hover:text-fg">
                  {t.nav.servicesOverview}
                  <Arrow />
                </Link>
              </div>
            </li>
            {items.slice(1).map((item) => (
              <li key={item.href}>
                <NavLink href={item.href}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher current={locale} label={t.nav.language} className="hidden sm:flex" />
          <Link href={href(routes.quote)} className={buttonClasses("primary", "md", "max-lg:hidden")}>
            {t.nav.quote}
            <Arrow />
          </Link>
          <MobileMenu
            locale={locale}
            items={[{ href: href("/"), label: t.nav.home }, ...items]}
            cta={{ href: href(routes.quote), label: t.nav.quote }}
            contacts={channels.map((ch) => ({ href: ch.href, label: ch.label, external: ch.external }))}
            labels={{ menu: t.nav.menu, close: t.nav.close, language: t.nav.language, mainLabel: t.nav.mainLabel }}
          />
        </div>
      </div>
    </header>
  );
}

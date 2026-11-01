"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeMeta, type Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

/** Swaps the locale segment of the current URL, keeping the same page. */
export function LanguageSwitcher({ current, label, className, variant = "compact" }: { current: Locale; label: string; className?: string; variant?: "compact" | "full" }) {
  const pathname = usePathname();
  const rest = pathname.replace(/^\/(fr|ar|en)(?=\/|$)/, "");
  return (
    <nav aria-label={label} className={cn("flex items-center", className)}>
      <ul className={cn("flex items-center", variant === "compact" ? "gap-1" : "gap-3")}>
        {locales.map((locale) => {
          const meta = localeMeta[locale];
          const active = locale === current;
          return (
            <li key={locale}>
              <Link
                href={`/${locale}${rest}`}
                hrefLang={meta.htmlLang}
                lang={meta.htmlLang}
                aria-current={active ? "true" : undefined}
                title={meta.label}
                className={cn(
                  "inline-flex h-9 items-center justify-center border px-2.5 font-mono text-xs transition-colors",
                  active ? "border-line-strong text-fg" : "border-transparent text-fg-subtle hover:text-fg",
                  variant === "full" && "h-11 px-4 text-sm",
                )}
              >
                {variant === "full" ? meta.label : meta.short}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

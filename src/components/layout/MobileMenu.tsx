"use client";

import Link from "next/link";
import { useRef } from "react";
import { Menu, X } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface Props {
  locale: Locale;
  items: { href: string; label: string }[];
  cta: { href: string; label: string };
  contacts: { href: string; label: string; external?: boolean }[];
  labels: { menu: string; close: string; language: string; mainLabel: string };
}

/** Full-screen mobile navigation built on the native <dialog> (focus trap, Esc, inert background). */
export function MobileMenu({ locale, items, cta, contacts, labels }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const open = () => {
    ref.current?.showModal();
    document.documentElement.style.overflow = "hidden";
  };
  const close = () => ref.current?.close();
  const onClose = () => {
    document.documentElement.style.overflow = "";
  };

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="inline-flex h-11 items-center gap-2 border border-line-strong px-3.5 text-sm text-fg lg:hidden"
        aria-haspopup="dialog"
      >
        <Menu aria-hidden className="size-4" strokeWidth={1.75} />
        {labels.menu}
      </button>
      <dialog
        ref={ref}
        onClose={onClose}
        aria-label={labels.mainLabel}
        className="mobile-menu fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none bg-ink-950 p-0 text-fg backdrop:bg-ink-950/80 lg:hidden"
      >
        <div className="bg-blueprint flex h-full flex-col overflow-y-auto px-[var(--spacing-gutter)] pb-8 pt-4">
          <div className="flex h-14 items-center justify-end">
            <button
              type="button"
              onClick={close}
              autoFocus
              className="inline-flex h-11 items-center gap-2 border border-line-strong px-3.5 text-sm"
            >
              <X aria-hidden className="size-4" strokeWidth={1.75} />
              {labels.close}
            </button>
          </div>
          <nav aria-label={labels.mainLabel} className="mt-6">
            <ol className="border-t border-line">
              {items.map((item, i) => (
                <li key={item.href} className="mobile-menu-item border-b border-line" style={{ animationDelay: `${80 + i * 50}ms` }}>
                  <Link href={item.href} onClick={close} className="flex items-baseline gap-4 py-5 text-[2rem] font-medium leading-none tracking-tight">
                    <span className="font-mono text-xs text-fg-subtle">{String(i + 1).padStart(2, "0")}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
          <div className="mt-auto space-y-6 pt-10">
            <Link href={cta.href} onClick={close} className="flex h-14 w-full items-center justify-center bg-signal font-medium text-white">
              {cta.label}
            </Link>
            {contacts.length > 0 && (
              <ul className="grid grid-cols-2 gap-2">
                {contacts.map((c) => (
                  <li key={c.href}>
                    <a
                      href={c.href}
                      {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="flex h-12 items-center justify-center border border-line-strong text-sm"
                    >
                      {c.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            <LanguageSwitcher current={locale} label={labels.language} variant="full" />
          </div>
        </div>
      </dialog>
    </>
  );
}

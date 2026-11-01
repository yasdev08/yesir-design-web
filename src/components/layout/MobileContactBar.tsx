import Link from "next/link";
import { localePath } from "@/i18n/config";
import { getI18n } from "@/i18n/server";
import { getChannels } from "@/lib/contact";
import { routes } from "@/lib/routes";
import { ChannelIcon } from "@/components/ui/ChannelIcon";

/** Thumb-reachable contact bar on small screens. Only configured channels render. */
export async function MobileContactBar() {
  const { locale, t } = await getI18n();
  const quick = getChannels(t).filter((ch) => ch.kind !== "email").slice(0, 2);
  return (
    <>
      <div aria-hidden className="h-[4.5rem] md:hidden" />
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink-950/95 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur md:hidden">
        <div className="flex gap-2">
          {quick.map((ch) => (
            <a
              key={ch.kind}
              href={ch.href}
              {...(ch.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="flex h-12 flex-1 items-center justify-center gap-2 border border-line-strong text-sm font-medium"
            >
              <ChannelIcon kind={ch.kind} className={ch.kind === "whatsapp" ? "text-[#25d366]" : "text-signal-soft"} />
              {ch.label}
            </a>
          ))}
          <Link href={localePath(locale, routes.quote)} className="flex h-12 flex-[1.4] items-center justify-center bg-signal text-sm font-medium text-white">
            {t.common.requestQuote}
          </Link>
        </div>
      </div>
    </>
  );
}

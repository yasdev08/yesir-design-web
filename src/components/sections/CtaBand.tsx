import { localePath } from "@/i18n/config";
import { getI18n } from "@/i18n/server";
import { getChannels } from "@/lib/contact";
import { routes } from "@/lib/routes";
import { AnchorButton, ButtonLink } from "@/components/ui/Button";
import { ChannelIcon } from "@/components/ui/ChannelIcon";
import { Eyebrow } from "@/components/ui/Section";

export async function CtaBand({ title, accent, lead }: { title?: string; accent?: string; lead?: string }) {
  const { locale, t } = await getI18n();
  const whatsapp = getChannels(t).find((ch) => ch.kind === "whatsapp");
  const accentText = accent === undefined ? t.home.cta.titleAccent : accent;
  return (
    <section className="relative overflow-hidden border-y border-line bg-ink-900" aria-labelledby="cta-title">
      <div className="bg-blueprint bg-blueprint-fade absolute inset-0" aria-hidden />
      <div aria-hidden className="glow-blob absolute -end-64 -top-64 size-[52rem] [--glow-alpha:0.2]" />
      <div className="container-site relative py-section">
        <div className="max-w-4xl" data-reveal>
          <Eyebrow>{t.home.cta.eyebrow}</Eyebrow>
          <h2 id="cta-title" className="mt-6 text-display font-medium">
            {title ?? t.home.cta.title}
            {accentText && (
              <>
                {" "}
                <em className="accent text-signal-soft">{accentText}</em>
              </>
            )}
          </h2>
          <p className="mt-8 max-w-2xl text-lead text-fg-muted">{lead ?? t.home.cta.lead}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={localePath(locale, routes.quote)} size="lg" arrow>
              {t.common.startProject}
            </ButtonLink>
            {whatsapp && (
              <AnchorButton href={whatsapp.href} target="_blank" rel="noopener noreferrer" size="lg" icon={<ChannelIcon kind="whatsapp" className="text-[#25d366]" />}>
                {t.common.whatsappLong}
              </AnchorButton>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

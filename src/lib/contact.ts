import { siteConfig, telHref, whatsappHref } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionaries/fr";

export type ChannelKind = "whatsapp" | "phone" | "email";

export interface Channel {
  kind: ChannelKind;
  label: string;
  value: string;
  href: string;
  external: boolean;
}

/** Only the channels that are actually configured are returned. */
export function getChannels(t: Dictionary): Channel[] {
  const { whatsapp, phone, email } = siteConfig.contact;
  const out: Channel[] = [];
  if (whatsapp) {
    out.push({
      kind: "whatsapp",
      label: t.common.whatsapp,
      value: phone ?? `+${whatsapp}`,
      href: whatsappHref(t.common.whatsappGreeting)!,
      external: true,
    });
  }
  if (phone) out.push({ kind: "phone", label: t.common.call, value: phone, href: telHref(phone), external: false });
  if (email) out.push({ kind: "email", label: t.common.email, value: email, href: `mailto:${email}`, external: false });
  return out;
}

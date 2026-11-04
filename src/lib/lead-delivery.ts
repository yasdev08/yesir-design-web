import "server-only";
import { createHmac } from "node:crypto";

/** Reads a variable, tolerating stray spaces or quotes pasted into the Vercel dashboard. */
const env = (name: string) => process.env[name]?.trim().replace(/^["']|["']$/g, "") || undefined;


/**
 * Lead delivery channels, all optional and configured through server-side
 * environment variables. A submission succeeds only if at least one channel
 * confirms receipt — the visitor is never told "sent" otherwise.
 */

export interface LeadRecord {
  reference: string;
  created_at: string;
  kind: "quote" | "contact";
  locale: string;
  name: string;
  business: string | null;
  phone: string;
  email: string | null;
  city: string | null;
  service: string | null;
  budget: string | null;
  contact_method: string;
  description: string;
  page: string | null;
  user_agent: string | null;
}

type Channel = { name: string; send: (lead: LeadRecord) => Promise<void> };

const TIMEOUT = 8000;

async function ensureOk(res: Response, channel: string) {
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`${channel} responded ${res.status}: ${body.slice(0, 200)}`);
  }
}

function webhookChannel(): Channel | null {
  const url = env("LEADS_WEBHOOK_URL");
  if (!url) return null;
  const secret = env("LEADS_WEBHOOK_SECRET");
  return {
    name: "webhook",
    async send(lead) {
      const body = JSON.stringify({ type: "lead.created", lead });
      const headers: Record<string, string> = { "content-type": "application/json" };
      if (secret) headers["x-yesir-signature"] = `sha256=${createHmac("sha256", secret).update(body).digest("hex")}`;
      const res = await fetch(url, { method: "POST", headers, body, signal: AbortSignal.timeout(TIMEOUT) });
      await ensureOk(res, "webhook");
    },
  };
}

function supabaseChannel(): Channel | null {
  const url = env("SUPABASE_URL");
  const key = env("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) return null;
  const table = env("SUPABASE_LEADS_TABLE") ?? "leads";
  return {
    name: "supabase",
    async send(lead) {
      const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/${table}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          apikey: key,
          authorization: `Bearer ${key}`,
          prefer: "return=minimal",
        },
        body: JSON.stringify(lead),
        signal: AbortSignal.timeout(TIMEOUT),
      });
      await ensureOk(res, "supabase");
    },
  };
}

/** Resend's shared sender works without a verified domain (it only delivers to the Resend account's own email). */
const DEFAULT_FROM = "YESIR DESIGN <onboarding@resend.dev>";

function emailChannel(): Channel | null {
  const apiKey = env("RESEND_API_KEY");
  const to = env("LEADS_EMAIL_TO");
  const from = env("LEADS_EMAIL_FROM") ?? DEFAULT_FROM;
  if (!apiKey || !to) return null;
  return {
    name: "email",
    async send(lead) {
      const label = lead.kind === "quote" ? "Demande de devis" : "Message de contact";
      const lines = [
        `${label} — ${lead.reference}`,
        "",
        `Nom : ${lead.name}`,
        lead.business && `Entreprise : ${lead.business}`,
        `Téléphone / WhatsApp : ${lead.phone}`,
        lead.email && `E-mail : ${lead.email}`,
        lead.city && `Ville : ${lead.city}`,
        lead.service && `Service : ${lead.service}`,
        lead.budget && `Budget : ${lead.budget}`,
        `Contact préféré : ${lead.contact_method}`,
        `Langue : ${lead.locale}`,
        "",
        lead.description,
        "",
        `Page : ${lead.page ?? "-"}`,
        `Reçu le : ${lead.created_at}`,
      ].filter((l): l is string => typeof l === "string");
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "content-type": "application/json", authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
          from,
          to: to.split(",").map((s) => s.trim()),
          subject: `[YESIR] ${label} — ${lead.name}${lead.business ? ` (${lead.business})` : ""}`,
          text: lines.join("\n"),
          ...(lead.email ? { reply_to: lead.email } : {}),
        }),
        signal: AbortSignal.timeout(TIMEOUT),
      });
      await ensureOk(res, "email");
    },
  };
}

/** Names of the variables that are missing for each channel — logged to explain an "unavailable" form. */
export function missingConfig(): string[] {
  const missing: string[] = [];
  const emailVars = ["RESEND_API_KEY", "LEADS_EMAIL_TO"].filter((n) => !env(n));
  if (emailVars.length < 2) missing.push(`email channel: missing ${emailVars.join(", ")}`);
  const supaVars = ["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"].filter((n) => !env(n));
  if (supaVars.length < 2) missing.push(`supabase channel: missing ${supaVars.join(", ")}`);
  if (missing.length === 0) missing.push("no channel variables found (RESEND_API_KEY + LEADS_EMAIL_TO, LEADS_WEBHOOK_URL, or SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY)");
  return missing;
}

export function configuredChannels(): Channel[] {
  return [webhookChannel(), supabaseChannel(), emailChannel()].filter((c): c is Channel => c !== null);
}

export async function deliverLead(lead: LeadRecord) {
  const channels = configuredChannels();
  if (channels.length === 0) return { delivered: 0, configured: 0 };
  const results = await Promise.allSettled(channels.map((c) => c.send(lead)));
  results.forEach((r, i) => {
    if (r.status === "rejected") console.error(`[leads] channel "${channels[i].name}" failed for ${lead.reference}:`, r.reason instanceof Error ? r.reason.message : r.reason);
  });
  return { delivered: results.filter((r) => r.status === "fulfilled").length, configured: channels.length };
}

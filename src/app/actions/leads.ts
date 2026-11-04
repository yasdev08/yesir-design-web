"use server";

import { randomUUID } from "node:crypto";
import { headers } from "next/headers";
import { hasLocale } from "@/i18n/config";
import { deliverLead, missingConfig, type LeadRecord } from "@/lib/lead-delivery";
import { formFields, normalizePhone, OTHER_SERVICE, validateLead, type LeadInput, type LeadResult } from "@/lib/leads";

/* ------------------------------------------------------------------------
 * Basic in-memory rate limiting (per server instance). For multi-instance or
 * serverless deployments, put a shared limiter (e.g. Upstash, Supabase) or a
 * WAF rule in front of this endpoint.
 * ---------------------------------------------------------------------- */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (v.every((t) => now - t > WINDOW_MS)) hits.delete(k);
  return recent.length > MAX_PER_WINDOW;
}

const MIN_FILL_MS = 2500;

function str(formData: FormData, key: string, max = 4000) {
  const value = formData.get(key);
  return typeof value === "string" ? value.slice(0, max) : "";
}

export async function submitLead(_prev: LeadResult, formData: FormData): Promise<LeadResult> {
  // 1. Anti-spam: honeypot + minimal fill time.
  if (str(formData, "website")) return { status: "error", code: "spam" };
  // The fill-time marker is set by the browser; without JavaScript it is empty and
  // the honeypot + rate limit remain the protection.
  const startedRaw = str(formData, "startedAt", 20);
  if (startedRaw) {
    const startedAt = Number(startedRaw);
    if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS) return { status: "error", code: "spam" };
  }

  // 2. Rate limit per client IP.
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) return { status: "error", code: "rateLimit" };

  // 3. Authoritative validation.
  const kind = str(formData, "kind") === "quote" ? "quote" : "contact";
  const input: LeadInput = {
    kind,
    name: str(formData, "name"),
    business: str(formData, "business"),
    phone: str(formData, "phone"),
    email: str(formData, "email"),
    city: str(formData, "city"),
    service: str(formData, "service"),
    budget: str(formData, "budget"),
    contactMethod: str(formData, "contactMethod"),
    description: str(formData, "description"),
  };
  const errors = validateLead(input);
  if (Object.keys(errors).length > 0) return { status: "invalid", errors };

  // 4. Build a clean record (only fields of the submitted form).
  const allowed = new Set(formFields[kind]);
  const pick = (field: keyof LeadInput) => (allowed.has(field as never) ? input[field].trim() || null : null);
  const localeRaw = str(formData, "locale", 5);
  const reference = `YD-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${randomUUID().slice(0, 6).toUpperCase()}`;
  const lead: LeadRecord = {
    reference,
    created_at: new Date().toISOString(),
    kind,
    locale: hasLocale(localeRaw) ? localeRaw : "fr",
    name: input.name.trim(),
    business: pick("business"),
    phone: normalizePhone(input.phone)!,
    email: input.email.trim() || null,
    city: pick("city"),
    service: kind === "quote" ? (input.service === OTHER_SERVICE ? "autre" : input.service) : null,
    budget: pick("budget"),
    contact_method: input.contactMethod,
    description: input.description.trim(),
    page: h.get("referer")?.slice(0, 300) ?? null,
    user_agent: h.get("user-agent")?.slice(0, 300) ?? null,
  };

  // 5. Deliver. Success is reported only if a channel confirmed receipt.
  try {
    const { delivered, configured } = await deliverLead(lead);
    if (configured === 0) {
      console.error(`[leads] No delivery channel configured — ${missingConfig().join("; ")}. Add them in Vercel (Production) and redeploy.`);
      return { status: "error", code: "unavailable" };
    }
    if (delivered === 0) return { status: "error", code: "generic" };
    return { status: "success", reference };
  } catch (error) {
    console.error("[leads] Unexpected delivery error:", error instanceof Error ? error.message : error);
    return { status: "error", code: "generic" };
  }
}

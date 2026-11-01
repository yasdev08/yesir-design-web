/**
 * Lead validation shared by the browser (instant feedback) and the server
 * action (authoritative). No dependency, no secrets: safe to import anywhere.
 */
import { serviceSlugs } from "@/content/catalog";

export const budgetIds = ["lt-50k", "50-150k", "150-400k", "400k-1m", "gt-1m", "unknown"] as const;
export const contactMethodIds = ["whatsapp", "phone", "email"] as const;
export const OTHER_SERVICE = "autre";

export type LeadKind = "quote" | "contact";
export type FieldError = "required" | "tooShort" | "tooLong" | "phone" | "email" | "emailRequired" | "choice";

export interface LeadInput {
  kind: LeadKind;
  name: string;
  business: string;
  phone: string;
  email: string;
  city: string;
  service: string;
  budget: string;
  contactMethod: string;
  description: string;
}

export type LeadField = Exclude<keyof LeadInput, "kind">;
export type LeadErrors = Partial<Record<LeadField, FieldError>>;

export const leadFields: LeadField[] = ["name", "business", "phone", "email", "city", "service", "budget", "contactMethod", "description"];

/** Fields that the given form actually shows. */
export const formFields: Record<LeadKind, LeadField[]> = {
  quote: leadFields,
  contact: ["name", "phone", "email", "contactMethod", "description"],
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Algerian numbers (05/06/07 mobiles, landlines) or any international +XXXXXXXX number. */
export function normalizePhone(raw: string) {
  const compact = raw.replace(/[\s.\-()]/g, "");
  const dz = compact.match(/^(?:\+213|00213|0)([5-7]\d{8}|[2-4]\d{7,8})$/);
  if (dz) return `+213${dz[1]}`;
  if (/^\+\d{8,15}$/.test(compact)) return compact;
  if (/^00\d{8,15}$/.test(compact)) return `+${compact.slice(2)}`;
  return null;
}

function length(value: string, min: number, max: number, required: boolean): FieldError | undefined {
  const v = value.trim();
  if (!v) return required ? "required" : undefined;
  if (v.length < min) return "tooShort";
  if (v.length > max) return "tooLong";
  return undefined;
}

export function validateLead(input: LeadInput): LeadErrors {
  const quote = input.kind === "quote";
  const errors: LeadErrors = {};
  const set = (field: LeadField, error: FieldError | undefined) => {
    if (error) errors[field] = error;
  };

  set("name", length(input.name, 2, 80, true));
  if (!input.phone.trim()) errors.phone = "required";
  else if (!normalizePhone(input.phone)) errors.phone = "phone";

  const email = input.email.trim();
  if (email && (!EMAIL_RE.test(email) || email.length > 160)) errors.email = "email";
  if (!email && input.contactMethod === "email") errors.email = "emailRequired";

  if (!(contactMethodIds as readonly string[]).includes(input.contactMethod)) errors.contactMethod = "choice";

  if (quote) {
    set("business", length(input.business, 2, 120, true));
    set("city", length(input.city, 2, 80, true));
    const services: readonly string[] = [...serviceSlugs, OTHER_SERVICE];
    if (!services.includes(input.service)) errors.service = "choice";
    if (!(budgetIds as readonly string[]).includes(input.budget)) errors.budget = "choice";
    set("description", length(input.description, 20, 3000, true));
  } else {
    set("description", length(input.description, 10, 3000, true));
  }
  return errors;
}

export function emptyLead(kind: LeadKind): LeadInput {
  return { kind, name: "", business: "", phone: "", email: "", city: "", service: "", budget: "", contactMethod: "whatsapp", description: "" };
}

export type LeadResult =
  | { status: "idle" }
  | { status: "invalid"; errors: LeadErrors }
  | { status: "success"; reference: string }
  | { status: "error"; code: "unavailable" | "generic" | "rateLimit" | "spam" };

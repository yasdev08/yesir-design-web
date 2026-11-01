"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState, type ReactNode } from "react";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { submitLead } from "@/app/actions/leads";
import { whatsappHref } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionaries/fr";
import type { Locale } from "@/i18n/config";
import { budgetIds, contactMethodIds, emptyLead, formFields, OTHER_SERVICE, validateLead, type FieldError, type LeadErrors, type LeadField, type LeadInput, type LeadKind, type LeadResult } from "@/lib/leads";
import { cn } from "@/lib/cn";
import { Arrow, buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/ChannelIcon";

type FormDict = Dictionary["form"];

export interface ServiceGroup {
  label: string;
  options: { value: string; label: string }[];
}

interface Props {
  kind: LeadKind;
  locale: Locale;
  t: FormDict;
  serviceGroups?: ServiceGroup[];
  initialService?: string;
  privacy: { text: string; link: string; href: string };
}

const errorKey: Record<FieldError, keyof FormDict["errors"]> = {
  required: "required",
  tooShort: "tooShort",
  tooLong: "tooLong",
  phone: "phone",
  email: "email",
  emailRequired: "emailRequired",
  choice: "choice",
};

export function LeadForm({ kind, locale, t, serviceGroups = [], initialService = "", privacy }: Props) {
  const [result, formAction, pending] = useActionState<LeadResult, FormData>(submitLead, { status: "idle" });
  const [values, setValues] = useState<LeadInput>(() => ({ ...emptyLead(kind), service: initialService }));
  const [clientErrors, setClientErrors] = useState<LeadErrors>({});
  const [touched, setTouched] = useState<Partial<Record<LeadField, boolean>>>({});
  const startedRef = useRef<HTMLInputElement>(null);
  const [dismissed, setDismissed] = useState<LeadResult | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const serverErrors = result.status === "invalid" && dismissed !== result ? result.errors : {};
  const errors: LeadErrors = { ...serverErrors, ...clientErrors };
  const fields = formFields[kind];
  const showSuccess = result.status === "success" && dismissed !== result;
  const showError = result.status === "error" && dismissed !== result;

  // Fill-time marker for the anti-spam check (set on the client only, avoids hydration mismatch).
  useEffect(() => {
    if (startedRef.current && !startedRef.current.value) startedRef.current.value = String(Date.now());
  }, []);

  // Move focus to the result so screen-reader and keyboard users notice it.
  useEffect(() => {
    if (result.status === "success" || result.status === "error") statusRef.current?.focus();
    if (result.status === "invalid") {
      const first = fields.find((f) => result.errors[f]);
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
    }
  }, [result, fields]);

  const update = (field: LeadField, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (touched[field] || errors[field]) {
      const all = validateLead(next);
      setClientErrors((prev) => {
        const copy = { ...prev };
        if (all[field]) copy[field] = all[field];
        else delete copy[field];
        if (field === "contactMethod") {
          if (all.email) copy.email = all.email;
          else delete copy.email;
        }
        return copy;
      });
    }
  };

  const blur = (field: LeadField) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const all = validateLead(values);
    setClientErrors((prev) => {
      const copy = { ...prev };
      if (all[field] && values[field].trim() !== "") copy[field] = all[field];
      else if (!all[field]) delete copy[field];
      return copy;
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const all = validateLead(values);
    const relevant = Object.fromEntries(Object.entries(all).filter(([k]) => fields.includes(k as LeadField))) as LeadErrors;
    setClientErrors(relevant);
    setTouched(Object.fromEntries(fields.map((f) => [f, true])));
    if (Object.keys(relevant).length > 0) {
      e.preventDefault();
      const first = fields.find((f) => relevant[f]);
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
    }
  };

  const reset = () => {
    setDismissed(result);
    setValues({ ...emptyLead(kind), service: initialService });
    setClientErrors({});
    setTouched({});
  };

  if (showSuccess) {
    const serviceLabel = serviceGroups.flatMap((g) => g.options).find((o) => o.value === values.service)?.label;
    const summary = [t.whatsappSummary, result.reference && `(${result.reference})`].filter(Boolean).join(" ");
    const details = [values.name, values.business, serviceLabel, values.city].filter(Boolean).join(" — ");
    const wa = whatsappHref(details ? `${summary}\n${details}` : summary);
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="border border-success/40 bg-ink-900 p-8 outline-none md:p-10">
        <CheckCircle2 aria-hidden className="size-9 text-success" strokeWidth={1.5} />
        <h2 className="mt-6 text-h3 font-medium">{t.result.successTitle}</h2>
        <p className="mt-3 max-w-xl text-fg-muted">{kind === "quote" ? t.result.successQuote : t.result.successContact}</p>
        <p className="mt-4 font-mono text-xs text-fg-subtle" dir="ltr">REF. {result.reference}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {wa && (
            <a href={wa} target="_blank" rel="noopener noreferrer" className={buttonClasses("secondary", "md")}>
              <WhatsAppIcon className="text-[#25d366]" />
              {t.result.continueWhatsapp}
            </a>
          )}
          <button type="button" onClick={reset} className={buttonClasses("ghost", "md")}>
            {t.result.sendAnother}
          </button>
        </div>
      </div>
    );
  }

  const errorMessage =
    showError &&
    { unavailable: t.result.errorUnavailable, generic: t.result.errorGeneric, rateLimit: t.result.errorRateLimit, spam: t.result.errorSpam }[result.code];

  const fieldProps = (field: LeadField) => ({
    id: `${kind}-${field}`,
    name: field,
    value: values[field],
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `${kind}-${field}-error` : undefined,
    onBlur: () => blur(field),
  });

  const hasErrors = Object.keys(errors).some((k) => fields.includes(k as LeadField));

  return (
    <form ref={formRef} action={formAction} onSubmit={onSubmit} noValidate className="space-y-6" aria-busy={pending}>
      <input type="hidden" name="kind" value={kind} />
      <input type="hidden" name="locale" value={locale} />
      <input ref={startedRef} type="hidden" name="startedAt" defaultValue="" />
      {/* Honeypot: hidden from people, tempting for bots */}
      <div aria-hidden className="absolute -start-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${kind}-website`}>{t.honeypot}</label>
        <input id={`${kind}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Field label={t.name} required field="name" kind={kind} error={errors.name} t={t}>
          <input {...fieldProps("name")} type="text" autoComplete="name" required maxLength={80} placeholder={t.namePlaceholder} className="field-control" onChange={(e) => update("name", e.target.value)} />
        </Field>
        {kind === "quote" && (
          <Field label={t.business} required field="business" kind={kind} error={errors.business} t={t}>
            <input {...fieldProps("business")} type="text" autoComplete="organization" required maxLength={120} placeholder={t.businessPlaceholder} className="field-control" onChange={(e) => update("business", e.target.value)} />
          </Field>
        )}
        <Field label={t.phone} required field="phone" kind={kind} error={errors.phone} t={t}>
          <input {...fieldProps("phone")} type="tel" inputMode="tel" autoComplete="tel" required dir="ltr" placeholder={t.phonePlaceholder} className="field-control text-start" onChange={(e) => update("phone", e.target.value)} />
        </Field>
        <Field label={t.email} field="email" kind={kind} error={errors.email} t={t} optional={values.contactMethod !== "email"}>
          <input {...fieldProps("email")} type="email" inputMode="email" autoComplete="email" dir="ltr" maxLength={160} placeholder={t.emailPlaceholder} className="field-control text-start" onChange={(e) => update("email", e.target.value)} />
        </Field>
        {kind === "quote" && (
          <>
            <Field label={t.city} required field="city" kind={kind} error={errors.city} t={t}>
              <input {...fieldProps("city")} type="text" autoComplete="address-level2" required maxLength={80} list={`${kind}-cities`} placeholder={t.cityPlaceholder} className="field-control" onChange={(e) => update("city", e.target.value)} />
              <datalist id={`${kind}-cities`}>
                {["Mascara", "Oran", "Alger", "Sidi Bel Abbès", "Mostaganem", "Tlemcen", "Relizane", "Saïda", "Tiaret", "Chlef", "Blida", "Constantine", "Sétif", "Annaba", "Béjaïa", "Tizi Ouzou"].map((city) => (
                  <option key={city} value={city} />
                ))}
              </datalist>
            </Field>
            <Field label={t.service} required field="service" kind={kind} error={errors.service} t={t}>
              <select {...fieldProps("service")} required className="field-control" onChange={(e) => update("service", e.target.value)}>
                <option value="" disabled>{t.servicePlaceholder}</option>
                {serviceGroups.map((group) => (
                  <optgroup key={group.label} label={group.label}>
                    {group.options.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </optgroup>
                ))}
                <option value={OTHER_SERVICE}>{t.serviceOther}</option>
              </select>
            </Field>
            <Field label={t.budget} required field="budget" kind={kind} error={errors.budget} t={t} className="md:col-span-2">
              <select {...fieldProps("budget")} required className="field-control" onChange={(e) => update("budget", e.target.value)}>
                <option value="" disabled>{t.budgetPlaceholder}</option>
                {budgetIds.map((id) => (
                  <option key={id} value={id}>{t.budgets[id]}</option>
                ))}
              </select>
            </Field>
          </>
        )}
      </div>

      <fieldset aria-describedby={errors.contactMethod ? `${kind}-contactMethod-error` : undefined}>
        <legend className="text-sm font-medium text-fg">
          {t.contactMethod} <span className="text-signal-soft" aria-hidden>*</span>
        </legend>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {contactMethodIds.map((method) => (
            <label
              key={method}
              className={cn(
                "flex h-12 cursor-pointer items-center justify-center gap-2 border px-2 text-center text-sm transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-signal-glow",
                values.contactMethod === method ? "border-signal bg-signal/10 text-fg" : "border-line-strong text-fg-muted hover:border-signal-soft",
              )}
            >
              <input type="radio" name="contactMethod" value={method} checked={values.contactMethod === method} onChange={(e) => update("contactMethod", e.target.value)} className="sr-only" />
              {t.contactMethods[method]}
            </label>
          ))}
        </div>
        {errors.contactMethod && <ErrorText id={`${kind}-contactMethod-error`}>{t.errors[errorKey[errors.contactMethod]]}</ErrorText>}
      </fieldset>

      <Field label={kind === "quote" ? t.description : t.message} required field="description" kind={kind} error={errors.description} t={t}>
        <textarea
          {...fieldProps("description")}
          required
          rows={6}
          maxLength={3000}
          placeholder={kind === "quote" ? t.descriptionPlaceholder : t.messagePlaceholder}
          className="field-control min-h-40 resize-y"
          onChange={(e) => update("description", e.target.value)}
        />
      </Field>

      <div ref={statusRef} tabIndex={-1} aria-live="assertive" className="outline-none">
        {errorMessage && (
          <div role="alert" className="flex gap-3 border border-danger/50 bg-danger/10 p-4 text-sm">
            <AlertCircle aria-hidden className="mt-0.5 size-5 shrink-0 text-danger" strokeWidth={1.75} />
            <div>
              <p className="font-medium text-fg">{t.result.errorTitle}</p>
              <p className="mt-1 text-fg-muted">{errorMessage}</p>
            </div>
          </div>
        )}
        {!errorMessage && hasErrors && (
          <p role="alert" className="text-sm text-danger">{t.errors.summary}</p>
        )}
      </div>

      <div className="flex flex-col-reverse gap-5 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-fg-subtle">
          {privacy.text}{" "}
          <Link href={privacy.href} className="link-underline text-fg-muted hover:text-fg">{privacy.link}</Link>
        </p>
        <button type="submit" disabled={pending} className={buttonClasses("primary", "lg", "w-full sm:w-auto")}>
          {pending ? <Loader2 aria-hidden className="size-4 animate-spin" /> : null}
          <span>{pending ? t.sending : kind === "quote" ? t.submitQuote : t.submitContact}</span>
          {!pending && <Arrow />}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  optional,
  field,
  kind,
  error,
  t,
  children,
  className,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  field: LeadField;
  kind: LeadKind;
  error?: FieldError;
  t: FormDict;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={`${kind}-${field}`} className="mb-2 flex items-baseline justify-between gap-3 text-sm font-medium text-fg">
        <span>
          {label} {required && <span className="text-signal-soft" aria-hidden>*</span>}
        </span>
        {optional && <span className="text-xs font-normal text-fg-subtle">{t.optional}</span>}
        {required && <span className="sr-only">({t.required})</span>}
      </label>
      {children}
      {error && <ErrorText id={`${kind}-${field}-error`}>{t.errors[errorKey[error]]}</ErrorText>}
    </div>
  );
}

function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-2 flex items-center gap-2 text-sm text-danger">
      <AlertCircle aria-hidden className="size-4 shrink-0" strokeWidth={1.75} />
      {children}
    </p>
  );
}

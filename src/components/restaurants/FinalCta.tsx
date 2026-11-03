import { Clock, MapPin, Navigation } from "lucide-react";
import { business } from "@/content/business";
import type { RestaurantsCopy } from "@/content/restaurants-copy";
import type { Locale } from "@/i18n/config";
import { CallLink, WaLink } from "./ContactLinks";

export function FinalCta({ copy, locale }: { copy: RestaurantsCopy; locale: Locale }) {
  const f = copy.final;
  const { address, hours, phone } = business;
  return (
    <section aria-labelledby="final-title" className="relative overflow-hidden">
      <div aria-hidden className="glow-blob absolute -bottom-64 start-1/2 size-[44rem] -translate-x-1/2 [--glow-alpha:0.25] rtl:translate-x-1/2" />
      <div className="relative mx-auto max-w-3xl px-4 py-16 text-center sm:py-24">
        <h2 id="final-title" className="text-4xl font-semibold tracking-tight sm:text-5xl rtl:tracking-normal">{f.title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-lp-muted">{f.sub}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <WaLink message={copy.messages.base} track="final" className="text-lg">
            {f.cta}
          </WaLink>
          <CallLink track="final">
            {f.call} · <span dir="ltr">{phone.display}</span>
          </CallLink>
        </div>
        <dl className="mx-auto mt-12 grid max-w-2xl gap-6 text-start sm:grid-cols-3">
          <div>
            <dt className="flex items-center gap-2 text-sm text-lp-muted"><MapPin aria-hidden className="size-4" />{f.office}</dt>
            <dd className="mt-1">
              <address className="not-italic">
                {address.street}, {address.district}, {address.city}
              </address>
              <a href={address.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex min-h-11 items-center gap-1.5 text-lp-sky underline-offset-4 hover:underline">
                <Navigation aria-hidden className="size-4" />
                {f.maps}
              </a>
            </dd>
          </div>
          <div>
            <dt className="flex items-center gap-2 text-sm text-lp-muted"><Clock aria-hidden className="size-4" />{f.hours}</dt>
            <dd className="mt-1">{hours.label[locale]}</dd>
          </div>
          <div>
            <dt className="text-sm text-lp-muted">{f.area}</dt>
            <dd className="mt-1">{business.serviceArea.label[locale]}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

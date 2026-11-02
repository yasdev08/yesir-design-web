import type { Metadata } from "next";
import { PlaqueRenderer } from "@/components/plaque/PlaqueRenderer";
import { PlaqueMockup } from "@/components/plaque/PlaqueMockup";
import { getProfession } from "@/config/professions";
import { sizes, type SizeId } from "@/config/sizes";
import { templates } from "@/config/templates";
import { plaqueFonts } from "@/lib/fonts";
import type { PlaqueContent } from "@/lib/plaque/types";

export const metadata: Metadata = {
  title: "Aperçu des modèles (interne)",
  robots: { index: false, follow: false },
};

const cardio = getProfession("cardiologue");

const sample: PlaqueContent = {
  name: "Dr. Nom Prénom",
  titleFr: cardio.titleFr,
  titleAr: cardio.titleAr,
  specialty: "Échocardiographie — ECG — Holter tensionnel",
  hours: {
    dayFrom: "sam",
    dayTo: "jeu",
    ranges: [
      { from: "08:00", to: "12:00" },
      { from: "13:00", to: "17:00" },
    ],
  },
  phone: "0550123456",
  address: "1er étage, Cité des Oliviers",
  icon: cardio.icon,
  accent: cardio.accent,
};

/** Deliberately long content: every zone must shrink or wrap, never overflow. */
const stress: PlaqueContent = {
  ...sample,
  name: "Pr. Nom-Composé Prénom Deuxième-Prénom",
  titleFr: "Professeur en cardiologie interventionnelle et rythmologie",
  specialty: "Ancien interne des hôpitaux — Échocardiographie transœsophagienne — Épreuve d'effort — Holter",
  address: "Bâtiment B, 3e étage, porte droite, en face de la polyclinique centrale",
};

/** Internal QA page: every template for one profession, in every size. */
export default function ApercuPage() {
  return (
    <main className="mx-auto max-w-6xl space-y-16 px-4 py-10">
      <h1 className="text-2xl font-bold">Cardiologue — 4 modèles</h1>
      {sizes.map((size) => (
        <section key={size.id} className="space-y-6">
          <h2 className="text-lg font-semibold">{size.label}</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {templates.map((t) => (
              <figure key={t.id} id={`${t.id}-${size.id}`} className="space-y-2">
                <PlaqueMockup finish={t.id === "moderne" ? "plexiglas" : "pvc"} className="aspect-[4/3] p-[9%]">
                  <PlaqueRenderer content={sample} template={t.id} size={size.id as SizeId} fonts={plaqueFonts} standoffs={t.id === "moderne"} className="block h-auto w-full" />
                </PlaqueMockup>
                <figcaption className="text-sm text-muted">{t.name}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      ))}
      <section className="space-y-6">
        <h2 className="text-lg font-semibold">Test : textes très longs</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {templates.map((t) => (
            <figure key={t.id} id={`${t.id}-stress`} className="border border-line">
              <PlaqueRenderer content={stress} template={t.id} size="30x40" fonts={plaqueFonts} className="block h-auto w-full" />
            </figure>
          ))}
        </div>
      </section>
      <section className="space-y-6">
        <h2 className="text-lg font-semibold">Plaque seule (fichier de production)</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {templates.map((t) => (
            <figure key={t.id} id={`${t.id}-plain`} className="border border-line">
              <PlaqueRenderer content={sample} template={t.id} size="30x40" fonts={plaqueFonts} className="block h-auto w-full" />
            </figure>
          ))}
        </div>
      </section>
    </main>
  );
}

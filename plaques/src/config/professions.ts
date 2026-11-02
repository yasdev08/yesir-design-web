import type { IconId } from "@/components/plaque/icons";

/**
 * Professions offered in the configurator.
 * To add one: append an entry here (pick an existing icon id, or add a new
 * pictogram in src/components/plaque/icons.tsx).
 */
export interface Profession {
  id: string;
  /** Label shown in the configurator. */
  label: { fr: string; ar: string };
  /** Default titles printed on the plaque (editable by the customer). */
  titleFr: string;
  titleAr: string;
  /** Prefix suggested for the name field. */
  namePrefix: string;
  icon: IconId;
  /** Accent colour used by every template. */
  accent: string;
  /** Example specialty line, shown as a placeholder. */
  specialtyHint: string;
  group: "sante" | "justice" | "autre";
}

export const NAVY = "#0B1F3A";

export const professions: Profession[] = [
  {
    id: "generaliste",
    label: { fr: "Médecin généraliste", ar: "طبيب عام" },
    titleFr: "Médecin Généraliste",
    titleAr: "طبيب عام",
    namePrefix: "Dr.",
    icon: "stethoscope",
    accent: "#0E7C7B",
    specialtyHint: "Consultations — Certificats médicaux",
    group: "sante",
  },
  {
    id: "cardiologue",
    label: { fr: "Cardiologue", ar: "طبيب القلب" },
    titleFr: "Médecin Cardiologue",
    titleAr: "طبيب أخصائي في أمراض القلب والشرايين",
    namePrefix: "Dr.",
    icon: "heart",
    accent: "#C1272D",
    specialtyHint: "Échocardiographie — ECG — Holter",
    group: "sante",
  },
  {
    id: "dentiste",
    label: { fr: "Dentiste", ar: "طبيب الأسنان" },
    titleFr: "Chirurgien-Dentiste",
    titleAr: "جراح أسنان",
    namePrefix: "Dr.",
    icon: "tooth",
    accent: "#1E6FD9",
    specialtyHint: "Soins — Prothèses — Orthodontie",
    group: "sante",
  },
  {
    id: "pediatre",
    label: { fr: "Pédiatre", ar: "طبيب الأطفال" },
    titleFr: "Médecin Pédiatre",
    titleAr: "طبيب أخصائي في طب الأطفال",
    namePrefix: "Dr.",
    icon: "child",
    accent: "#E07A1F",
    specialtyHint: "Nouveau-nés — Enfants — Vaccination",
    group: "sante",
  },
  {
    id: "gynecologue",
    label: { fr: "Gynécologue", ar: "طبيب النساء والتوليد" },
    titleFr: "Gynécologue-Obstétricien",
    titleAr: "طبيب أخصائي في أمراض النساء والتوليد",
    namePrefix: "Dr.",
    icon: "venus",
    accent: "#B0306A",
    specialtyHint: "Suivi de grossesse — Échographie",
    group: "sante",
  },
  {
    id: "ophtalmologue",
    label: { fr: "Ophtalmologue", ar: "طبيب العيون" },
    titleFr: "Médecin Ophtalmologue",
    titleAr: "طبيب أخصائي في طب وجراحة العيون",
    namePrefix: "Dr.",
    icon: "eye",
    accent: "#127A9E",
    specialtyHint: "Chirurgie de la cataracte — Laser",
    group: "sante",
  },
  {
    id: "avocat",
    label: { fr: "Avocat", ar: "محامي" },
    titleFr: "Avocat à la Cour",
    titleAr: "محامي لدى المجلس",
    namePrefix: "Maître",
    icon: "scales",
    accent: "#7A1F2B",
    specialtyHint: "Droit civil — Droit des affaires",
    group: "justice",
  },
  {
    id: "notaire",
    label: { fr: "Notaire", ar: "موثق" },
    titleFr: "Office Notarial",
    titleAr: "مكتب التوثيق",
    namePrefix: "Maître",
    icon: "quill",
    accent: "#7A1F2B",
    specialtyHint: "Actes immobiliers — Successions",
    group: "justice",
  },
  {
    id: "huissier",
    label: { fr: "Huissier de justice", ar: "محضر قضائي" },
    titleFr: "Huissier de Justice",
    titleAr: "محضر قضائي",
    namePrefix: "Maître",
    icon: "gavel",
    accent: "#7A1F2B",
    specialtyHint: "Constats — Significations",
    group: "justice",
  },
  {
    id: "pharmacien",
    label: { fr: "Pharmacien", ar: "صيدلي" },
    titleFr: "Pharmacie",
    titleAr: "صيدلية",
    namePrefix: "Dr.",
    icon: "pharmacy",
    accent: "#0F8A4B",
    specialtyHint: "Parapharmacie — Orthopédie",
    group: "sante",
  },
  {
    id: "autre",
    label: { fr: "Autre profession", ar: "مهنة أخرى" },
    titleFr: "",
    titleAr: "",
    namePrefix: "",
    icon: "badge",
    accent: NAVY,
    specialtyHint: "Votre qualification",
    group: "autre",
  },
];

export const defaultProfessionId = "generaliste";

export function getProfession(id: string): Profession {
  return professions.find((p) => p.id === id) ?? professions[professions.length - 1];
}

export interface LegalSection {
  title: string;
  paragraphs: string[];
  list?: string[];
}

export interface LegalCopy {
  /** ISO date of the last update, displayed on the page. */
  updated: string;
  privacy: { intro: string; sections: LegalSection[] };
  terms: { intro: string; sections: LegalSection[] };
}

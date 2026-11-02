import type { Metadata } from "next";
import { cairo, montserrat } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Plaques professionnelles personnalisées — YESIR DESIGN",
  description: "Plaques professionnelles pour médecins, dentistes, avocats, notaires et pharmaciens, livrées dans les 58 wilayas.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" dir="ltr" className={`${montserrat.variable} ${cairo.variable}`}>
      <body>{children}</body>
    </html>
  );
}

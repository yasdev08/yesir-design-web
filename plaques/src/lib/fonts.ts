import { Cairo, Montserrat } from "next/font/google";

export const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

export const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cairo",
  display: "swap",
});

/** Font stacks handed to PlaqueRenderer (next/font self-hosts and renames the families). */
export const plaqueFonts = {
  latin: montserrat.style.fontFamily,
  arabic: cairo.style.fontFamily,
};

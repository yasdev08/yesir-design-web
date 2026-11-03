import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileContactBar } from "@/components/layout/MobileContactBar";

/** Chrome for the main website (full navigation, footer, mobile contact bar). */
export default function SiteLayout({ children }: LayoutProps<"/[locale]">) {
  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <MobileContactBar />
    </>
  );
}

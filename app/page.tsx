import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { About } from "@/components/About";
import { MenuSection } from "@/components/MenuSection";
import { PromoSection } from "@/components/PromoSection";
import { LocationSection } from "@/components/LocationSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { BackToTop } from "@/components/BackToTop";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <MenuSection />
        <PromoSection />
        <LocationSection />
        <ContactSection />
      </main>
      <Footer />
      <CartDrawer />
      <BackToTop />
      <ScrollReveal />
    </>
  );
}

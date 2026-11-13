import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Hero } from "@/components/landing/Hero";
import { Edition } from "@/components/landing/Edition";
import { PrintExperience } from "@/components/landing/PrintExperience";
import { Readers } from "@/components/landing/Readers";
import { Credibility } from "@/components/landing/Credibility";
import { Offer } from "@/components/landing/Offer";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Faq } from "@/components/landing/Faq";
import { FinalCta } from "@/components/landing/FinalCta";
import { MobileBar } from "@/components/landing/MobileBar";

const TITLE = "Assinatura Pesquisa FAPESP impressa · R$ 250/ano";
const DESC = "Receba em casa a revista Pesquisa FAPESP impressa: 12 edições por R$ 250 ao ano. Jornalismo científico editado pela FAPESP desde 1999.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const finalRef = useRef<HTMLElement>(null);
  const [barVisible, setBarVisible] = useState(false);
  const [finalVisible, setFinalVisible] = useState(false);
  useEffect(() => {
    const on = () => setBarVisible(window.scrollY > window.innerHeight * 0.8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    const io = new IntersectionObserver(([e]) => setFinalVisible(e.isIntersecting), { threshold: 0 });
    if (finalRef.current) io.observe(finalRef.current);
    return () => { window.removeEventListener("scroll", on); io.disconnect(); };
  }, []);

  return (
    <>
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">Pular para o conteúdo</a>
      <SiteHeader />
      <main id="conteudo">
        <Hero />
        <Edition />
        <PrintExperience />
        <Readers />
        <Credibility />
        <Offer />
        <HowItWorks />
        <Faq />
        <FinalCta ref={finalRef} />
      </main>
      <SiteFooter />
      <MobileBar visible={barVisible && !finalVisible} />
    </>
  );
}

import { forwardRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magazine } from "@/components/site/Magazine";
import { Reveal } from "@/components/site/Reveal";
import { COVERS, SUPPORT } from "@/lib/offer";

export const FinalCta = forwardRef<HTMLElement>(function FinalCta(_, ref) {
  return (
    <section ref={ref} aria-labelledby="final-title" className="relative overflow-hidden bg-night text-night-foreground">
      <div className="container-ed grid items-center gap-14 py-24 md:py-32 lg:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <h2 id="final-title" className="display text-[clamp(2.6rem,6vw,5.4rem)]">A ciência brasileira, edição após edição, <em className="text-signal">na sua casa</em></h2>
          <p className="mt-8 text-xl text-night-muted">12 edições impressas da Pesquisa FAPESP por R$ 250 ao ano.</p>
          <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
            <Button asChild variant="signal" size="xl" className="hover:bg-night-foreground hover:text-night">
              <Link to="/assinar">Assinar por R$ 250/ano <ArrowRight className="transition-transform duration-500 group-hover:translate-x-1" /></Link>
            </Button>
            <a href={SUPPORT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="link-ed text-sm text-night-foreground/85">Ainda com dúvidas? Fale no WhatsApp.</a>
          </div>
          <p className="mt-6 text-sm text-night-muted">Pix, boleto ou cartão. Frete e regras de renovação apresentados no checkout.</p>
        </Reveal>
        <Reveal delay={150} className="relative mx-auto hidden w-full max-w-xs [perspective:1400px] lg:block">
          <div className="absolute top-8 -left-16 w-[80%] rotate-[-8deg] opacity-60"><Magazine src={COVERS.e366.src} alt={COVERS.e366.alt} /></div>
          <Magazine src={COVERS.e367.src} alt={COVERS.e367.alt} className="relative [transform:rotateY(-12deg)]" />
        </Reveal>
      </div>
    </section>
  );
});

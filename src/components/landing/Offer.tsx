import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magazine } from "@/components/site/Magazine";
import { Reveal } from "@/components/site/Reveal";
import { COVERS, SUPPORT } from "@/lib/offer";

const PERKS = ["12 edições impressas", "Entrega no endereço que você escolher", "Experiência de leitura em papel", "Acesso a uma seleção editorial organizada", "Pagamento por Pix, boleto ou cartão na simulação"];

export function Offer() {
  return (
    <section id="oferta" aria-labelledby="oferta-title" className="scroll-mt-20 py-24 md:py-32">
      <div className="container-ed grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="relative mx-auto w-full max-w-sm [perspective:1400px] lg:max-w-md">
          <div aria-hidden className="absolute inset-[8%] -z-10 rounded-full bg-signal/10 blur-3xl" />
          <Magazine src={COVERS.e367.src} alt={COVERS.e367.alt} className="[transform:rotateY(10deg)_rotateZ(-2deg)] transition-transform duration-1000 hover:[transform:rotateY(0deg)]" />
        </Reveal>
        <Reveal delay={120}>
          <div className="relative rounded-sm border border-ink/15 bg-card p-7 shadow-soft sm:p-12">
            <span className="absolute top-0 left-7 h-1 w-16 bg-signal sm:left-12" />
            <p className="kicker text-signal">Assinatura</p>
            <h2 id="oferta-title" className="mt-4 font-serif text-[clamp(2rem,3.6vw,3rem)] leading-tight">Assinatura anual da edição impressa</h2>
            <p className="mt-3 text-ink-soft">Doze edições da Pesquisa FAPESP, entregues no seu endereço.</p>
            <div className="mt-8 flex flex-wrap items-end gap-x-6 gap-y-3 border-y border-ink/10 py-7">
              <p className="font-serif text-7xl leading-none tracking-tight">R$ 250<span className="ml-1 font-sans text-lg text-muted-foreground">/ano</span></p>
              <div className="pb-1 text-sm">
                <p>Equivale a <strong>R$ 20,83</strong> por edição.</p>
                <p className="text-muted-foreground">Na banca, cada edição custa R$ 30.</p>
              </div>
            </div>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {PERKS.map((p) => <li key={p} className="flex gap-3 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-signal" />{p}</li>)}
            </ul>
            <Button asChild variant="signal" size="xl" className="mt-9 w-full">
              <Link to="/assinar">Assinar por R$ 250/ano <ArrowRight className="transition-transform duration-500 group-hover:translate-x-1" /></Link>
            </Button>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">As condições de frete, primeira edição, parcelamento e renovação serão informadas no checkout demonstrativo.</p>
          </div>
          <a href={SUPPORT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="group mt-6 flex items-start gap-3 text-sm text-ink-soft">
            <MessageCircle className="mt-0.5 h-4 w-4 text-signal" />
            <span><strong className="text-ink">Dúvidas?</strong> <span className="link-ed">Fale com o atendimento pelo WhatsApp</span>, de segunda a sexta, das 7h30 às 17h30.</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

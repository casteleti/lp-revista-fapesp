import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magazine } from "@/components/site/Magazine";
import { COVERS } from "@/lib/offer";

const HEADLINE = ["A", "ciência", "brasileira", "do", "mês,", "impressa", "para", "ler", "com", "calma"];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div aria-hidden className="paper-grain pointer-events-none absolute inset-0 opacity-60" />
      <div className="container-ed relative grid items-center gap-12 pt-8 pb-20 md:pt-14 lg:grid-cols-[1.15fr_1fr] lg:gap-8 lg:pb-28">
        <div>
          <p className="kicker animate-rise flex items-center gap-3 text-signal">
            <span className="h-px w-8 bg-signal" />Assinatura da revista Pesquisa FAPESP impressa
          </p>
          <h1 id="hero-title" className="display mt-6 text-[clamp(2.6rem,6.6vw,5.6rem)] text-ink">
            {HEADLINE.map((w, i) => (
              <span key={i} className="animate-word" style={{ animationDelay: `${150 + i * 70}ms` }}>
                {w === "calma" ? <em className="text-signal">{w}</em> : w}
              </span>
            )).flatMap((el, i) => (i < HEADLINE.length - 1 ? [el, " "] : [el]))}
          </h1>
          <p className="animate-rise mt-7 max-w-xl text-lg leading-relaxed text-ink-soft" style={{ animationDelay: "800ms" }}>
            A cada edição, a revista Pesquisa FAPESP seleciona e organiza as principais reportagens sobre a pesquisa feita no Brasil — de saúde e clima a tecnologia e história — numa edição impressa entregue na sua casa.
          </p>

          <div className="animate-rise mt-9 grid max-w-xl gap-6 border-y border-ink/15 py-6 sm:grid-cols-[auto_1fr] sm:items-center" style={{ animationDelay: "950ms" }}>
            <div>
              <p className="text-xs text-muted-foreground">Revista mensal de jornalismo científico</p>
              <p className="mt-1 font-serif text-5xl leading-none tracking-tight">R$ 250<span className="ml-1 font-sans text-base text-muted-foreground">/ano</span></p>
            </div>
            <div className="text-sm leading-relaxed sm:border-l sm:border-ink/15 sm:pl-6">
              <p className="font-semibold">12 edições impressas</p>
              <p className="text-muted-foreground">Equivale a R$ 20,83 por edição.</p>
            </div>
          </div>

          <div className="animate-rise mt-8 flex flex-col gap-4 sm:flex-row sm:items-center" style={{ animationDelay: "1100ms" }}>
            <Button asChild variant="signal" size="xl">
              <Link to="/assinar">Assinar por R$ 250/ano <ArrowRight className="transition-transform duration-500 group-hover:translate-x-1" /></Link>
            </Button>
            <a href="#edicao" className="group inline-flex items-center gap-2 text-sm font-medium">
              <span className="link-ed">Ver o que vem na edição</span><ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
          </div>
          <ul className="animate-rise mt-6 space-y-1 text-sm text-muted-foreground" style={{ animationDelay: "1200ms" }}>
            <li>Pix, boleto ou cartão. Entrega no endereço que você indicar.</li>
            <li>Condições de frete e renovação apresentadas na etapa de assinatura.</li>
          </ul>
        </div>

        {/* Cover composition */}
        <div className="relative mx-auto w-full max-w-[520px] [perspective:1600px]">
          <div className="relative aspect-[5/5.4] w-full">
            <div className="animate-float-b absolute top-[6%] left-[2%] w-[46%] opacity-90">
              <Magazine src={COVERS.e365.src} alt={COVERS.e365.alt} priority />
            </div>
            <div className="animate-float-c absolute top-[2%] right-[0%] w-[44%] opacity-90">
              <Magazine src={COVERS.e366.src} alt={COVERS.e366.alt} priority />
            </div>
            <div className="animate-float-a absolute top-[12%] left-[18%] w-[64%] [transform-style:preserve-3d]">
              <Magazine src={COVERS.e367.src} alt={COVERS.e367.alt} priority className="shadow-[0_50px_80px_-30px_oklch(0_0_0/0.55)]" />
            </div>
          </div>
          <p className="kicker mt-2 text-center text-muted-foreground">Edição 367 — Novembro de 2026</p>
        </div>
      </div>

      <div className="border-y border-ink/10 bg-card/60">
        <ul className="container-ed grid divide-y divide-ink/10 text-sm sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {["Editada pela FAPESP desde 1999", "Prêmio José Reis de Divulgação Científica 2026", "Edição 367 — Novembro de 2026"].map((t, i) => (
            <li key={t} className="flex items-center gap-3 py-4 sm:justify-center sm:px-4">
              <span className="font-serif text-lg italic text-signal">0{i + 1}</span>{t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

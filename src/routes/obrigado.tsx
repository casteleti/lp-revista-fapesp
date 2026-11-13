import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Brand } from "@/components/site/Brand";
import { Button } from "@/components/ui/button";
import { Magazine } from "@/components/site/Magazine";
import { COVERS, MAGAZINE_URL, OFFER, brl } from "@/lib/offer";
import { METHOD_LABEL, ORDER_KEY, PLAN_LABEL, type DemoOrder } from "@/lib/checkout-schema";

export const Route = createFileRoute("/obrigado")({
  head: () => ({
    meta: [
      { title: "Assinatura de demonstração concluída · Pesquisa FAPESP" },
      { name: "description", content: "Confirmação do pedido simulado da assinatura impressa da revista Pesquisa FAPESP." },
      { property: "og:title", content: "Assinatura de demonstração concluída · Pesquisa FAPESP" },
      { property: "og:description", content: "Confirmação do pedido simulado da assinatura impressa da Pesquisa FAPESP." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ThankYou,
});

const NEXT = ["Você recebe a confirmação.", "A equipe organiza o envio das edições.", "A revista chega ao endereço informado."];

function ThankYou() {
  const [order, setOrder] = useState<DemoOrder | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try { const raw = sessionStorage.getItem(ORDER_KEY); if (raw) setOrder(JSON.parse(raw)); } catch { /* ignore */ }
    setReady(true);
  }, []);

  const rows: [string, string][] = [
    ["Número demonstrativo do pedido", order?.number ?? "—"],
    ["Produto", "Pesquisa FAPESP — Assinatura anual impressa"],
    ["Quantidade", `${OFFER.editions} edições`],
    ["Valor", brl(OFFER.price)],
    ["Pagamento", order ? METHOD_LABEL[order.method] : "—"],
    ["Modalidade", order ? PLAN_LABEL[order.plan] : "—"],
    ["Status", "Simulação concluída"],
  ];

  return (
    <div className="min-h-screen">
      <header className="border-b border-rule"><div className="container-ed flex h-16 items-center"><Brand /></div></header>
      <main className="container-ed grid items-start gap-16 py-14 md:py-20 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <svg viewBox="0 0 52 52" className="h-16 w-16" aria-hidden>
            <circle cx="26" cy="26" r="24" pathLength={100} className="animate-draw fill-none stroke-success" strokeWidth="2" />
            <path d="M15 27l7 7 15-16" pathLength={100} className="animate-draw fill-none stroke-success [animation-delay:0.8s]" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <h1 className="display animate-rise mt-8 text-[clamp(2.4rem,5.4vw,4.4rem)]" style={{ animationDelay: "300ms" }}>Sua assinatura de demonstração foi concluída!</h1>
          <p className="animate-rise mt-6 text-xl text-ink-soft" style={{ animationDelay: "500ms" }}>Obrigado por conhecer a experiência de assinatura impressa da Pesquisa FAPESP.</p>
          <div className="animate-rise mt-6 space-y-2 border-l-2 border-signal pl-5 text-ink-soft" style={{ animationDelay: "650ms" }}>
            <p>Este foi um pedido simulado. Nenhuma cobrança foi realizada e nenhuma assinatura real foi contratada.</p>
            <p>Em uma contratação verdadeira, você receberia a confirmação da assinatura e as informações de entrega pelo canal de contato informado.</p>
          </div>

          <section aria-labelledby="resumo-pedido" className="animate-rise mt-12 rounded-sm border border-ink/15 bg-card p-6 shadow-soft sm:p-8" style={{ animationDelay: "800ms" }}>
            <h2 id="resumo-pedido" className="kicker text-muted-foreground">Resumo do pedido</h2>
            {ready && !order && <p className="mt-4 text-sm text-signal">Nenhum pedido de demonstração encontrado nesta sessão. <Link to="/assinar" className="underline">Fazer uma simulação</Link>.</p>}
            <dl className="mt-5 divide-y divide-ink/10 text-sm">
              {rows.map(([k, val]) => (
                <div key={k} className="flex flex-col gap-1 py-3 sm:flex-row sm:justify-between sm:gap-6">
                  <dt className="text-ink-soft">{k}</dt>
                  <dd className={k === "Status" ? "font-semibold text-success" : k.startsWith("Número") ? "font-mono" : ""}>{val}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="proximos" className="mt-14">
            <h2 id="proximos" className="font-serif text-3xl">O que acontece após uma assinatura real?</h2>
            <ol className="mt-8 grid gap-6 sm:grid-cols-3">
              {NEXT.map((t, i) => (
                <li key={t} className="animate-rise border-t border-ink/15 pt-5" style={{ animationDelay: `${1000 + i * 150}ms` }}>
                  <span className="font-serif text-4xl italic text-signal">{i + 1}</span>
                  <p className="mt-3 leading-relaxed">{t}</p>
                </li>
              ))}
            </ol>
          </section>

          <div className="mt-14 flex flex-col gap-4 sm:flex-row">
            <Button asChild variant="ink" size="xl"><Link to="/"><ArrowLeft />Voltar para o início</Link></Button>
            <Button asChild variant="line" size="xl"><a href={MAGAZINE_URL} target="_blank" rel="noopener noreferrer">Conhecer o site da revista <ExternalLink /></a></Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm [perspective:1400px] lg:sticky lg:top-16">
          <div aria-hidden className="absolute inset-[10%] -z-10 rounded-full bg-signal/15 blur-3xl" />
          <div className="animate-rise" style={{ animationDelay: "400ms" }}>
            <Magazine src={COVERS.e367.src} alt={COVERS.e367.alt} priority className="animate-float-a" />
          </div>
          <p className="kicker mt-6 text-center text-muted-foreground">{COVERS.e367.label}</p>
        </div>
      </main>
    </div>
  );
}

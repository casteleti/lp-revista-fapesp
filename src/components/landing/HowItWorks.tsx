import { MessageCircle, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { SUPPORT } from "@/lib/offer";

const STEPS = [
  { t: "Você assina.", d: "Pagamento por Pix, boleto ou cartão, em página segura da Funep.", demo: "No protótipo, o pagamento é apenas demonstrativo." },
  { t: "Enviamos a primeira edição.", d: "Você recebe um e-mail de confirmação quando a assinatura real for processada.", demo: "No protótipo, somente uma confirmação visual será apresentada." },
  { t: "As demais seguem a cada nova edição.", d: "Você recebe cada edição publicada até completar as 12 da assinatura." },
];
const NOTES = [
  { t: "Quem faz o quê", d: "A revista é editada pela FAPESP. A Funep — Fundação de Apoio a Pesquisa, Ensino e Extensão — é responsável pela gestão das assinaturas e pela distribuição, como consta no expediente da revista." },
  { t: "Entrega", d: "As condições reais de frete, cobertura e prazo ainda dependem de confirmação operacional. Na demonstração, os valores apresentados são fictícios." },
  { t: "Renovação", d: "Na demonstração, você pode visualizar pagamento único ou renovação anual automática. Essas opções são ilustrativas e não representam contratação real." },
  { t: "Desistência", d: "Você pode desistir em até 7 dias, conforme o Código de Defesa do Consumidor. As demais regras serão confirmadas na versão definitiva." },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" aria-labelledby="how-title" className="scroll-mt-20 border-t border-ink/10 bg-card py-24 md:py-32">
      <div className="container-ed">
        <Reveal><h2 id="how-title" className="display max-w-3xl text-[clamp(2.2rem,4.6vw,4rem)]">Antes de assinar, o que você precisa saber</h2></Reveal>
        <ol className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
          <span aria-hidden className="absolute top-5 right-0 left-0 hidden h-px bg-ink/15 md:block" />
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.t} delay={i * 140} className="relative">
              <span className="relative z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-ink font-serif text-lg text-paper">{i + 1}</span>
              <h3 className="mt-6 font-serif text-2xl">{s.t}</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{s.d}</p>
              {s.demo && <p className="mt-3 inline-block border-l-2 border-signal pl-3 text-sm text-muted-foreground">{s.demo}</p>}
            </Reveal>
          ))}
        </ol>
        <div className="mt-20 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {NOTES.map((n, i) => (
              <Reveal key={n.t} delay={i * 80} className="border-t border-ink/15 pt-5">
                <dt className="kicker">{n.t}</dt>
                <dd className="mt-3 text-sm leading-relaxed text-ink-soft">{n.d}</dd>
              </Reveal>
            ))}
          </dl>
          <Reveal className="rounded-sm bg-ink p-8 text-paper sm:p-10">
            <p className="font-serif text-3xl">Prefere falar com uma pessoa?</p>
            <ul className="mt-6 space-y-3 text-sm text-paper/80">
              <li className="flex gap-3"><MessageCircle className="h-4 w-4 text-signal" />WhatsApp: {SUPPORT.whatsappDisplay}</li>
              <li className="flex gap-3"><Clock className="h-4 w-4 text-signal" />{SUPPORT.hours}</li>
              <li className="flex gap-3"><Mail className="h-4 w-4 text-signal" /><a className="link-ed break-all" href={`mailto:${SUPPORT.email}`}>{SUPPORT.email}</a></li>
            </ul>
            <Button asChild variant="signal" size="lg" className="mt-8 h-12 w-full hover:bg-paper hover:text-ink">
              <a href={SUPPORT.whatsappUrl} target="_blank" rel="noopener noreferrer">Falar no WhatsApp</a>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

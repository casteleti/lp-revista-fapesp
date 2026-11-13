import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import leitura from "@/assets/leitura.jpg";

const BENEFITS = [
  { t: "Uma seleção, não um fluxo.", d: "Em vez de reportagens chegando uma a uma, a edição reúne o mês inteiro, numa ordem pensada pela redação." },
  { t: "Feita para o papel.", d: "A nova fase trouxe letra maior e mais infográficos, para uma leitura com tempo, longe das notificações." },
  { t: "Chega até você.", d: "Cada nova edição, no seu endereço. Sem procurar na banca, sem precisar lembrar de abrir o site." },
  { t: "Para guardar e levar adiante.", d: "Leitores contam que guardam as edições, leem fora de casa e levam reportagens para a sala de aula." },
];

export function PrintExperience() {
  return (
    <section id="revista" aria-labelledby="exp-title" className="scroll-mt-20 bg-card py-24 md:py-32">
      <div className="container-ed grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <Reveal as="figure" className="lg:sticky lg:top-28 lg:self-start">
          <div className="overflow-hidden rounded-sm">
            <img src={leitura} alt="Leitora folheia uma revista impressa sobre a mesa, com café e óculos ao lado" width={1280} height={1600} loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-[2s] hover:scale-[1.03]" />
          </div>
          <figcaption className="mt-4 flex gap-3 text-sm italic text-muted-foreground"><span className="mt-2.5 h-px w-8 shrink-0 bg-signal" />Receber a edição, folhear sem pressa, voltar a um infográfico dias depois.</figcaption>
        </Reveal>

        <div>
          <Reveal>
            <h2 id="exp-title" className="display text-[clamp(2.3rem,4.6vw,4rem)]">O conteúdo é aberto. <em className="text-signal">A experiência impressa é outra.</em></h2>
            <p className="mt-8 text-lg leading-relaxed text-ink-soft">As reportagens da Pesquisa FAPESP ficam disponíveis gratuitamente no site — é parte da missão da FAPESP de levar a pesquisa à sociedade que a financia.</p>
            <p className="mt-4 text-lg leading-relaxed text-ink">A assinatura é para quem quer recebê-las de outra forma.</p>
          </Reveal>
          <ol className="mt-14 space-y-0">
            {BENEFITS.map((b, i) => (
              <Reveal as="li" key={b.t} delay={i * 80} className={`group border-t border-ink/15 py-8 ${i % 2 ? "sm:pl-16" : ""}`}>
                <div className="flex gap-6">
                  <span className="font-serif text-6xl leading-[0.8] text-rule transition-colors duration-500 group-hover:text-signal">{i + 1}</span>
                  <div>
                    <h3 className="font-serif text-2xl">{b.t}</h3>
                    <p className="mt-2 max-w-md leading-relaxed text-ink-soft">{b.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
          <Reveal className="border-t border-ink/15 pt-8">
            <p className="font-serif text-xl italic">E cada leitor encontra o seu jeito de usar a revista.</p>
            <a href="#oferta" className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold"><span className="link-ed">Ver a assinatura</span><ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

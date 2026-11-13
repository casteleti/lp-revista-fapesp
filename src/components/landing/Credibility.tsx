import { Reveal } from "@/components/site/Reveal";

// Data checked against revistapesquisa.fapesp.br (May 2026: 4 international + 33 national prizes; international editions page).
const DATA = [
  { big: "1999", label: "Ano da primeira edição." },
  { big: "José Reis 2026", label: "Prêmio de Divulgação Científica, CNPq, categoria Instituição e Veículo." },
  { big: "Mais de 30", label: "Prêmios nacionais e internacionais." },
  { big: "3 idiomas", label: "Edições em inglês, espanhol e francês." },
];

export function Credibility() {
  return (
    <section aria-labelledby="cred-title" className="relative overflow-hidden bg-night py-24 text-night-foreground md:py-36">
      <div aria-hidden className="pointer-events-none absolute -top-20 right-[-10%] font-serif text-[28vw] leading-none text-night-foreground/[0.03] italic select-none">1999</div>
      <div className="container-ed relative">
        <Reveal className="max-w-4xl">
          <p className="kicker text-signal">Credibilidade</p>
          <h2 id="cred-title" className="display mt-5 text-[clamp(2.2rem,4.8vw,4.2rem)]">Jornalismo científico desde 1999, feito pela fundação que financia a pesquisa em São Paulo</h2>
        </Reveal>
        <Reveal className="mt-10 grid gap-6 text-lg leading-relaxed text-night-muted md:grid-cols-2 md:gap-14" delay={100}>
          <p>A Pesquisa FAPESP é editada pela Fundação de Amparo à Pesquisa do Estado de São Paulo (FAPESP).</p>
          <p>Em 2026, começou uma nova fase, com redação integrada à FAPESP e projeto editorial acompanhado pelo Labjor-Unicamp.</p>
        </Reveal>
        <dl className="mt-20 grid border-t border-night-foreground/15 sm:grid-cols-2 lg:grid-cols-4">
          {DATA.map((d, i) => (
            <Reveal key={d.big} delay={i * 120} className="border-b border-night-foreground/15 py-8 sm:pr-8 lg:border-b-0 lg:border-r lg:last:border-r-0 lg:[&:not(:first-child)]:pl-8">
              <dt className="font-serif text-[clamp(2.2rem,3.6vw,3.2rem)] leading-none">{d.big}</dt>
              <dd className="mt-4 max-w-[16rem] text-sm leading-relaxed text-night-muted">{d.label}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

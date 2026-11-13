import { Reveal } from "@/components/site/Reveal";

const READERS = [
  { n: "I", t: "Para quem gosta de entender o mundo", d: ["Clima, saúde, inteligência artificial, história do Brasil: temas que estão no noticiário, contados com base no que a pesquisa já sabe — e no que ainda não sabe."] },
  { n: "II", t: "Para quem ensina", d: ["Professores usam reportagens e infográficos da revista para preparar aulas e debates.", "Uma capa da revista foi material de apoio na prova de redação do ENEM 2023."] },
  { n: "III", t: "Para quem pesquisa", d: ["Uma forma de acompanhar, mês a mês, o que outras áreas estão investigando — das ciências da vida às humanidades — e como a pesquisa brasileira chega ao debate público."] },
];

export function Readers() {
  return (
    <section aria-labelledby="readers-title" className="py-24 md:py-32">
      <div className="container-ed">
        <Reveal className="grid gap-6 md:grid-cols-2 md:items-end">
          <h2 id="readers-title" className="display text-[clamp(2.3rem,5vw,4.4rem)]">Uma revista, três formas de ler</h2>
          <p className="max-w-md text-lg leading-relaxed text-ink-soft md:justify-self-end">A Pesquisa FAPESP é escrita em linguagem jornalística, para quem se interessa por ciência — com ou sem formação na área.</p>
        </Reveal>
        <div className="mt-16 grid gap-px overflow-hidden rounded-sm bg-ink/15 md:grid-cols-3">
          {READERS.map((r, i) => (
            <Reveal key={r.n} delay={i * 120} className={`group relative bg-paper p-8 transition-colors duration-700 hover:bg-ink hover:text-paper md:p-10 ${i === 1 ? "md:translate-y-0 md:pt-24" : ""}`}>
              <span className="font-serif text-7xl italic leading-none text-signal">{r.n}</span>
              <h3 className="mt-10 font-serif text-3xl leading-tight">{r.t}</h3>
              <div className="mt-5 space-y-3 leading-relaxed opacity-80">{r.d.map((p) => <p key={p}>{p}</p>)}</div>
              <span className="absolute bottom-0 left-0 h-1 w-0 bg-signal transition-all duration-700 group-hover:w-full" />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-14 text-center">
          <p className="font-serif text-2xl italic text-ink-soft">Por trás de cada edição, há 27 anos de jornalismo científico.</p>
        </Reveal>
      </div>
    </section>
  );
}

import { useState } from "react";
import { ArrowRight, ZoomIn } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Reveal } from "@/components/site/Reveal";
import { COVERS } from "@/lib/offer";
import mat from "@/assets/mat.jpg.asset.json";
import alz from "@/assets/alz.jpg.asset.json";

const HIGHLIGHTS = [
  { n: "01", ed: "Capa · Ciência", title: "Expedição científica revela a biodiversidade no topo da Amazônia", text: "Equipe de pesquisadores investiga ecossistemas de altitude na serra do Aracá, no norte do Amazonas." },
  { n: "02", ed: "Entrevista", title: "Mário Murakami: Roer o osso para quebrar a celulose", text: "Uma entrevista sobre biodiversidade, pesquisa e novas possibilidades para as biorrefinarias." },
  { n: "03", ed: "Tecnologia", title: "O poder da matemática a serviço da indústria", text: "Como a matemática aplicada aproxima o conhecimento científico das demandas industriais.", img: mat.url },
  { n: "04", ed: "Saúde", title: "Quais são as pistas do Alzheimer antes dos primeiros sintomas?", text: "Pesquisadores investigam biomarcadores e os desafios envolvidos na identificação precoce da doença.", img: alz.url },
];
const EDITORIAS = ["Ciência", "Política de C&T", "Tecnologia", "Humanidades", "Saúde", "Sustentabilidade", "Dados", "Boas Práticas", "Gente da Pesquisa"];
const GALLERY = [COVERS.e367, COVERS.e366, COVERS.e365];

export function Edition() {
  const [zoom, setZoom] = useState<(typeof GALLERY)[number] | null>(null);
  return (
    <section id="edicao" aria-labelledby="edicao-title" className="scroll-mt-20 py-24 md:py-32">
      <div className="container-ed">
        <div className="grid gap-10 lg:grid-cols-[5fr_7fr]">
          <Reveal>
            <p className="kicker text-signal">Por dentro da edição</p>
            <h2 id="edicao-title" className="display mt-4 text-[clamp(2.4rem,5vw,4.2rem)]">Folheie antes de assinar</h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">Cada edição reúne reportagens, entrevistas, infográficos e seções fixas, escolhidas e organizadas pela redação.</p>
            <p className="mt-3 max-w-md text-ink-soft">Conheça alguns destaques da edição de novembro de 2026.</p>
            <ul className="mt-8 flex flex-wrap gap-x-4 gap-y-2 border-t border-ink/15 pt-6 text-sm">
              {EDITORIAS.map((e) => <li key={e} className="text-muted-foreground before:mr-4 before:text-signal before:content-['/'] first:before:hidden">{e}</li>)}
            </ul>
          </Reveal>

          <ol className="divide-y divide-ink/15 border-y border-ink/15">
            {HIGHLIGHTS.map((h, i) => (
              <Reveal as="li" key={h.n} delay={i * 90} className="group grid grid-cols-[auto_1fr] gap-5 py-6 sm:grid-cols-[auto_1fr_auto] sm:gap-8">
                <span className="font-serif text-4xl italic leading-none text-signal/80 transition-colors group-hover:text-signal">{h.n}</span>
                <div>
                  <p className="kicker text-muted-foreground">{h.ed}</p>
                  <h3 className="mt-2 font-serif text-2xl leading-snug transition-colors group-hover:text-signal">{h.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{h.text}</p>
                </div>
                {h.img && (
                  <img src={h.img} alt="" width={300} height={200} loading="lazy" className="col-span-2 aspect-[3/2] w-full rounded-sm object-cover grayscale-[30%] transition duration-700 group-hover:grayscale-0 sm:col-span-1 sm:w-40" />
                )}
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal className="mt-20">
          <div className="flex items-end justify-between gap-4 border-b border-ink/15 pb-4">
            <p className="kicker">Edições recentes</p>
            <p className="text-sm text-muted-foreground"><span className="hidden md:inline">Clique em uma página para ampliar.</span><span className="md:hidden">Toque em uma página para ampliar.</span></p>
          </div>
          <ul className="-mx-5 mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-6 md:mx-0 md:grid md:grid-cols-3 md:gap-10 md:overflow-visible md:px-0">
            {GALLERY.map((c) => (
              <li key={c.label} className="w-[68%] shrink-0 snap-center md:w-auto">
                <button type="button" onClick={() => setZoom(c)} className="group block w-full text-left" aria-label={`Ampliar ${c.alt}`}>
                  <div className="magazine relative aspect-[492/618] overflow-hidden transition-transform duration-700 [transition-timing-function:var(--ease-editorial)] group-hover:-translate-y-2 group-hover:rotate-[-1deg]">
                    <img src={c.src} alt={c.alt} width={492} height={618} loading="lazy" className="h-full w-full object-cover" />
                    <span className="absolute right-3 bottom-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-paper/90 opacity-0 transition-opacity group-hover:opacity-100"><ZoomIn className="h-4 w-4" /></span>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">{c.label}</p>
                </button>
              </li>
            ))}
          </ul>
          <a href="#oferta" className="group mt-4 inline-flex items-center gap-2 text-sm font-semibold"><span className="link-ed">Ver a assinatura</span><ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></a>
        </Reveal>
      </div>

      <Dialog open={!!zoom} onOpenChange={(o) => !o && setZoom(null)}>
        <DialogContent className="max-w-[min(92vw,560px)] border-none bg-transparent p-0 shadow-none">
          <DialogTitle className="sr-only">{zoom?.label}</DialogTitle>
          <DialogDescription className="sr-only">{zoom?.alt}</DialogDescription>
          {zoom && <img src={zoom.src} alt={zoom.alt} width={492} height={618} className="animate-in zoom-in-95 fade-in w-full rounded-sm shadow-object duration-500" />}
        </DialogContent>
      </Dialog>
    </section>
  );
}

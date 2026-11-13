import { ArrowRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal } from "@/components/site/Reveal";

const FAQ = [
  ["A revista continua sendo impressa?", "Sim. Depois de um intervalo em julho e agosto de 2026, a edição impressa voltou em setembro, com a edição 365 e um novo projeto gráfico."],
  ["Posso ler a revista de graça?", "Sim. Todas as reportagens estão no site da revista. A assinatura é da edição impressa, entregue no seu endereço."],
  ["Quando recebo a primeira edição?", "Na demonstração, a previsão de entrega é ilustrativa. O prazo real e a edição inicial serão informados nas condições definitivas da assinatura."],
  ["Quanto custa o frete e para onde vocês entregam?", "O frete apresentado no checkout é simulado. A cobertura e os valores definitivos dependem de confirmação da Funep."],
  ["A assinatura renova automaticamente?", "Nesta demonstração, você pode visualizar duas modalidades: pagamento único ou renovação anual automática. Nenhuma das opções realiza uma contratação real."],
  ["Eu já era assinante. Como fica minha assinatura?", "As condições para assinantes anteriores devem ser verificadas diretamente com a equipe de atendimento."],
  ["Posso dar a assinatura de presente?", "Ainda não há uma opção específica de presente. Fale com o atendimento para saber como proceder."],
  ["Há condições para escolas, bibliotecas ou empresas?", "Não há plano institucional publicado. Instituições podem pedir contato pelo e-mail assinaturaspesquisa@fapesp.br. Escolas estaduais paulistas já recebem a revista gratuitamente."],
];

export function Faq() {
  return (
    <section id="duvidas" aria-labelledby="faq-title" className="scroll-mt-20 py-24 md:py-32">
      <div className="container-ed grid gap-12 lg:grid-cols-[1fr_1.6fr]">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="kicker text-signal">Dúvidas</p>
          <h2 id="faq-title" className="display mt-4 text-[clamp(2.2rem,4.4vw,3.8rem)]">Perguntas frequentes</h2>
          <a href="#oferta" className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold"><span className="link-ed">Ver a assinatura</span><ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></a>
        </Reveal>
        <Reveal delay={100}>
          <Accordion type="single" collapsible className="border-t border-ink/15">
            {FAQ.map(([q, a], i) => (
              <AccordionItem key={q} value={`q${i}`} className="border-ink/15">
                <AccordionTrigger className="gap-6 py-6 text-left font-serif text-xl font-normal hover:no-underline hover:text-signal sm:text-2xl">{q}</AccordionTrigger>
                <AccordionContent className="pb-6 text-base leading-relaxed text-ink-soft">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

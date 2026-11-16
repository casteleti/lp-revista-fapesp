import { Brand } from "./Brand";
import { LegalDialog } from "./LegalDialog";
import { MAGAZINE_URL, SUPPORT } from "@/lib/offer";

export function SiteFooter() {
  return (
    <footer className="bg-night pb-28 text-night-foreground md:pb-0">
      <div className="container-ed grid gap-10 border-t border-night-foreground/10 py-14 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-4">
          <Brand tone="night" size="sm" />
          <p className="max-w-md text-sm leading-relaxed text-night-muted">
            A revista Pesquisa FAPESP é editada pela FAPESP.<br />
            Assinaturas: Funep — Fundação de Apoio a Pesquisa, Ensino e Extensão.<br />
            CNPJ 50.511.286/0001-48 · Jaboticabal, São Paulo.
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
          <li><LegalDialog kind="termos"><button className="link-ed text-left text-night-foreground/85 hover:text-night-foreground">Termos da assinatura</button></LegalDialog></li>
          <li><LegalDialog kind="privacidade"><button className="link-ed text-left text-night-foreground/85 hover:text-night-foreground">Política de privacidade</button></LegalDialog></li>
          <li><a className="link-ed text-night-foreground/85 hover:text-night-foreground" href={SUPPORT.whatsappUrl} target="_blank" rel="noopener noreferrer">Atendimento</a></li>
          <li><a className="link-ed text-night-foreground/85 hover:text-night-foreground" href={MAGAZINE_URL} target="_blank" rel="noopener noreferrer">Site oficial da revista</a></li>
        </ul>
      </div>
      <div className="container-ed border-t border-night-foreground/10 py-5 text-xs text-night-muted">
        Protótipo demonstrativo · capas reproduzidas do site oficial como referência visual, sujeitas a autorização antes da publicação.
      </div>
    </footer>
  );
}

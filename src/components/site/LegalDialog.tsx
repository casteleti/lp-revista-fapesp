import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { ReactNode } from "react";

const CONTENT = {
  termos: { title: "Termos da assinatura", body: "Texto em elaboração. Os termos definitivos da assinatura — frete, prazos de entrega, renovação, cancelamento e desistência — serão publicados após aprovação da FAPESP e da Funep." },
  privacidade: { title: "Política de privacidade", body: "Texto em elaboração. A política definitiva descreverá como os dados de assinantes são tratados, conforme a LGPD. Neste protótipo, nenhum dado preenchido é enviado a servidores." },
} as const;

export function LegalDialog({ kind, children }: { kind: keyof typeof CONTENT; children: ReactNode }) {
  const c = CONTENT[kind];
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="rounded-sm bg-paper">
        <DialogHeader>
          <p className="kicker text-signal">Documento demonstrativo · aguarda aprovação</p>
          <DialogTitle className="font-serif text-3xl font-normal">{c.title}</DialogTitle>
          <DialogDescription className="pt-2 text-base leading-relaxed text-ink-soft">{c.body}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

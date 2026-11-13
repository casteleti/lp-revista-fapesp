import { ShieldCheck } from "lucide-react";
import { COVERS, OFFER, brl } from "@/lib/offer";
import { PLAN_LABEL, type CheckoutValues } from "@/lib/checkout-schema";

export function OrderSummary({ plan }: { plan: CheckoutValues["plan"] }) {
  return (
    <aside aria-labelledby="resumo-title" className="rounded-sm border border-ink/15 bg-card p-6 shadow-soft sm:p-8">
      <h2 id="resumo-title" className="kicker text-muted-foreground">Resumo da assinatura</h2>
      <div className="mt-6 flex gap-5">
        <div className="magazine w-24 shrink-0 overflow-hidden"><img src={COVERS.e367.src} alt={COVERS.e367.alt} width={492} height={618} className="aspect-[492/618] w-full object-cover" /></div>
        <div>
          <p className="font-serif text-2xl leading-tight">Pesquisa FAPESP</p>
          <p className="mt-1 text-sm text-ink-soft">Assinatura impressa anual</p>
          <p className="text-sm text-ink-soft">12 edições</p>
          <p key={plan} className="animate-in fade-in slide-in-from-left-2 mt-3 inline-block rounded-full bg-rule px-3 py-1 text-xs font-medium duration-500">{PLAN_LABEL[plan]}</p>
        </div>
      </div>
      <dl className="mt-7 space-y-3 border-t border-ink/10 pt-6 text-sm">
        <div className="flex justify-between"><dt className="text-ink-soft">Valor</dt><dd>{brl(OFFER.price)}</dd></div>
        <div className="flex justify-between gap-4"><dt className="text-ink-soft">Frete</dt><dd className="text-right">{brl(OFFER.shippingDemo)} <span className="text-xs text-muted-foreground">— demonstrativo</span></dd></div>
        <div className="flex justify-between gap-4"><dt className="text-ink-soft">Prazo ilustrativo</dt><dd>{OFFER.deliveryDemo}</dd></div>
        <div className="flex items-baseline justify-between border-t border-ink/10 pt-4"><dt className="font-semibold">Total</dt><dd className="font-serif text-3xl">{brl(OFFER.price + OFFER.shippingDemo)}</dd></div>
      </dl>
      {plan === "renewal" && <p className="mt-4 text-xs text-muted-foreground">Renovação ilustrativa: {brl(OFFER.price)} a cada 12 meses, apenas na simulação.</p>}
      <p className="mt-6 flex gap-2 border-t border-ink/10 pt-5 text-xs leading-relaxed text-muted-foreground"><ShieldCheck className="h-4 w-4 shrink-0 text-success" />Ambiente demonstrativo. Nenhum dado é enviado e nenhuma cobrança é feita.</p>
    </aside>
  );
}

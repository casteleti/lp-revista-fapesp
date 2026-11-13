import { useState } from "react";
import { Copy, Check, QrCode, CreditCard, Barcode } from "lucide-react";
import { cn } from "@/lib/utils";

export const METHODS = [
  { id: "pix", label: "Pix", Icon: QrCode },
  { id: "card", label: "Cartão", Icon: CreditCard },
  { id: "boleto", label: "Boleto", Icon: Barcode },
] as const;

const PIX_CODE = "DEMO-PIX-PESQUISAFAPESP-NAO-E-UMA-COBRANCA-367";

/** Deterministic illustrative QR-like pattern (not a decodable Pix code). */
function FakeQr() {
  const size = 21;
  const cells: boolean[] = [];
  let seed = 367;
  for (let i = 0; i < size * size; i++) { seed = (seed * 9301 + 49297) % 233280; cells.push(seed / 233280 > 0.52); }
  const finder = (x: number, y: number) => [[0, 0], [size - 7, 0], [0, size - 7]].some(([fx, fy]) => x >= fx && x < fx + 7 && y >= fy && y < fy + 7);
  const finderOn = (x: number, y: number) => { const fx = x < 7 ? 0 : size - 7; const fy = y < 7 ? 0 : size - 7; const dx = x - fx, dy = y - fy; return dx === 0 || dy === 0 || dx === 6 || dy === 6 || (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4); };
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="h-40 w-40" role="img" aria-label="QR Code ilustrativo, sem valor de pagamento">
      <rect width={size} height={size} className="fill-card" />
      {cells.map((on, i) => { const x = i % size, y = Math.floor(i / size); const v = finder(x, y) ? finderOn(x, y) : on; return v ? <rect key={i} x={x} y={y} width={1} height={1} className="fill-ink" /> : null; })}
    </svg>
  );
}

export function PixPanel() {
  const [copied, setCopied] = useState(false);
  return (
    <div className="grid items-center gap-6 sm:grid-cols-[auto_1fr]">
      <div className="mx-auto rounded-sm border border-ink/10 bg-card p-3"><FakeQr /></div>
      <div>
        <p className="text-sm leading-relaxed text-ink-soft">Em uma assinatura real, você leria o QR Code no app do seu banco. Aqui, o código é apenas ilustrativo.</p>
        <code className="mt-3 block truncate rounded-sm bg-rule px-3 py-2 text-xs">{PIX_CODE}</code>
        <button type="button" onClick={() => { navigator.clipboard?.writeText(PIX_CODE); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="mt-3 inline-flex h-10 items-center gap-2 rounded-sm border border-ink/80 px-4 text-sm font-medium transition hover:bg-ink hover:text-paper">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}{copied ? "Código copiado" : "Copiar código de demonstração"}
        </button>
        <p className="mt-3 text-xs font-semibold text-signal">Pix de demonstração. Não realize transferências.</p>
      </div>
    </div>
  );
}

export function BoletoPanel() {
  const bars = Array.from({ length: 64 }, (_, i) => ((i * 7919) % 5) + 1);
  return (
    <div>
      <p className="text-sm leading-relaxed text-ink-soft">O boleto seria emitido após a confirmação do pedido, com vencimento demonstrativo em 3 dias úteis.</p>
      <div aria-hidden className="mt-4 flex h-14 items-stretch gap-[2px] overflow-hidden rounded-sm bg-card p-2">
        {bars.map((w, i) => <span key={i} className={cn("bg-ink", i % 3 === 2 && "bg-transparent")} style={{ width: w }} />)}
      </div>
      <code className="mt-2 block text-xs tracking-wider break-all text-muted-foreground">00000.00000 00000.000000 00000.000000 0 00000000025000</code>
      <p className="mt-3 text-xs font-semibold text-signal">Código de barras fictício. Nenhum boleto verdadeiro será emitido.</p>
    </div>
  );
}

export function CardPreview({ name, number, expiry }: { name?: string; number?: string; expiry?: string }) {
  return (
    <div className="relative aspect-[1.586] w-full max-w-xs overflow-hidden rounded-xl bg-ink p-5 text-paper shadow-object">
      <div aria-hidden className="absolute -top-16 -right-10 h-48 w-48 rounded-full bg-signal/40 blur-2xl" />
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-center justify-between"><span className="font-serif italic">Pesquisa</span><span className="kicker text-paper/60">Teste</span></div>
        <p className="font-mono text-lg tracking-[0.12em]">{number || "•••• •••• •••• ••••"}</p>
        <div className="flex justify-between text-xs uppercase"><span className="truncate pr-4">{name || "Nome no cartão"}</span><span>{expiry || "MM/AA"}</span></div>
      </div>
    </div>
  );
}

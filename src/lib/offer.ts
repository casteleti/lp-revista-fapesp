import capa367 from "@/assets/capa-367.jpg.asset.json";
import capa366 from "@/assets/capa-366.jpg.asset.json";
import capa365 from "@/assets/capa-365.jpg.asset.json";

/** Commercial facts given in the brief. Demo-only values are flagged as such. */
export const OFFER = {
  price: 250,
  editions: 12,
  perEdition: 250 / 12,
  newsstand: 30,
  shippingDemo: 0,
  deliveryDemo: "Até 10 dias úteis",
} as const;

export const SUPPORT = {
  whatsappDisplay: "(16) 99760-0535",
  whatsappUrl: "https://wa.me/5516997600535",
  email: "assinaturaspesquisa@fapesp.br",
  hours: "Segunda a sexta, 7h30 às 17h30",
} as const;

export const MAGAZINE_URL = "https://revistapesquisa.fapesp.br/";

/** Real covers from revistapesquisa.fapesp.br (492×618). Rights must be cleared before publishing. */
export const COVERS = {
  e367: { src: capa367.url, alt: "Capa da revista Pesquisa FAPESP, edição 367, novembro de 2026", label: "Edição 367 · Nov 2026" },
  e366: { src: capa366.url, alt: "Capa da revista Pesquisa FAPESP, edição 366, outubro de 2026", label: "Edição 366 · Out 2026" },
  e365: { src: capa365.url, alt: "Capa da revista Pesquisa FAPESP, edição 365, setembro de 2026", label: "Edição 365 · Set 2026" },
} as const;

export const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

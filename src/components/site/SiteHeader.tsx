import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, ArrowRight } from "lucide-react";
import { Brand } from "./Brand";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "#revista", label: "A revista" },
  { href: "#edicao", label: "Por dentro da edição" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#duvidas", label: "Dúvidas" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  return (
    <header className={cn("sticky top-0 z-40 transition-all duration-500", scrolled ? "border-b border-rule bg-paper/90 backdrop-blur-md" : "bg-transparent")}>
      <div className="container-ed flex h-16 items-center justify-between gap-4 md:h-20">
        <div className="flex items-center gap-4">
          <Brand />
          <span className="hidden border-l border-border pl-4 text-xs text-muted-foreground lg:inline">Assinatura da edição impressa</span>
        </div>
        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-7 text-sm text-ink-soft">
            {NAV.map((n) => (
              <li key={n.href}><a href={n.href} className="link-ed py-1 hover:text-ink">{n.label}</a></li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ink" size="default" className="hidden h-10 px-5 sm:inline-flex">
            <Link to="/assinar">Assinar <ArrowRight className="transition-transform group-hover:translate-x-0.5" /></Link>
          </Button>
          <button type="button" className="inline-flex h-11 w-11 items-center justify-center md:hidden" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} aria-controls="menu-mobile" onClick={() => setOpen((o) => !o)}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      <div id="menu-mobile" className={cn("fixed inset-x-0 top-16 bottom-0 z-40 bg-paper transition-all duration-500 md:hidden", open ? "visible opacity-100" : "invisible opacity-0")}>
        <nav aria-label="Menu móvel" className="container-ed flex h-full flex-col pt-8 pb-10">
          <ul className="space-y-1">
            {NAV.map((n, i) => (
              <li key={n.href} className="border-b border-rule">
                <a href={n.href} onClick={() => setOpen(false)} className="flex items-baseline justify-between py-5 font-serif text-3xl">
                  {n.label}<span className="kicker text-muted-foreground">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
          <Button asChild variant="signal" size="xl" className="mt-auto w-full">
            <Link to="/assinar" onClick={() => setOpen(false)}>Assinar por R$ 250/ano</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}

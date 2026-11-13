import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

/** Typographic wordmark for the prototype — replace with the official Pesquisa FAPESP logo file when supplied. */
export function Brand({ className, tone = "ink" }: { className?: string; tone?: "ink" | "night" }) {
  return (
    <Link to="/" aria-label="Pesquisa FAPESP — início" className={cn("group inline-flex items-baseline gap-1.5 leading-none", className)}>
      <span className={cn("font-serif text-[1.55rem] italic tracking-tight", tone === "night" ? "text-night-foreground" : "text-ink")}>Pesquisa</span>
      <span className="font-sans text-[0.8rem] font-bold tracking-[0.22em] text-signal">FAPESP</span>
    </Link>
  );
}

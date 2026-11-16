import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import logoInk from "@/assets/pesquisa-fapesp-logo.png.asset.json";
import logoWhite from "@/assets/pesquisa-fapesp-logo-branco.png.asset.json";

/** Official Pesquisa FAPESP logo. `tone="night"` uses the white version for dark backgrounds. */
export function Brand({ className, tone = "ink" }: { className?: string; tone?: "ink" | "night" }) {
  return (
    <Link to="/" aria-label="Pesquisa FAPESP — início" className={cn("group inline-flex items-center leading-none", className)}>
      <img
        src={tone === "night" ? logoWhite.url : logoInk.url}
        alt="Pesquisa FAPESP"
        className="h-6 w-auto md:h-7"
        width={1920}
        height={341}
      />
    </Link>
  );
}

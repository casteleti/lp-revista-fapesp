import { cn } from "@/lib/utils";

export function Magazine({ src, alt, className, priority = false }: { src: string; alt: string; className?: string; priority?: boolean }) {
  return (
    <div className={cn("magazine aspect-[492/618] overflow-hidden bg-rule", className)}>
      <img
        src={src}
        alt={alt}
        width={492}
        height={618}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className="h-full w-full object-cover"
      />
    </div>
  );
}

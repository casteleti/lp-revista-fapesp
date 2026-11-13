import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MobileBar({ visible }: { visible: boolean }) {
  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 border-t border-rule bg-paper/95 px-4 pt-3 backdrop-blur-md transition-transform duration-500 md:hidden",
        "pb-[max(0.75rem,env(safe-area-inset-bottom))]",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="leading-tight">
          <p className="font-serif text-2xl">R$ 250<span className="text-sm text-muted-foreground">/ano</span></p>
          <p className="text-xs text-muted-foreground">12 edições</p>
        </div>
        <Button asChild variant="signal" size="lg" className="h-12 px-8" tabIndex={visible ? 0 : -1}>
          <Link to="/assinar" tabIndex={visible ? 0 : -1}>Assinar</Link>
        </Button>
      </div>
    </div>
  );
}

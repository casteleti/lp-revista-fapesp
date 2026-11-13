import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { AlertCircle, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string; valid?: boolean; hint?: ReactNode; optional?: boolean };

export const Field = forwardRef<HTMLInputElement, Props>(function Field({ label, error, valid, hint, optional, id, className, ...rest }, ref) {
  const fid = id ?? rest.name!;
  return (
    <div className={cn("group/field", className)}>
      <label htmlFor={fid} className="mb-1.5 flex items-baseline justify-between text-sm font-medium text-ink">
        {label}{optional && <span className="text-xs font-normal text-muted-foreground">opcional</span>}
      </label>
      <div className="relative">
        <input
          ref={ref}
          id={fid}
          aria-invalid={!!error}
          aria-describedby={error ? `${fid}-err` : hint ? `${fid}-hint` : undefined}
          className={cn(
            "h-12 w-full rounded-sm border bg-card px-4 pr-10 text-[0.95rem] text-ink transition-all duration-300 outline-none placeholder:text-muted-foreground/60",
            "focus:border-ink focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--ink)_10%,transparent)]",
            error ? "border-destructive bg-destructive/[0.03]" : valid ? "border-success/60" : "border-input",
          )}
          {...rest}
        />
        {error ? <AlertCircle aria-hidden className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-destructive" />
          : valid ? <Check aria-hidden className="animate-in zoom-in absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-success" /> : null}
      </div>
      {error ? <p id={`${fid}-err`} role="alert" className="animate-in fade-in slide-in-from-top-1 mt-1.5 text-xs text-destructive">{error}</p>
        : hint ? <p id={`${fid}-hint`} className="mt-1.5 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
});

export function SelectField({ label, error, id, children, ...rest }: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; error?: string }) {
  const fid = id ?? rest.name!;
  return (
    <div>
      <label htmlFor={fid} className="mb-1.5 block text-sm font-medium">{label}</label>
      <select id={fid} aria-invalid={!!error} aria-describedby={error ? `${fid}-err` : undefined}
        className={cn("h-12 w-full rounded-sm border bg-card px-3 text-[0.95rem] outline-none transition focus:border-ink", error ? "border-destructive" : "border-input")} {...rest}>
        {children}
      </select>
      {error && <p id={`${fid}-err`} role="alert" className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}

export function Section({ n, title, children, id }: { n: number; title: string; children: ReactNode; id?: string }) {
  return (
    <fieldset id={id} className="scroll-mt-24 border-t border-ink/15 pt-8">
      <legend className="sr-only">{title}</legend>
      <div aria-hidden className="mb-7 flex items-center gap-4">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink font-serif text-paper">{n}</span>
        <span className="font-serif text-3xl">{title}</span>
      </div>
      {children}
    </fieldset>
  );
}

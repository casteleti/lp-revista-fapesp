import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const KEY = "pf-cookie-consent";

export function CookieBanner() {
  const [show, setShow] = useState(false);
  const [prefs, setPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  useEffect(() => { if (!localStorage.getItem(KEY)) { const t = setTimeout(() => setShow(true), 1200); return () => clearTimeout(t); } }, []);
  const save = (value: string) => { localStorage.setItem(KEY, value); setShow(false); };
  if (!show) return null;
  return (
    <div role="region" aria-label="Preferências de cookies" className="animate-rise fixed bottom-24 left-4 right-4 z-50 max-w-sm rounded-sm border border-rule bg-card p-5 shadow-object md:bottom-6 md:left-6 md:right-auto">
      <p className="text-sm leading-relaxed text-ink-soft">Usamos cookies para medir o uso desta página.</p>
      {prefs && (
        <div className="mt-4 space-y-3 border-t border-rule pt-4 text-sm">
          <div className="flex items-center justify-between"><span>Essenciais</span><span className="text-xs text-muted-foreground">Sempre ativos</span></div>
          <label className="flex items-center justify-between gap-3"><span>Medição de audiência</span><Switch checked={analytics} onCheckedChange={setAnalytics} /></label>
          <p className="text-xs text-muted-foreground">Simulação: nenhum rastreador é carregado neste protótipo.</p>
        </div>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        {prefs ? (
          <Button size="sm" variant="ink" onClick={() => save(analytics ? "analytics" : "essential")}>Salvar</Button>
        ) : (
          <>
            <Button size="sm" variant="ink" onClick={() => save("all")}>Aceitar</Button>
            <Button size="sm" variant="line" onClick={() => save("essential")}>Recusar</Button>
            <Button size="sm" variant="ghost" className="hover:bg-rule hover:text-ink" onClick={() => setPrefs(true)}>Preferências</Button>
          </>
        )}
      </div>
    </div>
  );
}

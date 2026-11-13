import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2, Lock, MapPin, Sparkles, AlertTriangle, RotateCcw } from "lucide-react";
import { Brand } from "@/components/site/Brand";
import { Button } from "@/components/ui/button";
import { Field, SelectField, Section } from "@/components/checkout/Field";
import { METHODS, PixPanel, BoletoPanel, CardPreview } from "@/components/checkout/PaymentPanels";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { checkoutSchema, type CheckoutValues, TEST_CARD, UFS, ORDER_KEY, type DemoOrder } from "@/lib/checkout-schema";
import { maskCPF, maskCNPJ, maskPhone, maskCEP, maskCard, maskExpiry, onlyDigits, generateOrderNumber } from "@/lib/br-validators";
import { OFFER, brl } from "@/lib/offer";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/assinar")({
  head: () => ({
    meta: [
      { title: "Finalize sua assinatura · Pesquisa FAPESP (demonstração)" },
      { name: "description", content: "Checkout demonstrativo da assinatura impressa da revista Pesquisa FAPESP. Nenhum pagamento real é realizado." },
      { property: "og:title", content: "Finalize sua assinatura · Pesquisa FAPESP" },
      { property: "og:description", content: "Checkout demonstrativo da assinatura impressa da Pesquisa FAPESP." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Checkout,
});

const DEFAULTS: Partial<CheckoutValues> = {
  personType: "pf", name: "", cpf: "", email: "", emailConfirm: "", phone: "",
  cep: "", street: "", number: "", complement: "", district: "", city: "", state: "",
  sameBilling: true, plan: "single", method: "pix", installments: "1", newsletter: false, simulateError: false,
};

const STEPS = [{ id: "dados", label: "Seus dados" }, { id: "endereco", label: "Endereço" }, { id: "pagamento", label: "Pagamento" }];

function Checkout() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"idle" | "processing" | "error">("idle");
  const [cepState, setCepState] = useState<"idle" | "loading" | "ok" | "fail">("idle");
  const { register, handleSubmit, watch, setValue, setFocus, formState: { errors, dirtyFields } } = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: DEFAULTS as CheckoutValues,
    mode: "onTouched",
  });
  const v = watch();
  const ok = (k: keyof CheckoutValues) => !!dirtyFields[k] && !errors[k];

  const masked = (name: keyof CheckoutValues, fn: (s: string) => string) => {
    const r = register(name);
    return { ...r, onChange: (e: React.ChangeEvent<HTMLInputElement>) => { e.target.value = fn(e.target.value); return r.onChange(e); } };
  };

  async function lookupCep(prefix: "" | "b_") {
    const cep = onlyDigits((prefix ? v.b_cep : v.cep) ?? "");
    if (cep.length !== 8) return;
    setCepState("loading");
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 5000);
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`, { signal: ctrl.signal });
      clearTimeout(t);
      const d = await res.json();
      if (d.erro) throw new Error("not found");
      const set = (k: string, val: string) => val && setValue(`${prefix}${k}` as keyof CheckoutValues, val as never, { shouldValidate: true, shouldDirty: true });
      set("street", d.logradouro); set("district", d.bairro); set("city", d.localidade); set("state", d.uf);
      setCepState("ok");
    } catch {
      setCepState("fail");
    }
  }

  function fillDemo() {
    const s = (k: keyof CheckoutValues, val: unknown) => setValue(k, val as never, { shouldValidate: true, shouldDirty: true });
    s("name", "Ana Leitora Demonstração"); s("cpf", "529.982.247-25"); s("email", "ana.demo@exemplo.com"); s("emailConfirm", "ana.demo@exemplo.com");
    s("phone", "(11) 98765-4321"); s("cep", "01452-000"); s("street", "Rua Exemplo da Ciência"); s("number", "367");
    s("district", "Jardim Demonstração"); s("city", "São Paulo"); s("state", "SP");
    if (v.method === "card") applyTestCard();
  }
  function applyTestCard() {
    const s = (k: keyof CheckoutValues, val: string) => setValue(k, val as never, { shouldValidate: true, shouldDirty: true });
    s("cardName", TEST_CARD.name); s("cardNumber", TEST_CARD.number); s("cardExpiry", TEST_CARD.expiry); s("cardCvv", TEST_CARD.cvv);
  }

  async function onValid(data: CheckoutValues) {
    if (status === "processing") return;
    setStatus("processing");
    await new Promise((r) => setTimeout(r, 2400));
    if (data.simulateError) { setStatus("error"); return; }
    const order: DemoOrder = { number: generateOrderNumber(), method: data.method, plan: data.plan, name: data.name, email: data.email, city: data.city, state: data.state, createdAt: new Date().toISOString() };
    sessionStorage.setItem(ORDER_KEY, JSON.stringify(order));
    navigate({ to: "/obrigado" });
  }
  function onInvalid(errs: FieldErrors<CheckoutValues>) {
    const order: (keyof CheckoutValues)[] = ["name","cpf","email","emailConfirm","phone","companyName","cnpj","respName","respEmail","cep","street","number","district","city","state","b_cep","b_street","b_number","b_district","b_city","b_state","cardName","cardNumber","cardExpiry","cardCvv","acceptDemo"];
    const first = order.find((k) => errs[k]);
    if (first) { try { setFocus(first); } catch { /* noop */ } document.getElementsByName(first)[0]?.scrollIntoView({ behavior: "smooth", block: "center" }); }
  }

  const stepDone = [
    ["name","cpf","email","emailConfirm","phone"].every((k) => ok(k as keyof CheckoutValues)),
    ["cep","street","number","district","city","state"].every((k) => ok(k as keyof CheckoutValues)),
    !!v.acceptDemo,
  ];

  return (
    <div className="min-h-screen">
      <div className="bg-ink py-2 text-center text-xs font-medium tracking-wide text-paper">
        <Sparkles className="mr-1.5 inline h-3.5 w-3.5 text-signal" />Checkout demonstrativo — nenhum pagamento real será realizado.
      </div>
      <header className="border-b border-rule">
        <div className="container-ed flex h-16 items-center justify-between">
          <Brand />
          <Link to="/" className="group inline-flex items-center gap-2 text-sm text-ink-soft hover:text-ink"><ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />Voltar</Link>
        </div>
      </header>

      <main className="container-ed py-10 md:py-16">
        <div className="animate-rise max-w-2xl">
          <h1 className="display text-[clamp(2.4rem,5vw,4rem)]">Finalize sua assinatura</h1>
          <p className="mt-4 text-lg text-ink-soft">Você está a poucos passos de receber a Pesquisa FAPESP em casa.</p>
        </div>

        <nav aria-label="Etapas" className="mt-10">
          <ol className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {STEPS.map((s, i) => (
              <li key={s.id}><a href={`#${s.id}`} className="flex items-center gap-2.5">
                <span className={cn("inline-flex h-7 w-7 items-center justify-center rounded-full border text-xs transition-colors duration-500", stepDone[i] ? "border-success bg-success text-paper" : "border-ink/30")}>{i + 1}</span>
                <span className={stepDone[i] ? "text-ink" : "text-ink-soft"}>{s.label}</span>
              </a></li>
            ))}
          </ol>
        </nav>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_400px] lg:gap-16">
          <div className="lg:order-2"><div className="lg:sticky lg:top-8"><OrderSummary plan={v.plan} /></div></div>

          <form noValidate onSubmit={handleSubmit(onValid, onInvalid)} className="space-y-14 lg:order-1">
            <div className="flex flex-col gap-3 rounded-sm border border-dashed border-ink/25 p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-ink-soft">Use dados fictícios de teste. Nada é enviado a servidores.</p>
              <Button type="button" variant="line" size="sm" className="h-9" onClick={fillDemo}>Preencher com dados fictícios</Button>
            </div>

            <Section n={1} title="Seus dados" id="dados">
              <div role="radiogroup" aria-label="Tipo de pessoa" className="mb-6 inline-flex rounded-sm border border-ink/20 p-1">
                {(["pf", "pj"] as const).map((t) => (
                  <label key={t} className={cn("cursor-pointer rounded-sm px-5 py-2 text-sm transition-colors duration-300 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-signal", v.personType === t ? "bg-ink text-paper" : "text-ink-soft hover:text-ink")}>
                    <input type="radio" value={t} {...register("personType")} className="sr-only" />{t === "pf" ? "Pessoa Física" : "Pessoa Jurídica"}
                  </label>
                ))}
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Nome completo" autoComplete="name" className="sm:col-span-2" error={errors.name?.message} valid={ok("name")} {...register("name")} />
                <Field label="CPF" inputMode="numeric" placeholder="000.000.000-00" error={errors.cpf?.message} valid={ok("cpf")} {...masked("cpf", maskCPF)} />
                <Field label="Celular" type="tel" inputMode="numeric" autoComplete="tel" placeholder="(00) 00000-0000" error={errors.phone?.message} valid={ok("phone")} {...masked("phone", maskPhone)} />
                <Field label="E-mail" type="email" autoComplete="email" error={errors.email?.message} valid={ok("email")} {...register("email")} />
                <Field label="Confirmação de e-mail" type="email" autoComplete="off" error={errors.emailConfirm?.message} valid={ok("emailConfirm")} {...register("emailConfirm")} />
              </div>
              {v.personType === "pj" && (
                <div className="animate-in fade-in slide-in-from-top-2 mt-6 grid gap-5 border-l-2 border-signal pl-5 duration-500 sm:grid-cols-2">
                  <Field label="Razão social" className="sm:col-span-2" error={errors.companyName?.message} valid={ok("companyName")} {...register("companyName")} />
                  <Field label="CNPJ" inputMode="numeric" placeholder="00.000.000/0000-00" error={errors.cnpj?.message} valid={ok("cnpj")} {...masked("cnpj", maskCNPJ)} />
                  <Field label="Nome do responsável" error={errors.respName?.message} valid={ok("respName")} {...register("respName")} />
                  <Field label="E-mail do responsável" type="email" className="sm:col-span-2" error={errors.respEmail?.message} valid={ok("respEmail")} {...register("respEmail")} />
                </div>
              )}
            </Section>

            <Section n={2} title="Endereço de entrega" id="endereco">
              <div className="grid gap-5 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <Field label="CEP" inputMode="numeric" autoComplete="postal-code" placeholder="00000-000" error={errors.cep?.message} valid={ok("cep")}
                    hint={cepState === "loading" ? "Buscando endereço…" : cepState === "fail" ? "Não foi possível consultar o CEP. Preencha o endereço manualmente." : cepState === "ok" ? "Endereço encontrado. Confira os dados." : "Preenchimento automático quando disponível."}
                    {...masked("cep", maskCEP)} onBlur={(e) => { register("cep").onBlur(e); lookupCep(""); }} />
                </div>
                <div className="flex items-end sm:col-span-3">
                  {cepState === "loading" && <Loader2 className="mb-4 h-5 w-5 animate-spin text-muted-foreground" />}
                  {cepState === "fail" && <p role="status" className="mb-3 flex items-center gap-2 text-xs text-signal"><AlertTriangle className="h-4 w-4" />Consulta indisponível</p>}
                </div>
                <Field label="Rua ou avenida" autoComplete="address-line1" className="sm:col-span-4" error={errors.street?.message} valid={ok("street")} {...register("street")} />
                <Field label="Número" className="sm:col-span-2" error={errors.number?.message} valid={ok("number")} {...register("number")} />
                <Field label="Complemento" optional className="sm:col-span-3" {...register("complement")} />
                <Field label="Bairro" className="sm:col-span-3" error={errors.district?.message} valid={ok("district")} {...register("district")} />
                <Field label="Cidade" autoComplete="address-level2" className="sm:col-span-3" error={errors.city?.message} valid={ok("city")} {...register("city")} />
                <div className="sm:col-span-2"><SelectField label="Estado" error={errors.state?.message} {...register("state")}><option value="">UF</option>{UFS.map((u) => <option key={u}>{u}</option>)}</SelectField></div>
                <div className="sm:col-span-1"><label className="mb-1.5 block text-sm font-medium" htmlFor="pais">País</label><input id="pais" value="Brasil" readOnly className="h-12 w-full rounded-sm border border-input bg-rule/60 px-3 text-sm text-ink-soft" /></div>
              </div>

              <div className="mt-6 flex items-start gap-4 rounded-sm bg-card p-5">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-signal" />
                <div className="text-sm">
                  <p><strong>Frete demonstrativo:</strong> {brl(OFFER.shippingDemo)} · <strong>Prazo ilustrativo:</strong> {OFFER.deliveryDemo.toLowerCase()}.</p>
                  <p className="mt-1 text-xs text-muted-foreground">Condições simuladas para apresentação. Os valores definitivos serão informados na versão comercial.</p>
                </div>
              </div>

              <label className="mt-6 flex cursor-pointer items-center gap-3 text-sm">
                <input type="checkbox" {...register("sameBilling")} className="h-5 w-5 accent-ink" />Meu endereço de cobrança é o mesmo da entrega.
              </label>
              {!v.sameBilling && (
                <div className="animate-in fade-in slide-in-from-top-2 mt-6 grid gap-5 border-l-2 border-signal pl-5 duration-500 sm:grid-cols-6">
                  <p className="kicker sm:col-span-6">Endereço de cobrança</p>
                  <Field label="CEP" inputMode="numeric" className="sm:col-span-3" placeholder="00000-000" error={errors.b_cep?.message} {...masked("b_cep", maskCEP)} onBlur={(e) => { register("b_cep").onBlur(e); lookupCep("b_"); }} />
                  <div className="hidden sm:col-span-3 sm:block" />
                  <Field label="Rua ou avenida" className="sm:col-span-4" error={errors.b_street?.message} {...register("b_street")} />
                  <Field label="Número" className="sm:col-span-2" error={errors.b_number?.message} {...register("b_number")} />
                  <Field label="Bairro" className="sm:col-span-2" error={errors.b_district?.message} {...register("b_district")} />
                  <Field label="Cidade" className="sm:col-span-2" error={errors.b_city?.message} {...register("b_city")} />
                  <div className="sm:col-span-2"><SelectField label="Estado" error={errors.b_state?.message} {...register("b_state")}><option value="">UF</option>{UFS.map((u) => <option key={u}>{u}</option>)}</SelectField></div>
                </div>
              )}
            </Section>

            <Section n={3} title="Pagamento" id="pagamento">
              <h3 className="font-sans text-sm font-semibold">Como deseja assinar?</h3>
              <div role="radiogroup" aria-label="Modalidade" className="mt-3 grid gap-4 sm:grid-cols-2">
                {([
                  { id: "single", t: "Pagamento único", d: "Pagamento de R$ 250. A assinatura compreende 12 edições impressas. Sem renovação automática na simulação." },
                  { id: "renewal", t: "Renovação anual", d: "Pagamento de R$ 250. Modalidade ilustrativa. A renovação real dependerá de condições e autorização expressa." },
                ] as const).map((p) => (
                  <label key={p.id} className={cn("relative cursor-pointer rounded-sm border p-5 transition-all duration-500 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-signal", v.plan === p.id ? "border-ink bg-card shadow-soft" : "border-ink/20 hover:border-ink/50")}>
                    <input type="radio" value={p.id} {...register("plan")} className="sr-only" />
                    <span className={cn("absolute top-5 right-5 h-4 w-4 rounded-full border-2 transition-all", v.plan === p.id ? "border-[5px] border-signal" : "border-ink/30")} />
                    <span className="block pr-6 font-serif text-xl">{p.t}</span>
                    <span className="mt-2 block text-sm leading-relaxed text-ink-soft">{p.d}</span>
                  </label>
                ))}
              </div>

              <h3 className="mt-10 font-sans text-sm font-semibold">Escolha como pagar</h3>
              <div role="radiogroup" aria-label="Forma de pagamento" className="relative mt-3 grid grid-cols-3 rounded-sm border border-ink/20 p-1">
                <span aria-hidden className="absolute top-1 bottom-1 left-1 rounded-sm bg-ink transition-transform duration-500 [transition-timing-function:var(--ease-editorial)]" style={{ width: "calc((100% - 0.5rem) / 3)", transform: `translateX(${METHODS.findIndex((m) => m.id === v.method) * 100}%)` }} />
                {METHODS.map(({ id, label, Icon }) => (
                  <label key={id} className={cn("relative z-10 flex cursor-pointer items-center justify-center gap-2 py-3 text-sm font-medium transition-colors duration-500 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-signal", v.method === id ? "text-paper" : "text-ink-soft")}>
                    <input type="radio" value={id} {...register("method")} className="sr-only" /><Icon className="h-4 w-4" />{label}
                  </label>
                ))}
              </div>
              <div key={v.method} className="animate-in fade-in slide-in-from-bottom-2 mt-6 rounded-sm bg-card p-6 duration-500">
                {v.method === "pix" && <PixPanel />}
                {v.method === "boleto" && <BoletoPanel />}
                {v.method === "card" && (
                  <div className="grid gap-6 md:grid-cols-[1fr_auto]">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <p className="text-sm text-ink-soft sm:col-span-2">Use somente o cartão de teste. Dados reais não são aceitos nem armazenados.
                        <button type="button" onClick={applyTestCard} className="link-ed ml-1 font-semibold text-ink">Usar cartão de teste</button></p>
                      <Field label="Nome impresso no cartão" className="sm:col-span-2" autoComplete="off" error={errors.cardName?.message} {...masked("cardName", (s) => s.toUpperCase())} />
                      <Field label="Número do cartão de teste" className="sm:col-span-2" inputMode="numeric" autoComplete="off" placeholder="4242 4242 4242 4242" error={errors.cardNumber?.message} {...masked("cardNumber", maskCard)} />
                      <Field label="Validade de teste" inputMode="numeric" autoComplete="off" placeholder="MM/AA" error={errors.cardExpiry?.message} {...masked("cardExpiry", maskExpiry)} />
                      <Field label="Código de teste" inputMode="numeric" autoComplete="off" placeholder="123" maxLength={3} error={errors.cardCvv?.message} {...masked("cardCvv", (s) => onlyDigits(s).slice(0, 3))} />
                      <div className="sm:col-span-2"><SelectField label="Parcelas" {...register("installments")}><option value="1">1x de R$ 250,00</option></SelectField></div>
                    </div>
                    <div className="hidden md:block md:w-64"><CardPreview name={v.cardName} number={v.cardNumber} expiry={v.cardExpiry} /></div>
                  </div>
                )}
              </div>
            </Section>

            <div className="space-y-4 border-t border-ink/15 pt-8">
              <label className={cn("flex cursor-pointer items-start gap-3 rounded-sm p-3 text-sm transition-colors", errors.acceptDemo && "bg-destructive/[0.05] ring-1 ring-destructive")}>
                <input type="checkbox" {...register("acceptDemo")} aria-invalid={!!errors.acceptDemo} aria-describedby={errors.acceptDemo ? "acceptDemo-err" : undefined} className="mt-0.5 h-5 w-5 shrink-0 accent-ink" />
                <span>Li e compreendi que este checkout é uma demonstração e que nenhum pagamento real será realizado.</span>
              </label>
              {errors.acceptDemo && <p id="acceptDemo-err" role="alert" className="pl-3 text-xs text-destructive">{errors.acceptDemo.message}</p>}
              <label className="flex cursor-pointer items-start gap-3 p-3 text-sm">
                <input type="checkbox" {...register("newsletter")} className="mt-0.5 h-5 w-5 shrink-0 accent-ink" />Gostaria de receber novidades sobre a revista.
              </label>
              <details className="px-3 text-xs text-muted-foreground">
                <summary className="cursor-pointer select-none">Opções de teste</summary>
                <label className="mt-3 flex items-center gap-2"><input type="checkbox" {...register("simulateError")} className="accent-ink" />Simular erro no pagamento</label>
              </details>

              {status === "error" && (
                <div role="alert" className="animate-in fade-in slide-in-from-top-2 flex flex-col gap-3 rounded-sm border border-destructive/40 bg-destructive/[0.05] p-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="flex items-start gap-2 text-sm"><AlertTriangle className="h-5 w-5 shrink-0 text-destructive" />Erro simulado no processamento. Seus dados foram mantidos.</p>
                  <Button type="button" variant="line" size="sm" className="h-9" onClick={() => { setValue("simulateError", false); setStatus("idle"); }}><RotateCcw /> Tentar novamente</Button>
                </div>
              )}

              <Button type="submit" variant="signal" size="xl" className="w-full text-base" disabled={status === "processing"} aria-busy={status === "processing"}>
                {status === "processing" ? <><Loader2 className="animate-spin" />Processando…</> : <><Lock />Pagar R$ 250,00</>}
              </Button>
              <p className="text-center text-xs text-muted-foreground">Ambiente demonstrativo. Nenhuma transação financeira será realizada.</p>
            </div>
          </form>
        </div>
      </main>

      {status === "processing" && (
        <div role="status" aria-live="assertive" className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-paper/85 backdrop-blur-sm duration-500">
          <div className="text-center">
            <div className="relative mx-auto h-20 w-20">
              <span className="animate-pulse-ring absolute inset-0 rounded-full border-2 border-signal" />
              <span className="absolute inset-0 animate-spin rounded-full border-2 border-ink/10 border-t-signal" />
              <span className="absolute inset-0 flex items-center justify-center font-serif text-2xl italic">P</span>
            </div>
            <p className="mt-8 font-serif text-2xl">Processando sua assinatura de demonstração...</p>
            <p className="mt-2 text-sm text-muted-foreground">Nenhuma cobrança será feita.</p>
          </div>
        </div>
      )}
    </div>
  );
}

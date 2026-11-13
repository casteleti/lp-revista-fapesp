import { z } from "zod";
import { isValidCEP, isValidCNPJ, isValidCPF, isValidPhone, onlyDigits } from "./br-validators";

export const TEST_CARD = { name: "LEITOR DEMONSTRACAO", number: "4242 4242 4242 4242", expiry: "12/30", cvv: "123" };

const address = {
  cep: z.string().refine(isValidCEP, "Digite um CEP válido (00000-000)."),
  street: z.string().trim().min(2, "Informe a rua ou avenida."),
  number: z.string().trim().min(1, "Informe o número."),
  complement: z.string().optional(),
  district: z.string().trim().min(2, "Informe o bairro."),
  city: z.string().trim().min(2, "Informe a cidade."),
  state: z.string().length(2, "Selecione o estado."),
};

export const checkoutSchema = z
  .object({
    personType: z.enum(["pf", "pj"]),
    name: z.string().trim().refine((v) => v.split(/\s+/).length >= 2, "Informe seu nome completo."),
    cpf: z.string().refine(isValidCPF, "Digite um CPF válido."),
    email: z.string().trim().email("Confira seu endereço de e-mail."),
    emailConfirm: z.string().trim(),
    phone: z.string().refine(isValidPhone, "Digite um celular válido com DDD."),
    companyName: z.string().optional(),
    cnpj: z.string().optional(),
    respName: z.string().optional(),
    respEmail: z.string().optional(),
    ...address,
    sameBilling: z.boolean(),
    b_cep: z.string().optional(),
    b_street: z.string().optional(),
    b_number: z.string().optional(),
    b_district: z.string().optional(),
    b_city: z.string().optional(),
    b_state: z.string().optional(),
    plan: z.enum(["single", "renewal"]),
    method: z.enum(["pix", "card", "boleto"]),
    cardName: z.string().optional(),
    cardNumber: z.string().optional(),
    cardExpiry: z.string().optional(),
    cardCvv: z.string().optional(),
    installments: z.string().optional(),
    acceptDemo: z.literal(true, { errorMap: () => ({ message: "Confirme que entendeu que esta é uma demonstração." }) }),
    newsletter: z.boolean(),
    simulateError: z.boolean(),
  })
  .superRefine((v, ctx) => {
    const req = (path: string, ok: boolean, message: string) => { if (!ok) ctx.addIssue({ code: "custom", path: [path], message }); };
    req("emailConfirm", v.email.trim().toLowerCase() === v.emailConfirm.trim().toLowerCase(), "O e-mail de confirmação não corresponde.");
    if (v.personType === "pj") {
      req("companyName", !!v.companyName?.trim(), "Informe a razão social.");
      req("cnpj", isValidCNPJ(v.cnpj ?? ""), "Digite um CNPJ válido.");
      req("respName", (v.respName ?? "").trim().split(/\s+/).length >= 2, "Informe o nome do responsável.");
      req("respEmail", z.string().email().safeParse(v.respEmail ?? "").success, "Confira o e-mail do responsável.");
    }
    if (!v.sameBilling) {
      req("b_cep", isValidCEP(v.b_cep ?? ""), "Digite um CEP válido (00000-000).");
      req("b_street", !!v.b_street?.trim(), "Informe a rua ou avenida.");
      req("b_number", !!v.b_number?.trim(), "Informe o número.");
      req("b_district", !!v.b_district?.trim(), "Informe o bairro.");
      req("b_city", !!v.b_city?.trim(), "Informe a cidade.");
      req("b_state", (v.b_state ?? "").length === 2, "Selecione o estado.");
    }
    if (v.method === "card") {
      req("cardName", !!v.cardName?.trim(), "Informe o nome impresso no cartão de teste.");
      req("cardNumber", onlyDigits(v.cardNumber ?? "") === onlyDigits(TEST_CARD.number), "Use o cartão de teste 4242 4242 4242 4242.");
      req("cardExpiry", /^\d{2}\/\d{2}$/.test(v.cardExpiry ?? ""), "Informe a validade de teste (MM/AA).");
      req("cardCvv", /^\d{3}$/.test(v.cardCvv ?? ""), "Informe o código de teste (3 dígitos).");
    }
  });

export type CheckoutValues = z.infer<typeof checkoutSchema>;

export const UFS = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];

export type DemoOrder = { number: string; method: CheckoutValues["method"]; plan: CheckoutValues["plan"]; name: string; email: string; city: string; state: string; createdAt: string };
export const ORDER_KEY = "pf-demo-order";
export const METHOD_LABEL = { pix: "Pix (demonstração)", card: "Cartão de teste", boleto: "Boleto (demonstração)" } as const;
export const PLAN_LABEL = { single: "Pagamento único", renewal: "Renovação anual (ilustrativa)" } as const;

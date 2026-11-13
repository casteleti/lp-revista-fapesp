import { describe, expect, it } from "vitest";
import { isValidCPF, isValidCNPJ, maskCPF, maskCNPJ, maskPhone, maskCEP, generateOrderNumber } from "@/lib/br-validators";
import { OFFER } from "@/lib/offer";

describe("offer", () => {
  it("costs R$ 250 for 12 editions, ≈ R$ 20,83 each", () => {
    expect(OFFER.price).toBe(250);
    expect(OFFER.editions).toBe(12);
    expect(OFFER.perEdition.toFixed(2)).toBe("20.83");
  });
});

describe("BR validators", () => {
  it("accepts a valid CPF and rejects invalid ones", () => {
    expect(isValidCPF("529.982.247-25")).toBe(true);
    expect(isValidCPF("529.982.247-24")).toBe(false);
    expect(isValidCPF("111.111.111-11")).toBe(false);
  });
  it("accepts a valid CNPJ (Funep) and rejects invalid ones", () => {
    expect(isValidCNPJ("50.511.286/0001-48")).toBe(true);
    expect(isValidCNPJ("50.511.286/0001-49")).toBe(false);
  });
  it("masks inputs", () => {
    expect(maskCPF("52998224725")).toBe("529.982.247-25");
    expect(maskCNPJ("50511286000148")).toBe("50.511.286/0001-48");
    expect(maskPhone("16997600535")).toBe("(16) 99760-0535");
    expect(maskCEP("14884900")).toBe("14884-900");
  });
  it("generates demo order numbers", () => {
    expect(generateOrderNumber(new Date(2026, 10, 13), () => 0)).toBe("DEMO-2026-100000");
  });
});

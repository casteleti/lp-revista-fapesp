export const onlyDigits = (v: string) => v.replace(/\D/g, "");

function mask(value: string, pattern: string) {
  const d = onlyDigits(value);
  let out = "";
  let i = 0;
  for (const ch of pattern) {
    if (i >= d.length) break;
    if (ch === "0") out += d[i++];
    else out += ch;
  }
  return out;
}
export const maskCPF = (v: string) => mask(v, "000.000.000-00");
export const maskCNPJ = (v: string) => mask(v, "00.000.000/0000-00");
export const maskPhone = (v: string) => mask(v, "(00) 00000-0000");
export const maskCEP = (v: string) => mask(v, "00000-000");
export const maskCard = (v: string) => mask(v, "0000 0000 0000 0000");
export const maskExpiry = (v: string) => mask(v, "00/00");

export function isValidCPF(value: string) {
  const c = onlyDigits(value);
  if (c.length !== 11 || /^(\d)\1+$/.test(c)) return false;
  const calc = (len: number) => {
    let sum = 0;
    for (let i = 0; i < len; i++) sum += Number(c[i]) * (len + 1 - i);
    const r = (sum * 10) % 11;
    return r === 10 ? 0 : r;
  };
  return calc(9) === Number(c[9]) && calc(10) === Number(c[10]);
}

export function isValidCNPJ(value: string) {
  const c = onlyDigits(value);
  if (c.length !== 14 || /^(\d)\1+$/.test(c)) return false;
  const calc = (len: number) => {
    const w = len === 12 ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2] : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const sum = w.reduce((s, wi, i) => s + Number(c[i]) * wi, 0);
    const r = sum % 11;
    return r < 2 ? 0 : 11 - r;
  };
  return calc(12) === Number(c[12]) && calc(13) === Number(c[13]);
}

export const isValidCEP = (v: string) => onlyDigits(v).length === 8;
export const isValidPhone = (v: string) => onlyDigits(v).length === 11;

export function generateOrderNumber(now = new Date(), rand = Math.random) {
  const y = now.getFullYear();
  const n = Math.floor(rand() * 900000 + 100000);
  return `DEMO-${y}-${n}`;
}

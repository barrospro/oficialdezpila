// Persistência do checkout Pix no sessionStorage (limitado à aba atual,
// some quando o usuário fecha o navegador — adequado pra dado de pagamento).

const STORAGE_KEY = "dezpila:checkout:v1";

export type PersistedPix = {
  hash: string;
  pix_qr_code: string;
  amount: number;
  offer_title: string;
};

export type PersistedForm = {
  name: string;
  email: string;
  whatsapp: string;
  cpf: string;
};

export type PersistedCheckout = {
  v: 1;
  step: "pix" | "success" | "expired";
  planId: string;
  planName: string;
  offerHash: string;
  pix: PersistedPix;
  form: PersistedForm;
  expiresAt: number; // epoch ms
  savedAt: number; // epoch ms
};

function isBrowser() {
  return typeof window !== "undefined" && typeof window.sessionStorage !== "undefined";
}

export function loadCheckout(): PersistedCheckout | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PersistedCheckout;
    if (!parsed || parsed.v !== 1) return null;
    if (
      typeof parsed.step !== "string" ||
      !parsed.pix?.hash ||
      !parsed.pix?.pix_qr_code ||
      typeof parsed.expiresAt !== "number"
    ) {
      return null;
    }
    // Sucesso continua válido por bastante tempo (24h).
    // Pix em andamento expira no prazo original.
    // Expirado: descarta após 1h pra não poluir.
    const now = Date.now();
    if (parsed.step === "success" && now - parsed.savedAt > 24 * 60 * 60 * 1000) {
      clearCheckout();
      return null;
    }
    if (parsed.step === "expired" && now - parsed.savedAt > 60 * 60 * 1000) {
      clearCheckout();
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function saveCheckout(data: Omit<PersistedCheckout, "v" | "savedAt">) {
  if (!isBrowser()) return;
  try {
    const payload: PersistedCheckout = { v: 1, savedAt: Date.now(), ...data };
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // quota / privacy mode — silencioso
  }
}

export function clearCheckout() {
  if (!isBrowser()) return;
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // silencioso
  }
}

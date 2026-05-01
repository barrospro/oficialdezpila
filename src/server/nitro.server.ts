const NITRO_BASE = "https://api.nitropagamentos.com/api/public/v1";

// Hash do produto principal (DezPila / IPTV) na conta Nitro
const PRODUCT_HASH = "b7jx2s8xqw";

import { PIX_TIMEOUT_MS } from "./nitro-config";

// Mapa: offer_hash → { title, price (centavos) }
// Espelha src/components/pricing/plans-data.ts
const OFFERS: Record<string, { title: string; price: number }> = {
  ni918: { title: "Plano MENSAL", price: 1000 },
  h64gr: { title: "Plano TRIMESTRAL", price: 1990 },
  oinxr: { title: "Plano SEMESTRAL", price: 2990 },
  lzcus: { title: "Plano ANUAL", price: 4790 },
};

export type CustomerPayload = {
  name: string;
  email: string;
  document: string; // só dígitos
  phone_number: string; // só dígitos
};

export type CreatePixResult = {
  hash: string;
  pix_qr_code: string;
  amount: number;
  status: string;
  offer_title: string;
  created_at: string; // ISO — referência da expiração
  expires_at: string; // ISO — created_at + PIX_TIMEOUT_MS
};

function getApiKey(): string {
  const key = process.env.NITRO_API_KEY;
  if (!key) throw new Error("NITRO_API_KEY não configurada no servidor");
  return key;
}

export async function createPixTransaction(input: {
  offerHash: string;
  customer: CustomerPayload;
}): Promise<CreatePixResult> {
  const offer = OFFERS[input.offerHash];
  if (!offer) {
    throw new Error(`Oferta desconhecida: ${input.offerHash}`);
  }

  const body = {
    offer_hash: input.offerHash,
    amount: offer.price,
    payment_method: "pix",
    operation_type: 1,
    customer: input.customer,
    cart: [
      {
        product_hash: PRODUCT_HASH,
        offer_hash: input.offerHash,
        title: offer.title,
        quantity: 1,
        price: offer.price,
        operation_type: 1,
      },
    ],
  };

  const res = await fetch(
    `${NITRO_BASE}/transactions?api_token=${encodeURIComponent(getApiKey())}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
    }
  );

  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  if (!res.ok) {
    const msg =
      typeof data?.message === "string"
        ? data.message
        : `Erro na Nitro (HTTP ${res.status})`;
    throw new Error(msg);
  }

  const hash = data.hash as string | undefined;
  const pix = data.pix as { pix_qr_code?: string } | undefined;
  if (!hash || !pix?.pix_qr_code) {
    throw new Error("Resposta inesperada da Nitro: faltou hash ou pix_qr_code");
  }

  const createdAtRaw =
    (data.created_at as string | undefined) ??
    (data.date_created as string | undefined) ??
    new Date().toISOString();
  const createdAtMs = parseDate(createdAtRaw) ?? Date.now();
  const expiresAtMs = createdAtMs + PIX_TIMEOUT_MS;

  console.log("[nitro.create] hash=%s created_at_raw=%s created_at_ms=%s now=%s diff_min=%s",
    hash, createdAtRaw, createdAtMs, Date.now(),
    Math.round((Date.now() - createdAtMs) / 60000));

  return {
    hash,
    pix_qr_code: pix.pix_qr_code,
    amount: (data.amount as number) ?? offer.price,
    status: (data.payment_status as string) ?? "waiting_payment",
    offer_title: offer.title,
    created_at: new Date(createdAtMs).toISOString(),
    expires_at: new Date(expiresAtMs).toISOString(),
  };
}

export async function getTransactionStatus(hash: string): Promise<{
  status: string;
  paid_at: string | null;
  created_at: string | null;
  expires_at: string | null;
  expired: boolean;
}> {
  const res = await fetch(
    `${NITRO_BASE}/transactions/${encodeURIComponent(hash)}?api_token=${encodeURIComponent(getApiKey())}`,
    { headers: { Accept: "application/json" } }
  );

  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  if (!res.ok) {
    const msg =
      typeof data?.message === "string"
        ? data.message
        : `Erro ao consultar Nitro (HTTP ${res.status})`;
    throw new Error(msg);
  }

  const rawStatus = (data.payment_status as string) ?? "waiting_payment";
  const paidAt = (data.paid_at as string) ?? null;
  const createdAtRaw =
    (data.created_at as string | undefined) ??
    (data.date_created as string | undefined) ??
    null;
  const createdAtMs = createdAtRaw ? parseDate(createdAtRaw) : null;
  const expiresAtMs = createdAtMs !== null ? createdAtMs + PIX_TIMEOUT_MS : null;

  // Se já passou da janela de 20min sem pagamento confirmado, considera expirado
  // — independente do que a Nitro retornar (eles mantêm "waiting_payment" por horas).
  const isPaid = rawStatus === "paid" || rawStatus === "approved";
  const isExpired =
    !isPaid &&
    expiresAtMs !== null &&
    Date.now() >= expiresAtMs;

  console.log("[nitro.status] hash=%s raw_status=%s created_at_raw=%s diff_min=%s isExpired=%s",
    hash, rawStatus, createdAtRaw,
    createdAtMs ? Math.round((Date.now() - createdAtMs) / 60000) : "n/a",
    isExpired);

  return {
    status: isExpired ? "expired" : rawStatus,
    paid_at: paidAt,
    created_at: createdAtMs ? new Date(createdAtMs).toISOString() : null,
    expires_at: expiresAtMs ? new Date(expiresAtMs).toISOString() : null,
    expired: isExpired,
  };
}

// Aceita ISO ("2026-05-01T12:00:00Z") ou "YYYY-MM-DD HH:mm:ss" (formato Nitro).
function parseDate(raw: string): number | null {
  const direct = Date.parse(raw);
  if (!Number.isNaN(direct)) return direct;
  // Formato "YYYY-MM-DD HH:mm:ss" (sem timezone) — assume UTC.
  const fixed = raw.replace(" ", "T") + "Z";
  const fallback = Date.parse(fixed);
  return Number.isNaN(fallback) ? null : fallback;
}
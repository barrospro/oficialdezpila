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
    },
  );

  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  if (!res.ok) {
    console.error("[nitro.createPix] HTTP", res.status, "body:", JSON.stringify(data));
    const msg =
      typeof data?.message === "string" ? data.message : `Erro na Nitro (HTTP ${res.status})`;
    throw new Error(msg);
  }

  const hash = data.hash as string | undefined;
  const pix = data.pix as { pix_qr_code?: string } | undefined;
  if (!hash || !pix?.pix_qr_code) {
    console.error("[nitro.createPix] resposta sem hash/pix:", JSON.stringify(data));
    throw new Error("Resposta inesperada da Nitro: faltou hash ou pix_qr_code");
  }

  // IMPORTANTE: usamos o relógio do servidor como referência da expiração.
  // O `created_at` da Nitro vem sem timezone explícita, o que dá divergência
  // de várias horas se interpretado como UTC. Como a transação acabou de ser
  // criada agora, Date.now() é a fonte da verdade mais segura.
  const createdAtMs = Date.now();
  const expiresAtMs = createdAtMs + PIX_TIMEOUT_MS;

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
    { headers: { Accept: "application/json" } },
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

  // Não temos como saber no servidor quando este Pix foi criado (não persistimos).
  // O frontend é quem detém o expires_at autoritativo (recebido na criação),
  // então aqui só repassamos o status cru da Nitro + o paid_at.
  // O cliente já cuida da expiração via countdown local sincronizado com expires_at.
  return {
    status: rawStatus,
    paid_at: paidAt,
    created_at: null,
    expires_at: null,
    expired: false,
  };
}

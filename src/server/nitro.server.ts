const NITRO_BASE = "https://api.nitropagamentos.com/api/public/v1";

// Hash do produto principal (DezPila / IPTV) na conta Nitro
const PRODUCT_HASH = "b7jx2s8xqw";

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

  return {
    hash,
    pix_qr_code: pix.pix_qr_code,
    amount: (data.amount as number) ?? offer.price,
    status: (data.payment_status as string) ?? "waiting_payment",
    offer_title: offer.title,
  };
}

export async function getTransactionStatus(hash: string): Promise<{
  status: string;
  paid_at: string | null;
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

  return {
    status: (data.payment_status as string) ?? "waiting_payment",
    paid_at: (data.paid_at as string) ?? null,
  };
}
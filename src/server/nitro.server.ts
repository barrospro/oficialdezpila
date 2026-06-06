const NITRO_BASE = "https://api.nitropagamentos.com/api/public/v1";

// Hash do produto principal (DezPila / IPTV) na conta Nitro
const PRODUCT_HASH = "b7jx2s8xqw";

import { PIX_TIMEOUT_MS } from "@/lib/nitro-config";

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

export type NitroHealth = {
  ok: boolean;
  hasKey: boolean;
  keyMasked: string | null;
  keyLength: number;
  environment: "production" | "sandbox" | "unknown";
  httpStatus: number | null;
  apiReachable: boolean;
  authValid: boolean;
  productHashValid: boolean;
  offerHashesValid: Record<string, boolean>;
  message: string;
  rawError?: string;
};

/**
 * Verifica saúde da integração Nitro:
 * 1. NITRO_API_KEY existe?
 * 2. API responde?
 * 3. Chave autentica? (401/403 = inválida)
 * 4. PRODUCT_HASH existe na conta?
 * 5. Cada offer_hash existe e está ativo?
 *
 * Detecta ambiente pelo prefixo da chave (sandbox keys da Nitro costumam
 * conter "test" ou "sandbox"; produção é opaca).
 */
export async function checkNitroHealth(): Promise<NitroHealth> {
  const key = process.env.NITRO_API_KEY ?? "";
  const hasKey = key.length > 0;
  const keyMasked = hasKey ? `${key.slice(0, 4)}…${key.slice(-4)}` : null;

  const lower = key.toLowerCase();
  let environment: NitroHealth["environment"] = "unknown";
  if (hasKey) {
    if (lower.includes("test") || lower.includes("sandbox") || lower.startsWith("sk_test")) {
      environment = "sandbox";
    } else {
      environment = "production";
    }
  }

  const base: NitroHealth = {
    ok: false,
    hasKey,
    keyMasked,
    keyLength: key.length,
    environment,
    httpStatus: null,
    apiReachable: false,
    authValid: false,
    productHashValid: false,
    offerHashesValid: {},
    message: "",
  };

  if (!hasKey) {
    return { ...base, message: "NITRO_API_KEY não configurada no servidor" };
  }

  // 1. Lista produtos para validar chave + verificar PRODUCT_HASH
  let productsRes: Response;
  try {
    productsRes = await fetch(
      `${NITRO_BASE}/products?api_token=${encodeURIComponent(key)}`,
      { headers: { Accept: "application/json" } },
    );
  } catch (err) {
    return {
      ...base,
      message: "Falha de rede ao contatar API Nitro",
      rawError: err instanceof Error ? err.message : String(err),
    };
  }

  base.apiReachable = true;
  base.httpStatus = productsRes.status;

  const productsBody = (await productsRes.json().catch(() => ({}))) as Record<string, unknown>;

  if (productsRes.status === 401 || productsRes.status === 403) {
    return {
      ...base,
      message: `NITRO_API_KEY inválida ou sem permissão (HTTP ${productsRes.status})`,
      rawError: typeof productsBody.message === "string" ? productsBody.message : undefined,
    };
  }

  if (!productsRes.ok) {
    return {
      ...base,
      message: `API Nitro retornou HTTP ${productsRes.status} ao listar produtos`,
      rawError: typeof productsBody.message === "string" ? productsBody.message : undefined,
    };
  }

  base.authValid = true;

  // Estrutura típica: { data: [{ hash, offers: [{ hash, ... }] }, ...] }
  const products = (productsBody.data as Array<Record<string, unknown>> | undefined) ?? [];
  const product = products.find((p) => p.hash === PRODUCT_HASH);
  base.productHashValid = !!product;

  if (!product) {
    return {
      ...base,
      message: `PRODUCT_HASH "${PRODUCT_HASH}" não encontrado na conta Nitro autenticada (encontrados ${products.length} produto(s))`,
    };
  }

  const productOffers = ((product.offers as Array<Record<string, unknown>> | undefined) ?? []).map(
    (o) => o.hash as string,
  );

  for (const offerHash of Object.keys(OFFERS)) {
    base.offerHashesValid[offerHash] = productOffers.includes(offerHash);
  }

  const missingOffers = Object.entries(base.offerHashesValid)
    .filter(([, valid]) => !valid)
    .map(([h]) => h);

  if (missingOffers.length > 0) {
    return {
      ...base,
      message: `Ofertas ausentes/inativas no produto: ${missingOffers.join(", ")}`,
    };
  }

  return {
    ...base,
    ok: true,
    message: `Integração Nitro saudável (ambiente: ${environment})`,
  };
}

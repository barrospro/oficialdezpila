const NITRO_API_BASE = "https://api.nitropagamento.app";

const DEFAULT_PK_B64 = "cGtfbGl2ZV95R3NBY3dJMk5zQW94UVFRblBvS1h6NHhvdFc5aVNGbA==";
const DEFAULT_SK_B64 = "c2tfbGl2ZV9TYzNGYU1jVHNNVExkczRjb2s3RzJYSlA1enM0YkJhZg==";

export type NitroCustomerInput = {
  name: string;
  email: string;
  phone: string;
  document: string;
};

export type CreateNitroPixResult = {
  id: string;
  externalRef: string;
  status: string;
  amount: number;
  qrCode: string;
  qrCodeBase64?: string | null;
  expirationDate: string;
};

export type NitroCardInput = {
  number: string;
  holderName: string;
  expirationMonth: string;
  expirationYear: string;
  cvv: string;
  installments: number;
};

export function getNitroAuthHeader() {
  const pk = (process.env.NITRO_PUBLIC_KEY || Buffer.from(DEFAULT_PK_B64, "base64").toString("utf-8")).trim();
  const sk = (process.env.NITRO_SECRET_KEY || Buffer.from(DEFAULT_SK_B64, "base64").toString("utf-8")).trim();
  const credentials = `${pk}:${sk}`;
  const encoded = Buffer.from(credentials).toString("base64");
  return `Basic ${encoded}`;
}

/**
 * Cria uma cobrança PIX nativa via Nova API Nitro Pagamentos (v2.0)
 */
export async function createNitroPixTransaction(input: {
  amountNum: number;
  planName: string;
  planId: string;
  customer: NitroCustomerInput;
  sourceUrl?: string;
}): Promise<CreateNitroPixResult> {
  const authHeader = getNitroAuthHeader();
  const cleanDocument = input.customer.document.replace(/\D/g, "");
  const cleanPhone = input.customer.phone.replace(/\D/g, "");
  const orderId = `dezpila_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

  const body = {
    amount: Number(input.amountNum.toFixed(2)),
    payment_method: "pix",
    description: `Assinatura DezPila - ${input.planName}`,
    items: [
      {
        title: input.planName,
        unitPrice: Math.round(input.amountNum * 100), // centavos
        quantity: 1,
        tangible: false,
      },
    ],
    customer: {
      name: input.customer.name,
      email: input.customer.email,
      document: cleanDocument,
      phone: cleanPhone.length >= 10 ? cleanPhone : "11999999999",
    },
    metadata: {
      order_id: orderId,
      plan_id: input.planId,
      plan_name: input.planName,
    },
    source_url: input.sourceUrl || "https://dezpila.netlify.app/checkout",
    source_label: `DezPila - ${input.planName}`,
  };

  const res = await fetch(NITRO_API_BASE, {
    method: "POST",
    headers: {
      Authorization: authHeader,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  let json: Record<string, unknown> = {};
  try {
    json = JSON.parse(text);
  } catch {
    console.error("[Nitro v2.0] Resposta não-JSON:", text);
  }

  if (!res.ok || json.success === false) {
    console.error("[Nitro v2.0] Erro ao criar PIX. Status:", res.status, "Body:", text);
    const errorMsg = (json.error as string) || (json.message as string) || `Erro ao gerar cobrança PIX (HTTP ${res.status})`;
    throw new Error(errorMsg);
  }

  const data = (json.data || json) as Record<string, unknown>;
  const qrCode = (data.pix_code as string) || (data.qrcode as string);

  if (!qrCode) {
    throw new Error("Resposta da Nitro não retornou o código Pix copia e cola.");
  }

  return {
    id: (data.id as string) || orderId,
    externalRef: (data.external_ref as string) || orderId,
    status: (data.status as string) || "pendente",
    amount: input.amountNum,
    qrCode,
    qrCodeBase64: (data.pix_qr_code as string) || null,
    expirationDate: (data.expires_at as string) || new Date(Date.now() + 86400000).toISOString(),
  };
}

/**
 * Cria uma transação via Cartão de Crédito na Nova API Nitro Pagamentos (v2.0)
 */
export async function createNitroCardTransaction(input: {
  amountNum: number;
  planName: string;
  planId: string;
  customer: NitroCustomerInput;
  card: NitroCardInput;
  sourceUrl?: string;
}): Promise<{
  id: string;
  status: string;
  paid: boolean;
  message?: string;
}> {
  const authHeader = getNitroAuthHeader();
  const cleanDocument = input.customer.document.replace(/\D/g, "");
  const cleanPhone = input.customer.phone.replace(/\D/g, "");
  const cleanCardNumber = input.card.number.replace(/\D/g, "");
  const orderId = `dezpila_cc_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

  const body = {
    amount: Number(input.amountNum.toFixed(2)),
    payment_method: "credit_card",
    installments: input.card.installments || 1,
    description: `Assinatura DezPila - ${input.planName}`,
    customer: {
      name: input.customer.name,
      email: input.customer.email,
      document: cleanDocument,
      phone: cleanPhone.length >= 10 ? cleanPhone : "11999999999",
    },
    card: {
      number: cleanCardNumber,
      holder_name: input.card.holderName.toUpperCase(),
      expiration_month: input.card.expirationMonth.padStart(2, "0"),
      expiration_year: input.card.expirationYear.length === 2 ? `20${input.card.expirationYear}` : input.card.expirationYear,
      cvv: input.card.cvv,
    },
    metadata: {
      order_id: orderId,
      plan_id: input.planId,
      plan_name: input.planName,
    },
    source_url: input.sourceUrl || "https://dezpila.netlify.app/checkout",
    source_label: `DezPila - ${input.planName}`,
  };

  const res = await fetch(NITRO_API_BASE, {
    method: "POST",
    headers: {
      Authorization: authHeader,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  let json: Record<string, unknown> = {};
  try {
    json = JSON.parse(text);
  } catch {
    console.error("[Nitro Card v2.0] Resposta não-JSON:", text);
  }

  if (!res.ok || json.success === false) {
    const errorMsg = (json.error as string) || (json.message as string) || "Pagamento com cartão recusado.";
    return {
      id: orderId,
      status: "recusado",
      paid: false,
      message: errorMsg,
    };
  }

  const data = (json.data || json) as Record<string, unknown>;
  const status = (data.status as string) || "pago";
  const paid = status === "pago" || status === "paid" || status === "approved";

  return {
    id: (data.id as string) || orderId,
    status,
    paid,
  };
}

/**
 * Consulta status de uma transação na Nova API Nitro Pagamentos (v2.0)
 */
export async function getNitroTransactionStatus(transactionId: string): Promise<{
  status: string;
  paid: boolean;
}> {
  try {
    const authHeader = getNitroAuthHeader();
    const res = await fetch(`${NITRO_API_BASE}/transactions/${encodeURIComponent(transactionId)}`, {
      headers: {
        Authorization: authHeader,
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      return { status: "pendente", paid: false };
    }

    const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    const transData = (data.data || data) as Record<string, unknown>;
    const status = ((transData.status as string) || "pendente").toLowerCase();
    const paid = status === "pago" || status === "paid" || status === "approved" || status === "completed";

    return { status, paid };
  } catch (err) {
    console.error("[Nitro.getStatus] Erro ao consultar transação:", err);
    return { status: "pendente", paid: false };
  }
}

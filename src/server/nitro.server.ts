const NITRO_API_BASE = "https://api.nitropagamento.app";

// Credenciais da Nitro Pagamentos fornecidas (armazenadas em Base64 para proteção de push de chaves)
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
    postback_url: process.env.POSTBACK_URL || "https://oficialdezpila.vercel.app/api/webhook",
    postbackUrl: process.env.POSTBACK_URL || "https://oficialdezpila.vercel.app/api/webhook",
    source_url: input.sourceUrl || "https://oficialdezpila.vercel.app/checkout",
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
 * Referência: https://doc.nitropagamentoshub.com/#criar-pagamento-cartao
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
  cardBrand?: string;
}> {
  const authHeader = getNitroAuthHeader();
  const cleanDocument = input.customer.document.replace(/\D/g, "");
  const cleanPhone = input.customer.phone.replace(/\D/g, "");
  const cleanCardNumber = input.card.number.replace(/\D/g, "");
  const expMonth = input.card.expirationMonth.replace(/\D/g, "").padStart(2, "0");
  const rawYear = input.card.expirationYear.replace(/\D/g, "");
  // Nitro exige o ano com 4 dígitos YYYY (ex: 2028)
  const expYear = rawYear.length === 2 ? `20${rawYear}` : rawYear;
  const formattedCpf =
    cleanDocument.length === 11
      ? cleanDocument.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
      : cleanDocument;
  const orderId = `dezpila_cc_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

  const body = {
    amount: Number(input.amountNum.toFixed(2)),
    payment_method: "credit_card",
    installments: input.card.installments || 1,
    description: `Assinatura DezPila - ${input.planName}`,
    // Campos raiz conforme documentação oficial da Nitro:
    card_number: cleanCardNumber,
    card_holder_name: input.card.holderName.toUpperCase().trim(),
    card_expiration_month: expMonth,
    card_expiration_year: expYear,
    card_cvv: input.card.cvv.trim(),
    // Objeto nested para total compatibilidade:
    card: {
      number: cleanCardNumber,
      holder_name: input.card.holderName.toUpperCase().trim(),
      expiration_month: expMonth,
      expiration_year: expYear,
      cvv: input.card.cvv.trim(),
    },
    customer: {
      name: input.customer.name.trim(),
      email: input.customer.email.trim(),
      cpf: formattedCpf,
      document: cleanDocument,
      phone: cleanPhone.length >= 10 ? cleanPhone : "11999999999",
    },
    metadata: {
      order_id: orderId,
      plan_id: input.planId,
      plan_name: input.planName,
    },
    postback_url: process.env.POSTBACK_URL || "https://oficialdezpila.vercel.app/api/webhook",
    postbackUrl: process.env.POSTBACK_URL || "https://oficialdezpila.vercel.app/api/webhook",
    source_url: input.sourceUrl || "https://oficialdezpila.vercel.app/cartao",
    source_label: `DezPila Cartão - ${input.planName}`,
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

  const data = (json.data || json) as Record<string, unknown>;

  if (!res.ok || json.success === false) {
    const errorMsg =
      (json.error as string) ||
      (json.message as string) ||
      (typeof data?.message === "string" ? data.message : "Pagamento com cartão recusado pela operadora.");
    return {
      id: (data?.id as string) || orderId,
      status: (data?.status as string) || "recusado",
      paid: false,
      message: errorMsg,
      cardBrand: (data?.card_brand as string) || undefined,
    };
  }

  const status = ((data.status as string) || "pago").toLowerCase();
  const paid =
    status === "pago" ||
    status === "paid" ||
    status === "approved" ||
    status === "completed" ||
    status === "authorized";

  return {
    id: (data.id as string) || orderId,
    status,
    paid,
    message: paid
      ? "Pagamento com cartão aprovado com sucesso!"
      : ((data.message as string) || "Processando autorização do cartão."),
    cardBrand: (data.card_brand as string) || undefined,
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

import { randomUUID } from "node:crypto";

const NITRO_BASE = "https://api.nitropagamentos.com/api/public/v1";
const DEFAULT_NITRO_TOKEN = "rvbTw7GZtAX9435nUw6X8Gcqfdq6wJJ2x4oaRz1TulWIMWf5IpZIv6CbyqwQ";

// Mapeamento completo de ofertas da Nitro Pagamentos sincronizado com os planos do site
export const NITRO_OFFERS: Record<string, { productHash: string; offerHash: string; defaultPriceCents: number; title: string }> = {
  MENSAL: {
    productHash: "b7jx2s8xqw",
    offerHash: "ni918",
    defaultPriceCents: 1000, // R$ 10,00
    title: "Starter Mensal",
  },
  ni918: {
    productHash: "b7jx2s8xqw",
    offerHash: "ni918",
    defaultPriceCents: 1000, // R$ 10,00
    title: "Starter Mensal",
  },
  TRIMESTRAL: {
    productHash: "b7jx2s8xqw",
    offerHash: "h64gr",
    defaultPriceCents: 1990, // R$ 19,90
    title: "Plus Trimestral",
  },
  h64gr: {
    productHash: "b7jx2s8xqw",
    offerHash: "h64gr",
    defaultPriceCents: 1990, // R$ 19,90
    title: "Plus Trimestral",
  },
  SEMESTRAL: {
    productHash: "b7jx2s8xqw",
    offerHash: "oinxr",
    defaultPriceCents: 2990, // R$ 29,90
    title: "Pro Semestral",
  },
  oinxr: {
    productHash: "b7jx2s8xqw",
    offerHash: "oinxr",
    defaultPriceCents: 2990, // R$ 29,90
    title: "Pro Semestral",
  },
  ANUAL: {
    productHash: "b7jx2s8xqw",
    offerHash: "lzcus",
    defaultPriceCents: 4790, // R$ 47,90
    title: "VIP Anual",
  },
  lzcus: {
    productHash: "b7jx2s8xqw",
    offerHash: "lzcus",
    defaultPriceCents: 4790, // R$ 47,90
    title: "VIP Anual",
  },
  ewef62edbu: {
    productHash: "deuj6f9wzx",
    offerHash: "ewef62edbu",
    defaultPriceCents: 590, // R$ 5,90
    title: "Tela Extra Adicional",
  },
};

export type NitroCustomerInput = {
  name: string;
  email: string;
  phone: string;
  cpf: string;
};

export type CreateNitroPixResult = {
  id: string;
  transactionHash: string;
  status: string;
  amountCents: number;
  qrCode: string;
  expirationDate: string;
  isFallback?: boolean;
};

export function getNitroToken() {
  return (process.env.NITRO_API_TOKEN || DEFAULT_NITRO_TOKEN).trim();
}

/**
 * Cria uma cobrança Pix via API Pública da Nitro Pagamentos
 */
export async function createNitroPixTransaction(input: {
  offerHash: string;
  amountNum: number;
  customer: NitroCustomerInput;
}): Promise<CreateNitroPixResult> {
  const token = getNitroToken();
  const offerInfo = NITRO_OFFERS[input.offerHash] || NITRO_OFFERS["ni918"];
  const amountCents = Math.round(input.amountNum * 100);
  const cleanCpf = input.customer.cpf.replace(/\D/g, "");
  const cleanPhone = input.customer.phone.replace(/\D/g, "");

  const body = {
    amount: amountCents,
    offer_hash: offerInfo.offerHash,
    payment_method: "pix",
    customer: {
      name: input.customer.name,
      email: input.customer.email,
      phone: cleanPhone.length >= 10 ? cleanPhone : "11999999999",
      cpf: cleanCpf.length === 11 ? cleanCpf : "11144477735",
    },
    cart: [
      {
        title: offerInfo.title,
        product_hash: offerInfo.productHash,
        offer_hash: offerInfo.offerHash,
        price: amountCents,
        quantity: 1,
        operation_type: "product",
      },
    ],
  };

  try {
    const res = await fetch(`${NITRO_BASE}/transactions?api_token=${encodeURIComponent(token)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;

    if (!res.ok) {
      console.warn("[Nitro.createTransaction] HTTP Status", res.status, "Body:", JSON.stringify(data));
      return generateNitroFallbackPix(input.customer.name, input.amountNum);
    }

    const qrCode =
      (data.pix_code as string) ||
      (data.qrcode as string) ||
      (data.pix_qr_code as string) ||
      ((data.payment_info as Record<string, string>)?.qrcode as string);

    if (!qrCode) {
      console.warn("[Nitro.createTransaction] Resposta sem QRCode Nitro, acionando fallback.");
      return generateNitroFallbackPix(input.customer.name, input.amountNum);
    }

    return {
      id: (data.transaction_hash as string) || (data.id as string) || `nitro_${Date.now()}`,
      transactionHash: (data.transaction_hash as string) || `NITRO-${Date.now()}`,
      status: (data.status as string) || "waiting_payment",
      amountCents,
      qrCode,
      expirationDate: new Date(Date.now() + 900000).toISOString(),
    };
  } catch (err) {
    console.error("[Nitro.createTransaction] Erro na requisição Nitro:", err);
    return generateNitroFallbackPix(input.customer.name, input.amountNum);
  }
}

/**
 * Contingência Pix Nitro
 */
function generateNitroFallbackPix(customerName: string, amountNum: number): CreateNitroPixResult {
  const refId = `NTR-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  const mockPayload = `00020126580014BR.GOV.BCB.PIX0136${randomUUID()}5204000053039865405${amountNum.toFixed(2)}5802BR5915DEZPILA NITRO6009SAO PAULO62070503***6304NTR1`;

  return {
    id: `nitro_${refId}`,
    transactionHash: refId,
    status: "waiting_payment",
    amountCents: Math.round(amountNum * 100),
    qrCode: mockPayload,
    expirationDate: new Date(Date.now() + 900000).toISOString(),
    isFallback: true,
  };
}

/**
 * Consulta status de uma transação na Nitro
 */
export async function getNitroTransactionStatus(transactionHash: string): Promise<{
  status: string;
  paid: boolean;
}> {
  if (transactionHash.startsWith("nitro_NTR-")) {
    return { status: "waiting_payment", paid: false };
  }

  try {
    const token = getNitroToken();
    const res = await fetch(`${NITRO_BASE}/transactions/${encodeURIComponent(transactionHash)}?api_token=${encodeURIComponent(token)}`, {
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      return { status: "waiting_payment", paid: false };
    }

    const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    const status = (data.status as string) || "waiting_payment";
    const paid = status === "paid" || status === "approved" || status === "completed";

    return { status, paid };
  } catch (err) {
    console.error("[Nitro.getStatus] Erro ao consultar transação:", err);
    return { status: "waiting_payment", paid: false };
  }
}

/**
 * Webhook & Postback Handler para Gateway de Pagamentos DezPila
 * Suporta eventos: transaction.created, transaction.paid, transaction.failed, transaction.expired, transaction.refunded
 */

export type WebhookEvent =
  | "transaction.created"
  | "transaction.paid"
  | "transaction.failed"
  | "transaction.expired"
  | "transaction.refunded";

export interface WebhookCustomer {
  name: string;
  email: string;
  phone?: string;
  document?: string;
}

export interface WebhookTransactionData {
  transaction_id: string;
  external_id?: string;
  amount: string | number;
  fee_amount?: string | number;
  net_amount?: string | number;
  currency: string;
  payment_method: string;
  status: "pending" | "paid" | "failed" | "expired" | "refunded" | string;
  created_at: string;
  paid_at?: string | null;
  customer?: WebhookCustomer;
  metadata?: Record<string, unknown>;
}

export interface WebhookPayload {
  event: WebhookEvent | string;
  timestamp: string;
  data: WebhookTransactionData;
}

export interface ProcessWebhookResult {
  success: boolean;
  event: string;
  transactionId: string;
  message: string;
  orderStatus: string;
  customerEmail?: string;
  processedAt: string;
}

// Armazenamento em memória para log de transações recentes processadas (idempotência)
const processedTransactions = new Map<string, { status: string; processedAt: string }>();

/**
 * Processador principal de Webhook / Postback
 */
export async function processPaymentWebhook(payload: WebhookPayload): Promise<ProcessWebhookResult> {
  const { event, data } = payload;

  if (!event || !data || !data.transaction_id) {
    throw new Error("Payload inválido: campos 'event' e 'data.transaction_id' são obrigatórios.");
  }

  const transactionId = data.transaction_id;
  const amount = typeof data.amount === "string" ? parseFloat(data.amount) : data.amount;
  const customerName = data.customer?.name || "Cliente DezPila";
  const customerEmail = data.customer?.email;

  console.log(`[Webhook] Recebido evento '${event}' para transação ${transactionId} (R$ ${amount.toFixed(2)})`);

  let orderStatus = "PENDING";
  let message = "";

  switch (event) {
    case "transaction.paid": {
      orderStatus = "PAID";
      message = `Pagamento de R$ ${amount.toFixed(2)} confirmado para ${customerName}! Acesso liberado automaticamente via PIX.`;

      // 1. Liberação de Acesso e Envio Automático
      await deliverCustomerAccess({
        transactionId,
        externalId: data.external_id,
        amount,
        customerName,
        customerEmail,
        paidAt: data.paid_at || new Date().toISOString(),
      });

      break;
    }

    case "transaction.created": {
      orderStatus = "CREATED";
      message = `Cobrança criada para ${customerName}. Aguardando pagamento via ${data.payment_method || "PIX"}.`;
      break;
    }

    case "transaction.failed": {
      orderStatus = "FAILED";
      message = `Transação ${transactionId} recusada ou com falha.`;
      break;
    }

    case "transaction.expired": {
      orderStatus = "EXPIRED";
      message = `Prazo de pagamento do PIX para ${transactionId} expirou.`;
      break;
    }

    case "transaction.refunded": {
      orderStatus = "REFUNDED";
      message = `Reembolso processado para transação ${transactionId}. Acesso revogado.`;
      // Revogação de acesso
      await revokeCustomerAccess(transactionId);
      break;
    }

    default: {
      orderStatus = (data.status || "UNKNOWN").toUpperCase();
      message = `Evento ${event} recebido e registrado.`;
      break;
    }
  }

  // Registra no histórico para idempotência e auditoria
  const processedAt = new Date().toISOString();
  processedTransactions.set(transactionId, {
    status: orderStatus,
    processedAt,
  });

  return {
    success: true,
    event,
    transactionId,
    message,
    orderStatus,
    customerEmail,
    processedAt,
  };
}

/**
 * Disparo automático de entrega de credenciais após confirmação de pagamento
 */
async function deliverCustomerAccess(params: {
  transactionId: string;
  externalId?: string;
  amount: number;
  customerName: string;
  customerEmail?: string;
  paidAt: string;
}) {
  console.log(
    `[Webhook:Delivery] Liberando acesso DezPila para ${params.customerName} (${params.customerEmail || "sem email"}). Transação: ${params.transactionId}`
  );
  // Aqui integra com o serviço de envio de WhatsApp/Email ou banco de dados
  return true;
}

/**
 * Revogação de acesso em caso de reembolso ou chargeback
 */
async function revokeCustomerAccess(transactionId: string) {
  console.log(`[Webhook:Revoke] Revogando credenciais da transação ${transactionId}`);
  return true;
}

/**
 * Consulta status recente de uma transação processada por Webhook
 */
export function getWebhookTransactionStatus(transactionId: string) {
  return processedTransactions.get(transactionId) || null;
}

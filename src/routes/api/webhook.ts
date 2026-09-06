import { createAPIFileRoute } from "@tanstack/react-start/api";
import { processPaymentWebhook, WebhookPayload } from "@/server/webhook.server";

export const APIRoute = createAPIFileRoute("/api/webhook")({
  GET: async () => {
    return new Response(
      JSON.stringify({
        status: "online",
        service: "DezPila Payment Webhook & Postback API",
        version: "2.0.0",
        timestamp: new Date().toISOString(),
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },

  POST: async ({ request }) => {
    try {
      const body = (await request.json()) as WebhookPayload;

      // Processa o evento da transação recebida
      const result = await processPaymentWebhook(body);

      // Responde com status HTTP 200 conforme padrão de gateways
      return new Response(
        JSON.stringify({
          status: "received",
          success: true,
          event: result.event,
          transaction_id: result.transactionId,
          order_status: result.orderStatus,
          message: result.message,
          processed_at: result.processedAt,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Erro interno ao processar webhook";
      console.error("[Webhook Error]:", errorMsg);

      // Retorna 400 em caso de payload mal formatado ou erro
      return new Response(
        JSON.stringify({
          status: "error",
          success: false,
          error: errorMsg,
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  },
});

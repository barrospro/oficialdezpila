import { createAPIFileRoute } from "@tanstack/react-start/api";
import { processPaymentWebhook, WebhookPayload } from "@/server/webhook.server";

export const APIRoute = createAPIFileRoute("/api/postback")({
  GET: async () => {
    return new Response(
      JSON.stringify({
        status: "online",
        service: "DezPila Postback Receiver",
        version: "2.0.0",
        timestamp: new Date().toISOString(),
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  },

  POST: async ({ request }) => {
    try {
      const body = (await request.json()) as WebhookPayload;
      const result = await processPaymentWebhook(body);

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
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Erro interno ao processar postback";
      return new Response(
        JSON.stringify({
          status: "error",
          success: false,
          error: errorMsg,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  },
});

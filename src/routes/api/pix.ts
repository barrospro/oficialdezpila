import { createAPIFileRoute } from "@tanstack/react-start/api";
import { createNitroPixTransaction } from "@/server/nitro.server";

/**
 * Endpoint API para gerar cobrança PIX via Nitro Pagamentos para WhatsApp Bot / Vocalis / Typebot / CRM
 * GET /api/pix?amount=10.00&name=Cliente&phone=11999999999&email=cliente@email.com
 * POST /api/pix { amount: 10, name: "Cliente", phone: "11999999999" }
 */
export const APIRoute = createAPIFileRoute("/api/pix")({
  GET: async ({ request }) => {
    try {
      const url = new URL(request.url);
      const amountNum = parseFloat(url.searchParams.get("amount") || url.searchParams.get("valor") || "10.00");
      const name = url.searchParams.get("name") || url.searchParams.get("nome") || "Cliente WhatsApp";
      const phone = url.searchParams.get("phone") || url.searchParams.get("whatsapp") || "11999999999";
      const email = url.searchParams.get("email") || "cliente@dezpila.com.br";
      const document = url.searchParams.get("document") || url.searchParams.get("cpf") || "00000000000";

      const pixResult = await createNitroPixTransaction({
        amountNum,
        planName: "Assinatura DezPila 4K (WhatsApp)",
        planId: "WHATSAPP_X1",
        customer: {
          name,
          email,
          phone,
          document,
        },
        sourceUrl: "https://oficialdezpila.lovable.app/whatsapp",
      });

      return new Response(
        JSON.stringify({
          success: true,
          status: pixResult.status,
          transaction_id: pixResult.id,
          amount: pixResult.amount,
          pix_copia_e_cola: pixResult.qrCode,
          pix_code: pixResult.qrCode,
          qr_code_base64: pixResult.qrCodeBase64,
          expiration_date: pixResult.expirationDate,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Erro ao gerar PIX via Nitro.";
      return new Response(
        JSON.stringify({
          success: false,
          error: errorMsg,
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }
  },

  POST: async ({ request }) => {
    try {
      const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
      const amountNum = Number(body.amount || body.valor || 10.00);
      const name = String(body.name || body.nome || "Cliente WhatsApp");
      const phone = String(body.phone || body.whatsapp || "11999999999");
      const email = String(body.email || "cliente@dezpila.com.br");
      const document = String(body.document || body.cpf || "00000000000");

      const pixResult = await createNitroPixTransaction({
        amountNum,
        planName: "Assinatura DezPila 4K (WhatsApp)",
        planId: "WHATSAPP_X1",
        customer: {
          name,
          email,
          phone,
          document,
        },
        sourceUrl: "https://oficialdezpila.lovable.app/whatsapp",
      });

      return new Response(
        JSON.stringify({
          success: true,
          status: pixResult.status,
          transaction_id: pixResult.id,
          amount: pixResult.amount,
          pix_copia_e_cola: pixResult.qrCode,
          pix_code: pixResult.qrCode,
          qr_code_base64: pixResult.qrCodeBase64,
          expiration_date: pixResult.expirationDate,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Erro ao gerar PIX via Nitro.";
      return new Response(
        JSON.stringify({
          success: false,
          error: errorMsg,
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }
  },
});

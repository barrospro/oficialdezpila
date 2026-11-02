import { createAPIFileRoute } from "@tanstack/react-start/api";
import { createNitroCardTransaction } from "@/server/nitro.server";

/**
 * Endpoint API REST para cobrança de Cartão de Crédito via Nitro Pagamentos
 * Referência oficial: https://doc.nitropagamentoshub.com/#criar-pagamento-cartao
 *
 * Suporta POST com payload no padrão oficial:
 * {
 *   "amount": 10.00,
 *   "payment_method": "credit_card",
 *   "installments": 1,
 *   "card_number": "4111111111111111",
 *   "card_holder_name": "NOME DO TITULAR",
 *   "card_expiration_month": "12",
 *   "card_expiration_year": "28",
 *   "card_cvv": "123",
 *   "customer": {
 *     "name": "Cliente Exemplo",
 *     "email": "cliente@email.com",
 *     "cpf": "000.000.000-00",
 *     "phone": "11999999999"
 *   }
 * }
 */
export const APIRoute = createAPIFileRoute("/api/cartao")({
  GET: async () => {
    return new Response(
      JSON.stringify({
        status: "online",
        service: "DezPila Nitro Credit Card Gateway API",
        endpoint: "/api/cartao",
        doc_reference: "https://doc.nitropagamentoshub.com/#criar-pagamento-cartao",
        method: "POST",
        description: "Envie requisição POST JSON com dados do cliente e cartão para processar cobrança.",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  },

  POST: async ({ request }: { request: Request }) => {
    try {
      const body = (await request.json().catch(() => ({}))) as Record<string, any>;

      // Extrai valor da transação
      const amountNum = Number(body.amount || body.valor || 10.0);
      const planName = String(body.planName || body.description || "Assinatura DezPila 4K");
      const planId = String(body.planId || "MENSAL");
      const installments = Number(body.installments || body.parcelas || 1);

      // Extrai dados do cliente (suporta flat ou nested customer)
      const customerData = body.customer || {};
      const name = String(customerData.name || body.name || body.nome || "Cliente DezPila");
      const email = String(customerData.email || body.email || "cliente@dezpila.com.br");
      const phone = String(customerData.phone || body.phone || body.whatsapp || "11999999999");
      const document = String(customerData.cpf || customerData.document || body.document || body.cpf || "00000000000");

      // Extrai dados do cartão (suporta campos raiz conforme doc Nitro ou nested card)
      const cardData = body.card || {};
      const cardNumber = String(body.card_number || cardData.number || body.cardNumber || "");
      const holderName = String(body.card_holder_name || cardData.holder_name || body.holderName || name);
      const expirationMonth = String(body.card_expiration_month || cardData.expiration_month || body.expirationMonth || "12");
      const expirationYear = String(body.card_expiration_year || cardData.expiration_year || body.expirationYear || "28");
      const cvv = String(body.card_cvv || cardData.cvv || body.cvv || "");

      if (!cardNumber || cleanDigits(cardNumber).length < 13) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "Número de cartão de crédito inválido ou ausente.",
          }),
          { status: 400, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
        );
      }

      if (!cvv || cleanDigits(cvv).length < 3) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "Código de segurança (CVV) inválido ou ausente.",
          }),
          { status: 400, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
        );
      }

      const result = await createNitroCardTransaction({
        amountNum,
        planName,
        planId,
        customer: {
          name,
          email,
          phone,
          document,
        },
        card: {
          number: cardNumber,
          holderName,
          expirationMonth,
          expirationYear,
          cvv,
          installments,
        },
        sourceUrl: "https://oficialdezpila.vercel.app/cartao",
      });

      const httpStatus = result.paid ? 200 : 402;

      return new Response(
        JSON.stringify({
          success: result.paid,
          status: result.status,
          paid: result.paid,
          transaction_id: result.id,
          amount: amountNum,
          installments,
          message: result.message,
          card_brand: result.cardBrand,
        }),
        {
          status: httpStatus,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Erro ao processar cartão na Nitro Pagamentos.";
      return new Response(
        JSON.stringify({
          success: false,
          error: errorMsg,
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }
  },
});

function cleanDigits(str: string): string {
  return str.replace(/\D/g, "");
}

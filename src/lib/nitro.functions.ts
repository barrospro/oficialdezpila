import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  createNitroPixTransaction,
  createNitroCardTransaction,
  getNitroTransactionStatus,
} from "@/server/nitro.server";

const createNitroPixSchema = z.object({
  amountNum: z.number().min(1),
  planName: z.string().default("Starter Mensal"),
  planId: z.string().default("MENSAL"),
  name: z.string().trim().min(3),
  email: z.string().trim().email(),
  phone: z.string().min(10),
  document: z.string().min(11),
  sourceUrl: z.string().optional(),
});

/**
 * Server Function para gerar cobrança PIX via Nova API Nitro Pagamentos (v2.0)
 */
export const createNitroPix = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => createNitroPixSchema.parse(data))
  .handler(async ({ data }) => {
    try {
      const result = await createNitroPixTransaction({
        amountNum: data.amountNum,
        planName: data.planName,
        planId: data.planId,
        customer: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          document: data.document,
        },
        sourceUrl: data.sourceUrl,
      });

      return {
        ok: true as const,
        ...result,
      };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Erro ao gerar PIX na Nitro Pagamentos.";
      return {
        ok: false as const,
        error: errorMsg,
      };
    }
  });

const createNitroCardSchema = z.object({
  amountNum: z.number().min(1),
  planName: z.string().default("Starter Mensal"),
  planId: z.string().default("MENSAL"),
  name: z.string().trim().min(3),
  email: z.string().trim().email(),
  phone: z.string().min(10),
  document: z.string().min(11),
  cardNumber: z.string().min(13),
  holderName: z.string().min(3),
  expirationMonth: z.string().min(1),
  expirationYear: z.string().min(2),
  cvv: z.string().min(3),
  installments: z.number().default(1),
  sourceUrl: z.string().optional(),
});

/**
 * Server Function para pagamento via Cartão de Crédito na Nova API Nitro Pagamentos (v2.0)
 */
export const createNitroCard = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => createNitroCardSchema.parse(data))
  .handler(async ({ data }) => {
    try {
      const result = await createNitroCardTransaction({
        amountNum: data.amountNum,
        planName: data.planName,
        planId: data.planId,
        customer: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          document: data.document,
        },
        card: {
          number: data.cardNumber,
          holderName: data.holderName,
          expirationMonth: data.expirationMonth,
          expirationYear: data.expirationYear,
          cvv: data.cvv,
          installments: data.installments,
        },
        sourceUrl: data.sourceUrl,
      });

      return {
        ok: true as const,
        ...result,
      };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Erro ao processar cartão na Nitro Pagamentos.";
      return {
        ok: false as const,
        error: errorMsg,
        paid: false,
      };
    }
  });

const checkNitroPixStatusSchema = z.object({
  transactionId: z.string().min(1),
});

/**
 * Server Function para consultar status da transação na Nova API Nitro Pagamentos (v2.0)
 */
export const checkNitroPixStatus = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => checkNitroPixStatusSchema.parse(data))
  .handler(async ({ data }) => {
    try {
      const result = await getNitroTransactionStatus(data.transactionId);
      return {
        ok: true as const,
        ...result,
      };
    } catch {
      return {
        ok: false as const,
        status: "pendente",
        paid: false,
      };
    }
  });

// Aliases para compatibilidade retroativa
export const createPix = createNitroPix;
export const checkPixStatus = checkNitroPixStatus;
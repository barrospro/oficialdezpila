import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  createNitroPixTransaction,
  getNitroTransactionStatus,
} from "@/server/nitro.server";

const createNitroPixSchema = z.object({
  amountNum: z.number().min(1),
  offerHash: z.string().default("ni918"),
  name: z.string().trim().min(3),
  email: z.string().trim().email(),
  phone: z.string().min(10),
  cpf: z.string().min(11),
});

/**
 * Server Function para gerar cobrança PIX via API da Nitro Pagamentos
 */
export const createNitroPix = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => createNitroPixSchema.parse(data))
  .handler(async ({ data }) => {
    try {
      const result = await createNitroPixTransaction({
        offerHash: data.offerHash,
        amountNum: data.amountNum,
        customer: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          cpf: data.cpf,
        },
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

const checkNitroPixStatusSchema = z.object({
  transactionHash: z.string().min(1),
});

/**
 * Server Function para consultar status da transação PIX na Nitro Pagamentos
 */
export const checkNitroPixStatus = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => checkNitroPixStatusSchema.parse(data))
  .handler(async ({ data }) => {
    try {
      const result = await getNitroTransactionStatus(data.transactionHash);
      return {
        ok: true as const,
        ...result,
      };
    } catch (err: unknown) {
      return {
        ok: false as const,
        status: "waiting_payment",
        paid: false,
      };
    }
  });

// Aliases para compatibilidade com CheckoutModal
export const createPix = createNitroPix;
export const checkPixStatus = checkNitroPixStatus;
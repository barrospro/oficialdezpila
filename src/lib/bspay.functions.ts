import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  createBspayPixTransaction,
  getBspayTransactionStatus,
} from "@/server/bspay.server";

const createBspayPixSchema = z.object({
  amount: z.number().min(1),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  cpf: z.string().min(11),
});

/**
 * Server Function para gerar cobrança PIX Cash-In via BSPay API
 */
export const createBspayPix = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => createBspayPixSchema.parse(data))
  .handler(async ({ data }) => {
    try {
      const result = await createBspayPixTransaction({
        amount: data.amount,
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
      const errorMsg = err instanceof Error ? err.message : "Erro desconhecido ao gerar Pix na BSPay.";
      return {
        ok: false as const,
        error: errorMsg,
      };
    }
  });

const checkBspayPixStatusSchema = z.object({
  transactionId: z.string().min(1),
});

/**
 * Server Function para verificar se o pagamento Pix da BSPay foi pago
 */
export const checkBspayPixStatus = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => checkBspayPixStatusSchema.parse(data))
  .handler(async ({ data }) => {
    try {
      const result = await getBspayTransactionStatus(data.transactionId);
      return {
        ok: true as const,
        ...result,
      };
    } catch (err: unknown) {
      return {
        ok: false as const,
        status: "PENDING",
        paid: false,
      };
    }
  });

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  createPixTransaction,
  getTransactionStatus,
} from "./nitro.server";

const onlyDigits = (v: string) => v.replace(/\D/g, "");

const customerSchema = z.object({
  offerHash: z.enum(["ni918", "h64gr", "oinxr", "lzcus"]),
  name: z.string().trim().min(3).max(120).regex(/\s/),
  email: z.string().trim().toLowerCase().email().max(255),
  whatsapp: z
    .string()
    .transform(onlyDigits)
    .refine((v) => v.length >= 10 && v.length <= 11),
  cpf: z
    .string()
    .transform(onlyDigits)
    .refine((v) => v.length === 11),
});

export const createPix = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => customerSchema.parse(input))
  .handler(async ({ data }) => {
    try {
      const result = await createPixTransaction({
        offerHash: data.offerHash,
        customer: {
          name: data.name,
          email: data.email,
          document: data.cpf,
          phone_number: data.whatsapp,
        },
      });
      return { ok: true as const, ...result };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Erro inesperado ao gerar Pix";
      return { ok: false as const, error: message };
    }
  });

const statusSchema = z.object({
  hash: z.string().min(1).max(64).regex(/^[a-zA-Z0-9_-]+$/),
});

export const checkPixStatus = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => statusSchema.parse(input))
  .handler(async ({ data }) => {
    try {
      const result = await getTransactionStatus(data.hash);
      return { ok: true as const, ...result };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Erro ao consultar status";
      return { ok: false as const, error: message };
    }
  });
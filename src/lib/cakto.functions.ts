import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createCaktoPixTransaction, getCaktoOrderStatus } from "@/server/cakto.server";

const onlyDigits = (v: string) => v.replace(/\D/g, "");

const customerSchema = z.object({
  offerHash: z.string().default("ni918"),
  name: z
    .string()
    .trim()
    .min(3, "Informe seu nome completo")
    .max(120, "Nome muito longo"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("E-mail inválido"),
  whatsapp: z
    .string()
    .transform(onlyDigits)
    .refine((v) => v.length >= 10 && v.length <= 11, "WhatsApp deve ter 10 ou 11 dígitos com DDD"),
  cpf: z
    .string()
    .transform(onlyDigits)
    .refine((v) => v.length === 11, "CPF deve ter exatamente 11 dígitos"),
});

export const createCaktoPix = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => customerSchema.parse(input))
  .handler(async ({ data }) => {
    try {
      const result = await createCaktoPixTransaction({
        offerHash: data.offerHash,
        customer: {
          name: data.name,
          email: data.email,
          phone: data.whatsapp,
          cpf: data.cpf,
        },
      });
      return { ok: true as const, ...result };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro inesperado ao gerar Pix na Cakto";
      return { ok: false as const, error: message };
    }
  });

const statusSchema = z.object({
  orderId: z.string().min(1),
});

export const checkCaktoPixStatus = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => statusSchema.parse(input))
  .handler(async ({ data }) => {
    try {
      const result = await getCaktoOrderStatus(data.orderId);
      return { ok: true as const, ...result };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao consultar status do Pix";
      return { ok: false as const, error: message };
    }
  });

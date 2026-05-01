import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  createPixTransaction,
  getTransactionStatus,
} from "./nitro.server";

const onlyDigits = (v: string) => v.replace(/\D/g, "");

const isValidCpf = (raw: string) => {
  const cpf = onlyDigits(raw);
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(cpf[i]) * (10 - i);
  let d1 = (sum * 10) % 11;
  if (d1 === 10) d1 = 0;
  if (d1 !== parseInt(cpf[9])) return false;
  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(cpf[i]) * (11 - i);
  let d2 = (sum * 10) % 11;
  if (d2 === 10) d2 = 0;
  return d2 === parseInt(cpf[10]);
};

const customerSchema = z.object({
  offerHash: z.enum(["ni918", "h64gr", "oinxr", "lzcus"]),
  name: z
    .string()
    .trim()
    .min(3, "Informe seu nome completo")
    .max(120, "Nome muito longo")
    .regex(/\s/, "Informe nome e sobrenome"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(255, "E-mail muito longo")
    .superRefine((v, ctx) => {
      if (v.length === 0) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Informe seu e-mail" });
        return;
      }
      if (/\s/.test(v)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "E-mail não pode conter espaços",
        });
        return;
      }
      const atCount = (v.match(/@/g) ?? []).length;
      if (atCount === 0) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'E-mail deve conter "@"' });
        return;
      }
      if (atCount > 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'E-mail deve conter apenas um "@"',
        });
        return;
      }
      const [local, domain] = v.split("@");
      if (!local) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Informe o nome antes do "@"',
        });
        return;
      }
      if (!domain) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Informe o domínio após o "@" (ex: gmail.com)',
        });
        return;
      }
      if (!domain.includes(".")) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Domínio incompleto — faltou o final (ex: .com)",
        });
        return;
      }
      const tld = domain.split(".").pop() ?? "";
      if (tld.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Domínio inválido — verifique o final (ex: .com, .com.br)",
        });
        return;
      }
      if (!/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(\.[a-z0-9-]+)+$/i.test(v)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Formato de e-mail inválido",
        });
      }
    }),
  whatsapp: z
    .string()
    .transform(onlyDigits)
    .superRefine((v, ctx) => {
      if (v.length === 0) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Informe seu WhatsApp" });
        return;
      }
      if (v.length < 10) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "WhatsApp incompleto — informe DDD + número (11 dígitos)",
        });
        return;
      }
      if (v.length > 11) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "WhatsApp deve ter no máximo 11 dígitos (DDD + número)",
        });
        return;
      }
      const ddd = parseInt(v.slice(0, 2), 10);
      if (ddd < 11) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "DDD inválido" });
        return;
      }
      if (v.length === 11 && v[2] !== "9") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Número de celular deve começar com 9 após o DDD",
        });
        return;
      }
      if (v.length === 10) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Informe um celular com 9 dígitos após o DDD",
        });
      }
    }),
  cpf: z
    .string()
    .transform(onlyDigits)
    .superRefine((v, ctx) => {
      if (v.length === 0) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Informe seu CPF" });
        return;
      }
      if (v.length < 11) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `CPF incompleto — faltam ${11 - v.length} dígito${11 - v.length > 1 ? "s" : ""}`,
        });
        return;
      }
      if (v.length > 11) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "CPF deve ter 11 dígitos",
        });
        return;
      }
      if (/^(\d)\1{10}$/.test(v)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "CPF inválido (todos os dígitos iguais)",
        });
        return;
      }
      if (!isValidCpf(v)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "CPF inválido — verifique o dígito verificador",
        });
      }
    }),
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
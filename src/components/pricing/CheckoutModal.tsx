import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  Clock,
  Copy,
  Loader2,
  Lock,
  Mail,
  MessageCircle,
  RefreshCw,
  Shield,
  X,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createPix, checkPixStatus } from "@/server/nitro.functions";
import { PIX_TIMEOUT_MS } from "@/server/nitro-config";
import {
  clearCheckout,
  loadCheckout,
  saveCheckout,
} from "./checkout-storage";

type Props = {
  open: boolean;
  planId: string;
  planName: string;
  link: string;
  onClose: () => void;
};

type FormState = {
  name: string;
  email: string;
  whatsapp: string;
  cpf: string;
};

type PixData = {
  hash: string;
  pix_qr_code: string;
  amount: number;
  offer_title: string;
};

type Step = "form" | "pix" | "success" | "expired";

// PIX_TIMEOUT_MS é importado de @/server/nitro-config para manter
// frontend e backend sincronizados.

// Mapeia o payment_status da API Nitro para uma mensagem amigável.
// Status conhecidos: waiting_payment, processing, paid, approved,
// refused, refunded, chargedback, expired, canceled.
type StatusTone = "pending" | "progress" | "success" | "error";
type StatusInfo = { tone: StatusTone; label: string; hint: string };

function describeStatus(raw: string | null): StatusInfo {
  switch (raw) {
    case "paid":
    case "approved":
      return {
        tone: "success",
        label: "Pagamento confirmado",
        hint: "Liberando seu acesso...",
      };
    case "processing":
    case "pending":
    case "in_process":
    case "in_analysis":
      return {
        tone: "progress",
        label: "Pagamento em processamento",
        hint: "Recebemos seu Pix e estamos validando com o banco.",
      };
    case "refused":
    case "failed":
      return {
        tone: "error",
        label: "Pagamento recusado",
        hint: "O banco recusou a transação. Tente gerar um novo Pix.",
      };
    case "refunded":
    case "chargedback":
      return {
        tone: "error",
        label: "Pagamento estornado",
        hint: "Esta cobrança foi estornada. Gere um novo Pix para continuar.",
      };
    case "expired":
    case "canceled":
      return {
        tone: "error",
        label: "Cobrança encerrada",
        hint: "Este Pix não está mais ativo. Gere um novo código.",
      };
    case "waiting_payment":
    default:
      return {
        tone: "pending",
        label: "Aguardando pagamento",
        hint: "Escaneie o QR Code ou cole o código no seu app do banco.",
      };
  }
}

function formatCountdown(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(total / 60).toString().padStart(2, "0");
  const s = (total % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

const onlyDigits = (v: string) => v.replace(/\D/g, "");

const maskWhatsapp = (v: string) => {
  const d = onlyDigits(v).slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};

const maskCpf = (v: string) => {
  const d = onlyDigits(v).slice(0, 11);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
  if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
};

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

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Informe seu nome completo")
    .max(100, "Nome muito longo")
    .regex(/\s/, "Informe nome e sobrenome"),
  email: z.string().trim().email("E-mail inválido").max(255),
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
      // DDDs válidos no Brasil vão de 11 a 99 (não existem 10, 20, 23, 25, 26, 29, etc.,
      // mas validamos a faixa principal — qualquer DDD começando com 0 ou 1 inválido).
      if (ddd < 11) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "DDD inválido" });
        return;
      }
      // Celular brasileiro: 11 dígitos e o terceiro dígito deve ser 9.
      if (v.length === 11 && v[2] !== "9") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Número de celular deve começar com 9 após o DDD",
        });
        return;
      }
      // Se vier com 10 dígitos, é fixo — não aceitamos para WhatsApp.
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
    .refine((v) => v.length === 11, "CPF deve ter 11 dígitos")
    .refine(isValidCpf, "CPF inválido"),
});

// Schemas por campo — usados para validação em tempo real (onChange/onBlur).
const fieldSchemas = {
  name: schema.shape.name,
  email: schema.shape.email,
  whatsapp: schema.shape.whatsapp,
  cpf: schema.shape.cpf,
} as const;

function validateField(field: keyof FormState, value: string): string | undefined {
  const result = fieldSchemas[field].safeParse(value);
  if (result.success) return undefined;
  return result.error.issues[0]?.message ?? "Valor inválido";
}

const VALID_OFFERS = ["ni918", "h64gr", "oinxr", "lzcus"] as const;
type OfferHash = (typeof VALID_OFFERS)[number];

function extractOfferHash(link: string): OfferHash | null {
  try {
    const url = new URL(link);
    const last = url.pathname.split("/").filter(Boolean).pop() ?? "";
    return (VALID_OFFERS as readonly string[]).includes(last)
      ? (last as OfferHash)
      : null;
  } catch {
    return null;
  }
}

function formatBrl(cents: number) {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function CheckoutModal({ open, planId, planName, link, onClose }: Props) {
  const createPixFn = useServerFn(createPix);
  const checkStatusFn = useServerFn(checkPixStatus);

  const [step, setStep] = useState<Step>("form");
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    whatsapp: "",
    cpf: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [pix, setPix] = useState<PixData | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [pixExpiresAt, setPixExpiresAt] = useState<number | null>(null);
  const [remainingMs, setRemainingMs] = useState<number>(PIX_TIMEOUT_MS);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [lastCheckedAt, setLastCheckedAt] = useState<number | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const pollRef = useRef<number | null>(null);

  const offerHash = extractOfferHash(link);

  // Hidratar do sessionStorage no primeiro mount (antes do effect de close).
  useEffect(() => {
    const persisted = loadCheckout();
    if (persisted) {
      // Se o Pix em andamento já passou do prazo, marca como expirado direto.
      const isExpired =
        persisted.step === "pix" && persisted.expiresAt <= Date.now();
      setForm(persisted.form);
      setPix(persisted.pix);
      setPixExpiresAt(persisted.expiresAt);
      setRemainingMs(Math.max(0, persisted.expiresAt - Date.now()));
      setStep(isExpired ? "expired" : persisted.step);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!open && hydrated) {
      setStep("form");
      setErrors({});
      setTouched({});
      setPix(null);
      setSubmitting(false);
      setSubmitError(null);
      setCopied(false);
      setPixExpiresAt(null);
      setRemainingMs(PIX_TIMEOUT_MS);
      setPaymentStatus(null);
      setLastCheckedAt(null);
      if (pollRef.current) {
        window.clearInterval(pollRef.current);
        pollRef.current = null;
      }
      // Só limpa o storage se NÃO houver Pix em andamento que valha
      // a pena reabrir depois. O usuário pode ter fechado o modal
      // sem terminar — preservamos pra ele voltar.
      const persisted = loadCheckout();
      if (
        !persisted ||
        persisted.step === "success" ||
        persisted.step === "expired"
      ) {
        clearCheckout();
      }
    }
  }, [open, hydrated]);

  // Persistir mudanças relevantes no sessionStorage.
  useEffect(() => {
    if (!hydrated) return;
    if (!pix || !pixExpiresAt) return;
    if (step !== "pix" && step !== "success" && step !== "expired") return;
    saveCheckout({
      step,
      planId,
      planName,
      offerHash: offerHash ?? "",
      pix,
      form,
      expiresAt: pixExpiresAt,
    });
  }, [hydrated, step, pix, pixExpiresAt, planId, planName, offerHash, form]);

  // Polling: enquanto estiver na tela do Pix, consulta status a cada 4s
  useEffect(() => {
    if (step !== "pix" || !pix) return;
    // Se já expirou (ex: hidratação tardia), nem inicia o polling.
    if (pixExpiresAt && pixExpiresAt <= Date.now()) return;
    let cancelled = false;
    // Captura o hash do Pix vigente neste ciclo do effect. Se o usuário
    // regenerar o Pix, este effect é descartado e um novo é criado com
    // o novo hash — qualquer resposta tardia deste ciclo é ignorada.
    const activeHash = pix.hash;
    const tick = async () => {
      // Não dispara nova request se já expirou entre ticks.
      if (cancelled) return;
      if (pixExpiresAt && pixExpiresAt <= Date.now()) return;
      try {
        const res = await checkStatusFn({ data: { hash: activeHash } });
        // Ignora resposta tardia se o effect já foi limpo ou o Pix expirou.
        if (cancelled) return;
        if (pixExpiresAt && pixExpiresAt <= Date.now()) return;
        if (res.ok) {
          setPaymentStatus(res.status ?? "waiting_payment");
          setLastCheckedAt(Date.now());
          // Se o backend retornou um expires_at autoritativo,
          // alinhamos o countdown com ele (evita drift de relógio).
          if (res.expires_at) {
            const serverExpires = Date.parse(res.expires_at);
            if (!Number.isNaN(serverExpires) && serverExpires !== pixExpiresAt) {
              setPixExpiresAt(serverExpires);
            }
          }
        }
        if (res.ok && (res.status === "paid" || res.status === "approved")) {
          setStep("success");
        } else if (res.ok && (res.status === "expired" || res.expired)) {
          // Backend já decretou expirado — encerra o polling imediatamente.
          setStep("expired");
        }
      } catch {
        // silencioso — tenta de novo no próximo tick
      }
    };
    // Primeiro tick imediato pra não esperar 4s para mostrar status.
    tick();
    pollRef.current = window.setInterval(tick, 4000);
    return () => {
      cancelled = true;
      if (pollRef.current) {
        window.clearInterval(pollRef.current);
        pollRef.current = null;
      }
    };
  }, [step, pix, pixExpiresAt, checkStatusFn]);

  // Countdown + expiração do Pix
  useEffect(() => {
    if (step !== "pix" || !pixExpiresAt) return;
    const update = () => {
      const remaining = pixExpiresAt - Date.now();
      if (remaining <= 0) {
        setRemainingMs(0);
        setStep("expired");
        if (pollRef.current) {
          window.clearInterval(pollRef.current);
          pollRef.current = null;
        }
      } else {
        setRemainingMs(remaining);
      }
    };
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, [step, pixExpiresAt]);

  if (!open) return null;

  const update = (field: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    // Validação em tempo real:
    // - Se o campo já foi tocado (onBlur anterior), revalida a cada digitação
    //   para que o erro suma assim que o usuário corrigir.
    // - Se ainda não foi tocado, só limpa erro pendente (sem mostrar novo).
    if (touched[field]) {
      const msg = validateField(field, value);
      setErrors((e) => ({ ...e, [field]: msg }));
    } else if (errors[field]) {
      setErrors((e) => ({ ...e, [field]: undefined }));
    }
  };

  const handleBlur = (field: keyof FormState) => {
    setTouched((t) => ({ ...t, [field]: true }));
    const msg = validateField(field, form[field]);
    setErrors((e) => ({ ...e, [field]: msg }));
  };

  const generatePix = async (): Promise<boolean> => {
    setSubmitError(null);
    if (!offerHash) {
      setSubmitError("Plano inválido. Recarregue a página.");
      return false;
    }
    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormState, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FormState;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return false;
    }
    setSubmitting(true);
    try {
      const res = await createPixFn({
        data: {
          offerHash,
          name: form.name,
          email: form.email,
          whatsapp: form.whatsapp,
          cpf: form.cpf,
        },
      });
      if (!res.ok) {
        setSubmitError(res.error);
        return false;
      }
      setPix({
        hash: res.hash,
        pix_qr_code: res.pix_qr_code,
        amount: res.amount,
        offer_title: res.offer_title,
      });
      // Prefere o expires_at autoritativo do servidor; cai pro relógio
      // local se a Nitro não retornar um created_at válido.
      const serverExpires = res.expires_at ? Date.parse(res.expires_at) : NaN;
      const expiresAt = Number.isNaN(serverExpires)
        ? Date.now() + PIX_TIMEOUT_MS
        : serverExpires;
      setPixExpiresAt(expiresAt);
      setRemainingMs(Math.max(0, expiresAt - Date.now()));
        setPaymentStatus(res.status ?? "waiting_payment");
        setLastCheckedAt(Date.now());
      setStep("pix");
      return true;
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Erro ao gerar o Pix. Tente novamente."
      );
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await generatePix();
  };

  const handleRegenerate = async () => {
    await generatePix();
  };

  const handleCopyPix = async () => {
    if (!pix) return;
    try {
      await navigator.clipboard.writeText(pix.pix_qr_code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback silencioso
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-2 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl h-[90vh] bg-background border border-brand/40 rounded-lg shadow-[0_0_60px_var(--brand-glow)] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background/95 flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            {(step === "pix" || step === "expired") && (
              <button
                type="button"
                onClick={() => setStep("form")}
                className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-sm hover:bg-muted flex-shrink-0"
                aria-label="Voltar"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <span className="font-code text-[10px] sm:text-xs uppercase tracking-widest text-brand truncate">
              [ {step === "form"
                ? "Seus Dados"
                : step === "pix"
                ? "Pagamento Pix"
                : step === "expired"
                ? "Pix Expirado"
                : "Pagamento Confirmado"} — Plano {planName} ]
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-sm hover:bg-muted flex-shrink-0"
            aria-label="Fechar checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === "form" && (
          <form
            onSubmit={handleSubmit}
            className="flex-1 overflow-y-auto px-6 py-8 sm:px-10 sm:py-10"
            noValidate
          >
            <div className="max-w-md mx-auto">
              <div className="text-center mb-8">
                <p className="font-code text-[10px] uppercase tracking-widest text-brand mb-2">
                  [ Etapa 1 de 2 ]
                </p>
                <h3 className="text-2xl font-bold tracking-tight">
                  Quase lá! Confirme seus dados
                </h3>
                <p className="text-muted-foreground font-code text-xs mt-2">
                  Para gerar seu Pix em segundos
                </p>
              </div>

              <div className="space-y-4">
                <Field
                  label="Nome completo"
                  value={form.name}
                  onChange={(v) => update("name", v)}
                  onBlur={() => handleBlur("name")}
                  valid={touched.name && !errors.name && !!form.name}
                  placeholder="João da Silva"
                  error={errors.name}
                  autoComplete="name"
                />
                <Field
                  label="E-mail"
                  type="email"
                  value={form.email}
                  onChange={(v) => update("email", v)}
                  onBlur={() => handleBlur("email")}
                  valid={touched.email && !errors.email && !!form.email}
                  placeholder="voce@email.com"
                  error={errors.email}
                  autoComplete="email"
                  inputMode="email"
                />
                <Field
                  label="WhatsApp"
                  value={form.whatsapp}
                  onChange={(v) => update("whatsapp", maskWhatsapp(v))}
                  onBlur={() => handleBlur("whatsapp")}
                  valid={touched.whatsapp && !errors.whatsapp && !!form.whatsapp}
                  placeholder="(11) 99999-9999"
                  error={errors.whatsapp}
                  autoComplete="tel"
                  inputMode="tel"
                />
                <Field
                  label="CPF"
                  value={form.cpf}
                  onChange={(v) => update("cpf", maskCpf(v))}
                  onBlur={() => handleBlur("cpf")}
                  valid={touched.cpf && !errors.cpf && !!form.cpf}
                  placeholder="000.000.000-00"
                  error={errors.cpf}
                  inputMode="numeric"
                />
              </div>

              {submitError && (
                <div className="mt-6 px-4 py-3 border border-destructive/50 bg-destructive/10 rounded-sm">
                  <p className="font-code text-[11px] text-destructive">
                    [!] {submitError}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-8 py-5 font-bold uppercase tracking-widest text-base bg-brand text-brand-foreground hover:bg-foreground hover:text-background transition-colors shadow-[0_0_30px_var(--brand-glow)] rounded-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                {submitting ? "Gerando Pix..." : "Gerar Pix Agora"}
              </button>

              <div className="mt-6 flex items-center justify-center gap-4 text-muted-foreground font-code text-[10px] uppercase tracking-widest">
                <div className="flex items-center gap-1.5">
                  <Lock className="w-3 h-3" /> Seguro
                </div>
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3 h-3" /> Dados Protegidos
                </div>
              </div>
            </div>
          </form>
        )}

        {step === "pix" && pix && (
          <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-10 sm:py-10">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-6">
                <p className="font-code text-[10px] uppercase tracking-widest text-brand mb-2">
                  [ Etapa 2 de 2 ]
                </p>
                <h3 className="text-2xl font-bold tracking-tight">
                  Escaneie ou copie o código Pix
                </h3>
                <p className="text-muted-foreground font-code text-xs mt-2">
                  {pix.offer_title} — {formatBrl(pix.amount)}
                </p>
              </div>

              <div className="flex justify-center mb-6">
                <div className="bg-white p-4 rounded-sm border border-border">
                  <QRCodeSVG
                    value={pix.pix_qr_code}
                    size={220}
                    level="M"
                    includeMargin={false}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <span className="font-code text-[10px] uppercase tracking-widest text-muted-foreground block">
                  Código copia-e-cola
                </span>
                <div className="flex items-stretch gap-2">
                  <input
                    readOnly
                    value={pix.pix_qr_code}
                    onFocus={(e) => e.currentTarget.select()}
                    className="flex-1 px-3 py-2 bg-background/60 border border-border rounded-sm font-code text-[11px] text-foreground/80 truncate focus:outline-none focus:border-brand"
                  />
                  <button
                    type="button"
                    onClick={handleCopyPix}
                    className="px-3 py-2 border border-brand bg-brand/10 text-brand hover:bg-brand hover:text-brand-foreground transition-colors rounded-sm font-code text-[10px] uppercase tracking-widest flex items-center gap-1.5"
                  >
                    <Copy className="w-3 h-3" />
                    {copied ? "Copiado!" : "Copiar"}
                  </button>
                </div>
              </div>

              <StatusBanner
                info={describeStatus(paymentStatus)}
                lastCheckedAt={lastCheckedAt}
              />

              <div className="mt-4 flex items-center justify-center gap-1.5 text-muted-foreground font-code text-[10px] uppercase tracking-widest">
                <Clock className="w-3 h-3" />
                Expira em <span className="text-brand">{formatCountdown(remainingMs)}</span>
              </div>

              <p className="mt-2 text-center text-muted-foreground/70 font-code text-[10px] uppercase tracking-widest">
                Esta tela atualiza sozinha — você não precisa recarregar
              </p>

              <div className="mt-6 px-4 py-4 border border-brand/40 bg-brand/5 rounded-sm">
                <p className="font-code text-[10px] uppercase tracking-widest text-brand mb-3 text-center">
                  [ Após o pagamento ]
                </p>
                <p className="text-foreground/90 font-code text-xs text-center mb-3 leading-relaxed">
                  Os dados de acesso ao aplicativo serão enviados automaticamente para você por:
                </p>
                <div className="flex items-center justify-center gap-4 text-foreground">
                  <span className="flex items-center gap-1.5 font-code text-[11px]">
                    <Mail className="w-3.5 h-3.5 text-brand" />
                    E-mail
                  </span>
                  <span className="text-muted-foreground/40">|</span>
                  <span className="flex items-center gap-1.5 font-code text-[11px]">
                    <MessageCircle className="w-3.5 h-3.5 text-brand" />
                    WhatsApp
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === "expired" && (
          <div className="flex-1 overflow-y-auto px-6 py-12 sm:px-10 sm:py-16">
            <div className="max-w-md mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-destructive/15 border border-destructive/60 flex items-center justify-center">
                  <Clock className="w-10 h-10 text-destructive" />
                </div>
              </div>
              <p className="font-code text-[10px] uppercase tracking-widest text-destructive mb-2">
                [ Pix expirado ]
              </p>
              <h3 className="text-2xl font-bold tracking-tight mb-3">
                O tempo do seu Pix acabou
              </h3>
              <p className="text-muted-foreground font-code text-xs mb-8">
                Por segurança, códigos Pix expiram após 20 minutos sem pagamento.
                Gere um novo código com os mesmos dados em um clique.
              </p>
              {submitError && (
                <div className="mb-6 px-4 py-3 border border-destructive/50 bg-destructive/10 rounded-sm text-left">
                  <p className="font-code text-[11px] text-destructive">
                    [!] {submitError}
                  </p>
                </div>
              )}
              <button
                type="button"
                onClick={handleRegenerate}
                disabled={submitting}
                className="w-full py-4 font-bold uppercase tracking-widest text-sm bg-brand text-brand-foreground hover:bg-foreground hover:text-background transition-colors shadow-[0_0_30px_var(--brand-glow)] rounded-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4" />
                )}
                {submitting ? "Gerando novo Pix..." : "Gerar novo Pix"}
              </button>
              <button
                type="button"
                onClick={() => setStep("form")}
                className="w-full mt-3 py-3 font-code text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
              >
                Editar meus dados
              </button>
            </div>
          </div>
        )}

        {step === "success" && pix && (
          <div className="flex-1 overflow-y-auto px-6 py-12 sm:px-10 sm:py-16">
            <div className="max-w-md mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-brand/15 border border-brand flex items-center justify-center shadow-[0_0_40px_var(--brand-glow)]">
                  <CheckCircle2 className="w-10 h-10 text-brand" />
                </div>
              </div>
              <p className="font-code text-[10px] uppercase tracking-widest text-brand mb-2">
                [ Pagamento confirmado ]
              </p>
              <h3 className="text-2xl font-bold tracking-tight mb-3">
                Tudo pronto, {form.name.split(" ")[0]}!
              </h3>
              <p className="text-muted-foreground font-code text-xs mb-8">
                Recebemos seu pagamento de <span className="text-foreground">{formatBrl(pix.amount)}</span>.
                Em instantes você receberá o acesso por e-mail e WhatsApp.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="w-full py-4 font-bold uppercase tracking-widest text-sm bg-brand text-brand-foreground hover:bg-foreground hover:text-background transition-colors shadow-[0_0_30px_var(--brand-glow)] rounded-sm"
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  valid?: boolean;
  placeholder?: string;
  error?: string;
  type?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
};

function Field({
  label,
  value,
  onChange,
  onBlur,
  valid,
  placeholder,
  error,
  type = "text",
  autoComplete,
  inputMode,
}: FieldProps) {
  return (
    <label className="block">
      <span className="font-code text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5 block">
        {label}
      </span>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={inputMode}
          aria-invalid={!!error}
          className={`w-full px-4 py-3 pr-10 bg-background/60 border rounded-sm font-code text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 transition-colors ${
            error
              ? "border-destructive focus:border-destructive focus:ring-destructive"
              : valid
                ? "border-brand/60 focus:border-brand focus:ring-brand"
                : "border-border focus:border-brand focus:ring-brand"
          }`}
        />
        {error ? (
          <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-destructive pointer-events-none" />
        ) : valid ? (
          <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand pointer-events-none" />
        ) : null}
      </div>
      {error && (
        <span className="font-code text-[10px] text-destructive mt-1 block">
          [!] {error}
        </span>
      )}
    </label>
  );
}

function StatusBanner({
  info,
  lastCheckedAt,
}: {
  info: StatusInfo;
  lastCheckedAt: number | null;
}) {
  const styles: Record<StatusTone, { wrap: string; icon: React.ReactNode; label: string }> = {
    pending: {
      wrap: "border-brand/40 bg-brand/5",
      icon: <Loader2 className="w-4 h-4 animate-spin text-brand" />,
      label: "text-brand",
    },
    progress: {
      wrap: "border-yellow-500/50 bg-yellow-500/10",
      icon: <Loader2 className="w-4 h-4 animate-spin text-yellow-400" />,
      label: "text-yellow-300",
    },
    success: {
      wrap: "border-brand bg-brand/15",
      icon: <CheckCircle2 className="w-4 h-4 text-brand" />,
      label: "text-brand",
    },
    error: {
      wrap: "border-destructive/60 bg-destructive/10",
      icon: <AlertCircle className="w-4 h-4 text-destructive" />,
      label: "text-destructive",
    },
  };
  const s = styles[info.tone];
  return (
    <div className={`mt-8 px-4 py-3 border rounded-sm ${s.wrap}`}>
      <div className="flex items-center gap-2">
        {s.icon}
        <span
          className={`font-code text-[11px] uppercase tracking-widest font-bold ${s.label}`}
        >
          {info.label}
        </span>
      </div>
      <p className="mt-1.5 ml-6 font-code text-[11px] text-muted-foreground leading-relaxed">
        {info.hint}
      </p>
      {lastCheckedAt && (
        <p className="mt-1 ml-6 font-code text-[9px] uppercase tracking-widest text-muted-foreground/60">
          Última verificação: {new Date(lastCheckedAt).toLocaleTimeString("pt-BR")}
        </p>
      )}
    </div>
  );
}

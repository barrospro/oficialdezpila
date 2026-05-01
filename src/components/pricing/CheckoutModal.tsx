import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Copy,
  Loader2,
  Lock,
  RefreshCw,
  Shield,
  X,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createPix, checkPixStatus } from "@/server/nitro.functions";

type Props = {
  open: boolean;
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

const PIX_TIMEOUT_MS = 20 * 60 * 1000; // 20 minutos

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
    .refine((v) => v.length >= 10 && v.length <= 11, "WhatsApp inválido"),
  cpf: z
    .string()
    .transform(onlyDigits)
    .refine((v) => v.length === 11, "CPF deve ter 11 dígitos")
    .refine(isValidCpf, "CPF inválido"),
});

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

export function CheckoutModal({ open, planName, link, onClose }: Props) {
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
  const [pix, setPix] = useState<PixData | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [pixExpiresAt, setPixExpiresAt] = useState<number | null>(null);
  const [remainingMs, setRemainingMs] = useState<number>(PIX_TIMEOUT_MS);
  const pollRef = useRef<number | null>(null);

  const offerHash = extractOfferHash(link);

  useEffect(() => {
    if (!open) {
      setStep("form");
      setErrors({});
      setPix(null);
      setSubmitting(false);
      setSubmitError(null);
      setCopied(false);
      setPixExpiresAt(null);
      setRemainingMs(PIX_TIMEOUT_MS);
      if (pollRef.current) {
        window.clearInterval(pollRef.current);
        pollRef.current = null;
      }
    }
  }, [open]);

  // Polling: enquanto estiver na tela do Pix, consulta status a cada 4s
  useEffect(() => {
    if (step !== "pix" || !pix) return;
    const tick = async () => {
      try {
        const res = await checkStatusFn({ data: { hash: pix.hash } });
        if (res.ok && (res.status === "paid" || res.status === "approved")) {
          setStep("success");
        }
      } catch {
        // silencioso — tenta de novo no próximo tick
      }
    };
    pollRef.current = window.setInterval(tick, 4000);
    return () => {
      if (pollRef.current) {
        window.clearInterval(pollRef.current);
        pollRef.current = null;
      }
    };
  }, [step, pix, checkStatusFn]);

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
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
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
      setPixExpiresAt(Date.now() + PIX_TIMEOUT_MS);
      setRemainingMs(PIX_TIMEOUT_MS);
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
            {step === "pix" && (
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
                  placeholder="João da Silva"
                  error={errors.name}
                  autoComplete="name"
                />
                <Field
                  label="E-mail"
                  type="email"
                  value={form.email}
                  onChange={(v) => update("email", v)}
                  placeholder="voce@email.com"
                  error={errors.email}
                  autoComplete="email"
                  inputMode="email"
                />
                <Field
                  label="WhatsApp"
                  value={form.whatsapp}
                  onChange={(v) => update("whatsapp", maskWhatsapp(v))}
                  placeholder="(11) 99999-9999"
                  error={errors.whatsapp}
                  autoComplete="tel"
                  inputMode="tel"
                />
                <Field
                  label="CPF"
                  value={form.cpf}
                  onChange={(v) => update("cpf", maskCpf(v))}
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

              <div className="mt-8 flex items-center justify-center gap-2 text-muted-foreground font-code text-[11px]">
                <Loader2 className="w-3 h-3 animate-spin text-brand" />
                Aguardando confirmação do pagamento...
              </div>

              <p className="mt-4 text-center text-muted-foreground font-code text-[10px] uppercase tracking-widest">
                Esta tela atualiza sozinha quando o Pix for pago
              </p>
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
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className={`w-full px-4 py-3 bg-background/60 border rounded-sm font-code text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 transition-colors ${
          error
            ? "border-destructive focus:border-destructive focus:ring-destructive"
            : "border-border focus:border-brand focus:ring-brand"
        }`}
      />
      {error && (
        <span className="font-code text-[10px] text-destructive mt-1 block">
          [!] {error}
        </span>
      )}
    </label>
  );
}

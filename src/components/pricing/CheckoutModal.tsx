import { useEffect, useState } from "react";
import { ArrowLeft, Lock, Shield, X } from "lucide-react";
import { z } from "zod";

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

function buildCheckoutUrl(base: string, data: FormState) {
  const url = new URL(base);
  const params: Record<string, string> = {
    name: data.name.trim(),
    full_name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    phone: onlyDigits(data.whatsapp),
    whatsapp: onlyDigits(data.whatsapp),
    document: onlyDigits(data.cpf),
    cpf: onlyDigits(data.cpf),
  };
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  return url.toString();
}

export function CheckoutModal({ open, planName, link, onClose }: Props) {
  const [step, setStep] = useState<"form" | "checkout">("form");
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    whatsapp: "",
    cpf: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [checkoutUrl, setCheckoutUrl] = useState<string>("");

  useEffect(() => {
    if (!open) {
      setStep("form");
      setErrors({});
      setCheckoutUrl("");
    }
  }, [open]);

  if (!open) return null;

  const update = (field: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormState, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FormState;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setCheckoutUrl(buildCheckoutUrl(link, form));
    setStep("checkout");
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
            {step === "checkout" && (
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
              [ {step === "form" ? "Seus Dados" : "Pagamento Pix"} — Plano {planName} ]
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

        {step === "form" ? (
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

              <button
                type="submit"
                className="w-full mt-8 py-5 font-bold uppercase tracking-widest text-base bg-brand text-brand-foreground hover:bg-foreground hover:text-background transition-colors shadow-[0_0_30px_var(--brand-glow)] rounded-sm"
              >
                Gerar Pix Agora
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
        ) : (
          <iframe
            src={checkoutUrl}
            title={`Checkout ${planName}`}
            className="w-full flex-1 bg-white"
            allow="payment *"
          />
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

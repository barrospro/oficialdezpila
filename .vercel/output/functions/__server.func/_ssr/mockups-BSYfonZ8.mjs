import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { T as TopBanner, H as HeroSection, C as ContentSection, c as checkPixStatus, a as createPix } from "./nitro.functions-B5-SQx9B.mjs";
import { Q as QRCodeSVG } from "../_libs/qrcode.react.mjs";
import { u as useRouter } from "../_libs/tanstack__react-router.mjs";
import { l as isRedirect } from "../_libs/tanstack__router-core.mjs";
import { p as plans, f as features } from "./plans-data-Bomcg8wQ.mjs";
import "./index.mjs";
import "../_libs/seroval.mjs";
import { M as Monitor, S as Smartphone, T as Tablet, C as Check, L as Lock, A as ArrowLeft, X, a as LoaderCircle, b as Shield, c as Copy, d as Clock, e as Mail, f as MessageCircle, R as RefreshCw, g as CircleCheck, h as CircleAlert } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType, Z as ZodIssueCode } from "../_libs/zod.mjs";
import "./createSsrRpc-C2cGivNr.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
function useServerFn(serverFn) {
  const router = useRouter();
  return reactExports.useCallback(async (...args) => {
    try {
      const res = await serverFn(...args);
      if (isRedirect(res)) throw res;
      return res;
    } catch (err) {
      if (isRedirect(err)) {
        err.options._fromLocation = router.stores.location.get();
        return router.navigate(router.resolveRedirect(err).options);
      }
      throw err;
    }
  }, [router, serverFn]);
}
function PlanTabs({ plans: plans2, activeId, onSelect }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative bg-background/60 border border-border rounded-full p-1.5 flex items-center mb-10", children: plans2.map((plan) => {
    const isActive = plan.id === activeId;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => onSelect(plan.id),
        className: `relative flex-1 py-3 px-2 font-code text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-full ${isActive ? "bg-brand text-brand-foreground shadow-[0_0_20px_var(--brand-glow)]" : "text-muted-foreground hover:text-foreground"}`,
        children: [
          plan.name,
          plan.discount && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `absolute -top-2 -right-1 text-[8px] px-1.5 py-0.5 font-bold rounded-sm ${isActive ? "bg-foreground text-background" : "bg-brand text-brand-foreground"}`,
              children: plan.discount
            }
          )
        ]
      },
      plan.id
    );
  }) });
}
function PlanDetails({ plan, features: features2, onCheckout }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-code text-xs text-brand uppercase tracking-widest mb-3", children: [
        "[ PLANO ",
        plan.name,
        " — ",
        plan.screens.toUpperCase(),
        " ]"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-5xl md:text-7xl font-bold tabular-nums tracking-tighter font-code glow-text", children: [
          "R$",
          plan.price
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-code text-sm text-muted-foreground mb-3", children: plan.period })
      ] }),
      plan.originalPrice && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground/50 text-sm line-through font-code mt-2", children: [
        "de ",
        plan.originalPrice
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border my-8" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-4 mb-10 font-code text-sm", children: [...features2, ...plan.extra].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand mt-0.5 flex-shrink-0", children: "[✓]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/90", children: f })
    ] }, f)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: plan.link,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "w-full py-5 text-center font-bold uppercase tracking-widest text-base block bg-brand text-brand-foreground hover:bg-foreground hover:text-background transition-colors shadow-[0_0_30px_var(--brand-glow)] rounded-sm",
        children: [
          "ESCOLHER PLANO ",
          plan.name
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 text-center space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 text-muted-foreground font-code text-xs uppercase tracking-widest", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3 h-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Ambiente Seguro" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground/60 font-code text-xs", children: "Acesso imediato após pagamento" })
    ] })
  ] });
}
const PIX_TIMEOUT_MS = 20 * 60 * 1e3;
const STORAGE_KEY = "dezpila:checkout:v1";
function isBrowser() {
  return typeof window !== "undefined" && typeof window.sessionStorage !== "undefined";
}
function loadCheckout() {
  if (!isBrowser()) return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.v !== 1) return null;
    if (typeof parsed.step !== "string" || !parsed.pix?.hash || !parsed.pix?.pix_qr_code || typeof parsed.expiresAt !== "number") {
      return null;
    }
    const now = Date.now();
    if (parsed.step === "success" && now - parsed.savedAt > 24 * 60 * 60 * 1e3) {
      clearCheckout();
      return null;
    }
    if (parsed.step === "expired" && now - parsed.savedAt > 60 * 60 * 1e3) {
      clearCheckout();
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}
function saveCheckout(data) {
  if (!isBrowser()) return;
  try {
    const payload = { v: 1, savedAt: Date.now(), ...data };
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
  }
}
function clearCheckout() {
  if (!isBrowser()) return;
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
  }
}
function describeStatus(raw) {
  switch (raw) {
    case "paid":
    case "approved":
      return {
        tone: "success",
        label: "Pagamento confirmado",
        hint: "Liberando seu acesso..."
      };
    case "processing":
    case "pending":
    case "in_process":
    case "in_analysis":
      return {
        tone: "progress",
        label: "Pagamento em processamento",
        hint: "Recebemos seu Pix e estamos validando com o banco."
      };
    case "refused":
    case "failed":
      return {
        tone: "error",
        label: "Pagamento recusado",
        hint: "O banco recusou a transação. Tente gerar um novo Pix."
      };
    case "refunded":
    case "chargedback":
      return {
        tone: "error",
        label: "Pagamento estornado",
        hint: "Esta cobrança foi estornada. Gere um novo Pix para continuar."
      };
    case "expired":
    case "canceled":
      return {
        tone: "error",
        label: "Cobrança encerrada",
        hint: "Este Pix não está mais ativo. Gere um novo código."
      };
    case "waiting_payment":
    default:
      return {
        tone: "pending",
        label: "Aguardando pagamento",
        hint: "Escaneie o QR Code ou cole o código no seu app do banco."
      };
  }
}
function formatCountdown(ms) {
  const total = Math.max(0, Math.floor(ms / 1e3));
  const m = Math.floor(total / 60).toString().padStart(2, "0");
  const s = (total % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}
const onlyDigits = (v) => v.replace(/\D/g, "");
const maskWhatsapp = (v) => {
  const d = onlyDigits(v).slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};
const maskCpf = (v) => {
  const d = onlyDigits(v).slice(0, 11);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
  if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
};
const isValidCpf = (raw) => {
  const cpf = onlyDigits(raw);
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(cpf[i]) * (10 - i);
  let d1 = sum * 10 % 11;
  if (d1 === 10) d1 = 0;
  if (d1 !== parseInt(cpf[9])) return false;
  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(cpf[i]) * (11 - i);
  let d2 = sum * 10 % 11;
  if (d2 === 10) d2 = 0;
  return d2 === parseInt(cpf[10]);
};
const schema = objectType({
  name: stringType().trim().min(3, "Informe seu nome completo").max(100, "Nome muito longo").regex(/\s/, "Informe nome e sobrenome"),
  email: stringType().trim().toLowerCase().max(255, "E-mail muito longo").superRefine((v, ctx) => {
    if (v.length === 0) {
      ctx.addIssue({ code: ZodIssueCode.custom, message: "Informe seu e-mail" });
      return;
    }
    if (/\s/.test(v)) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: "E-mail não pode conter espaços"
      });
      return;
    }
    const atCount = (v.match(/@/g) ?? []).length;
    if (atCount === 0) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: 'E-mail deve conter "@"'
      });
      return;
    }
    if (atCount > 1) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: 'E-mail deve conter apenas um "@"'
      });
      return;
    }
    const [local, domain] = v.split("@");
    if (!local) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: 'Informe o nome antes do "@"'
      });
      return;
    }
    if (!domain) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: 'Informe o domínio após o "@" (ex: gmail.com)'
      });
      return;
    }
    if (!domain.includes(".")) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: "Domínio incompleto — faltou o final (ex: .com)"
      });
      return;
    }
    const tld = domain.split(".").pop() ?? "";
    if (tld.length < 2) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: "Domínio inválido — verifique o final (ex: .com, .com.br)"
      });
      return;
    }
    if (!/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(\.[a-z0-9-]+)+$/i.test(v)) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: "Formato de e-mail inválido"
      });
    }
  }),
  whatsapp: stringType().transform(onlyDigits).superRefine((v, ctx) => {
    if (v.length === 0) {
      ctx.addIssue({ code: ZodIssueCode.custom, message: "Informe seu WhatsApp" });
      return;
    }
    if (v.length < 10) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: "WhatsApp incompleto — informe DDD + número (11 dígitos)"
      });
      return;
    }
    if (v.length > 11) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: "WhatsApp deve ter no máximo 11 dígitos (DDD + número)"
      });
      return;
    }
    const ddd = parseInt(v.slice(0, 2), 10);
    if (ddd < 11) {
      ctx.addIssue({ code: ZodIssueCode.custom, message: "DDD inválido" });
      return;
    }
    if (v.length === 11 && v[2] !== "9") {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: "Número de celular deve começar com 9 após o DDD"
      });
      return;
    }
    if (v.length === 10) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: "Informe um celular com 9 dígitos após o DDD"
      });
    }
  }),
  cpf: stringType().transform(onlyDigits).superRefine((v, ctx) => {
    if (v.length === 0) {
      ctx.addIssue({ code: ZodIssueCode.custom, message: "Informe seu CPF" });
      return;
    }
    if (v.length < 11) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: `CPF incompleto — faltam ${11 - v.length} dígito${11 - v.length > 1 ? "s" : ""}`
      });
      return;
    }
    if (v.length > 11) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: "CPF deve ter 11 dígitos"
      });
      return;
    }
    if (/^(\d)\1{10}$/.test(v)) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: "CPF inválido (todos os dígitos iguais)"
      });
      return;
    }
    if (!isValidCpf(v)) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: "CPF inválido — verifique o dígito verificador"
      });
    }
  })
});
const fieldSchemas = {
  name: schema.shape.name,
  email: schema.shape.email,
  whatsapp: schema.shape.whatsapp,
  cpf: schema.shape.cpf
};
function validateField(field, value) {
  const result = fieldSchemas[field].safeParse(value);
  if (result.success) return void 0;
  return result.error.issues[0]?.message ?? "Valor inválido";
}
const VALID_OFFERS = ["ni918", "h64gr", "oinxr", "lzcus"];
function extractOfferHash(link) {
  try {
    const url = new URL(link);
    const last = url.pathname.split("/").filter(Boolean).pop() ?? "";
    return VALID_OFFERS.includes(last) ? last : null;
  } catch {
    return null;
  }
}
function formatBrl(cents) {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}
function CheckoutModal({ open, planId, planName, link, onClose }) {
  const createPixFn = useServerFn(createPix);
  const checkStatusFn = useServerFn(checkPixStatus);
  const [step, setStep] = reactExports.useState("form");
  const [form, setForm] = reactExports.useState({
    name: "",
    email: "",
    whatsapp: "",
    cpf: ""
  });
  const [errors, setErrors] = reactExports.useState({});
  const [touched, setTouched] = reactExports.useState({});
  const [submitAttempted, setSubmitAttempted] = reactExports.useState(false);
  const [pix, setPix] = reactExports.useState(null);
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [submitError, setSubmitError] = reactExports.useState(null);
  const [copied, setCopied] = reactExports.useState(false);
  const [pixExpiresAt, setPixExpiresAt] = reactExports.useState(null);
  const [remainingMs, setRemainingMs] = reactExports.useState(PIX_TIMEOUT_MS);
  const [paymentStatus, setPaymentStatus] = reactExports.useState(null);
  const [lastCheckedAt, setLastCheckedAt] = reactExports.useState(null);
  const [hydrated, setHydrated] = reactExports.useState(false);
  const pollRef = reactExports.useRef(null);
  const inFlightRef = reactExports.useRef(false);
  const offerHash = extractOfferHash(link);
  const liveValidation = schema.safeParse(form);
  const formIsValid = liveValidation.success;
  const liveErrors = {};
  if (!liveValidation.success) {
    for (const issue of liveValidation.error.issues) {
      const key = issue.path[0];
      if (!liveErrors[key]) liveErrors[key] = issue.message;
    }
  }
  const summaryErrors = Object.entries(liveErrors).filter(([field, msg]) => !!msg && (submitAttempted || touched[field])).map(([field, msg]) => [field, msg]);
  const fieldLabels = {
    name: "Nome completo",
    email: "E-mail",
    whatsapp: "WhatsApp",
    cpf: "CPF"
  };
  reactExports.useEffect(() => {
    const persisted = loadCheckout();
    if (persisted) {
      const isExpired = persisted.step === "pix" && persisted.expiresAt <= Date.now();
      setForm(persisted.form);
      setPix(persisted.pix);
      setPixExpiresAt(persisted.expiresAt);
      setRemainingMs(Math.max(0, persisted.expiresAt - Date.now()));
      setStep(isExpired ? "expired" : persisted.step);
    }
    setHydrated(true);
  }, []);
  reactExports.useEffect(() => {
    if (!open && hydrated) {
      setStep("form");
      setErrors({});
      setTouched({});
      setSubmitAttempted(false);
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
      const persisted = loadCheckout();
      if (!persisted || persisted.step === "success" || persisted.step === "expired") {
        clearCheckout();
      }
    }
  }, [open, hydrated]);
  reactExports.useEffect(() => {
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
      expiresAt: pixExpiresAt
    });
  }, [hydrated, step, pix, pixExpiresAt, planId, planName, offerHash, form]);
  reactExports.useEffect(() => {
    if (step !== "pix" || !pix) return;
    if (pixExpiresAt && pixExpiresAt <= Date.now()) return;
    let cancelled = false;
    const activeHash = pix.hash;
    const tick = async () => {
      if (cancelled) return;
      if (pixExpiresAt && pixExpiresAt <= Date.now()) return;
      try {
        const res = await checkStatusFn({ data: { hash: activeHash } });
        if (cancelled) return;
        if (pixExpiresAt && pixExpiresAt <= Date.now()) return;
        if (res.ok) {
          setPaymentStatus(res.status ?? "waiting_payment");
          setLastCheckedAt(Date.now());
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
          setStep("expired");
        }
      } catch {
      }
    };
    tick();
    pollRef.current = window.setInterval(tick, 4e3);
    return () => {
      cancelled = true;
      if (pollRef.current) {
        window.clearInterval(pollRef.current);
        pollRef.current = null;
      }
    };
  }, [step, pix, pixExpiresAt, checkStatusFn]);
  reactExports.useEffect(() => {
    if (step !== "pix" || !pixExpiresAt) return;
    const update2 = () => {
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
    update2();
    const id = window.setInterval(update2, 1e3);
    return () => window.clearInterval(id);
  }, [step, pixExpiresAt]);
  if (!open) return null;
  const update = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    const digits = value.replace(/\D/g, "");
    const isComplete = field === "cpf" && digits.length === 11 || field === "whatsapp" && digits.length === 11;
    if (isComplete && !touched[field]) {
      setTouched((t) => ({ ...t, [field]: true }));
      const msg = validateField(field, value);
      setErrors((e) => ({ ...e, [field]: msg }));
      return;
    }
    if (touched[field]) {
      const msg = validateField(field, value);
      setErrors((e) => ({ ...e, [field]: msg }));
    } else if (errors[field]) {
      setErrors((e) => ({ ...e, [field]: void 0 }));
    }
  };
  const handleBlur = (field) => {
    setTouched((t) => ({ ...t, [field]: true }));
    const msg = validateField(field, form[field]);
    setErrors((e) => ({ ...e, [field]: msg }));
  };
  const generatePix = async () => {
    if (inFlightRef.current) return false;
    setSubmitError(null);
    if (!offerHash) {
      setSubmitError("Plano inválido. Recarregue a página.");
      return false;
    }
    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0];
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      setTouched((t) => ({
        ...t,
        ...Object.keys(fieldErrors).reduce(
          (acc, k) => ({ ...acc, [k]: true }),
          {}
        )
      }));
      const count = Object.keys(fieldErrors).length;
      setSubmitError(
        count === 1 ? "Corrija o campo destacado para continuar." : `Corrija os ${count} campos destacados para continuar.`
      );
      return false;
    }
    inFlightRef.current = true;
    setSubmitting(true);
    try {
      const res = await createPixFn({
        data: {
          offerHash,
          name: form.name,
          email: form.email,
          whatsapp: form.whatsapp,
          cpf: form.cpf
        }
      });
      if (!res.ok) {
        setSubmitError(res.error);
        return false;
      }
      setPix({
        hash: res.hash,
        pix_qr_code: res.pix_qr_code,
        amount: res.amount,
        offer_title: res.offer_title
      });
      const serverExpires = res.expires_at ? Date.parse(res.expires_at) : NaN;
      const expiresAt = Number.isNaN(serverExpires) ? Date.now() + PIX_TIMEOUT_MS : serverExpires;
      setPixExpiresAt(expiresAt);
      setRemainingMs(Math.max(0, expiresAt - Date.now()));
      setPaymentStatus(res.status ?? "waiting_payment");
      setLastCheckedAt(Date.now());
      setStep("pix");
      return true;
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Erro ao gerar o Pix. Tente novamente.");
      return false;
    } finally {
      setSubmitting(false);
      inFlightRef.current = false;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitAttempted(true);
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
      window.setTimeout(() => setCopied(false), 2e3);
    } catch {
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-2 sm:p-6 animate-in fade-in duration-200",
      onClick: onClose,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "relative w-full max-w-4xl h-[90vh] bg-background border border-brand/40 rounded-lg shadow-[0_0_60px_var(--brand-glow)] overflow-hidden flex flex-col",
          onClick: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-border bg-background/95 flex-shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                (step === "pix" || step === "expired") && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setStep("form"),
                    className: "text-muted-foreground hover:text-foreground transition-colors p-1 rounded-sm hover:bg-muted flex-shrink-0",
                    "aria-label": "Voltar",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-code text-[10px] sm:text-xs uppercase tracking-widest text-brand truncate", children: [
                  "[",
                  " ",
                  step === "form" ? "Seus Dados" : step === "pix" ? "Pagamento Pix" : step === "expired" ? "Pix Expirado" : "Pagamento Confirmado",
                  " ",
                  "— Plano ",
                  planName,
                  " ]"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "text-muted-foreground hover:text-foreground transition-colors p-1 rounded-sm hover:bg-muted flex-shrink-0",
                  "aria-label": "Fechar checkout",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
                }
              )
            ] }),
            step === "form" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "form",
              {
                onSubmit: handleSubmit,
                className: "flex-1 overflow-y-auto px-6 py-8 sm:px-10 sm:py-10",
                noValidate: true,
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-code text-[10px] uppercase tracking-widest text-brand mb-2", children: "[ Etapa 1 de 2 ]" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold tracking-tight", children: "Quase lá! Confirme seus dados" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-code text-xs mt-2", children: "Para gerar seu Pix em segundos" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Field,
                      {
                        label: "Nome completo",
                        value: form.name,
                        onChange: (v) => update("name", v),
                        onBlur: () => handleBlur("name"),
                        valid: touched.name && !errors.name && !!form.name,
                        placeholder: "João da Silva",
                        error: errors.name,
                        autoComplete: "name"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Field,
                      {
                        label: "E-mail",
                        type: "email",
                        value: form.email,
                        onChange: (v) => update("email", v),
                        onBlur: () => handleBlur("email"),
                        valid: touched.email && !errors.email && !!form.email,
                        placeholder: "voce@email.com",
                        error: errors.email,
                        autoComplete: "email",
                        inputMode: "email"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Field,
                      {
                        label: "WhatsApp",
                        value: form.whatsapp,
                        onChange: (v) => update("whatsapp", maskWhatsapp(v)),
                        onBlur: () => handleBlur("whatsapp"),
                        valid: touched.whatsapp && !errors.whatsapp && !!form.whatsapp,
                        placeholder: "(11) 99999-9999",
                        error: errors.whatsapp,
                        autoComplete: "tel",
                        inputMode: "tel"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Field,
                      {
                        label: "CPF",
                        value: form.cpf,
                        onChange: (v) => update("cpf", maskCpf(v)),
                        onBlur: () => handleBlur("cpf"),
                        valid: touched.cpf && !errors.cpf && !!form.cpf,
                        placeholder: "000.000.000-00",
                        error: errors.cpf,
                        inputMode: "numeric"
                      }
                    )
                  ] }),
                  (submitError || summaryErrors.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 px-4 py-3 border border-destructive/50 bg-destructive/10 rounded-sm", children: [
                    submitError && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-code text-[11px] text-destructive", children: [
                      "[!] ",
                      submitError
                    ] }),
                    summaryErrors.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-2 space-y-1", children: summaryErrors.map(([field, msg]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "li",
                      {
                        className: "font-code text-[11px] text-destructive flex gap-2",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-70", children: "›" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { className: "font-semibold", children: [
                              fieldLabels[field],
                              ":"
                            ] }),
                            " ",
                            msg
                          ] })
                        ]
                      },
                      field
                    )) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "submit",
                      disabled: submitting || !formIsValid,
                      "aria-disabled": submitting || !formIsValid,
                      className: "w-full mt-8 py-5 font-bold uppercase tracking-widest text-base bg-brand text-brand-foreground hover:bg-foreground hover:text-background transition-colors shadow-[0_0_30px_var(--brand-glow)] rounded-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2",
                      children: [
                        submitting && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                        submitting ? "Gerando Pix..." : "Gerar Pix Agora"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center justify-center gap-4 text-muted-foreground font-code text-[10px] uppercase tracking-widest", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3 h-3" }),
                      " Seguro"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3 h-3" }),
                      " Dados Protegidos"
                    ] })
                  ] })
                ] })
              }
            ),
            step === "pix" && pix && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto px-6 py-8 sm:px-10 sm:py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-code text-[10px] uppercase tracking-widest text-brand mb-2", children: "[ Etapa 2 de 2 ]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold tracking-tight", children: "Escaneie ou copie o código Pix" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground font-code text-xs mt-2", children: [
                  pix.offer_title,
                  " — ",
                  formatBrl(pix.amount)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white p-4 rounded-sm border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(QRCodeSVG, { value: pix.pix_qr_code, size: 220, level: "M", includeMargin: false }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-code text-[10px] uppercase tracking-widest text-muted-foreground block", children: "Código copia-e-cola" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-stretch gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      readOnly: true,
                      value: pix.pix_qr_code,
                      onFocus: (e) => e.currentTarget.select(),
                      className: "flex-1 px-3 py-2 bg-background/60 border border-border rounded-sm font-code text-[11px] text-foreground/80 truncate focus:outline-none focus:border-brand"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: handleCopyPix,
                      className: "px-3 py-2 border border-brand bg-brand/10 text-brand hover:bg-brand hover:text-brand-foreground transition-colors rounded-sm font-code text-[10px] uppercase tracking-widest flex items-center gap-1.5",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3 h-3" }),
                        copied ? "Copiado!" : "Copiar"
                      ]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBanner, { info: describeStatus(paymentStatus), lastCheckedAt }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-center gap-1.5 text-muted-foreground font-code text-[10px] uppercase tracking-widest", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                "Expira em ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand", children: formatCountdown(remainingMs) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-center text-muted-foreground/70 font-code text-[10px] uppercase tracking-widest", children: "Esta tela atualiza sozinha — você não precisa recarregar" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 px-4 py-4 border border-brand/40 bg-brand/5 rounded-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-code text-[10px] uppercase tracking-widest text-brand mb-3 text-center", children: "[ Após o pagamento ]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 font-code text-xs text-center mb-3 leading-relaxed", children: "Os dados de acesso ao aplicativo serão enviados automaticamente para você por:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-4 text-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 font-code text-[11px]", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-3.5 h-3.5 text-brand" }),
                    "E-mail"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/40", children: "|" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 font-code text-[11px]", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-3.5 h-3.5 text-brand" }),
                    "WhatsApp"
                  ] })
                ] })
              ] })
            ] }) }),
            step === "expired" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto px-6 py-12 sm:px-10 sm:py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-destructive/15 border border-destructive/60 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-10 h-10 text-destructive" }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-code text-[10px] uppercase tracking-widest text-destructive mb-2", children: "[ Pix expirado ]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold tracking-tight mb-3", children: "O tempo do seu Pix acabou" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-code text-xs mb-8", children: "Por segurança, códigos Pix expiram após 20 minutos sem pagamento. Gere um novo código com os mesmos dados em um clique." }),
              submitError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 px-4 py-3 border border-destructive/50 bg-destructive/10 rounded-sm text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-code text-[11px] text-destructive", children: [
                "[!] ",
                submitError
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: handleRegenerate,
                  disabled: submitting,
                  className: "w-full py-4 font-bold uppercase tracking-widest text-sm bg-brand text-brand-foreground hover:bg-foreground hover:text-background transition-colors shadow-[0_0_30px_var(--brand-glow)] rounded-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2",
                  children: [
                    submitting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
                    submitting ? "Gerando novo Pix..." : "Gerar novo Pix"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setStep("form"),
                  className: "w-full mt-3 py-3 font-code text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors",
                  children: "Editar meus dados"
                }
              )
            ] }) }),
            step === "success" && pix && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto px-6 py-12 sm:px-10 sm:py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-brand/15 border border-brand flex items-center justify-center shadow-[0_0_40px_var(--brand-glow)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-10 h-10 text-brand" }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-code text-[10px] uppercase tracking-widest text-brand mb-2", children: "[ Pagamento confirmado ]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-2xl font-bold tracking-tight mb-3", children: [
                "Tudo pronto, ",
                form.name.split(" ")[0],
                "!"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground font-code text-xs mb-8", children: [
                "Recebemos seu pagamento de",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: formatBrl(pix.amount) }),
                ". Em instantes você receberá o acesso por e-mail e WhatsApp."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "w-full py-4 font-bold uppercase tracking-widest text-sm bg-brand text-brand-foreground hover:bg-foreground hover:text-background transition-colors shadow-[0_0_30px_var(--brand-glow)] rounded-sm",
                  children: "Fechar"
                }
              )
            ] }) })
          ]
        }
      )
    }
  );
}
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
  inputMode
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-code text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5 block", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type,
          value,
          onChange: (e) => onChange(e.target.value),
          onBlur,
          placeholder,
          autoComplete,
          inputMode,
          "aria-invalid": !!error,
          className: `w-full px-4 py-3 pr-10 bg-background/60 border rounded-sm font-code text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 transition-colors ${error ? "border-destructive focus:border-destructive focus:ring-destructive" : valid ? "border-brand/60 focus:border-brand focus:ring-brand" : "border-border focus:border-brand focus:ring-brand"}`
        }
      ),
      error ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-destructive pointer-events-none" }) : valid ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand pointer-events-none" }) : null
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-code text-[10px] text-destructive mt-1 block", children: [
      "[!] ",
      error
    ] })
  ] });
}
function StatusBanner({ info, lastCheckedAt }) {
  const styles = {
    pending: {
      wrap: "border-brand/40 bg-brand/5",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin text-brand" }),
      label: "text-brand"
    },
    progress: {
      wrap: "border-yellow-500/50 bg-yellow-500/10",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin text-yellow-400" }),
      label: "text-yellow-300"
    },
    success: {
      wrap: "border-brand bg-brand/15",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-brand" }),
      label: "text-brand"
    },
    error: {
      wrap: "border-destructive/60 bg-destructive/10",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 text-destructive" }),
      label: "text-destructive"
    }
  };
  const s = styles[info.tone];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `mt-8 px-4 py-3 border rounded-sm ${s.wrap}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      s.icon,
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-code text-[11px] uppercase tracking-widest font-bold ${s.label}`, children: info.label })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 ml-6 font-code text-[11px] text-muted-foreground leading-relaxed", children: info.hint }),
    lastCheckedAt && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 ml-6 font-code text-[9px] uppercase tracking-widest text-muted-foreground/60", children: [
      "Última verificação: ",
      new Date(lastCheckedAt).toLocaleTimeString("pt-BR")
    ] })
  ] });
}
function PricingPlans() {
  const [activeId, setActiveId] = reactExports.useState("SEMESTRAL");
  const [checkoutOpen, setCheckoutOpen] = reactExports.useState(false);
  const active = plans.find((p) => p.id === activeId);
  reactExports.useEffect(() => {
    const persisted = loadCheckout();
    if (!persisted) return;
    if (plans.some((p) => p.id === persisted.planId)) {
      setActiveId(persisted.planId);
    }
    setCheckoutOpen(true);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "planos", className: "px-6 lg:px-12 py-24 relative z-10 border-t border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-code text-brand text-xs uppercase tracking-widest mb-4 font-bold", children: "Selecione Seu Nível de Acesso" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "section-title text-center", children: [
          "ESCOLHA SEU",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-brand to-orange-500", children: "PLANO" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-4 font-code text-sm", children: "Acesso total liberado em minutos após o pagamento" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-surface !p-6 md:!p-10 relative overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PlanTabs, { plans, activeId, onSelect: setActiveId }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PlanDetails, { plan: active, features, onCheckout: () => setCheckoutOpen(true) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CheckoutModal,
      {
        open: checkoutOpen,
        planId: active.id,
        planName: active.name,
        link: active.link,
        onClose: () => setCheckoutOpen(false)
      }
    )
  ] });
}
function MockupsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-slate-50 p-8 font-sans", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto space-y-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "text-center space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold text-slate-900", children: "Showcase de Mockups" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-600 max-w-2xl mx-auto", children: "Visualização do projeto em diferentes dispositivos e contextos de apresentação." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 border-b pb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Monitor, { className: "w-5 h-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-semibold text-slate-800", children: "Desktop / Laptop View" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-[900px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative bg-slate-800 rounded-t-xl p-2 pb-0 shadow-2xl border-x-4 border-t-4 border-slate-700", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-t-sm overflow-hidden aspect-video border shadow-inner", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full overflow-y-auto overflow-x-hidden scrollbar-hide scale-[0.85] origin-top", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-black min-h-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TopBanner, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(HeroSection, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ContentSection, {})
        ] }) }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-slate-700 h-4 w-full rounded-b-xl relative shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-slate-600 rounded-b-md" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid grid-cols-1 md:grid-cols-2 gap-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 border-b pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "w-5 h-5 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-slate-800", children: "Mobile View (iPhone)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto w-[280px] h-[580px] bg-slate-900 rounded-[3rem] p-3 shadow-2xl border-[6px] border-slate-800", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full bg-black rounded-[2.5rem] overflow-hidden border border-slate-700 relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-slate-900 rounded-b-2xl z-10 flex justify-center items-end pb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-slate-800 mr-2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-1 rounded-full bg-slate-800" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full overflow-y-auto scrollbar-hide pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "scale-[0.5] origin-top w-[200%] -ml-[50%]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(HeroSection, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx(PricingPlans, {})
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -left-1.5 top-24 w-1.5 h-12 bg-slate-800 rounded-l-md" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -left-1.5 top-40 w-1.5 h-20 bg-slate-800 rounded-l-md" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-1.5 top-32 w-1.5 h-24 bg-slate-800 rounded-r-md" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 border-b pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tablet, { className: "w-5 h-5 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-slate-800", children: "Tablet Preview" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mx-auto w-[400px] h-[540px] bg-slate-900 rounded-3xl p-4 shadow-2xl border-[8px] border-slate-800", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full bg-black rounded-xl overflow-hidden border border-slate-700", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full overflow-y-auto scrollbar-hide p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "scale-[0.6] origin-top", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PricingPlans, {}) }) }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 border-b pb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-5 h-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-semibold text-slate-800", children: "Product Shots / Screenshots" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative overflow-hidden rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square bg-black overflow-hidden p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "scale-[0.4] origin-top-left", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeroSection, {}) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-t", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-medium", children: "Hero Section Shot" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: "Ideal para redes sociais e ads." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative overflow-hidden rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square bg-black overflow-hidden p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "scale-[0.4] origin-top-left", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PricingPlans, {}) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-t", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-medium", children: "Pricing Plans Shot" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: "Destaque de conversão." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative overflow-hidden rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square bg-black overflow-hidden p-4 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-white p-8 border-2 border-dashed border-slate-700 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm italic opacity-50", children: "Capture Manual via Browser" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-2", children: "Use Win+Shift+S ou Cmd+Shift+4" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-t", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-medium", children: "Custom Capture Area" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: "Área pronta para exportação manual." })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "bg-slate-900 text-white p-8 rounded-2xl text-center space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold", children: "Como exportar em PNG?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-sm max-w-md mx-auto", children: "Embora eu não consiga gerar o arquivo .png diretamente para download via chat, você pode usar a ferramenta de captura do seu sistema nestas seções preparadas para obter mockups com qualidade profissional." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-center gap-4 text-xs font-mono", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-slate-800 px-3 py-1 rounded", children: "macOS: Cmd + Shift + 4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-slate-800 px-3 py-1 rounded", children: "Windows: Win + Shift + S" })
      ] })
    ] })
  ] }) });
}
export {
  MockupsPage as component
};

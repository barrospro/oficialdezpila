import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { T as TopBanner, H as HeroSection, C as ContentSection, b as checkNitroPixStatus, d as createNitroPix } from "./nitro.functions-B5-SQx9B.mjs";
import { N as NavbarGlassFixa, F as Footer } from "./Footer-CD3w_7zL.mjs";
import { r as reactDomExports } from "../_libs/react-dom.mjs";
import { Q as QRCodeSVG } from "../_libs/qrcode.react.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import "./index.mjs";
import "../_libs/seroval.mjs";
import { C as Check, g as CircleCheck, k as Tv, Z as Zap, l as ShieldCheck, B as CirclePlay, o as Sparkles, m as Search, X, F as Film, P as Play, E as CheckCheck, x as Star, G as Eye, f as MessageCircle, A as ArrowLeft, H as EyeOff, b as Shield, J as Minus, K as Plus, N as LockKeyhole, O as BookOpen, a as LoaderCircle, d as Clock, c as Copy, Q as CircleCheckBig, W as Cpu, q as Layers, S as Smartphone, M as Monitor } from "../_libs/lucide-react.mjs";
import "./createSsrRpc-C2cGivNr.mjs";
import "../_libs/zod.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/isbot.mjs";
const services = [
  { name: "Netflix", price: "R$ 44,90" },
  { name: "HBO Max", price: "R$ 44,90" },
  { name: "Prime Video", price: "R$ 19,90" },
  { name: "Disney+", price: "R$ 49,90" },
  { name: "Apple TV+", price: "R$ 29,90" },
  { name: "Telecine", price: "R$ 29,90" },
  { name: "Combate", price: "R$ 49,90" },
  { name: "Premiere", price: "R$ 59,90" },
  { name: "Sky", price: "R$ 139,90" },
  { name: "Paramount+", price: "R$ 34,90" },
  { name: "Crunchyroll", price: "R$ 19,90" },
  { name: "Claro TV", price: "R$ 65,40" }
];
function ServiceLogo({ name }) {
  switch (name) {
    case "Netflix":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1.5 font-heading font-black tracking-wider text-[#E50914] text-base uppercase", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "h-5 w-4 fill-[#E50914]", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M5.398 0v24l4.577-2.584V9.827L14.73 24l4.757-2.686V0h-4.577v14.173L10.155 0H5.398z" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "NETFLIX" })
      ] });
    case "HBO Max":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1 font-heading font-black tracking-tight text-white text-base", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#9900EF] text-lg font-black", children: "HBO" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-extrabold lowercase text-xs bg-[#9900EF]/30 px-1 rounded border border-[#9900EF]/50", children: "max" })
      ] });
    case "Prime Video":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center leading-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 font-heading font-bold text-white text-sm tracking-tight", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "prime" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#00A8E1] font-extrabold", children: "video" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "h-2 w-12 text-[#00A8E1] fill-current -mt-0.5", viewBox: "0 0 60 12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M2 3c15 6 35 6 54 0 1-.3 2 .5 1 1-14 7-38 7-56 0-1-.5 0-1.3 1-1z" }) })
      ] });
    case "Disney+":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-0.5 font-heading font-black text-white text-base tracking-tight", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic font-serif text-lg text-[#0063E5] font-black", children: "Disney" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#0063E5] font-black text-lg", children: "+" })
      ] });
    case "Apple TV+":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1 font-heading font-bold text-white text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "h-4 w-4 fill-white", viewBox: "0 0 170 170", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.91.13-9.79-1.92-14.64-6.15-3.17-2.76-7.05-7.43-11.64-14.02-6.42-9.2-11.22-19.78-14.4-31.74-3.18-11.97-4.78-23.36-4.78-34.19 0-14.75 3.53-26.96 10.59-36.64 7.05-9.69 16.03-14.63 26.93-14.85 5.03 0 10.37 1.25 16.03 3.75 5.66 2.5 9.77 3.75 12.33 3.75 2.12 0 6.33-1.33 12.63-4 6.31-2.67 11.45-3.88 15.42-3.64 12.08.97 21.6 5.71 28.56 14.22-10.74 6.49-16.01 15.54-15.82 27.15.19 9.07 3.63 16.59 10.32 22.56 6.7 5.97 14.62 9.29 23.77 9.96-2.4 7.04-5.63 14.26-9.69 21.65zM119.22 31.09c0-7.39 2.68-14.54 8.04-21.46 5.37-6.92 12.18-11.02 20.44-12.3 1.01 8.52-1.74 16.32-8.25 23.4-6.51 7.08-13.91 10.87-22.23 11.36h-2c0-.33 0-66 2-1h0z" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "tv+" })
      ] });
    case "Telecine":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1 font-heading font-black text-[#E30613] text-sm tracking-wider uppercase", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-[#E30613] animate-pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "TELE CINE" })
      ] });
    case "Combate":
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-1 font-heading font-black text-[#D40000] text-xs tracking-widest uppercase bg-[#D40000]/10 px-2 py-0.5 rounded border border-[#D40000]/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "COMBATE" }) });
    case "Premiere":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1 font-heading font-black text-[#008037] text-sm tracking-wider uppercase", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#008037] font-black text-base", children: "P" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "PREMIERE" })
      ] });
    case "Sky":
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center font-heading font-black text-[#E60000] text-lg tracking-tighter uppercase italic", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "SKY" }) });
    case "Paramount+":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1 font-heading font-black text-[#0064FF] text-xs tracking-tight uppercase", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-black", children: "★" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "PARAMOUNT+" })
      ] });
    case "Crunchyroll":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1.5 font-heading font-bold text-[#FF6600] text-xs tracking-tight", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3.5 w-3.5 rounded-full border-2 border-[#FF6600] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-1.5 rounded-full bg-[#FF6600]" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-extrabold uppercase", children: "crunchyroll" })
      ] });
    case "Claro TV":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1 font-heading font-black text-[#DA291C] text-sm tracking-wider uppercase", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#DA291C]", children: "Claro" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white text-xs font-bold bg-[#DA291C] px-1 rounded", children: "tv" })
      ] });
    default:
      return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-sm", children: name });
  }
}
function PriceComparison() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "comparativo", className: "px-6 lg:px-12 py-24 relative z-10 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-code text-brand text-xs uppercase tracking-widest mb-4 font-bold", children: "Análise de Mercado // Comparativo Real" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "section-title text-center mb-4", children: [
        "Isso é o que você pagaria",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "se assinasse tudo separado:" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-16", children: services.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "card-surface text-center py-5 px-3 flex flex-col items-center justify-between min-h-[100px] border border-border/80 hover:border-brand/40 transition-all hover:shadow-[0_0_20px_rgba(151,2,2,0.2)]",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center justify-center w-full py-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ServiceLogo, { name: s.name }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground font-code text-xs font-semibold mt-2", children: [
            s.price,
            "/mês"
          ] })
        ]
      },
      s.name
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-muted-foreground uppercase tracking-widest font-code", children: "Total Combinado" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-5xl md:text-6xl font-bold line-through text-muted-foreground/40 tabular-nums font-code", children: "R$ 589,30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative inline-block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-4 bg-brand/10 blur-xl rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "relative text-2xl md:text-3xl font-bold uppercase tracking-tight", children: "Com a DezPila você paga apenas" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-1 justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold mt-3 text-muted-foreground font-code", children: "R$" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-8xl md:text-9xl font-bold text-brand tabular-nums tracking-tighter font-code glow-text", children: "10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-start mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl font-bold text-brand tabular-nums tracking-tighter font-code", children: ",00" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold uppercase text-muted-foreground font-code", children: "/mês" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#planos", className: "btn-brand text-lg", children: "ADQUIRA O SEU AGORA" }) })
    ] })
  ] }) });
}
function AccountCheckoutModal({
  open,
  plano,
  onClose
}) {
  const [step, setStep] = reactExports.useState("CADASTRO");
  const [nome, setNome] = reactExports.useState("");
  const [cpf, setCpf] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [senha, setSenha] = reactExports.useState("");
  const [verSenha, setVerSenha] = reactExports.useState(false);
  const [whatsapp, setWhatsapp] = reactExports.useState("");
  const [lembrar, setLembrar] = reactExports.useState(true);
  const [telasExtras, setTelasExtras] = reactExports.useState(0);
  const telaExtraUnit = 5.9;
  const [pacoteAdulto, setPacoteAdulto] = reactExports.useState(false);
  const pacoteAdultoPrice = 12.9;
  const [pacoteCristoFlix, setPacoteCristoFlix] = reactExports.useState(false);
  const pacoteCristoFlixPrice = 7.9;
  const [copied, setCopied] = reactExports.useState(false);
  const [timerSeconds, setTimerSeconds] = reactExports.useState(900);
  const [loadingPix, setLoadingPix] = reactExports.useState(false);
  const [pixPayload, setPixPayload] = reactExports.useState("");
  const [pixQrBase64, setPixQrBase64] = reactExports.useState(null);
  const [caktoOrderId, setCaktoOrderId] = reactExports.useState(null);
  const [apiError, setApiError] = reactExports.useState(null);
  const [mounted, setMounted] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setMounted(true);
  }, []);
  reactExports.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.classList.add("checkout-modal-open");
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.classList.remove("checkout-modal-open");
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.classList.remove("checkout-modal-open");
    };
  }, [open]);
  reactExports.useEffect(() => {
    if (open) {
      const savedUser = localStorage.getItem("dezpila_user_account");
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          if (parsed.nome) setNome(parsed.nome);
          if (parsed.cpf) setCpf(parsed.cpf);
          if (parsed.email) setEmail(parsed.email);
          if (parsed.whatsapp) setWhatsapp(parsed.whatsapp);
        } catch {
        }
      }
      setStep("CADASTRO");
      setTelasExtras(0);
      setPacoteAdulto(false);
      setPacoteCristoFlix(false);
      setTimerSeconds(900);
      setLoadingPix(false);
      setPixPayload("");
      setPixQrBase64(null);
      setCaktoOrderId(null);
      setApiError(null);
    }
  }, [open]);
  reactExports.useEffect(() => {
    if (!open || step !== "PAGAMENTO") return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          setStep("EXPIRADO");
          return 0;
        }
        return prev - 1;
      });
    }, 1e3);
    return () => clearInterval(interval);
  }, [open, step]);
  reactExports.useEffect(() => {
    if (!open || step !== "PAGAMENTO" || !caktoOrderId) return;
    const pollInterval = setInterval(async () => {
      try {
        const res = await checkNitroPixStatus({
          data: { transactionId: caktoOrderId }
        });
        if (res.ok && res.paid) {
          setStep("SUCESSO");
        }
      } catch {
      }
    }, 3500);
    return () => clearInterval(pollInterval);
  }, [open, step, caktoOrderId]);
  if (!open || !plano || !mounted) return null;
  const maskCpf = (v) => {
    const d = v.replace(/\D/g, "").slice(0, 11);
    if (d.length <= 3) return d;
    if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
    if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
    return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
  };
  const maskWhatsapp = (v) => {
    const d = v.replace(/\D/g, "").slice(0, 11);
    if (d.length <= 2) return d;
    if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  };
  const parsePrice = (valStr) => {
    return parseFloat(valStr.replace(",", ".")) || 0;
  };
  const formatPrice = (valNum) => {
    return valNum.toFixed(2).replace(".", ",");
  };
  const basePrice = parsePrice(plano.preco);
  const telasPriceTotal = telasExtras * telaExtraUnit;
  const adultoPriceTotal = pacoteAdulto ? pacoteAdultoPrice : 0;
  const cristoFlixPriceTotal = pacoteCristoFlix ? pacoteCristoFlixPrice : 0;
  const totalPriceNum = basePrice + telasPriceTotal + adultoPriceTotal + cristoFlixPriceTotal;
  const totalPriceStr = formatPrice(totalPriceNum);
  const handleCadastroSubmit = (e) => {
    e.preventDefault();
    if (!nome || !cpf || !email || !senha || !whatsapp) return;
    const userData = {
      nome,
      cpf,
      email,
      senha,
      whatsapp,
      planoId: plano.id,
      planoNome: plano.nome,
      planoPreco: plano.preco,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    localStorage.setItem("dezpila_user_account", JSON.stringify(userData));
    setStep("CONFIRMACAO");
  };
  const handleGerarPix = async () => {
    setLoadingPix(true);
    setApiError(null);
    const userData = {
      nome,
      cpf,
      email,
      senha,
      whatsapp,
      planoId: plano.id,
      planoNome: plano.nome,
      planoPreco: plano.preco,
      orderBumps: {
        telasExtras: telasExtras > 0 ? { qtd: telasExtras, subtotal: formatPrice(telasPriceTotal) } : null,
        pacoteAdulto: pacoteAdulto ? { price: formatPrice(pacoteAdultoPrice) } : null
      },
      valorTotal: totalPriceStr,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    localStorage.setItem("dezpila_user_account", JSON.stringify(userData));
    try {
      const res = await createNitroPix({
        data: {
          amountNum: totalPriceNum,
          planName: plano.nome,
          planId: plano.id,
          name: nome,
          email,
          phone: whatsapp,
          document: cpf,
          sourceUrl: window.location.href
        }
      });
      if (res.ok && res.qrCode) {
        setPixPayload(res.qrCode);
        setPixQrBase64(res.qrCodeBase64 || null);
        setCaktoOrderId(res.id);
        setStep("PAGAMENTO");
      } else {
        const errorMsg = res.error || "Não foi possível gerar a cobrança PIX.";
        setApiError(errorMsg);
      }
    } catch (err) {
      console.error("Erro ao conectar com Nova API Nitro Pagamentos:", err);
      const errorMsg = err instanceof Error ? err.message : "Erro ao gerar PIX.";
      setApiError(errorMsg);
    } finally {
      setLoadingPix(false);
    }
  };
  const handleCopyPix = async () => {
    if (!pixPayload) return;
    try {
      await navigator.clipboard.writeText(pixPayload);
      setCopied(true);
      setTimeout(() => setCopied(false), 3e3);
    } catch {
    }
  };
  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };
  return reactDomExports.createPortal(
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 top-0 left-0 right-0 bottom-0 w-screen h-[100dvh] min-h-screen z-[9999999] flex items-center justify-center bg-black/60 backdrop-blur-md p-3 sm:p-4 overscroll-contain", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-[440px] max-h-[90dvh] sm:max-h-[92vh] flex flex-col rounded-3xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.2)] border border-slate-100 overflow-hidden my-auto animate-in zoom-in-95 duration-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: onClose,
          className: "absolute right-4 top-4 z-20 p-1.5 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer",
          "aria-label": "Fechar",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-4 mt-4 mb-2 shrink-0 rounded-2xl bg-gradient-to-r from-[#1C232B] via-[#222B34] to-[#1C232B] border border-white/10 p-3 sm:p-3.5 text-white flex items-center justify-between shadow-md z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0 pr-2", children: [
          (step === "CONFIRMACAO" || step === "PAGAMENTO" || step === "EXPIRADO") && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                if (step === "CONFIRMACAO") setStep("CADASTRO");
                if (step === "PAGAMENTO") setStep("CONFIRMACAO");
                if (step === "EXPIRADO") setStep("CADASTRO");
              },
              className: "p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0",
              "aria-label": "Voltar",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center bg-white px-3 py-1 rounded-xl border border-white/40 shadow-xs h-8 sm:h-8.5 min-w-[105px] sm:min-w-[115px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "/brand/mercado-pago.svg",
              alt: "Mercado Pago",
              onError: (e) => {
                e.currentTarget.src = "https://cdn.worldvectorlogo.com/logos/cd4804d4-fa18-4481-8595-e4fff80e6ce8/mercado-pago-1.svg";
              },
              className: "h-5 sm:h-5.5 w-auto max-w-full object-contain"
            }
          ) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 w-[1px] bg-white/20 shrink-0 mx-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 truncate", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4 text-[#009EE3] shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs sm:text-sm font-bold text-white tracking-tight font-heading truncate", children: "Pagamento Seguro" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center size-6 rounded-full bg-[#009EE3]/20 border border-[#009EE3]/40 text-[#009EE3] shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5 text-[#009EE3]", strokeWidth: 3 }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto px-5 py-3 overscroll-contain bg-white", children: [
        apiError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-code flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: apiError })
        ] }),
        step === "CADASTRO" && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleCadastroSubmit, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-extrabold uppercase tracking-wide text-slate-800 font-heading mb-3", children: "DADOS DO PAGAMENTO" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-xs font-semibold text-slate-700 font-body", children: "Nome Completo" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                required: true,
                value: nome,
                onChange: (e) => setNome(e.target.value),
                placeholder: "John Doe",
                className: "w-full rounded-xl border border-[#D0D5DD] bg-[#F2F4F7] py-2.5 px-3.5 text-xs font-body text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-[#009EE3] focus:ring-2 focus:ring-[#009EE3]/25 transition-all"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-xs font-semibold text-slate-700 font-body", children: "CPF" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                required: true,
                value: cpf,
                onChange: (e) => setCpf(maskCpf(e.target.value)),
                placeholder: "000.000.000-00",
                className: "w-full rounded-xl border border-[#D0D5DD] bg-[#F2F4F7] py-2.5 px-3.5 text-xs font-body text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-[#009EE3] focus:ring-2 focus:ring-[#009EE3]/25 transition-all"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-xs font-semibold text-slate-700 font-body", children: "E-mail" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "email",
                required: true,
                value: email,
                onChange: (e) => setEmail(e.target.value),
                placeholder: "johndoe@email.com",
                className: "w-full rounded-xl border border-[#D0D5DD] bg-[#F2F4F7] py-2.5 px-3.5 text-xs font-body text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-[#009EE3] focus:ring-2 focus:ring-[#009EE3]/25 transition-all"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-xs font-semibold text-slate-700 font-body", children: "Senha" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: verSenha ? "text" : "password",
                  required: true,
                  value: senha,
                  onChange: (e) => setSenha(e.target.value),
                  placeholder: "Crie uma senha",
                  className: "w-full rounded-xl border border-[#D0D5DD] bg-[#F2F4F7] py-2.5 px-3.5 pr-10 text-xs font-body text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-[#009EE3] focus:ring-2 focus:ring-[#009EE3]/25 transition-all"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setVerSenha((v) => !v),
                  className: "absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer",
                  "aria-label": verSenha ? "Ocultar senha" : "Mostrar senha",
                  children: verSenha ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-xs font-semibold text-slate-700 font-body", children: "WhatsApp" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "tel",
                required: true,
                value: whatsapp,
                onChange: (e) => setWhatsapp(maskWhatsapp(e.target.value)),
                placeholder: "11 98765-4321",
                className: "w-full rounded-xl border border-[#D0D5DD] bg-[#F2F4F7] py-2.5 px-3.5 text-xs font-body text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-[#009EE3] focus:ring-2 focus:ring-[#009EE3]/25 transition-all"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-3 border-t border-slate-200", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-extrabold uppercase tracking-wide text-slate-800 font-heading mb-2", children: "RESUMO DO PEDIDO" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-baseline mb-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-slate-900 font-body", children: [
                "Plano ",
                plano.nome
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-slate-900 font-body", children: [
                "R$ ",
                plano.preco,
                plano.periodo
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-500 font-body leading-snug", children: "DezPila" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-500 font-body leading-snug mb-3", children: "Acesso +60.000 conteúdos, 4K HDR, Sem Anúncios" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-xs font-extrabold text-slate-900 font-heading pt-2 border-t border-slate-200 mb-3.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "uppercase tracking-wider", children: "TOTAL A PAGAR:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "R$ ",
                totalPriceStr
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "submit",
              className: "w-full rounded-xl bg-[#009EE3] hover:bg-[#0081B7] py-3.5 px-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white shadow-md shadow-[#009EE3]/25 transition-all cursor-pointer font-heading flex items-center justify-center gap-2 active:scale-[0.99]",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4 fill-current shrink-0", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 2L4.5 9.5L12 17L19.5 9.5L12 2ZM12 14.2L7.3 9.5L12 4.8L16.7 9.5L12 14.2ZM12 18.5L8.5 15L7 16.5L12 21.5L17 16.5L15.5 15L12 18.5Z" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "PAGAR COM PIX MERCADO PAGO" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 text-center flex items-center justify-center gap-1.5 text-[11.5px] font-medium text-[#007EA7] font-body", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-3.5 w-3.5 text-[#009EE3]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Compra Protegida pelo Mercado Pago - Criptografia SSL" })
          ] })
        ] }),
        step === "CONFIRMACAO" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-extrabold uppercase tracking-wide text-slate-800 font-heading mb-2.5", children: "RESUMO DO PEDIDO" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full rounded-2xl bg-slate-50 border border-slate-200/90 p-3 mb-3 text-left", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-slate-900 font-body", children: [
                "Plano ",
                plano.nome
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-[#009EE3] font-code", children: [
                "R$ ",
                plano.preco,
                " ",
                plano.periodo
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-500 font-body", children: plano.desc })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold uppercase tracking-wider text-slate-500 font-heading", children: "Opcionais Recomendados:" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `relative overflow-hidden rounded-2xl border transition-all p-3 mb-2.5 ${telasExtras > 0 ? "bg-[#EBF5FA]/70 border-[#009EE3] shadow-xs" : "bg-slate-50/50 border-slate-200/80 hover:border-slate-300"}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 rounded-xl bg-white border border-slate-200 text-[#009EE3] shrink-0 mt-0.5 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tv, { className: "h-4 w-4" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 mb-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-extrabold uppercase text-slate-900 tracking-wide font-heading", children: "Tela Extra (+1 Conexão)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold font-code text-[#007EA7] bg-[#EBF5FA] px-1.5 py-0.5 rounded shrink-0", children: "R$ 5,90 / tela" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-600 font-body leading-relaxed mb-2", children: "Assista simultaneamente em mais aparelhos ou celular." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-1.5 border-t border-slate-200/60", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-semibold text-slate-700", children: "Quantidade de telas:" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setTelasExtras((prev) => Math.max(0, prev - 1)),
                          disabled: telasExtras === 0,
                          className: "flex h-6 w-6 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition-colors shadow-sm",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-3 w-3" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 text-center text-xs font-bold text-slate-900 font-code", children: telasExtras }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setTelasExtras((prev) => prev + 1),
                          className: "flex h-6 w-6 items-center justify-center rounded-lg border border-[#009EE3] bg-[#009EE3] text-white hover:bg-[#0081B7] cursor-pointer transition-colors shadow-sm",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" })
                        }
                      )
                    ] })
                  ] })
                ] })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `relative overflow-hidden rounded-2xl border transition-all p-3 mb-2.5 cursor-pointer ${pacoteAdulto ? "bg-[#EBF5FA]/70 border-[#009EE3] shadow-xs" : "bg-slate-50/50 border-slate-200/80 hover:border-slate-300"}`,
              onClick: () => setPacoteAdulto(!pacoteAdulto),
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "flex h-4 w-4 items-center justify-center rounded-md border transition-colors " + (pacoteAdulto ? "border-[#009EE3] bg-[#009EE3] text-white" : "border-slate-300 bg-white text-transparent"),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3", strokeWidth: 3 })
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 mb-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-extrabold uppercase text-slate-900 tracking-wide font-heading flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LockKeyhole, { className: "h-3.5 w-3.5 text-amber-600" }),
                      "Conteúdo Adulto VIP (+18 Hot)"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold font-code text-amber-800 bg-amber-100/70 px-1.5 py-0.5 rounded shrink-0", children: "+ R$ 12,90" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-600 font-body leading-relaxed", children: "Acesso exclusivo ao acervo privado de influencers, fotos e vídeos vazados do Privacy/OnlyFans." })
                ] })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `relative overflow-hidden rounded-2xl border transition-all p-3 mb-3 cursor-pointer ${pacoteCristoFlix ? "bg-[#EBF5FA]/70 border-[#009EE3] shadow-xs" : "bg-slate-50/50 border-slate-200/80 hover:border-slate-300"}`,
              onClick: () => setPacoteCristoFlix(!pacoteCristoFlix),
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "flex h-4 w-4 items-center justify-center rounded-md border transition-colors " + (pacoteCristoFlix ? "border-[#009EE3] bg-[#009EE3] text-white" : "border-slate-300 bg-white text-transparent"),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3", strokeWidth: 3 })
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 mb-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-extrabold uppercase text-slate-900 tracking-wide font-heading flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-3.5 w-3.5 text-cyan-600" }),
                      "CristoFlix Infantil (Bíblico & Educativo)"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold font-code text-cyan-800 bg-cyan-100/70 px-1.5 py-0.5 rounded shrink-0", children: "+ R$ 7,90" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-600 font-body leading-relaxed", children: "Desenhos animados, histórias bíblicas e valores cristãos edificantes para proteger e ensinar suas crianças." })
                ] })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-xs font-extrabold text-slate-900 font-heading pt-2 border-t border-slate-200 mb-3.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "uppercase tracking-wider", children: "TOTAL A PAGAR:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-base text-[#009EE3]", children: [
              "R$ ",
              totalPriceStr
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              disabled: loadingPix,
              onClick: handleGerarPix,
              className: "w-full rounded-xl bg-[#009EE3] hover:bg-[#0081B7] py-3.5 px-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white shadow-md shadow-[#009EE3]/25 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed font-heading flex items-center justify-center gap-2 active:scale-[0.99]",
              children: loadingPix ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Gerando PIX Mercado Pago..." })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4 fill-current shrink-0", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 2L4.5 9.5L12 17L19.5 9.5L12 2ZM12 14.2L7.3 9.5L12 4.8L16.7 9.5L12 14.2ZM12 18.5L8.5 15L7 16.5L12 21.5L17 16.5L15.5 15L12 18.5Z" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "PAGAR COM PIX MERCADO PAGO" })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 text-center flex items-center justify-center gap-1.5 text-[11.5px] font-medium text-[#007EA7] font-body", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-3.5 w-3.5 text-[#009EE3]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Compra Protegida pelo Mercado Pago - Criptografia SSL" })
          ] })
        ] }),
        step === "PAGAMENTO" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full rounded-2xl bg-slate-50 border border-slate-200 p-3 mb-3 text-left", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-1 pb-1 border-b border-slate-200", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-slate-900 font-heading", children: [
                "Plano ",
                plano.nome
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-[#009EE3] font-code", children: [
                "R$ ",
                totalPriceStr
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-[11px] text-slate-600 font-body", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "Cliente: ",
                nome
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: email })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-[#EBF5FA] border border-[#009EE3]/30 text-[#007EA7] text-xs font-code font-bold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5 text-[#009EE3] animate-pulse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "PIX Expira em: ",
              formatTimer(timerSeconds)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-white rounded-2xl border border-slate-200 shadow-md mb-3 flex items-center justify-center", children: pixQrBase64 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: pixQrBase64.startsWith("data:") ? pixQrBase64 : `data:image/png;base64,${pixQrBase64}`,
              alt: "QR Code Pix Mercado Pago",
              className: "w-[160px] h-[160px] object-contain"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            QRCodeSVG,
            {
              value: pixPayload || "https://dezpila.com.br",
              size: 160,
              level: "M"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-600 font-body mb-3", children: "Abra seu aplicativo de banco e escaneie o código QR acima para pagar via PIX Mercado Pago." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                readOnly: true,
                value: pixPayload,
                className: "w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-3 pr-28 text-[11px] font-code text-slate-800 outline-none truncate"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleCopyPix,
                className: "absolute right-1 py-1.5 px-3 rounded-lg bg-[#009EE3] hover:bg-[#0081B7] text-white text-xs font-bold font-heading uppercase transition-colors flex items-center gap-1 cursor-pointer shadow-md shadow-[#009EE3]/25",
                children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Copiado!" })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3.5 w-3.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Copiar PIX" })
                ] })
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-center flex items-center justify-center gap-1.5 text-[11.5px] font-medium text-[#007EA7] font-body", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-3.5 w-3.5 text-[#009EE3]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Compra Protegida pelo Mercado Pago - Criptografia SSL" })
          ] })
        ] }),
        step === "EXPIRADO" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center py-2 animate-in zoom-in-95 duration-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 border-2 border-amber-400 text-amber-600 shadow-md shadow-amber-500/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-8 w-8", strokeWidth: 2.5 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-extrabold uppercase text-slate-900 font-heading tracking-tight mb-1.5", children: "CHAVE PIX EXPIRADA!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-600 font-body max-w-sm mb-4 leading-relaxed", children: "O tempo limite de 15 minutos encerrou. Gerar uma nova chave abaixo:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                setTimerSeconds(900);
                setStep("PAGAMENTO");
              },
              className: "w-full py-3 rounded-xl bg-[#009EE3] hover:bg-[#0081B7] text-xs font-extrabold font-heading text-white uppercase tracking-wider transition-all shadow-md shadow-[#009EE3]/20 flex items-center justify-center gap-2 cursor-pointer mb-2",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Gerar Nova Chave PIX" })
            }
          )
        ] }),
        step === "SUCESSO" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center py-2 animate-in zoom-in-95 duration-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#EBF5FA] border-2 border-[#009EE3] text-[#009EE3] shadow-lg shadow-[#009EE3]/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-8 w-8", strokeWidth: 2.5 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-extrabold uppercase text-slate-900 font-heading tracking-tight mb-1.5", children: "PAGAMENTO CONFIRMADO!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-600 font-body max-w-sm mb-4 leading-relaxed", children: [
            "Olá, ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-slate-900 font-semibold", children: nome }),
            "! Seu acesso do plano ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-[#009EE3]", children: plano.nome }),
            " foi ativado com sucesso!"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onClose,
              className: "w-full rounded-xl bg-[#009EE3] hover:bg-[#0081B7] py-3.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-lg shadow-[#009EE3]/25 transition-all cursor-pointer font-heading",
              children: "Concluído — Fechar"
            }
          )
        ] })
      ] })
    ] }) }),
    document.body
  );
}
const planos = [
  {
    id: "MENSAL",
    nome: "Starter Mensal",
    desc: "Para testar sem compromisso",
    preco: "10,00",
    periodo: "/mês",
    link: "https://go.nitropagamentos.com/ni918"
  },
  {
    id: "TRIMESTRAL",
    nome: "Plus Trimestral",
    desc: "O mais escolhido • 2 Telas liberadas",
    preco: "24,90",
    periodo: "/trim",
    link: "https://go.nitropagamentos.com/h64gr"
  },
  {
    id: "SEMESTRAL",
    nome: "Pro Semestral",
    desc: "Economia brutal de 60% de desconto",
    preco: "47,90",
    periodo: "/sem",
    link: "https://go.nitropagamentos.com/oinxr"
  },
  {
    id: "ANUAL",
    nome: "VIP Anual",
    desc: "Maior economia de 69%",
    preco: "73,90",
    periodo: "/ano",
    link: "https://go.nitropagamentos.com/lzcus"
  }
];
const planoRecursos = {
  MENSAL: [
    "1 Conexão Simultânea",
    "+60.000 Conteúdos (4K/FHD)",
    "Futebol, Filmes & Séries",
    "Ativação Instantânea via Pix"
  ],
  TRIMESTRAL: [
    "2 Conexões Simultâneas (Casal)",
    "Qualidade 4K Ultra HD",
    "Premiere, Champions & Filmes",
    "Sinal Liso Antitravamento",
    "Suporte Dedicado via WhatsApp"
  ],
  SEMESTRAL: [
    "3 Conexões Simultâneas (Família)",
    "Sinal Liso Antitravamento 4K",
    "Todos os Canais & Lançamentos",
    "Instalação Guiada em 2 Minutos",
    "Economia Brutal de 60%"
  ],
  ANUAL: [
    "4 Conexões Simultâneas Liberadas",
    "Maior Economia (R$ 0,20/dia)",
    "Acesso VIP Total em 4K",
    "Garantia Total de Estabilidade"
  ]
};
const ctaLabels = {
  MENSAL: "Testar por R$ 10/Mês",
  TRIMESTRAL: "Assinar Trimestral (Mais Vendido)",
  SEMESTRAL: "Assinar Semestral (3 Telas)",
  ANUAL: "Garantir VIP Anual (Maior Economia)"
};
const planoDailyAnchor = {
  MENSAL: "Apenas R$ 0,33 por dia",
  TRIMESTRAL: "Equivale a R$ 8,30/mês • Mais Vendido",
  SEMESTRAL: "Equivale a R$ 7,98/mês • 3 Telas",
  ANUAL: "Equivale a R$ 6,16/mês • R$ 0,20/dia"
};
function PrecoTrioDark() {
  const [selectedPlan, setSelectedPlan] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      id: "planos",
      className: "relative flex min-h-[500px] flex-col items-center justify-center overflow-hidden bg-[#000000] px-6 py-24 font-body text-foreground border-t border-border z-10",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `@keyframes energiaGirar{to{transform:rotate(360deg)}}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "pointer-events-none absolute left-1/2 top-[-260px] h-[520px] w-[640px] -translate-x-1/2",
            style: {
              background: "radial-gradient(closest-side, rgba(151, 2, 2, 0.25), transparent 70%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-12 text-center max-w-2xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-3 inline-block rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 font-code text-xs font-bold tracking-[2.5px] uppercase text-brand", children: "🛡️ RISCO ZERO • TESTE POR 7 DIAS" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "section-title text-center text-foreground", children: [
            "ESCOLHA SEU PLANO E",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-brand to-foreground", children: "ECONOMIZE ATÉ 69%" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-3 font-code text-xs uppercase tracking-wider", children: "Sem contrato, sem fidelidade e com ativação instantânea em 2 minutos via Pix." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex flex-wrap lg:flex-nowrap items-stretch gap-[16px] w-full max-w-6xl justify-center pt-3", children: planos.map((p) => {
          const isPopular = p.id === "TRIMESTRAL";
          const recursos = planoRecursos[p.id] || [];
          const cta = ctaLabels[p.id] || "Assinar Agora";
          if (isPopular) {
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "relative flex w-full sm:w-[calc(50%-12px)] lg:w-[260px] flex-col max-lg:order-first lg:-translate-y-[14px] lg:hover:-translate-y-[18px] transition-transform duration-[250ms]",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-1/2 top-[-11px] -translate-x-1/2 whitespace-nowrap rounded-full bg-[#970202] px-3.5 py-0.5 text-[9.5px] font-bold font-code tracking-[1.2px] text-white shadow-[0_0_16px_rgba(151,2,2,0.9)] z-30", children: "MAIS POPULAR" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-[20px] bg-[#140003] p-[1.5px] shadow-[0_0_50px_rgba(151,2,2,0.5),0_20px_50px_rgba(0,0,0,0.95)] h-full flex flex-col", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "absolute -inset-[120%]",
                        style: {
                          background: "conic-gradient(from 0deg,rgba(151,2,2,0) 0deg,rgba(151,2,2,0) 200deg,#970202 255deg,#d32f2f 300deg,rgba(211,47,47,0) 335deg,rgba(151,2,2,0) 360deg)",
                          animation: "energiaGirar 4s linear infinite"
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col flex-1 rounded-[18.5px] bg-[#000000] p-[22px] pt-[24px]", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[15px] font-bold font-heading uppercase text-white tracking-wide", children: p.nome }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-[12px] font-code text-[#a1a1aa] min-h-[32px]", children: p.desc }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 mt-4 flex items-baseline gap-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold font-code text-[#71717a]", children: "R$" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[38px] font-extrabold font-code tracking-tight text-white glow-text", children: p.preco }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-code text-[#71717a]", children: p.periodo })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] font-code text-emerald-400 font-bold mb-2 flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "⚡" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: planoDailyAnchor[p.id] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "my-4 flex-1 list-none border-t border-white/10 pt-4 flex flex-col gap-2.5", children: recursos.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "li",
                        {
                          className: "flex items-center gap-2.5 text-xs text-[#d4d4d8]",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Check,
                              {
                                className: "h-4 w-4 flex-none text-[#970202]",
                                strokeWidth: 2.5
                              }
                            ),
                            r
                          ]
                        },
                        r
                      )) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setSelectedPlan(p),
                          className: "w-full cursor-pointer rounded-[12px] border-none bg-[#970202] hover:bg-[#b80303] py-3 text-center text-xs font-bold font-heading uppercase tracking-wider text-white shadow-[0_8px_24px_-8px_rgba(151,2,2,0.9)] transition-all",
                          children: cta
                        }
                      )
                    ] })
                  ] })
                ]
              },
              p.id
            );
          }
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "relative flex w-full sm:w-[calc(50%-12px)] lg:w-[260px] flex-col rounded-[20px] border border-[#3b0d10] bg-[#000000] p-[22px] backdrop-blur-md transition-all duration-[250ms] hover:-translate-y-1 hover:border-[#970202]/60 hover:shadow-[0_0_25px_rgba(151,2,2,0.25)]",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[15px] font-bold font-heading uppercase text-white tracking-wide", children: p.nome }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-[12px] font-code text-[#a1a1aa] min-h-[32px]", children: p.desc }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 mt-4 flex items-baseline gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold font-code text-[#71717a]", children: "R$" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[38px] font-extrabold font-code tracking-tight text-white", children: p.preco }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-code text-[#71717a]", children: p.periodo })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] font-code text-emerald-400 font-bold mb-2 flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "⚡" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: planoDailyAnchor[p.id] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "my-4 flex-1 list-none border-t border-white/10 pt-4 flex flex-col gap-2.5", children: recursos.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "li",
                  {
                    className: "flex items-center gap-2.5 text-xs text-[#d4d4d8]",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Check,
                        {
                          className: "h-4 w-4 flex-none text-[#970202]",
                          strokeWidth: 2.5
                        }
                      ),
                      r
                    ]
                  },
                  r
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setSelectedPlan(p),
                    className: "w-full cursor-pointer rounded-[12px] border border-white/10 bg-[#0d0d11] hover:bg-[#15151c] hover:border-[#970202]/60 py-3 text-center text-xs font-bold font-heading uppercase tracking-wider text-white transition-all",
                    children: cta
                  }
                )
              ]
            },
            p.id
          );
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 flex flex-wrap items-center justify-center gap-6 text-center font-code text-xs text-muted-foreground max-w-4xl border-t border-white/5 pt-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-400 font-bold text-sm", children: "🛡️" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Garantia de 7 Dias ou Seu Dinheiro de Volta" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber-400 font-bold text-sm", children: "⚡" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Liberação Automática via Pix em 2 Minutos" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cyan-400 font-bold text-sm", children: "📱" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Instalação sem Antenas em Qualquer Aparelho" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AccountCheckoutModal,
          {
            open: !!selectedPlan,
            plano: selectedPlan,
            onClose: () => setSelectedPlan(null)
          }
        )
      ]
    }
  );
}
const whatsappLucas = "/assets/whatsapp-lucas-MytYmWrj.jpg";
const whatsappFernanda = "/assets/whatsapp-fernanda-CYDJtnkm.jpg";
const whatsappRodrigo = "/assets/whatsapp-rodrigo-Btr-33fQ.jpg";
const whatsappPriscila = "/assets/whatsapp-priscila-CUqKhGY2.jpg";
const whatsappGustavo = "/assets/whatsapp-gustavo-C7PZXRIA.jpg";
const whatsappCamila = "/assets/whatsapp-camila-GsNV8geR.jpg";
const whatsappDiego = "/assets/whatsapp-diego-Dv0MbX5N.jpg";
const whatsappMatheus = "/assets/whatsapp-matheus-BRLqxIbD.jpg";
const whatsappBeatriz = "/assets/whatsapp-beatriz-CxIIWK2Y.jpg";
const DEPOIMENTOS_TEXTO = [
  {
    q: "Fiz o PIX de R$10 e liberou na hora no Premiere da TV Samsung. Imagem 4K absurda!",
    nome: "Lucas Carvalho",
    cidade: "São Paulo, SP",
    iniciais: "LC",
    stars: 5,
    plano: "SEMESTRAL",
    proofImg: whatsappLucas,
    proofTag: "Futebol 4K"
  },
  {
    q: "To aqui no ônibus voltando do trampo e rodando o jogo da Champions liso no 4G!",
    nome: "Diego Prado",
    cidade: "Rio de Janeiro, RJ",
    iniciais: "DP",
    stars: 5,
    plano: "ANUAL",
    proofImg: whatsappDiego,
    proofTag: "Champions 4G"
  },
  {
    q: "Instalei no Fire Stick em 2 minutos. Cancelei minha TV a cabo de R$180 e as crianças amaram!",
    nome: "Fernanda Rocha",
    cidade: "Curitiba, PR",
    iniciais: "FR",
    stars: 5,
    plano: "TRIMESTRAL",
    proofImg: whatsappFernanda,
    proofTag: "Cinema Disney"
  },
  {
    q: "Pegou de primeira! Minha mãe assistindo a novela das 9 e eu maratonando séries em 4K!",
    nome: "Camila Brito",
    cidade: "Fortaleza, CE",
    iniciais: "CB",
    stars: 5,
    plano: "ANUAL",
    proofImg: whatsappCamila,
    proofTag: "Novelas & Séries"
  },
  {
    q: "Card do UFC no Combate rodando em 4K cristalino, sem delay. Sensacional!",
    nome: "Gustavo Serra",
    cidade: "Porto Alegre, RS",
    iniciais: "GS",
    stars: 5,
    plano: "SEMESTRAL",
    proofImg: whatsappGustavo,
    proofTag: "UFC Combate 4K"
  },
  {
    q: "Paguei pelo PIX e em menos de 1 minuto já recebi os dados e ativei na Smart TV.",
    nome: "Priscila Lima",
    cidade: "Recife, PE",
    iniciais: "PL",
    stars: 5,
    plano: "MENSAL",
    proofImg: whatsappPriscila,
    proofTag: "Ativação PIX"
  },
  {
    q: "Configurei no monitor gamer e no tablet. Qualidade absurda, animes e filmes 4K!",
    nome: "Matheus Ribeiro",
    cidade: "Florianópolis, SC",
    iniciais: "MR",
    stars: 5,
    plano: "ANUAL",
    proofImg: whatsappMatheus,
    proofTag: "Gamer & Animes"
  },
  {
    q: "Simples de instalar no TV Box e no celular. Qualidade de imagem 10/10 no Wi-Fi.",
    nome: "Rodrigo Maia",
    cidade: "Brasília, DF",
    iniciais: "RM",
    stars: 5,
    plano: "TRIMESTRAL",
    proofImg: whatsappRodrigo,
    proofTag: "TV Box Wi-Fi"
  },
  {
    q: "Cancelei a assinatura de 340 reais da operadora. Não trava nada e economizo todo mês!",
    nome: "Beatriz Mendes",
    cidade: "Belo Horizonte, MG",
    iniciais: "BM",
    stars: 5,
    plano: "ANUAL",
    proofImg: whatsappBeatriz,
    proofTag: "Economia R$ 340"
  }
];
const PROVAS_FOTOS_REAIS = [
  {
    nome: "Lucas Carvalho",
    cidade: "São Paulo, SP",
    dispositivo: "Samsung 4K • Premiere",
    resumo: "Liberou em segundos após o PIX e assistiu ao jogo no Premiere em 4K liso.",
    img: whatsappLucas
  },
  {
    nome: "Camila Brito",
    cidade: "Fortaleza, CE",
    dispositivo: "Smart TV • Novelas & Séries",
    resumo: "Mãe assistindo novelas e ela maratonando séries em altíssima definição.",
    img: whatsappCamila
  },
  {
    nome: "Gustavo Serra",
    cidade: "Porto Alegre, RS",
    dispositivo: "Smart TV LG • UFC Combate",
    resumo: "Acompanhando o card principal do UFC em 4K cristalino sem travar.",
    img: whatsappGustavo
  },
  {
    nome: "Diego Prado",
    cidade: "Rio de Janeiro, RJ",
    dispositivo: "Mobile 4G • Champions League",
    resumo: "Assistindo jogo da Champions direto no celular 4G no transporte com estabilidade total.",
    img: whatsappDiego
  },
  {
    nome: "Fernanda Rocha",
    cidade: "Curitiba, PR",
    dispositivo: "Fire Stick • Disney & Kids",
    resumo: "Instalou em 2 minutos para a família e cancelou a assinatura antiga de R$ 180.",
    img: whatsappFernanda
  },
  {
    nome: "Beatriz Mendes",
    cidade: "Belo Horizonte, MG",
    dispositivo: "Living Room TV • TV por Assinatura",
    resumo: "Cancelou a fatura de R$ 340 da operadora tradicional e economiza todo mês.",
    img: whatsappBeatriz
  },
  {
    nome: "Matheus Ribeiro",
    cidade: "Florianópolis, SC",
    dispositivo: "Setup Gamer • Animes & Filmes",
    resumo: "Configuração em monitor gamer e tablet com catálogo completo em 4K HDR.",
    img: whatsappMatheus
  },
  {
    nome: "Priscila Lima",
    cidade: "Recife, PE",
    dispositivo: "Smart TV da Sala • PIX Aprovado",
    resumo: "Liberação automática imediata após pagamento do PIX promocional.",
    img: whatsappPriscila
  },
  {
    nome: "Rodrigo Maia",
    cidade: "Brasília, DF",
    dispositivo: "TV Box & Wi-Fi Comum",
    resumo: "Qualidade 10/10 com sistema anti-travamento mesmo no Wi-Fi doméstico.",
    img: whatsappRodrigo
  }
];
function MarqueeDepoimentos() {
  const [selectedProof, setSelectedProof] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      id: "depoimentos",
      className: "group relative z-10 overflow-hidden py-20 font-body border-t border-border bg-[#030306]",
      style: {
        backgroundImage: "radial-gradient(ellipse 700px 350px at 50% -60px, rgba(151, 2, 2, 0.15), transparent)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes depo-mq { to { transform: translateX(-50%); } }
        .group:hover .depo-row { animation-play-state: paused; }
      ` }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12 px-6 text-center max-w-4xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 font-code text-xs font-bold uppercase tracking-widest text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCheck, { className: "w-3.5 h-3.5" }),
            " + de 12.000 Clientes Ativos • Avaliações 100% Reais"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "section-title text-center text-white", children: [
            "DEPOIMENTOS &",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-brand to-rose-400", children: "PROVAS REAIS NO WHATSAPP" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-3 font-code text-xs sm:text-sm max-w-2xl mx-auto", children: "Veja o que nossos clientes dizem após ativar o acesso. Passe o mouse para pausar e clique em qualquer foto para ampliar:" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "pointer-events-none absolute inset-y-0 left-0 z-10 w-24 sm:w-36",
              style: { background: "linear-gradient(90deg, #030306 20%, transparent)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "pointer-events-none absolute inset-y-0 right-0 z-10 w-24 sm:w-36",
              style: { background: "linear-gradient(270deg, #030306 20%, transparent)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "depo-row flex w-max",
              style: { animation: "depo-mq 34s linear infinite" },
              children: [...DEPOIMENTOS_TEXTO, ...DEPOIMENTOS_TEXTO].map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  onClick: () => c.proofImg && setSelectedProof({
                    nome: c.nome,
                    img: c.proofImg,
                    tag: c.proofTag
                  }),
                  className: "mr-4 w-[320px] sm:w-[350px] flex-shrink-0 rounded-xl border border-white/10 bg-[#0c0c14]/90 p-4 backdrop-blur-md transition-all duration-300 hover:border-emerald-500/40 hover:bg-[#11111d] hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] cursor-pointer flex flex-col justify-between",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5 text-amber-400", children: Array.from({ length: c.stars }).map((_, sIdx) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3.5 h-3.5 fill-amber-400" }, sIdx)) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-code text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 uppercase tracking-widest rounded flex items-center gap-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCheck, { className: "w-2.5 h-2.5" }),
                          " Verificado"
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs leading-relaxed text-slate-200 font-body mb-3", children: [
                        '"',
                        c.q,
                        '"'
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-3 border-t border-white/5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold font-code bg-brand/20 border border-brand/40 text-brand", children: c.iniciais }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold text-white font-heading uppercase tracking-wide", children: c.nome }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-code text-slate-400", children: c.cidade })
                        ] })
                      ] }),
                      c.proofImg && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-code text-emerald-400 hover:text-emerald-300 underline underline-offset-2 flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3 h-3" }),
                        " Ver Print"
                      ] })
                    ] })
                  ]
                },
                "depo-txt-" + i
              ))
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "depo-row flex w-max",
              style: { animation: "depo-mq 40s linear infinite reverse" },
              children: [...PROVAS_FOTOS_REAIS, ...PROVAS_FOTOS_REAIS].map((prova, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  onClick: () => setSelectedProof({
                    nome: prova.nome,
                    img: prova.img,
                    tag: prova.dispositivo
                  }),
                  className: "group/proof mr-4 w-[260px] sm:w-[280px] flex-shrink-0 rounded-2xl bg-[#0c0c14] border border-white/10 hover:border-emerald-500/60 p-3 transition-all duration-300 hover:scale-[1.02] cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(16,185,129,0.25)] flex flex-col justify-between",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-2 rounded-full bg-emerald-400 animate-pulse shrink-0" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-heading font-extrabold text-xs text-white uppercase truncate", children: prova.nome })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-code text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 shrink-0 flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-2.5 h-2.5" }),
                        " WhatsApp"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-xl overflow-hidden aspect-[4/5] bg-black/90 border border-white/10 mb-2.5 group-hover/proof:border-emerald-500/40", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: prova.img,
                          alt: `Foto real WhatsApp de ${prova.nome}`,
                          className: "w-full h-full object-cover object-top opacity-90 group-hover/proof:opacity-100 transition-opacity",
                          loading: "lazy"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-75 group-hover/proof:opacity-30 transition-opacity" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-center gap-1.5 bg-black/80 backdrop-blur-md py-1.5 px-3 rounded-lg border border-white/15 text-[11px] font-code text-white font-bold group-hover/proof:bg-emerald-600 group-hover/proof:border-emerald-400 transition-colors shadow-md", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Ampliar Print" })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-[10px] font-code text-slate-400 mb-0.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: prova.cidade }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-400 font-bold truncate max-w-[130px] text-right", children: prova.dispositivo })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-slate-300 font-body leading-tight line-clamp-2", children: [
                        '"',
                        prova.resumo,
                        '"'
                      ] })
                    ] })
                  ]
                },
                "prova-foto-" + idx
              ))
            }
          ) })
        ] }),
        selectedProof && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200",
            onClick: () => setSelectedProof(null),
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "relative max-w-lg w-full bg-[#0d0d14] border border-white/20 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.9)]",
                onClick: (e) => e.stopPropagation(),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 bg-[#13131f] border-b border-white/10", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-2.5 rounded-full bg-emerald-400 animate-pulse" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-heading font-extrabold text-sm text-white uppercase", children: [
                        "Conversa com ",
                        selectedProof.nome
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-code text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20", children: "Verificado" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setSelectedProof(null),
                        className: "text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-black flex justify-center max-h-[75vh] overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: selectedProof.img,
                      alt: `Conversa no WhatsApp com ${selectedProof.nome}`,
                      className: "max-h-[70vh] w-auto rounded-xl object-contain shadow-2xl border border-white/10"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 bg-[#13131f] border-t border-white/10 flex items-center justify-between text-xs font-code", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-400 flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4 text-emerald-400" }),
                      "Depoimento real com autorização do cliente"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setSelectedProof(null),
                        className: "px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors",
                        children: "Fechar"
                      }
                    )
                  ] })
                ]
              }
            )
          }
        )
      ]
    }
  );
}
const faqs = [
  {
    q: "Como recebo o meu acesso após o pagamento?",
    a: "O envio dos seus dados de login e o passo a passo de configuração são disparados automaticamente no seu WhatsApp e E-mail em menos de 2 minutos após a confirmação do PIX."
  },
  {
    q: "Funciona em quais aparelhos?",
    a: "Em absolutamente todos! Smart TVs (Samsung, LG, TCL, Android TV), Celulares (Android e iOS), TV Box, Chromecast, Fire TV Stick, Computadores e Tablets."
  },
  {
    q: "O pagamento é seguro e sem fidelidade?",
    a: "Totalmente seguro! Pagamento processado via PIX com aprovação instantânea. Sem fidelidade, sem contrato de carência e você pode cancelar quando quiser sem multas."
  },
  {
    q: "Qual é a velocidade de internet recomendada?",
    a: "Para transmissões em HD e Full HD recomendamos a partir de 10 Mega. Para conteúdos em 4K Ultra HD ao vivo, recomendamos a partir de 15 Mega de velocidade."
  },
  {
    q: "O que está incluído na lista de conteúdos?",
    a: "Acesso a mais de 60.000 títulos incluindo lançamentos de cinema, séries atualizadas diariamente, canais abertos e fechados em 4K, além de todos os campeonatos de Futebol ao Vivo (Brasileirão, Champions, Libertadores, etc)."
  },
  {
    q: "Como funcionam os pacotes opcionais (CristoFlix e Adulto VIP)?",
    a: "No momento da assinatura você pode personalizar seu plano adicionando o CristoFlix Infantil (conteúdo bíblico e educativo para crianças) ou o Conteúdo Adulto VIP (Privacy/OnlyFans). Todos são 100% opcionais."
  },
  {
    q: "Preciso de ajuda técnica para instalar?",
    a: "Não! Nosso suporte oferece tutoriais em vídeo simplificados para instalar em qualquer aparelho em menos de 3 minutos. Se precisar de ajuda, nosso atendimento no WhatsApp responde rapidamente."
  },
  {
    q: "Posso usar a mesma conta em mais de uma TV?",
    a: "Sim! No checkout você pode adicionar conexões simultâneas (Telas Extras) pelo valor de apenas R$ 5,90 por tela adicional para toda a família assistir ao mesmo tempo."
  }
];
function FAQSection() {
  const [openIndex, setOpenIndex] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "faq", className: "px-6 lg:px-12 py-24 relative z-10 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-code text-brand text-xs uppercase tracking-widest mb-4 font-bold", children: "Central de Informações" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "section-title text-center", children: [
        "Perguntas ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Frequentes" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs sm:text-sm text-slate-400 font-body mt-3 max-w-lg mx-auto", children: "Tudo o que você precisa saber sobre o funcionamento, instalação e pagamento do DezPila." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: faqs.map((faq, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "card-surface cursor-pointer hover:border-[#970202]/50 transition-all",
        onClick: () => setOpenIndex(openIndex === i ? null : i),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-code text-xs text-brand/60 font-bold", children: [
                "[",
                String(i + 1).padStart(2, "0"),
                "]"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-sm uppercase tracking-wide text-white", children: faq.q })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-code text-brand text-lg shrink-0 font-bold", children: openIndex === i ? "−" : "+" })
          ] }),
          openIndex === i && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-300 text-sm mt-4 pl-10 leading-relaxed font-body", children: faq.a })
        ]
      },
      i
    )) })
  ] }) });
}
const names = [
  "Ricardo",
  "Mariana",
  "Lucas",
  "Fernanda",
  "Rafael",
  "Amanda",
  "Thiago",
  "Juliana",
  "Pedro",
  "Carolina",
  "Bruno",
  "Gabriela",
  "Felipe",
  "Larissa",
  "Diego",
  "Camila",
  "Gustavo",
  "Patrícia",
  "Rodrigo",
  "Beatriz",
  "André",
  "Letícia",
  "Marcelo",
  "Vanessa"
];
const cities = [
  "São Paulo, SP",
  "Rio de Janeiro, RJ",
  "Belo Horizonte, MG",
  "Curitiba, PR",
  "Porto Alegre, RS",
  "Salvador, BA",
  "Recife, PE",
  "Fortaleza, CE",
  "Brasília, DF",
  "Manaus, AM",
  "Goiânia, GO",
  "Florianópolis, SC",
  "Vitória, ES",
  "Natal, RN",
  "Campinas, SP"
];
const plans = ["MENSAL", "TRIMESTRAL", "SEMESTRAL", "ANUAL"];
const timeAgo = ["agora mesmo", "há 1 minuto", "há 2 minutos", "há 4 minutos", "há 7 minutos"];
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function SocialProofToasts() {
  const [toast, setToast] = reactExports.useState(null);
  reactExports.useEffect(() => {
    let counter = 0;
    let hideTimer;
    let nextTimer;
    const showNext = () => {
      counter += 1;
      setToast({
        id: counter,
        name: pick(names),
        city: pick(cities),
        plan: pick(plans),
        time: pick(timeAgo)
      });
      hideTimer = setTimeout(() => setToast(null), 5e3);
      nextTimer = setTimeout(showNext, 9e3);
    };
    const initial = setTimeout(showNext, 3500);
    return () => {
      clearTimeout(initial);
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, []);
  if (!toast) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed bottom-4 left-4 right-4 sm:right-auto sm:left-6 sm:bottom-6 z-50 max-w-sm animate-fade-in",
      role: "status",
      "aria-live": "polite",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-surface !p-4 flex items-start gap-3 border-brand/40 shadow-[0_0_30px_var(--brand-glow)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 w-10 h-10 bg-brand/10 border border-brand/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-brand" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-foreground leading-tight", children: [
            toast.name,
            " acabou de assinar"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-code text-xs text-brand mt-1 uppercase tracking-wider", children: [
            "Plano ",
            toast.plan
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-2 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-code text-[10px] text-muted-foreground uppercase tracking-widest truncate", children: toast.city }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-code text-[10px] text-muted-foreground/70 flex items-center gap-1 flex-shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 bg-live rounded-full animate-pulse" }),
              toast.time
            ] })
          ] })
        ] })
      ] })
    },
    toast.id
  );
}
function useInView(options = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }) {
  const ref = reactExports.useRef(null);
  const [inView, setInView] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.unobserve(entry.target);
      }
    }, options);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function Reveal({ children, className, delay = 0, as = "div", id }) {
  const { ref, inView } = useInView();
  const Comp = as;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      id,
      ref,
      style: { transitionDelay: inView ? `${delay}ms` : "0ms" },
      className: cn(
        "transition-all duration-700 ease-out will-change-transform",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        className
      ),
      children
    }
  );
}
const devices = [
  {
    id: "samsung",
    name: "Samsung Smart TV",
    brandTag: "TIZEN OS",
    category: "Todos os modelos Samsung (2016 até 2026)",
    brandColor: "#0077FF",
    brandGlow: "rgba(0, 119, 255, 0.4)",
    activeBg: "bg-gradient-to-r from-[#002244]/90 to-[#001124]/90",
    activeBorder: "border-[#0077FF]",
    badgeBg: "bg-[#0077FF]/15",
    badgeText: "text-[#38BDF8]",
    badgeBorder: "border-[#0077FF]/40",
    accentText: "text-[#38BDF8]",
    stepBadgeBg: "bg-[#0077FF]/20",
    stepBadgeText: "text-[#38BDF8]",
    stepBadgeBorder: "border-[#0077FF]/50",
    app: "Smart STB / IBO Player / SS IPTV / Bob Player",
    installTime: "Menos de 2 minutos",
    resolution: "4K Ultra HD Real (60fps)",
    systemFeature: "100% Anti-Trava Tizen Direct",
    description: "Compatível com todas as Smart TVs Samsung. Aplicativo oficial disponível direto na Samsung Apps da sua TV, sem necessidade de aparelhos extras.",
    steps: [
      {
        title: "Abra a Samsung Apps",
        desc: "No controle remoto, pressione Home e abra a loja de aplicativos da sua Samsung TV."
      },
      {
        title: "Instale o App Homologado",
        desc: "Pesquise por 'IBO Player', 'Smart STB' ou 'SS IPTV' e clique em Instalar."
      },
      {
        title: "Ativação Imediata via PIX",
        desc: "Insira os dados gerados no checkout e assista a +2.000 canais e +60.000 filmes na hora."
      }
    ],
    logo: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 font-heading font-black tracking-wider text-[#0077FF] text-xs uppercase", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tv, { className: "h-4 w-4 text-[#0077FF]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "SAMSUNG" })
    ] })
  },
  {
    id: "lg",
    name: "LG Smart TV",
    brandTag: "webOS",
    category: "Todos os modelos LG com webOS (OLED, QNED, NanoCell, UHD)",
    brandColor: "#FD3572",
    brandGlow: "rgba(253, 53, 114, 0.4)",
    activeBg: "bg-gradient-to-r from-[#330014]/90 to-[#1a000a]/90",
    activeBorder: "border-[#FD3572]",
    badgeBg: "bg-[#FD3572]/15",
    badgeText: "text-[#FD3572]",
    badgeBorder: "border-[#FD3572]/40",
    accentText: "text-[#FD3572]",
    stepBadgeBg: "bg-[#FD3572]/20",
    stepBadgeText: "text-[#FD3572]",
    stepBadgeBorder: "border-[#FD3572]/50",
    app: "IBO Player / Smarters Pro / SS IPTV / XCIPTV",
    installTime: "Menos de 2 minutos",
    resolution: "4K HDR & Dolby Audio",
    systemFeature: "100% Anti-Trava webOS Direct",
    description: "Funciona nativamente em qualquer TV LG com sistema webOS. Imagem 4K HDR cristalina com áudio surround sem cabos ou aparelhos adicionais.",
    steps: [
      {
        title: "Acesse a LG Content Store",
        desc: "Abra o menu da sua TV LG e clique no ícone da loja LG Content Store / Apps."
      },
      {
        title: "Baixe o Player Recomendado",
        desc: "Digite 'IBO Player' ou 'Smarters Pro' e realize o download gratuito."
      },
      {
        title: "Pronto para Maratonar",
        desc: "Conecte com seus dados liberados via PIX e aproveite futebol 4K e cinema completo."
      }
    ],
    logo: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 font-heading font-black tracking-wider text-[#FD3572] text-xs uppercase", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3.5 w-3.5 rounded-full border border-[#FD3572] flex items-center justify-center font-extrabold text-[9px] leading-none", children: "LG" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "LG webOS" })
    ] })
  },
  {
    id: "android-tv",
    name: "Android TV & Google TV",
    brandTag: "GOOGLE PLAY",
    category: "TCL, Philips, Sony, Philco, Semp, Panasonic",
    brandColor: "#3DDC84",
    brandGlow: "rgba(61, 220, 132, 0.4)",
    activeBg: "bg-gradient-to-r from-[#002b12]/90 to-[#001408]/90",
    activeBorder: "border-[#3DDC84]",
    badgeBg: "bg-[#3DDC84]/15",
    badgeText: "text-[#3DDC84]",
    badgeBorder: "border-[#3DDC84]/40",
    accentText: "text-[#3DDC84]",
    stepBadgeBg: "bg-[#3DDC84]/20",
    stepBadgeText: "text-[#3DDC84]",
    stepBadgeBorder: "border-[#3DDC84]/50",
    app: "Aplicativo Oficial DezPila / XCIPTV / Smarters",
    installTime: "Menos de 1 minuto",
    resolution: "4K 60fps Estável",
    systemFeature: "App Oficial Play Store Integrado",
    description: "Interface ultra-rápida na Google Play Store oficial com carregamento instantâneo de canais, guia EPG interativo e troca de canais sem delay.",
    steps: [
      {
        title: "Abra a Google Play Store",
        desc: "Na tela inicial da sua Android TV ou Google TV, acesse a loja Google Play."
      },
      {
        title: "Download com 1 Clique",
        desc: "Baixe nosso aplicativo oficial otimizado ou XCIPTV Player com instalação instantânea."
      },
      {
        title: "Login Rápido",
        desc: "Digite seu usuário e senha recebidos imediatamente após o pagamento e aproveite."
      }
    ],
    logo: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 font-heading font-black tracking-wider text-[#3DDC84] text-xs uppercase", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { className: "h-4 w-4 text-[#3DDC84]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ANDROID TV" })
    ] })
  },
  {
    id: "firestick",
    name: "Fire TV Stick & Mi Box",
    brandTag: "AMAZON / XIAOMI",
    category: "Fire Stick Lite/4K, Mi Box S, Realme Stick, Chromecast",
    brandColor: "#FF9900",
    brandGlow: "rgba(255, 153, 0, 0.4)",
    activeBg: "bg-gradient-to-r from-[#331c00]/90 to-[#1a0e00]/90",
    activeBorder: "border-[#FF9900]",
    badgeBg: "bg-[#FF9900]/15",
    badgeText: "text-[#FFB84D]",
    badgeBorder: "border-[#FF9900]/40",
    accentText: "text-[#FFB84D]",
    stepBadgeBg: "bg-[#FF9900]/20",
    stepBadgeText: "text-[#FFB84D]",
    stepBadgeBorder: "border-[#FF9900]/50",
    app: "App DezPila dedicado / Downloader",
    installTime: "1 minuto e meio",
    resolution: "4K Ultra HD + Anti-Trava",
    systemFeature: "Otimizado para Sticks HDMI",
    description: "Transforma qualquer TV comum ou antiga em uma central multimídia de última geração com catálogo completo e resposta ultrarrápida.",
    steps: [
      {
        title: "Plugue na Entrada HDMI",
        desc: "Conecte seu Fire Stick ou Mi Box na TV e conecte à rede Wi-Fi da sua casa."
      },
      {
        title: "Baixe via Downloader ou Loja",
        desc: "Digite o código curto do DezPila no app Downloader para download direto."
      },
      {
        title: "Grade Completa Liberada",
        desc: "Aproveite todos os canais fechados, esportes ao vivo e filmes com qualidade 4K."
      }
    ],
    logo: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 font-heading font-black tracking-wider text-[#FF9900] text-xs uppercase", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4 text-[#FF9900]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "FIRE TV • MI BOX" })
    ] })
  },
  {
    id: "tv-box",
    name: "TV Box (Todos os modelos)",
    brandTag: "UNIVERSAL ANDROID",
    category: "TX9, TX3, MXQ, Aquário, Intelbras, BTV, HTV e similares",
    brandColor: "#A855F7",
    brandGlow: "rgba(168, 85, 247, 0.4)",
    activeBg: "bg-gradient-to-r from-[#240638]/90 to-[#12021c]/90",
    activeBorder: "border-[#A855F7]",
    badgeBg: "bg-[#A855F7]/15",
    badgeText: "text-[#C084FC]",
    badgeBorder: "border-[#A855F7]/40",
    accentText: "text-[#C084FC]",
    stepBadgeBg: "bg-[#A855F7]/20",
    stepBadgeText: "text-[#C084FC]",
    stepBadgeBorder: "border-[#A855F7]/50",
    app: "APK DezPila Otimizado / XCIPTV",
    installTime: "Menos de 2 minutos",
    resolution: "Full HD & 4K UHD",
    systemFeature: "Ultra Leve (Não trava a memória)",
    description: "Nosso sistema foi desenvolvido para consumir pouca memória RAM e processamento, rodando liso até mesmo nos modelos mais básicos de TV Box.",
    steps: [
      {
        title: "Abra o Navegador da Box",
        desc: "Acesse o navegador Chrome ou instalador de arquivos na sua TV Box."
      },
      {
        title: "Instale o APK DezPila",
        desc: "Clique no link direto fornecido no tutorial para baixar a versão otimizada."
      },
      {
        title: "Assista sem Travamentos",
        desc: "Conecte com sua conta e acesse centenas de canais com sinal 100% estável."
      }
    ],
    logo: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 font-heading font-black tracking-wider text-[#A855F7] text-xs uppercase", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-4 w-4 text-[#A855F7]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "TV BOX UNIVERSAL" })
    ] })
  },
  {
    id: "smartphone",
    name: "Celular & Tablet",
    brandTag: "iOS & ANDROID",
    category: "iPhone, iPad, Samsung Galaxy, Motorola, Xiaomi e outros",
    brandColor: "#06B6D4",
    brandGlow: "rgba(6, 182, 212, 0.4)",
    activeBg: "bg-gradient-to-r from-[#002733]/90 to-[#001319]/90",
    activeBorder: "border-[#06B6D4]",
    badgeBg: "bg-[#06B6D4]/15",
    badgeText: "text-[#22D3EE]",
    badgeBorder: "border-[#06B6D4]/40",
    accentText: "text-[#22D3EE]",
    stepBadgeBg: "bg-[#06B6D4]/20",
    stepBadgeText: "text-[#22D3EE]",
    stepBadgeBorder: "border-[#06B6D4]/50",
    app: "App Oficial iOS & Android / Smarters Player",
    installTime: "30 segundos",
    resolution: "Full HD Móvel Adaptativo",
    systemFeature: "Economia Inteligente de Dados Móveis",
    description: "Assista onde estiver: no trânsito, no trabalho ou em viagens. Suporta reprodução em segundo plano e transmissão para a TV via Chromecast/AirPlay.",
    steps: [
      {
        title: "Baixe na App Store ou Play Store",
        desc: "Instale o aplicativo indicado diretamente na loja oficial do seu smartphone."
      },
      {
        title: "Faça Login com seu Acesso",
        desc: "Insira seu usuário e senha liberados na hora pelo sistema automático DezPila."
      },
      {
        title: "Assista ou Espelhe na TV",
        desc: "Assista na tela do celular ou transmita com 1 toque para qualquer televisão próxima."
      }
    ],
    logo: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 font-heading font-black tracking-wider text-[#06B6D4] text-xs uppercase", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "h-4 w-4 text-[#06B6D4]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "CELULAR & TABLET" })
    ] })
  },
  {
    id: "computador",
    name: "Computador & Notebook",
    brandTag: "WINDOWS & MAC",
    category: "Windows 10/11, macOS, Linux, Chrome, Edge, Safari",
    brandColor: "#3B82F6",
    brandGlow: "rgba(59, 130, 246, 0.4)",
    activeBg: "bg-gradient-to-r from-[#0c1f47]/90 to-[#050f24]/90",
    activeBorder: "border-[#3B82F6]",
    badgeBg: "bg-[#3B82F6]/15",
    badgeText: "text-[#60A5FA]",
    badgeBorder: "border-[#3B82F6]/40",
    accentText: "text-[#60A5FA]",
    stepBadgeBg: "bg-[#3B82F6]/20",
    stepBadgeText: "text-[#60A5FA]",
    stepBadgeBorder: "border-[#3B82F6]/50",
    app: "Web Player no Navegador / IPTV Smarters Windows",
    installTime: "Instantâneo (Sem instalar nada)",
    resolution: "4K Nativo 60fps",
    systemFeature: "Acesso Direto pelo Navegador",
    description: "Acesse direto pelo seu navegador Chrome, Edge ou Safari sem precisar instalar nada, ou use nosso programa dedicado para Windows e Mac.",
    steps: [
      {
        title: "Acesse o Link do Web Player",
        desc: "Abra o link exclusivo de transmissão direta em qualquer navegador da sua preferência."
      },
      {
        title: "Informe Usuário e Senha",
        desc: "Faça login com a sua conta para carregar automaticamente toda a grade de canais."
      },
      {
        title: "Cinema em Tela Cheia",
        desc: "Assista com aceleração de hardware, seleção de áudio/legenda e resolução total."
      }
    ],
    logo: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 font-heading font-black tracking-wider text-[#3B82F6] text-xs uppercase", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Monitor, { className: "h-4 w-4 text-[#3B82F6]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "PC & NOTEBOOK" })
    ] })
  }
];
function DeviceCompatibility() {
  const [activeTab, setActiveTab] = reactExports.useState("samsung");
  const currentDevice = devices.find((d) => d.id === activeTab) || devices[0];
  const handleScrollToPlans = () => {
    const el = document.getElementById("planos");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative overflow-hidden bg-[#050508] px-6 py-20 font-body text-foreground border-t border-white/10 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 font-code text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 shadow-[0_0_15px_rgba(16,185,129,0.2)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5" }),
        " 100% Compatível com seu Aparelho"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-2xl sm:text-4xl font-extrabold uppercase font-heading text-white tracking-tight", children: [
        "SELECIONE SUA ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-brand to-rose-400", children: "SMART TV" }),
        " OU DISPOSITIVO"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-3 font-code text-xs sm:text-sm max-w-xl mx-auto", children: "Configuração rápida em menos de 2 minutos. Escolha seu dispositivo e veja o passo a passo:" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3 mb-8", children: devices.map((device) => {
      const isActive = activeTab === device.id;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setActiveTab(device.id),
          className: `relative flex flex-col items-start justify-between p-3.5 sm:p-4 rounded-xl text-left transition-all cursor-pointer border ${isActive ? `${device.activeBg} ${device.activeBorder} scale-[1.02] z-10` : "bg-[#0c0c14]/80 border-white/10 hover:border-white/20 hover:bg-[#12121e]"}`,
          style: {
            boxShadow: isActive ? `0 0 25px ${device.brandGlow}, inset 0 0 15px ${device.brandGlow}` : "none"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between w-full gap-2 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0", children: device.logo }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `font-code text-[9px] font-extrabold px-1.5 py-0.5 rounded border uppercase tracking-wider ${isActive ? `${device.badgeBg} ${device.badgeText} ${device.badgeBorder}` : "bg-white/5 text-slate-400 border-white/10"}`,
                  children: device.brandTag
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `font-heading font-extrabold text-xs sm:text-sm tracking-tight block ${isActive ? "text-white" : "text-slate-300"}`,
                  children: device.name
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-code text-[10px] text-slate-400 block truncate mt-0.5", children: device.installTime })
            ] }),
            isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute bottom-0 left-3 right-3 h-[2px] rounded-full",
                style: { backgroundColor: device.brandColor }
              }
            )
          ]
        },
        device.id
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "relative rounded-2xl bg-gradient-to-b from-[#10101a] to-[#08080e] border p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-300",
        style: {
          borderColor: `${currentDevice.brandColor}60`,
          boxShadow: `0 0 30px ${currentDevice.brandGlow}`
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-1 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-12 w-12 rounded-xl flex items-center justify-center border shadow-lg transition-all",
                  style: {
                    backgroundColor: `${currentDevice.brandColor}20`,
                    borderColor: `${currentDevice.brandColor}60`,
                    color: currentDevice.brandColor,
                    boxShadow: `0 0 15px ${currentDevice.brandGlow}`
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tv, { className: "h-6 w-6" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-heading font-extrabold text-lg text-white uppercase tracking-tight", children: currentDevice.name }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `inline-block font-code text-[10px] font-bold px-2 py-0.5 rounded border mt-0.5 uppercase ${currentDevice.badgeBg} ${currentDevice.badgeText} ${currentDevice.badgeBorder}`,
                    children: currentDevice.brandTag
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5 pt-2 border-t border-white/10 font-code text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-400 flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-3.5 w-3.5 text-amber-400" }),
                  " Instalação:"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold", children: currentDevice.installTime })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-400 flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5 text-emerald-400" }),
                  " Resolução:"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold", children: currentDevice.resolution })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-400 flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3.5 w-3.5", style: { color: currentDevice.brandColor } }),
                  " Sistema:"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-400 font-bold", children: currentDevice.systemFeature })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-300 font-body leading-relaxed pt-1", children: currentDevice.description })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 bg-[#000000]/70 rounded-xl border border-white/10 p-5 sm:p-6 backdrop-blur-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5 pb-3 border-b border-white/10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "h-4 w-4", style: { color: currentDevice.brandColor } }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "font-heading font-extrabold text-xs uppercase tracking-wider",
                    style: { color: currentDevice.brandColor },
                    children: [
                      "Passo a Passo de Instalação no ",
                      currentDevice.name
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-code text-[11px] text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20 font-bold", children: "Simples & Rápido" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: currentDevice.steps.map((step, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3.5 group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: `flex-none flex h-7 w-7 items-center justify-center rounded-lg font-code font-extrabold text-xs shadow-md transition-all ${currentDevice.stepBadgeBg} ${currentDevice.stepBadgeText} border ${currentDevice.stepBadgeBorder}`,
                  children: [
                    "0",
                    idx + 1
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold font-heading text-white uppercase tracking-tight", children: step.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-300 font-body leading-relaxed mt-0.5", children: step.desc })
              ] })
            ] }, idx)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-code text-xs text-slate-400 text-center sm:text-left", children: [
                "🚀 Liberação automática via PIX por apenas ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-white font-bold", children: "R$ 10,00/mês" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: handleScrollToPlans,
                  className: "w-full sm:w-auto px-6 py-3 rounded-xl text-white font-heading font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.02]",
                  style: {
                    backgroundColor: currentDevice.brandColor,
                    boxShadow: `0 0 20px ${currentDevice.brandGlow}`
                  },
                  children: [
                    "Instalar no Meu ",
                    currentDevice.name.split(" ")[0],
                    " Agora →"
                  ]
                }
              )
            ] })
          ] })
        ] })
      }
    )
  ] }) });
}
function StickyBottomBar() {
  const [isVisible, setIsVisible] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleScrollToPlans = () => {
    const el = document.getElementById("planos");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };
  if (!isVisible) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "aside",
    {
      "aria-label": "Barra de Ação Rápida",
      className: "fixed bottom-0 left-0 right-0 z-40 bg-[#000000]/95 backdrop-blur-xl border-t border-brand/40 py-2.5 px-4 shadow-[0_-10px_30px_rgba(0,0,0,0.9)] animate-in slide-in-from-bottom duration-300",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto flex items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white font-heading font-extrabold text-xs sm:text-sm uppercase tracking-tight", children: [
              "Acesso 4K: ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand", children: "R$ 10,00/mês" }),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-400 text-[10px] font-code", children: " (R$ 0,33/dia)" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex items-center gap-2 text-[11px] font-code text-slate-400", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-3 w-3 text-amber-400" }),
              " Sinal Liso Antitravamento"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3 w-3 text-emerald-400" }),
              " Liberação em 2 Min"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: handleScrollToPlans,
            className: "flex-none px-5 sm:px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand to-rose-600 hover:from-rose-600 hover:to-brand text-white font-heading font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_var(--brand-glow)] transition-all cursor-pointer hover:scale-105 active:scale-95",
            children: "ASSINAR POR R$ 10 →"
          }
        )
      ] })
    }
  );
}
const PRESET_CATALOG = [
  {
    id: "1",
    title: "Brasileirão Série A & B (Todos os Jogos)",
    category: "futebol",
    badge: "Futebol Ao Vivo",
    quality: "4K 60fps (Zero Delay)",
    audio: "Transmissão Oficial Premiere",
    year: "2026"
  },
  {
    id: "2",
    title: "UEFA Champions League & Libertadores",
    category: "futebol",
    badge: "Ao Vivo",
    quality: "4K Ultra HD",
    audio: "Transmissão TNT / Space / CazéTV",
    year: "2026"
  },
  {
    id: "3",
    title: "Deadpool & Wolverine / Lançamentos Cinema",
    category: "filme",
    badge: "Filme",
    quality: "4K HDR Dolby Vision",
    audio: "Dublado & Legendado 5.1",
    year: "Lançamento"
  },
  {
    id: "4",
    title: "Stranger Things & House of the Dragon",
    category: "serie",
    badge: "Série Completa",
    quality: "4K UHD",
    audio: "Todas as Temporadas",
    year: "Completa"
  },
  {
    id: "5",
    title: "Premiere Clubes, Sportv & ESPN 1 a 4",
    category: "canal",
    badge: "Canais 24h",
    quality: "Full HD & 4K 60fps",
    audio: "Sem Travamentos",
    year: "Ao Vivo"
  },
  {
    id: "6",
    title: "Demon Slayer, One Piece & Jujutsu Kaisen",
    category: "anime",
    badge: "Anime",
    quality: "4K / Full HD",
    audio: "Catálogo Crunchyroll Completo",
    year: "Atualizado"
  },
  {
    id: "7",
    title: "Divertida Mente 2 & Filmes Infantis Disney",
    category: "filme",
    badge: "Infantil / Kids",
    quality: "4K UHD",
    audio: "100% Dublado",
    year: "Lançamento"
  },
  {
    id: "8",
    title: "UFC Pay-Per-View & Noite de Lutas",
    category: "canal",
    badge: "UFC Fight Pass",
    quality: "4K 60fps",
    audio: "Card Principal & Preliminar",
    year: "Ao Vivo"
  }
];
const SUGGESTION_TAGS = [
  "⚽ Brasileirão Ao Vivo",
  "🎬 Lançamentos do Cinema",
  "🍿 Séries Netflix & Max",
  "📺 Premiere FC",
  "⚔️ Animes",
  "🥊 UFC Combate",
  "👑 Novelas"
];
function ContentSearchSimulator() {
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const handleScrollToPlans = () => {
    const el = document.getElementById("planos");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };
  const results = reactExports.useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return PRESET_CATALOG;
    const matched = PRESET_CATALOG.filter(
      (item) => item.title.toLowerCase().includes(term) || item.badge.toLowerCase().includes(term) || item.category.toLowerCase().includes(term)
    );
    if (matched.length > 0) {
      return matched;
    }
    const customTitle = searchTerm.trim().split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
    const dynamicCustomItem = {
      id: "custom-" + term,
      title: customTitle,
      category: "filme",
      badge: "Disponível no Catálogo",
      quality: "4K Ultra HD • 60fps",
      audio: "Dublado & Legendado 5.1 (Sem Anúncios)",
      year: "Catálogo Completo"
    };
    return [dynamicCustomItem, ...PRESET_CATALOG.slice(0, 3)];
  }, [searchTerm]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative overflow-hidden bg-[#07070b] px-6 py-20 font-body text-foreground border-t border-white/10 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 font-code text-xs font-bold uppercase tracking-wider text-brand mb-3 shadow-[0_0_15px_var(--brand-glow)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5 text-brand" }),
        " Simulador de Catálogo em Tempo Real"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-2xl sm:text-4xl font-extrabold uppercase font-heading text-white tracking-tight", children: [
        "TEM O QUE VOCÊ ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-brand to-rose-400", children: "QUER ASSISTIR?" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2.5 font-code text-xs sm:text-sm max-w-xl mx-auto", children: "Consulte qualquer filme, série, novela, time de futebol ou canal e veja a liberação imediata." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative max-w-2xl mx-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-4 h-5 w-5 text-brand" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          value: searchTerm,
          onChange: (e) => setSearchTerm(e.target.value),
          placeholder: "Digite qualquer filme, série, time de futebol ou canal...",
          className: "w-full rounded-2xl border border-white/15 bg-white/[0.04] py-3.5 pl-12 pr-12 text-sm sm:text-base text-white placeholder-slate-500 font-body outline-none focus:border-brand focus:bg-white/[0.07] focus:shadow-[0_0_25px_rgba(151,2,2,0.4)] transition-all"
        }
      ),
      searchTerm && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setSearchTerm(""),
          className: "absolute right-4 text-slate-400 hover:text-white transition-colors cursor-pointer",
          title: "Limpar busca",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap items-center justify-center gap-2 mb-8 max-w-3xl mx-auto", children: SUGGESTION_TAGS.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setSearchTerm(tag.replace(/^[^\s]+\s/, "")),
        className: "px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-brand/20 border border-white/10 hover:border-brand/50 text-slate-300 hover:text-white font-code text-xs font-semibold transition-all cursor-pointer",
        children: tag
      },
      tag
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-8", children: results.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative rounded-xl bg-gradient-to-r from-[#12121c] to-[#0c0c12] border border-white/10 hover:border-brand/60 p-4 transition-all duration-200 shadow-md group hover:shadow-[0_0_20px_rgba(151,2,2,0.3)] flex flex-col justify-between gap-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-lg bg-brand/15 border border-brand/40 text-brand shrink-0 group-hover:scale-105 transition-transform", children: item.category === "futebol" ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: "⚽" }) : item.category === "canal" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Tv, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "h-5 w-5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-heading font-bold text-sm sm:text-base text-white tracking-tight leading-snug", children: item.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mt-1 text-[11px] font-code text-slate-400", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-400 font-semibold", children: item.quality }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.audio })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 text-[10px] font-bold font-code uppercase text-emerald-400 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3" }),
              " Liberado"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-2.5 border-t border-white/5 font-code text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-400 text-[11px]", children: [
              "Liberado em todos os planos por ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-white", children: "R$ 10,00/mês" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: handleScrollToPlans,
                className: "flex items-center gap-1 text-brand hover:text-white font-bold text-[11px] font-heading uppercase transition-colors cursor-pointer group-hover:underline",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-3 w-3 fill-brand" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Assistir Agora →" })
                ]
              }
            )
          ] })
        ]
      },
      item.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-gradient-to-r from-brand/20 via-brand/10 to-transparent border border-brand/40 p-5 sm:p-6 text-center flex flex-col sm:flex-row items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center sm:text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-heading font-extrabold text-base sm:text-lg text-white uppercase", children: "Tudo isso e mais 60.000 títulos liberados na sua Smart TV" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-code text-xs text-slate-300 mt-0.5", children: "Sem fidelidade e com liberação automática no PIX em menos de 2 minutos." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: handleScrollToPlans,
          className: "w-full sm:w-auto px-6 py-3 rounded-xl bg-brand hover:bg-[#b80303] text-white font-heading font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_var(--brand-glow)] transition-all cursor-pointer shrink-0 hover:scale-105",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center justify-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4 text-amber-300 fill-amber-300" }),
            "Liberar Meu Acesso por R$ 10 →"
          ] })
        }
      )
    ] })
  ] }) });
}
function Index() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "relative z-50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TopBanner, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(NavbarGlassFixa, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { id: "main-content", className: "flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(HeroSection, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PrecoTrioDark, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DeviceCompatibility, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ContentSearchSimulator, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ContentSection, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PriceComparison, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(MarqueeDepoimentos, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(FAQSection, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SocialProofToasts, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StickyBottomBar, {})
  ] });
}
export {
  Index as component
};

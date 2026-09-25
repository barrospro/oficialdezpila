import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { N as NavbarGlassFixa, F as Footer } from "./Footer-CD3w_7zL.mjs";
import { u as useCart } from "./cart.store-Bq85Dt5a.mjs";
import { f as formatCurrency } from "./shipping-NxYrh6DR.mjs";
import { g as getShopOrderStatusFn, c as createShopOrderFn } from "./shop-checkout.functions-gCIBYpJo.mjs";
import { Q as QRCodeSVG } from "../_libs/qrcode.react.mjs";
import "./index.mjs";
import "../_libs/seroval.mjs";
import { A as ArrowLeft, L as Lock, a0 as Truck, a as LoaderCircle, o as Sparkles, d as Clock, C as Check, c as Copy, l as ShieldCheck } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "./createSsrRpc-C2cGivNr.mjs";
import "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
function CheckoutPage() {
  const navigate = useNavigate();
  const {
    items,
    summary,
    clearCart
  } = useCart();
  const [nome, setNome] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [whatsapp, setWhatsapp] = reactExports.useState("");
  const [rua, setRua] = reactExports.useState("");
  const [numero, setNumero] = reactExports.useState("");
  const [bairro, setBairro] = reactExports.useState("");
  const [cidade, setCidade] = reactExports.useState("");
  const [uf, setUf] = reactExports.useState("SP");
  const [cep, setCep] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [errorMsg, setErrorMsg] = reactExports.useState(null);
  const [pixData, setPixData] = reactExports.useState(null);
  const [copied, setCopied] = reactExports.useState(false);
  const [timerSeconds, setTimerSeconds] = reactExports.useState(900);
  const [paymentStatus, setPaymentStatus] = reactExports.useState("pendente");
  reactExports.useEffect(() => {
    if (!pixData) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => Math.max(0, prev - 1));
    }, 1e3);
    return () => clearInterval(interval);
  }, [pixData]);
  reactExports.useEffect(() => {
    if (!pixData || paymentStatus === "pago") return;
    const pollInterval = setInterval(async () => {
      try {
        const res = await getShopOrderStatusFn({
          data: {
            orderId: pixData.orderId,
            pixId: pixData.pixId
          }
        });
        if (res.paid || res.status === "pago") {
          setPaymentStatus("pago");
          clearCart();
          clearInterval(pollInterval);
          setTimeout(() => {
            navigate({
              to: "/shop/pedido/$orderId",
              params: {
                orderId: pixData.orderId
              }
            });
          }, 1500);
        }
      } catch {
      }
    }, 3500);
    return () => clearInterval(pollInterval);
  }, [pixData, paymentStatus, navigate, clearCart]);
  const handleCreateOrder = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    if (items.length === 0) {
      setErrorMsg("Seu carrinho está vazio!");
      return;
    }
    setLoading(true);
    try {
      const res = await createShopOrderFn({
        data: {
          clienteNome: nome,
          clienteEmail: email,
          clienteWhatsapp: whatsapp,
          enderecoRua: rua,
          enderecoNumero: numero,
          enderecoBairro: bairro,
          enderecoCidade: cidade,
          enderecoUf: uf,
          enderecoCep: cep,
          subtotal: summary.subtotal,
          frete: summary.frete,
          total: summary.total,
          items: items.map((it) => ({
            productId: it.product.id,
            nome: it.product.nome,
            precoUnitario: it.product.preco,
            quantidade: it.quantidade
          }))
        }
      });
      if (!res.ok || !res.qrCode || !res.orderId) {
        throw new Error(res.error || "Erro ao gerar código Pix para o pedido.");
      }
      setPixData({
        orderId: res.orderId,
        pixId: res.pixId,
        qrCode: res.qrCode,
        qrCodeBase64: res.qrCodeBase64,
        total: res.total || summary.total
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro ao processar pedido.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };
  const copyPixCode = () => {
    if (!pixData) return;
    navigator.clipboard.writeText(pixData.qrCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 3e3);
  };
  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col bg-[#050507] text-foreground font-body", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "relative z-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NavbarGlassFixa, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 pt-28 pb-20 px-4 sm:px-6 lg:px-12 max-w-[1200px] mx-auto w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/shop/carrinho", className: "inline-flex items-center gap-2 text-xs font-code text-slate-400 hover:text-white mb-6 transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Voltar ao Carrinho" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl sm:text-4xl font-bold font-heading uppercase text-white mb-8", children: "Checkout do Pedido" }),
      items.length === 0 && !pixData ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-20 bg-surface/30 border border-white/5 rounded-3xl backdrop-blur-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 font-code text-sm mb-4", children: "Seu carrinho está vazio." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "btn-brand", children: "Ir para a Loja" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-7 bg-surface/40 border border-white/10 p-6 sm:p-8 rounded-3xl backdrop-blur-xl", children: !pixData ? /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleCreateOrder, className: "flex flex-col gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-heading font-bold uppercase text-white mb-1 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-4 w-4 text-emerald-400" }),
              " 1. Dados de Contato"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-code text-slate-400", children: "Sem necessidade de cadastro prévio." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-code text-slate-300 mb-1", children: "Nome Completo *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", required: true, value: nome, onChange: (e) => setNome(e.target.value), placeholder: "Digite seu nome completo", className: "w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-code text-white focus:outline-none focus:border-brand" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-code text-slate-300 mb-1", children: "E-mail *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), placeholder: "seuemail@exemplo.com", className: "w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-code text-white focus:outline-none focus:border-brand" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-code text-slate-300 mb-1", children: "WhatsApp *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "tel", required: true, value: whatsapp, onChange: (e) => setWhatsapp(e.target.value), placeholder: "(11) 99999-9999", className: "w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-code text-white focus:outline-none focus:border-brand" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-white/10 pt-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-heading font-bold uppercase text-white mb-1 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "h-4 w-4 text-brand" }),
              " 2. Endereço de Entrega"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-code text-slate-400", children: "Entregamos para todo o Brasil via Correios/Transportadora." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-code text-slate-300 mb-1", children: "CEP *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", required: true, value: cep, onChange: (e) => setCep(e.target.value), placeholder: "00000-000", className: "w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-code text-white focus:outline-none focus:border-brand" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-code text-slate-300 mb-1", children: "Rua / Avenida *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", required: true, value: rua, onChange: (e) => setRua(e.target.value), placeholder: "Nome da sua rua", className: "w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-code text-white focus:outline-none focus:border-brand" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-code text-slate-300 mb-1", children: "Número *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", required: true, value: numero, onChange: (e) => setNumero(e.target.value), placeholder: "123", className: "w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-code text-white focus:outline-none focus:border-brand" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-code text-slate-300 mb-1", children: "Bairro *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", required: true, value: bairro, onChange: (e) => setBairro(e.target.value), placeholder: "Seu bairro", className: "w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-code text-white focus:outline-none focus:border-brand" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-code text-slate-300 mb-1", children: "Cidade / UF *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", required: true, value: cidade, onChange: (e) => setCidade(e.target.value), placeholder: "Cidade", className: "w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-xs font-code text-white focus:outline-none focus:border-brand" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", required: true, maxLength: 2, value: uf, onChange: (e) => setUf(e.target.value.toUpperCase()), placeholder: "UF", className: "w-16 bg-black/60 border border-white/10 rounded-xl px-2 py-2.5 text-xs font-code text-white text-center focus:outline-none focus:border-brand" })
                ] })
              ] })
            ] })
          ] }),
          errorMsg && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 font-code text-xs", children: errorMsg }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: loading, className: "w-full flex items-center justify-center gap-2 bg-[#970202] hover:bg-[#b80303] text-white py-4 rounded-xl font-heading font-bold text-sm uppercase tracking-wider shadow-[0_4px_24px_rgba(151,2,2,0.8)] transition-all cursor-pointer disabled:opacity-50", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Gerando Pix do Pedido..." })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5 text-amber-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Gerar Pix de ",
              formatCurrency(summary.total)
            ] })
          ] }) })
        ] }) : (
          /* EXIBIÇÃO DO PIX DE PAGAMENTO DO PEDIDO */
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center gap-6 animate-in fade-in", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full font-code text-xs font-bold text-emerald-400", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 animate-spin" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Aguardando Pagamento via Pix..." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-heading font-bold uppercase text-white", children: "Escaneie ou Copie o Código Pix" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-code text-slate-400 mt-1", children: [
                "Pedido ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
                  "#",
                  pixData.orderId.slice(-6).toUpperCase()
                ] }),
                " • Total:",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-white", children: formatCurrency(pixData.total) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 bg-white rounded-2xl shadow-2xl border border-white/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(QRCodeSVG, { value: pixData.qrCode, size: 200, level: "M" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full flex flex-col gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: copyPixCode, className: "w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 py-3.5 px-4 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] cursor-pointer", children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-5 w-5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Código Pix Copiado com Sucesso!" })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-5 w-5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Copiar Código Pix (Copia e Cola)" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs font-code text-slate-400 px-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Expira em:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-amber-400", children: formatTimer(timerSeconds) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-code text-slate-400 bg-white/5 p-3 rounded-xl border border-white/5", children: "💡 Assim que você pagar no app do seu banco, a confirmação ocorre automaticamente em poucos segundos!" })
          ] })
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-5 p-6 bg-surface/40 border border-white/10 rounded-3xl backdrop-blur-xl flex flex-col gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-heading font-bold uppercase text-white border-b border-white/10 pb-4", children: "Itens do Pedido" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3 max-h-80 overflow-y-auto pr-1", children: items.map(({
            product,
            quantidade
          }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 text-xs font-code", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: product.imagem_url, alt: product.nome, className: "size-10 rounded-lg object-cover bg-black border border-white/10 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold block truncate", children: product.nome }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-400 text-[10px]", children: [
                  quantidade,
                  "x ",
                  formatCurrency(product.preco)
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold shrink-0", children: formatCurrency(product.preco * quantidade) })
          ] }, product.id)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-white/10 pt-4 flex flex-col gap-2 font-code text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-slate-300", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatCurrency(summary.subtotal) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-slate-300", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Frete" }),
              summary.hasFreeShipping ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-400 font-bold", children: "GRÁTIS" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatCurrency(summary.frete) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 border-t border-white/10 flex items-center justify-between text-base font-bold text-white", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-extrabold text-white", children: formatCurrency(summary.total) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-2 text-[11px] font-code text-slate-400", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4 text-emerald-400 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Compra protegida via Pix Nitro Pagamentos." })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  CheckoutPage as component
};

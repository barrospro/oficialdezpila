import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { N as NavbarGlassFixa, F as Footer } from "./Footer-CD3w_7zL.mjs";
import { g as getShopOrderStatusFn } from "./shop-checkout.functions-gCIBYpJo.mjs";
import { f as formatCurrency } from "./shipping-NxYrh6DR.mjs";
import { a as Route } from "./router-DUs2VTm4.mjs";
import "./index.mjs";
import "../_libs/seroval.mjs";
import { g as CircleCheck, d as Clock, a4 as MessageSquare, a1 as ShoppingBag } from "../_libs/lucide-react.mjs";
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
import "../_libs/vercel__analytics.mjs";
import "../_libs/vercel__speed-insights.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
function OrderStatusPage() {
  const {
    orderId
  } = Route.useParams();
  const [loading, setLoading] = reactExports.useState(true);
  const [order, setOrder] = reactExports.useState(null);
  const [status, setStatus] = reactExports.useState("pendente");
  reactExports.useEffect(() => {
    let mounted = true;
    getShopOrderStatusFn({
      data: {
        orderId
      }
    }).then((res) => {
      if (mounted) {
        if (res.order) setOrder(res.order);
        setStatus(res.status || "pendente");
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, [orderId]);
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-[#050507] text-white flex items-center justify-center font-code", children: "Buscando dados do pedido..." });
  }
  const isPaid = status === "pago" || status === "paid" || status === "approved";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col bg-[#050507] text-foreground font-body", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "relative z-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NavbarGlassFixa, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 pt-28 pb-20 px-4 sm:px-6 lg:px-12 max-w-[800px] mx-auto w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-surface/40 border border-white/10 p-6 sm:p-10 rounded-3xl backdrop-blur-xl text-center flex flex-col items-center gap-6", children: [
      isPaid ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.4)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-10 w-10" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-20 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-[0_0_40px_rgba(245,158,11,0.4)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-10 w-10 animate-spin" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-code text-slate-400 uppercase tracking-widest block mb-1", children: [
          "Pedido #",
          orderId.slice(-6).toUpperCase()
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl sm:text-4xl font-bold font-heading uppercase text-white", children: isPaid ? "Pagamento Confirmado!" : "Aguardando Confirmação do Pix" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs sm:text-sm text-slate-300 font-code mt-2 max-w-md mx-auto", children: isPaid ? "Seu pedido já foi aprovado e está em separação para envio. Enviaremos o código de rastreio no seu WhatsApp!" : "Assim que o Pix for compensado, o status do pedido será atualizado automaticamente nesta página." })
      ] }),
      order && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full text-left bg-black/50 border border-white/10 rounded-2xl p-5 flex flex-col gap-4 font-code text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-white/10 pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "Cliente:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold", children: order.cliente_nome })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-white/10 pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "WhatsApp:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold", children: order.cliente_whatsapp })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-white/10 pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "Endereço de Entrega:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white font-bold text-right", children: [
            order.endereco_rua,
            ", ",
            order.endereco_numero,
            " - ",
            order.endereco_bairro,
            " (",
            order.endereco_cidade,
            "/",
            order.endereco_uf,
            ")"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-1 font-bold text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-300", children: "Total Pago:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white text-base", children: formatCurrency(order.total || 0) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center gap-4 w-full pt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `https://wa.me/5511999999999?text=${encodeURIComponent(`Olá, gostaria de acompanhar o status do meu pedido #${orderId} na Loja DezPila!`)}`, target: "_blank", rel: "noopener noreferrer", className: "w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 py-3.5 px-4 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition-all cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Suporte WhatsApp" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/shop", className: "w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3.5 px-4 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition-all", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Voltar para a Loja" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  OrderStatusPage as component
};

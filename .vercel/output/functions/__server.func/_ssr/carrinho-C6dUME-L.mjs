import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { N as NavbarGlassFixa, F as Footer } from "./Footer-CD3w_7zL.mjs";
import { u as useCart } from "./cart.store-Bq85Dt5a.mjs";
import { f as formatCurrency } from "./shipping-NxYrh6DR.mjs";
import { A as ArrowLeft, a1 as ShoppingBag, o as Sparkles, J as Minus, K as Plus, a3 as Trash2, a0 as Truck, a2 as ArrowRight } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
function CartPage() {
  const {
    items,
    summary,
    updateCartQuantity,
    removeFromCart,
    clearCart
  } = useCart();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col bg-[#050507] text-foreground font-body", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "relative z-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NavbarGlassFixa, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 pt-28 pb-20 px-4 sm:px-6 lg:px-12 max-w-[1200px] mx-auto w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/shop", className: "inline-flex items-center gap-2 text-xs font-code text-slate-400 hover:text-white mb-6 transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Continuar Comprando" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl sm:text-4xl font-bold font-heading uppercase text-white mb-8", children: "Seu Carrinho de Compras" }),
      items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-20 bg-surface/30 border border-white/5 rounded-3xl backdrop-blur-md flex flex-col items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-16 w-16 text-slate-600" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-heading font-bold text-white uppercase", children: "Seu carrinho está vazio" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-code text-slate-400 max-w-md", children: "Explore nossos produtos de acessórios para TV e cinema em casa para adicionar itens." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "btn-brand mt-2", children: "Ver Catálogo de Produtos" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-8 flex flex-col gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-2xl bg-surface/40 border border-white/10 backdrop-blur-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs font-code mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: summary.hasFreeShipping ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-emerald-400 font-bold flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-emerald-400" }),
                " Parabéns! Seu frete é GRÁTIS!"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-amber-300", children: [
                "Faltam ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: formatCurrency(summary.freeShippingRemaining) }),
                " para você ter FRETE GRÁTIS!"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-400 font-bold", children: [
                summary.subtotal.toFixed(2),
                " / R$ 150,00"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-2.5 rounded-full bg-black/60 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-gradient-to-r from-amber-400 via-emerald-400 to-emerald-500 transition-all duration-500", style: {
              width: `${Math.min(100, summary.subtotal / 150 * 100)}%`
            } }) })
          ] }),
          items.map(({
            product,
            quantidade
          }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-6 bg-surface/30 border border-white/10 rounded-2xl backdrop-blur-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 w-full sm:w-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: product.imagem_url, alt: product.nome, className: "size-20 rounded-xl object-cover bg-black border border-white/10 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-code text-slate-400 uppercase tracking-widest block", children: product.categoria === "acessorios_tv" ? "TV & Streaming" : "Night de Filme" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-heading font-bold text-sm text-white", children: product.nome }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-code text-slate-400 block mt-1", children: [
                  formatCurrency(product.preco),
                  " un."
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-white/5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-black/60 border border-white/10 rounded-xl p-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => updateCartQuantity(product.id, quantidade - 1), className: "p-1.5 hover:bg-white/10 text-white rounded-lg transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-3.5 w-3.5" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-code text-xs font-bold text-white px-2", children: quantidade }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => updateCartQuantity(product.id, quantidade + 1), className: "p-1.5 hover:bg-white/10 text-white rounded-lg transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-code font-bold text-sm text-white", children: formatCurrency(product.preco * quantidade) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => removeFromCart(product.id), className: "p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors", title: "Remover item", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
            ] })
          ] }, product.id)),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: clearCart, className: "text-xs font-code text-slate-400 hover:text-rose-400 transition-colors", children: "Limpar Carrinho" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-4 p-6 bg-surface/40 border border-white/10 rounded-3xl backdrop-blur-xl flex flex-col gap-6 sticky top-28", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-heading font-bold uppercase text-white border-b border-white/10 pb-4", children: "Resumo do Pedido" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 font-code text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-slate-300", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatCurrency(summary.subtotal) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-slate-300", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Frete" }),
              summary.hasFreeShipping ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-400 font-bold", children: "GRÁTIS" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatCurrency(summary.frete) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-3 border-t border-white/10 flex items-center justify-between text-sm text-white font-bold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-extrabold text-white", children: formatCurrency(summary.total) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-brand/10 border border-brand/30 rounded-xl text-[11px] font-code text-slate-300 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "h-4 w-4 text-brand shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Pagamento via Pix com liberação e envio rápido." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/shop/checkout", className: "w-full flex items-center justify-center gap-2 bg-[#970202] hover:bg-[#b80303] text-white py-4 rounded-xl font-heading font-bold text-xs uppercase tracking-wider shadow-[0_4px_24px_rgba(151,2,2,0.8)] transition-all", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Avançar para o Checkout" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  CartPage as component
};

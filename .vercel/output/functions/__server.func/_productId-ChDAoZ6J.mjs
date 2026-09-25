import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { L as Link } from "./_libs/tanstack__react-router.mjs";
import { N as NavbarGlassFixa, F as Footer } from "./_ssr/Footer-CD3w_7zL.mjs";
import { g as getProductByIdFromDb } from "./_ssr/supabase-BjgR9v3X.mjs";
import { u as useCart } from "./_ssr/cart.store-Bq85Dt5a.mjs";
import { F as FREE_SHIPPING_THRESHOLD, f as formatCurrency } from "./_ssr/shipping-NxYrh6DR.mjs";
import { R as Route$1 } from "./_ssr/router-DUs2VTm4.mjs";
import { A as ArrowLeft, a0 as Truck, l as ShieldCheck, J as Minus, K as Plus, C as Check, a1 as ShoppingBag } from "./_libs/lucide-react.mjs";
import "./_libs/tanstack__router-core.mjs";
import "./_libs/tanstack__history.mjs";
import "./_libs/cookie-es.mjs";
import "./_libs/seroval.mjs";
import "./_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./_libs/isbot.mjs";
import "./_libs/supabase__supabase-js.mjs";
import "./_libs/supabase__postgrest-js.mjs";
import "./_libs/supabase__realtime-js.mjs";
import "./_libs/supabase__phoenix.mjs";
import "./_libs/supabase__storage-js.mjs";
import "./_libs/iceberg-js.mjs";
import "./_libs/supabase__auth-js.mjs";
import "tslib";
import "./_libs/supabase__functions-js.mjs";
import "./_ssr/shop-products-DOaOjncj.mjs";
import "./_libs/vercel__analytics.mjs";
import "./_libs/vercel__speed-insights.mjs";
function ProductDetailPage() {
  const {
    productId
  } = Route$1.useParams();
  const [product, setProduct] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [quantidade, setQuantidade] = reactExports.useState(1);
  const [added, setAdded] = reactExports.useState(false);
  const {
    addToCart
  } = useCart();
  reactExports.useEffect(() => {
    let mounted = true;
    getProductByIdFromDb(productId).then((p) => {
      if (mounted) {
        setProduct(p);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, [productId]);
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-[#050507] text-white flex items-center justify-center font-code", children: "Carregando detalhes do produto..." });
  }
  if (!product) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[#050507] text-white flex flex-col items-center justify-center font-body gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Produto não encontrado" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "btn-brand", children: "Voltar para a Loja" })
    ] });
  }
  const handleAdd = () => {
    addToCart(product, quantidade);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };
  const isFreeShippingProduct = product.preco >= FREE_SHIPPING_THRESHOLD;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col bg-[#050507] text-foreground font-body", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "relative z-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NavbarGlassFixa, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 pt-28 pb-20 px-4 sm:px-6 lg:px-12 max-w-[1200px] mx-auto w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/shop", className: "inline-flex items-center gap-2 text-xs font-code text-slate-400 hover:text-white mb-6 transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Voltar ao Catálogo" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-12 items-start bg-surface/40 border border-white/10 p-6 sm:p-10 rounded-3xl backdrop-blur-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-6 relative bg-black rounded-2xl overflow-hidden aspect-4/3 border border-white/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: product.imagem_url, alt: product.nome, className: "w-full h-full object-cover" }),
          product.badge && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-4 left-4 bg-[#970202] text-white text-xs font-bold font-code px-3 py-1 rounded-lg uppercase tracking-wider shadow-[0_0_15px_rgba(151,2,2,0.9)]", children: product.badge })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-6 flex flex-col gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-code text-slate-400 uppercase tracking-widest block mb-2", children: product.categoria === "acessorios_tv" ? "TV & Streaming" : "Night de Filme" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl sm:text-4xl font-bold font-heading uppercase text-white leading-tight", children: product.nome })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-3 border-b border-white/10 pb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl sm:text-4xl font-extrabold font-code text-white", children: formatCurrency(product.preco) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-code text-slate-400", children: "em até 3x sem juros via Pix" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm sm:text-base text-slate-300 leading-relaxed font-body", children: product.descricao }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col gap-2 font-code text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-slate-200", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "h-4 w-4 text-emerald-400" }),
              isFreeShippingProduct ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-400 font-bold", children: "🚚 Este produto possui FRETE GRÁTIS!" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "🚚 Frete fixo de ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "R$ 9,90" }),
                " para todo o Brasil (Grátis em compras acima de R$ 150)"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-slate-400", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4 text-brand" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Garantia de Entrega DezPila • Produto 100% Novo com Nota" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center gap-4 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 bg-black/60 border border-white/10 rounded-xl p-1.5 w-full sm:w-auto justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setQuantidade((q) => Math.max(1, q - 1)), className: "p-2 rounded-lg hover:bg-white/10 text-white transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-code text-sm font-bold text-white px-4", children: quantidade }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setQuantidade((q) => q + 1), className: "p-2 rounded-lg hover:bg-white/10 text-white transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: handleAdd, className: "w-full flex-1 flex items-center justify-center gap-2 bg-[#970202] hover:bg-[#b80303] text-white py-4 px-6 rounded-xl font-heading font-bold text-sm uppercase tracking-wider shadow-[0_4px_24px_rgba(151,2,2,0.8)] transition-all cursor-pointer", children: added ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-5 w-5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Adicionado ao Carrinho!" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-5 w-5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Adicionar ao Carrinho" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop/carrinho", className: "text-xs font-code text-brand hover:underline inline-flex items-center gap-1", children: "Ir para o Carrinho de Compras →" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  ProductDetailPage as component
};

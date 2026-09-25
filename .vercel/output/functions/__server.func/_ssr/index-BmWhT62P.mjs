import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { N as NavbarGlassFixa, F as Footer } from "./Footer-CD3w_7zL.mjs";
import { I as INITIAL_PRODUCTS } from "./shop-products-DOaOjncj.mjs";
import { u as useCart } from "./cart.store-Bq85Dt5a.mjs";
import { f as formatCurrency } from "./shipping-NxYrh6DR.mjs";
import { a0 as Truck, a1 as ShoppingBag, o as Sparkles, m as Search, a2 as ArrowRight, C as Check } from "../_libs/lucide-react.mjs";
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
function ShopCatalogPage() {
  const [category, setCategory] = reactExports.useState("todos");
  const [search, setSearch] = reactExports.useState("");
  const [sortBy, setSortBy] = reactExports.useState("relevancia");
  const [addedToast, setAddedToast] = reactExports.useState(null);
  const {
    addToCart,
    summary,
    totalCount
  } = useCart();
  const filteredProducts = reactExports.useMemo(() => {
    return INITIAL_PRODUCTS.filter((p) => {
      const matchesCategory = category === "todos" || p.categoria === category;
      const matchesSearch = p.nome.toLowerCase().includes(search.toLowerCase()) || p.descricao.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === "menor_preco") return a.preco - b.preco;
      if (sortBy === "maior_preco") return b.preco - a.preco;
      return (b.destaque ? 1 : 0) - (a.destaque ? 1 : 0);
    });
  }, [category, search, sortBy]);
  const handleAddToCart = (product) => {
    addToCart(product, 1);
    setAddedToast(product.nome);
    setTimeout(() => setAddedToast(null), 3e3);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col bg-[#050507] text-foreground font-body", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "relative z-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NavbarGlassFixa, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 pt-28 pb-20 px-4 sm:px-6 lg:px-12 max-w-[1440px] mx-auto w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 rounded-2xl bg-gradient-to-r from-brand/20 via-surface to-amber-500/10 border border-brand/30 p-4 sm:p-6 backdrop-blur-md shadow-[0_0_30px_rgba(151,2,2,0.2)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-12 rounded-xl bg-brand/20 border border-brand/40 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "h-6 w-6 text-brand" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl sm:text-2xl font-bold font-heading uppercase text-white tracking-wide", children: "Loja Oficial DezPila" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs sm:text-sm text-slate-300 font-code", children: [
                "🚚 Frete Fixo R$ 9,90 • ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-400 font-bold", children: "FRETE GRÁTIS" }),
                " nas compras a partir de R$ 150,00!"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/shop/carrinho", className: "flex items-center gap-2 bg-brand hover:bg-[#b80303] text-white px-5 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_var(--brand-glow)] shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Meu Carrinho" }),
            totalCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-white text-brand px-2 py-0.5 rounded-full text-[10px] font-extrabold", children: totalCount })
          ] })
        ] }),
        totalCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-3 border-t border-white/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs font-code mb-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: summary.hasFreeShipping ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-emerald-400 font-bold flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5" }),
              " Parabéns! Você ganhou Frete Grátis!"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-amber-300", children: [
              "Faltam ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: formatCurrency(summary.freeShippingRemaining) }),
              " para Frete Grátis!"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-400 font-bold", children: [
              summary.subtotal.toFixed(2),
              " / R$ 150,00"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-2 rounded-full bg-white/10 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-500", style: {
            width: `${Math.min(100, summary.subtotal / 150 * 100)}%`
          } }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex flex-col md:flex-row items-center justify-between gap-4 bg-surface/50 border border-white/10 p-4 rounded-2xl backdrop-blur-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 w-full md:w-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setCategory("todos"), className: `px-4 py-2 rounded-xl text-xs font-bold uppercase font-heading transition-all ${category === "todos" ? "bg-brand text-white shadow-[0_0_15px_var(--brand-glow)]" : "bg-white/5 text-slate-400 hover:text-white border border-white/5"}`, children: "Todos os Produtos" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setCategory("acessorios_tv"), className: `px-4 py-2 rounded-xl text-xs font-bold uppercase font-heading transition-all ${category === "acessorios_tv" ? "bg-brand text-white shadow-[0_0_15px_var(--brand-glow)]" : "bg-white/5 text-slate-400 hover:text-white border border-white/5"}`, children: "📺 Acessórios de TV" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setCategory("cinema_em_casa"), className: `px-4 py-2 rounded-xl text-xs font-bold uppercase font-heading transition-all ${category === "cinema_em_casa" ? "bg-brand text-white shadow-[0_0_15px_var(--brand-glow)]" : "bg-white/5 text-slate-400 hover:text-white border border-white/5"}`, children: "🍿 Night de Filme" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full sm:w-64", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Buscar produto...", className: "w-full pl-9 pr-3 py-2 bg-black/60 border border-white/10 rounded-xl text-xs font-code text-white focus:outline-none focus:border-brand" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: sortBy, onChange: (e) => setSortBy(e.target.value), className: "w-full sm:w-auto bg-black/60 border border-white/10 text-xs font-code text-white px-3 py-2 rounded-xl focus:outline-none focus:border-brand", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "relevancia", children: "Destaques" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "menor_preco", children: "Menor Preço" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "maior_preco", children: "Maior Preço" })
          ] })
        ] })
      ] }),
      filteredProducts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-20 bg-surface/30 border border-white/5 rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 font-code text-sm", children: "Nenhum produto encontrado com os filtros selecionados." }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: filteredProducts.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative bg-[#09090e] border border-white/10 hover:border-brand/50 rounded-2xl overflow-hidden backdrop-blur-md transition-all duration-300 hover:-translate-y-1 flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-4/3 bg-black overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.imagem_url, alt: p.nome, className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" }),
          p.badge && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-3 left-3 bg-[#970202] text-white text-[10px] font-bold font-code px-2.5 py-1 rounded-md uppercase tracking-wider shadow-[0_0_10px_rgba(151,2,2,0.8)]", children: p.badge }),
          p.preco >= 150 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-3 right-3 bg-emerald-500/90 text-white text-[10px] font-bold font-code px-2 py-0.5 rounded shadow", children: "Frete Grátis" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 flex-1 flex flex-col justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-code text-slate-400 uppercase tracking-widest block mb-1", children: p.categoria === "acessorios_tv" ? "TV & Streaming" : "Night de Filme" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop/$productId", params: {
              productId: p.id
            }, className: "font-heading font-bold text-sm text-white hover:text-brand line-clamp-2 transition-colors", children: p.nome }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed font-body", children: p.descricao })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-4 border-t border-white/5 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-code text-slate-400 block", children: "Preço" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-black font-code text-white", children: formatCurrency(p.preco) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop/$productId", params: {
                productId: p.id
              }, className: "p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors", title: "Ver Detalhes", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => handleAddToCart(p), className: "flex items-center gap-1.5 bg-[#970202] hover:bg-[#b80303] text-white px-3.5 py-2.5 rounded-xl text-xs font-bold font-heading uppercase tracking-wider shadow-[0_4px_16px_rgba(151,2,2,0.6)] transition-all cursor-pointer", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-3.5 w-3.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Comprar" })
              ] })
            ] })
          ] })
        ] })
      ] }, p.id)) })
    ] }),
    addedToast && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-emerald-500 text-slate-950 font-code font-bold text-xs px-5 py-3.5 rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.5)] animate-in fade-in slide-in-from-bottom-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-5 w-5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        '"',
        addedToast,
        '" adicionado ao carrinho!'
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  ShopCatalogPage as component
};

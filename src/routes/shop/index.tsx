import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { NavbarGlassFixa } from "@/components/NavbarGlassFixa";
import { Footer } from "@/components/Footer";
import { INITIAL_PRODUCTS, Product } from "@/data/shop-products";
import { useCart } from "@/lib/cart.store";
import { formatCurrency } from "@/lib/shipping";
import { ShoppingBag, Search, Sparkles, Truck, Check, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/shop/")({
  component: ShopCatalogPage,
  head: () => ({
    meta: [
      { title: "Loja DezPila — Acessórios para TV & Cinema em Casa" },
      {
        name: "description",
        content:
          "Compre acessórios para sua Smart TV, controles universais, cabos HDMI 8K, soundbars e kits de pipoca para sua noite de filmes. Frete Grátis acima de R$ 150!",
      },
    ],
  }),
});

function ShopCatalogPage() {
  const [category, setCategory] = useState<"todos" | "acessorios_tv" | "cinema_em_casa">("todos");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"relevancia" | "menor_preco" | "maior_preco">("relevancia");
  const [addedToast, setAddedToast] = useState<string | null>(null);

  const { addToCart, summary, totalCount } = useCart();

  const filteredProducts = useMemo(() => {
    return INITIAL_PRODUCTS.filter((p) => {
      const matchesCategory = category === "todos" || p.categoria === category;
      const matchesSearch =
        p.nome.toLowerCase().includes(search.toLowerCase()) ||
        p.descricao.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === "menor_preco") return a.preco - b.preco;
      if (sortBy === "maior_preco") return b.preco - a.preco;
      return (b.destaque ? 1 : 0) - (a.destaque ? 1 : 0);
    });
  }, [category, search, sortBy]);

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    setAddedToast(product.nome);
    setTimeout(() => setAddedToast(null), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050507] text-foreground font-body">
      <header className="relative z-50">
        <NavbarGlassFixa />
      </header>

      <main className="flex-1 pt-28 pb-20 px-4 sm:px-6 lg:px-12 max-w-[1440px] mx-auto w-full">
        {/* Banner Superior de Frete */}
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-brand/20 via-surface to-amber-500/10 border border-brand/30 p-4 sm:p-6 backdrop-blur-md shadow-[0_0_30px_rgba(151,2,2,0.2)]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-xl bg-brand/20 border border-brand/40 flex items-center justify-center shrink-0">
                <Truck className="h-6 w-6 text-brand" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold font-heading uppercase text-white tracking-wide">
                  Loja Oficial DezPila
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 font-code">
                  🚚 Frete Fixo R$ 9,90 • <span className="text-emerald-400 font-bold">FRETE GRÁTIS</span> nas compras a partir de R$ 150,00!
                </p>
              </div>
            </div>

            <Link
              to="/shop/carrinho"
              className="flex items-center gap-2 bg-brand hover:bg-[#b80303] text-white px-5 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_var(--brand-glow)] shrink-0"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Meu Carrinho</span>
              {totalCount > 0 && (
                <span className="bg-white text-brand px-2 py-0.5 rounded-full text-[10px] font-extrabold">
                  {totalCount}
                </span>
              )}
            </Link>
          </div>

          {/* Barra de Progresso de Frete Grátis se houver itens */}
          {totalCount > 0 && (
            <div className="mt-4 pt-3 border-t border-white/10">
              <div className="flex items-center justify-between text-xs font-code mb-1.5">
                <span>
                  {summary.hasFreeShipping ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <Sparkles className="h-3.5 w-3.5" /> Parabéns! Você ganhou Frete Grátis!
                    </span>
                  ) : (
                    <span className="text-amber-300">
                      Faltam <strong>{formatCurrency(summary.freeShippingRemaining)}</strong> para Frete Grátis!
                    </span>
                  )}
                </span>
                <span className="text-slate-400 font-bold">{summary.subtotal.toFixed(2)} / R$ 150,00</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-500"
                  style={{
                    width: `${Math.min(100, (summary.subtotal / 150) * 100)}%`,
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Filtros e Busca */}
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4 bg-surface/50 border border-white/10 p-4 rounded-2xl backdrop-blur-md">
          {/* Categorias */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              type="button"
              onClick={() => setCategory("todos")}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase font-heading transition-all ${
                category === "todos"
                  ? "bg-brand text-white shadow-[0_0_15px_var(--brand-glow)]"
                  : "bg-white/5 text-slate-400 hover:text-white border border-white/5"
              }`}
            >
              Todos os Produtos
            </button>
            <button
              type="button"
              onClick={() => setCategory("acessorios_tv")}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase font-heading transition-all ${
                category === "acessorios_tv"
                  ? "bg-brand text-white shadow-[0_0_15px_var(--brand-glow)]"
                  : "bg-white/5 text-slate-400 hover:text-white border border-white/5"
              }`}
            >
              📺 Acessórios de TV
            </button>
            <button
              type="button"
              onClick={() => setCategory("cinema_em_casa")}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase font-heading transition-all ${
                category === "cinema_em_casa"
                  ? "bg-brand text-white shadow-[0_0_15px_var(--brand-glow)]"
                  : "bg-white/5 text-slate-400 hover:text-white border border-white/5"
              }`}
            >
              🍿 Night de Filme
            </button>
          </div>

          {/* Busca e Ordenação */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar produto..."
                className="w-full pl-9 pr-3 py-2 bg-black/60 border border-white/10 rounded-xl text-xs font-code text-white focus:outline-none focus:border-brand"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "relevancia" | "menor_preco" | "maior_preco")}
              className="w-full sm:w-auto bg-black/60 border border-white/10 text-xs font-code text-white px-3 py-2 rounded-xl focus:outline-none focus:border-brand"
            >
              <option value="relevancia">Destaques</option>
              <option value="menor_preco">Menor Preço</option>
              <option value="maior_preco">Maior Preço</option>
            </select>
          </div>
        </div>

        {/* Grid de Produtos */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-surface/30 border border-white/5 rounded-2xl">
            <p className="text-slate-400 font-code text-sm">Nenhum produto encontrado com os filtros selecionados.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="group relative bg-[#09090e] border border-white/10 hover:border-brand/50 rounded-2xl overflow-hidden backdrop-blur-md transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                {/* Imagem do Produto */}
                <div className="relative aspect-4/3 bg-black overflow-hidden">
                  <img
                    src={p.imagem_url}
                    alt={p.nome}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {p.badge && (
                    <span className="absolute top-3 left-3 bg-[#970202] text-white text-[10px] font-bold font-code px-2.5 py-1 rounded-md uppercase tracking-wider shadow-[0_0_10px_rgba(151,2,2,0.8)]">
                      {p.badge}
                    </span>
                  )}
                  {p.preco >= 150 && (
                    <span className="absolute top-3 right-3 bg-emerald-500/90 text-white text-[10px] font-bold font-code px-2 py-0.5 rounded shadow">
                      Frete Grátis
                    </span>
                  )}
                </div>

                {/* Conteúdo do Card */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-code text-slate-400 uppercase tracking-widest block mb-1">
                      {p.categoria === "acessorios_tv" ? "TV & Streaming" : "Night de Filme"}
                    </span>
                    <Link
                      to="/shop/$productId"
                      params={{ productId: p.id }}
                      className="font-heading font-bold text-sm text-white hover:text-brand line-clamp-2 transition-colors"
                    >
                      {p.nome}
                    </Link>
                    <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed font-body">
                      {p.descricao}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-code text-slate-400 block">Preço</span>
                      <span className="text-xl font-black font-code text-white">{formatCurrency(p.preco)}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        to="/shop/$productId"
                        params={{ productId: p.id }}
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                        title="Ver Detalhes"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleAddToCart(p)}
                        className="flex items-center gap-1.5 bg-[#970202] hover:bg-[#b80303] text-white px-3.5 py-2.5 rounded-xl text-xs font-bold font-heading uppercase tracking-wider shadow-[0_4px_16px_rgba(151,2,2,0.6)] transition-all cursor-pointer"
                      >
                        <ShoppingBag className="h-3.5 w-3.5" />
                        <span>Comprar</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Notification Toast */}
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-emerald-500 text-slate-950 font-code font-bold text-xs px-5 py-3.5 rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.5)] animate-in fade-in slide-in-from-bottom-5">
          <Check className="h-5 w-5" />
          <span>"{addedToast}" adicionado ao carrinho!</span>
        </div>
      )}

      <Footer />
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { NavbarGlassFixa } from "@/components/NavbarGlassFixa";
import { Footer } from "@/components/Footer";
import { useCart } from "@/lib/cart.store";
import { formatCurrency } from "@/lib/shipping";
import { ShoppingBag, ArrowLeft, Trash2, Plus, Minus, Truck, Sparkles, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/shop/carrinho")({
  component: CartPage,
  head: () => ({
    meta: [{ title: "Seu Carrinho — Loja DezPila" }],
  }),
});

function CartPage() {
  const { items, summary, updateCartQuantity, removeFromCart, clearCart } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-[#050507] text-foreground font-body">
      <header className="relative z-50">
        <NavbarGlassFixa />
      </header>

      <main className="flex-1 pt-28 pb-20 px-4 sm:px-6 lg:px-12 max-w-[1200px] mx-auto w-full">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-xs font-code text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Continuar Comprando</span>
        </Link>

        <h1 className="text-2xl sm:text-4xl font-bold font-heading uppercase text-white mb-8">
          Seu Carrinho de Compras
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-surface/30 border border-white/5 rounded-3xl backdrop-blur-md flex flex-col items-center gap-4">
            <ShoppingBag className="h-16 w-16 text-slate-600" />
            <h2 className="text-xl font-heading font-bold text-white uppercase">Seu carrinho está vazio</h2>
            <p className="text-xs font-code text-slate-400 max-w-md">
              Explore nossos produtos de acessórios para TV e cinema em casa para adicionar itens.
            </p>
            <Link to="/shop" className="btn-brand mt-2">
              Ver Catálogo de Produtos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Lista de Itens do Carrinho */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              {/* Barra de Progresso de Frete Grátis */}
              <div className="p-4 rounded-2xl bg-surface/40 border border-white/10 backdrop-blur-md">
                <div className="flex items-center justify-between text-xs font-code mb-2">
                  <span>
                    {summary.hasFreeShipping ? (
                      <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                        <Sparkles className="h-4 w-4 text-emerald-400" /> Parabéns! Seu frete é GRÁTIS!
                      </span>
                    ) : (
                      <span className="text-amber-300">
                        Faltam <strong>{formatCurrency(summary.freeShippingRemaining)}</strong> para você ter FRETE GRÁTIS!
                      </span>
                    )}
                  </span>
                  <span className="text-slate-400 font-bold">{summary.subtotal.toFixed(2)} / R$ 150,00</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-black/60 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 via-emerald-400 to-emerald-500 transition-all duration-500"
                    style={{
                      width: `${Math.min(100, (summary.subtotal / 150) * 100)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Cards de Itens */}
              {items.map(({ product, quantidade }) => (
                <div
                  key={product.id}
                  className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-6 bg-surface/30 border border-white/10 rounded-2xl backdrop-blur-md"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img
                      src={product.imagem_url}
                      alt={product.nome}
                      className="size-20 rounded-xl object-cover bg-black border border-white/10 shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-code text-slate-400 uppercase tracking-widest block">
                        {product.categoria === "acessorios_tv" ? "TV & Streaming" : "Night de Filme"}
                      </span>
                      <h3 className="font-heading font-bold text-sm text-white">{product.nome}</h3>
                      <span className="text-xs font-code text-slate-400 block mt-1">
                        {formatCurrency(product.preco)} un.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-white/5">
                    {/* Controles de Quantidade */}
                    <div className="flex items-center gap-2 bg-black/60 border border-white/10 rounded-xl p-1">
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(product.id, quantidade - 1)}
                        className="p-1.5 hover:bg-white/10 text-white rounded-lg transition-colors"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="font-code text-xs font-bold text-white px-2">{quantidade}</span>
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(product.id, quantidade + 1)}
                        className="p-1.5 hover:bg-white/10 text-white rounded-lg transition-colors"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {/* Subtotal do Item */}
                    <span className="font-code font-bold text-sm text-white">
                      {formatCurrency(product.preco * quantidade)}
                    </span>

                    {/* Remover */}
                    <button
                      type="button"
                      onClick={() => removeFromCart(product.id)}
                      className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
                      title="Remover item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-xs font-code text-slate-400 hover:text-rose-400 transition-colors"
                >
                  Limpar Carrinho
                </button>
              </div>
            </div>

            {/* Resumo Financeiro e Checkout */}
            <div className="lg:col-span-4 p-6 bg-surface/40 border border-white/10 rounded-3xl backdrop-blur-xl flex flex-col gap-6 sticky top-28">
              <h2 className="text-lg font-heading font-bold uppercase text-white border-b border-white/10 pb-4">
                Resumo do Pedido
              </h2>

              <div className="flex flex-col gap-3 font-code text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span>Subtotal</span>
                  <span>{formatCurrency(summary.subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Frete</span>
                  {summary.hasFreeShipping ? (
                    <span className="text-emerald-400 font-bold">GRÁTIS</span>
                  ) : (
                    <span>{formatCurrency(summary.frete)}</span>
                  )}
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-sm text-white font-bold">
                  <span>Total</span>
                  <span className="text-xl font-extrabold text-white">{formatCurrency(summary.total)}</span>
                </div>
              </div>

              <div className="p-3 bg-brand/10 border border-brand/30 rounded-xl text-[11px] font-code text-slate-300 flex items-center gap-2">
                <Truck className="h-4 w-4 text-brand shrink-0" />
                <span>Pagamento via Pix com liberação e envio rápido.</span>
              </div>

              <Link
                to="/shop/checkout"
                className="w-full flex items-center justify-center gap-2 bg-[#970202] hover:bg-[#b80303] text-white py-4 rounded-xl font-heading font-bold text-xs uppercase tracking-wider shadow-[0_4px_24px_rgba(151,2,2,0.8)] transition-all"
              >
                <span>Avançar para o Checkout</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

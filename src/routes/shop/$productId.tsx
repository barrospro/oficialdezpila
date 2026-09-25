import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { NavbarGlassFixa } from "@/components/NavbarGlassFixa";
import { Footer } from "@/components/Footer";
import { getProductByIdFromDb } from "@/lib/supabase";
import { Product } from "@/data/shop-products";
import { useCart } from "@/lib/cart.store";
import { formatCurrency, FIXED_SHIPPING_FEE, FREE_SHIPPING_THRESHOLD } from "@/lib/shipping";
import { ShoppingBag, ArrowLeft, Truck, ShieldCheck, Check, Plus, Minus, Zap } from "lucide-react";

export const Route = createFileRoute("/shop/$productId")({
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { productId } = Route.useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantidade, setQuantidade] = useState(1);
  const [added, setAdded] = useState(false);

  const { addToCart } = useCart();

  useEffect(() => {
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
    return (
      <div className="min-h-screen bg-[#050507] text-white flex items-center justify-center font-code">
        Carregando detalhes do produto...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#050507] text-white flex flex-col items-center justify-center font-body gap-4">
        <h1 className="text-2xl font-bold">Produto não encontrado</h1>
        <Link to="/shop" className="btn-brand">
          Voltar para a Loja
        </Link>
      </div>
    );
  }

  const handleAdd = () => {
    addToCart(product, quantidade);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const isFreeShippingProduct = product.preco >= FREE_SHIPPING_THRESHOLD;

  return (
    <div className="min-h-screen flex flex-col bg-[#050507] text-foreground font-body">
      <header className="relative z-50">
        <NavbarGlassFixa />
      </header>

      <main className="flex-1 pt-28 pb-20 px-4 sm:px-6 lg:px-12 max-w-[1200px] mx-auto w-full">
        {/* Breadcrumb e Voltar */}
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-xs font-code text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar ao Catálogo</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start bg-surface/40 border border-white/10 p-6 sm:p-10 rounded-3xl backdrop-blur-xl">
          {/* Imagem em Destaque */}
          <div className="lg:col-span-6 relative bg-black rounded-2xl overflow-hidden aspect-4/3 border border-white/10">
            <img
              src={product.imagem_url}
              alt={product.nome}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-[#970202] text-white text-xs font-bold font-code px-3 py-1 rounded-lg uppercase tracking-wider shadow-[0_0_15px_rgba(151,2,2,0.9)]">
                {product.badge}
              </span>
            )}
          </div>

          {/* Informações do Produto */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div>
              <span className="text-xs font-code text-slate-400 uppercase tracking-widest block mb-2">
                {product.categoria === "acessorios_tv" ? "TV & Streaming" : "Night de Filme"}
              </span>
              <h1 className="text-2xl sm:text-4xl font-bold font-heading uppercase text-white leading-tight">
                {product.nome}
              </h1>
            </div>

            <div className="flex items-baseline gap-3 border-b border-white/10 pb-6">
              <span className="text-3xl sm:text-4xl font-extrabold font-code text-white">
                {formatCurrency(product.preco)}
              </span>
              <span className="text-xs font-code text-slate-400">em até 3x sem juros via Pix</span>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-body">
              {product.descricao}
            </p>

            {/* Informações de Frete e Entrega */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col gap-2 font-code text-xs">
              <div className="flex items-center gap-2 text-slate-200">
                <Truck className="h-4 w-4 text-emerald-400" />
                {isFreeShippingProduct ? (
                  <span className="text-emerald-400 font-bold">🚚 Este produto possui FRETE GRÁTIS!</span>
                ) : (
                  <span>
                    🚚 Frete fixo de <strong>R$ 9,90</strong> para todo o Brasil (Grátis em compras acima de R$ 150)
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <ShieldCheck className="h-4 w-4 text-brand" />
                <span>Garantia de Entrega DezPila • Produto 100% Novo com Nota</span>
              </div>
            </div>

            {/* Seletor de Quantidade e Ação */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <div className="flex items-center gap-3 bg-black/60 border border-white/10 rounded-xl p-1.5 w-full sm:w-auto justify-between">
                <button
                  type="button"
                  onClick={() => setQuantidade((q) => Math.max(1, q - 1))}
                  className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="font-code text-sm font-bold text-white px-4">{quantidade}</span>
                <button
                  type="button"
                  onClick={() => setQuantidade((q) => q + 1)}
                  className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="w-full flex-1 flex items-center justify-center gap-2 bg-[#970202] hover:bg-[#b80303] text-white py-4 px-6 rounded-xl font-heading font-bold text-sm uppercase tracking-wider shadow-[0_4px_24px_rgba(151,2,2,0.8)] transition-all cursor-pointer"
              >
                {added ? (
                  <>
                    <Check className="h-5 w-5" />
                    <span>Adicionado ao Carrinho!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-5 w-5" />
                    <span>Adicionar ao Carrinho</span>
                  </>
                )}
              </button>
            </div>

            <div className="mt-4 text-center">
              <Link
                to="/shop/carrinho"
                className="text-xs font-code text-brand hover:underline inline-flex items-center gap-1"
              >
                Ir para o Carrinho de Compras →
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

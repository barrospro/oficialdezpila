import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { NavbarGlassFixa } from "@/components/NavbarGlassFixa";
import { Footer } from "@/components/Footer";
import { getShopOrderStatusFn } from "@/lib/shop-checkout.functions";
import { formatCurrency } from "@/lib/shipping";
import { CheckCircle2, Clock, Truck, ShoppingBag, ArrowLeft, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/shop/pedido/$orderId")({
  component: OrderStatusPage,
});

function OrderStatusPage() {
  const { orderId } = Route.useParams();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<Record<string, any> | null>(null);
  const [status, setStatus] = useState("pendente");

  useEffect(() => {
    let mounted = true;
    getShopOrderStatusFn({ data: { orderId } }).then((res) => {
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
    return (
      <div className="min-h-screen bg-[#050507] text-white flex items-center justify-center font-code">
        Buscando dados do pedido...
      </div>
    );
  }

  const isPaid = status === "pago" || status === "paid" || status === "approved";

  return (
    <div className="min-h-screen flex flex-col bg-[#050507] text-foreground font-body">
      <header className="relative z-50">
        <NavbarGlassFixa />
      </header>

      <main className="flex-1 pt-28 pb-20 px-4 sm:px-6 lg:px-12 max-w-[800px] mx-auto w-full">
        <div className="bg-surface/40 border border-white/10 p-6 sm:p-10 rounded-3xl backdrop-blur-xl text-center flex flex-col items-center gap-6">
          {isPaid ? (
            <div className="size-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.4)]">
              <CheckCircle2 className="h-10 w-10" />
            </div>
          ) : (
            <div className="size-20 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-[0_0_40px_rgba(245,158,11,0.4)]">
              <Clock className="h-10 w-10 animate-spin" />
            </div>
          )}

          <div>
            <span className="text-xs font-code text-slate-400 uppercase tracking-widest block mb-1">
              Pedido #{orderId.slice(-6).toUpperCase()}
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold font-heading uppercase text-white">
              {isPaid ? "Pagamento Confirmado!" : "Aguardando Confirmação do Pix"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-code mt-2 max-w-md mx-auto">
              {isPaid
                ? "Seu pedido já foi aprovado e está em separação para envio. Enviaremos o código de rastreio no seu WhatsApp!"
                : "Assim que o Pix for compensado, o status do pedido será atualizado automaticamente nesta página."}
            </p>
          </div>

          {/* Dados do Pedido */}
          {order && (
            <div className="w-full text-left bg-black/50 border border-white/10 rounded-2xl p-5 flex flex-col gap-4 font-code text-xs">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-slate-400">Cliente:</span>
                <span className="text-white font-bold">{order.cliente_nome}</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-slate-400">WhatsApp:</span>
                <span className="text-white font-bold">{order.cliente_whatsapp}</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-slate-400">Endereço de Entrega:</span>
                <span className="text-white font-bold text-right">
                  {order.endereco_rua}, {order.endereco_numero} - {order.endereco_bairro} ({order.endereco_cidade}/{order.endereco_uf})
                </span>
              </div>
              <div className="flex items-center justify-between pt-1 font-bold text-sm">
                <span className="text-slate-300">Total Pago:</span>
                <span className="text-white text-base">{formatCurrency(order.total || 0)}</span>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full pt-4">
            <a
              href={`https://wa.me/5511999999999?text=${encodeURIComponent(
                `Olá, gostaria de acompanhar o status do meu pedido #${orderId} na Loja DezPila!`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 py-3.5 px-4 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Suporte WhatsApp</span>
            </a>

            <Link
              to="/shop"
              className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3.5 px-4 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition-all"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Voltar para a Loja</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

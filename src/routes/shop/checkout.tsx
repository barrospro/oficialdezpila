import { useState, useEffect } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { NavbarGlassFixa } from "@/components/NavbarGlassFixa";
import { Footer } from "@/components/Footer";
import { useCart } from "@/lib/cart.store";
import { formatCurrency } from "@/lib/shipping";
import { createShopOrderFn, getShopOrderStatusFn } from "@/lib/shop-checkout.functions";
import { QRCodeSVG } from "qrcode.react";
import { ShieldCheck, Truck, Lock, ArrowLeft, Copy, Check, Clock, Loader2, Sparkles } from "lucide-react";

export const Route = createFileRoute("/shop/checkout")({
  component: CheckoutPage,
  head: () => ({
    meta: [{ title: "Checkout Seguro — Loja DezPila" }],
  }),
});

function CheckoutPage() {
  const navigate = useNavigate();
  const { items, summary, clearCart } = useCart();

  // Form State (Guest Checkout)
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("SP");
  const [cep, setCep] = useState("");

  // Payment State
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [pixData, setPixData] = useState<{
    orderId: string;
    pixId?: string;
    qrCode: string;
    qrCodeBase64?: string | null;
    total: number;
  } | null>(null);

  const [copied, setCopied] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(900); // 15min
  const [paymentStatus, setPaymentStatus] = useState("pendente");

  // Timer Countdown para o Pix
  useEffect(() => {
    if (!pixData) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [pixData]);

  // Polling de Status do Pagamento Pix
  useEffect(() => {
    if (!pixData || paymentStatus === "pago") return;

    const pollInterval = setInterval(async () => {
      try {
        const res = await getShopOrderStatusFn({
          data: {
            orderId: pixData.orderId,
            pixId: pixData.pixId,
          },
        });

        if (res.paid || res.status === "pago") {
          setPaymentStatus("pago");
          clearCart();
          clearInterval(pollInterval);
          setTimeout(() => {
            navigate({ to: "/shop/pedido/$orderId", params: { orderId: pixData.orderId } });
          }, 1500);
        }
      } catch {
        // Ignora erros no polling
      }
    }, 3500);

    return () => clearInterval(pollInterval);
  }, [pixData, paymentStatus, navigate, clearCart]);

  const handleCreateOrder = async (e: React.FormEvent) => {
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
            quantidade: it.quantidade,
          })),
        },
      });

      if (!res.ok || !res.qrCode || !res.orderId) {
        throw new Error(res.error || "Erro ao gerar código Pix para o pedido.");
      }

      setPixData({
        orderId: res.orderId,
        pixId: res.pixId,
        qrCode: res.qrCode,
        qrCodeBase64: res.qrCodeBase64,
        total: res.total || summary.total,
      });
    } catch (err: unknown) {
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
    setTimeout(() => setCopied(false), 3000);
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050507] text-foreground font-body">
      <header className="relative z-50">
        <NavbarGlassFixa />
      </header>

      <main className="flex-1 pt-28 pb-20 px-4 sm:px-6 lg:px-12 max-w-[1200px] mx-auto w-full">
        <Link
          to="/shop/carrinho"
          className="inline-flex items-center gap-2 text-xs font-code text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar ao Carrinho</span>
        </Link>

        <h1 className="text-2xl sm:text-4xl font-bold font-heading uppercase text-white mb-8">
          Checkout do Pedido
        </h1>

        {items.length === 0 && !pixData ? (
          <div className="text-center py-20 bg-surface/30 border border-white/5 rounded-3xl backdrop-blur-md">
            <p className="text-slate-400 font-code text-sm mb-4">Seu carrinho está vazio.</p>
            <Link to="/shop" className="btn-brand">
              Ir para a Loja
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Formulário de Entrega (Guest Checkout) */}
            <div className="lg:col-span-7 bg-surface/40 border border-white/10 p-6 sm:p-8 rounded-3xl backdrop-blur-xl">
              {!pixData ? (
                <form onSubmit={handleCreateOrder} className="flex flex-col gap-6">
                  <div>
                    <h2 className="text-lg font-heading font-bold uppercase text-white mb-1 flex items-center gap-2">
                      <Lock className="h-4 w-4 text-emerald-400" /> 1. Dados de Contato
                    </h2>
                    <p className="text-xs font-code text-slate-400">
                      Sem necessidade de cadastro prévio.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-code text-slate-300 mb-1">
                          Nome Completo *
                        </label>
                        <input
                          type="text"
                          required
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                          placeholder="Digite seu nome completo"
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-code text-white focus:outline-none focus:border-brand"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-code text-slate-300 mb-1">
                          E-mail *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="seuemail@exemplo.com"
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-code text-white focus:outline-none focus:border-brand"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-code text-slate-300 mb-1">
                          WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value)}
                          placeholder="(11) 99999-9999"
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-code text-white focus:outline-none focus:border-brand"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-6">
                    <h2 className="text-lg font-heading font-bold uppercase text-white mb-1 flex items-center gap-2">
                      <Truck className="h-4 w-4 text-brand" /> 2. Endereço de Entrega
                    </h2>
                    <p className="text-xs font-code text-slate-400">
                      Entregamos para todo o Brasil via Correios/Transportadora.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                      <div>
                        <label className="block text-xs font-code text-slate-300 mb-1">
                          CEP *
                        </label>
                        <input
                          type="text"
                          required
                          value={cep}
                          onChange={(e) => setCep(e.target.value)}
                          placeholder="00000-000"
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-code text-white focus:outline-none focus:border-brand"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-code text-slate-300 mb-1">
                          Rua / Avenida *
                        </label>
                        <input
                          type="text"
                          required
                          value={rua}
                          onChange={(e) => setRua(e.target.value)}
                          placeholder="Nome da sua rua"
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-code text-white focus:outline-none focus:border-brand"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-code text-slate-300 mb-1">
                          Número *
                        </label>
                        <input
                          type="text"
                          required
                          value={numero}
                          onChange={(e) => setNumero(e.target.value)}
                          placeholder="123"
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-code text-white focus:outline-none focus:border-brand"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-code text-slate-300 mb-1">
                          Bairro *
                        </label>
                        <input
                          type="text"
                          required
                          value={bairro}
                          onChange={(e) => setBairro(e.target.value)}
                          placeholder="Seu bairro"
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-code text-white focus:outline-none focus:border-brand"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-code text-slate-300 mb-1">
                          Cidade / UF *
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            required
                            value={cidade}
                            onChange={(e) => setCidade(e.target.value)}
                            placeholder="Cidade"
                            className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-xs font-code text-white focus:outline-none focus:border-brand"
                          />
                          <input
                            type="text"
                            required
                            maxLength={2}
                            value={uf}
                            onChange={(e) => setUf(e.target.value.toUpperCase())}
                            placeholder="UF"
                            className="w-16 bg-black/60 border border-white/10 rounded-xl px-2 py-2.5 text-xs font-code text-white text-center focus:outline-none focus:border-brand"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 font-code text-xs">
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-[#970202] hover:bg-[#b80303] text-white py-4 rounded-xl font-heading font-bold text-sm uppercase tracking-wider shadow-[0_4px_24px_rgba(151,2,2,0.8)] transition-all cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Gerando Pix do Pedido...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5 text-amber-400" />
                        <span>Gerar Pix de {formatCurrency(summary.total)}</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* EXIBIÇÃO DO PIX DE PAGAMENTO DO PEDIDO */
                <div className="flex flex-col items-center text-center gap-6 animate-in fade-in">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full font-code text-xs font-bold text-emerald-400">
                    <Clock className="h-4 w-4 animate-spin" />
                    <span>Aguardando Pagamento via Pix...</span>
                  </div>

                  <div>
                    <h2 className="text-xl font-heading font-bold uppercase text-white">
                      Escaneie ou Copie o Código Pix
                    </h2>
                    <p className="text-xs font-code text-slate-400 mt-1">
                      Pedido <strong>#{pixData.orderId.slice(-6).toUpperCase()}</strong> • Total:{" "}
                      <strong className="text-white">{formatCurrency(pixData.total)}</strong>
                    </p>
                  </div>

                  {/* QR Code */}
                  <div className="p-4 bg-white rounded-2xl shadow-2xl border border-white/20">
                    <QRCodeSVG value={pixData.qrCode} size={200} level="M" />
                  </div>

                  {/* Botão Copia e Cola */}
                  <div className="w-full flex flex-col gap-3">
                    <button
                      type="button"
                      onClick={copyPixCode}
                      className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 py-3.5 px-4 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="h-5 w-5" />
                          <span>Código Pix Copiado com Sucesso!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-5 w-5" />
                          <span>Copiar Código Pix (Copia e Cola)</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-between text-xs font-code text-slate-400 px-2">
                      <span>Expira em:</span>
                      <span className="font-bold text-amber-400">{formatTimer(timerSeconds)}</span>
                    </div>
                  </div>

                  <p className="text-[11px] font-code text-slate-400 bg-white/5 p-3 rounded-xl border border-white/5">
                    💡 Assim que você pagar no app do seu banco, a confirmação ocorre automaticamente em poucos segundos!
                  </p>
                </div>
              )}
            </div>

            {/* Resumo Lateral do Pedido */}
            <div className="lg:col-span-5 p-6 bg-surface/40 border border-white/10 rounded-3xl backdrop-blur-xl flex flex-col gap-6">
              <h2 className="text-lg font-heading font-bold uppercase text-white border-b border-white/10 pb-4">
                Itens do Pedido
              </h2>

              <div className="flex flex-col gap-3 max-h-80 overflow-y-auto pr-1">
                {items.map(({ product, quantidade }) => (
                  <div key={product.id} className="flex items-center justify-between gap-3 text-xs font-code">
                    <div className="flex items-center gap-2 min-w-0">
                      <img
                        src={product.imagem_url}
                        alt={product.nome}
                        className="size-10 rounded-lg object-cover bg-black border border-white/10 shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="text-white font-bold block truncate">{product.nome}</span>
                        <span className="text-slate-400 text-[10px]">
                          {quantidade}x {formatCurrency(product.preco)}
                        </span>
                      </div>
                    </div>
                    <span className="text-white font-bold shrink-0">
                      {formatCurrency(product.preco * quantidade)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4 flex flex-col gap-2 font-code text-xs">
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
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-base font-bold text-white">
                  <span>Total</span>
                  <span className="text-xl font-extrabold text-white">{formatCurrency(summary.total)}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-2 text-[11px] font-code text-slate-400">
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Compra protegida via Pix Nitro Pagamentos.</span>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

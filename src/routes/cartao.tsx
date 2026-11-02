import { useState, useMemo, useEffect } from "react";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { NavbarGlassFixa } from "@/components/NavbarGlassFixa";
import { Footer } from "@/components/Footer";
import { createNitroCard } from "@/lib/nitro.functions";
import { validateAndApplyCoupon, Coupon } from "@/lib/coupons";
import {
  CreditCard,
  Lock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Check,
  Zap,
  Tv,
  ArrowRight,
  Loader2,
  RefreshCw,
  QrCode,
  Tag,
  Clock,
  Send,
  Plus,
  Minus,
  Calendar,
} from "lucide-react";

interface PlanOption {
  id: string;
  nome: string;
  precoNum: number;
  periodo: string;
  telas: string;
  destaque?: boolean;
  popular?: boolean;
  badge?: string;
  badgeColor?: string;
  economia?: string;
}

const PLANOS_DISPONIVEIS: PlanOption[] = [
  {
    id: "DIARIO",
    nome: "Acesso por Dia",
    precoNum: 1.0,
    periodo: "/dia",
    telas: "1 Conexão Simultânea",
    badge: "⚡ 1 REAL POR DIA",
    badgeColor: "bg-emerald-500 text-black shadow-[0_0_12px_rgba(16,185,129,0.5)]",
    economia: "Escolha quantos dias quiser assistir",
  },
  {
    id: "MENSAL",
    nome: "Starter Mensal",
    precoNum: 10.0,
    periodo: "/mês",
    telas: "1 Conexão Simultânea",
  },
  {
    id: "TRIMESTRAL",
    nome: "Plus Trimestral",
    precoNum: 24.9,
    periodo: "/trim",
    telas: "2 Conexões Simultâneas",
    popular: true,
  },
  {
    id: "SEMESTRAL",
    nome: "Pro Semestral",
    precoNum: 47.9,
    periodo: "/sem",
    telas: "3 Conexões Simultâneas",
    economia: "Economia de 60%",
  },
  {
    id: "ANUAL",
    nome: "VIP Anual",
    precoNum: 73.9,
    periodo: "/ano",
    telas: "4 Conexões Simultâneas",
    destaque: true,
    economia: "Melhor Custo (R$ 0,20/dia)",
  },
];

export const Route = createFileRoute("/cartao")({
  component: CartaoCheckoutPage,
  head: () => ({
    meta: [
      { title: "Pagamento com Cartão de Crédito — DezPila Streaming 4K" },
      {
        name: "description",
        content:
          "Assine o DezPila no Cartão de Crédito em até 12x via Gateway Nitro Pagamentos. Aprovação imediata e envio instantâneo do acesso.",
      },
    ],
  }),
});

function detectCardBrand(num: string): "visa" | "mastercard" | "elo" | "amex" | "hipercard" | "default" {
  const clean = num.replace(/\D/g, "");
  if (/^4/.test(clean)) return "visa";
  if (/^(5[1-5]|2[2-7])/.test(clean)) return "mastercard";
  if (/^(4011|4312|4389|4514|4576|5041|5066|5090|6277|6362|6363|6500|6504|6505|6509|6516|6550)/.test(clean))
    return "elo";
  if (/^(34|37)/.test(clean)) return "amex";
  if (/^(606282|3841)/.test(clean)) return "hipercard";
  return "default";
}

function formatCardNumber(val: string): string {
  const clean = val.replace(/\D/g, "").slice(0, 16);
  return clean.replace(/(\d{4})/g, "$1 ").trim();
}

function formatCpf(val: string): string {
  const clean = val.replace(/\D/g, "").slice(0, 11);
  return clean
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d{1,2})$/, ".$1-$2");
}

function formatPhone(val: string): string {
  const clean = val.replace(/\D/g, "").slice(0, 11);
  if (clean.length <= 10) {
    return clean.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
  }
  return clean.replace(/^(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
}

function formatExpiry(val: string): string {
  const clean = val.replace(/\D/g, "").slice(0, 4);
  if (clean.length >= 3) {
    return `${clean.slice(0, 2)}/${clean.slice(2, 4)}`;
  }
  return clean;
}

function CartaoCheckoutPage() {
  const [selectedPlanId, setSelectedPlanId] = useState<string>("DIARIO");
  const [diarioDias, setDiarioDias] = useState<number>(3); // 3 dias por padrão (R$ 3,00)

  // Form Fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [holderName, setHolderName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [installments, setInstallments] = useState<number>(1);

  // Cupom
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponFeedback, setCouponFeedback] = useState<{ msg: string; type: "ok" | "err" } | null>(null);

  // Status de Envio
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    id: string;
    amount: number;
    planName: string;
    cardBrand?: string;
    installments: number;
  } | null>(null);

  // Detecta parâmetros de URL na inicialização (ex: ?plano=DIARIO&dias=7)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const planParam = params.get("plano") || params.get("plan");
      if (planParam) {
        const found = PLANOS_DISPONIVEIS.find(
          (p) => p.id.toUpperCase() === planParam.toUpperCase()
        );
        if (found) setSelectedPlanId(found.id);
      }
      const diasParam = params.get("dias") || params.get("days");
      if (diasParam) {
        const d = parseInt(diasParam, 10);
        if (!isNaN(d) && d >= 1) {
          setDiarioDias(Math.min(365, d));
          setSelectedPlanId("DIARIO");
        }
      }
      const cupomParam = params.get("cupom") || params.get("coupon");
      if (cupomParam) {
        setCouponCode(cupomParam.toUpperCase());
      }
    }
  }, []);

  const activePlan = useMemo(() => {
    return PLANOS_DISPONIVEIS.find((p) => p.id === selectedPlanId) || PLANOS_DISPONIVEIS[0];
  }, [selectedPlanId]);

  const rawBasePrice = useMemo(() => {
    if (selectedPlanId === "DIARIO") {
      return Math.max(1, Math.floor(diarioDias)) * 1.0;
    }
    return activePlan.precoNum;
  }, [selectedPlanId, diarioDias, activePlan]);

  const planDisplayName = useMemo(() => {
    if (selectedPlanId === "DIARIO") {
      return `Acesso Diário (${diarioDias} ${diarioDias === 1 ? "dia" : "dias"})`;
    }
    return activePlan.nome;
  }, [selectedPlanId, diarioDias, activePlan]);

  // Aplicação do Cupom
  const priceCalculation = useMemo(() => {
    if (!appliedCoupon) {
      return {
        basePrice: rawBasePrice,
        finalPrice: rawBasePrice,
        discount: 0,
      };
    }
    const val = validateAndApplyCoupon(appliedCoupon.code, activePlan.id, rawBasePrice);
    return {
      basePrice: rawBasePrice,
      finalPrice: val.valid ? val.finalPrice : rawBasePrice,
      discount: val.valid ? val.discountAmount : 0,
    };
  }, [rawBasePrice, activePlan, appliedCoupon]);

  const handleApplyCoupon = () => {
    setCouponFeedback(null);
    if (!couponCode.trim()) return;
    const res = validateAndApplyCoupon(couponCode, activePlan.id, rawBasePrice);
    if (res.valid && res.coupon) {
      setAppliedCoupon(res.coupon);
      setCouponFeedback({ msg: `Cupom ${res.coupon.code} aplicado com sucesso!`, type: "ok" });
    } else {
      setAppliedCoupon(null);
      setCouponFeedback({ msg: res.error || "Cupom inválido para este plano.", type: "err" });
    }
  };

  const cardBrand = useMemo(() => detectCardBrand(cardNumber), [cardNumber]);

  // Opções de parcelas (1x até 12x)
  const installmentOptions = useMemo(() => {
    const list = [];
    const total = priceCalculation.finalPrice;
    if (total < 15) {
      return [
        {
          num: 1,
          label: `1x de R$ ${total.toFixed(2).replace(".", ",")} (à vista)`,
        },
      ];
    }
    for (let i = 1; i <= 12; i++) {
      const parcelValue = (total / i).toFixed(2).replace(".", ",");
      list.push({
        num: i,
        label: i === 1 ? `1x de R$ ${total.toFixed(2).replace(".", ",")} (à vista)` : `${i}x de R$ ${parcelValue}`,
      });
    }
    return list;
  }, [priceCalculation.finalPrice]);

  useEffect(() => {
    if (priceCalculation.finalPrice < 15 && installments > 1) {
      setInstallments(1);
    }
  }, [priceCalculation.finalPrice, installments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validações locais
    const cleanCard = cardNumber.replace(/\D/g, "");
    if (cleanCard.length < 13) {
      setErrorMessage("Por favor, digite um número de cartão de crédito válido (13 a 16 dígitos).");
      return;
    }

    const cleanCpf = cpf.replace(/\D/g, "");
    if (cleanCpf.length < 11) {
      setErrorMessage("Por favor, informe um CPF válido para emissão da assinatura.");
      return;
    }

    const [month, year] = expiry.split("/");
    if (!month || !year || month.length !== 2 || year.length !== 2) {
      setErrorMessage("Por favor, informe a validade do cartão no formato MM/AA.");
      return;
    }

    const cleanCvv = cvv.replace(/\D/g, "");
    if (cleanCvv.length < 3) {
      setErrorMessage("Por favor, informe o código de segurança (CVV) do cartão.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await createNitroCard({
        data: {
          amountNum: priceCalculation.finalPrice,
          planName: planDisplayName,
          planId: activePlan.id,
          name: name.trim(),
          email: email.trim(),
          phone: phone.replace(/\D/g, ""),
          document: cleanCpf,
          cardNumber: cleanCard,
          holderName: holderName.trim().toUpperCase(),
          expirationMonth: month,
          expirationYear: year,
          cvv: cleanCvv,
          installments,
          sourceUrl: "https://oficialdezpila.vercel.app/cartao",
        },
      });

      if (res && res.ok && res.paid) {
        setSuccessData({
          id: res.id,
          amount: priceCalculation.finalPrice,
          planName: planDisplayName,
          cardBrand: res.cardBrand || cardBrand,
          installments,
        });
      } else {
        const msg = res && !res.ok ? res.error : res && "message" in res && res.message ? res.message : "Pagamento recusado pela operadora do cartão.";
        setErrorMessage(msg);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro de conexão ao processar transação no cartão.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050507] text-foreground font-body selection:bg-brand selection:text-white">
      <header className="relative z-50">
        <NavbarGlassFixa />
      </header>

      <main className="flex-1 pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        {/* Banner de Segurança & Gateway */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-brand/20 via-surface to-emerald-500/10 border border-brand/30 p-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-brand/20 text-brand border border-brand/30">
              <ShieldCheck className="size-5" />
            </div>
            <div>
              <p className="text-xs uppercase font-bold tracking-wider text-brand font-code">
                Ambiente Criptografado SSL 256-Bit
              </p>
              <h2 className="text-sm sm:text-base font-semibold text-white">
                Checkout Oficial com Cartão de Crédito — Gateway Nitro
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-code">
            <Lock className="size-3.5 text-emerald-400" />
            <span>Processamento Seguro PCI DSS</span>
          </div>
        </div>

        {/* TELA DE SUCESSO */}
        {successData ? (
          <div className="max-w-xl mx-auto rounded-3xl border border-emerald-500/30 bg-emerald-950/20 p-8 sm:p-10 backdrop-blur-xl text-center shadow-[0_0_50px_rgba(16,185,129,0.15)] animate-in fade-in duration-500">
            <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400">
              <CheckCircle2 className="size-10" />
            </div>

            <span className="inline-block rounded-full bg-emerald-500/10 border border-emerald-500/30 px-4 py-1 text-xs font-bold uppercase tracking-wider text-emerald-400 font-code mb-3">
              Pagamento Aprovado com Sucesso!
            </span>

            <h1 className="text-2xl sm:text-3xl font-heading font-black text-white mb-2">
              Assinatura Ativada!
            </h1>

            <p className="text-sm text-slate-300 mb-6">
              Sua cobrança de <strong>R$ {successData.amount.toFixed(2).replace(".", ",")}</strong> no plano{" "}
              <strong>{successData.planName}</strong> foi confirmada pelo Gateway Nitro.
            </p>

            <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-left text-xs space-y-2 mb-6 font-code text-slate-300">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-muted-foreground">ID da Transação:</span>
                <span className="font-semibold text-white truncate max-w-[200px]">{successData.id}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-muted-foreground">Forma de Pagamento:</span>
                <span className="font-semibold text-white uppercase">
                  Cartão ({successData.cardBrand || "Crédito"}) • {successData.installments}x
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Envio dos Acessos:</span>
                <span className="font-semibold text-emerald-400">Em até 2 minutos via WhatsApp & E-mail</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`https://wa.me/5511999999999?text=${encodeURIComponent(`Olá! Acabei de assinar o plano ${successData.planName} no cartão. ID do pedido: ${successData.id}`)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-6 py-3.5 text-sm font-bold text-white transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              >
                <Send className="size-4" />
                Receber Acesso no WhatsApp
              </a>
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-6 py-3.5 text-sm font-bold text-white transition-all"
              >
                Voltar à Página Inicial
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* COLUNA ESQUERDA: SELEÇÃO DE PLANO & PREVIEW DO CARTÃO */}
            <div className="lg:col-span-5 space-y-6">
              {/* Seleção de Plano */}
              <div className="rounded-3xl border border-white/10 bg-surface/50 p-6 backdrop-blur-xl">
                <div className="flex items-center gap-2 mb-4">
                  <Tv className="size-4 text-brand" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white font-code">
                    1. Escolha o seu Plano
                  </h3>
                </div>

                <div className="space-y-3">
                  {PLANOS_DISPONIVEIS.map((plano) => {
                    const isSelected = plano.id === selectedPlanId;
                    const isDiario = plano.id === "DIARIO";

                    return (
                      <div
                        key={plano.id}
                        onClick={() => setSelectedPlanId(plano.id)}
                        className={`relative cursor-pointer rounded-2xl border p-4 transition-all ${
                          isSelected
                            ? "border-brand bg-brand/10 shadow-[0_0_25px_rgba(151,2,2,0.35)]"
                            : "border-white/5 bg-black/40 hover:border-white/20 hover:bg-white/5"
                        }`}
                      >
                        {plano.badge && (
                          <span
                            className={`absolute -top-2.5 right-4 rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${
                              plano.badgeColor || "bg-brand text-white"
                            }`}
                          >
                            {plano.badge}
                          </span>
                        )}
                        {plano.popular && !plano.badge && (
                          <span className="absolute -top-2.5 right-4 rounded-full bg-brand px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-white">
                            Mais Vendido
                          </span>
                        )}
                        {plano.destaque && !plano.badge && (
                          <span className="absolute -top-2.5 right-4 rounded-full bg-amber-500 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-black">
                            Maior Economia
                          </span>
                        )}

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-heading font-bold text-white text-base">
                              {isDiario
                                ? isSelected
                                  ? `Acesso Diário (${diarioDias} ${diarioDias === 1 ? "dia" : "dias"})`
                                  : "Acesso por Dia (R$ 1/dia)"
                                : plano.nome}
                            </p>
                            <p className="text-xs text-muted-foreground">{plano.telas}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-heading font-black text-white text-lg">
                              R${" "}
                              {isDiario
                                ? (diarioDias * 1.0).toFixed(2).replace(".", ",")
                                : plano.precoNum.toFixed(2).replace(".", ",")}
                              <span className="text-xs font-normal text-muted-foreground">
                                {isDiario ? ` (${diarioDias}d)` : plano.periodo}
                              </span>
                            </p>
                            {plano.economia && (
                              <p className="text-[11px] font-semibold text-emerald-400 font-code">
                                {plano.economia}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* CONTROLE INTERATIVO DE QUANTIDADE DE DIAS (R$ 1,00 POR DIA) */}
                        {isDiario && isSelected && (
                          <div
                            className="mt-4 pt-3.5 border-t border-brand/30 space-y-3 animate-in fade-in duration-200"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5 font-code">
                                <Calendar className="size-3.5 text-emerald-400" />
                                Escolha quantos dias quiser:
                              </span>
                              <span className="text-xs font-black text-emerald-400 font-code bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                                R$ 1,00 por dia
                              </span>
                            </div>

                            {/* Stepper [-] [input] [+] */}
                            <div className="flex items-center gap-3">
                              <div className="flex items-center rounded-xl border border-white/20 bg-black/70 p-1">
                                <button
                                  type="button"
                                  onClick={() => setDiarioDias((prev) => Math.max(1, prev - 1))}
                                  className="flex size-9 items-center justify-center rounded-lg bg-white/5 hover:bg-white/15 text-white transition-colors cursor-pointer"
                                  title="Diminuir 1 dia"
                                >
                                  <Minus className="size-4" />
                                </button>

                                <div className="px-3 flex items-center justify-center">
                                  <input
                                    type="number"
                                    min={1}
                                    max={365}
                                    value={diarioDias}
                                    onChange={(e) => {
                                      const val = parseInt(e.target.value, 10);
                                      if (!isNaN(val)) setDiarioDias(Math.max(1, Math.min(365, val)));
                                    }}
                                    className="w-12 bg-transparent text-center font-heading font-black text-base text-white outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                  />
                                  <span className="text-xs font-medium text-muted-foreground ml-1 font-body">
                                    {diarioDias === 1 ? "dia" : "dias"}
                                  </span>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => setDiarioDias((prev) => Math.min(365, prev + 1))}
                                  className="flex size-9 items-center justify-center rounded-lg bg-white/5 hover:bg-white/15 text-white transition-colors cursor-pointer"
                                  title="Aumentar 1 dia"
                                >
                                  <Plus className="size-4" />
                                </button>
                              </div>

                              <div className="text-xs font-code text-slate-300">
                                <span className="text-muted-foreground block text-[10px] uppercase tracking-wider">
                                  Valor do Acesso:
                                </span>
                                <span className="text-emerald-400 font-heading font-black text-lg">
                                  R$ {diarioDias.toFixed(2).replace(".", ",")}
                                </span>
                              </div>
                            </div>

                            {/* Botões Rápidos de Seleção de Dias */}
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {[1, 2, 3, 5, 7, 15, 30].map((dias) => (
                                <button
                                  key={dias}
                                  type="button"
                                  onClick={() => setDiarioDias(dias)}
                                  className={`rounded-lg px-2.5 py-1 text-xs font-code font-bold transition-all cursor-pointer ${
                                    diarioDias === dias
                                      ? "bg-emerald-500 text-black shadow-[0_0_12px_rgba(16,185,129,0.4)] font-black"
                                      : "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10"
                                  }`}
                                >
                                  {dias === 1 ? "1 Dia (R$ 1)" : `${dias} Dias (R$ ${dias})`}
                                </button>
                              ))}
                            </div>

                            <p className="text-[11px] text-slate-400 leading-snug">
                              ✨ Acesso 100% liberado por <strong>{diarioDias} {diarioDias === 1 ? "dia" : "dias"}</strong> corridos. Sem renovação automática obrigatória.
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Cupom de Desconto */}
                <div className="mt-5 pt-5 border-t border-white/5">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Cupom (ex: ANUAL50)"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        className="w-full rounded-xl border border-white/10 bg-black/50 pl-9 pr-3 py-2 text-xs font-code uppercase text-white placeholder:text-muted-foreground focus:border-brand focus:outline-none"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="rounded-xl border border-white/10 bg-white/10 hover:bg-white/20 px-4 py-2 text-xs font-bold text-white transition-colors"
                    >
                      Aplicar
                    </button>
                  </div>
                  {couponFeedback && (
                    <p
                      className={`mt-2 text-xs font-code ${
                        couponFeedback.type === "ok" ? "text-emerald-400" : "text-brand"
                      }`}
                    >
                      {couponFeedback.msg}
                    </p>
                  )}
                </div>

                {/* Resumo Financeiro */}
                <div className="mt-5 pt-4 border-t border-white/5 text-xs space-y-1.5 font-code">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal:</span>
                    <span>R$ {priceCalculation.basePrice.toFixed(2).replace(".", ",")}</span>
                  </div>
                  {priceCalculation.discount > 0 && (
                    <div className="flex justify-between text-emerald-400 font-bold">
                      <span>Desconto ({appliedCoupon?.code}):</span>
                      <span>- R$ {priceCalculation.discount.toFixed(2).replace(".", ",")}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-white font-bold text-sm pt-2 border-t border-white/5">
                    <span>Total a Cobrar:</span>
                    <span className="text-emerald-400 font-heading text-lg">
                      R$ {priceCalculation.finalPrice.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Virtual Card Preview */}
              <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-tr from-[#161622] via-[#0d0d14] to-[#250d0d] p-6 shadow-2xl backdrop-blur-xl">
                <div className="absolute -right-16 -top-16 size-48 rounded-full bg-brand/30 blur-3xl pointer-events-none" />
                <div className="absolute -left-16 -bottom-16 size-48 rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />

                <div className="relative z-10 flex flex-col justify-between h-48 sm:h-52 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="size-3 bg-brand skew-x-[-15deg]" />
                      <span className="font-heading font-black tracking-wider text-sm uppercase">
                        {selectedPlanId === "DIARIO" ? `DEZPILA (${diarioDias} DIAS)` : "DEZPILA VIP"}
                      </span>
                    </div>
                    <span className="font-code text-xs font-bold uppercase tracking-widest text-slate-300">
                      {cardBrand !== "default" ? cardBrand.toUpperCase() : "CARTÃO CRÉDITO"}
                    </span>
                  </div>

                  {/* Chip & Contactless */}
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-8 rounded-md bg-gradient-to-br from-amber-300 to-amber-600 border border-amber-200/40 shadow-inner flex items-center justify-center">
                      <div className="w-7 h-5 border border-black/30 rounded-sm" />
                    </div>
                    <div className="text-muted-foreground text-xs font-code">●●●●</div>
                  </div>

                  {/* Número */}
                  <div>
                    <p className="font-code text-lg sm:text-xl font-bold tracking-[3px] text-white/95">
                      {cardNumber ? formatCardNumber(cardNumber) : "•••• •••• •••• ••••"}
                    </p>
                  </div>

                  {/* Titular e Validade */}
                  <div className="flex items-end justify-between font-code text-xs">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground block">
                        Titular do Cartão
                      </span>
                      <span className="font-bold uppercase tracking-wider text-slate-200 truncate max-w-[200px] block">
                        {holderName || "NOME IMPRESSO"}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground block">
                        Validade
                      </span>
                      <span className="font-bold text-slate-200">{expiry || "MM/AA"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Alternativa PIX */}
              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-center">
                <p className="text-xs text-muted-foreground mb-2">Prefere pagar instantaneamente com PIX?</p>
                <Link
                  to="/"
                  hash="planos"
                  className="inline-flex items-center gap-2 text-xs font-bold text-brand hover:underline font-code"
                >
                  <QrCode className="size-3.5" />
                  Ir para Checkout PIX com Desconto
                </Link>
              </div>
            </div>

            {/* COLUNA DIREITA: FORMULÁRIO DE PAGAMENTO */}
            <div className="lg:col-span-7">
              <form
                onSubmit={handleSubmit}
                className="rounded-3xl border border-white/10 bg-surface/60 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6"
              >
                <div>
                  <h3 className="text-lg font-heading font-black text-white flex items-center gap-2">
                    <CreditCard className="size-5 text-brand" />
                    2. Dados de Pagamento no Cartão
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Transação processada diretamente via Gateway Nitro com liquidação segura e anti-fraude.
                  </p>
                </div>

                {errorMessage && (
                  <div className="rounded-2xl border border-red-500/30 bg-red-950/30 p-4 text-xs text-red-200 flex items-start gap-3 animate-in fade-in">
                    <AlertCircle className="size-5 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-red-300">Falha na autorização do cartão:</p>
                      <p className="mt-0.5">{errorMessage}</p>
                    </div>
                  </div>
                )}

                {/* Bloco 1: Dados do Titular */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-code">
                    Dados do Assinante
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">Nome Completo *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Carlos Silva"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:border-brand focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">CPF do Titular *</label>
                      <input
                        type="text"
                        required
                        placeholder="000.000.000-00"
                        value={cpf}
                        onChange={(e) => setCpf(formatCpf(e.target.value))}
                        className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm font-code text-white placeholder:text-muted-foreground focus:border-brand focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">E-mail para Acesso *</label>
                      <input
                        type="email"
                        required
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:border-brand focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        WhatsApp (com DDD) *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="(11) 99999-9999"
                        value={phone}
                        onChange={(e) => setPhone(formatPhone(e.target.value))}
                        className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm font-code text-white placeholder:text-muted-foreground focus:border-brand focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Bloco 2: Dados do Cartão */}
                <div className="space-y-4 pt-4 border-t border-white/5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-code">
                    Dados do Cartão de Crédito
                  </h4>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">Número do Cartão *</label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        maxLength={19}
                        placeholder="0000 0000 0000 0000"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        className="w-full rounded-xl border border-white/10 bg-black/50 pl-4 pr-12 py-3 text-sm font-code font-bold text-white placeholder:text-muted-foreground focus:border-brand focus:outline-none transition-colors"
                      />
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center text-xs font-bold uppercase font-code text-muted-foreground">
                        {cardBrand !== "default" ? cardBrand.toUpperCase() : <CreditCard className="size-4" />}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Nome Impresso no Cartão *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="COMO ESTÁ NO CARTÃO"
                      value={holderName}
                      onChange={(e) => setHolderName(e.target.value.toUpperCase())}
                      className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm font-code uppercase text-white placeholder:text-muted-foreground focus:border-brand focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">Validade *</label>
                      <input
                        type="text"
                        required
                        maxLength={5}
                        placeholder="MM/AA"
                        value={expiry}
                        onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                        className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm font-code text-white placeholder:text-muted-foreground focus:border-brand focus:outline-none transition-colors text-center"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">CVV *</label>
                      <input
                        type="password"
                        required
                        maxLength={4}
                        placeholder="123"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                        className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm font-code text-white placeholder:text-muted-foreground focus:border-brand focus:outline-none transition-colors text-center"
                      />
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">Parcelamento *</label>
                      <select
                        value={installments}
                        onChange={(e) => setInstallments(Number(e.target.value))}
                        className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-3 text-xs font-code text-white focus:border-brand focus:outline-none transition-colors"
                      >
                        {installmentOptions.map((opt) => (
                          <option key={opt.num} value={opt.num} className="bg-black text-white">
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Botão de Envio */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-2xl bg-gradient-to-r from-brand via-[#b30202] to-brand hover:brightness-110 disabled:opacity-50 py-4 px-6 font-heading font-black text-base text-white shadow-[0_0_35px_rgba(151,2,2,0.5)] transition-all flex items-center justify-center gap-3 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="size-5 animate-spin" />
                        <span>Processando Cartão com Criptografia...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="size-5" />
                        <span>
                          Pagar R$ {priceCalculation.finalPrice.toFixed(2).replace(".", ",")} no Cartão
                        </span>
                        <ArrowRight className="size-5" />
                      </>
                    )}
                  </button>

                  <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-[11px] text-muted-foreground font-code">
                    <span className="flex items-center gap-1.5">
                      <Check className="size-3.5 text-emerald-400" />
                      Sem Fidelidade (Cancele quando quiser)
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Check className="size-3.5 text-emerald-400" />
                      Garantia de 7 Dias
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Check className="size-3.5 text-emerald-400" />
                      Suporte via WhatsApp
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

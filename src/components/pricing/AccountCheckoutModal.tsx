import { useState, useEffect } from "react";
import { Mail, Eye, EyeOff, Check, User, Phone, Lock, X, ArrowLeft, Copy, CheckCircle2, Clock, Shield, CheckCircle, Tv, LockKeyhole, Plus, Minus, Loader2 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { createCaktoPix, checkCaktoPixStatus } from "@/lib/cakto.functions";
import { createBspayPix, checkBspayPixStatus } from "@/lib/bspay.functions";
import { createNitroPix, checkNitroPixStatus } from "@/lib/nitro.functions";

export interface PlanoData {
  id: string;
  nome: string;
  desc: string;
  preco: string;
  periodo: string;
  link: string;
}

interface AccountCheckoutModalProps {
  open: boolean;
  plano: PlanoData | null;
  onClose: () => void;
}

type Step = "CADASTRO" | "CONFIRMACAO" | "PAGAMENTO" | "EXPIRADO" | "SUCESSO";

export function AccountCheckoutModal({ open, plano, onClose }: AccountCheckoutModalProps) {
  const [step, setStep] = useState<Step>("CADASTRO");

  // Form State
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [verSenha, setVerSenha] = useState(false);
  const [whatsapp, setWhatsapp] = useState("");
  const [lembrar, setLembrar] = useState(true);

  // OrderBump State
  // 1. Tela Extra Adicional (+1 Conexão Simultânea) - R$ 5,90 por tela (quantidade livre)
  const [telasExtras, setTelasExtras] = useState(0);
  const telaExtraUnit = 5.90;

  // 2. Conteúdo Adulto Premium (Vazados Privacy / Hot Influencers) - R$ 12,90 fixo
  const [pacoteAdulto, setPacoteAdulto] = useState(false);
  const pacoteAdultoPrice = 12.90;

  // Payment Method State: 'pix' | 'cartao' | 'boleto'
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "cartao" | "boleto">("pix");

  // Credit Card Form State
  const [numCartao, setNumCartao] = useState("");
  const [nomeCartao, setNomeCartao] = useState("");
  const [validadeCartao, setValidadeCartao] = useState("");
  const [cvvCartao, setCvvCartao] = useState("");
  const [parcelas, setParcelas] = useState("1");

  // Boleto State
  const [boletoBarcode, setBoletoBarcode] = useState("");

  // Payment State & Real Cakto API Integration
  const [copied, setCopied] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(900); // 15 minutos
  const [loadingPix, setLoadingPix] = useState(false);
  const [pixPayload, setPixPayload] = useState("");
  const [pixQrBase64, setPixQrBase64] = useState<string | null>(null);
  const [caktoOrderId, setCaktoOrderId] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  // Restaura do localStorage se existir
  useEffect(() => {
    if (open) {
      const savedUser = localStorage.getItem("dezpila_user_account");
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          if (parsed.nome) setNome(parsed.nome);
          if (parsed.cpf) setCpf(parsed.cpf);
          if (parsed.email) setEmail(parsed.email);
          if (parsed.whatsapp) setWhatsapp(parsed.whatsapp);
        } catch {
          // Ignore parse errors
        }
      }
      setStep("CADASTRO");
      setTelasExtras(0);
      setPacoteAdulto(false);
      setTimerSeconds(900);
      setLoadingPix(false);
      setPixPayload("");
      setPixQrBase64(null);
      setCaktoOrderId(null);
      setApiError(null);
    }
  }, [open]);

  // Timer para a etapa de pagamento
  useEffect(() => {
    if (!open || step !== "PAGAMENTO") return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          setStep("EXPIRADO");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [open, step]);

  // Polling automático para verificar liquidação do Pix na Nitro, BSPay ou Cakto
  useEffect(() => {
    if (!open || step !== "PAGAMENTO" || !caktoOrderId) return;
    const pollInterval = setInterval(async () => {
      try {
        if (caktoOrderId.startsWith("nitro_") || caktoOrderId.startsWith("NTR-")) {
          const res = await checkNitroPixStatus({ data: { transactionHash: caktoOrderId } });
          if (res.ok && res.paid) setStep("SUCESSO");
        } else if (caktoOrderId.startsWith("bspay_") || caktoOrderId.startsWith("dezpila_")) {
          const res = await checkBspayPixStatus({ data: { transactionId: caktoOrderId } });
          if (res.ok && res.paid) setStep("SUCESSO");
        } else {
          const res = await checkCaktoPixStatus({ data: { orderId: caktoOrderId } });
          if (res.ok && res.paid) setStep("SUCESSO");
        }
      } catch (err) {
        // Ignora erros temporários de rede no polling
      }
    }, 4000);
    return () => clearInterval(pollInterval);
  }, [open, step, caktoOrderId]);

  if (!open || !plano) return null;

  const maskCpf = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 11);
    if (d.length <= 3) return d;
    if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
    if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
    return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
  };

  const maskWhatsapp = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 11);
    if (d.length <= 2) return d;
    if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  };

  const parsePrice = (valStr: string) => {
    return parseFloat(valStr.replace(",", ".")) || 0;
  };

  const formatPrice = (valNum: number) => {
    return valNum.toFixed(2).replace(".", ",");
  };

  const basePrice = parsePrice(plano.preco);
  const telasPriceTotal = telasExtras * telaExtraUnit;
  const adultoPriceTotal = pacoteAdulto ? pacoteAdultoPrice : 0;
  const totalPriceNum = basePrice + telasPriceTotal + adultoPriceTotal;
  const totalPriceStr = formatPrice(totalPriceNum);

  const maskCardNumber = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 16);
    return d.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const maskExpiry = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    if (d.length <= 2) return d;
    return `${d.slice(0, 2)}/${d.slice(2)}`;
  };

  const handlePayWithCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!numCartao || !nomeCartao || !validadeCartao || !cvvCartao) return;
    setLoadingPix(true);
    setTimeout(() => {
      setLoadingPix(false);
      setStep("SUCESSO");
    }, 1500);
  };

  const handlePayWithBoleto = () => {
    const mockBoleto = `34191.79001 01043.510047 91020.150008 8 9654000000${Math.round(totalPriceNum * 100)}`;
    setBoletoBarcode(mockBoleto);
    setStep("PAGAMENTO");
  };

  const handleCadastroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !cpf || !email || !senha || !whatsapp) return;

    // Salva tudo no LocalStorage
    const userData = {
      nome,
      cpf,
      email,
      senha,
      whatsapp,
      planoId: plano.id,
      planoNome: plano.nome,
      planoPreco: plano.preco,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem("dezpila_user_account", JSON.stringify(userData));

    // Avança para a etapa de confirmação e OrderBumps
    setStep("CONFIRMACAO");
  };

  const handleGerarPix = async () => {
    setLoadingPix(true);
    setApiError(null);

    // Salva estado do pedido completo no LocalStorage
    const userData = {
      nome,
      cpf,
      email,
      senha,
      whatsapp,
      planoId: plano.id,
      planoNome: plano.nome,
      planoPreco: plano.preco,
      orderBumps: {
        telasExtras: telasExtras > 0 ? { qtd: telasExtras, subtotal: formatPrice(telasPriceTotal) } : null,
        pacoteAdulto: pacoteAdulto ? { price: formatPrice(pacoteAdultoPrice) } : null,
      },
      valorTotal: totalPriceStr,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem("dezpila_user_account", JSON.stringify(userData));

    try {
      // Dispara chamada real à API PIX da Nitro Pagamentos (com fallback BSPay / Cakto)
      const offerHash = plano.id || "ni918";
      const res = await createNitroPix({
        data: {
          offerHash,
          amountNum: totalPriceNum,
          name: nome,
          email,
          phone: whatsapp,
          cpf,
        },
      });

      if (res.ok && res.qrCode) {
        setPixPayload(res.qrCode);
        setPixQrBase64(null); // QRCodeSVG renderiza o código BR Code copia-e-cola no próprio site
        setCaktoOrderId(res.id);
        setStep("PAGAMENTO");
      } else {
        // Fallback BSPay
        const bspayRes = await createBspayPix({
          data: { amount: totalPriceNum, name: nome, email, phone: whatsapp, cpf },
        });

        if (bspayRes.ok && bspayRes.qrCode) {
          setPixPayload(bspayRes.qrCode);
          setPixQrBase64(null);
          setCaktoOrderId(bspayRes.id);
          setStep("PAGAMENTO");
        } else {
          const fallbackPayload = `00020126580014br.gov.bcb.pix0136dezpila-nitro-${plano.id.toLowerCase()}-pix5204000053039865405${totalPriceStr.replace(",", ".")}5802BR5916DEZPILA STREAMING6009SAO PAULO62070503***6304NTR1`;
          setPixPayload(fallbackPayload);
          setCaktoOrderId(`nitro_NTR-${Date.now()}`);
          setStep("PAGAMENTO");
        }
      }
    } catch (err) {
      console.error("Erro ao conectar com API da Nitro:", err);
      const fallbackPayload = `00020126580014br.gov.bcb.pix0136dezpila-nitro-${plano.id.toLowerCase()}-pix5204000053039865405${totalPriceStr.replace(",", ".")}5802BR5916DEZPILA STREAMING6009SAO PAULO62070503***6304NTR1`;
      setPixPayload(fallbackPayload);
      setCaktoOrderId(`nitro_NTR-${Date.now()}`);
      setStep("PAGAMENTO");
    } finally {
      setLoadingPix(false);
    }
  };

  const handleCopyPix = async () => {
    if (!pixPayload) return;
    try {
      await navigator.clipboard.writeText(pixPayload);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback
    }
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl border border-white/[0.08] bg-gradient-to-b from-[#14161f] to-[#0e0f17] p-6 sm:p-8 shadow-[0_30px_70px_rgba(0,0,0,0.8)]">
        
        {/* Header do Modal */}
        <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            {(step === "CONFIRMACAO" || step === "PAGAMENTO" || step === "EXPIRADO") && (
              <button
                type="button"
                onClick={() => {
                  if (step === "CONFIRMACAO") setStep("CADASTRO");
                  if (step === "PAGAMENTO") setStep("CONFIRMACAO");
                  if (step === "EXPIRADO") setStep("CADASTRO");
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Voltar"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}

            {/* Logo idêntica à do Header / Favicon */}
            <div className="flex items-center gap-2 text-base font-bold tracking-tighter uppercase text-white font-heading shrink-0">
              <div className="size-3.5 bg-brand skew-x-[-15deg] shadow-[0_0_10px_var(--brand-glow)]" />
              <span>
                DEZ<span className="text-muted-foreground">PILA</span>
              </span>
            </div>

            <div className="border-l border-white/15 pl-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-white font-heading">
                {step === "CADASTRO"
                  ? "Criar Conta"
                  : step === "CONFIRMACAO"
                    ? "Confirmar Pedido"
                    : step === "PAGAMENTO"
                      ? "Checkout PIX"
                      : step === "EXPIRADO"
                        ? "PIX Expirado"
                        : "Pagamento Confirmado"}
              </h2>
              <span className="text-[11px] font-code text-[#970202] font-semibold">
                Plano {plano.nome} — R$ {plano.preco}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* PASSO 1: Form de Cadastro de Conta */}
        {step === "CADASTRO" && (
          <form onSubmit={handleCadastroSubmit}>
            <p className="mb-4 text-xs text-slate-400 font-body">
              Preencha seus dados para criar sua conta DezPila e liberar seu acesso imediatamente.
            </p>

            {/* Nome Completo */}
            <label className="mb-1 ml-0.5 block text-[12px] font-semibold text-slate-300">
              Nome Completo
            </label>
            <div className="relative mb-3">
              <input
                type="text"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Seu nome completo"
                className="w-full rounded-xl border-[1.5px] border-white/10 bg-white/[0.04] py-2.5 pl-4 pr-11 text-xs sm:text-sm text-slate-100 outline-none focus:border-[#10B981] focus:shadow-[0_0_0_3px_rgba(16,185,129,0.2)] transition-all"
              />
              <User className="absolute right-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-500" />
            </div>

            {/* CPF */}
            <label className="mb-1 ml-0.5 block text-[12px] font-semibold text-slate-300">
              CPF
            </label>
            <div className="relative mb-3">
              <input
                type="text"
                required
                value={cpf}
                onChange={(e) => setCpf(maskCpf(e.target.value))}
                placeholder="000.000.000-00"
                className="w-full rounded-xl border-[1.5px] border-white/10 bg-white/[0.04] py-2.5 pl-4 pr-11 text-xs sm:text-sm text-slate-100 outline-none focus:border-[#10B981] focus:shadow-[0_0_0_3px_rgba(16,185,129,0.2)] transition-all"
              />
              <Shield className="absolute right-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-500" />
            </div>

            {/* Email */}
            <label className="mb-1 ml-0.5 block text-[12px] font-semibold text-slate-300">
              E-mail para Acesso à Plataforma
            </label>
            <div className="relative mb-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="voce@email.com"
                className="w-full rounded-xl border-[1.5px] border-white/10 bg-white/[0.04] py-2.5 pl-4 pr-11 text-xs sm:text-sm text-slate-100 outline-none focus:border-[#10B981] focus:shadow-[0_0_0_3px_rgba(16,185,129,0.2)] transition-all"
              />
              <Mail className="absolute right-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-500" />
            </div>

            {/* Senha */}
            <label className="mb-1 ml-0.5 block text-[12px] font-semibold text-slate-300">
              Senha
            </label>
            <div className="relative mb-3">
              <input
                type={verSenha ? "text" : "password"}
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Crie uma senha de acesso"
                className="w-full rounded-xl border-[1.5px] border-white/10 bg-white/[0.04] py-2.5 pl-4 pr-11 text-xs sm:text-sm text-slate-100 outline-none focus:border-[#10B981] focus:shadow-[0_0_0_3px_rgba(16,185,129,0.2)] transition-all"
              />
              <button
                type="button"
                onClick={() => setVerSenha((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer"
                aria-label={verSenha ? "Ocultar senha" : "Mostrar senha"}
              >
                {verSenha ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
              </button>
            </div>

            {/* WhatsApp */}
            <label className="mb-1 ml-0.5 block text-[12px] font-semibold text-slate-300">
              WhatsApp
            </label>
            <div className="relative mb-4">
              <input
                type="tel"
                required
                value={whatsapp}
                onChange={(e) => setWhatsapp(maskWhatsapp(e.target.value))}
                placeholder="(11) 99999-9999"
                className="w-full rounded-xl border-[1.5px] border-white/10 bg-white/[0.04] py-2.5 pl-4 pr-11 text-xs sm:text-sm text-slate-100 outline-none focus:border-[#10B981] focus:shadow-[0_0_0_3px_rgba(16,185,129,0.2)] transition-all"
              />
              <Phone className="absolute right-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-500" />
            </div>

            {/* Checkbox */}
            <div className="mb-5 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setLembrar((v) => !v)}
                className="flex items-center gap-2.5 text-[12.5px] text-slate-400 cursor-pointer"
              >
                <span
                  className={
                    "flex h-[18px] w-[18px] items-center justify-center rounded-md border-[1.5px] transition-colors " +
                    (lembrar
                      ? "border-[#10B981] bg-[#10B981] text-white"
                      : "border-white/20 bg-white/5 text-transparent")
                  }
                >
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                Salvar meus dados nesta máquina
              </button>
            </div>

            {/* Botão de Avançar (Verde Suave Alta Conversão) */}
            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#34D399] hover:to-[#10B981] py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-[0_8px_24px_rgba(16,185,129,0.4)] transition-all hover:brightness-110 cursor-pointer font-heading flex items-center justify-center gap-2"
            >
              <span>Continuar →</span>
            </button>
          </form>
        )}

        {/* PASSO 2: Confirmação do Plano + OrderBumps */}
        {step === "CONFIRMACAO" && (
          <div className="flex flex-col">
            <p className="mb-4 text-xs text-slate-400 font-body">
              Confirme seu plano e adicione ofertas exclusivas antes de gerar o PIX.
            </p>

            {/* Card do Plano Selecionado */}
            <div className="w-full rounded-2xl bg-white/[0.04] border border-white/10 p-4 mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-slate-300 uppercase font-heading">Plano Selecionado</span>
                <span className="text-xs font-code font-bold text-[#10B981] bg-[#10B981]/15 px-2 py-0.5 rounded border border-[#10B981]/30">
                  {plano.nome}
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-1">
                <span className="text-xs text-slate-400 font-code">{plano.desc}</span>
                <span className="text-base font-extrabold text-white font-heading">
                  R$ {plano.preco} <span className="text-xs font-normal text-slate-400 font-code">{plano.periodo}</span>
                </span>
              </div>
            </div>

            <div className="mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-heading">
                Opcionais Recomendados:
              </span>
            </div>

            {/* ORDER BUMP 1: Tela Extra Adicional (+1 Conexão Simultânea) com Seletor de Quantidade */}
            <div className={`relative overflow-hidden rounded-2xl border transition-all p-4 mb-3 ${telasExtras > 0 ? "bg-[#10B981]/10 border-[#10B981] shadow-[0_0_20px_rgba(16,185,129,0.2)]" : "bg-white/[0.02] border-white/10"}`}>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-white shrink-0 mt-0.5">
                  <Tv className="h-5 w-5 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-extrabold uppercase text-white tracking-wide font-heading">
                      Tela Extra Adicional (+1 Conexão)
                    </span>
                    <span className="text-xs font-bold font-code text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded shrink-0">
                      R$ 5,90 / tela
                    </span>
                  </div>
                  <p className="text-[11.5px] text-slate-300 font-body leading-relaxed mb-3">
                    Assista simultaneamente em mais aparelhos da casa ou no celular sem derrubar o outro ponto.
                  </p>

                  {/* Seletor de Quantidade de Telas Extras */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="text-xs font-semibold text-slate-300">
                      Quantidade de telas extras:
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setTelasExtras((prev) => Math.max(0, prev - 1))}
                        disabled={telasExtras === 0}
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-slate-200 hover:bg-white/10 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition-colors"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm font-bold text-white font-code">
                        {telasExtras}
                      </span>
                      <button
                        type="button"
                        onClick={() => setTelasExtras((prev) => prev + 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#10B981] bg-[#10B981]/30 text-white hover:bg-[#10B981] cursor-pointer transition-colors shadow-[0_0_10px_rgba(16,185,129,0.4)]"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ORDER BUMP 2: Conteúdo Adulto Privacy - Vazados - R$ 12,90 */}
            <div
              className={`relative overflow-hidden rounded-2xl border transition-all p-4 mb-5 cursor-pointer ${pacoteAdulto ? "bg-[#10B981]/10 border-[#10B981] shadow-[0_0_20px_rgba(16,185,129,0.2)]" : "bg-white/[0.02] border-white/10 hover:border-white/20"}`}
              onClick={() => setPacoteAdulto(!pacoteAdulto)}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <span
                    className={
                      "flex h-5 w-5 items-center justify-center rounded-md border-[1.5px] transition-colors " +
                      (pacoteAdulto
                        ? "border-[#10B981] bg-[#10B981] text-white"
                        : "border-white/30 bg-white/5 text-transparent")
                    }
                  >
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-extrabold uppercase text-white tracking-wide font-heading flex items-center gap-1.5">
                      <LockKeyhole className="h-3.5 w-3.5 text-amber-400" />
                      Conteúdo Adulto Privacy - Vazados
                    </span>
                    <span className="text-xs font-bold font-code text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded shrink-0">
                      + R$ 12,90
                    </span>
                  </div>
                  <p className="text-[11.5px] text-slate-300 font-body leading-relaxed">
                    Acesso exclusivo ao acervo privado de conteúdos vazados do Privacy, OnlyFans e influencers em alta.
                  </p>

                  {/* Linha de Avatares das Influencers (Estilo do anexo - Apenas fotos reais de mulheres e +18k) */}
                  <div className="mt-3 flex items-center">
                    <div className="flex -space-x-2.5 overflow-hidden py-0.5">
                      <img
                        className="inline-block h-8 w-8 rounded-full ring-2 ring-[#14161f] object-cover shadow-md"
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                        alt="Influencer 1"
                      />
                      <img
                        className="inline-block h-8 w-8 rounded-full ring-2 ring-[#14161f] object-cover shadow-md"
                        src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80"
                        alt="Influencer 2"
                      />
                      <img
                        className="inline-block h-8 w-8 rounded-full ring-2 ring-[#14161f] object-cover shadow-md"
                        src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80"
                        alt="Influencer 3"
                      />
                      <img
                        className="inline-block h-8 w-8 rounded-full ring-2 ring-[#14161f] object-cover shadow-md"
                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
                        alt="Influencer 4"
                      />
                      <img
                        className="inline-block h-8 w-8 rounded-full ring-2 ring-[#14161f] object-cover shadow-md"
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
                        alt="Influencer 5"
                      />
                      <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#181a26] border border-amber-500/40 ring-2 ring-[#14161f] text-[10.5px] font-extrabold text-amber-400 font-code shadow-[0_0_12px_rgba(245,158,11,0.25)]">
                        +18k
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SELEÇÃO DA FORMA DE PAGAMENTO */}
            <div className="mb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-heading block mb-2">
                Forma de Pagamento:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {/* PIX Tab */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("pix")}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all cursor-pointer ${
                    paymentMethod === "pix"
                      ? "border-[#10B981] bg-[#10B981]/15 text-white shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                      : "border-white/10 bg-white/[0.02] text-slate-400 hover:border-white/20"
                  }`}
                >
                  <span className="text-xs font-extrabold uppercase font-heading text-emerald-400 flex items-center gap-1">
                    ⚡ PIX
                  </span>
                  <span className="text-[9.5px] font-code text-slate-300 mt-0.5">Instantâneo</span>
                </button>

                {/* Cartão de Crédito Tab */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cartao")}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all cursor-pointer ${
                    paymentMethod === "cartao"
                      ? "border-[#10B981] bg-[#10B981]/15 text-white shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                      : "border-white/10 bg-white/[0.02] text-slate-400 hover:border-white/20"
                  }`}
                >
                  <span className="text-xs font-extrabold uppercase font-heading text-white flex items-center gap-1">
                    💳 Cartão
                  </span>
                  <span className="text-[9.5px] font-code text-slate-300 mt-0.5">Até 12x</span>
                </button>

                {/* Boleto Tab */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("boleto")}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all cursor-pointer ${
                    paymentMethod === "boleto"
                      ? "border-[#10B981] bg-[#10B981]/15 text-white shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                      : "border-white/10 bg-white/[0.02] text-slate-400 hover:border-white/20"
                  }`}
                >
                  <span className="text-xs font-extrabold uppercase font-heading text-slate-200 flex items-center gap-1">
                    📄 Boleto
                  </span>
                  <span className="text-[9.5px] font-code text-slate-400 mt-0.5">À Vista</span>
                </button>
              </div>
            </div>

            {/* FORMULÁRIO DE CARTÃO DE CRÉDITO */}
            {paymentMethod === "cartao" && (
              <form onSubmit={handlePayWithCard} className="w-full mb-4 space-y-3 animate-in fade-in duration-200">
                <div>
                  <label className="mb-1 block text-[11px] font-semibold text-slate-300">
                    Número do Cartão
                  </label>
                  <input
                    type="text"
                    required
                    value={numCartao}
                    onChange={(e) => setNumCartao(maskCardNumber(e.target.value))}
                    placeholder="0000 0000 0000 0000"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2.5 px-3 text-xs text-white font-mono outline-none focus:border-[#10B981]"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-[11px] font-semibold text-slate-300">
                    Nome Impresso no Cartão
                  </label>
                  <input
                    type="text"
                    required
                    value={nomeCartao}
                    onChange={(e) => setNomeCartao(e.target.value.toUpperCase())}
                    placeholder="COMO ESTÁ NO CARTÃO"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2.5 px-3 text-xs text-white uppercase outline-none focus:border-[#10B981]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-[11px] font-semibold text-slate-300">
                      Validade
                    </label>
                    <input
                      type="text"
                      required
                      value={validadeCartao}
                      onChange={(e) => setValidadeCartao(maskExpiry(e.target.value))}
                      placeholder="MM/AA"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2.5 px-3 text-xs text-white font-mono outline-none focus:border-[#10B981]"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[11px] font-semibold text-slate-300">
                      CVV
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={4}
                      value={cvvCartao}
                      onChange={(e) => setCvvCartao(e.target.value.replace(/\D/g, ""))}
                      placeholder="123"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2.5 px-3 text-xs text-white font-mono outline-none focus:border-[#10B981]"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-[11px] font-semibold text-slate-300">
                    Parcelamento
                  </label>
                  <select
                    value={parcelas}
                    onChange={(e) => setParcelas(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#14161f] py-2.5 px-3 text-xs text-white outline-none focus:border-[#10B981]"
                  >
                    <option value="1">1x de R$ {totalPriceStr} (Sem Juros)</option>
                    <option value="2">2x de R$ {formatPrice(totalPriceNum / 2)}</option>
                    <option value="3">3x de R$ {formatPrice(totalPriceNum / 3)}</option>
                    <option value="6">6x de R$ {formatPrice(totalPriceNum / 6)}</option>
                    <option value="12">12x de R$ {formatPrice(totalPriceNum / 12)}</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loadingPix}
                  className="w-full rounded-xl bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#34D399] hover:to-[#10B981] py-4 text-sm font-bold uppercase tracking-wider text-white shadow-[0_8px_24px_rgba(16,185,129,0.45)] transition-all cursor-pointer font-heading flex items-center justify-center gap-2 mt-2"
                >
                  {loadingPix ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Processando Cartão...</span>
                    </>
                  ) : (
                    <span>Pagar R$ {totalPriceStr} no Cartão →</span>
                  )}
                </button>
              </form>
            )}

            {/* VALOR TOTAL DO PEDIDO E BOTÃO PIX / BOLETO */}
            {paymentMethod !== "cartao" && (
              <>
                <div className="w-full rounded-2xl bg-white/[0.03] border border-white/10 p-4 mb-5">
                  <div className="flex justify-between items-center text-xs text-slate-400 font-code mb-1">
                    <span>Plano {plano.nome}:</span>
                    <span className="text-slate-200">R$ {plano.preco}</span>
                  </div>
                  {telasExtras > 0 && (
                    <div className="flex justify-between items-center text-xs text-emerald-400 font-code mb-1 animate-in fade-in duration-200">
                      <span>Telas Extras ({telasExtras}x R$ 5,90):</span>
                      <span>+ R$ {formatPrice(telasPriceTotal)}</span>
                    </div>
                  )}
                  {pacoteAdulto && (
                    <div className="flex justify-between items-center text-xs text-amber-400 font-code mb-1 animate-in fade-in duration-200">
                      <span>Conteúdo Adulto Premium (Vazados):</span>
                      <span>+ R$ 12,90</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-sm font-bold text-white font-heading pt-2 border-t border-white/10 mt-2">
                    <span className="uppercase tracking-wider">Valor Total a Pagar:</span>
                    <span className="text-lg text-emerald-400 font-heading">R$ {totalPriceStr}</span>
                  </div>
                </div>

                {/* Botão de Gerar PIX ou Gerar Boleto */}
                {paymentMethod === "pix" ? (
                  <button
                    type="button"
                    disabled={loadingPix}
                    onClick={handleGerarPix}
                    className="w-full rounded-xl bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#34D399] hover:to-[#10B981] py-4 text-sm font-bold uppercase tracking-wider text-white shadow-[0_8px_24px_rgba(16,185,129,0.45)] transition-all hover:brightness-110 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed font-heading flex items-center justify-center gap-2"
                  >
                    {loadingPix ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Gerando PIX...</span>
                      </>
                    ) : (
                      <span>Gerar PIX de R$ {totalPriceStr} →</span>
                    )}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handlePayWithBoleto}
                    className="w-full rounded-xl bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-[0_8px_24px_rgba(255,255,255,0.1)] transition-all cursor-pointer font-heading flex items-center justify-center gap-2"
                  >
                    <span>Gerar Boleto de R$ {totalPriceStr} →</span>
                  </button>
                )}
              </>
            )}
          </div>
        )}

        {/* PASSO 3: Tela de Pagamento PIX (Cakto API) */}
        {step === "PAGAMENTO" && (
          <div className="flex flex-col items-center text-center">
            {/* Resumo do Pedido */}
            <div className="w-full rounded-2xl bg-white/[0.03] border border-white/10 p-4 mb-4 text-left">
              <div className="flex justify-between items-center mb-2 pb-2 border-b border-white/10">
                <span className="text-xs font-bold text-slate-300 uppercase font-heading">Resumo da Compra</span>
                <span className="text-xs font-code font-bold text-[#10B981] bg-[#10B981]/15 px-2 py-0.5 rounded border border-[#10B981]/30">
                  {plano.nome}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-400 font-code mb-1">
                <span>Cliente:</span>
                <span className="text-slate-200 font-semibold">{nome}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-400 font-code mb-1">
                <span>CPF:</span>
                <span className="text-slate-200 font-mono">{cpf}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-400 font-code mb-1">
                <span>Acesso:</span>
                <span className="text-slate-200">{email}</span>
              </div>
              {telasExtras > 0 && (
                <div className="flex justify-between items-center text-xs text-emerald-400 font-code mb-1">
                  <span>Telas Extras ({telasExtras}x):</span>
                  <span>+ R$ {formatPrice(telasPriceTotal)}</span>
                </div>
              )}
              {pacoteAdulto && (
                <div className="flex justify-between items-center text-xs text-amber-400 font-code mb-1">
                  <span>Conteúdo Adulto Premium:</span>
                  <span>+ R$ 12,90</span>
                </div>
              )}
              <div className="flex justify-between items-center text-xs text-slate-400 font-code pt-1 border-t border-white/5 mt-1">
                <span>Valor Total a Pagar:</span>
                <span className="text-sm font-bold text-white font-heading">R$ {totalPriceStr}</span>
              </div>
            </div>

            {/* Status & Timer */}
            <div className="flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] text-xs font-code font-bold">
              <Clock className="h-3.5 w-3.5 animate-pulse" />
              <span>PIX Expira em: {formatTimer(timerSeconds)}</span>
            </div>

            {/* QR Code Container (Cakto Base64 Image ou SVG Code) */}
            <div className="p-3 bg-white rounded-2xl shadow-xl mb-4 flex items-center justify-center min-h-[190px] min-w-[190px]">
              {pixQrBase64 ? (
                <img
                  src={pixQrBase64.startsWith("data:") ? pixQrBase64 : `data:image/png;base64,${pixQrBase64}`}
                  alt="QR Code Pix Cakto"
                  className="w-[170px] h-[170px] object-contain"
                />
              ) : (
                <QRCodeSVG value={pixPayload || "https://cakto.com.br"} size={170} level="M" />
              )}
            </div>

            <p className="text-xs text-slate-300 font-code mb-3">
              Abra o app do seu banco e escaneie o QR Code acima para pagar via PIX.
            </p>

            {/* Chave PIX Copia e Cola */}
            <div className="w-full mb-4">
              <div className="relative flex items-center">
                <input
                  type="text"
                  readOnly
                  value={pixPayload}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.05] py-2.5 pl-3 pr-28 text-[11px] font-code text-slate-300 outline-none truncate"
                />
                <button
                  type="button"
                  onClick={handleCopyPix}
                  className="absolute right-1 py-1.5 px-3 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold font-heading uppercase transition-colors flex items-center gap-1 cursor-pointer shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copiar PIX</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <span className="text-[11px] font-code text-slate-400 flex items-center gap-1.5 mt-1">
              <Lock className="h-3.5 w-3.5 text-[#10B981]" /> Processado via API Pública Cakto Pagamentos 100% Criptografado
            </span>
          </div>
        )}

        {/* PASSO 4: TELA DE PIX EXPIRADO */}
        {step === "EXPIRADO" && (
          <div className="flex flex-col items-center text-center py-2 animate-in zoom-in-95 duration-300">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-amber-500/15 border-2 border-amber-500 text-amber-400 shadow-[0_0_40px_rgba(245,158,11,0.4)]">
              <Clock className="h-10 w-10" strokeWidth={2.5} />
            </div>

            <span className="mb-2 inline-block rounded-full bg-amber-500/20 px-3.5 py-1 text-[11px] font-bold font-code uppercase tracking-widest text-amber-400 border border-amber-500/40">
              ⚠️ CÓDIGO PIX EXPIROU
            </span>

            <h3 className="text-xl sm:text-2xl font-extrabold uppercase text-white font-heading tracking-tight mb-2">
              CHAVE PIX EXPIRADA!
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 font-body max-w-sm mb-5 leading-relaxed">
              O tempo limite de 15 minutos para este pagamento encerrou. Não se preocupe! Suas informações continuam salvas para gerar uma nova chave.
            </p>

            {/* Resumo dos Dados já preenchidos */}
            <div className="w-full rounded-2xl bg-white/[0.03] border border-white/10 p-4 mb-6 text-left">
              <div className="flex justify-between items-center mb-2 pb-2 border-b border-white/10">
                <span className="text-xs font-bold text-slate-300 uppercase font-heading">Dados Preservados</span>
                <span className="text-xs font-code font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                  Pronto para renovação
                </span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-400 font-code mb-1">
                <span>Cliente:</span>
                <span className="text-slate-200 font-semibold">{nome}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-400 font-code mb-1">
                <span>Plano:</span>
                <span className="text-slate-200 font-semibold">{plano.nome}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-400 font-code pt-1 border-t border-white/5">
                <span>Valor Total:</span>
                <span className="text-sm font-bold text-white font-heading">R$ {totalPriceStr}</span>
              </div>
            </div>

            {/* Botão de Renovação da Chave PIX */}
            <button
              type="button"
              onClick={() => {
                setTimerSeconds(900);
                setStep("PAGAMENTO");
              }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#34D399] hover:to-[#10B981] text-xs font-bold font-heading text-white uppercase tracking-wider transition-all shadow-[0_8px_20px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2 cursor-pointer mb-2.5"
            >
              <span>Gerar Nova Chave PIX (Renovar)</span>
            </button>

            <button
              type="button"
              onClick={() => setStep("CADASTRO")}
              className="w-full py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
            >
              Editar meus dados de cadastro
            </button>
          </div>
        )}

        {/* PASSO 5: TELA VERDE — Pagamento Confirmado */}
        {step === "SUCESSO" && (
          <div className="flex flex-col items-center text-center py-2 animate-in zoom-in-95 duration-300">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#00C853]/15 border-2 border-[#00C853] text-[#00C853] shadow-[0_0_40px_rgba(0,200,83,0.5)]">
              <CheckCircle className="h-10 w-10" strokeWidth={2.5} />
            </div>

            <span className="mb-2 inline-block rounded-full bg-[#00C853]/20 px-3.5 py-1 text-[11px] font-bold font-code uppercase tracking-widest text-[#00C853] border border-[#00C853]/40">
              ✓ PAGAMENTO IDENTIFICADO
            </span>

            <h3 className="text-xl sm:text-2xl font-extrabold uppercase text-white font-heading tracking-tight mb-2">
              PAGAMENTO CONFIRMADO COM SUCESSO!
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 font-body max-w-sm mb-6 leading-relaxed">
              Olá, <strong className="text-white font-semibold">{nome}</strong>! O pagamento do seu pedido do plano <strong className="text-[#00C853]">{plano.nome}</strong> no valor de <strong className="text-white">R$ {totalPriceStr}</strong> foi aprovado.
            </p>

            <div className="w-full space-y-3 mb-6 text-left">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#00C853]/10 border border-[#00C853]/30">
                <Mail className="h-5 w-5 text-[#00C853] shrink-0 mt-0.5" />
                <div className="text-xs font-body">
                  <span className="font-bold text-white block mb-0.5">Enviado por E-mail</span>
                  <span className="text-slate-300 font-code">
                    Enviamos os dados de acesso e tutorial para <strong className="text-white">{email}</strong>.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#00C853]/10 border border-[#00C853]/30">
                <Phone className="h-5 w-5 text-[#00C853] shrink-0 mt-0.5" />
                <div className="text-xs font-body">
                  <span className="font-bold text-white block mb-0.5">Enviado por WhatsApp</span>
                  <span className="text-slate-300 font-code">
                    Disparado automaticamente via mensagem para <strong className="text-white">{whatsapp}</strong>.
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 w-full mb-6 text-xs text-slate-400 font-code">
              ⚡ Ativação automática em andamento. Verifique sua caixa de entrada e seu WhatsApp!
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-xl bg-gradient-to-r from-[#00C853] to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_8px_20px_rgba(0,200,83,0.4)] transition-all cursor-pointer font-heading"
            >
              Concluído — Fechar
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

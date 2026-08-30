import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Mail,
  Eye,
  EyeOff,
  Check,
  User,
  Phone,
  Lock,
  X,
  ArrowLeft,
  Copy,
  CheckCircle2,
  Clock,
  Shield,
  CheckCircle,
  Tv,
  LockKeyhole,
  Plus,
  Minus,
  Loader2,
  BookOpen,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import {
  createNitroPix,
  createNitroCard,
  checkNitroPixStatus,
} from "@/lib/nitro.functions";

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

export function AccountCheckoutModal({
  open,
  plano,
  onClose,
}: AccountCheckoutModalProps) {
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
  // 1. Tela Extra Adicional (+1 Conexão Simultânea) - R$ 5,90 por tela
  const [telasExtras, setTelasExtras] = useState(0);
  const telaExtraUnit = 5.9;

  // 2. Conteúdo Adulto Premium - R$ 12,90 fixo
  const [pacoteAdulto, setPacoteAdulto] = useState(false);
  const pacoteAdultoPrice = 12.9;

  // 3. CristoFlix Infantil (Entretenimento Bíblico) - R$ 7,90 fixo
  const [pacoteCristoFlix, setPacoteCristoFlix] = useState(false);
  const pacoteCristoFlixPrice = 7.9;

  // Payment Method State: 'pix' | 'cartao' (Boleto removido)
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "cartao">("pix");

  // Credit Card Form State
  const [numCartao, setNumCartao] = useState("");
  const [nomeCartao, setNomeCartao] = useState("");
  const [validadeCartao, setValidadeCartao] = useState("");
  const [cvvCartao, setCvvCartao] = useState("");
  const [parcelas, setParcelas] = useState("1");

  // Payment State
  const [copied, setCopied] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(900); // 15 minutos
  const [loadingPix, setLoadingPix] = useState(false);
  const [pixPayload, setPixPayload] = useState("");
  const [pixQrBase64, setPixQrBase64] = useState<string | null>(null);
  const [caktoOrderId, setCaktoOrderId] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Trava a rolagem da página inteira no fundo e oculta a navbar quando o modal estiver aberto
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.classList.add("checkout-modal-open");
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.classList.remove("checkout-modal-open");
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.classList.remove("checkout-modal-open");
    };
  }, [open]);

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
      setPacoteCristoFlix(false);
      setTimerSeconds(900);
      setLoadingPix(false);
      setPixPayload("");
      setPixQrBase64(null);
      setCaktoOrderId(null);
      setApiError(null);
      setPaymentMethod("pix");
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

  // Polling automático para verificar liquidação do Pix na Nova API Nitro Pagamentos v2.0
  useEffect(() => {
    if (!open || step !== "PAGAMENTO" || !caktoOrderId) return;
    const pollInterval = setInterval(async () => {
      try {
        const res = await checkNitroPixStatus({
          data: { transactionId: caktoOrderId },
        });
        if (res.ok && res.paid) {
          setStep("SUCESSO");
        }
      } catch {
        // Ignora erros temporários de rede no polling
      }
    }, 3500);
    return () => clearInterval(pollInterval);
  }, [open, step, caktoOrderId]);

  if (!open || !plano || !mounted) return null;

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
  const cristoFlixPriceTotal = pacoteCristoFlix ? pacoteCristoFlixPrice : 0;
  const totalPriceNum =
    basePrice + telasPriceTotal + adultoPriceTotal + cristoFlixPriceTotal;
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

  const handlePayWithCard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!numCartao || !nomeCartao || !validadeCartao || !cvvCartao) return;
    setLoadingPix(true);
    setApiError(null);

    const [expMonth, expYear] = validadeCartao.split("/");

    try {
      const res = await createNitroCard({
        data: {
          amountNum: totalPriceNum,
          planName: plano.nome,
          planId: plano.id,
          name: nome,
          email,
          phone: whatsapp,
          document: cpf,
          cardNumber: numCartao,
          holderName: nomeCartao,
          expirationMonth: expMonth || "12",
          expirationYear: expYear || "26",
          cvv: cvvCartao,
          installments: parseInt(parcelas, 10) || 1,
          sourceUrl: window.location.href,
        },
      });

      if (res.ok && res.paid) {
        setStep("SUCESSO");
      } else {
        setApiError(
          res.error || "Pagamento recusado pela operadora do cartão."
        );
      }
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : "Erro ao processar cartão.";
      setApiError(errorMsg);
    } finally {
      setLoadingPix(false);
    }
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
        telasExtras:
          telasExtras > 0
            ? { qtd: telasExtras, subtotal: formatPrice(telasPriceTotal) }
            : null,
        pacoteAdulto: pacoteAdulto
          ? { price: formatPrice(pacoteAdultoPrice) }
          : null,
      },
      valorTotal: totalPriceStr,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem("dezpila_user_account", JSON.stringify(userData));

    try {
      // Dispara chamada real à Nova API PIX da Nitro Pagamentos (v2.0)
      const res = await createNitroPix({
        data: {
          amountNum: totalPriceNum,
          planName: plano.nome,
          planId: plano.id,
          name: nome,
          email,
          phone: whatsapp,
          document: cpf,
          sourceUrl: window.location.href,
        },
      });

      if (res.ok && res.qrCode) {
        setPixPayload(res.qrCode);
        setPixQrBase64(res.qrCodeBase64 || null);
        setCaktoOrderId(res.id);
        setStep("PAGAMENTO");
      } else {
        const errorMsg = res.error || "Não foi possível gerar a cobrança PIX.";
        setApiError(errorMsg);
      }
    } catch (err: unknown) {
      console.error("Erro ao conectar com Nova API Nitro Pagamentos:", err);
      const errorMsg =
        err instanceof Error ? err.message : "Erro ao gerar PIX.";
      setApiError(errorMsg);
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
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return createPortal(
    <div className="fixed inset-0 top-0 left-0 right-0 bottom-0 w-screen h-[100dvh] min-h-screen z-[9999999] flex items-center justify-center bg-black/90 backdrop-blur-md p-3 sm:p-4 overscroll-contain">
      <div className="relative w-full max-w-lg max-h-[88dvh] sm:max-h-[90vh] flex flex-col rounded-2xl sm:rounded-3xl border border-white/15 bg-gradient-to-b from-[#14161f] to-[#0e0f17] shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden my-auto">
        {/* Header Fixo do Modal */}
        <div className="shrink-0 flex items-center justify-between p-4 sm:p-5 border-b border-white/10 bg-[#14161f]/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            {(step === "CONFIRMACAO" ||
              step === "PAGAMENTO" ||
              step === "EXPIRADO") && (
              <button
                type="button"
                onClick={() => {
                  if (step === "CONFIRMACAO") setStep("CADASTRO");
                  if (step === "PAGAMENTO") setStep("CONFIRMACAO");
                  if (step === "EXPIRADO") setStep("CADASTRO");
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Voltar"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}

            {/* Logo DezPila */}
            <div className="flex items-center gap-2 text-sm sm:text-base font-bold tracking-tighter uppercase text-white font-heading shrink-0">
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
              <span className="text-[11px] font-code text-[#970202] font-semibold block truncate max-w-[170px] sm:max-w-none">
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

        {/* Corpo com Rolagem Interna Isolada */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 overscroll-contain">
          {/* Mensagem de Erro se houver */}
          {apiError && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-code flex items-center gap-2">
              <X className="h-4 w-4 shrink-0" />
              <span>{apiError}</span>
            </div>
          )}

          {/* PASSO 1: Form de Cadastro de Conta */}
          {step === "CADASTRO" && (
            <form onSubmit={handleCadastroSubmit}>
              <p className="mb-3.5 text-xs text-slate-400 font-body">
                Preencha seus dados para criar sua conta DezPila e liberar seu
                acesso imediatamente.
              </p>

              {/* Nome Completo */}
              <label className="mb-1 ml-0.5 block text-[11px] font-semibold text-slate-300">
                Nome Completo
              </label>
              <div className="relative mb-2.5">
                <input
                  type="text"
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Seu nome completo"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2 px-3.5 pr-10 text-xs text-slate-100 outline-none focus:border-[#10B981] focus:shadow-[0_0_0_3px_rgba(16,185,129,0.2)] transition-all"
                />
                <User className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>

              {/* CPF */}
              <label className="mb-1 ml-0.5 block text-[11px] font-semibold text-slate-300">
                CPF (Documento para ativação)
              </label>
              <div className="relative mb-2.5">
                <input
                  type="text"
                  required
                  value={cpf}
                  onChange={(e) => setCpf(maskCpf(e.target.value))}
                  placeholder="000.000.000-00"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2 px-3.5 pr-10 text-xs text-slate-100 outline-none focus:border-[#10B981] focus:shadow-[0_0_0_3px_rgba(16,185,129,0.2)] transition-all"
                />
                <Shield className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>

              {/* Email */}
              <label className="mb-1 ml-0.5 block text-[11px] font-semibold text-slate-300">
                E-mail para Acesso à Plataforma
              </label>
              <div className="relative mb-2.5">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="voce@email.com"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2 px-3.5 pr-10 text-xs text-slate-100 outline-none focus:border-[#10B981] focus:shadow-[0_0_0_3px_rgba(16,185,129,0.2)] transition-all"
                />
                <Mail className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>

              {/* Senha */}
              <label className="mb-1 ml-0.5 block text-[11px] font-semibold text-slate-300">
                Senha
              </label>
              <div className="relative mb-2.5">
                <input
                  type={verSenha ? "text" : "password"}
                  required
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Crie uma senha de acesso"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2 px-3.5 pr-10 text-xs text-slate-100 outline-none focus:border-[#10B981] focus:shadow-[0_0_0_3px_rgba(16,185,129,0.2)] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setVerSenha((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer"
                  aria-label={verSenha ? "Ocultar senha" : "Mostrar senha"}
                >
                  {verSenha ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {/* WhatsApp */}
              <label className="mb-1 ml-0.5 block text-[11px] font-semibold text-slate-300">
                WhatsApp
              </label>
              <div className="relative mb-3">
                <input
                  type="tel"
                  required
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(maskWhatsapp(e.target.value))}
                  placeholder="(00) 00000-0000"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2 px-3.5 pr-10 text-xs text-slate-100 outline-none focus:border-[#10B981] focus:shadow-[0_0_0_3px_rgba(16,185,129,0.2)] transition-all"
                />
                <Phone className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>

              {/* Checkbox Lembrar */}
              <div className="mb-4 flex items-center justify-between text-[11.5px] text-slate-400">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={lembrar}
                    onChange={(e) => setLembrar(e.target.checked)}
                    className="h-3.5 w-3.5 rounded border-white/20 bg-white/5 text-[#10B981] focus:ring-0"
                  />
                  <span>Lembrar meus dados para acesso rápido</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#34D399] hover:to-[#10B981] py-3 text-xs font-bold uppercase tracking-wider text-white shadow-[0_8px_20px_rgba(16,185,129,0.45)] transition-all cursor-pointer font-heading flex items-center justify-center gap-2"
              >
                <span>Continuar para o Pagamento</span>
                <Check className="h-4 w-4" />
              </button>

              <div className="mt-3 flex items-center justify-center gap-2 text-[10.5px] text-slate-500 font-code">
                <Lock className="h-3 w-3 text-[#10B981]" />
                <span>Dados protegidos por criptografia SSL de 256 bits</span>
              </div>
            </form>
          )}

          {/* PASSO 2: Tela de Confirmação, OrderBumps & Forma de Pagamento */}
          {step === "CONFIRMACAO" && (
            <div>
              {/* Card Resumo do Plano Base */}
              <div className="w-full rounded-2xl bg-white/[0.03] border border-white/10 p-3.5 mb-3 text-left">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-slate-300 uppercase font-heading">
                    Plano Selecionado
                  </span>
                  <span className="text-xs font-code font-bold text-[#10B981] bg-[#10B981]/15 px-2 py-0.5 rounded border border-[#10B981]/30">
                    {plano.nome}
                  </span>
                </div>
                <div className="flex justify-between items-baseline pt-0.5">
                  <span className="text-xs text-slate-400 font-code">
                    {plano.desc}
                  </span>
                  <span className="text-sm sm:text-base font-extrabold text-white font-heading">
                    R$ {plano.preco}{" "}
                    <span className="text-xs font-normal text-slate-400 font-code">
                      {plano.periodo}
                    </span>
                  </span>
                </div>
              </div>

              <div className="mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-heading">
                  Opcionais Recomendados:
                </span>
              </div>

              {/* ORDER BUMP 1: Tela Extra Adicional (+1 Conexão Simultânea) */}
              <div
                className={`relative overflow-hidden rounded-2xl border transition-all p-3 mb-2.5 ${
                  telasExtras > 0
                    ? "bg-[#10B981]/10 border-[#10B981] shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                    : "bg-white/[0.02] border-white/10"
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-xl bg-white/5 border border-white/10 text-white shrink-0 mt-0.5">
                    <Tv className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <span className="text-xs font-extrabold uppercase text-white tracking-wide font-heading">
                        Tela Extra (+1 Conexão)
                      </span>
                      <span className="text-[11px] font-bold font-code text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded shrink-0">
                        R$ 5,90 / tela
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 font-body leading-relaxed mb-2">
                      Assista simultaneamente em mais aparelhos ou celular.
                    </p>

                    {/* Seletor de Quantidade */}
                    <div className="flex items-center justify-between pt-1.5 border-t border-white/10">
                      <span className="text-[11px] font-semibold text-slate-300">
                        Quantidade de telas:
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setTelasExtras((prev) => Math.max(0, prev - 1))
                          }
                          disabled={telasExtras === 0}
                          className="flex h-6 w-6 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-slate-200 hover:bg-white/10 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-5 text-center text-xs font-bold text-white font-code">
                          {telasExtras}
                        </span>
                        <button
                          type="button"
                          onClick={() => setTelasExtras((prev) => prev + 1)}
                          className="flex h-6 w-6 items-center justify-center rounded-lg border border-[#10B981] bg-[#10B981]/30 text-white hover:bg-[#10B981] cursor-pointer transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ORDER BUMP 2: Conteúdo Adulto VIP (Vazados Privacy & OnlyFans) */}
              <div
                className={`relative overflow-hidden rounded-2xl border transition-all p-3 mb-3 cursor-pointer ${
                  pacoteAdulto
                    ? "bg-[#10B981]/10 border-[#10B981] shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                    : "bg-white/[0.02] border-white/10 hover:border-white/20"
                }`}
                onClick={() => setPacoteAdulto(!pacoteAdulto)}
              >
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5">
                    <span
                      className={
                        "flex h-4 w-4 items-center justify-center rounded-md border-[1.5px] transition-colors " +
                        (pacoteAdulto
                          ? "border-[#10B981] bg-[#10B981] text-white"
                          : "border-white/30 bg-white/5 text-transparent")
                      }
                    >
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <span className="text-xs font-extrabold uppercase text-white tracking-wide font-heading flex items-center gap-1">
                        <LockKeyhole className="h-3.5 w-3.5 text-amber-400" />
                        Conteúdo Adulto VIP (+18 Hot)
                      </span>
                      <span className="text-[11px] font-bold font-code text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded shrink-0">
                        + R$ 12,90
                      </span>
                    </div>

                    {/* Badge Vazados */}
                    <div className="my-1">
                      <span className="text-[10px] font-bold font-code text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Vazados Privacy & OnlyFans VIP
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-300 font-body leading-relaxed">
                      Acesso exclusivo ao acervo privado de influencers, fotos e vídeos vazados do Privacy/OnlyFans.
                    </p>
                  </div>
                </div>
              </div>

              {/* ORDER BUMP 3: CristoFlix Infantil (Entretenimento Bíblico Edificante) */}
              <div
                className={`relative overflow-hidden rounded-2xl border transition-all p-3 mb-3 cursor-pointer ${
                  pacoteCristoFlix
                    ? "bg-[#10B981]/10 border-[#10B981] shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                    : "bg-white/[0.02] border-white/10 hover:border-white/20"
                }`}
                onClick={() => setPacoteCristoFlix(!pacoteCristoFlix)}
              >
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5">
                    <span
                      className={
                        "flex h-4 w-4 items-center justify-center rounded-md border-[1.5px] transition-colors " +
                        (pacoteCristoFlix
                          ? "border-[#10B981] bg-[#10B981] text-white"
                          : "border-white/30 bg-white/5 text-transparent")
                      }
                    >
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <span className="text-xs font-extrabold uppercase text-white tracking-wide font-heading flex items-center gap-1">
                        <BookOpen className="h-3.5 w-3.5 text-cyan-400" />
                        CristoFlix Infantil (Bíblico & Educativo)
                      </span>
                      <span className="text-[11px] font-bold font-code text-cyan-400 bg-cyan-400/10 px-1.5 py-0.5 rounded shrink-0">
                        + R$ 7,90
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 font-body leading-relaxed">
                      Desenhos animados, histórias bíblicas e valores cristãos edificantes para proteger e ensinar suas crianças.
                    </p>
                  </div>
                </div>
              </div>

              {/* SELEÇÃO DA FORMA DE PAGAMENTO (PIX OU CARTÃO) */}
              <div className="mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-heading block mb-1.5">
                  Forma de Pagamento:
                </span>
                <div className="grid grid-cols-2 gap-2">
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
                    <span className="text-[9.5px] font-code text-slate-300 mt-0.5">
                      Aprovação Instantânea
                    </span>
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
                    <span className="text-[9.5px] font-code text-slate-300 mt-0.5">
                      Em até 12x
                    </span>
                  </button>
                </div>
              </div>

              {/* FORMULÁRIO DE CARTÃO DE CRÉDITO */}
              {paymentMethod === "cartao" && (
                <form
                  onSubmit={handlePayWithCard}
                  className="w-full mb-3 space-y-2.5 animate-in fade-in duration-200"
                >
                  <div>
                    <label className="mb-0.5 block text-[11px] font-semibold text-slate-300">
                      Número do Cartão
                    </label>
                    <input
                      type="text"
                      required
                      value={numCartao}
                      onChange={(e) =>
                        setNumCartao(maskCardNumber(e.target.value))
                      }
                      placeholder="0000 0000 0000 0000"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2 px-3 text-xs text-white font-mono outline-none focus:border-[#10B981]"
                    />
                  </div>

                  <div>
                    <label className="mb-0.5 block text-[11px] font-semibold text-slate-300">
                      Nome Impresso no Cartão
                    </label>
                    <input
                      type="text"
                      required
                      value={nomeCartao}
                      onChange={(e) =>
                        setNomeCartao(e.target.value.toUpperCase())
                      }
                      placeholder="COMO ESTÁ NO CARTÃO"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2 px-3 text-xs text-white uppercase outline-none focus:border-[#10B981]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="mb-0.5 block text-[11px] font-semibold text-slate-300">
                        Validade
                      </label>
                      <input
                        type="text"
                        required
                        value={validadeCartao}
                        onChange={(e) =>
                          setValidadeCartao(maskExpiry(e.target.value))
                        }
                        placeholder="MM/AA"
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2 px-3 text-xs text-white font-mono outline-none focus:border-[#10B981]"
                      />
                    </div>
                    <div>
                      <label className="mb-0.5 block text-[11px] font-semibold text-slate-300">
                        CVV
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={4}
                        value={cvvCartao}
                        onChange={(e) =>
                          setCvvCartao(e.target.value.replace(/\D/g, ""))
                        }
                        placeholder="123"
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2 px-3 text-xs text-white font-mono outline-none focus:border-[#10B981]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-0.5 block text-[11px] font-semibold text-slate-300">
                      Parcelamento
                    </label>
                    <select
                      value={parcelas}
                      onChange={(e) => setParcelas(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-[#14161f] py-2 px-3 text-xs text-white outline-none focus:border-[#10B981]"
                    >
                      <option value="1">
                        1x de R$ {totalPriceStr} (Sem Juros)
                      </option>
                      <option value="2">
                        2x de R$ {formatPrice(totalPriceNum / 2)}
                      </option>
                      <option value="3">
                        3x de R$ {formatPrice(totalPriceNum / 3)}
                      </option>
                      <option value="6">
                        6x de R$ {formatPrice(totalPriceNum / 6)}
                      </option>
                      <option value="12">
                        12x de R$ {formatPrice(totalPriceNum / 12)}
                      </option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={loadingPix}
                    className="w-full rounded-xl bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#34D399] hover:to-[#10B981] py-3 text-xs font-bold uppercase tracking-wider text-white shadow-[0_8px_20px_rgba(16,185,129,0.45)] transition-all cursor-pointer font-heading flex items-center justify-center gap-2 mt-1"
                  >
                    {loadingPix ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Processando Cartão...</span>
                      </>
                    ) : (
                      <span>Pagar R$ {totalPriceStr} no Cartão →</span>
                    )}
                  </button>
                </form>
              )}

              {/* VALOR TOTAL DO PEDIDO E BOTÃO PIX */}
              {paymentMethod === "pix" && (
                <>
                  <div className="w-full rounded-2xl bg-white/[0.03] border border-white/10 p-3 mb-3.5">
                    <div className="flex justify-between items-center text-xs text-slate-400 font-code mb-1">
                      <span>Plano {plano.nome}:</span>
                      <span className="text-slate-200">R$ {plano.preco}</span>
                    </div>
                    {telasExtras > 0 && (
                      <div className="flex justify-between items-center text-xs text-emerald-400 font-code mb-1 animate-in fade-in duration-200">
                        <span>Telas Extras ({telasExtras}x):</span>
                        <span>+ R$ {formatPrice(telasPriceTotal)}</span>
                      </div>
                    )}
                    {pacoteAdulto && (
                      <div className="flex justify-between items-center text-xs text-amber-400 font-code mb-1 animate-in fade-in duration-200">
                        <span>Conteúdo Adulto:</span>
                        <span>+ R$ 12,90</span>
                      </div>
                    )}
                    {pacoteCristoFlix && (
                      <div className="flex justify-between items-center text-xs text-cyan-400 font-code mb-1 animate-in fade-in duration-200">
                        <span>CristoFlix Infantil:</span>
                        <span>+ R$ 7,90</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-white font-heading pt-1.5 border-t border-white/10 mt-1">
                      <span className="uppercase tracking-wider">
                        Valor Total a Pagar:
                      </span>
                      <span className="text-base text-emerald-400 font-heading">
                        R$ {totalPriceStr}
                      </span>
                    </div>
                  </div>

                  {/* Botão de Gerar PIX */}
                  <button
                    type="button"
                    disabled={loadingPix}
                    onClick={handleGerarPix}
                    className="w-full rounded-xl bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#34D399] hover:to-[#10B981] py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-[0_8px_20px_rgba(16,185,129,0.45)] transition-all hover:brightness-110 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed font-heading flex items-center justify-center gap-2"
                  >
                    {loadingPix ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Gerando PIX...</span>
                      </>
                    ) : (
                      <span>Gerar PIX de R$ {totalPriceStr} →</span>
                    )}
                  </button>
                </>
              )}
            </div>
          )}

          {/* PASSO 3: Tela de Pagamento PIX */}
          {step === "PAGAMENTO" && (
            <div className="flex flex-col items-center text-center">
              {/* Resumo do Pedido */}
              <div className="w-full rounded-2xl bg-white/[0.03] border border-white/10 p-3 mb-3 text-left">
                <div className="flex justify-between items-center mb-1.5 pb-1.5 border-b border-white/10">
                  <span className="text-xs font-bold text-slate-300 uppercase font-heading">
                    Resumo do Pedido
                  </span>
                  <span className="text-xs font-code font-bold text-[#10B981] bg-[#10B981]/15 px-2 py-0.5 rounded border border-[#10B981]/30">
                    {plano.nome}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-400 font-code mb-0.5">
                  <span>Cliente:</span>
                  <span className="text-slate-200 font-semibold">{nome}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-400 font-code mb-0.5">
                  <span>Acesso:</span>
                  <span className="text-slate-200">{email}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-400 font-code pt-1 border-t border-white/5 mt-1">
                  <span>Total a Pagar:</span>
                  <span className="text-sm font-bold text-white font-heading">
                    R$ {totalPriceStr}
                  </span>
                </div>
              </div>

              {/* Status & Timer */}
              <div className="flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] text-xs font-code font-bold">
                <Clock className="h-3.5 w-3.5 animate-pulse" />
                <span>PIX Expira em: {formatTimer(timerSeconds)}</span>
              </div>

              {/* QR Code Container */}
              <div className="p-2.5 bg-white rounded-2xl shadow-xl mb-3 flex items-center justify-center">
                {pixQrBase64 ? (
                  <img
                    src={
                      pixQrBase64.startsWith("data:")
                        ? pixQrBase64
                        : `data:image/png;base64,${pixQrBase64}`
                    }
                    alt="QR Code Pix"
                    className="w-[155px] h-[155px] object-contain"
                  />
                ) : (
                  <QRCodeSVG
                    value={pixPayload || "https://dezpila.com.br"}
                    size={155}
                    level="M"
                  />
                )}
              </div>

              <p className="text-xs text-slate-300 font-code mb-2.5">
                Abra o app do seu banco e escaneie o QR Code acima para pagar
                via PIX.
              </p>

              {/* Chave PIX Copia e Cola */}
              <div className="w-full mb-3">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    readOnly
                    value={pixPayload}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.05] py-2 pl-3 pr-28 text-[11px] font-code text-slate-300 outline-none truncate"
                  />
                  <button
                    type="button"
                    onClick={handleCopyPix}
                    className="absolute right-1 py-1 px-3 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold font-heading uppercase transition-colors flex items-center gap-1 cursor-pointer shadow-[0_0_10px_rgba(16,185,129,0.3)]"
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

              <span className="text-[10.5px] font-code text-slate-400 flex items-center gap-1.5">
                <Lock className="h-3 w-3 text-[#10B981]" /> Processado via Nova
                API Nitro Pagamentos 100% Criptografado
              </span>
            </div>
          )}

          {/* PASSO 4: TELA DE PIX EXPIRADO */}
          {step === "EXPIRADO" && (
            <div className="flex flex-col items-center text-center py-2 animate-in zoom-in-95 duration-300">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/15 border-2 border-amber-500 text-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.4)]">
                <Clock className="h-8 w-8" strokeWidth={2.5} />
              </div>

              <span className="mb-1.5 inline-block rounded-full bg-amber-500/20 px-3 py-0.5 text-[10px] font-bold font-code uppercase tracking-widest text-amber-400 border border-amber-500/40">
                ⚠️ CÓDIGO PIX EXPIROU
              </span>

              <h3 className="text-lg sm:text-xl font-extrabold uppercase text-white font-heading tracking-tight mb-1.5">
                CHAVE PIX EXPIRADA!
              </h3>

              <p className="text-xs text-slate-300 font-body max-w-sm mb-4 leading-relaxed">
                O tempo limite de 15 minutos encerrou. Suas informações
                continuam salvas para gerar uma nova chave.
              </p>

              {/* Botão de Renovação da Chave PIX */}
              <button
                type="button"
                onClick={() => {
                  setTimerSeconds(900);
                  setStep("PAGAMENTO");
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#34D399] hover:to-[#10B981] text-xs font-bold font-heading text-white uppercase tracking-wider transition-all shadow-[0_8px_20px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2 cursor-pointer mb-2"
              >
                <span>Gerar Nova Chave PIX</span>
              </button>

              <button
                type="button"
                onClick={() => setStep("CADASTRO")}
                className="w-full py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
              >
                Editar dados de cadastro
              </button>
            </div>
          )}

          {/* PASSO 5: TELA VERDE — Pagamento Confirmado */}
          {step === "SUCESSO" && (
            <div className="flex flex-col items-center text-center py-2 animate-in zoom-in-95 duration-300">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#00C853]/15 border-2 border-[#00C853] text-[#00C853] shadow-[0_0_30px_rgba(0,200,83,0.5)]">
                <CheckCircle className="h-8 w-8" strokeWidth={2.5} />
              </div>

              <span className="mb-1.5 inline-block rounded-full bg-[#00C853]/20 px-3 py-0.5 text-[10px] font-bold font-code uppercase tracking-widest text-[#00C853] border border-[#00C853]/40">
                ✓ PAGAMENTO IDENTIFICADO
              </span>

              <h3 className="text-lg sm:text-xl font-extrabold uppercase text-white font-heading tracking-tight mb-1.5">
                PAGAMENTO CONFIRMADO COM SUCESSO!
              </h3>

              <p className="text-xs text-slate-300 font-body max-w-sm mb-4 leading-relaxed">
                Olá, <strong className="text-white font-semibold">{nome}</strong>!
                O pagamento do seu pedido do plano{" "}
                <strong className="text-[#00C853]">{plano.nome}</strong> no valor
                de <strong className="text-white">R$ {totalPriceStr}</strong> foi
                aprovado.
              </p>

              <div className="w-full space-y-2.5 mb-4 text-left">
                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-[#00C853]/10 border border-[#00C853]/30">
                  <Mail className="h-4 w-4 text-[#00C853] shrink-0 mt-0.5" />
                  <div className="text-xs font-body">
                    <span className="font-bold text-white block mb-0.5">
                      Enviado por E-mail
                    </span>
                    <span className="text-slate-300 font-code text-[11px]">
                      Dados de acesso enviados para{" "}
                      <strong className="text-white">{email}</strong>.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-[#00C853]/10 border border-[#00C853]/30">
                  <Phone className="h-4 w-4 text-[#00C853] shrink-0 mt-0.5" />
                  <div className="text-xs font-body">
                    <span className="font-bold text-white block mb-0.5">
                      Enviado por WhatsApp
                    </span>
                    <span className="text-slate-300 font-code text-[11px]">
                      Disparado automaticamente para{" "}
                      <strong className="text-white">{whatsapp}</strong>.
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full rounded-xl bg-gradient-to-r from-[#00C853] to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-[0_8px_20px_rgba(0,200,83,0.4)] transition-all cursor-pointer font-heading"
              >
                Concluído — Fechar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

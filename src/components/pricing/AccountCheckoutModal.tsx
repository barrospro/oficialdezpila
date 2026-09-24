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
  ShieldCheck,
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
    <div className="fixed inset-0 top-0 left-0 right-0 bottom-0 w-screen h-[100dvh] min-h-screen z-[9999999] flex items-center justify-center bg-black/60 backdrop-blur-md p-3 sm:p-4 overscroll-contain">
      <div className="relative w-full max-w-[440px] max-h-[90dvh] sm:max-h-[92vh] flex flex-col rounded-3xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.2)] border border-slate-100 overflow-hidden my-auto animate-in zoom-in-95 duration-200">
        
        {/* Botão Fechar no Canto Superior Direito da Card Branca */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 p-1.5 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Fechar"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Top Header Dark Box Moderno e Nítido */}
        <div className="mx-4 mt-4 mb-2 shrink-0 rounded-2xl bg-gradient-to-r from-[#1C232B] via-[#222B34] to-[#1C232B] border border-white/10 p-3 sm:p-3.5 text-white flex items-center justify-between shadow-md z-10">
          <div className="flex items-center gap-3 min-w-0 pr-2">
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
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                aria-label="Voltar"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            )}

            {/* Badge Nítido e Ampliado da Logo Mercado Pago */}
            <div className="flex items-center shrink-0">
              <div className="flex items-center justify-center bg-white px-3 py-1 rounded-xl border border-white/40 shadow-xs h-8 sm:h-8.5 min-w-[105px] sm:min-w-[115px]">
                <img
                  src="/brand/mercado-pago.svg"
                  alt="Mercado Pago"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "https://cdn.worldvectorlogo.com/logos/cd4804d4-fa18-4481-8595-e4fff80e6ce8/mercado-pago-1.svg";
                  }}
                  className="h-5 sm:h-5.5 w-auto max-w-full object-contain"
                />
              </div>
            </div>

            <div className="h-5 w-[1px] bg-white/20 shrink-0 mx-0.5" />

            <div className="flex items-center gap-1.5 truncate">
              <ShieldCheck className="h-4 w-4 text-[#009EE3] shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-white tracking-tight font-heading truncate">
                Pagamento Seguro
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center size-6 rounded-full bg-[#009EE3]/20 border border-[#009EE3]/40 text-[#009EE3] shrink-0">
            <Check className="h-3.5 w-3.5 text-[#009EE3]" strokeWidth={3} />
          </div>
        </div>

        {/* Corpo com Rolagem Interna Isolada */}
        <div className="flex-1 overflow-y-auto px-5 py-3 overscroll-contain bg-white">
          {/* Mensagem de Erro se houver */}
          {apiError && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-code flex items-center gap-2">
              <X className="h-4 w-4 shrink-0" />
              <span>{apiError}</span>
            </div>
          )}

          {/* PASSO 1: FORMULÁRIO DADOS DO PAGAMENTO */}
          {step === "CADASTRO" && (
            <form onSubmit={handleCadastroSubmit}>
              <h3 className="text-xs font-extrabold uppercase tracking-wide text-slate-800 font-heading mb-3">
                DADOS DO PAGAMENTO
              </h3>

              {/* Nome Completo */}
              <div className="mb-2.5">
                <label className="mb-1 block text-xs font-semibold text-slate-700 font-body">
                  Nome Completo
                </label>
                <input
                  type="text"
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-[#D0D5DD] bg-[#F2F4F7] py-2.5 px-3.5 text-xs font-body text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-[#009EE3] focus:ring-2 focus:ring-[#009EE3]/25 transition-all"
                />
              </div>

              {/* CPF */}
              <div className="mb-2.5">
                <label className="mb-1 block text-xs font-semibold text-slate-700 font-body">
                  CPF
                </label>
                <input
                  type="text"
                  required
                  value={cpf}
                  onChange={(e) => setCpf(maskCpf(e.target.value))}
                  placeholder="000.000.000-00"
                  className="w-full rounded-xl border border-[#D0D5DD] bg-[#F2F4F7] py-2.5 px-3.5 text-xs font-body text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-[#009EE3] focus:ring-2 focus:ring-[#009EE3]/25 transition-all"
                />
              </div>

              {/* Email */}
              <div className="mb-2.5">
                <label className="mb-1 block text-xs font-semibold text-slate-700 font-body">
                  E-mail
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="johndoe@email.com"
                  className="w-full rounded-xl border border-[#D0D5DD] bg-[#F2F4F7] py-2.5 px-3.5 text-xs font-body text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-[#009EE3] focus:ring-2 focus:ring-[#009EE3]/25 transition-all"
                />
              </div>

              {/* Senha */}
              <div className="mb-2.5">
                <label className="mb-1 block text-xs font-semibold text-slate-700 font-body">
                  Senha
                </label>
                <div className="relative">
                  <input
                    type={verSenha ? "text" : "password"}
                    required
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="Crie uma senha"
                    className="w-full rounded-xl border border-[#D0D5DD] bg-[#F2F4F7] py-2.5 px-3.5 pr-10 text-xs font-body text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-[#009EE3] focus:ring-2 focus:ring-[#009EE3]/25 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setVerSenha((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                    aria-label={verSenha ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {verSenha ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="mb-3.5">
                <label className="mb-1 block text-xs font-semibold text-slate-700 font-body">
                  WhatsApp
                </label>
                <input
                  type="tel"
                  required
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(maskWhatsapp(e.target.value))}
                  placeholder="11 98765-4321"
                  className="w-full rounded-xl border border-[#D0D5DD] bg-[#F2F4F7] py-2.5 px-3.5 text-xs font-body text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-[#009EE3] focus:ring-2 focus:ring-[#009EE3]/25 transition-all"
                />
              </div>

              {/* RESUMO DO PEDIDO */}
              <div className="mt-4 pt-3 border-t border-slate-200">
                <h3 className="text-xs font-extrabold uppercase tracking-wide text-slate-800 font-heading mb-2">
                  RESUMO DO PEDIDO
                </h3>

                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="text-xs font-bold text-slate-900 font-body">
                    Plano {plano.nome}
                  </span>
                  <span className="text-xs font-bold text-slate-900 font-body">
                    R$ {plano.preco}{plano.periodo}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-body leading-snug">
                  DezPila
                </p>
                <p className="text-[11px] text-slate-500 font-body leading-snug mb-3">
                  Acesso +60.000 conteúdos, 4K HDR, Sem Anúncios
                </p>

                <div className="flex justify-between items-center text-xs font-extrabold text-slate-900 font-heading pt-2 border-t border-slate-200 mb-3.5">
                  <span className="uppercase tracking-wider">TOTAL A PAGAR:</span>
                  <span>R$ {totalPriceStr}</span>
                </div>
              </div>

              {/* Botão idêntico ao da imagem */}
              <button
                type="submit"
                className="w-full rounded-xl bg-[#009EE3] hover:bg-[#0081B7] py-3.5 px-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white shadow-md shadow-[#009EE3]/25 transition-all cursor-pointer font-heading flex items-center justify-center gap-2 active:scale-[0.99]"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M12 2L4.5 9.5L12 17L19.5 9.5L12 2ZM12 14.2L7.3 9.5L12 4.8L16.7 9.5L12 14.2ZM12 18.5L8.5 15L7 16.5L12 21.5L17 16.5L15.5 15L12 18.5Z" />
                </svg>
                <span>PAGAR COM PIX MERCADO PAGO</span>
              </button>

              <div className="mt-3 text-center flex items-center justify-center gap-1.5 text-[11.5px] font-medium text-[#007EA7] font-body">
                <Shield className="h-3.5 w-3.5 text-[#009EE3]" />
                <span>Compra Protegida pelo Mercado Pago - Criptografia SSL</span>
              </div>
            </form>
          )}

          {/* PASSO 2: CONFIRMAÇÃO E ORDERBUMPS */}
          {step === "CONFIRMACAO" && (
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wide text-slate-800 font-heading mb-2.5">
                RESUMO DO PEDIDO
              </h3>

              <div className="w-full rounded-2xl bg-slate-50 border border-slate-200/90 p-3 mb-3 text-left">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-slate-900 font-body">
                    Plano {plano.nome}
                  </span>
                  <span className="text-xs font-bold text-[#009EE3] font-code">
                    R$ {plano.preco} {plano.periodo}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-body">
                  {plano.desc}
                </p>
              </div>

              <div className="mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-heading">
                  Opcionais Recomendados:
                </span>
              </div>

              {/* ORDER BUMP 1 */}
              <div
                className={`relative overflow-hidden rounded-2xl border transition-all p-3 mb-2.5 ${
                  telasExtras > 0
                    ? "bg-[#EBF5FA]/70 border-[#009EE3] shadow-xs"
                    : "bg-slate-50/50 border-slate-200/80 hover:border-slate-300"
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-xl bg-white border border-slate-200 text-[#009EE3] shrink-0 mt-0.5 shadow-sm">
                    <Tv className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <span className="text-xs font-extrabold uppercase text-slate-900 tracking-wide font-heading">
                        Tela Extra (+1 Conexão)
                      </span>
                      <span className="text-[11px] font-bold font-code text-[#007EA7] bg-[#EBF5FA] px-1.5 py-0.5 rounded shrink-0">
                        R$ 5,90 / tela
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-body leading-relaxed mb-2">
                      Assista simultaneamente em mais aparelhos ou celular.
                    </p>

                    <div className="flex items-center justify-between pt-1.5 border-t border-slate-200/60">
                      <span className="text-[11px] font-semibold text-slate-700">
                        Quantidade de telas:
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setTelasExtras((prev) => Math.max(0, prev - 1))
                          }
                          disabled={telasExtras === 0}
                          className="flex h-6 w-6 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition-colors shadow-sm"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-5 text-center text-xs font-bold text-slate-900 font-code">
                          {telasExtras}
                        </span>
                        <button
                          type="button"
                          onClick={() => setTelasExtras((prev) => prev + 1)}
                          className="flex h-6 w-6 items-center justify-center rounded-lg border border-[#009EE3] bg-[#009EE3] text-white hover:bg-[#0081B7] cursor-pointer transition-colors shadow-sm"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ORDER BUMP 2 */}
              <div
                className={`relative overflow-hidden rounded-2xl border transition-all p-3 mb-2.5 cursor-pointer ${
                  pacoteAdulto
                    ? "bg-[#EBF5FA]/70 border-[#009EE3] shadow-xs"
                    : "bg-slate-50/50 border-slate-200/80 hover:border-slate-300"
                }`}
                onClick={() => setPacoteAdulto(!pacoteAdulto)}
              >
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5">
                    <span
                      className={
                        "flex h-4 w-4 items-center justify-center rounded-md border transition-colors " +
                        (pacoteAdulto
                          ? "border-[#009EE3] bg-[#009EE3] text-white"
                          : "border-slate-300 bg-white text-transparent")
                      }
                    >
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <span className="text-xs font-extrabold uppercase text-slate-900 tracking-wide font-heading flex items-center gap-1">
                        <LockKeyhole className="h-3.5 w-3.5 text-amber-600" />
                        Conteúdo Adulto VIP (+18 Hot)
                      </span>
                      <span className="text-[11px] font-bold font-code text-amber-800 bg-amber-100/70 px-1.5 py-0.5 rounded shrink-0">
                        + R$ 12,90
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-body leading-relaxed">
                      Acesso exclusivo ao acervo privado de influencers, fotos e vídeos vazados do Privacy/OnlyFans.
                    </p>
                  </div>
                </div>
              </div>

              {/* ORDER BUMP 3 */}
              <div
                className={`relative overflow-hidden rounded-2xl border transition-all p-3 mb-3 cursor-pointer ${
                  pacoteCristoFlix
                    ? "bg-[#EBF5FA]/70 border-[#009EE3] shadow-xs"
                    : "bg-slate-50/50 border-slate-200/80 hover:border-slate-300"
                }`}
                onClick={() => setPacoteCristoFlix(!pacoteCristoFlix)}
              >
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5">
                    <span
                      className={
                        "flex h-4 w-4 items-center justify-center rounded-md border transition-colors " +
                        (pacoteCristoFlix
                          ? "border-[#009EE3] bg-[#009EE3] text-white"
                          : "border-slate-300 bg-white text-transparent")
                      }
                    >
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <span className="text-xs font-extrabold uppercase text-slate-900 tracking-wide font-heading flex items-center gap-1">
                        <BookOpen className="h-3.5 w-3.5 text-cyan-600" />
                        CristoFlix Infantil (Bíblico & Educativo)
                      </span>
                      <span className="text-[11px] font-bold font-code text-cyan-800 bg-cyan-100/70 px-1.5 py-0.5 rounded shrink-0">
                        + R$ 7,90
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-body leading-relaxed">
                      Desenhos animados, histórias bíblicas e valores cristãos edificantes para proteger e ensinar suas crianças.
                    </p>
                  </div>
                </div>
              </div>

              {/* TOTAL */}
              <div className="flex justify-between items-center text-xs font-extrabold text-slate-900 font-heading pt-2 border-t border-slate-200 mb-3.5">
                <span className="uppercase tracking-wider">TOTAL A PAGAR:</span>
                <span className="text-base text-[#009EE3]">R$ {totalPriceStr}</span>
              </div>

              <button
                type="button"
                disabled={loadingPix}
                onClick={handleGerarPix}
                className="w-full rounded-xl bg-[#009EE3] hover:bg-[#0081B7] py-3.5 px-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white shadow-md shadow-[#009EE3]/25 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed font-heading flex items-center justify-center gap-2 active:scale-[0.99]"
              >
                {loadingPix ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Gerando PIX Mercado Pago...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                      <path d="M12 2L4.5 9.5L12 17L19.5 9.5L12 2ZM12 14.2L7.3 9.5L12 4.8L16.7 9.5L12 14.2ZM12 18.5L8.5 15L7 16.5L12 21.5L17 16.5L15.5 15L12 18.5Z" />
                    </svg>
                    <span>PAGAR COM PIX MERCADO PAGO</span>
                  </>
                )}
              </button>

              <div className="mt-3 text-center flex items-center justify-center gap-1.5 text-[11.5px] font-medium text-[#007EA7] font-body">
                <Shield className="h-3.5 w-3.5 text-[#009EE3]" />
                <span>Compra Protegida pelo Mercado Pago - Criptografia SSL</span>
              </div>
            </div>
          )}

          {/* PASSO 3: QR CODE PIX */}
          {step === "PAGAMENTO" && (
            <div className="flex flex-col items-center text-center">
              <div className="w-full rounded-2xl bg-slate-50 border border-slate-200 p-3 mb-3 text-left">
                <div className="flex justify-between items-center mb-1 pb-1 border-b border-slate-200">
                  <span className="text-xs font-bold text-slate-900 font-heading">
                    Plano {plano.nome}
                  </span>
                  <span className="text-xs font-bold text-[#009EE3] font-code">
                    R$ {totalPriceStr}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[11px] text-slate-600 font-body">
                  <span>Cliente: {nome}</span>
                  <span>{email}</span>
                </div>
              </div>

              {/* Status & Timer */}
              <div className="flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-[#EBF5FA] border border-[#009EE3]/30 text-[#007EA7] text-xs font-code font-bold">
                <Clock className="h-3.5 w-3.5 text-[#009EE3] animate-pulse" />
                <span>PIX Expira em: {formatTimer(timerSeconds)}</span>
              </div>

              {/* QR Code */}
              <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-md mb-3 flex items-center justify-center">
                {pixQrBase64 ? (
                  <img
                    src={
                      pixQrBase64.startsWith("data:")
                        ? pixQrBase64
                        : `data:image/png;base64,${pixQrBase64}`
                    }
                    alt="QR Code Pix Mercado Pago"
                    className="w-[160px] h-[160px] object-contain"
                  />
                ) : (
                  <QRCodeSVG
                    value={pixPayload || "https://dezpila.com.br"}
                    size={160}
                    level="M"
                  />
                )}
              </div>

              <p className="text-xs text-slate-600 font-body mb-3">
                Abra seu aplicativo de banco e escaneie o código QR acima para pagar via PIX Mercado Pago.
              </p>

              {/* PIX Copia e Cola */}
              <div className="w-full mb-3">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    readOnly
                    value={pixPayload}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-3 pr-28 text-[11px] font-code text-slate-800 outline-none truncate"
                  />
                  <button
                    type="button"
                    onClick={handleCopyPix}
                    className="absolute right-1 py-1.5 px-3 rounded-lg bg-[#009EE3] hover:bg-[#0081B7] text-white text-xs font-bold font-heading uppercase transition-colors flex items-center gap-1 cursor-pointer shadow-md shadow-[#009EE3]/25"
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

              {/* Selo Rodapé */}
              <div className="mt-2 text-center flex items-center justify-center gap-1.5 text-[11.5px] font-medium text-[#007EA7] font-body">
                <Shield className="h-3.5 w-3.5 text-[#009EE3]" />
                <span>Compra Protegida pelo Mercado Pago - Criptografia SSL</span>
              </div>
            </div>
          )}

          {/* PASSO 4: EXPIRADO */}
          {step === "EXPIRADO" && (
            <div className="flex flex-col items-center text-center py-2 animate-in zoom-in-95 duration-300">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 border-2 border-amber-400 text-amber-600 shadow-md shadow-amber-500/10">
                <Clock className="h-8 w-8" strokeWidth={2.5} />
              </div>

              <h3 className="text-lg font-extrabold uppercase text-slate-900 font-heading tracking-tight mb-1.5">
                CHAVE PIX EXPIRADA!
              </h3>

              <p className="text-xs text-slate-600 font-body max-w-sm mb-4 leading-relaxed">
                O tempo limite de 15 minutos encerrou. Gerar uma nova chave abaixo:
              </p>

              <button
                type="button"
                onClick={() => {
                  setTimerSeconds(900);
                  setStep("PAGAMENTO");
                }}
                className="w-full py-3 rounded-xl bg-[#009EE3] hover:bg-[#0081B7] text-xs font-extrabold font-heading text-white uppercase tracking-wider transition-all shadow-md shadow-[#009EE3]/20 flex items-center justify-center gap-2 cursor-pointer mb-2"
              >
                <span>Gerar Nova Chave PIX</span>
              </button>
            </div>
          )}

          {/* PASSO 5: SUCESSO */}
          {step === "SUCESSO" && (
            <div className="flex flex-col items-center text-center py-2 animate-in zoom-in-95 duration-300">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#EBF5FA] border-2 border-[#009EE3] text-[#009EE3] shadow-lg shadow-[#009EE3]/20">
                <CheckCircle className="h-8 w-8" strokeWidth={2.5} />
              </div>

              <h3 className="text-lg font-extrabold uppercase text-slate-900 font-heading tracking-tight mb-1.5">
                PAGAMENTO CONFIRMADO!
              </h3>

              <p className="text-xs text-slate-600 font-body max-w-sm mb-4 leading-relaxed">
                Olá, <strong className="text-slate-900 font-semibold">{nome}</strong>!
                Seu acesso do plano <strong className="text-[#009EE3]">{plano.nome}</strong> foi ativado com sucesso!
              </p>

              <button
                type="button"
                onClick={onClose}
                className="w-full rounded-xl bg-[#009EE3] hover:bg-[#0081B7] py-3.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-lg shadow-[#009EE3]/25 transition-all cursor-pointer font-heading"
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

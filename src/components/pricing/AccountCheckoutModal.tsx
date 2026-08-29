import { useState, useEffect } from "react";
import { Mail, Eye, EyeOff, Check, User, Phone, Lock, X, ArrowLeft, Copy, CheckCircle2, Clock } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

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

type Step = "CADASTRO" | "PAGAMENTO";

export function AccountCheckoutModal({ open, plano, onClose }: AccountCheckoutModalProps) {
  const [step, setStep] = useState<Step>("CADASTRO");

  // Form State
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [verSenha, setVerSenha] = useState(false);
  const [whatsapp, setWhatsapp] = useState("");
  const [lembrar, setLembrar] = useState(true);
  const [copied, setCopied] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(900); // 15 minutos

  // Restaura do localStorage se existir
  useEffect(() => {
    if (open) {
      const savedUser = localStorage.getItem("dezpila_user_account");
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          if (parsed.nome) setNome(parsed.nome);
          if (parsed.email) setEmail(parsed.email);
          if (parsed.whatsapp) setWhatsapp(parsed.whatsapp);
        } catch {
          // Ignore parse errors
        }
      }
      setStep("CADASTRO");
      setTimerSeconds(900);
    }
  }, [open]);

  // Timer para a etapa de pagamento
  useEffect(() => {
    if (!open || step !== "PAGAMENTO") return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [open, step]);

  if (!open || !plano) return null;

  const maskWhatsapp = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 11);
    if (d.length <= 2) return d;
    if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  };

  const handleCadastroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !email || !senha || !whatsapp) return;

    // Salva tudo no LocalStorage
    const userData = {
      nome,
      email,
      senha,
      whatsapp,
      planoId: plano.id,
      planoNome: plano.nome,
      planoPreco: plano.preco,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem("dezpila_user_account", JSON.stringify(userData));

    // Avança para tela de pagamento
    setStep("PAGAMENTO");
  };

  // Payload PIX para teste (pronto para receber API real do Pix)
  const mockPixPayload = `00020126580014br.gov.bcb.pix0136dezpila-checkout-${plano.id.toLowerCase()}-pix-key5204000053039865405${plano.preco.replace(",", ".")}5802BR5916DEZPILA STREAMING6009SAO PAULO62070503***6304E8A2`;

  const handleCopyPix = async () => {
    try {
      await navigator.clipboard.writeText(mockPixPayload);
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
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-[#14161f] to-[#0e0f17] p-6 sm:p-8 shadow-[0_30px_70px_rgba(0,0,0,0.8)]">
        
        {/* Header do Modal com botão fechar */}
        <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            {step === "PAGAMENTO" && (
              <button
                type="button"
                onClick={() => setStep("CADASTRO")}
                className="mr-1 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Voltar"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#970202] to-red-600 text-xs font-extrabold text-white shadow-[0_4px_14px_rgba(151,2,2,0.5)]">
              DP
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-white font-heading">
                {step === "CADASTRO" ? "Criar Sua Conta" : "Checkout de Pagamento"}
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
            <p className="mb-5 text-xs text-slate-400 font-body">
              Preencha seus dados para criar sua conta DezPila e liberar seu acesso imediatamente.
            </p>

            {/* Nome Completo */}
            <label className="mb-1.5 ml-0.5 block text-[12px] font-semibold text-slate-300">
              Nome Completo
            </label>
            <div className="relative mb-3.5">
              <input
                type="text"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Seu nome completo"
                className="w-full rounded-xl border-[1.5px] border-white/10 bg-white/[0.04] py-3 pl-4 pr-11 text-xs sm:text-sm text-slate-100 outline-none focus:border-[#970202] focus:shadow-[0_0_0_3px_rgba(151,2,2,0.2)] transition-all"
              />
              <User className="absolute right-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-500" />
            </div>

            {/* Email */}
            <label className="mb-1.5 ml-0.5 block text-[12px] font-semibold text-slate-300">
              E-mail para Acesso à Plataforma
            </label>
            <div className="relative mb-3.5">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="voce@email.com"
                className="w-full rounded-xl border-[1.5px] border-white/10 bg-white/[0.04] py-3 pl-4 pr-11 text-xs sm:text-sm text-slate-100 outline-none focus:border-[#970202] focus:shadow-[0_0_0_3px_rgba(151,2,2,0.2)] transition-all"
              />
              <Mail className="absolute right-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-500" />
            </div>

            {/* Senha */}
            <label className="mb-1.5 ml-0.5 block text-[12px] font-semibold text-slate-300">
              Senha
            </label>
            <div className="relative mb-3.5">
              <input
                type={verSenha ? "text" : "password"}
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Crie uma senha de acesso"
                className="w-full rounded-xl border-[1.5px] border-white/10 bg-white/[0.04] py-3 pl-4 pr-11 text-xs sm:text-sm text-slate-100 outline-none focus:border-[#970202] focus:shadow-[0_0_0_3px_rgba(151,2,2,0.2)] transition-all"
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
            <label className="mb-1.5 ml-0.5 block text-[12px] font-semibold text-slate-300">
              WhatsApp
            </label>
            <div className="relative mb-4">
              <input
                type="tel"
                required
                value={whatsapp}
                onChange={(e) => setWhatsapp(maskWhatsapp(e.target.value))}
                placeholder="(11) 99999-9999"
                className="w-full rounded-xl border-[1.5px] border-white/10 bg-white/[0.04] py-3 pl-4 pr-11 text-xs sm:text-sm text-slate-100 outline-none focus:border-[#970202] focus:shadow-[0_0_0_3px_rgba(151,2,2,0.2)] transition-all"
              />
              <Phone className="absolute right-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-500" />
            </div>

            {/* Checkbox */}
            <div className="mb-6 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setLembrar((v) => !v)}
                className="flex items-center gap-2.5 text-[12.5px] text-slate-400 cursor-pointer"
              >
                <span
                  className={
                    "flex h-[18px] w-[18px] items-center justify-center rounded-md border-[1.5px] transition-colors " +
                    (lembrar
                      ? "border-[#970202] bg-[#970202] text-white"
                      : "border-white/20 bg-white/5 text-transparent")
                  }
                >
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                Salvar meus dados nesta máquina
              </button>
            </div>

            {/* Botão de Avançar */}
            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-[#970202] to-red-700 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-[0_8px_20px_rgba(151,2,2,0.5)] transition-all hover:brightness-110 cursor-pointer font-heading"
            >
              Ir para o Pagamento →
            </button>
          </form>
        )}

        {/* PASSO 2: Tela de Pagamento PIX */}
        {step === "PAGAMENTO" && (
          <div className="flex flex-col items-center text-center">
            {/* Resumo do Pedido */}
            <div className="w-full rounded-2xl bg-white/[0.03] border border-white/10 p-4 mb-5 text-left">
              <div className="flex justify-between items-center mb-2 pb-2 border-b border-white/10">
                <span className="text-xs font-bold text-slate-300 uppercase font-heading">Resumo da Compra</span>
                <span className="text-xs font-code font-bold text-[#970202] bg-[#970202]/10 px-2 py-0.5 rounded">
                  {plano.nome}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-400 font-code mb-1">
                <span>Cliente:</span>
                <span className="text-slate-200 font-semibold">{nome}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-400 font-code mb-1">
                <span>Acesso:</span>
                <span className="text-slate-200">{email}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-400 font-code pt-1 border-t border-white/5">
                <span>Valor Total:</span>
                <span className="text-sm font-bold text-white font-heading">R$ {plano.preco} {plano.periodo}</span>
              </div>
            </div>

            {/* Status & Timer */}
            <div className="flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-[#32BCAD]/10 border border-[#32BCAD]/30 text-[#32BCAD] text-xs font-code font-bold">
              <Clock className="h-3.5 w-3.5 animate-pulse" />
              <span>PIX Expira em: {formatTimer(timerSeconds)}</span>
            </div>

            {/* QR Code Container */}
            <div className="p-3 bg-white rounded-2xl shadow-xl mb-4">
              <QRCodeSVG value={mockPixPayload} size={170} level="M" />
            </div>

            <p className="text-xs text-slate-300 font-code mb-3">
              Abra o app do seu banco e escaneie o QR Code acima para pagar.
            </p>

            {/* Chave PIX Copia e Cola */}
            <div className="w-full mb-4">
              <div className="relative flex items-center">
                <input
                  type="text"
                  readOnly
                  value={mockPixPayload}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.05] py-2.5 pl-3 pr-28 text-[11px] font-code text-slate-400 outline-none truncate"
                />
                <button
                  type="button"
                  onClick={handleCopyPix}
                  className="absolute right-1 py-1.5 px-3 rounded-lg bg-[#32BCAD] hover:bg-[#28a598] text-white text-xs font-bold font-heading uppercase transition-colors flex items-center gap-1 cursor-pointer"
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

            {/* Link de fallback Nitro */}
            <a
              href={plano.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-xs font-bold font-heading text-slate-200 uppercase tracking-wider transition-all block mb-2"
            >
              Ou Pagar no Checkout Oficial (Nitro) ↗
            </a>

            <span className="text-[10px] font-code text-slate-500 flex items-center gap-1">
              <Lock className="h-3 w-3" /> Pagamento 100% criptografado e seguro
            </span>
          </div>
        )}

      </div>
    </div>
  );
}

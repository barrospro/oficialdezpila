import { useState, useEffect } from "react";
import { Mail, Eye, EyeOff, Check, User, Phone, Lock, X, ArrowLeft, Copy, CheckCircle2, Clock, Shield, CheckCircle, Tv, LockKeyhole, Plus, Minus } from "lucide-react";
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

  // Payment State
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

  const handleGerarPix = () => {
    // Atualiza storage com o pedido completo (incluindo OrderBumps selecionados)
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

    setStep("PAGAMENTO");
  };

  // Payload PIX para teste (pronto para receber API real do Pix com valor total calculado)
  const mockPixPayload = `00020126580014br.gov.bcb.pix0136dezpila-checkout-${plano.id.toLowerCase()}-pix-key5204000053039865405${totalPriceStr.replace(",", ".")}5802BR5916DEZPILA STREAMING6009SAO PAULO62070503***6304E8A2`;

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

            {/* ORDER BUMP 2: Conteúdo Adulto Premium (Vazados Privacy / OnlyFans VIP) - R$ 12,90 */}
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
                      Conteúdo Adulto Premium (Vazados VIP)
                    </span>
                    <span className="text-xs font-bold font-code text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded shrink-0">
                      + R$ 12,90
                    </span>
                  </div>
                  <p className="text-[11.5px] text-slate-300 font-body leading-relaxed">
                    Acesso exclusivo ao acervo privado de influencers, conteúdos vazados Privacy e OnlyFans com senha pessoal.
                  </p>
                </div>
              </div>
            </div>

            {/* VALOR TOTAL DO PEDIDO */}
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

            {/* Botão de Gerar PIX (Verde Suave Alta Conversão) */}
            <button
              type="button"
              onClick={handleGerarPix}
              className="w-full rounded-xl bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#34D399] hover:to-[#10B981] py-4 text-sm font-bold uppercase tracking-wider text-white shadow-[0_8px_24px_rgba(16,185,129,0.45)] transition-all hover:brightness-110 cursor-pointer font-heading flex items-center justify-center gap-2"
            >
              <span>Gerar PIX de R$ {totalPriceStr} →</span>
            </button>
          </div>
        )}

        {/* PASSO 3: Tela de Pagamento PIX */}
        {step === "PAGAMENTO" && (
          <div className="flex flex-col items-center text-center">
            {/* Resumo do Pedido */}
            <div className="w-full rounded-2xl bg-white/[0.03] border border-white/10 p-4 mb-4 text-left">
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

            <span className="text-[11px] font-code text-slate-500 flex items-center gap-1 mt-1">
              <Lock className="h-3.5 w-3.5 text-slate-400" /> Pagamento 100% criptografado e seguro
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

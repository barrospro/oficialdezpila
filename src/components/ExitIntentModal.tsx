import { useState, useEffect } from "react";
import { ShieldCheck, X, Zap, CheckCircle2 } from "lucide-react";

export function ExitIntentModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Só exibe 1 vez por sessão
    if (sessionStorage.getItem("exit_intent_seen")) {
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Quando o cursor sobe para fechar a aba ou mudar de URL
      if (e.clientY <= 12 && !sessionStorage.getItem("exit_intent_seen")) {
        setIsOpen(true);
        sessionStorage.setItem("exit_intent_seen", "true");
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  const handleClaim = () => {
    setIsOpen(false);
    const el = document.getElementById("planos");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl bg-[#0e0e14] border border-brand/50 p-6 sm:p-8 text-center shadow-[0_0_60px_rgba(151,2,2,0.6)] animate-in zoom-in-95 duration-200">
        {/* Botão Fechar */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-white transition-colors cursor-pointer p-1"
          aria-label="Fechar"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Ícone de Escudo */}
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/15 border border-brand/40 text-brand shadow-[0_0_25px_var(--brand-glow)]">
          <ShieldCheck className="h-9 w-9" />
        </div>

        {/* Badge */}
        <span className="inline-block rounded-full bg-brand/20 border border-brand/40 px-3 py-1 text-[11px] font-bold font-code uppercase tracking-wider text-white mb-2 shadow-[0_0_10px_var(--brand-glow)]">
          🚨 ESPERE ANTES DE FECHAR A PÁGINA
        </span>

        {/* Título */}
        <h3 className="text-xl sm:text-2xl font-extrabold uppercase font-heading text-white tracking-tight mb-2">
          TESTE COM <span className="text-brand">GARANTIA TOTAL DE 7 DIAS!</span>
        </h3>

        {/* Descrição */}
        <p className="text-xs sm:text-sm text-slate-300 font-body leading-relaxed mb-5">
          Por que continuar pagando caro em mensalidades de TV? Assine o DezPila por apenas{" "}
          <strong className="text-white font-bold">R$ 10,00/mês</strong>. Se você não amar a
          qualidade 4K e a estabilidade, devolvemos 100% do seu dinheiro via PIX. O risco é todo nosso!
        </p>

        {/* Checklist */}
        <div className="space-y-2 text-left bg-white/[0.03] border border-white/10 rounded-xl p-3 mb-6 font-code text-xs text-slate-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-none" />
            <span>+2.000 Canais 4K + 60.000 Filmes & Séries</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-none" />
            <span>Instalação na Smart TV em menos de 2 minutos</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-none" />
            <span>Sem fidelidade: cancele quando quiser sem multas</span>
          </div>
        </div>

        {/* Botão de Ação Principal */}
        <button
          type="button"
          onClick={handleClaim}
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-brand to-rose-600 hover:from-rose-600 hover:to-brand text-white font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_25px_var(--brand-glow)] transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.02]"
        >
          <Zap className="h-4 w-4 text-amber-300" />
          <span>GARANTIR MEU ACESSO COM RISCO ZERO →</span>
        </button>

        {/* Link Descartar */}
        <button
          type="button"
          onClick={handleClose}
          className="mt-3 text-[11px] font-code text-slate-500 hover:text-slate-400 transition-colors cursor-pointer"
        >
          Não, prefiro continuar pagando caro em operadoras
        </button>
      </div>
    </div>
  );
}

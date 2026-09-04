import { useState, useEffect } from "react";
import { Zap, ShieldCheck } from "lucide-react";

export function StickyBottomBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Exibe a barra após rolar 400px para baixo
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToPlans = () => {
    const el = document.getElementById("planos");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Barra de Ação Rápida"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#000000]/95 backdrop-blur-xl border-t border-brand/40 py-2.5 px-4 shadow-[0_-10px_30px_rgba(0,0,0,0.9)] animate-in slide-in-from-bottom duration-300"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        {/* Lado Esquerdo: Resumo do Preço e Benefício */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-3">
          <div className="flex items-center gap-1.5">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-white font-heading font-extrabold text-xs sm:text-sm uppercase tracking-tight">
              Acesso VIP: <span className="text-brand">R$ 10,00/mês</span>
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[11px] font-code text-slate-400">
            <span className="flex items-center gap-1">
              <Zap className="h-3 w-3 text-amber-400" /> +2.000 Canais 4K
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3 w-3 text-emerald-400" /> Liberação Imediata
            </span>
          </div>
        </div>

        {/* Lado Direito: Botão de Chamada para Ação */}
        <button
          type="button"
          onClick={handleScrollToPlans}
          className="flex-none px-5 sm:px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand to-rose-600 hover:from-rose-600 hover:to-brand text-white font-heading font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_var(--brand-glow)] transition-all cursor-pointer hover:scale-105 active:scale-95"
        >
          Liberar Acesso →
        </button>
      </div>
    </aside>
  );
}

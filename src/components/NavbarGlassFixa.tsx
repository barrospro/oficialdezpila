import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { name: "Conteúdo", href: "#conteudo" },
  { name: "Planos", href: "#planos" },
  { name: "Dúvidas", href: "#faq" },
];

export function NavbarGlassFixa() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={
        "fixed left-1/2 top-7 sm:top-8 md:top-5 z-50 flex w-[calc(100%-16px)] sm:w-[calc(100%-48px)] max-w-3xl -translate-x-1/2 flex-col rounded-2xl border border-white/10 py-2 px-3 sm:px-4 md:py-3 md:pl-5 md:pr-3.5 backdrop-blur-xl transition-all duration-300 " +
        (scrolled
          ? "bg-[#050507]/95 shadow-[0_14px_40px_rgba(0,0,0,0.9)] border-[#970202]/30"
          : "bg-[#050507]/80 shadow-[0_14px_40px_rgba(0,0,0,0.7)]")
      }
    >
      <div className="flex items-center justify-between w-full gap-1">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-base font-bold tracking-tighter uppercase text-white font-heading shrink-0"
        >
          <div className="size-3 sm:size-3.5 bg-brand skew-x-[-15deg] shadow-[0_0_10px_var(--brand-glow)]" />
          <span>
            DEZ<span className="text-muted-foreground">PILA</span>
          </span>
        </a>

        {/* Links Desktop */}
        <div className="hidden gap-1 md:flex items-center">
          {links.map((l) => (
            <a
              key={l.name}
              href={l.href}
              className="cursor-pointer rounded-[9px] px-3.5 py-2 text-[13.5px] font-semibold text-slate-300 transition-colors hover:bg-white/5 hover:text-white font-body"
            >
              {l.name}
            </a>
          ))}
        </div>

        {/* Buttons Desktop & Mobile CTA */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <a
            href="#planos"
            className="hidden sm:inline-flex rounded-[9px] px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-[13.5px] font-semibold text-slate-200 hover:bg-white/5 transition-colors font-body"
          >
            Entrar
          </a>
          <a
            href="#planos"
            className="rounded-[8px] sm:rounded-[10px] bg-[#970202] hover:bg-[#b80303] px-2.5 py-1.5 sm:px-4.5 sm:py-2 text-[10px] sm:text-[13.5px] font-bold text-white shadow-[0_4px_16px_rgba(151,2,2,0.6)] transition-all font-heading tracking-wide uppercase shrink-0"
          >
            Cadastrar
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? (
              <X className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
            ) : (
              <Menu className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer / Expanded Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden flex flex-col gap-2 pt-2.5 mt-2 border-t border-white/10 animate-in fade-in slide-in-from-top-2 duration-200">
          {links.map((l) => (
            <a
              key={l.name}
              href={l.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-white/5 rounded-lg transition-colors font-body"
            >
              {l.name}
            </a>
          ))}
          <a
            href="#planos"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-white/5 rounded-lg transition-colors font-body"
          >
            Entrar
          </a>
        </div>
      )}
    </nav>
  );
}

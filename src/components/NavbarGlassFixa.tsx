import { useState, useEffect } from "react";

const links = [
  { name: "Conteúdo", href: "#conteudo" },
  { name: "Planos", href: "#planos" },
  { name: "Dúvidas", href: "#faq" },
];

export function NavbarGlassFixa() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={
        "fixed left-1/2 top-5 z-50 flex w-[calc(100%-48px)] max-w-3xl -translate-x-1/2 items-center justify-between rounded-2xl border border-white/10 py-3 pl-5 pr-3.5 backdrop-blur-xl transition-all duration-300 " +
        (scrolled
          ? "bg-[#0b0b14]/85 shadow-[0_14px_40px_rgba(0,0,0,0.7)] border-brand/20"
          : "bg-[#0b0b14]/60 shadow-[0_14px_40px_rgba(0,0,0,0.5)]")
      }
    >
      <a href="#" className="flex items-center gap-2 text-base font-bold tracking-tighter uppercase text-white font-heading">
        <div className="size-3.5 bg-brand skew-x-[-15deg] shadow-[0_0_10px_var(--brand-glow)]" />
        <span>
          DEZ<span className="text-muted-foreground">PILA</span>
        </span>
      </a>

      <div className="hidden gap-1 md:flex">
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

      <div className="flex items-center gap-2">
        <a
          href="#planos"
          className="rounded-[9px] px-4 py-2 text-[13.5px] font-semibold text-slate-200 hover:bg-white/5 transition-colors font-body"
        >
          Entrar
        </a>
        <a
          href="#planos"
          className="rounded-[10px] bg-gradient-to-br from-brand to-orange-500 px-4.5 py-2 text-[13.5px] font-bold text-white shadow-[0_8px_20px_var(--brand-glow)] transition-all hover:brightness-110 font-heading tracking-wide"
        >
          Cadastrar
        </a>
      </div>
    </nav>
  );
}

import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { X, Y as Menu, _ as Instagram, $ as Facebook } from "../_libs/lucide-react.mjs";
const links = [
  { name: "Conteúdo", href: "/#conteudo" },
  { name: "Planos", href: "/#planos" },
  { name: "Loja 🛍️", href: "/shop" },
  { name: "Dúvidas", href: "/#faq" }
];
function NavbarGlassFixa() {
  const [scrolled, setScrolled] = reactExports.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "nav",
    {
      className: "fixed left-1/2 top-7 sm:top-8 md:top-5 z-50 flex w-[calc(100%-16px)] sm:w-[calc(100%-48px)] max-w-3xl -translate-x-1/2 flex-col rounded-2xl border border-white/10 py-2 px-3 sm:px-4 md:py-3 md:pl-5 md:pr-3.5 backdrop-blur-xl transition-all duration-300 " + (scrolled ? "bg-[#050507]/95 shadow-[0_14px_40px_rgba(0,0,0,0.9)] border-[#970202]/30" : "bg-[#050507]/80 shadow-[0_14px_40px_rgba(0,0,0,0.7)]"),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between w-full gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: "#",
              className: "flex items-center gap-1.5 sm:gap-2 text-xs sm:text-base font-bold tracking-tighter uppercase text-white font-heading shrink-0",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-3 sm:size-3.5 bg-brand skew-x-[-15deg] shadow-[0_0_10px_var(--brand-glow)]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "DEZ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "PILA" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden gap-1 md:flex items-center", children: links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: l.href,
              className: "cursor-pointer rounded-[9px] px-3.5 py-2 text-[13.5px] font-semibold text-slate-300 transition-colors hover:bg-white/5 hover:text-white font-body",
              children: l.name
            },
            l.name
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 sm:gap-2 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: "#planos",
                className: "hidden sm:inline-flex rounded-[9px] px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-[13.5px] font-semibold text-slate-200 hover:bg-white/5 transition-colors font-body",
                children: "Entrar"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: "#planos",
                className: "rounded-[8px] sm:rounded-[10px] bg-[#970202] hover:bg-[#b80303] px-2.5 py-1.5 sm:px-4.5 sm:py-2 text-[10px] sm:text-[13.5px] font-bold text-white shadow-[0_4px_16px_rgba(151,2,2,0.6)] transition-all font-heading tracking-wide uppercase shrink-0",
                children: "Cadastrar"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setMobileMenuOpen(!mobileMenuOpen),
                className: "md:hidden p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0",
                "aria-label": "Abrir menu",
                children: mobileMenuOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4.5 w-4.5 sm:h-5 sm:w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-4.5 w-4.5 sm:h-5 sm:w-5" })
              }
            )
          ] })
        ] }),
        mobileMenuOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:hidden flex flex-col gap-2 pt-2.5 mt-2 border-t border-white/10 animate-in fade-in slide-in-from-top-2 duration-200", children: [
          links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: l.href,
              onClick: () => setMobileMenuOpen(false),
              className: "px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-white/5 rounded-lg transition-colors font-body",
              children: l.name
            },
            l.name
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "#planos",
              onClick: () => setMobileMenuOpen(false),
              className: "px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-white/5 rounded-lg transition-colors font-body",
              children: "Entrar"
            }
          )
        ] })
      ]
    }
  );
}
function PaymentBadge({ method }) {
  switch (method) {
    case "Visa":
      return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center gap-1 bg-[#1A1F71] text-white px-3 py-1.5 rounded-md font-code text-xs font-bold shadow-sm border border-[#1A1F71]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic font-serif font-black tracking-tighter text-sm", children: "VISA" }) });
    case "MasterCard":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 bg-[#14141c] text-white px-3 py-1.5 rounded-md font-code text-xs font-bold shadow-sm border border-white/10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex -space-x-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-3 rounded-full bg-[#EB001B]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-3 rounded-full bg-[#F79E1B] opacity-90" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-extrabold tracking-tight", children: "Mastercard" })
      ] });
    case "Elo":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 bg-black text-white px-3 py-1.5 rounded-md font-code text-xs font-bold border border-white/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-black text-xs tracking-tight text-white lowercase", children: "elo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex gap-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-[#FFD700]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-[#EB001B]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-[#006FCF]" })
        ] })
      ] });
    case "Hiper":
      return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center gap-1.5 bg-[#FF7A00] text-white px-3 py-1.5 rounded-md font-code text-xs font-bold shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-extrabold italic tracking-tight", children: "Hiper" }) });
    case "Diners":
      return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center gap-1.5 bg-[#0079C1] text-white px-3 py-1.5 rounded-md font-code text-xs font-bold shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-serif font-bold text-xs tracking-tight", children: "Diners Club" }) });
    case "Amex":
      return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center gap-1.5 bg-[#006FCF] text-white px-3 py-1.5 rounded-md font-code text-xs font-bold shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-black tracking-tighter text-xs uppercase", children: "AMEX" }) });
    case "PIX":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 bg-[#32BCAD] text-white px-3 py-1.5 rounded-md font-code text-xs font-extrabold shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "h-3.5 w-3.5 fill-white", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 2a10 10 0 100 20 10 10 0 000-20zm3.8 13.8l-3.8-3.8-3.8 3.8-1.4-1.4 3.8-3.8-3.8-3.8 1.4-1.4 3.8 3.8 3.8-3.8 1.4 1.4-3.8 3.8 3.8 3.8-1.4 1.4z" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "PIX" })
      ] });
    case "Boleto":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 bg-white text-black px-3 py-1.5 rounded-md font-code text-xs font-bold border border-slate-300", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "h-3.5 w-4 fill-black", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M2 4h2v16H2V4zm4 0h1v16H6V4zm3 0h3v16H9V4zm5 0h1v16h-1V4zm3 0h2v16h-2V4zm4 0h1v16h-1V4z" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "BOLETO" })
      ] });
    default:
      return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-secondary px-3 py-1.5 font-code", children: method });
  }
}
function SecurityBadge({ seal }) {
  switch (seal) {
    case "Google Site Seguro":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-[#0c1a12] border border-[#00C853]/40 px-3.5 py-1.5 rounded-md shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "h-4 w-4 fill-[#00C853]", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col text-left leading-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-white", children: "Google" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-semibold text-[#00C853]", children: "Site Seguro" })
        ] })
      ] });
    case "🔒 SSL":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-[#1a1408] border border-[#FF9800]/50 px-3.5 py-1.5 rounded-md shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "🔒" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col text-left leading-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-extrabold text-[#FF9800]", children: "SSL" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[8.5px] font-bold tracking-wider text-slate-300", children: "BLINDADO" })
        ] })
      ] });
    case "🛡️ BLINDADO":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-black border border-[#00C853]/40 px-3.5 py-1.5 rounded-md shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-4 rounded bg-[#00C853] flex items-center justify-center text-black font-black text-[10px]", children: "✓" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-extrabold tracking-wider text-white uppercase font-heading", children: "SITE BLINDADO" })
      ] });
    default:
      return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-secondary px-3 py-1.5 font-code", children: seal });
  }
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-border/40 bg-[#000000] backdrop-blur-xl relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-3.5 bg-brand skew-x-[-15deg] shadow-[0_0_10px_var(--brand-glow)]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xl font-bold tracking-tighter uppercase font-heading text-white", children: [
          "DEZ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "PILA" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-code text-xs text-muted-foreground border-l border-border/60 pl-3", children: "v4.2.9_STABLE" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: "https://www.instagram.com/soudezpila",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "flex items-center gap-2 bg-[#14141c] hover:bg-[#1f1f2c] border border-white/10 hover:border-[#E1306C]/60 text-white px-3.5 py-1.5 rounded-lg font-code text-xs font-bold transition-all shadow-sm group hover:shadow-[0_0_15px_rgba(225,48,108,0.3)]",
            title: "Instagram Oficial @soudezpila",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { className: "h-4 w-4 text-[#E1306C] group-hover:scale-110 transition-transform" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "@soudezpila" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: "https://www.facebook.com/soudezpila",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "flex items-center gap-2 bg-[#14141c] hover:bg-[#1f1f2c] border border-white/10 hover:border-[#1877F2]/60 text-white px-3.5 py-1.5 rounded-lg font-code text-xs font-bold transition-all shadow-sm group hover:shadow-[0_0_15px_rgba(24,119,242,0.3)]",
            title: "Facebook Oficial /soudezpila",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Facebook, { className: "h-4 w-4 text-[#1877F2] group-hover:scale-110 transition-transform" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/soudezpila" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-code text-xs text-muted-foreground text-center", children: [
        "CRIPTOGRAFIA: AES-256 // CONEXÃO: SEGURA //",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand font-bold", children: "SISTEMA ATIVO" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 pt-8 border-t border-border/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-heading font-extrabold text-xs mb-3.5 uppercase tracking-widest text-brand flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-brand" }),
          "Formas de Pagamento"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2.5 items-center", children: ["Visa", "MasterCard", "Elo", "Hiper", "Diners", "Amex", "PIX", "Boleto"].map(
          (m) => /* @__PURE__ */ jsxRuntimeExports.jsx(PaymentBadge, { method: m }, m)
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-heading font-extrabold text-xs mb-3.5 uppercase tracking-widest text-brand flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-brand" }),
          "Site Seguro"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2.5 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SecurityBadge, { seal: "Google Site Seguro" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SecurityBadge, { seal: "🔒 SSL" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SecurityBadge, { seal: "🛡️ BLINDADO" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-heading font-extrabold text-xs mb-3.5 uppercase tracking-widest text-brand flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-brand" }),
          "Redes Oficiais"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2.5 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: "https://www.instagram.com/soudezpila",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "flex items-center gap-2 bg-[#14141c] hover:bg-[#1f1f2c] border border-white/10 hover:border-[#E1306C]/60 text-white px-3 py-1.5 rounded-md font-code text-xs font-bold transition-all shadow-sm group hover:shadow-[0_0_15px_rgba(225,48,108,0.3)]",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { className: "h-3.5 w-3.5 text-[#E1306C] group-hover:scale-110 transition-transform" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Instagram" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: "https://www.facebook.com/soudezpila",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "flex items-center gap-2 bg-[#14141c] hover:bg-[#1f1f2c] border border-white/10 hover:border-[#1877F2]/60 text-white px-3 py-1.5 rounded-md font-code text-xs font-bold transition-all shadow-sm group hover:shadow-[0_0_15px_rgba(24,119,242,0.3)]",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Facebook, { className: "h-3.5 w-3.5 text-[#1877F2] group-hover:scale-110 transition-transform" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Facebook" })
              ]
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/60 max-w-2xl mx-auto text-center leading-relaxed mt-10 font-code border-t border-border/20 pt-6", children: "Esta página não tem qualquer vínculo com o Facebook S/A e suas empresas. Toda responsabilidade sobre produtos vendidos é de inteira responsabilidade da nossa empresa. Suporte: suporte@DezPila.com.br" })
  ] }) });
}
export {
  Footer as F,
  NavbarGlassFixa as N
};

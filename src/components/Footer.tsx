import { Instagram, Facebook } from "lucide-react";

function PaymentBadge({ method }: { method: string }) {
  switch (method) {
    case "Visa":
      return (
        <span className="flex items-center gap-1 bg-[#1A1F71] text-white px-3 py-1.5 rounded-md font-code text-xs font-bold shadow-sm border border-[#1A1F71]">
          <span className="italic font-serif font-black tracking-tighter text-sm">VISA</span>
        </span>
      );
    case "MasterCard":
      return (
        <span className="flex items-center gap-1.5 bg-[#14141c] text-white px-3 py-1.5 rounded-md font-code text-xs font-bold shadow-sm border border-white/10">
          <span className="flex -space-x-1.5">
            <span className="h-3 w-3 rounded-full bg-[#EB001B]" />
            <span className="h-3 w-3 rounded-full bg-[#F79E1B] opacity-90" />
          </span>
          <span className="font-extrabold tracking-tight">Mastercard</span>
        </span>
      );
    case "Elo":
      return (
        <span className="flex items-center gap-1.5 bg-black text-white px-3 py-1.5 rounded-md font-code text-xs font-bold border border-white/20">
          <span className="font-black text-xs tracking-tight text-white lowercase">elo</span>
          <span className="flex gap-0.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FFD700]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#EB001B]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#006FCF]" />
          </span>
        </span>
      );
    case "Hiper":
      return (
        <span className="flex items-center gap-1.5 bg-[#FF7A00] text-white px-3 py-1.5 rounded-md font-code text-xs font-bold shadow-sm">
          <span className="font-extrabold italic tracking-tight">Hiper</span>
        </span>
      );
    case "Diners":
      return (
        <span className="flex items-center gap-1.5 bg-[#0079C1] text-white px-3 py-1.5 rounded-md font-code text-xs font-bold shadow-sm">
          <span className="font-serif font-bold text-xs tracking-tight">Diners Club</span>
        </span>
      );
    case "Amex":
      return (
        <span className="flex items-center gap-1.5 bg-[#006FCF] text-white px-3 py-1.5 rounded-md font-code text-xs font-bold shadow-sm">
          <span className="font-black tracking-tighter text-xs uppercase">AMEX</span>
        </span>
      );
    case "PIX":
      return (
        <span className="flex items-center gap-1.5 bg-[#32BCAD] text-white px-3 py-1.5 rounded-md font-code text-xs font-extrabold shadow-sm">
          <svg className="h-3.5 w-3.5 fill-white" viewBox="0 0 24 24">
            <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm3.8 13.8l-3.8-3.8-3.8 3.8-1.4-1.4 3.8-3.8-3.8-3.8 1.4-1.4 3.8 3.8 3.8-3.8 1.4 1.4-3.8 3.8 3.8 3.8-1.4 1.4z" />
          </svg>
          <span>PIX</span>
        </span>
      );
    case "Boleto":
      return (
        <span className="flex items-center gap-1.5 bg-white text-black px-3 py-1.5 rounded-md font-code text-xs font-bold border border-slate-300">
          <svg className="h-3.5 w-4 fill-black" viewBox="0 0 24 24">
            <path d="M2 4h2v16H2V4zm4 0h1v16H6V4zm3 0h3v16H9V4zm5 0h1v16h-1V4zm3 0h2v16h-2V4zm4 0h1v16h-1V4z" />
          </svg>
          <span>BOLETO</span>
        </span>
      );
    default:
      return <span className="bg-secondary px-3 py-1.5 font-code">{method}</span>;
  }
}

function SecurityBadge({ seal }: { seal: string }) {
  switch (seal) {
    case "Google Site Seguro":
      return (
        <div className="flex items-center gap-2 bg-[#0c1a12] border border-[#00C853]/40 px-3.5 py-1.5 rounded-md shadow-sm">
          <svg className="h-4 w-4 fill-[#00C853]" viewBox="0 0 24 24">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
          </svg>
          <div className="flex flex-col text-left leading-none">
            <span className="text-[10px] font-bold text-white">Google</span>
            <span className="text-[9px] font-semibold text-[#00C853]">Site Seguro</span>
          </div>
        </div>
      );
    case "🔒 SSL":
      return (
        <div className="flex items-center gap-2 bg-[#1a1408] border border-[#FF9800]/50 px-3.5 py-1.5 rounded-md shadow-sm">
          <span className="text-sm">🔒</span>
          <div className="flex flex-col text-left leading-none">
            <span className="text-[11px] font-extrabold text-[#FF9800]">SSL</span>
            <span className="text-[8.5px] font-bold tracking-wider text-slate-300">BLINDADO</span>
          </div>
        </div>
      );
    case "🛡️ BLINDADO":
      return (
        <div className="flex items-center gap-2 bg-black border border-[#00C853]/40 px-3.5 py-1.5 rounded-md shadow-sm">
          <div className="h-4 w-4 rounded bg-[#00C853] flex items-center justify-center text-black font-black text-[10px]">
            ✓
          </div>
          <span className="text-[10px] font-extrabold tracking-wider text-white uppercase font-heading">
            SITE BLINDADO
          </span>
        </div>
      );
    default:
      return <span className="bg-secondary px-3 py-1.5 font-code">{seal}</span>;
  }
}

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-[#000000] backdrop-blur-xl relative z-10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="size-3.5 bg-brand skew-x-[-15deg] shadow-[0_0_10px_var(--brand-glow)]" />
            <span className="text-xl font-bold tracking-tighter uppercase font-heading text-white">
              DEZ<span className="text-muted-foreground">PILA</span>
            </span>
            <span className="font-code text-xs text-muted-foreground border-l border-border/60 pl-3">
              v4.2.9_STABLE
            </span>
          </div>

          {/* Redes Sociais Rápidas */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/soudezpila"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#14141c] hover:bg-[#1f1f2c] border border-white/10 hover:border-[#E1306C]/60 text-white px-3.5 py-1.5 rounded-lg font-code text-xs font-bold transition-all shadow-sm group hover:shadow-[0_0_15px_rgba(225,48,108,0.3)]"
              title="Instagram Oficial @soudezpila"
            >
              <Instagram className="h-4 w-4 text-[#E1306C] group-hover:scale-110 transition-transform" />
              <span>@soudezpila</span>
            </a>
            <a
              href="https://www.facebook.com/soudezpila"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#14141c] hover:bg-[#1f1f2c] border border-white/10 hover:border-[#1877F2]/60 text-white px-3.5 py-1.5 rounded-lg font-code text-xs font-bold transition-all shadow-sm group hover:shadow-[0_0_15px_rgba(24,119,242,0.3)]"
              title="Facebook Oficial /soudezpila"
            >
              <Facebook className="h-4 w-4 text-[#1877F2] group-hover:scale-110 transition-transform" />
              <span>/soudezpila</span>
            </a>
          </div>

          <div className="font-code text-xs text-muted-foreground text-center">
            CRIPTOGRAFIA: AES-256 // CONEXÃO: SEGURA //{" "}
            <span className="text-brand font-bold">SISTEMA ATIVO</span>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-border/40">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div>
              <p className="font-heading font-extrabold text-xs mb-3.5 uppercase tracking-widest text-brand flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                Formas de Pagamento
              </p>
              <div className="flex flex-wrap gap-2.5 items-center">
                {["Visa", "MasterCard", "Elo", "Hiper", "Diners", "Amex", "PIX", "Boleto"].map(
                  (m) => (
                    <PaymentBadge key={m} method={m} />
                  ),
                )}
              </div>
            </div>

            <div>
              <p className="font-heading font-extrabold text-xs mb-3.5 uppercase tracking-widest text-brand flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                Site Seguro
              </p>
              <div className="flex flex-wrap gap-2.5 items-center">
                <SecurityBadge seal="Google Site Seguro" />
                <SecurityBadge seal="🔒 SSL" />
                <SecurityBadge seal="🛡️ BLINDADO" />
              </div>
            </div>

            <div>
              <p className="font-heading font-extrabold text-xs mb-3.5 uppercase tracking-widest text-brand flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                Redes Oficiais
              </p>
              <div className="flex flex-wrap gap-2.5 items-center">
                <a
                  href="https://www.instagram.com/soudezpila"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#14141c] hover:bg-[#1f1f2c] border border-white/10 hover:border-[#E1306C]/60 text-white px-3 py-1.5 rounded-md font-code text-xs font-bold transition-all shadow-sm group hover:shadow-[0_0_15px_rgba(225,48,108,0.3)]"
                >
                  <Instagram className="h-3.5 w-3.5 text-[#E1306C] group-hover:scale-110 transition-transform" />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://www.facebook.com/soudezpila"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#14141c] hover:bg-[#1f1f2c] border border-white/10 hover:border-[#1877F2]/60 text-white px-3 py-1.5 rounded-md font-code text-xs font-bold transition-all shadow-sm group hover:shadow-[0_0_15px_rgba(24,119,242,0.3)]"
                >
                  <Facebook className="h-3.5 w-3.5 text-[#1877F2] group-hover:scale-110 transition-transform" />
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground/60 max-w-2xl mx-auto text-center leading-relaxed mt-10 font-code border-t border-border/20 pt-6">
          Esta página não tem qualquer vínculo com o Facebook S/A e suas empresas. Toda
          responsabilidade sobre produtos vendidos é de inteira responsabilidade da nossa empresa.
          Suporte: suporte@DezPila.com.br
        </p>
      </div>
    </footer>
  );
}

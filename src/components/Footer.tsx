export function Footer() {
  return (
    <footer className="border-t border-border bg-surface backdrop-blur-xl relative z-10">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="size-3 bg-brand skew-x-[-15deg]" />
            <span className="text-lg font-bold tracking-tighter uppercase">
              DEZ<span className="text-muted-foreground">PILA</span>
            </span>
            <span className="font-code text-xs text-muted-foreground border-l border-border pl-3">
              v4.2.9_STABLE
            </span>
          </div>

          <div className="font-code text-xs text-muted-foreground text-center">
            CRIPTOGRAFIA: AES-256 // CONEXÃO: SEGURA //{" "}
            <span className="text-brand">SISTEMA ATIVO</span>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <p className="font-bold text-xs mb-3 uppercase tracking-widest">
                Formas de Pagamento
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                {["Visa", "MasterCard", "Elo", "Hiper", "Diners", "Amex", "PIX", "Boleto"].map(
                  (m) => (
                    <span key={m} className="bg-secondary px-3 py-1.5 font-code">
                      {m}
                    </span>
                  ),
                )}
              </div>
            </div>

            <div>
              <p className="font-bold text-xs mb-3 uppercase tracking-widest">Site Seguro</p>
              <div className="flex gap-3 text-xs text-muted-foreground">
                <span className="bg-secondary px-3 py-1.5 font-code">🔒 SSL</span>
                <span className="bg-secondary px-3 py-1.5 font-code">🛡️ BLINDADO</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground/50 max-w-2xl mx-auto text-center leading-relaxed mt-8 font-code">
          Esta página não tem qualquer vínculo com o Facebook S/A e suas empresas. Toda
          responsabilidade sobre produtos vendidos é de inteira responsabilidade da nossa empresa.
          Suporte: suporte@DezPila.com.br
        </p>
      </div>
    </footer>
  );
}

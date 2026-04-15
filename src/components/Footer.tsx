export function Footer() {
  return (
    <footer className="px-6 py-12 border-t border-border">
      <div className="mx-auto max-w-5xl text-center space-y-6">
        <div className="flex items-center justify-center gap-3">
          <span className="bg-brand text-brand-foreground font-bold px-3 py-1 rounded text-sm">DEZ</span>
          <span className="text-2xl font-extrabold text-brand">DEZPILA</span>
        </div>

        <div>
          <p className="font-bold text-sm mb-3">FORMAS DE PAGAMENTO</p>
          <div className="flex flex-wrap justify-center gap-3 text-xs text-muted-foreground">
            {["Visa", "MasterCard", "Hiper", "Elo", "Diners", "Hipercard", "Amex", "Itaú", "Banrisul", "Boleto"].map(
              (m) => (
                <span key={m} className="bg-secondary px-3 py-1.5 rounded">{m}</span>
              )
            )}
          </div>
        </div>

        <div>
          <p className="font-bold text-sm mb-3">SITE SEGURO</p>
          <div className="flex justify-center gap-4 text-xs text-muted-foreground">
            <span className="bg-secondary px-3 py-1.5 rounded">🔒 Google Safe</span>
            <span className="bg-secondary px-3 py-1.5 rounded">🛡️ SSL Blindado</span>
            <span className="bg-secondary px-3 py-1.5 rounded">✅ Site Blindado</span>
          </div>
        </div>

        <p className="text-xs text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Esta página não tem qualquer vínculo com o Facebook S/A e suas empresas. Ao sair da plataforma toda responsabilidade sobre produtos vendidos e ofertados é de inteira responsabilidade da nossa empresa. Nosso email de suporte é: suporte@DezPila.com.br
        </p>
      </div>
    </footer>
  );
}

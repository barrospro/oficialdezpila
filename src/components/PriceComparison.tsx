const services = [
  { name: "Netflix", price: "R$ 59,90" },
  { name: "HBO Max", price: "R$ 55,90" },
  { name: "Prime Video", price: "R$ 19,90" },
  { name: "Disney+", price: "R$ 62,90" },
  { name: "Apple TV+", price: "R$ 21,90" },
  { name: "Telecine", price: "R$ 39,90" },
  { name: "Combate", price: "R$ 34,90" },
  { name: "Premiere", price: "R$ 39,90" },
  { name: "Sky", price: "R$ 44,95" },
  { name: "Paramount+", price: "R$ 34,90" },
  { name: "Crunchyroll", price: "R$ 19,90" },
  { name: "Claro TV", price: "R$ 89,90" },
];

export function PriceComparison() {
  return (
    <section className="px-6 lg:px-12 py-24 relative z-10 border-t border-border">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <p className="font-code text-brand text-xs uppercase tracking-widest mb-4 font-bold">
            Análise de Mercado // Comparativo Real
          </p>
          <h2 className="section-title text-center mb-4">
            Isso é o que você pagaria
            <br />
            <span className="text-muted-foreground">se assinasse tudo separado:</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-16">
          {services.map((s) => (
            <div key={s.name} className="card-surface text-center py-4 px-3">
              <p className="font-bold text-sm mb-1">{s.name}</p>
              <p className="text-muted-foreground font-code text-xs">{s.price}/mês</p>
            </div>
          ))}
        </div>

        <div className="text-center space-y-6">
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest font-code">
            Total Combinado
          </p>
          <p className="text-5xl md:text-6xl font-bold line-through text-muted-foreground/40 tabular-nums font-code">
            R$ 514,85
          </p>

          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-brand/10 blur-xl rounded-full" />
            <p className="relative text-2xl md:text-3xl font-bold uppercase tracking-tight">
              Com a DezPila você paga apenas
            </p>
          </div>

          <div className="flex items-start gap-1 justify-center">
            <span className="text-2xl font-bold mt-3 text-muted-foreground font-code">R$</span>
            <span className="text-8xl md:text-9xl font-bold text-brand tabular-nums tracking-tighter font-code glow-text">
              10
            </span>
            <div className="flex flex-col justify-start mt-4">
              <span className="text-3xl font-bold text-brand tabular-nums tracking-tighter font-code">
                ,00
              </span>
              <span className="text-sm font-semibold uppercase text-muted-foreground font-code">
                /mês
              </span>
            </div>
          </div>

          <div className="pt-6">
            <a href="#planos" className="btn-brand text-lg">
              ADQUIRA O SEU AGORA
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

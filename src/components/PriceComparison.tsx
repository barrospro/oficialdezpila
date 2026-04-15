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
    <section className="px-6 py-20 bg-secondary/30">
      <div className="mx-auto max-w-5xl">
        <h2 className="section-title mb-12">
          Isso é o que você pagaria se assinasse todas as plataformas:
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-12">
          {services.map((s) => (
            <div key={s.name} className="card-surface text-center py-4 px-3">
              <p className="font-bold text-sm mb-1">{s.name}</p>
              <p className="text-muted-foreground text-xs">{s.price}/mês</p>
            </div>
          ))}
        </div>
        <div className="text-center space-y-4">
          <p className="text-xl font-bold text-muted-foreground">AO TODO VOCÊ PAGARIA</p>
          <p className="text-4xl md:text-5xl font-extrabold line-through text-muted-foreground/60">R$ 514,85 POR MÊS</p>
          <p className="text-3xl md:text-4xl font-extrabold">
            JÁ COM A DEZPILA VOCÊ PAGARÁ APENAS{" "}
            <span className="text-brand glow-text text-5xl md:text-6xl">R$10,00</span>{" "}
            <span className="text-brand">MÊS!!</span>
          </p>
          <div className="pt-6">
            <a href="#planos" className="btn-brand text-lg">ADQUIRA O SEU AGORA</a>
          </div>
        </div>
      </div>
    </section>
  );
}

const features = [
  "Mais de 60.000 conteúdos",
  "Qualidade SD/HD/FHD/4K",
  "Guia de Programação [EPG]",
  "Assista no Smartphone/Tablet",
  "Assista no TV Box/Chromecast",
  "Assista na Smart TV",
  "Assista no Computador",
  "Pacote Filmes e Série",
];

const plans = [
  {
    name: "MENSAL",
    screens: "1 tela",
    price: "R$ 10,00",
    originalPrice: null,
    discount: null,
    highlighted: false,
    link: "#",
  },
  {
    name: "TRIMESTRAL",
    screens: "2 telas simultâneas",
    price: "R$ 19,90",
    originalPrice: null,
    discount: null,
    highlighted: false,
    link: "#",
    extra: ["Programação Adultos [Opcional]"],
  },
  {
    name: "SEMESTRAL",
    screens: "3 telas simultâneas",
    price: "R$ 29,90",
    originalPrice: "R$ 119,40",
    discount: "66,58%",
    highlighted: true,
    link: "#",
    extra: ["Programação Adultos [Opcional]"],
  },
  {
    name: "ANUAL",
    screens: "4 telas simultâneas",
    price: "R$ 47,90",
    originalPrice: "R$ 238,80",
    discount: "71,61%",
    highlighted: false,
    link: "#",
    extra: ["Programação Adultos [Opcional]"],
  },
];

export function PricingPlans() {
  return (
    <section id="planos" className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="section-title mb-4">Aproveite essa oportunidade e assine já!</h2>
        <p className="text-center text-muted-foreground mb-12">Escolha o plano ideal para você</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={plan.highlighted ? "card-surface-brand relative" : "card-surface relative"}
            >
              {plan.discount && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand text-brand-foreground text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                  {plan.discount} DE DESCONTO
                </span>
              )}
              <h3 className="text-lg font-extrabold text-center mb-1">PLANO {plan.name}</h3>
              <p className="text-center text-muted-foreground text-sm mb-4">{plan.screens}</p>
              <ul className="space-y-2 mb-6">
                {[...features, ...(plan.extra || [])].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <span className="text-brand mt-0.5">✓</span>
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              {plan.originalPrice && (
                <p className="text-center text-muted-foreground text-sm line-through">{plan.originalPrice}</p>
              )}
              <p className="text-center text-3xl font-extrabold text-brand mb-4">{plan.price}</p>
              <a href={plan.link} className="btn-brand w-full block text-center text-sm">
                COMPRAR AGORA
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

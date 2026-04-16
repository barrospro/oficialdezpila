const features = [
  "Mais de 60.000 conteúdos",
  "Qualidade SD/HD/FHD/4K",
  "Guia de Programação [EPG]",
  "Smartphone / Tablet",
  "TV Box / Chromecast",
  "Smart TV / Computador",
  "Pacote Filmes e Séries",
];

const plans = [
  {
    name: "MENSAL",
    screens: "1 conexão simultânea",
    price: "10",
    cents: ",00",
    period: "/mês",
    originalPrice: null,
    discount: null,
    highlighted: false,
    link: "#",
    tier: "NÍVEL 1",
    extra: [],
  },
  {
    name: "TRIMESTRAL",
    screens: "2 conexões simultâneas",
    price: "19",
    cents: ",90",
    period: "/trim",
    originalPrice: null,
    discount: null,
    highlighted: false,
    link: "#",
    tier: "NÍVEL 2",
    extra: ["Programação Adultos [Opcional]"],
  },
  {
    name: "SEMESTRAL",
    screens: "3 conexões simultâneas",
    price: "29",
    cents: ",90",
    period: "/sem",
    originalPrice: "R$ 119,40",
    discount: "66,58%",
    highlighted: true,
    link: "#",
    tier: "RECOMENDADO",
    extra: ["Programação Adultos [Opcional]"],
  },
  {
    name: "ANUAL",
    screens: "4 conexões simultâneas",
    price: "47",
    cents: ",90",
    period: "/ano",
    originalPrice: "R$ 238,80",
    discount: "71,61%",
    highlighted: false,
    link: "#",
    tier: "NÍVEL 4",
    extra: ["Programação Adultos [Opcional]"],
  },
];

export function PricingPlans() {
  return (
    <section id="planos" className="px-6 lg:px-12 py-24 relative z-10 border-t border-border">
      <div className="mx-auto max-w-[1440px]">
        <div className="text-center mb-16">
          <p className="font-code text-brand text-xs uppercase tracking-widest mb-4 font-bold">
            Selecione Seu Nível de Acesso
          </p>
          <h2 className="section-title text-center">
            Planos Com{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-orange-500">
              Acesso Total
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col relative ${plan.highlighted ? "card-surface-brand md:scale-105 z-10" : "card-surface"}`}
            >
              {plan.discount && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand text-brand-foreground font-code text-[10px] px-4 py-1.5 uppercase tracking-wider font-bold whitespace-nowrap">
                  {plan.discount} DE DESCONTO
                </div>
              )}

              <div className="mb-6">
                <div className="font-code text-xs text-brand/70 mb-2 uppercase tracking-widest">
                  {plan.tier}
                </div>
                <h3 className="text-2xl font-bold uppercase">
                  Plano {plan.name}
                </h3>
                <p className="text-muted-foreground text-sm mt-1">{plan.screens}</p>
              </div>

              <div className="flex items-end gap-1 mb-6">
                <span className="font-code text-lg text-muted-foreground">R$</span>
                <span className="text-5xl font-bold tabular-nums tracking-tighter font-code">
                  {plan.price}
                </span>
                <div className="flex flex-col">
                  <span className="text-xl font-bold tabular-nums tracking-tighter font-code">
                    {plan.cents}
                  </span>
                  <span className="font-code text-xs text-muted-foreground">{plan.period}</span>
                </div>
              </div>

              {plan.originalPrice && (
                <p className="text-muted-foreground/50 text-sm line-through font-code mb-4">
                  {plan.originalPrice}
                </p>
              )}

              <ul className="flex-1 space-y-3 mb-8 font-code text-sm">
                {[...features, ...plan.extra].map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className={plan.highlighted ? "text-brand" : "text-brand/60"}>
                      [+]
                    </span>
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.link}
                className={`w-full py-4 text-center font-bold uppercase tracking-widest text-sm block transition-colors ${
                  plan.highlighted
                    ? "bg-brand text-brand-foreground hover:bg-foreground hover:text-background shadow-[0_0_20px_var(--brand-glow)]"
                    : "btn-brand-outline"
                }`}
              >
                COMPRAR AGORA
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

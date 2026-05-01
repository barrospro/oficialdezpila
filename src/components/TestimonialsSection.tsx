const testimonials = [
  {
    name: "Lucas M.",
    location: "São Paulo, SP",
    plan: "SEMESTRAL",
    stars: 5,
    text: "Cara, cancelei Netflix, Disney+ e Premiere. Tudo que eu assistia lá, assisto aqui em 4K sem travar. Economia absurda.",
    date: "12/03/2026",
  },
  {
    name: "Fernanda S.",
    location: "Belo Horizonte, MG",
    plan: "ANUAL",
    stars: 5,
    text: "Meu marido duvidou, mas depois que viu o jogo do Galo ao vivo sem delay nenhum, virou fã. Melhor investimento do ano.",
    date: "28/02/2026",
  },
  {
    name: "Rafael C.",
    location: "Curitiba, PR",
    plan: "TRIMESTRAL",
    stars: 5,
    text: "Suporte respondeu em 5 minutos no WhatsApp e me ajudou a configurar na TV. Nunca vi atendimento assim.",
    date: "05/03/2026",
  },
  {
    name: "Amanda R.",
    location: "Recife, PE",
    plan: "MENSAL",
    stars: 4,
    text: "Comecei no mensal pra testar. Em uma semana já migrei pro semestral. O catálogo de séries é ridículo de grande.",
    date: "19/03/2026",
  },
  {
    name: "Thiago P.",
    location: "Porto Alegre, RS",
    plan: "SEMESTRAL",
    stars: 5,
    text: "Assisto UFC, NBA e Brasileirão tudo no mesmo lugar. Qualidade do stream é melhor que das operadoras tradicionais.",
    date: "01/04/2026",
  },
  {
    name: "Juliana K.",
    location: "Manaus, AM",
    plan: "ANUAL",
    stars: 5,
    text: "Moro em zona rural e achei que não ia funcionar. Roda perfeito com minha internet de 15 Mbps. Recomendo demais!",
    date: "22/03/2026",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`text-sm ${i < count ? "text-brand" : "text-muted-foreground/30"}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="px-6 lg:px-12 py-24 relative z-10 border-t border-border">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <p className="font-code text-brand text-xs uppercase tracking-widest mb-4 font-bold">
              Feedback dos Operadores
            </p>
            <h2 className="section-title">
              Quem Usa,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-muted-foreground">
                Aprova.
              </span>
            </h2>
          </div>
          <div className="text-right">
            <p className="text-muted-foreground font-code text-xs uppercase tracking-widest mb-2">
              Índice de Satisfação
            </p>
            <div className="font-code text-sm text-brand font-bold tabular-nums">
              [RATING: 4.9/5.0 — {testimonials.length} REVIEWS]
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="card-surface flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <StarRating count={t.stars} />
                <span className="font-code text-[10px] text-muted-foreground/50 uppercase tracking-widest">
                  {t.date}
                </span>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed flex-1">"{t.text}"</p>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <p className="font-bold text-sm">{t.name}</p>
                  <p className="font-code text-[10px] text-muted-foreground uppercase tracking-widest">
                    {t.location}
                  </p>
                </div>
                <span className="font-code text-[10px] text-brand/60 uppercase tracking-widest bg-brand/5 border border-brand/20 px-2 py-1">
                  {t.plan}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

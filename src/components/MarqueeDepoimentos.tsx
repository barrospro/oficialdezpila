type CardDepo = {
  q: string;
  nome: string;
  cargo: string;
  iniciais: string;
  stars: number;
  plano: string;
};

const LINHA1: CardDepo[] = [
  {
    q: "Cancelei Netflix, Disney+ e Premiere. Economia absurda de R$300 por mês.",
    nome: "Lucas Carvalho",
    cargo: "São Paulo, SP",
    iniciais: "LC",
    stars: 5,
    plano: "SEMESTRAL",
  },
  {
    q: "Futebol em 4K ao vivo sem nenhum travamento ou delay. Impressionante.",
    nome: "Ana Militão",
    cargo: "Belo Horizonte, MG",
    iniciais: "AM",
    stars: 5,
    plano: "ANUAL",
  },
  {
    q: "Suporte no WhatsApp me respondeu em 2 minutos e ajudou na Smart TV.",
    nome: "Fernanda Rocha",
    cargo: "Curitiba, PR",
    iniciais: "FR",
    stars: 5,
    plano: "TRIMESTRAL",
  },
  {
    q: "Catálogo gigantesco de filmes e séries 4K. Atualizam lançamentos todo dia.",
    nome: "Diego Prado",
    cargo: "Rio de Janeiro, RJ",
    iniciais: "DP",
    stars: 5,
    plano: "MENSAL",
  },
];

const LINHA2: CardDepo[] = [
  {
    q: "Cancelei a TV a cabo tradicional. Sinceramente? Não faz nenhuma falta.",
    nome: "Camila Brito",
    cargo: "Fortaleza, CE",
    iniciais: "CB",
    stars: 5,
    plano: "ANUAL",
  },
  {
    q: "Testei vários serviços do mercado. Esse é o único que roda 100% sem travar.",
    nome: "Gustavo Serra",
    cargo: "Porto Alegre, RS",
    iniciais: "GS",
    stars: 5,
    plano: "SEMESTRAL",
  },
  {
    q: "Liberação imediata pelo PIX em menos de 1 minuto. Muito prático.",
    nome: "Priscila Lima",
    cargo: "Recife, PE",
    iniciais: "PL",
    stars: 5,
    plano: "MENSAL",
  },
  {
    q: "Simples de instalar no TV Box e no celular. Qualidade de imagem 10/10.",
    nome: "Rodrigo Maia",
    cargo: "Brasília, DF",
    iniciais: "RM",
    stars: 5,
    plano: "TRIMESTRAL",
  },
];

function CardMarquee({ c }: { c: CardDepo }) {
  return (
    <div className="group/card mr-4 w-[280px] flex-shrink-0 rounded-xl border border-border/80 bg-card/60 p-4.5 backdrop-blur-md transition-all duration-300 hover:border-brand/50 hover:bg-card/90 hover:shadow-[0_0_25px_rgba(255,59,48,0.15)]">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex gap-0.5 text-xs text-brand font-bold tracking-tight">
          {"★".repeat(c.stars)}
        </div>
        <span className="font-code text-[9px] font-bold text-brand/90 bg-brand/10 border border-brand/20 px-2 py-0.5 uppercase tracking-widest rounded-sm">
          {c.plano}
        </span>
      </div>
      <p className="mb-4 text-xs leading-relaxed text-muted-foreground">"{c.q}"</p>
      <div className="flex items-center gap-2.5 pt-3 border-t border-border/50">
        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold font-code bg-brand/15 border border-brand/30 text-brand">
          {c.iniciais}
        </div>
        <div>
          <div className="text-xs font-bold text-foreground font-heading uppercase tracking-wide">
            {c.nome}
          </div>
          <div className="text-[10px] font-code text-muted-foreground/70 uppercase tracking-widest">
            {c.cargo}
          </div>
        </div>
      </div>
    </div>
  );
}

export function MarqueeDepoimentos() {
  return (
    <section
      className="group relative z-10 overflow-hidden py-20 font-body border-t border-border"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 600px 300px at 50% -80px, oklch(0.55 0.25 29 / 0.12), transparent)",
      }}
    >
      <style>{`
        @keyframes depo-mq { to { transform: translateX(-50%); } }
        .group:hover .depo-row { animation-play-state: paused; }
      `}</style>

      <div className="mb-12 px-6 text-center">
        <div className="mb-3 inline-block rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 font-code text-xs font-bold uppercase tracking-widest text-brand">
          + de 12.000 clientes satisfeitos
        </div>
        <h2 className="section-title text-center">
          Um fluxo contínuo de{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-foreground">
            gente satisfeita.
          </span>
        </h2>
      </div>

      <div className="relative">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28"
          style={{ background: "linear-gradient(90deg, var(--background), transparent)" }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28"
          style={{ background: "linear-gradient(270deg, var(--background), transparent)" }}
        />

        <div
          className="depo-row mb-4 flex w-max"
          style={{ animation: "depo-mq 30s linear infinite" }}
        >
          {[...LINHA1, ...LINHA1, ...LINHA1].map((c, i) => (
            <CardMarquee key={"a" + i} c={c} />
          ))}
        </div>
        <div
          className="depo-row mb-4 flex w-max"
          style={{ animation: "depo-mq 36s linear infinite reverse" }}
        >
          {[...LINHA2, ...LINHA2, ...LINHA2].map((c, i) => (
            <CardMarquee key={"b" + i} c={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

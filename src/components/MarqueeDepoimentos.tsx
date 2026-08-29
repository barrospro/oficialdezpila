type CardDepo = {
  q: string;
  nome: string;
  cargo: string;
  iniciais: string;
  dot: string;
};

const LINHA1: CardDepo[] = [
  {
    q: "Cancelei Netflix, Disney+ e Premiere. Economia absurda de R$300 por mês.",
    nome: "Lucas Carvalho",
    cargo: "Plano Semestral",
    iniciais: "LC",
    dot: "linear-gradient(135deg,#8b5cf6,#ec4899)",
  },
  {
    q: "Futebol em 4K ao vivo sem nenhum travamento ou delay. Impressionante.",
    nome: "Ana Militão",
    cargo: "Plano Anual",
    iniciais: "AM",
    dot: "linear-gradient(135deg,#22d3ee,#8b5cf6)",
  },
  {
    q: "Suporte no WhatsApp me respondeu em 2 minutos e ajudou na Smart TV.",
    nome: "Fernanda Rocha",
    cargo: "Plano Trimestral",
    iniciais: "FR",
    dot: "linear-gradient(135deg,#f59e0b,#ef4444)",
  },
  {
    q: "Catálogo gigantesco de filmes e séries 4K. Atualizam lançamentos todo dia.",
    nome: "Diego Prado",
    cargo: "Plano Mensal",
    iniciais: "DP",
    dot: "linear-gradient(135deg,#10b981,#22d3ee)",
  },
];

const LINHA2: CardDepo[] = [
  {
    q: "Cancelei a TV a cabo tradicional. Sinceramente? Não faz nenhuma falta.",
    nome: "Camila Brito",
    cargo: "Plano Anual",
    iniciais: "CB",
    dot: "linear-gradient(135deg,#10b981,#22d3ee)",
  },
  {
    q: "Testei vários serviços do mercado. Esse é o único que roda 100% sem travar.",
    nome: "Gustavo Serra",
    cargo: "Plano Semestral",
    iniciais: "GS",
    dot: "linear-gradient(135deg,#8b5cf6,#ec4899)",
  },
  {
    q: "Liberação imediata pelo PIX em menos de 1 minuto. Muito prático.",
    nome: "Priscila Lima",
    cargo: "Plano Mensal",
    iniciais: "PL",
    dot: "linear-gradient(135deg,#f59e0b,#ef4444)",
  },
  {
    q: "Simples de instalar no TV Box e no celular. Qualidade de imagem 10/10.",
    nome: "Rodrigo Maia",
    cargo: "Plano Trimestral",
    iniciais: "RM",
    dot: "linear-gradient(135deg,#22d3ee,#8b5cf6)",
  },
];

function CardMarquee({ c }: { c: CardDepo }) {
  return (
    <div
      className="group/card mr-4 w-[264px] flex-shrink-0 rounded-[14px] border border-[#23232f] px-[18px] py-4 transition-colors duration-300 hover:border-[rgba(139,92,246,0.5)]"
      style={{ background: "linear-gradient(180deg,#15151f,#111119)" }}
    >
      <p className="mb-3 text-[12.5px] leading-[1.55] text-[#b9b9c9]">{c.q}</p>
      <div className="flex items-center gap-[9px]">
        <div
          className="flex h-[26px] w-[26px] flex-shrink-0 items-center justify-center rounded-full text-[10px] font-extrabold text-white"
          style={{ background: c.dot }}
        >
          {c.iniciais}
        </div>
        <div>
          <div className="text-[11.5px] font-bold text-[#e7e7ef]">{c.nome}</div>
          <div className="text-[10.5px] text-[#6d6d80]">{c.cargo}</div>
        </div>
      </div>
    </div>
  );
}

export function MarqueeDepoimentos() {
  return (
    <section
      className="group min-h-[500px] overflow-hidden pb-9 pt-10 font-sans text-[#e7e7ef]"
      style={{
        background: "#0a0a0f",
        backgroundImage:
          "radial-gradient(ellipse 600px 300px at 50% -80px,rgba(124,58,237,.18),transparent)",
      }}
    >
      <style>{`
        @keyframes depo-mq { to { transform: translateX(-50%); } }
        .group:hover .depo-row { animation-play-state: paused; }
      `}</style>

      <div className="mb-[30px] px-10 text-center">
        <div className="mb-3 inline-block rounded-full border border-[rgba(139,92,246,0.35)] bg-[rgba(139,92,246,0.1)] px-[14px] py-[5px] text-[11px] font-semibold uppercase tracking-[0.12em] text-[#c4b5fd]">
          + de 12.000 clientes satisfeitos
        </div>
        <h2 className="text-[26px] font-extrabold tracking-[-0.02em]">
          Um fluxo contínuo de{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(90deg,#a78bfa,#22d3ee)" }}
          >
            gente satisfeita
          </span>
        </h2>
      </div>

      <div className="relative">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-[110px]"
          style={{ background: "linear-gradient(90deg,#0a0a0f,transparent)" }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-[110px]"
          style={{ background: "linear-gradient(270deg,#0a0a0f,transparent)" }}
        />

        <div
          className="depo-row mb-4 flex w-max"
          style={{ animation: "depo-mq 30s linear infinite" }}
        >
          {[...LINHA1, ...LINHA1].map((c, i) => (
            <CardMarquee key={"a" + i} c={c} />
          ))}
        </div>
        <div
          className="depo-row mb-4 flex w-max"
          style={{ animation: "depo-mq 36s linear infinite reverse" }}
        >
          {[...LINHA2, ...LINHA2].map((c, i) => (
            <CardMarquee key={"b" + i} c={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

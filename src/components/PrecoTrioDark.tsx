import { useState } from "react";
import { Check } from "lucide-react";
import { AccountCheckoutModal, PlanoData } from "./pricing/AccountCheckoutModal";

const planos: PlanoData[] = [
  {
    id: "MENSAL",
    nome: "Starter Mensal",
    desc: "Para testar sem compromisso",
    preco: "10,00",
    periodo: "/mês",
    link: "https://go.nitropagamentos.com/ni918",
  },
  {
    id: "TRIMESTRAL",
    nome: "Plus Trimestral",
    desc: "Assista em até 2 telas",
    preco: "24,90",
    periodo: "/trim",
    link: "https://go.nitropagamentos.com/h64gr",
  },
  {
    id: "SEMESTRAL",
    nome: "Pro Semestral",
    desc: "Economia de 60% de desconto",
    preco: "47,90",
    periodo: "/sem",
    link: "https://go.nitropagamentos.com/oinxr",
  },
  {
    id: "ANUAL",
    nome: "VIP Anual",
    desc: "Maior economia de 69%",
    preco: "73,90",
    periodo: "/ano",
    link: "https://go.nitropagamentos.com/lzcus",
  },
];

const planoRecursos: Record<string, string[]> = {
  MENSAL: [
    "1 Conexão Simultânea",
    "+60.000 Conteúdos (4K/FHD)",
    "Futebol, Filmes & Séries",
    "Ativação Instantânea via Pix",
  ],
  TRIMESTRAL: [
    "2 Conexões Simultâneas (Casal)",
    "Qualidade 4K Ultra HD",
    "Premiere, Champions & Filmes",
    "Suporte Dedicado via WhatsApp",
  ],
  SEMESTRAL: [
    "3 Conexões Simultâneas (Família)",
    "Sinal Liso Antitravamento 4K",
    "Todos os Canais & Lançamentos",
    "Instalação Guiada em 2 Minutos",
    "Economia Brutal de 60%",
  ],
  ANUAL: [
    "4 Conexões Simultâneas Liberadas",
    "Maior Economia (R$ 0,20/dia)",
    "Acesso VIP Total em 4K",
    "Garantia Total de Estabilidade",
  ],
};

const ctaLabels: Record<string, string> = {
  MENSAL: "Testar por R$ 10/Mês",
  TRIMESTRAL: "Assinar Trimestral (2 Telas)",
  SEMESTRAL: "Assinar Semestral (Mais Vendido)",
  ANUAL: "Garantir VIP Anual (Maior Economia)",
};

const planoDailyAnchor: Record<string, string> = {
  MENSAL: "Apenas R$ 0,33 por dia",
  TRIMESTRAL: "Equivale a R$ 8,30/mês • 2 Telas",
  SEMESTRAL: "Equivale a R$ 7,98/mês • Mais Vendido",
  ANUAL: "Equivale a R$ 6,16/mês • R$ 0,20/dia",
};

export function PrecoTrioDark() {
  const [selectedPlan, setSelectedPlan] = useState<PlanoData | null>(null);

  return (
    <section
      id="planos"
      className="relative flex min-h-[500px] flex-col items-center justify-center overflow-hidden bg-[#000000] px-6 py-24 font-body text-foreground border-t border-border z-10"
    >
      <style>{`@keyframes energiaGirar{to{transform:rotate(360deg)}}`}</style>
      <div
        className="pointer-events-none absolute left-1/2 top-[-260px] h-[520px] w-[640px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(closest-side, rgba(151, 2, 2, 0.25), transparent 70%)",
        }}
      />
      <div className="relative mb-12 text-center max-w-2xl mx-auto">
        <span className="mb-3 inline-block rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 font-code text-xs font-bold tracking-[2.5px] uppercase text-brand">
          🛡️ RISCO ZERO • TESTE POR 7 DIAS
        </span>
        <h2 className="section-title text-center text-foreground">
          ESCOLHA SEU PLANO E{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-foreground">
            ECONOMIZE ATÉ 69%
          </span>
        </h2>
        <p className="text-muted-foreground mt-3 font-code text-xs uppercase tracking-wider">
          Sem contrato, sem fidelidade e com ativação instantânea em 2 minutos via Pix.
        </p>
      </div>

      <div className="relative flex flex-wrap lg:flex-nowrap items-stretch gap-[16px] w-full max-w-6xl justify-center pt-3">
        {planos.map((p) => {
          const isPopular = p.id === "SEMESTRAL";
          const recursos = planoRecursos[p.id] || [];
          const cta = ctaLabels[p.id] || "Assinar Agora";

          if (isPopular) {
            return (
              <div
                key={p.id}
                className="relative flex w-full sm:w-[calc(50%-12px)] lg:w-[260px] flex-col max-lg:order-first lg:-translate-y-[14px] lg:hover:-translate-y-[18px] transition-transform duration-[250ms]"
              >
                {/* Badge MAIS POPULAR em vermelho crimson #970202 com glow */}
                <span className="absolute left-1/2 top-[-11px] -translate-x-1/2 whitespace-nowrap rounded-full bg-[#970202] px-3.5 py-0.5 text-[9.5px] font-bold font-code tracking-[1.2px] text-white shadow-[0_0_16px_rgba(151,2,2,0.9)] z-30">
                  MAIS POPULAR
                </span>

                {/* Wrapper com Borda de Energia giratória em #970202 */}
                <div className="relative overflow-hidden rounded-[20px] bg-[#140003] p-[1.5px] shadow-[0_0_50px_rgba(151,2,2,0.5),0_20px_50px_rgba(0,0,0,0.95)] h-full flex flex-col">
                  <div
                    className="absolute -inset-[120%]"
                    style={{
                      background:
                        "conic-gradient(from 0deg,rgba(151,2,2,0) 0deg,rgba(151,2,2,0) 200deg,#970202 255deg,#d32f2f 300deg,rgba(211,47,47,0) 335deg,rgba(151,2,2,0) 360deg)",
                      animation: "energiaGirar 4s linear infinite",
                    }}
                  />
                  <div className="relative flex flex-col flex-1 rounded-[18.5px] bg-[#000000] p-[22px] pt-[24px]">
                    <div className="text-[15px] font-bold font-heading uppercase text-white tracking-wide">
                      {p.nome}
                    </div>
                    <div className="mt-1 text-[12px] font-code text-[#a1a1aa] min-h-[32px]">
                      {p.desc}
                    </div>

                    <div className="mb-1 mt-4 flex items-baseline gap-1.5">
                      <span className="text-sm font-bold font-code text-[#71717a]">
                        R$
                      </span>
                      <span className="text-[38px] font-extrabold font-code tracking-tight text-white glow-text">
                        {p.preco}
                      </span>
                      <span className="text-xs font-code text-[#71717a]">
                        {p.periodo}
                      </span>
                    </div>
                    <div className="text-[11px] font-code text-emerald-400 font-bold mb-2 flex items-center gap-1">
                      <span>⚡</span>
                      <span>{planoDailyAnchor[p.id]}</span>
                    </div>

                    <ul className="my-4 flex-1 list-none border-t border-white/10 pt-4 flex flex-col gap-2.5">
                      {recursos.map((r) => (
                        <li
                          key={r}
                          className="flex items-center gap-2.5 text-xs text-[#d4d4d8]"
                        >
                          <Check
                            className="h-4 w-4 flex-none text-[#970202]"
                            strokeWidth={2.5}
                          />
                          {r}
                        </li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      onClick={() => setSelectedPlan(p)}
                      className="w-full cursor-pointer rounded-[12px] border-none bg-[#970202] hover:bg-[#b80303] py-3 text-center text-xs font-bold font-heading uppercase tracking-wider text-white shadow-[0_8px_24px_-8px_rgba(151,2,2,0.9)] transition-all"
                    >
                      {cta}
                    </button>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div
              key={p.id}
              className="relative flex w-full sm:w-[calc(50%-12px)] lg:w-[260px] flex-col rounded-[20px] border border-[#3b0d10] bg-[#000000] p-[22px] backdrop-blur-md transition-all duration-[250ms] hover:-translate-y-1 hover:border-[#970202]/60 hover:shadow-[0_0_25px_rgba(151,2,2,0.25)]"
            >
              <div className="text-[15px] font-bold font-heading uppercase text-white tracking-wide">
                {p.nome}
              </div>
              <div className="mt-1 text-[12px] font-code text-[#a1a1aa] min-h-[32px]">
                {p.desc}
              </div>

              <div className="mb-1 mt-4 flex items-baseline gap-1.5">
                <span className="text-sm font-bold font-code text-[#71717a]">
                  R$
                </span>
                <span className="text-[38px] font-extrabold font-code tracking-tight text-white">
                  {p.preco}
                </span>
                <span className="text-xs font-code text-[#71717a]">
                  {p.periodo}
                </span>
              </div>
              <div className="text-[11px] font-code text-emerald-400 font-bold mb-2 flex items-center gap-1">
                <span>⚡</span>
                <span>{planoDailyAnchor[p.id]}</span>
              </div>

              <ul className="my-4 flex-1 list-none border-t border-white/10 pt-4 flex flex-col gap-2.5">
                {recursos.map((r) => (
                  <li
                    key={r}
                    className="flex items-center gap-2.5 text-xs text-[#d4d4d8]"
                  >
                    <Check
                      className="h-4 w-4 flex-none text-[#970202]"
                      strokeWidth={2.5}
                    />
                    {r}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => setSelectedPlan(p)}
                className="w-full cursor-pointer rounded-[12px] border border-white/10 bg-[#0d0d11] hover:bg-[#15151c] hover:border-[#970202]/60 py-3 text-center text-xs font-bold font-heading uppercase tracking-wider text-white transition-all"
              >
                {cta}
              </button>
            </div>
          );
        })}
      </div>

      {/* Selos de Confiança e Garantia */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-center font-code text-xs text-muted-foreground max-w-4xl border-t border-white/5 pt-8">
        <div className="flex items-center gap-2">
          <span className="text-emerald-400 font-bold text-sm">🛡️</span>
          <span>Garantia de 7 Dias ou Seu Dinheiro de Volta</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-amber-400 font-bold text-sm">⚡</span>
          <span>Liberação Automática via Pix em 2 Minutos</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-cyan-400 font-bold text-sm">📱</span>
          <span>Instalação sem Antenas em Qualquer Aparelho</span>
        </div>
      </div>

      <AccountCheckoutModal
        open={!!selectedPlan}
        plano={selectedPlan}
        onClose={() => setSelectedPlan(null)}
      />
    </section>
  );
}

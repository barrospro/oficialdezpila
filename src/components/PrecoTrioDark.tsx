import { useState } from "react";
import { Check } from "lucide-react";
import { CheckoutModal } from "./pricing/CheckoutModal";

interface PlanoTrio {
  id: string;
  nome: string;
  desc: string;
  preco: string;
  periodo: string;
  recursos: string[];
  cta: string;
  link: string;
  popular?: boolean;
}

const planos: PlanoTrio[] = [
  {
    id: "MENSAL",
    nome: "Starter Mensal",
    desc: "Para testar sem compromisso",
    preco: "10,00",
    periodo: "/mês",
    recursos: [
      "1 conexão simultânea",
      "+60.000 conteúdos (4K/FHD)",
      "Guia de programação (EPG)",
      "Suporte via WhatsApp",
    ],
    cta: "Assinar Mensal",
    link: "https://go.nitropagamentos.com/ni918",
  },
  {
    id: "TRIMESTRAL",
    nome: "Plus Trimestral",
    desc: "Assista em até 2 telas",
    preco: "19,90",
    periodo: "/trim",
    recursos: [
      "2 conexões simultâneas",
      "+60.000 conteúdos em 4K",
      "Filmes, Séries & EPG completo",
      "Canais Adultos (Opcional)",
      "Suporte via WhatsApp",
    ],
    cta: "Assinar Trimestral",
    link: "https://go.nitropagamentos.com/h64gr",
  },
  {
    id: "SEMESTRAL",
    nome: "Pro Semestral",
    desc: "Economia de 66% de desconto",
    preco: "29,90",
    periodo: "/sem",
    recursos: [
      "3 conexões simultâneas",
      "+60.000 conteúdos em 4K",
      "Filmes, Séries & Premiere",
      "Instalação em múltiplos TVs",
      "Suporte prioritário 24/7",
    ],
    cta: "Assinar Semestral",
    link: "https://go.nitropagamentos.com/oinxr",
    popular: true,
  },
  {
    id: "ANUAL",
    nome: "VIP Anual",
    desc: "Maior economia de 71%",
    preco: "47,90",
    periodo: "/ano",
    recursos: [
      "4 conexões simultâneas",
      "+60.000 conteúdos 4K liberados",
      "Canais Adultos (Opcional)",
      "Garantia total de estabilidade",
    ],
    cta: "Assinar Anual",
    link: "https://go.nitropagamentos.com/lzcus",
  },
];

export function PrecoTrioDark() {
  const [selectedPlan, setSelectedPlan] = useState<PlanoTrio | null>(null);

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
      <div className="relative mb-12 text-center">
        <span className="mb-3 inline-block rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 font-code text-xs font-bold tracking-[2.5px] uppercase text-brand">
          SELECIONE SEU NÍVEL DE ACESSO
        </span>
        <h2 className="section-title text-center text-foreground">
          ESCOLHA SEU{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-foreground">
            PLANO
          </span>
        </h2>
        <p className="text-muted-foreground mt-3 font-code text-xs uppercase tracking-wider">
          Acesso total liberado em minutos após o pagamento
        </p>
      </div>

      <div className="relative flex flex-wrap lg:flex-nowrap items-stretch gap-[16px] w-full max-w-6xl justify-center pt-3">
        {planos.map((p) => {
          if (p.popular) {
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

                    <ul className="my-4 flex-1 list-none border-t border-white/10 pt-4 flex flex-col gap-2.5">
                      {p.recursos.map((r) => (
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
                      {p.cta}
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

              <ul className="my-4 flex-1 list-none border-t border-white/10 pt-4 flex flex-col gap-2.5">
                {p.recursos.map((r) => (
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
                {p.cta}
              </button>
            </div>
          );
        })}
      </div>

      {selectedPlan && (
        <CheckoutModal
          open={!!selectedPlan}
          planId={selectedPlan.id}
          planName={selectedPlan.nome}
          link={selectedPlan.link}
          onClose={() => setSelectedPlan(null)}
        />
      )}
    </section>
  );
}

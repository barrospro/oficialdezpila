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
      className="relative flex min-h-[500px] flex-col items-center justify-center overflow-hidden bg-[#07070a] px-6 py-24 font-body text-foreground border-t border-border z-10"
    >
      <style>{`@keyframes energiaGirar{to{transform:rotate(360deg)}}`}</style>
      <div
        className="pointer-events-none absolute left-1/2 top-[-260px] h-[520px] w-[640px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255, 59, 48, 0.2), transparent 70%)",
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
                className="relative flex w-full sm:w-[calc(50%-12px)] lg:w-[250px] flex-col max-lg:order-first lg:-translate-y-[14px] lg:hover:-translate-y-[18px] transition-transform duration-[250ms]"
              >
                {/* Badge MAIS POPULAR com fundo vermelho néon idêntico ao sistema */}
                <span className="absolute left-1/2 top-[-11px] -translate-x-1/2 whitespace-nowrap rounded-full bg-[#ff3b30] px-3.5 py-0.5 text-[9.5px] font-bold font-code tracking-[1.2px] text-white shadow-[0_0_16px_rgba(255,59,48,0.8)] z-30">
                  MAIS POPULAR
                </span>

                <div className="relative overflow-hidden rounded-[20px] bg-[#14141a] p-[1.5px] shadow-[0_0_50px_rgba(255,59,48,0.4),0_20px_50px_rgba(0,0,0,0.8)] h-full flex flex-col">
                  <div
                    className="absolute -inset-[120%]"
                    style={{
                      background:
                        "conic-gradient(from 0deg,rgba(255,59,48,0) 0deg,rgba(255,59,48,0) 200deg,#ff3b30 255deg,#ff8037 300deg,rgba(255,128,55,0) 335deg,rgba(255,59,48,0) 360deg)",
                      animation: "energiaGirar 4s linear infinite",
                    }}
                  />
                  <div className="relative flex flex-col flex-1 rounded-[18.5px] bg-[#08080b] p-[20px] pt-[22px]">
                    <div className="text-sm font-bold font-heading uppercase text-white">
                      {p.nome}
                    </div>
                    <div className="mt-[3px] text-[11px] font-code text-muted-foreground min-h-[32px]">
                      {p.desc}
                    </div>
                    <div className="mb-[2px] mt-[10px] flex items-baseline gap-1">
                      <span className="text-xs font-bold font-code text-muted-foreground">
                        R$
                      </span>
                      <span className="text-[34px] font-extrabold font-code tracking-[-1.5px] text-white glow-text">
                        {p.preco}
                      </span>
                      <span className="text-xs font-code text-muted-foreground">
                        {p.periodo}
                      </span>
                    </div>
                    <ul className="my-[13px] flex-1 list-none border-t border-border/40 pt-[13px]">
                      {p.recursos.map((r) => (
                        <li
                          key={r}
                          className="mb-2 flex items-center gap-2 text-xs text-muted-foreground"
                        >
                          <Check
                            className="h-[14px] w-[14px] flex-none text-[#ff3b30]"
                            strokeWidth={2.5}
                          />
                          {r}
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={() => setSelectedPlan(p)}
                      className="w-full rounded-[10px] bg-[#ff3b30] py-[10px] text-center text-[12.5px] font-bold uppercase tracking-wider text-white shadow-[0_8px_24px_-8px_rgba(255,59,48,0.8)] transition-[filter] duration-200 hover:brightness-110 cursor-pointer border-none font-heading"
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
              className="relative flex w-full sm:w-[calc(50%-12px)] lg:w-[250px] flex-col rounded-[18px] border border-border/60 bg-[#08080b] p-[20px] backdrop-blur-md transition-[transform,border-color] duration-[250ms] hover:-translate-y-1 hover:border-brand/40"
            >
              <div className="text-sm font-bold font-heading uppercase text-white">
                {p.nome}
              </div>
              <div className="mt-[3px] text-[11px] font-code text-muted-foreground min-h-[32px]">
                {p.desc}
              </div>
              <div className="mb-[2px] mt-[10px] flex items-baseline gap-1">
                <span className="text-xs font-bold font-code text-muted-foreground">
                  R$
                </span>
                <span className="text-[34px] font-extrabold font-code tracking-[-1.5px] text-white glow-text">
                  {p.preco}
                </span>
                <span className="text-xs font-code text-muted-foreground">
                  {p.periodo}
                </span>
              </div>
              <ul className="my-[13px] flex-1 list-none border-t border-border/40 pt-[13px]">
                {p.recursos.map((r) => (
                  <li
                    key={r}
                    className="mb-2 flex items-center gap-2 text-xs text-muted-foreground"
                  >
                    <Check
                      className="h-[14px] w-[14px] flex-none text-[#ff3b30]"
                      strokeWidth={2.5}
                    />
                    {r}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => setSelectedPlan(p)}
                className="w-full rounded-[10px] border border-border/80 py-[10px] text-center text-[12.5px] font-bold uppercase tracking-wider text-foreground transition-colors duration-200 hover:bg-brand/10 hover:border-brand/40 cursor-pointer font-heading"
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

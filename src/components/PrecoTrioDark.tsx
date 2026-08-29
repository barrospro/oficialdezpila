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
    cta: "Garantir Desconto",
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
      className="relative flex min-h-[500px] flex-col items-center justify-center overflow-hidden bg-background px-6 py-24 font-body text-foreground border-t border-border z-10"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-[-260px] h-[520px] w-[640px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.55 0.25 29 / 0.25), transparent 70%)",
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

      <div className="relative flex flex-wrap lg:flex-nowrap items-stretch gap-[16px] w-full max-w-6xl justify-center">
        {planos.map((p) => (
          <div
            key={p.id}
            className={
              p.popular
                ? "relative flex w-full sm:w-[calc(50%-12px)] lg:w-[250px] flex-col rounded-[18px] border border-brand/60 bg-[linear-gradient(180deg,oklch(0.55_0.25_29_/_0.18),oklch(0.55_0.25_29_/_0.05))] p-[20px] shadow-[0_20px_50px_-14px_rgba(255,59,48,0.45),0_4px_14px_rgba(0,0,0,0.4)] transition-transform duration-[250ms] max-lg:order-first lg:-translate-y-[14px] lg:hover:-translate-y-[18px]"
                : "relative flex w-full sm:w-[calc(50%-12px)] lg:w-[250px] flex-col rounded-[18px] border border-border/80 bg-card/60 p-[20px] backdrop-blur-md transition-[transform,border-color] duration-[250ms] hover:-translate-y-1 hover:border-brand/40"
            }
          >
            {p.popular && (
              <span className="absolute left-1/2 top-[-11px] -translate-x-1/2 whitespace-nowrap rounded-full bg-[linear-gradient(90deg,#ff3b30,#ef4444)] px-3 py-0.5 text-[9.5px] font-bold font-code tracking-[1.2px] text-white shadow-md">
                MAIS POPULAR
              </span>
            )}
            <div className="text-sm font-bold font-heading uppercase text-foreground">
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
            <ul className="my-[13px] flex-1 list-none border-t border-border/50 pt-[13px]">
              {p.recursos.map((r) => (
                <li
                  key={r}
                  className="mb-2 flex items-center gap-2 text-xs text-muted-foreground"
                >
                  <Check
                    className="h-[14px] w-[14px] flex-none"
                    strokeWidth={2.5}
                    style={{ color: p.popular ? "#ff3b30" : "#ff6b63" }}
                  />
                  {r}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => setSelectedPlan(p)}
              className={
                p.popular
                  ? "w-full rounded-[10px] bg-[linear-gradient(90deg,#ff3b30,#ef4444)] py-[10px] text-center text-[12.5px] font-bold uppercase tracking-wider text-white shadow-[0_8px_24px_-8px_rgba(255,59,48,0.7)] transition-[filter] duration-200 hover:brightness-110 cursor-pointer border-none"
                  : "w-full rounded-[10px] border border-border/80 py-[10px] text-center text-[12.5px] font-bold uppercase tracking-wider text-foreground transition-colors duration-200 hover:bg-brand/10 hover:border-brand/40 cursor-pointer"
              }
            >
              {p.cta}
            </button>
          </div>
        ))}
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

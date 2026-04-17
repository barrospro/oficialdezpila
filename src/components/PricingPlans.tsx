import { useState } from "react";
import { Lock } from "lucide-react";

const features = [
  "Mais de 60.000 conteúdos disponíveis",
  "Qualidade SD / HD / FHD / 4K",
  "Guia de Programação [EPG] completo",
  "Compatível com Smartphone e Tablet",
  "Funciona em TV Box e Chromecast",
  "Smart TV, Computador e Navegador",
  "Pacote de Filmes e Séries incluso",
  "Suporte técnico via WhatsApp",
];

const plans = [
  {
    id: "MENSAL",
    name: "MENSAL",
    screens: "1 conexão simultânea",
    price: "10,00",
    period: "/mês",
    originalPrice: null,
    discount: null,
    link: "#",
    extra: [],
  },
  {
    id: "TRIMESTRAL",
    name: "TRIMESTRAL",
    screens: "2 conexões simultâneas",
    price: "19,90",
    period: "/trim",
    originalPrice: null,
    discount: null,
    link: "#",
    extra: ["Programação Adultos [Opcional]"],
  },
  {
    id: "SEMESTRAL",
    name: "SEMESTRAL",
    screens: "3 conexões simultâneas",
    price: "29,90",
    period: "/sem",
    originalPrice: "R$ 119,40",
    discount: "-66%",
    link: "#",
    extra: ["Programação Adultos [Opcional]"],
  },
  {
    id: "ANUAL",
    name: "ANUAL",
    screens: "4 conexões simultâneas",
    price: "47,90",
    period: "/ano",
    originalPrice: "R$ 238,80",
    discount: "-71%",
    link: "#",
    extra: ["Programação Adultos [Opcional]"],
  },
];

export function PricingPlans() {
  const [activeId, setActiveId] = useState("SEMESTRAL");
  const active = plans.find((p) => p.id === activeId)!;

  return (
    <section id="planos" className="px-6 lg:px-12 py-24 relative z-10 border-t border-border">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <p className="font-code text-brand text-xs uppercase tracking-widest mb-4 font-bold">
            Selecione Seu Nível de Acesso
          </p>
          <h2 className="section-title text-center">
            ESCOLHA SEU{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-orange-500">
              PLANO
            </span>
          </h2>
          <p className="text-muted-foreground mt-4 font-code text-sm">
            Acesso total liberado em minutos após o pagamento
          </p>
        </div>

        <div className="card-surface !p-6 md:!p-10 relative overflow-hidden">
          {/* Tabs selector */}
          <div className="relative bg-background/60 border border-border rounded-full p-1.5 flex items-center mb-10">
            {plans.map((plan) => {
              const isActive = plan.id === activeId;
              return (
                <button
                  key={plan.id}
                  onClick={() => setActiveId(plan.id)}
                  className={`relative flex-1 py-3 px-2 font-code text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-full ${
                    isActive
                      ? "bg-brand text-brand-foreground shadow-[0_0_20px_var(--brand-glow)]"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {plan.name}
                  {plan.discount && (
                    <span
                      className={`absolute -top-2 -right-1 text-[8px] px-1.5 py-0.5 font-bold rounded-sm ${
                        isActive
                          ? "bg-foreground text-background"
                          : "bg-brand text-brand-foreground"
                      }`}
                    >
                      {plan.discount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Price block */}
          <div className="text-center mb-8">
            <div className="font-code text-xs text-brand uppercase tracking-widest mb-3">
              [ PLANO {active.name} — {active.screens.toUpperCase()} ]
            </div>
            <div className="flex items-end justify-center gap-2">
              <span className="text-5xl md:text-7xl font-bold tabular-nums tracking-tighter font-code glow-text">
                R${active.price}
              </span>
              <span className="font-code text-sm text-muted-foreground mb-3">
                {active.period}
              </span>
            </div>
            {active.originalPrice && (
              <p className="text-muted-foreground/50 text-sm line-through font-code mt-2">
                de {active.originalPrice}
              </p>
            )}
          </div>

          <div className="border-t border-border my-8" />

          {/* Features */}
          <ul className="space-y-4 mb-10 font-code text-sm">
            {[...features, ...active.extra].map((f) => (
              <li key={f} className="flex items-start gap-3">
                <span className="text-brand mt-0.5 flex-shrink-0">[✓]</span>
                <span className="text-foreground/90">{f}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href={active.link}
            className="w-full py-5 text-center font-bold uppercase tracking-widest text-base block bg-brand text-brand-foreground hover:bg-foreground hover:text-background transition-colors shadow-[0_0_30px_var(--brand-glow)] rounded-sm"
          >
            ESCOLHER PLANO {active.name}
          </a>

          {/* Trust */}
          <div className="mt-6 text-center space-y-1">
            <div className="flex items-center justify-center gap-2 text-muted-foreground font-code text-xs uppercase tracking-widest">
              <Lock className="w-3 h-3" />
              <span>Ambiente Seguro</span>
            </div>
            <p className="text-muted-foreground/60 font-code text-xs">
              Acesso imediato após pagamento
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

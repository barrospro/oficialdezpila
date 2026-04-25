import { Plan, features, plans } from "@/components/pricing/plans-data";
import { Check } from "lucide-react";

export default function DesignSystem() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8 font-body">
      <div className="max-w-6xl mx-auto space-y-16">
        <header className="border-b border-white/10 pb-8">
          <h1 className="text-4xl font-heading font-bold uppercase tracking-tighter">Design System & Mockup Showcase</h1>
          <p className="text-muted-foreground mt-2">Visão geral dos componentes e identidade visual do projeto DezPila.</p>
        </header>

        {/* Cores */}
        <section>
          <h2 className="text-2xl font-heading font-bold mb-6 uppercase">Identidade Visual</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-20 bg-primary rounded-lg shadow-[0_0_20px_var(--brand-glow)]" />
              <p className="text-sm font-mono uppercase">Primary / Brand</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 bg-background border border-white/10 rounded-lg" />
              <p className="text-sm font-mono uppercase">Background</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 bg-surface border border-white/10 rounded-lg" />
              <p className="text-sm font-mono uppercase">Surface / Card</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 bg-foreground rounded-lg" />
              <p className="text-sm font-mono uppercase">Foreground</p>
            </div>
          </div>
        </section>

        {/* Tipografia */}
        <section className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-heading font-bold mb-6 uppercase">Tipografia</h2>
            <div className="space-y-4">
              <p className="text-5xl font-heading font-bold uppercase leading-none">Headline H1</p>
              <p className="text-3xl font-heading font-bold uppercase leading-none">Headline H2</p>
              <p className="text-xl font-body">Corpo de texto: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <p className="text-sm font-mono text-muted-foreground">Mono: System Diagnostics Active...</p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-heading font-bold mb-6 uppercase">Botões</h2>
            <div className="flex flex-wrap gap-4">
              <button className="btn-brand">Escolher Plano</button>
              <button className="btn-brand-outline">Saiba Mais</button>
            </div>
          </div>
        </section>

        {/* Mockup de Card de Plano */}
        <section>
          <h2 className="text-2xl font-heading font-bold mb-6 uppercase">Mockup: Plan Components</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {plans.slice(0, 3).map((plan) => (
              <div key={plan.id} className={plan.id === 'TRIMESTRAL' ? 'card-surface-brand scale-105 z-10' : 'card-surface'}>
                {plan.discount && (
                  <div className="absolute top-4 right-4 bg-foreground text-background px-2 py-1 text-xs font-bold">
                    {plan.discount}
                  </div>
                )}
                <h3 className="text-2xl font-heading font-bold mb-1 uppercase">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4 font-mono">{plan.screens}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-sm">R$</span>
                  <span className="text-5xl font-heading font-black">{plan.price.split(',')[0]}</span>
                  <span className="text-xl font-heading">,{plan.price.split(',')[1]}</span>
                  <span className="text-muted-foreground ml-1">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {features.slice(0, 5).map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={plan.id === 'TRIMESTRAL' ? 'btn-brand w-full' : 'btn-brand-outline w-full'}>
                  Assinar Agora
                </button>
              </div>
            ))}
          </div>
        </section>

        <footer className="pt-12 border-t border-white/10 text-center text-sm text-muted-foreground">
          DezPila Mockup System &bull; 2026
        </footer>
      </div>
    </div>
  );
}

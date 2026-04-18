import { Lock } from "lucide-react";
import type { Plan } from "./plans-data";

type Props = {
  plan: Plan;
  features: string[];
  onCheckout: () => void;
};

export function PlanDetails({ plan, features, onCheckout }: Props) {
  return (
    <>
      <div className="text-center mb-8">
        <div className="font-code text-xs text-brand uppercase tracking-widest mb-3">
          [ PLANO {plan.name} — {plan.screens.toUpperCase()} ]
        </div>
        <div className="flex items-end justify-center gap-2">
          <span className="text-5xl md:text-7xl font-bold tabular-nums tracking-tighter font-code glow-text">
            R${plan.price}
          </span>
          <span className="font-code text-sm text-muted-foreground mb-3">
            {plan.period}
          </span>
        </div>
        {plan.originalPrice && (
          <p className="text-muted-foreground/50 text-sm line-through font-code mt-2">
            de {plan.originalPrice}
          </p>
        )}
      </div>

      <div className="border-t border-border my-8" />

      <ul className="space-y-4 mb-10 font-code text-sm">
        {[...features, ...plan.extra].map((f) => (
          <li key={f} className="flex items-start gap-3">
            <span className="text-brand mt-0.5 flex-shrink-0">[✓]</span>
            <span className="text-foreground/90">{f}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onCheckout}
        className="w-full py-5 text-center font-bold uppercase tracking-widest text-base block bg-brand text-brand-foreground hover:bg-foreground hover:text-background transition-colors shadow-[0_0_30px_var(--brand-glow)] rounded-sm"
      >
        ESCOLHER PLANO {plan.name}
      </button>

      <div className="mt-6 text-center space-y-1">
        <div className="flex items-center justify-center gap-2 text-muted-foreground font-code text-xs uppercase tracking-widest">
          <Lock className="w-3 h-3" />
          <span>Ambiente Seguro</span>
        </div>
        <p className="text-muted-foreground/60 font-code text-xs">
          Acesso imediato após pagamento
        </p>
      </div>
    </>
  );
}

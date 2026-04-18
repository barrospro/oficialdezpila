import type { Plan } from "./plans-data";

type Props = {
  plans: Plan[];
  activeId: string;
  onSelect: (id: string) => void;
};

export function PlanTabs({ plans, activeId, onSelect }: Props) {
  return (
    <div className="relative bg-background/60 border border-border rounded-full p-1.5 flex items-center mb-10">
      {plans.map((plan) => {
        const isActive = plan.id === activeId;
        return (
          <button
            key={plan.id}
            onClick={() => onSelect(plan.id)}
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
  );
}

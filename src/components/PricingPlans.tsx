import { useEffect, useState } from "react";
import { PlanTabs } from "./pricing/PlanTabs";
import { PlanDetails } from "./pricing/PlanDetails";
import { CheckoutModal } from "./pricing/CheckoutModal";
import { features, plans } from "./pricing/plans-data";
import { loadCheckout } from "./pricing/checkout-storage";

export function PricingPlans() {
  const [activeId, setActiveId] = useState("SEMESTRAL");
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const active = plans.find((p) => p.id === activeId)!;

  // Restaurar checkout em andamento ao recarregar a página.
  useEffect(() => {
    const persisted = loadCheckout();
    if (!persisted) return;
    if (plans.some((p) => p.id === persisted.planId)) {
      setActiveId(persisted.planId);
    }
    setCheckoutOpen(true);
  }, []);

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
          <PlanTabs plans={plans} activeId={activeId} onSelect={setActiveId} />
          <PlanDetails
            plan={active}
            features={features}
            onCheckout={() => setCheckoutOpen(true)}
          />
        </div>
      </div>

      <CheckoutModal
        open={checkoutOpen}
        planName={active.name}
        link={active.link}
        onClose={() => setCheckoutOpen(false)}
      />
    </section>
  );
}

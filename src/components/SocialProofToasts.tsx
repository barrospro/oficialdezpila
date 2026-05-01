import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";

const names = [
  "Ricardo",
  "Mariana",
  "Lucas",
  "Fernanda",
  "Rafael",
  "Amanda",
  "Thiago",
  "Juliana",
  "Pedro",
  "Carolina",
  "Bruno",
  "Gabriela",
  "Felipe",
  "Larissa",
  "Diego",
  "Camila",
  "Gustavo",
  "Patrícia",
  "Rodrigo",
  "Beatriz",
  "André",
  "Letícia",
  "Marcelo",
  "Vanessa",
];

const cities = [
  "São Paulo, SP",
  "Rio de Janeiro, RJ",
  "Belo Horizonte, MG",
  "Curitiba, PR",
  "Porto Alegre, RS",
  "Salvador, BA",
  "Recife, PE",
  "Fortaleza, CE",
  "Brasília, DF",
  "Manaus, AM",
  "Goiânia, GO",
  "Florianópolis, SC",
  "Vitória, ES",
  "Natal, RN",
  "Campinas, SP",
];

const plans = ["MENSAL", "TRIMESTRAL", "SEMESTRAL", "ANUAL"];

const timeAgo = ["agora mesmo", "há 1 minuto", "há 2 minutos", "há 4 minutos", "há 7 minutos"];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

type Toast = {
  id: number;
  name: string;
  city: string;
  plan: string;
  time: string;
};

export function SocialProofToasts() {
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => {
    let counter = 0;
    let hideTimer: ReturnType<typeof setTimeout>;
    let nextTimer: ReturnType<typeof setTimeout>;

    const showNext = () => {
      counter += 1;
      setToast({
        id: counter,
        name: pick(names),
        city: pick(cities),
        plan: pick(plans),
        time: pick(timeAgo),
      });

      hideTimer = setTimeout(() => setToast(null), 5000);
      nextTimer = setTimeout(showNext, 9000);
    };

    const initial = setTimeout(showNext, 3500);

    return () => {
      clearTimeout(initial);
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, []);

  if (!toast) return null;

  return (
    <div
      key={toast.id}
      className="fixed bottom-4 left-4 right-4 sm:right-auto sm:left-6 sm:bottom-6 z-50 max-w-sm animate-fade-in"
      role="status"
      aria-live="polite"
    >
      <div className="card-surface !p-4 flex items-start gap-3 border-brand/40 shadow-[0_0_30px_var(--brand-glow)]">
        <div className="flex-shrink-0 w-10 h-10 bg-brand/10 border border-brand/30 flex items-center justify-center">
          <CheckCircle2 className="w-5 h-5 text-brand" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-foreground leading-tight">
            {toast.name} acabou de assinar
          </p>
          <p className="font-code text-xs text-brand mt-1 uppercase tracking-wider">
            Plano {toast.plan}
          </p>
          <div className="flex items-center justify-between mt-2 gap-2">
            <span className="font-code text-[10px] text-muted-foreground uppercase tracking-widest truncate">
              {toast.city}
            </span>
            <span className="font-code text-[10px] text-muted-foreground/70 flex items-center gap-1 flex-shrink-0">
              <span className="w-1.5 h-1.5 bg-live rounded-full animate-pulse" />
              {toast.time}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

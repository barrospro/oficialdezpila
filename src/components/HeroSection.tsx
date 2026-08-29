import { useState, useEffect } from "react";
import devicesMockup from "@/assets/devices-mockup.png";

function CountdownTimer() {
  const [time, setTime] = useState({ h: 1, m: 14, s: 59 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        const totalSecs = prev.h * 3600 + prev.m * 60 + prev.s - 1;
        if (totalSecs <= 0) return { h: 1, m: 14, s: 59 };
        return {
          h: Math.floor(totalSecs / 3600),
          m: Math.floor((totalSecs % 3600) / 60),
          s: totalSecs % 60,
        };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <span
      className="font-code text-2xl tracking-tight font-extrabold tabular-nums text-foreground"
      style={{ animation: "countdown-pulse 2s ease-in-out infinite" }}
    >
      {pad(time.h)}:{pad(time.m)}:{pad(time.s)}
    </span>
  );
}

export function HeroSection() {
  return (
    <section className="min-h-[90vh] flex flex-col justify-center px-6 lg:px-12 pt-28 sm:pt-32 lg:pt-36 pb-20 relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-brand/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-live/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        <div className="lg:col-span-6 flex flex-col items-start gap-8">
          {/* Status badge */}
          <div className="inline-flex items-center gap-3 px-3 py-1.5 bg-surface border border-border backdrop-blur-md">
            <span
              className="size-2 rounded-full bg-live shadow-[0_0_10px_var(--live)]"
              style={{ animation: "strobe 1s infinite" }}
            />
            <span className="text-live font-code text-[10px] tracking-widest font-bold uppercase">
              Sinal Ativo • +2.000 Canais Online
            </span>
          </div>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="size-4 bg-brand skew-x-[-15deg]" />
            <span className="text-2xl font-bold tracking-tighter uppercase">
              DEZ<span className="text-muted-foreground">PILA</span>
            </span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold uppercase leading-[0.85] tracking-tighter text-balance drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            Conteúdo Ilimitado{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-orange-500">
              Pelo Preço
            </span>{" "}
            Que Você Merece.
          </h1>

          <p className="text-lg text-muted-foreground max-w-[45ch] font-medium text-pretty leading-relaxed">
            Netflix, Disney+, HBO Max, esportes ao vivo e +60.000 conteúdos. Qualidade 4K, sistema
            anti-travamento e suporte dedicado 24/7. Tudo por R$10/mês.
          </p>

          <div className="w-full max-w-md mt-4 flex flex-col gap-3">
            <div className="flex items-center justify-between px-5 py-3 bg-brand/10 border-l-4 border-brand backdrop-blur-sm">
              <span className="text-brand font-code text-xs uppercase font-bold tracking-widest">
                Oferta Encerra Em:
              </span>
              <CountdownTimer />
            </div>
            <a href="#planos" className="btn-brand w-full text-center text-lg">
              LIBERAR ACESSO IMEDIATO
            </a>
            <div className="flex items-center gap-2 justify-center mt-1 opacity-50">
              <span className="font-code text-[10px] uppercase tracking-widest">
                Pagamento seguro • Liberação imediata via PIX
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 relative">
          <div className="relative bg-surface border border-border p-2 backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]">
            <div className="absolute -inset-1 bg-gradient-to-tr from-brand to-transparent opacity-20 blur-xl -z-10" />
            <div className="relative bg-background overflow-hidden aspect-video group">
              <img
                src={devicesMockup}
                alt="DezPila em múltiplos dispositivos"
                width={1024}
                height={576}
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent pointer-events-none" />
              <div className="absolute top-3 left-3 flex items-center gap-2 bg-background/80 border border-border px-3 py-1.5 backdrop-blur-md">
                <span
                  className="size-2 bg-destructive rounded-full"
                  style={{ animation: "strobe 1s infinite" }}
                />
                <span className="text-foreground font-code text-xs font-bold tracking-widest">
                  AO VIVO
                </span>
              </div>
              <span className="absolute top-3 right-3 bg-brand text-brand-foreground font-code text-xs px-2 py-1 font-bold">
                4K UHD
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

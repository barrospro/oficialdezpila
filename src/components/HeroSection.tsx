import { useState, useEffect, useRef } from "react";
import { GeoScarcityBanner } from "@/components/GeoScarcityBanner";
import { ShieldAlert, Lock, Play, Zap, Tv, Film, CheckCircle2 } from "lucide-react";

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
  const [showToast, setShowToast] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleProtectedAction = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowToast(true);
  };

  const togglePlayPause = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!iframeRef.current || !iframeRef.current.contentWindow) return;

    const nextPlayState = !isPlaying;
    iframeRef.current.contentWindow.postMessage(
      JSON.stringify({ method: nextPlayState ? "play" : "pause" }),
      "*"
    );
    setIsPlaying(nextPlayState);
    setHasStarted(true);
  };

  // Sincroniza estado de play/pause do Vimeo
  useEffect(() => {
    const handleVimeoMessage = (event: MessageEvent) => {
      try {
        const data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
        if (data && typeof data === "object") {
          if (data.event === "play") {
            setIsPlaying(true);
            setHasStarted(true);
          } else if (data.event === "pause" || data.event === "finish" || data.event === "ended") {
            setIsPlaying(false);
          }
        }
      } catch {
        // Ignora mensagens externas
      }
    };

    window.addEventListener("message", handleVimeoMessage);
    return () => window.removeEventListener("message", handleVimeoMessage);
  }, []);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

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
            Streaming Ilimitado{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-orange-500">
              Por R$10/Mês
            </span>{" "}
            e +2.000 Canais 4K.
          </h1>

          <p className="text-lg text-muted-foreground max-w-[45ch] font-medium text-pretty leading-relaxed">
            Netflix, Disney+, HBO Max, esportes ao vivo e +60.000 conteúdos. Qualidade 4K, sistema
            anti-travamento e suporte dedicado 24/7. Tudo por R$10/mês.
          </p>

          <div className="w-full max-w-md mt-2 flex flex-col gap-3">
            <GeoScarcityBanner />

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
          <div className="relative bg-surface border border-brand/40 p-2.5 sm:p-3 backdrop-blur-xl shadow-[0_0_50px_rgba(151,2,2,0.3)] rounded-2xl">
            <div className="absolute -inset-1 bg-gradient-to-tr from-brand to-transparent opacity-25 blur-xl -z-10" />
            <div
              className="group/player relative bg-black overflow-hidden aspect-video rounded-xl shadow-2xl border border-white/10 select-none"
              onContextMenu={handleProtectedAction}
            >
              {/* Iframe Vimeo Demonstrativo */}
              <iframe
                ref={iframeRef}
                src="https://player.vimeo.com/video/1169361385?api=1&player_id=hero_vimeo_player&title=0&byline=0&portrait=0&badge=0&like=0&watchlater=0&share=0&embed=0&autopause=0&color=970202&dnt=1&playsinline=1"
                title="Demonstrativo da plataforma DezPila Streaming 4K"
                className="absolute top-0 left-0 w-full h-full border-0 pointer-events-auto"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                allowFullScreen
                loading="eager"
              />

              {/* ESCUDO SUPERFICIAL: Protege contra clique direito e gerencia Play/Pause */}
              <div
                className="absolute inset-0 bottom-12 z-20 cursor-pointer select-none flex items-center justify-center"
                onContextMenu={handleProtectedAction}
                onClick={togglePlayPause}
                title={isPlaying ? "Pausar vídeo" : "Assistir demonstrativo"}
              >
                {(!hasStarted || !isPlaying) && (
                  <div className="flex items-center justify-center size-16 sm:size-20 rounded-full bg-[#970202]/90 hover:bg-[#b80303] text-white shadow-[0_0_40px_rgba(151,2,2,0.9)] border border-white/20 transition-transform duration-300 hover:scale-110 pointer-events-none">
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white ml-1" />
                  </div>
                )}
              </div>

              {/* Escudo Superior Esquerdo: Badge AO VIVO */}
              <div
                className="absolute top-3 left-3 z-25 flex items-center gap-2 bg-background/90 border border-border px-3 py-1.5 backdrop-blur-md cursor-default pointer-events-auto rounded shadow-lg"
                onContextMenu={handleProtectedAction}
                onClick={handleProtectedAction}
              >
                <span
                  className="size-2 bg-destructive rounded-full"
                  style={{ animation: "strobe 1s infinite" }}
                />
                <span className="text-foreground font-code text-xs font-bold tracking-widest">
                  AO VIVO
                </span>
              </div>

              {/* Escudo Lateral Direito: Bloqueia botões do Vimeo e exibe 4K VIP */}
              <div
                className="absolute top-0 right-0 w-24 h-48 z-25 cursor-default bg-gradient-to-l from-black/80 via-black/30 to-transparent flex flex-col items-end p-3 pointer-events-auto"
                onContextMenu={handleProtectedAction}
                onClick={handleProtectedAction}
                title="Reprodução Protegida"
              >
                <span className="bg-brand text-brand-foreground font-code text-xs px-2.5 py-1 font-bold rounded shadow-[0_0_15px_var(--brand-glow)] flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5" /> 4K UHD
                </span>
              </div>

              {/* Toast de Proteção contra cópia/download */}
              {showToast && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center gap-2.5 bg-[#140003]/95 border border-brand text-white px-5 py-3.5 rounded-xl shadow-[0_0_35px_rgba(151,2,2,0.85)] backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200 pointer-events-none">
                  <ShieldAlert className="w-5 h-5 text-brand shrink-0" />
                  <div className="text-left">
                    <p className="font-heading font-bold text-xs uppercase text-white tracking-wide">
                      Reprodução Protegida
                    </p>
                    <p className="font-code text-[10px] text-muted-foreground">
                      Cópia ou download desabilitados pelo sistema DezPila.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Micro-pills de Destaque Abaixo do Vídeo no Hero */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 font-code text-[11px]">
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-white/[0.02] border border-white/5 text-slate-300">
                <Zap className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                <span className="truncate">Troca Rápida</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-white/[0.02] border border-white/5 text-slate-300">
                <Tv className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">Ultra HD 4K</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-white/[0.02] border border-white/5 text-slate-300">
                <Film className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                <span className="truncate">+60.000 Títulos</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-white/[0.02] border border-white/5 text-slate-300">
                <CheckCircle2 className="h-3.5 w-3.5 text-brand shrink-0" />
                <span className="truncate">Liberação PIX</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



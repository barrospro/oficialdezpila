import { useState, useEffect, useRef } from "react";
import { ShieldAlert, Lock, Play, Pause } from "lucide-react";

export function VideoShowcase() {
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

  // Sincroniza estado de play/pause quando controlado pela barra inferior
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
        // Ignora mensagens de outros plugins
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
    <section
      id="demonstrativo"
      className="py-20 px-6 lg:px-12 relative z-10 border-t border-border/40 bg-[#000000]"
      onContextMenu={handleProtectedAction}
    >
      {/* Ambient Red Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-brand/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="mb-3 inline-block rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 font-code text-xs font-bold tracking-[2.5px] uppercase text-brand">
            DEMONSTRATIVO DA PLATAFORMA // VÍDEO OFICIAL
          </span>
          <h2 className="section-title text-center text-foreground">
            VEJA A DEZPILA{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-foreground">
              EM AÇÃO
            </span>
          </h2>
          <p className="text-muted-foreground mt-3 font-code text-xs uppercase tracking-wider max-w-2xl mx-auto">
            Confira a navegação ultra rápida, qualidade 4K sem travamentos e o catálogo completo liberado instantaneamente.
          </p>
        </div>

        {/* Frame do Vídeo com Camada de Proteção Total Anti-Clique Direito */}
        <div className="max-w-5xl mx-auto">
          <div className="relative p-2 sm:p-3 rounded-[24px] bg-[#0c0c10] border border-brand/40 shadow-[0_0_60px_rgba(151,2,2,0.3)] backdrop-blur-xl">
            <div
              className="group/player relative w-full aspect-video rounded-[18px] overflow-hidden bg-black shadow-2xl border border-white/10 select-none"
              onContextMenu={handleProtectedAction}
            >
              {/* Iframe Vimeo */}
              <iframe
                ref={iframeRef}
                src="https://player.vimeo.com/video/1169361385?api=1&player_id=vimeo_player&title=0&byline=0&portrait=0&badge=0&like=0&watchlater=0&share=0&embed=0&autopause=0&color=970202&dnt=1&playsinline=1"
                title="Demonstrativo da plataforma DezPila Streaming 4K"
                className="absolute top-0 left-0 w-full h-full border-0 pointer-events-auto"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                allowFullScreen
                loading="lazy"
              />

              {/* ESCUDO TOTAL SUPERFICIAL: Bloqueia 100% o menu de botão direito do Vimeo e gerencia o clique de Play/Pause */}
              <div
                className="absolute inset-0 bottom-12 z-20 cursor-pointer select-none flex items-center justify-center"
                onContextMenu={handleProtectedAction}
                onClick={togglePlayPause}
                title={isPlaying ? "Pausar vídeo" : "Assistir vídeo"}
              >
                {/* Botão de Play central se ainda não começou ou se estiver pausado */}
                {(!hasStarted || !isPlaying) && (
                  <div className="flex items-center justify-center size-20 rounded-full bg-[#970202]/90 hover:bg-[#b80303] text-white shadow-[0_0_40px_rgba(151,2,2,0.9)] border border-white/20 transition-transform duration-300 hover:scale-110 pointer-events-none">
                    <Play className="w-8 h-8 fill-white ml-1" />
                  </div>
                )}
              </div>

              {/* Escudo Lateral Direito: Bloqueia e oculta botões de curtir, assistir mais tarde, compartilhar e incorporar */}
              <div
                className="absolute top-0 right-0 w-20 h-64 z-25 cursor-default bg-gradient-to-l from-black/90 via-black/50 to-transparent flex flex-col items-end p-2.5 pointer-events-auto"
                onContextMenu={handleProtectedAction}
                onClick={handleProtectedAction}
                title="Reprodução Protegida"
              >
                <div className="flex items-center gap-1 bg-[#140003]/90 border border-brand/40 px-2 py-1 rounded-md text-[9px] font-code text-white shadow-lg backdrop-blur-md">
                  <Lock className="w-2.5 h-2.5 text-brand" />
                  <span className="text-[8px] font-bold text-brand uppercase">4K VIP</span>
                </div>
              </div>

              {/* Escudo Superior Esquerdo: Bloqueia foto de perfil e título */}
              <div
                className="absolute top-0 left-0 w-52 h-16 z-25 cursor-default bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-auto flex items-center pl-3"
                onContextMenu={handleProtectedAction}
                onClick={handleProtectedAction}
              >
                <div className="flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-[10px] font-code text-white/90 shadow-md">
                  <Lock className="w-3 h-3 text-brand" />
                  <span>Vídeo Oficial • DezPila</span>
                </div>
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
          </div>

          {/* Destaques em Pills */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
            <div className="card-surface p-4 text-center rounded-xl border border-white/10 hover:border-brand/40 transition-colors">
              <span className="font-heading text-xs font-bold uppercase text-white block mb-1">
                ⚡ Troca Instantânea
              </span>
              <span className="font-code text-[11px] text-muted-foreground">
                Zero travamentos ou buffering
              </span>
            </div>

            <div className="card-surface p-4 text-center rounded-xl border border-white/10 hover:border-brand/40 transition-colors">
              <span className="font-heading text-xs font-bold uppercase text-white block mb-1">
                📺 4K Ultra HD
              </span>
              <span className="font-code text-[11px] text-muted-foreground">
                Imagem cristalina na Smart TV
              </span>
            </div>

            <div className="card-surface p-4 text-center rounded-xl border border-white/10 hover:border-brand/40 transition-colors">
              <span className="font-heading text-xs font-bold uppercase text-white block mb-1">
                🎬 +60.000 Conteúdos
              </span>
              <span className="font-code text-[11px] text-muted-foreground">
                Filmes, séries e esportes
              </span>
            </div>

            <div className="card-surface p-4 text-center rounded-xl border border-white/10 hover:border-brand/40 transition-colors">
              <span className="font-heading text-xs font-bold uppercase text-white block mb-1">
                🚀 Ativação via PIX
              </span>
              <span className="font-code text-[11px] text-muted-foreground">
                Acesso liberado em minutos
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

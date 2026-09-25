import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { c as createSsrRpc } from "./createSsrRpc-C2cGivNr.mjs";
import { c as createServerFn } from "./index.mjs";
import { P as Play, L as Lock, V as VolumeX, i as Volume2, j as ShieldAlert, Z as Zap, k as Tv, F as Film, g as CircleCheck, l as ShieldCheck } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType, n as numberType } from "../_libs/zod.mjs";
function TopBanner() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "top-banner relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-block font-bold", style: { animation: "marquee 25s linear infinite" }, children: "ALERTA: LOTE PROMOCIONAL ENCERRA EM BREVE // ACESSO ANTI-BLOQUEIO ATIVADO // SERVIDORES 4K OPERACIONAIS // PAGAMENTO VIA PIX LIBERAÇÃO IMEDIATA // ALERTA: LOTE PROMOCIONAL ENCERRA EM BREVE // ACESSO ANTI-BLOQUEIO ATIVADO // SERVIDORES 4K OPERACIONAIS // PAGAMENTO VIA PIX LIBERAÇÃO IMEDIATA // " }) });
}
function GeoScarcityBanner() {
  const [geo, setGeo] = reactExports.useState({
    city: "São Paulo",
    region: "SP"
  });
  const [ping, setPing] = reactExports.useState(12);
  reactExports.useEffect(() => {
    const pingInterval = setInterval(() => {
      setPing(Math.floor(Math.random() * 4) + 10);
    }, 4e3);
    let isMounted = true;
    const fetchGeo = async () => {
      try {
        const res = await fetch("https://get.geojs.io/v1/ip/geo.json");
        if (!res.ok) throw new Error("Geo fetch failed");
        const data = await res.json();
        if (isMounted && data.city) {
          const cleanCity = data.city.length > 22 ? data.city.slice(0, 20) + "..." : data.city;
          setGeo({
            city: cleanCity,
            region: data.region || "BR"
          });
        }
      } catch {
        try {
          const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
          if (tz.includes("Sao_Paulo")) setGeo({ city: "São Paulo", region: "SP" });
          else if (tz.includes("Fortaleza")) setGeo({ city: "Fortaleza", region: "CE" });
          else if (tz.includes("Recife")) setGeo({ city: "Recife", region: "PE" });
          else if (tz.includes("Manaus")) setGeo({ city: "Manaus", region: "AM" });
          else if (tz.includes("Cuiaba")) setGeo({ city: "Cuiabá", region: "MT" });
          else setGeo({ city: "Sua Região", region: "BR" });
        } catch {
        }
      }
    };
    fetchGeo();
    return () => {
      isMounted = false;
      clearInterval(pingInterval);
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full rounded-xl bg-[#09090e]/90 border border-white/10 hover:border-brand/40 p-3 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.7)] transition-all", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 pb-2 mb-2 border-b border-white/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-2 w-2 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-emerald-500" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 font-heading text-xs uppercase text-slate-300 truncate", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "Servidor:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-extrabold text-white truncate", children: [
            geo.city,
            " (",
            geo.region,
            ")"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 font-code text-[11px] text-emerald-400 font-bold shrink-0 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          ping,
          "ms"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden xs:inline text-slate-400", children: "• Rota 4K" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 text-xs font-code", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-amber-300 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-3.5 w-3.5 text-amber-400 fill-amber-400 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate", children: [
          "Restam ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-white font-bold", children: "14 vagas" }),
          " de R$ 10 hoje"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-[11px] text-slate-400 shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3 w-3 text-brand" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Sinal" }),
        " Anti-Trava"
      ] })
    ] })
  ] });
}
function CountdownTimer() {
  const [time, setTime] = reactExports.useState({ h: 1, m: 14, s: 59 });
  reactExports.useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        const totalSecs = prev.h * 3600 + prev.m * 60 + prev.s - 1;
        if (totalSecs <= 0) return { h: 1, m: 14, s: 59 };
        return {
          h: Math.floor(totalSecs / 3600),
          m: Math.floor(totalSecs % 3600 / 60),
          s: totalSecs % 60
        };
      });
    }, 1e3);
    return () => clearInterval(interval);
  }, []);
  const pad = (n) => String(n).padStart(2, "0");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: "font-code text-2xl tracking-tight font-extrabold tabular-nums text-foreground",
      style: { animation: "countdown-pulse 2s ease-in-out infinite" },
      children: [
        pad(time.h),
        ":",
        pad(time.m),
        ":",
        pad(time.s)
      ]
    }
  );
}
function HeroSection() {
  const [showToast, setShowToast] = reactExports.useState(false);
  const [isPlaying, setIsPlaying] = reactExports.useState(false);
  const [hasStarted, setHasStarted] = reactExports.useState(false);
  const [isMuted, setIsMuted] = reactExports.useState(true);
  const iframeRef = reactExports.useRef(null);
  const videoContainerRef = reactExports.useRef(null);
  const handleProtectedAction = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowToast(true);
  };
  const playVideo = () => {
    if (!iframeRef.current || !iframeRef.current.contentWindow) return;
    iframeRef.current.contentWindow.postMessage(JSON.stringify({ method: "play" }), "*");
    setIsPlaying(true);
    setHasStarted(true);
  };
  const pauseVideo = () => {
    if (!iframeRef.current || !iframeRef.current.contentWindow) return;
    iframeRef.current.contentWindow.postMessage(JSON.stringify({ method: "pause" }), "*");
    setIsPlaying(false);
  };
  const togglePlayPause = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isPlaying) {
      pauseVideo();
    } else {
      playVideo();
      if (isMuted && iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ method: "setVolume", value: 1 }),
          "*"
        );
        setIsMuted(false);
      }
    }
  };
  const toggleSound = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!iframeRef.current || !iframeRef.current.contentWindow) return;
    const nextMuted = !isMuted;
    iframeRef.current.contentWindow.postMessage(
      JSON.stringify({ method: "setVolume", value: nextMuted ? 0 : 1 }),
      "*"
    );
    setIsMuted(nextMuted);
    if (!isPlaying) {
      playVideo();
    }
  };
  reactExports.useEffect(() => {
    const target = videoContainerRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            playVideo();
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);
  const handleMouseEnter = () => {
    if (!isPlaying) {
      playVideo();
    }
  };
  reactExports.useEffect(() => {
    const handleVimeoMessage = (event) => {
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
      }
    };
    window.addEventListener("message", handleVimeoMessage);
    return () => window.removeEventListener("message", handleVimeoMessage);
  }, []);
  reactExports.useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [showToast]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "min-h-[90vh] flex flex-col justify-center px-6 lg:px-12 pt-28 sm:pt-32 lg:pt-36 pb-20 relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-brand/10 rounded-full blur-[120px] pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-live/5 rounded-full blur-[100px] pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-6 flex flex-col items-start gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-3 px-3 py-1.5 bg-surface border border-border backdrop-blur-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "size-2 rounded-full bg-live shadow-[0_0_10px_var(--live)]",
              style: { animation: "strobe 1s infinite" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-live font-code text-[10px] tracking-widest font-bold uppercase", children: "⚡ Sinal Liso 4K • R$ 0,33/Dia • Liberação Instantânea via Pix" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-4 bg-brand skew-x-[-15deg]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl font-bold tracking-tighter uppercase", children: [
            "DEZ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "PILA" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-5xl lg:text-7xl font-bold uppercase leading-[0.85] tracking-tighter text-balance drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]", children: [
          "Cancele a TV a Cabo:",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-brand to-orange-500", children: "Sinal Liso 4K" }),
          " ",
          "Por Apenas R$ 10/Mês."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground max-w-[45ch] font-medium text-pretty leading-relaxed", children: "Esportes ao vivo, futebol sem travamentos na hora do gol, filmes do cinema e séries liberadas na sua Smart TV. Sem contrato, sem antenas e com suporte no WhatsApp." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md mt-2 flex flex-col gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(GeoScarcityBanner, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-3 bg-brand/10 border-l-4 border-brand backdrop-blur-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand font-code text-xs uppercase font-bold tracking-widest", children: "Lote Promocional Encerra Em:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CountdownTimer, {})
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#planos", className: "btn-brand w-full text-center text-lg", children: "LIBERAR ACESSO EM 2 MINUTOS" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 justify-center mt-1 opacity-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-code text-[10px] uppercase tracking-widest", children: "🔒 Pagamento 100% Seguro • Reembolso Garantido em 7 Dias" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-6 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          ref: videoContainerRef,
          onMouseEnter: handleMouseEnter,
          className: "relative bg-surface border border-brand/40 p-2.5 sm:p-3 backdrop-blur-xl shadow-[0_0_50px_rgba(151,2,2,0.3)] rounded-2xl transition-all duration-300 hover:border-brand/70",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-1 bg-gradient-to-tr from-brand to-transparent opacity-25 blur-xl -z-10" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "group/player relative bg-black overflow-hidden aspect-video rounded-xl shadow-2xl border border-white/10 select-none",
                onContextMenu: handleProtectedAction,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "iframe",
                    {
                      ref: iframeRef,
                      src: "https://player.vimeo.com/video/1169361385?api=1&player_id=hero_vimeo_player&autoplay=1&muted=1&title=0&byline=0&portrait=0&badge=0&like=0&watchlater=0&share=0&embed=0&autopause=0&color=970202&dnt=1&playsinline=1",
                      title: "Demonstrativo da plataforma DezPila Streaming 4K",
                      className: "absolute top-0 left-0 w-full h-full border-0 pointer-events-auto",
                      allow: "autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media",
                      allowFullScreen: true,
                      loading: "eager"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "absolute inset-0 bottom-14 z-20 cursor-pointer select-none flex items-center justify-center",
                      onContextMenu: handleProtectedAction,
                      onClick: togglePlayPause,
                      title: isPlaying ? "Clique para pausar" : "Clique para reproduzir",
                      children: !isPlaying && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center size-16 sm:size-20 rounded-full bg-[#970202]/90 hover:bg-[#b80303] text-white shadow-[0_0_40px_rgba(151,2,2,0.9)] border border-white/20 transition-transform duration-300 hover:scale-110 pointer-events-none animate-pulse", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-7 h-7 sm:w-8 sm:h-8 fill-white ml-1" }) })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "absolute top-3 left-3 z-25 flex items-center gap-2 bg-background/90 border border-border px-3 py-1.5 backdrop-blur-md cursor-default pointer-events-auto rounded shadow-lg",
                      onContextMenu: handleProtectedAction,
                      onClick: handleProtectedAction,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "size-2 bg-destructive rounded-full",
                            style: { animation: "strobe 1s infinite" }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-code text-xs font-bold tracking-widest", children: "AO VIVO" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "absolute top-0 right-0 w-24 h-48 z-25 cursor-default bg-gradient-to-l from-black/80 via-black/30 to-transparent flex flex-col items-end p-3 pointer-events-auto",
                      onContextMenu: handleProtectedAction,
                      onClick: handleProtectedAction,
                      title: "Reprodução Protegida",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-brand text-brand-foreground font-code text-xs px-2.5 py-1 font-bold rounded shadow-[0_0_15px_var(--brand-glow)] flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-2.5 h-2.5" }),
                        " 4K UHD"
                      ] })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: toggleSound,
                      className: "absolute bottom-3 left-3 z-30 flex items-center gap-2 bg-black/80 hover:bg-[#970202] text-white px-3 py-1.5 rounded-lg border border-white/20 backdrop-blur-md font-code text-xs font-bold transition-all shadow-lg cursor-pointer",
                      title: isMuted ? "Clique para ativar o som" : "Desativar áudio",
                      children: isMuted ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(VolumeX, { className: "w-4 h-4 text-amber-400 animate-bounce" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Ativar Som 🔊" })
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "w-4 h-4 text-emerald-400" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Áudio Ativo" })
                      ] })
                    }
                  ),
                  showToast && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-35 flex items-center gap-2.5 bg-[#140003]/95 border border-brand text-white px-5 py-3.5 rounded-xl shadow-[0_0_35px_rgba(151,2,2,0.85)] backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200 pointer-events-none", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "w-5 h-5 text-brand shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-heading font-bold text-xs uppercase text-white tracking-wide", children: "Reprodução Protegida" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-code text-[10px] text-muted-foreground", children: "Cópia ou download desabilitados pelo sistema DezPila." })
                    ] })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 font-code text-[11px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 p-2 rounded-lg bg-white/[0.02] border border-white/5 text-slate-300", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-3.5 w-3.5 text-amber-400 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: "Troca Rápida" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 p-2 rounded-lg bg-white/[0.02] border border-white/5 text-slate-300", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Tv, { className: "h-3.5 w-3.5 text-emerald-400 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: "Ultra HD 4K" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 p-2 rounded-lg bg-white/[0.02] border border-white/5 text-slate-300", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "h-3.5 w-3.5 text-cyan-400 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: "+60.000 Títulos" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 p-2 rounded-lg bg-white/[0.02] border border-white/5 text-slate-300", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5 text-brand shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: "Liberação PIX" })
              ] })
            ] })
          ]
        }
      ) })
    ] })
  ] });
}
const categories = [
  {
    id: "01",
    title: "Cinema 4K HDR",
    desc: "Lançamentos mundiais direto do cinema para sua casa. +45.000 títulos atualizados diariamente em qualidade absurda.",
    stat: { label: "ARQUIVOS", value: "> 45K" }
  },
  {
    id: "02",
    title: "Esportes Ao Vivo",
    desc: "Brasileirão, Champions, NBA, UFC e todos os pay-per-view liberados em tempo real. Zero delay, qualidade máxima.",
    stat: { label: "LATÊNCIA", value: "< 2ms" },
    highlighted: true
  },
  {
    id: "03",
    title: "Séries Completas",
    desc: "Temporadas completas com múltiplas faixas de áudio e legendas embutidas. Maratone sem interrupções.",
    stat: { label: "EPISÓDIOS", value: "ILIMITADO" }
  },
  {
    id: "04",
    title: "Canais Infantis",
    desc: "Disney+, Cartoon Network e toda a programação infantil com filtro parental integrado para a segurança da criançada.",
    stat: { label: "CANAIS", value: "> 200" }
  },
  {
    id: "05",
    title: "Animes CrunchyRoll",
    desc: "Lista enorme com todos os animes do momento atualizados. Naruto, One Piece, Demon Slayer e muito mais em HD.",
    stat: { label: "CATÁLOGO", value: "COMPLETO" }
  },
  {
    id: "06",
    title: "+2.000 Canais TV",
    desc: "TV aberta, fechada e internacionais. Todos os canais premium das operadoras em uma única plataforma.",
    stat: { label: "STATUS", value: "ONLINE" }
  }
];
function ContentSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "conteudo", className: "py-24 px-6 lg:px-12 relative z-10 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1440px] mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row justify-between items-end mb-16 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "section-title", children: [
        "O Arsenal",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-brand to-muted-foreground", children: "Completo" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-code text-xs uppercase tracking-widest mb-2", children: "Categorias Monitoradas" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-code text-sm text-brand font-bold tabular-nums", children: [
          "[SYS_OK: ",
          categories.length,
          " ATIVAS]"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `group relative p-8 card-surface ${cat.highlighted ? "border-brand/30 shadow-[inset_0_0_20px_var(--brand-glow)]" : ""}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 p-4 font-code text-xs text-brand/40 group-hover:text-brand transition-colors", children: cat.id }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold uppercase mb-4 group-hover:text-brand transition-colors", children: cat.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6 font-medium text-pretty text-sm", children: cat.desc }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `font-code text-xs flex justify-between border-t pt-4 ${cat.highlighted ? "border-brand/20 text-brand" : "border-border text-muted-foreground"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  cat.stat.label,
                  ":"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cat.highlighted ? "" : "text-foreground", children: cat.stat.value })
              ]
            }
          )
        ]
      },
      cat.id
    )) })
  ] }) });
}
const createNitroPixSchema = objectType({
  amountNum: numberType().min(1),
  planName: stringType().default("Starter Mensal"),
  planId: stringType().default("MENSAL"),
  name: stringType().trim().min(3),
  email: stringType().trim().email(),
  phone: stringType().min(10),
  document: stringType().min(11),
  sourceUrl: stringType().optional()
});
const createNitroPix = createServerFn({
  method: "POST"
}).inputValidator((data) => createNitroPixSchema.parse(data)).handler(createSsrRpc("75b142e5c9770a891e2d5c29406f36a4ad9d1ca46a65138def4dd6794805fb82"));
const createNitroCardSchema = objectType({
  amountNum: numberType().min(1),
  planName: stringType().default("Starter Mensal"),
  planId: stringType().default("MENSAL"),
  name: stringType().trim().min(3),
  email: stringType().trim().email(),
  phone: stringType().min(10),
  document: stringType().min(11),
  cardNumber: stringType().min(13),
  holderName: stringType().min(3),
  expirationMonth: stringType().min(1),
  expirationYear: stringType().min(2),
  cvv: stringType().min(3),
  installments: numberType().default(1),
  sourceUrl: stringType().optional()
});
createServerFn({
  method: "POST"
}).inputValidator((data) => createNitroCardSchema.parse(data)).handler(createSsrRpc("857122ff8a242f3c735b6bef8370745444908d765d5d1ca993aae1430dfeb3c9"));
const checkNitroPixStatusSchema = objectType({
  transactionId: stringType().min(1)
});
const checkNitroPixStatus = createServerFn({
  method: "POST"
}).inputValidator((data) => checkNitroPixStatusSchema.parse(data)).handler(createSsrRpc("8f81452859eb2a6341d8982a5376e5a50cd04b5d15cf38adeb25617f3dee9709"));
const createPix = createNitroPix;
const checkPixStatus = checkNitroPixStatus;
export {
  ContentSection as C,
  HeroSection as H,
  TopBanner as T,
  createPix as a,
  checkNitroPixStatus as b,
  checkPixStatus as c,
  createNitroPix as d
};

import { useState, useEffect } from "react";
import { MapPin, Zap, ShieldCheck } from "lucide-react";

interface GeoData {
  city: string;
  region: string;
}

export function GeoScarcityBanner() {
  const [geo, setGeo] = useState<GeoData>({
    city: "São Paulo",
    region: "SP",
  });
  const [ping, setPing] = useState(12);

  useEffect(() => {
    // 1. Variação suave de ping para dar sensação de telemetria ao vivo
    const pingInterval = setInterval(() => {
      setPing(Math.floor(Math.random() * 5) + 10); // 10ms a 14ms
    }, 4000);

    // 2. Detecção de localização rápida via serviço gratuito com fallback
    let isMounted = true;
    const fetchGeo = async () => {
      try {
        const res = await fetch("https://get.geojs.io/v1/ip/geo.json");
        if (!res.ok) throw new Error("Geo fetch failed");
        const data = await res.json();
        if (isMounted && data.city) {
          setGeo({
            city: data.city,
            region: data.region || "BR",
          });
        }
      } catch {
        // Fallback baseado no fuso horário do navegador
        try {
          const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
          if (tz.includes("Sao_Paulo")) setGeo({ city: "São Paulo", region: "SP" });
          else if (tz.includes("Fortaleza")) setGeo({ city: "Fortaleza", region: "CE" });
          else if (tz.includes("Recife")) setGeo({ city: "Recife", region: "PE" });
          else if (tz.includes("Manaus")) setGeo({ city: "Manaus", region: "AM" });
          else if (tz.includes("Cuiaba")) setGeo({ city: "Cuiabá", region: "MT" });
          else setGeo({ city: "sua região", region: "BR" });
        } catch {
          // Ignora erros
        }
      }
    };

    fetchGeo();

    return () => {
      isMounted = false;
      clearInterval(pingInterval);
    };
  }, []);

  return (
    <div className="w-full rounded-2xl bg-gradient-to-r from-[#140003] via-[#1a0005] to-[#0a0a0f] border border-brand/40 p-3.5 sm:p-4 shadow-[0_0_25px_rgba(151,2,2,0.3)] animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
        {/* Lado Esquerdo: Localização e Status do Servidor */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/20 border border-brand/50 text-brand shrink-0 shadow-[0_0_10px_var(--brand-glow)]">
            <MapPin className="h-4 w-4 text-brand animate-bounce" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-heading text-xs sm:text-sm font-extrabold uppercase text-white tracking-tight">
              <span>Servidor Regional:</span>
              <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                {geo.city} - {geo.region}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-code text-slate-400 mt-0.5">
              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Latência: {ping}ms (Rota Direta 4K)
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-brand" /> Anti-Trava
              </span>
            </div>
          </div>
        </div>

        {/* Lado Direito: Escassez Localizada */}
        <div className="flex items-center gap-1.5 font-code text-xs font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-xl self-stretch sm:self-auto justify-center">
          <Zap className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
          <span>Restam 14 vagas de R$ 10 hoje para {geo.city}</span>
        </div>
      </div>
    </div>
  );
}

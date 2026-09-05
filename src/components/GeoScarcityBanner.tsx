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
    // Variação suave de telemetria
    const pingInterval = setInterval(() => {
      setPing(Math.floor(Math.random() * 4) + 10); // 10ms a 13ms
    }, 4000);

    let isMounted = true;
    const fetchGeo = async () => {
      try {
        const res = await fetch("https://get.geojs.io/v1/ip/geo.json");
        if (!res.ok) throw new Error("Geo fetch failed");
        const data = await res.json();
        if (isMounted && data.city) {
          // Trunca nomes excessivamente longos de cidades para manter layout elegante
          const cleanCity = data.city.length > 22 ? data.city.slice(0, 20) + "..." : data.city;
          setGeo({
            city: cleanCity,
            region: data.region || "BR",
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
          // Fallback seguro
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
    <div className="w-full rounded-xl bg-[#09090e]/90 border border-white/10 hover:border-brand/40 p-3 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.7)] transition-all">
      {/* Linha Superior: Status do Servidor e Latência */}
      <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-white/5">
        <div className="flex items-center gap-2 min-w-0">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <div className="flex items-center gap-1.5 font-heading text-xs uppercase text-slate-300 truncate">
            <span className="text-slate-400">Servidor:</span>
            <span className="font-extrabold text-white truncate">
              {geo.city} ({geo.region})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 font-code text-[11px] text-emerald-400 font-bold shrink-0 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          <span>{ping}ms</span>
          <span className="hidden xs:inline text-slate-400">• Rota 4K</span>
        </div>
      </div>

      {/* Linha Inferior: Escassez e Garantia Anti-Trava */}
      <div className="flex items-center justify-between gap-2 text-xs font-code">
        <div className="flex items-center gap-1.5 text-amber-300 min-w-0">
          <Zap className="h-3.5 w-3.5 text-amber-400 fill-amber-400 shrink-0" />
          <span className="truncate">
            Restam <strong className="text-white font-bold">14 vagas</strong> de R$ 10 hoje
          </span>
        </div>

        <span className="flex items-center gap-1 text-[11px] text-slate-400 shrink-0">
          <ShieldCheck className="h-3 w-3 text-brand" />
          <span className="hidden sm:inline">Sinal</span> Anti-Trava
        </span>
      </div>
    </div>
  );
}

import { useState, useMemo } from "react";
import { Search, CheckCircle2, Film, Tv, Sparkles, X, Play, Zap } from "lucide-react";

interface CatalogItem {
  id: string;
  title: string;
  category: "filme" | "serie" | "futebol" | "canal" | "anime";
  badge: string;
  quality: string;
  audio: string;
  year?: string;
}

const PRESET_CATALOG: CatalogItem[] = [
  {
    id: "1",
    title: "Brasileirão Série A & B (Todos os Jogos)",
    category: "futebol",
    badge: "Futebol Ao Vivo",
    quality: "4K 60fps (Zero Delay)",
    audio: "Transmissão Oficial Premiere",
    year: "2026",
  },
  {
    id: "2",
    title: "UEFA Champions League & Libertadores",
    category: "futebol",
    badge: "Ao Vivo",
    quality: "4K Ultra HD",
    audio: "Transmissão TNT / Space / CazéTV",
    year: "2026",
  },
  {
    id: "3",
    title: "Deadpool & Wolverine / Lançamentos Cinema",
    category: "filme",
    badge: "Filme",
    quality: "4K HDR Dolby Vision",
    audio: "Dublado & Legendado 5.1",
    year: "Lançamento",
  },
  {
    id: "4",
    title: "Stranger Things & House of the Dragon",
    category: "serie",
    badge: "Série Completa",
    quality: "4K UHD",
    audio: "Todas as Temporadas",
    year: "Completa",
  },
  {
    id: "5",
    title: "Premiere Clubes, Sportv & ESPN 1 a 4",
    category: "canal",
    badge: "Canais 24h",
    quality: "Full HD & 4K 60fps",
    audio: "Sem Travamentos",
    year: "Ao Vivo",
  },
  {
    id: "6",
    title: "Demon Slayer, One Piece & Jujutsu Kaisen",
    category: "anime",
    badge: "Anime",
    quality: "4K / Full HD",
    audio: "Catálogo Crunchyroll Completo",
    year: "Atualizado",
  },
  {
    id: "7",
    title: "Divertida Mente 2 & Filmes Infantis Disney",
    category: "filme",
    badge: "Infantil / Kids",
    quality: "4K UHD",
    audio: "100% Dublado",
    year: "Lançamento",
  },
  {
    id: "8",
    title: "UFC Pay-Per-View & Noite de Lutas",
    category: "canal",
    badge: "UFC Fight Pass",
    quality: "4K 60fps",
    audio: "Card Principal & Preliminar",
    year: "Ao Vivo",
  },
];

const SUGGESTION_TAGS = [
  "⚽ Brasileirão Ao Vivo",
  "🎬 Lançamentos do Cinema",
  "🍿 Séries Netflix & Max",
  "📺 Premiere FC",
  "⚔️ Animes",
  "🥊 UFC Combate",
  "👑 Novelas",
];

export function ContentSearchSimulator() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleScrollToPlans = () => {
    const el = document.getElementById("planos");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Filtragem inteligente: sempre exibe resultados e NUNCA diz que não tem
  const results = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return PRESET_CATALOG;

    const matched = PRESET_CATALOG.filter(
      (item) =>
        item.title.toLowerCase().includes(term) ||
        item.badge.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term)
    );

    // Se encontrou no pré-set, retorna os correspondentes
    if (matched.length > 0) {
      return matched;
    }

    // Se NÃO encontrou no pré-set, GERA DINAMICAMENTE o card sob medida para o que o usuário digitou!
    const customTitle = searchTerm
      .trim()
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ");

    const dynamicCustomItem: CatalogItem = {
      id: "custom-" + term,
      title: customTitle,
      category: "filme",
      badge: "Disponível no Catálogo",
      quality: "4K Ultra HD • 60fps",
      audio: "Dublado & Legendado 5.1 (Sem Anúncios)",
      year: "Catálogo Completo",
    };

    return [dynamicCustomItem, ...PRESET_CATALOG.slice(0, 3)];
  }, [searchTerm]);

  return (
    <section className="relative overflow-hidden bg-[#07070b] px-6 py-20 font-body text-foreground border-t border-white/10 z-10">
      <div className="max-w-5xl mx-auto">
        {/* Cabeçalho */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 font-code text-xs font-bold uppercase tracking-wider text-brand mb-3 shadow-[0_0_15px_var(--brand-glow)]">
            <Sparkles className="h-3.5 w-3.5 text-brand" /> Simulador de Catálogo em Tempo Real
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold uppercase font-heading text-white tracking-tight">
            TEM O QUE VOCÊ <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-rose-400">QUER ASSISTIR?</span>
          </h2>
          <p className="text-muted-foreground mt-2.5 font-code text-xs sm:text-sm max-w-xl mx-auto">
            Consulte qualquer filme, série, novela, time de futebol ou canal e veja a liberação imediata.
          </p>
        </div>

        {/* Barra de Pesquisa */}
        <div className="relative max-w-2xl mx-auto mb-5">
          <div className="relative flex items-center">
            <Search className="absolute left-4 h-5 w-5 text-brand" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Digite qualquer filme, série, time de futebol ou canal..."
              className="w-full rounded-2xl border border-white/15 bg-white/[0.04] py-3.5 pl-12 pr-12 text-sm sm:text-base text-white placeholder-slate-500 font-body outline-none focus:border-brand focus:bg-white/[0.07] focus:shadow-[0_0_25px_rgba(151,2,2,0.4)] transition-all"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-4 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Limpar busca"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Tags de Sugestão Rápida */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 max-w-3xl mx-auto">
          {SUGGESTION_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSearchTerm(tag.replace(/^[^\s]+\s/, ""))}
              className="px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-brand/20 border border-white/10 hover:border-brand/50 text-slate-300 hover:text-white font-code text-xs font-semibold transition-all cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Grid de Resultados */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-8">
          {results.map((item) => (
            <div
              key={item.id}
              className="relative rounded-xl bg-gradient-to-r from-[#12121c] to-[#0c0c12] border border-white/10 hover:border-brand/60 p-4 transition-all duration-200 shadow-md group hover:shadow-[0_0_20px_rgba(151,2,2,0.3)] flex flex-col justify-between gap-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/15 border border-brand/40 text-brand shrink-0 group-hover:scale-105 transition-transform">
                    {item.category === "futebol" ? (
                      <span className="text-lg">⚽</span>
                    ) : item.category === "canal" ? (
                      <Tv className="h-5 w-5" />
                    ) : (
                      <Film className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sm sm:text-base text-white tracking-tight leading-snug">
                      {item.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] font-code text-slate-400">
                      <span className="text-emerald-400 font-semibold">{item.quality}</span>
                      <span>•</span>
                      <span>{item.audio}</span>
                    </div>
                  </div>
                </div>

                {/* Selo Verde de Disponível */}
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 text-[10px] font-bold font-code uppercase text-emerald-400 shrink-0">
                  <CheckCircle2 className="h-3 w-3" /> Liberado
                </span>
              </div>

              {/* Linha Inferior com Botão Rápido */}
              <div className="flex items-center justify-between pt-2.5 border-t border-white/5 font-code text-xs">
                <span className="text-slate-400 text-[11px]">
                  Liberado em todos os planos por <strong className="text-white">R$ 10,00/mês</strong>
                </span>
                <button
                  type="button"
                  onClick={handleScrollToPlans}
                  className="flex items-center gap-1 text-brand hover:text-white font-bold text-[11px] font-heading uppercase transition-colors cursor-pointer group-hover:underline"
                >
                  <Play className="h-3 w-3 fill-brand" />
                  <span>Assistir Agora →</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner Central */}
        <div className="rounded-2xl bg-gradient-to-r from-brand/20 via-brand/10 to-transparent border border-brand/40 p-5 sm:p-6 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="font-heading font-extrabold text-base sm:text-lg text-white uppercase">
              Tudo isso e mais 60.000 títulos liberados na sua Smart TV
            </h4>
            <p className="font-code text-xs text-slate-300 mt-0.5">
              Sem fidelidade e com liberação automática no PIX em menos de 2 minutos.
            </p>
          </div>
          <button
            type="button"
            onClick={handleScrollToPlans}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand hover:bg-[#b80303] text-white font-heading font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_var(--brand-glow)] transition-all cursor-pointer shrink-0 hover:scale-105"
          >
            <span className="flex items-center justify-center gap-2">
              <Zap className="h-4 w-4 text-amber-300 fill-amber-300" />
              Liberar Meu Acesso por R$ 10 →
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

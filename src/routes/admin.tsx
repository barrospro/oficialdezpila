import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Lock,
  User,
  LogOut,
  Download,
  Copy,
  Check,
  Search,
  Image as ImageIcon,
  Tv,
  Layers,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Palette,
} from "lucide-react";
import {
  INSTAGRAM_CREATIVES,
  BRAND_ASSETS,
} from "@/data/instagramContent";

export const Route = createFileRoute("/admin")({
  component: AdminDashboard,
  head: () => ({
    meta: [
      { title: "Painel Administrativo — DezPila Marketing & Criativos" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [loginError, setLoginError] = useState(false);

  // Tab State: 'feed' | 'stories' | 'todos' | 'identidade'
  const [activeTab, setActiveTab] = useState<
    "feed" | "stories" | "todos" | "identidade"
  >("feed");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Restaura autenticação do localStorage
  useEffect(() => {
    const isAuth = localStorage.getItem("dezpila_admin_auth");
    if (isAuth === "true") {
      setAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      user.trim().toLowerCase() === "admin" &&
      pass.trim() === "admin"
    ) {
      localStorage.setItem("dezpila_admin_auth", "true");
      setAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("dezpila_admin_auth");
    setAuthenticated(false);
    setUser("");
    setPass("");
  };

  const handleCopyCaption = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    } catch {
      // Fallback
    }
  };

  const handleDownload = (imgUrl: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = imgUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtragem dos criativos por busca
  const filteredCreatives = INSTAGRAM_CREATIVES.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      item.day.toString().includes(q) ||
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.caption.toLowerCase().includes(q)
    );
  });

  // Filtragem dos ativos de marca por busca
  const filteredBrandAssets = BRAND_ASSETS.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      item.name.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
    );
  });

  // TELA DE LOGIN ADMIN (Caso não esteja autenticado)
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#050507] text-white flex items-center justify-center p-4 relative overflow-hidden font-body">
        {/* Glow de Fundo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] bg-[#970202]/25 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#0e0f17]/90 backdrop-blur-xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 text-xl font-bold tracking-tighter uppercase text-white font-heading mb-2">
            <div className="size-4 bg-brand skew-x-[-15deg] shadow-[0_0_12px_var(--brand-glow)]" />
            <span>
              DEZ<span className="text-muted-foreground">PILA</span>
            </span>
          </div>

          <div className="text-center mb-6">
            <span className="inline-block px-3 py-1 rounded-full bg-[#970202]/20 border border-[#970202]/40 text-[#ff4d4d] text-[10px] font-bold uppercase tracking-widest font-code mb-1.5">
              ÁREA RESTRITA
            </span>
            <h1 className="text-lg font-bold uppercase text-white font-heading">
              Painel Administrativo
            </h1>
            <p className="text-xs text-slate-400 font-body mt-1">
              Entre com suas credenciais para acessar o acervo criativo.
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/15 border border-red-500/40 text-red-400 text-xs font-code text-center">
              ⚠️ Usuário ou senha incorretos.
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Usuário
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  placeholder="Seu usuário"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2.5 px-3.5 pr-10 text-xs text-white outline-none focus:border-[#970202] transition-all"
                />
                <User className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Senha
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2.5 px-3.5 pr-10 text-xs text-white outline-none focus:border-[#970202] transition-all"
                />
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#970202] to-[#b80303] hover:from-[#b80303] hover:to-[#d32f2f] text-xs font-bold uppercase tracking-wider text-white font-heading shadow-[0_8px_20px_rgba(151,2,2,0.5)] transition-all cursor-pointer"
            >
              Acessar Painel Admin →
            </button>
          </form>

          <div className="mt-6 text-center text-[10.5px] font-code text-slate-500">
            Acesso encriptado — Sistema Administrativo DezPila
          </div>
        </div>
      </div>
    );
  }

  // TELA DO PAINEL DASHBOARD ADMIN
  return (
    <div className="min-h-screen bg-[#050507] text-white font-body selection:bg-[#970202] selection:text-white pb-16">
      {/* Header do Painel */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050507]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-lg sm:text-xl font-bold tracking-tighter uppercase text-white font-heading">
              <div className="size-4 bg-brand skew-x-[-15deg] shadow-[0_0_12px_var(--brand-glow)]" />
              <span>
                DEZ<span className="text-muted-foreground">PILA</span>
              </span>
            </div>

            <span className="px-2.5 py-0.5 rounded-full bg-[#970202]/20 border border-[#970202]/40 text-[#ff4d4d] text-[10.5px] font-bold uppercase tracking-wider font-code">
              DASHBOARD MARKETING
            </span>
          </div>

          {/* Busca & Logout */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nome, dia, filtro..."
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-1.5 px-3 pl-9 text-xs text-white outline-none focus:border-[#970202] transition-all"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        {/* Banner de Boas-Vindas */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-[#141624] via-[#0e0f17] to-[#18080b] p-6 sm:p-8 mb-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#970202]/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider font-code mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              Acervo de Criativos & Marca Liberado
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white font-heading mb-2">
              CENTRAL DE CRIATIVOS E IDENTIDADE VISUAL
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-body leading-relaxed">
              Baixe as artes dos posts (Feed e Story) em alta resolução (4K), copie as legendas formatadas e faça o download da identidade visual completa da marca DezPila.
            </p>
          </div>
        </div>

        {/* NAVEGAÇÃO POR ABAS (FEED / STORY / TODAS / IDENTIDADE VISUAL) */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8 overflow-x-auto no-scrollbar gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab("feed")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase font-heading tracking-wider transition-all cursor-pointer ${
                activeTab === "feed"
                  ? "bg-[#970202] text-white shadow-[0_0_20px_rgba(151,2,2,0.6)]"
                  : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
              }`}
            >
              <ImageIcon className="h-4 w-4" />
              <span>Imagem Post (Feed 4:5)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("stories")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase font-heading tracking-wider transition-all cursor-pointer ${
                activeTab === "stories"
                  ? "bg-[#970202] text-white shadow-[0_0_20px_rgba(151,2,2,0.6)]"
                  : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
              }`}
            >
              <Tv className="h-4 w-4" />
              <span>Imagem Story (9:16)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("todos")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase font-heading tracking-wider transition-all cursor-pointer ${
                activeTab === "todos"
                  ? "bg-[#970202] text-white shadow-[0_0_20px_rgba(151,2,2,0.6)]"
                  : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
              }`}
            >
              <Layers className="h-4 w-4" />
              <span>Todas Imagens</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("identidade")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase font-heading tracking-wider transition-all cursor-pointer ${
                activeTab === "identidade"
                  ? "bg-[#970202] text-white shadow-[0_0_20px_rgba(151,2,2,0.6)]"
                  : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
              }`}
            >
              <Palette className="h-4 w-4 text-emerald-400" />
              <span>Identidade Visual</span>
            </button>
          </div>

          <div className="text-xs font-code text-slate-400 shrink-0">
            {activeTab === "identidade" ? (
              <>
                Total: <strong className="text-white font-bold">{filteredBrandAssets.length}</strong> arquivos de marca
              </>
            ) : (
              <>
                Total: <strong className="text-white font-bold">{filteredCreatives.length}</strong> publicações
              </>
            )}
          </div>
        </div>

        {/* ABA IDENTIDADE VISUAL */}
        {activeTab === "identidade" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
            {filteredBrandAssets.map((asset) => (
              <div
                key={asset.id}
                className="group relative flex flex-col rounded-2xl border border-white/10 bg-[#0d0e15] overflow-hidden hover:border-[#970202]/60 transition-all duration-300 shadow-lg hover:shadow-[0_10px_30px_rgba(151,2,2,0.25)]"
              >
                {/* Header do Card */}
                <div className="p-4 border-b border-white/10 bg-[#12141f] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10.5px] font-bold font-code uppercase tracking-wider">
                      {asset.format}
                    </span>
                    <span className="text-[11px] font-code text-slate-400">
                      {asset.category}
                    </span>
                  </div>
                  <span className="text-[10.5px] font-code text-slate-400">
                    {asset.dimensions}
                  </span>
                </div>

                {/* Prévia Visual do Ativo de Marca */}
                <div className="p-6 bg-black/60 flex items-center justify-center min-h-[220px]">
                  <img
                    src={asset.imagePath}
                    alt={asset.name}
                    className="max-h-[170px] w-auto max-w-full object-contain rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                {/* Título & Detalhes */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-sm font-bold uppercase text-white font-heading leading-tight mb-1">
                      {asset.name}
                    </h3>
                    <p className="text-xs text-slate-300 font-body leading-relaxed">
                      {asset.description}
                    </p>
                  </div>

                  {/* BOTÃO BAIXAR IMAGEM MARCA */}
                  <button
                    type="button"
                    onClick={() =>
                      handleDownload(asset.imagePath, `${asset.id}.png`)
                    }
                    className="w-full py-2.5 rounded-xl font-bold uppercase text-xs tracking-wider bg-[#970202] hover:bg-[#b80303] text-white shadow-[0_6px_16px_rgba(151,2,2,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer font-heading"
                  >
                    <Download className="h-4 w-4" />
                    <span>Baixar Imagem PNG ({asset.dimensions})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* GRID DE CRIATIVOS (POSTS / STORIES) */}
        {activeTab !== "identidade" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCreatives.map((creative) => {
              const showFeed = activeTab === "feed" || activeTab === "todos";
              const showStories = activeTab === "stories" || activeTab === "todos";
              const isCaptionExpanded = expandedId === creative.id;

              return (
                <div
                  key={creative.id}
                  className="group relative flex flex-col rounded-2xl border border-white/10 bg-[#0d0e15] overflow-hidden hover:border-[#970202]/60 transition-all duration-300 shadow-lg hover:shadow-[0_10px_30px_rgba(151,2,2,0.25)]"
                >
                  {/* Header do Card */}
                  <div className="p-4 border-b border-white/10 bg-[#12141f] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#970202] text-white text-[11px] font-bold font-code uppercase tracking-wider">
                        DIA {String(creative.day).padStart(2, "0")}
                      </span>
                      <span className="text-[11px] font-code text-slate-400 truncate max-w-[150px]">
                        {creative.category}
                      </span>
                    </div>
                  </div>

                  {/* Prévia Visual da Imagem */}
                  <div className="p-4 bg-black/40 flex items-center justify-center gap-3">
                    {showFeed && (
                      <div className="relative flex flex-col items-center">
                        <span className="text-[10px] font-code text-slate-400 mb-1">
                          Feed (4:5)
                        </span>
                        <img
                          src={creative.feedImage}
                          alt={`Feed Dia ${creative.day}`}
                          className="w-36 h-[180px] object-cover rounded-xl border border-white/15 shadow-md group-hover:scale-[1.02] transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    )}

                    {showStories && (
                      <div className="relative flex flex-col items-center">
                        <span className="text-[10px] font-code text-slate-400 mb-1">
                          Story (9:16)
                        </span>
                        <img
                          src={creative.storyImage}
                          alt={`Story Dia ${creative.day}`}
                          className="w-24 h-[180px] object-cover rounded-xl border border-white/15 shadow-md group-hover:scale-[1.02] transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>

                  {/* Título & Detalhes */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="text-xs font-bold uppercase text-white font-heading leading-tight mb-2">
                        {creative.title}
                      </h3>

                      {/* Caixa da Legenda com Expansor */}
                      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs text-slate-300 font-body relative">
                        <div
                          className={
                            "whitespace-pre-line overflow-hidden font-body text-[11.5px] leading-relaxed transition-all " +
                            (isCaptionExpanded
                              ? "max-h-none"
                              : "max-h-24 line-clamp-4")
                          }
                        >
                          {creative.caption}
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            setExpandedId(
                              isCaptionExpanded ? null : creative.id
                            )
                          }
                          className="mt-2 text-[10.5px] font-bold text-[#ff4d4d] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          {isCaptionExpanded ? (
                            <>
                              <span>Recolher legenda</span>
                              <ChevronUp className="h-3 w-3" />
                            </>
                          ) : (
                            <>
                              <span>Ver legenda completa</span>
                              <ChevronDown className="h-3 w-3" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* AÇÕES DOS CARDS (1. BAIXAR IMAGEM | 2. COPIAR LEGENDA) */}
                    <div className="space-y-2 pt-1 border-t border-white/10">
                      {/* BOTÃO 1 (TOPO): BAIXAR IMAGEM */}
                      {activeTab === "todos" ? (
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              handleDownload(
                                creative.feedImage,
                                `DezPila_Feed_Dia_${creative.day}.png`
                              )
                            }
                            className="w-full py-2 px-2.5 rounded-xl font-bold uppercase text-[11px] tracking-wider bg-[#970202] hover:bg-[#b80303] text-white shadow-[0_4px_12px_rgba(151,2,2,0.4)] transition-all flex items-center justify-center gap-1.5 cursor-pointer font-heading"
                          >
                            <Download className="h-3.5 w-3.5" />
                            <span>Baixar Feed</span>
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleDownload(
                                creative.storyImage,
                                `DezPila_Story_Dia_${creative.day}.png`
                              )
                            }
                            className="w-full py-2 px-2.5 rounded-xl font-bold uppercase text-[11px] tracking-wider bg-[#970202] hover:bg-[#b80303] text-white shadow-[0_4px_12px_rgba(151,2,2,0.4)] transition-all flex items-center justify-center gap-1.5 cursor-pointer font-heading"
                          >
                            <Download className="h-3.5 w-3.5" />
                            <span>Baixar Story</span>
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            handleDownload(
                              activeTab === "stories"
                                ? creative.storyImage
                                : creative.feedImage,
                              `DezPila_${
                                activeTab === "stories" ? "Story" : "Feed"
                              }_Dia_${creative.day}.png`
                            )
                          }
                          className="w-full py-2.5 rounded-xl font-bold uppercase text-xs tracking-wider bg-[#970202] hover:bg-[#b80303] text-white shadow-[0_6px_16px_rgba(151,2,2,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer font-heading"
                        >
                          <Download className="h-4 w-4" />
                          <span>
                            Baixar Imagem (
                            {activeTab === "stories" ? "Story" : "Feed"})
                          </span>
                        </button>
                      )}

                      {/* BOTÃO 2 (MEIO): COPIAR LEGENDA */}
                      <button
                        type="button"
                        onClick={() =>
                          handleCopyCaption(creative.id, creative.caption)
                        }
                        className={
                          "w-full py-2.5 rounded-xl font-bold uppercase text-xs tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer font-heading " +
                          (copiedId === creative.id
                            ? "bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                            : "bg-white/10 hover:bg-white/20 text-white border border-white/10")
                        }
                      >
                        {copiedId === creative.id ? (
                          <>
                            <Check className="h-4 w-4" />
                            <span>✓ Legenda Copiada!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            <span>Copiar Legenda</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

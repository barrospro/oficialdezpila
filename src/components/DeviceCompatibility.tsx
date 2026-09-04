import { useState } from "react";
import { Tv, Smartphone, Monitor, CheckCircle2, Zap, ShieldCheck } from "lucide-react";

interface DeviceInfo {
  id: string;
  name: string;
  category: string;
  icon: typeof Tv;
  app: string;
  installTime: string;
  resolution: string;
  description: string;
  steps: string[];
}

const devices: DeviceInfo[] = [
  {
    id: "samsung",
    name: "Samsung Smart TV",
    category: "Sistema Tizen (Todos os anos)",
    icon: Tv,
    app: "Smart STB / IBO Player / SS IPTV",
    installTime: "Menos de 2 minutos",
    resolution: "4K Ultra HD Real (60fps)",
    description: "Compatível com todos os modelos Samsung fabricados a partir de 2016. Aplicativo oficial disponível direto na Samsung Apps da sua TV.",
    steps: [
      "Abra a loja de aplicativos da sua Samsung Smart TV.",
      "Baixe um dos aplicativos recomendados pelo nosso sistema.",
      "Insira os dados gerados no PIX e acesse toda a grade 4K imediatamente.",
    ],
  },
  {
    id: "lg",
    name: "LG Smart TV",
    category: "Sistema webOS (Todos os modelos)",
    icon: Tv,
    app: "IBO Player / Smarters Pro / SS IPTV",
    installTime: "Menos de 2 minutos",
    resolution: "4K HDR & Dolby Audio",
    description: "Funciona nativamente em qualquer TV LG com webOS. Sem necessidade de cabos extras, dongles ou aparelhos externos.",
    steps: [
      "Acesse a LG Content Store no menu principal da TV.",
      "Instale o app reprodutor indicado no tutorial passo a passo.",
      "Pronto! Canais ao vivo, filmes e séries liberados em alta resolução.",
    ],
  },
  {
    id: "android-tv",
    name: "Android TV & Google TV",
    category: "TCL, Philips, Sony, Philco, etc.",
    icon: Tv,
    app: "Aplicativo Oficial DezPila / XCIPTV",
    installTime: "Menos de 1 minuto",
    resolution: "4K 60fps Estável",
    description: "Interface ultra-rápida na Google Play Store oficial com carregamento instantâneo de canais e troca sem delay.",
    steps: [
      "Abra a Google Play Store na sua Smart TV.",
      "Faça o download do aplicativo oficial com 1 clique.",
      "Faça login com seu usuário e senha gerados no pagamento.",
    ],
  },
  {
    id: "firestick",
    name: "Fire TV Stick & Mi Box",
    category: "Amazon Fire Stick / Xiaomi / Realme",
    icon: Tv,
    app: "App DezPila dedicado",
    installTime: "1 minuto e meio",
    resolution: "4K Ultra HD + Anti-Trava",
    description: "Transforma qualquer TV comum ou antiga em uma central multimídia de última geração com catálogo completo.",
    steps: [
      "Conecte seu Fire Stick ou Mi Box na entrada HDMI.",
      "Baixe nosso aplicativo direto pelo navegador ou loja de apps.",
      "Aproveite +60.000 filmes e futebol ao vivo sem travamento.",
    ],
  },
  {
    id: "tv-box",
    name: "TV Box (Todos os modelos)",
    category: "TX9, MXQ, Aquário, Intelbras, etc.",
    icon: Tv,
    app: "APK DezPila Otimizado",
    installTime: "Menos de 2 minutos",
    resolution: "Full HD & 4K UHD",
    description: "Nosso sistema é leve e consome pouca memória, rodando liso até mesmo nos modelos mais básicos de TV Box.",
    steps: [
      "Abra o navegador ou instalador da sua TV Box.",
      "Instale a versão otimizada anti-travamento.",
      "Seus canais entram no ar na hora com guia EPG completo.",
    ],
  },
  {
    id: "smartphone",
    name: "Celular & Tablet",
    category: "Android & iPhone (iOS)",
    icon: Smartphone,
    app: "App Móvel Oficial / Smarters Player",
    installTime: "30 segundos",
    resolution: "Alta Definição Móvel",
    description: "Assista onde quiser: no trânsito, no trabalho ou em viagens com economia inteligente de dados móveis.",
    steps: [
      "Baixe o app oficial na Play Store ou Apple App Store.",
      "Faça login com sua conta DezPila.",
      "Assista ao vivo ou espelhe na TV quando chegar em casa.",
    ],
  },
  {
    id: "computador",
    name: "Computador & Notebook",
    category: "Windows, Mac & Web Browser",
    icon: Monitor,
    app: "Web Player no Navegador / IPTV Smarters",
    installTime: "Instantâneo",
    resolution: "4K Nativo 60fps",
    description: "Acesse direto pelo seu navegador Chrome, Edge ou Safari sem precisar instalar nada, ou use nosso player dedicado para Windows.",
    steps: [
      "Acesse o link do Web Player no navegador.",
      "Digite seu usuário e senha.",
      "Assista com qualidade total e zero delay.",
    ],
  },
];

export function DeviceCompatibility() {
  const [activeTab, setActiveTab] = useState<string>("samsung");
  const currentDevice = devices.find((d) => d.id === activeTab) || devices[0];

  const handleScrollToPlans = () => {
    const el = document.getElementById("planos");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#050508] px-6 py-20 font-body text-foreground border-t border-white/10 z-10">
      <div className="max-w-6xl mx-auto">
        {/* Cabeçalho */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 font-code text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <CheckCircle2 className="h-3.5 w-3.5" /> 100% Compatível com seu Aparelho
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold uppercase font-heading text-white tracking-tight">
            SELECIONE SUA <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-rose-400">SMART TV</span> OU DISPOSITIVO
          </h2>
          <p className="text-muted-foreground mt-3 font-code text-xs sm:text-sm max-w-xl mx-auto">
            Veja como é simples e rápido instalar. Não precisa de técnico nem aparelhos caros.
          </p>
        </div>

        {/* Pílulas de Navegação por Dispositivo */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {devices.map((device) => {
            const isActive = activeTab === device.id;
            const Icon = device.icon;
            return (
              <button
                key={device.id}
                type="button"
                onClick={() => setActiveTab(device.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-code text-xs font-bold transition-all cursor-pointer border ${
                  isActive
                    ? "bg-brand text-white border-brand shadow-[0_0_20px_var(--brand-glow)] scale-105 z-10"
                    : "bg-white/[0.03] text-slate-400 border-white/10 hover:border-white/20 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{device.name}</span>
              </button>
            );
          })}
        </div>

        {/* Card Interativo com Detalhes do Dispositivo Selecionado */}
        <div className="relative rounded-2xl bg-gradient-to-b from-[#12121c] to-[#0a0a10] border border-white/10 p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Coluna 1: Especificações Rápidas */}
            <div className="lg:col-span-1 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-brand/20 border border-brand/40 flex items-center justify-center text-brand shadow-[0_0_15px_var(--brand-glow)]">
                  <currentDevice.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-lg text-white uppercase">
                    {currentDevice.name}
                  </h3>
                  <p className="font-code text-xs text-slate-400">
                    {currentDevice.category}
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-white/10 font-code text-xs">
                <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Zap className="h-3.5 w-3.5 text-amber-400" /> Tempo de Instalação:
                  </span>
                  <span className="text-white font-bold">{currentDevice.installTime}</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Resolução Máxima:
                  </span>
                  <span className="text-white font-bold">{currentDevice.resolution}</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-brand" /> Sistema:
                  </span>
                  <span className="text-emerald-400 font-bold">100% Anti-Trava</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 font-body leading-relaxed pt-1">
                {currentDevice.description}
              </p>
            </div>

            {/* Coluna 2: Passo a Passo Simples 1-2-3 */}
            <div className="lg:col-span-2 bg-[#000000]/60 rounded-xl border border-white/10 p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
                <span className="font-heading font-extrabold text-xs uppercase tracking-wider text-brand">
                  Guia Rápido de Instalação (Sem Complicações)
                </span>
                <span className="font-code text-[11px] text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                  Pronto em 3 passos
                </span>
              </div>

              <div className="space-y-4">
                {currentDevice.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <span className="flex-none flex h-7 w-7 items-center justify-center rounded-lg bg-brand/20 border border-brand/50 text-brand font-code font-extrabold text-xs shadow-[0_0_10px_var(--brand-glow)]">
                      0{idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-200 font-body pt-1 leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>

              {/* Botão de Ação Imediata para o Dispositivo */}
              <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="font-code text-xs text-slate-400 text-center sm:text-left">
                  🚀 Liberação automática via PIX a partir de <strong className="text-white">R$ 10,00/mês</strong>
                </span>
                <button
                  type="button"
                  onClick={handleScrollToPlans}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-brand to-rose-600 hover:from-rose-600 hover:to-brand text-white font-heading font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_var(--brand-glow)] transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.02]"
                >
                  Instalar na Minha TV Agora →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

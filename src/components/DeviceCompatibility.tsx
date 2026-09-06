import { useState } from "react";
import { Tv, Smartphone, Monitor, CheckCircle2, Zap, ShieldCheck, PlayCircle, Layers, Cpu } from "lucide-react";

interface DeviceBrandConfig {
  id: string;
  name: string;
  brandTag: string;
  category: string;
  brandColor: string;
  brandGlow: string;
  activeBg: string;
  activeBorder: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  accentText: string;
  stepBadgeBg: string;
  stepBadgeText: string;
  stepBadgeBorder: string;
  app: string;
  installTime: string;
  resolution: string;
  systemFeature: string;
  description: string;
  steps: { title: string; desc: string }[];
  logo: React.ReactNode;
}

const devices: DeviceBrandConfig[] = [
  {
    id: "samsung",
    name: "Samsung Smart TV",
    brandTag: "TIZEN OS",
    category: "Todos os modelos Samsung (2016 até 2026)",
    brandColor: "#0077FF",
    brandGlow: "rgba(0, 119, 255, 0.4)",
    activeBg: "bg-gradient-to-r from-[#002244]/90 to-[#001124]/90",
    activeBorder: "border-[#0077FF]",
    badgeBg: "bg-[#0077FF]/15",
    badgeText: "text-[#38BDF8]",
    badgeBorder: "border-[#0077FF]/40",
    accentText: "text-[#38BDF8]",
    stepBadgeBg: "bg-[#0077FF]/20",
    stepBadgeText: "text-[#38BDF8]",
    stepBadgeBorder: "border-[#0077FF]/50",
    app: "Smart STB / IBO Player / SS IPTV / Bob Player",
    installTime: "Menos de 2 minutos",
    resolution: "4K Ultra HD Real (60fps)",
    systemFeature: "100% Anti-Trava Tizen Direct",
    description: "Compatível com todas as Smart TVs Samsung. Aplicativo oficial disponível direto na Samsung Apps da sua TV, sem necessidade de aparelhos extras.",
    steps: [
      {
        title: "Abra a Samsung Apps",
        desc: "No controle remoto, pressione Home e abra a loja de aplicativos da sua Samsung TV.",
      },
      {
        title: "Instale o App Homologado",
        desc: "Pesquise por 'IBO Player', 'Smart STB' ou 'SS IPTV' e clique em Instalar.",
      },
      {
        title: "Ativação Imediata via PIX",
        desc: "Insira os dados gerados no checkout e assista a +2.000 canais e +60.000 filmes na hora.",
      },
    ],
    logo: (
      <div className="flex items-center gap-1.5 font-heading font-black tracking-wider text-[#0077FF] text-xs uppercase">
        <Tv className="h-4 w-4 text-[#0077FF]" />
        <span>SAMSUNG</span>
      </div>
    ),
  },
  {
    id: "lg",
    name: "LG Smart TV",
    brandTag: "webOS",
    category: "Todos os modelos LG com webOS (OLED, QNED, NanoCell, UHD)",
    brandColor: "#FD3572",
    brandGlow: "rgba(253, 53, 114, 0.4)",
    activeBg: "bg-gradient-to-r from-[#330014]/90 to-[#1a000a]/90",
    activeBorder: "border-[#FD3572]",
    badgeBg: "bg-[#FD3572]/15",
    badgeText: "text-[#FD3572]",
    badgeBorder: "border-[#FD3572]/40",
    accentText: "text-[#FD3572]",
    stepBadgeBg: "bg-[#FD3572]/20",
    stepBadgeText: "text-[#FD3572]",
    stepBadgeBorder: "border-[#FD3572]/50",
    app: "IBO Player / Smarters Pro / SS IPTV / XCIPTV",
    installTime: "Menos de 2 minutos",
    resolution: "4K HDR & Dolby Audio",
    systemFeature: "100% Anti-Trava webOS Direct",
    description: "Funciona nativamente em qualquer TV LG com sistema webOS. Imagem 4K HDR cristalina com áudio surround sem cabos ou aparelhos adicionais.",
    steps: [
      {
        title: "Acesse a LG Content Store",
        desc: "Abra o menu da sua TV LG e clique no ícone da loja LG Content Store / Apps.",
      },
      {
        title: "Baixe o Player Recomendado",
        desc: "Digite 'IBO Player' ou 'Smarters Pro' e realize o download gratuito.",
      },
      {
        title: "Pronto para Maratonar",
        desc: "Conecte com seus dados liberados via PIX e aproveite futebol 4K e cinema completo.",
      },
    ],
    logo: (
      <div className="flex items-center gap-1.5 font-heading font-black tracking-wider text-[#FD3572] text-xs uppercase">
        <div className="h-3.5 w-3.5 rounded-full border border-[#FD3572] flex items-center justify-center font-extrabold text-[9px] leading-none">
          LG
        </div>
        <span>LG webOS</span>
      </div>
    ),
  },
  {
    id: "android-tv",
    name: "Android TV & Google TV",
    brandTag: "GOOGLE PLAY",
    category: "TCL, Philips, Sony, Philco, Semp, Panasonic",
    brandColor: "#3DDC84",
    brandGlow: "rgba(61, 220, 132, 0.4)",
    activeBg: "bg-gradient-to-r from-[#002b12]/90 to-[#001408]/90",
    activeBorder: "border-[#3DDC84]",
    badgeBg: "bg-[#3DDC84]/15",
    badgeText: "text-[#3DDC84]",
    badgeBorder: "border-[#3DDC84]/40",
    accentText: "text-[#3DDC84]",
    stepBadgeBg: "bg-[#3DDC84]/20",
    stepBadgeText: "text-[#3DDC84]",
    stepBadgeBorder: "border-[#3DDC84]/50",
    app: "Aplicativo Oficial DezPila / XCIPTV / Smarters",
    installTime: "Menos de 1 minuto",
    resolution: "4K 60fps Estável",
    systemFeature: "App Oficial Play Store Integrado",
    description: "Interface ultra-rápida na Google Play Store oficial com carregamento instantâneo de canais, guia EPG interativo e troca de canais sem delay.",
    steps: [
      {
        title: "Abra a Google Play Store",
        desc: "Na tela inicial da sua Android TV ou Google TV, acesse a loja Google Play.",
      },
      {
        title: "Download com 1 Clique",
        desc: "Baixe nosso aplicativo oficial otimizado ou XCIPTV Player com instalação instantânea.",
      },
      {
        title: "Login Rápido",
        desc: "Digite seu usuário e senha recebidos imediatamente após o pagamento e aproveite.",
      },
    ],
    logo: (
      <div className="flex items-center gap-1.5 font-heading font-black tracking-wider text-[#3DDC84] text-xs uppercase">
        <Cpu className="h-4 w-4 text-[#3DDC84]" />
        <span>ANDROID TV</span>
      </div>
    ),
  },
  {
    id: "firestick",
    name: "Fire TV Stick & Mi Box",
    brandTag: "AMAZON / XIAOMI",
    category: "Fire Stick Lite/4K, Mi Box S, Realme Stick, Chromecast",
    brandColor: "#FF9900",
    brandGlow: "rgba(255, 153, 0, 0.4)",
    activeBg: "bg-gradient-to-r from-[#331c00]/90 to-[#1a0e00]/90",
    activeBorder: "border-[#FF9900]",
    badgeBg: "bg-[#FF9900]/15",
    badgeText: "text-[#FFB84D]",
    badgeBorder: "border-[#FF9900]/40",
    accentText: "text-[#FFB84D]",
    stepBadgeBg: "bg-[#FF9900]/20",
    stepBadgeText: "text-[#FFB84D]",
    stepBadgeBorder: "border-[#FF9900]/50",
    app: "App DezPila dedicado / Downloader",
    installTime: "1 minuto e meio",
    resolution: "4K Ultra HD + Anti-Trava",
    systemFeature: "Otimizado para Sticks HDMI",
    description: "Transforma qualquer TV comum ou antiga em uma central multimídia de última geração com catálogo completo e resposta ultrarrápida.",
    steps: [
      {
        title: "Plugue na Entrada HDMI",
        desc: "Conecte seu Fire Stick ou Mi Box na TV e conecte à rede Wi-Fi da sua casa.",
      },
      {
        title: "Baixe via Downloader ou Loja",
        desc: "Digite o código curto do DezPila no app Downloader para download direto.",
      },
      {
        title: "Grade Completa Liberada",
        desc: "Aproveite todos os canais fechados, esportes ao vivo e filmes com qualidade 4K.",
      },
    ],
    logo: (
      <div className="flex items-center gap-1.5 font-heading font-black tracking-wider text-[#FF9900] text-xs uppercase">
        <Zap className="h-4 w-4 text-[#FF9900]" />
        <span>FIRE TV • MI BOX</span>
      </div>
    ),
  },
  {
    id: "tv-box",
    name: "TV Box (Todos os modelos)",
    brandTag: "UNIVERSAL ANDROID",
    category: "TX9, TX3, MXQ, Aquário, Intelbras, BTV, HTV e similares",
    brandColor: "#A855F7",
    brandGlow: "rgba(168, 85, 247, 0.4)",
    activeBg: "bg-gradient-to-r from-[#240638]/90 to-[#12021c]/90",
    activeBorder: "border-[#A855F7]",
    badgeBg: "bg-[#A855F7]/15",
    badgeText: "text-[#C084FC]",
    badgeBorder: "border-[#A855F7]/40",
    accentText: "text-[#C084FC]",
    stepBadgeBg: "bg-[#A855F7]/20",
    stepBadgeText: "text-[#C084FC]",
    stepBadgeBorder: "border-[#A855F7]/50",
    app: "APK DezPila Otimizado / XCIPTV",
    installTime: "Menos de 2 minutos",
    resolution: "Full HD & 4K UHD",
    systemFeature: "Ultra Leve (Não trava a memória)",
    description: "Nosso sistema foi desenvolvido para consumir pouca memória RAM e processamento, rodando liso até mesmo nos modelos mais básicos de TV Box.",
    steps: [
      {
        title: "Abra o Navegador da Box",
        desc: "Acesse o navegador Chrome ou instalador de arquivos na sua TV Box.",
      },
      {
        title: "Instale o APK DezPila",
        desc: "Clique no link direto fornecido no tutorial para baixar a versão otimizada.",
      },
      {
        title: "Assista sem Travamentos",
        desc: "Conecte com sua conta e acesse centenas de canais com sinal 100% estável.",
      },
    ],
    logo: (
      <div className="flex items-center gap-1.5 font-heading font-black tracking-wider text-[#A855F7] text-xs uppercase">
        <Layers className="h-4 w-4 text-[#A855F7]" />
        <span>TV BOX UNIVERSAL</span>
      </div>
    ),
  },
  {
    id: "smartphone",
    name: "Celular & Tablet",
    brandTag: "iOS & ANDROID",
    category: "iPhone, iPad, Samsung Galaxy, Motorola, Xiaomi e outros",
    brandColor: "#06B6D4",
    brandGlow: "rgba(6, 182, 212, 0.4)",
    activeBg: "bg-gradient-to-r from-[#002733]/90 to-[#001319]/90",
    activeBorder: "border-[#06B6D4]",
    badgeBg: "bg-[#06B6D4]/15",
    badgeText: "text-[#22D3EE]",
    badgeBorder: "border-[#06B6D4]/40",
    accentText: "text-[#22D3EE]",
    stepBadgeBg: "bg-[#06B6D4]/20",
    stepBadgeText: "text-[#22D3EE]",
    stepBadgeBorder: "border-[#06B6D4]/50",
    app: "App Oficial iOS & Android / Smarters Player",
    installTime: "30 segundos",
    resolution: "Full HD Móvel Adaptativo",
    systemFeature: "Economia Inteligente de Dados Móveis",
    description: "Assista onde estiver: no trânsito, no trabalho ou em viagens. Suporta reprodução em segundo plano e transmissão para a TV via Chromecast/AirPlay.",
    steps: [
      {
        title: "Baixe na App Store ou Play Store",
        desc: "Instale o aplicativo indicado diretamente na loja oficial do seu smartphone.",
      },
      {
        title: "Faça Login com seu Acesso",
        desc: "Insira seu usuário e senha liberados na hora pelo sistema automático DezPila.",
      },
      {
        title: "Assista ou Espelhe na TV",
        desc: "Assista na tela do celular ou transmita com 1 toque para qualquer televisão próxima.",
      },
    ],
    logo: (
      <div className="flex items-center gap-1.5 font-heading font-black tracking-wider text-[#06B6D4] text-xs uppercase">
        <Smartphone className="h-4 w-4 text-[#06B6D4]" />
        <span>CELULAR & TABLET</span>
      </div>
    ),
  },
  {
    id: "computador",
    name: "Computador & Notebook",
    brandTag: "WINDOWS & MAC",
    category: "Windows 10/11, macOS, Linux, Chrome, Edge, Safari",
    brandColor: "#3B82F6",
    brandGlow: "rgba(59, 130, 246, 0.4)",
    activeBg: "bg-gradient-to-r from-[#0c1f47]/90 to-[#050f24]/90",
    activeBorder: "border-[#3B82F6]",
    badgeBg: "bg-[#3B82F6]/15",
    badgeText: "text-[#60A5FA]",
    badgeBorder: "border-[#3B82F6]/40",
    accentText: "text-[#60A5FA]",
    stepBadgeBg: "bg-[#3B82F6]/20",
    stepBadgeText: "text-[#60A5FA]",
    stepBadgeBorder: "border-[#3B82F6]/50",
    app: "Web Player no Navegador / IPTV Smarters Windows",
    installTime: "Instantâneo (Sem instalar nada)",
    resolution: "4K Nativo 60fps",
    systemFeature: "Acesso Direto pelo Navegador",
    description: "Acesse direto pelo seu navegador Chrome, Edge ou Safari sem precisar instalar nada, ou use nosso programa dedicado para Windows e Mac.",
    steps: [
      {
        title: "Acesse o Link do Web Player",
        desc: "Abra o link exclusivo de transmissão direta em qualquer navegador da sua preferência.",
      },
      {
        title: "Informe Usuário e Senha",
        desc: "Faça login com a sua conta para carregar automaticamente toda a grade de canais.",
      },
      {
        title: "Cinema em Tela Cheia",
        desc: "Assista com aceleração de hardware, seleção de áudio/legenda e resolução total.",
      },
    ],
    logo: (
      <div className="flex items-center gap-1.5 font-heading font-black tracking-wider text-[#3B82F6] text-xs uppercase">
        <Monitor className="h-4 w-4 text-[#3B82F6]" />
        <span>PC & NOTEBOOK</span>
      </div>
    ),
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
            Configuração rápida em menos de 2 minutos. Escolha seu dispositivo e veja o passo a passo:
          </p>
        </div>

        {/* Pílulas / Cards de Navegação Estilizados por Marca (Estilo Assinaturas) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3 mb-8">
          {devices.map((device) => {
            const isActive = activeTab === device.id;
            return (
              <button
                key={device.id}
                type="button"
                onClick={() => setActiveTab(device.id)}
                className={`relative flex flex-col items-start justify-between p-3.5 sm:p-4 rounded-xl text-left transition-all cursor-pointer border ${
                  isActive
                    ? `${device.activeBg} ${device.activeBorder} scale-[1.02] z-10`
                    : "bg-[#0c0c14]/80 border-white/10 hover:border-white/20 hover:bg-[#12121e]"
                }`}
                style={{
                  boxShadow: isActive
                    ? `0 0 25px ${device.brandGlow}, inset 0 0 15px ${device.brandGlow}`
                    : "none",
                }}
              >
                {/* Topo do botão: Logo da Marca + Tag do Sistema */}
                <div className="flex items-center justify-between w-full gap-2 mb-2">
                  <div className="shrink-0">{device.logo}</div>
                  <span
                    className={`font-code text-[9px] font-extrabold px-1.5 py-0.5 rounded border uppercase tracking-wider ${
                      isActive
                        ? `${device.badgeBg} ${device.badgeText} ${device.badgeBorder}`
                        : "bg-white/5 text-slate-400 border-white/10"
                    }`}
                  >
                    {device.brandTag}
                  </span>
                </div>

                {/* Nome Principal */}
                <div className="w-full">
                  <span
                    className={`font-heading font-extrabold text-xs sm:text-sm tracking-tight block ${
                      isActive ? "text-white" : "text-slate-300"
                    }`}
                  >
                    {device.name}
                  </span>
                  <span className="font-code text-[10px] text-slate-400 block truncate mt-0.5">
                    {device.installTime}
                  </span>
                </div>

                {/* Indicador Ativo */}
                {isActive && (
                  <div
                    className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full"
                    style={{ backgroundColor: device.brandColor }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Card Interativo com Detalhes da Marca Selecionada */}
        <div
          className="relative rounded-2xl bg-gradient-to-b from-[#10101a] to-[#08080e] border p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-300"
          style={{
            borderColor: `${currentDevice.brandColor}60`,
            boxShadow: `0 0 30px ${currentDevice.brandGlow}`,
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Coluna 1: Especificações Rápidas e Identidade */}
            <div className="lg:col-span-1 space-y-4">
              <div className="flex items-center gap-3">
                <div
                  className="h-12 w-12 rounded-xl flex items-center justify-center border shadow-lg transition-all"
                  style={{
                    backgroundColor: `${currentDevice.brandColor}20`,
                    borderColor: `${currentDevice.brandColor}60`,
                    color: currentDevice.brandColor,
                    boxShadow: `0 0 15px ${currentDevice.brandGlow}`,
                  }}
                >
                  <Tv className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-extrabold text-lg text-white uppercase tracking-tight">
                      {currentDevice.name}
                    </h3>
                  </div>
                  <span
                    className={`inline-block font-code text-[10px] font-bold px-2 py-0.5 rounded border mt-0.5 uppercase ${currentDevice.badgeBg} ${currentDevice.badgeText} ${currentDevice.badgeBorder}`}
                  >
                    {currentDevice.brandTag}
                  </span>
                </div>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-white/10 font-code text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Zap className="h-3.5 w-3.5 text-amber-400" /> Instalação:
                  </span>
                  <span className="text-white font-bold">{currentDevice.installTime}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Resolução:
                  </span>
                  <span className="text-white font-bold">{currentDevice.resolution}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5" style={{ color: currentDevice.brandColor }} /> Sistema:
                  </span>
                  <span className="text-emerald-400 font-bold">{currentDevice.systemFeature}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 font-body leading-relaxed pt-1">
                {currentDevice.description}
              </p>
            </div>

            {/* Coluna 2: Passo a Passo 1-2-3 */}
            <div className="lg:col-span-2 bg-[#000000]/70 rounded-xl border border-white/10 p-5 sm:p-6 backdrop-blur-md">
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <PlayCircle className="h-4 w-4" style={{ color: currentDevice.brandColor }} />
                  <span
                    className="font-heading font-extrabold text-xs uppercase tracking-wider"
                    style={{ color: currentDevice.brandColor }}
                  >
                    Passo a Passo de Instalação no {currentDevice.name}
                  </span>
                </div>
                <span className="font-code text-[11px] text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20 font-bold">
                  Simples & Rápido
                </span>
              </div>

              <div className="space-y-4">
                {currentDevice.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3.5 group">
                    <span
                      className={`flex-none flex h-7 w-7 items-center justify-center rounded-lg font-code font-extrabold text-xs shadow-md transition-all ${currentDevice.stepBadgeBg} ${currentDevice.stepBadgeText} border ${currentDevice.stepBadgeBorder}`}
                    >
                      0{idx + 1}
                    </span>
                    <div className="pt-0.5">
                      <h4 className="text-xs font-bold font-heading text-white uppercase tracking-tight">
                        {step.title}
                      </h4>
                      <p className="text-xs text-slate-300 font-body leading-relaxed mt-0.5">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Botão de Ação Imediata para o Dispositivo */}
              <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="font-code text-xs text-slate-400 text-center sm:text-left">
                  🚀 Liberação automática via PIX por apenas <strong className="text-white font-bold">R$ 10,00/mês</strong>
                </span>
                <button
                  type="button"
                  onClick={handleScrollToPlans}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl text-white font-heading font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.02]"
                  style={{
                    backgroundColor: currentDevice.brandColor,
                    boxShadow: `0 0 20px ${currentDevice.brandGlow}`,
                  }}
                >
                  Instalar no Meu {currentDevice.name.split(" ")[0]} Agora →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

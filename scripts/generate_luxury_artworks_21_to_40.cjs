const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const outDir = path.join(__dirname, "..", "public", "instagram", "artes");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Localiza o navegador Edge / Chrome no sistema Windows
const edgePaths = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
];

const browserPath = edgePaths.find((p) => fs.existsSync(p));
if (!browserPath) {
  console.error("Navegador Edge/Chrome não encontrado para renderização!");
  process.exit(1);
}

// 20 ARTES PROMOCIONAIS LUXUOSAS (ARTES 21 A 40)
const luxuryArtworks = [
  {
    fileName: "21_experiencia_cinema_vip_4k.jpg",
    title: "EXPERIÊNCIA CINEMA VIP 4K",
    subtitle: "Poltronas Reclináveis, Som Dolby & +60.000 Filmes",
    badge: "CINEMA PREMIUM DE LUXO",
    tag: "Apenas R$ 10,00/mês",
    accent: "#ff2a2a",
    secondaryAccent: "#gold",
    icon: "🍿",
    stats: ["4K HDR Real", "Som 5.1 / Dolby", "Sem Comercial"],
    mainHeading: "SUA SALA VIRA UM CINEMA DE LUXO VIP",
  },
  {
    fileName: "22_futebol_campeoes_60fps.jpg",
    title: "FUTEBOL DOS CAMPEÕES",
    subtitle: "Brasileirão, Champions, Libertadores & Premiere em 60fps",
    badge: "SINAL ANTI-LAG 60FPS",
    tag: "Zero Delay • R$ 10/Mês",
    accent: "#10b981",
    secondaryAccent: "#34d399",
    icon: "⚽",
    stats: ["Transmissão 60fps", "Sinal Anti-Queda", "Todos os Canais"],
    mainHeading: "SINTA A EMOÇÃO DO ESTÁDIO EM 4K SEM TRAVAR",
  },
  {
    fileName: "23_plano_black_diamond_dezpila.jpg",
    title: "CARTÃO BLACK DIAMOND",
    subtitle: "Acesso Total a Todos os Streamings em Uma Única Assinatura",
    badge: "EDITION BLACK DIAMOND",
    tag: "Acesso Ilimitado • R$ 10/Mês",
    accent: "#f59e0b",
    secondaryAccent: "#fbbf24",
    icon: "💎",
    stats: ["71% OFF Exclusivo", "Liberação PIX 2min", "4K Nativo"],
    mainHeading: "O SEU PASSAPORTE VIP PRO STREAMING COMPLETO",
  },
  {
    fileName: "24_sala_smart_tv_oled_luxo.jpg",
    title: "SMART TV OLED 85 INFLEXÍVEL",
    subtitle: "Imagem Cristalina, Cores Vibrantes e Zero Travamento",
    badge: "ULTRA HD OLED 8K READY",
    tag: "Compatível Com Todas TVs",
    accent: "#a855f7",
    secondaryAccent: "#c084fc",
    icon: "📺",
    stats: ["Smart TV Samsung/LG", "Android TV & Firestick", "Instalação Fácil"],
    mainHeading: "POTENCIALIZADOR DE PERFORMANCE PARA SUA SMART TV",
  },
  {
    fileName: "25_maratona_series_exclusivas.jpg",
    title: "MARATONA SÉRIES EXCLUSIVAS",
    subtitle: "Todas as Temporadas e Lançamentos de Todos os Apps",
    badge: "CATÁLOGO UNIFICADO VIP",
    tag: "Atualizado Diariamente",
    accent: "#ef4444",
    secondaryAccent: "#f87171",
    icon: "🎬",
    stats: ["Séries Completas", "Episódios em 4K", "Sem Mensalidade Cara"],
    mainHeading: "TODOS OS STREAMINGS REUNIDOS NUM SÓ LUGAR",
  },
  {
    fileName: "26_economize_3mil_por_ano.jpg",
    title: "ECONOMIZE R$ 3.000 POR ANO",
    subtitle: "Diga Adeus às Faturas Abusivas de R$ 250 a R$ 350",
    badge: "LIBERDADE FINANCEIRA",
    tag: "De R$ 250 ➔ R$ 10/mês",
    accent: "#10b981",
    secondaryAccent: "#059669",
    icon: "💰",
    stats: ["Sem Multa", "Sem Fidelidade", "PIX Automático"],
    mainHeading: "CHEGA DE RASGAR DINHEIRO COM TV A CABO CARA",
  },
  {
    fileName: "27_setup_gamer_e_stream_4k.jpg",
    title: "SETUP GAMER & ULTRA STREAMING",
    subtitle: "Alta Velocidade, Baixa Latência e Sinal 100% Estável",
    badge: "ULTRA PERFORMANCE HIGH-END",
    tag: "Servidores CDN Dedicados",
    accent: "#06b6d4",
    secondaryAccent: "#22d3ee",
    icon: "🎮",
    stats: ["CDN Redundante", "Sinal 100% Fluido", "Suporte no Whats"],
    mainHeading: "VELOCIDADE E ESTABILIDADE DE NÍVEL PROFISSIONAL",
  },
  {
    fileName: "28_suite_hotel_5estrelas_tv.jpg",
    title: "SUÍTE 5 ESTRELAS EM CASA",
    subtitle: "Conforto Luxuoso com Entretenimento Premium Ilimitado",
    badge: "LUXURY HOTEL EXPERIENCE",
    tag: "Experiência 5 Estrelas",
    accent: "#eab308",
    secondaryAccent: "#fde047",
    icon: "🛎️",
    stats: ["Design Premium", "Grade EPG Interativa", "Qualidade Garatinha"],
    mainHeading: "TRANSFORME SEU QUARTO EM UMA SUÍTE LUXUOSA 5 ESTRELAS",
  },
  {
    fileName: "29_noite_de_gala_lancamentos.jpg",
    title: "NOITE DE GALA DO CINEMA",
    subtitle: "Filmes Recém-Saídos do Cinema na Palma da Sua Mão",
    badge: "PRIMEIRA FILA CINEMA",
    tag: "Lançamentos Sem Custo Extra",
    accent: "#ec4899",
    secondaryAccent: "#f472b6",
    icon: "🎩",
    stats: ["Recém-Lançados", "Dublado & Legendado", "Interface Intuitiva"],
    mainHeading: "ASSISTA AOS MAIORES SUCESSOS DE BILHETERIA HOJE",
  },
  {
    fileName: "30_combate_ufc_ppv_ilimitado.jpg",
    title: "CARD COMPLETO UFC & FIGHT",
    subtitle: "Todas as Lutas Ao Vivo, Card Principal e Preliminar",
    badge: "COMBATE & PPV INCLUSO",
    tag: "UFC Ao Vivo • R$ 10/Mês",
    accent: "#f97316",
    secondaryAccent: "#fb923c",
    icon: "🥊",
    stats: ["UFC Ao Vivo 4K", "Sem Pagar PPV Extra", "60fps Sem Travamentos"],
    mainHeading: "NENHUMA LUTA FICA DE FORA NA SUA PROGRAMAÇÃO",
  },
  {
    fileName: "31_kids_gold_desenhos_seguros.jpg",
    title: "KIDS GOLD & ANIMAÇÕES",
    subtitle: "Ambiente Seguro, Educativo e 100% Livre de Anúncios",
    badge: "ENTRETENIMENTO INFANTIL SEGURO",
    tag: "100% Livre de Anúncios",
    accent: "#8b5cf6",
    secondaryAccent: "#a78bfa",
    icon: "🧸",
    stats: ["Desenhos 24h", "Animes Dublados", "Controle Parental PIN"],
    mainHeading: "A SEGURANÇA QUE SEUS FILHOS MERECEM COM DIVERSÃO",
  },
  {
    fileName: "32_mosaico_premium_60k_titulos.jpg",
    title: "MOSAICO DE +60.000 CONTEÚDOS",
    subtitle: "Canais Abertos, Fechados, Filmes, Séries e Documentários",
    badge: "ACERVO GIGANTE 4K",
    tag: "Atualizações Semanais",
    accent: "#3b82f6",
    secondaryAccent: "#60a5fa",
    icon: "🔮",
    stats: ["Canais em HD/4K", "Filmes On-Demand", "Séries em Dia"],
    mainHeading: "O CATÁLOGO MAIS COMPLETO DO BRASIL NA SUA TELA",
  },
  {
    fileName: "33_ativacao_vip_instantanea_pix.jpg",
    title: "ATIVAÇÃO VIP EXPRESSA",
    subtitle: "Pagou no PIX NATIVO ➔ Recebeu os Dados no Ato em 2 Minutos",
    badge: "SISTEMA 100% AUTOMÁTICO",
    tag: "Ativação em Segundos",
    accent: "#10b981",
    secondaryAccent: "#34d399",
    icon: "⚡",
    stats: ["Sem Esperar Atendente", "PIX Copia e Cola", "Suporte no Whats"],
    mainHeading: "ASSISTA AGORA MESMO COM LIBERAÇÃO IMEDIATA",
  },
  {
    fileName: "34_sem_contrato_sem_multa.jpg",
    title: "LIBERDADE TOTAL SEM FIDELIDADE",
    subtitle: "Sem Contratos Presos, Sem Multas Ocultas e Sem Pegadinhas",
    badge: "ZERO FIDELIDADE OBRIGATÓRIA",
    tag: "Cancelamento Livre",
    accent: "#64748b",
    secondaryAccent: "#94a3b8",
    icon: "🔓",
    stats: ["R$ 10 Fixos/Mês", "Sem Surpresas", "Você no Controle"],
    mainHeading: "VOCÊ TEM O PODER DE ESCOLHA SEM SER REFÉM DE OPERADORAS",
  },
  {
    fileName: "35_multitelas_familia_premium.jpg",
    title: "SISTEMA MULTI-TELAS SIMULTÂNEAS",
    subtitle: "TV da Sala, Quarto do Casal, Celular dos Filhos e Tablet",
    badge: "PAZ FAMILIAR GARANTIDA",
    tag: "Sem Briga Pelo Controle",
    accent: "#f43f5e",
    secondaryAccent: "#fb7185",
    icon: "👨‍👩‍👧‍👦",
    stats: ["Assista no Celular", "Smart TV & Tablet", "Multi-Conexão"],
    mainHeading: "TODA A FAMÍLIA ASSISTINDO O QUE GOSTA AO MESMO TEMPO",
  },
  {
    fileName: "36_shows_ao_vivo_e_festivais.jpg",
    title: "CAMAROTE VIP SHOWS & FESTIVAIS",
    subtitle: "Rock in Rio, Lollapalooza, Festivais e Shows Internacionais",
    badge: "SOM DIGITAL SURROUND",
    tag: "Qualidade de Áudio Studio",
    accent: "#d946ef",
    secondaryAccent: "#e879f9",
    icon: "🎸",
    stats: ["Shows Exclusivos", "Áudio Studio 5.1", "Palco Principal 4K"],
    mainHeading: "SINTA O SOM E A ENERGIA DOS MAIORES SHOWS DO MUNDO",
  },
  {
    fileName: "37_documentarios_e_natureza_4k.jpg",
    title: "DOCUMENTÁRIOS & NATUREZA 4K",
    subtitle: "National Geographic, Discovery, História e Ciência em HD",
    badge: "HIPER-REALISMO VISUAL",
    tag: "Cores Vivas Nativas",
    accent: "#14b8a6",
    secondaryAccent: "#2dd4bf",
    icon: "🌍",
    stats: ["NatGeo & Discovery", "Ciência & História", "Definição Máxima"],
    mainHeading: "EXPLORE O MUNDO EM CORES E DETALHES INCRÍVEIS",
  },
  {
    fileName: "38_desafio_10_reais_vs_tva-cabo.jpg",
    title: "O DESAFIO DOS R$ 10,00",
    subtitle: "R$ 10 no DezPila Entrega Mais Conteúdo Que Faturas de R$ 300",
    badge: "DESAFIO CUSTO X BENEFÍCIO",
    tag: "Teste Gratuitamente",
    accent: "#eab308",
    secondaryAccent: "#facc15",
    icon: "⚖️",
    stats: ["Mais de 60K Itens", "Servidor Anti-Lag", "Instalação em 2 min"],
    mainHeading: "FAÇA O TESTE E COMPROVE A ECONOMIA NA PRÁTICA",
  },
  {
    fileName: "39_suporte_vip_whatsapp_24h.jpg",
    title: "ATENDIMENTO VIP DEDICADO 24H",
    subtitle: "Equipe Especializada Pronta Para Te Auxiliar na Instalação",
    badge: "SUPORTE HUMANO VIP",
    tag: "Atendimento via WhatsApp",
    accent: "#22c55e",
    secondaryAccent: "#4ade80",
    icon: "💬",
    stats: ["Passo a Passo Fácil", "Suporte no Whats", "Garantia Total"],
    mainHeading: "NUNCA FICARÁ NA MÃO: SUPORTE COMPLETO E DEDICADO",
  },
  {
    fileName: "40_manifesto_black_gold_dezpila.jpg",
    title: "MANIFESTO BLACK & GOLD DEZPILA",
    subtitle: "A Maior Revolução de Streaming e Entretenimento do Brasil",
    badge: "EDITION MANIFESTO BLACK GOLD",
    tag: "R$ 10,00 Fixos • 4K Real",
    accent: "#ff2a2a",
    secondaryAccent: "#ffd700",
    icon: "👑",
    stats: ["Revolução do Streaming", "Sem Armadilhas", "O Futuro da TV"],
    mainHeading: "ENTRE EM UMA NOVA ERA DE ENTRETENIMENTO PREMIUM",
  },
];

console.log("Gerando 20 Artes Promocionais Luxuosas (3:4 - 1080x1440 px)...");

luxuryArtworks.forEach((art, idx) => {
  const artNumber = String(idx + 21).padStart(2, "0");
  const htmlContent = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    width:1080px; height:1440px; background:#050508;
    display:flex; flex-direction:column; justify-content:space-between; align-items:center;
    padding:80px 60px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    color:#ffffff; text-align:center; position:relative; overflow:hidden;
  }
  
  /* LUZ DE FUNDO DINÂMICA E METÁLICA */
  .bg-glow-main {
    position:absolute; width:1200px; height:1200px;
    background: radial-gradient(circle at center, ${art.accent}40 0%, rgba(5,5,8,0.95) 70%);
    top:50%; left:50%; transform:translate(-50%,-50%);
    pointer-events:none;
  }
  .bg-grid {
    position:absolute; inset:0;
    background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events:none;
  }

  /* TOP HEADER CONCEITUAL: LOGO DEZPILA */
  .header-brand {
    display:flex; align-items:center; justify-content:center; gap:16px;
    z-index:10; background:rgba(14, 15, 23, 0.85); border:1px solid rgba(255,255,255,0.15);
    padding:20px 44px; border-radius:100px; backdrop-filter:blur(16px);
    box-shadow:0 15px 40px rgba(0,0,0,0.8), 0 0 25px ${art.accent}33;
  }
  .red-mark {
    width:30px; height:40px; background:#ff2a2a; transform:skewX(-16deg);
    border-radius:4px; box-shadow:0 0 20px rgba(255,42,42,0.8);
  }
  .brand-title { font-size:36px; font-weight:900; letter-spacing:-0.5px; text-transform:uppercase; }
  .brand-pila { color:#94a3b8; }
  .badge-number {
    background:${art.accent}; color:#ffffff; font-size:15px; font-weight:900;
    padding:6px 16px; border-radius:100px; text-transform:uppercase; letter-spacing:1px;
    margin-left:10px; box-shadow:0 4px 12px ${art.accent}66;
  }

  /* CARD PRINCIPAL GLASSMORPHISM LUXUOSO */
  .main-card {
    z-index:10; width:100%; max-width:960px; background:rgba(12, 13, 20, 0.92);
    border:2px solid ${art.accent}88; border-radius:44px; padding:54px 44px;
    box-shadow:0 30px 80px rgba(0,0,0,0.95), 0 0 60px ${art.accent}44;
    display:flex; flex-direction:column; align-items:center; gap:28px;
    position:relative; overflow:hidden;
  }
  .card-top-glow {
    position:absolute; top:-100px; left:50%; transform:translateX(-50%);
    width:500px; height:200px; background:${art.accent}33; filter:blur(60px);
  }
  .icon-ring {
    font-size:90px; width:140px; height:140px; border-radius:50%;
    background:radial-gradient(circle at center, ${art.accent}33 0%, rgba(0,0,0,0.6) 100%);
    border:3px solid ${art.accent};
    display:flex; align-items:center; justify-content:center;
    box-shadow:0 0 45px ${art.accent}77; z-index:2;
  }
  .category-pill {
    background:linear-gradient(135deg, ${art.accent} 0%, rgba(15,15,20,0.9) 100%);
    border:1px solid ${art.accent}; color:#ffffff; font-size:18px; font-weight:800;
    padding:10px 32px; border-radius:100px; text-transform:uppercase; letter-spacing:1.5px;
    box-shadow:0 8px 25px ${art.accent}55; z-index:2;
  }
  .headline-main {
    font-size:48px; font-weight:900; text-transform:uppercase; line-height:1.15;
    letter-spacing:-0.5px; text-shadow:0 6px 30px rgba(0,0,0,0.9); z-index:2;
    background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .subtitle-text {
    font-size:24px; color:#94a3b8; font-weight:600; line-height:1.35; max-width:820px; z-index:2;
  }

  /* LISTA DE BENEFÍCIOS REAIS */
  .stats-row {
    display:flex; gap:16px; justify-content:center; width:100%; z-index:2; margin-top:6px;
  }
  .stat-badge {
    background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.12);
    padding:12px 24px; border-radius:100px; font-size:16px; font-weight:700;
    color:#e2e8f0; backdrop-filter:blur(10px);
  }

  /* BANNER INFERIOR CTA: COMENTE 'TV' COM SELO DE OFERTA */
  .cta-banner {
    z-index:10; width:100%; max-width:960px;
    background:linear-gradient(135deg, #970202 0%, #b80303 50%, #7f0000 100%);
    border:2px solid #ff4d4d; border-radius:36px; padding:32px 40px;
    box-shadow:0 20px 50px rgba(151,2,2,0.8), 0 0 45px rgba(255,77,77,0.4);
    display:flex; flex-direction:column; align-items:center; gap:8px;
    position:relative;
  }
  .cta-title {
    font-size:32px; font-weight:900; text-transform:uppercase; letter-spacing:1px; color:#ffffff;
    display:flex; align-items:center; gap:14px; text-shadow:0 3px 12px rgba(0,0,0,0.6);
  }
  .cta-subtitle {
    font-size:20px; font-weight:800; color:#fca5a5; text-transform:uppercase; letter-spacing:1px;
  }
  .price-tag-floating {
    position:absolute; top:-20px; right:40px;
    background:#ffd700; color:#000000; font-size:16px; font-weight:900;
    padding:8px 24px; border-radius:100px; text-transform:uppercase; letter-spacing:1px;
    box-shadow:0 8px 20px rgba(255,215,0,0.6); border:2px solid #ffffff;
  }
</style>
</head>
<body>
  <div class="bg-glow-main"></div>
  <div class="bg-grid"></div>

  <!-- CABEÇALHO COM LOGO OFICIAL -->
  <div class="header-brand">
    <div class="red-mark"></div>
    <div class="brand-title">DEZ<span class="brand-pila">PILA</span></div>
    <div class="badge-number">ARTE ${artNumber} / 40</div>
  </div>

  <!-- CARD PRINCIPAL DE ALTO IMPACTO -->
  <div class="main-card">
    <div class="card-top-glow"></div>
    <div class="icon-ring">${art.icon}</div>
    <div class="category-pill">${art.badge}</div>
    <div class="headline-main">${art.mainHeading}</div>
    <div class="subtitle-text">${art.subtitle}</div>

    <div class="stats-row">
      ${art.stats.map((s) => `<div class="stat-badge">✓ ${s}</div>`).join("")}
    </div>
  </div>

  <!-- CTA PRINCIPAL DE CONVERSÃO DIRECT -->
  <div class="cta-banner">
    <div class="price-tag-floating">${art.tag}</div>
    <div class="cta-title">💬 COMENTE "TV" NOS COMENTÁRIOS</div>
    <div class="cta-subtitle">PARA RECEBER O LINK DE ATIVAÇÃO NO DIRECT AGORA MESMO! 🚀</div>
  </div>
</body>
</html>`;

  const tempHtml = path.join(__dirname, `temp_luxury_${artNumber}.html`);
  const outPath = path.join(outDir, art.fileName);

  fs.writeFileSync(tempHtml, htmlContent, "utf-8");

  console.log(`Renderizando Arte ${artNumber}: ${art.fileName}...`);

  try {
    execSync(
      `"${browserPath}" --headless --screenshot="${outPath}" --window-size=1080,1440 --hide-scrollbars "${tempHtml}"`
    );
    console.log(`✓ Arte ${artNumber} gerada em HD: ${outPath}`);
  } catch (err) {
    console.error(`Erro ao gerar ${art.fileName}:`, err.message);
  } finally {
    if (fs.existsSync(tempHtml)) {
      fs.unlinkSync(tempHtml);
    }
  }
});

console.log("\nTODAS AS 20 ARTES PROMOCIONAIS LUXUOSAS FORAM GERADAS COM SUCESSO!");

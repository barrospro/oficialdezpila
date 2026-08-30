const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const outDir = path.join(__dirname, "..", "public", "instagram", "videos");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Localiza o navegador para screenshot em headless
const edgePaths = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
];

const browserPath = edgePaths.find((p) => fs.existsSync(p));
if (!browserPath) {
  console.error("Navegador não encontrado!");
  process.exit(1);
}

const veo3Reels = [
  {
    filename: "veo3_01_futebol_sem_travar.png",
    title: "⚽ O Gol Decisivo Sem Travamentos",
    category: "⚽ Reels Esportes 60fps",
    accentColor: "#10b981",
    bgGradient: "radial-gradient(circle at center, rgba(16, 185, 129, 0.25) 0%, #050507 70%)",
    icon: "⚽",
    badgeText: "TRANSMISSÃO 60FPS • SINAL ANTI-LAG",
    mainHeadline: "NUNCA MAIS PERCA UM GOL POR TRAVAMENTOS",
    subHeadline: "Brasileirão, Champions League & Libertadores em 4K",
  },
  {
    filename: "veo3_02_cinema_luxo.png",
    title: "🍿 Cinema de Luxo em Casa 4K",
    category: "🎬 Reels Filmes & Séries",
    accentColor: "#ff2a2a",
    bgGradient: "radial-gradient(circle at center, rgba(255, 42, 42, 0.25) 0%, #050507 70%)",
    icon: "🍿",
    badgeText: "+60.000 FILMES E SÉRIES EM 4K",
    mainHeadline: "SUA SALA VIRA UM CINEMA DE VERDADE",
    subHeadline: "Todos os lançamentos do cinema no seu controle",
  },
  {
    filename: "veo3_03_fatura_vs_dezpila.png",
    title: "⚡ O Antes vs Depois da Fatura",
    category: "💰 Reels Economia Real",
    accentColor: "#f59e0b",
    bgGradient: "radial-gradient(circle at center, rgba(245, 158, 11, 0.25) 0%, #050507 70%)",
    icon: "⚡",
    badgeText: "DE R$ 250/MÊS → APENAS R$ 10/MÊS",
    mainHeadline: "CHEGA DE PAGAR CARO NA TV A CABO",
    subHeadline: "Economize mais de R$ 2.000 por ano sem perder nada",
  },
  {
    filename: "veo3_04_ativacao_2min.png",
    title: "📲 Ativação Rápida no Celular & TV",
    category: "📲 Reels Tutorial 2 Minutos",
    accentColor: "#06b6d4",
    bgGradient: "radial-gradient(circle at center, rgba(6, 182, 212, 0.25) 0%, #050507 70%)",
    icon: "📲",
    badgeText: "CONFIGURAÇÃO SIMPLES & RÁPIDA",
    mainHeadline: "SUA TV ATIVA EM MENOS DE 2 MINUTOS",
    subHeadline: "Funciona na Smart TV, Celular, Fire Stick e TV Box",
  },
  {
    filename: "veo3_05_cristoflix_familia.png",
    title: "🧸 Família Reunida & CristoFlix Infantil",
    category: "👑 Reels Família & CristoFlix",
    accentColor: "#a855f7",
    bgGradient: "radial-gradient(circle at center, rgba(168, 85, 247, 0.25) 0%, #050507 70%)",
    icon: "✝️",
    badgeText: "CONTEÚDO BÍBLICO INFANTIL + R$ 7,90",
    mainHeadline: "ENTRETENIMENTO SEGURO PARA SEUS FILHOS",
    subHeadline: "Desenhos e histórias bíblicas selecionadas sem comerciais",
  },
  {
    filename: "veo3_06_manifesto_epic.png",
    title: "🔥 Trailer Épico Dark / Manifesto DezPila",
    category: "🔥 Reels Manifesto Ultra HD",
    accentColor: "#ef4444",
    bgGradient: "radial-gradient(circle at center, rgba(239, 68, 68, 0.3) 0%, #050507 70%)",
    icon: "🔥",
    badgeText: "A REVOLUÇÃO DO STREAMING NO BRASIL",
    mainHeadline: "O FUTURO DA TV POR APENAS R$ 10,00",
    subHeadline: "Sem fidelidade, sem antenas e sem pegadinhas",
  },
];

console.log("Gerando 6 capas de Reels Veo 3 em alta resolução (720x1280 px)...");

veo3Reels.forEach((item) => {
  const outImg = path.join(outDir, item.filename);
  const tempHtml = path.join(__dirname, `temp_veo3_${item.filename}.html`);

  const htmlContent = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    width:720px; height:1280px; background:#050507;
    display:flex; flex-direction:column; justify-content:space-between; align-items:center;
    padding:60px 40px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    color:#ffffff; text-align:center; position:relative; overflow:hidden;
  }
  .bg-glow {
    position:absolute; width:900px; height:900px;
    background:${item.bgGradient}; top:50%; left:50%; transform:translate(-50%,-50%);
    pointer-events:none;
  }
  
  /* HEADER COM LOGOMARCA DEZPILA NA PARTE SUPERIOR */
  .header-logo {
    display:flex; align-items:center; justify-content:center; gap:14px;
    z-index:10; background:rgba(13, 14, 23, 0.85); border:1px solid rgba(255,255,255,0.15);
    padding:16px 36px; border-radius:100px; backdrop-filter:blur(12px);
    box-shadow:0 10px 30px rgba(0,0,0,0.8);
  }
  .mark {
    width:26px; height:34px; background:#ff2a2a; transform:skewX(-16deg);
    border-radius:4px; box-shadow:0 0 16px rgba(255,42,42,0.6);
  }
  .logo-text { font-size:32px; font-weight:900; letter-spacing:-0.5px; text-transform:uppercase; }
  .logo-pila { color:#94a3b8; }

  /* CARD PRINCIPAL CENTRAL */
  .main-card {
    z-index:10; width:100%; max-w:640px; background:rgba(13, 14, 23, 0.9);
    border:2px solid ${item.accentColor}; border-radius:36px; padding:44px 32px;
    box-shadow:0 25px 60px rgba(0,0,0,0.9), 0 0 40px ${item.accentColor}33;
    display:flex; flex-direction:column; align-items:center; gap:20px;
  }
  .icon-badge {
    font-size:72px; width:110px; height:110px; border-radius:50%;
    background:${item.accentColor}22; border:2px solid ${item.accentColor};
    display:flex; items-center; justify-content:center;
    box-shadow:0 0 30px ${item.accentColor}44; margin-bottom:5px;
  }
  .category-badge {
    background:${item.accentColor}; color:#ffffff; font-size:16px; font-weight:800;
    padding:8px 24px; border-radius:100px; text-transform:uppercase; tracking-wide:1px;
    box-shadow:0 6px 16px ${item.accentColor}66;
  }
  .headline {
    font-size:38px; font-weight:900; text-transform:uppercase; line-height:1.15;
    letter-spacing:-0.5px; text-shadow:0 4px 20px rgba(0,0,0,0.8);
  }
  .subheadline {
    font-size:20px; color:#cbd5e1; font-weight:600; line-height:1.3;
  }

  /* CTA NA PARTE INFERIOR: COMENTE 'TV' PARA RECEBER O LINK */
  .cta-box {
    z-index:10; width:100%; max-w:640px; background:linear-gradient(135deg, #970202 0%, #b80303 100%);
    border:2px solid #ff4d4d; border-radius:28px; padding:24px 28px;
    box-shadow:0 15px 35px rgba(151,2,2,0.7), 0 0 25px rgba(255,77,77,0.4);
    display:flex; flex-direction:column; align-items:center; gap:6px;
  }
  .cta-main {
    font-size:24px; font-weight:900; text-transform:uppercase; letter-spacing:0.5px; color:#ffffff;
    display:flex; align-items:center; gap:10px;
  }
  .cta-sub {
    font-size:16px; font-weight:700; color:#fca5a5; text-transform:uppercase; letter-spacing:0.5px;
  }
</style>
</head>
<body>
  <div class="bg-glow"></div>

  <!-- LOGOMARCA SUPERIOR -->
  <div class="header-logo">
    <div class="mark"></div>
    <div class="logo-text">DEZ<span class="logo-pila">PILA</span></div>
  </div>

  <!-- CONTEÚDO PRINCIPAL VEO 3 -->
  <div class="main-card">
    <div class="icon-badge">${item.icon}</div>
    <div class="category-badge">${item.badgeText}</div>
    <div class="headline">${item.mainHeadline}</div>
    <div class="subheadline">${item.subHeadline}</div>
  </div>

  <!-- CTA DE COMENTE TV PARA RECEBER O LINK NO DIRECT -->
  <div class="cta-box">
    <div class="cta-main">💬 COMENTE "TV" ABAIXO</div>
    <div class="cta-sub">PARA RECEBER O LINK DE ATIVAÇÃO NO DIRECT</div>
  </div>
</body>
</html>`;

  fs.writeFileSync(tempHtml, htmlContent, "utf-8");

  try {
    execSync(
      `"${browserPath}" --headless --screenshot="${outImg}" --window-size=720,1280 --hide-scrollbars "${tempHtml}"`
    );
    console.log(`✓ ${item.filename} gerado com sucesso!`);
  } catch (err) {
    console.error(`Erro ao gerar ${item.filename}:`, err.message);
  } finally {
    if (fs.existsSync(tempHtml)) {
      fs.unlinkSync(tempHtml);
    }
  }
});

console.log("\nTodas as 6 artes de Reels Veo 3 foram geradas!");

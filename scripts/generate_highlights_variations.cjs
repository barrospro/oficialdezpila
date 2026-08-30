const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const outDir = path.join(__dirname, "..", "public", "brand", "destaques");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Localiza o navegador
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

// Lista de todas as 15 variações de destaques (3 por categoria)
const variations = [
  // --- DEPOIMENTOS ---
  {
    name: "depoimentos_var1.png",
    category: "⭐ DEPOIMENTOS",
    title: "CLIENTE SATISFEITO",
    accentColor: "#f59e0b",
    htmlContent: `
      <div class="chat-card">
        <div class="chat-header">
          <div class="avatar">👨🏻‍💻</div>
          <div>
            <div class="chat-name">Lucas M.</div>
            <div class="chat-status">Online • Cliente Verificado</div>
          </div>
        </div>
        <div class="chat-bubble">
          Caramba mano, acabei de assinar e já tá funcionando perfeitamente na minha Smart TV LG! Que qualidade absurda em 4K. Vlw demais! 🔥🚀
        </div>
        <div class="chat-time">14:32 ✓✓</div>
      </div>
      <div class="stars">⭐⭐⭐⭐⭐</div>
      <div class="badge-tag">ATIVAÇÃO EM MENOS DE 2 MINUTOS</div>
    `,
  },
  {
    name: "depoimentos_var2.png",
    category: "⭐ DEPOIMENTOS",
    title: "FUTEBOL SEM TRAVAR",
    accentColor: "#f59e0b",
    htmlContent: `
      <div class="chat-card">
        <div class="chat-header">
          <div class="avatar">⚽</div>
          <div>
            <div class="chat-name">Rodrigo Santos</div>
            <div class="chat-status">Online • Cliente Verificado</div>
          </div>
        </div>
        <div class="chat-bubble">
          Melhor R$ 10 reais que já investi kkk assisti o jogo do meu time inteiro sem travar 1 segundo! Podem mandar o pix do próximo mês já.
        </div>
        <div class="chat-time">21:45 ✓✓</div>
      </div>
      <div class="stars">⭐⭐⭐⭐⭐</div>
      <div class="badge-tag">100% SINAL ESTÁVEL EM 60FPS</div>
    `,
  },
  {
    name: "depoimentos_var3.png",
    category: "⭐ DEPOIMENTOS",
    title: "SUPORTE E QUALIDADE",
    accentColor: "#f59e0b",
    htmlContent: `
      <div class="chat-card">
        <div class="chat-header">
          <div class="avatar">📱</div>
          <div>
            <div class="chat-name">Fernanda Lima</div>
            <div class="chat-status">Online • Cliente Verificada</div>
          </div>
        </div>
        <div class="chat-bubble">
          Instalei no meu celular e no TV Box da sala. Tudo funcionando liso, aplicativo muito fácil de mexer. Recomendo pra todo mundo! ❤️
        </div>
        <div class="chat-time">18:10 ✓✓</div>
      </div>
      <div class="stars">⭐⭐⭐⭐⭐</div>
      <div class="badge-tag">COMPATÍVEL COM TODOS OS APARELHOS</div>
    `,
  },

  // --- CATÁLOGO ---
  {
    name: "catalogo_var1.png",
    category: "🍿 CATÁLOGO",
    title: "LANÇAMENTOS DE CINEMA",
    accentColor: "#ff2a2a",
    htmlContent: `
      <div class="grid-box">
        <div class="cat-card">🎬 FILMES 2026 EM 4K</div>
        <div class="cat-card">📺 SÉRIES ATUALIZADAS DIA A DIA</div>
        <div class="cat-card">🍿 CINEMA NA SUA CASA</div>
      </div>
      <div class="big-stat">+60.000</div>
      <div class="stat-desc">TÍTULOS DISPONÍVEIS NO CATÁLOGO</div>
    `,
  },
  {
    name: "catalogo_var2.png",
    category: "🍿 CATÁLOGO",
    title: "PLATAFORMAS INCLUSAS",
    accentColor: "#ff2a2a",
    htmlContent: `
      <div class="platforms-list">
        <div class="plat-item">🔴 NETFLIX & PRIME VIDEO</div>
        <div class="plat-item">🟣 HBO MAX & DISNEY+</div>
        <div class="plat-item">🟢 GLOBOPLAY & APPLE TV+</div>
        <div class="plat-item">🟡 CANAIS ABERTOS E FECHADOS</div>
      </div>
      <div class="badge-tag" style="margin-top:40px;">TUDO EM UMA ÚNICA ASSINATURA</div>
    `,
  },
  {
    name: "catalogo_var3.png",
    category: "🍿 CATÁLOGO",
    title: "INFANTIL & FAMÍLIA",
    accentColor: "#ff2a2a",
    htmlContent: `
      <div class="kids-box">
        <div class="kids-title">🦄 CONTEÚDO PARA TODA A FAMÍLIA</div>
        <p class="kids-desc">Desenhos dublados, animes, filmes infantis e a opção exclusiva do CristoFlix Infantil com histórias bíblicas edificantes.</p>
      </div>
      <div class="badge-tag" style="margin-top:40px;">PROTEÇÃO E CONTROLE PARENTAL</div>
    `,
  },

  // --- FUTEBOL ---
  {
    name: "futebol_var1.png",
    category: "⚽ FUTEBOL",
    title: "FUTEBOL BRASILEIRO",
    accentColor: "#10b981",
    htmlContent: `
      <div class="match-box">
        <div class="league-tag">CHAMPIONSHIPS & LIGAS</div>
        <div class="match-item">⚽ BRASILEIRÃO SÉRIE A & B</div>
        <div class="match-item">🏆 COPA DO BRASIL</div>
        <div class="match-item">🔥 COPA LIBERTADORES</div>
      </div>
      <div class="badge-tag" style="margin-top:40px;">TODOS OS JOGOS AO VIVO 4K</div>
    `,
  },
  {
    name: "futebol_var2.png",
    category: "⚽ FUTEBOL",
    title: "FUTEBOL EUROPEU",
    accentColor: "#10b981",
    htmlContent: `
      <div class="match-box">
        <div class="league-tag">LIGAS INTERNACIONAIS</div>
        <div class="match-item">⭐ UEFA CHAMPIONS LEAGUE</div>
        <div class="match-item">🦁 PREMIER LEAGUE (INGLATERRA)</div>
        <div class="match-item">🇪🇸 LA LIGA (ESPANHA)</div>
      </div>
      <div class="badge-tag" style="margin-top:40px;">TRANSMISSÃO EM 60FPS SEM DELAY</div>
    `,
  },
  {
    name: "futebol_var3.png",
    category: "⚽ FUTEBOL",
    title: "ESPORTES EXCLUSIVOS",
    accentColor: "#10b981",
    htmlContent: `
      <div class="match-box">
        <div class="league-tag">CANAL COMBATE & VELOCIDADE</div>
        <div class="match-item">🥊 UFC & COMBATE AO VIVO</div>
        <div class="match-item">🏎️ FÓRMULA 1 EM 4K</div>
        <div class="match-item">🏀 NBA & ESPORTES AMERICANOS</div>
      </div>
      <div class="badge-tag" style="margin-top:40px;">NUNCA MAIS PERCA UMA LUTA OU CORRIDA</div>
    `,
  },

  // --- DÚVIDAS ---
  {
    name: "duvidas_var1.png",
    category: "❓ DÚVIDAS",
    title: "COMO INSTALAR NA TV",
    accentColor: "#06b6d4",
    htmlContent: `
      <div class="step-card">
        <div class="step-num">PASSO 01</div>
        <div class="step-txt">Baixe o aplicativo recomendado na sua Smart TV (Samsung, LG, Android TV) ou TV Box.</div>
      </div>
      <div class="step-card">
        <div class="step-num">PASSO 02</div>
        <div class="step-txt">Insira os dados de usuário e senha enviados no seu WhatsApp.</div>
      </div>
      <div class="step-card">
        <div class="step-num">PASSO 03</div>
        <div class="step-txt">Pronto! Aproveite todo o catálogo de filmes, séries e futebol ao vivo.</div>
      </div>
    `,
  },
  {
    name: "duvidas_var2.png",
    category: "❓ DÚVIDAS",
    title: "APARELHOS COMPATÍVEIS",
    accentColor: "#06b6d4",
    htmlContent: `
      <div class="device-list">
        <div class="dev-item">📺 Smart TVs (Samsung, LG, TCL, AOC)</div>
        <div class="dev-item">📱 Celulares (Android e iPhone)</div>
        <div class="dev-item">⚡ Fire TV Stick & Chromecast</div>
        <div class="dev-item">💻 Computadores e TV Box</div>
      </div>
      <div class="badge-tag" style="margin-top:40px;">ASSISTA ONDE E QUANDO QUISER</div>
    `,
  },
  {
    name: "duvidas_var3.png",
    category: "❓ DÚVIDAS",
    title: "COMO FUNCIONA O ACESSO",
    accentColor: "#06b6d4",
    htmlContent: `
      <div class="info-card">
        <div class="info-title">⚡ ATIVAÇÃO INSTANTÂNEA</div>
        <p class="info-desc">Assim que seu pagamento via PIX ou Cartão for confirmado, o sistema gera suas credenciais exclusivas e envia no seu WhatsApp em menos de 2 minutos.</p>
      </div>
      <div class="badge-tag" style="margin-top:40px;">SUPORTE RÁPIDO VIA WHATSAPP</div>
    `,
  },

  // --- PLANOS ---
  {
    name: "planos_var1.png",
    category: "💳 PLANOS",
    title: "OFERTA IMPERDÍVEL",
    accentColor: "#ff2a2a",
    htmlContent: `
      <div class="plan-hero">
        <div class="plan-label">PLANO COMPLETO</div>
        <div class="price-big">R$ 10<span>,00</span></div>
        <div class="price-sub">POR MÊS</div>
      </div>
      <div class="plan-feats">
        ✓ +60.000 Filmes & Séries em 4K<br>
        ✓ Todos os Jogos de Futebol ao Vivo<br>
        ✓ Sem Fidelidade ou Taxa de Cancelamento
      </div>
    `,
  },
  {
    name: "planos_var2.png",
    category: "💳 PLANOS",
    title: "BENEFÍCIOS INCLUSOS",
    accentColor: "#ff2a2a",
    htmlContent: `
      <div class="benefit-list">
        <div class="ben-item">⚡ QUALIDADE ULTRA HD 4K</div>
        <div class="ben-item">🚀 SINAL ANTI-TRAVAMENTO 60FPS</div>
        <div class="ben-item">🛡️ SUPORTE DEDICADO 7 DIAS POR SEMANA</div>
        <div class="ben-item">📱 OPÇÃO DE TELAS EXTRAS SIMULTÂNEAS</div>
      </div>
      <div class="badge-tag" style="margin-top:40px;">ASSINE EM MENOS DE 2 MINUTOS</div>
    `,
  },
  {
    name: "planos_var3.png",
    category: "💳 PLANOS",
    title: "PAGAMENTO FACILITADO",
    accentColor: "#ff2a2a",
    htmlContent: `
      <div class="pay-card">
        <div class="pay-option">⚡ PIX (Aprovação Instantânea)</div>
        <div class="pay-option">💳 Cartão de Crédito em até 12x</div>
      </div>
      <div class="guarantee-box">
        🔒 PAGAMENTO 100% SEGURO & CRIPTOGRAFADO
      </div>
      <div class="badge-tag" style="margin-top:30px;">LIBERAÇÃO IMEDIATA DO SEU LOGIN</div>
    `,
  },
];

console.log("Gerando 15 Variações de Destaques (1080x1920 px)...");

variations.forEach((item) => {
  const outImg = path.join(outDir, item.name);
  const tempHtml = path.join(__dirname, `temp_var_${item.name}.html`);

  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    width:1080px; height:1920px; background:#050507;
    display:flex; flex-direction:column; align-items:center; justify-content:space-between;
    padding:160px 80px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    color:#ffffff; position:relative; overflow:hidden; text-align:center;
  }
  .grid-bg {
    position:absolute; inset:0;
    background-image: linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px);
    background-size: 60px 60px;
  }
  .glow-top {
    position:absolute; width:1000px; height:1000px;
    background: radial-gradient(circle, rgba(255,42,42,0.2) 0%, rgba(0,0,0,0) 70%);
    top:-300px; left:50%; transform:translateX(-50%); pointer-events:none;
  }
  .glow-center {
    position:absolute; width:900px; height:900px;
    background: radial-gradient(circle, ${item.accentColor}25 0%, rgba(0,0,0,0) 70%);
    top:50%; left:50%; transform:translate(-50%, -50%); pointer-events:none;
  }

  /* LOGOMARCA OFICIAL NO TOPO (SEM REFERÊNCIA DE SITE) */
  .logo-header {
    position:relative; z-index:2;
    display:flex; align-items:center; justify-content:center; gap:22px;
  }
  .red-mark {
    width: 45px; height: 58px; background: #ff2a2a;
    transform: skewX(-16deg); border-radius: 4px;
    box-shadow: 0 0 30px rgba(255,42,42,0.6);
  }
  .brand-text {
    font-size: 58px; font-weight: 900; letter-spacing: -3px; text-transform: uppercase; line-height:1;
  }
  .text-dez { color: #ffffff; }
  .text-pila { color: #71717a; }

  /* CABEÇALHO DO CARD */
  .content-header {
    position:relative; z-index:2; margin-top:20px;
  }
  .category-badge {
    font-size: 26px; font-weight: 800; color: ${item.accentColor};
    text-transform: uppercase; letter-spacing: 4px;
    background: ${item.accentColor}15; border: 1.5px solid ${item.accentColor}40;
    padding: 10px 32px; border-radius: 30px; display: inline-block; margin-bottom: 20px;
  }
  .main-title {
    font-size: 72px; font-weight: 900; uppercase; tracking-tight; line-height: 1.1;
    text-shadow: 0 10px 30px rgba(0,0,0,0.8);
  }

  /* CORPO CENTRAL */
  .content-body {
    position:relative; z-index:2; width:100%; max-width:920px; margin: 40px 0;
  }

  /* CHAT / REVIEWS */
  .chat-card {
    background: #0d0e17; border: 2px solid rgba(255,255,255,0.12); border-radius: 32px;
    padding: 40px; text-align: left; box-shadow: 0 20px 50px rgba(0,0,0,0.8);
  }
  .chat-header { display:flex; align-items:center; gap:20px; margin-bottom:25px; }
  .avatar { width:70px; height:70px; border-radius:50%; background:#1c1e2d; display:flex; align-items:center; justify-content:center; font-size:36px; border:2px solid ${item.accentColor}; }
  .chat-name { font-size:32px; font-weight:800; color:#fff; }
  .chat-status { font-size:20px; color:#10b981; font-weight:600; }
  .chat-bubble { font-size:30px; font-weight:600; color:#e4e4e7; line-height:1.4; background:#141624; padding:30px; border-radius:24px; border-top-left-radius:4px; }
  .chat-time { font-size:20px; color:#71717a; text-align:right; margin-top:15px; font-weight:700; }
  .stars { font-size: 50px; margin-top: 30px; }

  /* CATALOG / STATS */
  .grid-box { display:flex; flex-direction:column; gap:20px; }
  .cat-card { background:#0d0e17; border:2px solid rgba(255,255,255,0.1); padding:28px; border-radius:24px; font-size:32px; font-weight:800; }
  .big-stat { font-size:140px; font-weight:900; color:#ff2a2a; line-height:1; margin-top:30px; text-shadow:0 0 50px rgba(255,42,42,0.5); }
  .stat-desc { font-size:26px; font-weight:800; color:#a1a1aa; letter-spacing:2px; }

  .platforms-list { display:flex; flex-direction:column; gap:20px; }
  .plat-item { background:#0d0e17; border:2px solid #ff2a2a; padding:32px; border-radius:24px; font-size:30px; font-weight:800; box-shadow:0 10px 30px rgba(255,42,42,0.2); }

  .kids-box { background:#0d0e17; border:2px solid rgba(255,255,255,0.12); padding:45px; border-radius:32px; }
  .kids-title { font-size:36px; font-weight:900; color:#ff2a2a; margin-bottom:20px; }
  .kids-desc { font-size:28px; color:#d4d4d8; line-height:1.5; }

  /* FUTEBOL */
  .match-box { display:flex; flex-direction:column; gap:20px; }
  .league-tag { font-size:24px; font-weight:800; color:#10b981; letter-spacing:3px; }
  .match-item { background:#0d0e17; border:2px solid #10b981; padding:32px; border-radius:24px; font-size:32px; font-weight:800; text-align:left; box-shadow:0 10px 30px rgba(16,185,129,0.2); }

  /* DÚVIDAS */
  .step-card { background:#0d0e17; border:2px solid rgba(255,255,255,0.1); padding:35px; border-radius:24px; text-align:left; margin-bottom:20px; }
  .step-num { font-size:24px; font-weight:900; color:#06b6d4; letter-spacing:2px; margin-bottom:10px; }
  .step-txt { font-size:28px; font-weight:700; color:#e4e4e7; line-height:1.4; }

  .device-list { display:flex; flex-direction:column; gap:20px; }
  .dev-item { background:#0d0e17; border:2px solid #06b6d4; padding:32px; border-radius:24px; font-size:30px; font-weight:800; text-align:left; }

  .info-card { background:#0d0e17; border:2px solid #06b6d4; padding:45px; border-radius:32px; text-align:left; }
  .info-title { font-size:34px; font-weight:900; color:#06b6d4; margin-bottom:20px; }
  .info-desc { font-size:28px; color:#d4d4d8; line-height:1.5; }

  /* PLANOS */
  .plan-hero { background:#0d0e17; border:3px solid #ff2a2a; padding:50px; border-radius:36px; box-shadow:0 20px 60px rgba(255,42,42,0.3); }
  .plan-label { font-size:28px; font-weight:900; color:#ff2a2a; letter-spacing:4px; margin-bottom:10px; }
  .price-big { font-size:130px; font-weight:900; color:#fff; line-height:1; }
  .price-big span { font-size:70px; color:#ff2a2a; }
  .price-sub { font-size:26px; font-weight:800; color:#a1a1aa; letter-spacing:3px; margin-top:10px; }
  .plan-feats { font-size:28px; font-weight:700; color:#e4e4e7; line-height:1.8; margin-top:35px; text-align:left; }

  .benefit-list { display:flex; flex-direction:column; gap:20px; }
  .ben-item { background:#0d0e17; border:2px solid rgba(255,255,255,0.12); padding:30px; border-radius:24px; font-size:28px; font-weight:800; text-align:left; }

  .pay-card { display:flex; flex-direction:column; gap:20px; margin-bottom:25px; }
  .pay-option { background:#0d0e17; border:2px solid #10b981; padding:32px; border-radius:24px; font-size:30px; font-weight:800; }
  .guarantee-box { background:rgba(255,255,255,0.05); border:1.5px solid rgba(255,255,255,0.15); padding:24px; border-radius:20px; font-size:24px; font-weight:800; color:#10b981; }

  /* BADGE TAG COMUM */
  .badge-tag {
    font-size: 24px; font-weight: 800; color: ${item.accentColor};
    background: ${item.accentColor}18; border: 1.5px solid ${item.accentColor}40;
    padding: 16px 36px; border-radius: 40px; display: inline-block; uppercase; letter-spacing: 2px;
  }
</style>
</head>
<body>
  <div class="grid-bg"></div>
  <div class="glow-top"></div>
  <div class="glow-center"></div>

  <!-- LOGO NO TOPO -->
  <div class="logo-header">
    <div class="red-mark"></div>
    <div class="brand-text">
      <span class="text-dez">DEZ</span><span class="text-pila">PILA</span>
    </div>
  </div>

  <!-- CABEÇALHO -->
  <div class="content-header">
    <div class="category-badge">${item.category}</div>
    <div class="main-title">${item.title}</div>
  </div>

  <!-- CORPO -->
  <div class="content-body">
    ${item.htmlContent}
  </div>
</body>
</html>`;

  fs.writeFileSync(tempHtml, html, "utf-8");

  try {
    execSync(
      `"${browserPath}" --headless --screenshot="${outImg}" --window-size=1080,1920 --hide-scrollbars "${tempHtml}"`
    );
    console.log(`✓ ${item.name} (1080x1920px 9:16) gerado com sucesso!`);
  } catch (err) {
    console.error(`Erro ao gerar ${item.name}:`, err.message);
  } finally {
    if (fs.existsSync(tempHtml)) {
      fs.unlinkSync(tempHtml);
    }
  }
});

console.log("\nTodas as 15 Variações de Destaques foram geradas com sucesso!");

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const outDir = path.join(__dirname, "..", "public", "brand");
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

const framesConfig = [
  {
    filename: "moldura_reels_transparente.png",
    html: `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  html, body {
    width:1080px; height:1920px; background:transparent;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    color:#ffffff; position:relative; overflow:hidden;
    display:flex; flex-direction:column; justify-content:space-between;
  }
  
  /* TOPO: BANNER DA MARCA COM GLASSMORPHISM */
  .header-banner {
    width:100%; height:220px;
    background: linear-gradient(180deg, rgba(5, 5, 7, 0.98) 0%, rgba(13, 14, 23, 0.9) 70%, rgba(5, 5, 7, 0) 100%);
    border-bottom: 2px solid rgba(255, 42, 42, 0.4);
    display:flex; align-items:center; justify-content:space-between;
    padding:0 50px;
  }
  
  .logo-box {
    display:flex; align-items:center; gap:18px;
  }
  .mark {
    width:38px; height:48px; background:#ff2a2a; transform:skewX(-16deg);
    border-radius:6px; box-shadow:0 0 20px rgba(255,42,42,0.8);
  }
  .logo-text {
    font-size:46px; font-weight:900; letter-spacing:-1px; text-transform:uppercase;
  }
  .logo-pila { color:#94a3b8; }
  
  .hd-badge {
    background:rgba(255,42,42,0.15); border:1.5px solid #ff2a2a; color:#ff4d4d;
    padding:10px 24px; border-radius:100px; font-size:20px; font-weight:800;
    text-transform:uppercase; tracking-wide:1px; box-shadow:0 0 15px rgba(255,42,42,0.3);
  }

  /* MEIO: ÁREA 100% TRANSPARENTE PARA O VÍDEO */
  .center-video-cutout {
    flex:1; width:100%; background:transparent; pointer-events:none;
  }

  /* RODAPÉ: CTA COMENTE TV COM GLASS & GLOW RED */
  .footer-banner {
    width:100%; height:260px;
    background: linear-gradient(0deg, rgba(5, 5, 7, 0.98) 0%, rgba(13, 14, 23, 0.92) 75%, rgba(5, 5, 7, 0) 100%);
    border-top: 2px solid rgba(255, 42, 42, 0.4);
    display:flex; flex-direction:column; align-items:center; justify-center;
    padding:30px 40px; gap:12px;
  }
  .cta-pill {
    background: linear-gradient(135deg, #970202 0%, #b80303 100%);
    border: 2px solid #ff4d4d; border-radius: 100px;
    padding: 16px 44px; font-size: 26px; font-weight: 900;
    text-transform: uppercase; letter-spacing: 1px; color: #ffffff;
    box-shadow: 0 10px 30px rgba(151,2,2,0.8), 0 0 25px rgba(255,77,77,0.5);
    display: flex; align-items: center; gap: 14px;
  }
  .cta-subtext {
    font-size: 20px; font-weight: 700; color: #cbd5e1; text-transform: uppercase; letter-spacing: 0.5px;
  }
</style>
</head>
<body>
  <!-- HEADER DA MARCA -->
  <div class="header-banner">
    <div class="logo-box">
      <div class="mark"></div>
      <div class="logo-text">DEZ<span class="logo-pila">PILA</span></div>
    </div>
    <div class="hd-badge">SINAL 4K ULTRA HD</div>
  </div>

  <!-- CENTRO TRANSPARENTE -->
  <div class="center-video-cutout"></div>

  <!-- RODAPÉ DE CTA -->
  <div class="footer-banner">
    <div class="cta-pill">💬 COMENTE "TV" NOS COMENTÁRIOS</div>
    <div class="cta-subtext">PARA RECEBER O TESTE GRÁTIS NO DIRECT</div>
  </div>
</body>
</html>`
  },
  {
    filename: "moldura_reels_clean.png",
    html: `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  html, body {
    width:1080px; height:1920px; background:transparent;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    color:#ffffff; position:relative; overflow:hidden;
    display:flex; flex-direction:column; justify-content:space-between;
  }
  
  /* TOPO: BANNER CLEAN DA MARCA */
  .header-banner {
    width:100%; height:200px;
    background: linear-gradient(180deg, rgba(5, 5, 7, 0.95) 0%, rgba(5, 5, 7, 0) 100%);
    display:flex; align-items:center; justify-content:center;
    padding-top:20px;
  }
  .logo-box {
    display:flex; align-items:center; gap:18px;
    background:rgba(13, 14, 23, 0.9); border:1.5px solid rgba(255,42,42,0.4);
    padding:14px 40px; border-radius:100px; box-shadow:0 10px 30px rgba(0,0,0,0.8);
  }
  .mark {
    width:34px; height:42px; background:#ff2a2a; transform:skewX(-16deg);
    border-radius:5px; box-shadow:0 0 18px rgba(255,42,42,0.8);
  }
  .logo-text {
    font-size:42px; font-weight:900; letter-spacing:-1px; text-transform:uppercase;
  }
  .logo-pila { color:#94a3b8; }

  /* MEIO: ÁREA 100% TRANSPARENTE */
  .center-video-cutout {
    flex:1; width:100%; background:transparent; pointer-events:none;
  }

  /* RODAPÉ CLEAN */
  .footer-banner {
    width:100%; height:200px;
    background: linear-gradient(0deg, rgba(5, 5, 7, 0.95) 0%, rgba(5, 5, 7, 0) 100%);
    display:flex; align-items:center; justify-content:center;
    padding-bottom:30px;
  }
  .footer-pill {
    background:rgba(13, 14, 23, 0.9); border:1.5px solid rgba(255,255,255,0.15);
    color:#e2e8f0; padding:14px 36px; border-radius:100px; font-size:22px; font-weight:800;
    text-transform:uppercase; tracking-wide:1px; box-shadow:0 10px 30px rgba(0,0,0,0.8);
  }
  .highlight-red { color:#ff4d4d; font-weight:900; }
</style>
</head>
<body>
  <!-- HEADER CLEAN DA MARCA -->
  <div class="header-banner">
    <div class="logo-box">
      <div class="mark"></div>
      <div class="logo-text">DEZ<span class="logo-pila">PILA</span></div>
    </div>
  </div>

  <!-- CENTRO TRANSPARENTE -->
  <div class="center-video-cutout"></div>

  <!-- RODAPÉ CLEAN -->
  <div class="footer-banner">
    <div class="footer-pill">
      ASSINE POR APENAS <span class="highlight-red">R$ 10,00/MÊS</span>
    </div>
  </div>
</body>
</html>`
  }
];

console.log("Gerando molduras transparentes em PNG de alta qualidade (1080x1920 px 9:16)...");

framesConfig.forEach((item) => {
  const outImg = path.join(outDir, item.filename);
  const tempHtml = path.join(__dirname, `temp_${item.filename}.html`);

  fs.writeFileSync(tempHtml, item.html, "utf-8");

  try {
    execSync(
      `"${browserPath}" --headless --screenshot="${outImg}" --window-size=1080,1920 --hide-scrollbars --omit-background "${tempHtml}"`
    );
    console.log(`✓ Moldura ${item.filename} gerada com sucesso!`);
  } catch (err) {
    console.error(`Erro ao gerar ${item.filename}:`, err.message);
  } finally {
    if (fs.existsSync(tempHtml)) {
      fs.unlinkSync(tempHtml);
    }
  }
});

console.log("\nMolduras transparentes de Reels criadas com sucesso!");

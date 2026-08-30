const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer-core");

const outDir = path.join(__dirname, "..", "public", "brand");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Localiza o navegador do sistema
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
    width:1080px; height:1920px; background: transparent !important;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    color:#ffffff; position:relative; overflow:hidden;
    display:flex; flex-direction:column; justify-content:space-between;
  }
  
  /* TOPO: BANNER DA MARCA COM GLASSMORPHISM DARK */
  .header-banner {
    width:100%; height:230px;
    background: linear-gradient(180deg, rgba(5, 5, 7, 0.98) 0%, rgba(13, 14, 23, 0.92) 75%, rgba(5, 5, 7, 0) 100%);
    border-bottom: 2.5px solid rgba(255, 42, 42, 0.5);
    display:flex; align-items:center; justify-content:space-between;
    padding:0 50px;
  }
  
  .logo-box {
    display:flex; align-items:center; gap:18px;
    background: rgba(13, 14, 23, 0.9);
    border: 1.5px solid rgba(255, 42, 42, 0.4);
    padding: 12px 28px;
    border-radius: 100px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.8);
  }
  .mark {
    width:36px; height:46px; background:#ff2a2a; transform:skewX(-16deg);
    border-radius:5px; box-shadow:0 0 20px rgba(255,42,42,0.8);
  }
  .logo-text {
    font-size:42px; font-weight:900; letter-spacing:-1px; text-transform:uppercase; color:#ffffff;
  }
  .logo-pila { color:#94a3b8; }
  
  .hd-badge {
    background:rgba(255,42,42,0.15); border:2px solid #ff2a2a; color:#ff4d4d;
    padding:12px 28px; border-radius:100px; font-size:22px; font-weight:900;
    text-transform:uppercase; letter-spacing:1px; box-shadow:0 0 20px rgba(255,42,42,0.4);
  }

  /* MEIO: ÁREA 100% TRANSPARENTE PARA O VÍDEO (SEM NENHUM ELEMENTO OU FUNDO) */
  .center-video-cutout {
    flex:1; width:100%; background: transparent !important; pointer-events:none;
  }

  /* RODAPÉ: CTA COMENTE TV COM GLOW RED */
  .footer-banner {
    width:100%; height:260px;
    background: linear-gradient(0deg, rgba(5, 5, 7, 0.98) 0%, rgba(13, 14, 23, 0.95) 75%, rgba(5, 5, 7, 0) 100%);
    border-top: 2.5px solid rgba(255, 42, 42, 0.5);
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    padding:30px 40px; gap:12px;
  }
  .cta-pill {
    background: linear-gradient(135deg, #970202 0%, #b80303 100%);
    border: 2px solid #ff4d4d; border-radius: 100px;
    padding: 18px 48px; font-size: 28px; font-weight: 900;
    text-transform: uppercase; letter-spacing: 1px; color: #ffffff;
    box-shadow: 0 10px 35px rgba(151,2,2,0.85), 0 0 25px rgba(255,77,77,0.6);
    display: flex; align-items: center; gap: 14px;
  }
  .cta-subtext {
    font-size: 20px; font-weight: 800; color: #cbd5e1; text-transform: uppercase; letter-spacing: 1px;
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

  <!-- CENTRO 100% TRANSPARENTE (PNG ALPHA) -->
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
    width:1080px; height:1920px; background: transparent !important;
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
    background:rgba(13, 14, 23, 0.92); border:2px solid rgba(255,42,42,0.5);
    padding:16px 44px; border-radius:100px; box-shadow:0 10px 35px rgba(0,0,0,0.85);
  }
  .mark {
    width:36px; height:46px; background:#ff2a2a; transform:skewX(-16deg);
    border-radius:5px; box-shadow:0 0 20px rgba(255,42,42,0.8);
  }
  .logo-text {
    font-size:44px; font-weight:900; letter-spacing:-1px; text-transform:uppercase; color:#ffffff;
  }
  .logo-pila { color:#94a3b8; }

  /* MEIO: ÁREA 100% TRANSPARENTE */
  .center-video-cutout {
    flex:1; width:100%; background: transparent !important; pointer-events:none;
  }

  /* RODAPÉ CLEAN */
  .footer-banner {
    width:100%; height:200px;
    background: linear-gradient(0deg, rgba(5, 5, 7, 0.95) 0%, rgba(5, 5, 7, 0) 100%);
    display:flex; align-items:center; justify-content:center;
    padding-bottom:30px;
  }
  .footer-pill {
    background:rgba(13, 14, 23, 0.92); border:2px solid rgba(255,255,255,0.2);
    color:#e2e8f0; padding:16px 42px; border-radius:100px; font-size:24px; font-weight:900;
    text-transform:uppercase; letter-spacing:1px; box-shadow:0 10px 35px rgba(0,0,0,0.85);
  }
  .highlight-red { color:#ff4d4d; font-weight:900; text-shadow:0 0 15px rgba(255,77,77,0.6); }
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

  <!-- CENTRO 100% TRANSPARENTE (PNG ALPHA) -->
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

async function run() {
  console.log("Iniciando Puppeteer para gerar molduras com Canal Alpha 100% transparente (omitBackground: true)...");

  const browser = await puppeteer.launch({
    executablePath: browserPath,
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--hide-scrollbars",
      "--disable-web-security"
    ]
  });

  for (const item of framesConfig) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });
    await page.setContent(item.html, { waitUntil: "networkidle0" });

    const outImg = path.join(outDir, item.filename);

    // omitBackground: true garante que o canal Alpha no meio seja 100% transparente (RGBA 0,0,0,0)
    await page.screenshot({
      path: outImg,
      type: "png",
      omitBackground: true
    });

    console.log(`✓ Moldura ${item.filename} gerada com TRANSPARÊNCIA REAL (omitBackground: true)!`);
    await page.close();
  }

  await browser.close();
  console.log("\nProcesso concluído com sucesso!");
}

run().catch((err) => {
  console.error("Erro:", err);
  process.exit(1);
});

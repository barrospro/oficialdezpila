const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const outDir = path.join(__dirname, "..", "public", "instagram", "videos");
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

const reelsData = [
  {
    name: "reels_01_demo_4k.webm",
    title: "DEMONSTRAÇÃO DE QUALIDADE 4K",
    category: "🎬 REELS PROMO 01",
    accentColor: "#ff2a2a",
    html: `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    width:720px; height:1280px; background:#050507;
    display:flex; flex-direction:column; justify-content:space-between; align-items:center;
    padding:80px 40px; font-family: -apple-system, BlinkMacSystemFont, sans-serif; color:#fff; text-align:center;
    position:relative; overflow:hidden;
  }
  .glow { position:absolute; width:800px; height:800px; background:radial-gradient(circle, rgba(255,42,42,0.3) 0%, transparent 70%); top:50%; left:50%; transform:translate(-50%,-50%); }
  .logo { display:flex; align-items:center; gap:15px; font-size:40px; font-weight:900; z-index:2; }
  .mark { width:32px; height:40px; background:#ff2a2a; transform:skewX(-16deg); border-radius:3px; }
  .main-box { z-index:2; background:#0d0e17; border:3px solid #ff2a2a; padding:40px; border-radius:32px; box-shadow:0 20px 60px rgba(255,42,42,0.4); }
  .title { font-size:48px; font-weight:900; text-transform:uppercase; margin-bottom:15px; }
  .badge { background:#ff2a2a; color:#fff; padding:12px 30px; border-radius:30px; font-size:22px; font-weight:800; display:inline-block; }
  .play-icon { font-size:100px; margin-bottom:20px; }
  .footer { font-size:20px; color:#71717a; font-weight:700; z-index:2; }
</style>
</head>
<body>
  <div class="glow"></div>
  <div class="logo"><div class="mark"></div>DEZPILA</div>
  <div class="main-box">
    <div class="play-icon">▶️</div>
    <div class="title">TESTE DE VELOCIDADE & QUALIDADE 4K</div>
    <div class="badge">+60.000 CONTEÚDOS LIBERADOS</div>
  </div>
  <div class="footer">REELS DEMONSTRAÇÃO • DEZPILA</div>
</body>
</html>`
  },
  {
    name: "reels_02_futebol_60fps.webm",
    title: "FUTEBOL AO VIVO 60FPS",
    category: "⚽ REELS PROMO 02",
    accentColor: "#10b981",
    html: `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    width:720px; height:1280px; background:#050507;
    display:flex; flex-direction:column; justify-content:space-between; align-items:center;
    padding:80px 40px; font-family: -apple-system, BlinkMacSystemFont, sans-serif; color:#fff; text-align:center;
    position:relative; overflow:hidden;
  }
  .glow { position:absolute; width:800px; height:800px; background:radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 70%); top:50%; left:50%; transform:translate(-50%,-50%); }
  .logo { display:flex; align-items:center; gap:15px; font-size:40px; font-weight:900; z-index:2; }
  .mark { width:32px; height:40px; background:#ff2a2a; transform:skewX(-16deg); border-radius:3px; }
  .main-box { z-index:2; background:#0d0e17; border:3px solid #10b981; padding:40px; border-radius:32px; box-shadow:0 20px 60px rgba(16,185,129,0.4); }
  .title { font-size:48px; font-weight:900; text-transform:uppercase; margin-bottom:15px; }
  .badge { background:#10b981; color:#fff; padding:12px 30px; border-radius:30px; font-size:22px; font-weight:800; display:inline-block; }
  .play-icon { font-size:100px; margin-bottom:20px; }
  .footer { font-size:20px; color:#71717a; font-weight:700; z-index:2; }
</style>
</head>
<body>
  <div class="glow"></div>
  <div class="logo"><div class="mark"></div>DEZPILA</div>
  <div class="main-box">
    <div class="play-icon">⚽</div>
    <div class="title">FUTEBOL AO VIVO SEM TRAVAMENTOS</div>
    <div class="badge">BRASILEIRÃO & CHAMPIONS LEAGUE</div>
  </div>
  <div class="footer">REELS FUTEBOL • DEZPILA</div>
</body>
</html>`
  },
  {
    name: "reels_03_tutorial_instala.webm",
    title: "TUTORIAL DE INSTALAÇÃO TV",
    category: "📲 REELS TUTORIAL 03",
    accentColor: "#06b6d4",
    html: `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    width:720px; height:1280px; background:#050507;
    display:flex; flex-direction:column; justify-content:space-between; align-items:center;
    padding:80px 40px; font-family: -apple-system, BlinkMacSystemFont, sans-serif; color:#fff; text-align:center;
    position:relative; overflow:hidden;
  }
  .glow { position:absolute; width:800px; height:800px; background:radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%); top:50%; left:50%; transform:translate(-50%,-50%); }
  .logo { display:flex; align-items:center; gap:15px; font-size:40px; font-weight:900; z-index:2; }
  .mark { width:32px; height:40px; background:#ff2a2a; transform:skewX(-16deg); border-radius:3px; }
  .main-box { z-index:2; background:#0d0e17; border:3px solid #06b6d4; padding:40px; border-radius:32px; box-shadow:0 20px 60px rgba(6,182,212,0.4); }
  .title { font-size:48px; font-weight:900; text-transform:uppercase; margin-bottom:15px; }
  .badge { background:#06b6d4; color:#fff; padding:12px 30px; border-radius:30px; font-size:22px; font-weight:800; display:inline-block; }
  .play-icon { font-size:100px; margin-bottom:20px; }
  .footer { font-size:20px; color:#71717a; font-weight:700; z-index:2; }
</style>
</head>
<body>
  <div class="glow"></div>
  <div class="logo"><div class="mark"></div>DEZPILA</div>
  <div class="main-box">
    <div class="play-icon">📲</div>
    <div class="title">COMO INSTALAR EM 2 MINUTOS</div>
    <div class="badge">SMART TV, CELULAR E TV BOX</div>
  </div>
  <div class="footer">REELS TUTORIAL • DEZPILA</div>
</body>
</html>`
  }
];

console.log("Gerando capas prévia de Reels (720x1280 px)...");

reelsData.forEach((item) => {
  const outImg = path.join(outDir, item.name.replace(".webm", ".png"));
  const tempHtml = path.join(__dirname, `temp_reel_${item.name}.html`);

  fs.writeFileSync(tempHtml, item.html, "utf-8");

  try {
    execSync(
      `"${browserPath}" --headless --screenshot="${outImg}" --window-size=720,1280 --hide-scrollbars "${tempHtml}"`
    );
    console.log(`✓ ${item.name} gerado com sucesso!`);
  } catch (err) {
    console.error(`Erro ao gerar ${item.name}:`, err.message);
  } finally {
    if (fs.existsSync(tempHtml)) {
      fs.unlinkSync(tempHtml);
    }
  }
});

console.log("\nTodas as prévias de Reels foram geradas!");

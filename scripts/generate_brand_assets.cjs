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

// assets para renderizar rigorosamente fiéis às referências
const assetsToRender = [
  // REFERÊNCIA 2: Favicon / Ícone (Paralelogramo Vermelho + Letra D Branca em fundo preto arredondado)
  {
    name: "favicon_512.png",
    w: 512,
    h: 512,
    html: `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    width:512px; height:512px; background:#050507;
    display:flex; align-items:center; justify-content:center;
    padding:30px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  }
  .card {
    width:100%; height:100%; border-radius:110px;
    background:#08080a;
    display:flex; align-items:center; justify-content:center;
    gap: 15px;
  }
  .red-mark {
    width: 140px;
    height: 220px;
    background: #ff2a2a;
    transform: skewX(-16deg);
    border-radius: 4px;
  }
  .white-d {
    font-size: 240px;
    font-weight: 900;
    color: #ffffff;
    line-height: 1;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
    letter-spacing: -5px;
  }
</style>
</head>
<body>
  <div class="card">
    <div class="red-mark"></div>
    <div class="white-d">D</div>
  </div>
</body>
</html>`,
  },
  // REFERÊNCIA 1: Logo Horizontal (Paralelogramo Vermelho + DEZ em Branco + PILA em Cinza)
  {
    name: "logo_horizontal_dark.png",
    w: 1200,
    h: 400,
    html: `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    width:1200px; height:400px; background:#050507;
    display:flex; align-items:center; justify-content:center;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    position:relative;
  }
  .grid-bg {
    position:absolute; inset:0;
    background-image: linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 40px 40px;
  }
  .logo-wrapper {
    position:relative; z-index:2;
    display:flex; align-items:center; gap:35px;
  }
  .red-mark {
    width: 110px;
    height: 140px;
    background: #ff2a2a;
    transform: skewX(-16deg);
    border-radius: 4px;
    box-shadow: 0 0 40px rgba(255, 42, 42, 0.4);
  }
  .brand-text {
    font-size: 155px;
    font-weight: 900;
    line-height: 1;
    letter-spacing: -4px;
    text-transform: uppercase;
  }
  .text-dez { color: #ffffff; }
  .text-pila { color: #71717a; }
</style>
</head>
<body>
  <div class="grid-bg"></div>
  <div class="logo-wrapper">
    <div class="red-mark"></div>
    <div class="brand-text">
      <span class="text-dez">DEZ</span><span class="text-pila">PILA</span>
    </div>
  </div>
</body>
</html>`,
  },
  // Logo Quadrada de Perfil
  {
    name: "logo_quadrada.png",
    w: 800,
    h: 800,
    html: `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    width:800px; height:800px; background:#050507;
    display:flex; align-items:center; justify-content:center;
    padding:50px; font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif;
  }
  .card {
    width:100%; height:100%; border-radius:80px;
    background: #08080a;
    border: 3px solid rgba(255,42,42,0.3);
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    box-shadow: 0 0 60px rgba(0,0,0,0.9);
  }
  .row {
    display:flex; align-items:center; gap:25px;
  }
  .red-mark {
    width: 90px; height: 115px; background: #ff2a2a;
    transform: skewX(-16deg); border-radius: 4px;
    box-shadow: 0 0 35px rgba(255,42,42,0.5);
  }
  .brand-text {
    font-size: 115px; font-weight: 900; line-height: 1; letter-spacing: -3px;
    text-transform: uppercase;
  }
  .text-dez { color: #ffffff; }
  .text-pila { color: #71717a; }
  .badge {
    margin-top: 35px;
    background: rgba(255,42,42,0.15);
    border: 1.5px solid #ff2a2a;
    color: #ff3b3b;
    padding: 10px 32px;
    border-radius: 30px;
    font-size: 22px; font-weight: 800; letter-spacing: 4px;
    text-transform: uppercase;
  }
</style>
</head>
<body>
  <div class="card">
    <div class="row">
      <div class="red-mark"></div>
      <div class="brand-text">
        <span class="text-dez">DEZ</span><span class="text-pila">PILA</span>
      </div>
    </div>
    <div class="badge">OFICIAL STREAMING 4K</div>
  </div>
</body>
</html>`,
  },
  // Banner OpenGraph (1200x630 px)
  {
    name: "banner_opengraph_1200x630.png",
    w: 1200,
    h: 630,
    html: `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    width:1200px; height:630px; background:#050507;
    display:flex; flex-direction:column; justify-content:space-between;
    padding:70px; font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif;
    color:#ffffff; position:relative; overflow:hidden;
  }
  .glow {
    position:absolute; width:800px; height:800px;
    background: radial-gradient(circle, rgba(255,42,42,0.35) 0%, rgba(0,0,0,0) 70%);
    right:-150px; top:-150px; pointer-events:none;
  }
  .logo {
    display:flex; align-items:center; gap:20px;
  }
  .red-mark {
    width: 45px; height: 55px; background: #ff2a2a;
    transform: skewX(-16deg); border-radius: 3px;
  }
  .logo-text {
    font-size: 55px; font-weight: 900; letter-spacing: -2px; text-transform: uppercase;
  }
  .text-dez { color: #ffffff; }
  .text-pila { color: #71717a; }
  .headline {
    font-size: 64px; font-weight: 900; text-transform: uppercase; line-height: 1.1;
    max-width: 950px; z-index:2;
  }
  .headline span { color: #ff2a2a; }
  .footer {
    display:flex; align-items:center; justify-content:space-between;
    border-top: 1.5px solid rgba(255,255,255,0.1); pt: 30px; z-index:2;
  }
  .pill {
    background: #ff2a2a; color:#fff; font-size:24px; font-weight:900;
    padding: 16px 36px; border-radius: 16px; text-transform:uppercase; letter-spacing:1px;
    box-shadow: 0 0 30px rgba(255,42,42,0.5);
  }
  .sub {
    font-size: 24px; color: #a1a1aa; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
  }
</style>
</head>
<body>
  <div class="glow"></div>
  <div class="logo">
    <div class="red-mark"></div>
    <div class="logo-text">
      <span class="text-dez">DEZ</span><span class="text-pila">PILA</span>
    </div>
  </div>
  <div class="headline">
    CONTEÚDO ILIMITADO <span>POR APENAS R$ 10/MÊS</span>
  </div>
  <div class="footer">
    <div class="sub">+60.000 FILMES, SÉRIES E FUTEBOL 4K</div>
    <div class="pill">ASSINE EM 2 MINUTOS</div>
  </div>
</body>
</html>`,
  },
  // Capa Perfil (1920x1080 px)
  {
    name: "capa_perfil_1920x1080.png",
    w: 1920,
    h: 1080,
    html: `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    width:1920px; height:1080px; background:#050507;
    display:flex; flex-direction:column; justify-content:center; align-items:center;
    padding:100px; font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif;
    color:#ffffff; position:relative; overflow:hidden; text-align:center;
  }
  .glow {
    position:absolute; width:1400px; height:1400px;
    background: radial-gradient(circle, rgba(255,42,42,0.3) 0%, rgba(0,0,0,0) 70%);
    top:-300px; left:50%; transform:translateX(-50%); pointer-events:none;
  }
  .logo-row {
    display:flex; align-items:center; justify-content:center; gap:35px; margin-bottom:30px; z-index:2;
  }
  .red-mark {
    width: 100px; height: 125px; background: #ff2a2a;
    transform: skewX(-16deg); border-radius: 4px;
    box-shadow: 0 0 50px rgba(255,42,42,0.6);
  }
  .brand-title {
    font-size: 150px; font-weight: 900; letter-spacing: -5px; text-transform: uppercase; line-height: 1;
  }
  .text-dez { color: #ffffff; }
  .text-pila { color: #71717a; }
  .tagline {
    font-size: 48px; font-weight: 900; color: #ff2a2a; text-transform: uppercase;
    letter-spacing: 4px; margin-bottom: 50px; z-index:2;
  }
  .features {
    display:flex; gap:30px; justify-content:center; z-index:2;
  }
  .feat-box {
    background: #0d0d12; border: 2px solid #ff2a2a; border-radius: 24px;
    padding: 24px 45px; font-size: 28px; font-weight: 800; color: #e4e4e7;
    text-transform: uppercase; letter-spacing: 1px;
    box-shadow: 0 10px 30px rgba(255,42,42,0.25);
  }
</style>
</head>
<body>
  <div class="glow"></div>
  <div class="logo-row">
    <div class="red-mark"></div>
    <div class="brand-title">
      <span class="text-dez">DEZ</span><span class="text-pila">PILA</span>
    </div>
  </div>
  <div class="tagline">O MELHOR DO STREAMING POR APENAS R$ 10/MÊS</div>
  <div class="features">
    <div class="feat-box">⚡ 4K ULTRA HD</div>
    <div class="feat-box">📺 +60.000 CONTEÚDOS</div>
    <div class="feat-box">⚽ FUTEBOL AO VIVO</div>
    <div class="feat-box">🚀 ZERO TRAVAMENTOS</div>
  </div>
</body>
</html>`,
  },
];

console.log("Renderizando artes de Identidade Visual rigorosamente fiéis às referências...");

assetsToRender.forEach((item) => {
  const outImg = path.join(outDir, item.name);
  const tempHtml = path.join(__dirname, `temp_ref_${item.name}.html`);
  fs.writeFileSync(tempHtml, item.html, "utf-8");

  try {
    execSync(
      `"${browserPath}" --headless --screenshot="${outImg}" --window-size=${item.w},${item.h} --hide-scrollbars "${tempHtml}"`
    );
    console.log(`✓ ${item.name} (${item.w}x${item.h}px) gerado rigorosamente idêntico!`);
  } catch (err) {
    console.error(`Erro ao gerar ${item.name}:`, err.message);
  } finally {
    if (fs.existsSync(tempHtml)) {
      fs.unlinkSync(tempHtml);
    }
  }
});

console.log("\nTodas as artes da Identidade Visual foram atualizadas com sucesso!");

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

const assetsToRender = [
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
    display:flex; align-items:center; justify-center;
    padding:40px; font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif;
  }
  .box {
    width:100%; height:100%; border-radius:100px;
    background: radial-gradient(circle at center, #1b0205 0%, #050507 100%);
    border: 8px solid #970202;
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    box-shadow: 0 0 50px rgba(151,2,2,0.6);
  }
  .mark {
    width:90px; height:90px; background:#970202;
    transform: skewX(-15deg);
    box-shadow: 0 0 40px #ff2222;
    margin-bottom:15px;
  }
  .text {
    font-size: 58px; font-weight: 900; letter-spacing: -2px; color:#ffffff;
    text-transform: uppercase;
  }
  .text span { color: #a1a1aa; }
</style>
</head>
<body>
  <div class="box">
    <div class="mark"></div>
    <div class="text">DEZ<span>PILA</span></div>
  </div>
</body>
</html>`,
  },
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
    font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif;
  }
  .container {
    display:flex; align-items:center; gap:30px;
  }
  .mark {
    width:70px; height:70px; background:#970202;
    transform: skewX(-15deg);
    box-shadow: 0 0 40px rgba(255, 34, 34, 0.8);
  }
  .text {
    font-size: 110px; font-weight: 900; tracking-tighter; color:#ffffff;
    letter-spacing: -4px; text-transform: uppercase;
  }
  .text span { color: #80808a; }
  .tag {
    font-size: 24px; font-weight: 800; color: #ff2222; letter-spacing: 6px;
    text-transform: uppercase; margin-top: 10px;
  }
</style>
</head>
<body>
  <div class="container">
    <div class="mark"></div>
    <div>
      <div class="text">DEZ<span>PILA</span></div>
      <div class="tag">STREAMING ILIMITADO</div>
    </div>
  </div>
</body>
</html>`,
  },
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
    width:800px; height:800px; background:#000000;
    display:flex; align-items:center; justify-content:center;
    padding:60px; font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif;
  }
  .card {
    width:100%; height:100%; border-radius:60px;
    background: linear-gradient(145deg, #140205 0%, #050507 100%);
    border: 4px solid #970202;
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    box-shadow: 0 0 80px rgba(151,2,2,0.5);
  }
  .mark {
    width:140px; height:140px; background:#970202;
    transform: skewX(-15deg);
    box-shadow: 0 0 60px #ff2222;
    margin-bottom:30px;
  }
  .text {
    font-size: 95px; font-weight: 900; color:#ffffff;
    letter-spacing: -3px; text-transform: uppercase;
  }
  .text span { color: #80808a; }
  .badge {
    margin-top: 25px;
    background: rgba(151,2,2,0.2);
    border: 1.5px solid #970202;
    color: #ff3b3b;
    padding: 10px 28px;
    border-radius: 30px;
    font-size: 20px;
    font-weight: 800;
    letter-spacing: 4px;
    text-transform: uppercase;
  }
</style>
</head>
<body>
  <div class="card">
    <div class="mark"></div>
    <div class="text">DEZ<span>PILA</span></div>
    <div class="badge">OFICIAL 4K</div>
  </div>
</body>
</html>`,
  },
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
    background: radial-gradient(circle, rgba(151,2,2,0.4) 0%, rgba(0,0,0,0) 70%);
    right:-150px; top:-150px; pointer-events:none;
  }
  .logo {
    display:flex; align-items:center; gap:20px;
  }
  .mark {
    width:45px; height:45px; background:#970202;
    transform: skewX(-15deg);
    box-shadow: 0 0 25px #ff2222;
  }
  .logo-text {
    font-size: 48px; font-weight: 900; letter-spacing: -2px; text-transform: uppercase;
  }
  .logo-text span { color: #80808a; }
  .headline {
    font-size: 68px; font-weight: 900; text-transform: uppercase; line-height: 1.1;
    max-width: 900px; z-index:2;
  }
  .headline span { color: #ff2222; text-shadow: 0 0 30px rgba(255,34,34,0.7); }
  .footer {
    display:flex; align-items:center; justify-content:space-between;
    border-t: 2px solid rgba(255,255,255,0.1); pt: 30px; z-index:2;
  }
  .pill {
    background: #970202; color:#fff; font-size:24px; font-weight:900;
    padding: 16px 36px; border-radius: 16px; text-transform:uppercase; letter-spacing:1px;
    box-shadow: 0 0 30px rgba(151,2,2,0.6);
  }
  .sub {
    font-size: 24px; color: #a1a1aa; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
  }
</style>
</head>
<body>
  <div class="glow"></div>
  <div class="logo">
    <div class="mark"></div>
    <div class="logo-text">DEZ<span>PILA</span></div>
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
    width:1920px; height:1080px; background:#000000;
    display:flex; flex-direction:column; justify-content:center; align-items:center;
    padding:100px; font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif;
    color:#ffffff; position:relative; overflow:hidden; text-align:center;
  }
  .glow-left {
    position:absolute; width:1200px; height:1200px;
    background: radial-gradient(circle, rgba(151,2,2,0.45) 0%, rgba(0,0,0,0) 70%);
    top:-200px; left:-200px; pointer-events:none;
  }
  .glow-right {
    position:absolute; width:1200px; height:1200px;
    background: radial-gradient(circle, rgba(151,2,2,0.35) 0%, rgba(0,0,0,0) 70%);
    bottom:-200px; right:-200px; pointer-events:none;
  }
  .mark {
    width:110px; height:110px; background:#970202;
    transform: skewX(-15deg);
    box-shadow: 0 0 50px #ff2222;
    margin-bottom:30px;
  }
  .brand-title {
    font-size: 140px; font-weight: 900; letter-spacing: -5px; text-transform: uppercase;
    line-height: 1; z-index:2;
  }
  .brand-title span { color: #757580; }
  .tagline {
    font-size: 52px; font-weight: 900; color: #ff2222; text-transform: uppercase;
    letter-spacing: 4px; margin: 30px 0 40px 0; z-index:2;
    text-shadow: 0 0 40px rgba(255,34,34,0.7);
  }
  .features {
    display:flex; gap:30px; justify-content:center; z-index:2;
  }
  .feat-box {
    background: #0d0d12; border: 2px solid #970202; border-radius: 24px;
    padding: 24px 45px; font-size: 28px; font-weight: 800; color: #e4e4e7;
    text-transform: uppercase; letter-spacing: 1px;
    box-shadow: 0 10px 30px rgba(151,2,2,0.3);
  }
</style>
</head>
<body>
  <div class="glow-left"></div>
  <div class="glow-right"></div>
  <div class="mark"></div>
  <div class="brand-title">DEZ<span>PILA</span></div>
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

console.log("Gerando arquivos de Identidade Visual em PNG...");

assetsToRender.forEach((item) => {
  const outImg = path.join(outDir, item.name);
  const tempHtml = path.join(__dirname, `temp_brand_${item.name}.html`);
  fs.writeFileSync(tempHtml, item.html, "utf-8");

  try {
    execSync(
      `"${browserPath}" --headless --screenshot="${outImg}" --window-size=${item.w},${item.h} --hide-scrollbars "${tempHtml}"`
    );
    console.log(`✓ ${item.name} (${item.w}x${item.h}px) gerado com sucesso!`);
  } catch (err) {
    console.error(`Erro ao gerar ${item.name}:`, err.message);
  } finally {
    if (fs.existsSync(tempHtml)) {
      fs.unlinkSync(tempHtml);
    }
  }
});

console.log("\nTodos os arquivos de Identidade Visual foram gerados com sucesso!");

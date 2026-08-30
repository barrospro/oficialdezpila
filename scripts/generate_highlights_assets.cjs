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

const highlights = [
  {
    name: "destaque_depoimentos.png",
    title: "DEPOIMENTOS",
    subtitle: "CLIENTES SATISFEITOS",
    icon: "⭐",
    accentColor: "#f59e0b",
  },
  {
    name: "destaque_catalogo.png",
    title: "CATÁLOGO",
    subtitle: "+60.000 FILMES & SÉRIES",
    icon: "🍿",
    accentColor: "#ff2a2a",
  },
  {
    name: "destaque_futebol.png",
    title: "FUTEBOL",
    subtitle: "JOGOS AO VIVO 4K",
    icon: "⚽",
    accentColor: "#10b981",
  },
  {
    name: "destaque_duvidas.png",
    title: "DÚVIDAS",
    subtitle: "COMO INSTALAR E ASSISTIR",
    icon: "❓",
    accentColor: "#06b6d4",
  },
  {
    name: "destaque_planos.png",
    title: "PLANOS",
    subtitle: "A PARTIR DE R$ 10/MÊS",
    icon: "💳",
    accentColor: "#ff2a2a",
  },
];

console.log("Gerando Capas de Destaques para Instagram (1080x1920)...");

highlights.forEach((item) => {
  const outImg = path.join(outDir, item.name);
  const tempHtml = path.join(__dirname, `temp_hl_${item.name}.html`);

  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    width:1080px; height:1920px; background:#050507;
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    padding:80px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    color:#ffffff; position:relative; overflow:hidden; text-align:center;
  }
  /* Glows de Fundo */
  .glow-top {
    position:absolute; width:1000px; height:1000px;
    background: radial-gradient(circle, rgba(255,42,42,0.25) 0%, rgba(0,0,0,0) 70%);
    top:-200px; left:50%; transform:translateX(-50%); pointer-events:none;
  }
  .glow-center {
    position:absolute; width:800px; height:800px;
    background: radial-gradient(circle, ${item.accentColor}33 0%, rgba(0,0,0,0) 70%);
    top:50%; left:50%; transform:translate(-50%, -50%); pointer-events:none;
  }
  .grid-bg {
    position:absolute; inset:0;
    background-image: linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px);
    background-size: 60px 60px;
  }

  /* Marca DezPila no Topo */
  .logo-header {
    position:absolute; top:180px;
    display:flex; align-items:center; gap:20px; z-index:2;
  }
  .red-mark {
    width: 40px; height: 50px; background: #ff2a2a;
    transform: skewX(-16deg); border-radius: 3px;
    box-shadow: 0 0 25px rgba(255,42,42,0.6);
  }
  .brand-text {
    font-size: 50px; font-weight: 900; letter-spacing: -2px; text-transform: uppercase;
  }
  .text-dez { color: #ffffff; }
  .text-pila { color: #71717a; }

  /* Círculo Central do Destaque */
  .highlight-circle-wrapper {
    position:relative; z-index:2; margin-bottom: 60px;
  }
  .outer-ring {
    width: 440px; height: 440px; border-radius: 50%;
    background: linear-gradient(135deg, ${item.accentColor} 0%, #ff2a2a 100%);
    padding: 8px;
    box-shadow: 0 0 80px ${item.accentColor}66, 0 20px 50px rgba(0,0,0,0.8);
    display:flex; align-items:center; justify-content:center;
  }
  .inner-circle {
    width: 100%; height: 100%; border-radius: 50%;
    background: #0d0e15;
    border: 4px solid rgba(255,255,255,0.1);
    display:flex; align-items:center; justify-content:center;
    font-size: 160px;
  }

  /* Título do Destaque */
  .title-box {
    position:relative; z-index:2;
  }
  .title-text {
    font-size: 80px; font-weight: 900; text-transform: uppercase;
    letter-spacing: 2px; line-height: 1.1; margin-bottom: 15px;
    text-shadow: 0 10px 30px rgba(0,0,0,0.8);
  }
  .subtitle-text {
    font-size: 32px; font-weight: 800; color: ${item.accentColor};
    text-transform: uppercase; letter-spacing: 5px;
    background: ${item.accentColor}15;
    border: 1.5px solid ${item.accentColor}40;
    padding: 12px 35px; border-radius: 40px;
    display: inline-block;
  }

  /* Rodapé */
  .footer-brand {
    position:absolute; bottom: 160px; z-index:2;
    font-size: 26px; font-weight: 700; color: #71717a;
    letter-spacing: 4px; uppercase;
  }
</style>
</head>
<body>
  <div class="grid-bg"></div>
  <div class="glow-top"></div>
  <div class="glow-center"></div>

  <div class="logo-header">
    <div class="red-mark"></div>
    <div class="brand-text">
      <span class="text-dez">DEZ</span><span class="text-pila">PILA</span>
    </div>
  </div>

  <div class="highlight-circle-wrapper">
    <div class="outer-ring">
      <div class="inner-circle">
        ${item.icon}
      </div>
    </div>
  </div>

  <div class="title-box">
    <div class="title-text">${item.title}</div>
    <div class="subtitle-text">${item.subtitle}</div>
  </div>

  <div class="footer-brand">
    DEZPILA.COM.BR • DESTAQUES INSTAGRAM
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

console.log("\nTodas as 5 Capas de Destaque do Instagram foram criadas!");

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const outDir = path.join(__dirname, "..", "public", "instagram", "stories");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Localiza o executável do navegador
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

// Dados dos posts de 01 a 30
const postsData = [
  {
    num: 1,
    tag: "STORY EDITORIAL",
    title: "POR QUE PAGAR R$ 350<br><span>SE VOCÊ PODE PAGAR R$ 10?</span>",
    badge: "ECONOMIA REAL TODO MÊS",
    items: [
      "❌ R$ 55,90 Netflix 4K",
      "❌ R$ 45,00 HBO Max",
      "❌ R$ 43,90 Disney+",
      "❌ R$ 120,00 Futebol Premiere",
      "🔥 DezPila: TUDO LIBERADO por R$ 10,00/mês",
    ],
    price: "ASSINE AGORA POR R$ 10,00/MÊS",
    footer: "ARRASTE PARA CIMA OU CLIQUE NA BIO",
  },
  {
    num: 2,
    tag: "STORY COMPARATIVO",
    title: "COMPARAÇÃO DIRETA:<br><span>TV A CABO VS DEZPILA</span>",
    badge: "VEJA A DIFERENÇA",
    items: [
      "📺 Outras TV a Cabo: R$ 280/mês, 1 tela, travamentos",
      "🔥 DezPila: R$ 10,00/mês, 4K, 0 travamentos",
      "🎬 +60.000 Filmes e Séries liberados",
      "⚽ Todos os campeonatos ao vivo",
    ],
    price: "ACESSO IMEDIATO POR R$ 10,00",
    footer: "CLIQUE NA BIO PARA ASSINAR",
  },
  {
    num: 3,
    tag: "STORY DEPOIMENTO",
    title: "CANCELAR A TV A CABO<br><span>FOI A MELHOR DECISÃO!</span>",
    badge: "DEPOIMENTO REAL DE CLIENTE",
    items: [
      "⭐ 'Pegou direto na minha TV Samsung em 2 min.'",
      "⭐ 'Cancelei a TV a cabo no mesmo dia!'",
      "⭐ 'Melhor economia que fiz este ano.'",
    ],
    price: "TESTE AGORA POR R$ 10,00/MÊS",
    footer: "LINK DISPONÍVEL NA BIO",
  },
  {
    num: 4,
    tag: "STORY LIFESTYLE",
    title: "CINEMA EM CASA<br><span>POR R$ 10 POR MÊS</span>",
    badge: "SALA DE CINEMA EM CASA",
    items: [
      "🍿 Maratonas completas em 4K Ultra HD",
      "🎬 Lançamentos do cinema na sua Smart TV",
      "🛋️ Assista no conforto do seu sofá",
    ],
    price: "TRANSFORME SUA TV POR R$ 10,00",
    footer: "CLIQUE NA BIO • DEZPILA STREAMING",
  },
  {
    num: 5,
    tag: "STORY ESPORTES",
    title: "NÃO PERCA NENHUM<br><span>LANCE DO SEU TIME!</span>",
    badge: "FUTEBOL AO VIVO EM 4K",
    items: [
      "⚽ Brasileirão, Libertadores e Champions",
      "🔥 Sinal rápido sem delay e sem travamentos",
      "📱 Assista na Smart TV, Celular ou PC",
    ],
    price: "ASSINE POR APENAS R$ 10,00/MÊS",
    footer: "CLIQUE NA BIO E VEJA O JOGO",
  },
  {
    num: 6,
    tag: "STORY MITO VS FATO",
    title: "POR R$ 10 DEVE TRAVAR?<br><span>MITO OU FATO?</span>",
    badge: "TECNOLOGIA DE PONTA",
    items: [
      "❌ MITO: Preço baixo significa sinal ruim",
      "✅ FATO: Servidores dedicados e ultra estáveis",
      "🚀 Garantia de sinal 100% liso",
    ],
    price: "COMPROVE AGORA POR R$ 10,00",
    footer: "LINK DE ASSINATURA NA BIO",
  },
  {
    num: 7,
    tag: "STORY DECISÃO",
    title: "SUA ÚNICA DÚVIDA É:<br><span>POR QUE NÃO ASSINOU ANTES?</span>",
    badge: "ECONOMIA DE R$ 3.000 NO ANO",
    items: [
      "💰 Sobra dinheiro para o seu lazer",
      "🍿 +60.000 Conteúdos 24 horas por dia",
      "⚡ Ativação rápida sem burocracia",
    ],
    price: "ASSINE POR R$ 10,00/MÊS",
    footer: "CLIQUE NO LINK DA BIO",
  },
  {
    num: 8,
    tag: "STORY CATÁLOGO",
    title: "+60.000 CONTEÚDOS<br><span>NA PALMA DA SUA MÃO</span>",
    badge: "CATÁLOGO COMPLETO E ATUALIZADO",
    items: [
      "🎬 Todos os filmes mais vistos do cinema",
      "📺 Séries completas de todos os streamings",
      "👶 Desenhos animados e canais infantis",
    ],
    price: "ACESSO COMPLETO POR R$ 10,00",
    footer: "CLIQUE NA BIO • DEZPILA STREAMING",
  },
  {
    num: 9,
    tag: "STORY AVALIAÇÃO",
    title: "O QUE NOSSOS CLIENTES<br><span>DIZEM DO DEZPILA</span>",
    badge: "AVALIAÇÃO 5 ESTRELAS ⭐⭐⭐⭐⭐",
    items: [
      "💬 'Instalação fácil em menos de 2 minutos!'",
      "💬 'Atendimento excelente no WhatsApp!'",
      "💬 'Qualidade de imagem surreal em 4K!'",
    ],
    price: "VENHA EXPERIMENTAR POR R$ 10,00",
    footer: "LINK DIRETO NA BIO",
  },
  {
    num: 10,
    tag: "STORY MARATONA",
    title: "PRONTO PARA A MARATONA<br><span>DO FINAL DE SEMANA?</span>",
    badge: "FINAL DE SEMANA LIBERADO",
    items: [
      "🍿 Pipoca pronta e sofá confortável",
      "🎬 As melhores séries reunidas no mesmo lugar",
      "⚡ Ativação imediata no PIX em 2 minutos",
    ],
    price: "GARANTA SEU ACESSO POR R$ 10,00",
    footer: "CLIQUE NA BIO E COMECE A MARATONAR",
  },
  {
    num: 11,
    tag: "STORY INFANTIL",
    title: "DIVERSÃO GARANTIDA<br><span>PARA TODA A FAMÍLIA</span>",
    badge: "CANAIS INFANTIS 24H",
    items: [
      "👶 Desenhos e animações educativas",
      "🛡️ Ambiente seguro para as crianças",
      "📺 Assista na Smart TV da sala ou quarto",
    ],
    price: "PLANO FAMÍLIA POR R$ 10,00/MÊS",
    footer: "ASSINE AGORA NA BIO",
  },
  {
    num: 12,
    tag: "STORY QUALIDADE 4K",
    title: "IMAGEM TÃO CRISP QUE<br><span>VOCÊ SENTE QUE ESTÁ LÁ</span>",
    badge: "4K ULTRA HD CERTIFICADO",
    items: [
      "✨ Nitidez extrema e cores vibrantes",
      "🔊 Áudio cristalino de alta fidelidade",
      "📺 Compatível com Smart TVs 4K e OLED",
    ],
    price: "ASSISTA EM 4K POR R$ 10,00",
    footer: "LINK DISPONÍVEL NA BIO",
  },
  {
    num: 13,
    tag: "STORY CUSTO BENEFÍCIO",
    title: "APENAS R$ 0,33 POR DIA!<br><span>MENOS QUE UM CAFÉ</span>",
    badge: "MAIOR ECONOMIA DO BRASIL",
    items: [
      "💰 R$ 0,33/dia por +60.000 conteúdos",
      "🍿 Muito entretenimento por custo mínimo",
      "⚡ Sem contratos de fidelidade",
    ],
    price: "ASSINE AGORA POR R$ 10,00/MÊS",
    footer: "CLIQUE NA BIO PARA ATIVAR",
  },
  {
    num: 14,
    tag: "STORY ESPORTES AO VIVO",
    title: "HOJE TEM JOGÃO!<br><span>VOCÊ JÁ GARANTIU SUA TELA?</span>",
    badge: "FUTEBOL 4K SEM DELAY",
    items: [
      "⚽ Todos os jogos do Brasileirão e Libertadores",
      "🔥 Transmissão rápida sem travamentos",
      "📱 Assista na Smart TV, Celular ou PC",
    ],
    price: "ASSINE AGORA POR R$ 10,00/MÊS",
    footer: "CLIQUE NO LINK DA BIO",
  },
  {
    num: 15,
    tag: "STORY DISPOSITIVOS",
    title: "FUNCIONA EM QUALQUER<br><span>TELA QUE VOCÊ TIVER</span>",
    badge: "COMPATIBILIDADE TOTAL",
    items: [
      "📺 Smart TVs Samsung, LG, TCL e Android TV",
      "📱 Smartphones Android e iPhone (iOS)",
      "💻 PC, Notebook, TV Box e Fire Stick",
    ],
    price: "ACESSO TOTAL POR R$ 10,00/MÊS",
    footer: "LINK NO PERFIL DA BIO",
  },
  {
    num: 16,
    tag: "STORY PASSO A PASSO",
    title: "COMO ATIVAR SEU DEZPILA<br><span>EM 3 PASSOS FÁCEIS</span>",
    badge: "SEM BUROCRACIA • SEM TÉCNICO",
    items: [
      "1️⃣ Clique no link oficial da nossa Bio",
      "2️⃣ Escolha seu plano ideal (R$ 10 Mensal)",
      "3️⃣ Pague no PIX e receba o acesso na hora!",
    ],
    price: "COMECE AGORA POR R$ 10,00/MÊS",
    footer: "CLIQUE NA BIO E ATIVE JÁ",
  },
  {
    num: 17,
    tag: "STORY CHECKOUT PIX",
    title: "PAGAMENTO NO PIX:<br><span>LIBERAÇÃO EM SEGUNDOS</span>",
    badge: "CHECKOUT NATIVO DIRETO NO SITE",
    items: [
      "⚡ QR Code Copia e Cola instantâneo",
      "🔒 Sistema blindado com SSL",
      "🚀 Login liberado na hora",
    ],
    price: "LIBERAÇÃO IMEDIATA POR R$ 10,00",
    footer: "CLIQUE NA BIO PARA COMPRAR",
  },
  {
    num: 18,
    tag: "STORY LIBERDADE",
    title: "SEM CONTRATO DE FIDELIDADE:<br><span>CANCELE QUANDO QUISER</span>",
    badge: "ZERO TAXAS • ZERO MULTAS",
    items: [
      "🚫 Sem contratos abusivos de 12 meses",
      "✅ Assine mês a mês com total controle",
      "✅ A melhor experiência pelo menor preço",
    ],
    price: "TESTE SEM COMPROMISSO POR R$ 10",
    footer: "LINK DIRETO NA BIO",
  },
  {
    num: 19,
    tag: "STORY SUPORTE",
    title: "PRECISA DE AJUDA?<br><span>SUPORTE VIA WHATSAPP</span>",
    badge: "ATENDIMENTO HUMANO E RÁPIDO",
    items: [
      "💬 Especialistas prontos para te ajudar",
      "📲 Ajuda na instalação na sua Smart TV",
      "⚡ Resposta rápida em poucos minutos",
    ],
    price: "SUPORTE INCLUSO POR R$ 10,00/MÊS",
    footer: "FALE CONOSCO NA BIO",
  },
  {
    num: 20,
    tag: "STORY RECURSOS EPG",
    title: "GUIA DE PROGRAMAÇÃO (EPG):<br><span>NUNCA PERCA UM HORÁRIO</span>",
    badge: "INTERFACE MODERNA & FLUIDA",
    items: [
      "🕒 Grade completa com horários em tempo real",
      "⚽ Saiba a hora exata do jogo do seu time",
      "🎮 Navegação intuitiva no controle remoto",
    ],
    price: "ASSINATURA COMPLETA POR R$ 10,00",
    footer: "CLIQUE NO LINK DA BIO",
  },
  {
    num: 21,
    tag: "STORY DÚVIDAS FAQ",
    title: "AS 3 PERGUNTAS QUE<br><span>TODO MUNDO FAZ</span>",
    badge: "FAQ RÁPIDO & DIRETO",
    items: [
      "📶 Precisa de internet rápida? 10 Mega já roda liso!",
      "📱 Posso assistir no celular fora de casa? SIM!",
      "💰 Quanto custa? Apenas R$ 10,00 por mês!",
    ],
    price: "ASSINE AGORA EM 2 MINUTOS",
    footer: "ACESSE O LINK NA BIO",
  },
  {
    num: 22,
    tag: "STORY PLANO PRO",
    title: "PLANO PRO SEMESTRAL:<br><span>3 TELAS POR R$ 29,90</span>",
    badge: "CAMPEÃO DE VENDAS DO SITE",
    items: [
      "🔥 6 Meses de acesso total ininterrupto",
      "📺 3 Conexões simultâneas (Sala, Quarto, Celular)",
      "💰 Menos de R$ 5 por mês para cada tela!",
    ],
    price: "R$ 29,90 / SEMESTRE INTEIRO",
    footer: "GARANTA O PLANO PRO NA BIO",
  },
  {
    num: 23,
    tag: "STORY PLANO VIP",
    title: "PLANO VIP ANUAL:<br><span>4 TELAS POR R$ 47,90</span>",
    badge: "71% DE ECONOMIA REAL",
    items: [
      "👑 12 Meses inteiros de acesso VIP",
      "👨‍👩‍👧‍👦 4 Telas simultâneas para toda a família",
      "💸 Economia de mais de R$ 3.000 no ano",
    ],
    price: "1 ANO COMPLETO POR R$ 47,90",
    footer: "CLIQUE NA BIO E SEJA VIP",
  },
  {
    num: 24,
    tag: "STORY TELAS EXTRAS",
    title: "TELAS EXTRAS ADICIONAIS:<br><span>SEM BRIGA PELO CONTROLE</span>",
    badge: "TODO MUNDO ASSISTE JUNTO",
    items: [
      "👧 Desenho favorito para as crianças",
      "👩 Séries em alta para a esposa",
      "⚽ Futebol ao vivo em 4K para você",
      "➕ Adicione telas por apenas R$ 5,90 cada",
    ],
    price: "MONTE SEU COMBO NA BIO",
    footer: "LINK NO PERFIL DO PERFIL",
  },
  {
    num: 25,
    tag: "STORY PRIVACIDADE",
    title: "PACOTE ADULTO OPCIONAL:<br><span>PROTEÇÃO COM SENHA PIN</span>",
    badge: "TOTALMENTE DISCRETO & SEGURO",
    items: [
      "🔒 Bloqueio e controle parental com senha PIN",
      "🔞 Conteúdo adulto premium e atualizado",
      "🤫 Total sigilo e descrição na assinatura",
    ],
    price: "OPCIONAL NO CHECKOUT DIRETO",
    footer: "LINK NA BIO • MÁXIMA PRIVACIDADE",
  },
  {
    num: 26,
    tag: "STORY ALERTA",
    title: "ÚLTIMAS VAGAS COM<br><span>PREÇO FIXADO EM R$ 10</span>",
    badge: "VAGAS LIMITADAS POR SERVIDOR",
    items: [
      "⚠️ Limite de usuários para garantir 0 travamentos",
      "🛡️ Garantia de sinal 100% estável",
      "🔥 Trave seu valor antes do lote fechar",
    ],
    price: "GARANTA SUA VAGA POR R$ 10,00",
    footer: "CORRA ANTES QUE ENCERRE NA BIO",
  },
  {
    num: 27,
    tag: "STORY COMPARATIVO",
    title: "1 PIZZA VS. 1 MÊS DE DEZPILA:<br><span>O QUE VALE MAIS?</span>",
    badge: "A ESCOLHA INTELIGENTE",
    items: [
      "🍕 1 Pizza = R$ 60,00 (Dura 30 minutos)",
      "📺 DezPila = R$ 10,00 (Dura 30 dias inteiros)",
      "🍿 +60.000 Filmes, Séries e Jogos em 4K",
    ],
    price: "FAÇA A ESCOLHA CERTA: R$ 10/MÊS",
    footer: "CLIQUE NA BIO PARA ASSINAR",
  },
  {
    num: 28,
    tag: "STORY CHECKOUT",
    title: "PAGOU, GEROU, ASSISTIU:<br><span>SIMPLES E DIRETO</span>",
    badge: "SEM FORMULÁRIOS COMPLICADOS",
    items: [
      "1️⃣ Acesse o site oficial DezPila",
      "2️⃣ Escaneie o QR Code PIX ou copie a chave",
      "3️⃣ Sistema aprova na hora!",
    ],
    price: "PRONTO EM 2 MINUTOS POR R$ 10",
    footer: "LINK DIRETO NA BIO",
  },
  {
    num: 29,
    tag: "STORY FIM DE SEMANA",
    title: "SEU FIM DE SEMANA MERECE<br><span>O MELHOR DO STREAMING</span>",
    badge: "SÁBADO & DOMINGO EM 4K",
    items: [
      "🍿 Maratonas completas de filmes de cinema",
      "🏆 Rodada decisiva do futebol ao vivo",
      "🛋️ O cinema mais completo na sua sala",
    ],
    price: "TRANSFORME SUA TV POR R$ 10,00",
    footer: "CLIQUE NA BIO E APROVEITE",
  },
  {
    num: 30,
    tag: "STORY MANIFESTO",
    title: "CHEGA DE PAGAR CARO.<br><span>O FUTURO DA TV É DEZPILA.</span>",
    badge: "O MELHOR STREAMING DO BRASIL",
    items: [
      "🔥 +60.000 Conteúdos em 4K",
      "⚽ Futebol ao vivo de todos os campeonatos",
      "🚫 Sem fidelidade e por apenas R$ 10/mês",
    ],
    price: "CLIQUE NA BIO E ATIVE AGORA",
    footer: "DEZPILA OFICIAL • ASSINE NA BIO",
  },
];

console.log("Iniciando renderização das 30 imagens no formato Story (9:16 - 1080x1920px)...");

postsData.forEach((post) => {
  const numStr = String(post.num).padStart(2, "0");
  const outImg = path.join(outDir, `${numStr}.png`);
  const tempHtml = path.join(__dirname, `temp_story_${numStr}.html`);

  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1080px;
    height: 1920px;
    background: #000000;
    color: #ffffff;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 110px 75px;
    position: relative;
    overflow: hidden;
  }
  .glow-top {
    position: absolute;
    width: 900px;
    height: 900px;
    background: radial-gradient(circle, rgba(151, 2, 2, 0.45) 0%, rgba(0,0,0,0) 70%);
    top: -150px;
    left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
  }
  .glow-bottom {
    position: absolute;
    width: 800px;
    height: 800px;
    background: radial-gradient(circle, rgba(151, 2, 2, 0.35) 0%, rgba(0,0,0,0) 70%);
    bottom: -200px;
    right: -100px;
    pointer-events: none;
  }
  .header-tag {
    align-self: center;
    background: rgba(151, 2, 2, 0.18);
    border: 1.5px solid #970202;
    color: #ff3b3b;
    padding: 16px 40px;
    border-radius: 50px;
    font-size: 24px;
    font-weight: 800;
    letter-spacing: 4px;
    text-transform: uppercase;
    box-shadow: 0 0 30px rgba(151, 2, 2, 0.5);
    z-index: 2;
  }
  .title {
    font-size: 64px;
    font-weight: 900;
    text-align: center;
    line-height: 1.18;
    text-transform: uppercase;
    margin: 40px 0 20px 0;
    letter-spacing: -0.5px;
    z-index: 2;
  }
  .title span {
    color: #ff2222;
    text-shadow: 0 0 40px rgba(255, 34, 34, 0.85);
  }
  .badge-sub {
    align-self: center;
    background: #140003;
    border: 1.5px solid #ff2222;
    color: #ffffff;
    font-size: 23px;
    font-weight: 700;
    padding: 12px 32px;
    border-radius: 25px;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 30px;
    box-shadow: 0 0 20px rgba(255, 34, 34, 0.3);
    z-index: 2;
  }
  .card-container {
    background: #0d0d11;
    border: 2px solid #970202;
    border-radius: 35px;
    padding: 55px 50px;
    box-shadow: 0 25px 70px rgba(151, 2, 2, 0.35), inset 0 0 35px rgba(151, 2, 2, 0.15);
    display: flex;
    flex-direction: column;
    gap: 30px;
    z-index: 2;
  }
  .card-item {
    display: flex;
    align-items: center;
    gap: 22px;
    font-size: 32px;
    font-weight: 700;
    color: #e4e4e7;
    line-height: 1.35;
  }
  .price-banner {
    background: linear-gradient(135deg, #970202 0%, #d32f2f 100%);
    color: #ffffff;
    font-size: 40px;
    font-weight: 900;
    text-align: center;
    padding: 30px;
    border-radius: 25px;
    box-shadow: 0 15px 40px rgba(151, 2, 2, 0.8);
    text-transform: uppercase;
    letter-spacing: 1.5px;
    z-index: 2;
  }
  .footer {
    text-align: center;
    font-size: 26px;
    color: #a1a1aa;
    font-weight: 800;
    letter-spacing: 3px;
    text-transform: uppercase;
    z-index: 2;
  }
</style>
</head>
<body>
  <div class="glow-top"></div>
  <div class="glow-bottom"></div>
  
  <div class="header-tag">${post.tag}</div>
  <div class="title">${post.title}</div>
  <div class="badge-sub">${post.badge}</div>
  
  <div class="card-container">
    ${post.items.map((it) => `<div class="card-item">${it}</div>`).join("")}
  </div>
  
  <div class="price-banner">${post.price}</div>
  
  <div class="footer">${post.footer}</div>
</body>
</html>`;

  fs.writeFileSync(tempHtml, html, "utf-8");

  try {
    execSync(
      `"${browserPath}" --headless --screenshot="${outImg}" --window-size=1080,1920 --hide-scrollbars "${tempHtml}"`
    );
    console.log(`✓ Story ${numStr}.png gerado com sucesso!`);
  } catch (err) {
    console.error(`Erro ao gerar Story ${numStr}:`, err.message);
  } finally {
    if (fs.existsSync(tempHtml)) {
      fs.unlinkSync(tempHtml);
    }
  }
});

console.log("\nTodos os 30 Stories do Instagram foram gerados com sucesso!");

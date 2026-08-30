const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const outDir = path.join(__dirname, "..", "instagram_posts");
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

// Dados dos posts de 14 a 30
const postsData = [
  {
    num: 14,
    tag: "FUTEBOL AO VIVO 4K",
    title: "HOJE TEM JOGÃO!<br><span>VOCÊ JÁ GARANTIU SUA TELA?</span>",
    badge: "FUTEBOL EM 4K SEM TRAVAMENTO",
    items: [
      "⚽ Todos os jogos do Brasileirão e Libertadores",
      "🔥 Transmissão rápida sem delay e sem travamentos",
      "📱 Assista na Smart TV, Celular ou Computador",
      "⚡ Ativação automática no PIX em 2 minutos",
    ],
    price: "ASSINE AGORA POR R$ 10,00/MÊS",
    footer: "CLIQUE NO LINK DA BIO • DEZPILA STREAMING",
  },
  {
    num: 15,
    tag: "COMPATIBILIDADE TOTAL",
    title: "FUNCIONA EM QUALQUER<br><span>TELA QUE VOCÊ TIVER</span>",
    badge: "BAIXOU, CONECTOU, ASSISTIU",
    items: [
      "📺 Smart TVs Samsung, LG, TCL e Android TV",
      "📱 Smartphones Android e iPhone (iOS)",
      "💻 Computadores, Notebooks e Tablets",
      "📦 TV Box, Fire TV Stick e Chromecast",
    ],
    price: "ACESSO TOTAL POR R$ 10,00/MÊS",
    footer: "INSTALAÇÃO EM 2 MINUTOS • LINK NA BIO",
  },
  {
    num: 16,
    tag: "INSTALAÇÃO FÁCIL",
    title: "COMO ATIVAR SEU DEZPILA<br><span>EM 3 PASSOS FÁCEIS</span>",
    badge: "SEM BUROCRACIA • SEM TÉCNICO",
    items: [
      "1️⃣ Clique no link oficial da nossa Bio",
      "2️⃣ Escolha seu plano ideal (R$ 10 Mensal)",
      "3️⃣ Pague no PIX e receba o acesso na hora!",
      "🎉 Pronto! Assista a +60.000 conteúdos imediatamente",
    ],
    price: "COMECE AGORA POR R$ 10,00/MÊS",
    footer: "ACESSO IMEDIATO NO PIX • LINK NA BIO",
  },
  {
    num: 17,
    tag: "CHECKOUT NATIVO & SEGURO",
    title: "PAGAMENTO NO PIX:<br><span>LIBERAÇÃO EM SEGUNDOS</span>",
    badge: "CHECKOUT 100% DIRETO NO SITE",
    items: [
      "⚡ QR Code Copia e Cola instantâneo",
      "🔒 Sistema blindado com criptografia SSL",
      "🤖 Reconhecimento automático do pagamento",
      "🚀 Login liberado na hora sem intermediários",
    ],
    price: "LIBERAÇÃO IMEDIATA POR R$ 10,00",
    footer: "CLIQUE NO LINK DA BIO • DEZPILA STREAMING",
  },
  {
    num: 18,
    tag: "LIBERDADE DE VERDADE",
    title: "SEM CONTRATO DE FIDELIDADE:<br><span>CANCELE QUANDO QUISER</span>",
    badge: "ZERO TAXAS • ZERO MULTAS",
    items: [
      "🚫 Sem contratos abusivos de 12 meses",
      "🚫 Sem taxas de cancelamento escondidas",
      "✅ Assine mês a mês com total controle",
      "✅ A melhor experiência pelo menor preço",
    ],
    price: "TESTE SEM COMPROMISSO POR R$ 10",
    footer: "LIBERDADE TOTAL • LINK NO PERFIL",
  },
  {
    num: 19,
    tag: "SUPORTE ESPECIALIZADO",
    title: "PRECISA DE AJUDA?<br><span>SUPORTE VIA WHATSAPP</span>",
    badge: "ATENDIMENTO HUMANO E RÁPIDO",
    items: [
      "💬 Especialistas prontos para te ajudar",
      "📲 Ajuda na instalação na sua Smart TV",
      "⚡ Resposta rápida em poucos minutos",
      "🛡️ Você nunca fica desamparado",
    ],
    price: "SUPORTE INCLUSO POR R$ 10,00/MÊS",
    footer: "TIRE SUAS DÚVIDAS • LINK NA BIO",
  },
  {
    num: 20,
    tag: "RECURSO EXCLUSIVO",
    title: "GUIA DE PROGRAMAÇÃO (EPG):<br><span>NUNCA PERCA UM HORÁRIO</span>",
    badge: "INTERFACE MODERNA & FLUIDA",
    items: [
      "🕒 Grade completa com horários em tempo real",
      "⚽ Saiba exatamente a hora do jogo do seu time",
      "🎬 Informações completas de filmes e séries",
      "🎮 Navegação intuitiva no controle remoto da TV",
    ],
    price: "ASSINATURA COMPLETA POR R$ 10,00",
    footer: "EXPERIÊNCIA PREMIUM • LINK NA BIO",
  },
  {
    num: 21,
    tag: "TIRE SUAS DÚVIDAS",
    title: "AS 3 PERGUNTAS QUE<br><span>TODO MUNDO FAZ</span>",
    badge: "FAQ RÁPIDO & DIRETO",
    items: [
      "📶 Precisa de internet rápida? 10 Mega já roda liso!",
      "📱 Posso assistir no celular fora de casa? SIM!",
      "💰 Quanto custa? Apenas R$ 10,00 por mês!",
      "⚡ Como assinar? Só clicar no link da Bio!",
    ],
    price: "ASSINE AGORA EM 2 MINUTOS",
    footer: "TIRE TODAS AS DÚVIDAS NA BIO",
  },
  {
    num: 22,
    tag: "O MAIS POPULAR",
    title: "PLANO PRO SEMESTRAL:<br><span>3 TELAS POR R$ 29,90</span>",
    badge: "CAMPEÃO DE VENDAS DO SITE",
    items: [
      "🔥 6 Meses de acesso total ininterrupto",
      "📺 3 Conexões simultâneas (Sala, Quarto e Celular)",
      "💰 Menos de R$ 5 por mês para cada tela!",
      "🚀 +60.000 conteúdos em 4K e Futebol liberado",
    ],
    price: "R$ 29,90 / SEMESTRE INTEIRO",
    footer: "OFERTA POR TEMPO LIMITADO • LINK NA BIO",
  },
  {
    num: 23,
    tag: "MAIOR ECONOMIA DO ANO",
    title: "PLANO VIP ANUAL:<br><span>4 TELAS POR R$ 47,90</span>",
    badge: "71% DE ECONOMIA REAL",
    items: [
      "👑 12 Meses inteiros de acesso VIP",
      "👨‍👩‍👧‍👦 4 Telas simultâneas para toda a família",
      "💸 Economia de mais de R$ 3.000 no ano",
      "🏆 O melhor custo-benefício do Brasil",
    ],
    price: "1 ANO COMPLETO POR R$ 47,90",
    footer: "GARANTA O PLANO VIP NA BIO",
  },
  {
    num: 24,
    tag: "UPGRADE FAMILIAR",
    title: "TELAS EXTRAS ADICIONAIS:<br><span>SEM BRIGA PELO CONTROLE</span>",
    badge: "TODO MUNDO ASSISTE JUNTO",
    items: [
      "👧 Criançada assiste ao desenho favorito",
      "👩 Esposa maratona a série do momento",
      "⚽ Você acompanha o futebol ao vivo em 4K",
      "➕ Adicione telas extras por apenas R$ 5,90 cada",
    ],
    price: "MONTE SEU COMBO NO CHECKOUT",
    footer: "CONFORTO PARA A FAMÍLIA • LINK NA BIO",
  },
  {
    num: 25,
    tag: "TOTAL PRIVACIDADE",
    title: "PACOTE ADULTO OPCIONAL:<br><span>PROTEÇÃO COM SENHA PIN</span>",
    badge: "TOTALMENTE DISCRETO & SEGURO",
    items: [
      "🔒 Bloqueio e controle parental com senha PIN",
      "🔞 Conteúdo adulto premium e atualizado",
      "🤫 Total sigilo e descrição na assinatura",
      "✨ Ativação opcional na hora do checkout",
    ],
    price: "OPCIONAL NO CHECKOUT NATIVO",
    footer: "MÁXIMA PRIVACIDADE • LINK NA BIO",
  },
  {
    num: 26,
    tag: "ALERTA DE VAGAS",
    title: "ÚLTIMAS VAGAS COM<br><span>PREÇO FIXADO EM R$ 10</span>",
    badge: "VAGAS LIMITADAS POR SERVIDOR",
    items: [
      "⚠️ Limite de usuários para garantir 0 travamentos",
      "⏱️ Cronômetro ativado para novos acessos",
      "🛡️ Garantia de sinal 100% estável",
      "🔥 Trave seu valor de R$ 10/mês antes do lote fechar",
    ],
    price: "GARANTA SUA VAGA POR R$ 10,00",
    footer: "CORRA ANTES QUE ENCERRE • LINK NA BIO",
  },
  {
    num: 27,
    tag: "COMPARATIVO DEFINITIVO",
    title: "1 PIZZA VS. 1 MÊS DE DEZPILA:<br><span>O QUE VALE MAIS?</span>",
    badge: "A ESCOLHA INTELIGENTE",
    items: [
      "🍕 1 Pizza = R$ 60,00 (Dura 30 minutos)",
      "📺 DezPila = R$ 10,00 (Dura 30 dias inteiros)",
      "🍿 +60.000 Filmes, Séries e Jogos Ao Vivo em 4K",
      "💡 Economia imediata de R$ 50 no seu bolso",
    ],
    price: "FAÇA A ESCOLHA CERTA: R$ 10/MÊS",
    footer: "ASSINE HOJE MESMO • LINK NA BIO",
  },
  {
    num: 28,
    tag: "EXPERIÊNCIA NATIVA",
    title: "PAGOU, GEROU, ASSISTIU:<br><span>SIMPLES E DIRETO</span>",
    badge: "SEM FORMULÁRIOS COMPLICADOS",
    items: [
      "1️⃣ Acesse o site oficial DezPila",
      "2️⃣ Escaneie o QR Code PIX ou copie a chave",
      "3️⃣ Sistema aprova na hora",
      "🎉 Acesse todos os canais e filmes no mesmo minuto",
    ],
    price: "PRONTO EM 2 MINUTOS POR R$ 10",
    footer: "EXPERIMENTE AGORA • LINK NA BIO",
  },
  {
    num: 29,
    tag: "FIM DE SEMANA CHEGOU",
    title: "SEU FIM DE SEMANA MERECE<br><span>O MELHOR DO STREAMING</span>",
    badge: "SÁBADO & DOMINGO EM 4K",
    items: [
      "🍿 Maratonas completas de lançamentos do cinema",
      "🏆 Rodada decisiva do futebol ao vivo",
      "🛋️ O cinema mais completo na sala da sua casa",
      "⚡ Ativação imediata para curtir o fim de semana",
    ],
    price: "TRANSFORME SUA TV POR R$ 10,00",
    footer: "APROVEITE O FIM DE SEMANA • LINK NA BIO",
  },
  {
    num: 30,
    tag: "A REVOLUÇÃO DO STREAMING",
    title: "CHEGA DE PAGAR CARO.<br><span>O FUTURO DA TV É DEZPILA.</span>",
    badge: "JUNTE-SE A MILHARES DE CLIENTES",
    items: [
      "🔥 +60.000 Conteúdos atualizados diariamente",
      "⚽ Todos os campeonatos de futebol em 4K",
      "🚫 Sem contratos de fidelidade e sem burocracia",
      "💎 Apenas R$ 10,00 por mês",
    ],
    price: "CLIQUE NA BIO E ATIVE AGORA",
    footer: "DEZPILA OFICIAL • O MELHOR STREAMING",
  },
];

console.log("Iniciando renderização de alta qualidade dos posts 14 a 30...");

postsData.forEach((post) => {
  const numStr = String(post.num).padStart(2, "0");
  const outImg = path.join(outDir, `${numStr}.png`);
  const tempHtml = path.join(__dirname, `temp_${numStr}.html`);

  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1080px;
    height: 1350px;
    background: #000000;
    color: #ffffff;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 70px 65px;
    position: relative;
    overflow: hidden;
  }
  .glow-top {
    position: absolute;
    width: 700px;
    height: 700px;
    background: radial-gradient(circle, rgba(151, 2, 2, 0.45) 0%, rgba(0,0,0,0) 70%);
    top: -100px;
    left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
  }
  .glow-bottom {
    position: absolute;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(151, 2, 2, 0.3) 0%, rgba(0,0,0,0) 70%);
    bottom: -150px;
    right: -100px;
    pointer-events: none;
  }
  .header-tag {
    align-self: center;
    background: rgba(151, 2, 2, 0.18);
    border: 1.5px solid #970202;
    color: #ff3b3b;
    padding: 12px 32px;
    border-radius: 50px;
    font-size: 20px;
    font-weight: 800;
    letter-spacing: 3px;
    text-transform: uppercase;
    box-shadow: 0 0 25px rgba(151, 2, 2, 0.5);
    z-index: 2;
  }
  .title {
    font-size: 52px;
    font-weight: 900;
    text-align: center;
    line-height: 1.18;
    text-transform: uppercase;
    margin: 25px 0 10px 0;
    letter-spacing: -0.5px;
    z-index: 2;
  }
  .title span {
    color: #ff2222;
    text-shadow: 0 0 35px rgba(255, 34, 34, 0.85);
  }
  .badge-sub {
    align-self: center;
    background: #140003;
    border: 1px solid #ff2222;
    color: #ffffff;
    font-size: 19px;
    font-weight: 700;
    padding: 8px 24px;
    border-radius: 20px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 20px;
    box-shadow: 0 0 15px rgba(255, 34, 34, 0.3);
    z-index: 2;
  }
  .card-container {
    background: #0d0d11;
    border: 2px solid #970202;
    border-radius: 28px;
    padding: 40px 45px;
    box-shadow: 0 20px 60px rgba(151, 2, 2, 0.35), inset 0 0 30px rgba(151, 2, 2, 0.15);
    display: flex;
    flex-direction: column;
    gap: 22px;
    z-index: 2;
  }
  .card-item {
    display: flex;
    align-items: center;
    gap: 18px;
    font-size: 27px;
    font-weight: 700;
    color: #e4e4e7;
    line-height: 1.3;
  }
  .price-banner {
    background: linear-gradient(135deg, #970202 0%, #d32f2f 100%);
    color: #ffffff;
    font-size: 34px;
    font-weight: 900;
    text-align: center;
    padding: 22px;
    border-radius: 20px;
    box-shadow: 0 12px 35px rgba(151, 2, 2, 0.8);
    text-transform: uppercase;
    letter-spacing: 1px;
    z-index: 2;
  }
  .footer {
    text-align: center;
    font-size: 21px;
    color: #a1a1aa;
    font-weight: 700;
    letter-spacing: 2px;
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
      `"${browserPath}" --headless --screenshot="${outImg}" --window-size=1080,1350 --hide-scrollbars "${tempHtml}"`
    );
    console.log(`✓ Post ${numStr}.png gerado com sucesso!`);
  } catch (err) {
    console.error(`Erro ao gerar Post ${numStr}:`, err.message);
  } finally {
    if (fs.existsSync(tempHtml)) {
      fs.unlinkSync(tempHtml);
    }
  }
});

console.log("\nTodos os 30 posts do Instagram foram gerados com sucesso!");

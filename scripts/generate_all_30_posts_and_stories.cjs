const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const feedDir = path.join(__dirname, "..", "public", "instagram", "feed");
const storyDir = path.join(__dirname, "..", "public", "instagram", "stories");

if (!fs.existsSync(feedDir)) fs.mkdirSync(feedDir, { recursive: true });
if (!fs.existsSync(storyDir)) fs.mkdirSync(storyDir, { recursive: true });

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

// Matriz completa das 30 publicações com variedade de estilos visuais
const postsConfig = [
  {
    num: 1,
    theme: "comparison",
    tag: "🔥 ECONOMIA BRUTAL",
    headline: "POR QUE PAGAR R$ 350<br><span>SE VOCÊ PODE PAGAR R$ 10?</span>",
    subtext: "Compare a fatura tradicional com a liberdade do DezPila:",
    visualType: "compare_cards",
    cardLeft: { title: "TV A CABO TRADICIONAL", price: "R$ 350,00/mês", items: ["❌ Contrato de 12 meses", "❌ Taxa de instalação", "❌ Poucos canais abertos"] },
    cardRight: { title: "DEZPILA STREAMING", price: "R$ 10,00/mês", items: ["✅ +60.000 Conteúdos 4K", "✅ Sem fidelidade nenhuma", "✅ Ativação em 2 minutos"] },
    priceBadge: "ECONOMIZE R$ 4.080 POR ANO",
    category: "Custo Benefício"
  },
  {
    num: 2,
    theme: "table",
    tag: "📊 A TABELA DA VERDADE",
    headline: "O QUE AS OPERADORAS<br><span>NÃO QUEREM QUE VOCÊ SAIBA</span>",
    subtext: "O comparativo que vai abrir os seus olhos para sempre:",
    visualType: "table_features",
    features: [
      { name: "Filmes & Séries em 4K Ultra HD", trad: "❌ Adicional R$ 45", dez: "✅ +60.000 Inclusos" },
      { name: "Futebol & Todos os Campeonatos", trad: "❌ Adicional R$ 90", dez: "✅ 100% Liberado" },
      { name: "Sem Multa de Cancelamento", trad: "❌ Fidelidade 12m", dez: "✅ Cancele Quando Quiser" },
      { name: "Compatível com Celular e Smart TV", trad: "❌ Paga ponto extra", dez: "✅ Multi-Dispositivos" },
    ],
    priceBadge: "TUDO LIBERADO POR R$ 10,00/MÊS",
    category: "Comparativo"
  },
  {
    num: 3,
    theme: "testimonial",
    tag: "⭐ PROVA SOCIAL REAL",
    headline: "CANCELAR A TV A CABO<br><span>FOI A MELHOR DECISÃO DO ANO</span>",
    subtext: "Veja o que diz quem já fez a troca inteligente:",
    visualType: "review_box",
    stars: 5,
    quote: "“Instalei na minha Smart TV Samsung em 2 minutos. Cancelei minha conta de R$ 280 da operadora e agora assisto aos jogos do meu time em 4K liso por apenas 10 reais. Sensacional!”",
    author: "Ricardo M. — Assinante Verificado ★★★★★",
    priceBadge: "EXPERIMENTE POR APENAS R$ 10,00",
    category: "Depoimento / Prova Social"
  },
  {
    num: 4,
    theme: "family_cinema",
    tag: "🍿 CINEMA EM CASA",
    headline: "SALA DE CINEMA 4K<br><span>NA SUA PRÓPRIA CASA</span>",
    subtext: "Pipoca pronta, sofá confortável e o catálogo mais completo do Brasil:",
    visualType: "cinema_visual",
    bullets: [
      "🎬 +60.000 Filmes de Cinema e Séries Atualizadas",
      "✨ Qualidade de Imagem 4K Ultra HD Crisp",
      "👨‍👩‍👧‍👦 Diversão Garantida Para Toda a Família",
      "📲 Sem Fios, Sem Aparelhos, Direto na TV"
    ],
    priceBadge: "TRANSFORME SUA SALA POR R$ 10,00/MÊS",
    category: "Lifestyle / Entretenimento"
  },
  {
    num: 5,
    theme: "sports",
    tag: "⚽ FUTEBOL AO VIVO 60FPS",
    headline: "NÃO PERCA NENHUM GOL<br><span>DO SEU TIME DO CORAÇÃO</span>",
    subtext: "Transmissão ultra estável sem delay e sem travamentos na hora do gol:",
    visualType: "sports_visual",
    bullets: [
      "🏆 Brasileirão Série A & B + Copa do Brasil",
      "🌟 UEFA Champions League & Premier League",
      "🔥 Copa Libertadores da América & Sul-Americana",
      "🥊 UFC Combate, NBA e Fórmula 1 ao Vivo"
    ],
    priceBadge: "TODOS OS JOGOS POR R$ 10,00/MÊS",
    category: "Esportes"
  },
  {
    num: 6,
    theme: "myth_fact",
    tag: "❓ MITO VS FATO",
    headline: "POR R$ 10,00 POR MÊS<br><span>DEVE TRAVAR TODA HORA, NÉ?</span>",
    subtext: "Descubra a verdade sobre a tecnologia do DezPila:",
    visualType: "myth_box",
    myth: "❌ MITO: 'É barato porque o sinal cai em dia de jogo.'",
    fact: "✅ FATO: Nossos servidores dedicados possuem balanceamento de carga automático e tecnologia anti-bloqueio que garante 100% de estabilidade até em clássicos e finais!",
    priceBadge: "TESTE E COMPROVE POR R$ 10,00",
    category: "Quebra de Objeções"
  },
  {
    num: 7,
    theme: "conversion",
    tag: "🎯 ESCOLHA INTELIGENTE",
    headline: "A ÚNICA DÚVIDA É:<br><span>POR QUE NÃO ASSINOU ANTES?</span>",
    subtext: "Mais de 15.000 clientes já economizam todos os meses:",
    visualType: "metrics_grid",
    metrics: [
      { num: "+60.000", label: "Títulos Liberados" },
      { num: "4K 60fps", label: "Qualidade de Sinal" },
      { num: "2 Min", label: "Tempo de Ativação" },
      { num: "R$ 10", label: "Mensalidade Fixa" }
    ],
    priceBadge: "ACESSO TOTAL POR R$ 10,00/MÊS",
    category: "Conversão"
  },
  {
    num: 8,
    theme: "catalog",
    tag: "📚 UNIVERSO DE CONTEÚDO",
    headline: "+60.000 CONTEÚDOS<br><span>NA PALMA DA SUA MÃO</span>",
    subtext: "O acervo mais completo do mercado reunido em um só aplicativo:",
    visualType: "catalog_categories",
    categories: [
      "🍿 Lançamentos de Cinema & Séries Mundiais",
      "⚽ Todos os Canais de Esportes Ao Vivo",
      "📰 Jornalismo, Documentários e Realities 24h",
      "🧸 Desenhos Infantis com Controle Parental"
    ],
    priceBadge: "CATÁLOGO ILIMITADO POR R$ 10,00",
    category: "Catálogo"
  },
  {
    num: 9,
    theme: "testimonial",
    tag: "💬 O QUE DIZEM NOSSOS CLIENTES",
    headline: "AVALIAÇÃO 5 ESTRELAS<br><span>APROVADO POR QUEM ASSINA</span>",
    subtext: "Confiança que se conquista com qualidade de transmissão:",
    visualType: "review_box",
    stars: 5,
    quote: "“Eu já tinha testado outros que travavam toda hora. O DezPila é o primeiro que roda perfeito na minha TV LG sem cair. Minha família inteira usa e aprovou!”",
    author: "Juliana Santos — Cliente há 8 meses ★★★★★",
    priceBadge: "SEJA CLIENTE POR R$ 10,00/MÊS",
    category: "Prova Social"
  },
  {
    num: 10,
    theme: "family_cinema",
    tag: "🛋️ MARATONA DE FIM DE SEMANA",
    headline: "PRONTO PARA A MARATONA<br><span>DO SEU FINAL DE SEMANA?</span>",
    subtext: "Sua folga merece o melhor do entretenimento sem estresse:",
    visualType: "cinema_visual",
    bullets: [
      "🍿 Séries completas para maratonar no sábado",
      "⚽ Rodadas do futebol ao vivo no domingo",
      "🧸 Desenhos animados para a criançada",
      "⚡ Ativação automática no PIX em 2 minutos"
    ],
    priceBadge: "APROVEITE O FIM DE SEMANA POR R$ 10",
    category: "Engajamento"
  },
  {
    num: 11,
    theme: "family_safe",
    tag: "👨‍👩‍👧‍👦 FAMÍLIA REUNIDA",
    headline: "DIVERSÃO SEGURA PARA<br><span>TODAS AS IDADES DA CASA</span>",
    subtext: "Conteúdos selecionados com controle e tranquilidade total:",
    visualType: "family_visual",
    bullets: [
      "👶 Desenhos animados e conteúdos educativos",
      "🔒 Controle parental completo com senha PIN",
      "✝️ Opcional CristoFlix com histórias bíblicas",
      "📺 Toda a família reunida em frente à TV"
    ],
    priceBadge: "PLANO FAMÍLIA POR R$ 10,00/MÊS",
    category: "Família / Infantil"
  },
  {
    num: 12,
    theme: "tech_4k",
    tag: "✨ TECNOLOGIA ULTRA HD",
    headline: "IMAGEM 4K CRISTALINA<br><span>SEM COMPRESSÃO DE SINAL</span>",
    subtext: "Sinta cada detalhe como se você estivesse dentro da cena:",
    visualType: "tech_visual",
    bullets: [
      "🌟 Resolução Ultra HD 4K com cores vivas",
      "🔊 Áudio Surround imersivo 5.1",
      "⚡ Taxa de quadros suave em 60 FPS",
      "📺 Otimizado para Smart TVs 4K modernas"
    ],
    priceBadge: "QUALIDADE MÁXIMA POR R$ 10,00",
    category: "Tecnologia / Qualidade"
  },
  {
    num: 13,
    theme: "comparison",
    tag: "🪙 CUSTO INACREDITÁVEL",
    headline: "MENOS DE R$ 0,33 POR DIA<br><span>MAIS BARATO QUE UM CAFÉ</span>",
    subtext: "Veja a matemática simples da sua economia:",
    visualType: "coin_calc",
    calc: [
      { label: "1 Cafezinho na padaria", val: "R$ 6,00 (Dura 5 minutos)" },
      { label: "1 Mês de TV a Cabo Antiga", val: "R$ 280,00 (Pesa no bolso)" },
      { label: "1 Mês Inteiro de DezPila", val: "R$ 10,00 = R$ 0,33 ao dia!" }
    ],
    priceBadge: "ACESSO ILIMITADO POR R$ 0,33/DIA",
    category: "Custo Benefício / Economia"
  },
  {
    num: 14,
    theme: "sports",
    tag: "🏆 HOJE É DIA DE JOGO",
    headline: "HOJE TEM CLÁSSICO!<br><span>SUA TELA JÁ ESTÁ GARANTIDA?</span>",
    subtext: "Não passe sufoco procurando link que trava bem na hora do chute:",
    visualType: "sports_visual",
    bullets: [
      "⚽ Transmissão oficial em 4K sem cortes",
      "🚀 Servidor ultra rápido sem delay",
      "📱 Assista na Smart TV, Celular ou Computador",
      "⚡ Liberação imediata no PIX em 2 minutos"
    ],
    priceBadge: "GARANTA SUA TELA POR R$ 10,00",
    category: "Esportes / Matchday"
  },
  {
    num: 15,
    theme: "devices",
    tag: "📱 COMPATIBILIDADE TOTAL",
    headline: "FUNCIONA EM QUALQUER<br><span>TELA QUE VOCÊ TIVER</span>",
    subtext: "Baixou, conectou, assistiu! Sem complicação:",
    visualType: "device_list",
    devices: [
      "📺 Smart TVs Samsung, LG, TCL e Android TV",
      "📱 Smartphones Android e iPhone (iOS)",
      "💻 Computadores, Notebooks e Tablets",
      "📦 TV Box, Fire TV Stick e Chromecast"
    ],
    priceBadge: "ACESSO MULTIPLATAFORMA POR R$ 10",
    category: "Compatibilidade"
  },
  {
    num: 16,
    theme: "steps",
    tag: "⚡ INSTALAÇÃO RÁPIDA",
    headline: "COMO ATIVAR SEU DEZPILA<br><span>EM 3 PASSOS SIMPLES</span>",
    subtext: "Sem técnico na sua casa e sem furar paredes:",
    visualType: "step_cards",
    steps: [
      { step: "1", title: "ESCOLHA O PLANO", desc: "Acesse o checkout nativo seguro (R$ 10/mês)" },
      { step: "2", title: "PAGUE NO PIX", desc: "QR Code instantâneo com confirmação em segundos" },
      { step: "3", title: "ASSISTA NA HORA", desc: "Seus dados são liberados na mesma hora!" }
    ],
    priceBadge: "COMECE AGORA POR R$ 10,00/MÊS",
    category: "Tutorial / Passo a Passo"
  },
  {
    num: 17,
    theme: "checkout",
    tag: "🔒 PAGAMENTO 100% SEGURO",
    headline: "CHECKOUT NATIVO NO PIX<br><span>LIBERAÇÃO EM SEGUNDOS</span>",
    subtext: "Sistema automatizado direto no site sem intermediários:",
    visualType: "security_grid",
    bullets: [
      "⚡ QR Code Copia e Cola instantâneo",
      "🛡️ Criptografia bancária de ponta a ponta",
      "🤖 Reconhecimento automático do pagamento",
      "🚀 Login liberado imediatamente na tela"
    ],
    priceBadge: "LIBERAÇÃO IMEDIATA POR R$ 10,00",
    category: "Segurança / Checkout"
  },
  {
    num: 18,
    theme: "freedom",
    tag: "🚫 SEM CONTRATO PRESO",
    headline: "SEM CONTRATO DE FIDELIDADE<br><span>CANCELE QUANDO QUISER</span>",
    subtext: "Você fica conosco pela qualidade, não por obrigação:",
    visualType: "freedom_visual",
    bullets: [
      "🚫 Zero contratos abusivos de 12 meses",
      "🚫 Zero multas rescisórias ou taxas ocultas",
      "✅ Assine mês a mês com total controle",
      "✅ A melhor experiência pelo menor preço"
    ],
    priceBadge: "TESTE SEM COMPROMISSO POR R$ 10",
    category: "Liberdade"
  },
  {
    num: 19,
    theme: "support",
    tag: "💬 SUPORTE DEDICADO",
    headline: "PRECISA DE AJUDA?<br><span>SUPORTE VIA WHATSAPP</span>",
    subtext: "Você nunca fica desamparado na hora de instalar:",
    visualType: "support_visual",
    bullets: [
      "👥 Atendimento humano ágil e atencioso",
      "📲 Passo a passo para instalar na sua Smart TV",
      "⚡ Resposta rápida em poucos minutos",
      "🛡️ Pós-venda garantido todos os dias"
    ],
    priceBadge: "SUPORTE INCLUSO POR R$ 10,00/MÊS",
    category: "Suporte ao Cliente"
  },
  {
    num: 20,
    theme: "epg",
    tag: "🕒 GUIA DE PROGRAMAÇÃO (EPG)",
    headline: "INTERFACE ESTILO CABO<br><span>NUNCA PERCA UM HORÁRIO</span>",
    subtext: "Navegação moderna e intuitiva direto no controle remoto:",
    visualType: "epg_visual",
    bullets: [
      "🕒 Grade completa de horários em tempo real",
      "⚽ Saiba exatamente a hora do jogo do seu time",
      "🎬 Sinopses completas de filmes e séries",
      "🎮 Troca rápida de canais sem lentidão"
    ],
    priceBadge: "EXPERIÊNCIA PREMIUM POR R$ 10,00",
    category: "Recursos do App"
  },
  {
    num: 21,
    theme: "faq",
    tag: "❓ DÚVIDAS FREQUENTES",
    headline: "AS 3 PERGUNTAS QUE<br><span>TODO MUNDO FAZ</span>",
    subtext: "Respostas diretas e transparentes para você:",
    visualType: "faq_list",
    faqs: [
      { q: "Precisa de internet rápida?", a: "Com apenas 10 Mega já roda liso em 4K!" },
      { q: "Posso assistir fora de casa?", a: "Sim! Funciona no 4G/5G/Wi-Fi no celular." },
      { q: "Quanto custa a mensalidade?", a: "Apenas R$ 10,00 fixos sem surpresas." }
    ],
    priceBadge: "TIRE TODAS AS DÚVIDAS POR R$ 10",
    category: "FAQ / Dúvidas Frequentes"
  },
  {
    num: 22,
    theme: "offer_semestral",
    tag: "🔥 MAIS VENDIDO DO SITE",
    headline: "PLANO PRO SEMESTRAL<br><span>3 TELAS POR R$ 29,90</span>",
    subtext: "O campeão de vendas para quem busca o máximo de economia:",
    visualType: "plan_card",
    planTitle: "PLANO PRO SEMESTRAL",
    planPrice: "R$ 29,90",
    planPeriod: "6 MESES COMPLETOS (Menos de R$ 5/mês por tela)",
    bullets: [
      "📺 3 Conexões simultâneas ativas (Sala, Quarto e Celular)",
      "🍿 +60.000 Filmes, Séries e Canais em 4K",
      "⚡ 6 Meses ininterruptos sem se preocupar com fatura",
      "💎 O melhor custo por tela do Brasil"
    ],
    priceBadge: "GARANTA O PRO SEMESTRAL POR R$ 29,90",
    category: "Ofertas / Planos"
  },
  {
    num: 23,
    theme: "offer_vip",
    tag: "👑 OFERTA VIP FAMÍLIA",
    headline: "PLANO VIP ANUAL<br><span>4 TELAS POR R$ 47,90</span>",
    subtext: "O combo definitivo para a família inteira com 71% de desconto:",
    visualType: "plan_card",
    planTitle: "PLANO VIP ANUAL",
    planPrice: "R$ 47,90",
    planPeriod: "12 MESES INTEIROS (Menos de R$ 4,00 por mês)",
    bullets: [
      "👨‍👩‍👧‍👦 4 Conexões simultâneas para toda a casa",
      "💸 Economia de mais de R$ 3.500 no ano",
      "🏆 Acesso VIP a todos os lançamentos 4K e Futebol",
      "🛡️ Suporte prioritário 365 dias do ano"
    ],
    priceBadge: "1 ANO COMPLETO POR R$ 47,90",
    category: "Oferta Premium"
  },
  {
    num: 24,
    theme: "screens",
    tag: "📺 UPGRADE FAMILIAR",
    headline: "TELAS EXTRAS ADICIONAIS<br><span>SEM BRIGA PELO CONTROLE</span>",
    subtext: "Cada um assiste o que quer na sua própria tela:",
    visualType: "screens_visual",
    bullets: [
      "👧 As crianças assistem aos desenhos no tablet",
      "👩 A esposa maratona a série novinha na Smart TV",
      "⚽ Você acompanha o futebol ao vivo no celular",
      "➕ Telas extras adicionais por apenas R$ 5,90 cada"
    ],
    priceBadge: "MONTE SEU COMBO POR APENAS R$ 10",
    category: "Combo Família"
  },
  {
    num: 25,
    theme: "privacy",
    tag: "🔒 TOTAL PRIVACIDADE",
    headline: "PACOTE ADULTO OPCIONAL<br><span>PROTEÇÃO COM SENHA PIN</span>",
    subtext: "Ativação opcional no checkout com total discrição e sigilo:",
    visualType: "privacy_visual",
    bullets: [
      "🔞 Conteúdos adultos exclusivos e atualizados",
      "🔑 Protegido com senha PIN e controle parental rigoroso",
      "🤫 Sigilo absoluto e discrição na fatura",
      "✨ Ativação opcional na hora da compra"
    ],
    priceBadge: "OPCIONAL DISCRETO NO CHECKOUT",
    category: "Recursos Opcionais"
  },
  {
    num: 26,
    theme: "urgency",
    tag: "⚠️ ALERTA DE VAGAS",
    headline: "ÚLTIMAS VAGAS COM<br><span>PREÇO FIXADO EM R$ 10</span>",
    subtext: "Para garantir 100% de estabilidade limitamos novas entradas:",
    visualType: "urgency_box",
    bullets: [
      "🔒 Servidores com limite de conexões para 0 travamento",
      "⏱️ Lote promocional sujeito a alteração a qualquer momento",
      "🛡️ Preço de R$ 10,00 garantido para quem entrar agora",
      "⚡ Ativação imediata em 2 minutos via PIX"
    ],
    priceBadge: "TRAVE SEU VALOR DE R$ 10,00 AGORA",
    category: "Escassez / Urgência"
  },
  {
    num: 27,
    theme: "pizza_math",
    tag: "🍕 MATEMÁTICA SIMPLES",
    headline: "1 PIZZA VS 1 MÊS DE DEZPILA<br><span>QUAL VALE MAIS A PENA?</span>",
    subtext: "Coloque na ponta do lápis e faça a escolha óbvia:",
    visualType: "pizza_compare",
    leftItem: { title: "1 PIZZA GRANDE", price: "R$ 60,00", desc: "Dura apenas 30 minutos na mesa de jantar" },
    rightItem: { title: "1 MÊS DE DEZPILA", price: "R$ 10,00", desc: "Dura 30 dias inteiros de diversão em 4K para toda a família" },
    priceBadge: "A ESCOLHA INTELIGENTE: R$ 10,00/MÊS",
    category: "Comparação de Valor"
  },
  {
    num: 28,
    theme: "speed",
    tag: "⚡ PRATICIDADE MÁXIMA",
    headline: "PAGOU, GEROU, ASSISTIU<br><span>SIMPLES, DIRETO E RÁPIDO</span>",
    subtext: "Sem formulários chatos e sem esperar atendente:",
    visualType: "speed_visual",
    steps: [
      "1️⃣ Acesse o site oficial DezPila",
      "2️⃣ Escaneie o QR Code PIX",
      "3️⃣ Seu acesso aparece na tela em segundos!"
    ],
    priceBadge: "ACESSO INSTANTÂNEO POR R$ 10,00",
    category: "Velocidade / Praticidade"
  },
  {
    num: 29,
    theme: "weekend",
    tag: "🍿 SABADOU & DOMINGOU",
    headline: "SEU FIM DE SEMANA MERECE<br><span>O MELHOR DO STREAMING</span>",
    subtext: "Relaxe e aproveite seus dias de descanso com qualidade máxima:",
    visualType: "weekend_visual",
    bullets: [
      "🎬 Filmes que acabaram de sair do cinema",
      "🏆 Rodadas decisivas dos campeonatos de futebol",
      "🛋️ Conforto total na sala da sua casa",
      "⚡ Instalação em 2 minutos na sua Smart TV"
    ],
    priceBadge: "CURTA O FIM DE SEMANA POR R$ 10,00",
    category: "Engajamento Weekend"
  },
  {
    num: 30,
    theme: "manifesto",
    tag: "🔥 A REVOLUÇÃO DO STREAMING",
    headline: "CHEGA DE PAGAR CARO.<br><span>O FUTURO DA TV É DEZPILA.</span>",
    subtext: "O manifesto por um entretenimento acessível e de alta qualidade:",
    visualType: "manifesto_visual",
    bullets: [
      "💎 +60.000 Conteúdos atualizados diariamente",
      "⚽ Todos os canais de futebol em 4K sem travamento",
      "🚫 Sem contratos de fidelidade e sem burocracia",
      "👑 Apenas R$ 10,00 por mês"
    ],
    priceBadge: "JUNTE-SE A NÓS POR APENAS R$ 10,00/MÊS",
    category: "Manifesto / Fechamento"
  }
];

function generateHtml(post, isStory) {
  const width = isStory ? 1080 : 1080;
  const height = isStory ? 1920 : 1350;
  const padding = isStory ? "80px 65px" : "60px 55px";

  // Gera o miolo visual baseado no tipo de post
  let contentHtml = "";

  if (post.visualType === "compare_cards") {
    contentHtml = `
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px; margin:25px 0;">
        <div style="background:rgba(20,10,12,0.9); border:2px solid rgba(239,68,68,0.3); border-radius:24px; padding:28px 22px; text-align:center;">
          <div style="font-size:16px; font-weight:800; color:#ef4444; letter-spacing:1px; margin-bottom:8px;">${post.cardLeft.title}</div>
          <div style="font-size:32px; font-weight:900; color:#f87171; margin-bottom:18px;">${post.cardLeft.price}</div>
          <div style="display:flex; flex-direction:column; gap:12px; text-align:left; font-size:17px; font-weight:600; color:#cbd5e1;">
            ${post.cardLeft.items.map(i => `<div>${i}</div>`).join("")}
          </div>
        </div>
        <div style="background:linear-gradient(145deg, rgba(20,22,35,0.95), rgba(151,2,2,0.3)); border:2.5px solid #ff2a2a; border-radius:24px; padding:28px 22px; text-align:center; box-shadow:0 0 35px rgba(255,42,42,0.3);">
          <div style="font-size:16px; font-weight:800; color:#ff4d4d; letter-spacing:1px; margin-bottom:8px;">${post.cardRight.title}</div>
          <div style="font-size:34px; font-weight:900; color:#ffffff; margin-bottom:18px; text-shadow:0 0 20px rgba(255,42,42,0.8);">${post.cardRight.price}</div>
          <div style="display:flex; flex-direction:column; gap:12px; text-align:left; font-size:17px; font-weight:700; color:#ffffff;">
            ${post.cardRight.items.map(i => `<div>${i}</div>`).join("")}
          </div>
        </div>
      </div>
    `;
  } else if (post.visualType === "table_features") {
    contentHtml = `
      <div style="background:#0d0e17; border:2px solid rgba(255,42,42,0.4); border-radius:24px; padding:28px 30px; margin:25px 0; display:flex; flex-direction:column; gap:16px;">
        ${post.features.map(f => `
          <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:14px;">
            <div style="font-size:19px; font-weight:700; color:#ffffff;">${f.name}</div>
            <div style="display:flex; gap:16px; font-size:16px; font-weight:800;">
              <span style="color:#ef4444; background:rgba(239,68,68,0.15); padding:4px 10px; border-radius:8px;">${f.trad}</span>
              <span style="color:#22c55e; background:rgba(34,197,94,0.15); padding:4px 10px; border-radius:8px; border:1px solid #22c55e;">${f.dez}</span>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  } else if (post.visualType === "review_box") {
    contentHtml = `
      <div style="background:linear-gradient(145deg, #0f111a, #16080a); border:2px solid #ff2a2a; border-radius:24px; padding:35px 32px; margin:25px 0; box-shadow:0 15px 40px rgba(151,2,2,0.35);">
        <div style="font-size:28px; color:#fbbf24; margin-bottom:16px; text-shadow:0 0 15px rgba(251,191,36,0.6);">★★★★★</div>
        <div style="font-size:22px; font-weight:600; line-height:1.45; color:#f1f5f9; font-style:italic; margin-bottom:20px;">
          ${post.quote}
        </div>
        <div style="font-size:16px; font-weight:800; color:#ff4d4d; letter-spacing:1px; text-transform:uppercase;">
          ${post.author}
        </div>
      </div>
    `;
  } else if (post.visualType === "metrics_grid") {
    contentHtml = `
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin:25px 0;">
        ${post.metrics.map(m => `
          <div style="background:#0d0e17; border:2px solid rgba(255,42,42,0.4); border-radius:20px; padding:26px 20px; text-align:center; box-shadow:0 8px 25px rgba(0,0,0,0.6);">
            <div style="font-size:36px; font-weight:900; color:#ff3b3b; text-shadow:0 0 25px rgba(255,59,59,0.7); margin-bottom:6px;">${m.num}</div>
            <div style="font-size:17px; font-weight:700; color:#cbd5e1; text-transform:uppercase;">${m.label}</div>
          </div>
        `).join("")}
      </div>
    `;
  } else if (post.visualType === "coin_calc") {
    contentHtml = `
      <div style="background:#0d0e17; border:2px solid rgba(255,42,42,0.4); border-radius:24px; padding:28px 30px; margin:25px 0; display:flex; flex-direction:column; gap:18px;">
        ${post.calc.map(c => `
          <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:14px;">
            <div style="font-size:20px; font-weight:700; color:#ffffff;">${c.label}</div>
            <div style="font-size:19px; font-weight:900; color:#ff4d4d; background:rgba(255,42,42,0.15); padding:6px 16px; border-radius:12px; border:1px solid #ff4d4d;">${c.val}</div>
          </div>
        `).join("")}
      </div>
    `;
  } else if (post.visualType === "pizza_compare") {
    contentHtml = `
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px; margin:25px 0;">
        <div style="background:rgba(20,10,12,0.9); border:2px solid rgba(239,68,68,0.3); border-radius:24px; padding:28px 20px; text-align:center;">
          <div style="font-size:42px; margin-bottom:8px;">🍕</div>
          <div style="font-size:18px; font-weight:800; color:#ef4444; margin-bottom:6px;">${post.leftItem.title}</div>
          <div style="font-size:32px; font-weight:900; color:#f87171; margin-bottom:10px;">${post.leftItem.price}</div>
          <div style="font-size:16px; color:#cbd5e1; font-weight:600;">${post.leftItem.desc}</div>
        </div>
        <div style="background:linear-gradient(145deg, rgba(20,22,35,0.95), rgba(151,2,2,0.3)); border:2.5px solid #ff2a2a; border-radius:24px; padding:28px 20px; text-align:center; box-shadow:0 0 35px rgba(255,42,42,0.3);">
          <div style="font-size:42px; margin-bottom:8px;">📺</div>
          <div style="font-size:18px; font-weight:800; color:#ff4d4d; margin-bottom:6px;">${post.rightItem.title}</div>
          <div style="font-size:34px; font-weight:900; color:#ffffff; margin-bottom:10px; text-shadow:0 0 20px rgba(255,42,42,0.8);">${post.rightItem.price}</div>
          <div style="font-size:16px; color:#ffffff; font-weight:700;">${post.rightItem.desc}</div>
        </div>
      </div>
    `;
  } else if (post.visualType === "step_cards") {
    contentHtml = `
      <div style="display:flex; flex-direction:column; gap:16px; margin:25px 0;">
        ${post.steps.map(s => `
          <div style="background:#0d0e17; border:2px solid rgba(255,42,42,0.4); border-radius:20px; padding:18px 24px; display:flex; align-items:center; gap:20px; box-shadow:0 6px 20px rgba(0,0,0,0.6);">
            <div style="width:48px; height:48px; background:linear-gradient(135deg, #970202, #ff2a2a); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:24px; font-weight:900; color:#ffffff; shrink:0; box-shadow:0 0 15px rgba(255,42,42,0.8);">${s.step}</div>
            <div>
              <div style="font-size:19px; font-weight:900; color:#ffffff; text-transform:uppercase;">${s.title}</div>
              <div style="font-size:16px; font-weight:600; color:#cbd5e1;">${s.desc}</div>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  } else if (post.visualType === "faq_list") {
    contentHtml = `
      <div style="display:flex; flex-direction:column; gap:16px; margin:25px 0;">
        ${post.faqs.map(f => `
          <div style="background:#0d0e17; border:2px solid rgba(255,42,42,0.4); border-radius:20px; padding:20px 24px; box-shadow:0 6px 20px rgba(0,0,0,0.6);">
            <div style="font-size:19px; font-weight:900; color:#ff4d4d; margin-bottom:6px;">❓ ${f.q}</div>
            <div style="font-size:17px; font-weight:700; color:#ffffff;">👉 ${f.a}</div>
          </div>
        `).join("")}
      </div>
    `;
  } else if (post.visualType === "plan_card") {
    contentHtml = `
      <div style="background:linear-gradient(145deg, #0e101a, #1a080c); border:2.5px solid #ff2a2a; border-radius:24px; padding:30px; margin:25px 0; text-align:center; box-shadow:0 0 40px rgba(151,2,2,0.4);">
        <div style="font-size:20px; font-weight:900; color:#ff4d4d; letter-spacing:1.5px; text-transform:uppercase; margin-bottom:6px;">${post.planTitle}</div>
        <div style="font-size:46px; font-weight:900; color:#ffffff; text-shadow:0 0 25px rgba(255,42,42,0.9); margin-bottom:4px;">${post.planPrice}</div>
        <div style="font-size:16px; font-weight:800; color:#cbd5e1; text-transform:uppercase; margin-bottom:22px; background:rgba(255,42,42,0.15); display:inline-block; padding:6px 20px; border-radius:50px;">${post.planPeriod}</div>
        <div style="display:flex; flex-direction:column; gap:12px; text-align:left; font-size:18px; font-weight:700; color:#f1f5f9;">
          ${post.bullets.map(b => `<div>${b}</div>`).join("")}
        </div>
      </div>
    `;
  } else {
    // Default bullets list (Família, Cinema, Esportes, etc.)
    const items = post.bullets || post.categories || post.devices || [];
    contentHtml = `
      <div style="background:#0d0e17; border:2px solid rgba(255,42,42,0.4); border-radius:24px; padding:32px 30px; margin:25px 0; display:flex; flex-direction:column; gap:18px; box-shadow:0 15px 40px rgba(0,0,0,0.7), inset 0 0 25px rgba(151,2,2,0.15);">
        ${items.map(it => `
          <div style="display:flex; align-items:center; gap:16px; font-size:21px; font-weight:700; color:#f1f5f9; line-height:1.35;">
            <div style="width:10px; height:10px; background:#ff2a2a; border-radius:50%; box-shadow:0 0 10px #ff2a2a; shrink:0;"></div>
            <div>${it}</div>
          </div>
        `).join("")}
      </div>
    `;
  }

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: ${width}px;
    height: ${height}px;
    background: #050507;
    color: #ffffff;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: ${padding};
    position: relative;
    overflow: hidden;
  }
  .bg-glow-top {
    position: absolute;
    width: 800px;
    height: 800px;
    background: radial-gradient(circle, rgba(151, 2, 2, 0.4) 0%, rgba(5,5,7,0) 70%);
    top: -200px;
    left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
  }
  .bg-glow-bottom {
    position: absolute;
    width: 700px;
    height: 700px;
    background: radial-gradient(circle, rgba(151, 2, 2, 0.25) 0%, rgba(5,5,7,0) 70%);
    bottom: -200px;
    right: -150px;
    pointer-events: none;
  }
  /* LOGOMARCA NO TOPO */
  .top-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    z-index: 10;
  }
  .logo-wrapper {
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(13, 14, 23, 0.85);
    border: 1.5px solid rgba(255, 42, 42, 0.35);
    padding: 10px 22px;
    border-radius: 100px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.6);
  }
  .brand-mark {
    width: 24px;
    height: 30px;
    background: #ff2a2a;
    transform: skewX(-16deg);
    border-radius: 4px;
    box-shadow: 0 0 12px rgba(255, 42, 42, 0.8);
  }
  .logo-text {
    font-size: 26px;
    font-weight: 900;
    letter-spacing: -0.5px;
    text-transform: uppercase;
    color: #ffffff;
  }
  .logo-pila {
    color: #94a3b8;
  }
  .tag-pill {
    background: rgba(151, 2, 2, 0.2);
    border: 1.5px solid #ff2a2a;
    color: #ff4d4d;
    padding: 10px 24px;
    border-radius: 100px;
    font-size: 17px;
    font-weight: 800;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    box-shadow: 0 0 20px rgba(151, 2, 2, 0.4);
  }
  .title-block {
    text-align: center;
    margin: 20px 0 10px 0;
    z-index: 10;
  }
  .main-title {
    font-size: ${isStory ? "54px" : "48px"};
    font-weight: 900;
    line-height: 1.15;
    text-transform: uppercase;
    letter-spacing: -1px;
  }
  .main-title span {
    color: #ff2a2a;
    text-shadow: 0 0 35px rgba(255, 42, 42, 0.8);
  }
  .sub-title {
    font-size: 20px;
    font-weight: 600;
    color: #94a3b8;
    margin-top: 10px;
  }
  .bottom-cta {
    background: linear-gradient(135deg, #970202 0%, #d32f2f 100%);
    color: #ffffff;
    font-size: ${isStory ? "32px" : "28px"};
    font-weight: 900;
    text-align: center;
    padding: 20px 30px;
    border-radius: 100px;
    box-shadow: 0 10px 35px rgba(151, 2, 2, 0.8), 0 0 20px rgba(255, 42, 42, 0.5);
    text-transform: uppercase;
    letter-spacing: 1px;
    border: 2px solid #ff4d4d;
    z-index: 10;
  }
</style>
</head>
<body>
  <div class="bg-glow-top"></div>
  <div class="bg-glow-bottom"></div>

  <!-- TOPO: LOGO OFICIAL + TAG DO TEMA -->
  <div class="top-header">
    <div class="logo-wrapper">
      <div class="brand-mark"></div>
      <div class="logo-text">DEZ<span class="logo-pila">PILA</span></div>
    </div>
    <div class="tag-pill">${post.tag}</div>
  </div>

  <!-- TÍTULO & GANCHO -->
  <div class="title-block">
    <div class="main-title">${post.headline}</div>
    <div class="sub-title">${post.subtext}</div>
  </div>

  <!-- CONTEÚDO VISUAL DINÂMICO -->
  <div style="flex:1; display:flex; flex-direction:column; justify-content:center; z-index:10;">
    ${contentHtml}
  </div>

  <!-- RODAPÉ CTA (VALOR / OFERTA) -->
  <div class="bottom-cta">
    ${post.priceBadge}
  </div>
</body>
</html>`;
}

console.log("Iniciando geração dos 30 Posts de Feed (1080x1350) e 30 Stories (1080x1920)...");

postsConfig.forEach((post) => {
  const numStr = String(post.num).padStart(2, "0");

  // 1. Gera Feed 4:5
  const feedImg = path.join(feedDir, `${numStr}.png`);
  const feedTempHtml = path.join(__dirname, `temp_feed_${numStr}.html`);
  fs.writeFileSync(feedTempHtml, generateHtml(post, false), "utf-8");

  try {
    execSync(
      `"${browserPath}" --headless --screenshot="${feedImg}" --window-size=1080,1350 --hide-scrollbars "${feedTempHtml}"`
    );
    console.log(`✓ Feed ${numStr}.png gerado com sucesso!`);
  } catch (err) {
    console.error(`Erro ao gerar Feed ${numStr}:`, err.message);
  } finally {
    if (fs.existsSync(feedTempHtml)) fs.unlinkSync(feedTempHtml);
  }

  // 2. Gera Story 9:16
  const storyImg = path.join(storyDir, `${numStr}.png`);
  const storyTempHtml = path.join(__dirname, `temp_story_${numStr}.html`);
  fs.writeFileSync(storyTempHtml, generateHtml(post, true), "utf-8");

  try {
    execSync(
      `"${browserPath}" --headless --screenshot="${storyImg}" --window-size=1080,1920 --hide-scrollbars "${storyTempHtml}"`
    );
    console.log(`✓ Story ${numStr}.png gerado com sucesso!`);
  } catch (err) {
    console.error(`Erro ao gerar Story ${numStr}:`, err.message);
  } finally {
    if (fs.existsSync(storyTempHtml)) fs.unlinkSync(storyTempHtml);
  }
});

console.log("\nTodas as 60 imagens (30 Feed + 30 Stories) foram geradas com altíssima qualidade!");

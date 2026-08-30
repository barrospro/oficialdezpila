export interface InstagramCreative {
  day: number;
  id: string;
  title: string;
  category: string;
  feedImage: string;
  storyImage: string;
  caption: string;
}

export interface BrandAsset {
  id: string;
  name: string;
  category: string;
  dimensions: string;
  format: string;
  imagePath: string;
  description: string;
}

export const BRAND_ASSETS: BrandAsset[] = [
  {
    id: "brand_favicon",
    name: "Favicon Ícone DezPila",
    category: "Ícone / Favicon",
    dimensions: "512 x 512 px",
    format: "PNG Alta Definição",
    imagePath: "/brand/favicon_512.png",
    description:
      "Ícone oficial em formato quadrado arredondado com borda neon vermelha para favicons de navegadores, apps e perfis sociais.",
  },
  {
    id: "brand_logo_horizontal",
    name: "Logo DezPila Horizontal",
    category: "Logotipo Principal",
    dimensions: "1200 x 400 px",
    format: "PNG Fundo Escuro",
    imagePath: "/brand/logo_horizontal_dark.png",
    description:
      "Logotipo oficial estilizado em versão horizontal com o distintivo vermelho inclinado e tipografia em destaque.",
  },
  {
    id: "brand_logo_quadrada",
    name: "Logo DezPila Quadrada",
    category: "Perfil / Avatar",
    dimensions: "800 x 800 px",
    format: "PNG Fundo Escuro",
    imagePath: "/brand/logo_quadrada.png",
    description:
      "Versão quadrada com badge de autenticidade 'OFICIAL 4K' ideal para avatares do WhatsApp, Instagram e TikTok.",
  },
  {
    id: "brand_banner_og",
    name: "Banner OpenGraph (Redes Sociais)",
    category: "Marketing / Card",
    dimensions: "1200 x 630 px",
    format: "PNG",
    imagePath: "/brand/banner_opengraph_1200x630.png",
    description:
      "Banner promocional para prévias automáticas de links compartilhados no WhatsApp, Facebook, Twitter e LinkedIn.",
  },
  {
    id: "brand_capa_perfil",
    name: "Capa de Perfil / Banner HQ",
    category: "Banner Social / YouTube",
    dimensions: "1920 x 1080 px",
    format: "PNG Full HD",
    imagePath: "/brand/capa_perfil_1920x1080.png",
    description:
      "Banner principal em resolução 1080p Full HD para fundos de canais, capas de grupos e apresentações institucionais.",
  },
  {
    id: "destaque_depoimentos",
    name: "Capa Destaque: ⭐ Depoimentos",
    category: "Instagram Destaque (9:16)",
    dimensions: "1080 x 1920 px",
    format: "PNG Vertical",
    imagePath: "/brand/destaques/destaque_depoimentos.png",
    description:
      "Capa oficial para o destaque 'Depoimentos' no Instagram (Prints de clientes satisfeitos e validações reais).",
  },
  {
    id: "destaque_catalogo",
    name: "Capa Destaque: 🍿 Catálogo",
    category: "Instagram Destaque (9:16)",
    dimensions: "1080 x 1920 px",
    format: "PNG Vertical",
    imagePath: "/brand/destaques/destaque_catalogo.png",
    description:
      "Capa oficial para o destaque 'Catálogo' no Instagram (Fotos dos lançamentos de filmes e séries 4K).",
  },
  {
    id: "destaque_futebol",
    name: "Capa Destaque: ⚽ Futebol",
    category: "Instagram Destaque (9:16)",
    dimensions: "1080 x 1920 px",
    format: "PNG Vertical",
    imagePath: "/brand/destaques/destaque_futebol.png",
    description:
      "Capa oficial para o destaque 'Futebol' no Instagram (Programação dos jogos e campeonatos da semana).",
  },
  {
    id: "destaque_duvidas",
    name: "Capa Destaque: ❓ Dúvidas",
    category: "Instagram Destaque (9:16)",
    dimensions: "1080 x 1920 px",
    format: "PNG Vertical",
    imagePath: "/brand/destaques/destaque_duvidas.png",
    description:
      "Capa oficial para o destaque 'Dúvidas' no Instagram (Perguntas frequentes e passo a passo de instalação).",
  },
  {
    id: "destaque_planos",
    name: "Capa Destaque: 💳 Planos",
    category: "Instagram Destaque (9:16)",
    dimensions: "1080 x 1920 px",
    format: "PNG Vertical",
    imagePath: "/brand/destaques/destaque_planos.png",
    description:
      "Capa oficial para o destaque 'Planos' no Instagram (Explicando a oferta de R$ 10/mês e facilidades do PIX).",
  },
  // --- DESTAQUES: VARIAÇÕES DE CONTEÚDO (9:16) ---
  {
    id: "depoimentos_var1",
    name: "Destaque: ⭐ Depoimento 01 (LG 4K)",
    category: "⭐ Depoimentos (9:16)",
    dimensions: "1080 x 1920 px",
    format: "PNG Vertical",
    imagePath: "/brand/destaques/depoimentos_var1.png",
    description:
      "Variação de Story para o destaque Depoimentos (Feedback real de cliente na TV LG em 4K).",
  },
  {
    id: "depoimentos_var2",
    name: "Destaque: ⭐ Depoimento 02 (Futebol sem Travar)",
    category: "⭐ Depoimentos (9:16)",
    dimensions: "1080 x 1920 px",
    format: "PNG Vertical",
    imagePath: "/brand/destaques/depoimentos_var2.png",
    description:
      "Variação de Story para o destaque Depoimentos (Cliente elogiando transmissão do jogo por R$ 10).",
  },
  {
    id: "depoimentos_var3",
    name: "Destaque: ⭐ Depoimento 03 (Celular & TV Box)",
    category: "⭐ Depoimentos (9:16)",
    dimensions: "1080 x 1920 px",
    format: "PNG Vertical",
    imagePath: "/brand/destaques/depoimentos_var3.png",
    description:
      "Variação de Story para o destaque Depoimentos (Recomendação em múltiplos aparelhos).",
  },
  {
    id: "catalogo_var1",
    name: "Destaque: 🍿 Catálogo 01 (+60 Mil Títulos)",
    category: "🍿 Catálogo (9:16)",
    dimensions: "1080 x 1920 px",
    format: "PNG Vertical",
    imagePath: "/brand/destaques/catalogo_var1.png",
    description:
      "Variação de Story para o destaque Catálogo (Lançamentos de cinema e volume de títulos).",
  },
  {
    id: "catalogo_var2",
    name: "Destaque: 🍿 Catálogo 02 (Plataformas Inclusas)",
    category: "🍿 Catálogo (9:16)",
    dimensions: "1080 x 1920 px",
    format: "PNG Vertical",
    imagePath: "/brand/destaques/catalogo_var2.png",
    description:
      "Variação de Story para o destaque Catálogo (Netflix, Prime, HBO Max e Disney+ inclusos).",
  },
  {
    id: "catalogo_var3",
    name: "Destaque: 🍿 Catálogo 03 (Infantil & Família)",
    category: "🍿 Catálogo (9:16)",
    dimensions: "1080 x 1920 px",
    format: "PNG Vertical",
    imagePath: "/brand/destaques/catalogo_var3.png",
    description:
      "Variação de Story para o destaque Catálogo (Desenhos, animes e opção do CristoFlix).",
  },
  {
    id: "futebol_var1",
    name: "Destaque: ⚽ Futebol 01 (Ligas Nacionais)",
    category: "⚽ Futebol (9:16)",
    dimensions: "1080 x 1920 px",
    format: "PNG Vertical",
    imagePath: "/brand/destaques/futebol_var1.png",
    description:
      "Variação de Story para o destaque Futebol (Brasileirão Série A & B e Copa do Brasil).",
  },
  {
    id: "futebol_var2",
    name: "Destaque: ⚽ Futebol 02 (UEFA Champions)",
    category: "⚽ Futebol (9:16)",
    dimensions: "1080 x 1920 px",
    format: "PNG Vertical",
    imagePath: "/brand/destaques/futebol_var2.png",
    description:
      "Variação de Story para o destaque Futebol (Champions League e Premier League em 60fps).",
  },
  {
    id: "futebol_var3",
    name: "Destaque: ⚽ Futebol 03 (UFC & Combate)",
    category: "⚽ Futebol (9:16)",
    dimensions: "1080 x 1920 px",
    format: "PNG Vertical",
    imagePath: "/brand/destaques/futebol_var3.png",
    description:
      "Variação de Story para o destaque Futebol (UFC, Fórmula 1 e NBA).",
  },
  {
    id: "duvidas_var1",
    name: "Destaque: ❓ Dúvidas 01 (Passo a Passo TV)",
    category: "❓ Dúvidas (9:16)",
    dimensions: "1080 x 1920 px",
    format: "PNG Vertical",
    imagePath: "/brand/destaques/duvidas_var1.png",
    description:
      "Variação de Story para o destaque Dúvidas (Guia de 3 passos simples para instalar na Smart TV).",
  },
  {
    id: "duvidas_var2",
    name: "Destaque: ❓ Dúvidas 02 (Aparelhos Aceitos)",
    category: "❓ Dúvidas (9:16)",
    dimensions: "1080 x 1920 px",
    format: "PNG Vertical",
    imagePath: "/brand/destaques/duvidas_var2.png",
    description:
      "Variação de Story para o destaque Dúvidas (Lista de aparelhos compatíveis).",
  },
  {
    id: "duvidas_var3",
    name: "Destaque: ❓ Dúvidas 03 (Envio Rápido PIX)",
    category: "❓ Dúvidas (9:16)",
    dimensions: "1080 x 1920 px",
    format: "PNG Vertical",
    imagePath: "/brand/destaques/duvidas_var3.png",
    description:
      "Variação de Story para o destaque Dúvidas (Como funciona o envio automático no WhatsApp).",
  },
  {
    id: "planos_var1",
    name: "Destaque: 💳 Planos 01 (Oferta R$ 10/Mês)",
    category: "💳 Planos (9:16)",
    dimensions: "1080 x 1920 px",
    format: "PNG Vertical",
    imagePath: "/brand/destaques/planos_var1.png",
    description:
      "Variação de Story para o destaque Planos (Oferta principal do plano R$ 10/mês).",
  },
  {
    id: "planos_var2",
    name: "Destaque: 💳 Planos 02 (Benefícios Inclusos)",
    category: "💳 Planos (9:16)",
    dimensions: "1080 x 1920 px",
    format: "PNG Vertical",
    imagePath: "/brand/destaques/planos_var2.png",
    description:
      "Variação de Story para o destaque Planos (Qualidade 4K, sinal anti-travamento e suporte).",
  },
  {
    id: "planos_var3",
    name: "Destaque: 💳 Planos 03 (Formas de Pagamento)",
    category: "💳 Planos (9:16)",
    dimensions: "1080 x 1920 px",
    format: "PNG Vertical",
    imagePath: "/brand/destaques/planos_var3.png",
    description:
      "Variação de Story para o destaque Planos (Facilidades do PIX e Cartão em 12x).",
  },
];


export const INSTAGRAM_CREATIVES: InstagramCreative[] = [
  {
    day: 1,
    id: "post_01",
    title: "Por que pagar R$ 350 se você pode pagar R$ 10?",
    category: "Custo Benefício",
    feedImage: "/instagram/feed/01.png",
    storyImage: "/instagram/stories/01.png",
    caption: `🔥 Você sabia que está rasgando dinheiro todo mês com streaming?

Netflix + Disney+ + HBO Max + Futebol ao vivo... No final do mês, a conta facilmente passa de R$ 300,00! 😱

No DezPila, você tem acesso a mais de 60.000 conteúdos, incluindo TODOS os canais abertos e fechados, filmes, séries e futebol em 4K por APENAS R$ 10,00/mês.

✅ Zero travamentos
✅ Funciona na Smart TV, Celular ou PC
✅ Instalação simples em menos de 2 minutos
✅ Sem contrato de fidelidade

👉 Clique no link da nossa Bio e ative seu teste agora mesmo!

#dezpila #iptvbrasil #streamingbrasil #futebolaovivo #filmeseseries #economia #streaming4k`,
  },
  {
    day: 2,
    id: "post_02",
    title: "A Tabela que as operadoras não querem que você veja",
    category: "Comparativo",
    feedImage: "/instagram/feed/02.png",
    storyImage: "/instagram/stories/02.png",
    caption: `📊 A TABELA DA VERDADE!

Compare e veja com seus próprios olhos: por que continuar pagando mensalidades absurdas para operadoras de TV a cabo tradicionais?

Com o DezPila por apenas R$ 10,00/mês você garante:
✔️ +60.000 títulos (Filmes, Séries e Novelas)
✔️ Qualidade de imagem 4K Ultra HD
✔️ Todos os jogos do seu time ao vivo
✔️ Suporte dedicado via WhatsApp

Chega de pagar caro. O futuro do entretenimento é DezPila!

👉 Acesse o link na Bio e assine em 2 minutos via PIX!

#dezpila #comparativo #tvacabo #economia #semfidelidade #streamingbarato`,
  },
  {
    day: 3,
    id: "post_03",
    title: "Cancelar a TV a cabo foi a melhor decisão do ano",
    category: "Depoimento / Prova Social",
    feedImage: "/instagram/feed/03.png",
    storyImage: "/instagram/stories/03.png",
    caption: `💬 "Cancelei minha TV a cabo e agora economizo mais de R$ 2.500 no ano!"

Quem experimenta o DezPila não volta atrás. Com uma interface simples e moderna, você instala direto na sua Smart TV em menos de 2 minutos e já sai assistindo a tudo!

Sem fios espalhados, sem visitas de técnicos e sem multas rescisórias.

🚀 Apenas R$ 10,00 por mês.

👉 Clique no link da Bio e venha para o DezPila!

#dezpila #depoimento #liberdade #economiadomestica #smarttv #iptv`,
  },
  {
    day: 4,
    id: "post_04",
    title: "Cinema em Casa por R$ 10 por mês",
    category: "Lifestyle / Entretenimento",
    feedImage: "/instagram/feed/04.png",
    storyImage: "/instagram/stories/04.png",
    caption: `🍿 PIPOCA PRONTA + SOFÁ + DEZPILA = A COMBINAÇÃO PERFEITA!

Transforme a sala da sua casa em um verdadeiro cinema 4K por menos de R$ 0,33 por dia.

São mais de 60.000 lançamentos de bilheteria, clássicos e séries atualizadas diariamente.

O que você vai marotandar hoje à noite?

👉 Link na Bio para assinar instantaneamente!

#cinemaemcasa #dezpila #pipocaeserie #maratona #filmes4k #streaming`,
  },
  {
    day: 5,
    id: "post_05",
    title: "Não perca nenhum lance do seu time por R$ 10/mês",
    category: "Esportes",
    feedImage: "/instagram/feed/05.png",
    storyImage: "/instagram/stories/05.png",
    caption: `⚽ DIA DE JOGO É SAGRADO!

Não fique dependendo de links piratas travando no meio do gol! Com o DezPila, você acompanha Brasileirão, Libertadores, Champions League e campeonatos estaduais com imagem 4K e sem delay!

🔥 Transmissão ultra estável direto na sua TV ou Celular.

Garanta sua tela agora mesmo por apenas R$ 10,00/mês.

👉 Clique no link da Bio e não perca mais nenhum lance!

#futebolaovivo #brasileirao #libertadores #dezpila #futebol4k #mengao #palmeiras #corinthians #saopaulofc`,
  },
  {
    day: 6,
    id: "post_06",
    title: "Mito vs. Fato: Por R$ 10 deve travar?",
    category: "Quebra de Objeções",
    feedImage: "/instagram/feed/06.png",
    storyImage: "/instagram/stories/06.png",
    caption: `❓ "Por R$ 10,00 por mês a imagem deve travar toda hora, né?"

❌ MITO! O DezPila utiliza infraestrutura com servidores dedicados de alta velocidade e tecnologia anti-bloqueio avançada.

✅ FATO: O sinal roda com 100% de estabilidade mesmo no horário de pico de jogos decisivos!

Faça o teste e comprove com seus próprios olhos.

👉 Clique na Bio e ative seu acesso em menos de 2 minutos!

#mitovsfato #estabilidade #servidordedicado #dezpila #tecnologia #streaming`,
  },
  {
    day: 7,
    id: "post_07",
    title: "Sua única dúvida é por que não assinou antes",
    category: "Conversão",
    feedImage: "/instagram/feed/07.png",
    storyImage: "/instagram/stories/07.png",
    caption: `🎯 A ÚNICA PERGUNTA QUE NOSSOS CLIENTES FAZEM É: "POR QUE NÃO CONHECI ISSO ANTES?"

Enquanto você lê este post, milhares de pessoas estão economizando dinheiro de verdade assistindo a todos os canais e streamings em 4K.

Aproveite o preço promocional fixado em apenas R$ 10,00/mês.

👉 Clique no link da Bio e venha fazer parte!

#dezpila #conversao #economize #oferta #iptv4k #streamings`,
  },
  {
    day: 8,
    id: "post_08",
    title: "+60.000 Conteúdos na Palma da sua Mão",
    category: "Catálogo",
    feedImage: "/instagram/feed/08.png",
    storyImage: "/instagram/stories/08.png",
    caption: `📚 UM UNIVERSO INFINITO DE ENTRETENIMENTO!

No DezPila você encontra:
🎬 +60.000 Filmes e Séries atualizados
⚽ Todos os canais de Esportes ao vivo
📰 Jornalismo, Documentários e Reality Shows
👶 Desenhos animados e conteúdos infantis 24h

Tudo reunido em um aplicativo leve e intuitivo.

👉 Clique na nossa Bio e garanta seu acesso por R$ 10!

#catalogocompleto #filmes #series #novelas #dezpila #entretenimento`,
  },
  {
    day: 9,
    id: "post_09",
    title: "O que nossos clientes dizem sobre o DezPila",
    category: "Prova Social",
    feedImage: "/instagram/feed/09.png",
    storyImage: "/instagram/stories/09.png",
    caption: `⭐ NOTA 5/5 DE NOSSOS ASSINANTES!

"Pegou direto na minha TV Samsung em menos de 2 minutos. Cancelei minha TV a cabo no mesmo dia! Sensacional!" — Cliente DezPila

A satisfação dos nossos usuários é o nosso maior orgulho.

👉 Venha você também para o melhor serviço de streaming do Brasil por apenas R$ 10,00/mês!

#provasocial #clientesatisfeito #dezpila #recomendacao #qualidade`,
  },
  {
    day: 10,
    id: "post_10",
    title: "Pronto para a Maratona do Final de Semana?",
    category: "Engajamento",
    feedImage: "/instagram/feed/10.png",
    storyImage: "/instagram/stories/10.png",
    caption: `🍿 SABADOU COM MARATONA LIBERADA!

O fim de semana chegou e nada melhor do que marotandar aquela série novinha ou assistir ao jogo do seu time com imagem perfeita em 4K.

Ative sua assinatura agora e aproveite o fim de semana ao máximo por apenas R$ 10!

👉 Acesse a Bio e ative seu PIX em segundos!

#maratona #fimdesemana #dezpila #series4k #pipoca`,
  },
  {
    day: 11,
    id: "post_11",
    title: "Diversão Garantida Para Toda a Família",
    category: "Família / Infantil",
    feedImage: "/instagram/feed/11.png",
    storyImage: "/instagram/stories/11.png",
    caption: `👨‍👩‍👧‍👦 ENTRETENIMENTO PARA TODAS AS IDADES!

Desenhos animados para a criançada, séries em alta para você e todos os canais de esportes e filmes.

Com controle parental e senha PIN para você gerenciar os conteúdos infantis com total tranquilidade!

👉 Assine por R$ 10,00/mês no link da nossa Bio!

#familiamaisunida #desenhosinfantis #dezpila #controleparental #smarttv`,
  },
  {
    day: 12,
    id: "post_12",
    title: "Qualidade 4K Ultra HD Crisp",
    category: "Tecnologia / Qualidade",
    feedImage: "/instagram/feed/12.png",
    storyImage: "/instagram/stories/12.png",
    caption: `✨ SINTA A DIFERENÇA DO 4K ULTRA HD!

No DezPila, não fazemos compressão de sinal de baixa qualidade. Você assiste a seus filmes e jogos com resolução cristalina, cores vivas e áudio imersivo!

Compatível com Smart TVs 4K Samsung, LG, TCL e dispositivos Android TV.

👉 Link na Bio para testar agora por apenas R$ 10!

#4kultrahd #imagemcristalina #dezpila #tecnologiadetela #qualidade`,
  },
  {
    day: 13,
    id: "post_13",
    title: "Apenas R$ 0,33 por Dia!",
    category: "Custo Benefício / Economia",
    feedImage: "/instagram/feed/13.png",
    storyImage: "/instagram/stories/13.png",
    caption: `🪙 CUSTA MENOS QUE UM CAFÉZINHO POR DIA!

Fazendo a conta rápida: R$ 10,00 por mês equivale a apenas R$ 0,33 por dia!

Por trinta centavos ao dia, você tem acesso ilimitado a todos os canais fechados, filmes de bilheteria e futebol 4K sem sair de casa.

👉 Clique no link da Bio e aproveite este valor promocional!

#economiadiaria #dezpila #precoinacreditavel #streamingbarato #oferta`,
  },
  {
    day: 14,
    id: "post_14",
    title: "Hoje tem jogão! Você já garantiu sua tela?",
    category: "Esportes / Matchday",
    feedImage: "/instagram/feed/14.png",
    storyImage: "/instagram/stories/14.png",
    caption: `🏆 HOJE É DIA DE CLÁSSICO E DECISÃO!

Já garantiu o seu lugar no melhor camarote da sua sala?
No DezPila, você acompanha a transmissão ao vivo em 4K, sem quedas e sem delay!

⚡ Ativação automática via PIX em menos de 2 minutos!

👉 Clique no link da Bio antes do apito inicial!

#hojetemjogo #brasileirao #dezpila #futebolaovivo #campeonato`,
  },
  {
    day: 15,
    id: "post_15",
    title: "Funciona em Qualquer Tela Que Você Tiver",
    category: "Compatibilidade",
    feedImage: "/instagram/feed/15.png",
    storyImage: "/instagram/stories/15.png",
    caption: `📱📺💻 ONDE VOCÊ ESTIVER, O DEZPILA VAI COM VOCÊ!

Nossa plataforma é 100% compatível com:
• Smart TVs (Samsung, LG, TCL, Android TV)
• Smartphones (Android e iPhone/iOS)
• Computadores e Notebooks
• TV Box, Fire TV Stick e Chromecast

Baixou, conectou, assistiu!

👉 Clique no link da Bio e escolha seu plano!

#compatibilidade #smarttv #firestick #dezpila #multiplastelas`,
  },
  {
    day: 16,
    id: "post_16",
    title: "Como Ativar Seu DezPila em 3 Passos Fáceis",
    category: "Tutorial / Passo a Passo",
    feedImage: "/instagram/feed/16.png",
    storyImage: "/instagram/stories/16.png",
    caption: `⚡ ATIVAÇÃO SIMPLES EM MENOS DE 2 MINUTOS:

1️⃣ Acesse o link oficial na nossa Bio
2️⃣ Escolha seu plano ideal (Apenas R$ 10,00/mês)
3️⃣ Pague no PIX e receba seus dados de acesso na hora!

Sem burocracia, sem técnicos e sem contratos extensos.

👉 Clique na Bio e comece agora mesmo!

#passoapasso #facilidade #dezpila #pixinstantaneo #ativacao`,
  },
  {
    day: 17,
    id: "post_17",
    title: "Pagamento no PIX: Liberação em Segundos",
    category: "Segurança / Checkout",
    feedImage: "/instagram/feed/17.png",
    storyImage: "/instagram/stories/17.png",
    caption: `🔒 CHECKOUT NATIVO & 100% SEGURO DIRETO NO SITE!

Pague com total praticidade pelo PIX através de QR Code ou Copia-e-Cola. Nosso sistema identifica a confirmação bancária instantaneamente e gera seu acesso no mesmo segundo!

Zero espera, zero complicação.

👉 Link na Bio para gerar seu PIX agora por R$ 10!

#pix #checkoutseguro #dezpila #liberacaorapida #tecnologia`,
  },
  {
    day: 18,
    id: "post_18",
    title: "Sem Contrato de Fidelidade: Cancele Quando Quiser",
    category: "Liberdade",
    feedImage: "/instagram/feed/18.png",
    storyImage: "/instagram/stories/18.png",
    caption: `🚫 DICA: NUNCA MAIS SE PRENDA A CONTRATOS ABUSIVOS DE 12 MESES!

No DezPila, acreditamos que você deve permanecer porque AMA nosso serviço, não porque é obrigado por uma multa rescisória!

Assine mês a mês com total controle sobre o seu orçamento.

👉 Experimente no link da Bio por apenas R$ 10,00!

#semfidelidade #liberdadedeescolha #dezpila #respeitoaoconsumidor`,
  },
  {
    day: 19,
    id: "post_19",
    title: "Precisa de Ajuda? Suporte Via WhatsApp",
    category: "Suporte ao Cliente",
    feedImage: "/instagram/feed/19.png",
    storyImage: "/instagram/stories/19.png",
    caption: `💬 VOCÊ NUNCA FICA NA MÃO!

Teve alguma dúvida durante a instalação na sua Smart TV ou aplicativo? Nossa equipe de suporte especializado está de prontidão no WhatsApp para te ajudar passo a passo!

Atendimento humano, rápido e atencioso.

👉 Link na Bio para falar conosco ou assinar seu plano!

#suporte #whatsapp #atendimentohumano #dezpila #posvendas`,
  },
  {
    day: 20,
    id: "post_20",
    title: "Guia de Programação EPG: Nunca Perca Um Horário",
    category: "Recursos do App",
    feedImage: "/instagram/feed/20.png",
    storyImage: "/instagram/stories/20.png",
    caption: `🕒 GRADE DE PROGRAMAÇÃO COMPLETA (EPG) NA SUA TELA!

Saiba exatamente a hora do jogo do seu time, os horários dos filmes e a sinopse das séries com a nossa interface inteligente estilo TV a cabo premium!

Navegue facilmente com o próprio controle remoto da sua Smart TV.

👉 Clique na Bio e garanta seu acesso por R$ 10!

#epg #guiadeprogramacao #dezpila #smarttv #interfacemoderna`,
  },
  {
    day: 21,
    id: "post_21",
    title: "As 3 Perguntas Que Todo Mundo Faz",
    category: "FAQ / Dúvidas Frequentes",
    feedImage: "/instagram/feed/21.png",
    storyImage: "/instagram/stories/21.png",
    caption: `❓ AS 3 DÚVIDAS MAIS COMUNS SOBRE O DEZPILA:

1️⃣ Precisa de internet super rápida? Não! Com apenas 10 Mega você já assiste em HD/4K liso!
2️⃣ Posso assistir no celular fora de casa? Sim! O acesso funciona em 3G/4G/5G/Wi-Fi!
3️⃣ Quanto custa? Apenas R$ 10,00 por mês sem taxas surpresas!

👉 Tirou suas dúvidas? Acesse o link da Bio e venha ser cliente!

#duvidas #faq #resposta #dezpila #tudoexplicado`,
  },
  {
    day: 22,
    id: "post_22",
    title: "Plano Pro Semestral: 3 Telas por R$ 29,90",
    category: "Ofertas / Planos",
    feedImage: "/instagram/feed/22.png",
    storyImage: "/instagram/stories/22.png",
    caption: `🔥 CONHEÇA O CAMPEÃO DE VENDAS DO SITE: PLANO PRO SEMESTRAL!

Por apenas R$ 29,90 no semestre (menos de R$ 5,00 por mês!), você garante:
• 6 meses inteiros de acesso ininterrupto
• 3 Conexões simultâneas (TV da Sala, Quarto e Celular)
• +60.000 conteúdos em 4K liberados

👉 Aproveite essa oferta limitada no link da Bio!

#planopro #semestral #oferta #dezpila #maiseconomia`,
  },
  {
    day: 23,
    id: "post_23",
    title: "Plano VIP Anual: 4 Telas por R$ 47,90",
    category: "Oferta Premium",
    feedImage: "/instagram/feed/23.png",
    storyImage: "/instagram/stories/23.png",
    caption: `👑 PLANO VIP ANUAL COM 71% DE DESCONTO REAL!

O combo definitivo para toda a família:
• 12 Meses completos de acesso VIP sem preocupações
• 4 Conexões simultâneas ativas
• Economia de mais de R$ 3.000 no ano comparado a assinaturas individuais!

Apenas R$ 47,90 pelo ano inteiro!

👉 Garanta o Plano VIP agora no link da Bio!

#planovip #anual #desconto71 #dezpila #comboanual`,
  },
  {
    day: 24,
    id: "post_24",
    title: "Telas Extras Adicionais: Sem Briga Pelo Controle",
    category: "Combo Família",
    feedImage: "/instagram/feed/24.png",
    storyImage: "/instagram/stories/24.png",
    caption: `📺 ACABE COM A BRIGA PELO CONTROLE REMOTO NA SUA CASA!

No DezPila, você pode adicionar telas extras adicionais por apenas R$ 5,90 cada!
Assim, enquanto a esposa maratona a série novinha, as crianças assistem aos desenhos e você curte o futebol ao vivo em 4K.

Todo mundo feliz!

👉 Monte seu combo no checkout pelo link da Bio!

#telasextras #combofamilia #dezpila #sembriga #conforto`,
  },
  {
    day: 25,
    id: "post_25",
    title: "Pacote Adulto Opcional: Proteção com Senha PIN",
    category: "Recursos Opcionais",
    feedImage: "/instagram/feed/25.png",
    storyImage: "/instagram/stories/25.png",
    caption: `🔒 TOTAL PRIVACIDADE E DISCREÇÃO!

Oferecemos opcionalmente a ativação do pacote de conteúdo adulto premium com vazados do Privacy/OnlyFans, sempre protegido por senha PIN e controle parental estrito.

Ativação opcional com total sigilo na hora do checkout.

👉 Link na Bio para conhecer e assinar!

#privacidade #sigilo #controleparental #dezpila #opcional`,
  },
  {
    day: 26,
    id: "post_26",
    title: "Últimas Vagas Com Preço Fixado em R$ 10",
    category: "Escassez / Urgência",
    feedImage: "/instagram/feed/26.png",
    storyImage: "/instagram/stories/26.png",
    caption: `⚠️ ALERTA: LOTE PROMOCIONAL PRESTES A ENCERRAR!

Para manter a qualidade 100% liso e sem travamentos, limitamos a quantidade de novos acessos por servidor.

Garanta sua vaga e trave seu valor promocional de R$ 10,00/mês antes da virada do lote!

👉 Clique na Bio e garanta sua vaga imediatamente!

#ultimasvagas #urgencia #dezpila #promocao #garantija`,
  },
  {
    day: 27,
    id: "post_27",
    title: "1 Pizza VS 1 Mês de DezPila: O Que Vale Mais?",
    category: "Comparação de Valor",
    feedImage: "/instagram/feed/27.png",
    storyImage: "/instagram/stories/27.png",
    caption: `🍕 1 Pizza Grande = R$ 60,00 (Dura 30 minutos na mesa)
📺 1 Mês de DezPila = R$ 10,00 (Dura 30 dias inteiros de diversão em 4K)

A matemática não mente! Por uma fração do valor de um lanche, você garante um mês inteiro de filmes, séries e futebol para sua família.

👉 Escolha inteligente: Link na Bio!

#comparacao #matematica #dezpila #decisaocerta #economia`,
  },
  {
    day: 28,
    id: "post_28",
    title: "Pagou, Gerou, Assistiu: Simples e Direto",
    category: "Velocidade / Praticidade",
    feedImage: "/instagram/feed/28.png",
    storyImage: "/instagram/stories/28.png",
    caption: `⚡ SEM FORMULÁRIOS EXTENSOS E SEM COMPLICAÇÃO!

1️⃣ Entrou no site oficial DezPila
2️⃣ Escaneou o QR Code PIX ou gerou o cartão
3️⃣ Seu acesso aparece instantaneamente na tela!

Prático, seguro e instantâneo.

👉 Clique na Bio e comece a assistir em menos de 2 minutos!

#pagougerouassistiu #praticidade #dezpila #rapidez #streaming`,
  },
  {
    day: 29,
    id: "post_29",
    title: "Seu Fim de Semana Merece O Melhor Do Streaming",
    category: "Engajamento Weekend",
    feedImage: "/instagram/feed/29.png",
    storyImage: "/instagram/stories/29.png",
    caption: `🍿 O FIM DE SEMANA CHEGOU COM TUDO!

Seu sábado e domingo merecem transmissões em 4K sem quedas, com os filmes de bilheteria mais recentes e as rodadas decisivas do futebol.

Não fique sem sinal no momento principal do jogo!

👉 Ative sua assinatura agora no link da Bio por R$ 10!

#fimdesemana #sabadou #dezpila #futebol4k #maratona4k`,
  },
  {
    day: 30,
    id: "post_30",
    title: "Chega De Pagar Caro. O Futuro da TV É DezPila.",
    category: "Manifesto / Fechamento",
    feedImage: "/instagram/feed/30.png",
    storyImage: "/instagram/stories/30.png",
    caption: `🔥 O MANIFESTO DO STREAMING INTELIGENTE NO BRASIL!

Chega de ser refém de mensalidades abusivas de TV a cabo e pacotes picados de streaming que juntos custam uma fortuna.

O DezPila é a revolução do entretenimento acessível: +60.000 conteúdos, futebol em 4K e sinal ultraestável por apenas R$ 10,00 por mês!

Junte-se a milhares de brasileiros satisfeitos.

👉 CLIQUE NO LINK DA BIO E ASSINE AGORA MESMO!

#manifesto #futurodatv #dezpila #revolucaodostreaming #sejaDezPila`,
  },
];

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
  caption?: string;
}

// 8 ARTES PROMOCIONAIS PREMIUM (GERADAS EM ALTA RESOLUÇÃO 3:4) COM LEGENDA E CTA "COMENTE TV"
export const PROMOTIONAL_ARTWORKS: BrandAsset[] = [
  {
    id: "arte_cinema_em_familia",
    name: "Arte 01: 🎬 Cinema em Família (R$ 10/Mês)",
    category: "🔥 Artes Promocionais (3:4)",
    dimensions: "1080 x 1440 px (3:4)",
    format: "JPG Alta Resolução",
    imagePath: "/instagram/artes/01_cinema_em_familia.jpg",
    description:
      "Arte ultra-realista de sala de cinema aconchegante com família reunida, pipoca, Smart TV gigante 4K com luzes LED vermelhas e selo R$ 10,00/mês.",
    caption: `🍿 Cinema na sua sala de estar sem gastar uma fortuna no final do mês!

Com o DezPila, você transforma sua Smart TV em uma verdadeira sala de cinema com mais de 60.000 filmes, séries e todos os lançamentos em 4K Ultra HD.

✅ +60.000 títulos e canais ao vivo
✅ Qualidade 4K sem travar
✅ Sem contrato de fidelidade e sem taxas extras
✅ Por apenas R$ 10,00/mês

💬 Comente "TV" aqui nos comentários que enviamos o link com seu teste liberado no Direct agora mesmo! 🚀

#dezpila #cinemaemcasa #streamingbrasil #filmeseseries #smarttv #economia #iptv4k`,
  },
  {
    id: "arte_futebol_ao_vivo",
    name: "Arte 02: ⚽ Futebol Ao Vivo 4K (Seu Time Sem Travar)",
    category: "🔥 Artes Promocionais (3:4)",
    dimensions: "1080 x 1440 px (3:4)",
    format: "JPG Alta Resolução",
    imagePath: "/instagram/artes/02_futebol_ao_vivo.jpg",
    description:
      "Arte dinâmica de jogador chutando bola em chamas com estádio e TV 4K transmitindo futebol ao vivo com badge 'Futebol Ao Vivo 4K - R$ 10/mês'.",
    caption: `⚽ Cansado de travamentos bem na hora do gol decisivo?

Assista a todos os jogos do seu time ao vivo em 60fps e 4K real: Brasileirão (todas as divisões), Libertadores, Champions League, Copa do Brasil e canais esportivos premium (Premiere, ESPN, SporTV, DAZN).

✅ Transmissão em 60fps sem delay
✅ Sinal anti-queda de alta performance
✅ Funciona no celular, TV ou computador
✅ Por apenas R$ 10,00/mês

💬 Comente "TV" nos comentários para receber o acesso ao jogo no seu Direct! 🔥

#futebolaovivo #brasileirao #libertadores #premiere #dezpila #championsleague #futebol4k`,
  },
  {
    id: "arte_catalogo_60k",
    name: "Arte 03: 🍿 +60.000 Conteúdos na Palma da Mão",
    category: "🔥 Artes Promocionais (3:4)",
    dimensions: "1080 x 1440 px (3:4)",
    format: "JPG Alta Resolução",
    imagePath: "/instagram/artes/03_catalogo_60k_titulos.jpg",
    description:
      "Arte 3D impressionante com mural curvo de pôsteres, aplicativo DezPila no celular e TV 4K com selo dourado de +60.000 títulos.",
    caption: `📱 O catálogo mais completo do Brasil por menos de R$ 0,33 por dia!

Reunimos todos os seus streamings favoritos e canais fechados em um único aplicativo leve e intuitivo. Filmes de cinema, séries completas, desenhos e esportes ao vivo.

✅ Todos os canais abertos e fechados
✅ Lançamentos de cinema atualizados diariamente
✅ Compatível com Smart TV, TV Box, Fire Stick e Celular
✅ Apenas R$ 10,00 mensais

💬 Comente "TV" aqui embaixo e receba o acesso imediato no seu Direct! 🍿

#streaming #filmes4k #series #dezpila #tvporassinatura #smarttv #iptvbrasil`,
  },
  {
    id: "arte_depoimento_cliente",
    name: "Arte 04: ⭐ O Que Nossos Clientes Dizem",
    category: "🔥 Artes Promocionais (3:4)",
    dimensions: "1080 x 1440 px (3:4)",
    format: "JPG Alta Resolução",
    imagePath: "/instagram/artes/04_depoimento_cliente.jpg",
    description:
      "Prova social com balão de fala neon vermelho glassmorphism, avaliação 5 estrelas e depoimento real de cancelamento de TV a cabo cara.",
    caption: `⭐ "Pegou direto na minha Smart TV em menos de 2 minutos. Cancelei minha TV a cabo de R$ 280 no mesmo dia!" — Veja o relato de quem já economiza com a gente.

Chega de pagar faturas abusivas todo mês para ter o que assistir. O DezPila entrega sinal 100% estável e catálogo completo por R$ 10,00 fixos.

✅ Ativação expressa no PIX
✅ Suporte dedicado no WhatsApp
✅ Avaliação média 5.0 estrelas

💬 Quer testar na sua TV? Comente "TV" nos comentários que te envio o link no Direct! 🚀

#depoimento #avaliacaocliente #smarttv #dezpila #economiadomestica #tvbox #streamings`,
  },
  {
    id: "arte_maratona_fimsemana",
    name: "Arte 05: 🛋️ Maratona Liberada (Final de Semana)",
    category: "🔥 Artes Promocionais (3:4)",
    dimensions: "1080 x 1440 px (3:4)",
    format: "JPG Alta Resolução",
    imagePath: "/instagram/artes/05_maratona_final_de_semana.jpg",
    description:
      "Ambiente noturno acolhedor com sofá aveludado, pipoca, TV com iluminação traseira vermelha e letreiro neon 'Maratona Liberada - R$ 10/mês'.",
    caption: `🛋️ Sofá confortável, balde de pipoca e milhares de filmes e séries liberados!

Seu final de semana merece entretenimento de verdade em 4K. Assista aos maiores lançamentos sem mensalidades caras de múltiplos aplicativos.

✅ Séries completas em alta definição
✅ Interface rápida e organizada por gêneros
✅ Assista no conforto da sua sala

💬 Comente "TV" para liberar seu acesso para maratonar agora mesmo no Direct! 🎬

#maratona #filmes #seriesnetflix #dezpila #pipocaefilme #sextou #finaldesemana`,
  },
  {
    id: "arte_comparativo_pizza",
    name: "Arte 06: 🍕 1 Pizza vs 1 Mês de DezPila",
    category: "🔥 Artes Promocionais (3:4)",
    dimensions: "1080 x 1440 px (3:4)",
    format: "JPG Alta Resolução",
    imagePath: "/instagram/artes/06_comparativo_pizza_dezpila.jpg",
    description:
      "Comparativo de alto impacto mostrando 1 pizza de R$ 80 (dura 30 min) vs 1 mês completo de DezPila por R$ 10 (dura 30 dias).",
    caption: `🍕 1 Pizza no delivery = R$ 80,00 (dura 30 minutos)
📺 1 Mês de DezPila = R$ 10,00 (dura 30 dias inteiros com +60.000 conteúdos)

A matemática é simples: pelo preço de uma fatia de pizza, você tem acesso ao melhor do entretenimento 4K durante todo o mês para a família inteira.

✅ Mais de 60.000 opções de canais, filmes e esportes
✅ Sem fidelidade e cancelamento livre
✅ Economia de mais de R$ 2.000 por ano

💬 Comente "TV" para receber seu link de ativação no Direct! 💸

#comparativo #economiafinanceira #dezpila #pizzatime #financas #streamingbarato #iptv`,
  },
  {
    id: "arte_multi_dispositivos",
    name: "Arte 07: 📱 Uma Assinatura, Todas as Telas",
    category: "🔥 Artes Promocionais (3:4)",
    dimensions: "1080 x 1440 px (3:4)",
    format: "JPG Alta Resolução",
    imagePath: "/instagram/artes/07_uma_assinatura_todas_telas.jpg",
    description:
      "Ecossistema completo com Smart TV 4K, iPad Pro, iPhone e MacBook sincronizados com filmes e esportes em alta definição.",
    caption: `📱💻📺 Na sala, no quarto ou no trajeto para o trabalho.

Com o DezPila, você pode assistir na Smart TV (Samsung, LG, TCL, Android), no Celular (Android e iPhone), no Computador, Tablet, TV Box ou Fire Stick.

✅ Instalação fácil em qualquer aparelho
✅ Sem necessidade de aparelhos caros
✅ Leve seu entretenimento para onde você for

💬 Comente "TV" e descubra como instalar em menos de 2 minutos pelo Direct! ⚡

#multitelas #smarttvsamsung #smarttvlg #firestick #tvbox #dezpila #androidtv`,
  },
  {
    id: "arte_pix_ativacao",
    name: "Arte 08: ⚡ Ativação Automática no PIX em 2 Minutos",
    category: "🔥 Artes Promocionais (3:4)",
    dimensions: "1080 x 1440 px (3:4)",
    format: "JPG Alta Resolução",
    imagePath: "/instagram/artes/08_ativacao_pix_2minutos.jpg",
    description:
      "Visual fintech futurista com celular aprovando pagamento PIX instantâneo e liberando os canais e filmes 4K na Smart TV.",
    caption: `⚡ Sem esperar atendente, sem formulários chatos e sem burocracia.

Nosso sistema de liberação é 100% automatizado: você escolhe o plano, gera o PIX nativo seguro e recebe os dados de acesso instantaneamente no seu WhatsApp e na tela.

✅ Liberação automática em segundos
✅ Pagamento seguro com QR Code e Copia e Cola
✅ Acesso imediato ao catálogo completo

💬 Comente "TV" nos comentários para receber o link do teste direto no seu Direct! 🚀

#pix #ativacaorapida #dezpila #pagamentorapido #streamingfacil #tecnologia`,
  },
];

export const BRAND_ASSETS: BrandAsset[] = [
  ...PROMOTIONAL_ARTWORKS,
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
      "Banner de cabeçalho para perfis sociais (YouTube, Facebook, Twitter) com estética dark premium e slogan oficial.",
  },
  {
    id: "brand_moldura_reels_cta",
    name: "Moldura Reels / Story Transparente (Com CTA Comente TV)",
    category: "Moldura Vídeo PNG Alpha",
    dimensions: "1080 x 1920 px (9:16)",
    format: "PNG Transparente",
    imagePath: "/brand/moldura_reels_transparente.png",
    description:
      "Moldura em alta resolução HD/4K com logomarca superior e centro 100% transparente para sobrepor qualquer vídeo no CapCut, InShot, Premiere ou Canva + CTA 'Comente TV' no rodapé.",
  },
  {
    id: "brand_moldura_reels_clean",
    name: "Moldura Reels / Story Transparente Clean (Oferta R$ 10)",
    category: "Moldura Vídeo PNG Alpha",
    dimensions: "1080 x 1920 px (9:16)",
    format: "PNG Transparente",
    imagePath: "/brand/moldura_reels_clean.png",
    description:
      "Moldura minimalista clean com topo da marca e rodapé 'Assine por R$ 10,00/mês'. Centro transparente ideal para Reels de futebol, filmes e demonstrações de TV.",
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
      "Variação de Story para o destaque Depoimentos (Cliente utilizando em múltiplos aparelhos).",
  },
  {
    id: "catalogo_var1",
    name: "Destaque: 🍿 Catálogo 01 (Filmes de Cinema)",
    category: "🍿 Catálogo (9:16)",
    dimensions: "1080 x 1920 px",
    format: "PNG Vertical",
    imagePath: "/brand/destaques/catalogo_var1.png",
    description:
      "Variação de Story para o destaque Catálogo (Filmes recém-lançados do cinema em 4K).",
  },
  {
    id: "catalogo_var2",
    name: "Destaque: 🍿 Catálogo 02 (Séries Populares)",
    category: "🍿 Catálogo (9:16)",
    dimensions: "1080 x 1920 px",
    format: "PNG Vertical",
    imagePath: "/brand/destaques/catalogo_var2.png",
    description:
      "Variação de Story para o destaque Catálogo (Séries completas de todos os streamings).",
  },
  {
    id: "catalogo_var3",
    name: "Destaque: 🍿 Catálogo 03 (Desenhos & Animes)",
    category: "🍿 Catálogo (9:16)",
    dimensions: "1080 x 1920 px",
    format: "PNG Vertical",
    imagePath: "/brand/destaques/catalogo_var3.png",
    description:
      "Variação de Story para o destaque Catálogo (Conteúdos infantis e animes dublados).",
  },
  {
    id: "futebol_var1",
    name: "Destaque: ⚽ Futebol 01 (Brasileirão)",
    category: "⚽ Futebol (9:16)",
    dimensions: "1080 x 1920 px",
    format: "PNG Vertical",
    imagePath: "/brand/destaques/futebol_var1.png",
    description:
      "Variação de Story para o destaque Futebol (Série A e B do Brasileirão em 4K).",
  },
  {
    id: "futebol_var2",
    name: "Destaque: ⚽ Futebol 02 (Internacionais)",
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

// 30 PUBLICAÇÕES COMPLETAS (INSTAGRAM POSTS 01 A 30) COM CTA "COMENTE TV"
export const INSTAGRAM_CREATIVES: InstagramCreative[] = [
  {
    day: 1,
    id: "post_01",
    title: "Por que pagar R$ 350 se você pode pagar R$ 10?",
    category: "💰 Economia & Custo",
    feedImage: "/instagram_posts/01.png",
    storyImage: "/instagram/stories/01.png",
    caption: `🔥 Você sabia que está rasgando dinheiro todo mês com contas caras de TV e streamings?

Netflix + Disney+ + HBO Max + Futebol ao vivo... No final do mês, a conta passa fácil de R$ 300,00! 😱

No DezPila, você tem acesso a mais de 60.000 conteúdos, incluindo TODOS os canais abertos e fechados, filmes, séries e futebol em 4K por APENAS R$ 10,00/mês.

✅ Zero travamentos com servidor de alta velocidade
✅ Funciona na Smart TV, Celular ou Computador
✅ Instalação simples em menos de 2 minutos
✅ Sem contrato de fidelidade

💬 Comente "TV" nos comentários para receber seu link de teste gratuito no Direct agora mesmo! 🚀

#dezpila #iptvbrasil #streamingbrasil #futebolaovivo #filmeseseries #economia #streaming4k`,
  },
  {
    day: 2,
    id: "post_02",
    title: "A Tabela que as Operadoras Não Querem Que Você Veja",
    category: "📊 Comparativo",
    feedImage: "/instagram_posts/02.png",
    storyImage: "/instagram/stories/02.png",
    caption: `📊 Compare e tire suas próprias conclusões!

❌ TV a Cabo Tradicional:
• R$ 250 a R$ 350 por mês
• Contrato de 12 meses com multa
• Grade de canais limitada
• Aparelhos alugados e fios pela casa

✅ DezPila:
• Apenas R$ 10,00 por mês
• Mais de 60.000 filmes, séries e canais
• Sem fidelidade: cancele quando quiser
• Imagem 4K Ultra HD nativa

💬 Comente "TV" aqui embaixo e receba o acesso no seu Direct em menos de 1 minuto! 📲

#comparativo #economia #dezpila #fimdatvacabo #smarttv #streaming4k #tvdigital`,
  },
  {
    day: 3,
    id: "post_03",
    title: "Cancelar a TV a Cabo Foi a Melhor Decisão do Ano",
    category: "⭐ Prova Social",
    feedImage: "/instagram_posts/03.png",
    storyImage: "/instagram/stories/03.png",
    caption: `⭐ "Eu gastava R$ 290 todo mês. Conheci o DezPila por indicação e instalei na minha Smart TV em 2 minutos. Economizo mais de R$ 3.000 por ano!" — Marcos S., São Paulo.

Milhares de famílias já abandonaram as contas absurdas para aproveitar o melhor do entretenimento por R$ 10,00 mensais.

✅ Servidor ultra veloz 60fps
✅ Grade de programação completa (EPG)
✅ Suporte via WhatsApp de prontidão

💬 Quer economizar também? Comente "TV" nos comentários para receber o link no Direct! 🚀

#depoimento #clientesatisfeito #dezpila #economiadomestica #smarttvsamsung #smarttvlg`,
  },
  {
    day: 4,
    id: "post_04",
    title: "Cinema em Casa por R$ 10 por Mês",
    category: "🍿 Cinema & Filmes",
    feedImage: "/instagram_posts/04.png",
    storyImage: "/instagram/stories/04.png",
    caption: `🍿 Pipoca quentinha, sofá confortável e os maiores lançamentos do cinema na sua Smart TV!

No DezPila, os filmes que acabaram de sair do cinema já estão disponíveis em 4K com áudio dublado e legendado.

🎬 Mais de 60.000 filmes e séries
📺 Todos os lançamentos atualizados toda semana
🍿 Diversão garantida para a família inteira

💬 Comente "TV" nos comentários e receba seu teste liberado no Direct agora mesmo! 🎬

#cinemaemcasa #lancamentos4k #dezpila #filmeseseries #smarttv #maratona`,
  },
  {
    day: 5,
    id: "post_05",
    title: "Não Perca Nenhum Lance do Seu Time por R$ 10/mês",
    category: "⚽ Esportes & Futebol",
    feedImage: "/instagram_posts/05.png",
    storyImage: "/instagram/stories/05.png",
    caption: `⚽ Dia de clássico não combina com travamento ou tela preta na hora do gol!

Com o DezPila, você assiste a todos os jogos do seu time ao vivo em 60fps:
🏆 Brasileirão Série A e B
🏆 Copa do Brasil & Libertadores
🏆 Champions League & Premier League
🥊 UFC, F1 e NBA

💬 Comente "TV" nos comentários para receber o link do jogo liberado no seu Direct! 🔥

#futebolaovivo #brasileirao #libertadores #premiere #dezpila #championsleague #futebolsemtravar`,
  },
  {
    day: 6,
    id: "post_06",
    title: "Mito vs. Fato: Por R$ 10 Deve Travar Toda Hora?",
    category: "❓ Quebra de Objeções",
    feedImage: "/instagram_posts/06.png",
    storyImage: "/instagram/stories/06.png",
    caption: `🤔 "Por apenas R$ 10,00 deve travar toda hora, né?"

👉 MITO! O DezPila utiliza infraestrutura dedicada com tecnologia anti-bloqueio (CDN redundante). Nosso sinal roda liso até em conexões de 10 Mega!

✅ 100% de estabilidade comprovada
✅ Sem necessidade de antenas ou aparelhos caros
✅ Teste liberado antes de pagar

💬 Quer ver na prática? Comente "TV" e receba seu teste no Direct em segundos! ⚡

#mitosverdes #iptvdequalidade #dezpila #tecnologia #smarttv #estabilidade`,
  },
  {
    day: 7,
    id: "post_07",
    title: "Sua Única Dúvida É Por Que Não Assinou Antes",
    category: "🎯 Conversão",
    feedImage: "/instagram_posts/07.png",
    storyImage: "/instagram/stories/07.png",
    caption: `🎯 Você tem duas opções hoje:

1️⃣ Continuar pagando faturas caras todo mês para ter poucos canais...
2️⃣ Assinar o DezPila por R$ 10,00 e ter mais de 60.000 conteúdos liberados na sua casa.

A escolha é sua! Liberação automática no PIX em menos de 2 minutos.

💬 Comente "TV" aqui embaixo e receba o link de acesso no seu Direct! 📲

#dezpila #escolhainteligente #economiadomestica #smarttv #tvbox #streamings`,
  },
  {
    day: 8,
    id: "post_08",
    title: "+60.000 Conteúdos na Palma da Sua Mão",
    category: "📱 Catálogo Completo",
    feedImage: "/instagram_posts/08.png",
    storyImage: "/instagram/stories/08.png",
    caption: `📱 Todos os seus canais, filmes e séries reunidos em um único app moderno e super rápido.

✅ Canais Abertos e Fechados em 4K
✅ Filmes e Séries atualizados diariamente
✅ Desenhos e animes para as crianças
✅ Novelas completas e documentários

Tudo isso por apenas R$ 10,00 por mês!

💬 Comente "TV" nos comentários para receber o catálogo completo no Direct! 🚀

#catalogo #filmeseseries #smarttv #dezpila #tvdigital #streaming4k`,
  },
  {
    day: 9,
    id: "post_09",
    title: "O Que Nossos Clientes Dizem Sobre o DezPila",
    category: "⭐ Avaliações Reais",
    feedImage: "/instagram_posts/09.png",
    storyImage: "/instagram/stories/09.png",
    caption: `⭐ Mais de 10.000 clientes satisfeitos em todo o Brasil!

"Melhor custo-benefício que já encontrei. Imagem perfeita e não trava nem em dia de clássico de futebol."

Venha você também fazer parte da comunidade que mais cresce no Brasil.

💬 Comente "TV" nos comentários para receber o link no Direct! 💬

#depoimentos #clientesatisfeito #dezpila #avaliacoes #smarttv #economia`,
  },
  {
    day: 10,
    id: "post_10",
    title: "Pronto para a Maratona do Final de Semana?",
    category: "🛋️ Fim de Semana",
    feedImage: "/instagram_posts/10.png",
    storyImage: "/instagram/stories/10.png",
    caption: `🛋️ Sextou com maratona garantida!

Não sabe o que assistir hoje à noite? No DezPila você encontra milhares de opções separadas por categorias, com busca rápida e sem propagandas chatas.

🍿 Escolha seu filme favorito e aproveite!

💬 Comente "TV" para liberar seu acesso para o final de semana no Direct! 🍿

#sextou #maratona #filmeseseries #dezpila #cinemaemcasa #netflixbrasil`,
  },
  {
    day: 11,
    id: "post_11",
    title: "Diversão Garantida Para Toda a Família",
    category: "👨‍👩‍👧‍👦 Família & Crianças",
    feedImage: "/instagram_posts/11.png",
    storyImage: "/instagram/stories/11.png",
    caption: `👨‍👩‍👧‍👦 Um serviço pensado para todas as idades da sua casa!

👶 Para as crianças: Desenhos educativos, animações e canais infantis 24h
⚽ Para quem ama esporte: Todos os canais esportivos ao vivo
🍿 Para quem ama cinema: Milhares de filmes e séries

Tudo em um só lugar por apenas R$ 10,00 mensais.

💬 Comente "TV" nos comentários e receba seu acesso familiar no Direct! 🚀

#familia #desenhoseanimes #cinemaemcasa #dezpila #smarttv #entretenimento`,
  },
  {
    day: 12,
    id: "post_12",
    title: "Qualidade 4K Ultra HD Crisp",
    category: "📺 Tecnologia & Resolução",
    feedImage: "/instagram_posts/12.png",
    storyImage: "/instagram/stories/12.png",
    caption: `📺 Veja cada detalhe como se estivesse dentro da cena!

Nossas transmissões contam com imagem cristalina em 4K Ultra HD e som envolvente para você extrair o máximo potencial da sua Smart TV.

✅ Cores vivas e contraste perfeito
✅ Fluidez de 60 quadros por segundo
✅ Sem perda de resolução

💬 Comente "TV" para ver a qualidade 4K na sua TV pelo Direct! ⚡

#qualidade4k #smarttv4k #dezpila #ultrahd #tecnologia #filmes4k`,
  },
  {
    day: 13,
    id: "post_13",
    title: "Apenas R$ 0,33 por Dia!",
    category: "💰 Economia Diária",
    feedImage: "/instagram_posts/13.png",
    storyImage: "/instagram/stories/13.png",
    caption: `💰 Já parou para calcular quanto custa o DezPila por dia?

R$ 10,00 divididos por 30 dias = APENAS R$ 0,33 POR DIA! 😱

Mais barato que um cafezinho na padaria, e você tem entretenimento ilimitado para toda a família o mês inteiro.

💬 Comente "TV" nos comentários e garanta seu acesso no Direct! 💸

#economiadomestica #custobeneficio #dezpila #financas #streamingbarato`,
  },
  {
    day: 14,
    id: "post_14",
    title: "Hoje Tem Jogão! Você Já Garantiu Sua Tela?",
    category: "⚽ Matchday",
    feedImage: "/instagram_posts/14.png",
    storyImage: "/instagram/stories/14.png",
    caption: `⚽ Hoje a bola vai rolar e você não pode ficar de fora!

Assista ao jogo do seu time com transmissão 4K 60fps sem delay e sem pagar pay-per-view caríssimo.

✅ Ativação imediata no PIX em 2 minutos
✅ Assista no celular ou na Smart TV

💬 Comente "TV" para receber o sinal do jogo no seu Direct agora! 🔥

#hojetemjogo #futebolaovivo #brasileirao #dezpila #timedocoração`,
  },
  {
    day: 15,
    id: "post_15",
    title: "Funciona em Qualquer Tela Que Você Tiver",
    category: "📱 Multi-Aparelhos",
    feedImage: "/instagram_posts/15.png",
    storyImage: "/instagram/stories/15.png",
    caption: `📱💻📺 Compatibilidade total com seus aparelhos:

• Smart TV (Samsung, LG, TCL, Philco, Android TV)
• Celular e Tablet (Android e iPhone)
• TV Box, Fire Stick e Chromecast
• Computador e Notebook

Instalação descomplicada com suporte passo a passo!

💬 Comente "TV" nos comentários e receba o guia de instalação no Direct! 📲

#smarttvsamsung #smarttvlg #firestick #tvbox #dezpila #dispositivos`,
  },
  {
    day: 16,
    id: "post_16",
    title: "Como Ativar Seu DezPila em 3 Passos Fáceis",
    category: "⚡ Tutorial Simples",
    feedImage: "/instagram_posts/16.png",
    storyImage: "/instagram/stories/16.png",
    caption: `⚡ Ativar o seu DezPila é mais fácil do que você imagina:

1️⃣ Baixe o aplicativo recomendado na sua TV ou Celular
2️⃣ Faça o pagamento seguro de R$ 10 no PIX automático
3️⃣ Insira os dados recebidos e pronto: tudo liberado!

Tudo pronto em menos de 2 minutos!

💬 Comente "TV" para receber o passo a passo completo no seu Direct! 🚀

#tutorial #passoapasso #smarttv #dezpila #ativacaorapida #iptvbrasil`,
  },
  {
    day: 17,
    id: "post_17",
    title: "Pagamento no PIX: Liberação em Segundos",
    category: "💳 Pagamento Seguro",
    feedImage: "/instagram_posts/17.png",
    storyImage: "/instagram/stories/17.png",
    caption: `💳 Sem burocracia e com total segurança!

Nosso checkout aceita PIX com confirmação automática imediata. Pagou, o sistema gera seus dados e envia direto para você.

✅ Sem mensalidades surpresa no cartão de crédito
✅ Total controle dos seus gastos

💬 Comente "TV" para receber o link seguro de ativação no Direct! ⚡

#pagamentopix #segurancadigital #dezpila #checkoutfacil #streamingbrasil`,
  },
  {
    day: 18,
    id: "post_18",
    title: "Sem Contrato de Fidelidade: Cancele Quando Quiser",
    category: "🕊️ Liberdade Total",
    feedImage: "/instagram_posts/18.png",
    storyImage: "/instagram/stories/18.png",
    caption: `🕊️ Aqui você é livre de verdade!

Nada de contratos de 12 meses, multas abusivas ou atendentes tentando te convencer a ficar. Você usa quando quiser e renova se gostar.

✅ Sem pegadinhas contratuais
✅ R$ 10,00 por mês simples e direto

💬 Comente "TV" para testar sem compromisso direto pelo Direct! 💬

#liberdade #semfidelidade #dezpila #respeitoaocliente #tvdigital`,
  },
  {
    day: 19,
    id: "post_19",
    title: "Precisa de Ajuda? Suporte Via WhatsApp",
    category: "🤝 Suporte Humanizado",
    feedImage: "/instagram_posts/19.png",
    storyImage: "/instagram/stories/19.png",
    caption: `🤝 Você nunca fica na mão!

Nossa equipe de suporte está pronta para te ajudar a configurar em qualquer aparelho e tirar todas as suas dúvidas rapidamente pelo WhatsApp.

✅ Atendimento rápido e descomplicado
✅ Ajuda passo a passo para idosos e iniciantes

💬 Comente "TV" nos comentários para falar com o suporte no Direct! 📲

#suporteviawhatsapp #atendimentohumanizado #dezpila #ajudatv #smarttv`,
  },
  {
    day: 20,
    id: "post_20",
    title: "Guia de Programação EPG: Nunca Perca Um Horário",
    category: "📺 Recursos do App",
    feedImage: "/instagram_posts/20.png",
    storyImage: "/instagram/stories/20.png",
    caption: `📺 Navegue pelos seus canais favoritos com o Guia de Programação Completo (EPG).

Saiba exatamente o que está passando agora e o que vai passar a seguir com a sinopse completa de cada programa, filme ou partida de futebol.

💬 Comente "TV" nos comentários para receber o acesso ao app no Direct! 🚀

#guiadeprogramacao #epg #smarttv #dezpila #tecnologia #tvporassinatura`,
  },
  {
    day: 21,
    id: "post_21",
    title: "As 3 Perguntas Que Todo Mundo Faz",
    category: "❓ FAQ Rápido",
    feedImage: "/instagram_posts/21.png",
    storyImage: "/instagram/stories/21.png",
    caption: `❓ Tirando suas dúvidas em 1 minuto:

1️⃣ Precisa de antena? ➔ Não! Funciona 100% pela internet.
2️⃣ Trava se minha internet for fraca? ➔ Roda liso a partir de 10 Mega.
3️⃣ Funciona em mais de um aparelho? ➔ Sim, você pode adicionar telas extras por apenas R$ 5,90!

💬 Comente "TV" nos comentários e tire qualquer outra dúvida no Direct! 💬

#duvidasfrequentes #faq #dezpila #smarttv #comofunciona #streaming`,
  },
  {
    day: 22,
    id: "post_22",
    title: "Plano Pro Semestral: 3 Telas por R$ 29,90",
    category: "👑 Oferta Especial",
    feedImage: "/instagram_posts/22.png",
    storyImage: "/instagram/stories/22.png",
    caption: `👑 Conheça o Campeão de Vendas do DezPila!

Com o Plano Pro Semestral, você garante 6 meses completos com 3 telas simultâneas por apenas R$ 29,90 em pagamento único!

Isso dá menos de R$ 5,00 por mês para toda a família curtir em aparelhos diferentes ao mesmo tempo.

💬 Comente "TV" para garantir essa condição exclusiva no Direct! 🚀

#planopro #promocaotv #dezpila #descontoespecial #multitelas`,
  },
  {
    day: 23,
    id: "post_23",
    title: "Plano VIP Anual: 4 Telas por R$ 47,90",
    category: "💎 Máxima Economia",
    feedImage: "/instagram_posts/23.png",
    storyImage: "/instagram/stories/23.png",
    caption: `💎 O maior desconto do ano: 71% OFF!

12 meses de acesso ilimitado com 4 telas simultâneas em 4K por apenas R$ 47,90 (pagamento único no PIX).

✅ 1 ano inteiro sem se preocupar com fatura de TV
✅ 4 conexões simultâneas para a casa toda

💬 Comente "TV" para receber o link promocional VIP no Direct! 💎

#planovip #superdesconto #dezpila #economiareal #streaming1ano`,
  },
  {
    day: 24,
    id: "post_24",
    title: "Telas Extras Adicionais: Sem Briga Pelo Controle",
    category: "👨‍👩‍👧‍👦 Família em Paz",
    feedImage: "/instagram_posts/24.png",
    storyImage: "/instagram/stories/24.png",
    caption: `👨‍👩‍👧‍👦 Chega de briga pelo controle remoto na sala!

Enquanto um assiste futebol na TV, o outro maratona séries no quarto e as crianças assistem desenhos no tablet.

Adicione telas extras por apenas R$ 5,90 cada!

💬 Comente "TV" nos comentários e receba seu pacote de telas no Direct! 📲

#telasextras #paznafamilia #dezpila #smarttv #entretenimento`,
  },
  {
    day: 25,
    id: "post_25",
    title: "Pacote Adulto Opcional: Proteção com Senha PIN",
    category: "🔒 Privacidade & Controle",
    feedImage: "/instagram_posts/25.png",
    storyImage: "/instagram/stories/25.png",
    caption: `🔒 Controle parental e discrição total!

O pacote de conteúdos adultos é 100% opcional e protegido por senha PIN de 4 dígitos. Seus filhos só têm acesso aos canais e desenhos seguros.

✅ Privacidade para os adultos
✅ Segurança total para as crianças

💬 Comente "TV" para receber o teste seguro no Direct! 🔒

#controleparental #segurancafamiliar #dezpila #privacidade`,
  },
  {
    day: 26,
    id: "post_26",
    title: "Últimas Vagas Com Preço Fixado em R$ 10",
    category: "⏳ Escassez Real",
    feedImage: "/instagram_posts/26.png",
    storyImage: "/instagram/stories/26.png",
    caption: `⏳ Para manter a qualidade e velocidade máxima sem travamentos, limitamos a quantidade de novos clientes por servidor.

Garanta sua vaga hoje mesmo com o valor congelado em R$ 10,00 mensais!

💬 Comente "TV" nos comentários e reserve sua vaga no Direct antes que esgote! ⚡

#ultimasvagas #preçofixado #dezpila #oportunidade #streamingbrasil`,
  },
  {
    day: 27,
    id: "post_27",
    title: "1 Pizza VS 1 Mês de DezPila: O Que Vale Mais?",
    category: "🍕 Comparativo de Valor",
    feedImage: "/instagram_posts/27.png",
    storyImage: "/instagram/stories/27.png",
    caption: `🍕 1 Pizza no sábado à noite = R$ 80,00 (dura 30 minutos)
📺 1 Mês de DezPila = R$ 10,00 (dura 30 dias com +60.000 conteúdos)

Onde você prefere investir seu dinheiro? Troque contas abusivas por entretenimento de primeira linha.

💬 Comente "TV" para receber o link no Direct agora! 💸

#pizzavsstreaming #custobeneficio #dezpila #financasinteligentes`,
  },
  {
    day: 28,
    id: "post_28",
    title: "Pagou, Gerou, Assistiu: Simples e Direto",
    category: "⚡ Agilidade",
    feedImage: "/instagram_posts/28.png",
    storyImage: "/instagram/stories/28.png",
    caption: `⚡ Experiência 100% digital e sem atrito!

Em apenas 3 toques na tela você faz seu cadastro, gera o PIX nativo e recebe seus dados com as instruções de instalação.

Sem perda de tempo!

💬 Comente "TV" nos comentários e receba seu acesso no Direct em 2 minutos! 🚀

#agilidade #semespera #dezpila #tecnologia #smarttv`,
  },
  {
    day: 29,
    id: "post_29",
    title: "Seu Fim de Semana Merece O Melhor Do Streaming",
    category: "🍿 Fim de Semana",
    feedImage: "/instagram_posts/29.png",
    storyImage: "/instagram/stories/29.png",
    caption: `🍿 O que não falta no DezPila é conteúdo bom para o seu descanso!

Reúna a família, prepare o lanche e escolha entre os lançamentos mais assistidos da semana em 4K.

💬 Comente "TV" nos comentários para liberar seu acesso no Direct! 🎬

#fimdesemana #descanso #cinemaemcasa #dezpila #filmes4k`,
  },
  {
    day: 30,
    id: "post_30",
    title: "Chega De Pagar Caro. O Futuro da TV É DezPila.",
    category: "🚀 Manifesto",
    feedImage: "/instagram_posts/30.png",
    storyImage: "/instagram/stories/30.png",
    caption: `🚀 Chega de faturas abusivas de R$ 300,00 e atendimento ruim.

A televisão mudou e o DezPila é a escolha inteligente de milhares de brasileiros que querem entretenimento completo por um preço justo.

✅ +60.000 conteúdos em 4K
✅ R$ 10,00 por mês
✅ Sem fidelidade

💬 Comente "TV" aqui embaixo e faça sua ativação pelo Direct hoje mesmo! 🔥

#futurodatv #dezpila #revolucaodostreaming #smarttv #tvdigital`,
  },
];

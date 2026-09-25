const INITIAL_PRODUCTS = [
  // ACESSÓRIOS DE SMART TV
  {
    id: "10000000-0000-0000-0000-000000000001",
    nome: "Controle Remoto Universal Smart TV com Comando de Voz",
    descricao: "Controle inteligente compatível com Samsung, LG, TCL, Android TV e Roku. Possui botões dedicados de atalho e reconhecimento de voz de alta precisão.",
    categoria: "acessorios_tv",
    preco: 49.9,
    imagem_url: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600&auto=format&fit=crop&q=80",
    estoque: 60,
    destaque: true,
    badge: "Mais Vendido",
    ativo: true
  },
  {
    id: "10000000-0000-0000-0000-000000000002",
    nome: 'Suporte de Parede Articulado para TV 32" a 75"',
    descricao: "Estrutura reforçada em aço carbono com nível de bolha integrado. Giro de 180° e inclinação anti-reflexo para o melhor ângulo da sua sala.",
    categoria: "acessorios_tv",
    preco: 89.9,
    imagem_url: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&auto=format&fit=crop&q=80",
    estoque: 40,
    destaque: true,
    badge: "Frete Grátis Opcional",
    ativo: true
  },
  {
    id: "10000000-0000-0000-0000-000000000003",
    nome: "Cabo HDMI 2.1 Ultra HD 8K / 4K 120Hz (2 Metros)",
    descricao: "Conectores banhados a ouro 24k com malha trançada de alta resistência. Suporta HDR10+, eARC e velocidade de 48Gbps sem perdas.",
    categoria: "acessorios_tv",
    preco: 39.9,
    imagem_url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80",
    estoque: 100,
    destaque: false,
    badge: "Qualidade 4K",
    ativo: true
  },
  {
    id: "10000000-0000-0000-0000-000000000004",
    nome: "Adaptador Extensor Flexível Fire Stick & Chromecast 4K",
    descricao: "Cabo extensor de 30cm para evitar superaquecimento e facilitar o encaixe em portas HDMI de difícil acesso atrás de Smart TVs.",
    categoria: "acessorios_tv",
    preco: 29.9,
    imagem_url: "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=600&auto=format&fit=crop&q=80",
    estoque: 75,
    destaque: false,
    badge: "Prático",
    ativo: true
  },
  {
    id: "10000000-0000-0000-0000-000000000005",
    nome: "Soundbar Compacta Bluetooth Cinema Surround 2.0 (80W RMS)",
    descricao: "Qualidade de áudio de cinema com graves profundos e conexão óptica + Bluetooth 5.0. Acompanha controle remoto e kit de fixação.",
    categoria: "acessorios_tv",
    preco: 179.9,
    imagem_url: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop&q=80",
    estoque: 25,
    destaque: true,
    badge: "Frete Grátis",
    ativo: true
  },
  {
    id: "10000000-0000-0000-0000-000000000006",
    nome: "Mini Teclado Wireless Retroiluminado RGB para Smart TV & TV Box",
    descricao: "Teclado QWERTY com touch pad integrado. Iluminação em 7 cores RGB e bateria recarregável via USB para navegar em filmes no escuro.",
    categoria: "acessorios_tv",
    preco: 34.9,
    imagem_url: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80",
    estoque: 85,
    destaque: false,
    badge: "Luz RGB",
    ativo: true
  },
  // NIGHT DE FILME (CINEMA EM CASA)
  {
    id: "20000000-0000-0000-0000-000000000001",
    nome: "Balde de Pipoca Gigante Tema Cinema Retrô (3.5 Litros)",
    descricao: "Balde de plástico reforçado livre de BPA, lavável e reutilizável. Design divertido estilo cinema vintage perfeito para noites de filmes.",
    categoria: "cinema_em_casa",
    preco: 24.9,
    imagem_url: "https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=600&auto=format&fit=crop&q=80",
    estoque: 120,
    destaque: true,
    badge: "Sucesso de Vendas",
    ativo: true
  },
  {
    id: "20000000-0000-0000-0000-000000000002",
    nome: "Copo Térmico Inox 700ml com Tampa e Canudo Tema Streaming",
    descricao: "Mantém sua bebida gelada por até 8 horas durante maratonas de séries. Isolamento a vácuo de parede dupla sem suar por fora.",
    categoria: "cinema_em_casa",
    preco: 39.9,
    imagem_url: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=600&auto=format&fit=crop&q=80",
    estoque: 90,
    destaque: true,
    badge: "Mantém Gelado",
    ativo: true
  },
  {
    id: "20000000-0000-0000-0000-000000000003",
    nome: "Kit Pipoca de Cinema Gourmet (Milho Premium + Manteiga + Temperos)",
    descricao: "Kit completo com 500g de milho Mushroom (pipoca redonda igual de cinema), óleo sabor manteiga especial e 2 temperos exclusivos.",
    categoria: "cinema_em_casa",
    preco: 44.9,
    imagem_url: "https://images.unsplash.com/photo-1585647347384-2593bc35786b?w=600&auto=format&fit=crop&q=80",
    estoque: 50,
    destaque: false,
    badge: "Sabor de Cinema",
    ativo: true
  },
  {
    id: "20000000-0000-0000-0000-000000000004",
    nome: "Manta Coberta Soft de Casal Flannel Ultra Aconchegante",
    descricao: "Tecido aveludado super macio de 2.00m x 1.80m. Esquenta sem pesar, perfeita para curtir o futebol ou a série no ar-condicionado.",
    categoria: "cinema_em_casa",
    preco: 79.9,
    imagem_url: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&auto=format&fit=crop&q=80",
    estoque: 35,
    destaque: true,
    badge: "Super Macia",
    ativo: true
  },
  {
    id: "20000000-0000-0000-0000-000000000005",
    nome: "Pantufa Aconchegante Antiderrapante Unisex Almofadada",
    descricao: "Pantufa com sola de borracha silenciosa e interior aveludado em algodão. Conforto absoluto para relaxar no sofá da sala.",
    categoria: "cinema_em_casa",
    preco: 59.9,
    imagem_url: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&auto=format&fit=crop&q=80",
    estoque: 45,
    destaque: false,
    badge: "Conforto VIP",
    ativo: true
  },
  {
    id: "20000000-0000-0000-0000-000000000006",
    nome: "Organizador de Almofada para Sofá (Porta Copos e Controle Remoto)",
    descricao: "Suporte rígido em couro sintético lavável que encaixa no braço do sofá. Evita derramar bebidas e guarda seus controles sempre à mão.",
    categoria: "cinema_em_casa",
    preco: 69.9,
    imagem_url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=80",
    estoque: 30,
    destaque: false,
    badge: "Praticidade",
    ativo: true
  }
];
export {
  INITIAL_PRODUCTS as I
};

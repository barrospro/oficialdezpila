export interface Product {
  id: string;
  nome: string;
  descricao: string;
  categoria: 'acessorios_tv' | 'cinema_em_casa';
  preco: number;
  preco_original?: number;
  imagem_url: string;
  estoque: number;
  destaque?: boolean;
  badge?: string;
  ativo: boolean;
}

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "30000000-0000-0000-0000-000000000001",
    nome: "Tv Box Smart Pro Android 4k Wi-fi Transforme Sua Tv Em Smart",
    descricao: "Transforme qualquer TV comum em uma Smart TV 4K Ultra HD de alta velocidade. Acompanha controle remoto multifuncional, cabo HDMI e fonte de alimentação. Conexão Wi-Fi rápida e suporte total aos melhores aplicativos de streaming.",
    categoria: "acessorios_tv",
    preco: 69.90,
    preco_original: 162.80,
    imagem_url: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&auto=format&fit=crop&q=80",
    estoque: 85,
    destaque: true,
    badge: "57% OFF • Mais Vendido",
    ativo: true,
  },
  {
    id: "30000000-0000-0000-0000-000000000002",
    nome: "Smart Tv Box Pró 4k Android C/ Play Store Baixa Aplicativos",
    descricao: "Versão Pro de alta performance com Android atualizado, Play Store liberada para baixar qualquer aplicativo, processador Quad-Core e transmissão 4K fluida sem travamentos no futebol ao vivo.",
    categoria: "acessorios_tv",
    preco: 99.90,
    preco_original: 249.99,
    imagem_url: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop&q=80",
    estoque: 60,
    destaque: true,
    badge: "60% OFF • Edição Pro",
    ativo: true,
  },
  {
    id: "30000000-0000-0000-0000-000000000003",
    nome: "Tv Box Smart Pro Android 4k Transforme Sua Tv Em Smart Wifi",
    descricao: "Receptor inteligente 4K de resposta ultra rápida, design compacto premium, 4 portas USB, saída de áudio digital e Wi-Fi dual band otimizado para máxima estabilidade em transmissões 4K.",
    categoria: "acessorios_tv",
    preco: 67.90,
    preco_original: 159.80,
    imagem_url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80",
    estoque: 100,
    destaque: false,
    badge: "57% OFF • Menor Preço",
    ativo: true,
  },
  {
    id: "30000000-0000-0000-0000-000000000004",
    nome: "Aparelho Smart Tv Box Stick Android 4k Wi-fi C/play Store Y9 Stick",
    descricao: "Dongle TV Stick 4K formato pendrive ultra discreto. Conecta direto na porta HDMI atrás da TV com controle remoto via Bluetooth, suporte a comando de voz e Play Store instalada.",
    categoria: "acessorios_tv",
    preco: 89.90,
    preco_original: 269.90,
    imagem_url: "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&auto=format&fit=crop&q=80",
    estoque: 50,
    destaque: true,
    badge: "66% OFF • Formato Stick",
    ativo: true,
  },
];

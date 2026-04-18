export type Plan = {
  id: string;
  name: string;
  screens: string;
  price: string;
  period: string;
  originalPrice: string | null;
  discount: string | null;
  link: string;
  extra: string[];
};

export const features = [
  "Mais de 60.000 conteúdos disponíveis",
  "Qualidade SD / HD / FHD / 4K",
  "Guia de Programação [EPG] completo",
  "Compatível com Smartphone e Tablet",
  "Funciona em TV Box e Chromecast",
  "Smart TV, Computador e Navegador",
  "Pacote de Filmes e Séries incluso",
  "Suporte técnico via WhatsApp",
];

export const plans: Plan[] = [
  {
    id: "MENSAL",
    name: "MENSAL",
    screens: "1 conexão simultânea",
    price: "10,00",
    period: "/mês",
    originalPrice: null,
    discount: null,
    link: "https://go.nitropagamentos.com/ni918",
    extra: [],
  },
  {
    id: "TRIMESTRAL",
    name: "TRIMESTRAL",
    screens: "2 conexões simultâneas",
    price: "19,90",
    period: "/trim",
    originalPrice: null,
    discount: null,
    link: "https://go.nitropagamentos.com/h64gr",
    extra: ["Programação Adultos [Opcional]"],
  },
  {
    id: "SEMESTRAL",
    name: "SEMESTRAL",
    screens: "3 conexões simultâneas",
    price: "29,90",
    period: "/sem",
    originalPrice: "R$ 119,40",
    discount: "-66%",
    link: "https://go.nitropagamentos.com/oinxr",
    extra: ["Programação Adultos [Opcional]"],
  },
  {
    id: "ANUAL",
    name: "ANUAL",
    screens: "4 conexões simultâneas",
    price: "47,90",
    period: "/ano",
    originalPrice: "R$ 238,80",
    discount: "-71%",
    link: "https://go.nitropagamentos.com/lzcus",
    extra: ["Programação Adultos [Opcional]"],
  },
];

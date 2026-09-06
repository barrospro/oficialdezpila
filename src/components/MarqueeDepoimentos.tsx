import { useState } from "react";
import { MessageCircle, CheckCheck, X, Eye, ShieldCheck } from "lucide-react";
import whatsappLucas from "@/assets/proofs/whatsapp-lucas.jpg";
import whatsappFernanda from "@/assets/proofs/whatsapp-fernanda.jpg";
import whatsappRodrigo from "@/assets/proofs/whatsapp-rodrigo.jpg";
import whatsappPriscila from "@/assets/proofs/whatsapp-priscila.jpg";
import whatsappGustavo from "@/assets/proofs/whatsapp-gustavo.jpg";
import whatsappCamila from "@/assets/proofs/whatsapp-camila.jpg";
import whatsappDiego from "@/assets/proofs/whatsapp-diego.jpg";
import whatsappMatheus from "@/assets/proofs/whatsapp-matheus.jpg";
import whatsappBeatriz from "@/assets/proofs/whatsapp-beatriz.jpg";

type CardDepo = {
  q: string;
  nome: string;
  cargo: string;
  iniciais: string;
  stars: number;
  plano: string;
  proofImg?: string;
  proofTag?: string;
};

const LINHA1: CardDepo[] = [
  {
    q: "Fiz o PIX de R$10 e liberou na hora no Premiere da TV Samsung. Imagem 4K absurda!",
    nome: "Lucas Carvalho",
    cargo: "São Paulo, SP",
    iniciais: "LC",
    stars: 5,
    plano: "SEMESTRAL",
    proofImg: whatsappLucas,
    proofTag: "Futebol 4K sem travar",
  },
  {
    q: "To aqui no ônibus voltando do trampo e rodando o jogo da Champions liso no 4G!",
    nome: "Diego Prado",
    cargo: "Rio de Janeiro, RJ",
    iniciais: "DP",
    stars: 5,
    plano: "ANUAL",
    proofImg: whatsappDiego,
    proofTag: "Champions League no 4G",
  },
  {
    q: "Instalei no Fire Stick em 2 minutos. Cancelei minha TV a cabo de R$180 e as crianças amaram!",
    nome: "Fernanda Rocha",
    cargo: "Curitiba, PR",
    iniciais: "FR",
    stars: 5,
    plano: "TRIMESTRAL",
    proofImg: whatsappFernanda,
    proofTag: "Cinema Disney em Família",
  },
  {
    q: "Configurei no monitor gamer e no tablet. Qualidade absurda, animes e filmes 4K!",
    nome: "Matheus Ribeiro",
    cargo: "Florianópolis, SC",
    iniciais: "MR",
    stars: 5,
    plano: "ANUAL",
    proofImg: whatsappMatheus,
    proofTag: "PC Gamer & Filmes 4K",
  },
];

const LINHA2: CardDepo[] = [
  {
    q: "Pegou de primeira! Minha mãe assistindo a novela das 9 e eu maratonando séries!",
    nome: "Camila Brito",
    cargo: "Fortaleza, CE",
    iniciais: "CB",
    stars: 5,
    plano: "ANUAL",
    proofImg: whatsappCamila,
    proofTag: "Novelas & Séries Globoplay",
  },
  {
    q: "Card do UFC no Combate rodando em 4K liso, sem delay. Sensacional!",
    nome: "Gustavo Serra",
    cargo: "Porto Alegre, RS",
    iniciais: "GS",
    stars: 5,
    plano: "SEMESTRAL",
    proofImg: whatsappGustavo,
    proofTag: "UFC Combate 4K Liso",
  },
  {
    q: "Paguei pelo PIX e em menos de 1 minuto já recebi os dados e ativei na Smart TV.",
    nome: "Priscila Lima",
    cargo: "Recife, PE",
    iniciais: "PL",
    stars: 5,
    plano: "MENSAL",
    proofImg: whatsappPriscila,
    proofTag: "Ativação PIX Instantânea",
  },
  {
    q: "Simples de instalar no TV Box e no celular. Qualidade de imagem 10/10 no Wi-Fi.",
    nome: "Rodrigo Maia",
    cargo: "Brasília, DF",
    iniciais: "RM",
    stars: 5,
    plano: "TRIMESTRAL",
    proofImg: whatsappRodrigo,
    proofTag: "TV Box & Sinal Liso",
  },
  {
    q: "Cancelei a assinatura de 340 reais da operadora. Não trava nada e economizo todo mês!",
    nome: "Beatriz Mendes",
    cargo: "Belo Horizonte, MG",
    iniciais: "BM",
    stars: 5,
    plano: "ANUAL",
    proofImg: whatsappBeatriz,
    proofTag: "Economia de R$ 340/mês",
  },
];

const PROVAS_DESTACADAS = [
  {
    nome: "Lucas Carvalho",
    cidade: "São Paulo, SP",
    dispositivo: "Samsung 4K • Premiere",
    resumo: "Liberou em segundos após o PIX e assistiu ao jogo no Premiere em 4K liso.",
    img: whatsappLucas,
  },
  {
    nome: "Camila Brito",
    cidade: "Fortaleza, CE",
    dispositivo: "Smart TV • Novelas & Séries",
    resumo: "Mãe assistindo novelas e ela maratonando séries em altíssima definição.",
    img: whatsappCamila,
  },
  {
    nome: "Gustavo Serra",
    cidade: "Porto Alegre, RS",
    dispositivo: "Smart TV LG • UFC Combate",
    resumo: "Acompanhando o card principal do UFC em 4K cristalino sem travar.",
    img: whatsappGustavo,
  },
  {
    nome: "Diego Prado",
    cidade: "Rio de Janeiro, RJ",
    dispositivo: "Mobile 4G • Champions League",
    resumo: "Assistindo jogo de futebol europeu no 4G direto no transporte com estabilidade total.",
    img: whatsappDiego,
  },
  {
    nome: "Fernanda Rocha",
    cidade: "Curitiba, PR",
    dispositivo: "Fire Stick • Disney & Kids",
    resumo: "Instalou em 2 minutos para a família e cancelou a assinatura antiga de R$ 180.",
    img: whatsappFernanda,
  },
  {
    nome: "Beatriz Mendes",
    cidade: "Belo Horizonte, MG",
    dispositivo: "Living Room TV • TV por Assinatura",
    resumo: "Cancelei a fatura de R$ 340 da operadora tradicional e economizo todo mês.",
    img: whatsappBeatriz,
  },
  {
    nome: "Matheus Ribeiro",
    cidade: "Florianópolis, SC",
    dispositivo: "Setup Gamer • Animes & Filmes",
    resumo: "Configuração em monitor gamer e tablet com catálogo completo em 4K HDR.",
    img: whatsappMatheus,
  },
  {
    nome: "Rodrigo Maia",
    cidade: "Brasília, DF",
    dispositivo: "TV Box & Wi-Fi Comum",
    resumo: "Qualidade 10/10 com sistema anti-travamento mesmo no Wi-Fi doméstico.",
    img: whatsappRodrigo,
  },
];

export function MarqueeDepoimentos() {
  const [selectedProof, setSelectedProof] = useState<{
    nome: string;
    img: string;
    tag?: string;
  } | null>(null);

  return (
    <section
      id="depoimentos"
      className="group relative z-10 overflow-hidden py-20 font-body border-t border-border bg-[#030306]"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 700px 350px at 50% -60px, rgba(151, 2, 2, 0.15), transparent)",
      }}
    >
      <style>{`
        @keyframes depo-mq { to { transform: translateX(-50%); } }
        .group:hover .depo-row { animation-play-state: paused; }
      `}</style>

      <div className="mb-12 px-6 text-center max-w-4xl mx-auto">
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 font-code text-xs font-bold uppercase tracking-widest text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
          <CheckCheck className="w-3.5 h-3.5" /> + de 12.000 Clientes Ativos • Avaliações 100% Reais
        </div>
        <h2 className="section-title text-center text-white">
          CONVERSAS REAIS{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-rose-400">
            DE CLIENTES NO WHATSAPP
          </span>
        </h2>
        <p className="text-muted-foreground mt-3 font-code text-xs sm:text-sm max-w-2xl mx-auto">
          Veja o que nossos clientes dizem após ativar o acesso. Clique em qualquer print para visualizar a conversa completa:
        </p>
      </div>

      {/* Grid de Destaques Visuais com Prints Reais do WhatsApp */}
      <div className="max-w-6xl mx-auto px-6 mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PROVAS_DESTACADAS.map((prova, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedProof({ nome: prova.nome, img: prova.img, tag: prova.dispositivo })}
            className="group/proof relative rounded-2xl bg-[#0c0c14] border border-white/10 hover:border-emerald-500/50 p-3 transition-all duration-300 hover:scale-[1.02] cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(16,185,129,0.2)] flex flex-col justify-between"
          >
            {/* Header do Card com Nome do Cliente */}
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2 min-w-0">
                <div className="size-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="font-heading font-extrabold text-xs text-white uppercase truncate">
                  {prova.nome}
                </span>
              </div>
              <span className="font-code text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 shrink-0 flex items-center gap-1">
                <MessageCircle className="w-2.5 h-2.5" /> WhatsApp
              </span>
            </div>

            {/* Imagem do Print com Efeito de Hover */}
            <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-black/80 border border-white/5 mb-3 group-hover/proof:border-emerald-500/30">
              <img
                src={prova.img}
                alt={`Conversa real WhatsApp com ${prova.nome}`}
                className="w-full h-full object-cover object-top opacity-90 group-hover/proof:opacity-100 transition-opacity"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover/proof:opacity-40 transition-opacity" />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-center gap-1.5 bg-black/80 backdrop-blur-md py-1.5 px-3 rounded-lg border border-white/15 text-[11px] font-code text-white font-bold group-hover/proof:bg-emerald-600 group-hover/proof:border-emerald-400 transition-colors">
                <Eye className="w-3.5 h-3.5" />
                <span>Ampliar Conversa</span>
              </div>
            </div>

            {/* Rodapé do Card */}
            <div>
              <div className="flex items-center justify-between text-[10px] font-code text-slate-400 mb-1">
                <span>{prova.cidade}</span>
                <span className="text-slate-300 font-bold">{prova.dispositivo}</span>
              </div>
              <p className="text-[11px] text-slate-300 font-body leading-tight line-clamp-2">
                "{prova.resumo}"
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Carrossel Infinito com Depoimentos em Marquee */}
      <div className="relative">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28"
          style={{ background: "linear-gradient(90deg, #030306, transparent)" }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28"
          style={{ background: "linear-gradient(270deg, #030306, transparent)" }}
        />

        <div
          className="depo-row mb-4 flex w-max"
          style={{ animation: "depo-mq 32s linear infinite" }}
        >
          {[...LINHA1, ...LINHA1, ...LINHA1].map((c, i) => (
            <div
              key={"a" + i}
              onClick={() => c.proofImg && setSelectedProof({ nome: c.nome, img: c.proofImg, tag: c.proofTag })}
              className={`group/card mr-4 w-[300px] flex-shrink-0 rounded-xl border bg-card/60 p-4.5 backdrop-blur-md transition-all duration-300 ${
                c.proofImg
                  ? "border-emerald-500/30 hover:border-emerald-400 hover:shadow-[0_0_25px_rgba(16,185,129,0.2)] cursor-pointer"
                  : "border-border/80 hover:border-brand/50 hover:shadow-[0_0_25px_rgba(255,59,48,0.15)]"
              }`}
            >
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex gap-0.5 text-xs text-amber-400 font-bold">
                  {"★".repeat(c.stars)}
                </div>
                {c.proofImg ? (
                  <span className="font-code text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 uppercase tracking-widest rounded-sm flex items-center gap-1">
                    <CheckCheck className="w-2.5 h-2.5" /> Print Verificado
                  </span>
                ) : (
                  <span className="font-code text-[9px] font-bold text-brand/90 bg-brand/10 border border-brand/20 px-2 py-0.5 uppercase tracking-widest rounded-sm">
                    {c.plano}
                  </span>
                )}
              </div>
              <p className="mb-4 text-xs leading-relaxed text-slate-300">"{c.q}"</p>
              <div className="flex items-center justify-between pt-3 border-t border-border/50">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold font-code bg-brand/15 border border-brand/30 text-brand">
                    {c.iniciais}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white font-heading uppercase tracking-wide">
                      {c.nome}
                    </div>
                    <div className="text-[10px] font-code text-slate-400 uppercase tracking-widest">
                      {c.cargo}
                    </div>
                  </div>
                </div>
                {c.proofImg && (
                  <span className="text-[10px] font-code text-emerald-400 underline underline-offset-2">
                    Ver Print
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div
          className="depo-row mb-4 flex w-max"
          style={{ animation: "depo-mq 38s linear infinite reverse" }}
        >
          {[...LINHA2, ...LINHA2, ...LINHA2].map((c, i) => (
            <div
              key={"b" + i}
              onClick={() => c.proofImg && setSelectedProof({ nome: c.nome, img: c.proofImg, tag: c.proofTag })}
              className={`group/card mr-4 w-[300px] flex-shrink-0 rounded-xl border bg-card/60 p-4.5 backdrop-blur-md transition-all duration-300 ${
                c.proofImg
                  ? "border-emerald-500/30 hover:border-emerald-400 hover:shadow-[0_0_25px_rgba(16,185,129,0.2)] cursor-pointer"
                  : "border-border/80 hover:border-brand/50 hover:shadow-[0_0_25px_rgba(255,59,48,0.15)]"
              }`}
            >
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex gap-0.5 text-xs text-amber-400 font-bold">
                  {"★".repeat(c.stars)}
                </div>
                {c.proofImg ? (
                  <span className="font-code text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 uppercase tracking-widest rounded-sm flex items-center gap-1">
                    <CheckCheck className="w-2.5 h-2.5" /> Print Verificado
                  </span>
                ) : (
                  <span className="font-code text-[9px] font-bold text-brand/90 bg-brand/10 border border-brand/20 px-2 py-0.5 uppercase tracking-widest rounded-sm">
                    {c.plano}
                  </span>
                )}
              </div>
              <p className="mb-4 text-xs leading-relaxed text-slate-300">"{c.q}"</p>
              <div className="flex items-center justify-between pt-3 border-t border-border/50">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold font-code bg-brand/15 border border-brand/30 text-brand">
                    {c.iniciais}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white font-heading uppercase tracking-wide">
                      {c.nome}
                    </div>
                    <div className="text-[10px] font-code text-slate-400 uppercase tracking-widest">
                      {c.cargo}
                    </div>
                  </div>
                </div>
                {c.proofImg && (
                  <span className="text-[10px] font-code text-emerald-400 underline underline-offset-2">
                    Ver Print
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal / Lightbox para Visualizar o Print em Alta Resolução */}
      {selectedProof && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedProof(null)}
        >
          <div
            className="relative max-w-lg w-full bg-[#0d0d14] border border-white/20 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.9)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do Modal */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#13131f] border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="size-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-heading font-extrabold text-sm text-white uppercase">
                  Conversa com {selectedProof.nome}
                </span>
                <span className="font-code text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Verificado
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProof(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Imagem do Print */}
            <div className="p-3 bg-black flex justify-center max-h-[75vh] overflow-auto">
              <img
                src={selectedProof.img}
                alt={`Conversa no WhatsApp com ${selectedProof.nome}`}
                className="max-h-[70vh] w-auto rounded-xl object-contain shadow-2xl border border-white/10"
              />
            </div>

            {/* Rodapé do Modal */}
            <div className="px-4 py-3 bg-[#13131f] border-t border-white/10 flex items-center justify-between text-xs font-code">
              <span className="text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Depoimento real com autorização do cliente
              </span>
              <button
                type="button"
                onClick={() => setSelectedProof(null)}
                className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}


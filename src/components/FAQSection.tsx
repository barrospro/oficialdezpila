import { useState } from "react";

const faqs = [
  {
    q: "Como recebo o meu acesso após o pagamento?",
    a: "O envio dos seus dados de login e o passo a passo de configuração são disparados automaticamente no seu WhatsApp e E-mail em menos de 2 minutos após a confirmação do PIX ou Cartão.",
  },
  {
    q: "Funciona em quais aparelhos?",
    a: "Em absolutamente todos! Smart TVs (Samsung, LG, TCL, Android TV), Celulares (Android e iOS), TV Box, Chromecast, Fire TV Stick, Computadores e Tablets.",
  },
  {
    q: "O pagamento é seguro e sem fidelidade?",
    a: "Totalmente seguro! Pagamento processado via PIX com aprovação instantânea ou Cartão de Crédito. Sem fidelidade, sem contrato de carência e você pode cancelar quando quiser sem multas.",
  },
  {
    q: "Qual é a velocidade de internet recomendada?",
    a: "Para transmissões em HD e Full HD recomendamos a partir de 10 Mega. Para conteúdos em 4K Ultra HD ao vivo, recomendamos a partir de 15 Mega de velocidade.",
  },
  {
    q: "O que está incluído na lista de conteúdos?",
    a: "Acesso a mais de 60.000 títulos incluindo lançamentos de cinema, séries atualizadas diariamente, canais abertos e fechados em 4K, além de todos os campeonatos de Futebol ao Vivo (Brasileirão, Champions, Libertadores, etc).",
  },
  {
    q: "Como funcionam os pacotes opcionais (CristoFlix e Adulto VIP)?",
    a: "No momento da assinatura você pode personalizar seu plano adicionando o CristoFlix Infantil (conteúdo bíblico e educativo para crianças) ou o Conteúdo Adulto VIP (Privacy/OnlyFans). Todos são 100% opcionais.",
  },
  {
    q: "Preciso de ajuda técnica para instalar?",
    a: "Não! Nosso suporte oferece tutoriais em vídeo simplificados para instalar em qualquer aparelho em menos de 3 minutos. Se precisar de ajuda, nosso atendimento no WhatsApp responde rapidamente.",
  },
  {
    q: "Posso usar a mesma conta em mais de uma TV?",
    a: "Sim! No checkout você pode adicionar conexões simultâneas (Telas Extras) pelo valor de apenas R$ 5,90 por tela adicional para toda a família assistir ao mesmo tempo.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="px-6 lg:px-12 py-24 relative z-10 border-t border-border">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <p className="font-code text-brand text-xs uppercase tracking-widest mb-4 font-bold">
            Central de Informações
          </p>
          <h2 className="section-title text-center">
            Perguntas <span className="text-muted-foreground">Frequentes</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-body mt-3 max-w-lg mx-auto">
            Tudo o que você precisa saber sobre o funcionamento, instalação e pagamento do DezPila.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="card-surface cursor-pointer hover:border-[#970202]/50 transition-all"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="font-code text-xs text-brand/60 font-bold">
                    [{String(i + 1).padStart(2, "0")}]
                  </span>
                  <span className="font-bold text-sm uppercase tracking-wide text-white">
                    {faq.q}
                  </span>
                </div>
                <span className="font-code text-brand text-lg shrink-0 font-bold">
                  {openIndex === i ? "−" : "+"}
                </span>
              </div>
              {openIndex === i && (
                <p className="text-slate-300 text-sm mt-4 pl-10 leading-relaxed font-body">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

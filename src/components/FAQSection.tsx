import { useState } from "react";

const faqs = [
  {
    q: "Funciona em todos os dispositivos?",
    a: "Sim! Compatível com Smart TVs, smartphones, tablets, computadores, TV Box, Fire Stick, Chromecast e muito mais. Qualquer dispositivo com acesso à internet.",
  },
  {
    q: "Precisa instalar alguma coisa?",
    a: "Apenas um aplicativo de IPTV compatível. Indicamos as melhores opções e oferecemos tutorial completo para configuração.",
  },
  {
    q: "A qualidade é boa mesmo?",
    a: "Nossos servidores operam em qualidade SD, HD, Full HD e 4K. Com sistema anti-travamento proprietário e latência inferior a 2ms para conteúdo ao vivo.",
  },
  {
    q: "O pagamento é seguro?",
    a: "Totalmente. Aceitamos PIX (liberação imediata), cartão de crédito e boleto. Todos os pagamentos são processados por plataformas certificadas com criptografia SSL.",
  },
  {
    q: "Posso testar antes de comprar?",
    a: "Oferecemos garantia incondicional de 7 dias. Se não gostar, devolvemos 100% do seu dinheiro sem perguntas.",
  },
  {
    q: "Quantas telas posso usar ao mesmo tempo?",
    a: "Depende do plano escolhido: Mensal (1 tela), Trimestral (2 telas), Semestral (3 telas) e Anual (4 telas simultâneas).",
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
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="card-surface cursor-pointer"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="font-code text-xs text-brand/50">
                    [{String(i + 1).padStart(2, "0")}]
                  </span>
                  <span className="font-bold text-sm uppercase tracking-wide">{faq.q}</span>
                </div>
                <span className="font-code text-brand text-lg shrink-0">
                  {openIndex === i ? "−" : "+"}
                </span>
              </div>
              {openIndex === i && (
                <p className="text-muted-foreground text-sm mt-4 pl-10 leading-relaxed">{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

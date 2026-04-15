import { useState } from "react";

const faqs = [
  { q: "Precisa de internet para funcionar?", a: "Sim, é necessário uma conexão de internet estável para utilizar o serviço. Recomendamos no mínimo 10 Mbps para uma boa experiência." },
  { q: "Precisa de especialista para configurar?", a: "Não! A configuração é super simples. Você receberá um tutorial completo para instalar em poucos minutos." },
  { q: "O pagamento é mensal?", a: "Depende do plano escolhido. Temos opções mensal, trimestral, semestral e anual." },
  { q: "Moro em zona rural, funciona pra mim?", a: "Sim! Basta ter uma conexão de internet. Funciona via Wi-Fi ou dados móveis." },
  { q: "Quantos canais são liberados?", a: "Mais de 2.000 canais ao vivo, além de um catálogo com mais de 60.000 filmes e séries." },
  { q: "Como vou receber?", a: "Após a confirmação do pagamento, você receberá os dados de acesso no seu e-mail e WhatsApp." },
  { q: "Em quantos aparelhos posso usar?", a: "Depende do plano: mensal (1 tela), trimestral (2), semestral (3) e anual (4 telas simultâneas)." },
  { q: "Estou com dúvidas, tem suporte?", a: "Sim! Temos suporte dedicado via WhatsApp para ajudar você a qualquer momento." },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="px-6 py-20 bg-secondary/30">
      <div className="mx-auto max-w-3xl">
        <h2 className="section-title mb-2">Ainda com dúvidas?</h2>
        <p className="text-center text-muted-foreground mb-10">Temos a resposta.</p>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <button
              key={i}
              onClick={() => setOpen(open === i ? null : i)}
              className="card-surface w-full text-left cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm">{faq.q}</span>
                <span className="text-brand text-xl ml-4">{open === i ? "−" : "+"}</span>
              </div>
              {open === i && (
                <p className="text-muted-foreground text-sm mt-3">{faq.a}</p>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

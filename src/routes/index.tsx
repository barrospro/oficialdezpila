import { createFileRoute } from "@tanstack/react-router";
import { TopBanner } from "@/components/TopBanner";
import { NavbarGlassFixa } from "@/components/NavbarGlassFixa";
import { HeroSection } from "@/components/HeroSection";
import { VideoShowcase } from "@/components/VideoShowcase";
import { ContentSection } from "@/components/ContentSection";
import { PriceComparison } from "@/components/PriceComparison";
import { PrecoTrioDark } from "@/components/PrecoTrioDark";
import { MarqueeDepoimentos } from "@/components/MarqueeDepoimentos";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { SocialProofToasts } from "@/components/SocialProofToasts";
import { Reveal } from "@/components/Reveal";
import { DeviceCompatibility } from "@/components/DeviceCompatibility";
import { StickyBottomBar } from "@/components/StickyBottomBar";
import { ExitIntentModal } from "@/components/ExitIntentModal";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Como recebo o meu acesso após o pagamento?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "O envio dos seus dados de login e o passo a passo de configuração são disparados automaticamente no seu WhatsApp e E-mail em menos de 2 minutos após a confirmação do PIX ou Cartão.",
          },
        },
        {
          "@type": "Question",
          name: "Funciona em quais aparelhos?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Em absolutamente todos! Smart TVs (Samsung, LG, TCL, Android TV), Celulares (Android e iOS), TV Box, Chromecast, Fire TV Stick, Computadores e Tablets.",
          },
        },
        {
          "@type": "Question",
          name: "O pagamento é seguro e sem fidelidade?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Totalmente seguro! Pagamento processado via PIX com aprovação instantânea ou Cartão de Crédito. Sem fidelidade, sem contrato de carência e você pode cancelar quando quiser sem multas.",
          },
        },
        {
          "@type": "Question",
          name: "Qual é a velocidade de internet recomendada?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Para transmissões em HD e Full HD recomendamos a partir de 10 Mega. Para conteúdos em 4K Ultra HD ao vivo, recomendamos a partir de 15 Mega de velocidade.",
          },
        },
        {
          "@type": "Question",
          name: "O que está incluído na lista de conteúdos?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Acesso a mais de 60.000 títulos incluindo lançamentos de cinema, séries atualizadas diariamente, canais abertos e fechados em 4K, além de todos os campeonatos de Futebol ao Vivo (Brasileirão, Champions, Libertadores, etc).",
          },
        },
        {
          "@type": "Question",
          name: "Como funcionam os pacotes opcionais (CristoFlix e Adulto VIP)?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No momento da assinatura você pode personalizar seu plano adicionando o CristoFlix Infantil (conteúdo bíblico e educativo para crianças) ou o Conteúdo Adulto VIP (Privacy/OnlyFans). Todos são 100% opcionais.",
          },
        },
        {
          "@type": "Question",
          name: "Preciso de ajuda técnica para instalar?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Não! Nosso suporte oferece tutoriais em vídeo simplificados para instalar em qualquer aparelho em menos de 3 minutos. Se precisar de ajuda, nosso atendimento no WhatsApp responde rapidamente.",
          },
        },
        {
          "@type": "Question",
          name: "Posso usar a mesma conta em mais de uma TV?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sim! No checkout você pode adicionar conexões simultâneas (Telas Extras) pelo valor de apenas R$ 5,90 por tela adicional para toda a família assistir ao mesmo tempo.",
          },
        },
      ],
    };

    return {
      meta: [
        { title: "DezPila — Streaming Ilimitado & Canais 4K por R$10/mês" },
        {
          name: "description",
          content:
            "Tenha acesso a mais de 2.000 canais, Netflix, Disney+, HBO Max e futebol ao vivo em 4K por apenas R$10/mês. Qualidade, estabilidade e liberação imediata via PIX.",
        },
        { property: "og:title", content: "DezPila — Streaming Ilimitado & Canais 4K" },
        {
          property: "og:description",
          content: "+2.000 canais e 60.000 conteúdos em 4K por apenas R$10/mês. Sem fidelidade.",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://oficialdezpila.lovable.app/" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: "https://oficialdezpila.lovable.app/" }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(faqSchema),
        },
      ],
    };
  },
});

function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="relative z-50">
        <TopBanner />
        <NavbarGlassFixa />
      </header>
      <main id="main-content" className="flex-1">
        <HeroSection />
        <Reveal>
          <VideoShowcase />
        </Reveal>
        <Reveal>
          <DeviceCompatibility />
        </Reveal>
        <Reveal>
          <ContentSection />
        </Reveal>
        <Reveal>
          <PriceComparison />
        </Reveal>
        <Reveal>
          <PrecoTrioDark />
        </Reveal>
        <Reveal>
          <MarqueeDepoimentos />
        </Reveal>
        <Reveal>
          <FAQSection />
        </Reveal>
      </main>
      <Footer />
      <SocialProofToasts />
      <StickyBottomBar />
      <ExitIntentModal />
    </div>
  );
}

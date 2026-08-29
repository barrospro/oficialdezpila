import { createFileRoute } from "@tanstack/react-router";
import { TopBanner } from "@/components/TopBanner";
import { HeroSection } from "@/components/HeroSection";
import { ContentSection } from "@/components/ContentSection";
import { PriceComparison } from "@/components/PriceComparison";
import { PricingPlans } from "@/components/PricingPlans";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { SocialProofToasts } from "@/components/SocialProofToasts";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "DezPila - Conteúdo Ilimitado Por Um Valor Que Cabe No Seu Bolso" },
      {
        name: "description",
        content:
          "Tenha acesso a mais de 2 mil canais, Netflix, Disney+, HBO Max e mais por apenas R$10/mês. Qualidade, estabilidade e suporte dedicado.",
      },
      { property: "og:title", content: "DezPila - Streaming Ilimitado" },
      {
        property: "og:description",
        content: "+2.000 canais e 60.000 conteúdos por apenas R$10/mês",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://oficialdezpila.lovable.app/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://oficialdezpila.lovable.app/" }],
  }),
});

function Index() {
  return (
    <div className="min-h-screen">
      <TopBanner />
      <HeroSection />
      <Reveal>
        <ContentSection />
      </Reveal>
      <Reveal>
        <PriceComparison />
      </Reveal>
      <Reveal>
        <PricingPlans />
      </Reveal>
      <Reveal>
        <TestimonialsSection />
      </Reveal>
      <Reveal>
        <FAQSection />
      </Reveal>
      <Footer />
      <SocialProofToasts />
    </div>
  );
}

import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => {
    const jsonLdWebsite = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "DezPila",
      url: "https://oficialdezpila.lovable.app/",
      description:
        "Streaming Ilimitado por R$10/mês com +2.000 canais ao vivo e mais de 60.000 conteúdos em 4K Ultra HD.",
      inLanguage: "pt-BR",
    };

    const jsonLdOrg = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "DezPila",
      url: "https://oficialdezpila.lovable.app/",
      logo: "https://oficialdezpila.lovable.app/brand/logo_dezpila_official.png",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Customer Support",
        email: "suporte@DezPila.com.br",
        availableLanguage: "Portuguese",
      },
    };

    const jsonLdProduct = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Assinatura DezPila Streaming 4K",
      image:
        "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/a67c200d-b885-4e47-8238-f45b23006116/id-preview-5f25eb4c--b79df9fc-d6af-4585-aafc-8762a17c8993.lovable.app-1777662804757.png",
      description:
        "Acesso a +2.000 canais ao vivo, filmes, séries e futebol ao vivo em qualidade 4K Ultra HD por apenas R$10/mês.",
      brand: {
        "@type": "Brand",
        name: "DezPila",
      },
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "BRL",
        lowPrice: "10.00",
        highPrice: "47.90",
        offerCount: "4",
        offers: [
          {
            "@type": "Offer",
            name: "Starter Mensal",
            price: "10.00",
            priceCurrency: "BRL",
            availability: "https://schema.org/InStock",
            url: "https://oficialdezpila.lovable.app/#planos",
          },
          {
            "@type": "Offer",
            name: "Plus Trimestral",
            price: "19.90",
            priceCurrency: "BRL",
            availability: "https://schema.org/InStock",
            url: "https://oficialdezpila.lovable.app/#planos",
          },
          {
            "@type": "Offer",
            name: "Pro Semestral",
            price: "29.90",
            priceCurrency: "BRL",
            availability: "https://schema.org/InStock",
            url: "https://oficialdezpila.lovable.app/#planos",
          },
          {
            "@type": "Offer",
            name: "VIP Anual",
            price: "47.90",
            priceCurrency: "BRL",
            availability: "https://schema.org/InStock",
            url: "https://oficialdezpila.lovable.app/#planos",
          },
        ],
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "1420",
        bestRating: "5",
        worstRating: "1",
      },
    };

    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=5" },
        { title: "DezPila — Streaming Ilimitado & +2.000 Canais 4K por R$10/mês" },
        {
          name: "description",
          content:
            "Acesse +2.000 canais, filmes, séries, Netflix, Disney+, HBO Max e esportes ao vivo em 4K por apenas R$10/mês. Liberação imediata via PIX sem travamentos.",
        },
        {
          name: "keywords",
          content:
            "streaming ilimitado, canais 4k, filmes e series, futebol ao vivo, premiere, smart tv, netflix disney hbo, dezpila, iptv seguro, iptv sem travar, assistir futebol ao vivo",
        },
        { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
        { name: "author", content: "DezPila Oficial" },
        { name: "theme-color", content: "#970202" },
        { property: "og:site_name", content: "DezPila Streaming" },
        { property: "og:title", content: "DezPila — Streaming Ilimitado & +2.000 Canais 4K por R$10/mês" },
        {
          property: "og:description",
          content:
            "+2.000 canais ao vivo, filmes, séries e 60.000 conteúdos em 4K por apenas R$10/mês. Liberação imediata via PIX.",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://oficialdezpila.lovable.app/" },
        { property: "og:locale", content: "pt_BR" },
        {
          property: "og:image",
          content:
            "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/a67c200d-b885-4e47-8238-f45b23006116/id-preview-5f25eb4c--b79df9fc-d6af-4585-aafc-8762a17c8993.lovable.app-1777662804757.png",
        },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:alt", content: "DezPila Streaming Ilimitado em 4K" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "DezPila — Streaming Ilimitado & +2.000 Canais 4K por R$10/mês" },
        {
          name: "twitter:description",
          content:
            "+2.000 canais e 60.000 conteúdos em 4K por apenas R$10/mês. Liberação imediata via PIX sem carência.",
        },
        {
          name: "twitter:image",
          content:
            "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/a67c200d-b885-4e47-8238-f45b23006116/id-preview-5f25eb4c--b79df9fc-d6af-4585-aafc-8762a17c8993.lovable.app-1777662804757.png",
        },
      ],
      links: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "canonical", href: "https://oficialdezpila.lovable.app/" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700;800&display=swap",
        },
        {
          rel: "stylesheet",
          href: appCss,
        },
      ],
      scripts: [
        {
          src: "https://www.googletagmanager.com/gtag/js?id=G-YRXRHV5EZC",
          async: true,
        },
        {
          children: `window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-YRXRHV5EZC');`,
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(jsonLdWebsite),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(jsonLdOrg),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(jsonLdProduct),
        },
      ],
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}

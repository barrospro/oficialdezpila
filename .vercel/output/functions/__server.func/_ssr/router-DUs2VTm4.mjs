import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { c as createRouter, u as useRouter, a as createRootRoute, b as createFileRoute, l as lazyRouteComponent, H as HeadContent, S as Scripts, O as Outlet, L as Link } from "../_libs/tanstack__react-router.mjs";
import { A as Analytics } from "../_libs/vercel__analytics.mjs";
import { S as SpeedInsights } from "../_libs/vercel__speed-insights.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
function AntiCloneShield() {
  reactExports.useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      const bannerStyleTitle = "color: #970202; font-size: 22px; font-weight: 900;";
      const bannerStyleBody = "color: #e2e8f0; font-size: 12px; font-family: monospace;";
      console.log("%c🛑 ACESSO RESTRITO // DEZPILA SECURITY", bannerStyleTitle);
      console.log(
        "%cEste sistema, código, design e marca são protegidos por direitos autorais.\nA cópia ou engenharia reversa não autorizada acarretará em medidas legais.",
        bannerStyleBody
      );
      const isMobile = window.innerWidth < 1024 || "ontouchstart" in window;
      if (isMobile) {
        return;
      }
      const handleKeyDown = (e) => {
        if (e.key === "F12" || e.keyCode === 123) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && ["I", "i", "J", "j", "C", "c"].includes(e.key)) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
        if ((e.ctrlKey || e.metaKey) && ["U", "u"].includes(e.key)) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
        if ((e.ctrlKey || e.metaKey) && ["S", "s"].includes(e.key)) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      };
      const handleContextMenu = (e) => {
        const target = e.target;
        if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) {
          return;
        }
        e.preventDefault();
      };
      const handleDragStart = (e) => {
        e.preventDefault();
      };
      window.addEventListener("keydown", handleKeyDown, { capture: true });
      window.addEventListener("contextmenu", handleContextMenu);
      window.addEventListener("dragstart", handleDragStart);
      return () => {
        window.removeEventListener("keydown", handleKeyDown, { capture: true });
        window.removeEventListener("contextmenu", handleContextMenu);
        window.removeEventListener("dragstart", handleDragStart);
      };
    } catch {
    }
  }, []);
  return null;
}
const appCss = "/assets/styles-B_fu6551.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
const Route$9 = createRootRoute({
  head: () => {
    const jsonLdWebsite = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "DezPila",
      url: "https://oficialdezpila.lovable.app/",
      description: "Streaming Ilimitado por R$10/mês com +2.000 canais ao vivo e mais de 60.000 conteúdos em 4K Ultra HD.",
      inLanguage: "pt-BR"
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
        availableLanguage: "Portuguese"
      }
    };
    const jsonLdProduct = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Assinatura DezPila Streaming 4K",
      image: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/a67c200d-b885-4e47-8238-f45b23006116/id-preview-5f25eb4c--b79df9fc-d6af-4585-aafc-8762a17c8993.lovable.app-1777662804757.png",
      description: "Acesso a +2.000 canais ao vivo, filmes, séries e futebol ao vivo em qualidade 4K Ultra HD por apenas R$10/mês.",
      brand: {
        "@type": "Brand",
        name: "DezPila"
      },
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "BRL",
        lowPrice: "10.00",
        highPrice: "73.90",
        offerCount: "4",
        offers: [
          {
            "@type": "Offer",
            name: "Starter Mensal",
            price: "10.00",
            priceCurrency: "BRL",
            availability: "https://schema.org/InStock",
            url: "https://oficialdezpila.lovable.app/#planos"
          },
          {
            "@type": "Offer",
            name: "Plus Trimestral",
            price: "24.90",
            priceCurrency: "BRL",
            availability: "https://schema.org/InStock",
            url: "https://oficialdezpila.lovable.app/#planos"
          },
          {
            "@type": "Offer",
            name: "Pro Semestral",
            price: "47.90",
            priceCurrency: "BRL",
            availability: "https://schema.org/InStock",
            url: "https://oficialdezpila.lovable.app/#planos"
          },
          {
            "@type": "Offer",
            name: "VIP Anual",
            price: "73.90",
            priceCurrency: "BRL",
            availability: "https://schema.org/InStock",
            url: "https://oficialdezpila.lovable.app/#planos"
          }
        ]
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "1420",
        bestRating: "5",
        worstRating: "1"
      }
    };
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=5" },
        { title: "DezPila — Streaming Ilimitado & +2.000 Canais 4K por R$10/mês" },
        {
          name: "description",
          content: "Acesse +2.000 canais, filmes, séries, Netflix, Disney+, HBO Max e esportes ao vivo em 4K por apenas R$10/mês. Liberação imediata via PIX sem travamentos."
        },
        {
          name: "keywords",
          content: "streaming ilimitado, canais 4k, filmes e series, futebol ao vivo, premiere, smart tv, netflix disney hbo, dezpila, iptv seguro, iptv sem travar, assistir futebol ao vivo"
        },
        { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
        { name: "author", content: "DezPila Oficial" },
        { name: "theme-color", content: "#970202" },
        { property: "og:site_name", content: "DezPila Streaming" },
        { property: "og:title", content: "DezPila — Streaming Ilimitado & +2.000 Canais 4K por R$10/mês" },
        {
          property: "og:description",
          content: "+2.000 canais ao vivo, filmes, séries e 60.000 conteúdos em 4K por apenas R$10/mês. Liberação imediata via PIX."
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://oficialdezpila.lovable.app/" },
        { property: "og:locale", content: "pt_BR" },
        {
          property: "og:image",
          content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/a67c200d-b885-4e47-8238-f45b23006116/id-preview-5f25eb4c--b79df9fc-d6af-4585-aafc-8762a17c8993.lovable.app-1777662804757.png"
        },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:alt", content: "DezPila Streaming Ilimitado em 4K" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "DezPila — Streaming Ilimitado & +2.000 Canais 4K por R$10/mês" },
        {
          name: "twitter:description",
          content: "+2.000 canais e 60.000 conteúdos em 4K por apenas R$10/mês. Liberação imediata via PIX sem carência."
        },
        {
          name: "twitter:image",
          content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/a67c200d-b885-4e47-8238-f45b23006116/id-preview-5f25eb4c--b79df9fc-d6af-4585-aafc-8762a17c8993.lovable.app-1777662804757.png"
        }
      ],
      links: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "canonical", href: "https://oficialdezpila.lovable.app/" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700;800&display=swap"
        },
        {
          rel: "stylesheet",
          href: appCss
        }
      ],
      scripts: [
        {
          src: "https://www.googletagmanager.com/gtag/js?id=G-YRXRHV5EZC",
          async: true
        },
        {
          children: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-YRXRHV5EZC');`
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(jsonLdWebsite)
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(jsonLdOrg)
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(jsonLdProduct)
        }
      ]
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "pt-BR", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Analytics, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SpeedInsights, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AntiCloneShield, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {})
  ] });
}
const $$splitComponentImporter$8 = () => import("./mockups-BSYfonZ8.mjs");
const Route$8 = createFileRoute("/mockups")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component"),
  head: () => ({
    meta: [{
      name: "robots",
      content: "noindex, nofollow"
    }]
  })
});
const $$splitComponentImporter$7 = () => import("./design-system-COznWAoU.mjs");
const Route$7 = createFileRoute("/design-system")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component"),
  head: () => ({
    meta: [{
      name: "robots",
      content: "noindex, nofollow"
    }]
  })
});
const $$splitComponentImporter$6 = () => import("./admin-C2xy7Iwi.mjs");
const Route$6 = createFileRoute("/admin")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component"),
  head: () => ({
    meta: [{
      title: "Painel Administrativo — DezPila Marketing & Criativos"
    }, {
      name: "robots",
      content: "noindex, nofollow"
    }]
  })
});
const $$splitComponentImporter$5 = () => import("./index-BbhcwE5e.mjs");
const Route$5 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component"),
  head: () => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [{
        "@type": "Question",
        name: "Como recebo o meu acesso após o pagamento?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "O envio dos seus dados de login e o passo a passo de configuração são disparados automaticamente no seu WhatsApp e E-mail em menos de 2 minutos após a confirmação do PIX."
        }
      }, {
        "@type": "Question",
        name: "Funciona em quais aparelhos?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Em absolutamente todos! Smart TVs (Samsung, LG, TCL, Android TV), Celulares (Android e iOS), TV Box, Chromecast, Fire TV Stick, Computadores e Tablets."
        }
      }, {
        "@type": "Question",
        name: "O pagamento é seguro e sem fidelidade?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Totalmente seguro! Pagamento processado via PIX com aprovação instantânea. Sem fidelidade, sem contrato de carência e você pode cancelar quando quiser sem multas."
        }
      }, {
        "@type": "Question",
        name: "Qual é a velocidade de internet recomendada?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Para transmissões em HD e Full HD recomendamos a partir de 10 Mega. Para conteúdos em 4K Ultra HD ao vivo, recomendamos a partir de 15 Mega de velocidade."
        }
      }, {
        "@type": "Question",
        name: "O que está incluído na lista de conteúdos?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Acesso a mais de 60.000 títulos incluindo lançamentos de cinema, séries atualizadas diariamente, canais abertos e fechados em 4K, além de todos os campeonatos de Futebol ao Vivo (Brasileirão, Champions, Libertadores, etc)."
        }
      }, {
        "@type": "Question",
        name: "Como funcionam os pacotes opcionais (CristoFlix e Adulto VIP)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No momento da assinatura você pode personalizar seu plano adicionando o CristoFlix Infantil (conteúdo bíblico e educativo para crianças) ou o Conteúdo Adulto VIP (Privacy/OnlyFans). Todos são 100% opcionais."
        }
      }, {
        "@type": "Question",
        name: "Preciso de ajuda técnica para instalar?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Não! Nosso suporte oferece tutoriais em vídeo simplificados para instalar em qualquer aparelho em menos de 3 minutos. Se precisar de ajuda, nosso atendimento no WhatsApp responde rapidamente."
        }
      }, {
        "@type": "Question",
        name: "Posso usar a mesma conta em mais de uma TV?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sim! No checkout você pode adicionar conexões simultâneas (Telas Extras) pelo valor de apenas R$ 5,90 por tela adicional para toda a família assistir ao mesmo tempo."
        }
      }]
    };
    return {
      meta: [{
        title: "DezPila — Streaming Ilimitado & Canais 4K por R$10/mês"
      }, {
        name: "description",
        content: "Tenha acesso a mais de 2.000 canais, Netflix, Disney+, HBO Max e futebol ao vivo em 4K por apenas R$10/mês. Qualidade, estabilidade e liberação imediata via PIX."
      }, {
        property: "og:title",
        content: "DezPila — Streaming Ilimitado & Canais 4K"
      }, {
        property: "og:description",
        content: "+2.000 canais e 60.000 conteúdos em 4K por apenas R$10/mês. Sem fidelidade."
      }, {
        property: "og:type",
        content: "website"
      }, {
        property: "og:url",
        content: "https://oficialdezpila.lovable.app/"
      }, {
        name: "twitter:card",
        content: "summary_large_image"
      }],
      links: [{
        rel: "canonical",
        href: "https://oficialdezpila.lovable.app/"
      }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify(faqSchema)
      }]
    };
  }
});
const $$splitComponentImporter$4 = () => import("./index-BmWhT62P.mjs");
const Route$4 = createFileRoute("/shop/")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component"),
  head: () => ({
    meta: [{
      title: "Loja DezPila — Acessórios para TV & Cinema em Casa"
    }, {
      name: "description",
      content: "Compre acessórios para sua Smart TV, controles universais, cabos HDMI 8K, soundbars e kits de pipoca para sua noite de filmes. Frete Grátis acima de R$ 150!"
    }]
  })
});
const $$splitComponentImporter$3 = () => import("./checkout-B4tWyx2f.mjs");
const Route$3 = createFileRoute("/shop/checkout")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component"),
  head: () => ({
    meta: [{
      title: "Checkout Seguro — Loja DezPila"
    }]
  })
});
const $$splitComponentImporter$2 = () => import("./carrinho-C6dUME-L.mjs");
const Route$2 = createFileRoute("/shop/carrinho")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component"),
  head: () => ({
    meta: [{
      title: "Seu Carrinho — Loja DezPila"
    }]
  })
});
const $$splitComponentImporter$1 = () => import("../_productId-ChDAoZ6J.mjs");
const Route$1 = createFileRoute("/shop/$productId")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./pedido._orderId-Sx69Rm8w.mjs");
const Route = createFileRoute("/shop/pedido/$orderId")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const MockupsRoute = Route$8.update({
  id: "/mockups",
  path: "/mockups",
  getParentRoute: () => Route$9
});
const DesignSystemRoute = Route$7.update({
  id: "/design-system",
  path: "/design-system",
  getParentRoute: () => Route$9
});
const AdminRoute = Route$6.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$9
});
const IndexRoute = Route$5.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$9
});
const ShopIndexRoute = Route$4.update({
  id: "/shop/",
  path: "/shop/",
  getParentRoute: () => Route$9
});
const ShopCheckoutRoute = Route$3.update({
  id: "/shop/checkout",
  path: "/shop/checkout",
  getParentRoute: () => Route$9
});
const ShopCarrinhoRoute = Route$2.update({
  id: "/shop/carrinho",
  path: "/shop/carrinho",
  getParentRoute: () => Route$9
});
const ShopProductIdRoute = Route$1.update({
  id: "/shop/$productId",
  path: "/shop/$productId",
  getParentRoute: () => Route$9
});
const ShopPedidoOrderIdRoute = Route.update({
  id: "/shop/pedido/$orderId",
  path: "/shop/pedido/$orderId",
  getParentRoute: () => Route$9
});
const rootRouteChildren = {
  IndexRoute,
  AdminRoute,
  DesignSystemRoute,
  MockupsRoute,
  ShopProductIdRoute,
  ShopCarrinhoRoute,
  ShopCheckoutRoute,
  ShopIndexRoute,
  ShopPedidoOrderIdRoute
};
const routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
function DefaultErrorComponent({ error, reset }) {
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        className: "h-8 w-8 text-destructive",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight text-foreground", children: "Something went wrong" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "An unexpected error occurred. Please try again." }),
    false,
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center justify-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const getRouter = () => {
  const router2 = createRouter({
    routeTree,
    context: {},
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: DefaultErrorComponent
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$1 as R,
  Route as a,
  router as r
};

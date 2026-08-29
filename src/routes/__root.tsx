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
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "DezPila — Streaming Ilimitado por R$10/mês" },
      { name: "description", content: "Acesse +2.000 canais, Netflix, Disney+, HBO Max e 60.000 conteúdos em 4K por apenas R$10/mês. Liberação imediata via PIX." },
      { property: "og:title", content: "DezPila — Streaming Ilimitado por R$10/mês" },
      { property: "og:description", content: "+2.000 canais e 60.000 conteúdos em 4K por apenas R$10/mês. Liberação imediata via PIX." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "DezPila" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "DezPila — Streaming Ilimitado por R$10/mês" },
      { name: "twitter:description", content: "+2.000 canais e 60.000 conteúdos em 4K por apenas R$10/mês. Liberação imediata via PIX." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/a67c200d-b885-4e47-8238-f45b23006116/id-preview-5f25eb4c--b79df9fc-d6af-4585-aafc-8762a17c8993.lovable.app-1777662804757.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/a67c200d-b885-4e47-8238-f45b23006116/id-preview-5f25eb4c--b79df9fc-d6af-4585-aafc-8762a17c8993.lovable.app-1777662804757.png" },
    ],
    links: [
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
  }),
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

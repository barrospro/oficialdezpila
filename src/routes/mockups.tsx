import { createFileRoute } from "@tanstack/react-router";
import { TopBanner } from "@/components/TopBanner";
import { HeroSection } from "@/components/HeroSection";
import { ContentSection } from "@/components/ContentSection";
import { PricingPlans } from "@/components/PricingPlans";
import { Check, Monitor, Smartphone, Laptop, Tablet } from "lucide-react";

export const Route = createFileRoute("/mockups")({
  component: MockupsPage,
  head: () => ({
    meta: [{ name: "robots", content: "noindex, nofollow" }],
  }),
});

function MockupsPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-16">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-900">Showcase de Mockups</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Visualização do projeto em diferentes dispositivos e contextos de apresentação.
          </p>
        </header>

        {/* Laptop Mockup Section */}
        <section className="space-y-8">
          <div className="flex items-center gap-2 border-b pb-2">
            <Monitor className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-semibold text-slate-800">Desktop / Laptop View</h2>
          </div>

          <div className="relative mx-auto max-w-[900px]">
            {/* MacBook-style Frame */}
            <div className="relative bg-slate-800 rounded-t-xl p-2 pb-0 shadow-2xl border-x-4 border-t-4 border-slate-700">
              <div className="bg-white rounded-t-sm overflow-hidden aspect-video border shadow-inner">
                <div className="h-full overflow-y-auto overflow-x-hidden scrollbar-hide scale-[0.85] origin-top">
                  <div className="bg-black min-h-full">
                    <TopBanner />
                    <HeroSection />
                    <ContentSection />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-slate-700 h-4 w-full rounded-b-xl relative shadow-lg">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-slate-600 rounded-b-md"></div>
            </div>
          </div>
        </section>

        {/* Mobile & Tablet Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Mobile Mockup */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b pb-2">
              <Smartphone className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-slate-800">Mobile View (iPhone)</h2>
            </div>

            <div className="relative mx-auto w-[280px] h-[580px] bg-slate-900 rounded-[3rem] p-3 shadow-2xl border-[6px] border-slate-800">
              {/* Screen Content */}
              <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden border border-slate-700 relative">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-slate-900 rounded-b-2xl z-10 flex justify-center items-end pb-1">
                  <div className="w-2 h-2 rounded-full bg-slate-800 mr-2"></div>
                  <div className="w-8 h-1 rounded-full bg-slate-800"></div>
                </div>

                <div className="h-full overflow-y-auto scrollbar-hide pt-4">
                  <div className="scale-[0.5] origin-top w-[200%] -ml-[50%]">
                    <HeroSection />
                    <PricingPlans />
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="absolute -left-1.5 top-24 w-1.5 h-12 bg-slate-800 rounded-l-md"></div>
              <div className="absolute -left-1.5 top-40 w-1.5 h-20 bg-slate-800 rounded-l-md"></div>
              <div className="absolute -right-1.5 top-32 w-1.5 h-24 bg-slate-800 rounded-r-md"></div>
            </div>
          </div>

          {/* Tablet/Card Mockup */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b pb-2">
              <Tablet className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-slate-800">Tablet Preview</h2>
            </div>

            <div className="relative mx-auto w-[400px] h-[540px] bg-slate-900 rounded-3xl p-4 shadow-2xl border-[8px] border-slate-800">
              <div className="w-full h-full bg-black rounded-xl overflow-hidden border border-slate-700">
                <div className="h-full overflow-y-auto scrollbar-hide p-4">
                  <div className="scale-[0.6] origin-top">
                    <PricingPlans />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Shot Grid */}
        <section className="space-y-8">
          <div className="flex items-center gap-2 border-b pb-2">
            <Check className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-semibold text-slate-800">Product Shots / Screenshots</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature Shot 1 */}
            <div className="group relative overflow-hidden rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-square bg-black overflow-hidden p-4">
                <div className="scale-[0.4] origin-top-left">
                  <HeroSection />
                </div>
              </div>
              <div className="p-4 border-t">
                <h3 className="font-medium">Hero Section Shot</h3>
                <p className="text-xs text-slate-500">Ideal para redes sociais e ads.</p>
              </div>
            </div>

            {/* Feature Shot 2 */}
            <div className="group relative overflow-hidden rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-square bg-black overflow-hidden p-4">
                <div className="scale-[0.4] origin-top-left">
                  <PricingPlans />
                </div>
              </div>
              <div className="p-4 border-t">
                <h3 className="font-medium">Pricing Plans Shot</h3>
                <p className="text-xs text-slate-500">Destaque de conversão.</p>
              </div>
            </div>

            {/* Feature Shot 3 */}
            <div className="group relative overflow-hidden rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-square bg-black overflow-hidden p-4 flex items-center justify-center">
                <div className="text-center text-white p-8 border-2 border-dashed border-slate-700 rounded-lg">
                  <p className="text-sm italic opacity-50">Capture Manual via Browser</p>
                  <p className="text-xs mt-2">Use Win+Shift+S ou Cmd+Shift+4</p>
                </div>
              </div>
              <div className="p-4 border-t">
                <h3 className="font-medium">Custom Capture Area</h3>
                <p className="text-xs text-slate-500">Área pronta para exportação manual.</p>
              </div>
            </div>
          </div>
        </section>

        <footer className="bg-slate-900 text-white p-8 rounded-2xl text-center space-y-4">
          <h2 className="text-xl font-semibold">Como exportar em PNG?</h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Embora eu não consiga gerar o arquivo .png diretamente para download via chat, você pode
            usar a ferramenta de captura do seu sistema nestas seções preparadas para obter mockups
            com qualidade profissional.
          </p>
          <div className="flex justify-center gap-4 text-xs font-mono">
            <span className="bg-slate-800 px-3 py-1 rounded">macOS: Cmd + Shift + 4</span>
            <span className="bg-slate-800 px-3 py-1 rounded">Windows: Win + Shift + S</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { p as plans, f as features } from "./plans-data-Bomcg8wQ.mjs";
import { C as Check } from "../_libs/lucide-react.mjs";
function DesignSystem() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background text-foreground p-8 font-body", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto space-y-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "border-b border-white/10 pb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-heading font-bold uppercase tracking-tighter", children: "Design System & Mockup Showcase" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2", children: "Visão geral dos componentes e identidade visual do projeto DezPila." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-heading font-bold mb-6 uppercase", children: "Identidade Visual" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 bg-primary rounded-lg shadow-[0_0_20px_var(--brand-glow)]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-mono uppercase", children: "Primary / Brand" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 bg-background border border-white/10 rounded-lg" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-mono uppercase", children: "Background" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 bg-surface border border-white/10 rounded-lg" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-mono uppercase", children: "Surface / Card" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 bg-foreground rounded-lg" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-mono uppercase", children: "Foreground" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid md:grid-cols-2 gap-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-heading font-bold mb-6 uppercase", children: "Tipografia" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-5xl font-heading font-bold uppercase leading-none", children: "Headline H1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-heading font-bold uppercase leading-none", children: "Headline H2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-body", children: "Corpo de texto: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-mono text-muted-foreground", children: "Mono: System Diagnostics Active..." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-heading font-bold mb-6 uppercase", children: "Botões" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn-brand", children: "Escolher Plano" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn-brand-outline", children: "Saiba Mais" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-heading font-bold mb-6 uppercase", children: "Mockup: Plan Components" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-8", children: plans.slice(0, 3).map((plan) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: plan.id === "TRIMESTRAL" ? "card-surface-brand scale-105 z-10" : "card-surface", children: [
        plan.discount && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 right-4 bg-foreground text-background px-2 py-1 text-xs font-bold", children: plan.discount }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-heading font-bold mb-1 uppercase", children: plan.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-4 font-mono", children: plan.screens }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-1 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "R$" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl font-heading font-black", children: plan.price.split(",")[0] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xl font-heading", children: [
            ",",
            plan.price.split(",")[1]
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground ml-1", children: plan.period })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3 mb-8", children: features.slice(0, 5).map((feature, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-primary shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: feature })
        ] }, i)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: plan.id === "TRIMESTRAL" ? "btn-brand w-full" : "btn-brand-outline w-full", children: "Assinar Agora" })
      ] }, plan.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "pt-12 border-t border-white/10 text-center text-sm text-muted-foreground", children: "DezPila Mockup System • 2026" })
  ] }) });
}
export {
  DesignSystem as component
};

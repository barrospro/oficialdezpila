import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Garante o preset Nitro do Vercel Serverless Functions quando publicado no Vercel
process.env.NITRO_PRESET = process.env.NITRO_PRESET || "vercel";

export default defineConfig({
  vite: {
    build: {
      sourcemap: false,
    },
  },
});

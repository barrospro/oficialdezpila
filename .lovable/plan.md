## Apresentação de Portfólio: DezPila

Criar um documento de apresentação do projeto DezPila no mesmo formato da referência (Integralmedica CE) — estilo case de portfólio premium, com headline, subtítulo, descrição estratégica, lista de features e stack técnica.

### Formato de entrega
Vou gerar **dois formatos** para você escolher como usar:

1. **PDF de case (1 página landscape)** — pronto para enviar a clientes/portfólio, combinando o copywriting da apresentação com os mockups já gerados (`device-01-laptop-desk.png`, `device-03-multi-device.png`, `01-hero-crimson.png`).
2. **Markdown/texto puro** — para você copiar e colar em Behance, LinkedIn, Notion ou site de portfólio.

### Conteúdo proposto (copy)

**Categoria:** Plataforma de conversão e retenção  
**Nome do projeto:** DezPila

**Descrição estratégica:**
> Solução web desenvolvida para escalar a operação de streaming da DezPila, combinando design de alta conversão, copy persuasivo no estilo "underground tech" e uma arquitetura de pricing otimizada para reduzir fricção e maximizar o ticket médio por cliente.

**Features destacadas:**
- Interface premium com identidade visual crimson/noir
- Catálogo segmentado por categoria (+45K títulos, esportes ao vivo, animes, infantil)
- Comparativo de preços vs. concorrentes integrado
- Planos escaláveis (Mensal, Trimestral, Semestral, Anual) com checkout direto
- Prova social em tempo real (toasts de novos assinantes)
- FAQ estruturado para reduzir objeções de compra
- Banner promocional fixo com gatilho de urgência

**Stack técnica:**
`React` `TanStack Start` `TypeScript` `Tailwind CSS v4` `Framer Motion` `Lovable Cloud`

### Layout do PDF
```text
┌─────────────────────────────────────────────────────────┐
│  [device-01-laptop-desk.png — hero visual grande]      │
├─────────────────────────────────────────────────────────┤
│  MÁQUINA DE CONVERSÃO STREAMING                         │
│  DezPila                                                │
│                                                         │
│  [descrição estratégica]                                │
│                                                         │
│  ✓ Interface premium    ✓ Catálogo +45K                │
│  ✓ Pricing otimizado    ✓ Prova social ao vivo         │
│  ✓ FAQ anti-objeção     ✓ Checkout direto               │
│                                                         │
│  React · TanStack · TypeScript · Tailwind · Motion     │
└─────────────────────────────────────────────────────────┘
```

### Execução técnica
- Gerar o PDF via Python (ReportLab ou WeasyPrint) usando os mockups já existentes em `/mnt/documents/mockups/`.
- Salvar em `/mnt/documents/dezpila-case-portfolio.pdf` e `/mnt/documents/dezpila-case-portfolio.md`.
- QA visual: converter PDF para imagem e revisar antes de entregar.

### Dúvida rápida
Posso prosseguir com esse copy, ou você quer ajustar algum ponto (ex.: tom mais corporativo / esconder o nicho de streaming pirata e posicionar como "plataforma de entretenimento", trocar features, etc.)?
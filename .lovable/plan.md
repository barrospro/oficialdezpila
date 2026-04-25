## Plano: Mockups Profissionais do DezPila

### Ajuste de escopo
As seções listadas no pedido ("Sobre", "Serviços", "Projetos", "Calculadora") não existem neste projeto — o site é o DezPila (streaming). Vou mapear para as seções reais:

| Pedido original | Seção real do DezPila |
|---|---|
| Hero | HeroSection |
| Sobre | ContentSection ("Arsenal Completo") |
| Serviços | PriceComparison |
| Projetos | PricingPlans |
| Calculadora/Orçamento | TestimonialsSection |
| Footer | FAQSection + Footer |

### Etapas

**1. Preparar ambiente de captura**
- Confirmar que `#lovable-badge { display: none }` já está em `src/styles.css` (já foi adicionado em turno anterior).
- Criar `/mnt/documents/mockups/` como pasta de saída.

**2. Capturar screenshots reais via browser tool**
- Desktop 1366x768 (viewport suportado mais próximo de 1920x1080 — o tool faz snap), navegar para `/`, aguardar render, rolar até cada seção e fazer screenshot:
  - `01-hero.png`, `02-content.png`, `03-pricecomp.png`, `04-plans.png`, `05-testimonials.png`, `06-faq-footer.png`
- Mobile 390x844 (iPhone), repetir capturas das mesmas seções como `mobile-*.png`.
- Aguardar 1.5s após cada navegação/scroll para animações `Reveal` carregarem.

**3. Product shots desktop (frame macOS + gradiente mesh)**
- Usar o skill `product-shot` (`knowledge://skill/product-shot/generate.py`).
- Gerar 6 product shots desktop, alternando presets `crimson` ↔ `noir` (via `--gradient` custom já que não vêm nos presets default):
  - `--gradient "#9b1c1c,#4a0e0e"` (crimson)
  - `--gradient "#18181b,#09090b"` (noir)
- Padding 100px, corner-radius 12px, shadow blur 40 / opacity 70.
- Saídas: `01-hero-crimson.png`, `02-content-noir.png`, `03-pricecomp-crimson.png`, `04-plans-noir.png`, `05-testimonials-crimson.png`, `06-faq-noir.png`.

**4. Mockups mobile**
- Adaptar/estender o script para envelopar screenshots mobile com:
  - Cantos 40px, frame iPhone-like (notch sutil opcional), sombra suave, mesmo gradiente.
- Saídas: `mobile-01-hero.png`, `mobile-02-plans.png`, `mobile-03-faq.png`.

**5. Mockups fotorrealistas com IA (Nano Banana Pro)**
- Usar skill `ai-gateway` com `--edit-image` no modelo `google/gemini-3-pro-image-preview` para inserir o screenshot real dentro de cenas fotorrealistas.
- 3 entregas:
  - `device-01-laptop-desk.png` — MacBook Pro 16" em mesa de nogueira, luz natural.
  - `device-02-iphone-hand.png` — iPhone 15 Pro na mão, fundo de concreto minimalista.
  - `device-03-multi-device.png` — Pro Display XDR + iPhone, setup editorial.

**6. QA visual**
- Inspecionar cada PNG gerado, verificar recorte/layout/legibilidade, regerar se necessário.
- Listar todos os arquivos finais com tags `<lov-artifact>` para download.

### Detalhes técnicos
- Captura: `browser--navigate_to_sandbox` + `browser--set_viewport_size` + `browser--screenshot`. Viewport faz snap (1366x768 desktop, 390x844 mobile já são suportados).
- Composição: PIL via skill product-shot, copiado para `/tmp/generate.py` e estendido para variante mobile se necessário.
- IA imagens: `google/gemini-3-pro-image-preview` via `/tmp/lovable_ai.py --edit-image`.
- Saída final: `/mnt/documents/mockups/`.

### Pergunta antes de executar
Confirma o mapeamento de seções acima? (O site não tem "Sobre/Serviços/Projetos/Calculadora" — vou usar as seções reais do DezPila listadas na tabela.)
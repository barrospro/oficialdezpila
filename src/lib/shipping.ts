export interface CartItemInput {
  preco: number;
  quantidade: number;
}

export interface OrderSummary {
  subtotal: number;
  frete: number;
  total: number;
  freeShippingThreshold: number;
  freeShippingRemaining: number;
  hasFreeShipping: boolean;
}

export const FREE_SHIPPING_THRESHOLD = 150.0;
export const FIXED_SHIPPING_FEE = 9.9;

/**
 * Função pura para cálculo de frete e valores totais da loja.
 * - Frete fixo de R$ 9,90 por pedido.
 * - Frete grátis automático para compras com subtotal >= R$ 150,00.
 */
export function calculateOrderSummary(items: CartItemInput[]): OrderSummary {
  const subtotalRaw = items.reduce(
    (acc, item) => acc + (Number(item.preco) || 0) * (Number(item.quantidade) || 0),
    0
  );

  // Arredonda para 2 casas decimais para evitar imprecisões de ponto flutuante
  const subtotal = Math.round(subtotalRaw * 100) / 100;
  const hasFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const frete = items.length === 0 ? 0 : hasFreeShipping ? 0 : FIXED_SHIPPING_FEE;
  const total = Math.round((subtotal + frete) * 100) / 100;
  const freeShippingRemaining = Math.max(
    0,
    Math.round((FREE_SHIPPING_THRESHOLD - subtotal) * 100) / 100
  );

  return {
    subtotal,
    frete,
    total,
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
    freeShippingRemaining,
    hasFreeShipping,
  };
}

/**
 * Utilitário de formatação de moeda brasileira BRL
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

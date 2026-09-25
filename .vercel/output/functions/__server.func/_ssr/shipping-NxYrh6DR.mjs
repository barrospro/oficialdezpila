const FREE_SHIPPING_THRESHOLD = 150;
const FIXED_SHIPPING_FEE = 9.9;
function calculateOrderSummary(items) {
  const subtotalRaw = items.reduce(
    (acc, item) => acc + (Number(item.preco) || 0) * (Number(item.quantidade) || 0),
    0
  );
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
    hasFreeShipping
  };
}
function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(value);
}
export {
  FREE_SHIPPING_THRESHOLD as F,
  calculateOrderSummary as c,
  formatCurrency as f
};

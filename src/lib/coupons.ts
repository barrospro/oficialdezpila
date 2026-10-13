export interface Coupon {
  code: string;
  description: string;
  discountType: "percentage" | "fixed";
  discountValue: number; // Ex: 50 para 50%, ou valor em reais se fixed
  applicablePlans?: string[]; // IDs dos planos válidos, ex: ["ANUAL"]
  applicableToShop?: boolean; // Se vale para produtos da loja física
  active: boolean;
}

export const AVAILABLE_COUPONS: Coupon[] = [
  {
    code: "ANUAL50",
    description: "50% de Desconto no Plano VIP Anual",
    discountType: "percentage",
    discountValue: 50,
    applicablePlans: ["ANUAL"],
    applicableToShop: false,
    active: true,
  },
];

export interface CouponValidationResult {
  valid: boolean;
  coupon?: Coupon;
  discountAmount: number;
  finalPrice: number;
  error?: string;
  isPlanRestricted?: boolean;
}

/**
 * Valida e calcula o desconto de um cupom para um determinado plano.
 */
export function validateAndApplyCoupon(
  rawCode: string,
  planId: string,
  basePrice: number
): CouponValidationResult {
  const code = (rawCode || "").trim().toUpperCase();

  if (!code) {
    return {
      valid: false,
      discountAmount: 0,
      finalPrice: basePrice,
    };
  }

  const coupon = AVAILABLE_COUPONS.find(
    (c) => c.code.toUpperCase() === code && c.active
  );

  if (!coupon) {
    return {
      valid: false,
      discountAmount: 0,
      finalPrice: basePrice,
      error: "Cupom inválido ou expirado.",
    };
  }

  // Verifica restrição de planos
  if (coupon.applicablePlans && coupon.applicablePlans.length > 0) {
    const isPlanApplicable = coupon.applicablePlans.some(
      (p) => p.toUpperCase() === planId.toUpperCase()
    );

    if (!isPlanApplicable) {
      const planNames = coupon.applicablePlans
        .map((p) => (p.toUpperCase() === "ANUAL" ? "VIP Anual" : p))
        .join(", ");

      return {
        valid: false,
        discountAmount: 0,
        finalPrice: basePrice,
        error: `O cupom ${coupon.code} é válido exclusivamente para o Plano ${planNames}.`,
        isPlanRestricted: true,
      };
    }
  }

  // Cálculo do desconto
  let discountAmount = 0;
  if (coupon.discountType === "percentage") {
    discountAmount = (basePrice * coupon.discountValue) / 100;
  } else {
    discountAmount = Math.min(coupon.discountValue, basePrice);
  }

  // Arredonda para 2 casas decimais
  discountAmount = Math.round(discountAmount * 100) / 100;
  const finalPrice = Math.max(0, Math.round((basePrice - discountAmount) * 100) / 100);

  return {
    valid: true,
    coupon,
    discountAmount,
    finalPrice,
  };
}

/**
 * Formata valor numérico em moeda brasileira (R$ 00,00)
 */
export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

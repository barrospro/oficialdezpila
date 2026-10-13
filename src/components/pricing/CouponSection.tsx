import { useState, useEffect } from "react";
import { Tag, CheckCircle2, AlertCircle, X, Sparkles, ArrowRight } from "lucide-react";
import { Coupon, validateAndApplyCoupon, formatBRL } from "@/lib/coupons";

interface CouponSectionProps {
  planId: string;
  basePrice: number;
  appliedCoupon: Coupon | null;
  discountAmount: number;
  onApply: (coupon: Coupon, discount: number) => void;
  onRemove: () => void;
  onSwitchToAnnual?: () => void;
  compact?: boolean;
}

export function CouponSection({
  planId,
  basePrice,
  appliedCoupon,
  discountAmount,
  onApply,
  onRemove,
  onSwitchToAnnual,
  compact = false,
}: CouponSectionProps) {
  const [inputCode, setInputCode] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isRestricted, setIsRestricted] = useState(false);

  // Se o plano mudar enquanto há cupom aplicado, revalida
  useEffect(() => {
    if (appliedCoupon) {
      const res = validateAndApplyCoupon(appliedCoupon.code, planId, basePrice);
      if (!res.valid) {
        onRemove();
        setErrorMessage(res.error || null);
        setIsRestricted(Boolean(res.isPlanRestricted));
      } else {
        // Atualiza valor do desconto caso o basePrice tenha mudado
        onApply(res.coupon!, res.discountAmount);
      }
    }
  }, [planId, basePrice]);

  const handleApply = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);
    setIsRestricted(false);

    if (!inputCode.trim()) {
      setErrorMessage("Digite o código do cupom.");
      return;
    }

    const res = validateAndApplyCoupon(inputCode, planId, basePrice);

    if (res.valid && res.coupon) {
      onApply(res.coupon, res.discountAmount);
      setInputCode("");
      setErrorMessage(null);
      setIsRestricted(false);
    } else {
      setErrorMessage(res.error || "Cupom inválido.");
      setIsRestricted(Boolean(res.isPlanRestricted));
    }
  };

  const handleRemove = () => {
    onRemove();
    setErrorMessage(null);
    setIsRestricted(false);
  };

  if (appliedCoupon) {
    return (
      <div className="w-full rounded-2xl bg-emerald-50/90 border border-emerald-200 p-3 my-2.5 transition-all">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-600 text-white shrink-0 shadow-xs">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-code text-xs font-extrabold uppercase tracking-wider text-emerald-950">
                  {appliedCoupon.code}
                </span>
                <span className="rounded-md bg-emerald-600/15 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800">
                  {appliedCoupon.discountValue}% OFF
                </span>
              </div>
              <p className="text-[11px] text-emerald-700 font-body truncate">
                {appliedCoupon.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="font-code text-xs font-bold text-emerald-800">
              - R$ {formatBRL(discountAmount)}
            </span>
            <button
              type="button"
              onClick={handleRemove}
              className="p-1 rounded-lg text-emerald-600 hover:text-emerald-900 hover:bg-emerald-100 transition-colors cursor-pointer"
              title="Remover cupom"
              aria-label="Remover cupom"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full my-2.5">
      <form onSubmit={handleApply} className="flex gap-2 items-center">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <Tag className="h-3.5 w-3.5" />
          </div>
          <input
            type="text"
            value={inputCode}
            onChange={(e) => {
              setInputCode(e.target.value.toUpperCase());
              if (errorMessage) {
                setErrorMessage(null);
                setIsRestricted(false);
              }
            }}
            placeholder="Possui cupom? Ex: ANUAL50"
            className="w-full rounded-xl border border-[#D0D5DD] bg-[#F2F4F7] py-2 pl-9 pr-3 text-xs font-code uppercase text-slate-900 placeholder:normal-case placeholder:font-body placeholder:text-slate-400 outline-none focus:bg-white focus:border-[#009EE3] focus:ring-2 focus:ring-[#009EE3]/25 transition-all"
          />
        </div>
        <button
          type="submit"
          className="rounded-xl bg-slate-900 hover:bg-slate-800 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-white transition-all cursor-pointer shadow-xs active:scale-95 shrink-0 font-heading"
        >
          Aplicar
        </button>
      </form>

      {/* Alerta de Erro ou Restrição de Plano */}
      {errorMessage && (
        <div className="mt-2 rounded-xl bg-amber-50/90 border border-amber-200/90 p-2.5 text-xs text-amber-900 flex flex-col gap-1.5 animate-in fade-in duration-150">
          <div className="flex items-start gap-1.5">
            <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <span className="text-[11px] font-medium leading-snug">{errorMessage}</span>
          </div>

          {isRestricted && onSwitchToAnnual && planId.toUpperCase() !== "ANUAL" && (
            <button
              type="button"
              onClick={() => {
                setErrorMessage(null);
                setIsRestricted(false);
                onSwitchToAnnual();
              }}
              className="mt-1 flex items-center justify-center gap-1.5 w-full rounded-lg bg-amber-600 hover:bg-amber-700 py-1.5 px-3 text-[11px] font-bold text-white transition-all shadow-xs cursor-pointer"
            >
              <span>Trocar para o Plano Anual e Ganhar 50% OFF</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

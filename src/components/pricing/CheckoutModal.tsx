import { X } from "lucide-react";

type Props = {
  open: boolean;
  planName: string;
  link: string;
  onClose: () => void;
};

export function CheckoutModal({ open, planName, link, onClose }: Props) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-2 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl h-[90vh] bg-background border border-brand/40 rounded-lg shadow-[0_0_60px_var(--brand-glow)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background/95">
          <span className="font-code text-xs uppercase tracking-widest text-brand">
            [ Checkout Seguro — Plano {planName} ]
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-sm hover:bg-muted"
            aria-label="Fechar checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <iframe
          src={link}
          title={`Checkout ${planName}`}
          className="w-full h-[calc(100%-49px)] bg-white"
          allow="payment *"
        />
      </div>
    </div>
  );
}

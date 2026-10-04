import React, { useState, useEffect } from "react";
import { Bell, Sparkles, X, CheckCircle2 } from "lucide-react";

export function NotificationBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [status, setStatus] = useState<"default" | "granted" | "denied">("default");

  useEffect(() => {
    if (typeof window === "undefined" || !("Notification" in window)) return;

    // Se já respondeu ou rejeitou/fechou nesta sessão, não mostra
    if (sessionStorage.getItem("dezpila_notif_banner_dismissed") === "true") return;

    if (Notification.permission === "default") {
      // Exibe o banner após 1.5s de navegação
      const timer = setTimeout(() => setShowBanner(true), 1500);
      return () => clearTimeout(timer);
    } else {
      setStatus(Notification.permission);
    }
  }, []);

  const handleEnableNotifications = async () => {
    if (typeof window === "undefined" || !("Notification" in window)) return;

    try {
      const permission = await Notification.requestPermission();
      setStatus(permission);

      if (permission === "granted") {
        console.log("[PushRecovery] Permissão concedida pelo usuário via banner!");
        // Importa e agenda recuperação
        const { agendarNotificacaoAbandonoSemPlano } = await import("@/lib/push-recovery");
        agendarNotificacaoAbandonoSemPlano();
        
        // Exibe notificação de confirmação de teste imediata
        try {
          new Notification("🔔 Notificações Ativadas!", {
            body: "Você receberá atualizações sobre seus pedidos e ofertas exclusivas DezPila.",
            icon: "/favicon.svg",
          });
        } catch {
          // Ignora se bloqueado no OS
        }
      }
    } catch (err) {
      console.error("[PushRecovery] Erro ao pedir permissão:", err);
    } finally {
      setShowBanner(false);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    sessionStorage.setItem("dezpila_notif_banner_dismissed", "true");
  };

  if (!showBanner || status !== "default") return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:right-auto md:max-w-md z-50 bg-zinc-950/95 border border-emerald-500/40 backdrop-blur-xl p-4 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] text-zinc-100 animate-slideUp">
      <div className="flex items-start gap-3">
        <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl shrink-0 mt-0.5">
          <Bell className="w-5 h-5 animate-pulse" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Ativar Avisos DezPila</h4>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Receba lembretes do seu pedido PIX e atualizações de acesso direto no seu navegador.
          </p>

          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={handleEnableNotifications}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs rounded-lg shadow-md shadow-emerald-500/20 flex items-center gap-1.5 transition-all active:scale-95"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              ATIVAR AGORA
            </button>

            <button
              onClick={handleDismiss}
              className="px-3 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 font-medium text-xs rounded-lg transition-all"
            >
              Agora não
            </button>
          </div>
        </div>

        <button
          onClick={handleDismiss}
          className="p-1 text-zinc-500 hover:text-zinc-300 rounded-md transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

/**
 * Sistema de Notificações Push & Recuperação de Vendas DezPila
 * - Compatível com Mobile (Chrome/Samsung no Android) e Desktop
 * - Usa ServiceWorkerRegistration.showNotification() (obrigatório no Android)
 * - Envia notificação imediata ao ativar permissão
 * - Envia notificação imediata e lembretes ao gerar PIX
 * - Envia notificação de sucesso ao identificar pagamento
 */

let swRegistration: ServiceWorkerRegistration | null = null;
let noPlanTimeoutId: ReturnType<typeof setTimeout> | null = null;
let isInitialized = false;

/**
 * Dispara uma notificação do sistema compatível com Mobile (Android) e Desktop
 */
export async function dispararNotificacao(
  title: string,
  options: NotificationOptions & { url?: string } = {}
): Promise<boolean> {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return false;
  }

  if (Notification.permission !== "granted") {
    console.warn("[PushRecovery] Permissão de notificação não concedida:", Notification.permission);
    return false;
  }

  const notifOptions: NotificationOptions = {
    icon: options.icon || "/brand/favicon_512.png",
    badge: options.badge || "/favicon.svg",
    vibrate: [200, 100, 200] as unknown as number[],
    data: {
      url: options.url || "/",
      ...options.data,
    },
    ...options,
  };

  // 1. Método principal e OBRIGATÓRIO no Chrome Android: ServiceWorkerRegistration.showNotification()
  try {
    if ("serviceWorker" in navigator) {
      const reg = await navigator.serviceWorker.ready;
      if (reg && typeof reg.showNotification === "function") {
        await reg.showNotification(title, notifOptions);
        console.log("[PushRecovery] Notificação disparada com sucesso via ServiceWorker:", title);
        return true;
      }
    }
  } catch (err) {
    console.warn("[PushRecovery] Falha ao exibir via ServiceWorkerRegistration:", err);
  }

  // 2. Fallback para Desktop clássico (onde new Notification() é permitido)
  try {
    new Notification(title, notifOptions);
    console.log("[PushRecovery] Notificação disparada com sucesso via construtor Notification:", title);
    return true;
  } catch (err) {
    console.warn("[PushRecovery] Falha ao exibir via construtor Notification (comum no Android):", err);
    return false;
  }
}

/**
 * Pede permissão explícita de notificação e já exibe um aviso imediato de boas-vindas
 */
export async function pedirPermissaoNotificacoes(): Promise<NotificationPermission> {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return "denied";
  }

  try {
    const permission = await Notification.requestPermission();
    console.log("[PushRecovery] Permissão concedida:", permission);

    if (permission === "granted") {
      // Dispara confirmação imediata no celular/desktop
      await dispararNotificacao("🔔 Notificações Ativadas!", {
        body: "Você receberá atualizações sobre seus pedidos PIX e liberação de acesso DezPila.",
        icon: "/brand/favicon_512.png",
        badge: "/favicon.svg",
        tag: "dezpila_welcome",
      });

      agendarNotificacaoAbandonoSemPlano();
    }

    return permission;
  } catch (err) {
    console.error("[PushRecovery] Erro ao solicitar permissão de notificação:", err);
    return "denied";
  }
}

/**
 * Inicializa o Service Worker e os listeners globais de gesto
 */
export function initPushNotifications() {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return;
  }

  if (isInitialized) return;
  isInitialized = true;

  // 1. Tenta registrar o Service Worker em segundo plano
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => {
        swRegistration = reg;
        console.log("[PushRecovery] Service Worker registrado com sucesso.");
      })
      .catch((err) => {
        console.warn("[PushRecovery] Aviso ao registrar Service Worker:", err);
      });
  }

  // 2. Escuta cliques e toques em QUALQUER LUGAR da página para disparar o prompt no primeiro gesto
  window.addEventListener("click", requestPermissionOnUserGesture, { capture: true, passive: true });
  window.addEventListener("touchstart", requestPermissionOnUserGesture, { capture: true, passive: true });
}

/**
 * Chamada síncrona dentro do gesto do usuário
 */
function requestPermissionOnUserGesture() {
  if (typeof window === "undefined" || !("Notification" in window)) return;

  if (Notification.permission !== "default") {
    if (Notification.permission === "granted") {
      agendarNotificacaoAbandonoSemPlano();
    }
    return;
  }

  pedirPermissaoNotificacoes();
}

/**
 * CENÁRIO 1: Usuário interagiu no site mas ainda não finalizou/escolheu plano.
 * Agenda notificação para 3 minutos.
 */
export function agendarNotificacaoAbandonoSemPlano() {
  if (typeof window === "undefined" || Notification.permission !== "granted") return;

  if (noPlanTimeoutId) clearTimeout(noPlanTimeoutId);

  if (localStorage.getItem("dezpila_compra_concluida") === "true") return;

  noPlanTimeoutId = setTimeout(() => {
    if (localStorage.getItem("dezpila_compra_concluida") !== "true") {
      dispararNotificacao("⚡ Seu desconto DezPila está guardado!", {
        body: "Você iniciou sua visita mas ainda não ativou seu plano. Garanta 2.000+ canais por R$10/mês agora!",
        icon: "/brand/favicon_512.png",
        badge: "/favicon.svg",
        tag: "abandono_plano",
        url: "/#planos",
      });
    }
  }, 3 * 60 * 1000);
}

/**
 * CENÁRIO 2: Usuário gerou um Pix de cobrança (Streaming ou Loja).
 * Agenda lembretes em 3 min e 8 min.
 */
export function agendarLembretePixPendente(orderId: string, valor: number, planName?: string) {
  if (typeof window === "undefined" || Notification.permission !== "granted") return;

  const valorFormatado = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);

  const descPlano = planName ? ` do ${planName}` : "";

  // Tenta também agendar via ServiceWorker postMessage para persistência
  try {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((reg) => {
        if (reg.active) {
          reg.active.postMessage({
            title: "⏳ Seu PIX DezPila expira em breve!",
            options: {
              body: `O pagamento de ${valorFormatado}${descPlano} ainda não foi identificado. Conclua para liberar seu acesso 4K!`,
              icon: "/brand/favicon_512.png",
              badge: "/favicon.svg",
              tag: `lembrete_${orderId}`,
              data: { url: `/#planos` },
            },
            delayMs: 3 * 60 * 1000,
          });
        }
      });
    }
  } catch (err) {
    console.warn("[PushRecovery] Erro ao postMessage no SW:", err);
  }

  // Lembrete 1: 3 minutos (caso a aba continue aberta no aparelho)
  setTimeout(() => {
    if (
      localStorage.getItem(`pix_pago_${orderId}`) !== "true" &&
      localStorage.getItem("dezpila_compra_concluida") !== "true"
    ) {
      dispararNotificacao("⏳ Seu PIX DezPila expira em breve!", {
        body: `O pagamento de ${valorFormatado}${descPlano} ainda não foi identificado. Conclua para liberar seu acesso 4K imediato!`,
        icon: "/brand/favicon_512.png",
        badge: "/favicon.svg",
        tag: `lembrete_3m_${orderId}`,
        url: "/#planos",
      });
    }
  }, 3 * 60 * 1000);

  // Lembrete 2: 8 minutos
  setTimeout(() => {
    if (
      localStorage.getItem(`pix_pago_${orderId}`) !== "true" &&
      localStorage.getItem("dezpila_compra_concluida") !== "true"
    ) {
      dispararNotificacao("🚨 ÚLTIMOS MINUTOS: Reserva do seu PIX", {
        body: "Sua vaga promocional será cancelada em poucos minutos. Finalize seu Pix para não perder seu acesso.",
        icon: "/brand/favicon_512.png",
        badge: "/favicon.svg",
        tag: `lembrete_8m_${orderId}`,
        url: "/#planos",
      });
    }
  }, 8 * 60 * 1000);
}

/**
 * Marca o pedido como pago e cancela notificações de cobrança pendente.
 */
export function marcarComoPago(orderId?: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem("dezpila_compra_concluida", "true");
  if (orderId) {
    localStorage.setItem(`pix_pago_${orderId}`, "true");
  }
}

// Inicialização automática síncrona no browser
if (typeof window !== "undefined") {
  initPushNotifications();
}

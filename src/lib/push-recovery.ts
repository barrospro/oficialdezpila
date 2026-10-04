/**
 * Sistema de Notificações Push & Recuperação de Vendas DezPila
 * - Pede permissão ao clicar em QUALQUER lugar do site (Qualquer botão ou link)
 * - Envia notificação de recuperação se não escolher plano em 3 min
 * - Envia lembrete se gerar PIX e não pagar em 5 e 12 min
 */

let swRegistration: ServiceWorkerRegistration | null = null;
let noPlanTimeoutId: ReturnType<typeof setTimeout> | null = null;
let isInitialized = false;

/**
 * Inicializa o Service Worker e os listeners globais de clique
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
        console.log("[PushRecovery] Service Worker ativo com sucesso.");
      })
      .catch((err) => {
        console.warn("[PushRecovery] Aviso ao registrar Service Worker:", err);
      });
  }

  // 2. Escuta cliques e toques em QUALQUER LUGAR da página (captura imediata)
  window.addEventListener("click", requestPermissionOnUserGesture, { capture: true, passive: true });
  window.addEventListener("touchstart", requestPermissionOnUserGesture, { capture: true, passive: true });
}

/**
 * Chamada síncrona dentro do gesto do usuário para garantir permissão do navegador
 */
function requestPermissionOnUserGesture() {
  if (typeof window === "undefined" || !("Notification" in window)) return;

  // Se já foi decidido (granted ou denied), ignora
  if (Notification.permission !== "default") {
    if (Notification.permission === "granted") {
      agendarNotificacaoAbandonoSemPlano();
    }
    return;
  }

  console.log("[PushRecovery] Solicitando permissão de notificação no gesto do usuário...");

  try {
    const promise = Notification.requestPermission((permission) => {
      console.log("[PushRecovery] Resposta da permissão:", permission);
      if (permission === "granted") {
        agendarNotificacaoAbandonoSemPlano();
      }
    });

    if (promise && typeof promise.then === "function") {
      promise.then((permission) => {
        console.log("[PushRecovery] Resposta da permissão (Promise):", permission);
        if (permission === "granted") {
          agendarNotificacaoAbandonoSemPlano();
        }
      });
    }
  } catch (err) {
    console.error("[PushRecovery] Erro ao solicitar permissão:", err);
  }
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
      enviarNotificacao("⚡ Seu desconto DezPila está guardado!", {
        body: "Você iniciou sua visita mas ainda não ativou seu plano. Garanta 2.000+ canais por R$10/mês agora!",
        icon: "/favicon.svg",
        data: { url: "/#planos" },
      });
    }
  }, 3 * 60 * 1000);
}

/**
 * CENÁRIO 2: Usuário gerou um Pix de cobrança (Nitro / Shop) mas ainda não concluiu o pagamento.
 * Agenda 2 notificações: em 5 min e em 12 min.
 */
export function agendarLembretePixPendente(orderId: string, valor: number) {
  if (typeof window === "undefined" || Notification.permission !== "granted") return;

  const valorFormatado = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);

  // Lembrete 1: 5 minutos
  setTimeout(() => {
    if (localStorage.getItem(`pix_pago_${orderId}`) !== "true") {
      enviarNotificacao("⏳ Seu PIX DezPila expira em breve!", {
        body: `O pagamento de ${valorFormatado} ainda não foi identificado. Conclua para liberar seu acesso 4K imediato!`,
        icon: "/favicon.svg",
        data: { url: `/shop/pedido/${orderId}` },
      });
    }
  }, 5 * 60 * 1000);

  // Lembrete 2: 12 minutos
  setTimeout(() => {
    if (localStorage.getItem(`pix_pago_${orderId}`) !== "true") {
      enviarNotificacao("🚨 ÚLTIMOS MINUTOS: Reserva do seu PIX", {
        body: "Sua vaga promocional será desreservada em poucos minutos. Finalize seu Pix para não perder.",
        icon: "/favicon.svg",
        data: { url: `/shop/pedido/${orderId}` },
      });
    }
  }, 12 * 60 * 1000);
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

function enviarNotificacao(title: string, options: NotificationOptions) {
  if (typeof window === "undefined" || Notification.permission !== "granted") return;

  if (swRegistration && swRegistration.active) {
    swRegistration.active.postMessage({ title, options });
  } else {
    try {
      new Notification(title, options);
    } catch (err) {
      console.warn("[PushRecovery] Falha ao exibir notificação:", err);
    }
  }
}

// Inicialização automática síncrona no browser
if (typeof window !== "undefined") {
  initPushNotifications();
}

/**
 * Sistema de Notificações Push & Recuperação de Vendas DezPila
 * - Pede permissão ao clicar em qualquer botão do site
 * - Envia notificação de recuperação se não escolher plano em 3 min
 * - Envia lembrete se gerar PIX e não pagar em 5 e 12 min
 */

let swRegistration: ServiceWorkerRegistration | null = null;
let noPlanTimeoutId: ReturnType<typeof setTimeout> | null = null;

/**
 * Inicializa o Service Worker e escuta cliques em botões para pedir permissão de notificação
 */
export async function initPushNotifications() {
  if (typeof window === "undefined" || !("Notification" in window) || !("serviceWorker" in navigator)) {
    return;
  }

  try {
    swRegistration = await navigator.serviceWorker.register("/sw.js");
  } catch (err) {
    console.warn("[PushRecovery] Service Worker não pôde ser registrado:", err);
  }

  // Captura cliques globais em botões
  document.addEventListener("click", handleGlobalButtonClick, { capture: true });
}

async function handleGlobalButtonClick(event: MouseEvent) {
  const target = event.target as HTMLElement | null;
  if (!target) return;

  const isButton = target.closest("button, a.btn, [role='button'], a[href*='checkout'], a[href*='plan']");
  if (!isButton) return;

  // Solcita permissão de notificação se ainda for o padrão
  if (Notification.permission === "default") {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        console.log("[PushRecovery] Permissão de notificação concedida pelo usuário.");
      }
    } catch {
      // Ignora erro se cancelado
    }
  }

  if (Notification.permission === "granted") {
    agendarNotificacaoAbandonoSemPlano();
  }
}

/**
 * CENÁRIO 1: Usuário clicou em botões mas ainda não finalizou/escolheu plano.
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
    } catch {
      // Ignora erro se restrito pelo navegador
    }
  }
}

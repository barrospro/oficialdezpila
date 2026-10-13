/**
 * Sistema de Notificações Push & Recuperação de Vendas DezPila
 * - Compatível com Mobile (Chrome/Samsung no Android) e Desktop
 * - Usa ServiceWorkerRegistration.showNotification() (obrigatório no Android)
 * - Lembretes de PIX pendente: 5 minutos, 1 hora, 12 horas e 24 horas
 * - Notificação diária do cupom ANUAL50 (1 vez por dia com 50% de desconto)
 * - Campanhas Persuasivas & Amigáveis: Lançamentos de cinema em alta, séries mais assistidas e futebol ao vivo
 * - Confirmação instantânea ao gerar PIX, copiar chave e após pagamento
 */

let swRegistration: ServiceWorkerRegistration | null = null;
let noPlanTimeoutId: ReturnType<typeof setTimeout> | null = null;
let contentTeaserTimeoutId: ReturnType<typeof setTimeout> | null = null;
let isInitialized = false;

interface PendingPixReminder {
  orderId: string;
  valor: number;
  planName?: string;
  createdAt: number;
  sentStages: {
    "5m"?: boolean;
    "1h"?: boolean;
    "12h"?: boolean;
    "24h"?: boolean;
  };
}

interface CampaignNotification {
  id: string;
  title: string;
  body: string;
  tag: string;
  url: string;
}

const STORAGE_REMINDERS_KEY = "dezpila_pix_reminders_v2";
const STORAGE_DAILY_ANUAL50_KEY = "dezpila_notif_anual50_last";
const STORAGE_CONTENT_LAST_TIME_KEY = "dezpila_last_content_notif";
const STORAGE_CONTENT_INDEX_KEY = "dezpila_content_notif_idx";

/**
 * Catálogo de Campanhas Persuasivas, Amigáveis e Irresistíveis:
 * - Filmes recém-saídos do cinema (em alta no catálogo 4K)
 * - Séries mais assistidas (Netflix, Max, Disney+ unificadas)
 * - Futebol e esportes ao vivo (canais esportivos sem travamento)
 * - Super ofertas de economia e cupom exclusivo
 */
export const CONTENT_CAMPAIGNS: CampaignNotification[] = [
  {
    id: "cinema_lancamentos",
    title: "🍿 Pipoca pronta? Os maiores lançamentos no seu sofá!",
    body: "Deadpool & Wolverine, Divertida Mente 2 e Duna 2 em 4K Ultra HD. Assista tudo agora por menos de R$ 0,33 ao dia!",
    tag: "notif_cinema_lancamentos",
    url: "/#planos",
  },
  {
    id: "series_maratona",
    title: "🎬 O que você vai maratonar hoje à noite?",
    body: "House of the Dragon, Stranger Things e The Last of Us reunidas em um só app. Economize mais de R$ 200/mês em assinaturas!",
    tag: "notif_series_maratona",
    url: "/#planos",
  },
  {
    id: "futebol_ao_vivo",
    title: "⚽ Rodada de Futebol Ao Vivo em 4K sem travar!",
    body: "Brasileirão, Champions League e Libertadores com sinal limpo e sem delay. Liberação imediata no PIX antes da bola rolar!",
    tag: "notif_futebol_ao_vivo",
    url: "/#planos",
  },
  {
    id: "oferta_anual50",
    title: "🎁 Presente Especial: 50% de Desconto Liberado!",
    body: "Use o cupom ANUAL50 e garanta o Plano VIP Anual por apenas R$ 36,95. São +60.000 conteúdos pelo ano todo!",
    tag: "notif_oferta_anual50",
    url: "/#planos",
  },
  {
    id: "sessao_familia",
    title: "✨ Noite de Cinema em Família no DezPila!",
    body: "Filmes recém-saídos do cinema, animações e canais infantis para toda a família em Smart TVs, celulares e TV Box.",
    tag: "notif_sessao_familia",
    url: "/#planos",
  },
  {
    id: "economia_streamings",
    title: "💸 Pare de pagar R$ 50 em cada streaming!",
    body: "Tenha Netflix, Prime Video, Max, Disney+ e +2.000 canais ao vivo reunidos por apenas R$ 10/mês. Teste agora sem carência!",
    tag: "notif_economia_streamings",
    url: "/#planos",
  },
];

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
      url: options.url || "/#planos",
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

  // 2. Fallback para Desktop clássico
  try {
    new Notification(title, notifOptions);
    console.log("[PushRecovery] Notificação disparada com sucesso via construtor Notification:", title);
    return true;
  } catch (err) {
    console.warn("[PushRecovery] Falha ao exibir via construtor Notification:", err);
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
        body: "Você receberá novidades sobre lançamentos de filmes, séries e ofertas exclusivas DezPila.",
        icon: "/brand/favicon_512.png",
        badge: "/favicon.svg",
        tag: "dezpila_welcome",
      });

      agendarNotificacaoAbandonoSemPlano();
      agendarPrimeiroLançamentoCinema();
      verificarNotificacaoDiariaCupomAnual50();
    }

    return permission;
  } catch (err) {
    console.error("[PushRecovery] Erro ao solicitar permissão de notificação:", err);
    return "denied";
  }
}

/**
 * Agenda o primeiro lançamento de cinema logo após autorizar (em 2 minutos) para engajamento rápido
 */
export function agendarPrimeiroLançamentoCinema() {
  if (typeof window === "undefined" || Notification.permission !== "granted") return;
  if (localStorage.getItem("dezpila_compra_concluida") === "true") return;

  if (contentTeaserTimeoutId) clearTimeout(contentTeaserTimeoutId);

  contentTeaserTimeoutId = setTimeout(() => {
    if (localStorage.getItem("dezpila_compra_concluida") !== "true") {
      const camp = CONTENT_CAMPAIGNS[0]; // Cinema e lançamentos
      dispararNotificacao(camp.title, {
        body: camp.body,
        icon: "/brand/favicon_512.png",
        badge: "/favicon.svg",
        tag: camp.tag,
        url: camp.url,
      });
      localStorage.setItem(STORAGE_CONTENT_LAST_TIME_KEY, Date.now().toString());
      localStorage.setItem(STORAGE_CONTENT_INDEX_KEY, "1");
    }
  }, 2 * 60 * 1000); // 2 minutos
}

/**
 * Inicializa o Service Worker e os listeners globais de gesto e verificações
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

  // 3. Executa verificação inicial de lembretes, cupom diário e campanhas de filmes/séries
  verificarLembretesPendentes();
  verificarNotificacaoDiariaCupomAnual50();
  verificarCampanhasDeConteudo();

  // 4. Executa checagem periódica a cada 60 segundos enquanto a aba estiver aberta
  setInterval(() => {
    verificarLembretesPendentes();
    verificarNotificacaoDiariaCupomAnual50();
    verificarCampanhasDeConteudo();
  }, 60 * 1000);
}

/**
 * Chamada síncrona dentro do gesto do usuário
 */
function requestPermissionOnUserGesture() {
  if (typeof window === "undefined" || !("Notification" in window)) return;

  if (Notification.permission !== "default") {
    if (Notification.permission === "granted") {
      agendarNotificacaoAbandonoSemPlano();
      verificarNotificacaoDiariaCupomAnual50();
      verificarCampanhasDeConteudo();
    }
    return;
  }

  pedirPermissaoNotificacoes();
}

/**
 * CENÁRIO: Usuário interagiu no site mas ainda não escolheu plano.
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
 * CENÁRIO: Usuário gerou um Pix de cobrança (Streaming ou Loja).
 * Agenda lembretes em:
 * 1) 5 minutos
 * 2) 1 hora
 * 3) 12 horas
 * 4) 24 horas
 */
export function agendarLembretePixPendente(orderId: string, valor: number, planName?: string) {
  if (typeof window === "undefined") return;

  const valorFormatado = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);

  const descPlano = planName ? ` do ${planName}` : "";

  // 1. Salva no localStorage para persistência entre visitas
  try {
    const raw = localStorage.getItem(STORAGE_REMINDERS_KEY);
    const list: PendingPixReminder[] = raw ? JSON.parse(raw) : [];

    const existingIndex = list.findIndex((item) => item.orderId === orderId);
    const newEntry: PendingPixReminder = {
      orderId,
      valor,
      planName,
      createdAt: Date.now(),
      sentStages: {},
    };

    if (existingIndex >= 0) {
      list[existingIndex] = newEntry;
    } else {
      list.push(newEntry);
    }

    localStorage.setItem(STORAGE_REMINDERS_KEY, JSON.stringify(list));
  } catch (err) {
    console.warn("[PushRecovery] Erro ao salvar lembrete de PIX no localStorage:", err);
  }

  // 2. Envia agendamentos para o Service Worker (5m, 1h, 12h, 24h)
  try {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((reg) => {
        if (reg.active) {
          // Lembrete 5 minutos
          reg.active.postMessage({
            title: "⏳ Seu PIX DezPila expira em breve!",
            options: {
              body: `O pagamento de ${valorFormatado}${descPlano} ainda não foi identificado. Conclua para liberar seu acesso 4K imediato!`,
              icon: "/brand/favicon_512.png",
              badge: "/favicon.svg",
              tag: `pix_5m_${orderId}`,
              data: { url: `/#planos` },
            },
            delayMs: 5 * 60 * 1000,
          });

          // Lembrete 1 hora
          reg.active.postMessage({
            title: "⚠️ Lembrete: PIX DezPila Pendente",
            options: {
              body: `Seu acesso a +60.000 conteúdos ainda está reservado por ${valorFormatado}. Finalize seu Pix para assistir hoje!`,
              icon: "/brand/favicon_512.png",
              badge: "/favicon.svg",
              tag: `pix_1h_${orderId}`,
              data: { url: `/#planos` },
            },
            delayMs: 60 * 60 * 1000,
          });

          // Lembrete 12 horas
          reg.active.postMessage({
            title: "⚡ Sua vaga promocional DezPila vai expirar!",
            options: {
              body: `Identificamos que seu PIX de ${valorFormatado} continua pendente. Garanta sua vaga com preço promocional!`,
              icon: "/brand/favicon_512.png",
              badge: "/favicon.svg",
              tag: `pix_12h_${orderId}`,
              data: { url: `/#planos` },
            },
            delayMs: 12 * 60 * 60 * 1000,
          });

          // Lembrete 24 horas
          reg.active.postMessage({
            title: "🚨 ÚLTIMO AVISO: Seu PIX DezPila será cancelado",
            options: {
              body: `Passaram-se 24h e seu pedido de ${valorFormatado} está prestes a ser cancelado. Finalize antes do encerramento definitivo!`,
              icon: "/brand/favicon_512.png",
              badge: "/favicon.svg",
              tag: `pix_24h_${orderId}`,
              data: { url: `/#planos` },
            },
            delayMs: 24 * 60 * 60 * 1000,
          });
        }
      });
    }
  } catch (err) {
    console.warn("[PushRecovery] Erro ao postMessage no SW:", err);
  }

  // 3. Timers locais no navegador caso o cliente mantenha a aba aberta
  setTimeout(() => {
    verificarLembretesPendentes();
  }, 5 * 60 * 1000);

  setTimeout(() => {
    verificarLembretesPendentes();
  }, 60 * 60 * 1000);
}

/**
 * Checa lembretes pendentes armazenados no localStorage (5m, 1h, 12h, 24h)
 */
export function verificarLembretesPendentes() {
  if (typeof window === "undefined" || Notification.permission !== "granted") return;

  try {
    const raw = localStorage.getItem(STORAGE_REMINDERS_KEY);
    if (!raw) return;

    const list: PendingPixReminder[] = JSON.parse(raw);
    const now = Date.now();
    let changed = false;

    for (const item of list) {
      // Se o pedido já foi pago ou compra concluída, pula
      if (
        localStorage.getItem(`pix_pago_${item.orderId}`) === "true" ||
        localStorage.getItem("dezpila_compra_concluida") === "true"
      ) {
        continue;
      }

      const elapsed = now - item.createdAt;
      const valorFormatado = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(item.valor);
      const descPlano = item.planName ? ` do ${item.planName}` : "";

      // 1) 5 minutos (300.000 ms)
      if (elapsed >= 5 * 60 * 1000 && !item.sentStages["5m"]) {
        item.sentStages["5m"] = true;
        changed = true;
        dispararNotificacao("⏳ Seu PIX DezPila expira em breve!", {
          body: `O pagamento de ${valorFormatado}${descPlano} ainda não foi identificado. Conclua para liberar seu acesso 4K imediato!`,
          icon: "/brand/favicon_512.png",
          badge: "/favicon.svg",
          tag: `pix_5m_${item.orderId}`,
          url: "/#planos",
        });
      }

      // 2) 1 hora (3.600.000 ms)
      if (elapsed >= 60 * 60 * 1000 && !item.sentStages["1h"]) {
        item.sentStages["1h"] = true;
        changed = true;
        dispararNotificacao("⚠️ Lembrete: PIX DezPila Pendente", {
          body: `Seu acesso a +60.000 conteúdos ainda está reservado por ${valorFormatado}. Finalize seu Pix para assistir hoje!`,
          icon: "/brand/favicon_512.png",
          badge: "/favicon.svg",
          tag: `pix_1h_${item.orderId}`,
          url: "/#planos",
        });
      }

      // 3) 12 horas (43.200.000 ms)
      if (elapsed >= 12 * 60 * 60 * 1000 && !item.sentStages["12h"]) {
        item.sentStages["12h"] = true;
        changed = true;
        dispararNotificacao("⚡ Sua vaga promocional DezPila vai expirar!", {
          body: `Identificamos que seu PIX de ${valorFormatado} continua pendente. Garanta sua vaga com preço promocional!`,
          icon: "/brand/favicon_512.png",
          badge: "/favicon.svg",
          tag: `pix_12h_${item.orderId}`,
          url: "/#planos",
        });
      }

      // 4) 24 horas (86.400.000 ms)
      if (elapsed >= 24 * 60 * 60 * 1000 && !item.sentStages["24h"]) {
        item.sentStages["24h"] = true;
        changed = true;
        dispararNotificacao("🚨 ÚLTIMO AVISO: Seu PIX DezPila será cancelado", {
          body: `Passaram-se 24h e seu pedido de ${valorFormatado} está prestes a ser cancelado. Finalize antes do encerramento definitivo!`,
          icon: "/brand/favicon_512.png",
          badge: "/favicon.svg",
          tag: `pix_24h_${item.orderId}`,
          url: "/#planos",
        });
      }
    }

    if (changed) {
      localStorage.setItem(STORAGE_REMINDERS_KEY, JSON.stringify(list));
    }
  } catch (err) {
    console.warn("[PushRecovery] Erro ao verificar lembretes pendentes:", err);
  }
}

/**
 * Notificação Diária do Cupom ANUAL50:
 * - Dispara 1 vez a cada 24 horas para usuários que ainda não concluíram a compra
 * - Promove 50% de desconto no Plano VIP Anual (de R$ 73,90 por R$ 36,95)
 */
export function verificarNotificacaoDiariaCupomAnual50() {
  if (typeof window === "undefined" || Notification.permission !== "granted") return;
  if (localStorage.getItem("dezpila_compra_concluida") === "true") return;

  try {
    const rawLast = localStorage.getItem(STORAGE_DAILY_ANUAL50_KEY);
    const lastSent = rawLast ? Number(rawLast) : 0;
    const now = Date.now();
    const VINTE_QUATRO_HORAS = 24 * 60 * 60 * 1000;

    if (now - lastSent >= VINTE_QUATRO_HORAS) {
      localStorage.setItem(STORAGE_DAILY_ANUAL50_KEY, now.toString());

      dispararNotificacao("🔥 CUPOM 50% OFF: ANUAL50", {
        body: "Economize 50% no Plano VIP Anual DezPila! Pague apenas R$ 36,95/ano por +60.000 conteúdos e 2.000 canais em 4K.",
        icon: "/brand/favicon_512.png",
        badge: "/favicon.svg",
        tag: "cupom_anual50_diario",
        url: "/#planos",
      });
      console.log("[PushRecovery] Notificação diária do cupom ANUAL50 disparada com sucesso.");
    }
  } catch (err) {
    console.warn("[PushRecovery] Erro ao verificar notificação diária do cupom ANUAL50:", err);
  }
}

/**
 * Notificações Persuasivas de Conteúdo & Ofertas Irresistíveis:
 * - Lançamentos em alta no cinema, séries mais assistidas e futebol ao vivo
 * - Dispara em rotação a cada 4 horas (ou quando o usuário retorna) para quem ainda não concluiu a compra
 */
export function verificarCampanhasDeConteudo() {
  if (typeof window === "undefined" || Notification.permission !== "granted") return;
  if (localStorage.getItem("dezpila_compra_concluida") === "true") return;

  try {
    const rawLast = localStorage.getItem(STORAGE_CONTENT_LAST_TIME_KEY);
    const lastSent = rawLast ? Number(rawLast) : 0;
    const now = Date.now();
    const INTERVALO_ROTACAO = 4 * 60 * 60 * 1000; // 4 horas

    if (now - lastSent >= INTERVALO_ROTACAO) {
      const rawIdx = localStorage.getItem(STORAGE_CONTENT_INDEX_KEY);
      const currentIdx = rawIdx ? Number(rawIdx) : 0;
      const campaign = CONTENT_CAMPAIGNS[currentIdx % CONTENT_CAMPAIGNS.length];

      dispararNotificacao(campaign.title, {
        body: campaign.body,
        icon: "/brand/favicon_512.png",
        badge: "/favicon.svg",
        tag: campaign.tag,
        url: campaign.url,
      });

      localStorage.setItem(STORAGE_CONTENT_LAST_TIME_KEY, now.toString());
      localStorage.setItem(STORAGE_CONTENT_INDEX_KEY, ((currentIdx + 1) % CONTENT_CAMPAIGNS.length).toString());
      console.log("[PushRecovery] Campanha de conteúdo disparada:", campaign.title);
    }
  } catch (err) {
    console.warn("[PushRecovery] Erro ao verificar campanhas de conteúdo:", err);
  }
}

/**
 * Marca o pedido como pago e cancela notificações de cobrança pendente.
 */
export function marcarComoPago(orderId?: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem("dezpila_compra_concluida", "true");
  if (orderId) {
    localStorage.setItem(`pix_pago_${orderId}`, "true");

    // Remove ou limpa da lista de lembretes pendentes
    try {
      const raw = localStorage.getItem(STORAGE_REMINDERS_KEY);
      if (raw) {
        const list: PendingPixReminder[] = JSON.parse(raw);
        const filtered = list.filter((item) => item.orderId !== orderId);
        localStorage.setItem(STORAGE_REMINDERS_KEY, JSON.stringify(filtered));
      }
    } catch {
      // Ignore
    }
  }
}

// Inicialização automática síncrona no browser
if (typeof window !== "undefined") {
  initPushNotifications();
}

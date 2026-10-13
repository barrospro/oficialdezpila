// Service Worker para Web Push Notifications & Recuperação de Vendas DezPila

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// Manipulador de mensagens para exibir notificações (inclusive com delay)
self.addEventListener("message", (event) => {
  if (!event.data) return;
  const { title, options, delayMs } = event.data;

  if (delayMs && delayMs > 0) {
    setTimeout(() => {
      self.registration.showNotification(title, options);
    }, delayMs);
  } else {
    self.registration.showNotification(title, options);
  }
});

// Manipulador de push remoto do servidor (Web Push Protocol / VAPID)
self.addEventListener("push", (event) => {
  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch {
      data = { title: "DezPila Streaming", body: event.data.text() };
    }
  }

  const title = data.title || "DezPila Streaming";
  const options = {
    body: data.body || "Atualização sobre o seu acesso ou pedido DezPila.",
    icon: data.icon || "/brand/favicon_512.png",
    badge: data.badge || "/favicon.svg",
    vibrate: [200, 100, 200],
    data: {
      url: data.url || "/",
    },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Ação de clique na notificação: abre ou foca no site
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const urlToOpen = event.notification.data?.url || "/";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((windowClients) => {
      for (const client of windowClients) {
        if (client.url.includes(urlToOpen) && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

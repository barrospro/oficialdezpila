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

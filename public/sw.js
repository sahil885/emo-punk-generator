// Text to Emo service worker.
//
// Deliberately minimal: it only steps in for page navigations, and only when
// the network fails — then it shows a branded offline page instead of the
// browser's error screen. Every other request (API, auth, Stripe, audio,
// scripts) goes straight to the network untouched, so nothing here can serve a
// stale page, a stale price, or a stale session.
//
// Bump VERSION when offline.html changes.

const VERSION = "v1";
const CACHE = `tte-offline-${VERSION}`;
const OFFLINE_URL = "/offline.html";
// offline.html is self-contained (inline styles and logo), so it is the only
// thing that needs caching.
const PRECACHE = [OFFLINE_URL];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("tte-") && key !== CACHE)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.mode !== "navigate") return;

  event.respondWith(
    fetch(event.request).catch(async () => {
      const cached = await caches.match(OFFLINE_URL);
      return cached || Response.error();
    })
  );
});

/**
 * Service Worker - PWA Cache Management
 * Implements cache-first strategy with network fallback
 */

const CACHE_VERSION = "v1";
const CACHE_NAME = `nguembu-cache-${CACHE_VERSION}`;

// Assets to cache on install
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/projects.html",
  "/project-detail.html",
  "/offline.html",
  "/style.css",
  "/scripts/main.js",
  "/scripts/theme.js",
  "/scripts/i18n.js",
  "/scripts/projects.js",
  "/scripts/pwa.js",
  "/manifest.webmanifest",
];

/**
 * Install Event - Cache essential assets
 */
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Installing...");

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("[Service Worker] Caching essential assets");
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting()),
  );
});

/**
 * Activate Event - Clean up old caches
 */
self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activating...");

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log("[Service Worker] Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          }),
        );
      })
      .then(() => self.clients.claim()),
  );
});

/**
 * Fetch Event - Cache-first strategy
 */
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== "GET") {
    return;
  }

  // Skip external domains
  if (url.origin !== location.origin) {
    return;
  }

  // Cache-first strategy
  event.respondWith(
    caches.match(request).then((response) => {
      // Return from cache if available
      if (response) {
        // Update cache in background (stale-while-revalidate)
        fetch(request)
          .then((networkResponse) => {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, networkResponse);
            });
          })
          .catch(() => {
            // Silently fail on network error during background update
          });
        return response;
      }

      // Fetch from network
      return fetch(request)
        .then((networkResponse) => {
          // Cache successful responses
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }

          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });

          return networkResponse;
        })
        .catch(() => {
          // Return offline page for navigation requests
          if (request.mode === "navigate") {
            return caches
              .match("/offline.html")
              .then((response) => response || new Response("Offline"));
          }
          // Return error for other requests
          return new Response("Network error", { status: 503 });
        });
    }),
  );
});

/**
 * Message Event - Communication with clients
 */
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

console.log("[Service Worker] Loaded");

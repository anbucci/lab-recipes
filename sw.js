// Service Worker for Lab Recipes Calculator PWA
// Provides offline functionality and caching strategy

const CACHE_NAME = "lab-recipes-v1";
const urlsToCache = [
  "lab_calculator.html",
  "manifest.json",
  "sw.js",
  "app.js",
  "recipeManager.js",
  "uiManager.js",
  "recipes.json"
];

// Install event - cache essential files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Service Worker: Caching app shell");
      return cache.addAll(urlsToCache).catch((err) => {
        // Don't fail if some files aren't available
        console.log("Service Worker: Some files could not be cached", err);
      });
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Service Worker: Deleting old cache", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network (offline-first)
self.addEventListener("fetch", (event) => {
  // Skip non-GET requests
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        // Return cached response
        return response;
      }

      // Try to fetch from network
      return fetch(event.request)
        .then((response) => {
          // Don't cache if not a valid response
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          // Cache the new response
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        })
        .catch(() => {
          // Offline fallback - return the main page
          return caches.match("lab_calculator.html");
        });
    })
  );
});

// Handle background sync for future functionality
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-recipes") {
    event.waitUntil(
      // Add sync logic here if needed in future
      Promise.resolve()
    );
  }
});

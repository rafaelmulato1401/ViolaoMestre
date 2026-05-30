// ViolãoMestre Service Worker v1.0
// Desenvolvido por Rafael Mulato

const CACHE_NAME = 'violaomestre-v1';
const STATIC_CACHE = 'violaomestre-static-v1';

// Assets to cache on install
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  // Google Fonts (will be cached on first load)
];

// Install — precache critical assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// Activate — clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME && key !== STATIC_CACHE)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch — Cache First for static, Network First for API
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) return;

  // Skip API/analytics calls
  if (url.hostname.includes('allorigins') ||
      url.hostname.includes('analytics') ||
      url.hostname.includes('cifraclub')) return;

  // Cache First strategy for fonts and static assets
  if (url.hostname.includes('fonts.googleapis') ||
      url.hostname.includes('fonts.gstatic')) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache =>
        cache.match(event.request).then(cached => {
          if (cached) return cached;
          return fetch(event.request).then(response => {
            cache.put(event.request, response.clone());
            return response;
          });
        })
      )
    );
    return;
  }

  // Network First with cache fallback for everything else
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Cache successful responses
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() =>
        // Offline fallback — serve from cache
        caches.match(event.request).then(cached =>
          cached || caches.match('/index.html')
        )
      )
  );
});

// Background sync placeholder
self.addEventListener('sync', event => {
  console.log('[SW] Background sync:', event.tag);
});

// Push notifications placeholder
self.addEventListener('push', event => {
  const data = event.data?.json() || {};
  self.registration.showNotification(data.title || 'ViolãoMestre', {
    body: data.body || 'Hora de praticar!',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-96.png',
  });
});

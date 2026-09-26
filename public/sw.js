/* Maniesta Service Worker
 * ------------------------------------------------------------------
 * Cache version: bump this string on every deploy that changes HTML,
 * CSS, JS, or any content-critical asset. The `activate` handler will
 * delete every cache whose name does not match the current constant.
 * ------------------------------------------------------------------ */
const CACHE_NAME = 'maniesta-v1';

/* Only pre-cache files that (a) exist at build time and (b) do not
 * change between deploys without a version bump. Do NOT pre-cache `/`
 * or `/manifest.json` here - Next.js handles freshness for HTML, and
 * the manifest can change per deploy. */
const PRECACHE_URLS = [
  '/favicon.ico',
  '/favicon-96x96.png',
  '/apple-touch-icon.png',
  '/web-app-manifest-192x192.png',
  '/web-app-manifest-512x512.png',
];

/* ------------------------------------------------ install ---------- */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting()),
  );
});

/* ------------------------------------------------ activate --------- */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

/* ------------------------------------------------ helpers ---------- */
const isNavigate = (request) =>
  request.mode === 'navigate' ||
  (request.method === 'GET' &&
    request.headers.get('accept')?.includes('text/html'));

const isNextStatic = (url) => url.pathname.startsWith('/_next/static/');

const isImageOrFont = (request, url) =>
  request.destination === 'image' ||
  request.destination === 'font' ||
  /\.(?:png|jpe?g|gif|webp|avif|svg|ico|woff2?)$/i.test(url.pathname);

/* ------------------------------------------------ fetch ------------- */
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle GET requests - let POST/PUT/etc. pass through to network.
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Only handle same-origin requests (plus Next.js image optimisation).
  if (url.origin !== self.location.origin) return;

  /* 1. Navigate / HTML - network-first, fall back to cache then offline.
        This is the SEO-critical path: Google and users always get the
        freshest HTML whenever the network is available. */
  if (isNavigate(request)) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() =>
          caches
            .match(request)
            .then((cached) => cached || caches.match('/')),
        ),
    );
    return;
  }

  /* 2. Next.js hashed static assets - cache-first.
        Filenames include a content hash, so they never change between
        deploys. Serving from cache is safe and fast. */
  if (isNextStatic(url)) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            const copy = response.clone();
            caches
              .open(CACHE_NAME)
              .then((cache) => cache.put(request, copy));
            return response;
          }),
      ),
    );
    return;
  }

  /* 3. Images and fonts - stale-while-revalidate.
        Serve cached copy instantly, update in the background. */
  if (isImageOrFont(request, url)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const fetchPromise = fetch(request)
          .then((response) => {
            const copy = response.clone();
            caches
              .open(CACHE_NAME)
              .then((cache) => cache.put(request, copy));
            return response;
          })
          .catch(() => cached);
        return cached || fetchPromise;
      }),
    );
    return;
  }

  /* 4. Everything else - network-first with cache fallback. */
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response && response.status === 200) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      })
      .catch(() => caches.match(request)),
  );
});
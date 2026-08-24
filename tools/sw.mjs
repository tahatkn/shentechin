/* Service worker kaynağı. build.mjs bunu sürüm numarası ve ön-bellek listesiyle
   /sw.js olarak yazar. Sürüm her derlemede değiştiği için eski önbellek
   otomatik temizlenir. */

export function serviceWorker(version, precache) {
  const list = JSON.stringify(precache, null, 2);

  return `/* ShenTechin Med — çevrimdışı desteği ve tekrar ziyaretlerde anında açılış.
   Bu dosya tools/sw.mjs tarafından üretilir; elle düzenlemeyin. */
'use strict';

var VERSION = '${version}';
var CACHE = 'stq-' + VERSION;

/* Kabuk: ilk kurulumda indirilenler. Sayfa HTML'leri buraya girmez,
   onlar ziyaret edildikçe önbelleğe alınır. */
var PRECACHE = ${list};

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE)
      .then(function (cache) { return cache.addAll(PRECACHE); })
      .then(function () { return self.skipWaiting(); })
      .catch(function () { /* tek bir dosya inmezse kurulum yine de sürsün */ })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys.map(function (k) {
          return k === CACHE ? null : caches.delete(k);
        }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

function isAsset(url) {
  return /\\/assets\\/(fonts|js|img)\\//.test(url.pathname) ||
         /\\.(?:woff2|png|svg|webmanifest)$/.test(url.pathname);
}

self.addEventListener('fetch', function (event) {
  var req = event.request;
  if (req.method !== 'GET') return;

  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  /* Sayfalar: önce ağ (taze içerik), olmazsa önbellek, o da yoksa ana sayfa. */
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then(function (res) {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(req, copy); });
          return res;
        })
        .catch(function () {
          return caches.match(req).then(function (hit) {
            return hit || caches.match('${precache[0] || '/'}');
          });
        })
    );
    return;
  }

  /* Varlıklar: önbellekten anında ver, arka planda tazele. */
  if (isAsset(url)) {
    event.respondWith(
      caches.match(req).then(function (hit) {
        var net = fetch(req).then(function (res) {
          if (res && res.status === 200) {
            var copy = res.clone();
            caches.open(CACHE).then(function (c) { c.put(req, copy); });
          }
          return res;
        }).catch(function () { return hit; });
        return hit || net;
      })
    );
  }
});
`;
}

export function manifest(lang) {
  const tr = lang === 'tr';
  return JSON.stringify({
    name: 'ShenTechin Med',
    short_name: 'ShenTechin',
    description: tr
      ? 'Günlük sağlık alışkanlıkları üzerine ücretsiz ve anonim öz-değerlendirmeler.'
      : 'Free, anonymous self-assessments on everyday health habits.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#f8fafc',
    theme_color: '#2563eb',
    lang: 'en',
    dir: 'ltr',
    categories: ['health', 'lifestyle', 'education'],
    icons: [
      { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      { src: '/assets/img/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
    ]
  }, null, 2);
}

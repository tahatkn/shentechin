/* ShenTechin Med — çevrimdışı desteği ve tekrar ziyaretlerde anında açılış.
   Bu dosya tools/sw.mjs tarafından üretilir; elle düzenlemeyin. */
'use strict';

var VERSION = '11047-13336-24847-24402-28499';
var CACHE = 'stq-' + VERSION;

/* Kabuk: ilk kurulumda indirilenler. Sayfa HTML'leri buraya girmez,
   onlar ziyaret edildikçe önbelleğe alınır. */
var PRECACHE = [
  "/",
  "/tr/",
  "/assets/js/app.js",
  "/assets/js/quiz.js",
  "/assets/js/result.js",
  "/assets/fonts/pjs-latin.woff2",
  "/assets/fonts/pjs-latin-ext.woff2",
  "/favicon.svg",
  "/site.webmanifest"
];

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
  return /\/assets\/(fonts|js|img)\//.test(url.pathname) ||
         /\.(?:woff2|png|svg|webmanifest)$/.test(url.pathname);
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
            return hit || caches.match('/');
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

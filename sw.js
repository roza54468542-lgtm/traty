// Офлайн-кэш приложения. При обновлении файлов поменяй номер версии.
var CACHE = 'nashi-traty-v4';
var SHELL = ['./', './index.html', './config.js', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

function put(req, res) {
  if (res && (res.ok || res.type === 'opaque')) {
    var copy = res.clone();
    caches.open(CACHE).then(function (c) { c.put(req, copy); });
  }
  return res;
}

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);

  // Файлы приложения: сначала сеть (чтобы правки сразу появлялись), без сети — из кэша
  if (url.origin === self.location.origin) {
    e.respondWith(fetch(req).then(function (res) { return put(req, res); }).catch(function () {
      return caches.match(req).then(function (m) { return m || caches.match('./index.html'); });
    }));
    return;
  }

  // Шрифты и библиотека Firebase: из кэша, если уже скачаны
  if (url.hostname === 'www.gstatic.com' || url.hostname === 'fonts.gstatic.com' || url.hostname === 'fonts.googleapis.com') {
    e.respondWith(caches.match(req).then(function (m) {
      return m || fetch(req).then(function (res) { return put(req, res); });
    }));
  }
});

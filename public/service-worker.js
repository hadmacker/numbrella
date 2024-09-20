const cacheName = 'numbrillig-cache-v3'

const cacheClone = async (e) => {
  const res = await fetch(e.request);
  const resClone = res.clone();

  const cache = await caches.open(cacheName);
  await cache.put(e.request, resClone);
  return res;
};

const fetchEvent = () => {
  self.addEventListener('fetch', (e) => {
    e.respondWith(
      cacheClone(e)
        .catch(() => caches.match(e.request))
        .then((res) => res)
    );
  });
};

fetchEvent();

const urlsToCache = [
  '/',
  '/manifest.json',
  '/favicon.ico',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  // Add other static URLs you want to cache
];

const installEvent = () => {
  self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open(cacheName)
        .then(cache => {
          return cache.addAll(urlsToCache);
        })
    );
  });
};

installEvent();

const activateEvent = () => {
  self.addEventListener('activate', (event) => {
    const cacheWhitelist = [cacheName];
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });
};

activateEvent();
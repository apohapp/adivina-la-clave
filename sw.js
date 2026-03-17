const CACHE_NAME = 'adivina-codigo-v1';
const archivosParaCachear = [
  './',
  './index.html',
  './manifest.json',
  './icono.png' // Asegúrate de tener tu imagen icono.png subida
];

// Instalar el Service Worker y guardar los archivos en caché
self.addEventListener('install', evento => {
  evento.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(archivosParaCachear);
      })
  );
});

// Interceptar las peticiones de red para que funcione rápido y offline
self.addEventListener('fetch', evento => {
  evento.respondWith(
    caches.match(evento.request)
      .then(respuesta => {
        // Si el archivo está en caché, lo devuelve. Si no, lo busca en internet.
        return respuesta || fetch(evento.request);
      })
  );
});
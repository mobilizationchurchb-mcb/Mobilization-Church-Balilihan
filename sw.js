const CACHE_NAME = 'mcb-v2-cache';
const urlsToCache = [
  './',
    'index.html',
      'login.html',
        'mcb.png',
          'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
            'https://cdn.tailwindcss.com',
              'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
              ];

              // Install Service Worker
              self.addEventListener('install', event => {
                self.skipWaiting(); // Pinipilit ang service worker na mag-active agad
                  event.waitUntil(
                      caches.open(CACHE_NAME)
                            .then(cache => {
                                    console.log('Service Worker: Caching Files');
                                            return cache.addAll(urlsToCache);
                                                  })
                                                    );
                                                    });

                                                    // Fetch resources
                                                    self.addEventListener('fetch', event => {
                                                      event.respondWith(
                                                          caches.match(event.request)
                                                                .then(response => {
                                                                        // Return cached version or fetch from network
                                                                                return response || fetch(event.request).catch(() => {
                                                                                            // Optional: Maaaring mag-return ng offline page dito kung gusto
                                                                                                    });
                                                                                                          })
                                                                                                            );
                                                                                                            });

                                                                                                            // Activate and Clean old cache
                                                                                                            self.addEventListener('activate', event => {
                                                                                                              const cacheWhitelist = [CACHE_NAME];
                                                                                                                event.waitUntil(
                                                                                                                    caches.keys().then(cacheNames => {
                                                                                                                          return Promise.all(
                                                                                                                                  cacheNames.map(cacheName => {
                                                                                                                                            if (cacheWhitelist.indexOf(cacheName) === -1) {
                                                                                                                                                        console.log('Service Worker: Clearing Old Cache');
                                                                                                                                                                    return caches.delete(cacheName);
                                                                                                                                                                              }
                                                                                                                                                                                      })
                                                                                                                                                                                            );
                                                                                                                                                                                                }).then(() => self.clients.claim()) // Agad na kontrolin ang lahat ng tabs
                                                                                                                                                                                                  );
                                                                                                                                                                                                  });
                                                                                                                                                                                                  
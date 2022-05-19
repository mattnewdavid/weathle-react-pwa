const CACHE_NAME = 'version 1.0';
const urlstocache = ['index.html', 'offline.html']

const self = this;

//Install Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(
            (cache) => {
                console.log('Cache Opened')

                return cache.addAll(urlstocache);
            }
        )
    )
})
//Listen for Event
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then(
            () => {
                return fetch(event.request).catch(
                    () => caches.match('offline.html')
                )
            }
        )
    )

});
//Activate the Service Worker
self.addEventListener("activate", (event) => {
    const cacheWhiteList = [];
    cacheWhiteList.push(CACHE_NAME);
    console.log(cacheWhiteList)

    event.waitUntil(
        caches.keys().then(
            (cacheNames) => {
                Promise.all(
                    cacheNames.map((cacheName) => {
                        if (!cacheWhiteList.includes(cacheName)) {
                            return caches.delete(cacheName)
                        }
                    })
                )
            }
        )
    )
});
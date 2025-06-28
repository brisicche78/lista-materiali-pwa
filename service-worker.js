const CACHE_NAME = 'materiali-cache-v1';
const urlsToCache = [
  'index.html', // The main HTML file
  'manifest.json', // Manifest file for PWA
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap',
  'https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://media.licdn.com/dms/image/v2/C4E0BAQEp_ynYF_UExA/company-logo_200_200/company-logo_200_200/0/1642092550756/tpc_group_srl_logo?e=2147483647&v=beta&t=3f1SQUfd-kQeqQojJo7NUD_O2cbSdu0nO8hTz2maZs4' // TPC logo
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// KidRoots — Service worker (mode hors-ligne)
// - Installation : met en cache la page, le manifest et tous les assets Vite references par index.html
// - Navigation : reseau d'abord, repli sur la page en cache si hors-ligne
// - /assets/* (fichiers hashes) : cache d'abord
// - Autres ressources meme origine + Google Fonts : cache puis mise a jour en arriere-plan
// Les requetes Firebase / traduction (autres origines) ne sont jamais interceptees.

const CACHE = 'kidroots-v2'
const SHELL = ['/', '/index.html', '/manifest.json', '/favicon.svg', '/icon-192.png', '/icon-512.png']
const FONT_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com']

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE)
    await cache.addAll(SHELL)
    // Recupere les bundles JS/CSS hashes references par index.html
    try {
      const html = await (await fetch('/index.html', { cache: 'no-store' })).text()
      const assets = [...html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)].map((m) => m[1])
      await cache.addAll([...new Set(assets)])
    } catch (e) {
      // pas bloquant : les assets seront mis en cache a la premiere requete
    }
    await self.skipWaiting()
  })())
})

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys()
    await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    await self.clients.claim()
  })())
})

async function networkFirst(request) {
  const cache = await caches.open(CACHE)
  try {
    const res = await fetch(request)
    if (res.ok) cache.put('/', res.clone())
    return res
  } catch (e) {
    return (await cache.match('/')) || (await cache.match('/index.html')) || Response.error()
  }
}

async function cacheFirst(request) {
  const cache = await caches.open(CACHE)
  const hit = await cache.match(request)
  if (hit) return hit
  const res = await fetch(request)
  if (res.ok) cache.put(request, res.clone())
  return res
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE)
  const hit = await cache.match(request)
  const update = fetch(request)
    .then((res) => {
      if (res.ok || res.type === 'opaque') cache.put(request, res.clone())
      return res
    })
    .catch(() => hit)
  return hit || update
}

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return
  const url = new URL(request.url)
  const sameOrigin = url.origin === self.location.origin

  if (request.mode === 'navigate' && sameOrigin) {
    event.respondWith(networkFirst(request))
  } else if (sameOrigin && url.pathname.startsWith('/assets/')) {
    event.respondWith(cacheFirst(request))
  } else if (sameOrigin || FONT_HOSTS.includes(url.hostname)) {
    event.respondWith(staleWhileRevalidate(request))
  }
})

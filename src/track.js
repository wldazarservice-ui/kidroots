// Compteur anonyme (aucun cookie, aucune donnee personnelle) : sert a savoir quelles pubs marchent.
const SRC_KEY = 'kidroots_src'

// Retient la source de la 1re visite (?utm_source=instagram, ?ref=tiktok ...)
function source() {
  try {
    const p = new URLSearchParams(window.location.search)
    const s = p.get('utm_source') || p.get('ref')
    if (s) sessionStorage.setItem(SRC_KEY, s)
    return sessionStorage.getItem(SRC_KEY) || ''
  } catch {
    return ''
  }
}

const sent = new Set()
export function track(e, { once = false } = {}) {
  if (!import.meta.env.PROD) return
  if (once) { if (sent.has(e)) return; sent.add(e) }
  try {
    fetch('/api/track', { method: 'POST', keepalive: true, headers: { 'content-type': 'application/json' }, body: JSON.stringify({ e, s: source() }) }).catch(() => {})
  } catch {}
}

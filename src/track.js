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

// Parrainage : lien mokalibo.com/?ami=CODE (gardé 60 jours sur l'appareil)
const REF_KEY = 'kidroots_ref'
export function captureReferral() {
  try {
    const code = new URLSearchParams(window.location.search).get('ami')
    if (code && /^[A-Za-z0-9]{6,12}$/.test(code)) localStorage.setItem(REF_KEY, JSON.stringify({ code: code.toUpperCase(), at: Date.now() }))
  } catch {}
}
export function referralCode() {
  try {
    const r = JSON.parse(localStorage.getItem(REF_KEY) || 'null')
    if (!r || Date.now() - r.at > 60 * 86400000) return null
    return r.code
  } catch { return null }
}
captureReferral()

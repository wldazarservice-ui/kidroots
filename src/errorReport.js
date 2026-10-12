// Envoie au tableau de bord les bugs rencontres par les utilisateurs (production uniquement).
// Aucune donnee personnelle : message d'erreur, fichier, ecran, type de navigateur.
const sent = new Set()
let count = 0

export function reportError(message, source = '') {
  if (!import.meta.env.PROD) return
  const m = String(message || '').slice(0, 300)
  if (!m || sent.has(m) || count >= 5) return
  // Bruit des extensions et des navigateurs, sans rapport avec l'app
  if (/ResizeObserver loop|Script error\.?$|extension:\/\/|Non-Error promise rejection/i.test(m + source)) return
  sent.add(m); count++
  const body = JSON.stringify({ m, s: String(source).slice(0, 160), p: location.pathname + location.hash, ua: navigator.userAgent.replace(/\([^)]*\)/g, '').slice(0, 120), v: __APP_VERSION__ })
  try {
    if (navigator.sendBeacon) navigator.sendBeacon('/api/client-error', new Blob([body], { type: 'application/json' }))
    else fetch('/api/client-error', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true }).catch(() => {})
  } catch {}
}

export function installErrorReporting() {
  window.addEventListener('error', (e) => reportError(e.message, `${e.filename || ''}:${e.lineno || ''}`))
  window.addEventListener('unhandledrejection', (e) => {
    const r = e.reason
    reportError(r?.message || String(r), r?.stack?.split('\n')[1]?.trim() || 'promise')
  })
}

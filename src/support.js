// Support « Aide et contact » : ouvrir la fenetre depuis n'importe ou, envoyer un message.
import { auth } from './firebase'

export const openSupport = (opts = {}) => window.dispatchEvent(new CustomEvent('mokalibo:support', { detail: opts }))

export async function sendSupport(data) {
  const headers = { 'content-type': 'application/json' }
  const u = auth.currentUser
  if (u) headers.authorization = `Bearer ${await u.getIdToken()}`
  const res = await fetch('/api/support', { method: 'POST', headers, body: JSON.stringify(data) })
  const out = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(out.error || `HTTP ${res.status}`)
  return out
}

// Proprietaire : marquer un message comme traite
export async function setSupportStatus(user, id, status) {
  const res = await fetch('/api/support-admin', {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${await user.getIdToken()}` },
    body: JSON.stringify({ id, status }),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
}

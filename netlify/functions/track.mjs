// Compteur anonyme d'evenements (visites, essais, inscriptions...) : aucune donnee personnelle
import { countEvent, EVENTS, json } from '../lib/shared.mjs'

// Seuls ces evenements peuvent venir du navigateur (les achats sont comptes par le serveur)
const PUBLIC = EVENTS.filter((e) => e !== 'purchase' && e !== 'checkout_start')

export default async (req) => {
  if (req.method !== 'POST') return json(405, { error: 'method' })
  const body = await req.json().catch(() => ({}))
  const event = String(body.e || '')
  if (!PUBLIC.includes(event)) return json(400, { error: 'event' })
  // Source de la visite (?utm_source=instagram ...) : quelques caracteres simples seulement
  const source = String(body.s || '').toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 24) || undefined
  try {
    await countEvent(event, { source })
  } catch (e) {
    console.error('track', e)
  }
  return json(200, { ok: true })
}

export const config = { path: '/api/track' }

// Demande de devis « Ecole » (formulaire public de la page Ecoles).
// Enregistree dans schoolRequests (lisible seulement par le serveur), visible dans le tableau de bord proprietaire.
import { db, json, FieldValue, countEvent } from '../lib/shared.mjs'

const clip = (v, n) => String(v ?? '').trim().slice(0, n)

export default async (req) => {
  if (req.method !== 'POST') return json(405, { error: 'method' })
  const b = await req.json().catch(() => ({}))
  if (b.website) return json(200, { ok: true }) // piege a robots
  const r = {
    school: clip(b.school, 120),
    name: clip(b.name, 80),
    email: clip(b.email, 120).toLowerCase(),
    city: clip(b.city, 80),
    students: Math.max(0, Math.min(5000, parseInt(b.students, 10) || 0)),
    message: clip(b.message, 1000),
    lang: clip(b.lang, 5),
  }
  if (!r.school || !r.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r.email)) return json(400, { error: 'fields' })
  await db().collection('schoolRequests').add({ ...r, status: 'new', at: FieldValue.serverTimestamp() })
  await countEvent('school_request').catch(() => {})
  return json(200, { ok: true })
}

export const config = { path: '/api/school-request' }

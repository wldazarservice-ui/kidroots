// Page de succes apres l'achat d'une carte cadeau : renvoie le code (cree au besoin, idempotent)
import { stripe, json, ensureGift } from '../lib/shared.mjs'

export default async (req) => {
  if (req.method !== 'POST') return json(405, { error: 'method' })
  const { sessionId } = await req.json().catch(() => ({}))
  if (typeof sessionId !== 'string' || !/^cs_[A-Za-z0-9_]+$/.test(sessionId)) return json(400, { error: 'session' })
  const session = await stripe().checkout.sessions.retrieve(sessionId)
  if (session.metadata?.kind !== 'gift') return json(400, { error: 'kind' })
  if (session.payment_status !== 'paid') return json(200, { pending: true })
  const gift = await ensureGift(session)
  return json(200, gift)
}

export const config = { path: '/api/gift-status' }

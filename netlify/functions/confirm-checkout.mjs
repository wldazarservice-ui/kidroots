// Au retour de Stripe : verifie la session et debloque le compte sans attendre le webhook
import { stripe, verifyUser, syncSubscription, countEvent, json, PLANS } from '../lib/shared.mjs'

export default async (req) => {
  if (req.method !== 'POST') return json(405, { error: 'method' })
  const user = await verifyUser(req)
  if (!user) return json(401, { error: 'auth' })

  const { sessionId } = await req.json().catch(() => ({}))
  if (!sessionId || typeof sessionId !== 'string') return json(400, { error: 'session' })

  const session = await stripe().checkout.sessions.retrieve(sessionId, { expand: ['subscription'] })
  if (session.client_reference_id !== user.uid) return json(403, { error: 'owner' })
  const sub = session.subscription
  if (!sub || typeof sub === 'string') return json(200, { premium: false })

  const isNew = await syncSubscription(user.uid, sub)
  if (isNew) await (sub.status === 'trialing' ? countEvent('trial') : countEvent('purchase', { plan: sub.items?.data?.[0]?.price?.recurring?.interval })).catch(() => {})
  const item = sub.items?.data?.[0]
  const end = sub.status === 'trialing' ? sub.trial_end : (item?.current_period_end || sub.current_period_end)
  return json(200, {
    premium: ['active', 'trialing', 'past_due'].includes(sub.status),
    trialing: sub.status === 'trialing',
    plan: item?.price?.recurring?.interval || null,
    tier: PLANS[sub.metadata?.plan]?.tier || 'family',
    until: end ? new Date(end * 1000).toISOString() : null,
  })
}

export const config = { path: '/api/confirm-checkout' }

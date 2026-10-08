// Au retour de Stripe : verifie la session et debloque le compte sans attendre le webhook
import { stripe, verifyUser, grantPremium, json } from '../lib/shared.mjs'

export default async (req) => {
  if (req.method !== 'POST') return json(405, { error: 'method' })
  const user = await verifyUser(req)
  if (!user) return json(401, { error: 'auth' })

  const { sessionId } = await req.json().catch(() => ({}))
  if (!sessionId || typeof sessionId !== 'string') return json(400, { error: 'session' })

  const session = await stripe().checkout.sessions.retrieve(sessionId)
  if (session.client_reference_id !== user.uid) return json(403, { error: 'owner' })
  if (session.payment_status !== 'paid') return json(200, { premium: false })

  await grantPremium(user.uid, session.id)
  return json(200, { premium: true })
}

export const config = { path: '/api/confirm-checkout' }

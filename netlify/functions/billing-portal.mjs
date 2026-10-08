// Espace client Stripe : changer de formule, moyen de paiement, factures, resiliation
import { stripe, verifyUser, db, json } from '../lib/shared.mjs'

export default async (req) => {
  if (req.method !== 'POST') return json(405, { error: 'method' })
  const user = await verifyUser(req)
  if (!user) return json(401, { error: 'auth' })
  const snap = await db().doc(`users/${user.uid}`).get()
  const customer = snap.exists ? snap.data().stripeCustomerId : null
  if (!customer) return json(404, { error: 'no-subscription' })
  const origin = process.env.URL || new URL(req.url).origin
  const session = await stripe().billingPortal.sessions.create({ customer, return_url: `${origin}/` })
  return json(200, { url: session.url })
}

export const config = { path: '/api/billing-portal' }

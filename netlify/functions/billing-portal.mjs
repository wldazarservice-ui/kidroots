// Espace client Stripe : moyen de paiement, factures, resiliation, reprise.
// body.flow : 'cancel' (resilier), 'payment' (changer de carte) ou rien (accueil de l'espace client).
import { stripe, verifyUser, db, json } from '../lib/shared.mjs'

export default async (req) => {
  if (req.method !== 'POST') return json(405, { error: 'method' })
  const user = await verifyUser(req)
  if (!user) return json(401, { error: 'auth' })
  const body = await req.json().catch(() => ({}))
  const snap = await db().doc(`users/${user.uid}`).get()
  const d = snap.exists ? snap.data() : {}
  if (!d.stripeCustomerId) return json(404, { error: 'no-subscription' })
  const origin = process.env.URL || new URL(req.url).origin
  const base = { customer: d.stripeCustomerId, return_url: `${origin}/?portal=back` }

  let flow_data
  if (body.flow === 'cancel' && d.subscriptionId && !d.cancelAtPeriodEnd) {
    flow_data = { type: 'subscription_cancel', subscription_cancel: { subscription: d.subscriptionId }, after_completion: { type: 'redirect', redirect: { return_url: base.return_url } } }
  } else if (body.flow === 'payment') {
    flow_data = { type: 'payment_method_update', after_completion: { type: 'redirect', redirect: { return_url: base.return_url } } }
  }
  try {
    const session = await stripe().billingPortal.sessions.create({ ...base, ...(flow_data && { flow_data }) })
    return json(200, { url: session.url })
  } catch (e) {
    // Parcours direct non disponible (reglages de l'espace client) : on ouvre l'accueil de l'espace client
    if (!flow_data) throw e
    console.error('portal flow', e.message)
    const session = await stripe().billingPortal.sessions.create(base)
    return json(200, { url: session.url })
  }
}

export const config = { path: '/api/billing-portal' }

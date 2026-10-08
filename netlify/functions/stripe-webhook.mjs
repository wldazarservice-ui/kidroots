// Notification Stripe (source de verite) : debloque le compte quand le paiement est encaisse
import { stripe, grantPremium, json } from './_shared.mjs'

export default async (req) => {
  if (req.method !== 'POST') return json(405, { error: 'method' })
  const raw = await req.text()
  let event
  try {
    event = stripe().webhooks.constructEvent(raw, req.headers.get('stripe-signature'), process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    return json(400, { error: `signature: ${err.message}` })
  }

  if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
    const session = event.data.object
    const uid = session.client_reference_id || session.metadata?.uid
    if (uid && session.payment_status === 'paid') await grantPremium(uid, session.id)
  }
  return json(200, { received: true })
}

export const config = { path: '/api/stripe-webhook' }

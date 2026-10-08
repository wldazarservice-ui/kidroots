// Notifications Stripe (source de verite) : debut, renouvellement, resiliation de l'abonnement.
// Evenements a cocher dans Stripe : checkout.session.completed, customer.subscription.updated,
// customer.subscription.deleted, invoice.paid
import { stripe, syncSubscription, countEvent, json } from '../lib/shared.mjs'

const uidOf = (obj) => obj?.metadata?.uid || null

export default async (req) => {
  if (req.method !== 'POST') return json(405, { error: 'method' })
  const raw = await req.text()
  let event
  try {
    event = stripe().webhooks.constructEvent(raw, req.headers.get('stripe-signature'), process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    return json(400, { error: `signature: ${err.message}` })
  }
  const obj = event.data.object

  switch (event.type) {
    case 'checkout.session.completed': {
      if (obj.mode !== 'subscription' || !obj.subscription) break
      const uid = obj.client_reference_id || uidOf(obj)
      const sub = await stripe().subscriptions.retrieve(obj.subscription)
      if (uid && (await syncSubscription(uid, sub))) {
        await countEvent('purchase', { plan: sub.items?.data?.[0]?.price?.recurring?.interval })
      }
      break
    }
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted': {
      const uid = uidOf(obj)
      if (!uid) break
      await syncSubscription(uid, obj)
      const prev = event.data.previous_attributes || {}
      const cancelled = event.type === 'customer.subscription.deleted' || (obj.cancel_at_period_end && prev.cancel_at_period_end === false)
      if (cancelled) await countEvent('cancel')
      break
    }
    case 'invoice.paid': {
      if (obj.amount_paid > 0) await countEvent('payment', { revenueCents: obj.amount_paid })
      break
    }
  }
  return json(200, { received: true })
}

export const config = { path: '/api/stripe-webhook' }

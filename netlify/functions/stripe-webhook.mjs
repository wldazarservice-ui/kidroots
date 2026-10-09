// Notifications Stripe (source de verite) : debut, renouvellement, resiliation de l'abonnement.
// Evenements a cocher dans Stripe : checkout.session.completed, customer.subscription.updated,
// customer.subscription.deleted, invoice.paid
import { stripe, syncSubscription, countEvent, json, db, FieldValue, PLANS } from '../lib/shared.mjs'

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
        await (sub.status === 'trialing' ? countEvent('trial') : countEvent('purchase', { plan: sub.items?.data?.[0]?.price?.recurring?.interval }))
      }
      if (uid) await rewardReferral(obj, uid).catch((e) => console.error('referral reward', e.message))
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
      // Fin de l'essai gratuit : premier vrai paiement = nouvel abonne
      if (prev.status === 'trialing' && obj.status === 'active') await countEvent('purchase', { plan: obj.items?.data?.[0]?.price?.recurring?.interval })
      break
    }
    case 'invoice.paid': {
      if (obj.amount_paid > 0) await countEvent('payment', { revenueCents: obj.amount_paid })
      break
    }
  }
  return json(200, { received: true })
}

// Parrainage : le filleul a payé → le parrain gagne 1 mois (réduction sur sa prochaine facture,
// ou crédit gardé s'il n'est pas encore abonné). Idempotent grâce au document referrals/{sessionId}.
async function rewardReferral(session, uid) {
  const m = session.metadata || {}
  if (!m.referrer && m.used_credit !== '1') return
  const lock = db().doc(`referrals/${session.id}`)
  const fresh = await db().runTransaction(async (tx) => {
    if ((await tx.get(lock)).exists) return false
    tx.set(lock, { uid, referrer: m.referrer || null, usedCredit: m.used_credit === '1', at: FieldValue.serverTimestamp() })
    return true
  })
  if (!fresh) return
  if (m.used_credit === '1') {
    await db().doc(`users/${uid}`).set({ refCredits: FieldValue.increment(-1) }, { merge: true })
  }
  if (m.referrer) {
    await db().doc(`users/${uid}`).set({ referredBy: m.referrer }, { merge: true })
    const rref = db().doc(`users/${m.referrer}`)
    const r = (await rref.get()).data() || {}
    if (r.stripeCustomerId && r.subscriptionId && r.premium) {
      await stripe().customers.createBalanceTransaction(r.stripeCustomerId, { amount: -PLANS.month.cents, currency: 'eur', description: 'Parrainage Mokalibo : 1 mois offert' })
      await rref.set({ refCount: FieldValue.increment(1) }, { merge: true })
    } else {
      await rref.set({ refCount: FieldValue.increment(1), refCredits: FieldValue.increment(1) }, { merge: true })
    }
    await countEvent('referral').catch(() => {})
  }
}

export const config = { path: '/api/stripe-webhook' }

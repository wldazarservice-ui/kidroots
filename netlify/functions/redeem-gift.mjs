// Activer un code cadeau sur son compte parent.
// - sans abonnement en cours : acces illimite pendant 12 mois (cumulable)
// - avec un abonnement Stripe en cours : 14,99 € deduits des prochaines factures
import { verifyUser, db, json, FieldValue, stripe, normGiftCode, giftActive, GIFT, TIERS, countEvent, today } from '../lib/shared.mjs'

const ACTIVE = ['active', 'trialing', 'past_due']

export default async (req) => {
  if (req.method !== 'POST') return json(405, { error: 'method' })
  const user = await verifyUser(req)
  if (!user) return json(401, { error: 'auth' })
  const code = normGiftCode((await req.json().catch(() => ({}))).code)
  if (!/^MOKA-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(code)) return json(400, { error: 'code' })

  // Anti-devinette : 10 essais par jour et par compte
  const tries = db().doc(`giftTries/${user.uid}_${today()}`)
  const n = (await tries.get()).data()?.n || 0
  if (n >= 10) return json(429, { error: 'limit' })
  await tries.set({ n: n + 1 }, { merge: true })

  const userRef = db().doc(`users/${user.uid}`)
  const giftRef = db().doc(`gifts/${code}`)
  const result = await db().runTransaction(async (tx) => {
    const [g, u] = await Promise.all([tx.get(giftRef), tx.get(userRef)])
    if (!g.exists) return { error: 'unknown' }
    if (g.data().status !== 'new') return { error: g.data().usedBy === user.uid ? 'mine' : 'used' }
    const d = u.data() || {}
    const subscribed = !!d.subscriptionId && ACTIVE.includes(d.subStatus) && !!d.stripeCustomerId
    tx.set(giftRef, { status: 'used', usedBy: user.uid, usedAt: FieldValue.serverTimestamp(), appliedAs: subscribed ? 'credit' : 'access' }, { merge: true })
    if (subscribed) return { applied: 'credit', customer: d.stripeCustomerId }
    const base = giftActive(d) ? (d.giftUntil.toDate ? d.giftUntil.toDate() : new Date(d.giftUntil)) : new Date()
    const until = new Date(base); until.setMonth(until.getMonth() + (g.data().months || GIFT.months))
    const limits = d.school || d.tier === 'teacher' ? {} : { tier: 'family', ...TIERS.family }
    tx.set(userRef, { premium: true, giftUntil: until, premiumAt: d.premiumAt || FieldValue.serverTimestamp(), ...limits }, { merge: true })
    return { applied: 'access', until: until.toISOString() }
  })
  if (result.error) return json(400, result)
  if (result.applied === 'credit') {
    await stripe().customers.createBalanceTransaction(result.customer, { amount: -GIFT.cents, currency: 'eur', description: `Carte cadeau Mokalibo ${code}` })
  }
  await countEvent('gift_redeem').catch(() => {})
  return json(200, { applied: result.applied, until: result.until || null })
}

export const config = { path: '/api/redeem-gift' }

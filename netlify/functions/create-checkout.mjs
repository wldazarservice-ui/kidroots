// Cree une session d'abonnement Stripe (Formule Famille, mensuelle ou annuelle) pour le compte parent connecte
import { stripe, verifyUser, db, json, PLANS, countEvent, ensureRefCoupon, findReferrer, TRIAL_DAYS, trialEligible } from '../lib/shared.mjs'

const KLEIN = process.env.KLEINUNTERNEHMER !== 'false'
const TAX_NOTE = 'Gemäß § 19 UStG wird keine Umsatzsteuer berechnet. · TVA non applicable (§ 19 UStG, Kleinunternehmer).'
const trialNote = (P) => `${TRIAL_DAYS} Tage kostenlos, danach ${P.price} automatisch, jederzeit kündbar (vor Ablauf des Tests ohne Kosten). · ${TRIAL_DAYS} jours gratuits, puis ${P.price} automatiquement, résiliable à tout moment (sans frais avant la fin de l'essai).`

export default async (req) => {
  if (req.method !== 'POST') return json(405, { error: 'method' })
  const user = await verifyUser(req)
  if (!user) return json(401, { error: 'auth' })

  const body = await req.json().catch(() => ({}))
  const plan = PLANS[body.plan] ? body.plan : 'year'
  const P = PLANS[plan]
  // Contenu numerique : le parent demande l'execution immediate et renonce
  // expressement a son droit de retractation (§ 356 Abs. 5 BGB) avant de payer.
  if (body.waiver !== true) return json(400, { error: 'waiver' })
  const waiverAt = new Date().toISOString()

  const snap = await db().doc(`users/${user.uid}`).get()
  const ud = snap.exists ? snap.data() : {}
  if (ud.premium) return json(200, { alreadyPremium: true })

  const origin = process.env.URL || new URL(req.url).origin
  const meta = { uid: user.uid, plan, withdrawal_waiver_at: waiverAt, terms_version: '2026-10-sub' }
  // Parrainage (ne doit jamais bloquer le paiement)
  let discounts
  try {
    if ((ud.refCredits || 0) > 0) {
      discounts = [{ coupon: await ensureRefCoupon() }]
      meta.used_credit = '1'
    } else if (body.ref && !ud.stripeCustomerId && !ud.referredBy) {
      const referrer = await findReferrer(body.ref)
      if (referrer && referrer.uid !== user.uid) {
        discounts = [{ coupon: await ensureRefCoupon() }]
        meta.referrer = referrer.uid
      }
    }
  } catch (e) { console.error('referral', e.message); discounts = undefined }
  // Essai gratuit : 1re fois seulement, et pas en meme temps qu'une reduction de parrainage
  const trial = !discounts && trialEligible(ud)
  if (trial) meta.trial_days = String(TRIAL_DAYS)
  const note = [trial && trialNote(P), KLEIN && TAX_NOTE].filter(Boolean).join(' · ')
  const session = await stripe().checkout.sessions.create({
    mode: 'subscription',
    line_items: [{
      quantity: 1,
      price_data: {
        currency: 'eur',
        unit_amount: P.cents,
        recurring: { interval: P.interval },
        product_data: { name: P.label },
      },
    }],
    client_reference_id: user.uid,
    metadata: meta,
    ...(discounts && { discounts }),
    subscription_data: {
      metadata: meta,
      description: 'Mokalibo Famille : 5 enfants, 5 appareils, aventures illimitées. Résiliable à tout moment.',
      ...(trial && { trial_period_days: TRIAL_DAYS, trial_settings: { end_behavior: { missing_payment_method: 'cancel' } } }),
    },
    payment_method_collection: 'always',
    ...(ud.stripeCustomerId ? { customer: ud.stripeCustomerId } : { customer_email: user.email || undefined }),
    locale: 'auto',
    ...(note && { custom_text: { submit: { message: note } } }),
    success_url: `${origin}/?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/?checkout=cancel`,
  })
  await countEvent('checkout_start', { plan }).catch(() => {})
  return json(200, { url: session.url, discount: !!discounts, trial })
}

export const config = { path: '/api/create-checkout' }

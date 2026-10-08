// Cree une session d'abonnement Stripe (Formule Famille, mensuelle ou annuelle) pour le compte parent connecte
import { stripe, verifyUser, db, json, PLANS, countEvent } from '../lib/shared.mjs'

const KLEIN = process.env.KLEINUNTERNEHMER !== 'false'
const TAX_NOTE = 'Gemäß § 19 UStG wird keine Umsatzsteuer berechnet. · TVA non applicable (§ 19 UStG, Kleinunternehmer).'

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
    subscription_data: { metadata: meta, description: 'Mokalibo Famille : 5 enfants, 5 appareils, aventures illimitées. Résiliable à tout moment.' },
    ...(ud.stripeCustomerId ? { customer: ud.stripeCustomerId } : { customer_email: user.email || undefined }),
    locale: 'auto',
    ...(KLEIN && { custom_text: { submit: { message: TAX_NOTE } } }),
    success_url: `${origin}/?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/?checkout=cancel`,
  })
  await countEvent('checkout_start', { plan }).catch(() => {})
  return json(200, { url: session.url })
}

export const config = { path: '/api/create-checkout' }

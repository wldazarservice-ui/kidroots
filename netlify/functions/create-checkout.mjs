// Cree une session de paiement Stripe (2 € a vie) pour le compte parent connecte
import { stripe, verifyUser, db, json, PRICE_CENTS } from '../lib/shared.mjs'

export default async (req) => {
  if (req.method !== 'POST') return json(405, { error: 'method' })
  const user = await verifyUser(req)
  if (!user) return json(401, { error: 'auth' })

  const snap = await db().doc(`users/${user.uid}`).get()
  if (snap.exists && snap.data().premium) return json(200, { alreadyPremium: true })

  const origin = process.env.URL || new URL(req.url).origin
  const session = await stripe().checkout.sessions.create({
    mode: 'payment',
    line_items: [{
      quantity: 1,
      price_data: {
        currency: 'eur',
        unit_amount: PRICE_CENTS,
        product_data: {
          name: 'Mokalibo — accès à vie',
          description: 'Tous les pays et toutes les histoires, pour tous les enfants du compte. Paiement unique, sans abonnement.',
        },
      },
    }],
    client_reference_id: user.uid,
    metadata: { uid: user.uid },
    payment_intent_data: { metadata: { uid: user.uid } },
    customer_email: user.email || undefined,
    locale: 'auto',
    success_url: `${origin}/?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/?checkout=cancel`,
  })
  return json(200, { url: session.url })
}

export const config = { path: '/api/create-checkout' }

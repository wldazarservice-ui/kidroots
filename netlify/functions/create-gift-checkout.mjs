// Achat d'une carte cadeau « Offrir Mokalibo » (paiement unique, sans compte necessaire)
import { stripe, json, GIFT, countEvent, verifyUser } from '../lib/shared.mjs'

const clip = (v, n) => String(v ?? '').trim().slice(0, n)
const KLEIN = process.env.KLEINUNTERNEHMER !== 'false'
const NOTE = 'Carte cadeau valable 3 ans · code affiché juste après le paiement et envoyé par e-mail · Geschenkkarte, 3 Jahre gültig.'
  + (KLEIN ? ' · Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.' : '')

export default async (req) => {
  if (req.method !== 'POST') return json(405, { error: 'method' })
  const b = await req.json().catch(() => ({}))
  const user = await verifyUser(req) // facultatif
  const origin = process.env.URL || new URL(req.url).origin
  const session = await stripe().checkout.sessions.create({
    mode: 'payment',
    line_items: [{ quantity: 1, price_data: { currency: 'eur', unit_amount: GIFT.cents, product_data: { name: GIFT.label } } }],
    metadata: { kind: 'gift', to: clip(b.to, 60), from: clip(b.from, 60), message: clip(b.message, 300), buyer_uid: user?.uid || '' },
    ...(user?.email && { customer_email: user.email }),
    locale: 'auto',
    custom_text: { submit: { message: NOTE } },
    success_url: `${origin}/?cadeau_achat={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/#offrir`,
  })
  await countEvent('checkout_start', { plan: 'gift' }).catch(() => {})
  return json(200, { url: session.url })
}

export const config = { path: '/api/create-gift-checkout' }

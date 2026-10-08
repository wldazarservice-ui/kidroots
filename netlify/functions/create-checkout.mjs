// Cree une session de paiement Stripe (2 € a vie) pour le compte parent connecte
import { stripe, verifyUser, db, json, PRICE_CENTS } from '../lib/shared.mjs'

export default async (req) => {
  if (req.method !== 'POST') return json(405, { error: 'method' })
  const user = await verifyUser(req)
  if (!user) return json(401, { error: 'auth' })

  // Contenu numerique : le parent doit demander l'execution immediate et renoncer
  // expressement a son droit de retractation (§ 356 Abs. 5 BGB) avant de payer.
  const body = await req.json().catch(() => ({}))
  if (body.waiver !== true) return json(400, { error: 'waiver' })
  const waiverAt = new Date().toISOString()

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
    metadata: { uid: user.uid, withdrawal_waiver_at: waiverAt, terms_version: '2026-10' },
    payment_intent_data: { metadata: { uid: user.uid, withdrawal_waiver_at: waiverAt } },
    customer_email: user.email || undefined,
    locale: 'auto',
    // Kleinunternehmer (§ 19 UStG) : aucune TVA facturee. Mettre KLEINUNTERNEHMER=false dans Netlify si ce n'est plus le cas.
    ...(process.env.KLEINUNTERNEHMER !== 'false' && {
      custom_text: { submit: { message: 'Gemäß § 19 UStG wird keine Umsatzsteuer berechnet. · TVA non applicable (§ 19 UStG, Kleinunternehmer).' } },
    }),
    // Facture (Rechnung) numerotee envoyee par e-mail apres paiement, avec la mention fiscale
    invoice_creation: {
      enabled: true,
      invoice_data: {
        description: 'Mokalibo — accès à vie (paiement unique, sans abonnement)',
        footer: process.env.KLEINUNTERNEHMER !== 'false'
          ? 'Gemäß § 19 UStG wird keine Umsatzsteuer berechnet (Kleinunternehmerregelung). · TVA non applicable, article § 19 UStG (régime des petites entreprises).'
          : undefined,
        metadata: { uid: user.uid },
      },
    },
    success_url: `${origin}/?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/?checkout=cancel`,
  })
  return json(200, { url: session.url })
}

export const config = { path: '/api/create-checkout' }

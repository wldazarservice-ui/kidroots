// Kuendigungsbutton (§ 312k BGB) : resiliation sans connexion, par nom + e-mail.
// L'abonnement s'arrete a la fin de la periode deja payee. La demande est archivee (preuve).
import { stripe, db, countEvent, json, FieldValue } from '../lib/shared.mjs'

const clean = (v, n) => String(v || '').trim().slice(0, n)

async function sendMail(to, subject, text) {
  if (!process.env.RESEND_API_KEY || !process.env.MAIL_FROM) return false
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({ from: process.env.MAIL_FROM, to: [to], bcc: process.env.MAIL_BCC ? [process.env.MAIL_BCC] : undefined, subject, text }),
  })
  return res.ok
}

export default async (req) => {
  if (req.method !== 'POST') return json(405, { error: 'method' })
  const body = await req.json().catch(() => ({}))
  const name = clean(body.name, 120)
  const email = clean(body.email, 200).toLowerCase()
  const kind = body.kind === 'extraordinary' ? 'außerordentlich' : 'ordentlich'
  const reason = clean(body.reason, 1000)
  if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json(400, { error: 'fields' })

  const at = new Date()
  let ends = []
  try {
    const customers = await stripe().customers.list({ email, limit: 10 })
    for (const c of customers.data) {
      const subs = await stripe().subscriptions.list({ customer: c.id, status: 'all', limit: 20 })
      for (const s of subs.data) {
        if (!['active', 'trialing', 'past_due'].includes(s.status)) continue
        const upd = await stripe().subscriptions.update(s.id, { cancel_at_period_end: true, metadata: { ...s.metadata, cancel_request_at: at.toISOString() } })
        const end = upd.items?.data?.[0]?.current_period_end || upd.current_period_end
        if (end) ends.push(new Date(end * 1000))
      }
    }
  } catch (e) {
    console.error('cancel-request stripe', e)
  }

  await db().collection('cancellations').add({ name, email, kind, reason, at: FieldValue.serverTimestamp(), subscriptions: ends.length })
  if (ends.length) await countEvent('cancel').catch(() => {})

  const fmt = (d) => d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
  const endText = ends.length ? `Ihr Abonnement endet am ${ends.map(fmt).join(', ')}. Bis dahin bleibt der Zugang bestehen.` : 'Wir prüfen Ihre Kündigung und melden uns, falls wir keinen Vertrag zu dieser E-Mail-Adresse finden.'
  const mailed = await sendMail(email, 'Bestätigung Ihrer Kündigung – Mokalibo',
    `Hallo ${name},\n\nwir bestätigen den Eingang Ihrer ${kind}en Kündigung am ${at.toLocaleString('de-DE')}.\n${endText}\n\nMokalibo · Azar Consulting · Zur Schweiz 3a, 54516 Wittlich\n`).catch(() => false)

  return json(200, { ok: true, at: at.toISOString(), ends: ends.map((d) => d.toISOString()), mailed })
}

export const config = { path: '/api/cancel-request' }

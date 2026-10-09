// Formulaire « Aide et contact » (site et app). Le message est enregistre dans supportRequests
// (visible dans le tableau de bord du proprietaire) et envoye par e-mail au proprietaire si Resend est configure.
import { db, json, FieldValue, countEvent, verifyUser, sendMail, ownerEmails } from '../lib/shared.mjs'

const clip = (v, n) => String(v ?? '').trim().slice(0, n)
const TOPICS = { question: 'Question', bug: 'Problème technique', payment: 'Paiement / abonnement', cancel: 'Résiliation', school: 'École / enseignant', idea: 'Idée / avis', other: 'Autre' }

export default async (req) => {
  if (req.method !== 'POST') return json(405, { error: 'method' })
  const b = await req.json().catch(() => ({}))
  if (b.website) return json(200, { ok: true }) // piege a robots
  const user = await verifyUser(req) // facultatif : message envoye depuis un compte connecte
  const r = {
    topic: TOPICS[b.topic] ? b.topic : 'other',
    message: clip(b.message, 2000),
    email: clip(b.email || user?.email, 160).toLowerCase(),
    name: clip(b.name, 80),
    lang: clip(b.lang, 5),
    where: clip(b.where, 30),
    uid: user?.uid || null,
  }
  if (r.message.length < 5 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r.email)) return json(400, { error: 'fields' })

  // Anti-abus simple : 5 messages maximum par adresse et par jour
  const day = new Date().toISOString().slice(0, 10)
  const limRef = db().doc(`supportLimits/${day}_${r.email.replace(/[^a-z0-9@._-]/g, '_')}`)
  const ok = await db().runTransaction(async (tx) => {
    const n = (await tx.get(limRef)).data()?.n || 0
    if (n >= 5) return false
    tx.set(limRef, { n: n + 1, day }, { merge: true })
    return true
  })
  if (!ok) return json(429, { error: 'limit' })

  let premium = false
  if (r.uid) premium = !!(await db().doc(`users/${r.uid}`).get()).data()?.premium
  const ref = await db().collection('supportRequests').add({ ...r, premium, status: 'new', at: FieldValue.serverTimestamp() })
  await countEvent('support').catch(() => {})
  await sendMail({
    to: ownerEmails(),
    replyTo: r.email,
    subject: `[Mokalibo support] ${TOPICS[r.topic]} — ${r.email}`,
    text: `${r.message}\n\n——\nDe : ${r.name || '(sans nom)'} <${r.email}>\nSujet : ${TOPICS[r.topic]}\nCompte : ${r.uid ? (premium ? 'abonné' : 'gratuit') : 'sans compte'} · Langue : ${r.lang} · Depuis : ${r.where}\nRéf. : ${ref.id}\n\nRépondez directement à cet e-mail pour écrire au parent.`,
  })
  return json(200, { ok: true })
}

export const config = { path: '/api/support' }

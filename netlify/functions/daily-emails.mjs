// Tache planifiee (chaque jour 7 h UTC) : e-mails automatiques.
// 1. Rappel de fin d'essai (service, a tous les essais en cours) ~1 a 2 jours avant la fin
// 2. Bienvenue (lendemain de l'inscription) et relance J+3 (comptes gratuits) : seulement avec accord (emailOptIn)
// 3. Le dimanche : bilan de la semaine des enfants (avec accord), s'il y a eu de l'activite
// Rien n'est marque « envoye » si l'envoi echoue (ex. Resend pas encore configure).
import { db, sendMail, PLANS } from '../lib/shared.mjs'
import { trialEndMail, welcomeMail, day3Mail, weeklyMail } from '../lib/emails.mjs'

const H = 3600 * 1000
const toDate = (v) => (v?.toDate ? v.toDate() : v ? new Date(v) : null)
const isoWeek = (d = new Date()) => {
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
  t.setUTCDate(t.getUTCDate() + 4 - (t.getUTCDay() || 7))
  const y = new Date(Date.UTC(t.getUTCFullYear(), 0, 1))
  return `${t.getUTCFullYear()}-W${String(Math.ceil(((t - y) / 864e5 + 1) / 7)).padStart(2, '0')}`
}
const dayKey = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

async function kidsOf(uid) {
  const snap = await db().collection(`users/${uid}/children`).get()
  return snap.docs.map((d) => ({ id: d.id, ref: d.ref, ...d.data() }))
}
const langOf = (kids) => (['fr', 'de', 'en'].includes(kids[0]?.lang) ? kids[0].lang : 'fr')
const mark = (ref, key, value) => ref.set({ mail: { [key]: value } }, { merge: true })

export default async () => {
  const now = new Date()
  const log = { trial: 0, welcome: 0, day3: 0, weekly: 0 }

  // 1. Fin d'essai
  const trials = await db().collection('users').where('subStatus', '==', 'trialing').get()
  for (const doc of trials.docs) {
    const d = doc.data()
    const until = toDate(d.premiumUntil)
    if (!d.email || !until || d.cancelAtPeriodEnd || d.mail?.trialEnd === d.subscriptionId) continue
    const left = until - now
    if (left <= 0 || left > 60 * H) continue
    const kids = await kidsOf(doc.id)
    const lang = langOf(kids)
    const P = PLANS[`${d.tier === 'teacher' ? 'teacher_' : ''}${d.plan === 'year' ? 'year' : 'month'}`] || PLANS.month
    const price = P.price || ''
    if (await sendMail({ to: d.email, ...trialEndMail({ lang, until, price }) })) { await mark(doc.ref, 'trialEnd', d.subscriptionId); log.trial++ }
  }

  // 2. Bienvenue et relance J+3 (avec accord)
  const recent = await db().collection('users').where('createdAt', '>=', new Date(now - 6 * 24 * H)).get()
  for (const doc of recent.docs) {
    const d = doc.data()
    if (!d.email || d.emailOptIn !== true) continue
    const age = now - (toDate(d.createdAt) || now)
    const kids = await kidsOf(doc.id)
    const lang = langOf(kids)
    if (!d.mail?.welcome && age > 0.3 * H) {
      if (await sendMail({ to: d.email, ...welcomeMail({ lang, uid: doc.id }) })) { await mark(doc.ref, 'welcome', now); log.welcome++ }
    } else if (!d.mail?.day3 && !d.premium && age >= 3 * 24 * H && kids.length) {
      if (await sendMail({ to: d.email, ...day3Mail({ lang, uid: doc.id, kids }) })) { await mark(doc.ref, 'day3', now); log.day3++ }
    }
  }

  // 3. Le dimanche : bilan de la semaine (avec accord)
  if (now.getUTCDay() === 0) {
    const week = isoWeek(now)
    const days = Array.from({ length: 7 }, (_, i) => dayKey(new Date(now - i * 24 * H)))
    const opted = await db().collection('users').where('emailOptIn', '==', true).get()
    for (const doc of opted.docs) {
      const d = doc.data()
      if (!d.email || d.mail?.weekly === week) continue
      const kids = await kidsOf(doc.id)
      if (!kids.length) continue
      const rows = []
      for (const k of kids) {
        const snap = k.weekSnap || {}
        const secs = days.reduce((s, day) => s + (k.stats?.days?.[day] || 0), 0)
        const doneN = Object.keys(k.done || {}).length
        const visits = Object.fromEntries(Object.entries(k.stats?.countries || {}).map(([c, v]) => [c, v.visits || 0]))
        const countries = Object.keys(visits).filter((c) => visits[c] > (snap.visits?.[c] || 0))
        rows.push({ name: (k.name || '').split(' ')[0] || '🧒', minutes: Math.round(secs / 60), chapters: Math.max(0, doneN - (snap.done ?? doneN)), xp: Math.max(0, (k.xp || 0) - (snap.xp ?? (k.xp || 0))), countries, ref: k.ref, snapNew: { xp: k.xp || 0, done: doneN, visits, at: now } })
      }
      // Instantane pour la semaine suivante (meme sans envoi)
      await Promise.all(rows.map((r) => r.ref.set({ weekSnap: r.snapNew }, { merge: true })))
      if (!rows.some((r) => r.minutes > 0 || r.chapters > 0)) continue
      const mail = weeklyMail({ lang: langOf(kids), uid: doc.id, rows, premium: !!d.premium })
      if (await sendMail({ to: d.email, ...mail })) { await mark(doc.ref, 'weekly', week); log.weekly++ }
    }
  }
  console.log('daily-emails', JSON.stringify(log))
}

export const config = { schedule: '0 7 * * *' }

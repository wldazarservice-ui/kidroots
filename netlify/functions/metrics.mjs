// Tableau de bord du proprietaire : chiffres des 30 derniers jours
import { verifyUser, isOwner, db, json, giftActive } from '../lib/shared.mjs'

export default async (req) => {
  const user = await verifyUser(req)
  if (!user) return json(401, { error: 'auth' })
  if (!isOwner(user)) return json(403, { error: 'owner' })

  const days = Math.min(90, Math.max(1, Number(new URL(req.url).searchParams.get('days')) || 30))
  const from = new Date(Date.now() - (days - 1) * 86400000).toISOString().slice(0, 10)
  const snap = await db().collection('metrics').where('day', '>=', from).get()
  const rows = snap.docs.map((d) => ({ day: d.id, ...d.data() })).sort((a, b) => a.day.localeCompare(b.day))

  // Total des comptes, et les comptes avec l'acces complet classes par origine :
  // vrais abonnes payants, essais en cours, cartes cadeaux, ecoles, acces offerts (COMP_EMAILS, proprietaire, anciens achats a vie)
  const owners = (process.env.OWNER_EMAILS || 'wld.azarservice@gmail.com').split(',').map((e) => e.trim().toLowerCase())
  const [users, premSnap] = await Promise.all([
    db().collection('users').count().get(),
    db().collection('users').where('premium', '==', true).get(),
  ])
  const k = { paying: 0, trials: 0, gifts: 0, schools: 0, offered: 0 }
  for (const d of premSnap.docs) {
    const x = d.data()
    if (owners.includes((x.email || '').toLowerCase()) || x.comp) k.offered++
    else if (x.school) k.schools++
    else if (x.subscriptionId && x.subStatus === 'trialing') k.trials++
    else if (x.subscriptionId && ['active', 'past_due'].includes(x.subStatus)) k.paying++
    else if (giftActive(x)) k.gifts++
    else k.offered++
  }
  // Dernieres demandes de devis des ecoles
  const reqSnap = await db().collection('schoolRequests').orderBy('at', 'desc').limit(20).get().catch(() => null)
  const schools = reqSnap ? reqSnap.docs.map((d) => { const x = d.data(); return { ...x, id: d.id, at: x.at?.toDate?.()?.toISOString() || null } }) : []
  // Derniers messages du support
  const supSnap = await db().collection('supportRequests').orderBy('at', 'desc').limit(40).get().catch(() => null)
  const support = supSnap ? supSnap.docs.map((d) => { const x = d.data(); return { ...x, id: d.id, at: x.at?.toDate?.()?.toISOString() || null } }) : []
  // Bugs signales par l'app (clientErrors/AAAA-MM-JJ)
  const errSnap = await db().collection('clientErrors').where('day', '>=', from).get().catch(() => null)
  const errors = errSnap ? errSnap.docs.flatMap((d) => Object.entries(d.data().errs || {}).map(([id, e]) => ({ id, day: d.id, ...e })))
    .sort((a, b) => (b.last || '').localeCompare(a.last || '')).slice(0, 50) : []
  return json(200, { rows, schools, support, errors, totals: { users: users.data().count, premium: premSnap.size, ...k } })
}

export const config = { path: '/api/metrics' }

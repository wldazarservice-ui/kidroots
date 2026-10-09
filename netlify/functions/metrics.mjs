// Tableau de bord du proprietaire : chiffres des 30 derniers jours
import { verifyUser, isOwner, db, json } from '../lib/shared.mjs'

export default async (req) => {
  const user = await verifyUser(req)
  if (!user) return json(401, { error: 'auth' })
  if (!isOwner(user)) return json(403, { error: 'owner' })

  const days = Math.min(90, Math.max(1, Number(new URL(req.url).searchParams.get('days')) || 30))
  const from = new Date(Date.now() - (days - 1) * 86400000).toISOString().slice(0, 10)
  const snap = await db().collection('metrics').where('day', '>=', from).get()
  const rows = snap.docs.map((d) => ({ day: d.id, ...d.data() })).sort((a, b) => a.day.localeCompare(b.day))

  // Total des comptes et des payants (tous les temps)
  const [users, paid] = await Promise.all([
    db().collection('users').count().get(),
    db().collection('users').where('premium', '==', true).count().get(),
  ])
  // Dernieres demandes de devis des ecoles
  const reqSnap = await db().collection('schoolRequests').orderBy('at', 'desc').limit(20).get().catch(() => null)
  const schools = reqSnap ? reqSnap.docs.map((d) => { const x = d.data(); return { ...x, id: d.id, at: x.at?.toDate?.()?.toISOString() || null } }) : []
  return json(200, { rows, schools, totals: { users: users.data().count, premium: paid.data().count } })
}

export const config = { path: '/api/metrics' }

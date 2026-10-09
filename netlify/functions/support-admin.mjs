// Proprietaire uniquement : marquer un message du support comme traite (ou nouveau).
import { verifyUser, isOwner, db, json } from '../lib/shared.mjs'

export default async (req) => {
  if (req.method !== 'POST') return json(405, { error: 'method' })
  const user = await verifyUser(req)
  if (!user) return json(401, { error: 'auth' })
  if (!isOwner(user)) return json(403, { error: 'owner' })
  const { id, status } = await req.json().catch(() => ({}))
  if (typeof id !== 'string' || !/^[A-Za-z0-9]{10,40}$/.test(id) || !['new', 'done'].includes(status)) return json(400, { error: 'fields' })
  await db().doc(`supportRequests/${id}`).set({ status }, { merge: true })
  return json(200, { ok: true })
}

export const config = { path: '/api/support-admin' }

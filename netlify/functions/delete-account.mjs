// Suppression definitive du compte parent (RGPD art. 17) : profils enfants, appareils, compte.
// Les justificatifs de paiement restent chez Stripe (obligation legale de conservation).
import { verifyUser, db, adminAuth, json } from '../lib/shared.mjs'

export default async (req) => {
  if (req.method !== 'POST') return json(405, { error: 'method' })
  const user = await verifyUser(req)
  if (!user) return json(401, { error: 'auth' })
  const { confirm } = await req.json().catch(() => ({}))
  if (confirm !== true) return json(400, { error: 'confirm' })

  const ref = db().doc(`users/${user.uid}`)
  await db().recursiveDelete(ref)
  await adminAuth().deleteUser(user.uid)
  return json(200, { deleted: true })
}

export const config = { path: '/api/delete-account' }

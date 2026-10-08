// Appele a la connexion : applique un acces offert (COMP_EMAILS) et renvoie l'etat de l'abonnement
import { verifyUser, isComp, isOwner, db, json, FieldValue } from '../lib/shared.mjs'

export default async (req) => {
  if (req.method !== 'POST') return json(405, { error: 'method' })
  const user = await verifyUser(req)
  if (!user) return json(401, { error: 'auth' })
  const ref = db().doc(`users/${user.uid}`)
  let data = (await ref.get()).data() || {}

  if (isComp(user)) {
    if (user.email_verified !== true) return json(200, { premium: !!data.premium, needVerify: true })
    if (!data.premium || !data.comp) {
      await ref.set({ premium: true, comp: true, premiumAt: data.premiumAt || FieldValue.serverTimestamp() }, { merge: true })
      data = { ...data, premium: true, comp: true }
    }
  }

  const kind = !data.premium ? 'free' : data.subscriptionId ? 'subscription' : data.comp ? 'gift' : 'lifetime'
  return json(200, {
    premium: !!data.premium,
    kind,
    plan: data.plan || null,
    until: data.premiumUntil?.toDate?.()?.toISOString() || null,
    cancelAtPeriodEnd: !!data.cancelAtPeriodEnd,
    owner: isOwner(user),
  })
}

export const config = { path: '/api/account-status' }

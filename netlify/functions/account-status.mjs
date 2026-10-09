// Appele a la connexion : applique un acces offert (COMP_EMAILS) et renvoie l'etat de l'abonnement
import { verifyUser, isComp, isOwner, isSchool, db, json, FieldValue, refCodeFor, trialEligible, TRIAL_DAYS, TIERS } from '../lib/shared.mjs'

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

  // Ecole (devis + facture) : acces active tant que l'email figure dans SCHOOL_EMAILS
  if (isSchool(user)) {
    if (user.email_verified !== true) return json(200, { premium: !!data.premium, needVerify: true })
    if (!data.school || !data.premium || data.maxChildren !== TIERS.school.maxChildren) {
      const upd = { premium: true, school: true, tier: 'school', ...TIERS.school, premiumAt: data.premiumAt || FieldValue.serverTimestamp() }
      await ref.set(upd, { merge: true })
      data = { ...data, ...upd }
    }
  } else if (data.school) {
    // Contrat ecole termine : retour au compte gratuit (les profils existants sont conserves)
    const keep = !!data.subscriptionId && ['active', 'trialing', 'past_due'].includes(data.subStatus)
    const upd = { school: false, premium: keep || !!data.comp, tier: 'family', ...TIERS.family }
    await ref.set(upd, { merge: true })
    data = { ...data, ...upd }
  }

  if (!data.refCode) {
    data.refCode = refCodeFor(user.uid)
    await ref.set({ refCode: data.refCode }, { merge: true }).catch(() => {})
  }

  const kind = !data.premium ? 'free' : data.school ? 'school' : data.subscriptionId ? 'subscription' : data.comp ? 'gift' : 'lifetime'
  return json(200, {
    premium: !!data.premium,
    kind,
    plan: data.plan || null,
    until: data.premiumUntil?.toDate?.()?.toISOString() || null,
    cancelAtPeriodEnd: !!data.cancelAtPeriodEnd,
    owner: isOwner(user),
    refCode: data.refCode,
    refCredits: data.refCredits || 0,
    refCount: data.refCount || 0,
    trial: trialEligible(data) ? TRIAL_DAYS : 0,
    tier: data.tier || 'family',
    maxChildren: data.maxChildren || TIERS.family.maxChildren,
    maxDevices: data.maxDevices || TIERS.family.maxDevices,
    trialing: data.subStatus === 'trialing',
  })
}

export const config = { path: '/api/account-status' }

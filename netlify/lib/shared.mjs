// Outils communs aux fonctions de paiement (Stripe + Firebase Admin)
import Stripe from 'stripe'
import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore, FieldValue } from 'firebase-admin/firestore'

// Formule Famille (5 enfants, 5 appareils) : abonnement mensuel ou annuel.
// Doit correspondre a PLANS dans src/premium.js
export const PLANS = {
  month: { cents: 199, interval: 'month', label: 'Mokalibo Famille — mensuel', price: '1,99 €/mois (Monat)' },
  year: { cents: 1499, interval: 'year', label: 'Mokalibo Famille — annuel', price: '14,99 €/an (Jahr)' },
}

// Essai gratuit (une seule fois par compte, carte demandee, abonnement lance automatiquement ensuite)
export const TRIAL_DAYS = 3
export const trialEligible = (ud = {}) => !ud.premium && !ud.stripeCustomerId && !ud.subscriptionId && !ud.trialUsed

let stripeClient
export const stripe = () => (stripeClient ||= new Stripe(process.env.STRIPE_SECRET_KEY))

function adminApp() {
  if (getApps().length) return getApps()[0]
  return initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID || 'kidroots-cdaf0',
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    }),
  })
}

export const db = () => getFirestore(adminApp())
export const adminAuth = () => getAuth(adminApp())

// Verifie le jeton Firebase envoye par l'app (en-tete Authorization: Bearer ...)
export async function verifyUser(req) {
  const header = req.headers.get('authorization') || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return null
  try {
    return await getAuth(adminApp()).verifyIdToken(token)
  } catch {
    return null
  }
}

// Statuts Stripe qui donnent acces a l'app (past_due : Stripe retente le prelevement, on laisse l'acces)
const ACTIVE = ['active', 'trialing', 'past_due']

// Synchronise l'abonnement Stripe sur le compte parent (seul le serveur peut ecrire ces champs).
// Renvoie true si le compte vient de devenir premium (pour compter les nouveaux abonnes une seule fois).
export async function syncSubscription(uid, sub) {
  const ref = db().doc(`users/${uid}`)
  const active = ACTIVE.includes(sub.status)
  const item = sub.items?.data?.[0]
  const periodEnd = item?.current_period_end || sub.current_period_end
  return db().runTransaction(async (tx) => {
    const snap = await tx.get(ref)
    const prev = snap.exists ? snap.data() : {}
    // Un ancien achat « a vie » reste valable quoi qu'il arrive
    const lifetime = prev.premium && !prev.subscriptionId
    tx.set(ref, {
      premium: lifetime || active,
      premiumAt: prev.premiumAt || FieldValue.serverTimestamp(),
      subscriptionId: sub.id,
      subStatus: sub.status,
      plan: item?.price?.recurring?.interval || null,
      premiumUntil: periodEnd ? new Date(periodEnd * 1000) : null,
      cancelAtPeriodEnd: !!sub.cancel_at_period_end,
      stripeCustomerId: typeof sub.customer === 'string' ? sub.customer : sub.customer?.id,
      ...(sub.trial_end && { trialUsed: true }),
    }, { merge: true })
    return active && !prev.premium
  })
}

// ── Statistiques business anonymes ─────────────────────────────
// purchase = nouvel abonne ; payment = chaque prelevement encaisse (revenueCents) ; cancel = resiliation
// Un document par jour : metrics/AAAA-MM-JJ = { landing_view: 12, signup: 3, ... }
// Aucune donnee personnelle (ni IP, ni identifiant) n'est enregistree.
export const EVENTS = ['landing_view', 'guest_start', 'signup_view', 'signup', 'limit_hit', 'paywall_open', 'checkout_start', 'purchase', 'payment', 'cancel', 'install', 'referral', 'trial']
export const today = () => new Date().toISOString().slice(0, 10)

export async function countEvent(event, { source, revenueCents, plan } = {}) {
  if (!EVENTS.includes(event)) return
  const upd = { [event]: FieldValue.increment(1), day: today() }
  if (source) upd[`src.${source}.${event}`] = FieldValue.increment(1)
  if (revenueCents) upd.revenueCents = FieldValue.increment(revenueCents)
  if (plan) upd[`plan_${plan}`] = FieldValue.increment(1)
  await db().doc(`metrics/${today()}`).set(upd, { merge: true })
}

// Proprietaire(s) de l'app autorise(s) a voir le tableau de bord
export const isOwner = (user) => {
  const owners = (process.env.OWNER_EMAILS || 'wld.azarservice@gmail.com').split(',').map((e) => e.trim().toLowerCase())
  return !!user?.email && user.email_verified !== false && owners.includes(user.email.toLowerCase())
}

// Acces offert (sans paiement) : emails listes dans la variable Netlify COMP_EMAILS (separes par des virgules).
// L'email doit etre verifie (connexion Google, ou lien de verification), sinon n'importe qui pourrait s'inscrire avec.
export const compEmails = () => (process.env.COMP_EMAILS || '').split(',').map((e) => e.trim().toLowerCase()).filter(Boolean)
export const isComp = (user) => !!user?.email && compEmails().includes(user.email.toLowerCase())

// ── Parrainage : « Invite une famille » ─────────────────────────────
// Code = début de l'uid (stable, sans base de données à part). Le filleul a son 1er mois offert,
// le parrain gagne un mois quand le filleul s'abonne.
export const refCodeFor = (uid) => uid.slice(0, 8).toUpperCase()
export const REF_COUPON = 'MOKA-AMI-1MOIS'
export async function ensureRefCoupon() {
  try { await stripe().coupons.retrieve(REF_COUPON) } catch {
    await stripe().coupons.create({ id: REF_COUPON, amount_off: PLANS.month.cents, currency: 'eur', duration: 'once', name: 'Parrainage : 1 mois offert' })
  }
  return REF_COUPON
}
export async function findReferrer(code) {
  if (!code || !/^[A-Za-z0-9]{6,12}$/.test(code)) return null
  const q = await db().collection('users').where('refCode', '==', code.toUpperCase()).limit(1).get()
  return q.empty ? null : { uid: q.docs[0].id, ...q.docs[0].data() }
}

export { FieldValue }

export const json = (status, body) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } })

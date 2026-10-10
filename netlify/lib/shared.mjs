// Outils communs aux fonctions de paiement (Stripe + Firebase Admin)
import Stripe from 'stripe'
import { randomInt } from 'node:crypto'
import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore, FieldValue } from 'firebase-admin/firestore'

// Formule Famille (5 enfants, 5 appareils) : abonnement mensuel ou annuel.
// Doit correspondre a PLANS dans src/premium.js
export const PLANS = {
  month: { cents: 199, interval: 'month', label: 'Mokalibo Famille — mensuel', price: '1,99 €/mois (Monat)' },
  year: { cents: 1499, interval: 'year', label: 'Mokalibo Famille — annuel', price: '14,99 €/an (Jahr)' },
  teacher_month: { cents: 499, interval: 'month', label: 'Mokalibo Enseignant — mensuel', price: '4,99 €/mois (Monat)', tier: 'teacher' },
  teacher_year: { cents: 3900, interval: 'year', label: 'Mokalibo Enseignant — annuel', price: '39 €/an (Jahr)', tier: 'teacher' },
}

// Limites par type de compte (profils enfants / eleves et appareils), appliquees par firestore.rules
export const TIERS = {
  family: { maxChildren: 5, maxDevices: 5 },
  teacher: { maxChildren: 35, maxDevices: 5 },
  school: { maxChildren: 300, maxDevices: 30 },
}
// Ecoles (sur devis, payees par facture) : emails listes dans la variable Netlify SCHOOL_EMAILS
export const schoolEmails = () => (process.env.SCHOOL_EMAILS || '').split(',').map((e) => e.trim().toLowerCase()).filter(Boolean)
export const isSchool = (user) => !!user?.email && schoolEmails().includes(user.email.toLowerCase())

// Essai gratuit (une seule fois par compte, carte demandee, abonnement lance automatiquement ensuite)
export const TRIAL_DAYS = 3
export const trialEligible = (ud = {}) => !ud.premium && !ud.stripeCustomerId && !ud.subscriptionId && !ud.trialUsed

// Une carte = un seul essai gratuit, meme avec plusieurs comptes. Si la carte a deja servi
// pour un essai d'un autre compte, l'essai est arrete et le premier paiement a lieu tout de suite.
// Empreinte de carte gardee dans trialCards/{fingerprint} (lisible seulement par le serveur).
export async function guardTrial(uid, sub) {
  if (sub.status !== 'trialing') return false
  let pmId = typeof sub.default_payment_method === 'string' ? sub.default_payment_method : sub.default_payment_method?.id
  if (!pmId) {
    const customer = typeof sub.customer === 'string' ? sub.customer : sub.customer?.id
    const list = await stripe().paymentMethods.list({ customer, type: 'card', limit: 1 })
    pmId = list.data[0]?.id
  }
  if (!pmId) return false
  const pm = await stripe().paymentMethods.retrieve(pmId)
  const fp = pm.card?.fingerprint
  if (!fp) return false
  const ref = db().doc(`trialCards/${fp}`)
  const reused = await db().runTransaction(async (tx) => {
    const snap = await tx.get(ref)
    if (snap.exists && snap.data().uid !== uid) return true
    if (!snap.exists) tx.set(ref, { uid, at: FieldValue.serverTimestamp() })
    return false
  })
  if (!reused) return false
  await stripe().subscriptions.update(sub.id, { trial_end: 'now', proration_behavior: 'none' })
  return true
}

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
  const tier = PLANS[sub.metadata?.plan]?.tier || 'family'
  return db().runTransaction(async (tx) => {
    const snap = await tx.get(ref)
    const prev = snap.exists ? snap.data() : {}
    // Un compte ecole garde ses limites ; sinon limites de la formule tant qu'elle est active
    const limits = prev.school ? {} : (active ? { tier, ...TIERS[tier] } : { tier: 'family', ...TIERS.family })
    // Un ancien achat « a vie » reste valable quoi qu'il arrive
    const lifetime = prev.premium && !prev.subscriptionId && !prev.giftUntil
    const giftValid = giftActive(prev)
    tx.set(ref, {
      premium: lifetime || active || giftValid || !!prev.comp || !!prev.school,
      premiumAt: prev.premiumAt || FieldValue.serverTimestamp(),
      subscriptionId: sub.id,
      subStatus: sub.status,
      plan: item?.price?.recurring?.interval || null,
      premiumUntil: periodEnd ? new Date(periodEnd * 1000) : null,
      cancelAtPeriodEnd: !!sub.cancel_at_period_end,
      stripeCustomerId: typeof sub.customer === 'string' ? sub.customer : sub.customer?.id,
      ...(sub.trial_end && { trialUsed: true }),
      ...limits,
    }, { merge: true })
    return active && !prev.premium
  })
}

// ── Statistiques business anonymes ─────────────────────────────
// purchase = nouvel abonne ; payment = chaque prelevement encaisse (revenueCents) ; cancel = resiliation
// Un document par jour : metrics/AAAA-MM-JJ = { landing_view: 12, signup: 3, ... }
// Aucune donnee personnelle (ni IP, ni identifiant) n'est enregistree.
export const EVENTS = ['landing_view', 'guest_start', 'signup_view', 'signup', 'limit_hit', 'paywall_open', 'checkout_start', 'purchase', 'payment', 'cancel', 'install', 'referral', 'trial', 'school_request', 'support', 'gift_purchase', 'gift_redeem']
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

// E-mail via Resend (variables RESEND_API_KEY et MAIL_FROM). Retourne false si non configure.
export async function sendMail({ to, subject, text, replyTo }) {
  if (!process.env.RESEND_API_KEY || !process.env.MAIL_FROM) return false
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({ from: process.env.MAIL_FROM, to: Array.isArray(to) ? to : [to], subject, text, ...(replyTo && { reply_to: replyTo }) }),
  }).catch(() => null)
  return !!res?.ok
}
export const ownerEmails = () => (process.env.OWNER_EMAILS || 'wld.azarservice@gmail.com').split(',').map((e) => e.trim()).filter(Boolean)

// ── Cartes cadeaux « Offrir Mokalibo » (1 an de Formule Famille) ─────────────
export const GIFT = { cents: 1499, months: 12, label: 'Mokalibo — Carte cadeau 1 an (Formule Famille)' }
export const giftActive = (d = {}) => {
  const u = d.giftUntil?.toDate ? d.giftUntil.toDate() : d.giftUntil ? new Date(d.giftUntil) : null
  return !!u && u > new Date()
}
const ALPHA = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // sans 0/O ni 1/I
export function newGiftCode() {
  const pick = () => Array.from({ length: 4 }, () => ALPHA[randomInt(ALPHA.length)]).join('')
  return `MOKA-${pick()}-${pick()}`
}
export const normGiftCode = (c) => String(c || '').toUpperCase().replace(/[^A-Z0-9]/g, '').replace(/^MOKA/, '').replace(/^(.{4})(.{4})$/, 'MOKA-$1-$2')

// Cree la carte cadeau d'une session Stripe payee (idempotent : appele par le webhook ET par la page de succes)
export async function ensureGift(session) {
  if (session.mode !== 'payment' || session.metadata?.kind !== 'gift' || session.payment_status !== 'paid') return null
  const lock = db().doc(`giftSessions/${session.id}`)
  const res = await db().runTransaction(async (tx) => {
    const l = await tx.get(lock)
    if (l.exists) return { code: l.data().code, fresh: false }
    const code = newGiftCode()
    const m = session.metadata || {}
    tx.set(lock, { code, at: FieldValue.serverTimestamp() })
    tx.set(db().doc(`gifts/${code}`), {
      status: 'new', months: GIFT.months, sessionId: session.id,
      buyerEmail: session.customer_details?.email || session.customer_email || null,
      to: m.to || '', from: m.from || '', message: m.message || '',
      amount: session.amount_total || GIFT.cents, createdAt: FieldValue.serverTimestamp(),
    })
    return { code, fresh: true }
  })
  const g = (await db().doc(`gifts/${res.code}`).get()).data() || {}
  if (res.fresh) {
    await countEvent('gift_purchase').catch(() => {})
    await countEvent('payment', { revenueCents: session.amount_total || GIFT.cents }).catch(() => {})
    if (g.buyerEmail) {
      await sendMail({
        to: g.buyerEmail,
        subject: '🎁 Votre carte cadeau Mokalibo',
        text: `Merci pour votre achat !\n\nCode cadeau : ${res.code}\n${g.to ? `Pour : ${g.to}\n` : ''}\nPour l'activer (1 an de Formule Famille, jusqu'à 5 enfants) :\n1. Ouvrir https://mokalibo.com/?cadeau=${res.code}\n2. Créer un compte parent gratuit (ou se connecter)\n3. L'accès illimité s'active automatiquement.\n\nLe code est valable 3 ans. Vous pouvez imprimer ou envoyer la carte depuis la page de confirmation.\n\nMokalibo · L'histoire du monde, racontée aux enfants\n5 % de chaque achat vont à la protection de l'enfance 💛`,
      }).catch(() => {})
    }
  }
  return { code: res.code, to: g.to, from: g.from, message: g.message }
}

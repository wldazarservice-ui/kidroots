// Outils communs aux fonctions de paiement (Stripe + Firebase Admin)
import Stripe from 'stripe'
import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore, FieldValue } from 'firebase-admin/firestore'

export const PRICE_CENTS = 200 // 2 € a vie

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

// Marque le compte parent comme premium (seul le serveur peut le faire)
export async function grantPremium(uid, sessionId) {
  await db().doc(`users/${uid}`).set(
    { premium: true, premiumAt: FieldValue.serverTimestamp(), stripeSessionId: sessionId },
    { merge: true },
  )
}

export const json = (status, body) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } })

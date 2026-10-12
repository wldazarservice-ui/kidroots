// Retire un appareil du compte. Passe par le serveur pour limiter les remplacements
// (3 par mois en famille, davantage pour les classes) : empeche de faire tourner un meme compte entre plusieurs familles.
import { verifyUser, db, json, today } from '../lib/shared.mjs'

// Famille : 3 par mois ; classe / ecole : 1 pour 10 appareils (renouvellement des tablettes)
const maxSwaps = (maxDevices) => Math.max(3, Math.ceil((maxDevices || 5) / 10))

export default async (req) => {
  if (req.method !== 'POST') return json(405, { error: 'method' })
  const user = await verifyUser(req)
  if (!user) return json(401, { error: 'auth' })
  const { slot } = await req.json().catch(() => ({}))
  if (typeof slot !== 'string' || !/^d[1-9][0-9]{0,2}$/.test(slot)) return json(400, { error: 'slot' })

  const userRef = db().doc(`users/${user.uid}`)
  const devRef = userRef.collection('devices').doc(slot)
  const month = today().slice(0, 7)
  const res = await db().runTransaction(async (tx) => {
    const [u, d] = await Promise.all([tx.get(userRef), tx.get(devRef)])
    if (!d.exists) return { ok: true }
    const sw = u.data()?.deviceSwaps
    const n = sw?.month === month ? sw.n || 0 : 0
    const max = maxSwaps(u.data()?.maxDevices)
    if (n >= max) return { ok: false, max }
    tx.delete(devRef)
    tx.set(userRef, { deviceSwaps: { month, n: n + 1 } }, { merge: true })
    return { ok: true, left: max - n - 1 }
  })
  return res.ok ? json(200, res) : json(429, { error: 'swap-limit', max: res.max })
}

export const config = { path: '/api/remove-device' }

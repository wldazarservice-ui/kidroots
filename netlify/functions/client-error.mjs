// Bugs rencontres chez les utilisateurs (sans donnee personnelle) : message, page, navigateur.
// Regroupes par jour et par message dans clientErrors/AAAA-MM-JJ, visibles dans le tableau de bord.
import { createHash } from 'node:crypto'
import { db, json } from '../lib/shared.mjs'
import { FieldValue } from 'firebase-admin/firestore'

const MAX_PER_DAY = 60 // messages differents gardes par jour (protection contre le spam)
const clean = (s, n) => String(s || '').replace(/[\u0000-\u001f]/g, ' ').replace(/[\w.+-]+@[\w-]+\.[\w.]+/g, '[email]').slice(0, n)

export default async (req) => {
  if (req.method !== 'POST') return json(405, { error: 'method' })
  const b = await req.json().catch(() => ({}))
  const msg = clean(b.m, 300)
  if (!msg) return json(400, { error: 'msg' })
  const day = new Date().toISOString().slice(0, 10)
  const key = createHash('sha1').update(msg).digest('hex').slice(0, 12)
  const ref = db().doc(`clientErrors/${day}`)
  try {
    await db().runTransaction(async (tx) => {
      const snap = await tx.get(ref)
      const errs = snap.exists ? snap.data().errs || {} : {}
      if (!errs[key] && Object.keys(errs).length >= MAX_PER_DAY) return
      tx.set(ref, {
        day,
        total: FieldValue.increment(1),
        errs: { [key]: {
          m: msg,
          src: clean(b.s, 160),
          page: clean(b.p, 80),
          ua: clean(b.ua, 120),
          v: clean(b.v, 20),
          n: FieldValue.increment(1),
          last: new Date().toISOString(),
        } },
      }, { merge: true })
    })
  } catch (e) {
    console.error('client-error', e)
  }
  return json(200, { ok: true })
}

export const config = { path: '/api/client-error' }

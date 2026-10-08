// Statistiques parentales : temps d'utilisation reel par enfant (jour + pays) et pays visites.
// Le temps n'est compte que si l'app est visible ET que l'enfant a interagi recemment.
import { useEffect, useRef } from 'react'
import { doc, updateDoc, increment, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase'

const TICK_S = 10        // granularite du comptage
const FLUSH_S = 60       // envoi a Firestore au plus toutes les minutes
const IDLE_S = 120       // au-dela de 2 min sans toucher l'ecran, on arrete de compter

export const dayKey = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

const childRef = (uid, childId) => doc(db, 'users', uid, 'children', childId)

export function trackCountryVisit(uid, childId, code) {
  if (!uid || !childId || !code) return
  updateDoc(childRef(uid, childId), {
    [`stats.countries.${code}.visits`]: increment(1),
    lastActive: serverTimestamp(),
  }).catch(() => {})
}

// Hook monte dans App : compte le temps de l'enfant actif, attribue au pays ouvert
export function useUsageTracker(uid, childId, countryCode) {
  const pending = useRef({ total: 0, days: {}, countries: {} })
  const ctx = useRef({ uid, childId, countryCode })
  const lastInput = useRef(Date.now())

  const flush = () => {
    const p = pending.current
    const { uid: u, childId: c } = ctx.current
    if (!u || !c || p.total === 0) return
    pending.current = { total: 0, days: {}, countries: {} }
    const upd = { 'stats.totalSeconds': increment(p.total), lastActive: serverTimestamp() }
    for (const [d, s] of Object.entries(p.days)) upd[`stats.days.${d}`] = increment(s)
    for (const [k, s] of Object.entries(p.countries)) upd[`stats.countries.${k}.seconds`] = increment(s)
    updateDoc(childRef(u, c), upd).catch(() => {})
  }

  // Changement d'enfant : on envoie d'abord le temps de l'enfant precedent
  useEffect(() => {
    if (ctx.current.uid !== uid || ctx.current.childId !== childId) flush()
    ctx.current = { uid, childId, countryCode }
  }, [uid, childId, countryCode])

  useEffect(() => {
    const touch = () => { lastInput.current = Date.now() }
    const onHide = () => { if (document.visibilityState === 'hidden') flush() }
    const evs = ['pointerdown', 'keydown', 'touchstart', 'wheel']
    evs.forEach((e) => window.addEventListener(e, touch, { passive: true }))
    document.addEventListener('visibilitychange', onHide)
    window.addEventListener('pagehide', flush)

    let sinceFlush = 0
    const id = setInterval(() => {
      const { childId: c, countryCode: code } = ctx.current
      const active = c && document.visibilityState === 'visible' && Date.now() - lastInput.current < IDLE_S * 1000
      if (active) {
        const p = pending.current
        const d = dayKey()
        p.total += TICK_S
        p.days[d] = (p.days[d] || 0) + TICK_S
        if (code) p.countries[code] = (p.countries[code] || 0) + TICK_S
      }
      sinceFlush += TICK_S
      if (sinceFlush >= FLUSH_S) { sinceFlush = 0; flush() }
    }, TICK_S * 1000)

    return () => {
      clearInterval(id)
      evs.forEach((e) => window.removeEventListener(e, touch))
      document.removeEventListener('visibilitychange', onHide)
      window.removeEventListener('pagehide', flush)
      flush()
    }
  }, [])
}

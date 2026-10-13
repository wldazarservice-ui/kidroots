import { useEffect, useState } from 'react'

// Fleches ‹ › pour une bande qui defile a l'horizontale (a placer dans un parent en position: relative).
// onUse : appele quand l'enfant clique (par ex. pour arreter un defilement automatique).
export default function StripArrows({ target, onUse, small }) {
  const [edge, setEdge] = useState({ start: true, end: true })
  useEffect(() => {
    const el = target.current
    if (!el) return
    const upd = () => setEdge({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 })
    upd()
    el.addEventListener('scroll', upd, { passive: true }); window.addEventListener('resize', upd)
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(upd) : null
    ro?.observe(el)
    return () => { el.removeEventListener('scroll', upd); window.removeEventListener('resize', upd); ro?.disconnect() }
  }, [target])
  const step = (dir) => {
    const el = target.current
    if (!el) return
    onUse?.()
    const first = el.firstElementChild
    const w = first ? first.getBoundingClientRect().width + 12 : el.clientWidth * 0.8
    el.scrollBy({ left: dir * Math.max(w, small ? el.clientWidth * 0.6 : w), behavior: 'smooth' })
  }
  return (
    <>
      <button type="button" className={`strip-arrow left${small ? ' small' : ''}`} onClick={() => step(-1)} disabled={edge.start} aria-label="←">‹</button>
      <button type="button" className={`strip-arrow right${small ? ' small' : ''}`} onClick={() => step(1)} disabled={edge.end} aria-label="→">›</button>
    </>
  )
}

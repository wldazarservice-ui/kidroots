// Ajoute la classe « in » aux éléments .reveal / .reveal-stagger quand ils entrent à l'écran
import { useEffect } from 'react'

export function useReveal(deps = []) {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.in), .reveal-stagger:not(.in)')
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('in')); return }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target) } })
    }, { threshold: 0.12 })
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, deps)
}

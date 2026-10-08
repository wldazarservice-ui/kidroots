import { useEffect, useMemo, useRef } from 'react'
import { COUNTRIES } from '../data/countries'
import { TEASERS } from '../data/teasers'
import { TText } from '../useTranslated'
import { t } from '../i18n'

const INK = '#1A2A4F'

// « Le savais-tu ? » : bandeaux d'histoires courtes qui donnent envie d'explorer un pays.
// La selection change chaque jour ; defilement automatique, glisser au doigt.
export default function StoryBanners({ lang, onOpen }) {
  const ref = useRef(null)
  const items = useMemo(() => {
    const codes = Object.keys(COUNTRIES).filter((c) => TEASERS[c] || COUNTRIES[c].teaser)
    const day = Math.floor(Date.now() / 86400000)
    return Array.from({ length: Math.min(8, codes.length) }, (_, i) => codes[(day * 3 + i) % codes.length])
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let paused = false
    const stop = () => { paused = true }
    el.addEventListener('pointerdown', stop, { passive: true })
    el.addEventListener('wheel', stop, { passive: true })
    const id = setInterval(() => {
      if (paused || !el.firstChild) return
      const w = el.firstChild.getBoundingClientRect().width + 14
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8
      el.scrollTo({ left: atEnd ? 0 : el.scrollLeft + w, behavior: 'smooth' })
    }, 5000)
    return () => { clearInterval(id); el.removeEventListener('pointerdown', stop); el.removeEventListener('wheel', stop) }
  }, [])

  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 20, fontWeight: 700, color: INK, margin: '0 2px 10px' }}>✨ {t(lang, 'did_you_know')}</div>
      <div ref={ref} className="story-strip">
        {items.map((code) => {
          const c = COUNTRIES[code]
          return (
            <button key={code} className="btn-kid lift story-card" onClick={() => onOpen(code)}
              style={{ background: `linear-gradient(150deg, ${c.bg} 0%, #FFFFFF 70%)`, border: `3px solid ${c.color}33`, borderRadius: 26, padding: '16px 16px 14px', textAlign: 'left', color: INK, display: 'flex', flexDirection: 'column', gap: 8, boxShadow: `0 6px 0 ${c.color}2E, 0 10px 22px rgba(26,42,79,0.08)` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 40, lineHeight: 1 }}>{c.flag}</span>
                <span style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 19, fontWeight: 700, color: c.color }}><TText text={c.name} lang={lang} /></span>
                <span style={{ marginLeft: 'auto', fontSize: 26 }}>{c.hero?.emoji}</span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 800, lineHeight: 1.5, color: '#37474F', flex: 1 }}><TText text={TEASERS[code] || c.teaser} lang={lang} /></div>
              <div style={{ alignSelf: 'flex-start', background: c.color, color: 'white', borderRadius: 999, padding: '6px 14px', fontSize: 13, fontWeight: 900 }}>{t(lang, 'discover')} →</div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

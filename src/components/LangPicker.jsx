import { useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { LANGUAGES } from '../i18n'

// Le menu s'ouvre dans un calque au-dessus de toute la page (portail) :
// il ne peut plus etre cache par les autres blocs de l'ecran.
export default function LangPicker({ lang, onChange, compact = false }) {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState(null)
  const btn = useRef(null)
  const current = LANGUAGES[lang] || LANGUAGES.fr

  useLayoutEffect(() => {
    if (!open || !btn.current) return
    const place = () => {
      const r = btn.current.getBoundingClientRect()
      setPos({ top: r.bottom + 8, right: Math.max(8, window.innerWidth - r.right) })
    }
    place()
    window.addEventListener('resize', place)
    window.addEventListener('scroll', place, true)
    return () => { window.removeEventListener('resize', place); window.removeEventListener('scroll', place, true) }
  }, [open])

  const pick = (code) => { setOpen(false); if (code !== lang) onChange(code) }

  return (
    <>
      <button ref={btn} type="button" onClick={() => setOpen((o) => !o)} aria-haspopup="listbox" aria-expanded={open}
        style={{ background: 'white', border: open ? '2px solid #1E88E5' : '2px solid transparent', color: '#1A2A4F', padding: '5px 11px', minHeight: 36, borderRadius: 999, boxShadow: '0 3px 10px rgba(26,42,79,0.12)', cursor: 'pointer', fontFamily: 'Nunito, sans-serif', fontWeight: 900, fontSize: 13, display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
        <span style={{ fontSize: 18, lineHeight: 1 }}>{current.flag}</span>
        <span>{compact ? lang.toUpperCase() : current.name}</span>
        <span style={{ fontSize: 10, color: '#90A4AE' }}>{open ? '▲' : '▼'}</span>
      </button>
      {open && pos && createPortal(
        <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 10000 }}>
          <div role="listbox" onClick={(e) => e.stopPropagation()} className="anim-slide-up"
            style={{ position: 'fixed', top: pos.top, right: pos.right, background: 'white', borderRadius: 18, overflow: 'hidden', boxShadow: '0 12px 36px rgba(26,42,79,0.28)', minWidth: 190 }}>
            {Object.entries(LANGUAGES).map(([code, l]) => (
              <button key={code} type="button" role="option" aria-selected={code === lang} onClick={() => pick(code)}
                style={{ width: '100%', padding: '13px 16px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', background: code === lang ? '#EEF7F0' : 'white', border: 'none', borderBottom: '1px solid #F1F4F8', fontFamily: 'Nunito, sans-serif', fontWeight: code === lang ? 900 : 700, fontSize: 15, color: '#1A2A4F', textAlign: 'left' }}>
                <span style={{ fontSize: 20 }}>{l.flag}</span>
                <span>{l.name}</span>
                {code === lang && <span style={{ marginLeft: 'auto', color: '#2E9E5B', fontWeight: 900 }}>✓</span>}
              </button>
            ))}
          </div>
        </div>,
        document.body,
      )}
    </>
  )
}

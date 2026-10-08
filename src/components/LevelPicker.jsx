import { useState } from 'react'
import { t } from '../i18n'
import { LEVELS, LEVEL_KEYS, defaultLevelForAge, levelTotals } from '../levels'

const INK = '#1A2A4F'
const fmt = (n, lang) => n.toLocaleString(lang === 'en' ? 'en-US' : lang === 'de' ? 'de-DE' : 'fr-FR')

// Choix du niveau de lecture. Plein ecran (premiere fois) ou en fenetre (onClose fourni).
// Compact pour le telephone : titre et bouton toujours visibles, seule la liste defile.
export default function LevelPicker({ lang, value, age, childName, onPick, onClose }) {
  const recommended = defaultLevelForAge(age || 6)
  const [sel, setSel] = useState(value || recommended)
  const [busy, setBusy] = useState(false)
  const totals = Object.fromEntries(LEVEL_KEYS.map(k => [k, levelTotals(k)]))

  const confirm = async () => {
    setBusy(true)
    try { await onPick(sel) } finally { setBusy(false) }
  }

  const header = (
    <div style={{ textAlign: 'center', padding: '18px 18px 10px' }}>
      <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 24, fontWeight: 700, color: INK, lineHeight: 1.15 }}>
        📚 {t(lang, 'choose_level')}{childName ? `, ${childName}` : ''}
      </div>
      <div style={{ fontSize: 13, color: '#607D8B', fontWeight: 700, marginTop: 4, lineHeight: 1.4 }}>{t(lang, 'choose_level_sub')}</div>
    </div>
  )

  const list = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '8px 14px 12px' }}>
      {LEVEL_KEYS.map(k => {
        const L = LEVELS[k]
        const active = sel === k
        const s = totals[k]
        return (
          <button key={k} type="button" className="btn-kid" onClick={() => setSel(k)} aria-pressed={active}
            style={{ textAlign: 'left', background: active ? `linear-gradient(150deg, ${L.grad[0]}, ${L.grad[1]})` : 'white', color: active ? 'white' : INK, borderRadius: 22, padding: '12px 12px', border: `3px solid ${active ? 'white' : '#ECEFF1'}`, boxShadow: active ? `0 5px 0 ${L.grad[1]}55, 0 8px 18px ${L.grad[1]}40` : '0 3px 10px rgba(26,42,79,0.07)', position: 'relative', display: 'flex', alignItems: 'center', gap: 12 }}>
            {k === recommended && age && (
              <span style={{ position: 'absolute', top: -9, right: 12, background: '#FFD600', color: INK, fontSize: 11, fontWeight: 900, borderRadius: 999, padding: '2px 9px', boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }}>
                ★ {age} {t(lang, 'years')}
              </span>
            )}
            <div style={{ fontSize: 36, width: 52, height: 52, borderRadius: 16, background: active ? 'rgba(255,255,255,0.25)' : `${L.color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{L.emoji}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 18, fontWeight: 600, lineHeight: 1.1 }}>
                {t(lang, `lvl_${k}`)} <span style={{ fontFamily: 'Nunito, sans-serif', fontSize: 12, fontWeight: 900, opacity: 0.8 }}>· {L.ages} {t(lang, 'years')}</span>
              </div>
              <div style={{ fontSize: 12.5, fontWeight: 700, lineHeight: 1.35, margin: '3px 0 6px', opacity: active ? 0.95 : 0.72 }}>{t(lang, `lvl_${k}_desc`)}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {[`📖 ${fmt(s.stories, lang)} ${t(lang, 'stories_word')}`, `🎯 ${fmt(s.quiz, lang)} ${t(lang, 'questions_word')}`].map(txt => (
                  <span key={txt} style={{ fontSize: 12, fontWeight: 900, borderRadius: 999, padding: '3px 9px', background: active ? 'rgba(255,255,255,0.25)' : `${L.color}14`, color: active ? 'white' : L.color, whiteSpace: 'nowrap' }}>{txt}</span>
                ))}
              </div>
            </div>
            <div style={{ width: 26, height: 26, borderRadius: '50%', border: `3px solid ${active ? 'white' : '#CFD8DC'}`, background: active ? 'white' : 'transparent', color: L.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 900, flexShrink: 0 }}>{active ? '✓' : ''}</div>
          </button>
        )
      })}
      <div style={{ textAlign: 'center', fontSize: 12, fontWeight: 800, color: '#78909C' }}>🌍 {t(lang, 'lvl_total', { n: totals[sel].countries })}</div>
    </div>
  )

  const footer = (
    <div style={{ display: 'flex', gap: 10, padding: '10px 14px calc(14px + env(safe-area-inset-bottom))', background: 'rgba(255,248,231,0.96)', borderTop: '1px solid rgba(26,42,79,0.06)' }}>
      {onClose && (
        <button type="button" className="btn-kid" onClick={onClose} aria-label="Fermer"
          style={{ flex: 1, background: '#ECEFF1', color: '#546E7A', padding: '14px', fontSize: 16, borderRadius: 20 }}>✕</button>
      )}
      <button type="button" className="btn-kid" onClick={confirm} disabled={busy}
        style={{ flex: 3, background: 'linear-gradient(180deg,#FFE04D,#FFC400)', color: INK, padding: '14px', fontSize: 18, borderRadius: 20, boxShadow: '0 5px 0 #E6A100', opacity: busy ? 0.6 : 1 }}>
        {busy ? '…' : `${LEVELS[sel].emoji} ${t(lang, 'validate')}`}
      </button>
    </div>
  )

  const panel = (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, fontFamily: 'Nunito, sans-serif' }}>
      {header}
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>{list}</div>
      {footer}
    </div>
  )

  if (!onClose) {
    return (
      <div className="home-sky full-dvh" style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: 520, display: 'flex', flexDirection: 'column' }}>{panel}</div>
      </div>
    )
  }
  return (
    <div onClick={onClose} className="sheet-backdrop" style={{ position: 'fixed', inset: 0, background: 'rgba(26,42,79,0.45)', zIndex: 500, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div onClick={e => e.stopPropagation()} className="anim-slide-up sheet"
        style={{ background: 'linear-gradient(180deg,#E3F4FF,#FFF8E7)', width: '100%', maxWidth: 420, maxHeight: '92dvh', display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: '28px 28px 0 0' }}>
        {panel}
      </div>
    </div>
  )
}

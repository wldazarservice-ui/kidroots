import { useState } from 'react'
import { t } from '../i18n'
import { LEVELS, LEVEL_KEYS, defaultLevelForAge, levelAverages } from '../levels'

const INK = '#1A2A4F'

// Choix du niveau de lecture. Plein ecran (premiere fois) ou en fenetre (onClose fourni).
export default function LevelPicker({ lang, value, age, childName, onPick, onClose }) {
  const recommended = defaultLevelForAge(age || 6)
  const [sel, setSel] = useState(value || recommended)
  const [busy, setBusy] = useState(false)
  const stats = Object.fromEntries(LEVEL_KEYS.map(k => [k, levelAverages(k)]))
  const maxStories = Math.max(...LEVEL_KEYS.map(k => stats[k].stories))
  const maxQuiz = Math.max(...LEVEL_KEYS.map(k => stats[k].quiz))

  const confirm = async () => {
    setBusy(true)
    try { await onPick(sel) } finally { setBusy(false) }
  }

  const body = (
    <div style={{ fontFamily: 'Nunito, sans-serif', padding: '22px 18px 26px' }}>
      <div style={{ textAlign: 'center', marginBottom: 18 }}>
        <div className="float" style={{ fontSize: 58, lineHeight: 1.1 }}>📚</div>
        <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 28, fontWeight: 700, color: INK, marginTop: 6 }}>
          {t(lang, 'choose_level')}{childName ? `, ${childName}` : ''}
        </div>
        <div style={{ fontSize: 14, color: '#607D8B', fontWeight: 700, marginTop: 4, lineHeight: 1.45 }}>{t(lang, 'choose_level_sub')}</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 18 }}>
        {LEVEL_KEYS.map(k => {
          const L = LEVELS[k]
          const active = sel === k
          const s = stats[k]
          return (
            <button key={k} type="button" className="btn-kid" onClick={() => setSel(k)} aria-pressed={active}
              style={{ textAlign: 'left', background: active ? `linear-gradient(150deg, ${L.grad[0]}, ${L.grad[1]})` : 'white', color: active ? 'white' : INK, borderRadius: 24, padding: '14px 14px 12px', border: `3px solid ${active ? 'white' : '#ECEFF1'}`, boxShadow: active ? `0 6px 0 ${L.grad[1]}55, 0 10px 20px ${L.grad[1]}40` : '0 4px 12px rgba(26,42,79,0.08)', position: 'relative' }}>
              {k === recommended && (
                <span style={{ position: 'absolute', top: -10, right: 14, background: '#FFD600', color: INK, fontSize: 11, fontWeight: 900, borderRadius: 999, padding: '3px 10px', boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }}>
                  ★ {age} {t(lang, 'years')}
                </span>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ fontSize: 42, width: 56, height: 56, borderRadius: 18, background: active ? 'rgba(255,255,255,0.25)' : `${L.color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{L.emoji}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 20, fontWeight: 600, lineHeight: 1.1 }}>{t(lang, `lvl_${k}`)}</div>
                  <div style={{ fontSize: 12, fontWeight: 900, opacity: 0.8 }}>{L.ages} {t(lang, 'years')}</div>
                </div>
                <div style={{ width: 26, height: 26, borderRadius: '50%', border: `3px solid ${active ? 'white' : '#CFD8DC'}`, background: active ? 'white' : 'transparent', color: L.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 900, flexShrink: 0 }}>{active ? '✓' : ''}</div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.45, margin: '8px 0 10px', opacity: active ? 0.95 : 0.75 }}>{t(lang, `lvl_${k}_desc`)}</div>
              {[
                { icon: '📖', n: s.stories, max: maxStories, range: s.storiesRange, label: t(lang, 'stories_word') },
                { icon: '🎯', n: s.quiz, max: maxQuiz, range: s.quizRange, label: t(lang, 'questions_word') },
              ].map(row => (
                <div key={row.icon} style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                  <span style={{ fontSize: 14, width: 18 }}>{row.icon}</span>
                  <div style={{ flex: 1, height: 10, borderRadius: 6, background: active ? 'rgba(255,255,255,0.3)' : '#ECEFF1', overflow: 'hidden' }}>
                    <div style={{ width: `${(row.n / row.max) * 100}%`, height: '100%', borderRadius: 6, background: active ? 'white' : L.color, transition: 'width 0.5s' }} />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 900, minWidth: 92, textAlign: 'right' }}>{row.range[0] === row.range[1] ? row.range[0] : `${row.range[0]}–${row.range[1]}`} {row.label}</span>
                </div>
              ))}
              <div style={{ fontSize: 11, fontWeight: 800, opacity: 0.7, textAlign: 'right', marginTop: 2 }}>{t(lang, 'per_country')}</div>
            </button>
          )
        })}
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        {onClose && (
          <button type="button" className="btn-kid" onClick={onClose}
            style={{ flex: 1, background: '#ECEFF1', color: '#546E7A', padding: '16px', fontSize: 16, borderRadius: 22 }}>✕</button>
        )}
        <button type="button" className="btn-kid" onClick={confirm} disabled={busy}
          style={{ flex: 3, background: 'linear-gradient(180deg,#FFE04D,#FFC400)', color: INK, padding: '16px', fontSize: 19, borderRadius: 22, boxShadow: '0 6px 0 #E6A100', opacity: busy ? 0.6 : 1 }}>
          {busy ? '…' : `${LEVELS[sel].emoji} ${t(lang, 'validate')}`}
        </button>
      </div>
    </div>
  )

  if (!onClose) {
    return <div className="home-sky screen-narrow" style={{ minHeight: '100vh' }}>{body}</div>
  }
  return (
    <div onClick={onClose} className="sheet-backdrop" style={{ position: 'fixed', inset: 0, background: 'rgba(26,42,79,0.45)', zIndex: 500, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div onClick={e => e.stopPropagation()} className="anim-slide-up sheet"
        style={{ background: 'linear-gradient(180deg,#E3F4FF,#FFF8E7)', width: '100%', maxWidth: 420, maxHeight: '94vh', overflowY: 'auto', borderRadius: '28px 28px 0 0' }}>
        {body}
      </div>
    </div>
  )
}

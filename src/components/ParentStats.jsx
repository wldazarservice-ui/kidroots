import { useEffect, useState } from 'react'
import ParentGate from './ParentGate'
import { t } from '../i18n'
import { listChildren } from '../cloud'
import { COUNTRIES } from '../data/countries'
import { LEVELS } from '../levels'
import { dayKey } from '../stats'

const INK = '#1A2A4F'
const ALL = Object.keys(COUNTRIES)
// id de chapitre -> code pays (les cles "done" sont "id" ou "id@niveau")
const CH_COUNTRY = Object.fromEntries(ALL.flatMap((code) => COUNTRIES[code].chapters.map((ch) => [ch.id, code])))
const LOCALE = { fr: 'fr-FR', en: 'en-GB', de: 'de-DE', ar: 'ar', pt: 'pt-BR', bm: 'fr-FR' }

const fmtTime = (s = 0) => {
  const m = Math.round(s / 60)
  if (m < 60) return `${m} min`
  return `${Math.floor(m / 60)} h ${String(m % 60).padStart(2, '0')}`
}

const lastDays = (n) => Array.from({ length: n }, (_, i) => {
  const d = new Date(); d.setDate(d.getDate() - (n - 1 - i)); return d
})

function ChildStats({ kid, lang }) {
  const st = kid.stats || {}
  const days = lastDays(7)
  const perDay = days.map((d) => st.days?.[dayKey(d)] || 0)
  const max = Math.max(60, ...perDay)
  const weekTotal = perDay.reduce((a, b) => a + b, 0)

  const doneIds = Object.keys(kid.done || {}).filter((k) => kid.done[k])
  const fromDone = new Set(doneIds.map((k) => CH_COUNTRY[k.split('@')[0]]).filter(Boolean))
  const byCountry = st.countries || {}
  const explored = ALL.filter((c) => fromDone.has(c) || byCountry[c]?.visits || byCountry[c]?.seconds)
    .sort((a, b) => (byCountry[b]?.seconds || 0) - (byCountry[a]?.seconds || 0))
  const last = kid.lastActive?.toDate?.()
  const L = LEVELS[kid.difficulty]

  const tile = (icon, value, label, color) => (
    <div style={{ background: 'white', borderRadius: 18, padding: '12px 8px', textAlign: 'center', boxShadow: '0 4px 12px rgba(26,42,79,0.07)' }}>
      <div style={{ fontSize: 22 }}>{icon}</div>
      <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 21, fontWeight: 700, color, lineHeight: 1.15 }}>{value}</div>
      <div style={{ fontSize: 11, color: '#607D8B', fontWeight: 800 }}>{label}</div>
    </div>
  )

  return (
    <div style={{ background: '#F4FBF5', borderRadius: 26, padding: 16, boxShadow: '0 8px 22px rgba(46,158,91,0.12)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <div style={{ fontSize: 34, width: 54, height: 54, borderRadius: 18, background: '#FFF3E0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{kid.avatar || '👦'}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 21, fontWeight: 600, color: INK }}>{kid.name}</div>
          <div style={{ fontSize: 12, color: '#78909C', fontWeight: 800 }}>
            {kid.age} {t(lang, 'years')} · ⭐ {kid.xp || 0} XP · {t(lang, 'ps_level')} {kid.level || 1}
            {L && <> · {L.emoji} {t(lang, `lvl_${kid.difficulty}`)}</>}
          </div>
          <div style={{ fontSize: 12, color: '#2E7D4F', fontWeight: 800 }}>
            🕒 {t(lang, 'ps_last')} : {last ? last.toLocaleString(LOCALE[lang] || 'fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : t(lang, 'ps_never')}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 14 }}>
        {tile('☀️', fmtTime(perDay[6]), t(lang, 'ps_today'), '#FF8F00')}
        {tile('📅', fmtTime(weekTotal), t(lang, 'ps_week'), '#1E88E5')}
        {tile('⏱️', fmtTime(st.totalSeconds), t(lang, 'ps_total'), '#2E9E5B')}
        {tile('📖', doneIds.length, t(lang, 'ps_chapters'), '#8E24AA')}
      </div>

      <div style={{ fontSize: 12, fontWeight: 900, color: '#607D8B', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>{t(lang, 'ps_week')}</div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 110, background: 'white', borderRadius: 18, padding: '10px 10px 6px', marginBottom: 14 }}>
        {days.map((d, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%', minWidth: 0 }}>
            <div style={{ fontSize: 10, fontWeight: 900, color: '#78909C', marginBottom: 2, whiteSpace: 'nowrap' }}>{perDay[i] ? Math.round(perDay[i] / 60) : ''}</div>
            <div title={fmtTime(perDay[i])} style={{ width: '100%', maxWidth: 34, height: `${Math.max(3, (perDay[i] / max) * 62)}px`, borderRadius: 8, background: i === 6 ? '#FF9800' : perDay[i] ? '#43C27A' : '#E3EAF2' }} />
            <div style={{ fontSize: 10, fontWeight: 900, color: i === 6 ? '#E65100' : '#90A4AE', marginTop: 4 }}>
              {d.toLocaleDateString(LOCALE[lang] || 'fr-FR', { weekday: 'short' }).slice(0, 3)}
            </div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 12, fontWeight: 900, color: '#607D8B', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>
        {t(lang, 'ps_countries')} · {explored.length} / {ALL.length}
      </div>
      <div style={{ height: 10, borderRadius: 6, background: '#E3EAF2', overflow: 'hidden', marginBottom: 10 }}>
        <div style={{ width: `${(explored.length / ALL.length) * 100}%`, height: '100%', background: '#43C27A', borderRadius: 6 }} />
      </div>
      {explored.length === 0 ? (
        <div style={{ fontSize: 13, color: '#90A4AE', fontWeight: 800 }}>{t(lang, 'ps_none')}</div>
      ) : (
        <div className="stats-grid" style={{ display: 'grid', gap: 8 }}>
          {explored.map((code) => {
            const c = COUNTRIES[code]
            const s = byCountry[code] || {}
            const nDone = c.chapters.filter((ch) => doneIds.some((k) => k.split('@')[0] === ch.id)).length
            return (
              <div key={code} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'white', borderRadius: 14, padding: '8px 12px' }}>
                <span style={{ fontSize: 26 }}>{c.flag}</span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: 'block', fontSize: 14, fontWeight: 900, color: INK }}>{c.name}</span>
                  <span style={{ display: 'block', fontSize: 11, fontWeight: 800, color: '#78909C' }}>
                    ⏱️ {fmtTime(s.seconds)}{s.visits ? ` · ${s.visits} ${t(lang, 'ps_visits')}` : ''}
                  </span>
                </span>
                <span style={{ fontSize: 12, fontWeight: 900, color: c.color }}>⭐ {nDone}/{c.chapters.length}</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// Espace parents : temps passe et pays explores par chaque enfant (protege par ParentGate)
export default function ParentStats({ user, lang, onClose }) {
  const [unlocked, setUnlocked] = useState(false)
  const [kids, setKids] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!unlocked) return
    listChildren(user.uid).then(setKids).catch((e) => { console.error(e); setError(true) })
  }, [unlocked, user.uid])

  return (
    <div onClick={onClose} className="sheet-backdrop" style={{ position: 'fixed', inset: 0, background: 'rgba(26,42,79,0.45)', zIndex: 500, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div onClick={(e) => e.stopPropagation()} className="anim-slide-up sheet sheet-wide"
        style={{ background: 'linear-gradient(180deg,#E8F8EA,#FFFFFF)', width: '100%', maxWidth: 420, maxHeight: '94vh', overflowY: 'auto', borderRadius: '28px 28px 0 0', fontFamily: 'Nunito, sans-serif', padding: '20px 16px 26px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 26, fontWeight: 700, color: INK }}>📊 {t(lang, 'ps_title')}</div>
            <div style={{ fontSize: 13, color: '#607D8B', fontWeight: 700 }}>{t(lang, 'ps_sub')}</div>
          </div>
          <button className="btn-kid" onClick={onClose} aria-label="Fermer"
            style={{ background: '#ECEFF1', color: '#546E7A', width: 40, height: 40, borderRadius: '50%', fontSize: 16, flexShrink: 0 }}>✕</button>
        </div>

        {!unlocked ? (
          <ParentGate onPass={() => setUnlocked(true)} title={t(lang, 'ps_gate')}
            question={(a, b) => `${a} × ${b} = ?`} okLabel={t(lang, 'pw_gate_ok')} errorLabel={t(lang, 'pw_gate_err')} />
        ) : error ? (
          <div style={{ color: '#C62828', fontWeight: 800 }}>{t(lang, 'pw_error')}</div>
        ) : !kids ? (
          <div style={{ textAlign: 'center', fontSize: 30, padding: 30 }}>⏳</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {kids.map((k) => <ChildStats key={k.id} kid={k} lang={lang} />)}
            <div style={{ fontSize: 12, color: '#90A4AE', fontWeight: 700, textAlign: 'center' }}>ℹ️ {t(lang, 'ps_note')}</div>
          </div>
        )}
      </div>
    </div>
  )
}

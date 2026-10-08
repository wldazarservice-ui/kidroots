import { useMemo } from 'react'
import { t } from '../i18n'
import { COUNTRIES, REGIONS } from '../data/countries'
import { passportStats, BADGES, earnedBadges } from '../explore'
import { countryName } from '../names'
import { TText } from '../useTranslated'
import ExploreHeader from './ExploreHeader'

const INK = '#1A2A4F'

function Stamp({ code, state, lang, onClick }) {
  const c = COUNTRIES[code]
  const reg = REGIONS[c.region]
  const rot = ((code.charCodeAt(0) * 7 + code.charCodeAt(1) * 13) % 17) - 8
  if (state.stamp) {
    return (
      <button onClick={onClick} className="btn-kid soft" title={countryName(code, lang)}
        style={{ aspectRatio: '1', borderRadius: '50%', border: `3px dashed ${reg.grad[1]}`, background: `${reg.grad[0]}22`, transform: `rotate(${rot}deg)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 4, color: reg.grad[1] }}>
        <span style={{ fontSize: 30, lineHeight: 1 }}>{c.flag}</span>
        <span style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.1, marginTop: 2, maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}>{countryName(code, lang)}</span>
        <span style={{ fontSize: 9, fontWeight: 900 }}>★ MOKALIBO ★</span>
      </button>
    )
  }
  return (
    <button onClick={onClick} className="btn-kid soft" title={countryName(code, lang)}
      style={{ aspectRatio: '1', borderRadius: '50%', border: '3px dotted #CFD8DC', background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 4 }}>
      <span style={{ fontSize: 26, lineHeight: 1, filter: 'grayscale(1)', opacity: 0.35 }}>{c.flag}</span>
      {state.visited
        ? <span style={{ fontSize: 10, fontWeight: 900, color: reg.grad[1], marginTop: 3 }}>{state.done}/{state.total}</span>
        : <span style={{ fontSize: 9, fontWeight: 800, color: '#B0BEC5', marginTop: 3, maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}>{countryName(code, lang)}</span>}
    </button>
  )
}

// Passeport d'explorateur : un tampon par pays terminé + badges
export default function PassportScreen({ lang, progress, nav, activeChild }) {
  const games = activeChild?.games || {}
  const stats = useMemo(() => passportStats(progress, games), [progress, games])
  const earned = earnedBadges(stats)
  const total = Object.keys(COUNTRIES).length

  return (
    <div className="home-sky screen-wide" style={{ minHeight: '100vh', fontFamily: 'Nunito, sans-serif', paddingBottom: 30 }}>
      <ExploreHeader lang={lang} emoji="🛂" title={t(lang, 'pp_title')} sub={t(lang, 'pp_stamps', { n: String(stats.stamps.length), t: String(total) })} onBack={nav.goHome} />
      <div style={{ padding: '8px 16px' }}>
        {/* Couverture du passeport */}
        <div style={{ background: 'linear-gradient(150deg,#1E3A8A,#1E88E5)', color: 'white', borderRadius: 24, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14, boxShadow: '0 10px 24px rgba(30,58,138,0.3)', marginBottom: 18 }}>
          <div style={{ fontSize: 46, width: 70, height: 70, borderRadius: 18, background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{activeChild?.avatar || '🧒'}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: 2, opacity: 0.85 }}>PASSEPORT · PASSPORT · REISEPASS</div>
            <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 24, fontWeight: 700 }}>{activeChild?.name}</div>
            <div style={{ fontSize: 13, fontWeight: 800, opacity: 0.95 }}>🛂 {stats.stamps.length} · 📖 {stats.chapters} · 🏅 {earned.length}</div>
          </div>
          <div style={{ fontSize: 34 }}>🌍</div>
        </div>

        {/* Badges */}
        <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 20, fontWeight: 700, color: INK, marginBottom: 10 }}>🏅 {t(lang, 'pp_badges')} · {earned.length}/{BADGES.length}</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 10, marginBottom: 22 }}>
          {BADGES.map(([id, emoji]) => {
            const ok = earned.includes(id)
            return (
              <div key={id} style={{ background: ok ? 'white' : 'rgba(255,255,255,0.55)', borderRadius: 18, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: ok ? '0 4px 14px rgba(255,152,0,0.25)' : 'none', border: ok ? '2px solid #FFC400' : '2px dashed #CFD8DC' }}>
                <span style={{ fontSize: 28, filter: ok ? 'none' : 'grayscale(1)', opacity: ok ? 1 : 0.4 }}>{emoji}</span>
                <span style={{ minWidth: 0 }}>
                  <span style={{ display: 'block', fontSize: 13, fontWeight: 900, color: ok ? INK : '#90A4AE' }}>{t(lang, `badge_${id}`)}</span>
                  <span style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#90A4AE' }}>{ok ? '✓' : t(lang, `badge_${id}_d`)}</span>
                </span>
              </div>
            )
          })}
        </div>

        {/* Tampons par continent */}
        {Object.entries(REGIONS).filter(([, r]) => r.countries.length).map(([key, r]) => (
          <div key={key} style={{ marginBottom: 22 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 26 }}>{r.mascot}</span>
              <span style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 20, fontWeight: 700, color: r.color }}><TText text={r.name} lang={lang} /></span>
              <span style={{ fontSize: 13, fontWeight: 900, color: '#78909C' }}>{stats.byRegion[key]} / {r.countries.length}</span>
            </div>
            <div className="stamp-grid">
              {r.countries.map((code) => <Stamp key={code} code={code} state={stats.states[code]} lang={lang} onClick={() => nav.goCountry(code)} />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

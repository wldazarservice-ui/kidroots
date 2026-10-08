import { useMemo, useState } from 'react'
import { t } from '../i18n'
import { COUNTRIES, REGIONS } from '../data/countries'
import { passportStats } from '../explore'
import { countryName } from '../names'
import WorldMap from './WorldMap'
import ExploreHeader from './ExploreHeader'

const INK = '#1A2A4F'

// Carte du monde : les pays tamponnés prennent la couleur de leur continent
export default function MapScreen({ lang, progress, nav }) {
  const stats = useMemo(() => passportStats(progress), [progress])
  const [picked, setPicked] = useState(null)

  const fill = (code) => {
    const c = COUNTRIES[code]
    if (!c) return '#E3E8EC'
    const st = stats.states[code]
    const reg = REGIONS[c.region]
    if (st.stamp) return reg.grad[1]
    if (st.visited) return reg.grad[0]
    return '#FFFFFF'
  }

  const c = picked && COUNTRIES[picked]
  const st = picked && stats.states[picked]
  const legend = [['#FF6F00', t(lang, 'map_stamp')], ['#FFB300', t(lang, 'map_visited')], ['#FFFFFF', t(lang, 'map_todo')], ['#E3E8EC', t(lang, 'map_not_yet')]]

  return (
    <div className="home-sky screen-wide" style={{ minHeight: '100vh', fontFamily: 'Nunito, sans-serif', paddingBottom: 30 }}>
      <ExploreHeader lang={lang} emoji="🗺️" title={t(lang, 'map_title')} sub={t(lang, 'map_sub')} onBack={nav.goHome} />
      <div style={{ padding: '6px 16px' }}>
        <WorldMap fill={fill} onPick={setPicked} highlight={picked} height={Math.min(560, Math.round(window.innerHeight * 0.62))} />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 10, fontSize: 12, fontWeight: 800, color: '#546E7A' }}>
          {legend.map(([col, label]) => (
            <span key={label} style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 14, height: 14, borderRadius: 4, background: col, border: '1px solid #CFD8DC' }} />{label}
            </span>
          ))}
        </div>
        {picked && (
          <div className="anim-slide-up" style={{ marginTop: 14, background: 'white', borderRadius: 22, padding: 14, display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 8px 22px rgba(26,42,79,0.12)' }}>
            <div style={{ fontSize: 44 }}>{c?.flag || '🏳️'}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 20, fontWeight: 700, color: INK }}>{countryName(picked, lang)}</div>
              <div style={{ fontSize: 12, fontWeight: 800, color: '#78909C' }}>
                {c ? (st.stamp ? `🛂 ${t(lang, 'map_stamp')}` : `📖 ${st.done} / ${st.total} ${t(lang, 'chapters_word')}`) : t(lang, 'map_not_yet')}
              </div>
            </div>
            {c && (
              <button className="btn-kid soft" onClick={() => nav.goCountry(picked)}
                style={{ background: 'linear-gradient(180deg,#FFE04D,#FFC400)', color: INK, padding: '12px 16px', fontSize: 15, borderRadius: 16, boxShadow: '0 4px 0 #E6A100' }}>
                {t(lang, 'discover')} →
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

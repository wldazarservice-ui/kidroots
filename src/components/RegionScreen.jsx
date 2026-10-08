import { REGIONS, COUNTRIES } from '../data/countries'
import { t } from '../i18n'
import LangPicker from './LangPicker'
import { TText } from '../useTranslated'
import { isDone } from '../levels'
import { isCountryLocked } from '../premium'

const INK = '#1A2A4F'

export default function RegionScreen({ lang, changeLang, progress, nav, difficulty, premium, regionKey = 'africa', onRegion }) {
  const r = REGIONS[regionKey] || REGIONS.africa

  return (
    <div className="screen-wide" style={{ minHeight: '100vh', background: `linear-gradient(180deg, ${r.bg} 0%, #FFFFFF 70%)`, fontFamily: 'Nunito, sans-serif', padding: '14px 16px 32px', transition: 'background 0.4s' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <button className="btn-kid" onClick={nav.goHome}
          style={{ background: 'white', color: INK, padding: '8px 14px', minHeight: 38, fontSize: 14, boxShadow: '0 3px 10px rgba(26,42,79,0.12)' }}>
          {t(lang, 'back_home')}
        </button>
        <div style={{ flex: 1 }} />
        <LangPicker lang={lang} onChange={changeLang} compact />
      </div>

      {/* Onglets continents */}
      <div className="region-tabs" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 18 }}>
        {Object.entries(REGIONS).map(([key, reg]) => {
          const active = key === regionKey
          return (
            <button key={key} className="btn-kid soft" onClick={() => onRegion?.(key)} aria-pressed={active}
              style={{
                background: active ? `linear-gradient(150deg, ${reg.grad[0]}, ${reg.grad[1]})` : 'white',
                color: active ? 'white' : INK,
                padding: '8px 4px', borderRadius: 18, fontSize: 11,
                boxShadow: active ? `0 5px 0 ${reg.grad[1]}66` : '0 3px 10px rgba(26,42,79,0.10)',
                transform: active ? 'translateY(-2px)' : 'none',
              }}>
              <div className="tab-emoji" style={{ fontSize: 26, lineHeight: 1.2 }}>{reg.mascot}</div>
              <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}><TText text={reg.name} lang={lang} /></div>
            </button>
          )
        })}
      </div>

      {/* Titre */}
      <div key={`title-${regionKey}`} className="anim-slide-up" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <div className="float" style={{ fontSize: 48 }}>{r.mascot}</div>
        <div>
          <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 28, fontWeight: 700, color: r.color, lineHeight: 1.05 }}>
            <TText text={r.name} lang={lang} />
          </div>
          <div style={{ fontSize: 14, color: '#546E7A', fontWeight: 800 }}>{t(lang, 'pick_country')} · {r.countries.length} {t(lang, 'countries_word')}</div>
        </div>
      </div>

      {/* Pays */}
      <div key={`grid-${regionKey}`} className="country-grid">
        {r.countries.map((code, i) => {
          const c = COUNTRIES[code]
          const doneCount = c.chapters.filter(ch => isDone(progress, ch.id, difficulty)).length
          const done = doneCount === c.chapters.length
          const locked = isCountryLocked(code, premium)
          return (
            <div key={code} className="anim-slide-up" style={{ animationDelay: `${i * 50}ms`, opacity: 0 }}>
              <button className="btn-kid lift country-card" onClick={() => nav.goCountry(code)}
                style={{ width: '100%', height: '100%', background: 'white', borderRadius: 26, padding: 0, overflow: 'hidden', textAlign: 'center', display: 'flex', flexDirection: 'column', border: `3px solid ${doneCount ? c.color : 'white'}`, boxShadow: `0 6px 0 ${c.color}2E, 0 12px 24px rgba(26,42,79,0.08)`, position: 'relative', opacity: locked ? 0.92 : 1 }}>
                {/* Bandeau colore avec le drapeau */}
                <div style={{ background: `radial-gradient(circle at 50% 120%, ${c.color}30 0, ${c.bg} 70%)`, padding: '16px 10px 10px', position: 'relative' }}>
                  {done && <div style={{ position: 'absolute', top: 6, right: 8, fontSize: 24 }} className="anim-starpop">⭐</div>}
                  {locked && <div style={{ position: 'absolute', top: 8, right: 10, fontSize: 13, background: 'white', borderRadius: 999, padding: '3px 8px', boxShadow: '0 2px 6px rgba(0,0,0,0.12)' }} aria-label="verrouillé">🔒</div>}
                  {!locked && !premium && <div style={{ position: 'absolute', top: 8, left: 10, fontSize: 11, fontWeight: 900, color: 'white', background: '#2E9E5B', borderRadius: 999, padding: '3px 9px' }}>🎁 {t(lang, 'free_badge')}</div>}
                  <div className="cflag" style={{ fontSize: 52, lineHeight: 1.1, filter: 'drop-shadow(0 6px 8px rgba(0,0,0,0.15))' }}>{c.flag}</div>
                </div>
                <div style={{ padding: '10px 12px 14px', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, width: '100%' }}>
                  <div className="cname" style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 19, fontWeight: 600, color: INK, lineHeight: 1.15 }}>
                    <TText text={c.name} lang={lang} />
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#607D8B', lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    <TText text={c.tagline} lang={lang} />
                  </div>
                  <div style={{ marginTop: 'auto', paddingTop: 8, width: '100%', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span title={c.hero?.name} style={{ fontSize: 22, width: 34, height: 34, borderRadius: '50%', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{c.hero?.emoji}</span>
                    <div style={{ flex: 1, display: 'flex', gap: 3 }}>
                      {c.chapters.map(ch => (
                        <span key={ch.id} style={{ flex: 1, height: 8, borderRadius: 4, background: isDone(progress, ch.id, difficulty) ? c.color : '#ECEFF1' }} />
                      ))}
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 900, color: doneCount ? c.color : '#90A4AE', minWidth: 26, textAlign: 'right' }}>{doneCount}/{c.chapters.length}</span>
                  </div>
                </div>
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

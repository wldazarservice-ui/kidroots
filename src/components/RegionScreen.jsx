import { REGIONS, COUNTRIES } from '../data/countries'
import { t } from '../i18n'
import LangPicker from './LangPicker'
import { TText } from '../useTranslated'

const INK = '#1A2A4F'

export default function RegionScreen({ lang, changeLang, progress, nav, regionKey = 'africa', onRegion }) {
  const r = REGIONS[regionKey] || REGIONS.africa

  return (
    <div style={{ minHeight: '100vh', background: `linear-gradient(180deg, ${r.bg} 0%, #FFFFFF 70%)`, fontFamily: 'Nunito, sans-serif', padding: '14px 16px 32px', transition: 'background 0.4s' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <button className="btn-kid" onClick={nav.goHome}
          style={{ background: 'white', color: INK, padding: '8px 14px', minHeight: 38, fontSize: 14, boxShadow: '0 3px 10px rgba(26,42,79,0.12)' }}>
          {t(lang, 'back_home')}
        </button>
        <div style={{ flex: 1 }} />
        <LangPicker lang={lang} onChange={changeLang} compact />
      </div>

      {/* Onglets continents */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 18 }}>
        {Object.entries(REGIONS).map(([key, reg]) => {
          const active = key === regionKey
          return (
            <button key={key} className="btn-kid" onClick={() => onRegion?.(key)} aria-pressed={active}
              style={{
                background: active ? `linear-gradient(150deg, ${reg.grad[0]}, ${reg.grad[1]})` : 'white',
                color: active ? 'white' : INK,
                padding: '8px 4px', borderRadius: 18, fontSize: 11,
                boxShadow: active ? `0 5px 0 ${reg.grad[1]}66` : '0 3px 10px rgba(26,42,79,0.10)',
                transform: active ? 'translateY(-2px)' : 'none',
              }}>
              <div style={{ fontSize: 26, lineHeight: 1.2 }}>{reg.mascot}</div>
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
      <div key={`grid-${regionKey}`} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {r.countries.map((code, i) => {
          const c = COUNTRIES[code]
          const doneCount = c.chapters.filter(ch => progress.done[ch.id]).length
          const done = doneCount === c.chapters.length
          return (
            <div key={code} className="anim-slide-up" style={{ animationDelay: `${i * 50}ms`, opacity: 0 }}>
              <button className="btn-kid" onClick={() => nav.goCountry(code)}
                style={{ width: '100%', height: '100%', background: 'white', borderRadius: 24, padding: '14px 10px 12px', textAlign: 'center', border: `3px solid ${doneCount ? c.color : 'transparent'}`, boxShadow: `0 6px 0 ${c.color}33, 0 10px 20px rgba(26,42,79,0.08)`, position: 'relative' }}>
                {done && <div style={{ position: 'absolute', top: -8, right: -6, fontSize: 26 }} className="anim-starpop">⭐</div>}
                <div style={{ fontSize: 46, lineHeight: 1.1 }}>{c.flag}</div>
                <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 18, fontWeight: 600, color: INK, margin: '6px 0 2px' }}>
                  <TText text={c.name} lang={lang} />
                </div>
                <div style={{ fontSize: 22, marginBottom: 8 }}>{c.hero?.emoji}</div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
                  {c.chapters.map(ch => (
                    <span key={ch.id} style={{ width: 14, height: 8, borderRadius: 4, background: progress.done[ch.id] ? c.color : '#ECEFF1' }} />
                  ))}
                </div>
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

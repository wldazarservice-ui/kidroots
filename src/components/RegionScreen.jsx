import { REGIONS, COUNTRIES } from '../data/countries'
import { t } from '../i18n'
import LangPicker from './LangPicker'
import { TText } from '../useTranslated'

export default function RegionScreen({ lang, changeLang, progress, nav }) {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg,#0a0e1a,#1a2744)', fontFamily: 'Nunito, sans-serif', padding: '12px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <button className="btn-kid" onClick={nav.goHome}
          style={{ background: 'rgba(255,255,255,0.1)', color: 'white', padding: '8px 16px', fontSize: 13 }}>
          {t(lang, 'back_home')}
        </button>
        <div style={{ fontSize: 16, fontWeight: 900, color: 'white', flex: 1 }}>🗺️</div>
        <LangPicker lang={lang} onChange={changeLang} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {Object.entries(REGIONS).map(([key, r]) => (
          <div key={key} style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 22, padding: '18px 20px', border: '2px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div style={{ fontSize: 40 }}>{r.emoji}</div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 900, color: 'white' }}><TText text={r.name} lang={lang} /></div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>{r.countries.length} <TText text="pays" lang={lang} /></div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {r.countries.map(code => {
                const c = COUNTRIES[code]
                const done = c.chapters.every(ch => progress.done[ch.id])
                const started = c.chapters.some(ch => progress.done[ch.id])
                return (
                  <div key={code} onClick={() => nav.goCountry(code)}
                    style={{ background: done ? c.color : started ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)', borderRadius: 16, padding: '10px 14px', textAlign: 'center', cursor: 'pointer', border: `2px solid ${started ? c.color : 'rgba(255,255,255,0.1)'}`, transition: 'transform 0.15s', minWidth: 80 }}
                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.06)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
                    <div style={{ fontSize: 30 }}>{c.flag}</div>
                    <div style={{ fontSize: 12, fontWeight: 900, color: 'white', marginTop: 4 }}><TText text={c.name} lang={lang} /></div>
                    {done && <div style={{ fontSize: 12, marginTop: 2 }}>⭐</div>}
                    {started && !done && <div style={{ fontSize: 10, color: '#FFD600', fontWeight: 700, marginTop: 2 }}>{t(lang, 'in_progress')}</div>}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

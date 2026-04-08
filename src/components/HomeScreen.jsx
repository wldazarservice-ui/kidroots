import { COUNTRIES, REGIONS } from '../data/countries'
import { t } from '../i18n'
import LangPicker from './LangPicker'
import SpeakButton from './SpeakButton'
import { signOut } from '../auth'

export default function HomeScreen({ lang, changeLang, progress, nav, activeChild }) {
  const totalChapters = Object.values(COUNTRIES).reduce((acc, c) => acc + c.chapters.length, 0)
  const doneChapters = Object.keys(progress.done).length
  const pct = Math.round((doneChapters / totalChapters) * 100)

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg,#0a0e1a 0%,#1a2744 50%,#0d3b6e 100%)', fontFamily: 'Nunito, sans-serif' }}>
      <div style={{ padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: 'Fredoka One, sans-serif', fontSize: 28, color: '#FFD600' }}>KidRoots</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 20, padding: '6px 14px' }}>
            <span style={{ fontSize: 13, fontWeight: 900, color: '#FFD600' }}>{progress.xp} XP</span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}> · Niv.{progress.level}</span>
          </div>
          <SpeakButton settings color="#FF6B35" label="" />
          <LangPicker lang={lang} onChange={changeLang} />
        </div>
      </div>

      {activeChild && (
        <div style={{ padding: '0 20px', display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
          <button className="btn-kid" onClick={nav.switchProfile}
            style={{ background: 'rgba(255,255,255,0.08)', color: 'white', padding: '8px 12px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 18 }}>{activeChild.avatar || '👦'}</span>
            <span>{activeChild.name}</span>
            <span style={{ opacity: 0.5, fontSize: 11 }}>▼</span>
          </button>
          <div style={{ flex: 1 }} />
          <button className="btn-kid" onClick={() => signOut()} title="Deconnexion"
            style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)', padding: '8px 10px', fontSize: 11 }}>
            ⏻
          </button>
        </div>
      )}

      <div style={{ padding: '10px 20px 30px' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 72, marginBottom: 8 }} className="float">🌍</div>
          <div style={{ fontFamily: 'Fredoka One, sans-serif', fontSize: 36, color: 'white', lineHeight: 1.1, marginBottom: 6 }}>
            KidRoots
          </div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', fontWeight: 700 }}>
            {t(lang, 'tagline')}
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 16, padding: '14px 16px', marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 900, color: 'rgba(255,255,255,0.5)' }}>{t(lang, 'progress')}</span>
            <span style={{ fontSize: 13, fontWeight: 900, color: '#FFD600' }}>{pct}%</span>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 10, height: 10 }}>
            <div style={{ width: `${pct}%`, height: '100%', background: 'linear-gradient(90deg,#FFD600,#FF6F00)', borderRadius: 10, transition: 'width 1s ease' }} />
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 700, marginTop: 6 }}>
            {doneChapters} / {totalChapters} {t(lang, 'chapters_done')}
          </div>
        </div>

        <div style={{ fontSize: 11, fontWeight: 900, color: 'rgba(255,255,255,0.4)', letterSpacing: 1, marginBottom: 12 }}>
          {t(lang, 'continents')}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          {Object.entries(REGIONS).map(([key, r]) => (
            <div key={key} onClick={nav.goRegions}
              style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 20, padding: '16px 12px', cursor: 'pointer', textAlign: 'center', border: '2px solid rgba(255,255,255,0.1)', transition: 'transform 0.2s' }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.04)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
              <div style={{ fontSize: 36, marginBottom: 6 }}>{r.emoji}</div>
              <div style={{ fontSize: 14, fontWeight: 900, color: 'white', marginBottom: 4 }}>{r.name}</div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
                {r.countries.map(c => (
                  <span key={c} style={{ fontSize: 18, opacity: progress.done[COUNTRIES[c]?.chapters[0]?.id] ? 1 : 0.3 }}>
                    {COUNTRIES[c]?.flag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button className="btn-kid" onClick={nav.goRegions}
          style={{ background: '#FFD600', color: '#1A237E', padding: '18px', fontSize: 20, width: '100%', boxShadow: '0 6px 24px rgba(255,214,0,0.4)' }}>
          {t(lang, 'play')}
        </button>
      </div>
    </div>
  )
}

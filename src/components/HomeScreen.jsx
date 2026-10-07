import { COUNTRIES, REGIONS } from '../data/countries'
import { t } from '../i18n'
import LangPicker from './LangPicker'
import SpeakButton from './SpeakButton'
import { TText } from '../useTranslated'
import { signOut } from '../auth'
import { LEVELS, isDone, countryStats } from '../levels'

const INK = '#1A2A4F'

export default function HomeScreen({ lang, changeLang, progress, nav, activeChild, difficulty }) {
  const L = LEVELS[difficulty] || LEVELS.explorer
  const allChapters = Object.values(COUNTRIES).flatMap(c => c.chapters)
  const totalChapters = allChapters.length
  const doneChapters = allChapters.filter(ch => isDone(progress, ch.id, difficulty)).length
  const totalStories = Object.keys(COUNTRIES).reduce((a, code) => a + countryStats(code, difficulty).stories, 0)
  const pct = Math.round((doneChapters / totalChapters) * 100)
  const xpInLevel = progress.xp % 300
  const firstName = (activeChild?.name || '').split(' ')[0]

  const countryStarted = (code) => COUNTRIES[code]?.chapters.some(ch => isDone(progress, ch.id, difficulty))
  const countryDone = (code) => COUNTRIES[code]?.chapters.every(ch => isDone(progress, ch.id, difficulty))

  return (
    <div className="home-sky" style={{ minHeight: '100vh', fontFamily: 'Nunito, sans-serif', position: 'relative', overflow: 'hidden' }}>
      {/* Decor */}
      <div aria-hidden style={{ position: 'absolute', top: 70, left: -10, fontSize: 54, opacity: 0.9 }} className="drift">☁️</div>
      <div aria-hidden style={{ position: 'absolute', top: 190, right: -14, fontSize: 44, opacity: 0.8, animationDelay: '-4s' }} className="drift">☁️</div>
      <div aria-hidden style={{ position: 'absolute', top: 96, right: 26, fontSize: 40 }} className="spin-slow">☀️</div>

      {/* Barre du haut */}
      <div style={{ padding: '14px 16px 0', display: 'flex', alignItems: 'center', gap: 8, position: 'relative', zIndex: 5 }}>
        {activeChild && (
          <button className="btn-kid" onClick={nav.switchProfile} aria-label="Changer de profil"
            style={{ background: 'white', color: INK, padding: '6px 12px 6px 6px', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 3px 10px rgba(26,42,79,0.12)', minWidth: 0 }}>
            <span style={{ width: 34, height: 34, borderRadius: '50%', background: '#FFF3E0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
              {activeChild.avatar || '👦'}
            </span>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 96 }}>{firstName}</span>
            <span style={{ fontSize: 10, color: '#90A4AE' }}>▼</span>
          </button>
        )}
        <div style={{ flex: 1 }} />
        <SpeakButton settings color="#FF6B35" label="" />
        <LangPicker lang={lang} onChange={changeLang} compact />
        <button className="btn-kid" onClick={() => signOut()} title="Deconnexion" aria-label="Deconnexion"
          style={{ background: 'white', color: '#90A4AE', width: 34, height: 34, fontSize: 14, borderRadius: '50%', boxShadow: '0 3px 10px rgba(26,42,79,0.12)', flexShrink: 0 }}>
          ⏻
        </button>
      </div>

      <div style={{ padding: '8px 18px 32px', position: 'relative', zIndex: 2 }}>
        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <div className="float" style={{ fontSize: 78, lineHeight: 1, margin: '0 0 4px', filter: 'drop-shadow(0 10px 14px rgba(21,101,192,0.25))' }}>🌍</div>
          <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontWeight: 700, fontSize: 44, lineHeight: 1, letterSpacing: 0.5 }}>
            <span style={{ color: '#FF6F00' }}>Kid</span><span style={{ color: '#1E88E5' }}>Roots</span>
          </div>
          {firstName && (
            <div style={{ fontSize: 20, fontWeight: 900, color: INK, marginTop: 10 }}>
              {t(lang, 'hello', { name: firstName })}
            </div>
          )}
          <div style={{ fontSize: 15, color: '#546E7A', fontWeight: 700, marginTop: 4 }}>
            {t(lang, 'where_go')}
          </div>
        </div>

        {/* Niveau de lecture */}
        <button className="btn-kid" onClick={nav.openLevelPicker}
          style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, background: `linear-gradient(150deg, ${L.grad[0]}, ${L.grad[1]})`, color: 'white', borderRadius: 22, padding: '10px 14px', marginBottom: 12, textAlign: 'left', boxShadow: `0 5px 0 ${L.grad[1]}55` }}>
          <span style={{ fontSize: 34 }}>{L.emoji}</span>
          <span style={{ flex: 1, minWidth: 0 }}>
            <span style={{ display: 'block', fontSize: 11, fontWeight: 900, opacity: 0.85, textTransform: 'uppercase', letterSpacing: 0.5 }}>{t(lang, 'reading_level')}</span>
            <span style={{ display: 'block', fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 19, fontWeight: 600, lineHeight: 1.15 }}>{t(lang, `lvl_${difficulty}`)}</span>
            <span style={{ display: 'block', fontSize: 12, fontWeight: 800, opacity: 0.92 }}>📖 {totalStories} {t(lang, 'stories_word')}</span>
          </span>
          <span style={{ background: 'rgba(255,255,255,0.25)', borderRadius: 999, padding: '6px 12px', fontSize: 13, fontWeight: 900 }}>✎</span>
        </button>

        {/* Progression */}
        <div style={{ background: 'white', borderRadius: 24, padding: 14, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 14, boxShadow: '0 8px 24px rgba(26,42,79,0.10)' }}>
          <div style={{ width: 64, height: 64, borderRadius: 20, background: 'linear-gradient(145deg,#FFD54F,#FF9800)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0, boxShadow: '0 4px 12px rgba(255,152,0,0.4)' }}>
            <div style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', opacity: 0.95 }}>{t(lang, 'level')}</div>
            <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 28, fontWeight: 700, lineHeight: 1 }}>{progress.level}</div>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
              <span style={{ fontSize: 16, fontWeight: 900, color: INK }}>⭐ {progress.xp} XP</span>
              <span style={{ fontSize: 12, fontWeight: 900, color: '#FF6F00' }}>{xpInLevel} / 300</span>
            </div>
            <div style={{ background: '#FFF3E0', borderRadius: 10, height: 14, overflow: 'hidden' }}>
              <div style={{ width: `${Math.max(4, (xpInLevel / 300) * 100)}%`, height: '100%', background: 'linear-gradient(90deg,#FFD600,#FF6F00)', borderRadius: 10, transition: 'width 1s ease' }} />
            </div>
            <div style={{ fontSize: 12, color: '#78909C', fontWeight: 700, marginTop: 6 }}>
              📚 {doneChapters} / {totalChapters} {t(lang, 'chapters_word')} · {pct}%
            </div>
          </div>
        </div>

        {/* Continents */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 22 }}>
          {Object.entries(REGIONS).map(([key, r], i) => {
            const started = r.countries.filter(countryStarted).length
            const done = r.countries.filter(countryDone).length
            return (
              <div key={key} className="anim-slide-up" style={{ animationDelay: `${i * 70}ms`, opacity: 0 }}>
              <button className="btn-kid" onClick={() => nav.goRegions(key)}
                style={{ width: '100%', height: '100%', background: `linear-gradient(150deg, ${r.grad[0]}, ${r.grad[1]})`, padding: '12px 8px', color: 'white', textAlign: 'center', borderRadius: 26, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', boxShadow: `0 8px 0 ${r.grad[1]}55, 0 12px 22px ${r.grad[1]}40`, position: 'relative', overflow: 'hidden' }}>
                <div aria-hidden style={{ position: 'absolute', top: -18, right: -18, width: 70, height: 70, borderRadius: '50%', background: 'rgba(255,255,255,0.18)' }} />
                <div className="float" style={{ fontSize: 46, lineHeight: 1.1, animationDelay: `${i * -0.6}s` }}>{r.mascot}</div>
                <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 21, fontWeight: 600, margin: '6px 0 8px', textShadow: '0 2px 0 rgba(0,0,0,0.12)' }}>
                  <TText text={r.name} lang={lang} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', background: 'rgba(255,255,255,0.92)', borderRadius: 14, padding: '5px 6px', width: '100%', gap: 3 }}>
                  {r.countries.map(c => (
                    <span key={c} style={{ fontSize: r.countries.length > 5 ? 14 : 17, lineHeight: 1.2 }}>{COUNTRIES[c]?.flag}</span>
                  ))}
                </div>
                <div style={{ fontSize: 12, fontWeight: 900, marginTop: 8, opacity: 0.95 }}>
                  {done > 0 ? `⭐ ${done} / ${r.countries.length}` : started > 0 ? `🚀 ${started} / ${r.countries.length}` : `${r.countries.length} ${t(lang, 'countries_word')}`}
                </div>
              </button>
              </div>
            )
          })}
        </div>

        <button className="btn-kid" onClick={() => nav.goRegions()}
          style={{ background: 'linear-gradient(180deg,#FFE04D,#FFC400)', color: INK, padding: '20px', fontSize: 21, width: '100%', borderRadius: 26, boxShadow: '0 7px 0 #E6A100, 0 12px 24px rgba(255,196,0,0.45)' }}>
          {t(lang, 'play')}
        </button>
      </div>
    </div>
  )
}

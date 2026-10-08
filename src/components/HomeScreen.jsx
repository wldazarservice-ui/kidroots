import { COUNTRIES, REGIONS } from '../data/countries'
import LogoutIcon from './LogoutIcon'
import { t } from '../i18n'
import LangPicker from './LangPicker'
import SpeakButton from './SpeakButton'
import { TText } from '../useTranslated'
import { PLANS, DAILY_FREE_CHAPTERS, todayIds } from '../premium'
import LegalFooter from './LegalFooter'
import StoryBanners from './StoryBanners'
import { LEVELS, LEVEL_KEYS, isDone } from '../levels'
import { passportStats } from '../explore'

const INK = '#1A2A4F'

export default function HomeScreen({ lang, changeLang, progress, nav, activeChild, difficulty, premium }) {
  const allChapters = Object.values(COUNTRIES).flatMap(c => c.chapters)
  const totalChapters = allChapters.length
  const doneChapters = allChapters.filter(ch => isDone(progress, ch.id, difficulty)).length
  const pct = Math.round((doneChapters / totalChapters) * 100)
  const xpInLevel = progress.xp % 300
  const firstName = (activeChild?.name || '').split(' ')[0]
  const usedToday = Math.min(DAILY_FREE_CHAPTERS, todayIds(activeChild).length)
  const stamps = passportStats(progress).stamps.length

  const countryStarted = (code) => COUNTRIES[code]?.chapters.some(ch => isDone(progress, ch.id, difficulty))
  const countryDone = (code) => COUNTRIES[code]?.chapters.every(ch => isDone(progress, ch.id, difficulty))

  return (
    <div className="home-sky screen-wide" style={{ minHeight: '100vh', fontFamily: 'Nunito, sans-serif', position: 'relative', overflow: 'hidden' }}>
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
        <button className="btn-kid" onClick={nav.logout} title="Deconnexion" aria-label="Deconnexion"
          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: 'white', color: '#90A4AE', width: 34, height: 34, fontSize: 14, borderRadius: '50%', boxShadow: '0 3px 10px rgba(26,42,79,0.12)', flexShrink: 0 }}>
          <LogoutIcon size={16} />
        </button>
      </div>

      <div style={{ padding: '8px 18px 32px', position: 'relative', zIndex: 2 }}>
        <div className="home-hero-row">
        {/* Hero */}
        <div className="home-hero" style={{ textAlign: 'center', marginBottom: 16 }}>
          <div className="float globe" style={{ fontSize: 78, lineHeight: 1, margin: '0 0 4px', filter: 'drop-shadow(0 10px 14px rgba(21,101,192,0.25))' }}>🌍</div>
          <div>
          <div className="logo" style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontWeight: 700, fontSize: 44, lineHeight: 1, letterSpacing: 0.5 }}>
            <span style={{ color: '#FF6F00' }}>Moka</span><span style={{ color: '#1E88E5' }}>libo</span>
          </div>
          {firstName && (
            <div className="hello" style={{ fontSize: 20, fontWeight: 900, color: INK, marginTop: 10 }}>
              {t(lang, 'hello', { name: firstName })}
            </div>
          )}
          <div className="sub" style={{ fontSize: 15, color: '#546E7A', fontWeight: 700, marginTop: 4 }}>
            {t(lang, 'where_go')}
          </div>
          </div>
        </div>

        <div className="home-side">

        {/* Carte d'état : niveau de lecture, XP, aventures du jour */}
        <div style={{ background: 'white', borderRadius: 26, padding: 14, marginBottom: 12, boxShadow: '0 8px 24px rgba(26,42,79,0.10)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 62, height: 62, borderRadius: 20, background: 'linear-gradient(145deg,#FFD54F,#FF9800)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0, boxShadow: '0 4px 12px rgba(255,152,0,0.4)' }}>
              <div style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', opacity: 0.95 }}>{t(lang, 'level')}</div>
              <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 28, fontWeight: 700, lineHeight: 1 }}>{progress.level}</div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                <span style={{ fontSize: 16, fontWeight: 900, color: INK }}>⭐ {progress.xp} XP</span>
                <span style={{ fontSize: 12, fontWeight: 900, color: '#FF6F00' }}>{xpInLevel} / 300</span>
              </div>
              <div style={{ background: '#FFF3E0', borderRadius: 10, height: 12, overflow: 'hidden' }}>
                <div style={{ width: `${Math.max(4, (xpInLevel / 300) * 100)}%`, height: '100%', background: 'linear-gradient(90deg,#FFD600,#FF6F00)', borderRadius: 10, transition: 'width 1s ease' }} />
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4px 12px', marginTop: 6, fontSize: 12, fontWeight: 800, color: '#78909C' }}>
                <span>📚 {doneChapters} / {totalChapters} · {pct}%</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: '#1565C0', fontWeight: 900 }}>
                  ⚡ {premium ? t(lang, 'daily_unlimited') : t(lang, 'daily_left')}
                  {!premium && Array.from({ length: DAILY_FREE_CHAPTERS }, (_, i) => (
                    <span key={i} style={{ width: 14, height: 14, borderRadius: '50%', background: i < DAILY_FREE_CHAPTERS - usedToday ? 'linear-gradient(145deg,#FFD54F,#FF9800)' : '#E3EAF2' }} />
                  ))}
                </span>
              </div>
            </div>
          </div>

          {/* Choix du niveau de lecture : les 3 niveaux toujours visibles */}
          <div style={{ marginTop: 12, paddingTop: 12, borderTop: '2px solid #F1F4F8' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ flex: 1, fontSize: 11, fontWeight: 900, color: '#78909C', textTransform: 'uppercase', letterSpacing: 0.5 }}>{t(lang, 'reading_level')}</span>
              <button onClick={nav.openLevelPicker} style={{ background: 'none', border: 'none', color: '#1E88E5', fontWeight: 900, fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>ℹ️ {t(lang, 'choose_level')}</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {LEVEL_KEYS.map((k) => {
                const LL = LEVELS[k]
                const on = k === difficulty
                return (
                  <button key={k} className="btn-kid soft" onClick={() => (on ? nav.openLevelPicker() : nav.setDifficulty(k))} aria-pressed={on}
                    style={{ padding: '8px 4px', borderRadius: 16, background: on ? `linear-gradient(150deg, ${LL.grad[0]}, ${LL.grad[1]})` : '#F5F7FA', color: on ? 'white' : INK, boxShadow: on ? `0 4px 0 ${LL.grad[1]}66` : 'none', border: on ? 'none' : '2px solid #E3EAF2' }}>
                    <span style={{ display: 'block', fontSize: 24, lineHeight: 1.1 }}>{LL.emoji}</span>
                    <span style={{ display: 'block', fontSize: 12, fontWeight: 900, lineHeight: 1.15 }}>{t(lang, `lvl_${k}`)}</span>
                    <span style={{ display: 'block', fontSize: 10, fontWeight: 800, opacity: 0.85 }}>{LL.ages} {t(lang, 'years')}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {!premium && (
          <button className="btn-kid soft" onClick={nav.openPaywall}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, background: 'white', color: '#1A2A4F', borderRadius: 20, padding: '10px 14px', marginBottom: 12, textAlign: 'left', border: '3px dashed #FF9800' }}>
            <span style={{ fontSize: 26 }}>🔓</span>
            <span style={{ flex: 1, fontSize: 14, fontWeight: 900 }}>{t(lang, 'pw_banner')}</span>
            <span style={{ background: '#FF7A00', color: 'white', borderRadius: 999, padding: '5px 11px', fontSize: 14, fontWeight: 900, whiteSpace: 'nowrap' }}>{PLANS.month.label} {t(lang, 'per_month')}</span>
          </button>
        )}

        </div>
        </div>

        {/* Raccourcis : passeport, carte, jeux */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 10, marginBottom: 22 }}>
          {[
            ['🛂', t(lang, 'home_passport'), `${stamps} / ${Object.keys(COUNTRIES).length}`, ['#5C6BC0', '#1E3A8A'], nav.openPassport],
            ['🗺️', t(lang, 'home_map'), t(lang, 'map_sub'), ['#26C6DA', '#00838F'], nav.openMap],
            ['🎮', t(lang, 'home_games'), `⭐ ${activeChild?.games?.stars || 0}`, ['#FF7043', '#D84315'], nav.openGames],
          ].map(([emoji, title, sub, grad, onClick]) => (
            <button key={title} className="btn-kid lift" onClick={onClick}
              style={{ background: `linear-gradient(150deg, ${grad[0]}, ${grad[1]})`, color: 'white', borderRadius: 24, padding: '14px 6px 12px', textAlign: 'center', boxShadow: `0 6px 0 ${grad[1]}55, 0 10px 20px ${grad[1]}35`, minHeight: 112 }}>
              <span className="float" style={{ display: 'block', fontSize: 40, lineHeight: 1.1 }}>{emoji}</span>
              <span style={{ display: 'block', fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 18, fontWeight: 700, marginTop: 4 }}>{title}</span>
              <span style={{ display: 'block', fontSize: 11, fontWeight: 800, opacity: 0.92, lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', padding: '0 4px' }}>{sub}</span>
            </button>
          ))}
        </div>

        <StoryBanners lang={lang} onOpen={nav.goCountry} />

        {/* Continents */}
        <div className="continent-grid" style={{ marginBottom: 22 }}>
          {Object.entries(REGIONS).filter(([, r]) => r.countries.length).map(([key, r], i) => {
            const started = r.countries.filter(countryStarted).length
            const done = r.countries.filter(countryDone).length
            return (
              <div key={key} className="anim-slide-up" style={{ animationDelay: `${i * 70}ms`, opacity: 0 }}>
              <button className="btn-kid lift continent-card" onClick={() => nav.goRegions(key)}
                style={{ width: '100%', height: '100%', background: `linear-gradient(150deg, ${r.grad[0]}, ${r.grad[1]})`, padding: '12px 8px', color: 'white', textAlign: 'center', borderRadius: 26, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', boxShadow: `0 8px 0 ${r.grad[1]}55, 0 12px 22px ${r.grad[1]}40`, position: 'relative', overflow: 'hidden' }}>
                <div aria-hidden style={{ position: 'absolute', top: -18, right: -18, width: 70, height: 70, borderRadius: '50%', background: 'rgba(255,255,255,0.18)' }} />
                <div className="float mascot" style={{ fontSize: 46, lineHeight: 1.1, animationDelay: `${i * -0.6}s` }}>{r.mascot}</div>
                <div className="cname" style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 21, fontWeight: 600, margin: '6px 0 8px', textShadow: '0 2px 0 rgba(0,0,0,0.12)' }}>
                  <TText text={r.name} lang={lang} />
                </div>
                <div className="flags" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', background: 'rgba(255,255,255,0.92)', borderRadius: 14, padding: '5px 6px', width: '100%', gap: 3 }}>
                  {r.countries.slice(0, 7).map(c => (
                    <span key={c} style={{ fontSize: r.countries.length > 5 ? 14 : 17, lineHeight: 1.2 }}>{COUNTRIES[c]?.flag}</span>
                  ))}
                  {r.countries.length > 7 && <span style={{ fontSize: 11, fontWeight: 900, color: '#546E7A', alignSelf: 'center' }}>+{r.countries.length - 7}</span>}
                </div>
                <div style={{ fontSize: 12, fontWeight: 900, marginTop: 8, opacity: 0.95 }}>
                  {done > 0 ? `⭐ ${done} / ${r.countries.length}` : started > 0 ? `🚀 ${started} / ${r.countries.length}` : `${r.countries.length} ${t(lang, 'countries_word')}`}
                </div>
              </button>
              </div>
            )
          })}
        </div>

        <button className="btn-kid soft play-btn" onClick={() => nav.goRegions()}
          style={{ background: 'linear-gradient(180deg,#FFE04D,#FFC400)', color: INK, padding: '20px', fontSize: 21, width: '100%', borderRadius: 26, boxShadow: '0 7px 0 #E6A100, 0 12px 24px rgba(255,196,0,0.45)' }}>
          {t(lang, 'play')}
        </button>
      </div>
      <LegalFooter lang={lang} />
    </div>
  )
}

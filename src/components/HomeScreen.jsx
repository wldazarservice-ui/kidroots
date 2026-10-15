import { COUNTRIES, REGIONS } from '../data/countries'
import LogoutIcon from './LogoutIcon'
import { t } from '../i18n'
import LangPicker from './LangPicker'
import MusicButton from './MusicButton'
import NotificationCenter from './NotificationCenter'
import SpeakButton from './SpeakButton'
import { TText } from '../useTranslated'
import { PLANS, DAILY_FREE_CHAPTERS, todayIds, FREE_CHAPTERS_TOTAL, freeIds } from '../premium'
import LegalFooter from './LegalFooter'
import StoryBanners from './StoryBanners'
import { LEVELS, isDone } from '../levels'
import { passportStats } from '../explore'
import { countryName } from '../names'

const INK = '#1A2A4F'

export default function HomeScreen({ lang, changeLang, progress, nav, activeChild, difficulty, premium }) {
    const xpInLevel = progress.xp % 300
  const firstName = (activeChild?.name || '').split(' ')[0]
  const usedToday = Math.min(DAILY_FREE_CHAPTERS, todayIds(activeChild).length)
  const stamps = passportStats(progress).stamps.length

  const countryStarted = (code) => COUNTRIES[code]?.chapters.some(ch => isDone(progress, ch.id, difficulty))
  const countryDone = (code) => COUNTRIES[code]?.chapters.every(ch => isDone(progress, ch.id, difficulty))

  return (
    <div className="home-sky screen-wide" style={{ minHeight: '100vh', fontFamily: 'Nunito, sans-serif', position: 'relative', overflow: 'hidden' }}>
      {/* Decor */}
      <div aria-hidden style={{ position: 'absolute', top: 70, left: -10, fontSize: 54, opacity: 0.9 }} className="drift home-cloud">☁️</div>
      <div aria-hidden style={{ position: 'absolute', top: 190, right: -14, fontSize: 44, opacity: 0.8, animationDelay: '-4s' }} className="drift home-cloud">☁️</div>
      <div aria-hidden style={{ position: 'absolute', top: 96, right: 26, fontSize: 40 }} className="spin-slow">☀️</div>

      {/* Barre du haut */}
      <div style={{ padding: '14px 16px 0', display: 'flex', alignItems: 'center', gap: 8, position: 'relative', zIndex: 5 }}>
        {activeChild && (
          <button className="btn-kid soft" onClick={nav.switchProfile} aria-label="Changer de profil" title={firstName}
            style={{ background: 'white', width: 44, height: 44, borderRadius: '50%', fontSize: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 3px 10px rgba(26,42,79,0.12)', flexShrink: 0 }}>
            {activeChild.avatar || '👦'}
          </button>
        )}
        <div className="fr-logo" style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontWeight: 700, fontSize: 24, lineHeight: 1, marginLeft: 4 }}><span style={{ color: '#FF6F00' }}>Moka</span><span style={{ color: '#1E88E5' }}>libo</span></div>
        <div style={{ flex: 1 }} />
        <NotificationCenter lang={lang} onCountry={nav.goCountry} />
        <MusicButton label={t(lang, 'music')} />
        <SpeakButton settings color="#FF6B35" label="" />
        <LangPicker lang={lang} onChange={changeLang} compact />
        <button className="btn-kid" onClick={nav.logout} title="Déconnexion" aria-label="Déconnexion"
          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: 'white', color: '#90A4AE', width: 40, height: 40, fontSize: 14, borderRadius: '50%', boxShadow: '0 3px 10px rgba(26,42,79,0.12)', flexShrink: 0 }}>
          <LogoutIcon size={16} />
        </button>
      </div>

      <div className="home-main" style={{ position: 'relative', zIndex: 2 }}>
        <div className="home-layout">
          {/* Accueil de l'enfant + la grande carte « destination » (point focal de l'ecran) */}
          <div className="home-hero2" style={{ gridArea: 'hero' }}>
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '6px 12px', marginBottom: 12 }}>
              <div style={{ flex: '1 1 auto' }}>
                {firstName && <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 30, fontWeight: 700, color: INK, lineHeight: 1.05 }}>{t(lang, 'hello', { name: firstName })}</div>}
                <div style={{ fontSize: 17, color: '#263859', fontWeight: 800, marginTop: 4, textShadow: '0 1px 0 rgba(255,255,255,0.8)' }}>{t(lang, 'where_go')}</div>
              </div>
              <button className="btn-kid soft" onClick={nav.openLevelPicker} aria-label={t(lang, 'choose_level')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'white', color: INK, borderRadius: 999, padding: '7px 8px 7px 12px', fontSize: 14, fontWeight: 900, boxShadow: '0 3px 10px rgba(26,42,79,0.10)', border: `2px solid ${LEVELS[difficulty]?.color || '#1E88E5'}33` }}>
                <span style={{ fontSize: 22, lineHeight: 1 }}>{LEVELS[difficulty]?.emoji}</span>
                <span>{t(lang, `lvl_${difficulty}`)}</span>
                <span style={{ background: LEVELS[difficulty]?.color || '#1E88E5', color: 'white', borderRadius: 999, padding: '3px 10px', fontSize: 12 }}>{t(lang, 'lvl_change')}</span>
              </button>
            </div>
            <Destination lang={lang} nav={nav} progress={progress} difficulty={difficulty} childId={activeChild?.id} />
          </div>

          {/* Raccourcis : passeport, carte, jeux */}
          <div className="home-shortcuts hide-with-nav" style={{ gridArea: 'shortcuts' }}>
            {[
              ['🛂', t(lang, 'home_passport'), `${stamps} / ${Object.keys(COUNTRIES).length}`, ['#5C6BC0', '#1E3A8A'], nav.openPassport],
              ['🗺️', t(lang, 'home_map'), '🌍', ['#26C6DA', '#00838F'], nav.openMap],
              ['🎮', t(lang, 'home_games'), `⭐ ${activeChild?.games?.stars || 0}`, ['#FF7043', '#D84315'], nav.openGames],
            ].map(([emoji, title, sub, grad, onClick]) => (
              <button key={title} className="btn-kid lift" onClick={onClick}
                style={{ background: `linear-gradient(150deg, ${grad[0]}, ${grad[1]})`, color: 'white', borderRadius: 26, padding: '16px 6px 14px', textAlign: 'center', boxShadow: `0 6px 0 ${grad[1]}55, 0 10px 20px ${grad[1]}35`, minHeight: 118 }}>
                <span className="float" style={{ display: 'block', fontSize: 44, lineHeight: 1.1 }}>{emoji}</span>
                <span style={{ display: 'block', fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 18, fontWeight: 700, marginTop: 6 }}>{title}</span>
                <span style={{ display: 'block', fontSize: 12, fontWeight: 900, opacity: 0.92 }}>{sub}</span>
              </button>
            ))}
          </div>

          {/* Progression et niveau de lecture */}
          <div style={{ gridArea: 'side' }}>
            <div className="home-section-title">⭐ {t(lang, 'home_progress')}</div>
            <div className="flat-mobile" style={{ background: 'white', borderRadius: 26, padding: 16, boxShadow: '0 8px 24px rgba(26,42,79,0.10)', marginBottom: 22 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 60, height: 60, borderRadius: 20, background: 'linear-gradient(145deg,#FFD54F,#FF9800)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0, boxShadow: '0 4px 12px rgba(255,152,0,0.4)' }}>
                  <div style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', opacity: 0.95 }}>{t(lang, 'level')}</div>
                  <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 28, fontWeight: 700, lineHeight: 1 }}>{progress.level}</div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                    <span style={{ fontSize: 17, fontWeight: 900, color: INK }}>{progress.xp} XP</span>
                    <span style={{ fontSize: 12, fontWeight: 900, color: '#FF6F00' }}>{xpInLevel} / 300</span>
                  </div>
                  <div style={{ background: '#FFF3E0', borderRadius: 10, height: 14, overflow: 'hidden' }}>
                    <div style={{ width: `${Math.max(4, (xpInLevel / 300) * 100)}%`, height: '100%', background: 'linear-gradient(90deg,#FFD600,#FF6F00)', borderRadius: 10, transition: 'width 1s ease' }} />
                  </div>
                  {!premium && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, fontSize: 13, fontWeight: 900, color: '#1565C0' }}>
                      ⚡ {t(lang, 'daily_left')}
                      {Array.from({ length: DAILY_FREE_CHAPTERS }, (_, i) => (
                        <span key={i} style={{ width: 16, height: 16, borderRadius: '50%', background: i < DAILY_FREE_CHAPTERS - usedToday ? 'linear-gradient(145deg,#FFD54F,#FF9800)' : '#E3EAF2' }} />
                      ))}
                    </div>
                  )}
                  {!premium && (
                    <div style={{ marginTop: 6, fontSize: 12, fontWeight: 900, color: '#78909C' }}>
                      📖 {t(lang, 'free_total', { n: String(Math.min(FREE_CHAPTERS_TOTAL, freeIds(activeChild).length)), max: String(FREE_CHAPTERS_TOTAL) })}
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>

        <div style={{ marginTop: 4 }}><StoryBanners lang={lang} onOpen={nav.goCountry} /></div>

        {/* Continents */}
        <div className="home-section-title">🧭 {t(lang, 'pick_continent')}</div>
        <div className="continent-grid" style={{ marginBottom: 26 }}>
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

        {/* Pour les parents : déblocage (discret, en bas de page) */}
        {!premium && (
          <button className="btn-kid soft" onClick={nav.openPaywall}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.75)', color: '#1A2A4F', borderRadius: 20, padding: '12px 14px', textAlign: 'left', border: '2px dashed #FFB74D' }}>
            <span style={{ fontSize: 24 }}>👨‍👧</span>
            <span style={{ flex: 1, fontSize: 13, fontWeight: 900 }}>{t(lang, 'pw_banner')}</span>
            <span style={{ background: '#FF7A00', color: 'white', borderRadius: 999, padding: '5px 11px', fontSize: 13, fontWeight: 900, whiteSpace: 'nowrap' }}>{PLANS.month.label} {t(lang, 'per_month')}</span>
          </button>
        )}
      </div>
      <LegalFooter lang={lang} />
    </div>
  )
}

// Le voyage dans le temps de l'enfant : le dernier pays ouvert (ou, a defaut, un pays deja commence)
function pickJourney(progress, difficulty, childId) {
  let last = null
  try { last = localStorage.getItem(`kidroots_last_country:${childId || 'guest'}`) } catch {}
  if (last && COUNTRIES[last]?.chapters?.length) return last
  return Object.keys(COUNTRIES).find((c) => (COUNTRIES[c]?.chapters || []).some((ch) => isDone(progress, ch.id, difficulty))) || null
}

// Premiers pays proposes selon la langue (des histoires refaites, longues et datees)
const FIRST_PICKS = {
  fr: ['FR', 'JP', 'EG', 'BR'], de: ['DE', 'JP', 'EG', 'BR'], en: ['GB', 'JP', 'EG', 'US'],
  pt: ['BR', 'JP', 'EG', 'FR'], ar: ['EG', 'MA', 'JP', 'FR'], bm: ['ML', 'SN', 'JP', 'EG'],
}

function Destination({ lang, nav, progress, difficulty, childId }) {
  const code = pickJourney(progress, difficulty, childId)
  const c = code && COUNTRIES[code]
  // Premier voyage : pas encore de pays choisi
  if (!c) {
    return (
      <div className="dest-card anim-slide-up" style={{ '--c': '#1E88E5', '--bg': '#E3F2FD' }}>
        <div className="dest-window">
          <div className="dest-kicker">⏳ {t(lang, 'trip_kicker')}</div>
          <div className="float dest-flag">🌍</div>
        </div>
        <div className="dest-body">
          <div className="dest-name">{t(lang, 'trip_first')}</div>
          <div className="dest-tag">{t(lang, 'trip_first_sub')}</div>
          {/* Un seul tap : le drapeau ouvre directement la 1re histoire du pays */}
          <div className="first-flags">
            {(FIRST_PICKS[lang] || FIRST_PICKS.fr).filter((k) => COUNTRIES[k]).map((k) => (
              <button key={k} type="button" className="btn-kid soft first-flag" onClick={() => nav.goFirstStory(k)} style={{ '--c': COUNTRIES[k].color }}>
                <span className="first-flag-emoji">{COUNTRIES[k].flag}</span>
                <span className="first-flag-name">{countryName(k, lang)}</span>
                <span className="first-flag-go">▶</span>
              </button>
            ))}
          </div>
          <button type="button" onClick={() => nav.goRegions()}
            style={{ marginTop: 12, background: 'none', border: 'none', color: '#1565C0', fontFamily: 'inherit', fontWeight: 900, fontSize: 15, cursor: 'pointer', textDecoration: 'underline' }}>
            🧭 {t(lang, 'trip_pick')}
          </button>
        </div>
      </div>
    )
  }
  const done = c.chapters.filter((ch) => isDone(progress, ch.id, difficulty)).length
  const finished = done === c.chapters.length
  const next = c.chapters.find((ch) => !isDone(progress, ch.id, difficulty))
  return (
    <div className="dest-card anim-slide-up" style={{ '--c': c.color, '--bg': c.bg || '#FFF3E0' }}>
      <div className="dest-window">
        <div className="dest-kicker">{finished ? '🏆 ' + t(lang, 'trip_done') : '⏳ ' + t(lang, 'trip_kicker')}</div>
        <div className="float dest-flag">{c.flag}</div>
        {c.hero && !finished && (
          <div className="dest-guide">
            <span className="dest-guide-face">{c.hero.emoji}</span>
            <span className="dest-guide-say"><b>{c.hero.name}</b> · {t(lang, done ? 'trip_guide_cont' : 'trip_guide_start')}</span>
          </div>
        )}
      </div>
      <div className="dest-body">
        <div className="dest-name">{countryName(code, lang)}</div>
        {next ? (
          <div className="dest-next">
            <span className="dest-era">{next.era}</span>
            <span><b>{t(lang, 'trip_next')}</b> {next.emoji} <TText text={next.title} lang={lang} /></span>
          </div>
        ) : c.tagline && <div className="dest-tag"><TText text={c.tagline} lang={lang} /></div>}
        <div className="dest-steps">
          {c.chapters.map((ch, i) => <span key={ch.id} className={isDone(progress, ch.id, difficulty) ? 'on' : ''} />)}
          <em>{done} / {c.chapters.length}</em>
        </div>
        <button className="btn-kid soft play-btn shine" onClick={() => (finished ? nav.goRegions() : nav.continueStory(code))}
          style={{ width: '100%', background: 'linear-gradient(180deg,#FFE04D,#FFC400)', color: INK, padding: '17px 20px', fontSize: 21, borderRadius: 24, boxShadow: '0 7px 0 #E6A100, 0 12px 24px rgba(255,196,0,0.4)' }}>
          {finished ? '🧭 ' + t(lang, 'trip_pick_next') : '▶ ' + t(lang, done || nav.hasResume?.(code) ? 'trip_go_cont' : 'trip_go_start')}
        </button>
        {!finished && (
          <button className="btn-kid soft" onClick={() => nav.goRegions()}
            style={{ width: '100%', marginTop: 10, background: 'white', color: '#1565C0', padding: '12px', fontSize: 15, borderRadius: 18, border: '2px solid #BBDEFB' }}>
            🧭 {t(lang, 'dest_other')}
          </button>
        )}
      </div>
    </div>
  )
}

import { t } from '../i18n'
import { gamesLeft } from '../premium'
import ExploreHeader from './ExploreHeader'

const INK = '#1A2A4F'
const GAMES = [
  ['hunt', '🧭', 'hunt_title', 'hunt_desc', ['#4FC3F7', '#1E88E5']],
  ['animals', '🦊', 'ani_title', 'ani_desc', ['#81C784', '#2E9E5B']],
  ['riddles', '🏛️', 'rid_title', 'rid_desc', ['#BA68C8', '#7B1FA2']],
  ['memory', '🧠', 'mem_title', 'mem_desc', ['#FFD54F', '#FF8F00']],
]

// Espace jeux : chasse au trésor, animaux, énigmes, memory (illimités, même en version gratuite)
export default function GamesScreen({ lang, nav, activeChild, premium }) {
  const games = activeChild?.games || {}
  const left = gamesLeft(activeChild, premium)
  return (
    <div className="home-sky screen-mid" style={{ minHeight: '100vh', fontFamily: 'Nunito, sans-serif', paddingBottom: 30 }}>
      <ExploreHeader lang={lang} emoji="🎮" title={t(lang, 'games_title')} sub={t(lang, 'games_sub')} onBack={nav.goHome}
        right={<span style={{ background: 'white', borderRadius: 999, padding: '7px 14px', fontWeight: 900, color: '#FF8F00' }}>{t(lang, 'total_stars', { n: String(games.stars || 0) })}</span>} />
      {left !== Infinity && (
        <div style={{ margin: '4px 16px 0', textAlign: 'center' }}>
          <button className="btn-kid soft" onClick={() => (left > 0 ? null : nav.openPaywall())}
            style={{ background: left > 0 ? 'white' : '#FFF3E0', color: left > 0 ? '#2E7D4F' : '#E65100', borderRadius: 999, padding: '8px 16px', fontSize: 14, fontWeight: 900, cursor: left > 0 ? 'default' : 'pointer' }}>
            {left > 0 ? t(lang, 'games_left', { n: String(left) }) : t(lang, 'games_none')}
          </button>
        </div>
      )}
      <div className="games-grid" style={{ padding: '10px 16px' }}>
        {GAMES.map(([key, emoji, title, desc, grad]) => (
          <button key={key} className="btn-kid lift" onClick={() => nav.openGame(key)}
            style={{ background: `linear-gradient(150deg, ${grad[0]}, ${grad[1]})`, color: 'white', borderRadius: 26, padding: '20px 18px', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 16, boxShadow: `0 7px 0 ${grad[1]}55, 0 12px 24px ${grad[1]}40`, minHeight: 120 }}>
            <span className="float" style={{ fontSize: 54 }}>{emoji}</span>
            <span style={{ flex: 1 }}>
              <span style={{ display: 'block', fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 22, fontWeight: 700 }}>{t(lang, title)}</span>
              <span style={{ display: 'block', fontSize: 14, fontWeight: 800, opacity: 0.95 }}>{t(lang, desc)}</span>
              {key !== 'memory' && games[key] ? <span style={{ display: 'inline-block', marginTop: 6, background: 'rgba(255,255,255,0.25)', borderRadius: 999, padding: '3px 10px', fontSize: 12, fontWeight: 900 }}>⭐ {games[key]}</span> : null}
            </span>
            <span style={{ fontSize: 26 }}>▶</span>
          </button>
        ))}
      </div>
    </div>
  )
}

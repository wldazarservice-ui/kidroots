import { t } from '../i18n'

const TABS = [
  ['home', '🏠', 'nav_home', ['home']],
  ['regions', '🧭', 'nav_explore', ['regions', 'country']],
  ['map', '🗺️', 'home_map', ['map']],
  ['passport', '🛂', 'home_passport', ['passport']],
  ['games', '🎮', 'home_games', ['games']],
]

// Barre de navigation du bas (téléphone et tablette) : gros boutons, toujours au même endroit
export default function BottomNav({ lang, screen, nav }) {
  const go = {
    home: nav.goHome, regions: () => nav.goRegions(), map: nav.openMap, passport: nav.openPassport, games: nav.openGames,
  }
  return (
    <nav className="bottom-nav" aria-label="Navigation">
      {TABS.map(([key, emoji, label, screens]) => {
        const on = screens.includes(screen)
        return (
          <button key={key} type="button" onClick={go[key]} aria-current={on ? 'page' : undefined} className={on ? 'on' : ''}>
            <span className="bn-icon">{emoji}</span>
            <span className="bn-label">{t(lang, label)}</span>
          </button>
        )
      })}
    </nav>
  )
}

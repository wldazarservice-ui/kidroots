// Passeport d'explorateur : tampons (pays terminés) et badges, calculés à partir de la progression.
import { COUNTRIES, REGIONS } from './data/countries'

// Un chapitre compte s'il est terminé à n'importe quel niveau de lecture
const DONE_SUFFIX = ['', '@mini', '@expert']
export const chapterDoneAny = (progress, id) => DONE_SUFFIX.some((s) => progress?.done?.[id + s])

export function countryState(progress, code) {
  const c = COUNTRIES[code]
  if (!c) return { done: 0, total: 0, stamp: false, visited: false }
  const total = c.chapters.length
  const done = c.chapters.filter((ch) => chapterDoneAny(progress, ch.id)).length
  return { done, total, stamp: total > 0 && done === total, visited: done > 0 }
}

export function passportStats(progress, games = {}) {
  const codes = Object.keys(COUNTRIES)
  const states = Object.fromEntries(codes.map((c) => [c, countryState(progress, c)]))
  const stamps = codes.filter((c) => states[c].stamp)
  const visited = codes.filter((c) => states[c].visited)
  const chapters = codes.reduce((a, c) => a + states[c].done, 0)
  const byRegion = Object.fromEntries(Object.entries(REGIONS).map(([k, r]) => [k, r.countries.filter((c) => states[c]?.stamp).length]))
  return { states, stamps, visited, chapters, byRegion, xp: progress?.xp || 0, games }
}

// Badges : [id, emoji, condition]. Les textes sont dans i18n (badge_<id>).
export const BADGES = [
  ['first_step', '👣', (s) => s.chapters >= 1],
  ['first_stamp', '🛂', (s) => s.stamps.length >= 1],
  ['traveler5', '🧳', (s) => s.stamps.length >= 5],
  ['traveler10', '✈️', (s) => s.stamps.length >= 10],
  ['traveler25', '🌍', (s) => s.stamps.length >= 25],
  ['traveler50', '🚀', (s) => s.stamps.length >= 50],
  ['all_continents', '🗺️', (s) => Object.entries(s.byRegion).filter(([k]) => REGIONS[k].countries.length).every(([, n]) => n >= 1)],
  ['africa5', '🦁', (s) => s.byRegion.africa >= 5],
  ['europe5', '🏰', (s) => s.byRegion.europe >= 5],
  ['asia5', '🐼', (s) => s.byRegion.asia >= 5],
  ['americas5', '🦜', (s) => s.byRegion.americas >= 5],
  ['oceania3', '🦘', (s) => (s.byRegion.oceania || 0) >= 3],
  ['xp1000', '⭐', (s) => s.xp >= 1000],
  ['xp5000', '🌟', (s) => s.xp >= 5000],
  ['hunter', '🧭', (s) => (s.games.hunt || 0) >= 20],
  ['zoologist', '🦊', (s) => (s.games.animals || 0) >= 20],
  ['riddler', '🏛️', (s) => (s.games.riddles || 0) >= 20],
  ['memory', '🧠', (s) => (s.games.memory || 0) >= 3],
]

export const earnedBadges = (stats) => BADGES.filter(([, , ok]) => ok(stats)).map(([id]) => id)

// Pays jouables dans les jeux (présents dans l'app ET avec une fiche découverte)
export const shuffle = (arr) => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}

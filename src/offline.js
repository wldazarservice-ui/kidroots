// Mode voyage : telecharge a l'avance des pays (et les jeux) pour jouer sans internet.
// - contenu des pays « monde » et versions longues (expert) : fichiers JS gardes par le service worker
// - traductions (si la langue n'est pas le francais) : cache localStorage du traducteur
// La selection est memorisee ; apres une mise a jour de l'app, elle est retelechargee automatiquement.
import { COUNTRIES, REGIONS } from './data/countries'
import { hasWorld, loadWorld } from './data/world/load'
import { hasExpert, loadExpert } from './data/expert'
import { DISCOVER } from './data/discover'
import { collectStrings, translateMany, isTranslatable } from './translator'

const KEY = 'kidroots_offline'
export const currentBuild = () => document.querySelector('script[type="module"][src*="/assets/"]')?.getAttribute('src') || 'dev'

export function getOffline() {
  try { return JSON.parse(localStorage.getItem(KEY) || 'null') || { codes: [], games: false } } catch { return { codes: [], games: false } }
}
function saveOffline(o) { try { localStorage.setItem(KEY, JSON.stringify(o)) } catch { /* plein ou indisponible */ } }

// Contenu (objets) d'un pays, deja present ou charge a la demande
async function countryContent(code) {
  const parts = [COUNTRIES[code]]
  if (hasWorld(code)) parts.push(await loadWorld(code))
  if (hasExpert(code)) parts.push(await loadExpert(code))
  return parts
}

// Telecharge les pays choisis (+ les jeux). onProgress({ done, total, label })
export async function downloadForTrip({ codes, games, lang, onProgress }) {
  const steps = codes.length + (games ? 1 : 0)
  let step = 0
  const tick = (label) => onProgress?.({ done: step, total: steps, label })
  const translate = isTranslatable(lang)
  for (const code of codes) {
    tick(code)
    const parts = await countryContent(code)
    if (translate) await translateMany(collectStrings(parts), lang)
    step++
  }
  if (games) {
    tick('games')
    await import('./data/worldmap.gen.js') // carte du monde (chasse au tresor, carte)
    if (translate) {
      const strings = collectStrings([Object.values(DISCOVER), Object.values(REGIONS).map((r) => r.name)])
      await translateMany(strings, lang)
    }
    step++
  }
  tick('done')
  const prev = getOffline()
  saveOffline({
    codes: [...new Set([...(prev.lang === lang ? prev.codes : []), ...codes])],
    games: games || (prev.lang === lang && prev.games),
    lang, build: currentBuild(), at: new Date().toISOString(),
  })
}

// Au demarrage (en ligne) : si l'app a ete mise a jour, on retelecharge la selection en arriere-plan
export function refreshOfflineIfNeeded(lang) {
  const o = getOffline()
  if (!navigator.onLine || !(o.codes?.length || o.games)) return
  if (o.build === currentBuild() && o.lang === lang) return
  downloadForTrip({ codes: o.codes, games: o.games, lang }).catch(() => {})
}

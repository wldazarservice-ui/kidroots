// Nom d'un pays dans la langue choisie (noms officiels fournis par le navigateur), sinon nom français de l'app
import { COUNTRIES } from './data/countries'

const cache = {}
export function countryName(code, lang = 'fr') {
  try {
    cache[lang] ||= new Intl.DisplayNames([lang], { type: 'region' })
    const n = cache[lang].of(code)
    if (n && n !== code) return n
  } catch {}
  return COUNTRIES[code]?.name || code
}

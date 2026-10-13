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

// Nom du pays avec son article, pour les phrases (« Trouve le Nigeria », « Finde die Schweiz », « Find the Netherlands »)
const FR_NONE = new Set(['AG', 'BH', 'CU', 'CY', 'DJ', 'HT', 'IL', 'KI', 'KN', 'LC', 'MC', 'MG', 'MT', 'MU', 'NR', 'OM', 'SG', 'SM', 'ST', 'TT', 'TV', 'VC'])
const FR_PLURAL = new Set(['AE', 'BS', 'KM', 'MV', 'NL', 'PH', 'SC', 'US', 'MH', 'SB', 'FJ', 'PW', 'TO', 'WS', 'PS'])
const FR_MASC = new Set(['KH', 'MX', 'MZ', 'ZW', 'BZ', 'SR', 'SS', 'TL', 'GB', 'CD', 'CG', 'CV', 'BF', 'CR', 'LK', 'MM', 'SV'])
const FR_FEM = new Set(['CI', 'CF', 'DO', 'GQ', 'GW', 'KP', 'KR', 'MK', 'NZ', 'PG', 'BA', 'SL'])
const FR_ASPIRATED = new Set(['HN', 'HU']) // h aspire : le Honduras, la Hongrie
const DE_DIE = new Set(['CH', 'TR', 'MN', 'SK', 'UA', 'CI', 'CF', 'DO', 'MD', 'NL', 'PH', 'MV', 'SC', 'KM', 'BS', 'MH', 'SB', 'VA'])
const DE_DEN = new Set(['IQ', 'IR', 'YE', 'LB', 'SD', 'SS', 'TD', 'NE', 'SN', 'CD', 'CG'])
const DE_FULL = { US: 'die Vereinigten Staaten', AE: 'die Vereinigten Arabischen Emirate', GB: 'das Vereinigte Königreich', PS: 'die Palästinensischen Autonomiegebiete' }
const EN_THE = new Set(['US', 'GB', 'AE', 'NL', 'PH', 'BS', 'MV', 'SC', 'KM', 'MH', 'SB', 'CF', 'DO', 'GM'])

export function countryWithArticle(code, lang = 'fr') {
  const name = countryName(code, lang)
  if (lang === 'fr') {
    if (FR_NONE.has(code)) return name
    if (FR_PLURAL.has(code)) return `les ${name}`
    if (!FR_ASPIRATED.has(code) && /^[AEIOUÉÈÊÎÏÔŒ]/i.test(name)) return `l’${name}`
    if (FR_FEM.has(code)) return `la ${name}`
    if (FR_MASC.has(code)) return `le ${name}`
    return /e$/.test(name) ? `la ${name}` : `le ${name}`
  }
  if (lang === 'de') {
    if (DE_FULL[code]) return DE_FULL[code]
    if (DE_DIE.has(code)) return `die ${name}`
    if (DE_DEN.has(code)) return `den ${name}`
    return name
  }
  if (lang === 'en' && EN_THE.has(code)) return `the ${name}`
  return name
}

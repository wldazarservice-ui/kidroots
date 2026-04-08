// Traduction runtime via l'API gratuite MyMemory + cache localStorage permanent.
// Source : francais. Bambara (bm) non supporte → fallback francais.

const CACHE_KEY = 'kidroots_tr_cache_v1'
const SRC_LANG = 'fr'
const UNSUPPORTED = new Set(['bm'])

let cache = null
function loadCache() {
  if (cache) return cache
  try { cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}') } catch { cache = {} }
  return cache
}

let saveTimer = null
function scheduleSave() {
  clearTimeout(saveTimer)
  saveTimer = setTimeout(() => {
    try { localStorage.setItem(CACHE_KEY, JSON.stringify(cache)) } catch {}
  }, 400)
}

const inflight = new Map()

export function isTranslatable(lang) {
  return lang && lang !== SRC_LANG && !UNSUPPORTED.has(lang)
}

// Decode HTML entities returned par MyMemory
function decode(s) {
  if (!s || typeof s !== 'string') return s
  return s
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}

export async function translateString(text, dst) {
  if (!text || typeof text !== 'string') return text
  if (!isTranslatable(dst)) return text
  loadCache()
  const key = `${dst}|${text}`
  if (cache[key]) return cache[key]
  if (inflight.has(key)) return inflight.get(key)

  const promise = (async () => {
    try {
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${SRC_LANG}|${dst}`
      const res = await fetch(url)
      const json = await res.json()
      const out = decode(json?.responseData?.translatedText) || text
      // Eviter de cacher les erreurs de quota
      if (out && !/MYMEMORY WARNING/i.test(out) && !/QUERY LENGTH LIMIT/i.test(out)) {
        cache[key] = out
        scheduleSave()
      }
      return out || text
    } catch {
      return text
    } finally {
      inflight.delete(key)
    }
  })()
  inflight.set(key, promise)
  return promise
}

// Cles a NE PAS traduire (codes, couleurs, ids, emojis)
const SKIP_KEYS = new Set([
  'emoji', 'flag', 'color', 'dark', 'light', 'bg',
  'id', 'region', 'age',
])

export async function translateObject(value, dst) {
  if (!isTranslatable(dst)) return value
  if (value == null) return value
  if (typeof value === 'string') return translateString(value, dst)
  if (typeof value === 'number' || typeof value === 'boolean') return value
  if (Array.isArray(value)) return Promise.all(value.map(v => translateObject(v, dst)))
  if (typeof value === 'object') {
    const keys = Object.keys(value)
    const out = {}
    await Promise.all(keys.map(async k => {
      out[k] = SKIP_KEYS.has(k) ? value[k] : await translateObject(value[k], dst)
    }))
    return out
  }
  return value
}

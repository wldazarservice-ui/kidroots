// Traduction runtime via l'API gratuite MyMemory + cache localStorage permanent.
// Source : francais. Bambara (bm) non supporte → fallback francais.

const CACHE_KEY = 'kidroots_tr_cache_v2'
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

// Endpoint gratuit non officiel de Google Translate (gtx) — pas de cle, pas de quota pratique.
// Reponse : [[["Hello","Bonjour",null,null,1], ...], ...]
async function fetchGoogle(text, dst) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${SRC_LANG}&tl=${dst}&dt=t&q=${encodeURIComponent(text)}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('http ' + res.status)
  const data = await res.json()
  const segments = Array.isArray(data?.[0]) ? data[0] : []
  const out = segments.map((s) => (Array.isArray(s) ? s[0] : '')).join('')
  return out || ''
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
      const raw = await fetchGoogle(text, dst)
      const out = decode(raw)
      if (!out) return text
      cache[key] = out
      scheduleSave()
      return out
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

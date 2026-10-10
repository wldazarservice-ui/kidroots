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

// Toutes les chaines traduisibles d'un objet (memes regles que translateObject)
export function collectStrings(value, out = new Set()) {
  if (typeof value === 'string') { if (value.trim()) out.add(value) }
  else if (Array.isArray(value)) value.forEach((v) => collectStrings(v, out))
  else if (value && typeof value === 'object') for (const [k, v] of Object.entries(value)) if (!SKIP_KEYS.has(k)) collectStrings(v, out)
  return out
}

// Traduit beaucoup de chaines a l'avance (mode voyage). Les phrases sont envoyees par paquets
// (separees par des retours a la ligne) pour aller vite ; si un paquet revient mal decoupe,
// on retraduit ses phrases une par une.
export async function translateMany(strings, dst, onEach) {
  if (!isTranslatable(dst)) return
  loadCache()
  const todo = [...strings].filter((s) => !cache[`${dst}|${s}`])
  const single = todo.filter((s) => s.includes('\n'))
  const batches = []
  let cur = [], len = 0
  for (const s of todo.filter((x) => !x.includes('\n'))) {
    if (cur.length && len + s.length > 1000) { batches.push(cur); cur = []; len = 0 }
    cur.push(s); len += s.length + 1
  }
  if (cur.length) batches.push(cur)

  let i = 0
  const worker = async () => {
    while (i < batches.length) {
      const batch = batches[i++]
      let lines = null
      try {
        const raw = decode(await fetchGoogle(batch.join('\n'), dst))
        lines = raw.split('\n').map((l) => l.trim())
      } catch { lines = null }
      if (lines && lines.length === batch.length && lines.every(Boolean)) {
        batch.forEach((s, k) => { cache[`${dst}|${s}`] = lines[k] })
      } else {
        for (const s of batch) await translateString(s, dst)
      }
      onEach?.(batch.length)
    }
  }
  await Promise.all(Array.from({ length: 3 }, worker))
  for (const s of single) await translateString(s, dst)
  try { localStorage.setItem(CACHE_KEY, JSON.stringify(cache)) } catch {}
}

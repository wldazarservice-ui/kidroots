// KidRoots — Voix off (Text-To-Speech via Web Speech API)
// Lecture a voix haute des cartes et textes pour les enfants de 4-7 ans.

// Mapping langues KidRoots → codes BCP-47 utilises par les voix navigateurs
const LANG_MAP = {
  fr: ['fr-FR', 'fr-CA', 'fr'],
  en: ['en-GB', 'en-US', 'en'],
  de: ['de-DE', 'de-AT', 'de'],
  bm: ['fr-FR', 'fr'], // bambara : pas de voix native, fallback francais
  ar: ['ar-SA', 'ar-EG', 'ar'],
  pt: ['pt-BR', 'pt-PT', 'pt'],
}

let cachedVoices = null
const loadVoices = () => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return []
  if (cachedVoices && cachedVoices.length) return cachedVoices
  cachedVoices = window.speechSynthesis.getVoices() || []
  return cachedVoices
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  // Les voix sont chargees de maniere asynchrone sur Chrome/Safari
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoices = window.speechSynthesis.getVoices() || []
  }
}

const pickVoice = (lang) => {
  const voices = loadVoices()
  if (!voices.length) return null
  const candidates = LANG_MAP[lang] || ['en-US']
  for (const code of candidates) {
    // Voix enfant / feminine de preference
    const child = voices.find(v => v.lang?.toLowerCase().startsWith(code.toLowerCase()) && /child|kid|enfant|junior/i.test(v.name))
    if (child) return child
    const female = voices.find(v => v.lang?.toLowerCase().startsWith(code.toLowerCase()) && /female|femme|woman|amelie|marie|anna|sophie|google/i.test(v.name))
    if (female) return female
    const any = voices.find(v => v.lang?.toLowerCase().startsWith(code.toLowerCase()))
    if (any) return any
  }
  return voices[0] || null
}

export const ttsAvailable = () => typeof window !== 'undefined' && 'speechSynthesis' in window

export const ttsStop = () => {
  if (!ttsAvailable()) return
  try { window.speechSynthesis.cancel() } catch {}
}

// Lit un texte. opts: { lang, rate, pitch, onEnd, onStart, onError }
export const ttsSpeak = (text, opts = {}) => {
  if (!ttsAvailable() || !text) return null
  const synth = window.speechSynthesis
  // Stop toute lecture en cours
  try { synth.cancel() } catch {}

  const u = new SpeechSynthesisUtterance(String(text))
  const voice = pickVoice(opts.lang || 'fr')
  if (voice) {
    u.voice = voice
    u.lang = voice.lang
  } else {
    u.lang = (LANG_MAP[opts.lang || 'fr'] || ['fr-FR'])[0]
  }
  // Voix douce et lente, adaptee aux jeunes enfants
  u.rate = opts.rate ?? 0.9
  u.pitch = opts.pitch ?? 1.15
  u.volume = opts.volume ?? 1
  if (opts.onStart) u.onstart = opts.onStart
  if (opts.onEnd) u.onend = opts.onEnd
  if (opts.onError) u.onerror = opts.onError

  // Astuce Chrome : relancer si suspendu
  try { synth.resume() } catch {}
  synth.speak(u)
  return u
}

// Preference utilisateur : voix off activee ou non (par defaut : oui)
const TTS_KEY = 'kidroots_tts_enabled'
export const getTTSEnabled = () => {
  try {
    const v = localStorage.getItem(TTS_KEY)
    return v === null ? true : v === '1'
  } catch { return true }
}
export const setTTSEnabled = (on) => {
  try { localStorage.setItem(TTS_KEY, on ? '1' : '0') } catch {}
  if (!on) ttsStop()
}

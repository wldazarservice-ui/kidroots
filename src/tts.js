// Mokalibo — Voix off (Text-To-Speech via Web Speech API)
// Lecture a voix haute des cartes et textes pour les enfants de 4-7 ans.

// Mapping langues Mokalibo → codes BCP-47 utilises par les voix navigateurs
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

// Note de qualite d'une voix : les voix « naturelles » / neuronales sonnent bien plus humain
// (Edge : « Microsoft Denise Online (Natural) », iPhone : voix « Premium » ou « Améliorée », Chrome : voix « Google »)
const voiceScore = (v) => {
  const n = v.name || ''
  let s = 0
  if (/natural|neural|online/i.test(n)) s += 50
  if (/premium|enhanced|améliorée|amelioree|verbessert|siri/i.test(n)) s += 40
  if (/google/i.test(n)) s += 25
  if (!v.localService) s += 5
  if (/compact|espeak|robot|novelty|bad news|bells|whisper|zarvox|trinoids|albert|jester|organ|bubbles|cellos|boing|eddy|flo |flo$|grandma|grandpa|reed|rocko|sandy|shelley/i.test(n)) s -= 100
  if (/female|femme|woman|denise|amelie|amélie|marie|audrey|katja|seraphina|vicki|sonia|libby|jenny|aria|francisca|thalita|zariyah|salma|hoda/i.test(n)) s += 3
  return s
}

const pickVoice = (lang) => {
  const voices = loadVoices()
  if (!voices.length) return null
  const candidates = LANG_MAP[lang] || ['en-US']
  for (const code of candidates) {
    const ok = voices.filter(v => v.lang?.toLowerCase().replace('_', '-').startsWith(code.toLowerCase()))
    if (ok.length) return ok.sort((a, b) => voiceScore(b) - voiceScore(a))[0]
  }
  return voices[0] || null
}

// Decoupe le texte en phrases : les longues lectures ne se coupent plus (bug de Chrome apres ~15 s)
// et les petites pauses entre les phrases rendent la lecture plus naturelle
const splitSentences = (text) => String(text).replace(/\s+/g, ' ').match(/[^.!?…]+[.!?…»"]*\s*/g)?.map(t => t.trim()).filter(Boolean) || [String(text)]

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

  const voice = pickVoice(opts.lang || 'fr')
  const parts = splitSentences(text)
  let last = null
  parts.forEach((part, i) => {
    const u = new SpeechSynthesisUtterance(part)
    if (voice) { u.voice = voice; u.lang = voice.lang } else u.lang = (LANG_MAP[opts.lang || 'fr'] || ['fr-FR'])[0]
    // Voix posee, a hauteur naturelle (une voix trop aigue sonne robotique)
    u.rate = opts.rate ?? 0.92
    u.pitch = opts.pitch ?? 1
    u.volume = opts.volume ?? 1
    if (i === 0 && opts.onStart) u.onstart = opts.onStart
    if (opts.onError) u.onerror = opts.onError
    if (i === parts.length - 1 && opts.onEnd) u.onend = opts.onEnd
    synth.speak(u)
    last = u
  })
  // Astuce Chrome : relancer si suspendu
  try { synth.resume() } catch {}
  return last
}

// Preference : lecture AUTOMATIQUE des textes (par defaut : non). Le bouton 🔊 lit toujours a la demande.
// Nouvelle cle (l'ancienne 'kidroots_tts_enabled' etait activee par defaut) : tout le monde repart sur « non ».
const TTS_KEY = 'kidroots_autoread'
export const getTTSEnabled = () => {
  try { return localStorage.getItem(TTS_KEY) === '1' } catch { return false }
}
export const setTTSEnabled = (on) => {
  try { localStorage.setItem(TTS_KEY, on ? '1' : '0') } catch {}
  if (!on) ttsStop()
  window.dispatchEvent(new CustomEvent('mokalibo:autoread', { detail: on }))
}

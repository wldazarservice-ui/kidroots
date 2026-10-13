// Musique de fond de l'app (theme Mokalibo en version douce, boucle de 58 s).
// Activee par defaut, coupable dans « Mon compte » et avec le bouton 🎵 de l'accueil (memorise sur l'appareil).
// Les navigateurs interdisent le son avant un geste : elle demarre au premier toucher dans l'app.
// Elle se fait toute petite pendant la lecture a voix haute, et se met en pause quand l'app passe en arriere-plan.
const KEY = 'kidroots_music'
const SRC = '/audio/mokalibo_theme.mp3'
const LOOP = 57.6
const VOL = 0.16, VOL_DUCK = 0.035

let ctx, gain, source, buffer, loading, started = false, wanted = false
const subs = new Set()

export const isMusicOn = () => { try { return localStorage.getItem(KEY) !== 'off' } catch { return true } }
export const onMusicChange = (fn) => { subs.add(fn); return () => subs.delete(fn) }

async function load() {
  if (buffer) return buffer
  loading ||= (async () => {
    ctx ||= new (window.AudioContext || window.webkitAudioContext)()
    const res = await fetch(SRC)
    buffer = await ctx.decodeAudioData(await res.arrayBuffer())
    return buffer
  })()
  return loading
}

async function start() {
  if (started || !isMusicOn() || !wanted) return
  started = true
  try {
    await load()
    if (ctx.state === 'suspended') await ctx.resume()
    gain = ctx.createGain(); gain.gain.value = 0; gain.connect(ctx.destination)
    source = ctx.createBufferSource(); source.buffer = buffer; source.loop = true
    source.loopStart = 0; source.loopEnd = Math.min(LOOP, buffer.duration)
    source.connect(gain); source.start()
    fadeTo(VOL, 2.5)
  } catch { started = false }
}

function stop() {
  if (!started) return
  started = false
  const s = source, g = gain
  try { g.gain.cancelScheduledValues(ctx.currentTime); g.gain.setTargetAtTime(0, ctx.currentTime, 0.25) } catch {}
  setTimeout(() => { try { s.stop() } catch {} }, 1200)
}

function fadeTo(v, sec = 0.6) {
  if (!gain || !ctx) return
  try { gain.gain.cancelScheduledValues(ctx.currentTime); gain.gain.setTargetAtTime(v, ctx.currentTime, sec / 3) } catch {}
}

export function setMusicOn(on) {
  try { localStorage.setItem(KEY, on ? 'on' : 'off') } catch {}
  if (on) start(); else stop()
  subs.forEach((fn) => fn(on))
}

// L'app (pas la page de presentation) demande la musique ; elle part au premier geste de l'enfant
export function wantMusic(on) {
  wanted = on
  if (!on) stop()
}

if (typeof window !== 'undefined') {
  const kick = () => { if (wanted && isMusicOn()) start() }
  window.addEventListener('pointerdown', kick, { passive: true })
  window.addEventListener('keydown', kick)
  document.addEventListener('visibilitychange', () => {
    if (!ctx) return
    if (document.hidden) ctx.suspend().catch(() => {}); else if (started) ctx.resume().catch(() => {})
  })
  // Voix off : la musique se baisse pendant la lecture a voix haute
  let ducked = false
  setInterval(() => {
    if (!started || !('speechSynthesis' in window)) return
    const speaking = window.speechSynthesis.speaking
    if (speaking !== ducked) { ducked = speaking; fadeTo(speaking ? VOL_DUCK : VOL, speaking ? 0.3 : 1.2) }
  }, 300)
}

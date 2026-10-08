// Mode essai sans compte : un profil enfant local (le Mali est jouable en entier).
// La progression est aussi ecrite dans l'ancienne cle 'kidroots_v3_progress' : a la creation
// du compte parent, elle est automatiquement transferee sur le 1er profil enfant.
const GUEST_KEY = 'kidroots_guest'
const LEGACY_PROGRESS_KEY = 'kidroots_v3_progress'

export function loadGuest() {
  try {
    const g = JSON.parse(localStorage.getItem(GUEST_KEY) || 'null')
    return g && g.name ? { ...g, id: 'guest' } : null
  } catch {
    return null
  }
}

export function saveGuest(g) {
  try {
    const { id, ...data } = g
    localStorage.setItem(GUEST_KEY, JSON.stringify(data))
    if (data.xp || Object.keys(data.done || {}).length) {
      localStorage.setItem(LEGACY_PROGRESS_KEY, JSON.stringify({ xp: data.xp || 0, level: data.level || 1, done: data.done || {} }))
    }
  } catch {}
}

export function clearGuest() {
  try { localStorage.removeItem(GUEST_KEY) } catch {}
}

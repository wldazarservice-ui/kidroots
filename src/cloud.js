import { LIMITS, slots } from './limits'
// Helpers Firestore : profil parent + profils enfants + progression
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  getDocs,
  serverTimestamp,
  deleteDoc,
} from 'firebase/firestore'
import { db } from './firebase'

const LEGACY_PROGRESS_KEY = 'kidroots_v3_progress'

// Cree le doc utilisateur s'il n'existe pas (1re connexion)
export async function ensureUserDoc(user) {
  const ref = doc(db, 'users', user.uid)
  const snap = await getDoc(ref)
  if (!snap.exists()) {
    await setDoc(ref, {
      email: user.email || '',
      displayName: user.displayName || '',
      createdAt: serverTimestamp(),
      activeChildId: null,
    })
    return { activeChildId: null, isNew: true }
  }
  // Garde l'e-mail à jour si le parent l'a changé dans « Mon compte »
  if (user.email && snap.data().email !== user.email) {
    updateDoc(ref, { email: user.email }).catch(() => {}) // sans attendre (hors-ligne : synchronise plus tard)
  }
  return snap.data()
}

export async function listChildren(uid) {
  const snap = await getDocs(collection(db, 'users', uid, 'children'))
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0))
}

// Profils enfants : chaque enfant occupe un emplacement c1..cN, N = limite du compte
// (5 en famille, 35 enseignant, 300 ecole ; les regles Firestore refusent tout autre identifiant).
export async function createChild(uid, data, takenIds = []) {
  const slot = slots('c', LIMITS.children).find((id) => !takenIds.includes(id))
  if (!slot || takenIds.length >= LIMITS.children) throw new Error('child-limit')
  const docRef = doc(db, 'users', uid, 'children', slot)
  await setDoc(docRef, {
    name: data.name || 'Enfant',
    age: data.age || 5,
    avatar: data.avatar || '👦',
    lang: data.lang || 'fr',
    difficulty: data.difficulty || null,
    xp: data.xp || 0,
    level: data.level || 1,
    done: data.done || {},
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return slot
}

export async function setActiveChild(uid, childId) {
  await updateDoc(doc(db, 'users', uid), { activeChildId: childId })
}

export async function loadChild(uid, childId) {
  const snap = await getDoc(doc(db, 'users', uid, 'children', childId))
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

export async function saveChildProgress(uid, childId, progress) {
  await updateDoc(doc(db, 'users', uid, 'children', childId), {
    xp: progress.xp,
    level: progress.level,
    done: progress.done,
    updatedAt: serverTimestamp(),
  })
}

export async function saveChildDifficulty(uid, childId, difficulty) {
  await updateDoc(doc(db, 'users', uid, 'children', childId), {
    difficulty,
    updatedAt: serverTimestamp(),
  })
}

// Limite gratuite : chapitres commences aujourd'hui
export async function saveChildDaily(uid, childId, daily) {
  await updateDoc(doc(db, 'users', uid, 'children', childId), { daily })
}

// Remise à zéro de la progression d'un enfant (histoires, XP, passeport, jeux). Les statistiques de temps sont gardées.
export async function resetChildProgress(uid, childId) {
  await updateDoc(doc(db, 'users', uid, 'children', childId), {
    xp: 0, level: 1, done: {}, games: {}, daily: { date: '', ids: [] }, updatedAt: serverTimestamp(),
  })
}

// Limite de temps d'écran quotidienne (minutes, 0 = pas de limite), réglée par les parents
export async function saveChildScreenLimit(uid, childId, minutes) {
  await updateDoc(doc(db, 'users', uid, 'children', childId), { screenLimit: minutes })
}

// Scores des jeux (étoiles par jeu) : { hunt, animals, riddles, memory }
export async function saveChildGameDaily(uid, childId, gameDaily) {
  await updateDoc(doc(db, 'users', uid, 'children', childId), { gameDaily })
}

export async function saveChildGames(uid, childId, games) {
  await updateDoc(doc(db, 'users', uid, 'children', childId), { games })
}

export async function saveChildLang(uid, childId, lang) {
  await updateDoc(doc(db, 'users', uid, 'children', childId), {
    lang,
    updatedAt: serverTimestamp(),
  })
}

// Lit la progression existante en localStorage (ancien systeme).
export function readLegacyProgress() {
  try {
    const d = localStorage.getItem(LEGACY_PROGRESS_KEY)
    if (!d) return null
    const p = JSON.parse(d)
    if (!p || (p.xp === 0 && Object.keys(p.done || {}).length === 0)) return null
    return p
  } catch {
    return null
  }
}

export function clearLegacyProgress() {
  try {
    localStorage.removeItem(LEGACY_PROGRESS_KEY)
  } catch {}
}

// Modifier un profil enfant (prénom, âge, avatar)
export async function updateChildProfile(uid, childId, data) {
  const clean = {}
  if (data.name != null) clean.name = String(data.name).slice(0, 30)
  if (data.age != null) clean.age = Number(data.age)
  if (data.avatar != null) clean.avatar = data.avatar
  await updateDoc(doc(db, 'users', uid, 'children', childId), { ...clean, updatedAt: serverTimestamp() })
}

// Supprimer un profil enfant (sa progression est perdue)
export async function deleteChild(uid, childId) {
  await deleteDoc(doc(db, 'users', uid, 'children', childId))
  const u = await getDoc(doc(db, 'users', uid))
  if (u.exists() && u.data().activeChildId === childId) await updateDoc(doc(db, 'users', uid), { activeChildId: null })
}

// Helpers Firestore : profil parent + profils enfants + progression
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
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
    return { activeChildId: null }
  }
  return snap.data()
}

export async function listChildren(uid) {
  const snap = await getDocs(collection(db, 'users', uid, 'children'))
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0))
}

export async function createChild(uid, data) {
  const docRef = await addDoc(collection(db, 'users', uid, 'children'), {
    name: data.name || 'Enfant',
    age: data.age || 5,
    avatar: data.avatar || '👦',
    lang: data.lang || 'fr',
    xp: data.xp || 0,
    level: data.level || 1,
    done: data.done || {},
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return docRef.id
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

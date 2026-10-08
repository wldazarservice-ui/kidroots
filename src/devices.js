// 5 appareils maximum par compte parent (contre le partage d'identifiants).
// Chaque appareil occupe un emplacement d1..d5 dans users/{uid}/devices (regles Firestore).
import { doc, getDocs, collection, deleteDoc, updateDoc, runTransaction, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase'

export const MAX_DEVICES = 5
const SLOTS = ['d1', 'd2', 'd3', 'd4', 'd5']
const KEY = 'kidino_device_id'

export function getDeviceId() {
  try {
    let id = localStorage.getItem(KEY)
    if (!id) {
      id = (crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`)
      localStorage.setItem(KEY, id)
    }
    return id
  } catch {
    return 'no-storage'
  }
}

// Nom lisible : « iPhone · Safari », « Android · Chrome »…
export function deviceLabel() {
  const ua = navigator.userAgent || ''
  const os = /iPad/.test(ua) ? 'iPad' : /iPhone/.test(ua) ? 'iPhone' : /Android/.test(ua) ? (/Mobile/.test(ua) ? 'Android' : 'Tablette Android')
    : /Macintosh/.test(ua) ? 'Mac' : /Windows/.test(ua) ? 'Windows' : /Linux/.test(ua) ? 'Linux' : 'Appareil'
  const br = /Edg\//.test(ua) ? 'Edge' : /Firefox\//.test(ua) ? 'Firefox' : /Chrome\//.test(ua) ? 'Chrome' : /Safari\//.test(ua) ? 'Safari' : ''
  return br ? `${os} · ${br}` : os
}

export async function listDevices(uid) {
  const snap = await getDocs(collection(db, 'users', uid, 'devices'))
  return snap.docs.map((d) => ({ slot: d.id, ...d.data() })).sort((a, b) => a.slot.localeCompare(b.slot))
}

// Enregistre cet appareil. Retourne { ok: true } ou { ok: false, devices } si les 5 places sont prises.
export async function registerDevice(uid) {
  const deviceId = getDeviceId()
  const result = await runTransaction(db, async (tx) => {
    const refs = SLOTS.map((s) => doc(db, 'users', uid, 'devices', s))
    const snaps = await Promise.all(refs.map((r) => tx.get(r)))
    const mine = snaps.findIndex((sn) => sn.exists() && sn.data().deviceId === deviceId)
    if (mine >= 0) return { ok: true, slot: SLOTS[mine], existing: true }
    const free = snaps.findIndex((sn) => !sn.exists())
    if (free < 0) return { ok: false }
    tx.set(refs[free], { deviceId, name: deviceLabel(), createdAt: serverTimestamp(), lastSeen: serverTimestamp() })
    return { ok: true, slot: SLOTS[free] }
  })
  if (result.ok && result.existing) {
    updateDoc(doc(db, 'users', uid, 'devices', result.slot), { lastSeen: serverTimestamp(), name: deviceLabel() }).catch(() => {})
  }
  if (!result.ok) return { ok: false, devices: await listDevices(uid) }
  return result
}

export async function removeDevice(uid, slot) {
  await deleteDoc(doc(db, 'users', uid, 'devices', slot))
}

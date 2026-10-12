// Appareils par compte (contre le partage d'identifiants) : 5 en famille, 36 pour une classe, 330 pour une ecole.
// Chaque appareil occupe un emplacement d1..dN dans users/{uid}/devices (regles Firestore).
import { doc, getDoc, getDocs, collection, updateDoc, runTransaction, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase'
import { LIMITS, slots } from './limits'

export const maxDevices = () => LIMITS.devices
const KEY = 'kidino_device_id'
const SLOT_KEY = 'kidino_device_slot' // emplacement deja attribue a cet appareil (evite de tout relire)

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

// Enregistre cet appareil. Retourne { ok: true } ou { ok: false, devices } si toutes les places sont prises.
// Lectures minimales (une classe peut avoir des dizaines de tablettes) : l'emplacement connu d'abord,
// puis la liste des appareils, puis une transaction sur un seul emplacement libre.
export async function registerDevice(uid) {
  const deviceId = getDeviceId()
  const touch = (slot) => {
    try { localStorage.setItem(SLOT_KEY, `${uid}:${slot}`) } catch {}
    updateDoc(doc(db, 'users', uid, 'devices', slot), { lastSeen: serverTimestamp(), name: deviceLabel() }).catch(() => {})
    return { ok: true, slot, existing: true }
  }
  let cached = ''
  try { cached = localStorage.getItem(SLOT_KEY) || '' } catch {}
  const [cUid, cSlot] = cached.split(':')
  if (cUid === uid && cSlot) {
    const sn = await getDoc(doc(db, 'users', uid, 'devices', cSlot)).catch(() => null)
    if (sn?.exists() && sn.data().deviceId === deviceId) return touch(cSlot)
  }
  const list = await listDevices(uid)
  const mine = list.find((d) => d.deviceId === deviceId)
  if (mine) return touch(mine.slot)
  const taken = new Set(list.map((d) => d.slot))
  const free = slots('d', LIMITS.devices).filter((s) => !taken.has(s))
  for (const slot of free.slice(0, 3)) {
    const ref = doc(db, 'users', uid, 'devices', slot)
    const ok = await runTransaction(db, async (tx) => {
      if ((await tx.get(ref)).exists()) return false
      tx.set(ref, { deviceId, name: deviceLabel(), createdAt: serverTimestamp(), lastSeen: serverTimestamp() })
      return true
    }).catch(() => false)
    if (ok) {
      try { localStorage.setItem(SLOT_KEY, `${uid}:${slot}`) } catch {}
      return { ok: true, slot }
    }
  }
  return { ok: false, devices: await listDevices(uid) }
}

// Retrait par le serveur : 3 remplacements d'appareil par mois au maximum
export async function removeDevice(user, slot) {
  const res = await fetch('/api/remove-device', {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${await user.getIdToken()}` },
    body: JSON.stringify({ slot }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`)
  return data
}

import { useEffect, useState } from 'react'
import LogoutIcon from './LogoutIcon'
import ParentGate from './ParentGate'
import { listDevices, removeDevice, getDeviceId, maxDevices } from '../devices'
import { signOut } from '../auth'

const INK = '#1A2A4F'

const fmt = (ts) => {
  const d = ts?.toDate?.()
  return d ? d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'
}

// Gestion des appareils du compte (5 max).
// blocked = true : cet appareil n'a pas de place, il faut en retirer un pour continuer.
export default function DevicesManager({ user, blocked = false, onDone, onClose }) {
  const [devices, setDevices] = useState(null)
  const [unlocked, setUnlocked] = useState(false)
  const [busy, setBusy] = useState(null)
  const [error, setError] = useState('')
  const myId = getDeviceId()

  const load = () => listDevices(user.uid).then(setDevices).catch((e) => { console.error(e); setError('Impossible de charger les appareils.') })
  useEffect(() => { load() }, [user.uid])

  const remove = async (slot) => {
    setBusy(slot); setError('')
    try {
      await removeDevice(user.uid, slot)
      if (blocked) { await onDone?.(); return }
      await load()
    } catch (e) {
      console.error(e); setError('La suppression a échoué. Réessaie.')
    } finally {
      setBusy(null)
    }
  }

  const body = (
    <div style={{ fontFamily: 'Nunito, sans-serif', padding: '22px 18px 26px' }}>
      {onClose && (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn-kid" onClick={onClose} aria-label="Fermer"
            style={{ background: 'white', color: '#607D8B', width: 36, height: 36, borderRadius: '50%', fontSize: 16 }}>✕</button>
        </div>
      )}
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <div className="float" style={{ fontSize: 56, lineHeight: 1.1 }}>📱</div>
        <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 26, fontWeight: 700, color: INK, marginTop: 4 }}>
          {blocked ? 'Trop d\'appareils' : 'Mes appareils'}
        </div>
        <div style={{ fontSize: 14, color: '#3E6B4F', fontWeight: 800, marginTop: 4, lineHeight: 1.5 }}>
          {blocked
            ? `Ce compte est déjà utilisé sur ${maxDevices()} appareils. Retire un ancien appareil pour utiliser Mokalibo ici.`
            : `Un compte Mokalibo peut être utilisé sur ${maxDevices()} appareils maximum.`}
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: 22, padding: '8px 14px', marginBottom: 14, boxShadow: '0 6px 18px rgba(46,158,91,0.12)' }}>
        {!devices && <div style={{ padding: 14, textAlign: 'center', color: '#607D8B', fontWeight: 800 }}>…</div>}
        {devices?.length === 0 && <div style={{ padding: 14, textAlign: 'center', color: '#607D8B', fontWeight: 800 }}>Aucun appareil</div>}
        {devices?.map((d, i) => {
          const isMe = d.deviceId === myId
          return (
            <div key={d.slot} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: i < devices.length - 1 ? '2px solid #F1F8F2' : 'none' }}>
              <span style={{ fontSize: 24 }}>{/iPhone|Android(?! ·)|Tablette|iPad/.test(d.name) ? '📱' : '💻'}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 900, color: INK }}>{d.name || 'Appareil'}{isMe && <span style={{ color: '#2E9E5B' }}> · cet appareil</span>}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#78909C' }}>Dernière utilisation : {fmt(d.lastSeen)}</div>
              </div>
              {unlocked && !isMe && (
                <button className="btn-kid" onClick={() => remove(d.slot)} disabled={!!busy}
                  style={{ background: '#FFEBEE', color: '#C62828', padding: '8px 12px', fontSize: 13, borderRadius: 12, opacity: busy && busy !== d.slot ? 0.5 : 1 }}>
                  {busy === d.slot ? '…' : 'Retirer'}
                </button>
              )}
            </div>
          )
        })}
      </div>
      <div style={{ textAlign: 'center', fontSize: 13, fontWeight: 900, color: '#3E6B4F', marginBottom: 14 }}>
        {devices ? `${devices.length} / ${maxDevices()} appareils` : ''}
      </div>

      {!unlocked && devices?.some((d) => d.deviceId !== myId) && (
        <ParentGate title="Réservé aux parents 🔐" onPass={() => setUnlocked(true)} />
      )}
      {error && <div style={{ marginTop: 10, fontSize: 14, fontWeight: 800, color: '#C62828', textAlign: 'center' }}>{error}</div>}

      {blocked && (
        <button className="btn-kid" onClick={() => signOut()}
          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, width: '100%', marginTop: 14, background: 'white', color: '#607D8B', padding: '12px', fontSize: 14, borderRadius: 16 }}>
          <LogoutIcon size={15} /> Se déconnecter
        </button>
      )}
    </div>
  )

  if (!onClose) return <div className="green-bg screen-narrow" style={{ minHeight: '100vh' }}>{body}</div>
  return (
    <div onClick={onClose} className="sheet-backdrop" style={{ position: 'fixed', inset: 0, background: 'rgba(26,42,79,0.5)', zIndex: 600, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div onClick={(e) => e.stopPropagation()} className="anim-slide-up green-bg sheet"
        style={{ width: '100%', maxWidth: 420, maxHeight: '94vh', overflowY: 'auto', borderRadius: '28px 28px 0 0' }}>
        {body}
      </div>
    </div>
  )
}

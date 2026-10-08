import { useState } from 'react'
import ParentGate from './ParentGate'
import { saveChildScreenLimit } from '../cloud'

const INK = '#1A2A4F'
const OPTIONS = [0, 15, 30, 45, 60, 90, 120]

// Réglage parental : temps d'écran maximum par jour pour chaque enfant
export default function ScreenTimeSettings({ user, kids, onClose, onSaved }) {
  const [unlocked, setUnlocked] = useState(false)
  const [busy, setBusy] = useState(null)
  const [values, setValues] = useState(() => Object.fromEntries(kids.map((k) => [k.id, k.screenLimit || 0])))

  const set = async (id, min) => {
    setBusy(id)
    try {
      await saveChildScreenLimit(user.uid, id, min)
      setValues((v) => ({ ...v, [id]: min }))
      onSaved?.(id, min)
    } catch (e) { console.error(e) } finally { setBusy(null) }
  }

  return (
    <div onClick={onClose} className="sheet-backdrop" style={{ position: 'fixed', inset: 0, background: 'rgba(26,42,79,0.5)', zIndex: 600, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div onClick={(e) => e.stopPropagation()} className="anim-slide-up sheet green-bg"
        style={{ width: '100%', maxWidth: 420, maxHeight: '94vh', overflowY: 'auto', borderRadius: '28px 28px 0 0', padding: '22px 18px 26px', fontFamily: 'Nunito, sans-serif' }}>
        <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 24, fontWeight: 700, color: INK }}>⏱️ Temps d'écran</div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#546E7A', lineHeight: 1.5, margin: '4px 0 14px' }}>
          Choisis combien de minutes par jour chaque enfant peut utiliser Mokalibo. Quand le temps est écoulé, l'app propose une pause jusqu'au lendemain.
        </div>
        {!unlocked ? <ParentGate onPass={() => setUnlocked(true)} /> : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {kids.map((k) => (
              <div key={k.id} style={{ background: 'white', borderRadius: 20, padding: '12px 14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <span style={{ fontSize: 28 }}>{k.avatar || '🧒'}</span>
                  <span style={{ flex: 1, fontWeight: 900, color: INK }}>{k.name}</span>
                  {busy === k.id && <span>…</span>}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {OPTIONS.map((m) => {
                    const on = values[k.id] === m
                    return (
                      <button key={m} type="button" onClick={() => set(k.id, m)}
                        style={{ padding: '8px 12px', borderRadius: 999, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 900, fontSize: 13, background: on ? '#2E9E5B' : '#EEF3F8', color: on ? 'white' : INK }}>
                        {m === 0 ? 'Sans limite' : m < 60 ? `${m} min` : `${m / 60} h${m % 60 ? ' 30' : ''}`}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
        <button className="btn-kid" onClick={onClose}
          style={{ width: '100%', marginTop: 14, background: '#ECEFF1', color: '#546E7A', padding: '12px', fontSize: 15, borderRadius: 16 }}>OK</button>
      </div>
    </div>
  )
}

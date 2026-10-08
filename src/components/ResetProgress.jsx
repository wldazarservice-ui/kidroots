import { useState } from 'react'
import ParentGate from './ParentGate'
import { resetChildProgress } from '../cloud'

const INK = '#1A2A4F'

// Réinitialiser la progression d'un ou plusieurs enfants (protégé par le contrôle parental)
export default function ResetProgress({ user, kids, onClose, onDone }) {
  const [step, setStep] = useState('gate')
  const [sel, setSel] = useState(() => kids.map((k) => k.id))
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const toggle = (id) => setSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))
  const confirm = async () => {
    setBusy(true); setError('')
    try {
      for (const id of sel) await resetChildProgress(user.uid, id)
      onDone?.(sel)
      onClose()
    } catch (e) {
      console.error(e); setError('La réinitialisation a échoué. Réessaie.'); setBusy(false)
    }
  }

  return (
    <div onClick={onClose} className="sheet-backdrop" style={{ position: 'fixed', inset: 0, background: 'rgba(26,42,79,0.5)', zIndex: 600, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div onClick={(e) => e.stopPropagation()} className="anim-slide-up sheet"
        style={{ width: '100%', maxWidth: 420, borderRadius: '28px 28px 0 0', padding: '22px 18px 26px', background: 'white', fontFamily: 'Nunito, sans-serif' }}>
        <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 24, fontWeight: 700, color: INK, marginBottom: 6 }}>🔄 Réinitialiser la progression</div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#546E7A', lineHeight: 1.55, marginBottom: 14 }}>
          Les histoires terminées, les XP, les tampons du passeport et les étoiles des jeux repartent à zéro. Les profils, le niveau de lecture et l'abonnement sont conservés.
        </div>
        {step === 'gate' ? (
          <ParentGate onPass={() => setStep('choose')} />
        ) : (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
              {kids.map((k) => (
                <label key={k.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 16, border: `3px solid ${sel.includes(k.id) ? '#FF9800' : '#ECEFF1'}`, cursor: 'pointer' }}>
                  <input type="checkbox" checked={sel.includes(k.id)} onChange={() => toggle(k.id)} style={{ width: 22, height: 22, accentColor: '#FF9800' }} />
                  <span style={{ fontSize: 28 }}>{k.avatar || '🧒'}</span>
                  <span style={{ flex: 1, fontWeight: 900, color: INK }}>{k.name}</span>
                  <span style={{ fontSize: 12, fontWeight: 800, color: '#90A4AE' }}>⭐ {k.xp || 0} XP</span>
                </label>
              ))}
            </div>
            <button className="btn-kid soft" onClick={confirm} disabled={busy || !sel.length}
              style={{ width: '100%', background: '#E65100', color: 'white', padding: '15px', fontSize: 17, borderRadius: 18, opacity: busy || !sel.length ? 0.5 : 1 }}>
              {busy ? '…' : `Remettre à zéro (${sel.length})`}
            </button>
          </>
        )}
        {error && <div style={{ marginTop: 10, color: '#C62828', fontWeight: 800 }}>{error}</div>}
        <button className="btn-kid" onClick={onClose}
          style={{ width: '100%', marginTop: 10, background: '#ECEFF1', color: '#546E7A', padding: '12px', fontSize: 15, borderRadius: 16 }}>Annuler</button>
      </div>
    </div>
  )
}

import { useState } from 'react'
import ParentGate from './ParentGate'
import { deleteAccount } from '../premium'
import { signOut } from '../auth'

const INK = '#1A2A4F'

// Suppression definitive du compte parent (RGPD) : protegee par le controle parental + confirmation
export default function DeleteAccount({ user, premium, onClose }) {
  const [step, setStep] = useState('gate')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const confirm = async () => {
    setBusy(true); setError('')
    try {
      await deleteAccount(user)
      await signOut()
    } catch (e) {
      console.error(e)
      setError('La suppression a échoué. Réessaie ou écris à contact@azarconsulting.eu.')
      setBusy(false)
    }
  }

  return (
    <div onClick={onClose} className="sheet-backdrop" style={{ position: 'fixed', inset: 0, background: 'rgba(26,42,79,0.5)', zIndex: 600, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div onClick={(e) => e.stopPropagation()} className="anim-slide-up sheet"
        style={{ width: '100%', maxWidth: 420, borderRadius: '28px 28px 0 0', padding: '22px 18px 26px', background: 'white', fontFamily: 'Nunito, sans-serif' }}>
        <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 24, fontWeight: 700, color: INK, marginBottom: 6 }}>🗑️ Supprimer mon compte</div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#546E7A', lineHeight: 1.55, marginBottom: 14 }}>
          Tous les profils enfants, leur progression, leurs statistiques et les appareils seront effacés définitivement. Cette action est irréversible.
          {premium && <><br /><br /><strong style={{ color: '#C62828' }}>Si tu as un abonnement, résilie-le d'abord avec « 💳 Mon abonnement »</strong>, sinon il continuera d'être prélevé.</>}
        </div>
        {step === 'gate' ? (
          <ParentGate onPass={() => setStep('confirm')} />
        ) : (
          <button className="btn-kid soft" onClick={confirm} disabled={busy}
            style={{ width: '100%', background: '#C62828', color: 'white', padding: '16px', fontSize: 17, borderRadius: 18, opacity: busy ? 0.6 : 1 }}>
            {busy ? '…' : 'Oui, supprimer définitivement'}
          </button>
        )}
        {error && <div style={{ marginTop: 10, color: '#C62828', fontWeight: 800, fontSize: 14 }}>{error}</div>}
        <button className="btn-kid" onClick={onClose}
          style={{ width: '100%', marginTop: 10, background: '#ECEFF1', color: '#546E7A', padding: '12px', fontSize: 15, borderRadius: 16 }}>Annuler</button>
      </div>
    </div>
  )
}

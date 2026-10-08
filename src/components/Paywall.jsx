import { useState } from 'react'
import { t } from '../i18n'
import { PRICE_LABEL, startCheckout } from '../premium'

const INK = '#1A2A4F'
const rnd = () => 3 + Math.floor(Math.random() * 7) // 3..9

// Ecran de deblocage (2 € a vie). Etape 1 : controle parental. Etape 2 : paiement Stripe.
export default function Paywall({ lang, user, onClose, onAlreadyPremium }) {
  const [gate] = useState(() => ({ a: rnd(), b: rnd() }))
  const [answer, setAnswer] = useState('')
  const [step, setStep] = useState('gate') // 'gate' | 'pay'
  const [gateError, setGateError] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const checkGate = (e) => {
    e.preventDefault()
    if (Number(answer) === gate.a * gate.b) { setStep('pay'); setGateError(false) }
    else { setGateError(true); setAnswer('') }
  }

  const pay = async () => {
    setBusy(true); setError('')
    try {
      const r = await startCheckout(user)
      if (r.alreadyPremium) onAlreadyPremium?.()
    } catch (e) {
      console.error('Checkout error:', e)
      setError(t(lang, 'pw_error'))
      setBusy(false)
    }
  }

  const features = ['pw_f1', 'pw_f2', 'pw_f3', 'pw_f4']
  const icons = ['🌍', '📚', '👨‍👩‍👧‍👦', '🚫']

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(26,42,79,0.5)', zIndex: 600, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div onClick={e => e.stopPropagation()} className="anim-slide-up green-bg"
        style={{ width: '100%', maxWidth: 420, maxHeight: '94vh', overflowY: 'auto', borderRadius: '28px 28px 0 0', padding: '22px 18px 26px', fontFamily: 'Nunito, sans-serif' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn-kid" onClick={onClose} aria-label="Fermer"
            style={{ background: 'white', color: '#607D8B', width: 36, height: 36, borderRadius: '50%', fontSize: 16 }}>✕</button>
        </div>

        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <div className="float" style={{ fontSize: 62, lineHeight: 1.1 }}>🔓</div>
          <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 28, fontWeight: 700, color: INK, marginTop: 4 }}>{t(lang, 'pw_title')}</div>
          <div style={{ fontSize: 15, color: '#3E6B4F', fontWeight: 800, marginTop: 2 }}>{t(lang, 'pw_sub')}</div>
        </div>

        <div style={{ background: 'white', borderRadius: 22, padding: '12px 14px', marginBottom: 14, boxShadow: '0 6px 18px rgba(46,158,91,0.12)' }}>
          {features.map((k, i) => (
            <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: i < features.length - 1 ? '2px solid #F1F8F2' : 'none' }}>
              <span style={{ fontSize: 22, width: 30, textAlign: 'center' }}>{icons[i]}</span>
              <span style={{ fontSize: 15, fontWeight: 800, color: INK }}>{t(lang, k)}</span>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <span style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 40, fontWeight: 700, color: '#FF7A00' }}>{PRICE_LABEL}</span>
          <span style={{ fontSize: 14, fontWeight: 800, color: '#607D8B', marginLeft: 8 }}>{t(lang, 'pw_once')}</span>
        </div>

        {step === 'gate' ? (
          <form onSubmit={checkGate} style={{ background: '#FFF8E1', border: '3px solid #FFE082', borderRadius: 22, padding: 14 }}>
            <div style={{ fontSize: 16, fontWeight: 900, color: '#E65100', marginBottom: 4 }}>{t(lang, 'pw_gate')}</div>
            <label htmlFor="gate" style={{ display: 'block', fontSize: 15, fontWeight: 800, color: '#5D4037', marginBottom: 10 }}>
              {t(lang, 'pw_gate_q', { a: gate.a, b: gate.b })}
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input id="gate" type="number" inputMode="numeric" value={answer} onChange={e => setAnswer(e.target.value)} autoComplete="off"
                style={{ flex: 1, minWidth: 0, padding: '12px 14px', borderRadius: 14, border: '3px solid #FFE082', fontSize: 18, fontWeight: 900, fontFamily: 'inherit', color: INK, outline: 'none' }} />
              <button type="submit" className="btn-kid" disabled={!answer}
                style={{ background: '#FF9800', color: 'white', padding: '0 18px', fontSize: 16, borderRadius: 14, opacity: answer ? 1 : 0.5 }}>
                {t(lang, 'pw_gate_ok')}
              </button>
            </div>
            {gateError && <div style={{ marginTop: 8, fontSize: 13, fontWeight: 800, color: '#C62828' }}>{t(lang, 'pw_gate_err')}</div>}
          </form>
        ) : (
          <>
            <button className="btn-kid" onClick={pay} disabled={busy}
              style={{ width: '100%', background: 'linear-gradient(180deg,#43C27A,#2E9E5B)', color: 'white', padding: '18px', fontSize: 19, borderRadius: 22, boxShadow: '0 6px 0 #1F7A43', opacity: busy ? 0.7 : 1 }}>
              {busy ? t(lang, 'pw_wait') : t(lang, 'pw_pay', { price: PRICE_LABEL })}
            </button>
            {error && <div style={{ marginTop: 10, fontSize: 14, fontWeight: 800, color: '#C62828', textAlign: 'center' }}>{error}</div>}
            <div style={{ marginTop: 10, fontSize: 12, fontWeight: 800, color: '#6B8F77', textAlign: 'center' }}>{t(lang, 'pw_secure')}</div>
          </>
        )}

        <div style={{ marginTop: 14, fontSize: 13, fontWeight: 800, color: '#3E6B4F', textAlign: 'center' }}>🇲🇱 {t(lang, 'pw_free')}</div>
      </div>
    </div>
  )
}

import { t } from '../i18n'
import { PLANS, startCheckout } from '../premium'
import { track, referralCode } from '../track'
import { useEffect, useState } from 'react'
import ParentGate from './ParentGate'

const INK = '#1A2A4F'

// Formule Famille (abonnement mensuel ou annuel). Etape 1 : controle parental. Etape 2 : paiement Stripe.
// Sans compte (mode essai) : on propose de creer le compte parent.
export default function Paywall({ lang, user, onClose, onAlreadyPremium, onNeedAccount, account = {} }) {
  const refGift = !!referralCode() && !(account.refCredits > 0)
  // Essai gratuit de 3 jours : 1re fois seulement, pas cumulable avec le parrainage (verifie aussi cote serveur)
  const trial = !refGift && !(account.refCredits > 0) && (!user || account.trial > 0)
  const [plan, setPlan] = useState('year')
  useEffect(() => { track('paywall_open') }, [])
  const [step, setStep] = useState('gate') // 'gate' | 'pay'
  const [waiver, setWaiver] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const pay = async () => {
    setBusy(true); setError('')
    try {
      const r = await startCheckout(user, { waiver, plan })
      if (r.alreadyPremium) onAlreadyPremium?.()
    } catch (e) {
      console.error('Checkout error:', e)
      setError(t(lang, 'pw_error'))
      setBusy(false)
    }
  }

  const features = ['pw_f1', 'pw_f2', 'pw_f3', 'pw_f4']
  const icons = ['🌍', '📚', '🧒', '🚫']

  return (
    <div onClick={onClose} className="sheet-backdrop" style={{ position: 'fixed', inset: 0, background: 'rgba(26,42,79,0.5)', zIndex: 600, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div onClick={e => e.stopPropagation()} className="anim-slide-up green-bg sheet"
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

        {(refGift || account.refCredits > 0) && (
          <div style={{ background: '#FFF3E0', border: '2px dashed #FFB74D', borderRadius: 16, padding: '10px 12px', marginBottom: 12, textAlign: 'center', fontSize: 14, fontWeight: 900, color: '#E65100' }}>
            {account.refCredits > 0 ? t(lang, 'pw_ref_credit', { n: account.refCredits }) : t(lang, 'pw_ref_gift')}
          </div>
        )}

        {trial && (
          <div style={{ textAlign: 'center', marginBottom: 14 }}>
            <span style={{ display: 'inline-block', background: '#FF7A00', color: 'white', borderRadius: 999, padding: '7px 16px', fontSize: 16, fontWeight: 900, boxShadow: '0 4px 12px rgba(255,122,0,0.3)' }}>{t(lang, 'pw_trial_badge')}</span>
          </div>
        )}

        {/* Choix de la formule */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 8 }}>
          {['year', 'month'].map((k) => {
            const P = PLANS[k]
            const on = plan === k
            return (
              <button key={k} type="button" onClick={() => setPlan(k)} aria-pressed={on}
                style={{ position: 'relative', textAlign: 'center', fontFamily: 'inherit', cursor: 'pointer', background: on ? 'white' : 'rgba(255,255,255,0.6)', border: `3px solid ${on ? '#FF7A00' : '#E3EAF2'}`, borderRadius: 20, padding: '16px 8px 12px', boxShadow: on ? '0 6px 16px rgba(255,122,0,0.22)' : 'none' }}>
                {k === 'year' && <span style={{ position: 'absolute', top: -11, left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', background: '#2E9E5B', color: 'white', fontSize: 11, fontWeight: 900, borderRadius: 999, padding: '3px 10px' }}>{t(lang, 'plan_best')} · {t(lang, 'plan_save', { pct: P.savePct })}</span>}
                <div style={{ fontSize: 14, fontWeight: 900, color: '#607D8B' }}>{t(lang, k === 'year' ? 'plan_year' : 'plan_month')}</div>
                <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 28, fontWeight: 700, color: on ? '#FF7A00' : INK, lineHeight: 1.15 }}>{P.label}</div>
                <div style={{ fontSize: 12, fontWeight: 800, color: '#78909C' }}>{t(lang, k === 'year' ? 'per_year' : 'per_month')}</div>
                {k === 'year' && <div style={{ fontSize: 11, fontWeight: 900, color: '#2E9E5B', marginTop: 2 }}>{t(lang, 'plan_year_note', { pm: P.perMonth })}</div>}
              </button>
            )
          })}
        </div>
        <div style={{ textAlign: 'center', fontSize: 13, fontWeight: 800, color: '#3E6B4F', marginBottom: trial ? 6 : 14 }}>✓ {t(lang, 'pw_once')}</div>
        {trial && <div style={{ textAlign: 'center', fontSize: 13, fontWeight: 800, color: '#37474F', lineHeight: 1.45, marginBottom: 14 }}>{t(lang, 'pw_trial_note', { price: `${PLANS[plan].label} ${t(lang, plan === 'year' ? 'per_year' : 'per_month')}` })}</div>}

        {!user ? (
          <>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#37474F', textAlign: 'center', lineHeight: 1.5, marginBottom: 12 }}>{t(lang, 'pw_need_account')}</div>
            <button className="btn-kid soft" onClick={onNeedAccount}
              style={{ width: '100%', background: 'linear-gradient(180deg,#43C27A,#2E9E5B)', color: 'white', padding: '18px', fontSize: 18, borderRadius: 22, boxShadow: '0 6px 0 #1F7A43' }}>
              {t(lang, 'pw_create_account')}
            </button>
          </>
        ) : step === 'gate' ? (
          <ParentGate onPass={() => setStep('pay')} title={t(lang, 'pw_gate')}
            question={(a, b) => t(lang, 'pw_gate_q', { a, b })} okLabel={t(lang, 'pw_gate_ok')} errorLabel={t(lang, 'pw_gate_err')} />
        ) : (
          <>
            <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', background: 'white', borderRadius: 16, padding: '12px 12px', marginBottom: 12, cursor: 'pointer', border: `3px solid ${waiver ? '#2E9E5B' : '#E3EAF2'}` }}>
              <input type="checkbox" checked={waiver} onChange={(e) => setWaiver(e.target.checked)}
                style={{ width: 22, height: 22, marginTop: 2, accentColor: '#2E9E5B', flexShrink: 0 }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: '#37474F', lineHeight: 1.5 }}>
                {trial && <>{t(lang, 'pw_trial_waiver')}{' '}</>}{t(lang, 'pw_waiver')}{' '}
                <a href="/agb" target="_blank" rel="noopener" style={{ color: '#2E7D4F', fontWeight: 900 }}>{t(lang, 'legal_terms')}</a>
              </span>
            </label>
            <button className="btn-kid" onClick={pay} disabled={busy || !waiver}
              style={{ width: '100%', background: 'linear-gradient(180deg,#43C27A,#2E9E5B)', color: 'white', padding: '18px', fontSize: 19, borderRadius: 22, boxShadow: '0 6px 0 #1F7A43', opacity: busy || !waiver ? 0.55 : 1 }}>
              {busy ? t(lang, 'pw_wait') : trial ? t(lang, 'pw_trial_pay') : t(lang, 'pw_pay', { price: `${PLANS[plan].label} ${t(lang, plan === 'year' ? 'per_year' : 'per_month')}` })}
            </button>
            {error && <div style={{ marginTop: 10, fontSize: 14, fontWeight: 800, color: '#C62828', textAlign: 'center' }}>{error}</div>}
            <div style={{ marginTop: 10, fontSize: 12, fontWeight: 800, color: '#6B8F77', textAlign: 'center' }}>{t(lang, 'pw_secure')}</div>
            <div style={{ marginTop: 6, fontSize: 11, fontWeight: 700, color: '#8DB39A', textAlign: 'center' }}>
              <a href="/agb" target="_blank" rel="noopener" style={{ color: 'inherit' }}>{t(lang, 'legal_terms')}</a>{' · '}
              <a href="/datenschutz" target="_blank" rel="noopener" style={{ color: 'inherit' }}>{t(lang, 'legal_privacy')}</a>{' · '}
              <a href="/impressum" target="_blank" rel="noopener" style={{ color: 'inherit' }}>{t(lang, 'legal_impressum')}</a>{' · '}
              <a href="/kuendigen" target="_blank" rel="noopener" style={{ color: 'inherit' }}>Verträge hier kündigen</a>
            </div>
          </>
        )}

        <div style={{ marginTop: 14, fontSize: 13, fontWeight: 800, color: '#3E6B4F', textAlign: 'center' }}>🎁 {t(lang, 'pw_free')}</div>
        <div style={{ marginTop: 10, fontSize: 13, fontWeight: 800, color: '#D81B60', textAlign: 'center', lineHeight: 1.45 }}>{t(lang, 'pw_mission')}</div>
      </div>
    </div>
  )
}

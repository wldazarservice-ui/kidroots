import LegalFooter from './LegalFooter'
import { useState } from 'react'
import { signIn, signUp, googleSignIn, resetPassword } from '../auth'

export default function AuthScreen({ initialMode = 'signin', onBack }) {
  const [mode, setMode] = useState(initialMode) // 'signin' | 'signup'
  const [info, setInfo] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  // Accord pour le bilan de la semaine et les conseils par e-mail (decoche par defaut, § 7 UWG / RGPD)
  const [optIn, setOptIn] = useState(false)
  const setOpt = (v) => { setOptIn(v); try { sessionStorage.setItem('kidroots_optin', v ? '1' : '0') } catch { /* rien */ } }

  const isSignup = mode === 'signup'

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Email et mot de passe requis.')
      return
    }
    if (password.length < 6) {
      setError('Mot de passe : 6 caractères minimum.')
      return
    }
    setBusy(true)
    try {
      if (isSignup) await signUp(email, password)
      else await signIn(email, password)
    } catch (err) {
      setError(translateError(err.code))
    } finally {
      setBusy(false)
    }
  }

  const forgot = async () => {
    setError(''); setInfo('')
    if (!email) { setError("Écris d'abord ton email ci-dessus."); return }
    try {
      await resetPassword(email)
      setInfo('📧 Un email pour choisir un nouveau mot de passe a été envoyé (pense à vérifier les spams).')
    } catch (err) {
      setError(translateError(err.code))
    }
  }

  const google = async () => {
    setError('')
    setBusy(true)
    try {
      await googleSignIn()
    } catch (err) {
      setError(translateError(err.code))
    } finally {
      setBusy(false)
    }
  }

  const INK = '#1A2A4F'
  const GREEN = '#2E9E5B'
  const input = { width: '100%', padding: '14px 16px', borderRadius: 16, border: '3px solid #D6EEDC', background: '#F7FDF6', color: INK, fontSize: 16, fontFamily: 'inherit', fontWeight: 800, outline: 'none' }

  return (
    <div className="green-bg" style={{ minHeight: '100vh', fontFamily: 'Nunito, sans-serif', padding: '32px 18px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      {onBack && (
        <button className="btn-kid soft" onClick={onBack}
          style={{ position: 'absolute', top: 14, left: 16, background: 'white', color: '#1A2A4F', padding: '8px 14px', fontSize: 14, boxShadow: '0 3px 10px rgba(26,42,79,0.12)' }}>← Mokalibo</button>
      )}
      <div style={{ textAlign: 'center', marginBottom: 22 }}>
        <div style={{ fontSize: 84, lineHeight: 1, marginBottom: 6, filter: 'drop-shadow(0 10px 14px rgba(46,158,91,0.25))' }} className="float">🌍</div>
        <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontWeight: 700, fontSize: 44, lineHeight: 1 }}>
          <span style={{ color: '#FF6F00' }}>Moka</span><span style={{ color: '#1E88E5' }}>libo</span>
        </div>
        <div style={{ fontSize: 15, color: '#3E6B4F', fontWeight: 800, marginTop: 6 }}>
          Découvre l'histoire des pays du monde
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: 28, padding: '22px 18px', width: '100%', maxWidth: 380, boxShadow: '0 12px 30px rgba(46,158,91,0.15)' }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 18, background: '#E8F8EA', borderRadius: 16, padding: 5 }}>
          {[['signin', 'Connexion'], ['signup', 'Inscription']].map(([m, label]) => (
            <button key={m} className="btn-kid" onClick={() => setMode(m)} aria-pressed={mode === m}
              style={{ flex: 1, background: mode === m ? GREEN : 'transparent', color: mode === m ? 'white' : '#3E6B4F', padding: '11px', fontSize: 15, borderRadius: 12, boxShadow: mode === m ? '0 4px 0 #1F7A43' : 'none' }}>
              {label}
            </button>
          ))}
        </div>

        <form onSubmit={submit}>
          <input type="email" placeholder="Email du parent" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email"
            style={{ ...input, marginBottom: 10 }} />
          <input type="password" placeholder="Mot de passe (6 caractères min.)" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={isSignup ? 'new-password' : 'current-password'}
            style={{ ...input, marginBottom: 14 }} />

          {!isSignup && (
            <button type="button" onClick={forgot}
              style={{ background: 'none', border: 'none', padding: 0, margin: '-6px 0 12px', color: '#2E7D4F', fontFamily: 'inherit', fontWeight: 800, fontSize: 13, cursor: 'pointer' }}>
              Mot de passe oublié ?
            </button>
          )}
          {info && (
            <div style={{ background: '#E8F8EA', border: '2px solid #A5D6A7', borderRadius: 14, padding: '10px 14px', marginBottom: 14, color: '#1B5E20', fontSize: 14, fontWeight: 800 }}>{info}</div>
          )}
          {error && (
            <div style={{ background: '#FFEBEE', border: '2px solid #EF9A9A', borderRadius: 14, padding: '10px 14px', marginBottom: 14, color: '#B71C1C', fontSize: 14, fontWeight: 800 }}>
              ⚠️ {error}
            </div>
          )}

          {isSignup && (
            <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 14, cursor: 'pointer', fontSize: 13, fontWeight: 700, color: '#37474F', lineHeight: 1.45 }}>
              <input type="checkbox" checked={optIn} onChange={(e) => setOpt(e.target.checked)} style={{ width: 20, height: 20, marginTop: 1, accentColor: GREEN, flexShrink: 0 }} />
              <span>📧 Je veux recevoir le bilan de la semaine de mes enfants et des conseils par e-mail (désinscription en 1 clic).</span>
            </label>
          )}
          <button type="submit" className="btn-kid" disabled={busy}
            style={{ width: '100%', background: 'linear-gradient(180deg,#43C27A,#2E9E5B)', color: 'white', padding: '16px', fontSize: 18, borderRadius: 20, marginBottom: 12, boxShadow: '0 6px 0 #1F7A43', opacity: busy ? 0.6 : 1 }}>
            {busy ? '...' : isSignup ? '✨ Créer mon compte' : '🚀 Se connecter'}
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '8px 0 14px', color: '#8DB39A', fontSize: 12, fontWeight: 900 }}>
          <div style={{ flex: 1, height: 2, borderRadius: 1, background: '#E8F8EA' }} />
          OU
          <div style={{ flex: 1, height: 2, borderRadius: 1, background: '#E8F8EA' }} />
        </div>

        <button type="button" className="btn-kid" onClick={google} disabled={busy}
          style={{ width: '100%', background: 'white', color: '#3c4043', padding: '14px', fontSize: 15, border: '3px solid #E3EAF2', borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, opacity: busy ? 0.6 : 1 }}>
          <span style={{ fontSize: 18, fontWeight: 900, color: '#4285F4' }}>G</span>
          Continuer avec Google
        </button>

        <div style={{ marginTop: 16, fontSize: 12, color: '#6B8F77', textAlign: 'center', fontWeight: 800, lineHeight: 1.6 }}>
          🔒 Le compte est créé par un parent.<br />
          Aucune publicité. Aucune donnée revendue.
        </div>
      </div>
      <LegalFooter gate={false} />
    </div>
  )
}

function translateError(code) {
  const map = {
    'auth/invalid-email': 'E-mail invalide.',
    'auth/email-already-in-use': 'Cet e-mail a déjà un compte.',
    'auth/weak-password': 'Mot de passe trop court (6 car. min.).',
    'auth/user-not-found': 'Aucun compte avec cet e-mail.',
    'auth/wrong-password': 'Mot de passe incorrect.',
    'auth/invalid-credential': 'E-mail ou mot de passe incorrect.',
    'auth/popup-closed-by-user': 'Connexion annulée.',
    'auth/network-request-failed': 'Pas de connexion internet.',
    'auth/too-many-requests': 'Trop de tentatives. Réessaie plus tard.',
  }
  return map[code] || 'Erreur de connexion.'
}

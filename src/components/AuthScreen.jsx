import { useState } from 'react'
import { signIn, signUp, googleSignIn } from '../auth'

export default function AuthScreen() {
  const [mode, setMode] = useState('signin') // 'signin' | 'signup'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const isSignup = mode === 'signup'

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Email et mot de passe requis.')
      return
    }
    if (password.length < 6) {
      setError('Mot de passe : 6 caracteres minimum.')
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

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg,#0a0e1a 0%,#1a2744 50%,#0d3b6e 100%)', fontFamily: 'Nunito, sans-serif', padding: '32px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ fontSize: 70, marginBottom: 8 }} className="float">🌍</div>
        <div style={{ fontFamily: 'Fredoka One, sans-serif', fontSize: 36, color: '#FFD600' }}>KidRoots</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', fontWeight: 700, marginTop: 4 }}>
          Decouvre l'histoire des pays du monde
        </div>
      </div>

      <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 24, padding: '24px 20px', width: '100%', maxWidth: 360, border: '2px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, background: 'rgba(0,0,0,0.25)', borderRadius: 14, padding: 4 }}>
          <button className="btn-kid" onClick={() => setMode('signin')}
            style={{ flex: 1, background: !isSignup ? '#FFD600' : 'transparent', color: !isSignup ? '#1A237E' : 'white', padding: '10px', fontSize: 14, borderRadius: 11 }}>
            Connexion
          </button>
          <button className="btn-kid" onClick={() => setMode('signup')}
            style={{ flex: 1, background: isSignup ? '#FFD600' : 'transparent', color: isSignup ? '#1A237E' : 'white', padding: '10px', fontSize: 14, borderRadius: 11 }}>
            Inscription
          </button>
        </div>

        <form onSubmit={submit}>
          <input type="email" placeholder="Email du parent" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email"
            style={{ width: '100%', padding: '14px 16px', borderRadius: 14, border: '2px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.25)', color: 'white', fontSize: 15, fontFamily: 'inherit', fontWeight: 700, marginBottom: 10, outline: 'none' }} />
          <input type="password" placeholder="Mot de passe (6 car. min.)" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={isSignup ? 'new-password' : 'current-password'}
            style={{ width: '100%', padding: '14px 16px', borderRadius: 14, border: '2px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.25)', color: 'white', fontSize: 15, fontFamily: 'inherit', fontWeight: 700, marginBottom: 14, outline: 'none' }} />

          {error && (
            <div style={{ background: 'rgba(198,40,40,0.2)', border: '2px solid #C62828', borderRadius: 12, padding: '10px 14px', marginBottom: 14, color: '#FFCDD2', fontSize: 13, fontWeight: 700 }}>
              ⚠️ {error}
            </div>
          )}

          <button type="submit" className="btn-kid" disabled={busy}
            style={{ width: '100%', background: '#FFD600', color: '#1A237E', padding: '16px', fontSize: 17, fontWeight: 900, marginBottom: 12, opacity: busy ? 0.6 : 1 }}>
            {busy ? '...' : isSignup ? "Creer mon compte" : 'Se connecter'}
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '6px 0 14px', color: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 700 }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)' }} />
          OU
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)' }} />
        </div>

        <button type="button" className="btn-kid" onClick={google} disabled={busy}
          style={{ width: '100%', background: 'white', color: '#3c4043', padding: '14px', fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, opacity: busy ? 0.6 : 1 }}>
          <span style={{ fontSize: 20 }}>🇬</span>
          Continuer avec Google
        </button>

        <div style={{ marginTop: 16, fontSize: 11, color: 'rgba(255,255,255,0.4)', textAlign: 'center', fontWeight: 700, lineHeight: 1.5 }}>
          Le compte est cree par un parent.<br />
          Aucune publicite. Aucune donnee revendue.
        </div>
      </div>
    </div>
  )
}

function translateError(code) {
  const map = {
    'auth/invalid-email': 'Email invalide.',
    'auth/email-already-in-use': 'Cet email a deja un compte.',
    'auth/weak-password': 'Mot de passe trop court (6 car. min.).',
    'auth/user-not-found': 'Aucun compte avec cet email.',
    'auth/wrong-password': 'Mot de passe incorrect.',
    'auth/invalid-credential': 'Email ou mot de passe incorrect.',
    'auth/popup-closed-by-user': 'Connexion annulee.',
    'auth/network-request-failed': 'Pas de connexion internet.',
    'auth/too-many-requests': 'Trop de tentatives. Reessaie plus tard.',
  }
  return map[code] || 'Erreur de connexion.'
}

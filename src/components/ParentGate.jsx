import { useEffect, useState } from 'react'

// Une fois le calcul reussi, les autres outils parents ne le redemandent pas pendant 10 minutes
// (sauf `always` : paiement, suppression du compte, deblocage du temps d'ecran).
const PASS_KEY = 'kidroots_parent_pass'
const PASS_MS = 10 * 60 * 1000
const recentlyPassed = () => { try { return Date.now() - Number(sessionStorage.getItem(PASS_KEY) || 0) < PASS_MS } catch { return false } }
const rememberPass = () => { try { sessionStorage.setItem(PASS_KEY, String(Date.now())) } catch {} }

const rnd = () => 3 + Math.floor(Math.random() * 7) // 3..9

// Controle parental : une multiplication a resoudre avant une action reservee aux adultes
export default function ParentGate({ onPass, always = false, title = 'Demande à un parent 🔐', question = (a, b) => `Combien font ${a} × ${b} ?`, okLabel = 'Valider', errorLabel = "Ce n'est pas ça. Demande à un adulte !" }) {
  const [gate, setGate] = useState(() => ({ a: rnd(), b: rnd() }))
  const [answer, setAnswer] = useState('')
  const [error, setError] = useState(false)
  const skip = !always && recentlyPassed()
  useEffect(() => { if (skip) onPass() }, [skip]) // eslint-disable-line react-hooks/exhaustive-deps

  const submit = (e) => {
    e.preventDefault()
    if (Number(answer) === gate.a * gate.b) { setError(false); rememberPass(); onPass() }
    else { setError(true); setAnswer(''); setGate({ a: rnd(), b: rnd() }) }
  }

  if (skip) return null
  return (
    <form onSubmit={submit} style={{ background: '#FFF8E1', border: '3px solid #FFE082', borderRadius: 22, padding: 14 }}>
      <div style={{ fontSize: 16, fontWeight: 900, color: '#E65100', marginBottom: 4 }}>{title}</div>
      <label htmlFor="parent-gate" style={{ display: 'block', fontSize: 15, fontWeight: 800, color: '#5D4037', marginBottom: 10 }}>
        {question(gate.a, gate.b)}
      </label>
      <div style={{ display: 'flex', gap: 8 }}>
        <input id="parent-gate" type="number" inputMode="numeric" value={answer} onChange={(e) => setAnswer(e.target.value)} autoComplete="off"
          style={{ flex: 1, minWidth: 0, padding: '12px 14px', borderRadius: 14, border: '3px solid #FFE082', fontSize: 18, fontWeight: 900, fontFamily: 'inherit', color: '#1A2A4F', outline: 'none' }} />
        <button type="submit" className="btn-kid" disabled={!answer}
          style={{ background: '#FF9800', color: 'white', padding: '0 18px', fontSize: 16, borderRadius: 14, opacity: answer ? 1 : 0.5 }}>
          {okLabel}
        </button>
      </div>
      {error && <div style={{ marginTop: 8, fontSize: 13, fontWeight: 800, color: '#C62828' }}>{errorLabel}</div>}
    </form>
  )
}

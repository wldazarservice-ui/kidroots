import { useState } from 'react'
import { signOut } from '../auth'

const AVATARS = ['👦', '👧', '👦🏻', '👧🏻', '👦🏽', '👧🏽', '👦🏿', '👧🏿', '🧒', '👶']

export default function ChildPickerScreen({ user, kids, onPick, onCreate, hasLegacy, onMigrate }) {
  const [creating, setCreating] = useState(kids.length === 0)
  const [name, setName] = useState('')
  const [age, setAge] = useState(5)
  const [avatar, setAvatar] = useState('👦')
  const [busy, setBusy] = useState(false)

  const submitNew = async (e) => {
    e.preventDefault()
    if (!name.trim()) return
    setBusy(true)
    try {
      await onCreate({ name: name.trim(), age: Number(age), avatar })
      setName('')
      setCreating(false)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg,#0a0e1a 0%,#1a2744 50%,#0d3b6e 100%)', fontFamily: 'Nunito, sans-serif', padding: '24px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
        <div>
          <div style={{ fontFamily: 'Fredoka One, sans-serif', fontSize: 24, color: '#FFD600' }}>KidRoots</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>{user.email || 'Compte parent'}</div>
        </div>
        <button className="btn-kid" onClick={() => signOut()}
          style={{ background: 'rgba(255,255,255,0.1)', color: 'white', padding: '8px 14px', fontSize: 12 }}>
          Deconnexion
        </button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: 22 }}>
        <div style={{ fontSize: 50, marginBottom: 6 }} className="float">👨‍👩‍👧‍👦</div>
        <div style={{ fontFamily: 'Fredoka One, sans-serif', fontSize: 24, color: 'white' }}>
          {kids.length === 0 ? 'Cree un profil' : 'Qui joue ?'}
        </div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 700, marginTop: 4 }}>
          Chaque enfant a sa propre progression.
        </div>
      </div>

      {hasLegacy && kids.length === 0 && (
        <div style={{ background: 'rgba(255,214,0,0.15)', border: '2px solid #FFD600', borderRadius: 16, padding: '14px 16px', marginBottom: 18 }}>
          <div style={{ fontSize: 13, fontWeight: 900, color: '#FFD600', marginBottom: 4 }}>📦 Progression existante detectee</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', fontWeight: 700, lineHeight: 1.5, marginBottom: 10 }}>
            Une partie a deja ete jouee sur cet appareil. Tu peux la transferer sur le 1er profil que tu crees.
          </div>
          <button className="btn-kid" onClick={onMigrate}
            style={{ background: '#FFD600', color: '#1A237E', padding: '10px 16px', fontSize: 13 }}>
            Activer le transfert ⏬
          </button>
        </div>
      )}

      {!creating && (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 18 }}>
            {kids.map((k) => (
              <div key={k.id} onClick={() => onPick(k.id)}
                style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 18, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer', border: '2px solid rgba(255,255,255,0.1)', transition: 'transform 0.15s' }}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}>
                <div style={{ fontSize: 44 }}>{k.avatar || '👦'}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 17, fontWeight: 900, color: 'white' }}>{k.name}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>
                    {k.age} ans · {k.xp || 0} XP · Niv. {k.level || 1}
                  </div>
                </div>
                <div style={{ fontSize: 22, color: '#FFD600' }}>→</div>
              </div>
            ))}
          </div>

          <button className="btn-kid" onClick={() => setCreating(true)}
            style={{ width: '100%', background: '#FFD600', color: '#1A237E', padding: '14px', fontSize: 15 }}>
            ➕ Ajouter un enfant
          </button>
        </>
      )}

      {creating && (
        <form onSubmit={submitNew} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 20, padding: '18px', border: '2px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontSize: 11, fontWeight: 900, color: 'rgba(255,255,255,0.5)', letterSpacing: 1, marginBottom: 8 }}>AVATAR</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
            {AVATARS.map((a) => (
              <button key={a} type="button" onClick={() => setAvatar(a)}
                style={{ fontSize: 28, padding: 6, borderRadius: 12, border: avatar === a ? '3px solid #FFD600' : '3px solid transparent', background: avatar === a ? 'rgba(255,214,0,0.15)' : 'transparent', cursor: 'pointer' }}>
                {a}
              </button>
            ))}
          </div>

          <div style={{ fontSize: 11, fontWeight: 900, color: 'rgba(255,255,255,0.5)', letterSpacing: 1, marginBottom: 6 }}>PRENOM</div>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Lina" maxLength={20}
            style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '2px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.25)', color: 'white', fontSize: 15, fontFamily: 'inherit', fontWeight: 700, marginBottom: 14, outline: 'none' }} />

          <div style={{ fontSize: 11, fontWeight: 900, color: 'rgba(255,255,255,0.5)', letterSpacing: 1, marginBottom: 6 }}>AGE</div>
          <div style={{ display: 'flex', gap: 6, marginBottom: 18 }}>
            {[4, 5, 6, 7, 8, 9, 10].map((a) => (
              <button key={a} type="button" onClick={() => setAge(a)}
                style={{ flex: 1, padding: '10px 0', borderRadius: 12, border: age === a ? '3px solid #FFD600' : '2px solid rgba(255,255,255,0.1)', background: age === a ? 'rgba(255,214,0,0.15)' : 'rgba(0,0,0,0.2)', color: 'white', fontSize: 14, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit' }}>
                {a}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            {kids.length > 0 && (
              <button type="button" className="btn-kid" onClick={() => setCreating(false)}
                style={{ flex: 1, background: 'rgba(255,255,255,0.1)', color: 'white', padding: '14px', fontSize: 14 }}>
                Annuler
              </button>
            )}
            <button type="submit" className="btn-kid" disabled={busy || !name.trim()}
              style={{ flex: 2, background: '#FFD600', color: '#1A237E', padding: '14px', fontSize: 15, opacity: busy || !name.trim() ? 0.5 : 1 }}>
              {busy ? '...' : '✓ Creer le profil'}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

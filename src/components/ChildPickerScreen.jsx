import { useState } from 'react'
import LogoutIcon from './LogoutIcon'
import { signOut } from '../auth'
import { t } from '../i18n'
import { LEVELS, LEVEL_KEYS, defaultLevelForAge, levelAverages } from '../levels'
import { MAX_CHILDREN } from '../cloud'

const AVATARS = ['👦', '👧', '👦🏻', '👧🏻', '👦🏽', '👧🏽', '👦🏿', '👧🏿', '🧒', '👶']
const INK = '#1A2A4F'
const label = { fontSize: 12, fontWeight: 900, color: '#607D8B', letterSpacing: 1, marginBottom: 8, textTransform: 'uppercase' }

export default function ChildPickerScreen({ user, kids, onPick, onCreate, hasLegacy, onMigrate, onManageDevices, onOpenStats, lang = 'fr' }) {
  const full = kids.length >= MAX_CHILDREN
  const [creating, setCreating] = useState(kids.length === 0)
  const [name, setName] = useState('')
  const [age, setAge] = useState(5)
  const [avatar, setAvatar] = useState('👦')
  const [difficulty, setDifficulty] = useState(defaultLevelForAge(5))
  const [levelTouched, setLevelTouched] = useState(false)
  const [busy, setBusy] = useState(false)
  const [createError, setCreateError] = useState('')

  const pickAge = (a) => {
    setAge(a)
    if (!levelTouched) setDifficulty(defaultLevelForAge(a))
  }

  const submitNew = async (e) => {
    e.preventDefault()
    if (!name.trim()) return
    setBusy(true)
    setCreateError('')
    try {
      await onCreate({ name: name.trim(), age: Number(age), avatar, difficulty })
      setName('')
      setCreating(false)
    } catch (err) {
      setCreateError(err.message === 'child-limit' ? `Maximum ${MAX_CHILDREN} enfants par compte.` : 'La création a échoué. Réessaie.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="home-sky screen-narrow" style={{ minHeight: '100vh', fontFamily: 'Nunito, sans-serif', padding: '18px 16px 28px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <div>
          <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontWeight: 700, fontSize: 26, lineHeight: 1 }}>
            <span style={{ color: '#FF6F00' }}>Moka</span><span style={{ color: '#1E88E5' }}>libo</span>
          </div>
          <div style={{ fontSize: 12, color: '#78909C', fontWeight: 700, marginTop: 2 }}>{user.email || 'Compte parent'}</div>
        </div>
        <button className="btn-kid" onClick={() => signOut()}
          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: 'white', color: '#78909C', padding: '8px 14px', fontSize: 12, boxShadow: '0 3px 10px rgba(26,42,79,0.12)' }}>
          <LogoutIcon size={14} /> Déconnexion
        </button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: 18 }}>
        <div style={{ fontSize: 56, marginBottom: 4 }} className="float">👨‍👩‍👧‍👦</div>
        <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontWeight: 700, fontSize: 28, color: INK }}>
          {kids.length === 0 || creating ? 'Crée un profil' : 'Qui joue ?'}
        </div>
        <div style={{ fontSize: 14, color: '#607D8B', fontWeight: 700, marginTop: 4 }}>
          Chaque enfant a sa propre progression et son niveau.
        </div>
      </div>

      {hasLegacy && kids.length === 0 && (
        <div style={{ background: '#FFF8E1', border: '2px solid #FFD54F', borderRadius: 18, padding: '14px 16px', marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 900, color: '#E65100', marginBottom: 4 }}>📦 Progression existante détectée</div>
          <div style={{ fontSize: 13, color: '#5D4037', fontWeight: 700, lineHeight: 1.5, marginBottom: 10 }}>
            Une partie a déjà été jouée sur cet appareil. Elle sera transférée sur le 1er profil que tu crées.
          </div>
          <button className="btn-kid" onClick={onMigrate}
            style={{ background: '#FFC400', color: INK, padding: '10px 16px', fontSize: 13 }}>
            Activer le transfert ⏬
          </button>
        </div>
      )}

      {!creating && (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 18 }}>
            {kids.map((k) => {
              const L = LEVELS[k.difficulty]
              return (
                <button key={k.id} className="btn-kid" onClick={() => onPick(k.id)}
                  style={{ background: 'white', borderRadius: 24, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left', boxShadow: '0 6px 0 #E3EAF2, 0 10px 20px rgba(26,42,79,0.08)' }}>
                  <div style={{ fontSize: 40, width: 60, height: 60, borderRadius: 20, background: '#FFF3E0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{k.avatar || '👦'}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 20, fontWeight: 600, color: INK }}>{k.name}</div>
                    <div style={{ fontSize: 12, color: '#78909C', fontWeight: 800 }}>
                      {k.age} ans · ⭐ {k.xp || 0} XP · Niv. {k.level || 1}
                    </div>
                    {L && (
                      <div style={{ display: 'inline-block', marginTop: 4, fontSize: 11, fontWeight: 900, color: 'white', background: L.color, borderRadius: 999, padding: '2px 9px' }}>
                        {L.emoji} {t(lang, `lvl_${k.difficulty}`)}
                      </div>
                    )}
                  </div>
                  <div style={{ fontSize: 24, color: '#FF9800' }}>▶</div>
                </button>
              )
            })}
          </div>

          {full ? (
            <div style={{ background: 'white', borderRadius: 18, padding: '12px 14px', textAlign: 'center', fontSize: 14, fontWeight: 800, color: '#607D8B' }}>
              👨‍👩‍👧‍👦 {MAX_CHILDREN} / {MAX_CHILDREN} enfants : le maximum par compte est atteint.
            </div>
          ) : (
            <button className="btn-kid" onClick={() => setCreating(true)}
              style={{ width: '100%', background: 'linear-gradient(180deg,#FFE04D,#FFC400)', color: INK, padding: '16px', fontSize: 17, borderRadius: 22, boxShadow: '0 6px 0 #E6A100' }}>
              ➕ Ajouter un enfant <span style={{ fontSize: 13, opacity: 0.7 }}>({kids.length} / {MAX_CHILDREN})</span>
            </button>
          )}
          {onOpenStats && kids.length > 0 && (
            <button className="btn-kid" onClick={onOpenStats}
              style={{ width: '100%', marginTop: 12, background: 'white', color: '#1565C0', padding: '12px', fontSize: 15, borderRadius: 18, boxShadow: '0 4px 12px rgba(30,136,229,0.12)' }}>
              📊 {t(lang, 'ps_open')}
            </button>
          )}
          {onManageDevices && (
            <button className="btn-kid" onClick={onManageDevices}
              style={{ width: '100%', marginTop: 12, background: 'white', color: '#2E7D4F', padding: '12px', fontSize: 15, borderRadius: 18, boxShadow: '0 4px 12px rgba(46,158,91,0.12)' }}>
              📱 Mes appareils
            </button>
          )}
        </>
      )}

      {creating && (
        <form onSubmit={submitNew} style={{ background: 'white', borderRadius: 26, padding: 18, boxShadow: '0 10px 28px rgba(26,42,79,0.10)' }}>
          <div style={label}>Avatar</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, marginBottom: 16 }}>
            {AVATARS.map((a) => (
              <button key={a} type="button" onClick={() => setAvatar(a)} aria-pressed={avatar === a}
                style={{ fontSize: 30, padding: '6px 0', borderRadius: 16, border: avatar === a ? '3px solid #FF9800' : '3px solid #F1F4F8', background: avatar === a ? '#FFF3E0' : '#FAFBFD', cursor: 'pointer' }}>
                {a}
              </button>
            ))}
          </div>

          <div style={label}>Prénom</div>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Lina" maxLength={20}
            style={{ width: '100%', padding: '14px 16px', borderRadius: 16, border: '3px solid #E3EAF2', background: '#FAFBFD', color: INK, fontSize: 17, fontFamily: 'inherit', fontWeight: 800, marginBottom: 16, outline: 'none' }} />

          <div style={label}>Âge</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: 5, marginBottom: 18 }}>
            {[4, 5, 6, 7, 8, 9, 10, 11, 12].map((a) => (
              <button key={a} type="button" onClick={() => pickAge(a)} aria-pressed={age === a}
                style={{ padding: '10px 0', borderRadius: 12, border: 'none', background: age === a ? '#1E88E5' : '#EEF3F8', color: age === a ? 'white' : INK, fontSize: 15, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit' }}>
                {a}
              </button>
            ))}
          </div>

          <div style={label}>{t(lang, 'reading_level')}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 8 }}>
            {LEVEL_KEYS.map((k) => {
              const L = LEVELS[k]
              const s = levelAverages(k)
              const active = difficulty === k
              return (
                <button key={k} type="button" onClick={() => { setDifficulty(k); setLevelTouched(true) }} aria-pressed={active}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 18, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', border: `3px solid ${active ? L.color : '#EEF3F8'}`, background: active ? `${L.color}12` : 'white' }}>
                  <span style={{ fontSize: 30 }}>{L.emoji}</span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ display: 'block', fontSize: 15, fontWeight: 900, color: INK }}>{t(lang, `lvl_${k}`)} <span style={{ color: '#90A4AE', fontWeight: 800, fontSize: 12 }}>· {L.ages} ans</span></span>
                    <span style={{ display: 'block', fontSize: 12, fontWeight: 800, color: L.color }}>📖 {s.stories} {t(lang, 'stories_word')} · 🎯 {s.quiz} {t(lang, 'questions_word')} {t(lang, 'per_country')}</span>
                  </span>
                  <span style={{ width: 22, height: 22, borderRadius: '50%', border: `3px solid ${active ? L.color : '#CFD8DC'}`, background: active ? L.color : 'white', color: 'white', fontSize: 12, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{active ? '✓' : ''}</span>
                </button>
              )
            })}
          </div>
          <div style={{ fontSize: 12, color: '#90A4AE', fontWeight: 700, marginBottom: 18 }}>{t(lang, 'choose_level_sub')}</div>
          {createError && <div style={{ marginBottom: 12, fontSize: 14, fontWeight: 800, color: '#C62828' }}>{createError}</div>}

          <div style={{ display: 'flex', gap: 10 }}>
            {kids.length > 0 && (
              <button type="button" className="btn-kid" onClick={() => setCreating(false)}
                style={{ flex: 1, background: '#EEF3F8', color: '#607D8B', padding: '14px', fontSize: 15 }}>
                Annuler
              </button>
            )}
            <button type="submit" className="btn-kid" disabled={busy || !name.trim()}
              style={{ flex: 2, background: 'linear-gradient(180deg,#FFE04D,#FFC400)', color: INK, padding: '16px', fontSize: 17, borderRadius: 20, boxShadow: '0 5px 0 #E6A100', opacity: busy || !name.trim() ? 0.5 : 1 }}>
              {busy ? '...' : '✓ Créer le profil'}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

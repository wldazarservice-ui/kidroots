import { useState } from 'react'
import ParentGate from './ParentGate'
import { changePassword, changeEmail, hasPassword, isGoogleAccount, resetPassword, verifyEmail } from '../auth'
import { updateChildProfile, deleteChild } from '../cloud'

const INK = '#1A2A4F'
const AVATARS = ['👦', '👧', '👦🏻', '👧🏻', '👦🏽', '👧🏽', '👦🏿', '👧🏿', '🧒', '👶']
const card = { background: 'white', borderRadius: 20, padding: '14px 16px', marginBottom: 14, boxShadow: '0 4px 14px rgba(26,42,79,0.06)' }
const h = { fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 19, fontWeight: 700, color: INK, marginBottom: 10 }
const input = { width: '100%', padding: '12px 14px', borderRadius: 14, border: '2px solid #E3EAF2', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, color: INK, marginBottom: 10, background: '#FAFBFD' }
const btn = (bg, color) => ({ width: '100%', background: bg, color, padding: '12px', fontSize: 15, borderRadius: 16, border: 'none', fontFamily: 'inherit', fontWeight: 900, cursor: 'pointer' })

function errText(code = '') {
  if (code.includes('wrong-password') || code.includes('invalid-credential')) return 'Le mot de passe actuel est incorrect.'
  if (code.includes('weak-password')) return 'Le nouveau mot de passe doit contenir au moins 6 caractères.'
  if (code.includes('email-already-in-use')) return 'Cette adresse e-mail est déjà utilisée par un autre compte.'
  if (code.includes('invalid-email')) return 'Adresse e-mail invalide.'
  if (code.includes('too-many-requests')) return 'Trop de tentatives. Réessaie dans quelques minutes.'
  if (code.includes('requires-recent-login')) return 'Pour ta sécurité, reconnecte-toi puis réessaie.'
  if (code.includes('network')) return 'Pas de connexion internet.'
  return 'Une erreur est survenue. Réessaie.'
}

// Espace « Mon compte » du parent : e-mail, mot de passe, profils des enfants
export default function AccountSettings({ user, kids, onClose, onKidsChange }) {
  const [unlocked, setUnlocked] = useState(false)
  const [msg, setMsg] = useState(null) // { ok, text, zone }
  const [busy, setBusy] = useState('')
  const [pw, setPw] = useState({ cur: '', next: '', confirm: '' })
  const [mail, setMail] = useState({ next: '', cur: '' })
  const [editing, setEditing] = useState(null) // id enfant
  const [draft, setDraft] = useState({})
  const [confirmDel, setConfirmDel] = useState(null)
  const pwAccount = hasPassword(user)

  const say = (zone, ok, text) => setMsg({ zone, ok, text })
  const run = async (zone, fn, okText) => {
    setBusy(zone); setMsg(null)
    try { await fn(); say(zone, true, okText) } catch (e) { console.error(e); say(zone, false, errText(e.code || e.message)) } finally { setBusy('') }
  }

  const submitPw = (e) => {
    e.preventDefault()
    if (pw.next.length < 6) return say('pw', false, 'Le nouveau mot de passe doit contenir au moins 6 caractères.')
    if (pw.next !== pw.confirm) return say('pw', false, 'Les deux nouveaux mots de passe ne sont pas identiques.')
    run('pw', async () => { await changePassword(user, pw.cur, pw.next); setPw({ cur: '', next: '', confirm: '' }) }, '✅ Mot de passe modifié.')
  }
  const submitMail = (e) => {
    e.preventDefault()
    if (!mail.next.includes('@')) return say('mail', false, 'Adresse e-mail invalide.')
    run('mail', async () => { await changeEmail(user, mail.cur, mail.next.trim()); setMail({ next: '', cur: '' }) },
      `📩 Un lien de confirmation a été envoyé à ${mail.next.trim()}. Ton adresse changera dès que tu auras cliqué dessus.`)
  }
  const sendReset = () => run('pw', () => resetPassword(user.email), `📩 Un lien pour choisir un nouveau mot de passe a été envoyé à ${user.email}.`)
  const sendVerify = () => run('verify', () => verifyEmail(user), `📩 E-mail de vérification envoyé à ${user.email}.`)

  const startEdit = (k) => { setEditing(k.id); setDraft({ name: k.name || '', age: k.age || 5, avatar: k.avatar || '🧒' }); setMsg(null) }
  const saveKid = (k) => run('kid-' + k.id, async () => {
    const data = { name: draft.name.trim() || k.name, age: draft.age, avatar: draft.avatar }
    await updateChildProfile(user.uid, k.id, data)
    onKidsChange?.((all) => all.map((x) => (x.id === k.id ? { ...x, ...data } : x)))
    setEditing(null)
  }, '✅ Profil enregistré.')
  const removeKid = (k) => run('kid-' + k.id, async () => {
    await deleteChild(user.uid, k.id)
    onKidsChange?.((all) => all.filter((x) => x.id !== k.id))
    setConfirmDel(null)
  }, `Profil de ${k.name} supprimé.`)

  const note = (zone) => msg && msg.zone === zone && (
    <div style={{ fontSize: 13, fontWeight: 800, color: msg.ok ? '#2E7D4F' : '#C62828', margin: '2px 0 10px', lineHeight: 1.45 }}>{msg.text}</div>
  )

  return (
    <div onClick={onClose} className="sheet-backdrop" style={{ position: 'fixed', inset: 0, background: 'rgba(26,42,79,0.5)', zIndex: 600, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div onClick={(e) => e.stopPropagation()} className="anim-slide-up sheet"
        style={{ width: '100%', maxWidth: 440, maxHeight: '94vh', overflowY: 'auto', borderRadius: '28px 28px 0 0', padding: '22px 18px 26px', fontFamily: 'Nunito, sans-serif', background: '#F4F7FB' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
          <div style={{ flex: 1, fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 24, fontWeight: 700, color: INK }}>👤 Mon compte</div>
          <button onClick={onClose} aria-label="Fermer" style={{ background: '#E3EAF2', color: '#546E7A', width: 38, height: 38, borderRadius: '50%', border: 'none', fontSize: 16, cursor: 'pointer' }}>✕</button>
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#546E7A', marginBottom: 14 }}>Espace réservé aux parents.</div>

        {!unlocked ? <ParentGate onPass={() => setUnlocked(true)} /> : (
          <>
            {/* E-mail du compte */}
            <div style={card}>
              <div style={h}>📧 Adresse e-mail</div>
              <div style={{ fontSize: 15, fontWeight: 900, color: INK, wordBreak: 'break-all' }}>{user.email}</div>
              <div style={{ fontSize: 13, fontWeight: 800, marginTop: 4, color: user.emailVerified ? '#2E7D4F' : '#E65100' }}>
                {user.emailVerified ? '✅ Adresse vérifiée' : '⚠️ Adresse pas encore vérifiée'}
              </div>
              {!user.emailVerified && (
                <button type="button" onClick={sendVerify} disabled={busy === 'verify'} style={{ ...btn('#FFF3E0', '#E65100'), marginTop: 10 }}>
                  {busy === 'verify' ? '…' : "Renvoyer l'e-mail de vérification"}
                </button>
              )}
              {note('verify')}
              {isGoogleAccount(user) && !pwAccount && (
                <div style={{ fontSize: 13, fontWeight: 700, color: '#607D8B', marginTop: 10, lineHeight: 1.5 }}>
                  Tu te connectes avec Google : ton adresse et ton mot de passe se gèrent dans ton compte Google.
                </div>
              )}
            </div>

            {pwAccount && (
              <>
                {/* Mot de passe */}
                <form onSubmit={submitPw} style={card}>
                  <div style={h}>🔑 Changer le mot de passe</div>
                  <input style={input} type="password" autoComplete="current-password" placeholder="Mot de passe actuel" value={pw.cur} onChange={(e) => setPw({ ...pw, cur: e.target.value })} required />
                  <input style={input} type="password" autoComplete="new-password" placeholder="Nouveau mot de passe (6 caractères min.)" value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} required />
                  <input style={input} type="password" autoComplete="new-password" placeholder="Confirmer le nouveau mot de passe" value={pw.confirm} onChange={(e) => setPw({ ...pw, confirm: e.target.value })} required />
                  {note('pw')}
                  <button type="submit" disabled={busy === 'pw'} style={btn('linear-gradient(180deg,#FFE04D,#FFC400)', INK)}>{busy === 'pw' ? '…' : 'Enregistrer le nouveau mot de passe'}</button>
                  <button type="button" onClick={sendReset} style={{ background: 'none', border: 'none', color: '#1E88E5', fontFamily: 'inherit', fontWeight: 800, fontSize: 13, textDecoration: 'underline', cursor: 'pointer', marginTop: 10, width: '100%' }}>
                    Mot de passe actuel oublié ? Recevoir un lien par e-mail
                  </button>
                </form>

                {/* E-mail */}
                <form onSubmit={submitMail} style={card}>
                  <div style={h}>✉️ Changer l'adresse e-mail</div>
                  <input style={input} type="email" autoComplete="email" placeholder="Nouvelle adresse e-mail" value={mail.next} onChange={(e) => setMail({ ...mail, next: e.target.value })} required />
                  <input style={input} type="password" autoComplete="current-password" placeholder="Mot de passe actuel" value={mail.cur} onChange={(e) => setMail({ ...mail, cur: e.target.value })} required />
                  {note('mail')}
                  <button type="submit" disabled={busy === 'mail'} style={btn('#E3F2FD', '#1565C0')}>{busy === 'mail' ? '…' : 'Changer mon adresse e-mail'}</button>
                </form>
              </>
            )}

            {/* Profils enfants */}
            <div style={card}>
              <div style={h}>🧒 Profils des enfants</div>
              {kids.length === 0 && <div style={{ fontSize: 14, fontWeight: 700, color: '#607D8B' }}>Aucun profil pour l'instant.</div>}
              {kids.map((k) => (
                <div key={k.id} style={{ borderTop: '1px solid #EEF3F8', padding: '10px 0' }}>
                  {editing !== k.id ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 30 }}>{k.avatar || '🧒'}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 900, color: INK }}>{k.name}</div>
                        <div style={{ fontSize: 12, fontWeight: 800, color: '#90A4AE' }}>{k.age} ans</div>
                      </div>
                      <button onClick={() => startEdit(k)} style={{ background: '#E3F2FD', color: '#1565C0', border: 'none', borderRadius: 12, padding: '8px 12px', fontFamily: 'inherit', fontWeight: 900, cursor: 'pointer' }}>✏️ Modifier</button>
                    </div>
                  ) : (
                    <div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6, marginBottom: 10 }}>
                        {AVATARS.map((a) => (
                          <button key={a} type="button" onClick={() => setDraft({ ...draft, avatar: a })} aria-pressed={draft.avatar === a}
                            style={{ fontSize: 26, padding: '4px 0', borderRadius: 12, border: draft.avatar === a ? '3px solid #FF9800' : '3px solid #F1F4F8', background: draft.avatar === a ? '#FFF3E0' : '#FAFBFD', cursor: 'pointer' }}>{a}</button>
                        ))}
                      </div>
                      <input style={input} value={draft.name} maxLength={30} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="Prénom" />
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: 4, marginBottom: 10 }}>
                        {[4, 5, 6, 7, 8, 9, 10, 11, 12].map((a) => (
                          <button key={a} type="button" onClick={() => setDraft({ ...draft, age: a })}
                            style={{ padding: '8px 0', borderRadius: 10, border: 'none', background: draft.age === a ? '#1E88E5' : '#EEF3F8', color: draft.age === a ? 'white' : INK, fontWeight: 900, fontFamily: 'inherit', cursor: 'pointer' }}>{a}</button>
                        ))}
                      </div>
                      {note('kid-' + k.id)}
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button onClick={() => setEditing(null)} style={{ ...btn('#EEF3F8', '#607D8B'), flex: 1 }}>Annuler</button>
                        <button onClick={() => saveKid(k)} disabled={busy === 'kid-' + k.id} style={{ ...btn('linear-gradient(180deg,#FFE04D,#FFC400)', INK), flex: 2 }}>{busy === 'kid-' + k.id ? '…' : 'Enregistrer'}</button>
                      </div>
                      {confirmDel !== k.id ? (
                        <button onClick={() => setConfirmDel(k.id)} style={{ background: 'none', border: 'none', color: '#C62828', fontFamily: 'inherit', fontWeight: 800, fontSize: 13, textDecoration: 'underline', cursor: 'pointer', marginTop: 10, width: '100%' }}>
                          Supprimer ce profil
                        </button>
                      ) : (
                        <div style={{ background: '#FFEBEE', borderRadius: 14, padding: 12, marginTop: 10 }}>
                          <div style={{ fontSize: 13, fontWeight: 800, color: '#C62828', marginBottom: 8 }}>Supprimer le profil de {k.name} ? Sa progression (histoires, passeport, badges) sera perdue définitivement.</div>
                          <div style={{ display: 'flex', gap: 8 }}>
                            <button onClick={() => setConfirmDel(null)} style={{ ...btn('white', '#607D8B'), flex: 1 }}>Non</button>
                            <button onClick={() => removeKid(k)} style={{ ...btn('#C62828', 'white'), flex: 1 }}>Oui, supprimer</button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
              {msg && msg.zone.startsWith('kid-') && !editing && note(msg.zone)}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

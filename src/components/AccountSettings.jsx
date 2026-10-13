import { isMusicOn, setMusicOn, onMusicChange, getMusicVolume, setMusicVolume } from '../music'
import { openSupport } from '../support'
import { useEffect, useState } from 'react'
import ParentGate from './ParentGate'
import { L } from '../i18nParents'
import SubscriptionCard from './SubscriptionCard'
import { changePassword, changeEmail, hasPassword, isGoogleAccount, resetPassword, verifyEmail } from '../auth'
import { updateChildProfile, deleteChild, setEmailOptIn, getEmailOptIn } from '../cloud'

const INK = '#1A2A4F'
const AVATARS = ['👦', '👧', '👦🏻', '👧🏻', '👦🏽', '👧🏽', '👦🏿', '👧🏿', '🧒', '👶']
const card = { background: 'white', borderRadius: 20, padding: '14px 16px', marginBottom: 14, boxShadow: '0 4px 14px rgba(26,42,79,0.06)' }
const h = { fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 19, fontWeight: 700, color: INK, marginBottom: 10 }
const input = { width: '100%', padding: '12px 14px', borderRadius: 14, border: '2px solid #E3EAF2', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, color: INK, marginBottom: 10, background: '#FAFBFD' }
const btn = (bg, color) => ({ width: '100%', background: bg, color, padding: '12px', fontSize: 15, borderRadius: 16, border: 'none', fontFamily: 'inherit', fontWeight: 900, cursor: 'pointer' })

function errText(code = '') {
  if (code.includes('wrong-password') || code.includes('invalid-credential')) return L('Le mot de passe actuel est incorrect.')
  if (code.includes('weak-password')) return L('Le nouveau mot de passe doit contenir au moins 6 caractères.')
  if (code.includes('email-already-in-use')) return L('Cette adresse e-mail est déjà utilisée par un autre compte.')
  if (code.includes('invalid-email')) return L('Adresse e-mail invalide.')
  if (code.includes('too-many-requests')) return L('Trop de tentatives. Réessaie dans quelques minutes.')
  if (code.includes('requires-recent-login')) return L('Pour ta sécurité, reconnecte-toi puis réessaie.')
  if (code.includes('network')) return L('Pas de connexion internet.')
  return L('Une erreur est survenue. Réessaie.')
}

// Espace « Mon compte » du parent : e-mail, mot de passe, profils des enfants
export default function AccountSettings({ user, kids, onClose, onKidsChange, account, onOpenOffer, tools = [], onDeleteAccount }) {
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
    if (pw.next.length < 6) return say('pw', false, L('Le nouveau mot de passe doit contenir au moins 6 caractères.'))
    if (pw.next !== pw.confirm) return say('pw', false, L('Les deux nouveaux mots de passe ne sont pas identiques.'))
    run('pw', async () => { await changePassword(user, pw.cur, pw.next); setPw({ cur: '', next: '', confirm: '' }) }, L('✅ Mot de passe modifié.'))
  }
  const submitMail = (e) => {
    e.preventDefault()
    if (!mail.next.includes('@')) return say('mail', false, L('Adresse e-mail invalide.'))
    run('mail', async () => { await changeEmail(user, mail.cur, mail.next.trim()); setMail({ next: '', cur: '' }) },
      L('📩 Un lien de confirmation a été envoyé à {email}. Ton adresse changera dès que tu auras cliqué dessus.', { email: mail.next.trim() }))
  }
  const sendReset = () => run('pw', () => resetPassword(user.email), L('📩 Un lien pour choisir un nouveau mot de passe a été envoyé à {email}.', { email: user.email }))
  const sendVerify = () => run('verify', () => verifyEmail(user), L('📩 E-mail de vérification envoyé à {email}.', { email: user.email }))

  const startEdit = (k) => { setEditing(k.id); setDraft({ name: k.name || '', age: k.age || 5, avatar: k.avatar || '🧒' }); setMsg(null) }
  const saveKid = (k) => run('kid-' + k.id, async () => {
    const data = { name: draft.name.trim() || k.name, age: draft.age, avatar: draft.avatar }
    await updateChildProfile(user.uid, k.id, data)
    onKidsChange?.((all) => all.map((x) => (x.id === k.id ? { ...x, ...data } : x)))
    setEditing(null)
  }, L('✅ Profil enregistré.'))
  const removeKid = (k) => run('kid-' + k.id, async () => {
    await deleteChild(user.uid, k.id)
    onKidsChange?.((all) => all.filter((x) => x.id !== k.id))
    setConfirmDel(null)
  }, L('Profil de {name} supprimé.', { name: k.name }))

  const note = (zone) => msg && msg.zone === zone && (
    <div style={{ fontSize: 13, fontWeight: 800, color: msg.ok ? '#2E7D4F' : '#C62828', margin: '2px 0 10px', lineHeight: 1.45 }}>{msg.text}</div>
  )

  return (
    <div onClick={onClose} className="sheet-backdrop" style={{ position: 'fixed', inset: 0, background: 'rgba(26,42,79,0.5)', zIndex: 450, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div onClick={(e) => e.stopPropagation()} className="anim-slide-up sheet"
        style={{ width: '100%', maxWidth: 440, maxHeight: '94vh', overflowY: 'auto', overflowX: 'hidden', borderRadius: '28px 28px 0 0', padding: '22px 18px 26px', fontFamily: 'Nunito, sans-serif', background: '#F4F7FB' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
          <div style={{ flex: 1, fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 24, fontWeight: 700, color: INK }}>👨‍👩‍👧 {L('Espace parents')}</div>
          <button onClick={onClose} aria-label={L('Fermer')} style={{ background: '#E3EAF2', color: '#546E7A', width: 38, height: 38, borderRadius: '50%', border: 'none', fontSize: 16, cursor: 'pointer' }}>✕</button>
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#546E7A', marginBottom: 14 }}>{L('Espace réservé aux parents.')}</div>

        {!unlocked ? <ParentGate onPass={() => setUnlocked(true)} /> : (
          <>
            <SubscriptionCard user={user} account={account} onOpenOffer={onOpenOffer && (() => { onClose(); onOpenOffer() })} />

            {/* Outils des parents : statistiques, temps d'ecran, appareils, voyage, partager… */}
            {tools.length > 0 && (
              <div style={{ ...card }}>
                <div style={h}>🧰 {L('Outils')}</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 8 }}>
                  {tools.map((x) => (
                    <button key={x.label} type="button" onClick={() => x.run()}
                      style={{ display: 'flex', alignItems: 'center', gap: 8, textAlign: 'left', background: '#F4F7FB', border: 'none', borderRadius: 14, padding: '11px 10px', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 900, color: x.color, cursor: 'pointer', lineHeight: 1.25 }}>
                      <span style={{ fontSize: 20, flexShrink: 0 }}>{x.icon}</span><span>{x.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button type="button" onClick={() => openSupport({ where: 'account' })}
              style={{ ...card, width: '100%', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', border: 'none', fontSize: 15, fontWeight: 900, color: '#1565C0' }}>
              💬 {L('Aide et contact : une question, un souci ? Écris-nous')}
            </button>

            {/* Accord e-mails */}
            <EmailPrefs user={user} card={card} />

            {/* Musique de fond (sur cet appareil) */}
            <MusicPref card={card} />

            {/* E-mail du compte */}
            <div style={card}>
              <div style={h}>📧 {L('Adresse e-mail')}</div>
              <div style={{ fontSize: 15, fontWeight: 900, color: INK, wordBreak: 'break-all' }}>{user.email}</div>
              <div style={{ fontSize: 13, fontWeight: 800, marginTop: 4, color: user.emailVerified ? '#2E7D4F' : '#E65100' }}>
                {user.emailVerified ? '✅ ' + L('Adresse vérifiée') : '⚠️ ' + L('Adresse pas encore vérifiée')}
              </div>
              {!user.emailVerified && (
                <button type="button" onClick={sendVerify} disabled={busy === 'verify'} style={{ ...btn('#FFF3E0', '#E65100'), marginTop: 10 }}>
                  {busy === 'verify' ? '…' : L("Renvoyer l'e-mail de vérification")}
                </button>
              )}
              {note('verify')}
              {isGoogleAccount(user) && !pwAccount && (
                <div style={{ fontSize: 13, fontWeight: 700, color: '#607D8B', marginTop: 10, lineHeight: 1.5 }}>
                  {L('Tu te connectes avec Google : ton adresse et ton mot de passe se gèrent dans ton compte Google.')}
                </div>
              )}
            </div>

            {pwAccount && (
              <>
                {/* Mot de passe */}
                <form onSubmit={submitPw} style={card}>
                  <div style={h}>🔑 {L('Changer le mot de passe')}</div>
                  <input style={input} type="password" autoComplete="current-password" placeholder={L('Mot de passe actuel')} value={pw.cur} onChange={(e) => setPw({ ...pw, cur: e.target.value })} required />
                  <input style={input} type="password" autoComplete="new-password" placeholder={L('Nouveau mot de passe (6 caractères min.)')} value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} required />
                  <input style={input} type="password" autoComplete="new-password" placeholder={L('Confirmer le nouveau mot de passe')} value={pw.confirm} onChange={(e) => setPw({ ...pw, confirm: e.target.value })} required />
                  {note('pw')}
                  <button type="submit" disabled={busy === 'pw'} style={btn('linear-gradient(180deg,#FFE04D,#FFC400)', INK)}>{busy === 'pw' ? '…' : L('Enregistrer le nouveau mot de passe')}</button>
                  <button type="button" onClick={sendReset} style={{ background: 'none', border: 'none', color: '#1E88E5', fontFamily: 'inherit', fontWeight: 800, fontSize: 13, textDecoration: 'underline', cursor: 'pointer', marginTop: 10, width: '100%' }}>
                    {L('Mot de passe actuel oublié ? Recevoir un lien par e-mail')}
                  </button>
                </form>

                {/* E-mail */}
                <form onSubmit={submitMail} style={card}>
                  <div style={h}>✉️ {L("Changer l'adresse e-mail")}</div>
                  <input style={input} type="email" autoComplete="email" placeholder={L('Nouvelle adresse e-mail')} value={mail.next} onChange={(e) => setMail({ ...mail, next: e.target.value })} required />
                  <input style={input} type="password" autoComplete="current-password" placeholder={L('Mot de passe actuel')} value={mail.cur} onChange={(e) => setMail({ ...mail, cur: e.target.value })} required />
                  {note('mail')}
                  <button type="submit" disabled={busy === 'mail'} style={btn('#E3F2FD', '#1565C0')}>{busy === 'mail' ? '…' : L('Changer mon adresse e-mail')}</button>
                </form>
              </>
            )}

            {/* Profils enfants */}
            <div style={card}>
              <div style={h}>🧒 {L('Profils des enfants')}</div>
              {kids.length === 0 && <div style={{ fontSize: 14, fontWeight: 700, color: '#607D8B' }}>{L("Aucun profil pour l'instant.")}</div>}
              {kids.map((k) => (
                <div key={k.id} style={{ borderTop: '1px solid #EEF3F8', padding: '10px 0' }}>
                  {editing !== k.id ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 30 }}>{k.avatar || '🧒'}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 900, color: INK }}>{k.name}</div>
                        <div style={{ fontSize: 12, fontWeight: 800, color: '#90A4AE' }}>{L('{n} ans', { n: k.age })}</div>
                      </div>
                      <button onClick={() => startEdit(k)} style={{ background: '#E3F2FD', color: '#1565C0', border: 'none', borderRadius: 12, padding: '8px 12px', fontFamily: 'inherit', fontWeight: 900, cursor: 'pointer' }}>✏️ {L('Modifier')}</button>
                    </div>
                  ) : (
                    <div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6, marginBottom: 10 }}>
                        {AVATARS.map((a) => (
                          <button key={a} type="button" onClick={() => setDraft({ ...draft, avatar: a })} aria-pressed={draft.avatar === a}
                            style={{ fontSize: 26, padding: '4px 0', borderRadius: 12, border: draft.avatar === a ? '3px solid #FF9800' : '3px solid #F1F4F8', background: draft.avatar === a ? '#FFF3E0' : '#FAFBFD', cursor: 'pointer' }}>{a}</button>
                        ))}
                      </div>
                      <input style={input} value={draft.name} maxLength={30} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder={L('Prénom')} />
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: 4, marginBottom: 10 }}>
                        {[4, 5, 6, 7, 8, 9, 10, 11, 12].map((a) => (
                          <button key={a} type="button" onClick={() => setDraft({ ...draft, age: a })}
                            style={{ padding: '8px 0', borderRadius: 10, border: 'none', background: draft.age === a ? '#1E88E5' : '#EEF3F8', color: draft.age === a ? 'white' : INK, fontWeight: 900, fontFamily: 'inherit', cursor: 'pointer' }}>{a}</button>
                        ))}
                      </div>
                      {note('kid-' + k.id)}
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button onClick={() => setEditing(null)} style={{ ...btn('#EEF3F8', '#607D8B'), flex: 1 }}>{L('Annuler')}</button>
                        <button onClick={() => saveKid(k)} disabled={busy === 'kid-' + k.id} style={{ ...btn('linear-gradient(180deg,#FFE04D,#FFC400)', INK), flex: 2 }}>{busy === 'kid-' + k.id ? '…' : L('Enregistrer')}</button>
                      </div>
                      {confirmDel !== k.id ? (
                        <button onClick={() => setConfirmDel(k.id)} style={{ background: 'none', border: 'none', color: '#C62828', fontFamily: 'inherit', fontWeight: 800, fontSize: 13, textDecoration: 'underline', cursor: 'pointer', marginTop: 10, width: '100%' }}>
                          {L('Supprimer ce profil')}
                        </button>
                      ) : (
                        <div style={{ background: '#FFEBEE', borderRadius: 14, padding: 12, marginTop: 10 }}>
                          <div style={{ fontSize: 13, fontWeight: 800, color: '#C62828', marginBottom: 8 }}>{L('Supprimer le profil de {name} ? Sa progression (histoires, passeport, badges) sera perdue définitivement.', { name: k.name })}</div>
                          <div style={{ display: 'flex', gap: 8 }}>
                            <button onClick={() => setConfirmDel(null)} style={{ ...btn('white', '#607D8B'), flex: 1 }}>{L('Non')}</button>
                            <button onClick={() => removeKid(k)} style={{ ...btn('#C62828', 'white'), flex: 1 }}>{L('Oui, supprimer')}</button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
              {msg && msg.zone.startsWith('kid-') && !editing && note(msg.zone)}
            </div>
            {onDeleteAccount && (
              <div style={{ textAlign: 'center', marginTop: 6 }}>
                <button type="button" onClick={() => { onClose(); onDeleteAccount() }}
                  style={{ background: 'none', border: 'none', color: '#90A4AE', fontFamily: 'inherit', fontWeight: 800, fontSize: 13, textDecoration: 'underline', cursor: 'pointer' }}>
                  {L('Supprimer mon compte')}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

// Musique de fond : marche / arret et volume (memorises sur l'appareil)
function MusicPref({ card }) {
  const [on, setOn] = useState(isMusicOn)
  const [v, setV] = useState(getMusicVolume)
  useEffect(() => onMusicChange(setOn), [])
  const change = (x) => { const y = Math.round(Math.min(1, Math.max(0, x)) * 10) / 10; setV(y); setMusicVolume(y); if (y > 0 && !on) setMusicOn(true) }
  const round = { width: 40, height: 40, borderRadius: '50%', border: 'none', background: '#E3F2FD', color: '#1565C0', fontSize: 22, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }
  return (
    <div style={{ ...card }}>
      <button type="button" data-music-toggle onClick={() => setMusicOn(!on)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left', border: 'none', background: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}>
        <span style={{ fontSize: 22 }}>{on ? '✅' : '⬜'}</span>
        <span style={{ fontSize: 14, fontWeight: 800, color: '#1A2A4F', lineHeight: 1.45 }}>🎵 {L('Musique de fond dans l’app (sur cet appareil). Elle se baisse toute seule pendant la lecture à voix haute.')}</span>
      </button>
      <div data-music-toggle style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, opacity: on ? 1 : 0.5 }}>
        <button type="button" aria-label={L('Baisser le volume')} onClick={() => change(v - 0.1)} style={round}>−</button>
        <input type="range" min="0" max="1" step="0.1" value={v} onChange={(e) => change(parseFloat(e.target.value))} aria-label={L('Volume de la musique')}
          style={{ flex: 1, minWidth: 0, accentColor: '#1E88E5', height: 28, cursor: 'pointer' }} />
        <button type="button" aria-label={L('Monter le volume')} onClick={() => change(v + 0.1)} style={round}>+</button>
        <span style={{ minWidth: 40, flexShrink: 0, textAlign: 'right', fontSize: 14, fontWeight: 900, color: '#1565C0' }}>{Math.round(v * 100)} %</span>
      </div>
    </div>
  )
}

// Interrupteur « bilan de la semaine et conseils par e-mail »
function EmailPrefs({ user, card }) {
  const [on, setOn] = useState(null)
  useEffect(() => { getEmailOptIn(user.uid).then(setOn).catch(() => setOn(false)) }, [user.uid])
  if (on === null) return null
  const toggle = async () => { const v = !on; setOn(v); try { await setEmailOptIn(user.uid, v) } catch { setOn(!v) } }
  return (
    <button type="button" onClick={toggle} style={{ ...card, width: '100%', display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
      <span style={{ fontSize: 22 }}>{on ? '✅' : '⬜'}</span>
      <span style={{ fontSize: 14, fontWeight: 800, color: '#1A2A4F', lineHeight: 1.45 }}>📧 {L('Recevoir le bilan de la semaine de mes enfants et des conseils par e-mail')}</span>
    </button>
  )
}

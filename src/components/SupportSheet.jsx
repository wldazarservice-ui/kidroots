import { useEffect, useState } from 'react'
import { useAuth } from '../auth'
import { getLang } from '../i18n'
import { sendSupport } from '../support'
import ParentGate from './ParentGate'

const INK = '#1A2A4F'
const TXT = {
  fr: {
    title: 'Aide et contact', sub: 'Une question, un souci, une idée ? Écrivez-nous, nous répondons par e-mail sous 48 h.',
    topics: { question: '❓ Question', bug: '🐞 Problème technique', payment: '💳 Paiement / abonnement', cancel: '🚪 Résiliation', school: '🏫 École / enseignant', idea: '💡 Idée / avis', other: '✉️ Autre' },
    email: 'Votre e-mail (pour la réponse)', name: 'Votre prénom (facultatif)', msg: 'Votre message…', send: 'Envoyer', wait: 'Envoi…',
    ok: '✅ Merci ! Votre message est bien arrivé. Nous vous répondons par e-mail sous 48 h.', close: 'Fermer',
    err: 'L’envoi a échoué. Réessayez, ou écrivez à contact@azarconsulting.eu', limit: 'Trop de messages aujourd’hui. Écrivez à contact@azarconsulting.eu',
    gate: 'Espace parents 🔐', q: (a, b) => `Combien font ${a} × ${b} ?`, gok: 'Valider', gerr: 'Ce n’est pas ça. Demande à un adulte !',
    cancel_hint: 'Pour résilier tout de suite, sans attendre : page « Verträge hier kündigen ».', faq: 'Questions fréquentes',
  },
  en: {
    title: 'Help & contact', sub: 'A question, a problem, an idea? Write to us, we reply by e-mail within 48 hours.',
    topics: { question: '❓ Question', bug: '🐞 Technical problem', payment: '💳 Payment / subscription', cancel: '🚪 Cancellation', school: '🏫 School / teacher', idea: '💡 Idea / feedback', other: '✉️ Other' },
    email: 'Your e-mail (for the reply)', name: 'Your first name (optional)', msg: 'Your message…', send: 'Send', wait: 'Sending…',
    ok: '✅ Thank you! Your message has arrived. We will reply by e-mail within 48 hours.', close: 'Close',
    err: 'Sending failed. Try again, or write to contact@azarconsulting.eu', limit: 'Too many messages today. Write to contact@azarconsulting.eu',
    gate: 'Parents only 🔐', q: (a, b) => `What is ${a} × ${b}?`, gok: 'Confirm', gerr: 'That’s not right. Ask a grown-up!',
    cancel_hint: 'To cancel right away: “Verträge hier kündigen” page.', faq: 'FAQ',
  },
  de: {
    title: 'Hilfe & Kontakt', sub: 'Eine Frage, ein Problem, eine Idee? Schreiben Sie uns, wir antworten innerhalb von 48 Stunden per E-Mail.',
    topics: { question: '❓ Frage', bug: '🐞 Technisches Problem', payment: '💳 Zahlung / Abo', cancel: '🚪 Kündigung', school: '🏫 Schule / Lehrkraft', idea: '💡 Idee / Feedback', other: '✉️ Sonstiges' },
    email: 'Ihre E-Mail (für die Antwort)', name: 'Ihr Vorname (optional)', msg: 'Ihre Nachricht…', send: 'Senden', wait: 'Wird gesendet…',
    ok: '✅ Danke! Ihre Nachricht ist angekommen. Wir antworten innerhalb von 48 Stunden per E-Mail.', close: 'Schließen',
    err: 'Senden fehlgeschlagen. Bitte erneut versuchen oder an contact@azarconsulting.eu schreiben', limit: 'Zu viele Nachrichten heute. Bitte an contact@azarconsulting.eu schreiben',
    gate: 'Nur für Eltern 🔐', q: (a, b) => `Wie viel ist ${a} × ${b}?`, gok: 'Bestätigen', gerr: 'Das stimmt nicht. Frag einen Erwachsenen!',
    cancel_hint: 'Sofort kündigen: Seite „Verträge hier kündigen“.', faq: 'Häufige Fragen',
  },
}

// Fenetre « Aide et contact », montee une seule fois (main.jsx) et ouverte par openSupport()
export default function SupportSheet() {
  const { user } = useAuth()
  const [open, setOpen] = useState(null) // null | { where, topic }
  const [lang, setLang] = useState(getLang())
  const [gate, setGate] = useState(true)
  const [f, setF] = useState({ topic: 'question', email: '', name: '', message: '', website: '' })
  const [state, setState] = useState('') // '' | busy | ok | err | limit

  useEffect(() => {
    const on = (e) => {
      const d = e.detail || {}
      setLang(getLang()); setState('')
      setGate(!!d.gate) // contrôle parental quand on vient de l'espace enfant
      setF((x) => ({ ...x, topic: d.topic || 'question', email: x.email || user?.email || '', message: '' }))
      setOpen({ where: d.where || 'app' })
    }
    window.addEventListener('mokalibo:support', on)
    return () => window.removeEventListener('mokalibo:support', on)
  }, [user])

  if (!open) return null
  const T = TXT[lang] || TXT.en
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const send = async (e) => {
    e.preventDefault()
    setState('busy')
    try { await sendSupport({ ...f, lang, where: open.where }); setState('ok') } catch (err) { setState(err.message === 'limit' ? 'limit' : 'err') }
  }
  const input = { width: '100%', boxSizing: 'border-box', padding: '12px 14px', borderRadius: 14, border: '2px solid #E3EAF2', background: 'white', color: INK, fontSize: 16, fontFamily: 'inherit', fontWeight: 700, outline: 'none' }

  return (
    <div onClick={() => setOpen(null)} className="sheet-backdrop" style={{ position: 'fixed', inset: 0, background: 'rgba(26,42,79,0.5)', zIndex: 720, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div onClick={(e) => e.stopPropagation()} className="anim-slide-up sheet"
        style={{ width: '100%', maxWidth: 440, borderRadius: '28px 28px 0 0', padding: '20px 18px 26px', background: '#F4F7FB', fontFamily: 'Nunito, sans-serif', color: INK }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
          <div style={{ flex: 1, fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 24, fontWeight: 700 }}>💬 {T.title}</div>
          <button className="btn-kid" onClick={() => setOpen(null)} aria-label={T.close} style={{ background: '#E3EAF2', color: '#546E7A', width: 36, height: 36, borderRadius: '50%' }}>✕</button>
        </div>
        {gate ? (
          <ParentGate onPass={() => setGate(false)} title={T.gate} question={T.q} okLabel={T.gok} errorLabel={T.gerr} />
        ) : state === 'ok' ? (
          <div style={{ textAlign: 'center', padding: '22px 4px' }}>
            <div style={{ fontSize: 17, fontWeight: 900, color: '#2E7D4F', lineHeight: 1.5 }}>{T.ok}</div>
            <button className="btn-kid soft" onClick={() => setOpen(null)} style={{ marginTop: 16, background: 'white', color: INK, padding: '12px 22px', borderRadius: 16 }}>{T.close}</button>
          </div>
        ) : (
          <form onSubmit={send} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#546E7A', lineHeight: 1.5 }}>{T.sub}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {Object.entries(T.topics).map(([k, label]) => (
                <button key={k} type="button" onClick={() => setF({ ...f, topic: k })} aria-pressed={f.topic === k}
                  style={{ border: `2px solid ${f.topic === k ? '#1E88E5' : '#E3EAF2'}`, background: f.topic === k ? '#E3F2FD' : 'white', color: INK, borderRadius: 999, padding: '7px 12px', fontSize: 13, fontWeight: 800, fontFamily: 'inherit', cursor: 'pointer' }}>{label}</button>
              ))}
            </div>
            {f.topic === 'cancel' && (
              <a href="/kuendigen" target="_blank" rel="noopener" style={{ fontSize: 13, fontWeight: 800, color: '#C62828' }}>{T.cancel_hint}</a>
            )}
            <input required type="email" maxLength={160} placeholder={T.email} value={f.email} onChange={set('email')} style={input} autoComplete="email" />
            <input maxLength={80} placeholder={T.name} value={f.name} onChange={set('name')} style={input} autoComplete="given-name" />
            <textarea required minLength={5} maxLength={2000} rows={5} placeholder={T.msg} value={f.message} onChange={set('message')} style={{ ...input, resize: 'vertical' }} />
            <input tabIndex={-1} autoComplete="off" aria-hidden value={f.website} onChange={set('website')} style={{ position: 'absolute', left: -9999, width: 1, height: 1, opacity: 0 }} />
            <button type="submit" className="btn-kid soft" disabled={state === 'busy'}
              style={{ background: 'linear-gradient(180deg,#42A5F5,#1E88E5)', color: 'white', padding: '15px', fontSize: 17, borderRadius: 20, boxShadow: '0 5px 0 #1565C0', opacity: state === 'busy' ? 0.6 : 1 }}>
              {state === 'busy' ? T.wait : T.send}
            </button>
            {(state === 'err' || state === 'limit') && <div style={{ textAlign: 'center', fontSize: 13, fontWeight: 800, color: '#C62828' }}>{T[state]}</div>}
          </form>
        )}
      </div>
    </div>
  )
}

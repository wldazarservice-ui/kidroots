import { useEffect, useState } from 'react'
import { getLang } from '../i18n'
import { auth } from '../firebase'
import { GIFT_PRICE, startGiftCheckout, giftStatus } from '../premium'

const INK = '#1A2A4F'
const TXT = {
  fr: {
    title: 'Offrir Mokalibo', sub: '1 an de Formule Famille : 195 pays, histoires et jeux illimités, jusqu’à 5 enfants, sans publicité. Le cadeau idéal pour les enfants de 4 à 12 ans.',
    to: 'Pour (prénom des enfants)', from: 'De la part de', msg: 'Petit message (facultatif)', pay: `🎁 Offrir · ${GIFT_PRICE}`, wait: 'Un instant…',
    points: ['🎁 Code cadeau reçu tout de suite après le paiement', '🖨️ Jolie carte à imprimer ou à envoyer par WhatsApp', '📅 Valable 3 ans, activable en 1 clic', '💛 5 % vont à la protection de l’enfance'],
    err: 'Le paiement n’a pas pu démarrer. Réessayez.', secure: '🔒 Paiement sécurisé par Stripe · sans abonnement, paiement unique',
    ok_title: 'Merci ! Voici votre carte cadeau 🎉', ok_sub: 'Le code est aussi envoyé à votre adresse e-mail.', code: 'Code cadeau',
    how: 'Pour l’activer : aller sur mokalibo.com, créer un compte parent gratuit, puis entrer le code (ou ouvrir directement le lien de la carte).',
    print: '🖨️ Imprimer la carte', share: '📤 Envoyer la carte', copy: '📋 Copier le code', copied: '✅ Copié !', close: 'Fermer', pending: 'Paiement en cours de confirmation…',
    card_title: 'Une année de voyages autour du monde !', card_for: 'Pour', card_from: 'De la part de', card_steps: '1. Ouvre mokalibo.com/?cadeau=CODE  2. Crée ton compte parent (gratuit)  3. C’est parti pour 1 an d’aventures !',
    share_text: (c, to) => `🎁 ${to ? to + ', voici' : 'Voici'} ton cadeau : 1 an de Mokalibo, l’histoire des 195 pays racontée aux enfants ! Active-le ici : https://mokalibo.com/?cadeau=${c} (code ${c})`,
  },
  en: {
    title: 'Give Mokalibo', sub: '1 year of the Family Plan: 195 countries, unlimited stories and games, up to 5 children, no ads. The perfect gift for kids aged 4 to 12.',
    to: 'For (children’s names)', from: 'From', msg: 'Short message (optional)', pay: `🎁 Give · ${GIFT_PRICE}`, wait: 'One moment…',
    points: ['🎁 Gift code right after payment', '🖨️ A lovely card to print or send on WhatsApp', '📅 Valid for 3 years, activated in 1 click', '💛 5% goes to child protection'],
    err: 'The payment could not start. Please try again.', secure: '🔒 Secure payment by Stripe · one-time payment, no subscription',
    ok_title: 'Thank you! Here is your gift card 🎉', ok_sub: 'The code was also sent to your e-mail address.', code: 'Gift code',
    how: 'To activate it: go to mokalibo.com, create a free parent account, then enter the code (or open the card’s link directly).',
    print: '🖨️ Print the card', share: '📤 Send the card', copy: '📋 Copy the code', copied: '✅ Copied!', close: 'Close', pending: 'Confirming payment…',
    card_title: 'A year of journeys around the world!', card_for: 'For', card_from: 'From', card_steps: '1. Open mokalibo.com/?cadeau=CODE  2. Create a free parent account  3. Enjoy 1 year of adventures!',
    share_text: (c, to) => `🎁 ${to ? to + ', here is' : 'Here is'} your gift: 1 year of Mokalibo, the history of 195 countries told to children! Activate it here: https://mokalibo.com/?cadeau=${c} (code ${c})`,
  },
  de: {
    title: 'Mokalibo verschenken', sub: '1 Jahr Familien-Abo: 195 Länder, unbegrenzte Geschichten und Spiele, bis zu 5 Kinder, ohne Werbung. Das perfekte Geschenk für Kinder von 4 bis 12.',
    to: 'Für (Vornamen der Kinder)', from: 'Von', msg: 'Kurze Nachricht (optional)', pay: `🎁 Verschenken · ${GIFT_PRICE}`, wait: 'Einen Moment…',
    points: ['🎁 Geschenkcode sofort nach der Zahlung', '🖨️ Schöne Karte zum Ausdrucken oder per WhatsApp', '📅 3 Jahre gültig, mit 1 Klick aktiviert', '💛 5 % gehen an den Kinderschutz'],
    err: 'Die Zahlung konnte nicht starten. Bitte erneut versuchen.', secure: '🔒 Sichere Zahlung mit Stripe · Einmalzahlung, kein Abo',
    ok_title: 'Danke! Hier ist deine Geschenkkarte 🎉', ok_sub: 'Der Code wurde auch an deine E-Mail-Adresse geschickt.', code: 'Geschenkcode',
    how: 'Zum Aktivieren: mokalibo.com öffnen, ein kostenloses Elternkonto anlegen und den Code eingeben (oder direkt den Link der Karte öffnen).',
    print: '🖨️ Karte drucken', share: '📤 Karte senden', copy: '📋 Code kopieren', copied: '✅ Kopiert!', close: 'Schließen', pending: 'Zahlung wird bestätigt…',
    card_title: 'Ein Jahr Reisen um die Welt!', card_for: 'Für', card_from: 'Von', card_steps: '1. mokalibo.com/?cadeau=CODE öffnen  2. Kostenloses Elternkonto anlegen  3. 1 Jahr Abenteuer!',
    share_text: (c, to) => `🎁 ${to ? to + ', hier ist' : 'Hier ist'} dein Geschenk: 1 Jahr Mokalibo, die Geschichte aller 195 Länder für Kinder! Hier aktivieren: https://mokalibo.com/?cadeau=${c} (Code ${c})`,
  },
}
export const openGift = () => window.dispatchEvent(new CustomEvent('mokalibo:gift'))
// Lien de la carte cadeau (?cadeau=CODE) : on garde le code jusqu'a la connexion
const PENDING = 'kidroots_gift_code'
export function capturePendingGift() {
  try {
    const c = new URLSearchParams(location.search).get('cadeau')
    if (c) {
      localStorage.setItem(PENDING, c)
      const u = new URL(location.href); u.searchParams.delete('cadeau'); history.replaceState({}, '', u.pathname + u.search + u.hash)
    }
  } catch { /* stockage indisponible */ }
}
export const pendingGift = () => { try { return localStorage.getItem(PENDING) } catch { return null } }
export const clearPendingGift = () => { try { localStorage.removeItem(PENDING) } catch { /* rien */ } }
capturePendingGift()
const esc = (s) => String(s || '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))

// Carte a imprimer (nouvelle fenetre)
function printCard(T, g) {
  const w = window.open('', '_blank')
  if (!w) return
  w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>Mokalibo</title>
<style>@page{size:A5 landscape;margin:0}body{margin:0;font-family:Nunito,Arial,sans-serif;color:#1A2A4F}
.c{width:210mm;height:148mm;box-sizing:border-box;padding:12mm 14mm;background:linear-gradient(135deg,#FFF3C4,#FFD7A8 55%,#BFE3FF);position:relative;overflow:hidden}
.logo{font-weight:900;font-size:34pt}.o{color:#FF6F00}.b{color:#1E88E5}h1{font-size:20pt;margin:3mm 0 5mm}
.who{font-size:13pt;font-weight:800;margin:1mm 0}.msg{font-size:13pt;font-style:italic;margin:4mm 0;max-width:150mm}
.code{display:inline-block;background:#fff;border:3px dashed #FF6F00;border-radius:12px;padding:4mm 7mm;font-size:22pt;font-weight:900;letter-spacing:2px;margin:3mm 0}
.steps{font-size:10.5pt;font-weight:700;color:#37474F;margin-top:4mm}.g{position:absolute;right:12mm;top:10mm;font-size:70pt}.h{position:absolute;right:14mm;bottom:9mm;font-size:10pt;font-weight:800;color:#D81B60}</style></head>
<body><div class="c"><div class="g">🌍</div><div class="logo"><span class="o">Moka</span><span class="b">libo</span></div>
<h1>🎁 ${esc(T.card_title)}</h1>${g.to ? `<div class="who">${esc(T.card_for)} : ${esc(g.to)}</div>` : ''}${g.from ? `<div class="who">${esc(T.card_from)} : ${esc(g.from)}</div>` : ''}
${g.message ? `<div class="msg">« ${esc(g.message)} »</div>` : ''}<div class="code">${esc(g.code)}</div>
<div class="steps">${esc(T.card_steps.replace('CODE', g.code))}</div><div class="h">💛 Apprendre le monde, protéger les enfants</div></div>
<script>setTimeout(()=>print(),400)</script></body></html>`)
  w.document.close()
}

// Hote global : formulaire d'achat (openGift) + page de succes (?cadeau_achat=cs_...)
export default function Gift() {
  const [open, setOpen] = useState(false)
  const [f, setF] = useState({ to: '', from: '', message: '' })
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const [done, setDone] = useState(null) // { code, to, from, message } | 'pending'
  const [copied, setCopied] = useState(false)
  const T = TXT[getLang()] || TXT.en

  useEffect(() => {
    const on = () => { setErr(''); setOpen(true) }
    window.addEventListener('mokalibo:gift', on)
    // Retour de Stripe apres l'achat
    const sid = new URLSearchParams(location.search).get('cadeau_achat')
    if (sid) {
      history.replaceState({}, '', location.pathname)
      setDone('pending')
      let tries = 0
      const poll = () => giftStatus(sid).then((g) => {
        if (g.code) setDone(g)
        else if (tries++ < 8) setTimeout(poll, 1500)
      }).catch(() => { if (tries++ < 8) setTimeout(poll, 1500) })
      poll()
    }
    return () => window.removeEventListener('mokalibo:gift', on)
  }, [])

  const pay = async (e) => {
    e.preventDefault(); setBusy(true); setErr('')
    try { await startGiftCheckout(f, auth.currentUser) } catch { setErr(T.err); setBusy(false) }
  }
  const input = { width: '100%', boxSizing: 'border-box', padding: '12px 14px', borderRadius: 14, border: '2px solid #FFE0B2', background: 'white', color: INK, fontSize: 16, fontFamily: 'inherit', fontWeight: 700, outline: 'none' }
  const sheet = (children, onClose) => (
    <div onClick={onClose} className="sheet-backdrop" style={{ position: 'fixed', inset: 0, background: 'rgba(26,42,79,0.55)', zIndex: 730, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div onClick={(e) => e.stopPropagation()} className="anim-slide-up sheet"
        style={{ width: '100%', maxWidth: 440, borderRadius: '28px 28px 0 0', padding: '20px 18px 26px', background: 'linear-gradient(180deg,#FFF8E7,#FFFFFF)', fontFamily: 'Nunito, sans-serif', color: INK }}>
        {children}
      </div>
    </div>
  )

  if (done) {
    if (done === 'pending') return sheet(<div style={{ textAlign: 'center', padding: 30, fontWeight: 900 }}>⏳ {T.pending}</div>)
    const share = async () => {
      const text = T.share_text(done.code, done.to)
      try { if (navigator.share) await navigator.share({ text }); else window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank') } catch { /* annule */ }
    }
    const copy = async () => { try { await navigator.clipboard.writeText(done.code); setCopied(true); setTimeout(() => setCopied(false), 2000) } catch { /* indisponible */ } }
    const btn = (bg, color) => ({ width: '100%', border: 'none', borderRadius: 16, padding: '13px', fontSize: 16, fontWeight: 900, fontFamily: 'inherit', cursor: 'pointer', background: bg, color, marginTop: 8 })
    return sheet(
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 56 }}>🎁</div>
        <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 24, fontWeight: 700, margin: '4px 0' }}>{T.ok_title}</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#607D8B', marginBottom: 12 }}>{T.ok_sub}</div>
        <div style={{ fontSize: 12, fontWeight: 900, color: '#E65100', textTransform: 'uppercase', letterSpacing: 1 }}>{T.code}</div>
        <div style={{ display: 'inline-block', background: 'white', border: '3px dashed #FF6F00', borderRadius: 14, padding: '10px 18px', fontSize: 26, fontWeight: 900, letterSpacing: 2, margin: '4px 0 10px' }}>{done.code}</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#455A64', lineHeight: 1.5, marginBottom: 6 }}>{T.how}</div>
        <button onClick={share} style={btn('linear-gradient(180deg,#43C27A,#2E9E5B)', 'white')}>{T.share}</button>
        <button onClick={() => printCard(T, done)} style={btn('#E3F2FD', '#1565C0')}>{T.print}</button>
        <button onClick={copy} style={btn('#FFF3E0', '#E65100')}>{copied ? T.copied : T.copy}</button>
        <button onClick={() => setDone(null)} style={{ ...btn('none', '#78909C'), fontSize: 14 }}>{T.close}</button>
      </div>,
    )
  }
  if (!open) return null
  return sheet(
    <form onSubmit={pay} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ flex: 1, fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 25, fontWeight: 700 }}>🎁 {T.title}</div>
        <button type="button" className="btn-kid" onClick={() => setOpen(false)} aria-label={T.close} style={{ background: '#FFE0B2', color: '#E65100', width: 36, height: 36, borderRadius: '50%' }}>✕</button>
      </div>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#546E7A', lineHeight: 1.5 }}>{T.sub}</div>
      <div style={{ background: 'white', borderRadius: 16, padding: '8px 12px' }}>
        {T.points.map((p) => <div key={p} style={{ fontSize: 14, fontWeight: 800, padding: '3px 0' }}>{p}</div>)}
      </div>
      <input maxLength={60} placeholder={T.to} value={f.to} onChange={(e) => setF({ ...f, to: e.target.value })} style={input} />
      <input maxLength={60} placeholder={T.from} value={f.from} onChange={(e) => setF({ ...f, from: e.target.value })} style={input} />
      <textarea maxLength={300} rows={2} placeholder={T.msg} value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} style={{ ...input, resize: 'vertical' }} />
      <button type="submit" className="btn-kid soft" disabled={busy}
        style={{ background: 'linear-gradient(180deg,#FF9A1F,#FF6F00)', color: 'white', padding: '16px', fontSize: 19, borderRadius: 22, boxShadow: '0 6px 0 #C75000', opacity: busy ? 0.6 : 1 }}>{busy ? T.wait : T.pay}</button>
      {err && <div style={{ textAlign: 'center', fontSize: 13, fontWeight: 800, color: '#C62828' }}>{err}</div>}
      <div style={{ textAlign: 'center', fontSize: 12, fontWeight: 700, color: '#78909C' }}>{T.secure} · <a href="/agb" target="_blank" rel="noopener" style={{ color: 'inherit' }}>AGB</a></div>
    </form>,
    () => setOpen(false),
  )
}

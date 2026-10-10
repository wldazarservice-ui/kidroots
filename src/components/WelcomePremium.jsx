import { useEffect, useState } from 'react'
import { getLang } from '../i18n'

const INK = '#1A2A4F'
const TXT = {
  fr: {
    title: (pro) => `Bienvenue dans la ${pro ? 'Formule Enseignant' : 'Formule Famille'} !`,
    thanks: 'Merci pour ta confiance 💛 Grâce à toi, Mokalibo grandit, et 5 % de ton abonnement vont à la protection de l’enfance.',
    unlocked: 'Ce qui est débloqué dès maintenant :',
    items: (pro) => ['📚 Histoires illimitées dans les 195 pays', '🎮 Jeux illimités', pro ? '🧒 Jusqu’à 35 élèves et 5 appareils' : '👧 Jusqu’à 5 enfants et 5 appareils', '🦉 Les 3 niveaux, du petit au grand explorateur', '🚫 Toujours sans publicité'],
    trial: (d) => `🎁 Ton essai gratuit dure jusqu’au ${d}. Aucun prélèvement avant cette date.`,
    paid: 'Ton reçu arrive par e-mail.',
    easy: 'Tout se gère en 2 clics dans 👤 Mon compte → Mon abonnement (carte, factures, résiliation).',
    tip: 'Astuce : crée un profil pour chaque enfant, chacun garde sa progression et son passeport.',
    go: 'C’est parti ! 🚀',
  },
  en: {
    title: (pro) => `Welcome to the ${pro ? 'Teacher Plan' : 'Family Plan'}!`,
    thanks: 'Thank you for your trust 💛 Thanks to you, Mokalibo keeps growing, and 5% of your subscription goes to child protection.',
    unlocked: 'Unlocked right now:',
    items: (pro) => ['📚 Unlimited stories in all 195 countries', '🎮 Unlimited games', pro ? '🧒 Up to 35 pupils and 5 devices' : '👧 Up to 5 children and 5 devices', '🦉 All 3 reading levels', '🚫 Always ad-free'],
    trial: (d) => `🎁 Your free trial runs until ${d}. Nothing is charged before then.`,
    paid: 'Your receipt is on its way by e-mail.',
    easy: 'Manage everything in 2 clicks in 👤 My account → My subscription (card, invoices, cancellation).',
    tip: 'Tip: create a profile for each child, so everyone keeps their own progress and passport.',
    go: 'Let’s go! 🚀',
  },
  de: {
    title: (pro) => `Willkommen im ${pro ? 'Lehrer-Abo' : 'Familien-Abo'}!`,
    thanks: 'Danke für dein Vertrauen 💛 Dank dir wächst Mokalibo, und 5 % deines Abos gehen an den Kinderschutz.',
    unlocked: 'Ab sofort freigeschaltet:',
    items: (pro) => ['📚 Unbegrenzte Geschichten in allen 195 Ländern', '🎮 Unbegrenzte Spiele', pro ? '🧒 Bis zu 35 Schüler und 5 Geräte' : '👧 Bis zu 5 Kinder und 5 Geräte', '🦉 Alle 3 Lesestufen', '🚫 Immer ohne Werbung'],
    trial: (d) => `🎁 Dein kostenloser Test läuft bis zum ${d}. Vorher wird nichts abgebucht.`,
    paid: 'Deine Quittung kommt per E-Mail.',
    easy: 'Alles mit 2 Klicks unter 👤 Mein Konto → Mein Abo (Karte, Rechnungen, Kündigung).',
    tip: 'Tipp: Lege für jedes Kind ein Profil an, so behält jedes seinen Fortschritt und Reisepass.',
    go: 'Los geht’s! 🚀',
  },
}
const CONF = ['🎉', '⭐', '🌍', '✨', '🎈', '💛', '🎊']

// Ecran de bienvenue apres un achat (ouvert par l'evenement mokalibo:welcome)
export default function WelcomePremium() {
  const [info, setInfo] = useState(null)
  useEffect(() => {
    const on = (e) => setInfo(e.detail || {})
    window.addEventListener('mokalibo:welcome', on)
    return () => window.removeEventListener('mokalibo:welcome', on)
  }, [])
  if (!info) return null
  const lang = getLang()
  const T = TXT[lang] || TXT.en
  const pro = info.tier === 'teacher'
  const date = info.until ? new Date(info.until).toLocaleDateString(lang === 'de' ? 'de-DE' : lang === 'en' ? 'en-GB' : 'fr-FR', { day: 'numeric', month: 'long' }) : ''

  return (
    <div className="sheet-backdrop" style={{ position: 'fixed', inset: 0, background: 'rgba(26,42,79,0.55)', zIndex: 740, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, overflow: 'hidden' }}>
      <style>{`@keyframes mk-fall{0%{transform:translateY(-12vh) rotate(0)}100%{transform:translateY(112vh) rotate(540deg)}}`}</style>
      {Array.from({ length: 22 }, (_, i) => (
        <span key={i} aria-hidden style={{ position: 'absolute', top: 0, left: `${(i * 37) % 100}%`, fontSize: 18 + (i % 4) * 6, animation: `mk-fall ${3.2 + (i % 5) * 0.6}s linear ${(i % 7) * 0.35}s 2 both`, pointerEvents: 'none' }}>{CONF[i % CONF.length]}</span>
      ))}
      <div className="anim-slide-up" style={{ position: 'relative', width: '100%', maxWidth: 420, maxHeight: '92dvh', overflowY: 'auto', background: 'white', borderRadius: 28, padding: '24px 20px 20px', fontFamily: 'Nunito, sans-serif', color: INK, boxShadow: '0 24px 60px rgba(0,0,0,0.3)', textAlign: 'center' }}>
        <div className="float" style={{ fontSize: 64, lineHeight: 1 }}>🎉</div>
        <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 26, fontWeight: 700, lineHeight: 1.15, margin: '10px 0 8px' }}>{T.title(pro)}</div>
        <div style={{ fontSize: 14, fontWeight: 800, color: '#D81B60', lineHeight: 1.5, marginBottom: 14 }}>{T.thanks}</div>
        <div style={{ background: '#F1F8F2', borderRadius: 18, padding: '12px 14px', textAlign: 'left', marginBottom: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 900, color: '#2E7D4F', marginBottom: 6 }}>{T.unlocked}</div>
          {T.items(pro).map((it) => <div key={it} style={{ fontSize: 15, fontWeight: 800, padding: '3px 0' }}>{it}</div>)}
        </div>
        <div style={{ fontSize: 14, fontWeight: 800, color: '#37474F', lineHeight: 1.5, textAlign: 'left' }}>
          <div style={{ marginBottom: 6 }}>{info.trialing && date ? T.trial(date) : T.paid}</div>
          <div style={{ marginBottom: 6 }}>✅ {T.easy}</div>
          <div style={{ color: '#607D8B' }}>💡 {T.tip}</div>
        </div>
        <button className="btn-kid soft" onClick={() => setInfo(null)}
          style={{ width: '100%', marginTop: 16, background: 'linear-gradient(180deg,#FFE04D,#FFC400)', color: INK, padding: '16px', fontSize: 19, borderRadius: 22, boxShadow: '0 6px 0 #E6A100' }}>{T.go}</button>
      </div>
    </div>
  )
}

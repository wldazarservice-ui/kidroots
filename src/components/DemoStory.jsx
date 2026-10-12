import { useState } from 'react'
import { COUNTRIES } from '../data/countries'
import { countryName } from '../names'
import { useTranslatedObj } from '../useTranslated'
import { track } from '../track'
import SpeakButton from './SpeakButton'

const INK = '#1A2A4F'
const TXT = {
  fr: { kicker: 'Essaie maintenant', title: 'Une vraie histoire de Mokalibo', sub: 'Touche 🔊 pour l’écouter, comme le ferait ton enfant.', fact: 'Le savais-tu ? Touche pour découvrir', next: 'Carte suivante →', end_t: 'Il reste plus de 3 500 histoires à découvrir !', end_s: '195 pays, des quiz, des jeux et un passeport à tamponner. Gratuit, sans carte bancaire.', cta: '▶ Continuer l’aventure gratuitement', again: '↺ Revoir les cartes' },
  en: { kicker: 'Try it now', title: 'A real Mokalibo story', sub: 'Tap 🔊 to listen, just like your child would.', fact: 'Did you know? Tap to find out', next: 'Next card →', end_t: 'More than 3,500 stories are waiting!', end_s: '195 countries, quizzes, games and a passport to stamp. Free, no card needed.', cta: '▶ Continue the adventure for free', again: '↺ See the cards again' },
  de: { kicker: 'Jetzt ausprobieren', title: 'Eine echte Mokalibo-Geschichte', sub: 'Tippe auf 🔊 zum Anhören – genau wie dein Kind.', fact: 'Wusstest du? Tippen zum Entdecken', next: 'Nächste Karte →', end_t: 'Über 3.500 Geschichten warten!', end_s: '195 Länder, Quiz, Spiele und ein Reisepass zum Stempeln. Kostenlos, ohne Karte.', cta: '▶ Kostenlos weiterspielen', again: '↺ Karten noch einmal' },
}
// Deux cartes du Japon : les samourais, puis les jeux video
const RAW = [COUNTRIES.JP?.chapters?.[1]?.cards?.[0], COUNTRIES.JP?.chapters?.[3]?.cards?.[1]].filter(Boolean)

// Apercu interactif sur la page d'accueil : on goute une histoire avant de creer son compte
export default function DemoStory({ lang, onSignup }) {
  const T = TXT[lang] || TXT.en
  const cards = useTranslatedObj(RAW, lang)
  const [i, setI] = useState(0)
  const [fact, setFact] = useState(false)
  const [started, setStarted] = useState(false)
  const start = () => { if (!started) { setStarted(true); track('demo_open', { once: true }) } }
  const card = cards[i]
  const color = '#C62828'

  return (
    <section style={{ padding: '30px 16px 40px', background: 'linear-gradient(180deg,#FFFDF7,#FFF3E0)' }}>
      <div style={{ maxWidth: 520, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: 13, fontWeight: 900, color: '#E65100', letterSpacing: 1, textTransform: 'uppercase' }}>👇 {T.kicker}</div>
        <h2 style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 28, fontWeight: 700, color: INK, margin: '4px 0 4px' }}>{T.title}</h2>
        <div style={{ fontSize: 14, fontWeight: 800, color: '#607D8B', marginBottom: 14 }}>{T.sub}</div>

        {card ? (
          <div key={i} className="anim-card-flip" onPointerDown={start}
            style={{ background: 'white', borderRadius: 26, padding: '20px 18px', border: `4px solid ${color}`, boxShadow: '0 10px 28px rgba(198,40,40,0.15)', textAlign: 'center' }}>
            <div style={{ fontSize: 13, fontWeight: 900, color, marginBottom: 6 }}>{COUNTRIES.JP.flag} {countryName('JP', lang)} · {i + 1} / {cards.length}</div>
            <div style={{ fontSize: 56, lineHeight: 1, marginBottom: 8 }}>{card.emoji}</div>
            <div style={{ fontSize: 21, fontWeight: 900, color, marginBottom: 10 }}>{card.title}</div>
            <div style={{ fontSize: 15.5, fontWeight: 700, color: '#263238', lineHeight: 1.65, textAlign: 'left', marginBottom: 12 }}>{card.text}</div>
            {fact
              ? <div style={{ background: '#FFEBEE', borderRadius: 14, padding: '10px 12px', display: 'flex', gap: 8, textAlign: 'left', marginBottom: 12 }}><span>💡</span><span style={{ fontSize: 14, fontWeight: 900, color }}>{card.fact}</span></div>
              : <button type="button" onClick={() => { start(); setFact(true) }} style={{ width: '100%', border: `3px dashed ${color}`, background: '#FFEBEE', color, borderRadius: 14, padding: '10px', fontWeight: 900, fontSize: 14, fontFamily: 'inherit', cursor: 'pointer', marginBottom: 12 }}>💡 {T.fact}</button>}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
              <span onClick={start}><SpeakButton key={`demo-${i}`} text={[card.title, card.text]} lang={lang} color={color} size={50} /></span>
              <button type="button" onClick={() => { start(); setFact(false); setI(i + 1) }}
                style={{ border: 'none', background: color, color: 'white', borderRadius: 16, padding: '13px 18px', fontWeight: 900, fontSize: 15, fontFamily: 'inherit', cursor: 'pointer' }}>{T.next}</button>
            </div>
          </div>
        ) : (
          <div className="anim-slide-up" style={{ background: 'linear-gradient(160deg,#FF9A1F,#FF6F00)', color: 'white', borderRadius: 26, padding: '26px 20px', boxShadow: '0 12px 30px rgba(255,111,0,0.3)' }}>
            <div style={{ fontSize: 50 }}>🌍</div>
            <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 24, fontWeight: 700, margin: '6px 0' }}>{T.end_t}</div>
            <div style={{ fontSize: 15, fontWeight: 800, opacity: 0.95, marginBottom: 16, lineHeight: 1.5 }}>{T.end_s}</div>
            <button className="btn-kid soft anim-glow" onClick={() => { track('demo_cta'); onSignup() }}
              style={{ width: '100%', background: 'linear-gradient(180deg,#FFE04D,#FFC400)', color: INK, padding: '16px', fontSize: 18, borderRadius: 22, boxShadow: '0 6px 0 #E6A100' }}>{T.cta}</button>
            <button type="button" onClick={() => { setI(0); setFact(false) }} style={{ marginTop: 10, background: 'none', border: 'none', color: 'white', fontWeight: 800, fontFamily: 'inherit', cursor: 'pointer', textDecoration: 'underline' }}>{T.again}</button>
          </div>
        )}
      </div>
    </section>
  )
}

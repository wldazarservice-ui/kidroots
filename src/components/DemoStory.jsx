import { useEffect, useState } from 'react'
import { COUNTRIES } from '../data/countries'
import { loadWorld } from '../data/world/load'
import { countryName } from '../names'
import { useTranslatedObj } from '../useTranslated'
import { ttsAvailable, ttsSpeak, ttsStop } from '../tts'
import { track } from '../track'

const INK = '#1A2A4F'
const TXT = {
  fr: { kicker: 'Essaie maintenant', title: 'Une vraie histoire de Mokalibo', sub: 'Choisis un pays, puis touche ▶ pour écouter, comme le ferait ton enfant.', listen: '▶ Écouter', stop: '⏸ Pause', fact: 'Le savais-tu ? Touche pour découvrir', next: 'Histoire suivante →', end_t: 'Il reste plus de 3 500 histoires à découvrir !', end_s: '195 pays, des quiz, des jeux et un passeport à tamponner. 30 chapitres gratuits pour commencer, et les jeux en illimité.', cta: '▶ Continuer l’aventure', again: '↺ Choisir un autre pays' },
  en: { kicker: 'Try it now', title: 'A real Mokalibo story', sub: 'Pick a country, then tap ▶ to listen, just like your child would.', listen: '▶ Listen', stop: '⏸ Pause', fact: 'Did you know? Tap to find out', next: 'Next story →', end_t: 'More than 3,500 stories are waiting!', end_s: '195 countries, quizzes, games and a passport to stamp. 30 free chapters to start, and unlimited games.', cta: '▶ Continue the adventure', again: '↺ Pick another country' },
  de: { kicker: 'Jetzt ausprobieren', title: 'Eine echte Mokalibo-Geschichte', sub: 'Wähle ein Land und tippe auf ▶ zum Anhören – genau wie dein Kind.', listen: '▶ Anhören', stop: '⏸ Pause', fact: 'Wusstest du? Tippen zum Entdecken', next: 'Nächste Geschichte →', end_t: 'Über 3.500 Geschichten warten!', end_s: '195 Länder, Quiz, Spiele und ein Reisepass zum Stempeln. 30 kostenlose Kapitel zum Start und unbegrenzte Spiele.', cta: '▶ Weiter mit dem Abenteuer', again: '↺ Anderes Land wählen' },
  pt: { kicker: 'Experimenta agora', title: 'Uma verdadeira história Mokalibo', sub: 'Escolhe um país e toca em ▶ para ouvir, como o teu filho faria.', listen: '▶ Ouvir', stop: '⏸ Pausa', fact: 'Sabias que? Toca para descobrir', next: 'História seguinte →', end_t: 'Há mais de 3 500 histórias à tua espera!', end_s: '195 países, quizzes, jogos e um passaporte para carimbar. 30 capítulos grátis para começar, e jogos ilimitados.', cta: '▶ Continuar a aventura', again: '↺ Escolher outro país' },
  ar: { kicker: 'جرّب الآن', title: 'قصة حقيقية من Mokalibo', sub: 'اختر دولة ثم المس ▶ للاستماع، كما سيفعل طفلك.', listen: '▶ استمع', stop: '⏸ إيقاف', fact: 'هل تعلم؟ المس للاكتشاف', next: '← القصة التالية', end_t: 'أكثر من 3500 قصة في انتظارك!', end_s: '195 دولة، واختبارات، وألعاب، وجواز سفر للختم. 30 فصلًا مجانيًا للبداية، وألعاب بلا حدود.', cta: '▶ تابع المغامرة', again: '↺ اختر دولة أخرى' },
}

// Trois histoires d'un chapitre refait par pays (chargees a la demande depuis src/data/world/XX.js)
const PICKS = [['JP', 'jp_samurai'], ['EG', 'eg_pharaohs'], ['BR', 'br_indigenous'], ['FR', 'fr_medieval']]
const N = 3

// Le bouton « Écouter une histoire » du haut de la page lance la lecture tout de suite (mokalibo:demo-play)
export const playDemo = () => window.dispatchEvent(new CustomEvent('mokalibo:demo-play'))

// Apercu interactif sur la page d'accueil : on goute une vraie histoire avant de creer son compte
export default function DemoStory({ lang, onSignup }) {
  const T = TXT[lang] || (lang === 'bm' ? TXT.fr : TXT.en)
  const [code, setCode] = useState('JP')
  const [raw, setRaw] = useState({}) // { JP: [cartes] }
  const [i, setI] = useState(0)
  const [fact, setFact] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const [pendingPlay, setPendingPlay] = useState(false)
  const cards = useTranslatedObj(raw[code] || null, lang)
  const card = cards?.[i]
  const c = COUNTRIES[code]
  const color = c?.color || '#C62828'

  // Charge les histoires du pays choisi (le Japon est prechargé pour que ▶ reponde tout de suite)
  useEffect(() => {
    if (raw[code]) return
    const id = PICKS.find((p) => p[0] === code)?.[1]
    loadWorld(code).then((d) => {
      const ch = d?.chapters.find((x) => x.id === id) || d?.chapters[0]
      if (ch) setRaw((r) => ({ ...r, [code]: ch.cards.slice(0, N) }))
    }).catch(() => {})
  }, [code, raw])

  const speak = (k = card) => {
    if (!k || !ttsAvailable()) return
    track('demo_listen', { once: true })
    setSpeaking(true)
    ttsSpeak([k.title, k.text].join('. '), { lang, onEnd: () => setSpeaking(false), onError: () => setSpeaking(false) })
  }
  const stop = () => { ttsStop(); setSpeaking(false) }
  const open = () => track('demo_open', { once: true })

  // Clic sur « Écouter une histoire » en haut de page : on descend et on lit la 1re histoire
  useEffect(() => {
    const go = () => {
      open()
      document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      if (card) speak(card); else setPendingPlay(true)
    }
    window.addEventListener('mokalibo:demo-play', go)
    return () => window.removeEventListener('mokalibo:demo-play', go)
  })
  useEffect(() => { if (pendingPlay && card) { setPendingPlay(false); speak(card) } }, [pendingPlay, card]) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => () => ttsStop(), [])

  const choose = (k) => { open(); stop(); setCode(k); setI(0); setFact(false) }
  const next = () => { open(); stop(); setFact(false); setI(i + 1) }

  return (
    <section id="demo" style={{ scrollMarginTop: 70, padding: '30px 16px 40px', background: 'linear-gradient(180deg,#FFFDF7,#FFF3E0)' }}>
      <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: 13, fontWeight: 900, color: '#E65100', letterSpacing: 1, textTransform: 'uppercase' }}>👇 {T.kicker}</div>
        <h2 style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 28, fontWeight: 700, color: INK, margin: '4px 0 4px' }}>{T.title}</h2>
        <div style={{ fontSize: 14, fontWeight: 800, color: '#607D8B', marginBottom: 14 }}>{T.sub}</div>

        {/* Choix du pays : 4 grands drapeaux */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 14 }}>
          {PICKS.map(([k]) => (
            <button key={k} type="button" onClick={() => choose(k)} aria-pressed={k === code} aria-label={countryName(k, lang)}
              style={{ width: 64, height: 64, borderRadius: 20, fontSize: 34, cursor: 'pointer', fontFamily: 'inherit', background: k === code ? 'white' : 'rgba(255,255,255,0.6)', border: `3px solid ${k === code ? COUNTRIES[k].color : 'transparent'}`, boxShadow: k === code ? '0 6px 16px rgba(26,42,79,0.15)' : 'none', transform: k === code ? 'scale(1.08)' : 'none', transition: 'transform .15s' }}>
              {COUNTRIES[k].flag}
            </button>
          ))}
        </div>

        {!cards ? (
          <div style={{ background: 'white', borderRadius: 26, padding: 40, fontSize: 40 }} aria-busy="true">{c?.flag}</div>
        ) : card ? (
          <div key={code + i} className="anim-card-flip" onPointerDown={open}
            style={{ background: 'white', borderRadius: 26, padding: '20px 18px', border: `4px solid ${color}`, boxShadow: '0 10px 28px rgba(26,42,79,0.15)', textAlign: 'center' }}>
            <div style={{ fontSize: 13, fontWeight: 900, color, marginBottom: 6 }}>{c.flag} {countryName(code, lang)} · {i + 1} / {cards.length}{card.date ? ` · 📅 ${card.date}` : ''}</div>
            <div style={{ fontSize: 56, lineHeight: 1, marginBottom: 8 }}>{card.emoji}</div>
            <div style={{ fontSize: 21, fontWeight: 900, color, marginBottom: 10 }}>{card.title}</div>
            <div style={{ fontSize: 15.5, fontWeight: 700, color: '#263238', lineHeight: 1.65, textAlign: 'left', marginBottom: 12 }}>{card.text}</div>
            {fact
              ? <div style={{ background: '#FFF8E1', borderRadius: 14, padding: '10px 12px', display: 'flex', gap: 8, textAlign: 'left', marginBottom: 12 }}><span>💡</span><span style={{ fontSize: 14, fontWeight: 900, color: INK, lineHeight: 1.5 }}>{card.fact}</span></div>
              : <button type="button" onClick={() => { open(); setFact(true) }} style={{ width: '100%', border: `3px dashed ${color}`, background: '#FFFDF5', color, borderRadius: 14, padding: '10px', fontWeight: 900, fontFamily: 'inherit', cursor: 'pointer', marginBottom: 12 }}>💡 {T.fact}</button>}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
              {ttsAvailable() && (
                <button type="button" onClick={() => (speaking ? stop() : speak())} className={speaking ? '' : 'anim-glow'}
                  style={{ border: 'none', background: speaking ? '#ECEFF1' : 'linear-gradient(180deg,#FFE04D,#FFC400)', color: INK, borderRadius: 16, padding: '13px 20px', fontWeight: 900, fontSize: 16, fontFamily: 'inherit', cursor: 'pointer', boxShadow: speaking ? 'none' : '0 4px 0 #E6A100' }}>
                  {speaking ? T.stop : T.listen}
                </button>
              )}
              <button type="button" onClick={next}
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

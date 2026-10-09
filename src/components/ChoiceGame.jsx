import { useMemo, useState } from 'react'
import { t } from '../i18n'
import { COUNTRIES } from '../data/countries'
import { DISCOVER } from '../data/discover'
import { shuffle } from '../explore'
import { countryName } from '../names'
import { TText } from '../useTranslated'
import SpeakButton from './SpeakButton'
import ExploreHeader from './ExploreHeader'
import GameEnd from './GameEnd'

const INK = '#1A2A4F'
const ROUNDS = 8

// Deux jeux à choix multiples : « Qui habite où ? » (animaux) et « Énigmes des monuments »
export default function ChoiceGame({ onRound, lang, kind, onBack, onFinish }) {
  const isAnimal = kind === 'animals'
  const [game, setGame] = useState(0)
  const rounds = useMemo(() => {
    const pool = Object.keys(COUNTRIES).filter((c) => DISCOVER[c])
    return shuffle(pool).slice(0, ROUNDS).map((code) => ({
      code,
      options: shuffle([code, ...shuffle(pool.filter((c) => c !== code)).slice(0, 2)]),
    }))
  }, [game])
  const [i, setI] = useState(0)
  const [answer, setAnswer] = useState(null)
  const [stars, setStars] = useState(0)

  const r = rounds[i]
  const d = r && DISCOVER[r.code]
  const choose = (code) => {
    if (answer) return
    setAnswer(code)
    if (code === r.code) setStars((s) => s + 1)
  }
  const next = () => { setI((n) => n + 1); setAnswer(null) }
  const again = () => { setGame((g) => g + 1); setI(0); setAnswer(null); setStars(0) }

  return (
    <div className="home-sky screen-narrow" style={{ minHeight: '100vh', fontFamily: 'Nunito, sans-serif', paddingBottom: 30 }}>
      <ExploreHeader lang={lang} emoji={isAnimal ? '🦊' : '🏛️'} title={t(lang, isAnimal ? 'ani_title' : 'rid_title')} sub={t(lang, isAnimal ? 'ani_desc' : 'rid_desc')} onBack={onBack}
        right={<span style={{ background: 'white', borderRadius: 999, padding: '7px 14px', fontWeight: 900, color: '#FF8F00' }}>⭐ {stars}</span>} />
      {i >= ROUNDS ? (
        <GameEnd lang={lang} stars={stars} max={ROUNDS} onAgain={() => { if (!onRound || onRound()) again() }} onBack={onBack} onSave={() => onFinish(kind, stars)} />
      ) : d && (
        <div style={{ padding: '8px 16px' }}>
          <div style={{ fontSize: 12, fontWeight: 900, color: '#90A4AE', marginBottom: 6 }}>{t(lang, 'round', { n: String(i + 1), t: String(ROUNDS) })}</div>
          <div key={i} className="anim-slide-up" style={{ background: 'white', borderRadius: 24, padding: '18px 16px', textAlign: 'center', boxShadow: '0 8px 22px rgba(26,42,79,0.1)', marginBottom: 14 }}>
            <div style={{ fontSize: 70, lineHeight: 1.1 }}>{isAnimal ? d.animal.emoji : '❓'}</div>
            {isAnimal ? (
              <>
                <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 24, fontWeight: 700, color: INK, marginTop: 6 }}><TText text={d.animal.name} lang={lang} /></div>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#78909C' }}>🏞️ <TText text={d.animal.habitat} lang={lang} /></div>
                <div style={{ fontSize: 16, fontWeight: 900, color: '#1E88E5', marginTop: 10 }}>{t(lang, 'ani_q')}</div>
              </>
            ) : (
              <>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#37474F', lineHeight: 1.6, marginTop: 8 }}>« <TText text={d.monument.riddle} lang={lang} /> »</div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}><SpeakButton text={[d.monument.riddle]} lang={lang} color="#7B1FA2" size={40} /></div>
                <div style={{ fontSize: 16, fontWeight: 900, color: '#7B1FA2', marginTop: 6 }}>{t(lang, 'rid_q')}</div>
              </>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {r.options.map((code) => {
              const o = DISCOVER[code]
              const isRight = answer && code === r.code
              const isWrong = answer === code && code !== r.code
              return (
                <button key={code} onClick={() => choose(code)} className={`btn-kid soft ${isRight ? 'anim-correct' : isWrong ? 'anim-wrong' : ''}`}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left', padding: '12px 14px', borderRadius: 18, fontSize: 16, color: INK, background: isRight ? '#E8F8EA' : isWrong ? '#FFEBEE' : 'white', border: `3px solid ${isRight ? '#43C27A' : isWrong ? '#EF5350' : 'white'}`, boxShadow: '0 4px 12px rgba(26,42,79,0.08)' }}>
                  <span style={{ fontSize: 34 }}>{isAnimal ? COUNTRIES[code].flag : o.monument.emoji}</span>
                  <span style={{ flex: 1, fontWeight: 900 }}>{isAnimal ? countryName(code, lang) : <TText text={o.monument.name} lang={lang} />}</span>
                  {isRight && <span style={{ fontSize: 22 }}>✅</span>}
                </button>
              )
            })}
          </div>

          {answer && (
            <div className="anim-slide-up" style={{ background: '#FFF8E1', border: '3px solid #FFE082', borderRadius: 20, padding: '12px 14px', marginTop: 14 }}>
              <div style={{ fontSize: 14, fontWeight: 900, color: '#E65100', marginBottom: 4 }}>{COUNTRIES[r.code].flag} {isAnimal ? <TText text={d.animal.name} lang={lang} /> : <TText text={d.monument.name} lang={lang} />} · {countryName(r.code, lang)}</div>
              {isAnimal && <div style={{ fontSize: 14, fontWeight: 700, color: '#5D4037', lineHeight: 1.5 }}><TText text={d.animal.fact} lang={lang} /> 🌱 <TText text={d.animal.protect} lang={lang} /></div>}
              <button className="btn-kid soft" onClick={next}
                style={{ marginTop: 10, width: '100%', background: 'linear-gradient(180deg,#43C27A,#2E9E5B)', color: 'white', padding: '13px', fontSize: 16, borderRadius: 16, boxShadow: '0 4px 0 #1F7A43' }}>{t(lang, 'next')} →</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

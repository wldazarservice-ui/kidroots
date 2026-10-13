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
import { RoundDots } from './GameBits'

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
  const [results, setResults] = useState([])

  const r = rounds[i]
  const d = r && DISCOVER[r.code]
  const choose = (code) => {
    if (answer) return
    setAnswer(code)
    if (code === r.code) setStars((s) => s + 1)
    setResults((x) => { const y = [...x]; y[i] = code === r.code; return y })
  }
  const next = () => { setI((n) => n + 1); setAnswer(null) }
  const again = () => { setGame((g) => g + 1); setI(0); setAnswer(null); setStars(0); setResults([]) }

  const theme = isAnimal ? { a: '#66BB6A', b: '#2E7D32', soft: '#E8F5E9', ink: '#1B5E20' } : { a: '#BA68C8', b: '#6A1B9A', soft: '#F3E5F5', ink: '#4A148C' }
  const LETTERS = [['A', '#FF8F00'], ['B', '#1E88E5'], ['C', '#E91E63']]

  return (
    <div className="home-sky screen-wide" style={{ minHeight: '100vh', fontFamily: 'Nunito, sans-serif', paddingBottom: 30 }}>
      <ExploreHeader lang={lang} emoji={isAnimal ? '🦊' : '🏛️'} title={t(lang, isAnimal ? 'ani_title' : 'rid_title')} sub={t(lang, isAnimal ? 'ani_desc' : 'rid_desc')} onBack={onBack}
        right={<span style={{ background: 'white', borderRadius: 999, padding: '7px 14px', fontWeight: 900, color: '#FF8F00', boxShadow: '0 3px 10px rgba(26,42,79,0.12)' }}>⭐ {stars}</span>} />
      {i >= ROUNDS ? (
        <GameEnd lang={lang} stars={stars} max={ROUNDS} onAgain={() => { if (!onRound || onRound()) again() }} onBack={onBack} onSave={() => onFinish(kind, stars)} />
      ) : d && (
        <div style={{ padding: '6px 14px 0' }}>
          <RoundDots total={ROUNDS} results={results} current={i} />
          <div className="choice-layout">
            {/* Question */}
            <div key={i} className="game-card anim-slide-up" style={{ overflow: 'hidden', padding: 0 }}>
              <div style={{ background: `linear-gradient(150deg, ${theme.a}, ${theme.b})`, padding: '18px 16px 26px', textAlign: 'center', position: 'relative' }}>
                <div style={{ fontSize: 12, fontWeight: 900, color: 'rgba(255,255,255,.9)', letterSpacing: 1, textTransform: 'uppercase' }}>{t(lang, 'round', { n: String(i + 1), t: String(ROUNDS) })}</div>
                <div className="float choice-emoji">{isAnimal ? d.animal.emoji : '❓'}</div>
              </div>
              <div style={{ padding: '58px 18px 20px', textAlign: 'center' }}>
                {isAnimal ? (
                  <>
                    <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 26, fontWeight: 700, color: INK }}><TText text={d.animal.name} lang={lang} /></div>
                    <div style={{ display: 'inline-block', marginTop: 6, background: theme.soft, color: theme.ink, borderRadius: 999, padding: '4px 12px', fontSize: 13, fontWeight: 900 }}>🏞️ <TText text={d.animal.habitat} lang={lang} /></div>
                    <div style={{ fontSize: 18, fontWeight: 900, color: theme.b, marginTop: 12 }}>{t(lang, 'ani_q')}</div>
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: 17, fontWeight: 800, color: '#37474F', lineHeight: 1.6, background: theme.soft, borderRadius: 18, padding: '12px 14px' }}>« <TText text={d.monument.riddle} lang={lang} /> »</div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}><SpeakButton text={[d.monument.riddle]} lang={lang} color={theme.b} size={44} /></div>
                    <div style={{ fontSize: 18, fontWeight: 900, color: theme.b, marginTop: 8 }}>{t(lang, 'rid_q')}</div>
                  </>
                )}
              </div>
            </div>

            {/* Reponses */}
            <div className="choice-answers">
              {r.options.map((code, k) => {
                const o = DISCOVER[code]
                const isRight = answer && code === r.code
                const isWrong = answer === code && code !== r.code
                const dim = answer && !isRight && !isWrong
                return (
                  <button key={code} onClick={() => choose(code)} className={`choice-btn ${isRight ? 'is-right anim-correct' : isWrong ? 'is-wrong anim-wrong' : ''}`} style={{ opacity: dim ? 0.55 : 1 }}>
                    <span className="choice-letter" style={{ background: LETTERS[k][1] }}>{LETTERS[k][0]}</span>
                    <span className="choice-icon">{isAnimal ? COUNTRIES[code].flag : o.monument.emoji}</span>
                    <span className="choice-label">{isAnimal ? countryName(code, lang) : <TText text={o.monument.name} lang={lang} />}</span>
                    {isRight && <span className="choice-mark">✅</span>}
                    {isWrong && <span className="choice-mark">❌</span>}
                  </button>
                )
              })}

              {answer && (
                <div className="anim-slide-up" style={{ background: answer === r.code ? '#E8F8EA' : '#FFF8E1', border: `3px solid ${answer === r.code ? '#A5D6A7' : '#FFE082'}`, borderRadius: 22, padding: '12px 14px' }}>
                  <div style={{ fontSize: 16, fontWeight: 900, color: answer === r.code ? '#2E7D32' : '#E65100', marginBottom: 4 }}>{answer === r.code ? '🎉 ' : '💡 '}{COUNTRIES[r.code].flag} {isAnimal ? <TText text={d.animal.name} lang={lang} /> : <TText text={d.monument.name} lang={lang} />} · {countryName(r.code, lang)}</div>
                  {isAnimal && <div style={{ fontSize: 14, fontWeight: 700, color: '#5D4037', lineHeight: 1.5 }}><TText text={d.animal.fact} lang={lang} /> 🌱 <TText text={d.animal.protect} lang={lang} /></div>}
                  <button className="btn-kid soft" onClick={next}
                    style={{ marginTop: 10, width: '100%', background: 'linear-gradient(180deg,#43C27A,#2E9E5B)', color: 'white', padding: '14px', fontSize: 17, borderRadius: 16, boxShadow: '0 4px 0 #1F7A43' }}>{t(lang, 'next')} →</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

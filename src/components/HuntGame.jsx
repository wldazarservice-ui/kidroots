import { useMemo, useState } from 'react'
import { t } from '../i18n'
import { COUNTRIES, REGIONS } from '../data/countries'
import { shuffle } from '../explore'
import { countryName, countryWithArticle } from '../names'
import { TText } from '../useTranslated'
import WorldMap from './WorldMap'
import ExploreHeader from './ExploreHeader'
import GameEnd from './GameEnd'
import { RoundDots } from './GameBits'

const INK = '#1A2A4F'
const ROUNDS = 8
const CONTINENT_COLORS = { africa: '#FFCC80', europe: '#CE93D8', asia: '#F48FB1', americas: '#A5D6A7', oceania: '#FFF59D' }

// Chasse au trésor : retrouver un pays sur la carte (3 essais, l'indice du continent arrive après une erreur)
export default function HuntGame({ onRound, lang, onBack, onFinish }) {
  const [boxes, setBoxes] = useState(null)
  const [game, setGame] = useState(0)
  const targets = useMemo(() => {
    if (!boxes) return []
    const ok = Object.keys(COUNTRIES).filter((c) => boxes[c] && boxes[c].w * boxes[c].h > 60)
    return shuffle(ok).slice(0, ROUNDS)
  }, [boxes, game])
  const [round, setRound] = useState(0)
  const [tries, setTries] = useState(0)
  const [wrong, setWrong] = useState([])
  const [status, setStatus] = useState('play') // play | right | reveal
  const [msg, setMsg] = useState('')
  const [stars, setStars] = useState(0)
  const [results, setResults] = useState([])

  const target = targets[round]
  const done = boxes && round >= ROUNDS

  const pick = (code) => {
    if (status !== 'play' || !target) return
    if (code === target) {
      setStars((s) => s + Math.max(1, 3 - tries)); setStatus('right'); setMsg(t(lang, 'hunt_right'))
      setResults((x) => { const y = [...x]; y[round] = true; return y })
      return
    }
    const n = tries + 1
    setTries(n); setWrong((w) => [...w, code])
    setMsg(t(lang, 'hunt_wrong', { c: countryWithArticle(code, lang) }))
    if (n >= 3) { setStatus('reveal'); setMsg(t(lang, 'hunt_reveal')); setResults((x) => { const y = [...x]; y[round] = false; return y }) }
  }
  const next = () => { setRound((r) => r + 1); setTries(0); setWrong([]); setStatus('play'); setMsg('') }
  const again = () => { setGame((g) => g + 1); setRound(0); setTries(0); setWrong([]); setStatus('play'); setMsg(''); setStars(0); setResults([]) }

  // Couleurs vives par continent sur une mer bleue : les enfants reperent mieux les pays
  const fill = (code) => {
    if (status !== 'play' && code === target) return '#2E9E5B'
    if (wrong.includes(code)) return '#FF7043'
    return CONTINENT_COLORS[COUNTRIES[code]?.region] || '#ECEFF1'
  }
  const c = target && COUNTRIES[target]

  return (
    <div className="home-sky screen-wide" style={{ minHeight: '100vh', fontFamily: 'Nunito, sans-serif', paddingBottom: 30 }}>
      <ExploreHeader lang={lang} emoji="🧭" title={t(lang, 'hunt_title')} sub={t(lang, 'hunt_desc')} onBack={onBack}
        right={<span style={{ background: 'white', borderRadius: 999, padding: '7px 14px', fontWeight: 900, color: '#FF8F00' }}>⭐ {stars}</span>} />
      {done ? (
        <GameEnd lang={lang} stars={stars} max={ROUNDS * 3} onAgain={() => { if (!onRound || onRound()) again() }} onBack={onBack} onSave={() => onFinish('hunt', stars)} />
      ) : (
        <div style={{ padding: '6px 14px 0' }}>
          <RoundDots total={ROUNDS} results={results} current={round} />
          {c && (
            <div className="hunt-target">
              <span className="hunt-flag">{c.flag}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 900, color: 'rgba(255,255,255,.9)', letterSpacing: 1, textTransform: 'uppercase' }}>🧭 {t(lang, 'round', { n: String(round + 1), t: String(ROUNDS) })}</div>
                <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 24, fontWeight: 700, color: 'white', lineHeight: 1.15 }}>{t(lang, 'hunt_find')} {countryWithArticle(target, lang)}{lang === 'fr' ? '\u00a0!' : '!'}</div>
                {tries > 0 && status === 'play' && (
                  <div style={{ display: 'inline-block', marginTop: 4, background: 'rgba(255,255,255,.95)', color: '#1565C0', borderRadius: 999, padding: '3px 10px', fontSize: 13, fontWeight: 900 }}>💡 {t(lang, 'hunt_hint', { r: '' })}<TText text={REGIONS[c.region].name} lang={lang} /></div>
                )}
              </div>
              {status !== 'play' && (
                <button className="btn-kid soft anim-glow" onClick={next}
                  style={{ background: 'linear-gradient(180deg,#FFE04D,#FFC400)', color: INK, padding: '12px 18px', fontSize: 16, borderRadius: 16, boxShadow: '0 4px 0 #E6A100', flexShrink: 0 }}>{t(lang, 'next')} →</button>
              )}
            </div>
          )}
          {msg && <div className={status === 'play' ? 'anim-shake' : 'anim-pop'} key={msg + tries} style={{ textAlign: 'center', fontWeight: 900, fontSize: 17, color: status === 'right' ? '#2E9E5B' : status === 'reveal' ? '#1E88E5' : '#E65100', margin: '2px 0 8px' }}>{status === 'right' ? '🎉 ' : ''}{msg}</div>}
          <div className="game-board" style={{ padding: 8 }}>
            <WorldMap fill={fill} onPick={pick} highlight={status !== 'play' ? target : null} focus={status === 'reveal' ? target : (status === 'play' && tries === 0 ? null : undefined)}
              onBBoxes={setBoxes} sea="linear-gradient(180deg,#4FB0E6,#86CDF2)" height={Math.min(560, Math.round(window.innerHeight * 0.58))} />
          </div>
        </div>
      )}
    </div>
  )
}

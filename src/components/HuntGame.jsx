import { useMemo, useState } from 'react'
import { t } from '../i18n'
import { COUNTRIES, REGIONS } from '../data/countries'
import { shuffle } from '../explore'
import { countryName } from '../names'
import { TText } from '../useTranslated'
import WorldMap from './WorldMap'
import ExploreHeader from './ExploreHeader'
import GameEnd from './GameEnd'

const INK = '#1A2A4F'
const ROUNDS = 8

// Chasse au trésor : retrouver un pays sur la carte (3 essais, l'indice du continent arrive après une erreur)
export default function HuntGame({ lang, onBack, onFinish }) {
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

  const target = targets[round]
  const done = boxes && round >= ROUNDS

  const pick = (code) => {
    if (status !== 'play' || !target) return
    if (code === target) {
      setStars((s) => s + Math.max(1, 3 - tries)); setStatus('right'); setMsg(t(lang, 'hunt_right'))
      return
    }
    const n = tries + 1
    setTries(n); setWrong((w) => [...w, code])
    setMsg(t(lang, 'hunt_wrong', { c: countryName(code, lang) }))
    if (n >= 3) { setStatus('reveal'); setMsg(t(lang, 'hunt_reveal')) }
  }
  const next = () => { setRound((r) => r + 1); setTries(0); setWrong([]); setStatus('play'); setMsg('') }
  const again = () => { setGame((g) => g + 1); setRound(0); setTries(0); setWrong([]); setStatus('play'); setMsg(''); setStars(0) }

  const fill = (code) => {
    if (status !== 'play' && code === target) return '#43C27A'
    if (wrong.includes(code)) return '#FFAB91'
    return COUNTRIES[code] ? '#FFFFFF' : '#ECEFF1'
  }
  const c = target && COUNTRIES[target]

  return (
    <div className="home-sky screen-wide" style={{ minHeight: '100vh', fontFamily: 'Nunito, sans-serif', paddingBottom: 30 }}>
      <ExploreHeader lang={lang} emoji="🧭" title={t(lang, 'hunt_title')} sub={t(lang, 'hunt_desc')} onBack={onBack}
        right={<span style={{ background: 'white', borderRadius: 999, padding: '7px 14px', fontWeight: 900, color: '#FF8F00' }}>⭐ {stars}</span>} />
      {done ? (
        <GameEnd lang={lang} stars={stars} max={ROUNDS * 3} onAgain={again} onBack={onBack} onSave={() => onFinish('hunt', stars)} />
      ) : (
        <div style={{ padding: '6px 16px' }}>
          {c && (
            <div style={{ background: 'white', borderRadius: 22, padding: '12px 16px', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 6px 18px rgba(26,42,79,0.1)' }}>
              <span style={{ fontSize: 44 }}>{c.flag}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 900, color: '#90A4AE' }}>{t(lang, 'round', { n: String(round + 1), t: String(ROUNDS) })}</div>
                <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 22, fontWeight: 700, color: INK }}>{t(lang, 'hunt_find')} {countryName(target, lang)} !</div>
                {tries > 0 && status === 'play' && (
                  <div style={{ fontSize: 13, fontWeight: 800, color: '#1E88E5' }}>💡 {t(lang, 'hunt_hint', { r: '' })}<TText text={REGIONS[c.region].name} lang={lang} /></div>
                )}
              </div>
              {status !== 'play' && (
                <button className="btn-kid soft" onClick={next}
                  style={{ background: 'linear-gradient(180deg,#43C27A,#2E9E5B)', color: 'white', padding: '12px 18px', fontSize: 16, borderRadius: 16, boxShadow: '0 4px 0 #1F7A43' }}>{t(lang, 'next')} →</button>
              )}
            </div>
          )}
          {msg && <div className={status === 'play' ? 'anim-shake' : 'anim-pop'} key={msg + tries} style={{ textAlign: 'center', fontWeight: 900, fontSize: 16, color: status === 'right' ? '#2E9E5B' : status === 'reveal' ? '#1E88E5' : '#E65100', marginBottom: 8 }}>{status === 'right' ? '🎉 ' : ''}{msg}</div>}
          <WorldMap fill={fill} onPick={pick} highlight={status !== 'play' ? target : null} focus={status === 'reveal' ? target : (status === 'play' && tries === 0 ? null : undefined)}
            onBBoxes={setBoxes} height={Math.min(520, Math.round(window.innerHeight * 0.58))} />
        </div>
      )}
    </div>
  )
}

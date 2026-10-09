import { useMemo, useState } from 'react'
import { t } from '../i18n'
import { COUNTRIES } from '../data/countries'
import { shuffle } from '../explore'
import { countryName } from '../names'
import ExploreHeader from './ExploreHeader'
import GameEnd from './GameEnd'

const INK = '#1A2A4F'

// Memory des drapeaux : retrouver les paires (6 paires pour les petits, 8 sinon)
export default function MemoryGame({ onRound, lang, difficulty, onBack, onFinish }) {
  const pairs = difficulty === 'mini' ? 6 : 8
  const [game, setGame] = useState(0)
  const cards = useMemo(() => {
    const codes = shuffle(Object.keys(COUNTRIES)).slice(0, pairs)
    return shuffle(codes.flatMap((c) => [{ id: c + 'a', code: c }, { id: c + 'b', code: c }]))
  }, [game, pairs])
  const [open, setOpen] = useState([])
  const [found, setFound] = useState([])
  const [moves, setMoves] = useState(0)
  const [lock, setLock] = useState(false)

  const flip = (card) => {
    if (lock || open.includes(card.id) || found.includes(card.code)) return
    const next = [...open, card.id]
    setOpen(next)
    if (next.length === 2) {
      setMoves((m) => m + 1)
      const [a, b] = next.map((id) => cards.find((c) => c.id === id))
      if (a.code === b.code) { setFound((f) => [...f, a.code]); setOpen([]) }
      else { setLock(true); setTimeout(() => { setOpen([]); setLock(false) }, 900) }
    }
  }
  const done = found.length === pairs
  const stars = moves <= pairs + 3 ? 3 : moves <= pairs * 2 ? 2 : 1
  const again = () => { setGame((g) => g + 1); setOpen([]); setFound([]); setMoves(0) }

  return (
    <div className="home-sky screen-mid" style={{ minHeight: '100vh', fontFamily: 'Nunito, sans-serif', paddingBottom: 30 }}>
      <ExploreHeader lang={lang} emoji="🧠" title={t(lang, 'mem_title')} sub={t(lang, 'mem_desc')} onBack={onBack}
        right={<span style={{ background: 'white', borderRadius: 999, padding: '7px 14px', fontWeight: 900, color: '#1E88E5' }}>{t(lang, 'mem_moves', { n: String(moves) })}</span>} />
      {done ? (
        <GameEnd lang={lang} stars={stars} max={3} onAgain={() => { if (!onRound || onRound()) again() }} onBack={onBack} onSave={() => onFinish('memory', stars)} />
      ) : (
        <div style={{ padding: '10px 16px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          {cards.map((card) => {
            const shown = open.includes(card.id) || found.includes(card.code)
            const ok = found.includes(card.code)
            return (
              <button key={card.id} onClick={() => flip(card)} className="btn-kid soft"
                style={{ aspectRatio: '3 / 4', borderRadius: 18, border: ok ? '3px solid #43C27A' : '3px solid white', background: shown ? 'white' : 'linear-gradient(150deg,#42A5F5,#3949AB)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 4, boxShadow: '0 5px 0 rgba(26,42,79,0.15)' }}>
                {shown ? (
                  <>
                    <span style={{ fontSize: 'clamp(30px, 9vw, 52px)', lineHeight: 1 }}>{COUNTRIES[card.code].flag}</span>
                    <span style={{ fontSize: 11, fontWeight: 900, color: INK, marginTop: 4, lineHeight: 1.1, textAlign: 'center' }}>{countryName(card.code, lang)}</span>
                  </>
                ) : <span style={{ fontSize: 30 }}>🌍</span>}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

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
    <div className="home-sky screen-mid mem-screen" style={{ minHeight: '100vh', fontFamily: 'Nunito, sans-serif', paddingBottom: 30 }}>
      <ExploreHeader lang={lang} emoji="🧠" title={t(lang, 'mem_title')} sub={t(lang, 'mem_desc')} onBack={onBack}
        right={<span style={{ background: 'white', borderRadius: 999, padding: '7px 14px', fontWeight: 900, color: '#1E88E5', boxShadow: '0 3px 10px rgba(26,42,79,0.12)' }}>🔄 {t(lang, 'mem_moves', { n: String(moves) })}</span>} />
      {done ? (
        <GameEnd lang={lang} stars={stars} max={3} onAgain={() => { if (!onRound || onRound()) again() }} onBack={onBack} onSave={() => onFinish('memory', stars)} />
      ) : (
        <div style={{ padding: '6px 14px 0' }}>
          {/* Progression : une etoile par paire trouvee */}
          <div className="mem-progress">
            <span style={{ fontWeight: 900, color: INK, whiteSpace: 'nowrap' }}>⭐ {found.length} / {pairs}</span>
            <div style={{ flex: 1, height: 14, borderRadius: 999, background: '#E3EAF2', overflow: 'hidden' }}>
              <div style={{ width: `${(found.length / pairs) * 100}%`, height: '100%', borderRadius: 999, background: 'linear-gradient(90deg,#FFD54F,#FF9800)', transition: 'width .4s' }} />
            </div>
          </div>

          {/* Plateau de jeu */}
          <div className="mem-board">
            <div className="memory-grid" style={{ '--mem-cols': pairs }}>
              {cards.map((card) => {
                const shown = open.includes(card.id) || found.includes(card.code)
                const ok = found.includes(card.code)
                return (
                  <button key={card.id} onClick={() => flip(card)} aria-label={shown ? countryName(card.code, lang) : '?'}
                    className={`mem-card${shown ? ' is-open' : ''}${ok ? ' is-ok' : ''}`}>
                    <span className="mem-inner">
                      <span className="mem-face mem-back"><span className="mem-globe">🌍</span></span>
                      <span className="mem-face mem-front">
                        <span className="mem-flag">{COUNTRIES[card.code].flag}</span>
                        <span className="mem-name">{countryName(card.code, lang)}</span>
                        {ok && <span className="mem-check">✓</span>}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Collection : les drapeaux deja trouves */}
          {found.length > 0 && (
            <div className="mem-shelf anim-slide-up">
              <span style={{ fontWeight: 900, color: '#E65100' }}>🏆</span>
              {found.map((c) => (
                <span key={c} className="mem-chip"><span style={{ fontSize: 22 }}>{COUNTRIES[c].flag}</span>{countryName(c, lang)}</span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

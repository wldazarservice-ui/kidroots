import { useEffect, useMemo, useState } from 'react'
import { t } from '../i18n'
import { COUNTRIES } from '../data/countries'
import { shuffle } from '../explore'
import { countryName } from '../names'
import ExploreHeader from './ExploreHeader'
import GameEnd from './GameEnd'

const INK = '#1A2A4F'

const P_COLORS = ['#FF7A00', '#1E88E5']
const P_EMOJI = ['🦊', '🐻']

// Memory des drapeaux : retrouver les paires (6 paires pour les petits, 8 sinon).
// Seul, ou a deux (enfant + parent, frere, amie...) : chacun son tour, une paire trouvee = 1 point et on rejoue.
export default function MemoryGame({ onRound, lang, difficulty, onBack, onFinish, childName }) {
  const [mode, setMode] = useState(null) // null = choix, 'solo', 'duo'
  const [names, setNames] = useState([childName || '', ''])
  const [turn, setTurn] = useState(0)
  const [scores, setScores] = useState([0, 0])
  const [streak, setStreak] = useState(false)
  const [foundBy, setFoundBy] = useState({}) // a deux : qui a trouve chaque paire (visible sur la carte et a la fin)
  const duo = mode === 'duo'
  const pName = (i) => names[i].trim() || t(lang, i ? 'mem_p2' : 'mem_p1')
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
      if (a.code === b.code) {
        setFound((f) => [...f, a.code]); setOpen([])
        if (duo) { setScores((sc) => sc.map((v, i) => (i === turn ? v + 1 : v))); setFoundBy((f) => ({ ...f, [a.code]: turn })); setStreak(true) }
      } else {
        setLock(true)
        setTimeout(() => { setOpen([]); setLock(false); if (duo) { setTurn((x) => 1 - x); setStreak(false) } }, 900)
      }
    }
  }
  const done = found.length === pairs
  const stars = moves <= pairs + 3 ? 3 : moves <= pairs * 2 ? 2 : 1
  const again = () => { setGame((g) => g + 1); setOpen([]); setFound([]); setMoves(0); setScores([0, 0]); setTurn(0); setStreak(false); setFoundBy({}) }
  // A deux : le joueur 1 (le profil de l'enfant) gagne 3 etoiles s'il gagne, 2 sinon
  const duoStars = scores[0] > scores[1] ? 3 : 2
  const winner = scores[0] === scores[1] ? -1 : scores[0] > scores[1] ? 0 : 1
  useEffect(() => { if (done && duo) onFinish('memory', duoStars) }, [done, duo]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!mode) return (
    <div className="home-sky screen-mid mem-screen" style={{ minHeight: '100vh', fontFamily: 'Nunito, sans-serif', paddingBottom: 30 }}>
      <ExploreHeader lang={lang} emoji="🧠" title={t(lang, 'mem_title')} sub={t(lang, 'mem_desc')} onBack={onBack} />
      <div style={{ padding: '10px 16px', maxWidth: 520, margin: '0 auto' }}>
        <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 24, fontWeight: 700, color: INK, textAlign: 'center', margin: '6px 0 14px' }}>{t(lang, 'mem_mode')}</div>
        <button className="btn-kid lift mem-mode" onClick={() => setMode('solo')}>
          <span className="mem-mode-ico">🙋</span><span><b>{t(lang, 'mem_solo')}</b><small>{t(lang, 'mem_solo_sub')}</small></span>
        </button>
        <div className="mem-mode mem-mode-duo">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span className="mem-mode-ico">👫</span><span><b>{t(lang, 'mem_duo')}</b><small>{t(lang, 'mem_duo_sub')}</small></span>
          </div>
          <div style={{ display: 'grid', gap: 8, margin: '12px 0' }}>
            {[0, 1].map((i) => (
              <label key={i} className="mem-name-in" style={{ borderColor: P_COLORS[i] }}>
                <span style={{ fontSize: 26 }}>{P_EMOJI[i]}</span>
                <input value={names[i]} maxLength={14} placeholder={t(lang, i ? 'mem_p2' : 'mem_p1')}
                  onChange={(e) => setNames((n) => n.map((v, k) => (k === i ? e.target.value : v)))} />
              </label>
            ))}
          </div>
          <button className="btn-kid soft anim-glow" onClick={() => { again(); setMode('duo') }}
            style={{ width: '100%', background: 'linear-gradient(180deg,#FFE04D,#FFC400)', color: INK, padding: '15px', fontSize: 19, borderRadius: 20, boxShadow: '0 5px 0 #E6A100' }}>▶ {t(lang, 'mem_go')}</button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="home-sky screen-mid mem-screen" style={{ minHeight: '100vh', fontFamily: 'Nunito, sans-serif', paddingBottom: 30 }}>
      <ExploreHeader lang={lang} emoji="🧠" title={t(lang, 'mem_title')} sub={t(lang, 'mem_desc')} onBack={onBack}
        right={duo ? null : <span style={{ background: 'white', borderRadius: 999, padding: '7px 14px', fontWeight: 900, color: '#1E88E5', boxShadow: '0 3px 10px rgba(26,42,79,0.12)' }}>🔄 {t(lang, 'mem_moves', { n: String(moves) })}</span>} />
      {done && duo ? (
        <div className="anim-slide-up" style={{ padding: '18px 16px 30px' }}>
          <div className="game-card" style={{ maxWidth: 520, margin: '0 auto', textAlign: 'center', padding: '26px 20px 22px' }}>
            <div className="float" style={{ fontSize: 80 }}>{winner < 0 ? '🤝' : '🏆'}</div>
            <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 30, fontWeight: 700, color: winner < 0 ? INK : P_COLORS[winner] }}>
              {winner < 0 ? t(lang, 'mem_tie') : t(lang, 'mem_wins', { name: pName(winner) })}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, margin: '16px 0 20px' }}>
              {[0, 1].map((i) => (
                <div key={i} style={{ borderRadius: 20, padding: '14px 8px', border: `3px solid ${P_COLORS[i]}`, background: i === winner ? '#FFF8E1' : 'white' }}>
                  <div style={{ fontSize: 30 }}>{P_EMOJI[i]}{i === winner ? '👑' : ''}</div>
                  <div style={{ fontWeight: 900, color: INK, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{pName(i)}</div>
                  <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 34, fontWeight: 700, color: P_COLORS[i] }}>{scores[i]}</div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: '#78909C' }}>{t(lang, scores[i] === 1 ? 'mem_pair_one' : 'mem_pairs', { n: String(scores[i]) })}</div>
                  <div style={{ fontSize: 22, lineHeight: 1.3, marginTop: 4, wordBreak: 'break-all' }}>{found.filter((c) => foundBy[c] === i).map((c) => COUNTRIES[c].flag).join(' ')}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn-kid soft anim-glow" onClick={() => { if (!onRound || onRound()) again() }}
                style={{ background: 'linear-gradient(180deg,#FFE04D,#FFC400)', color: INK, padding: '16px 24px', fontSize: 18, borderRadius: 20, boxShadow: '0 5px 0 #E6A100' }}>🔄 {t(lang, 'play_again')}</button>
              <button className="btn-kid soft" onClick={onBack}
                style={{ background: 'white', color: '#2E7D4F', padding: '16px 24px', fontSize: 18, borderRadius: 20, border: '3px solid #C8E6C9' }}>🎮 {t(lang, 'home_games')}</button>
            </div>
          </div>
        </div>
      ) : done ? (
        <GameEnd lang={lang} stars={stars} max={3} onAgain={() => { if (!onRound || onRound()) again() }} onBack={onBack} onSave={() => onFinish('memory', stars)} />
      ) : (
        <div style={{ padding: '6px 14px 0' }}>
          {/* A deux : tableau des scores, le joueur dont c'est le tour est mis en avant */}
          {duo && (
            <div className="mem-score">
              {[0, 1].map((i) => (
                <div key={i} className={`mem-player${turn === i ? ' on' : ''}`} style={{ '--pc': P_COLORS[i] }}>
                  <span style={{ fontSize: 24 }}>{P_EMOJI[i]}</span>
                  <span className="mem-player-name">{pName(i)}</span>
                  <span className="mem-player-pts">{scores[i]}</span>
                </div>
              ))}
              <div className="mem-turn" style={{ color: P_COLORS[turn] }} aria-live="polite">
                {streak ? `🎉 ${t(lang, 'mem_again_turn', { name: pName(turn) })}` : `👉 ${t(lang, 'mem_turn', { name: pName(turn) })}`}
              </div>
            </div>
          )}
          {/* Progression : une etoile par paire trouvee */}
          {!duo && <div className="mem-progress">
            <span style={{ fontWeight: 900, color: INK, whiteSpace: 'nowrap' }}>⭐ {found.length} / {pairs}</span>
            <div style={{ flex: 1, height: 14, borderRadius: 999, background: '#E3EAF2', overflow: 'hidden' }}>
              <div style={{ width: `${(found.length / pairs) * 100}%`, height: '100%', borderRadius: 999, background: 'linear-gradient(90deg,#FFD54F,#FF9800)', transition: 'width .4s' }} />
            </div>
          </div>}

          {/* Plateau de jeu */}
          <div className="mem-board">
            <div className="memory-grid" style={{ '--mem-cols': pairs }}>
              {cards.map((card) => {
                const shown = open.includes(card.id) || found.includes(card.code)
                const ok = found.includes(card.code)
                return (
                  <button key={card.id} onClick={() => flip(card)} aria-label={shown ? countryName(card.code, lang) : '?'}
                    className={`mem-card${shown ? ' is-open' : ''}${ok ? ' is-ok' : ''}`}
                    style={duo && ok ? { '--pc': P_COLORS[foundBy[card.code]] } : undefined}>
                    <span className="mem-inner">
                      <span className="mem-face mem-back"><span className="mem-globe">🌍</span></span>
                      <span className="mem-face mem-front">
                        <span className="mem-flag">{COUNTRIES[card.code].flag}</span>
                        <span className="mem-name">{countryName(card.code, lang)}</span>
                        {ok && <span className="mem-check">{duo ? P_EMOJI[foundBy[card.code]] : '✓'}</span>}
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

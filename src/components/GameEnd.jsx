import { useEffect } from 'react'
import { t } from '../i18n'

const INK = '#1A2A4F'

// Fin de partie : étoiles gagnées, rejouer ou revenir aux jeux
export default function GameEnd({ lang, stars, max, onAgain, onBack, onSave }) {
  useEffect(() => { onSave?.() }, [])
  const ratio = max ? stars / max : 0
  const medals = ratio >= 0.8 ? 3 : ratio >= 0.5 ? 2 : 1
  return (
    <div className="anim-slide-up" style={{ padding: '18px 16px 30px' }}>
      <div className="game-card" style={{ maxWidth: 520, margin: '0 auto', textAlign: 'center', padding: '28px 20px 24px', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', fontSize: 26, opacity: 0.9 }}>
          {['🎉', '⭐', '🎊', '✨', '🌍', '⭐'].map((e, i) => <span key={i} className="float" style={{ position: 'absolute', left: `${8 + i * 16}%`, top: `${i % 2 ? 10 : 4}%`, animationDelay: `${i * 0.3}s` }}>{e}</span>)}
        </div>
        <div className="float" style={{ fontSize: 86, marginTop: 10 }}>{medals === 3 ? '🏆' : medals === 2 ? '🥳' : '👏'}</div>
        <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 30, fontWeight: 700, color: INK }}>{t(lang, 'game_over')}</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, margin: '10px 0 4px' }}>
          {[1, 2, 3].map((n) => <span key={n} className={n <= medals ? 'anim-starpop' : ''} style={{ fontSize: 44, filter: n <= medals ? 'none' : 'grayscale(1) opacity(.3)', animationDelay: `${n * 0.15}s` }}>⭐</span>)}
        </div>
        <div style={{ display: 'inline-block', background: '#FFF8E1', border: '2px solid #FFE082', borderRadius: 999, padding: '6px 16px', fontSize: 17, fontWeight: 900, color: '#E65100', margin: '6px 0 20px' }}>{t(lang, 'stars_won', { n: String(stars) })}</div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-kid soft anim-glow" onClick={onAgain}
            style={{ background: 'linear-gradient(180deg,#FFE04D,#FFC400)', color: INK, padding: '16px 24px', fontSize: 18, borderRadius: 20, boxShadow: '0 5px 0 #E6A100' }}>🔄 {t(lang, 'play_again')}</button>
          <button className="btn-kid soft" onClick={onBack}
            style={{ background: 'white', color: '#2E7D4F', padding: '16px 24px', fontSize: 18, borderRadius: 20, border: '3px solid #C8E6C9' }}>🎮 {t(lang, 'home_games')}</button>
        </div>
      </div>
    </div>
  )
}

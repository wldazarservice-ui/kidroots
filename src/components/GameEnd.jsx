import { useEffect } from 'react'
import { t } from '../i18n'

const INK = '#1A2A4F'

// Fin de partie : étoiles gagnées, rejouer ou revenir aux jeux
export default function GameEnd({ lang, stars, max, onAgain, onBack, onSave }) {
  useEffect(() => { onSave?.() }, [])
  return (
    <div className="anim-slide-up" style={{ textAlign: 'center', padding: '30px 16px' }}>
      <div className="float" style={{ fontSize: 80 }}>{stars >= max * 0.8 ? '🏆' : stars >= max * 0.5 ? '🥳' : '👏'}</div>
      <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 30, fontWeight: 700, color: INK }}>{t(lang, 'game_over')}</div>
      <div style={{ fontSize: 18, fontWeight: 900, color: '#FF8F00', margin: '8px 0 22px' }}>⭐ {t(lang, 'stars_won', { n: String(stars) })}</div>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="btn-kid soft" onClick={onAgain}
          style={{ background: 'linear-gradient(180deg,#FFE04D,#FFC400)', color: INK, padding: '16px 24px', fontSize: 18, borderRadius: 20, boxShadow: '0 5px 0 #E6A100' }}>🔄 {t(lang, 'play_again')}</button>
        <button className="btn-kid soft" onClick={onBack}
          style={{ background: 'white', color: '#2E7D4F', padding: '16px 24px', fontSize: 18, borderRadius: 20 }}>🎮 {t(lang, 'home_games')}</button>
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { t } from '../i18n'
import { DAILY_FREE_CHAPTERS } from '../premium'

const INK = '#1A2A4F'

const untilMidnight = () => {
  const now = new Date()
  const next = new Date(now); next.setHours(24, 0, 0, 0)
  const m = Math.ceil((next - now) / 60000)
  return `${Math.floor(m / 60)} h ${String(m % 60).padStart(2, '0')}`
}

// Limite gratuite atteinte (2 nouveaux chapitres par jour) : facon Duolingo, positif pour l'enfant
export default function DailyLimit({ lang, onClose, onUnlock }) {
  const [left, setLeft] = useState(untilMidnight)
  useEffect(() => {
    const id = setInterval(() => setLeft(untilMidnight()), 30000)
    return () => clearInterval(id)
  }, [])

  return (
    <div onClick={onClose} className="sheet-backdrop" style={{ position: 'fixed', inset: 0, background: 'rgba(26,42,79,0.55)', zIndex: 580, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div onClick={(e) => e.stopPropagation()} className="anim-slide-up sheet"
        style={{ width: '100%', maxWidth: 420, borderRadius: '28px 28px 0 0', padding: '26px 20px 26px', fontFamily: 'Nunito, sans-serif', textAlign: 'center', background: 'linear-gradient(180deg,#2B3A75 0%,#4A5BA8 55%,#FFF8E7 100%)', color: 'white' }}>
        <div style={{ position: 'relative', height: 110 }}>
          <div className="float" style={{ fontSize: 86, lineHeight: 1 }}>🌙</div>
          <span aria-hidden style={{ position: 'absolute', top: 6, left: '22%', fontSize: 20 }} className="anim-pulse">⭐</span>
          <span aria-hidden style={{ position: 'absolute', top: 40, right: '20%', fontSize: 16, animationDelay: '-1s' }} className="anim-pulse">✨</span>
        </div>
        <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 26, fontWeight: 700, lineHeight: 1.15, margin: '4px 0 8px' }}>{t(lang, 'lim_title')}</div>
        <div style={{ fontSize: 15, fontWeight: 800, lineHeight: 1.5, opacity: 0.95 }}>{t(lang, 'lim_sub', { n: String(DAILY_FREE_CHAPTERS) })}</div>
        <div style={{ display: 'inline-block', marginTop: 14, background: 'rgba(255,255,255,0.18)', borderRadius: 999, padding: '7px 16px', fontSize: 14, fontWeight: 900 }}>⏰ {t(lang, 'lim_in', { time: left })}</div>

        <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button className="btn-kid soft" onClick={onClose}
            style={{ background: 'linear-gradient(180deg,#FFE04D,#FFC400)', color: INK, padding: '16px', fontSize: 18, borderRadius: 22, boxShadow: '0 6px 0 #E6A100' }}>
            {t(lang, 'lim_back')}
          </button>
          <button className="btn-kid soft" onClick={onUnlock}
            style={{ background: 'white', color: '#2E7D4F', padding: '13px', fontSize: 15, borderRadius: 18 }}>
            🔐 {t(lang, 'lim_parent')}
          </button>
        </div>
        <div style={{ marginTop: 12, fontSize: 12, fontWeight: 800, color: '#5D6B8A' }}>{t(lang, 'lim_replay')}</div>
      </div>
    </div>
  )
}

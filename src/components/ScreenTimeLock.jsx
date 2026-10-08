import { useState } from 'react'
import { t } from '../i18n'
import ParentGate from './ParentGate'

const INK = '#1A2A4F'

// Temps d'écran écoulé : pause jusqu'à demain (un parent peut ajouter du temps)
export default function ScreenTimeLock({ lang, minutes, onMore, onOff, onSwitch }) {
  const [gate, setGate] = useState(false)
  const [ok, setOk] = useState(false)
  return (
    <div className="screen-enter" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, background: 'linear-gradient(180deg,#2B3A75 0%,#4A5BA8 55%,#FFF8E7 100%)', fontFamily: 'Nunito, sans-serif' }}>
      <div style={{ maxWidth: 420, width: '100%', textAlign: 'center', color: 'white' }}>
        <div className="float" style={{ fontSize: 96 }}>🌙</div>
        <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 30, fontWeight: 700, lineHeight: 1.15 }}>{t(lang, 'st_title')}</div>
        <div style={{ fontSize: 16, fontWeight: 800, opacity: 0.95, margin: '10px 0 24px', lineHeight: 1.5 }}>{t(lang, 'st_sub', { n: String(minutes) })}</div>
        {!gate ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button className="btn-kid soft" onClick={onSwitch}
              style={{ background: 'linear-gradient(180deg,#FFE04D,#FFC400)', color: INK, padding: '16px', fontSize: 18, borderRadius: 22, boxShadow: '0 6px 0 #E6A100' }}>👋 {t(lang, 'lim_back')}</button>
            <button className="btn-kid soft" onClick={() => setGate(true)}
              style={{ background: 'white', color: '#2E7D4F', padding: '13px', fontSize: 15, borderRadius: 18 }}>🔐 {t(lang, 'st_parent')}</button>
          </div>
        ) : !ok ? (
          <div style={{ textAlign: 'left' }}><ParentGate onPass={() => setOk(true)} /></div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button className="btn-kid soft" onClick={onMore} style={{ background: 'white', color: INK, padding: '15px', fontSize: 17, borderRadius: 18 }}>⏱️ {t(lang, 'st_more15')}</button>
            <button className="btn-kid soft" onClick={onOff} style={{ background: 'rgba(255,255,255,0.85)', color: '#546E7A', padding: '13px', fontSize: 15, borderRadius: 18 }}>{t(lang, 'st_off_today')}</button>
          </div>
        )}
      </div>
    </div>
  )
}

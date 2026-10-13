import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { isMusicOn, setMusicOn, onMusicChange, getMusicVolume, setMusicVolume } from '../music'

// Bouton rond 🎵 / 🔇 (barre du haut de l'accueil) : ouvre un petit panneau marche/arret + volume
export default function MusicButton({ label = 'Musique' }) {
  const [on, setOn] = useState(isMusicOn)
  const [open, setOpen] = useState(false)
  const [v, setV] = useState(getMusicVolume)
  useEffect(() => onMusicChange(setOn), [])
  const change = (x) => { const y = Math.round(Math.min(1, Math.max(0, x)) * 10) / 10; setV(y); setMusicVolume(y); if (y > 0 && !on) setMusicOn(true) }
  const round = { width: 44, height: 44, borderRadius: '50%', border: 'none', background: '#E3F2FD', color: '#1565C0', fontSize: 24, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }
  return (
    <>
      <button className="btn-kid" data-music-toggle onClick={() => setOpen(!open)} aria-label={label} aria-expanded={open} title={label}
        style={{ background: on ? 'white' : '#ECEFF1', width: 40, height: 40, borderRadius: '50%', fontSize: 19, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 3px 10px rgba(26,42,79,0.12)', flexShrink: 0, opacity: on ? 1 : 0.75 }}>
        {on ? '🎵' : '🔇'}
      </button>
      {open && createPortal(
        <div data-music-toggle onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 700, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: 64 }}>
          <div onClick={(e) => e.stopPropagation()} className="pop-in"
            style={{ width: 'min(330px, calc(100vw - 24px))', background: 'white', borderRadius: 22, padding: 16, boxShadow: '0 12px 34px rgba(26,42,79,0.22)', fontFamily: 'Nunito, sans-serif' }}>
            <button type="button" onClick={() => setMusicOn(!on)}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, border: 'none', borderRadius: 16, padding: '12px 10px', cursor: 'pointer', fontFamily: 'inherit', fontSize: 17, fontWeight: 900, background: on ? '#E8F5E9' : '#ECEFF1', color: on ? '#2E7D32' : '#546E7A' }}>
              <span style={{ fontSize: 24 }}>{on ? '🎵' : '🔇'}</span>{label} {on ? '✅' : '❌'}
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14, opacity: on ? 1 : 0.5 }}>
              <button type="button" aria-label="Moins fort" onClick={() => change(v - 0.1)} style={round}>−</button>
              <input type="range" min="0" max="1" step="0.1" value={v} onChange={(e) => change(parseFloat(e.target.value))} aria-label="Volume de la musique"
                style={{ flex: 1, minWidth: 0, accentColor: '#1E88E5', height: 30, cursor: 'pointer' }} />
              <button type="button" aria-label="Plus fort" onClick={() => change(v + 0.1)} style={round}>+</button>
            </div>
          </div>
        </div>,
        document.getElementById('root') || document.body,
      )}
    </>
  )
}

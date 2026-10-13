import { useEffect, useState } from 'react'
import { isMusicOn, setMusicOn, onMusicChange } from '../music'

// Bouton rond 🎵 / 🔇 (barre du haut de l'accueil)
export default function MusicButton({ label = 'Musique' }) {
  const [on, setOn] = useState(isMusicOn)
  useEffect(() => onMusicChange(setOn), [])
  return (
    <button className="btn-kid" data-music-toggle onClick={() => setMusicOn(!on)} aria-label={label} aria-pressed={on} title={label}
      style={{ background: on ? 'white' : '#ECEFF1', width: 40, height: 40, borderRadius: '50%', fontSize: 19, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 3px 10px rgba(26,42,79,0.12)', flexShrink: 0, opacity: on ? 1 : 0.75 }}>
      {on ? '🎵' : '🔇'}
    </button>
  )
}

import { useEffect, useState } from 'react'
import { ttsAvailable, getTTSEnabled, setTTSEnabled } from '../tts'
import { t } from '../i18n'

// Interrupteur « Lecture auto » (desactivee par defaut, choix memorise sur l'appareil)
export default function AutoReadChip({ lang, color = '#2E9E5B' }) {
  const [on, setOn] = useState(getTTSEnabled())
  useEffect(() => {
    const h = (e) => setOn(!!e.detail)
    window.addEventListener('mokalibo:autoread', h)
    return () => window.removeEventListener('mokalibo:autoread', h)
  }, [])
  if (!ttsAvailable()) return null
  return (
    <button type="button" onClick={() => setTTSEnabled(!on)} aria-pressed={on}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 6, border: `2px solid ${on ? color : '#CFD8DC'}`, background: on ? color : 'white', color: on ? 'white' : '#607D8B', borderRadius: 999, padding: '5px 12px', fontSize: 12, fontWeight: 900, fontFamily: 'Nunito, sans-serif', cursor: 'pointer', whiteSpace: 'nowrap' }}>
      {on ? '🔊' : '🔇'} {t(lang, on ? 'autoread_on' : 'autoread_off')}
    </button>
  )
}

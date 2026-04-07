import { useEffect, useRef, useState } from 'react'
import { ttsAvailable, ttsSpeak, ttsStop, getTTSEnabled, setTTSEnabled } from '../tts'

// Bouton "haut-parleur" : lit le texte fourni a voix haute.
// Props: text (string|string[]), lang, color, size, autoPlay, settings
export default function SpeakButton({ text, lang, color = '#FF6B35', size = 44, autoPlay = false, settings = false, label }) {
  const [speaking, setSpeaking] = useState(false)
  const [enabled, setEnabledState] = useState(getTTSEnabled())
  const mountedRef = useRef(true)

  const fullText = Array.isArray(text) ? text.filter(Boolean).join('. ') : text

  const start = () => {
    if (!ttsAvailable() || !fullText) return
    setSpeaking(true)
    ttsSpeak(fullText, {
      lang,
      onEnd: () => mountedRef.current && setSpeaking(false),
      onError: () => mountedRef.current && setSpeaking(false),
    })
  }

  const stop = () => {
    ttsStop()
    setSpeaking(false)
  }

  const toggle = () => {
    if (!enabled) {
      setEnabledState(true)
      setTTSEnabled(true)
      setTimeout(start, 50)
      return
    }
    if (speaking) stop()
    else start()
  }

  // Lecture automatique a l'apparition (quand l'utilisateur a active la voix off)
  useEffect(() => {
    mountedRef.current = true
    if (autoPlay && enabled && fullText) {
      // petit delai pour laisser le rendu se faire
      const id = setTimeout(start, 200)
      return () => { clearTimeout(id); ttsStop() }
    }
    return () => { ttsStop() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullText, lang, autoPlay])

  useEffect(() => () => { mountedRef.current = false; ttsStop() }, [])

  if (!ttsAvailable()) return null

  // Mode "settings" : bouton ON/OFF global pour activer/desactiver la voix off
  if (settings) {
    return (
      <button
        onClick={(e) => {
          e.stopPropagation()
          const next = !enabled
          setEnabledState(next)
          setTTSEnabled(next)
        }}
        title={enabled ? 'Voix off ON' : 'Voix off OFF'}
        style={{
          background: enabled ? color : 'rgba(255,255,255,0.18)',
          color: 'white',
          border: 'none',
          borderRadius: 999,
          padding: '6px 12px',
          fontSize: 12,
          fontWeight: 900,
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          fontFamily: 'Nunito, sans-serif',
          boxShadow: enabled ? `0 3px 10px ${color}55` : 'none',
        }}
      >
        {enabled ? '🔊' : '🔇'} {label || 'Voix'}
      </button>
    )
  }

  return (
    <button
      onClick={(e) => { e.stopPropagation(); toggle() }}
      aria-label={speaking ? 'Stop' : 'Ecouter'}
      title={speaking ? 'Stop' : 'Ecouter'}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: speaking ? '#fff' : color,
        color: speaking ? color : 'white',
        border: speaking ? `3px solid ${color}` : 'none',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: Math.round(size * 0.5),
        boxShadow: `0 4px 14px ${color}55`,
        animation: speaking ? 'pulse 1.1s ease-in-out infinite' : 'none',
        flexShrink: 0,
      }}
    >
      {speaking ? '⏸' : '🔊'}
    </button>
  )
}

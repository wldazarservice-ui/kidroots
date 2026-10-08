import { useState } from 'react'
import { t } from '../i18n'
import { usePwaInstall } from '../pwaInstall'

const INK = '#1A2A4F'

// Bouton « Installer l'app » (Android / ordinateur) ou guide pour iPhone / iPad
export default function InstallButton({ lang, style }) {
  const { canPrompt, ios, prompt } = usePwaInstall()
  const [guide, setGuide] = useState(false)
  if (!canPrompt && !ios) return null

  return (
    <>
      <button className="btn-kid" onClick={() => (canPrompt ? prompt() : setGuide(true))}
        style={{ background: 'white', color: '#2E7D4F', padding: '8px 14px', minHeight: 36, fontSize: 14, borderRadius: 999, boxShadow: '0 3px 10px rgba(26,42,79,0.12)', display: 'inline-flex', alignItems: 'center', gap: 6, ...style }}>
        📲 {t(lang, 'install_app')}
      </button>
      {guide && (
        <div onClick={() => setGuide(false)} className="sheet-backdrop" style={{ position: 'fixed', inset: 0, background: 'rgba(26,42,79,0.5)', zIndex: 650, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div onClick={(e) => e.stopPropagation()} className="anim-slide-up green-bg sheet"
            style={{ width: '100%', maxWidth: 420, borderRadius: '28px 28px 0 0', padding: '22px 18px 28px', fontFamily: 'Nunito, sans-serif' }}>
            <div style={{ textAlign: 'center', marginBottom: 14 }}>
              <img src="/icon-192.png" alt="" width="72" height="72" style={{ borderRadius: 18, boxShadow: '0 6px 16px rgba(0,0,0,0.15)' }} />
              <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 24, fontWeight: 700, color: INK, marginTop: 8 }}>{t(lang, 'install_ios_title')}</div>
            </div>
            {[
              ['1', '⬆️', t(lang, 'install_ios_1')],
              ['2', '➕', t(lang, 'install_ios_2')],
              ['3', '✅', t(lang, 'install_ios_3')],
            ].map(([n, icon, text]) => (
              <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'white', borderRadius: 18, padding: '12px 14px', marginBottom: 10, boxShadow: '0 4px 12px rgba(46,158,91,0.10)' }}>
                <span style={{ width: 30, height: 30, borderRadius: '50%', background: '#2E9E5B', color: 'white', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{n}</span>
                <span style={{ fontSize: 22 }}>{icon}</span>
                <span style={{ fontSize: 15, fontWeight: 800, color: INK, lineHeight: 1.4 }}>{text}</span>
              </div>
            ))}
            <button className="btn-kid" onClick={() => setGuide(false)}
              style={{ width: '100%', marginTop: 6, background: 'linear-gradient(180deg,#43C27A,#2E9E5B)', color: 'white', padding: '14px', fontSize: 17, borderRadius: 18, boxShadow: '0 5px 0 #1F7A43' }}>
              OK
            </button>
          </div>
        </div>
      )}
    </>
  )
}

import { useEffect, useState } from 'react'
import { t, getLang } from '../i18n'

// Petit bandeau quand il n'y a plus d'internet : on peut continuer, la progression se synchronise plus tard
export default function OfflineBanner() {
  const [off, setOff] = useState(!navigator.onLine)
  useEffect(() => {
    const on = () => setOff(false), offH = () => setOff(true)
    window.addEventListener('online', on); window.addEventListener('offline', offH)
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', offH) }
  }, [])
  if (!off) return null
  return (
    <div style={{ position: 'fixed', left: 12, right: 12, bottom: 'calc(env(safe-area-inset-bottom, 0px) + 82px)', margin: '0 auto', maxWidth: 420, zIndex: 690, background: '#37474F', color: 'white', borderRadius: 16, padding: '9px 14px', fontFamily: 'Nunito, sans-serif', fontSize: 13, fontWeight: 800, textAlign: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.25)' }}>
      ✈️ {t(getLang(), 'offline_banner')}
    </div>
  )
}

import { useState } from 'react'
import { t } from '../i18n'

const INK = '#1A2A4F'

// Parrainage : le parent partage son lien mokalibo.com/?ami=CODE
export default function InviteFamily({ lang, account, onClose }) {
  const [copied, setCopied] = useState(false)
  const link = `https://mokalibo.com/?ami=${account.refCode}`
  const msg = `${t(lang, 'inv_msg')} ${link}`
  const share = async () => {
    try {
      if (navigator.share) await navigator.share({ title: 'Mokalibo', text: msg })
      else { await navigator.clipboard.writeText(msg); setCopied(true) }
    } catch {}
  }
  const copy = async () => { try { await navigator.clipboard.writeText(link); setCopied(true) } catch {} }

  return (
    <div onClick={onClose} className="sheet-backdrop" style={{ position: 'fixed', inset: 0, background: 'rgba(26,42,79,0.5)', zIndex: 600, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div onClick={(e) => e.stopPropagation()} className="anim-slide-up sheet"
        style={{ width: '100%', maxWidth: 420, borderRadius: '28px 28px 0 0', padding: '22px 18px 26px', fontFamily: 'Nunito, sans-serif', background: 'linear-gradient(180deg,#FFF3E0,#FFFFFF)', textAlign: 'center' }}>
        <div style={{ fontSize: 60, lineHeight: 1.1 }}>🎁</div>
        <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 26, fontWeight: 700, color: INK, marginTop: 6 }}>{t(lang, 'inv_title')}</div>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#546E7A', lineHeight: 1.5, margin: '8px 0 16px' }}>{t(lang, 'inv_text')}</div>
        <div style={{ background: 'white', border: '2px dashed #FFB74D', borderRadius: 16, padding: '12px', fontWeight: 900, color: INK, fontSize: 15, wordBreak: 'break-all', marginBottom: 12 }}>{link}</div>
        <button className="btn-kid" onClick={share}
          style={{ width: '100%', background: 'linear-gradient(180deg,#FFE04D,#FFC400)', color: INK, padding: '15px', fontSize: 17, borderRadius: 20, boxShadow: '0 5px 0 #E6A100', marginBottom: 10 }}>
          📤 {t(lang, 'inv_share')}
        </button>
        <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
          <a href={`https://wa.me/?text=${encodeURIComponent(msg)}`} target="_blank" rel="noopener noreferrer"
            style={{ flex: 1, background: '#25D366', color: 'white', borderRadius: 16, padding: '12px', fontWeight: 900, textDecoration: 'none', fontSize: 15 }}>WhatsApp</a>
          <button className="btn-kid" onClick={copy} style={{ flex: 1, background: 'white', color: '#1565C0', padding: '12px', fontSize: 15, borderRadius: 16, boxShadow: '0 3px 10px rgba(26,42,79,0.1)' }}>
            {copied ? '✅ ' + t(lang, 'inv_copied') : '🔗 ' + t(lang, 'inv_copy')}
          </button>
        </div>
        <div style={{ fontSize: 13, fontWeight: 800, color: '#78909C' }}>{t(lang, 'inv_stats', { n: account.refCount || 0, c: account.refCredits || 0 })}</div>
        <button onClick={onClose} style={{ marginTop: 14, background: 'none', border: 'none', color: '#90A4AE', fontFamily: 'inherit', fontWeight: 800, cursor: 'pointer' }}>✕</button>
      </div>
    </div>
  )
}

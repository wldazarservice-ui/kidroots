import { openSupport } from '../support'
import { t, getLang } from '../i18n'
import InstallButton from './InstallButton'

// Pied de page : installation de l'app + liens legaux (pages statiques dans public/)
export default function LegalFooter({ lang = getLang(), install = true, gate = true }) {
  const link = { color: '#4E7A5E', fontWeight: 800, textDecoration: 'none', whiteSpace: 'nowrap', display: 'inline-block', margin: '2px 0' }
  return (
    <div style={{ textAlign: 'center', padding: '22px 16px 26px', fontFamily: 'Nunito, sans-serif', fontSize: 12, position: 'relative', zIndex: 5 }}>
      {install && <div style={{ marginBottom: 14 }}><InstallButton lang={lang} /></div>}
      <a href="/impressum" style={link}>{t(lang, 'legal_impressum')}</a>
      <span style={{ color: '#A5C2AE', margin: '0 8px' }}>·</span>
      <a href="/datenschutz" style={link}>{t(lang, 'legal_privacy')}</a>
      <span style={{ color: '#A5C2AE', margin: '0 8px' }}>·</span>
      <a href="/agb" style={link}>{t(lang, 'legal_terms')}</a>
      <span style={{ color: '#A5C2AE', margin: '0 8px' }}>·</span>
      <a href="/kuendigen" style={link}>Verträge hier kündigen</a>
      <span style={{ color: '#A5C2AE', margin: '0 8px' }}>·</span>
      <button type="button" onClick={() => openSupport({ where: 'footer', gate })} style={{ ...link, background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit' }}>💬 {t(lang, 'support_link')}</button>
      <div style={{ color: '#90A4AE', fontWeight: 700, marginTop: 6 }}>© Mokalibo</div>
    </div>
  )
}

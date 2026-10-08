import { t } from '../i18n'

const INK = '#1A2A4F'

// En-tête commun des écrans Passeport, Carte et Jeux
export default function ExploreHeader({ lang, title, sub, emoji, onBack, right }) {
  return (
    <div style={{ padding: '14px 16px 6px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <button className="btn-kid soft" onClick={onBack}
          style={{ background: 'white', color: INK, padding: '8px 14px', minHeight: 38, fontSize: 14, boxShadow: '0 3px 10px rgba(26,42,79,0.12)' }}>{t(lang, 'back')}</button>
        <div style={{ flex: 1 }} />
        {right}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div className="float" style={{ fontSize: 46 }}>{emoji}</div>
        <div>
          <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 26, fontWeight: 700, color: INK, lineHeight: 1.1 }}>{title}</div>
          {sub && <div style={{ fontSize: 14, fontWeight: 800, color: '#546E7A' }}>{sub}</div>}
        </div>
      </div>
    </div>
  )
}

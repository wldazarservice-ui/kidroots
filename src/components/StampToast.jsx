import { t } from '../i18n'
import { COUNTRIES, REGIONS } from '../data/countries'
import { countryName } from '../names'

const INK = '#1A2A4F'

// Récompense quand un pays est terminé : un tampon s'imprime dans le passeport
export default function StampToast({ code, lang, onPassport, onClose }) {
  const c = COUNTRIES[code]
  if (!c) return null
  const reg = REGIONS[c.region]
  return (
    <div onClick={onClose} className="sheet-backdrop" style={{ position: 'fixed', inset: 0, background: 'rgba(26,42,79,0.55)', zIndex: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div onClick={(e) => e.stopPropagation()} className="anim-pop" style={{ background: 'linear-gradient(180deg,#FFF8E1,#FFFFFF)', borderRadius: 30, padding: '26px 22px', maxWidth: 380, width: '100%', textAlign: 'center', fontFamily: 'Nunito, sans-serif', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
        <div className="anim-starpop" style={{ width: 150, height: 150, margin: '0 auto 14px', borderRadius: '50%', border: `5px dashed ${reg.grad[1]}`, background: `${reg.grad[0]}22`, transform: 'rotate(-10deg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: reg.grad[1] }}>
          <span style={{ fontSize: 60, lineHeight: 1 }}>{c.flag}</span>
          <span style={{ fontSize: 13, fontWeight: 900, textTransform: 'uppercase', marginTop: 4 }}>{countryName(code, lang)}</span>
          <span style={{ fontSize: 10, fontWeight: 900 }}>★ MOKALIBO ★</span>
        </div>
        <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 28, fontWeight: 700, color: INK }}>🛂 {t(lang, 'pp_new_stamp')}</div>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#546E7A', margin: '6px 0 18px', lineHeight: 1.5 }}>{t(lang, 'pp_stamp_sub', { c: countryName(code, lang) })}</div>
        <button className="btn-kid soft" onClick={onPassport}
          style={{ width: '100%', background: 'linear-gradient(150deg,#1E3A8A,#1E88E5)', color: 'white', padding: '15px', fontSize: 17, borderRadius: 20, marginBottom: 10 }}>{t(lang, 'pp_see')}</button>
        <button className="btn-kid soft" onClick={onClose}
          style={{ width: '100%', background: '#ECEFF1', color: '#546E7A', padding: '12px', fontSize: 15, borderRadius: 16 }}>{t(lang, 'next')} →</button>
      </div>
    </div>
  )
}

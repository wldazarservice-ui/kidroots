import { useState } from 'react'
import { t } from '../i18n'
import { DISCOVER } from '../data/discover'
import { TText } from '../useTranslated'
import SpeakButton from './SpeakButton'

const INK = '#1A2A4F'

// Découvertes d'un pays : son animal emblématique et l'énigme de son monument
export default function DiscoverCards({ code, lang, color }) {
  const d = DISCOVER[code]
  const [open, setOpen] = useState(null) // 'animal' | 'monument'
  const [reveal, setReveal] = useState(false)
  if (!d) return null

  const card = (key, emoji, label, title) => (
    <button className="btn-kid lift" onClick={() => { setOpen(key); setReveal(false) }}
      style={{ flex: 1, background: 'white', borderRadius: 22, padding: '12px 10px', textAlign: 'center', boxShadow: `0 5px 0 ${color}22, 0 8px 18px rgba(26,42,79,0.08)`, border: `3px solid ${color}33` }}>
      <span style={{ display: 'block', fontSize: 40, lineHeight: 1.1 }}>{emoji}</span>
      <span style={{ display: 'block', fontSize: 11, fontWeight: 900, color, textTransform: 'uppercase', marginTop: 4 }}>{label}</span>
      <span style={{ display: 'block', fontSize: 14, fontWeight: 900, color: INK, lineHeight: 1.2 }}>{title}</span>
    </button>
  )

  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ fontSize: 12, fontWeight: 900, color: '#78909C', letterSpacing: 1, marginBottom: 10 }}>✨ {t(lang, 'disc_title').toUpperCase()}</div>
      <div style={{ display: 'flex', gap: 10 }}>
        {card('animal', d.animal.emoji, t(lang, 'disc_animal'), <TText text={d.animal.name} lang={lang} />)}
        {card('monument', d.monument.emoji, t(lang, 'disc_monument'), '❓ ' + t(lang, 'disc_riddle'))}
      </div>

      {open && (
        <div onClick={() => setOpen(null)} className="sheet-backdrop" style={{ position: 'fixed', inset: 0, background: 'rgba(26,42,79,0.5)', zIndex: 600, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div onClick={(e) => e.stopPropagation()} className="anim-slide-up sheet green-bg"
            style={{ width: '100%', maxWidth: 420, borderRadius: '28px 28px 0 0', padding: '22px 18px 26px', fontFamily: 'Nunito, sans-serif', textAlign: 'center' }}>
            {open === 'animal' ? (
              <>
                <div className="float" style={{ fontSize: 80, lineHeight: 1.1 }}>{d.animal.emoji}</div>
                <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 26, fontWeight: 700, color: INK }}><TText text={d.animal.name} lang={lang} /></div>
                <div style={{ background: 'white', borderRadius: 20, padding: '14px', margin: '12px 0', fontSize: 15, fontWeight: 700, color: '#37474F', lineHeight: 1.6, textAlign: 'left' }}>
                  <TText text={d.animal.fact} lang={lang} />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 6 }}><SpeakButton text={[d.animal.name, d.animal.fact]} lang={lang} color={color} size={40} /></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, textAlign: 'left' }}>
                  <div style={{ background: '#E3F2FD', borderRadius: 16, padding: '10px 12px' }}>
                    <div style={{ fontSize: 11, fontWeight: 900, color: '#1565C0' }}>🏞️ {t(lang, 'disc_habitat')}</div>
                    <div style={{ fontSize: 14, fontWeight: 900, color: INK }}><TText text={d.animal.habitat} lang={lang} /></div>
                  </div>
                  <div style={{ background: '#E8F8EA', borderRadius: 16, padding: '10px 12px' }}>
                    <div style={{ fontSize: 11, fontWeight: 900, color: '#2E7D4F' }}>🌱 {t(lang, 'disc_protect')}</div>
                    <div style={{ fontSize: 14, fontWeight: 900, color: INK }}><TText text={d.animal.protect} lang={lang} /></div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="float" style={{ fontSize: 70, lineHeight: 1.1 }}>{reveal ? d.monument.emoji : '❓'}</div>
                <div style={{ fontSize: 13, fontWeight: 900, color: '#7B1FA2', textTransform: 'uppercase' }}>{t(lang, 'disc_riddle')} · {t(lang, 'rid_q')}</div>
                <div style={{ background: 'white', borderRadius: 20, padding: '14px', margin: '12px 0', fontSize: 16, fontWeight: 800, color: '#37474F', lineHeight: 1.6 }}>
                  « <TText text={d.monument.riddle} lang={lang} /> »
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: 6 }}><SpeakButton text={[d.monument.riddle]} lang={lang} color="#7B1FA2" size={40} /></div>
                </div>
                {reveal ? (
                  <div className="anim-pop" style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 24, fontWeight: 700, color: INK }}>{d.monument.emoji} <TText text={d.monument.name} lang={lang} /></div>
                ) : (
                  <button className="btn-kid soft" onClick={() => setReveal(true)}
                    style={{ background: 'linear-gradient(180deg,#BA68C8,#7B1FA2)', color: 'white', padding: '14px 22px', fontSize: 17, borderRadius: 18, boxShadow: '0 5px 0 #4A148C' }}>🔍 {t(lang, 'disc_reveal')}</button>
                )}
              </>
            )}
            <button className="btn-kid" onClick={() => setOpen(null)}
              style={{ width: '100%', marginTop: 16, background: '#ECEFF1', color: '#546E7A', padding: '12px', fontSize: 15, borderRadius: 16 }}>✕</button>
          </div>
        </div>
      )}
    </div>
  )
}

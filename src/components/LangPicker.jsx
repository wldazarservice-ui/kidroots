import { useState } from 'react'
import { LANGUAGES } from '../i18n'

export default function LangPicker({ lang, onChange }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setOpen(!open)}
        style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: 'white', padding: '6px 12px', borderRadius: 14, cursor: 'pointer', fontFamily: 'Nunito, sans-serif', fontWeight: 900, fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
        <span>{LANGUAGES[lang].flag}</span>
        <span>{LANGUAGES[lang].name}</span>
        <span style={{ fontSize: 10 }}>{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div style={{ position: 'absolute', top: '110%', right: 0, background: 'white', borderRadius: 16, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.25)', zIndex: 200, minWidth: 160 }}>
          {Object.entries(LANGUAGES).map(([code, l]) => (
            <div key={code} onClick={() => { onChange(code); setOpen(false) }}
              style={{ padding: '11px 16px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', background: code === lang ? '#f5f5f5' : 'white', fontFamily: 'Nunito, sans-serif', fontWeight: code === lang ? 900 : 700, fontSize: 14, color: '#333', borderBottom: '1px solid #f0f0f0' }}
              onMouseOver={e => e.currentTarget.style.background = '#f0f0f0'}
              onMouseOut={e => e.currentTarget.style.background = code === lang ? '#f5f5f5' : 'white'}>
              <span style={{ fontSize: 20 }}>{l.flag}</span>
              <span>{l.name}</span>
              {code === lang && <span style={{ marginLeft: 'auto', color: '#4CAF50' }}>✓</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

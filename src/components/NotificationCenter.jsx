import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { COUNTRIES } from '../data/countries'
import { TEASERS } from '../data/teasers'
import { NEWS } from '../data/news'
import { TText } from '../useTranslated'
import { countryName } from '../names'
import { t } from '../i18n'

const INK = '#1A2A4F'
const KEY = 'kidroots_notif_read'
const readSet = () => { try { return new Set(JSON.parse(localStorage.getItem(KEY) || '[]')) } catch { return new Set() } }
const today = () => new Date().toISOString().slice(0, 10)

// Les notifications du moment : le « Le savais-tu ? » du jour, les nouveautes, et les invitations (parrainage, cadeau)
function buildItems({ lang, account, onInvite, onGift, onCountry }) {
  const L = (o) => o[lang] || o.fr
  const day = Math.floor(Date.now() / 86400000)
  const codes = Object.keys(COUNTRIES).filter((c) => TEASERS[c] || COUNTRIES[c].teaser)
  const code = codes[(day * 7) % codes.length]
  const items = [{
    id: 'fact-' + today(), icon: COUNTRIES[code].flag, date: today(),
    title: `${t(lang, 'nt_fact')} · ${countryName(code, lang)}`,
    text: <TText text={TEASERS[code] || COUNTRIES[code].teaser} lang={lang} />,
    cta: onCountry && { label: t(lang, 'discover') + ' →', run: () => onCountry(code) },
  }]
  if (account?.refCode && onInvite) items.push({
    id: 'invite-' + today().slice(0, 7), icon: '🎁', date: today(), title: t(lang, 'inv_btn'),
    text: t(lang, 'nt_invite'), cta: { label: t(lang, 'nt_invite_cta'), run: onInvite },
  })
  for (const n of NEWS) items.push({ id: 'news-' + n.date + '-' + n.icon, icon: n.icon, date: n.date, title: L(n.title), text: L(n.text) })
  if (onGift) items.push({ id: 'gift-' + today().slice(0, 7), icon: '💝', date: today(), title: t(lang, 'gift_btn').replace(/^🎁\s*/, ''), text: t(lang, 'nt_gift'), cta: { label: t(lang, 'nt_gift_cta'), run: onGift } })
  return items
}

export default function NotificationCenter({ lang, account, onInvite, onGift, onCountry, light }) {
  const [open, setOpen] = useState(false)
  const [read, setRead] = useState(readSet)
  const items = useMemo(() => buildItems({ lang, account, onInvite, onGift, onCountry }), [lang, account, onInvite, onGift, onCountry])
  const unread = items.filter((i) => !read.has(i.id)).length
  const markAll = () => {
    const s = new Set([...read, ...items.map((i) => i.id)])
    setRead(s)
    try { localStorage.setItem(KEY, JSON.stringify([...s].slice(-200))) } catch {}
  }
  useEffect(() => { if (open) { const id = setTimeout(markAll, 1200); return () => clearTimeout(id) } }, [open])

  return (
    <>
      <button className="btn-kid" onClick={() => setOpen(true)} aria-label={t(lang, 'nt_title')} title={t(lang, 'nt_title')}
        style={{ position: 'relative', background: 'white', width: 40, height: 40, borderRadius: '50%', fontSize: 19, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 3px 10px rgba(26,42,79,0.12)', flexShrink: 0 }}>
        🔔
        {unread > 0 && <span className="notif-badge">{unread > 9 ? '9+' : unread}</span>}
      </button>
      {open && createPortal(
        <div onClick={() => setOpen(false)} className="sheet-backdrop" style={{ position: 'fixed', inset: 0, background: 'rgba(26,42,79,0.5)', zIndex: 650, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div onClick={(e) => e.stopPropagation()} className="anim-slide-up sheet"
            style={{ width: '100%', maxWidth: 460, maxHeight: '88vh', overflowY: 'auto', borderRadius: '28px 28px 0 0', padding: '20px 16px 26px', fontFamily: 'Nunito, sans-serif', background: '#F4F7FB' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ flex: 1, fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 24, fontWeight: 700, color: INK }}>🔔 {t(lang, 'nt_title')}</div>
              <button onClick={() => setOpen(false)} aria-label="Fermer" style={{ background: '#E3EAF2', color: '#546E7A', width: 38, height: 38, borderRadius: '50%', border: 'none', fontSize: 16, cursor: 'pointer' }}>✕</button>
            </div>
            {items.map((i) => (
              <div key={i.id} style={{ display: 'flex', gap: 12, background: 'white', borderRadius: 20, padding: '14px 14px', marginBottom: 10, boxShadow: '0 4px 14px rgba(26,42,79,0.06)', border: read.has(i.id) ? '2px solid transparent' : '2px solid #FFD54F' }}>
                <div style={{ fontSize: 30, width: 48, height: 48, borderRadius: 16, background: '#FFF8E1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ flex: 1, fontSize: 15, fontWeight: 900, color: INK, lineHeight: 1.25 }}>{i.title}</div>
                    {!read.has(i.id) && <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#FF7A00', flexShrink: 0 }} />}
                  </div>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: '#546E7A', lineHeight: 1.45, marginTop: 3 }}>{i.text}</div>
                  {i.cta && (
                    <button className="btn-kid soft" onClick={() => { setOpen(false); i.cta.run() }}
                      style={{ marginTop: 8, background: '#FFC400', color: INK, padding: '8px 14px', fontSize: 13, borderRadius: 999 }}>{i.cta.label}</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>,
        document.getElementById('root') || document.body,
      )}
    </>
  )
}

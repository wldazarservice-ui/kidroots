import { useMemo, useState } from 'react'
import { COUNTRIES, REGIONS } from '../data/countries'
import { countryName } from '../names'
import { t } from '../i18n'
import { downloadForTrip, getOffline } from '../offline'
import { isTranslatable } from '../translator'

// Langues traduites : les traductions sont gardees dans le stockage du navigateur (~5 Mo), d'ou une limite
const MAX_TRANSLATED = 40

const INK = '#1A2A4F'

// « Telecharger pour le voyage » : choisir des pays (ou un continent entier) et les jeux, pour jouer sans internet
export default function TripDownload({ lang, onClose }) {
  const saved = useMemo(() => getOffline(), [])
  const have = new Set(saved.lang === lang ? saved.codes : [])
  const [region, setRegion] = useState('africa')
  const [sel, setSel] = useState(() => new Set())
  const [games, setGames] = useState(!(saved.lang === lang && saved.games))
  const [prog, setProg] = useState(null) // { done, total, label } | 'ok' | 'err'
  const online = navigator.onLine

  const codes = (REGIONS[region]?.countries || []).filter((c) => COUNTRIES[c]).sort((a, b) => countryName(a, lang).localeCompare(countryName(b, lang), lang))
  const max = isTranslatable(lang) ? MAX_TRANSLATED : Infinity
  const room = max - have.size
  const toggle = (c) => setSel((s) => { const n = new Set(s); if (n.has(c)) n.delete(c); else if (n.size < room) n.add(c); return n })
  const allOn = codes.every((c) => sel.has(c) || have.has(c))
  const toggleAll = () => setSel((s) => { const n = new Set(s); codes.forEach((c) => (allOn ? n.delete(c) : !have.has(c) && n.size < room && n.add(c))); return n })

  const start = async () => {
    setProg({ done: 0, total: sel.size + (games ? 1 : 0), label: '' })
    try {
      await downloadForTrip({ codes: [...sel], games, lang, onProgress: (p) => setProg(p) })
      setProg('ok')
    } catch (e) { console.error(e); setProg('err') }
  }

  const chip = (on, done) => ({ display: 'inline-flex', alignItems: 'center', gap: 6, border: `2px solid ${done ? '#A5D6A7' : on ? '#1E88E5' : '#E3EAF2'}`, background: done ? '#E8F5E9' : on ? '#E3F2FD' : 'white', color: INK, borderRadius: 999, padding: '6px 10px', fontSize: 13, fontWeight: 800, fontFamily: 'inherit', cursor: done ? 'default' : 'pointer' })
  const count = sel.size + (games ? 1 : 0)

  return (
    <div onClick={prog && prog !== 'ok' && prog !== 'err' ? undefined : onClose} className="sheet-backdrop" style={{ position: 'fixed', inset: 0, background: 'rgba(26,42,79,0.5)', zIndex: 660, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div onClick={(e) => e.stopPropagation()} className="anim-slide-up sheet"
        style={{ width: '100%', maxWidth: 480, borderRadius: '28px 28px 0 0', padding: '20px 16px 24px', background: '#F4F7FB', fontFamily: 'Nunito, sans-serif', color: INK }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
          <div style={{ flex: 1, fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 23, fontWeight: 700 }}>✈️ {t(lang, 'trip_title')}</div>
          <button className="btn-kid" onClick={onClose} aria-label="✕" style={{ background: '#E3EAF2', color: '#546E7A', width: 36, height: 36, borderRadius: '50%' }}>✕</button>
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#546E7A', lineHeight: 1.5, marginBottom: 12 }}>{t(lang, 'trip_sub')}</div>

        {prog === 'ok' ? (
          <div style={{ textAlign: 'center', padding: '24px 6px' }}>
            <div style={{ fontSize: 56 }}>🧳</div>
            <div style={{ fontSize: 18, fontWeight: 900, color: '#2E7D4F', margin: '8px 0', lineHeight: 1.4 }}>{t(lang, 'trip_ok')}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#546E7A', lineHeight: 1.5 }}>{t(lang, 'trip_ok_sub')}</div>
            <button className="btn-kid soft" onClick={onClose} style={{ marginTop: 16, background: 'linear-gradient(180deg,#FFE04D,#FFC400)', color: INK, padding: '14px 26px', fontSize: 17, borderRadius: 20, boxShadow: '0 5px 0 #E6A100' }}>{t(lang, 'trip_close')}</button>
          </div>
        ) : prog && prog !== 'err' ? (
          <div style={{ padding: '26px 6px', textAlign: 'center' }}>
            <div style={{ fontSize: 15, fontWeight: 900, marginBottom: 10 }}>
              📥 {prog.label === 'games' ? `🎮 ${t(lang, 'trip_games')}` : prog.label && COUNTRIES[prog.label] ? `${COUNTRIES[prog.label].flag} ${countryName(prog.label, lang)}` : '…'}
            </div>
            <div style={{ height: 14, background: '#E3EAF2', borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ width: `${Math.round(((prog.done || 0) / Math.max(1, prog.total)) * 100)}%`, height: '100%', background: 'linear-gradient(90deg,#43C27A,#2E9E5B)', transition: 'width .3s' }} />
            </div>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#78909C', marginTop: 8 }}>{prog.done} / {prog.total} · {t(lang, 'trip_wait')}</div>
          </div>
        ) : (
          <>
            {/* Jeux */}
            <button type="button" onClick={() => setGames(!games)} aria-pressed={games}
              style={{ ...chip(games, false), width: '100%', justifyContent: 'flex-start', borderRadius: 16, padding: '12px 14px', fontSize: 15, marginBottom: 12 }}>
              <span style={{ fontSize: 20 }}>{games ? '☑️' : '⬜'}</span> 🎮 {t(lang, 'trip_games')}
              {saved.lang === lang && saved.games && <span style={{ marginLeft: 'auto', color: '#2E7D4F' }}>✅</span>}
            </button>

            {/* Continents */}
            <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 6, marginBottom: 6 }}>
              {Object.entries(REGIONS).filter(([, r]) => r.countries.length).map(([k, r]) => (
                <button key={k} type="button" onClick={() => setRegion(k)}
                  style={{ flexShrink: 0, border: 'none', borderRadius: 999, padding: '7px 12px', fontWeight: 900, fontSize: 13, fontFamily: 'inherit', cursor: 'pointer', background: region === k ? r.color : 'white', color: region === k ? 'white' : INK }}>
                  {r.mascot} {t(lang, `region_${k}`) !== `region_${k}` ? t(lang, `region_${k}`) : r.name}
                </button>
              ))}
            </div>
            <button type="button" onClick={toggleAll} style={{ background: 'none', border: 'none', color: '#1565C0', fontWeight: 900, fontSize: 13, fontFamily: 'inherit', cursor: 'pointer', padding: '2px 0 8px' }}>
              {allOn ? t(lang, 'trip_none') : t(lang, 'trip_all')}
            </button>

            {/* Pays du continent */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, maxHeight: '34dvh', overflowY: 'auto', paddingBottom: 4 }}>
              {codes.map((c) => {
                const done = have.has(c)
                return (
                  <button key={c} type="button" onClick={() => !done && toggle(c)} aria-pressed={sel.has(c)} style={chip(sel.has(c), done)}>
                    <span>{COUNTRIES[c].flag}</span> {countryName(c, lang) || COUNTRIES[c].name} {done ? '✅' : sel.has(c) ? '☑️' : ''}
                  </button>
                )
              })}
            </div>

            {max !== Infinity && sel.size >= room && <div style={{ marginTop: 10, fontSize: 13, fontWeight: 800, color: '#E65100' }}>{t(lang, 'trip_max', { n: String(MAX_TRANSLATED) })}</div>}
            {!online && <div style={{ marginTop: 10, fontSize: 13, fontWeight: 900, color: '#C62828' }}>{t(lang, 'trip_offline')}</div>}
            {prog === 'err' && <div style={{ marginTop: 10, fontSize: 13, fontWeight: 900, color: '#C62828' }}>{t(lang, 'trip_err')}</div>}
            <button className="btn-kid soft" onClick={start} disabled={!count || !online}
              style={{ width: '100%', marginTop: 14, background: 'linear-gradient(180deg,#43C27A,#2E9E5B)', color: 'white', padding: '15px', fontSize: 17, borderRadius: 20, boxShadow: '0 5px 0 #1F7A43', opacity: !count || !online ? 0.5 : 1 }}>
              📥 {t(lang, 'trip_go', { n: String(sel.size) })}{games ? ' + 🎮' : ''}
            </button>
            <div style={{ marginTop: 8, fontSize: 12, fontWeight: 700, color: '#78909C', textAlign: 'center', lineHeight: 1.5 }}>{t(lang, 'trip_note')}</div>
          </>
        )}
      </div>
    </div>
  )
}

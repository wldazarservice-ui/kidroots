import { useEffect, useState } from 'react'
import { fetchMetrics } from '../premium'

const INK = '#1A2A4F'
const euro = (c = 0) => (c / 100).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })
const pct = (a, b) => (b ? `${Math.round((a / b) * 1000) / 10} %` : '—')

const FUNNEL = [
  ['landing_view', '👀 Visites'],
  ['guest_start', '▶ Essais sans compte'],
  ['signup', '✍️ Comptes créés'],
  ['limit_hit', '🌙 Limite du jour atteinte'],
  ['paywall_open', '🔓 Offre affichée'],
  ['checkout_start', '💳 Paiement commencé'],
  ['trial', '🎁 Essais 3 jours'],
  ['school_request', '🏫 Demandes écoles'],
  ['purchase', '⭐ Nouveaux abonnés'],
]

// Tableau de bord du proprietaire (visible uniquement pour son email, verifie aussi cote serveur)
export default function AdminDashboard({ user, onClose }) {
  const [days, setDays] = useState(30)
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    setData(null); setError('')
    fetchMetrics(user, days).then(setData).catch((e) => setError(e.message))
  }, [user, days])

  const sum = (k) => (data?.rows || []).reduce((a, r) => a + (r[k] || 0), 0)
  const sources = {}
  for (const r of data?.rows || []) {
    for (const [src, ev] of Object.entries(r.src || {})) {
      sources[src] ||= {}
      for (const [k, v] of Object.entries(ev)) sources[src][k] = (sources[src][k] || 0) + v
    }
  }
  // Tous les jours de la periode, y compris ceux sans visite
  const byDay = Object.fromEntries((data?.rows || []).map((r) => [r.day, r]))
  const allDays = Array.from({ length: days }, (_, i) => {
    const d = new Date(Date.now() - (days - 1 - i) * 86400000).toISOString().slice(0, 10)
    return byDay[d] || { day: d }
  })
  const maxVisits = Math.max(1, ...allDays.map((r) => r.landing_view || 0))

  const tile = (label, value, color = INK) => (
    <div style={{ background: 'white', borderRadius: 18, padding: '14px', boxShadow: '0 4px 14px rgba(26,42,79,0.07)' }}>
      <div style={{ fontSize: 12, fontWeight: 900, color: '#78909C' }}>{label}</div>
      <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 26, fontWeight: 700, color }}>{value}</div>
    </div>
  )

  return (
    <div onClick={onClose} className="sheet-backdrop" style={{ position: 'fixed', inset: 0, background: 'rgba(26,42,79,0.5)', zIndex: 650, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div onClick={(e) => e.stopPropagation()} className="anim-slide-up sheet sheet-wide"
        style={{ width: '100%', maxWidth: 420, maxHeight: '94vh', overflowY: 'auto', borderRadius: '28px 28px 0 0', padding: '20px 16px 26px', background: '#F4F7FB', fontFamily: 'Nunito, sans-serif', color: INK }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <div style={{ flex: 1, fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 24, fontWeight: 700 }}>📈 Tableau de bord</div>
          <select value={days} onChange={(e) => setDays(Number(e.target.value))}
            style={{ padding: '8px 10px', borderRadius: 12, border: '2px solid #E3EAF2', fontFamily: 'inherit', fontWeight: 800 }}>
            <option value={1}>Aujourd'hui</option>
            <option value={7}>7 jours</option>
            <option value={30}>30 jours</option>
            <option value={90}>90 jours</option>
          </select>
          <button className="btn-kid" onClick={onClose} style={{ background: '#E3EAF2', color: '#546E7A', width: 38, height: 38, borderRadius: '50%' }}>✕</button>
        </div>

        <div style={{ fontSize: 12, fontWeight: 800, color: '#78909C', marginBottom: 14 }}>🔒 Privé : visible uniquement par le propriétaire de Mokalibo. Chiffres de tout le site, anonymes.</div>
        {error && <div style={{ color: '#C62828', fontWeight: 800 }}>Erreur : {error}</div>}
        {!data && !error && <div style={{ textAlign: 'center', padding: 30, fontSize: 30 }}>⏳</div>}
        {data && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 10, marginBottom: 14 }}>
              {tile('💶 Encaissé', euro(sum('revenueCents')), '#2E9E5B')}
              {tile('⭐ Nouveaux abonnés', sum('purchase'), '#FF7A00')}
              {tile('🎁 Essais 3 jours', sum('trial'), '#8E24AA')}
              {tile('👨‍💻 Comptes (total)', data.totals.users)}
              {tile('💳 Payants (total)', data.totals.premium, '#1E88E5')}
              {tile('🔁 Résiliations', sum('cancel'), '#C62828')}
              {tile('📅 Annuels / mensuels', `${sum('plan_year')} / ${sum('plan_month')}`)}
            </div>

            <div style={{ background: 'white', borderRadius: 18, padding: 14, marginBottom: 14 }}>
              <div style={{ fontWeight: 900, marginBottom: 8 }}>Entonnoir</div>
              {FUNNEL.map(([k, label], i) => {
                const v = sum(k)
                const base = sum('landing_view')
                return (
                  <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', borderTop: i ? '1px solid #F1F4F8' : 'none', fontSize: 14, fontWeight: 800 }}>
                    <span style={{ flex: 1 }}>{label}</span>
                    <span style={{ fontWeight: 900 }}>{v}</span>
                    <span style={{ width: 64, textAlign: 'right', color: '#90A4AE', fontSize: 12 }}>{i ? pct(v, base) : ''}</span>
                  </div>
                )
              })}
            </div>

            <div style={{ background: 'white', borderRadius: 18, padding: 14, marginBottom: 14 }}>
              <div style={{ fontWeight: 900, marginBottom: 8 }}>Visites par jour</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 90 }}>
                {allDays.map((r) => (
                  <div key={r.day} title={`${r.day} : ${r.landing_view || 0} visites, ${r.purchase || 0} abonnés`}
                    style={{ flex: 1, height: `${Math.max(3, ((r.landing_view || 0) / maxVisits) * 100)}%`, background: r.purchase ? '#FF7A00' : '#43C27A', borderRadius: 4 }} />
                ))}
              </div>
              <div style={{ fontSize: 11, color: '#90A4AE', fontWeight: 800, marginTop: 6 }}>En orange : jours avec au moins un nouvel abonné.</div>
            </div>

            <div style={{ background: 'white', borderRadius: 18, padding: 14 }}>
              <div style={{ fontWeight: 900, marginBottom: 4 }}>Sources (liens ?utm_source=…)</div>
              <div style={{ fontSize: 12, color: '#78909C', fontWeight: 700, marginBottom: 8 }}>Exemple de lien pour une pub Instagram : mokalibo.com/?utm_source=instagram</div>
              {Object.keys(sources).length === 0 ? (
                <div style={{ fontSize: 13, color: '#90A4AE', fontWeight: 800 }}>Aucune source pour l'instant.</div>
              ) : Object.entries(sources).sort((a, b) => (b[1].landing_view || 0) - (a[1].landing_view || 0)).map(([src, ev]) => (
                <div key={src} style={{ display: 'flex', gap: 10, fontSize: 13, fontWeight: 800, padding: '5px 0', borderTop: '1px solid #F1F4F8' }}>
                  <span style={{ flex: 1 }}>{src}</span>
                  <span>👀 {ev.landing_view || 0}</span>
                  <span>▶ {ev.guest_start || 0}</span>
                  <span>✍️ {ev.signup || 0}</span>
                </div>
              ))}
            </div>

            <div style={{ background: 'white', borderRadius: 18, padding: 14, marginTop: 14 }}>
              <div style={{ fontWeight: 900, marginBottom: 4 }}>🏫 Demandes de devis des écoles</div>
              <div style={{ fontSize: 12, color: '#78909C', fontWeight: 700, marginBottom: 8 }}>Après paiement de la facture : ajoute l'e-mail du compte de l'école dans la variable Netlify SCHOOL_EMAILS.</div>
              {(data.schools || []).length === 0 ? (
                <div style={{ fontSize: 13, color: '#90A4AE', fontWeight: 800 }}>Aucune demande pour l'instant.</div>
              ) : data.schools.map((r) => (
                <div key={r.id} style={{ fontSize: 13, fontWeight: 700, padding: '8px 0', borderTop: '1px solid #F1F4F8', lineHeight: 1.45 }}>
                  <div style={{ fontWeight: 900 }}>{r.school} · {r.students || '?'} élèves{r.city ? ` · ${r.city}` : ''}</div>
                  <div>{r.name} · <a href={`mailto:${r.email}?subject=${encodeURIComponent('Mokalibo pour ' + r.school)}`}>{r.email}</a> · {r.at ? new Date(r.at).toLocaleDateString('fr-FR') : ''}</div>
                  {r.message && <div style={{ color: '#546E7A' }}>{r.message}</div>}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

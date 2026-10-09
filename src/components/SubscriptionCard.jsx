import { useState } from 'react'
import { PLANS, openBillingPortal, PAYWALL_ENABLED } from '../premium'
import { openSupport } from '../support'

const INK = '#1A2A4F'
const fmt = (iso) => (iso ? new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : '—')

// « Mon abonnement » (dans Mon compte) : etat clair + actions (carte, factures, resiliation, reprise, s'abonner)
export default function SubscriptionCard({ user, account = {}, onOpenOffer }) {
  const [busy, setBusy] = useState('')
  const [err, setErr] = useState('')
  const go = async (flow) => {
    setBusy(flow || 'portal'); setErr('')
    try { await openBillingPortal(user, flow) } catch (e) {
      console.error(e); setBusy('')
      setErr("L'espace de paiement n'a pas pu s'ouvrir. Réessaie, ou écris-nous via « Aide et contact ».")
    }
  }
  const card = { background: 'white', borderRadius: 20, padding: '14px 16px', marginBottom: 14, boxShadow: '0 4px 14px rgba(26,42,79,0.06)' }
  const btn = (bg, color) => ({ width: '100%', background: bg, color, border: 'none', borderRadius: 14, padding: '12px', fontSize: 15, fontWeight: 900, fontFamily: 'inherit', cursor: 'pointer', marginTop: 8 })
  const kind = account.kind || 'free'
  const planKey = `${account.tier === 'teacher' ? 'teacher_' : ''}${account.plan === 'year' ? 'year' : 'month'}`
  const price = PLANS[planKey] ? `${PLANS[planKey].label} ${account.plan === 'year' ? 'par an' : 'par mois'}` : ''
  const name = account.tier === 'teacher' ? 'Formule Enseignant' : 'Formule Famille'

  let title, lines = [], actions = null
  if (kind === 'school') {
    title = '🏫 Licence École active'
    lines = ['Accès illimité pour tous les élèves de l’école.', 'Facturation sur devis : pour toute question, écris-nous.']
  } else if (kind === 'gift') {
    title = '🎁 Accès illimité offert'
    lines = ['Rien à payer : profite de toutes les aventures !']
  } else if (kind === 'lifetime') {
    title = '⭐ Accès illimité à vie'
    lines = ['Acheté avant l’arrivée de l’abonnement : il reste valable pour toujours.']
  } else if (kind === 'subscription') {
    title = `💳 ${name} · ${account.plan === 'year' ? 'annuelle' : 'mensuelle'}`
    const trial = account.subStatus === 'trialing'
    if (trial && !account.cancelAtPeriodEnd) lines = [`🎁 Essai gratuit jusqu'au ${fmt(account.until)}.`, `Ensuite : ${price}, prélevé automatiquement. Résilie avant cette date pour ne rien payer.`]
    else if (trial) lines = [`Essai résilié : accès illimité jusqu'au ${fmt(account.until)}, aucun prélèvement.`]
    else if (account.cancelAtPeriodEnd) lines = [`Résiliée : accès illimité jusqu'au ${fmt(account.until)}, puis retour à la version gratuite.`, 'Tu peux encore changer d’avis et reprendre ton abonnement.']
    else if (account.subStatus === 'past_due') lines = ['⚠️ Le dernier paiement a échoué. Mets à jour ta carte bancaire pour garder l’accès.']
    else lines = [`✅ Active · ${price}`, `Prochain renouvellement : ${fmt(account.until)}.`]
    actions = (
      <>
        <button type="button" onClick={() => go('payment')} disabled={!!busy} style={btn('#E3F2FD', '#1565C0')}>{busy === 'payment' ? '…' : '💳 Changer de carte bancaire'}</button>
        <button type="button" onClick={() => go('')} disabled={!!busy} style={btn('#F1F4F8', INK)}>{busy === 'portal' ? '…' : account.cancelAtPeriodEnd ? '↩️ Reprendre mon abonnement' : '🧾 Factures et détails'}</button>
        {!account.cancelAtPeriodEnd && (
          <button type="button" onClick={() => go('cancel')} disabled={!!busy} style={btn('#FFEBEE', '#C62828')}>{busy === 'cancel' ? '…' : 'Résilier l’abonnement'}</button>
        )}
      </>
    )
  } else if (account.hasCustomer) {
    title = '🌙 Abonnement terminé'
    lines = ['Tu es revenu à la version gratuite (2 histoires et 3 parties de jeux par jour).']
    actions = (
      <>
        {PAYWALL_ENABLED && onOpenOffer && <button type="button" onClick={onOpenOffer} style={btn('linear-gradient(180deg,#43C27A,#2E9E5B)', 'white')}>⭐ Me réabonner</button>}
        <button type="button" onClick={() => go('')} disabled={!!busy} style={btn('#F1F4F8', INK)}>{busy === 'portal' ? '…' : '🧾 Voir mes anciennes factures'}</button>
      </>
    )
  } else {
    title = '🆓 Version gratuite'
    lines = ['2 nouvelles histoires et 3 parties de jeux par jour et par enfant.']
    actions = PAYWALL_ENABLED && onOpenOffer && (
      <button type="button" onClick={onOpenOffer} style={btn('linear-gradient(180deg,#43C27A,#2E9E5B)', 'white')}>
        ⭐ Découvrir la Formule Famille{account.trial > 0 ? ' · 3 jours gratuits' : ''}
      </button>
    )
  }

  return (
    <div style={card}>
      <div style={{ fontSize: 12, fontWeight: 900, color: '#78909C', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>Mon abonnement</div>
      <div style={{ fontSize: 17, fontWeight: 900, color: INK, marginBottom: 4 }}>{title}</div>
      {lines.map((l) => <div key={l} style={{ fontSize: 14, fontWeight: 700, color: '#455A64', lineHeight: 1.5 }}>{l}</div>)}
      {actions}
      {err && <div style={{ marginTop: 8, fontSize: 13, fontWeight: 800, color: '#C62828' }}>{err}</div>}
      <div style={{ marginTop: 10, fontSize: 12, fontWeight: 700, color: '#90A4AE', lineHeight: 1.5 }}>
        Paiement sécurisé par Stripe. Résiliation aussi possible sans connexion : <a href="/kuendigen" target="_blank" rel="noopener" style={{ color: 'inherit' }}>Verträge hier kündigen</a> ·{' '}
        <button type="button" onClick={() => openSupport({ where: 'subscription', topic: 'payment' })} style={{ background: 'none', border: 'none', padding: 0, color: '#1565C0', fontWeight: 900, fontFamily: 'inherit', fontSize: 12, cursor: 'pointer', textDecoration: 'underline' }}>une question ?</button>
      </div>
    </div>
  )
}

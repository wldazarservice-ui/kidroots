import { useState } from 'react'
import { PLANS, openBillingPortal, PAYWALL_ENABLED, redeemGift } from '../premium'
import { openGift } from './Gift'
import { openSupport } from '../support'

const INK = '#1A2A4F'
const fmt = (iso) => (iso ? new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : '—')

// « Mon abonnement » (dans Mon compte) : etat clair + actions (carte, factures, resiliation, reprise, s'abonner)
export default function SubscriptionCard({ user, account = {}, onOpenOffer }) {
  const [busy, setBusy] = useState('')
  const [err, setErr] = useState('')
  const [code, setCode] = useState('')
  const [giftMsg, setGiftMsg] = useState('')
  const redeem = async (e) => {
    e.preventDefault(); setBusy('gift'); setGiftMsg('')
    try {
      const r = await redeemGift(user, code)
      window.dispatchEvent(new CustomEvent('mokalibo:welcome', { detail: { gift: true, applied: r.applied, until: r.until } }))
      setGiftMsg('✅'); setTimeout(() => window.location.reload(), 2500)
    } catch (e2) {
      setGiftMsg({ used: 'Ce code a déjà été utilisé.', mine: 'Ce code est déjà activé sur ton compte.', unknown: 'Code introuvable : vérifie les lettres.', code: 'Le code ressemble à MOKA-XXXX-XXXX.', limit: 'Trop d’essais aujourd’hui. Réessaie demain.' }[e2.message] || 'L’activation a échoué. Réessaie.')
    }
    setBusy('')
  }
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
  } else if (kind === 'giftcard') {
    title = '🎁 Carte cadeau'
    lines = [`Accès illimité jusqu'au ${fmt(account.giftUntil)}.`, 'Ensuite, la version gratuite reprend automatiquement : aucun prélèvement.']
    actions = PAYWALL_ENABLED && onOpenOffer && (
      <button type="button" onClick={onOpenOffer} style={btn('#F1F4F8', INK)}>⭐ Prolonger avec la Formule Famille</button>
    )
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
      {kind !== 'school' && kind !== 'gift' && kind !== 'lifetime' && (
        <form onSubmit={redeem} style={{ marginTop: 12, paddingTop: 10, borderTop: '2px solid #F1F4F8' }}>
          <div style={{ fontSize: 13, fontWeight: 900, color: '#E65100', marginBottom: 6 }}>🎁 J’ai un code cadeau</div>
          <div style={{ display: 'flex', gap: 6 }}>
            <input value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} placeholder="MOKA-XXXX-XXXX" maxLength={20} autoCapitalize="characters"
              style={{ flex: 1, minWidth: 0, padding: '10px 12px', borderRadius: 12, border: '2px solid #FFE0B2', fontFamily: 'inherit', fontSize: 15, fontWeight: 900, letterSpacing: 1, color: INK }} />
            <button type="submit" disabled={!code || !!busy} style={{ border: 'none', borderRadius: 12, padding: '0 14px', background: '#FF7A00', color: 'white', fontWeight: 900, fontFamily: 'inherit', cursor: 'pointer', opacity: !code ? 0.5 : 1 }}>{busy === 'gift' ? '…' : 'Activer'}</button>
          </div>
          {giftMsg && giftMsg !== '✅' && <div style={{ marginTop: 6, fontSize: 13, fontWeight: 800, color: '#C62828' }}>{giftMsg}</div>}
        </form>
      )}
      <button type="button" onClick={openGift} style={{ marginTop: 10, background: 'none', border: 'none', padding: 0, color: '#E65100', fontWeight: 900, fontFamily: 'inherit', fontSize: 13, cursor: 'pointer', textDecoration: 'underline' }}>🎁 Offrir Mokalibo à une autre famille</button>
      <div style={{ marginTop: 10, fontSize: 12, fontWeight: 700, color: '#90A4AE', lineHeight: 1.5 }}>
        Paiement sécurisé par Stripe. Résiliation aussi possible sans connexion : <a href="/kuendigen" target="_blank" rel="noopener" style={{ color: 'inherit' }}>Verträge hier kündigen</a> ·{' '}
        <button type="button" onClick={() => openSupport({ where: 'subscription', topic: 'payment' })} style={{ background: 'none', border: 'none', padding: 0, color: '#1565C0', fontWeight: 900, fontFamily: 'inherit', fontSize: 12, cursor: 'pointer', textDecoration: 'underline' }}>une question ?</button>
      </div>
    </div>
  )
}

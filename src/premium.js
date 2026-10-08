// Modele « freemium » : tous les pays sont jouables, avec 2 nouveaux chapitres par jour et par enfant.
// La Formule Famille (abonnement mensuel ou annuel, 5 enfants / 5 appareils) rend tout illimite.
// Les montants doivent correspondre a PLANS dans netlify/lib/shared.mjs.
export const DAILY_FREE_CHAPTERS = 2
export const PLANS = {
  month: { cents: 399, label: '3,99 €' },
  year: { cents: 2999, label: '29,99 €', perMonth: '2,50 €', savePct: 37 },
}
export const PRICE_LABEL = PLANS.month.label

// Interrupteur : le paiement n'est actif que si VITE_PAYWALL_ENABLED=true dans Netlify.
// Tant qu'il est desactive, toute l'app reste gratuite (aucun pays verrouille).
export const PAYWALL_ENABLED = import.meta.env.VITE_PAYWALL_ENABLED === 'true'

// Limite quotidienne : daily = { date: 'AAAA-MM-JJ', ids: [chapitres commences ce jour] }
export const todayKey = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
export const todayIds = (child) => (child?.daily?.date === todayKey() ? child.daily.ids || [] : [])
export const chaptersLeft = (child, premium) =>
  !PAYWALL_ENABLED || premium ? Infinity : Math.max(0, DAILY_FREE_CHAPTERS - todayIds(child).length)
// Un chapitre deja termine ou deja commence aujourd'hui reste toujours accessible
export const canOpenChapter = (child, chapterId, isDone, premium) =>
  !PAYWALL_ENABLED || premium || isDone || todayIds(child).includes(chapterId) || todayIds(child).length < DAILY_FREE_CHAPTERS

async function call(path, user, body) {
  const token = await user.getIdToken()
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${token}` },
    body: JSON.stringify(body || {}),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`)
  return data
}

// Ouvre la page de paiement Stripe
export async function startCheckout(user, { waiver, plan = 'year' } = {}) {
  const data = await call('/api/create-checkout', user, { waiver: waiver === true, plan })
  if (data.alreadyPremium) return { alreadyPremium: true }
  window.location.assign(data.url)
  return { redirected: true }
}

// Au retour de Stripe : confirme le paiement cote serveur
export async function confirmCheckout(user, sessionId) {
  const data = await call('/api/confirm-checkout', user, { sessionId })
  return !!data.premium
}

// Espace client Stripe (changer de formule, factures, resilier)
export async function openBillingPortal(user) {
  const data = await call('/api/billing-portal', user)
  window.location.assign(data.url)
}

// Suppression definitive du compte (profils enfants, appareils, compte de connexion)
export async function deleteAccount(user) {
  return call('/api/delete-account', user, { confirm: true })
}

// Tableau de bord du proprietaire
export async function fetchMetrics(user, days = 30) {
  const token = await user.getIdToken()
  const res = await fetch(`/api/metrics?days=${days}`, { headers: { authorization: `Bearer ${token}` } })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`)
  return data
}

export const OWNER_EMAILS = ['wld.azarservice@gmail.com']
export const isOwnerEmail = (email) => !!email && OWNER_EMAILS.includes(email.toLowerCase())

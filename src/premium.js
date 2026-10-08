// Acces premium : 2 € a vie par compte parent (Stripe). Le Mali reste gratuit.
export const FREE_COUNTRIES = ['ML']
export const PRICE_LABEL = '2 €'

// Interrupteur : le paiement n'est actif que si VITE_PAYWALL_ENABLED=true dans Netlify.
// Tant qu'il est desactive, toute l'app reste gratuite (aucun pays verrouille).
export const PAYWALL_ENABLED = import.meta.env.VITE_PAYWALL_ENABLED === 'true'

export const isCountryLocked = (code, premium) => PAYWALL_ENABLED && !premium && !FREE_COUNTRIES.includes(code)

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
export async function startCheckout(user, { waiver } = {}) {
  const data = await call('/api/create-checkout', user, { waiver: waiver === true })
  if (data.alreadyPremium) return { alreadyPremium: true }
  window.location.assign(data.url)
  return { redirected: true }
}

// Au retour de Stripe : confirme le paiement cote serveur
export async function confirmCheckout(user, sessionId) {
  const data = await call('/api/confirm-checkout', user, { sessionId })
  return !!data.premium
}

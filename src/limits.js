// Limites du compte (profils enfants / eleves et appareils), fixees par le serveur selon la formule :
// famille 5 / 5, enseignant 35 / 5, ecole 300 / 30. Les regles Firestore les imposent aussi.
export const LIMITS = { children: 5, devices: 5, tier: 'family' }
export function setLimits(d = {}) {
  LIMITS.children = d.maxChildren || 5
  LIMITS.devices = d.maxDevices || 5
  LIMITS.tier = d.tier || 'family'
}
export const slots = (prefix, n) => Array.from({ length: n }, (_, i) => `${prefix}${i + 1}`)

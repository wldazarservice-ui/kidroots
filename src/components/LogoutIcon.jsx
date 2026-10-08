// Icone « deconnexion » dessinee en SVG (le caractere ⏻ s'affiche en rectangle sur beaucoup d'appareils)
export default function LogoutIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ display: 'block', flexShrink: 0 }}>
      <path d="M9 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h3" />
      <path d="M16 16l4-4-4-4" />
      <path d="M20 12H10" />
    </svg>
  )
}

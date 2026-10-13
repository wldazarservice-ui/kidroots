// Petits éléments communs aux jeux : barre de manches (une pastille par manche) et compteur d'étoiles
const INK = '#1A2A4F'

// results : tableau des manches jouées (true = réussie, false = ratée) ; current : manche en cours
export function RoundDots({ total, results = [], current, stars, label }) {
  return (
    <div className="game-progress">
      {label && <span style={{ fontWeight: 900, color: INK, whiteSpace: 'nowrap', fontSize: 14 }}>{label}</span>}
      <div style={{ display: 'flex', gap: 6, flex: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
        {Array.from({ length: total }, (_, i) => {
          const r = results[i]
          const cls = r === true ? 'ok' : r === false ? 'ko' : i === current ? 'now' : ''
          return <span key={i} className={`round-dot ${cls}`}>{r === true ? '★' : r === false ? '•' : i + 1}</span>
        })}
      </div>
      {stars != null && <span style={{ fontWeight: 900, color: '#FF8F00', whiteSpace: 'nowrap' }}>⭐ {stars}</span>}
    </div>
  )
}

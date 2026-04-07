import { useState } from 'react'

export default function DiscoverScreen({ country: c, nav }) {
  const [current, setCurrent] = useState(0)
  const [flipped, setFlipped] = useState(false)

  if (current >= c.facts.length) {
    return (
      <div style={{ minHeight: '100vh', background: c.light, padding: '24px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div className="anim-starpop" style={{ fontSize: 80, marginBottom: 16 }}>🌟</div>
        <h2 style={{ fontSize: 26, fontWeight: 900, color: c.color, marginBottom: 10, fontFamily: 'Nunito' }}>
          Bravo ! Tu as tout decouvert !
        </h2>
        <p style={{ fontSize: 16, color: '#555', fontWeight: 700, marginBottom: 32 }}>
          Maintenant on passe au quiz ! 🎯
        </p>
        <button className="btn-kid anim-pulse" onClick={nav.goQuiz}
          style={{ background: c.color, color: 'white', padding: '18px 36px', fontSize: 20, boxShadow: `0 6px 20px ${c.color}55`, width: '100%', maxWidth: 300 }}>
          Jouer au quiz ! 🎯
        </button>
      </div>
    )
  }

  const f = c.facts[current]

  return (
    <div style={{ minHeight: '100vh', background: c.light, padding: '24px 20px' }}>
      {/* Progress */}
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 900, color: c.color, marginBottom: 8 }}>
          {c.flag} Decouverte {current + 1} sur {c.facts.length}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
          {c.facts.map((_, i) => (
            <div key={i} style={{ width: 40, height: 8, borderRadius: 4, background: i <= current ? c.color : '#ddd', transition: 'background 0.3s' }} />
          ))}
        </div>
      </div>

      {/* Flip card */}
      <div onClick={() => setFlipped(!flipped)} style={{ cursor: 'pointer', margin: '0 auto 24px', maxWidth: 300 }}>
        <div style={{ background: 'white', borderRadius: 28, padding: '36px 24px', textAlign: 'center', border: `4px solid ${c.color}`, minHeight: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: `0 8px 28px ${c.color}33`, transition: 'transform 0.15s' }}>
          <div style={{ fontSize: 80, marginBottom: 16 }}>{f.e}</div>
          {!flipped ? (
            <div>
              <div style={{ fontSize: 16, color: '#888', fontWeight: 700 }}>👆 Touche pour decouvrir !</div>
            </div>
          ) : (
            <div className="anim-fadeup">
              <div style={{ fontSize: 24, fontWeight: 900, color: c.color, marginBottom: 6 }}>{f.l}</div>
              <div style={{ fontSize: 16, color: '#555', fontWeight: 700 }}>{f.d}</div>
            </div>
          )}
        </div>
        <div style={{ textAlign: 'center', marginTop: 10, fontSize: 14, color: '#888', fontWeight: 700 }}>
          {flipped ? '✨ Super !' : '👆 Clique sur la carte !'}
        </div>
      </div>

      {/* Next button appears only when flipped */}
      {flipped && (
        <div className="anim-fadeup">
          <button className="btn-kid" onClick={() => { setCurrent(current + 1); setFlipped(false) }}
            style={{ background: c.color, color: 'white', padding: '18px 24px', fontSize: 19, width: '100%', boxShadow: `0 4px 16px ${c.color}44` }}>
            {current < c.facts.length - 1 ? 'Suivant ! →' : 'Fini ! 🎉'}
          </button>
        </div>
      )}
    </div>
  )
}

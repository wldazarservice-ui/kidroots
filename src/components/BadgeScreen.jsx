import { COUNTRIES } from '../data/countries'

export function BadgeScreen({ country: c, badges, isNew, nav }) {
  return (
    <div style={{ minHeight: '100vh', background: `linear-gradient(160deg, ${c.light}, white)`, padding: '24px 20px', textAlign: 'center' }}>
      <div className="anim-starpop" style={{ fontSize: 90, display: 'block', marginBottom: 8 }}>🏅</div>

      <h2 style={{ fontSize: 28, fontWeight: 900, color: c.color, marginBottom: 4, fontFamily: 'Nunito' }}>
        {isNew ? 'Nouveau badge !' : 'Badge recollecte !'}
      </h2>

      {/* Badge card */}
      <div style={{ background: 'white', borderRadius: 24, padding: '24px 20px', margin: '20px auto', maxWidth: 260, border: `4px solid ${c.color}`, boxShadow: `0 10px 32px ${c.color}44` }}>
        <div style={{ fontSize: 72 }}>{c.flag}</div>
        <div style={{ fontSize: 24, fontWeight: 900, color: c.color, marginTop: 8 }}>{c.name}</div>
        <div style={{ fontSize: 14, color: '#888', fontWeight: 700, marginTop: 4 }}>avec {c.charName} {c.char}</div>
        <div style={{ marginTop: 12, fontSize: 12, fontWeight: 700, color: '#aaa' }}>🌟 Explorateur KidRoots</div>
      </div>

      {isNew && (
        <p style={{ fontSize: 15, color: '#555', fontWeight: 700, marginBottom: 8 }}>
          Tu connais maintenant <strong style={{ color: c.color }}>{badges.length} pays</strong> !
        </p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 300, margin: '20px auto 0' }}>
        <button className="btn-kid anim-pulse" onClick={nav.goRegions}
          style={{ background: c.color, color: 'white', padding: '18px', fontSize: 18, boxShadow: `0 6px 20px ${c.color}55` }}>
          Explorer un autre pays ! 🗺️
        </button>
        <button className="btn-kid" onClick={nav.goCollection}
          style={{ background: '#FFF3E0', color: '#FF6F00', padding: '14px', fontSize: 16, fontWeight: 900, border: '2px solid #FF6F00' }}>
          🏅 Ma collection
        </button>
        <button className="btn-kid" onClick={nav.goHome}
          style={{ background: '#f0f0f0', color: '#555', padding: '12px', fontSize: 15 }}>
          🏠 Accueil
        </button>
      </div>
    </div>
  )
}

export function CollectionScreen({ badges, nav }) {
  const total = Object.keys(COUNTRIES).length
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #FFF8E1, #FFF3E0)', padding: '24px 20px' }}>
      <button className="btn-kid" onClick={nav.goHome}
        style={{ background: 'rgba(0,0,0,0.08)', color: '#333', padding: '8px 18px', fontSize: 14, marginBottom: 18 }}>
        ← Retour
      </button>

      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ fontSize: 28, fontWeight: 900, color: '#FF6F00' }}>🏅 Ma collection</div>
        <div style={{ fontSize: 16, color: '#FF6F00', fontWeight: 700, marginTop: 4 }}>
          {badges.length} / {total} badges
        </div>
        {/* Progress bar */}
        <div style={{ background: '#FFE0B2', borderRadius: 10, height: 12, margin: '12px auto', maxWidth: 280 }}>
          <div style={{ background: '#FF6F00', height: '100%', borderRadius: 10, width: `${(badges.length / total) * 100}%`, transition: 'width 0.5s' }} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
        {Object.entries(COUNTRIES).map(([code, c]) => {
          const earned = badges.includes(code)
          return (
            <div key={code} style={{ background: earned ? c.light : '#f5f5f5', borderRadius: 18, padding: '14px 8px', textAlign: 'center', border: `3px solid ${earned ? c.color : '#E0E0E0'}`, opacity: earned ? 1 : 0.5, transition: 'all 0.3s' }}>
              <div style={{ fontSize: 32 }}>{earned ? c.flag : '🔒'}</div>
              <div style={{ fontSize: 11, fontWeight: 900, color: earned ? c.color : '#aaa', marginTop: 4, lineHeight: 1.2 }}>{c.name}</div>
              {earned && <div style={{ fontSize: 14, marginTop: 4 }}>🏅</div>}
            </div>
          )
        })}
      </div>

      {badges.length === total && (
        <div className="anim-fadeup" style={{ textAlign: 'center', marginTop: 24, background: 'white', borderRadius: 20, padding: 20, border: '3px solid #FF6F00' }}>
          <div style={{ fontSize: 48 }}>🌍🏆🌍</div>
          <div style={{ fontSize: 20, fontWeight: 900, color: '#FF6F00' }}>Tu as explore le monde entier !</div>
        </div>
      )}
    </div>
  )
}

import { useState, useEffect } from 'react'

export default function QuizScreen({ country: c, nav }) {
  const [qi, setQi] = useState(0)
  const [score, setScore] = useState(0)
  const [choice, setChoice] = useState(null)
  const [opts, setOpts] = useState([])

  useEffect(() => {
    if (qi < c.quiz.length) {
      const q = c.quiz[qi]
      setOpts(Math.random() > 0.5 ? [q.a, q.w] : [q.w, q.a])
    }
  }, [qi, c])

  if (qi >= c.quiz.length) {
    const stars = score === c.quiz.length ? 3 : score >= 2 ? 2 : 1
    return (
      <div style={{ minHeight: '100vh', background: c.light, padding: '24px 20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div className="anim-starpop" style={{ fontSize: 80, marginBottom: 12 }}>
          {stars === 3 ? '🏆' : stars === 2 ? '🌟' : '😊'}
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 900, color: c.color, marginBottom: 8, fontFamily: 'Nunito' }}>
          {stars === 3 ? 'Parfait !' : stars === 2 ? 'Bien joue !' : 'Continue comme ca !'}
        </h2>
        <div style={{ fontSize: 48, margin: '16px 0', letterSpacing: 4 }}>
          {Array(c.quiz.length).fill(0).map((_, i) => (
            <span key={i} style={{ opacity: i < score ? 1 : 0.3 }}>⭐</span>
          ))}
        </div>
        <p style={{ fontSize: 18, color: '#555', fontWeight: 700, marginBottom: 32 }}>
          {score} / {c.quiz.length} bonnes reponses
        </p>
        <button className="btn-kid anim-pulse" onClick={nav.goBadge}
          style={{ background: c.color, color: 'white', padding: '20px 36px', fontSize: 20, width: '100%', maxWidth: 300, boxShadow: `0 6px 20px ${c.color}55` }}>
          Gagner mon badge ! 🏅
        </button>
      </div>
    )
  }

  const q = c.quiz[qi]

  const handleChoice = (ans) => {
    if (choice) return
    setChoice(ans)
    if (ans === q.a) setScore(s => s + 1)
    setTimeout(() => { setQi(qi + 1); setChoice(null) }, 1400)
  }

  return (
    <div style={{ minHeight: '100vh', background: c.light, padding: '24px 20px' }}>
      {/* Progress */}
      <div style={{ textAlign: 'center', marginBottom: 18 }}>
        <div style={{ fontSize: 14, fontWeight: 900, color: c.color, marginBottom: 8 }}>
          {c.flag} Question {qi + 1} sur {c.quiz.length}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
          {c.quiz.map((_, i) => (
            <div key={i} style={{ width: 40, height: 8, borderRadius: 4, background: i < qi ? c.color : i === qi ? '#FFC107' : '#ddd', transition: 'background 0.3s' }} />
          ))}
        </div>
      </div>

      {/* Question card */}
      <div style={{ background: 'white', borderRadius: 24, padding: '24px 20px', marginBottom: 20, border: `3px solid ${c.color}22`, textAlign: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.07)' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>{q.e}</div>
        <div style={{ fontSize: 18, fontWeight: 900, color: '#222', lineHeight: 1.4 }}>{q.q}</div>
      </div>

      {/* Answer buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {opts.map((opt, i) => {
          let bg = 'white', border = '3px solid #E0E0E0', color = '#333', icon = i === 0 ? '🅰️' : '🅱️'
          if (choice) {
            if (opt === q.a) { bg = '#E8F5E9'; border = '3px solid #2E7D32'; color = '#1B5E20'; icon = '✅' }
            else if (opt === choice) { bg = '#FFEBEE'; border = '3px solid #C62828'; color = '#B71C1C'; icon = '❌' }
            else { icon = '' }
          }
          return (
            <button key={i} className={`btn-kid ${choice && opt === choice && choice !== q.a ? 'anim-shake' : ''}`}
              onClick={() => handleChoice(opt)}
              style={{ background: bg, border, color, padding: '20px 20px', fontSize: 17, fontWeight: 900, borderRadius: 20, textAlign: 'left', display: 'flex', alignItems: 'center', gap: 14, boxShadow: '0 2px 10px rgba(0,0,0,0.06)', transition: 'background 0.3s, border 0.3s' }}>
              <span style={{ fontSize: 28, width: 36, textAlign: 'center' }}>{icon}</span>
              <span>{opt}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import SpeakButton from './SpeakButton'
import { ttsStop } from '../tts'

export default function QuizLevel({ chapter: ch, country: c, lang, onDone }) {
  const [qi, setQi] = useState(0)
  const [score, setScore] = useState(0)
  const [choice, setChoice] = useState(null)
  const [opts, setOpts] = useState([])
  const [finished, setFinished] = useState(false)
  const [animKey, setAnimKey] = useState(0)

  useEffect(() => {
    if (qi < ch.quiz.length) {
      const q = ch.quiz[qi]
      const all = [q.correct, q.wrong1, q.wrong2].filter(Boolean)
      setOpts([...all].sort(() => Math.random() - 0.5))
      setAnimKey(k => k + 1)
    } else if (!finished) {
      setFinished(true)
      onDone(score)
    }
  }, [qi])

  const handleAnswer = (ans) => {
    if (choice) return
    ttsStop()
    setChoice(ans)
    const q = ch.quiz[qi]
    if (ans === q.correct) setScore(s => s + 1)
    setTimeout(() => { setQi(qi + 1); setChoice(null) }, 1600)
  }

  if (finished || qi >= ch.quiz.length) return (
    <div style={{ minHeight:'100vh', background:ch.light, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Nunito,sans-serif' }}>
      <div style={{ fontSize:40, textAlign:'center', color:ch.color, fontWeight:900 }}>⏳ Calcul des resultats...</div>
    </div>
  )

  const q = ch.quiz[qi]
  return (
    <div style={{ minHeight:'100vh', background:ch.light, padding:'18px 14px', fontFamily:'Nunito,sans-serif' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
        <div style={{ fontSize:12, fontWeight:900, color:ch.color }}>{c.flag} Question {qi+1} / {ch.quiz.length}</div>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ background:'white', borderRadius:14, padding:'4px 10px', fontSize:12, fontWeight:900, color:ch.color, boxShadow:'0 2px 6px rgba(0,0,0,0.08)' }}>⭐ {score} / {qi}</div>
          <div style={{ display:'flex', gap:5 }}>
            {ch.quiz.map((_,i) => <div key={i} style={{ width:24, height:6, borderRadius:3, background:i<qi?ch.color:i===qi?'#FFC107':'#ddd' }} />)}
          </div>
        </div>
      </div>
      <div key={`q-${animKey}`} className="anim-card-flip" style={{ background:'white', borderRadius:24, padding:'22px 18px', marginBottom:18, textAlign:'center', boxShadow:'0 4px 16px rgba(0,0,0,0.06)', border:`3px solid ${ch.color}22` }}>
        <div className="float" style={{ fontSize:52, marginBottom:12 }}>{q.emoji}</div>
        <div style={{ fontSize:18, fontWeight:900, color:'#222', lineHeight:1.45, marginBottom:12 }}>{q.q}</div>
        <div style={{ display:'flex', justifyContent:'center' }}>
          <SpeakButton key={`qspeak-${qi}`} text={q.q} lang={lang} color={ch.color} size={40} autoPlay />
        </div>
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        {opts.map((opt,i) => {
          let bg='white', border='3px solid #E0E0E0', col='#333', icon=['🅰️','🅱️','🅲️'][i]
          let extraClass = ''
          if (choice) {
            if (opt===q.correct) { bg='#E8F5E9'; border='3px solid #2E7D32'; col='#1B5E20'; icon='✅'; extraClass=' anim-correct' }
            else if (opt===choice) { bg='#FFEBEE'; border='3px solid #C62828'; col='#B71C1C'; icon='❌'; extraClass=' anim-wrong' }
          }
          return (
            <button key={i} className={`btn-kid${extraClass}`}
              onClick={() => handleAnswer(opt)}
              style={{ background:bg, border, color:col, padding:'18px 16px', fontSize:15, fontWeight:900, borderRadius:18, textAlign:'left', display:'flex', alignItems:'center', gap:14, boxShadow:'0 2px 8px rgba(0,0,0,0.06)', transition:'background 0.25s' }}>
              <span style={{ fontSize:24, width:30, textAlign:'center' }}>{icon}</span>
              <span>{opt}</span>
            </button>
          )
        })}
      </div>
      {choice && (
        <div style={{ marginTop:16, padding:'14px 16px', borderRadius:16, textAlign:'center', fontSize:16, fontWeight:900, background: choice===q.correct ? '#E8F5E9' : '#FFF3E0', color: choice===q.correct ? '#1B5E20' : '#E65100', boxShadow:'0 2px 8px rgba(0,0,0,0.06)' }}>
          {choice===q.correct ? '🎉 Bravo !' : `✏️ La bonne réponse : ${q.correct}`}
        </div>
      )}
    </div>
  )
}

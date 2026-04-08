import { useState } from 'react'
import { t } from '../i18n'
import SpeakButton from './SpeakButton'
import { ttsStop } from '../tts'

export default function CardLevel({ chapter: ch, country: c, lang, nav, onDone }) {
  const [idx, setIdx] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [animKey, setAnimKey] = useState(0)

  const handleNext = () => {
    ttsStop()
    setRevealed(false)
    setIdx(idx + 1)
    setAnimKey(k => k + 1)
  }

  if (idx >= ch.cards.length) return (
    <div style={{ minHeight: '100vh', background: ch.light, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center', fontFamily: 'Nunito, sans-serif' }}>
      <div style={{ fontSize: 80, marginBottom: 16 }} className="float">📚</div>
      <div style={{ fontSize: 26, fontWeight: 900, color: ch.color, marginBottom: 8 }}>{t(lang, 'docs_done')}</div>
      <div style={{ fontSize: 15, color: '#555', fontWeight: 700, marginBottom: 32 }}>{t(lang, 'docs_done_sub')}</div>
      <button className="btn-kid anim-slide-up anim-glow" onClick={onDone}
        style={{ background: ch.color, color: 'white', padding: '18px 32px', fontSize: 18, boxShadow: `0 6px 20px ${ch.color}55` }}>
        {t(lang, 'start_quiz')}
      </button>
    </div>
  )

  const card = ch.cards[idx]
  return (
    <div style={{ minHeight: '100vh', background: ch.light, padding: '18px 16px', fontFamily: 'Nunito, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div style={{ fontSize: 12, fontWeight: 900, color: ch.color }}>{c.flag} {idx + 1} / {ch.cards.length}</div>
        <div style={{ display: 'flex', gap: 5 }}>
          {ch.cards.map((_, i) => <div key={i} style={{ width: 24, height: 6, borderRadius: 3, background: i <= idx ? ch.color : '#ddd' }} />)}
        </div>
      </div>

      <div
        key={`card-${animKey}`}
        className="card-flip-wrapper anim-card-flip"
        onClick={() => setRevealed(!revealed)}
        style={{ background: 'white', borderRadius: 28, padding: '28px 20px', textAlign: 'center', border: `4px solid ${revealed ? ch.color : '#eee'}`, minHeight: 280, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: `0 8px 24px ${ch.color}22`, transition: 'border 0.3s', marginBottom: 16, position: 'relative' }}>
        <div className="float" style={{ fontSize: 76, marginBottom: 14 }}>{card.emoji}</div>
        <div style={{ fontSize: 22, fontWeight: 900, color: ch.color, marginBottom: 10 }}>{card.title}</div>
        {!revealed
          ? <div style={{ fontSize: 14, color: '#bbb', fontWeight: 700 }}>{t(lang, 'doc_tap')}</div>
          : <div style={{ animation: 'fadeUp 0.4s ease', width: '100%' }}>
              <div style={{ fontSize: 14, color: '#333', fontWeight: 700, lineHeight: 1.75, marginBottom: 14, textAlign: 'left' }}>{card.text}</div>
              <div style={{ background: ch.light, borderRadius: 14, padding: '12px 14px', display: 'flex', gap: 10, textAlign: 'left', marginBottom: 14 }}>
                <span style={{ fontSize: 18, flexShrink: 0 }}>💡</span>
                <div style={{ fontSize: 13, color: ch.color, fontWeight: 900, lineHeight: 1.5 }}>{card.fact}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <SpeakButton
                  key={`card-${idx}`}
                  text={[card.title, card.text, card.fact]}
                  lang={lang}
                  color={ch.color}
                  size={52}
                  autoPlay
                />
              </div>
            </div>
        }
      </div>

      {revealed && (
        <button className="btn-kid anim-slide-up" onClick={handleNext}
          style={{ background: ch.color, color: 'white', padding: '16px', fontSize: 17, width: '100%', boxShadow: `0 4px 16px ${ch.color}44` }}>
          {idx < ch.cards.length - 1 ? t(lang, 'next_doc') : t(lang, 'finish_doc')}
        </button>
      )}
    </div>
  )
}

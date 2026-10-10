import { useState } from 'react'
import { t } from '../i18n'
import SpeakButton from './SpeakButton'
import AutoReadChip from './AutoReadChip'
import { ttsStop } from '../tts'
import { useTranslatedObj } from '../useTranslated'

export default function CardLevel({ chapter: chRaw, country: cRaw, lang, nav, onDone }) {
  const ch = useTranslatedObj(chRaw, lang)
  const c = useTranslatedObj(cRaw, lang)
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
    <div className="green-bg screen-narrow" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center', fontFamily: 'Nunito, sans-serif' }}>
      <div style={{ fontSize: 80, marginBottom: 16 }} className="float">🏆</div>
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
    <div className="green-bg screen-narrow" style={{ minHeight: '100vh', padding: '18px 16px', fontFamily: 'Nunito, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 900, color: ch.color, whiteSpace: 'nowrap', marginRight: 12 }}>{c.flag} {idx + 1} / {ch.cards.length}</div>
        <div style={{ display: 'flex', gap: 4, flex: 1, justifyContent: 'flex-end' }}>
          {ch.cards.map((_, i) => <div key={i} style={{ flex: 1, maxWidth: 24, height: 6, borderRadius: 3, background: i <= idx ? ch.color : 'rgba(46,158,91,0.18)' }} />)}
        </div>
      </div>

      <div
        key={`card-${animKey}`}
        className="card-flip-wrapper anim-card-flip"
        style={{ background: 'white', borderRadius: 28, padding: '24px 20px', textAlign: 'center', border: `4px solid ${ch.color}`, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: `0 8px 24px ${ch.color}22`, marginBottom: 16, position: 'relative' }}>
        <div className="float" style={{ fontSize: 64, marginBottom: 10 }}>{card.emoji}</div>
        {card.date && (
          <div style={{ display: 'inline-block', background: ch.color, color: 'white', borderRadius: 999, padding: '4px 12px', fontSize: 13, fontWeight: 900, marginBottom: 8 }}>📅 {card.date}</div>
        )}
        <div style={{ fontSize: 22, fontWeight: 900, color: ch.color, marginBottom: 12, lineHeight: 1.2 }}>{card.title}</div>
        <div style={{ fontSize: card.text.length > 300 ? 15 : 16, color: '#263238', fontWeight: 700, lineHeight: 1.7, marginBottom: 14, textAlign: 'left', whiteSpace: 'pre-line', width: '100%' }}>{card.text}</div>
        {card.fact && (revealed
          ? <div style={{ animation: 'fadeUp 0.4s ease', background: ch.light, borderRadius: 14, padding: '12px 14px', display: 'flex', gap: 10, textAlign: 'left', marginBottom: 14, width: '100%', boxSizing: 'border-box' }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>💡</span>
              <div style={{ fontSize: 14, color: ch.color, fontWeight: 900, lineHeight: 1.5 }}>{card.fact}</div>
            </div>
          : <button type="button" className="btn-kid soft" onClick={() => setRevealed(true)}
              style={{ background: ch.light, color: ch.color, border: `3px dashed ${ch.color}`, borderRadius: 16, padding: '12px 14px', fontSize: 15, width: '100%', marginBottom: 14 }}>
              💡 {t(lang, 'card_fact_tap')}
            </button>
        )}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12 }}>
          <AutoReadChip lang={lang} color={ch.color} />
          <SpeakButton
            key={`card-${idx}-${revealed ? 'f' : 't'}`}
            text={revealed ? [card.fact] : [card.date, card.title, card.text]}
            lang={lang}
            color={ch.color}
            size={52}
            autoPlay
          />
        </div>
      </div>

      <button className="btn-kid" onClick={handleNext}
        style={{ background: ch.color, color: 'white', padding: '16px', fontSize: 17, width: '100%', boxShadow: `0 4px 16px ${ch.color}44` }}>
        {idx < ch.cards.length - 1 ? t(lang, 'next_doc') : t(lang, 'finish_doc')}
      </button>
    </div>
  )
}

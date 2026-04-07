import { t } from '../i18n'

export default function ResultScreen({ chapter: ch, country: c, score, hasNext, lang, nav }) {
  const pct = Math.round((score / ch.quiz.length) * 100)
  const xp = ch.cards.length * 20 + ch.quiz.length * 30

  return (
    <div style={{ minHeight: '100vh', background: `linear-gradient(160deg,${ch.light},white)`, padding: '24px 20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Nunito, sans-serif' }}>
      <div style={{ fontSize: 90, marginBottom: 12 }}>
        {pct === 100 ? '🏆' : pct >= 66 ? '⭐' : '📚'}
      </div>
      <div style={{ fontFamily: 'Fredoka One, sans-serif', fontSize: 28, color: ch.color, marginBottom: 6 }}>
        {pct === 100 ? t(lang, 'perfect') : pct >= 66 ? t(lang, 'excellent') : t(lang, 'goodjob')}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, fontSize: 34, margin: '14px 0' }}>
        {ch.quiz.map((_, i) => <span key={i} style={{ opacity: i < score ? 1 : 0.2 }}>⭐</span>)}
      </div>
      <div style={{ fontSize: 16, color: '#555', fontWeight: 700, marginBottom: 6 }}>
        {score} / {ch.quiz.length} {t(lang, 'correct')}
      </div>
      <div style={{ background: ch.color, color: 'white', borderRadius: 20, padding: '8px 20px', fontSize: 16, fontWeight: 900, marginBottom: 20, display: 'inline-block' }}>
        +{xp} {t(lang, 'xp_earned')}
      </div>

      <div style={{ background: 'white', borderRadius: 20, padding: '16px 18px', marginBottom: 24, width: '100%', maxWidth: 320, border: `3px solid ${ch.color}22`, textAlign: 'left' }}>
        <div style={{ fontSize: 12, fontWeight: 900, color: ch.color, marginBottom: 8 }}>{t(lang, 'you_learned')}</div>
        {ch.cards.slice(0, 3).map((card, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{ fontSize: 18 }}>{card.emoji}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#444' }}>{card.title}</span>
          </div>
        ))}
        {ch.cards.length > 3 && (
          <div style={{ fontSize: 12, color: '#999', fontWeight: 700 }}>
            {t(lang, 'and_more', { n: ch.cards.length - 3 })}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 300 }}>
        {hasNext && (
          <button className="btn-kid" onClick={nav.goNextChapter}
            style={{ background: ch.color, color: 'white', padding: '18px', fontSize: 18, boxShadow: `0 6px 20px ${ch.color}55` }}>
            {t(lang, 'next_chapter')}
          </button>
        )}
        <button className="btn-kid" onClick={nav.goBack}
          style={{ background: '#f0f0f0', color: '#555', padding: '14px', fontSize: 15 }}>
          {t(lang, 'see_chapters')}
        </button>
        <button className="btn-kid" onClick={nav.goHome}
          style={{ background: 'rgba(0,0,0,0.05)', color: '#888', padding: '12px', fontSize: 14 }}>
          {t(lang, 'home')}
        </button>
      </div>
    </div>
  )
}

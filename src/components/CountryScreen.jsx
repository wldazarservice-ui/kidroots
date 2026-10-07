import { useMemo } from 'react'
import { t } from '../i18n'
import LangPicker from './LangPicker'
import { useTranslatedObj } from '../useTranslated'
import { isDone, LEVELS } from '../levels'

const INK = '#1A2A4F'

export default function CountryScreen({ country: cRaw, lang, changeLang, progress, nav, difficulty }) {
  // On ne traduit que la frise (pas les histoires, traduites a l'ouverture du chapitre)
  const light = useMemo(() => ({
    ...cRaw,
    chapters: cRaw.chapters.map(({ cards, quiz, intro, figure, ...rest }) => ({ ...rest, nCards: cards.length, nQuiz: quiz.length })),
  }), [cRaw])
  const c = useTranslatedObj(light, lang)
  const L = LEVELS[difficulty] || LEVELS.explorer
  const done = (ch) => isDone(progress, ch.id, difficulty)

  const totalXP = c.chapters.reduce((acc, ch) => acc + ch.nCards * 20 + ch.nQuiz * 30, 0)
  const earnedXP = c.chapters.filter(done).reduce((acc, ch) => acc + ch.nCards * 20 + ch.nQuiz * 30, 0)
  const pct = totalXP > 0 ? Math.round((earnedXP / totalXP) * 100) : 0
  const nStories = c.chapters.reduce((a, ch) => a + ch.nCards, 0)
  const nQuiz = c.chapters.reduce((a, ch) => a + ch.nQuiz, 0)

  return (
    <div style={{ minHeight: '100vh', background: `linear-gradient(180deg, ${c.bg} 0%, #FFFFFF 75%)`, fontFamily: 'Nunito, sans-serif' }}>
      <div style={{ padding: '14px 16px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button className="btn-kid" onClick={nav.goRegions}
          style={{ background: 'white', color: INK, padding: '8px 14px', minHeight: 38, fontSize: 14, boxShadow: '0 3px 10px rgba(26,42,79,0.12)' }}>{t(lang, 'back')}</button>
        <div style={{ flex: 1 }} />
        <LangPicker lang={lang} onChange={changeLang} compact />
      </div>

      <div style={{ padding: '10px 16px 30px' }}>
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <div className="float" style={{ fontSize: 76, lineHeight: 1.1 }}>{c.flag}</div>
          <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 34, fontWeight: 700, color: c.color, lineHeight: 1.1, marginTop: 4 }}>{c.name}</div>
          <div style={{ fontSize: 14, color: '#546E7A', fontWeight: 800, marginTop: 2 }}>{c.tagline}</div>
        </div>

        {/* Guide + niveau */}
        <div style={{ background: 'white', borderRadius: 24, padding: 14, marginBottom: 12, display: 'flex', gap: 12, alignItems: 'center', boxShadow: '0 8px 22px rgba(26,42,79,0.08)' }}>
          <div style={{ fontSize: 46, width: 64, height: 64, borderRadius: 20, background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{c.hero.emoji}</div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 15, fontWeight: 900, color: c.color }}>{c.hero.name}, {c.hero.age} {t(lang, 'years')}</div>
            <div style={{ fontSize: 13, color: '#455A64', fontWeight: 700, lineHeight: 1.45 }}>
              {t(lang, 'guide_text', { n: c.chapters.length })}
            </div>
          </div>
        </div>

        <button className="btn-kid" onClick={nav.openLevelPicker}
          style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, background: `linear-gradient(150deg, ${L.grad[0]}, ${L.grad[1]})`, color: 'white', borderRadius: 20, padding: '10px 14px', marginBottom: 12, textAlign: 'left', boxShadow: `0 5px 0 ${L.grad[1]}55` }}>
          <span style={{ fontSize: 28 }}>{L.emoji}</span>
          <span style={{ flex: 1, fontSize: 14, fontWeight: 900 }}>
            {t(lang, `lvl_${difficulty || 'explorer'}`)}
            <span style={{ display: 'block', fontSize: 12, fontWeight: 800, opacity: 0.92 }}>📖 {nStories} {t(lang, 'stories_word')} · 🎯 {nQuiz} {t(lang, 'questions_word')}</span>
          </span>
          <span style={{ background: 'rgba(255,255,255,0.25)', borderRadius: 999, padding: '5px 11px', fontSize: 13 }}>✎</span>
        </button>

        <div style={{ background: 'white', borderRadius: 18, padding: '12px 14px', marginBottom: 20, boxShadow: '0 4px 14px rgba(26,42,79,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 900, color: '#78909C' }}>{t(lang, 'progress')}</span>
            <span style={{ fontSize: 12, fontWeight: 900, color: c.color }}>⭐ {earnedXP} / {totalXP} XP</span>
          </div>
          <div style={{ background: '#ECEFF1', borderRadius: 8, height: 12, overflow: 'hidden' }}>
            <div style={{ width: `${pct}%`, height: '100%', background: c.color, borderRadius: 8, transition: 'width 0.8s' }} />
          </div>
        </div>

        <div style={{ fontSize: 12, fontWeight: 900, color: '#78909C', letterSpacing: 1, marginBottom: 10 }}>
          {t(lang, 'timeline')}
        </div>

        {c.chapters.map((ch, i) => {
          const chDone = done(ch)
          const prevDone = i === 0 || done(c.chapters[i - 1])
          const locked = !prevDone && !chDone
          const xpChap = ch.nCards * 20 + ch.nQuiz * 30
          return (
            <div key={ch.id}>
              {i > 0 && <div style={{ width: 4, height: 16, borderRadius: 2, background: chDone || prevDone ? ch.color : '#E0E6EC', margin: '0 0 0 37px' }} />}
              <button className="btn-kid" disabled={locked} onClick={() => !locked && nav.startChapter(i)}
                style={{ width: '100%', textAlign: 'left', background: chDone ? ch.light : 'white', borderRadius: 22, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12, cursor: locked ? 'default' : 'pointer', opacity: locked ? 0.55 : 1, border: `3px solid ${chDone ? ch.color : locked ? '#ECEFF1' : ch.color + '55'}`, boxShadow: locked ? 'none' : `0 5px 0 ${ch.color}22` }}>
                <div style={{ width: 50, height: 50, borderRadius: 16, background: locked ? '#ECEFF1' : ch.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>
                  {locked ? '🔒' : ch.emoji}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11, fontWeight: 900, color: ch.color, letterSpacing: 0.3 }}>📅 {ch.era}</div>
                  <div style={{ fontSize: 16, fontWeight: 900, color: INK, lineHeight: 1.2 }}>{ch.title}</div>
                  <div style={{ fontSize: 12, color: '#607D8B', fontWeight: 700 }}>{ch.subtitle}</div>
                  <div style={{ fontSize: 11, color: '#90A4AE', fontWeight: 800, marginTop: 2 }}>📖 {ch.nCards} · 🎯 {ch.nQuiz}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  {chDone ? <div style={{ fontSize: 26 }}>⭐</div>
                    : !locked && <div style={{ fontSize: 12, fontWeight: 900, color: 'white', background: '#FF9800', borderRadius: 999, padding: '3px 8px' }}>+{xpChap} XP</div>}
                </div>
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

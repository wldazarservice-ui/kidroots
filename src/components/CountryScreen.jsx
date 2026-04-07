import { t } from '../i18n'
import LangPicker from './LangPicker'

export default function CountryScreen({ country: c, code, lang, changeLang, progress, nav }) {
  const totalXP = c.chapters.reduce((acc, ch) => acc + ch.cards.length * 20 + ch.quiz.length * 30, 0)
  const earnedXP = c.chapters.filter(ch => progress.done[ch.id]).reduce((acc, ch) => acc + ch.cards.length * 20 + ch.quiz.length * 30, 0)
  const pct = totalXP > 0 ? Math.round((earnedXP / totalXP) * 100) : 0

  return (
    <div style={{ minHeight: '100vh', background: `linear-gradient(160deg,${c.dark},${c.color}22,#0a0e1a)`, fontFamily: 'Nunito, sans-serif' }}>
      <div style={{ padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(0,0,0,0.2)' }}>
        <button className="btn-kid" onClick={nav.goRegions}
          style={{ background: 'rgba(255,255,255,0.12)', color: 'white', padding: '7px 14px', fontSize: 13 }}>{t(lang, 'back')}</button>
        <div style={{ fontSize: 13, fontWeight: 900, color: 'rgba(255,255,255,0.7)', flex: 1 }}>{c.flag} {c.name}</div>
        <div style={{ fontSize: 12, fontWeight: 900, color: '#FFD600', marginRight: 6 }}>{pct}%</div>
        <LangPicker lang={lang} onChange={changeLang} />
      </div>

      <div style={{ padding: '20px 18px' }}>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 70 }}>{c.flag}</div>
          <div style={{ fontFamily: 'Fredoka One, sans-serif', fontSize: 32, color: 'white', marginTop: 6 }}>{c.name}</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>{c.tagline}</div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 18, padding: '14px', marginBottom: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ fontSize: 52 }}>{c.hero.emoji}</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 900, color: '#FFD600' }}>{c.hero.name}, {c.hero.age} ans</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 700, lineHeight: 1.5 }}>
              {t(lang, 'guide_text', { n: c.chapters.length })}
            </div>
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '10px 14px', marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 900, color: 'rgba(255,255,255,0.4)' }}>{t(lang, 'progress')}</span>
            <span style={{ fontSize: 12, fontWeight: 900, color: '#FFD600' }}>{earnedXP} / {totalXP} XP</span>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 8, height: 8 }}>
            <div style={{ width: `${pct}%`, height: '100%', background: c.color, borderRadius: 8, transition: 'width 0.8s' }} />
          </div>
        </div>

        <div style={{ fontSize: 11, fontWeight: 900, color: 'rgba(255,255,255,0.4)', letterSpacing: 1, marginBottom: 12 }}>
          {t(lang, 'timeline')}
        </div>

        {c.chapters.map((ch, i) => {
          const done = progress.done[ch.id]
          const prevDone = i === 0 || progress.done[c.chapters[i - 1].id]
          const locked = !prevDone && !done
          const xpChap = ch.cards.length * 20 + ch.quiz.length * 30
          return (
            <div key={ch.id}>
              {i > 0 && <div style={{ width: 2, height: 14, background: 'rgba(255,255,255,0.1)', margin: '0 0 0 22px' }} />}
              <div onClick={() => !locked && nav.startChapter(i)}
                style={{ background: done ? ch.color + 'CC' : locked ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.08)', borderRadius: 18, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14, cursor: locked ? 'default' : 'pointer', opacity: locked ? 0.4 : 1, border: `2px solid ${done ? ch.color : 'transparent'}`, transition: 'transform 0.15s' }}
                onMouseOver={e => { if (!locked) e.currentTarget.style.transform = 'scale(1.02)' }}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
                <div style={{ width: 46, height: 46, borderRadius: 23, background: done ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>
                  {locked ? '🔒' : ch.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 10, fontWeight: 900, color: 'rgba(255,255,255,0.4)', letterSpacing: 0.5 }}>{ch.era}</div>
                  <div style={{ fontSize: 15, fontWeight: 900, color: 'white' }}>{ch.title}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>{ch.subtitle}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  {done ? <div style={{ fontSize: 24 }}>⭐</div>
                    : !locked && <div style={{ fontSize: 12, fontWeight: 900, color: '#FFD600' }}>+{xpChap} XP</div>}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

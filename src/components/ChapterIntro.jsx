import { t } from '../i18n'
import LangPicker from './LangPicker'
import SpeakButton from './SpeakButton'

export default function ChapterIntro({ chapter: ch, country: c, lang, changeLang, nav }) {
  const xp = ch.cards.length * 20 + ch.quiz.length * 30
  return (
    <div style={{ minHeight: '100vh', background: `linear-gradient(160deg,${ch.color},${c.dark})`, fontFamily: 'Nunito, sans-serif' }}>
      <div style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(0,0,0,0.2)' }}>
        <button className="btn-kid" onClick={nav.goBack}
          style={{ background: 'rgba(255,255,255,0.12)', color: 'white', padding: '7px 14px', fontSize: 12 }}>{t(lang, 'back')}</button>
        <div style={{ fontSize: 11, fontWeight: 900, color: 'rgba(255,255,255,0.5)', flex: 1 }}>{c.flag} {c.name}</div>
        <LangPicker lang={lang} onChange={changeLang} />
      </div>

      <div style={{ padding: '16px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 18 }}>
          <div style={{ fontSize: 64, marginBottom: 8 }}>{ch.emoji}</div>
          <div style={{ fontSize: 10, fontWeight: 900, color: 'rgba(255,255,255,0.5)', letterSpacing: 1, marginBottom: 4 }}>{ch.era}</div>
          <div style={{ fontFamily: 'Fredoka One, sans-serif', fontSize: 28, color: 'white', lineHeight: 1.2 }}>{ch.title}</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', fontWeight: 700, marginTop: 4 }}>{ch.subtitle}</div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 20, padding: '16px 18px', marginBottom: 16, lineHeight: 1.8, position: 'relative' }}>
          <div style={{ fontSize: 14, color: 'white', fontWeight: 600, paddingRight: 48 }}>{ch.intro}</div>
          <div style={{ position: 'absolute', top: 12, right: 12 }}>
            <SpeakButton text={[ch.title, ch.subtitle, ch.intro]} lang={lang} color="#FFD600" size={40} />
          </div>
        </div>

        <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: 18, padding: '14px 16px', marginBottom: 22, display: 'flex', gap: 12, border: '2px solid rgba(255,255,255,0.15)', alignItems: 'center' }}>
          <div style={{ fontSize: 48, flexShrink: 0 }}>{ch.figure.emoji}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 900, color: '#FFD600', marginBottom: 4 }}>⭐ {ch.figure.name}</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, fontWeight: 600 }}>{ch.figure.desc}</div>
          </div>
          <SpeakButton text={[ch.figure.name, ch.figure.desc]} lang={lang} color="#FFD600" size={40} />
        </div>

        <div style={{ display: 'flex', gap: 10, marginBottom: 22 }}>
          {[
            { icon: '📖', val: ch.cards.length, label: t(lang, 'docs'), sub: t(lang, 'historical') },
            { icon: '🎯', val: ch.quiz.length, label: t(lang, 'questions'), sub: t(lang, 'quiz') },
            { icon: '⚡', val: `+${xp}`, label: 'XP', sub: t(lang, 'to_gain'), gold: true },
          ].map((item, i) => (
            <div key={i} style={{ flex: 1, background: 'rgba(255,255,255,0.08)', borderRadius: 14, padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{item.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 900, color: item.gold ? '#FFD600' : 'white' }}>{item.val} {item.label}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>{item.sub}</div>
            </div>
          ))}
        </div>

        <button className="btn-kid" onClick={nav.startCards}
          style={{ background: '#FFD600', color: ch.color, padding: '18px', fontSize: 19, width: '100%', boxShadow: '0 6px 24px rgba(0,0,0,0.3)', fontWeight: 900 }}>
          {t(lang, 'start_explore')}
        </button>
      </div>
    </div>
  )
}

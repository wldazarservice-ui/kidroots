import { t } from '../i18n'
import LangPicker from './LangPicker'
import SpeakButton from './SpeakButton'
import { useTranslatedObj } from '../useTranslated'

const INK = '#1A2A4F'

export default function ChapterIntro({ chapter: chRaw, country: cRaw, lang, changeLang, nav }) {
  const ch = useTranslatedObj(chRaw, lang)
  const c = useTranslatedObj(cRaw, lang)
  const xp = ch.cards.length * 20 + ch.quiz.length * 30
  return (
    <div className="green-bg" style={{ minHeight: '100vh', fontFamily: 'Nunito, sans-serif' }}>
      <div style={{ padding: '14px 16px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button className="btn-kid" onClick={nav.goBack}
          style={{ background: 'white', color: INK, padding: '8px 14px', minHeight: 38, fontSize: 14, boxShadow: '0 3px 10px rgba(26,42,79,0.12)' }}>{t(lang, 'back')}</button>
        <div style={{ flex: 1, fontSize: 14, fontWeight: 900, color: '#3E6B4F', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.flag} {c.name}</div>
        <LangPicker lang={lang} onChange={changeLang} compact />
      </div>

      <div style={{ padding: '12px 16px 30px' }}>
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <div className="float" style={{ fontSize: 46, width: 88, height: 88, margin: '0 auto 10px', borderRadius: 28, background: ch.color, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 8px 0 ${ch.color}44, 0 12px 24px ${ch.color}33` }}>{ch.emoji}</div>
          <div style={{ display: 'inline-block', fontSize: 13, fontWeight: 900, color: 'white', background: '#2E9E5B', borderRadius: 999, padding: '4px 12px', marginBottom: 8 }}>📅 {ch.era}</div>
          <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 30, fontWeight: 700, color: INK, lineHeight: 1.15 }}>{ch.title}</div>
          <div style={{ fontSize: 15, color: '#3E6B4F', fontWeight: 800, marginTop: 4 }}>{ch.subtitle}</div>
        </div>

        <div style={{ background: 'white', borderRadius: 24, padding: '16px 16px 14px', marginBottom: 14, boxShadow: '0 8px 22px rgba(46,158,91,0.12)', borderLeft: `6px solid ${ch.color}` }}>
          <div style={{ fontSize: 15, color: '#263238', fontWeight: 700, lineHeight: 1.75 }}>{ch.intro}</div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
            <SpeakButton text={[ch.title, ch.subtitle, ch.intro]} lang={lang} color={ch.color} size={44} />
          </div>
        </div>

        <div style={{ background: '#FFF8E1', borderRadius: 22, padding: '14px', marginBottom: 18, display: 'flex', gap: 12, alignItems: 'center', border: '3px solid #FFE082' }}>
          <div style={{ fontSize: 40, width: 60, height: 60, borderRadius: 18, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{ch.figure.emoji}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 15, fontWeight: 900, color: '#E65100', marginBottom: 3 }}>⭐ {ch.figure.name}</div>
            <div style={{ fontSize: 13, color: '#5D4037', lineHeight: 1.55, fontWeight: 700 }}>{ch.figure.desc}</div>
          </div>
          <SpeakButton text={[ch.figure.name, ch.figure.desc]} lang={lang} color="#FF9800" size={40} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 20 }}>
          {[
            { icon: '📖', val: ch.cards.length, label: t(lang, 'docs'), color: ch.color },
            { icon: '🎯', val: ch.quiz.length, label: t(lang, 'questions'), color: '#1E88E5' },
            { icon: '⭐', val: `+${xp}`, label: 'XP', color: '#FF9800' },
          ].map((item, i) => (
            <div key={i} style={{ background: 'white', borderRadius: 18, padding: '12px 6px', textAlign: 'center', boxShadow: '0 4px 12px rgba(46,158,91,0.10)' }}>
              <div style={{ fontSize: 24 }}>{item.icon}</div>
              <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 22, fontWeight: 700, color: item.color, lineHeight: 1.1 }}>{item.val}</div>
              <div style={{ fontSize: 12, color: '#607D8B', fontWeight: 800 }}>{item.label}</div>
            </div>
          ))}
        </div>

        <button className="btn-kid" onClick={nav.startCards}
          style={{ background: 'linear-gradient(180deg,#43C27A,#2E9E5B)', color: 'white', padding: '19px', fontSize: 20, width: '100%', borderRadius: 24, boxShadow: '0 7px 0 #1F7A43, 0 12px 24px rgba(46,158,91,0.35)' }}>
          {t(lang, 'start_explore')}
        </button>
      </div>
    </div>
  )
}

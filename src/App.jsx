import { useState, useEffect } from 'react'
import { COUNTRIES, REGIONS } from './data/countries'
import { getLang, setLang } from './i18n'
import HomeScreen from './components/HomeScreen'
import RegionScreen from './components/RegionScreen'
import CountryScreen from './components/CountryScreen'
import ChapterIntro from './components/ChapterIntro'
import CardLevel from './components/CardLevel'
import QuizLevel from './components/QuizLevel'
import ResultScreen from './components/ResultScreen'

const SAVE_KEY = 'kidroots_v3_progress'

function loadProgress() {
  try {
    const d = localStorage.getItem(SAVE_KEY)
    return d ? JSON.parse(d) : { xp: 0, level: 1, done: {} }
  } catch (e) { return { xp: 0, level: 1, done: {} } }
}

function saveProgress(p) {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(p)) } catch (e) {}
}

export default function App() {
  const [screen, setScreen] = useState('home')
  const [region, setRegion] = useState(null)
  const [countryCode, setCountryCode] = useState(null)
  const [chapterIdx, setChapterIdx] = useState(null)
  const [step, setStep] = useState('intro')
  const [quizScore, setQuizScore] = useState(0)
  const [progress, setProgress] = useState(loadProgress)
  const [xpAnim, setXpAnim] = useState(null)
  const [lang, setLangState] = useState(getLang)

  const country = countryCode ? COUNTRIES[countryCode] : null
  const chapter = country && chapterIdx !== null ? country.chapters[chapterIdx] : null

  const changeLang = (l) => { setLang(l); setLangState(l) }

  const addXP = (xp, chapterId) => {
    setProgress(p => {
      const newXP = p.xp + xp
      const newLevel = Math.floor(newXP / 300) + 1
      const done = { ...p.done, [chapterId]: true }
      const next = { xp: newXP, level: newLevel, done }
      saveProgress(next)
      return next
    })
    setXpAnim(xp)
    setTimeout(() => setXpAnim(null), 2000)
  }

  const nav = {
    goHome: () => setScreen('home'),
    goRegions: () => setScreen('regions'),
    goCountry: (code) => { setCountryCode(code); setScreen('country') },
    goBack: () => {
      if (screen === 'country') setScreen('regions')
      else if (screen === 'chapter' || screen === 'result') setScreen('country')
    },
    startChapter: (idx) => {
      setChapterIdx(idx)
      setStep('intro')
      setQuizScore(0)
      setScreen('chapter')
    },
    startCards: () => setStep('cards'),
    startQuiz: () => setStep('quiz'),
    finishChapter: (score) => {
      const xp = chapter.cards.length * 20 + chapter.quiz.length * 30
      addXP(xp, chapter.id)
      setQuizScore(score)
      setScreen('result')
    },
    goNextChapter: () => {
      const next = chapterIdx + 1
      if (next < country.chapters.length) {
        setChapterIdx(next)
        setStep('intro')
        setQuizScore(0)
        setScreen('chapter')
      } else {
        setScreen('country')
      }
    },
  }

  const shared = { lang, changeLang, progress, nav }

  return (
    <div style={{ minHeight: '100vh' }}>
      {xpAnim && (
        <div style={{
          position: 'fixed', top: 60, right: 16, zIndex: 999,
          background: '#FFD600', color: '#1A237E',
          padding: '8px 18px', borderRadius: 20,
          fontWeight: 900, fontSize: 16,
          fontFamily: 'Nunito, sans-serif',
          animation: 'popIn 0.4s ease',
        }}>+{xpAnim} XP !</div>
      )}

      {screen === 'home'    && <HomeScreen {...shared} />}
      {screen === 'regions' && <RegionScreen {...shared} />}
      {screen === 'country' && country && <CountryScreen country={country} code={countryCode} {...shared} />}

      {screen === 'chapter' && chapter && step === 'intro' && (
        <ChapterIntro chapter={chapter} country={country} {...shared} />
      )}
      {screen === 'chapter' && chapter && step === 'cards' && (
        <CardLevel chapter={chapter} country={country} {...shared} />
      )}
      {screen === 'chapter' && chapter && step === 'quiz' && (
        <QuizLevel chapter={chapter} country={country} onDone={nav.finishChapter} />
      )}
      {screen === 'result' && chapter && (
        <ResultScreen chapter={chapter} country={country} score={quizScore}
          hasNext={chapterIdx + 1 < country.chapters.length} {...shared} />
      )}
    </div>
  )
}

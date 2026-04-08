import { useState, useEffect, useCallback } from 'react'
import { COUNTRIES, REGIONS } from './data/countries'
import { getLang, setLang } from './i18n'
import { useAuth } from './auth.jsx'
import {
  ensureUserDoc,
  listChildren,
  createChild,
  setActiveChild,
  loadChild,
  saveChildProgress,
  saveChildLang,
  readLegacyProgress,
  clearLegacyProgress,
} from './cloud'
import HomeScreen from './components/HomeScreen'
import RegionScreen from './components/RegionScreen'
import CountryScreen from './components/CountryScreen'
import ChapterIntro from './components/ChapterIntro'
import CardLevel from './components/CardLevel'
import QuizLevel from './components/QuizLevel'
import ResultScreen from './components/ResultScreen'
import AuthScreen from './components/AuthScreen'
import ChildPickerScreen from './components/ChildPickerScreen'

function Spinner({ msg = 'Chargement...' }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 14, background: 'linear-gradient(160deg,#0a0e1a 0%,#1a2744 50%,#0d3b6e 100%)', fontFamily: 'Nunito, sans-serif' }}>
      <div style={{ fontSize: 56 }} className="float">🌍</div>
      <div style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 700, fontSize: 14 }}>{msg}</div>
    </div>
  )
}

export default function App() {
  const { user, loading: authLoading } = useAuth()

  const [profileLoading, setProfileLoading] = useState(false)
  const [kids, setKids] = useState([])
  const [activeChild, setActiveChildState] = useState(null)
  const [legacyToMigrate, setLegacyToMigrate] = useState(null)

  const [screen, setScreen] = useState('home')
  const [countryCode, setCountryCode] = useState(null)
  const [chapterIdx, setChapterIdx] = useState(null)
  const [step, setStep] = useState('intro')
  const [quizScore, setQuizScore] = useState(0)
  const [xpAnim, setXpAnim] = useState(null)
  const [lang, setLangState] = useState(getLang)

  const country = countryCode ? COUNTRIES[countryCode] : null
  const chapter = country && chapterIdx !== null ? country.chapters[chapterIdx] : null

  // Charge le profil utilisateur + les enfants apres login
  useEffect(() => {
    if (!user) {
      setKids([])
      setActiveChildState(null)
      setLegacyToMigrate(null)
      return
    }
    let cancelled = false
    setProfileLoading(true)
    ;(async () => {
      try {
        const ud = await ensureUserDoc(user)
        const list = await listChildren(user.uid)
        if (cancelled) return
        setKids(list)
        if (list.length === 0) {
          const legacy = readLegacyProgress()
          if (legacy) setLegacyToMigrate(legacy)
        }
        if (ud.activeChildId) {
          const ac = await loadChild(user.uid, ud.activeChildId)
          if (cancelled) return
          if (ac) {
            setActiveChildState(ac)
            if (ac.lang) {
              setLangState(ac.lang)
              setLang(ac.lang)
            }
          }
        }
      } catch (e) {
        console.error('Profile load error:', e)
      } finally {
        if (!cancelled) setProfileLoading(false)
      }
    })()
    return () => { cancelled = true }
  }, [user])

  const progress = activeChild
    ? { xp: activeChild.xp || 0, level: activeChild.level || 1, done: activeChild.done || {} }
    : { xp: 0, level: 1, done: {} }

  const changeLang = useCallback((l) => {
    setLang(l)
    setLangState(l)
    if (user && activeChild) {
      saveChildLang(user.uid, activeChild.id, l).catch(console.error)
    }
  }, [user, activeChild])

  const addXP = (xp, chapterId) => {
    if (!user || !activeChild) return
    const newXP = (activeChild.xp || 0) + xp
    const newLevel = Math.floor(newXP / 300) + 1
    const done = { ...(activeChild.done || {}), [chapterId]: true }
    const next = { xp: newXP, level: newLevel, done }
    setActiveChildState((c) => ({ ...c, ...next }))
    setKids((all) => all.map((k) => (k.id === activeChild.id ? { ...k, ...next } : k)))
    saveChildProgress(user.uid, activeChild.id, next).catch(console.error)
    setXpAnim(xp)
    setTimeout(() => setXpAnim(null), 2000)
  }

  const handlePickChild = async (childId) => {
    if (!user) return
    setProfileLoading(true)
    try {
      await setActiveChild(user.uid, childId)
      const ac = await loadChild(user.uid, childId)
      if (ac) {
        setActiveChildState(ac)
        if (ac.lang) {
          setLangState(ac.lang)
          setLang(ac.lang)
        }
        setScreen('home')
      }
    } finally {
      setProfileLoading(false)
    }
  }

  const handleCreateChild = async (data) => {
    if (!user) return
    const seed = legacyToMigrate ? { ...data, xp: legacyToMigrate.xp, level: legacyToMigrate.level, done: legacyToMigrate.done, lang } : { ...data, lang }
    const id = await createChild(user.uid, seed)
    if (legacyToMigrate) {
      clearLegacyProgress()
      setLegacyToMigrate(null)
    }
    await setActiveChild(user.uid, id)
    const ac = await loadChild(user.uid, id)
    setKids((all) => [...all, ac])
    setActiveChildState(ac)
    setScreen('home')
  }

  const switchProfile = () => {
    setActiveChildState(null)
    setScreen('home')
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
    switchProfile,
  }

  const shared = { lang, changeLang, progress, nav, activeChild }

  // ── Auth gates ────────────────────────────────────────────────
  if (authLoading) return <Spinner msg="Demarrage..." />
  if (!user) return <AuthScreen />
  if (profileLoading) return <Spinner msg="Chargement du profil..." />
  if (!activeChild) {
    return (
      <ChildPickerScreen
        user={user}
        kids={kids}
        onPick={handlePickChild}
        onCreate={handleCreateChild}
        hasLegacy={!!legacyToMigrate}
        onMigrate={() => { /* noop : legacy already loaded, will be applied at create */ }}
      />
    )
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      {xpAnim && (
        <div style={{
          position: 'fixed', top: 60, right: 16, zIndex: 999,
          background: '#FFD600', color: '#1A237E',
          padding: '8px 18px', borderRadius: 20,
          fontWeight: 900, fontSize: 16,
          fontFamily: 'Nunito, sans-serif',
        }}>+{xpAnim} XP !</div>
      )}
      {screen === 'home'    && <HomeScreen {...shared} />}
      {screen === 'regions' && <RegionScreen {...shared} />}
      {screen === 'country' && country && <CountryScreen country={country} code={countryCode} {...shared} />}
      {screen === 'chapter' && chapter && step === 'intro' && (
        <ChapterIntro chapter={chapter} country={country} {...shared} />
      )}
      {screen === 'chapter' && chapter && step === 'cards' && (
        <CardLevel chapter={chapter} country={country} {...shared} onDone={nav.startQuiz} />
      )}
      {screen === 'chapter' && chapter && step === 'quiz' && (
        <QuizLevel chapter={chapter} country={country} {...shared} onDone={nav.finishChapter} />
      )}
      {screen === 'result' && chapter && (
        <ResultScreen chapter={chapter} country={country} score={quizScore}
          hasNext={chapterIdx + 1 < country.chapters.length} {...shared} />
      )}
    </div>
  )
}

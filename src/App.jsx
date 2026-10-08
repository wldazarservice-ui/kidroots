import { useState, useEffect, useCallback, useMemo } from 'react'
import { COUNTRIES, REGIONS } from './data/countries'
import { getLang, setLang, t } from './i18n'
import { applyLevel, doneKey, defaultLevelForAge } from './levels'
import { hasExpert, loadExpert } from './data/expert'
import { useAuth } from './auth.jsx'
import {
  ensureUserDoc,
  listChildren,
  createChild,
  setActiveChild,
  loadChild,
  saveChildProgress,
  saveChildLang,
  saveChildDifficulty,
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
import LevelPicker from './components/LevelPicker'
import Paywall from './components/Paywall'
import DevicesManager from './components/DevicesManager'
import { registerDevice } from './devices'
import { isCountryLocked, confirmCheckout, PAYWALL_ENABLED } from './premium'

function Spinner({ msg = 'Chargement...' }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 14, background: 'linear-gradient(180deg,#BBE3FF 0%,#E3F4FF 40%,#FFF8E7 100%)', fontFamily: 'Nunito, sans-serif' }}>
      <div style={{ fontSize: 72 }} className="float">🌍</div>
      <div style={{ color: '#1A2A4F', fontWeight: 700, fontSize: 14 }}>{msg}</div>
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
  const [regionKey, setRegionKey] = useState('africa')
  const [chapterIdx, setChapterIdx] = useState(null)
  const [step, setStep] = useState('intro')
  const [quizScore, setQuizScore] = useState(0)
  const [xpAnim, setXpAnim] = useState(null)
  const [lang, setLangState] = useState(getLang)

  const [expert, setExpert] = useState({ code: null, data: null })
  const [levelPickerOpen, setLevelPickerOpen] = useState(false)
  const [premium, setPremium] = useState(false)
  const [paywallOpen, setPaywallOpen] = useState(false)
  const [deviceBlocked, setDeviceBlocked] = useState(false)
  const [devicesOpen, setDevicesOpen] = useState(false)
  const [userReload, setUserReload] = useState(0)
  const [toast, setToast] = useState(null)

  const difficulty = activeChild?.difficulty || 'explorer'
  const needsExpert = difficulty === 'expert' && countryCode && hasExpert(countryCode)
  const expertReady = !needsExpert || expert.code === countryCode

  // Charge les longues histoires du pays (niveau Grand explorateur)
  useEffect(() => {
    if (!needsExpert || expert.code === countryCode) return
    let cancelled = false
    loadExpert(countryCode)
      .then((data) => { if (!cancelled) setExpert({ code: countryCode, data }) })
      .catch((e) => console.error('Expert load error:', e))
    return () => { cancelled = true }
  }, [needsExpert, countryCode, expert.code])

  // Objet stable (important pour la traduction qui depend de l'identite de l'objet)
  const country = useMemo(() => {
    if (!countryCode) return null
    const base = COUNTRIES[countryCode]
    return applyLevel(base, difficulty, expert.code === countryCode ? expert.data : null)
  }, [countryCode, difficulty, expert])
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
        if (!cancelled) setPremium(!!ud.premium)
        // 5 appareils maximum par compte
        const reg = await registerDevice(user.uid)
        if (cancelled) return
        if (!reg.ok) { setDeviceBlocked(true); return }
        setDeviceBlocked(false)
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
  }, [user, userReload])

  // Retour de la page de paiement Stripe (?checkout=success&session_id=...)
  useEffect(() => {
    if (!user) return
    const params = new URLSearchParams(window.location.search)
    const status = params.get('checkout')
    if (!status) return
    const sessionId = params.get('session_id')
    window.history.replaceState({}, '', window.location.pathname)
    if (status !== 'success' || !sessionId) return
    confirmCheckout(user, sessionId)
      .then((ok) => {
        if (ok) { setPremium(true); setToast('pw_thanks'); setTimeout(() => setToast(null), 4000) }
      })
      .catch((e) => console.error('Confirm checkout error:', e))
  }, [user])

  const progress = activeChild
    ? { xp: activeChild.xp || 0, level: activeChild.level || 1, done: activeChild.done || {} }
    : { xp: 0, level: 1, done: {} }

  const changeDifficulty = async (d) => {
    if (!user || !activeChild) return
    setActiveChildState((c) => ({ ...c, difficulty: d }))
    setKids((all) => all.map((k) => (k.id === activeChild.id ? { ...k, difficulty: d } : k)))
    setLevelPickerOpen(false)
    if (screen === 'chapter' || screen === 'result') setScreen('country')
    await saveChildDifficulty(user.uid, activeChild.id, d).catch(console.error)
  }

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
    const done = { ...(activeChild.done || {}), [doneKey(chapterId, difficulty)]: true }
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
    const id = await createChild(user.uid, seed, kids.map((k) => k.id))
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
    goRegions: (key) => { if (typeof key === 'string') setRegionKey(key); setScreen('regions') },
    goCountry: (code) => {
      if (isCountryLocked(code, premium)) { setPaywallOpen(true); return }
      setCountryCode(code); if (COUNTRIES[code]) setRegionKey(COUNTRIES[code].region); setScreen('country') },
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
    openLevelPicker: () => setLevelPickerOpen(true),
    openPaywall: () => setPaywallOpen(true),
  }

  const shared = { lang, changeLang, progress, nav, activeChild, difficulty, premium: premium || !PAYWALL_ENABLED }

  // ── Auth gates ────────────────────────────────────────────────
  if (authLoading) return <Spinner msg="Demarrage..." />
  if (!user) return <AuthScreen />
  if (profileLoading) return <Spinner msg="Chargement du profil..." />
  if (deviceBlocked) {
    return (
      <DevicesManager user={user} blocked onDone={async () => {
        const reg = await registerDevice(user.uid)
        if (reg.ok) { setDeviceBlocked(false); setProfileLoading(true); setUserReload((n) => n + 1) }
      }} />
    )
  }
  if (!activeChild) {
    return (
      <>
      {devicesOpen && <DevicesManager user={user} onClose={() => setDevicesOpen(false)} />}
      <ChildPickerScreen
        user={user}
        kids={kids}
        onPick={handlePickChild}
        onCreate={handleCreateChild}
        hasLegacy={!!legacyToMigrate}
        lang={lang}
        onManageDevices={() => setDevicesOpen(true)}
        onMigrate={() => { /* noop : legacy already loaded, will be applied at create */ }}
      />
      </>
    )
  }
  // Profil sans niveau de lecture : on le demande une fois
  if (!activeChild.difficulty) {
    return (
      <LevelPicker lang={lang} age={activeChild.age} childName={(activeChild.name || '').split(' ')[0]}
        value={defaultLevelForAge(activeChild.age || 6)} onPick={changeDifficulty} />
    )
  }
  if (needsExpert && !expertReady && screen !== 'home' && screen !== 'regions') return <Spinner msg="📚" />

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
      {levelPickerOpen && (
        <LevelPicker lang={lang} age={activeChild.age} value={difficulty}
          onPick={changeDifficulty} onClose={() => setLevelPickerOpen(false)} />
      )}
      {paywallOpen && (
        <Paywall lang={lang} user={user} onClose={() => setPaywallOpen(false)}
          onAlreadyPremium={() => { setPremium(true); setPaywallOpen(false) }} />
      )}
      {toast && (
        <div className="anim-slide-up" style={{ position: 'fixed', top: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 700, background: '#2E9E5B', color: 'white', padding: '12px 20px', borderRadius: 20, fontWeight: 900, fontSize: 16, fontFamily: 'Nunito, sans-serif', boxShadow: '0 8px 20px rgba(46,158,91,0.4)', whiteSpace: 'nowrap' }}>
          {t(lang, toast)}
        </div>
      )}
      {screen === 'home'    && <HomeScreen {...shared} />}
      {screen === 'regions' && <RegionScreen {...shared} regionKey={regionKey} onRegion={setRegionKey} />}
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

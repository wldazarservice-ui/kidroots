import { useState, useEffect, useCallback, useMemo, useRef, lazy } from 'react'
import { COUNTRIES, REGIONS } from './data/countries'
import { getLang, setLang, t, isLang } from './i18n'
import { applyLevel, doneKey, defaultLevelForAge } from './levels'
import { hasExpert, loadExpert } from './data/expert'
import { loadWorld } from './data/world/load'
import { useAuth } from './auth.jsx'
import {
  ensureUserDoc,
  addFamilyFreeChapter,
  listChildren,
  createChild,
  setActiveChild,
  loadChild,
  saveChildProgress,
  saveChildLang,
  saveChildDifficulty,
  saveChildDaily,
  saveChildGames,
  saveChildGameDaily,
  readLegacyProgress,
  clearLegacyProgress,
} from './cloud'
import AuthScreen from './components/AuthScreen'
import BottomNav from './components/BottomNav'
import { registerDevice } from './devices'
import { setLimits } from './limits'
import { refreshOfflineIfNeeded } from './offline'
import { pendingGift, clearPendingGift } from './components/Gift'
import { redeemGift, openBillingPortal, limitReason, freeIds } from './premium'
import { useUsageTracker, trackCountryVisit, dayKey } from './stats'
import { confirmCheckout, fetchAccountStatus, PAYWALL_ENABLED, canOpenChapter, todayIds, todayKey, isOwnerEmail, gamesLeft, gamesPlayedToday } from './premium'
import { isDone } from './levels'
import LandingScreen from './components/LandingScreen'
import { countryState } from './explore'
import { loadGuest, saveGuest, clearGuest } from './guest'
import { track } from './track'
import { signOut, verifyEmail } from './auth'
import { isStandalone } from './pwaInstall'
import { wantMusic } from './music'
// Ecrans de l'app charges a la demande (la page d'accueil s'affiche plus vite), prechargés apres la connexion
// Apres une mise en ligne, un onglet reste ouvert sur l'ancienne version et ses fichiers n'existent plus :
// on recharge la page une fois (au lieu d'afficher une erreur) pour recuperer la nouvelle version.
const retryImport = (f) => () => f().then((m) => { try { sessionStorage.removeItem('kidroots_chunk_reload') } catch {} return m }).catch((e) => {
  let again = false
  try { again = !sessionStorage.getItem('kidroots_chunk_reload'); if (again) sessionStorage.setItem('kidroots_chunk_reload', '1') } catch {}
  if (again && /dynamically imported module|Importing a module script failed|Loading chunk/i.test(e?.message || '')) {
    location.reload()
    return new Promise(() => {})
  }
  throw e
})
const lazyP = (f) => { const g = retryImport(f); const C = lazy(g); C.preload = g; return C }
const HomeScreen = lazyP(() => import('./components/HomeScreen'))
const RegionScreen = lazyP(() => import('./components/RegionScreen'))
const CountryScreen = lazyP(() => import('./components/CountryScreen'))
const ChapterIntro = lazyP(() => import('./components/ChapterIntro'))
const CardLevel = lazyP(() => import('./components/CardLevel'))
const QuizLevel = lazyP(() => import('./components/QuizLevel'))
const ResultScreen = lazyP(() => import('./components/ResultScreen'))
const ChildPickerScreen = lazyP(() => import('./components/ChildPickerScreen'))
const LevelPicker = lazyP(() => import('./components/LevelPicker'))
const Paywall = lazyP(() => import('./components/Paywall'))
const DevicesManager = lazyP(() => import('./components/DevicesManager'))
const ScreenTimeLock = lazyP(() => import('./components/ScreenTimeLock'))
const ParentStats = lazyP(() => import('./components/ParentStats'))
const PassportScreen = lazyP(() => import('./components/PassportScreen'))
const MapScreen = lazyP(() => import('./components/MapScreen'))
const GamesScreen = lazyP(() => import('./components/GamesScreen'))
const HuntGame = lazyP(() => import('./components/HuntGame'))
const MemoryGame = lazyP(() => import('./components/MemoryGame'))
const ChoiceGame = lazyP(() => import('./components/ChoiceGame'))
const StampToast = lazyP(() => import('./components/StampToast'))
const DailyLimit = lazyP(() => import('./components/DailyLimit'))
const AdminDashboard = lazyP(() => import('./components/AdminDashboard'))
const LAZY = [HomeScreen, RegionScreen, CountryScreen, ChapterIntro, CardLevel, QuizLevel, ResultScreen, ChildPickerScreen, LevelPicker, Paywall, DevicesManager, ScreenTimeLock, ParentStats, PassportScreen, MapScreen, GamesScreen, HuntGame, MemoryGame, ChoiceGame, StampToast, DailyLimit, AdminDashboard]

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

  // Ecran en cours memorise pour la session : un rechargement ramene au meme endroit (pas a l'accueil)
  const [savedNav] = useState(() => { try { return JSON.parse(sessionStorage.getItem('kidroots_nav') || 'null') } catch { return null } })
  const [screen, setScreen] = useState(() => {
    const n = savedNav
    if (!n?.screen) return 'home'
    if (['chapter', 'result', 'country'].includes(n.screen)) return n.countryCode && COUNTRIES[n.countryCode] ? 'country' : 'home'
    if (n.screen === 'game') return 'games'
    return ['regions', 'map', 'passport', 'games'].includes(n.screen) ? n.screen : 'home'
  })
  const [countryCode, setCountryCode] = useState(() => (savedNav?.countryCode && COUNTRIES[savedNav.countryCode] ? savedNav.countryCode : null))
  const [regionKey, setRegionKey] = useState(() => savedNav?.regionKey || 'africa')
  const [chapterIdx, setChapterIdx] = useState(null)
  const [step, setStep] = useState('intro')
  const [quizScore, setQuizScore] = useState(0)
  const [xpAnim, setXpAnim] = useState(null)
  const [lang, setLangState] = useState(getLang)
  useEffect(() => { document.documentElement.lang = lang }, [lang])

  const [expert, setExpert] = useState({ code: null, data: null })
  const [levelPickerOpen, setLevelPickerOpen] = useState(false)
  const [premium, setPremium] = useState(false)
  const [paywallOpen, setPaywallOpen] = useState(false)
  const [limitKind, setLimitKind] = useState('chapters')
  const [paywallAudience, setPaywallAudience] = useState('family')
  const [deviceBlocked, setDeviceBlocked] = useState(false)
  const [devicesOpen, setDevicesOpen] = useState(false)
  const [userReload, setUserReload] = useState(0)
  const [toast, setToast] = useState(null)
  const [statsOpen, setStatsOpen] = useState(false)
  const [limitOpen, setLimitOpen] = useState(false)
  const [gameKey, setGameKey] = useState(null)
  const [countryFrom, setCountryFrom] = useState(() => savedNav?.countryFrom || 'regions') // écran d'où l'on vient avant un pays
  useEffect(() => {
    try { sessionStorage.setItem('kidroots_nav', JSON.stringify({ screen, countryCode, regionKey, countryFrom })) } catch {}
  }, [screen, countryCode, regionKey, countryFrom])
  const [backTick, setBackTick] = useState(0)
  // Page en cours dans un chapitre, gardee dans l'appareil : en rouvrant l'app on reprend au meme document
  const [startIdx, setStartIdx] = useState(0)
  const resumeKey = () => `kidroots_resume:${activeChild?.id || 'guest'}`
  const readResume = () => { try { return JSON.parse(localStorage.getItem(resumeKey()) || 'null') } catch { return null } }
  const saveResume = (stepName, idx = 0) => {
    if (!chapter) return
    try { localStorage.setItem(resumeKey(), JSON.stringify({ code: countryCode, chapterId: chapter.id, difficulty, step: stepName, idx, at: Date.now() })) } catch {}
  }
  const [newStamp, setNewStamp] = useState(null)
  // Temps d'écran du jour (limite réglée par les parents)
  const [screenSecs, setScreenSecs] = useState(0)
  const [extraMin, setExtraMin] = useState(0)
  const [limitOff, setLimitOff] = useState(false)
  const [account, setAccount] = useState({ kind: 'free' })
  const [adminOpen, setAdminOpen] = useState(false)
  // Visiteur sans compte : page de presentation, essai (profil local) ou ecran de connexion
  const [guest, setGuest] = useState(loadGuest)
  // Mode demo (developpement uniquement, ?demo=1) : profil local pour les captures marketing
  const [guestPlaying, setGuestPlaying] = useState(() => import.meta.env.DEV && new URLSearchParams(window.location.search).has('demo'))
  const [authMode, setAuthMode] = useState(() => (isStandalone() ? 'signin' : null)) // null = page de presentation

  const difficulty = activeChild?.difficulty || 'explorer'
  const inCountry = screen === 'country' || screen === 'chapter' || screen === 'result'
  useUsageTracker(user?.uid, activeChild?.id, inCountry ? countryCode : null)
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

  // Pays « monde » : contenu complet charge a l'ouverture
  const [world, setWorld] = useState({ code: null, data: null })
  const needsWorld = !!(countryCode && COUNTRIES[countryCode]?.lazy)
  const worldReady = !needsWorld || world.code === countryCode
  useEffect(() => {
    if (!needsWorld || world.code === countryCode) return
    let cancelled = false
    loadWorld(countryCode)
      .then((data) => { if (!cancelled && data) setWorld({ code: countryCode, data }) })
      .catch((e) => console.error('World load error:', e))
    return () => { cancelled = true }
  }, [needsWorld, countryCode, world.code])

  // Objet stable (important pour la traduction qui depend de l'identite de l'objet)
  const country = useMemo(() => {
    if (!countryCode) return null
    const base = needsWorld ? (world.code === countryCode ? world.data : COUNTRIES[countryCode]) : COUNTRIES[countryCode]
    return applyLevel(base, difficulty, expert.code === countryCode ? expert.data : null)
  }, [countryCode, difficulty, expert, world, needsWorld])
  const chapter = country && chapterIdx !== null ? country.chapters[chapterIdx] : null

  // Charge le profil utilisateur + les enfants apres login
  useEffect(() => {
    if (!user) {
      setKids([])
      setActiveChildState(null)
      setLegacyToMigrate(null)
      setPremium(false)
      return
    }
    // Connecte : le mode essai s'arrete (sa progression sera transferee au 1er profil cree)
    setGuestPlaying(false)
    setAuthMode(null)
    let cancelled = false
    setProfileLoading(true)
    ;(async () => {
      try {
        const ud = await ensureUserDoc(user)
        setLimits(ud)
        if (ud.isNew) track('signup')
        if (!cancelled) setPremium(!!ud.premium)
        if (!cancelled) setFamUsed((ud.freeChapters || []).length)
        // Etat verifie par le serveur (acces offert, abonnement, acces a vie)
        fetchAccountStatus(user).then((st) => {
          if (cancelled) return
          setPremium(!!st.premium)
          setLimits(st)
          setAccount(st)
          // Inscription depuis l'offre enseignant : on rouvre l'offre une fois connecte
          try {
            if (localStorage.getItem('kidroots_intent') === 'teacher') {
              localStorage.removeItem('kidroots_intent')
              if (!st.premium) { setPaywallAudience('teacher'); setPaywallOpen(true) }
            }
          } catch { /* stockage indisponible */ }
          if (st.needVerify && !sessionStorage.getItem('kidroots_verify_sent')) {
            sessionStorage.setItem('kidroots_verify_sent', '1')
            verifyEmail(user).then(() => { setToast('verify_sent'); setTimeout(() => setToast(null), 6000) }).catch(() => {})
          }
        }).catch((e) => console.error('Account status error:', e))
        // 5 appareils maximum par compte (verifie seulement en ligne ; hors-ligne on laisse jouer)
        const reg = navigator.onLine ? await registerDevice(user.uid).catch(() => ({ ok: true })) : { ok: true }
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
        clearGuest()
        setGuest(null)
        if (ud.activeChildId) {
          const ac = await loadChild(user.uid, ud.activeChildId)
          if (cancelled) return
          if (ac) {
            setActiveChildState(ac)
            if (isLang(ac.lang)) {
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

  // Une fois connecte : precharge tous les ecrans de l'app (et les garde pour le mode hors-ligne)
  useEffect(() => {
    if (!user) return
    const go = () => LAZY.forEach((C) => C.preload().catch(() => {}))
    const id = 'requestIdleCallback' in window ? window.requestIdleCallback(go) : setTimeout(go, 1500)
    return () => ('cancelIdleCallback' in window ? window.cancelIdleCallback(id) : clearTimeout(id))
  }, [user])

  // Mode voyage : apres une mise a jour de l'app, retelecharge les pays choisis (en arriere-plan)
  useEffect(() => { if (user) refreshOfflineIfNeeded(lang) }, [user, lang])

  // Lien « Je garde Mokalibo » de l'e-mail de resiliation (?reprendre=1) : espace Stripe pour reprendre l'abonnement
  useEffect(() => {
    try {
      const u = new URL(window.location.href)
      if (u.searchParams.has('reprendre')) {
        sessionStorage.setItem('kidroots_reprendre', '1')
        u.searchParams.delete('reprendre'); window.history.replaceState({}, '', u.pathname + u.search + u.hash)
      }
      if (user && sessionStorage.getItem('kidroots_reprendre')) {
        sessionStorage.removeItem('kidroots_reprendre')
        openBillingPortal(user).catch(() => {})
      } else if (!user && sessionStorage.getItem('kidroots_reprendre')) setAuthMode('signin')
    } catch { /* stockage indisponible */ }
  }, [user])

  // Carte cadeau recue (lien ?cadeau=CODE) : activation automatique une fois connecte
  useEffect(() => {
    const code = pendingGift()
    if (!user || !code) return
    redeemGift(user, code)
      .then((r) => {
        clearPendingGift()
        setPremium(true)
        window.dispatchEvent(new CustomEvent('mokalibo:welcome', { detail: { gift: true, applied: r.applied, until: r.until } }))
        fetchAccountStatus(user).then((st) => { setLimits(st); setAccount(st) }).catch(() => {})
      })
      .catch((e) => {
        if (['used', 'mine', 'unknown', 'code'].includes(e.message)) clearPendingGift()
        setToast(e.message === 'mine' ? 'gift_mine' : e.message === 'used' ? 'gift_used' : 'gift_bad'); setTimeout(() => setToast(null), 6000)
      })
  }, [user])

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
        if (ok) {
          setPremium(true)
          window.dispatchEvent(new CustomEvent('mokalibo:welcome', { detail: ok }))
          fetchAccountStatus(user).then((st) => { setLimits(st); setAccount(st) }).catch(() => {})
        }
      })
      .catch((e) => console.error('Confirm checkout error:', e))
  }, [user])

  useEffect(() => {
    setScreenSecs(activeChild?.stats?.days?.[dayKey()] || 0); setExtraMin(0); setLimitOff(false)
  }, [activeChild?.id])
  useEffect(() => {
    if (!user || !activeChild?.id) return
    const id = setInterval(() => { if (document.visibilityState === 'visible') setScreenSecs((n) => n + 10) }, 10000)
    return () => clearInterval(id)
  }, [user, activeChild?.id])

  // Chaque nouvel écran commence en haut de la page
  useEffect(() => { window.scrollTo(0, 0) }, [screen, gameKey])

  // En mode essai, l'enfant actif est le profil local
  useEffect(() => {
    if (!user && guestPlaying && guest) setActiveChildState(guest)
  }, [user, guestPlaying])
  const isGuest = !user && guestPlaying && !!activeChild
  // Grand ecran : l'app (pas la page de presentation) est agrandie en CSS (body.app-mode)
  useEffect(() => { document.body.classList.toggle('app-mode', !!(user || isGuest)); wantMusic(!!(user || isGuest)) }, [user, isGuest])

  // Met a jour l'enfant actif (Firestore si connecte, stockage local en mode essai)
  const patchChild = (patch, save) => {
    setActiveChildState((c) => {
      const next = { ...c, ...patch }
      if (!user) { saveGuest(next); setGuest(next) }
      return next
    })
    if (user && activeChild) {
      setKids((all) => all.map((k) => (k.id === activeChild.id ? { ...k, ...patch } : k)))
      save?.().catch(console.error)
    }
  }

  const progress = activeChild
    ? { xp: activeChild.xp || 0, level: activeChild.level || 1, done: activeChild.done || {} }
    : { xp: 0, level: 1, done: {} }

  const changeDifficulty = async (d) => {
    if (!activeChild) return
    patchChild({ difficulty: d }, () => saveChildDifficulty(user.uid, activeChild.id, d))
    setLevelPickerOpen(false)
    if (screen === 'chapter' || screen === 'result') setScreen('country')
  }

  const changeLang = useCallback((l) => {
    setLang(l)
    setLangState(l)
    if (user && activeChild) {
      saveChildLang(user.uid, activeChild.id, l).catch(console.error)
    }
  }, [user, activeChild])

  const addXP = (xp, chapterId) => {
    if (!activeChild) return
    const newXP = (activeChild.xp || 0) + xp
    const newLevel = Math.floor(newXP / 300) + 1
    const done = { ...(activeChild.done || {}), [doneKey(chapterId, difficulty)]: true }
    const next = { xp: newXP, level: newLevel, done }
    patchChild(next, () => saveChildProgress(user.uid, activeChild.id, next))
    setXpAnim(xp)
    setTimeout(() => setXpAnim(null), 2000)
  }

  const handlePickChild = async (childId) => {
    if (!user) return
    setProfileLoading(true)
    try {
      setActiveChild(user.uid, childId).catch(() => {}) // sans attendre : marche aussi hors-ligne
      const ac = await loadChild(user.uid, childId)
      if (ac) {
        setActiveChildState(ac)
        if (isLang(ac.lang)) {
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
    if (isGuest) { setPaywallOpen(true); return }
    setActiveChildState(null)
    setScreen('home')
  }

  const hasPremium = premium || !PAYWALL_ENABLED

  // Chapitres gratuits deja ouverts par toute la famille (plafond FREE_CHAPTERS_FAMILY)
  const [famUsed, setFamUsed] = useState(0)
  // Limite gratuite : 3 nouveaux chapitres par jour et par enfant (rejouer un chapitre fini reste libre)
  const openChapter = (idx) => {
    const ch = country?.chapters[idx]
    if (!ch) return false
    const chDone = isDone(progress, ch.id, difficulty)
    if (!canOpenChapter(activeChild, ch.id, chDone, hasPremium, famUsed)) {
      track('limit_hit')
      setLimitKind(limitReason(activeChild, famUsed))
      setLimitOpen(true)
      return false
    }
    if (!hasPremium && !chDone && !todayIds(activeChild).includes(ch.id) && !freeIds(activeChild).includes(ch.id)) {
      const daily = { date: todayKey(), ids: [...todayIds(activeChild), ch.id] }
      const free = [...freeIds(activeChild), ch.id]
      patchChild({ daily, freeIds: free }, () => saveChildDaily(user.uid, activeChild.id, daily, free))
      if (user) { setFamUsed((n) => n + 1); addFamilyFreeChapter(user.uid, activeChild.id, ch.id).catch(console.error) }
    }
    if (!Object.keys(progress.done || {}).length) track('first_story', { once: true })
    setChapterIdx(idx)
    const r = readResume()
    const resume = r && r.chapterId === ch.id && r.difficulty === difficulty && Date.now() - r.at < 60 * 864e5
    setStartIdx(resume && r.step === 'cards' ? r.idx || 0 : 0)
    setStep(resume ? r.step : 'intro')
    setQuizScore(0)
    setScreen('chapter')
    return true
  }

  // Jeux : illimites (gamesLeft = Infinity). Retourne false (et affiche la limite) si une limite revenait un jour.
  const takeGameRound = () => {
    if (!activeChild) return false
    if (gamesLeft(activeChild, hasPremium) <= 0) {
      track('limit_hit')
      setLimitKind('games')
      setLimitOpen(true)
      return false
    }
    if (!hasPremium) {
      const gameDaily = { date: todayKey(), n: gamesPlayedToday(activeChild) + 1 }
      patchChild({ gameDaily }, () => saveChildGameDaily(user.uid, activeChild.id, gameDaily))
    }
    return true
  }

  // Résultat d'un jeu : étoiles cumulées par jeu (memory = nombre de parties gagnées)
  const addGameResult = (key, stars) => {
    if (!activeChild) return
    const g = activeChild.games || {}
    const games = { ...g, [key]: (g[key] || 0) + (key === 'memory' ? 1 : stars), stars: (g.stars || 0) + stars }
    patchChild({ games }, () => saveChildGames(user.uid, activeChild.id, games))
  }

  const logout = () => {
    if (isGuest) { setGuestPlaying(false); setActiveChildState(null); setScreen('home'); return }
    signOut()
  }

  // Premiere minute : un tap sur un drapeau de l'accueil ouvre directement le 1er chapitre du pays (une fois charge)
  // Meme mecanisme pour reprendre une histoire la ou l'enfant s'etait arrete (accueil, ou rechargement en plein chapitre)
  const [autoStart, setAutoStart] = useState(() => (savedNav?.screen === 'chapter' && savedNav.countryCode ? { code: savedNav.countryCode, resume: true } : null))
  useEffect(() => {
    if (!autoStart || autoStart.code !== countryCode || screen !== 'country' || !worldReady || (needsExpert && !expertReady) || !activeChild) return
    if (!country?.chapters?.[0]?.cards?.[0]) return
    setAutoStart(null)
    const r = readResume()
    const i = autoStart.resume ? country.chapters.findIndex((c) => c.id === r?.chapterId && r?.code === countryCode) : 0
    if (i >= 0) openChapter(i)
  }) // eslint-disable-line react-hooks/exhaustive-deps

  const nav = {
    goHome: () => setScreen('home'),
    goFirstStory: (code) => { nav.goCountry(code); setAutoStart({ code }) },
    // Bouton « Continuer » de l'accueil : rouvre directement la page ou l'enfant s'est arrete
    hasResume: (code) => readResume()?.code === code,
    continueStory: (code) => { nav.goCountry(code); if (readResume()?.code === code) setAutoStart({ code, resume: true }) },
    goRegions: (key) => { if (typeof key === 'string') setRegionKey(key); setScreen('regions') },
    goCountry: (code) => {
      if (code !== countryCode || screen !== 'country') trackCountryVisit(user?.uid, activeChild?.id, code)
      if (['home', 'regions', 'map', 'passport', 'games'].includes(screen)) setCountryFrom(screen)
      setCountryCode(code); if (COUNTRIES[code]) setRegionKey(COUNTRIES[code].region); setScreen('country')
      // Dernier pays ouvert par cet enfant : l'accueil propose de continuer son histoire
      try { localStorage.setItem(`kidroots_last_country:${activeChild?.id || 'guest'}`, code) } catch {}
    },
    goBack: () => {
      if (screen === 'country') setScreen(countryFrom || 'regions')
      else if (screen === 'chapter' || screen === 'result') setScreen('country')
    },
    startChapter: (idx) => { openChapter(idx) },
    startCards: () => { setStartIdx(0); setStep('cards'); saveResume('cards', 0) },
    startQuiz: () => { setStep('quiz'); saveResume('quiz') },
    cardIdx: (i) => saveResume('cards', i),
    finishChapter: (score) => {
      if (!Object.keys(progress.done || {}).length) track('first_story_done', { once: true })
      const xp = chapter.cards.length * 20 + chapter.quiz.length * 30
      // Pays terminé ? => nouveau tampon dans le passeport
      const before = countryState(progress, countryCode).stamp
      const after = countryState({ ...progress, done: { ...progress.done, [doneKey(chapter.id, difficulty)]: true } }, countryCode).stamp
      if (after && !before) setTimeout(() => setNewStamp(countryCode), 900)
      addXP(xp, chapter.id)
      try { localStorage.removeItem(resumeKey()) } catch {}
      setQuizScore(score)
      setScreen('result')
    },
    goNextChapter: () => {
      const next = chapterIdx + 1
      if (next < country.chapters.length) {
        if (!openChapter(next)) setScreen('country')
      } else {
        setScreen('country')
      }
    },
    switchProfile,
    openLevelPicker: () => setLevelPickerOpen(true),
    setDifficulty: (d) => changeDifficulty(d),
    openPassport: () => setScreen('passport'),
    openMap: () => setScreen('map'),
    openGames: () => setScreen('games'),
    openGame: (key) => { if (takeGameRound()) { setGameKey(key); setScreen('game') } },
    openPaywall: () => setPaywallOpen(true),
    logout,
  }

  // Geste « retour » du téléphone (ou bouton retour du navigateur) : on revient en arrière DANS l'app
  // au lieu de quitter le site. Une entrée d'historique « garde » est posée tant qu'il y a un retour possible.
  const appBack = () => {
    if (levelPickerOpen) { setLevelPickerOpen(false); return true }
    if (paywallOpen) { setPaywallOpen(false); return true }
    if (limitOpen) { setLimitOpen(false); if (screen === 'chapter' || screen === 'result') setScreen('country'); return true }
    if (newStamp) { setNewStamp(null); return true }
    if (adminOpen) { setAdminOpen(false); return true }
    if (statsOpen) { setStatsOpen(false); return true }
    if (devicesOpen) { setDevicesOpen(false); return true }
    if (!user && !isGuest) { if (authMode && !isStandalone()) { setAuthMode(null); return true } return false }
    if (!activeChild) return false
    if (screen === 'game') { setScreen('games'); return true }
    if (screen === 'chapter' && step === 'quiz') { setStep('cards'); return true }
    if (screen === 'chapter' && step === 'cards') { setStep('intro'); return true }
    if (screen === 'chapter' || screen === 'result') { setScreen('country'); return true }
    if (screen === 'country') { setScreen(countryFrom || 'regions'); return true }
    if (screen !== 'home') { setScreen('home'); return true }
    return false
  }
  const canBack = !!(levelPickerOpen || paywallOpen || limitOpen || newStamp || adminOpen || statsOpen || devicesOpen
    || (!user && !isGuest && authMode && !isStandalone()) || (activeChild && screen !== 'home'))
  const backRef = useRef(appBack)
  backRef.current = appBack
  useEffect(() => {
    if (canBack && !window.history.state?.mkGuard) window.history.pushState({ mkGuard: 1 }, '')
  }, [canBack, backTick])
  useEffect(() => {
    const onPop = () => { backRef.current(); setBackTick((n) => n + 1) }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const shared = { lang, changeLang, progress, nav, activeChild, difficulty, premium: hasPremium, guest: isGuest }

  // ── Auth gates ────────────────────────────────────────────────
  if (authLoading) return <Spinner msg={t(lang, 'starting')} />
  if (!user && !isGuest) {
    if (authMode) {
      return <AuthScreen initialMode={authMode} onBack={() => setAuthMode(null)} />
    }
    return (
      <LandingScreen lang={lang} changeLang={changeLang}
        onLogin={() => setAuthMode('signin')}
        onSignup={() => { setAuthMode('signup'); track('signup_view') }} />
    )
  }
  if (!activeChild && isGuest) return <Spinner />
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
      {statsOpen && <ParentStats user={user} lang={lang} onClose={() => setStatsOpen(false)} />}
      {adminOpen && <AdminDashboard user={user} onClose={() => setAdminOpen(false)} />}
      {paywallOpen && (
        <Paywall lang={lang} user={user} account={account} audience={paywallAudience} onClose={() => { setPaywallOpen(false); setPaywallAudience('family') }}
          onAlreadyPremium={() => { setPremium(true); setPaywallOpen(false) }} />
      )}
      <ChildPickerScreen
        user={user}
        kids={kids}
        onPick={handlePickChild}
        onCreate={handleCreateChild}
        hasLegacy={!!legacyToMigrate}
        lang={lang}
        changeLang={changeLang}
        onManageDevices={() => setDevicesOpen(true)}
        onOpenStats={() => setStatsOpen(true)}
        onKidsChange={setKids}
        onOpenPro={PAYWALL_ENABLED ? () => { setPaywallAudience('teacher'); setPaywallOpen(true) } : null}
        onOpenOffer={PAYWALL_ENABLED ? () => { setPaywallAudience('family'); setPaywallOpen(true) } : null}
        onLimitSaved={(id, min) => setKids((all) => all.map((k) => (k.id === id ? { ...k, screenLimit: min } : k)))}
        onKidsReset={(ids) => setKids((all) => all.map((k) => (ids.includes(k.id) ? { ...k, xp: 0, level: 1, done: {}, games: {}, daily: { date: '', ids: [] } } : k)))}
        premium={premium}
        account={account}
        onOpenAdmin={isOwnerEmail(user.email) ? () => setAdminOpen(true) : null}
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
  const screenLimit = user ? activeChild.screenLimit || 0 : 0
  if (screenLimit > 0 && !limitOff && screenSecs >= (screenLimit + extraMin) * 60) {
    return <ScreenTimeLock lang={lang} minutes={Math.round(screenSecs / 60)} onMore={() => setExtraMin((m) => m + 15)} onOff={() => setLimitOff(true)} onSwitch={switchProfile} />
  }
  if (((needsExpert && !expertReady) || !worldReady) && screen !== 'home' && screen !== 'regions') return <Spinner msg="📚" />

  const showNav = ['home', 'regions', 'country', 'passport', 'map', 'games'].includes(screen)
  return (
    <>
    <div style={{ minHeight: '100vh' }} key={`${screen}-${gameKey}-${countryCode}-${chapterIdx}-${step}`} className="screen-enter">
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
        <Paywall lang={lang} user={user} account={account} audience={paywallAudience} onClose={() => { setPaywallOpen(false); setPaywallAudience('family') }}
          onAlreadyPremium={() => { setPremium(true); setPaywallOpen(false) }}
          onNeedAccount={() => { setPaywallOpen(false); setGuestPlaying(false); setActiveChildState(null); setAuthMode('signup'); track('signup_view') }} />
      )}
      {limitOpen && (
        <DailyLimit lang={lang} kind={limitKind} onGames={() => { setLimitOpen(false); setScreen('games') }} onClose={() => { setLimitOpen(false); if (screen === 'chapter' || screen === 'result') setScreen('country'); if (screen === 'game') setScreen('games') }}
          onUnlock={() => { setLimitOpen(false); setPaywallOpen(true) }} />
      )}
      {toast && (
        <div className="anim-slide-up" style={{ position: 'fixed', top: 'calc(env(safe-area-inset-top, 0px) + 16px)', left: 16, right: 16, margin: '0 auto', maxWidth: 420, textAlign: 'center', zIndex: 700, background: '#2E9E5B', color: 'white', padding: '12px 20px', borderRadius: 20, fontWeight: 900, fontSize: 16, lineHeight: 1.35, fontFamily: 'Nunito, sans-serif', boxShadow: '0 8px 20px rgba(46,158,91,0.4)' }}>
          {t(lang, toast)}
        </div>
      )}
      {newStamp && <StampToast code={newStamp} lang={lang} onClose={() => setNewStamp(null)} onPassport={() => { setNewStamp(null); setScreen('passport') }} />}
      {screen === 'home'    && <HomeScreen {...shared} />}
      {screen === 'passport' && <PassportScreen {...shared} />}
      {screen === 'map'     && <MapScreen {...shared} />}
      {screen === 'games'   && <GamesScreen {...shared} />}
      {screen === 'game' && gameKey === 'hunt' && <HuntGame onRound={takeGameRound} lang={lang} onBack={nav.openGames} onFinish={addGameResult} />}
      {screen === 'game' && gameKey === 'memory' && <MemoryGame onRound={takeGameRound} lang={lang} difficulty={difficulty} onBack={nav.openGames} onFinish={addGameResult} childName={activeChild?.name?.split(' ')[0]} />}
      {screen === 'game' && (gameKey === 'animals' || gameKey === 'riddles') && <ChoiceGame key={gameKey} onRound={takeGameRound} kind={gameKey} lang={lang} onBack={nav.openGames} onFinish={addGameResult} />}
      {screen === 'regions' && <RegionScreen {...shared} regionKey={regionKey} onRegion={setRegionKey} />}
      {screen === 'country' && country && <CountryScreen country={country} code={countryCode} {...shared} />}
      {screen === 'chapter' && chapter && step === 'intro' && (
        <ChapterIntro chapter={chapter} country={country} {...shared} />
      )}
      {screen === 'chapter' && chapter && step === 'cards' && (
        <CardLevel chapter={chapter} country={country} {...shared} startIdx={startIdx} onIdx={nav.cardIdx} onDone={nav.startQuiz} />
      )}
      {screen === 'chapter' && chapter && step === 'quiz' && (
        <QuizLevel chapter={chapter} country={country} {...shared} onDone={nav.finishChapter} />
      )}
      {screen === 'result' && chapter && (
        <ResultScreen chapter={chapter} country={country} score={quizScore}
          hasNext={chapterIdx + 1 < country.chapters.length} {...shared} />
      )}
      {showNav && <div className="bottom-nav-space" />}
    </div>
    {showNav && <BottomNav lang={lang} screen={screen} nav={nav} />}
    </>
  )
}

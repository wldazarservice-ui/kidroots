import { useEffect, useMemo, useState } from 'react'
import { COUNTRIES, REGIONS } from '../data/countries'
import { PLANS, DAILY_FREE_CHAPTERS } from '../premium'
import { defaultLevelForAge } from '../levels'
import { track } from '../track'
import LangPicker from './LangPicker'
import LegalFooter from './LegalFooter'
import { TText } from '../useTranslated'
import { useReveal } from '../useReveal'

const INK = '#1A2A4F'
const FONT_TITLE = 'Fredoka, Nunito, sans-serif'

// Textes de la page de presentation (fr / en / de ; les autres langues utilisent l'anglais)
const TXT = {
  fr: {
    login: 'Se connecter',
    h1: "L'histoire du monde, racontée aux enfants",
    h1_sub: 'Des histoires vraies, des quiz et une voix qui lit tout à voix haute. {n} pays, 3 niveaux de lecture, de 4 à 12 ans.',
    try: '▶ Essayer gratuitement',
    try_note: 'Sans compte · sans carte bancaire · 2 chapitres gratuits par jour',
    cont: '▶ Continuer avec {name}',
    signup: 'Créer un compte parent',
    proof: ['🚫 Sans publicité', '🔒 Sans traceur', '🇪🇺 Conforme RGPD'],
    story_kicker: 'Pourquoi Mokalibo ?',
    story_q: '« Papa, c’est où le Mali ? »',
    story_text: "Un soir, mon fils m'a posé cette question. J'ai cherché une app qui raconte aux enfants l'histoire des pays, avec leurs héros, leurs dates et leurs cultures, et pas seulement celle de l'Europe. Je ne l'ai pas trouvée. Alors je l'ai créée.",
    story_sign: 'Walid, papa et créateur de Mokalibo',
    how_title: 'Comment ça marche ?',
    how: [
      ['🌍', 'Choisis un pays', '{n} pays sur 5 continents, avec un guide enfant de chaque pays.'],
      ['📖', 'Découvre son histoire', 'Des cartes illustrées avec des dates, des personnages et des anecdotes, lues à voix haute.'],
      ['⭐', 'Gagne des étoiles', 'Un quiz à la fin de chaque chapitre, des XP et des niveaux à débloquer.'],
    ],
    feat_title: 'Pensé pour les enfants… et pour les parents',
    feats: [
      ['📚', '3 niveaux de lecture', 'Petit explorateur (4-5 ans), Explorateur (6-7 ans), Grand explorateur (8-12 ans) avec plus de 1000 histoires.'],
      ['🔊', 'Voix off', 'Chaque histoire et chaque question peuvent être lues à voix haute.'],
      ['🗣️', '6 langues', 'Français, anglais, allemand, arabe, portugais et bambara.'],
      ['📊', 'Espace parents', 'Temps passé et pays explorés, pour chaque enfant.'],
      ['🛂', 'Passeport et badges', 'Un tampon pour chaque pays terminé et des badges à collectionner.'],
      ['🗺️', 'Carte et chasse au trésor', 'Une carte du monde interactive pour retrouver les pays en jouant.'],
      ['🦊', 'Animaux et monuments', "L'animal de chaque pays, comment le protéger, et des énigmes sur les monuments."],
      ['🧩', 'Jeux de logique', 'Memory des drapeaux et quiz « Qui habite où ? ».'],
      ['👧', 'Toute la famille', "Jusqu'à 5 enfants et 5 appareils, chacun avec sa progression."],
      ['📱', 'Téléphone, tablette, ordi', "S'installe comme une app, sans store, et fonctionne hors-ligne."],
    ],
    countries_title: '{n} pays à explorer',
    countries_sub: 'Tous les pays du monde arrivent, chaque semaine de nouveaux.',
    price_title: 'Un prix simple, pour toujours',
    free_name: 'Gratuit',
    free_items: ['Tous les pays', '2 nouveaux chapitres par jour et par enfant', 'Les 3 niveaux, voix off et quiz'],
    free_cta: 'Essayer maintenant',
    full_name: 'Formule Famille',
    launch: 'Le plus choisi',
    per_year: '/ an', per_month: '/ mois', or_month: 'ou {p} par mois', once: 'résiliable à tout moment',
    full_items: ['Aventures illimitées, tous les jours', 'Plus de 1000 histoires et quiz', '5 enfants · 5 appareils', 'Statistiques parents'],
    full_cta: 'Commencer gratuitement',
    full_note: 'Commencez gratuitement, passez à la Formule Famille quand vous voulez.',
    faq_title: 'Questions fréquentes',
    faq: [
      ['C’est vraiment gratuit ?', 'Oui. Chaque enfant peut jouer 2 nouveaux chapitres par jour, dans tous les pays, sans limite de durée. La Formule Famille débloque des aventures illimitées pour 5 enfants.'],
      ['Comment résilier ?', 'En deux clics, dans l’app (« Mon abonnement ») ou sur la page « Verträge hier kündigen ». L’accès reste actif jusqu’à la fin de la période payée.'],
      ['Pour quel âge ?', 'De 4 à 12 ans. Vous choisissez un niveau de lecture pour chaque enfant, et vous pouvez le changer à tout moment.'],
      ['Mon enfant ne sait pas encore lire.', 'Pas de souci : l’app peut lire à voix haute toutes les histoires et toutes les questions.'],
      ['Sur quels appareils ?', 'Téléphone, tablette et ordinateur, dans le navigateur. Vous pouvez aussi l’installer sur l’écran d’accueil, sans passer par un store.'],
      ['Et les données de mon enfant ?', 'Nous demandons seulement un prénom (ou un surnom) et un âge. Pas de publicité, pas de traceur, aucune donnée vendue. Vous pouvez supprimer le compte à tout moment.'],
      ['Faut-il un compte pour essayer ?', 'Non : vous pouvez commencer tout de suite, sans compte et sans carte bancaire. Le compte parent (gratuit) sert à garder la progression.'],
    ],
    final_title: 'Prêt pour le voyage ?',
    final_sub: 'Le premier voyage est gratuit, tous les jours.',
    guest_title: 'Qui va explorer ?',
    guest_name: "Prénom de l'enfant",
    guest_age: 'Âge',
    guest_go: "C'est parti ! 🚀",
    m_hello: 'Salut Lina !',
    m_story: 'Le voyage de Mansa Moussa',
    m_bravo: 'Bravo ! +30 XP',
  },
  en: {
    login: 'Sign in',
    h1: 'World history, told for kids',
    h1_sub: 'True stories, quizzes and a voice that reads everything aloud. {n} countries, 3 reading levels, ages 4 to 12.',
    try: '▶ Try it free',
    try_note: 'No account · no card · 2 free chapters a day',
    cont: '▶ Continue with {name}',
    signup: 'Create a parent account',
    proof: ['🚫 No ads', '🔒 No trackers', '🇪🇺 GDPR compliant'],
    story_kicker: 'Why Mokalibo?',
    story_q: '“Dad, where is Mali?”',
    story_text: 'One evening my son asked me this question. I looked for an app that tells children the history of countries, with their heroes, dates and cultures, and not only Europe’s. I couldn’t find one. So I built it.',
    story_sign: 'Walid, dad and creator of Mokalibo',
    how_title: 'How does it work?',
    how: [
      ['🌍', 'Pick a country', '{n} countries on 5 continents, each with a kid guide from that country.'],
      ['📖', 'Discover its history', 'Illustrated cards with dates, people and fun facts, read aloud.'],
      ['⭐', 'Earn stars', 'A quiz after every chapter, XP and levels to unlock.'],
    ],
    feat_title: 'Made for kids… and for parents',
    feats: [
      ['📚', '3 reading levels', 'Little explorer (4-5), Explorer (6-7), Great explorer (8-12) with more than 1000 stories.'],
      ['🔊', 'Voice-over', 'Every story and every question can be read aloud.'],
      ['🗣️', '6 languages', 'French, English, German, Arabic, Portuguese and Bambara.'],
      ['📊', 'Parents area', 'Time spent and countries explored, for each child.'],
      ['🛂', 'Passport and badges', 'A stamp for every country finished and badges to collect.'],
      ['🗺️', 'Map and treasure hunt', 'An interactive world map to find countries while playing.'],
      ['🦊', 'Animals and monuments', "Each country's animal, how to protect it, and monument riddles."],
      ['🧩', 'Logic games', 'Flag memory and the “Who lives where?” quiz.'],
      ['👧', 'The whole family', 'Up to 5 children and 5 devices, each with their own progress.'],
      ['📱', 'Phone, tablet, computer', 'Installs like an app, no store needed, and works offline.'],
    ],
    countries_title: '{n} countries to explore',
    countries_sub: 'Every country in the world is coming, new ones every week.',
    price_title: 'One simple price, forever',
    free_name: 'Free',
    free_items: ['Every country', '2 new chapters per day per child', 'All 3 levels, voice-over and quizzes'],
    free_cta: 'Try now',
    full_name: 'Family Plan',
    launch: 'Most popular',
    per_year: '/ year', per_month: '/ month', or_month: 'or {p} per month', once: 'cancel anytime',
    full_items: ['Unlimited adventures, every day', 'More than 1000 stories and quizzes', '5 children · 5 devices', 'Parent statistics'],
    full_cta: 'Start for free',
    full_note: 'Start for free, upgrade to the Family Plan whenever you like.',
    faq_title: 'Frequently asked questions',
    faq: [
      ['Is it really free?', 'Yes. Every child can play 2 new chapters a day, in every country, with no time limit. The Family Plan unlocks unlimited adventures for 5 children.'],
      ['How do I cancel?', 'In two clicks, in the app (“My subscription”) or on the “Verträge hier kündigen” page. Access stays active until the end of the paid period.'],
      ['What age is it for?', 'Ages 4 to 12. You choose a reading level for each child and can change it at any time.'],
      ['My child cannot read yet.', 'No problem: the app can read every story and every question aloud.'],
      ['Which devices?', 'Phone, tablet and computer, in the browser. You can also add it to your home screen, without any app store.'],
      ['What about my child’s data?', 'We only ask for a first name (or nickname) and an age. No ads, no trackers, no data sold. You can delete the account at any time.'],
      ['Do I need an account to try?', 'No: you can start right away, with no account and no card. The free parent account keeps the progress.'],
    ],
    final_title: 'Ready for the journey?',
    final_sub: 'The first journey is free, every day.',
    guest_title: 'Who is exploring?',
    guest_name: 'Child’s first name',
    guest_age: 'Age',
    guest_go: "Let's go! 🚀",
    m_hello: 'Hi Lina!',
    m_story: 'The journey of Mansa Musa',
    m_bravo: 'Well done! +30 XP',
  },
  de: {
    login: 'Anmelden',
    h1: 'Die Geschichte der Welt, für Kinder erzählt',
    h1_sub: 'Wahre Geschichten, Quizze und eine Stimme, die alles vorliest. {n} Länder, 3 Lesestufen, von 4 bis 12 Jahren.',
    try: '▶ Kostenlos ausprobieren',
    try_note: 'Ohne Konto · ohne Karte · 2 Gratis-Kapitel pro Tag',
    cont: '▶ Weiter mit {name}',
    signup: 'Elternkonto erstellen',
    proof: ['🚫 Keine Werbung', '🔒 Kein Tracking', '🇪🇺 DSGVO-konform'],
    story_kicker: 'Warum Mokalibo?',
    story_q: '„Papa, wo ist Mali?“',
    story_text: 'Eines Abends stellte mir mein Sohn diese Frage. Ich suchte eine App, die Kindern die Geschichte der Länder erzählt, mit ihren Helden, Daten und Kulturen, und nicht nur die Europas. Ich fand keine. Also habe ich sie selbst gebaut.',
    story_sign: 'Walid, Papa und Gründer von Mokalibo',
    how_title: 'So funktioniert es',
    how: [
      ['🌍', 'Wähle ein Land', '{n} Länder auf 5 Kontinenten, jeweils mit einem Kinder-Guide aus dem Land.'],
      ['📖', 'Entdecke seine Geschichte', 'Illustrierte Karten mit Daten, Persönlichkeiten und Anekdoten, vorgelesen.'],
      ['⭐', 'Sammle Sterne', 'Ein Quiz nach jedem Kapitel, XP und Stufen zum Freischalten.'],
    ],
    feat_title: 'Für Kinder gemacht… und für Eltern',
    feats: [
      ['📚', '3 Lesestufen', 'Kleiner Entdecker (4-5), Entdecker (6-7), Großer Entdecker (8-12) mit über 1000 Geschichten.'],
      ['🔊', 'Vorlesefunktion', 'Jede Geschichte und jede Frage kann vorgelesen werden.'],
      ['🗣️', '6 Sprachen', 'Französisch, Englisch, Deutsch, Arabisch, Portugiesisch und Bambara.'],
      ['📊', 'Elternbereich', 'Nutzungszeit und entdeckte Länder für jedes Kind.'],
      ['🛂', 'Pass und Abzeichen', 'Ein Stempel für jedes fertige Land und Abzeichen zum Sammeln.'],
      ['🗺️', 'Karte und Schatzsuche', 'Eine interaktive Weltkarte, um Länder spielerisch zu finden.'],
      ['🦊', 'Tiere und Denkmäler', 'Das Tier jedes Landes, wie man es schützt, und Rätsel zu Denkmälern.'],
      ['🧩', 'Logikspiele', 'Flaggen-Memory und das Quiz „Wer wohnt wo?“.'],
      ['👧', 'Die ganze Familie', 'Bis zu 5 Kinder und 5 Geräte, jedes mit eigenem Fortschritt.'],
      ['📱', 'Handy, Tablet, Computer', 'Wie eine App installierbar, ohne Store, auch offline nutzbar.'],
    ],
    countries_title: '{n} Länder zum Entdecken',
    countries_sub: 'Alle Länder der Welt kommen, jede Woche neue.',
    price_title: 'Ein einfacher Preis, für immer',
    free_name: 'Kostenlos',
    free_items: ['Alle Länder', '2 neue Kapitel pro Tag und Kind', 'Alle 3 Stufen, Vorlesen und Quizze'],
    free_cta: 'Jetzt ausprobieren',
    full_name: 'Familien-Abo',
    launch: 'Am beliebtesten',
    per_year: '/ Jahr', per_month: '/ Monat', or_month: 'oder {p} pro Monat', once: 'jederzeit kündbar',
    full_items: ['Unbegrenzte Abenteuer, jeden Tag', 'Über 1000 Geschichten und Quizze', '5 Kinder · 5 Geräte', 'Statistik für Eltern'],
    full_cta: 'Kostenlos starten',
    full_note: 'Kostenlos starten, jederzeit zum Familien-Abo wechseln.',
    faq_title: 'Häufige Fragen',
    faq: [
      ['Ist es wirklich kostenlos?', 'Ja. Jedes Kind kann täglich 2 neue Kapitel spielen, in allen Ländern, ohne zeitliche Begrenzung. Das Familien-Abo schaltet unbegrenzte Abenteuer für 5 Kinder frei.'],
      ['Wie kündige ich?', 'Mit zwei Klicks in der App („Mein Abo“) oder über „Verträge hier kündigen“. Der Zugang bleibt bis zum Ende des bezahlten Zeitraums bestehen.'],
      ['Für welches Alter?', 'Von 4 bis 12 Jahren. Sie wählen für jedes Kind eine Lesestufe und können sie jederzeit ändern.'],
      ['Mein Kind kann noch nicht lesen.', 'Kein Problem: Die App liest alle Geschichten und Fragen vor.'],
      ['Auf welchen Geräten?', 'Handy, Tablet und Computer, im Browser. Sie können die App auch ohne Store auf dem Startbildschirm installieren.'],
      ['Und die Daten meines Kindes?', 'Wir fragen nur nach einem Vornamen (oder Spitznamen) und dem Alter. Keine Werbung, kein Tracking, kein Datenverkauf. Sie können das Konto jederzeit löschen.'],
      ['Brauche ich zum Testen ein Konto?', 'Nein: Sie können sofort loslegen, ohne Konto und ohne Karte. Das kostenlose Elternkonto speichert den Fortschritt.'],
    ],
    final_title: 'Bereit für die Reise?',
    final_sub: 'Die erste Reise ist kostenlos, jeden Tag.',
    guest_title: 'Wer geht auf Entdeckungsreise?',
    guest_name: 'Vorname des Kindes',
    guest_age: 'Alter',
    guest_go: 'Los geht’s! 🚀',
    m_hello: 'Hallo Lina!',
    m_story: 'Die Reise von Mansa Musa',
    m_bravo: 'Super! +30 XP',
  },
}

const AVATARS = ['👧🏽', '👦🏿', '👧🏻', '👦🏽', '🧒']

function PhoneMockup({ T, lang }) {
  const regions = Object.values(REGIONS).filter((r) => r.countries.length).slice(0, 4)
  return (
    <div className="lp-mock" aria-hidden>
      <div className="lp-phone">
        <div className="home-sky" style={{ height: '100%', borderRadius: 30, padding: '18px 12px', overflow: 'hidden' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 40, lineHeight: 1 }}>🌍</div>
            <div style={{ fontFamily: FONT_TITLE, fontWeight: 700, fontSize: 24, lineHeight: 1.1 }}>
              <span style={{ color: '#FF6F00' }}>Moka</span><span style={{ color: '#1E88E5' }}>libo</span>
            </div>
            <div style={{ fontSize: 12, fontWeight: 900, color: INK, margin: '4px 0 10px' }}>{T.m_hello} 👋</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {regions.map((r) => (
              <div key={r.name} style={{ background: `linear-gradient(150deg, ${r.grad[0]}, ${r.grad[1]})`, borderRadius: 16, padding: '10px 4px 8px', textAlign: 'center', color: 'white', boxShadow: `0 4px 0 ${r.grad[1]}55` }}>
                <div style={{ fontSize: 28, lineHeight: 1.1 }}>{r.mascot}</div>
                <div style={{ fontFamily: FONT_TITLE, fontSize: 12, fontWeight: 600 }}><TText text={r.name} lang={lang} /></div>
                <div style={{ fontSize: 9, background: 'rgba(255,255,255,0.9)', borderRadius: 8, marginTop: 4, padding: '2px 0' }}>
                  {r.countries.slice(0, 4).map((c) => COUNTRIES[c]?.flag).join(' ')}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 10, background: 'linear-gradient(180deg,#FFE04D,#FFC400)', borderRadius: 14, padding: '9px', textAlign: 'center', fontSize: 12, fontWeight: 900, color: INK, boxShadow: '0 4px 0 #E6A100' }}>🚀</div>
        </div>
      </div>
      <div className="lp-float lp-float-story float">
        <div style={{ fontSize: 30 }}>🕌</div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 900, color: '#2E9E5B' }}>📅 1324 · 🇲🇱</div>
          <div style={{ fontSize: 13, fontWeight: 900, color: INK, lineHeight: 1.2 }}>{T.m_story}</div>
        </div>
        <div style={{ fontSize: 18, background: '#FFF3E0', borderRadius: '50%', width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>🔊</div>
      </div>
      <div className="lp-float lp-float-quiz float" style={{ animationDelay: '-1.2s' }}>✅ {T.m_bravo}</div>
    </div>
  )
}

function GuestSheet({ T, onClose, onStart }) {
  const [name, setName] = useState('')
  const [age, setAge] = useState(6)
  const [avatar, setAvatar] = useState(AVATARS[0])
  const go = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    onStart({ name: name.trim(), age, avatar, difficulty: defaultLevelForAge(age), xp: 0, level: 1, done: {} })
  }
  return (
    <div onClick={onClose} className="sheet-backdrop" style={{ position: 'fixed', inset: 0, background: 'rgba(26,42,79,0.5)', zIndex: 600, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <form onSubmit={go} onClick={(e) => e.stopPropagation()} className="anim-slide-up sheet green-bg"
        style={{ width: '100%', maxWidth: 420, borderRadius: '28px 28px 0 0', padding: '22px 18px 26px', fontFamily: 'Nunito, sans-serif' }}>
        <div style={{ textAlign: 'center', fontFamily: FONT_TITLE, fontSize: 26, fontWeight: 700, color: INK, marginBottom: 14 }}>{T.guest_title}</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 14 }}>
          {AVATARS.map((a) => (
            <button key={a} type="button" onClick={() => setAvatar(a)} aria-pressed={avatar === a}
              style={{ fontSize: 30, width: 54, height: 54, borderRadius: 16, cursor: 'pointer', border: `3px solid ${avatar === a ? '#FF9800' : 'white'}`, background: avatar === a ? '#FFF3E0' : 'white' }}>{a}</button>
          ))}
        </div>
        <input autoFocus value={name} onChange={(e) => setName(e.target.value)} maxLength={20} placeholder={T.guest_name}
          style={{ width: '100%', padding: '14px 16px', borderRadius: 16, border: '3px solid #D6EEDC', background: 'white', color: INK, fontSize: 18, fontFamily: 'inherit', fontWeight: 800, outline: 'none', marginBottom: 14 }} />
        <div style={{ fontSize: 12, fontWeight: 900, color: '#3E6B4F', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>{T.guest_age}</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: 5, marginBottom: 18 }}>
          {[4, 5, 6, 7, 8, 9, 10, 11, 12].map((a) => (
            <button key={a} type="button" onClick={() => setAge(a)} aria-pressed={age === a}
              style={{ padding: '10px 0', borderRadius: 12, border: 'none', background: age === a ? '#2E9E5B' : 'white', color: age === a ? 'white' : INK, fontSize: 15, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit' }}>{a}</button>
          ))}
        </div>
        <button type="submit" className="btn-kid soft" disabled={!name.trim()}
          style={{ width: '100%', background: 'linear-gradient(180deg,#FFE04D,#FFC400)', color: INK, padding: '16px', fontSize: 19, borderRadius: 22, boxShadow: '0 6px 0 #E6A100', opacity: name.trim() ? 1 : 0.5 }}>
          {T.guest_go}
        </button>
      </form>
    </div>
  )
}

// Page de presentation (visiteurs non connectes) : decouverte, prix, FAQ, essai sans compte
export default function LandingScreen({ lang, changeLang, guest, onStartGuest, onResumeGuest, onLogin, onSignup }) {
  const N = String(Object.keys(COUNTRIES).length)
  const T = useMemo(() => JSON.parse(JSON.stringify(TXT[lang] || TXT.en).replaceAll('{n}', N)), [lang, N])
  const [sheet, setSheet] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)
  useEffect(() => { track('landing_view', { once: true }) }, [])
  useReveal([lang])

  const tryNow = () => (guest ? onResumeGuest() : setSheet(true))
  const tryLabel = guest ? T.cont.replace('{name}', guest.name) : T.try
  const allFlags = Object.keys(COUNTRIES)

  const primary = { background: 'linear-gradient(180deg,#FFE04D,#FFC400)', color: INK, padding: '18px 26px', fontSize: 20, borderRadius: 24, boxShadow: '0 7px 0 #E6A100, 0 14px 28px rgba(255,196,0,0.35)' }
  const secondary = { background: 'white', color: '#2E7D4F', padding: '14px 22px', fontSize: 16, borderRadius: 20, boxShadow: '0 4px 14px rgba(46,158,91,0.15)' }
  const h2 = { fontFamily: FONT_TITLE, fontSize: 32, fontWeight: 700, color: INK, textAlign: 'center', margin: '0 0 22px', lineHeight: 1.15 }

  return (
    <div style={{ fontFamily: 'Nunito, sans-serif', color: INK, background: '#FFFDF7' }}>
      {sheet && <GuestSheet T={T} onClose={() => setSheet(false)} onStart={(g) => { setSheet(false); onStartGuest(g) }} />}

      {/* ── Heros ── */}
      <section className="home-sky" style={{ padding: '14px 16px 50px', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden className="plane" style={{ top: 140 }}>✈️</div>
        <div aria-hidden className="drift lp-cloud" style={{ position: 'absolute', top: 90, left: '6%', fontSize: 56, opacity: 0.9 }}>☁️</div>
        <div aria-hidden className="drift lp-cloud" style={{ position: 'absolute', top: 260, right: '4%', fontSize: 46, opacity: 0.8, animationDelay: '-4s' }}>☁️</div>
        <div className="lp-wrap" style={{ display: 'flex', alignItems: 'center', gap: 10, position: 'relative', zIndex: 2 }}>
          <div style={{ fontFamily: FONT_TITLE, fontWeight: 700, fontSize: 28, lineHeight: 1 }}>
            <span style={{ color: '#FF6F00' }}>Moka</span><span style={{ color: '#1E88E5' }}>libo</span>
          </div>
          <div style={{ flex: 1 }} />
          <LangPicker lang={lang} onChange={changeLang} compact />
          <button className="btn-kid soft" onClick={onLogin}
            style={{ background: 'white', color: INK, padding: '9px 16px', fontSize: 14, boxShadow: '0 3px 10px rgba(26,42,79,0.12)' }}>{T.login}</button>
        </div>

        <div className="lp-wrap lp-hero" style={{ position: 'relative', zIndex: 2 }}>
          <div className="lp-hero-text screen-enter">
            <h1 className="lp-h1" style={{ fontFamily: FONT_TITLE, fontWeight: 700, fontSize: 40, lineHeight: 1.08, margin: '28px 0 14px', color: INK }}>{T.h1}</h1>
            <p style={{ fontSize: 18, fontWeight: 700, color: '#455A64', lineHeight: 1.55, margin: '0 0 24px' }}>{T.h1_sub}</p>
            <div className="lp-ctas">
              <button className="btn-kid soft anim-glow" onClick={tryNow} style={primary}>{tryLabel}</button>
              <button className="btn-kid soft" onClick={onSignup} style={secondary}>{T.signup}</button>
            </div>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#607D8B', marginTop: 12 }}>{T.try_note}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 18 }} className="lp-proof">
              {T.proof.map((p) => (
                <span key={p} style={{ background: 'rgba(255,255,255,0.85)', borderRadius: 999, padding: '6px 12px', fontSize: 13, fontWeight: 900, color: '#2E7D4F' }}>{p}</span>
              ))}
            </div>
          </div>
          <PhoneMockup T={T} lang={lang} />
        </div>
      </section>

      {/* ── Histoire du createur ── */}
      <section style={{ padding: '56px 16px' }}>
        <div className="lp-wrap reveal" style={{ maxWidth: 780 }}>
          <div style={{ background: 'white', borderRadius: 32, padding: '30px 26px', boxShadow: '0 14px 40px rgba(26,42,79,0.08)', position: 'relative' }}>
            <div style={{ fontSize: 13, fontWeight: 900, color: '#FF6F00', letterSpacing: 1, textTransform: 'uppercase' }}>{T.story_kicker}</div>
            <div style={{ fontFamily: FONT_TITLE, fontSize: 34, fontWeight: 700, color: '#1E88E5', margin: '6px 0 14px', lineHeight: 1.15 }}>{T.story_q}</div>
            <p style={{ fontSize: 17, lineHeight: 1.75, fontWeight: 700, color: '#37474F', margin: 0 }}>{T.story_text}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 18 }}>
              <div style={{ fontSize: 30, width: 52, height: 52, borderRadius: '50%', background: '#FFF3E0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>👨🏾‍👦🏾</div>
              <div style={{ fontWeight: 900, color: '#546E7A' }}>{T.story_sign}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Comment ca marche ── */}
      <section style={{ padding: '10px 16px 56px' }}>
        <div className="lp-wrap">
          <h2 className="reveal" style={h2}>{T.how_title}</h2>
          <div className="lp-grid3 reveal-stagger">
            {T.how.map(([icon, title, text], i) => (
              <div key={title} style={{ background: 'white', borderRadius: 28, padding: '24px 20px', textAlign: 'center', boxShadow: '0 10px 28px rgba(26,42,79,0.07)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 14, left: 16, width: 30, height: 30, borderRadius: '50%', background: '#2E9E5B', color: 'white', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</div>
                <div style={{ fontSize: 54, lineHeight: 1.1 }}>{icon}</div>
                <div style={{ fontFamily: FONT_TITLE, fontSize: 22, fontWeight: 600, margin: '10px 0 6px' }}>{title}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#607D8B', lineHeight: 1.55 }}>{text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pays ── */}
      <section className="green-bg" style={{ padding: '50px 16px' }}>
        <div className="lp-wrap" style={{ textAlign: 'center' }}>
          <h2 style={{ ...h2, marginBottom: 6 }}>{T.countries_title}</h2>
          <div style={{ fontWeight: 800, color: '#3E6B4F', marginBottom: 22 }}>{T.countries_sub}</div>
          <div className="reveal-stagger" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10 }}>
            {allFlags.slice(0, 24).map((code) => (
              <div key={code} title={COUNTRIES[code].name} style={{ background: 'white', borderRadius: 18, padding: '10px 12px', minWidth: 96, boxShadow: '0 4px 12px rgba(46,158,91,0.12)' }}>
                <div style={{ fontSize: 34, lineHeight: 1.1 }}>{COUNTRIES[code].flag}</div>
                <div style={{ fontSize: 12, fontWeight: 900, color: INK }}><TText text={COUNTRIES[code].name} lang={lang} /></div>
              </div>
            ))}
            {allFlags.length > 24 && (
              <div style={{ background: '#2E9E5B', color: 'white', borderRadius: 18, padding: '10px 12px', minWidth: 96, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT_TITLE, fontSize: 22, fontWeight: 700 }}>+{allFlags.length - 24}</div>
            )}
          </div>
        </div>
      </section>

      {/* ── Fonctionnalites ── */}
      <section style={{ padding: '56px 16px' }}>
        <div className="lp-wrap">
          <h2 className="reveal" style={h2}>{T.feat_title}</h2>
          <div className="lp-grid3 reveal-stagger">
            {T.feats.map(([icon, title, text]) => (
              <div key={title} style={{ display: 'flex', gap: 14, background: 'white', borderRadius: 24, padding: '18px 18px', boxShadow: '0 8px 22px rgba(26,42,79,0.06)' }}>
                <div style={{ fontSize: 30, width: 54, height: 54, borderRadius: 18, background: '#E8F8EA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{icon}</div>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 900 }}>{title}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#607D8B', lineHeight: 1.5, marginTop: 2 }}>{text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Prix ── */}
      <section className="home-sky" style={{ padding: '56px 16px' }}>
        <div className="lp-wrap" style={{ maxWidth: 860 }}>
          <h2 className="reveal" style={h2}>{T.price_title}</h2>
          <div className="lp-grid2 reveal-stagger">
            <div style={{ background: 'white', borderRadius: 30, padding: '26px 22px', boxShadow: '0 10px 28px rgba(26,42,79,0.08)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: '#2E9E5B' }}>🎁 {T.free_name}</div>
              <div style={{ fontFamily: FONT_TITLE, fontSize: 46, fontWeight: 700, margin: '6px 0 12px' }}>0 €</div>
              {T.free_items.map((it) => <div key={it} style={{ fontSize: 15, fontWeight: 800, padding: '5px 0', color: '#37474F' }}>✓ {it}</div>)}
              <button className="btn-kid soft" onClick={tryNow} style={{ ...secondary, marginTop: 'auto', border: '3px solid #2E9E5B' }}>{T.free_cta}</button>
            </div>
            <div style={{ background: 'linear-gradient(160deg,#FF9A1F,#FF6F00)', color: 'white', borderRadius: 30, padding: '26px 22px', boxShadow: '0 14px 36px rgba(255,111,0,0.35)', position: 'relative', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'absolute', top: -12, right: 18, background: '#FFD600', color: INK, borderRadius: 999, padding: '5px 12px', fontSize: 13, fontWeight: 900, boxShadow: '0 3px 8px rgba(0,0,0,0.15)' }}>⭐ {T.launch}</div>
              <div style={{ fontSize: 18, fontWeight: 900 }}>🌍 {T.full_name}</div>
              <div style={{ fontFamily: FONT_TITLE, fontSize: 46, fontWeight: 700, margin: '6px 0 0' }}>{PLANS.year.label} <span style={{ fontSize: 18 }}>{T.per_year}</span></div>
              <div style={{ fontSize: 14, fontWeight: 900, opacity: 0.95 }}>{T.or_month.replace('{p}', PLANS.month.label)}</div>
              <div style={{ fontSize: 13, fontWeight: 800, opacity: 0.9, marginBottom: 12 }}>✓ {T.once}</div>
              {T.full_items.map((it) => <div key={it} style={{ fontSize: 15, fontWeight: 800, padding: '5px 0' }}>✓ {it}</div>)}
              <button className="btn-kid soft" onClick={tryNow} style={{ ...primary, marginTop: 16, fontSize: 18 }}>{T.full_cta}</button>
              <div style={{ fontSize: 12, fontWeight: 800, opacity: 0.9, marginTop: 10, textAlign: 'center' }}>{T.full_note}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: '56px 16px' }}>
        <div className="lp-wrap" style={{ maxWidth: 780 }}>
          <h2 className="reveal" style={h2}>{T.faq_title}</h2>
          {T.faq.map(([q, a], i) => (
            <div key={q} style={{ background: 'white', borderRadius: 20, marginBottom: 10, boxShadow: '0 4px 14px rgba(26,42,79,0.06)', overflow: 'hidden' }}>
              <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', padding: '16px 18px', fontFamily: 'inherit', fontSize: 16, fontWeight: 900, color: INK, textAlign: 'left', cursor: 'pointer' }}>
                <span style={{ flex: 1 }}>{q}</span>
                <span style={{ color: '#2E9E5B', fontSize: 20, transform: openFaq === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s' }}>+</span>
              </button>
              {openFaq === i && <div style={{ padding: '0 18px 16px', fontSize: 15, fontWeight: 700, color: '#546E7A', lineHeight: 1.6 }}>{a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* ── Appel final ── */}
      <section className="green-bg" style={{ padding: '56px 16px 20px', textAlign: 'center' }}>
        <div className="float" style={{ fontSize: 70 }}>🌍</div>
        <h2 style={{ ...h2, marginBottom: 6 }}>{T.final_title}</h2>
        <div style={{ fontWeight: 800, color: '#3E6B4F', marginBottom: 22 }}>{T.final_sub}</div>
        <button className="btn-kid soft" onClick={tryNow} style={primary}>{tryLabel}</button>
        <LegalFooter lang={lang} />
      </section>
    </div>
  )
}

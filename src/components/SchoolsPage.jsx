import { isProEmail } from '../proEmail'
import { useState } from 'react'
import { PLANS, SCHOOL_FROM } from '../premium'
import { track } from '../track'

const INK = '#1A2A4F'
// Fiches PDF generees par marketing/ecoles/fiches.mjs (public/ecoles/)
const FICHES = [
  ['gaulois', '🇫🇷', 'La Gaule et les Gaulois', 'CM1'],
  ['moyen-age', '🇫🇷', 'Rois, châteaux et cathédrales', 'CM1'],
  ['revolution', '🇫🇷', 'La Révolution française', 'CM2'],
  ['mali', '🇲🇱', 'L’empire du Mali et Mansa Moussa', 'CM1 – 5e'],
  ['egypte', '🇪🇬', 'L’Égypte des pharaons', '6e'],
]
const FONT_TITLE = 'Fredoka, Nunito, sans-serif'

const TXT = {
  fr: {
    title: 'Pour les enseignants et les écoles',
    sub: 'Faites voyager toute la classe dans l’histoire du monde : des histoires vraies lues à voix haute, à projeter au tableau, et un quiz pour vérifier ce qui est retenu.',
    points: ['📺 Se projette sur le tableau numérique', '🧒 Un profil par élève, avec sa progression', '🔊 Voix off : même les non-lecteurs suivent', '🚫 Sans publicité, sans traceur, conforme RGPD'],
    t_name: 'Enseignant', t_for: '1 enseignant · jusqu’à 35 élèves · une tablette par élève (36 appareils)',
    per_year: '/ an', or_month: 'ou {p} par mois', t_cta: 'Essai gratuit 3 jours', t_note: 'Facture au nom de l’école. Résiliable à tout moment.', t_pro: '✉️ Compte avec votre adresse e-mail professionnelle (école, académie). Gmail, Hotmail, Orange… ne sont pas acceptés.', f_pro: 'Merci d’utiliser l’adresse e-mail professionnelle de l’école ou de l’académie (pas de Gmail, Hotmail, Orange…).',
    s_name: 'École', s_from: 'à partir de', s_for: 'Tous les enseignants · jusqu’à 300 élèves · 330 appareils',
    s_items: ['Paiement par virement sur facture (30 jours)', 'Mise en place accompagnée', 'Tarif selon le nombre d’élèves'],
    form_title: 'Demander un devis pour votre école',
    c_title: 'Une séance type de 45 minutes', c_steps: [['🗺️', 'Découvrir', 'On situe le pays sur la carte du monde, projetée au tableau.'], ['🔊', 'Écouter', 'On écoute les histoires vraies du chapitre avec la voix off, même les non-lecteurs suivent.'], ['🎯', 'Vérifier', 'Quiz collectif, activité et trace écrite prête à coller dans le cahier.']],
    f_title: '📄 Fiches pédagogiques gratuites', f_sub: 'Alignées sur les programmes du cycle 3 et de la 6e. Libres de reproduction pour la classe.', f_dl: 'Télécharger',
    f_school: 'Nom de l’école *', f_name: 'Votre nom *', f_email: 'E-mail professionnel *', f_city: 'Ville', f_students: 'Nombre d’élèves', f_msg: 'Message (facultatif)',
    f_send: 'Envoyer la demande', f_wait: 'Envoi…', f_ok: '✅ Merci ! Nous vous répondons sous 48 heures avec un devis.', f_err: 'L’envoi a échoué. Écrivez-nous à bonjour@mokalibo.com',
    f_privacy: 'Vos coordonnées servent uniquement à répondre à votre demande.', privacy: 'Confidentialité',
  },
  en: {
    title: 'For teachers and schools',
    sub: 'Take the whole class on a journey through world history: true stories read aloud, ready to show on the board, with a quiz to check what was learned.',
    points: ['📺 Works on the classroom smartboard', '🧒 One profile per pupil, with their own progress', '🔊 Voice-over: even non-readers can follow', '🚫 No ads, no trackers, GDPR compliant'],
    t_name: 'Teacher', t_for: '1 teacher · up to 35 pupils · one tablet per pupil (36 devices)',
    per_year: '/ year', or_month: 'or {p} a month', t_cta: '3-day free trial', t_note: 'Invoice in the school’s name. Cancel anytime.', t_pro: '✉️ Account with your work e-mail (school or education authority). Gmail, Hotmail, Yahoo… are not accepted.', f_pro: 'Please use the school’s or education authority’s work e-mail (no Gmail, Hotmail, Yahoo…).',
    s_name: 'School', s_from: 'from', s_for: 'All teachers · up to 300 pupils · 330 devices',
    s_items: ['Pay by bank transfer on invoice (30 days)', 'Guided setup', 'Price based on the number of pupils'],
    form_title: 'Request a quote for your school',
    c_title: 'A typical 45-minute lesson', c_steps: [['🗺️', 'Discover', 'Find the country on the world map, shown on the board.'], ['🔊', 'Listen', 'Listen to the chapter’s true stories with the voice-over; even non-readers can follow.'], ['🎯', 'Check', 'Class quiz, an activity and a short summary for the exercise book.']],
    f_title: '📄 Free lesson sheets', f_sub: 'Currently in French, for 8 to 12-year-olds. Free to copy for your class.', f_dl: 'Download',
    f_school: 'School name *', f_name: 'Your name *', f_email: 'Work e-mail *', f_city: 'City', f_students: 'Number of pupils', f_msg: 'Message (optional)',
    f_send: 'Send request', f_wait: 'Sending…', f_ok: '✅ Thank you! We will reply within 48 hours with a quote.', f_err: 'Sending failed. Write to us at bonjour@mokalibo.com',
    f_privacy: 'Your details are only used to answer your request.', privacy: 'Privacy',
  },
  de: {
    title: 'Für Lehrkräfte und Schulen',
    sub: 'Nehmen Sie die ganze Klasse mit auf eine Reise durch die Weltgeschichte: wahre Geschichten zum Vorlesen, auf dem Whiteboard zeigbar, mit einem Quiz zum Abschluss.',
    points: ['📺 Läuft auf dem digitalen Whiteboard', '🧒 Ein Profil pro Kind, mit eigenem Fortschritt', '🔊 Vorlesefunktion: auch für Kinder, die noch nicht lesen', '🚫 Ohne Werbung, ohne Tracker, DSGVO-konform'],
    t_name: 'Lehrkraft', t_for: '1 Lehrkraft · bis zu 35 Schüler · ein Tablet pro Kind (36 Geräte)',
    per_year: '/ Jahr', or_month: 'oder {p} pro Monat', t_cta: '3 Tage kostenlos testen', t_note: 'Rechnung auf die Schule. Jederzeit kündbar.', t_pro: '✉️ Konto mit Ihrer dienstlichen E-Mail-Adresse (Schule, Schulamt). Gmail, GMX, Web.de, Hotmail… werden nicht akzeptiert.', f_pro: 'Bitte verwenden Sie die dienstliche E-Mail-Adresse der Schule (kein Gmail, GMX, Web.de, Hotmail…).',
    s_name: 'Schule', s_from: 'ab', s_for: 'Alle Lehrkräfte · bis zu 300 Schüler · 330 Geräte',
    s_items: ['Zahlung per Überweisung auf Rechnung (30 Tage)', 'Begleitete Einrichtung', 'Preis nach Schülerzahl'],
    form_title: 'Angebot für Ihre Schule anfragen',
    c_title: 'Eine typische Stunde (45 Minuten)', c_steps: [['🗺️', 'Entdecken', 'Das Land auf der Weltkarte zeigen, am Whiteboard.'], ['🔊', 'Zuhören', 'Die wahren Geschichten des Kapitels mit Vorlesefunktion hören, auch Nicht-Leser folgen.'], ['🎯', 'Überprüfen', 'Klassenquiz, eine Aktivität und ein Merktext fürs Heft.']],
    f_title: '📄 Kostenlose Unterrichtsblätter', f_sub: 'Derzeit auf Französisch, für 8- bis 12-Jährige. Frei kopierbar für Ihre Klasse.', f_dl: 'Herunterladen',
    f_school: 'Name der Schule *', f_name: 'Ihr Name *', f_email: 'Dienstliche E-Mail *', f_city: 'Ort', f_students: 'Anzahl Schüler', f_msg: 'Nachricht (optional)',
    f_send: 'Anfrage senden', f_wait: 'Wird gesendet…', f_ok: '✅ Danke! Wir melden uns innerhalb von 48 Stunden mit einem Angebot.', f_err: 'Senden fehlgeschlagen. Schreiben Sie uns: bonjour@mokalibo.com',
    f_privacy: 'Ihre Angaben werden nur zur Beantwortung Ihrer Anfrage verwendet.', privacy: 'Datenschutz',
  },
}

// Page « Ecoles » du site : formule Enseignant (abonnement en ligne) et formule Ecole (sur devis)
export default function SchoolsPage({ lang, onSignup, h2, primary }) {
  const T = TXT[lang] || TXT.en
  const [f, setF] = useState({ school: '', name: '', email: '', city: '', students: '', message: '', website: '' })
  const [state, setState] = useState('') // '' | 'busy' | 'ok' | 'err'
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })

  const teacherSignup = () => {
    try { localStorage.setItem('kidroots_intent', 'teacher') } catch { /* stockage indisponible */ }
    onSignup()
  }
  const send = async (e) => {
    e.preventDefault()
    if (!isProEmail(f.email)) { setState('pro'); return }
    setState('busy')
    try {
      const r = await fetch('/api/school-request', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...f, lang }) })
      const d = await r.json().catch(() => ({}))
      setState(r.ok ? 'ok' : d.error === 'pro-email' ? 'pro' : 'err')
    } catch { setState('err') }
  }

  const input = { width: '100%', boxSizing: 'border-box', padding: '12px 14px', borderRadius: 14, border: '2px solid #E3EAF2', background: 'white', color: INK, fontSize: 16, fontFamily: 'inherit', fontWeight: 700, outline: 'none' }
  const card = { background: 'white', borderRadius: 30, padding: '26px 22px', boxShadow: '0 10px 28px rgba(26,42,79,0.08)', display: 'flex', flexDirection: 'column' }

  return (
    <section className="home-sky" style={{ padding: '56px 16px' }}>
      <div className="lp-wrap" style={{ maxWidth: 860 }}>
        <h2 className="reveal" style={h2}>{T.title}</h2>
        <p style={{ textAlign: 'center', fontSize: 17, fontWeight: 700, color: '#455A64', lineHeight: 1.55, maxWidth: 640, margin: '0 auto 18px' }}>{T.sub}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginBottom: 26 }}>
          {T.points.map((p) => <span key={p} style={{ background: 'white', borderRadius: 999, padding: '7px 13px', fontSize: 14, fontWeight: 900, color: '#2E7D4F' }}>{p}</span>)}
        </div>

        {/* Mokalibo en classe : une seance type + fiches pedagogiques a telecharger */}
        <div style={{ ...card, marginBottom: 26 }}>
          <div style={{ fontFamily: FONT_TITLE, fontSize: 24, fontWeight: 700, textAlign: 'center', marginBottom: 14 }}>🧑‍🏫 {T.c_title}</div>
          <div className="lp-grid3" style={{ gap: 12 }}>
            {T.c_steps.map(([e, h, d], i) => (
              <div key={h} style={{ background: '#F4F7FB', borderRadius: 20, padding: '16px 14px', textAlign: 'center' }}>
                <div style={{ fontSize: 34 }}>{e}</div>
                <div style={{ fontWeight: 900, color: '#00796B', margin: '4px 0' }}>{i + 1}. {h}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#455A64', lineHeight: 1.5 }}>{d}</div>
              </div>
            ))}
          </div>
          <div style={{ fontFamily: FONT_TITLE, fontSize: 21, fontWeight: 700, margin: '22px 0 4px' }}>{T.f_title}</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#607D8B', marginBottom: 10 }}>{T.f_sub}</div>
          <div style={{ display: 'grid', gap: 8 }}>
            {FICHES.map(([slug, flag, title, lvl]) => (
              <a key={slug} href={`/ecoles/fiche-${slug}.pdf`} target="_blank" rel="noopener" onClick={() => track('fiche_dl')}
                style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#FFF8E1', borderRadius: 16, padding: '11px 14px', textDecoration: 'none', color: INK }}>
                <span style={{ fontSize: 26 }}>{flag}</span>
                <span style={{ flex: 1, minWidth: 0, fontWeight: 900 }}>{title} <span style={{ color: '#90A4AE', fontWeight: 800, fontSize: 13 }}>· {lvl}</span></span>
                <span style={{ fontWeight: 900, color: '#E65100', fontSize: 14, whiteSpace: 'nowrap' }}>⬇ {T.f_dl}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="lp-grid2 reveal-stagger">
          <div style={{ ...card, border: '3px solid #FF9A1F' }}>
            <div style={{ fontSize: 18, fontWeight: 900, color: '#E65100' }}>🧑‍🏫 {T.t_name}</div>
            <div style={{ fontFamily: FONT_TITLE, fontSize: 44, fontWeight: 700, margin: '6px 0 0' }}>{PLANS.teacher_year.label} <span style={{ fontSize: 18 }}>{T.per_year}</span></div>
            <div style={{ fontSize: 14, fontWeight: 900, color: '#607D8B' }}>{T.or_month.replace('{p}', PLANS.teacher_month.label)}</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#37474F', margin: '12px 0 6px' }}>✓ {T.t_for}</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#00796B', marginBottom: 12, lineHeight: 1.45 }}>{T.t_pro}</div>
            <button className="btn-kid soft" onClick={teacherSignup} style={{ ...primary, marginTop: 'auto', fontSize: 18 }}>{T.t_cta}</button>
            <div style={{ fontSize: 12, fontWeight: 800, color: '#78909C', marginTop: 10, textAlign: 'center' }}>{T.t_note}</div>
          </div>
          <div style={{ ...card, background: 'linear-gradient(160deg,#26A69A,#00796B)', color: 'white' }}>
            <div style={{ fontSize: 18, fontWeight: 900 }}>🏫 {T.s_name}</div>
            <div style={{ fontSize: 14, fontWeight: 900, opacity: 0.9, marginTop: 6 }}>{T.s_from}</div>
            <div style={{ fontFamily: FONT_TITLE, fontSize: 44, fontWeight: 700 }}>{SCHOOL_FROM} <span style={{ fontSize: 18 }}>{T.per_year}</span></div>
            <div style={{ fontSize: 15, fontWeight: 800, margin: '12px 0 6px' }}>✓ {T.s_for}</div>
            {T.s_items.map((it) => <div key={it} style={{ fontSize: 15, fontWeight: 800, padding: '4px 0' }}>✓ {it}</div>)}
            <a href="#devis" onClick={(e) => { e.preventDefault(); document.getElementById('devis')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="btn-kid soft" style={{ marginTop: 16, background: 'white', color: '#00695C', padding: '16px', fontSize: 17, borderRadius: 22, textAlign: 'center', textDecoration: 'none' }}>{T.form_title} ↓</a>
          </div>
        </div>

        <form id="devis" onSubmit={send} style={{ ...card, marginTop: 26, gap: 10 }}>
          <div style={{ fontFamily: FONT_TITLE, fontSize: 24, fontWeight: 700, textAlign: 'center', marginBottom: 6 }}>🏫 {T.form_title}</div>
          {state === 'ok' ? (
            <div style={{ textAlign: 'center', fontSize: 17, fontWeight: 900, color: '#2E7D4F', padding: '18px 0' }}>{T.f_ok}</div>
          ) : (<>
            <input required maxLength={120} placeholder={T.f_school} value={f.school} onChange={set('school')} style={input} />
            <div className="lp-grid2" style={{ gap: 10 }}>
              <input required maxLength={80} placeholder={T.f_name} value={f.name} onChange={set('name')} style={input} autoComplete="name" />
              <input required type="email" maxLength={120} placeholder={T.f_email} value={f.email} onChange={set('email')} style={input} autoComplete="email" />
              <input maxLength={80} placeholder={T.f_city} value={f.city} onChange={set('city')} style={input} />
              <input type="number" min={1} max={5000} placeholder={T.f_students} value={f.students} onChange={set('students')} style={input} />
            </div>
            <textarea maxLength={1000} rows={3} placeholder={T.f_msg} value={f.message} onChange={set('message')} style={{ ...input, resize: 'vertical' }} />
            <input tabIndex={-1} autoComplete="off" aria-hidden value={f.website} onChange={set('website')} style={{ position: 'absolute', left: -9999, width: 1, height: 1, opacity: 0 }} />
            <button type="submit" className="btn-kid soft" disabled={state === 'busy'}
              style={{ background: 'linear-gradient(180deg,#26A69A,#00796B)', color: 'white', padding: '16px', fontSize: 18, borderRadius: 22, boxShadow: '0 6px 0 #00564D', opacity: state === 'busy' ? 0.6 : 1 }}>
              {state === 'busy' ? T.f_wait : T.f_send}
            </button>
            {state === 'pro' && <div style={{ textAlign: 'center', fontSize: 14, fontWeight: 800, color: '#C62828' }}>{T.f_pro}</div>}
            {state === 'err' && <div style={{ textAlign: 'center', fontSize: 14, fontWeight: 800, color: '#C62828' }}>{T.f_err}</div>}
            <div style={{ fontSize: 12, fontWeight: 700, color: '#78909C', textAlign: 'center' }}>
              {T.f_privacy} <a href="/datenschutz" target="_blank" rel="noopener" style={{ color: 'inherit' }}>{T.privacy}</a>
            </div>
          </>)}
        </form>
      </div>
    </section>
  )
}

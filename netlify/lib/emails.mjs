// Modeles des e-mails automatiques (texte simple, fr / de / en).
// trialEnd = e-mail de service (toujours envoye). welcome, day3, weekly = seulement avec accord (emailOptIn).
import { createHmac } from 'node:crypto'

const SITE = 'https://mokalibo.com'
const secret = () => process.env.UNSUB_SECRET || process.env.STRIPE_WEBHOOK_SECRET || 'mokalibo'
export const unsubToken = (uid) => createHmac('sha256', secret()).update(uid).digest('hex').slice(0, 24)
export const unsubLink = (uid) => `${SITE}/api/unsubscribe?u=${encodeURIComponent(uid)}&t=${unsubToken(uid)}`

const fmtDate = (d, lang) => new Date(d).toLocaleDateString(lang === 'de' ? 'de-DE' : lang === 'en' ? 'en-GB' : 'fr-FR', { day: 'numeric', month: 'long' })
const names = (kids) => kids.map((k) => (k.name || '').split(' ')[0]).filter(Boolean)
const join = (arr, lang) => arr.length <= 1 ? (arr[0] || '') : `${arr.slice(0, -1).join(', ')} ${lang === 'de' ? 'und' : lang === 'en' ? 'and' : 'et'} ${arr.at(-1)}`
const countryName = (code, lang) => { try { return new Intl.DisplayNames([lang], { type: 'region' }).of(code) } catch { return code } }

const FOOT = {
  fr: (u) => `\n\n—\nMokalibo · L'histoire du monde, racontée aux enfants\n💛 5 % de chaque abonnement vont à la protection de l'enfance\nNe plus recevoir ces e-mails : ${u}`,
  de: (u) => `\n\n—\nMokalibo · Die Geschichte der Welt, für Kinder erzählt\n💛 5 % jedes Abos gehen an den Kinderschutz\nKeine E-Mails mehr erhalten: ${u}`,
  en: (u) => `\n\n—\nMokalibo · The history of the world, told to children\n💛 5% of every subscription goes to child protection\nUnsubscribe: ${u}`,
}
const SERVICE_FOOT = {
  fr: '\n\n—\nMokalibo · contact@azarconsulting.eu',
  de: '\n\n—\nMokalibo · contact@azarconsulting.eu',
  en: '\n\n—\nMokalibo · contact@azarconsulting.eu',
}

export function trialEndMail({ lang, until, price }) {
  const d = fmtDate(until, lang)
  const T = {
    fr: { s: `Ton essai gratuit Mokalibo se termine le ${d}`, b: `Bonjour,\n\nTon essai gratuit de la Formule Famille se termine le ${d}.\n\n➡️ Si tu ne fais rien, l'abonnement continue automatiquement : ${price}. Tes enfants gardent toutes les histoires et les jeux en illimité.\n➡️ Si tu préfères arrêter, tu peux résilier en 2 clics avant cette date, sans rien payer : dans l'app, 👤 Mon compte → Mon abonnement → Résilier (ou ${SITE}/kuendigen).\n\nMerci d'avoir essayé Mokalibo !` },
    de: { s: `Dein kostenloser Mokalibo-Test endet am ${d}`, b: `Hallo,\n\ndein kostenloser Test des Familien-Abos endet am ${d}.\n\n➡️ Wenn du nichts tust, läuft das Abo automatisch weiter: ${price}. Deine Kinder behalten alle Geschichten und Spiele unbegrenzt.\n➡️ Wenn du lieber aufhören möchtest, kannst du vorher mit 2 Klicks kostenlos kündigen: in der App unter 👤 Mein Konto → Mein Abo → Kündigen (oder ${SITE}/kuendigen).\n\nDanke, dass du Mokalibo ausprobiert hast!` },
    en: { s: `Your free Mokalibo trial ends on ${d}`, b: `Hello,\n\nyour free trial of the Family Plan ends on ${d}.\n\n➡️ If you do nothing, the subscription continues automatically: ${price}. Your children keep unlimited stories and games.\n➡️ If you'd rather stop, cancel in 2 clicks before that date and pay nothing: in the app, 👤 My account → My subscription → Cancel (or ${SITE}/kuendigen).\n\nThank you for trying Mokalibo!` },
  }[lang] || null
  const t = T || trialEndMail({ lang: 'fr', until, price })
  return T ? { subject: t.s, text: t.b + SERVICE_FOOT[lang] } : t
}

export function welcomeMail({ lang, uid }) {
  const T = {
    fr: { s: 'Bienvenue sur Mokalibo 🌍 3 idées pour bien commencer', b: `Bonjour et bienvenue !\n\nVoici 3 idées pour que vos enfants profitent au mieux de Mokalibo :\n\n1. 🗺️ Choisissez un pays ensemble : celui de la famille, des vacances ou d'un copain de classe. Les enfants adorent retrouver « leur » pays.\n2. 🔊 Pour les plus petits, touchez le haut-parleur : chaque carte est lue à voix haute (ou activez « Lecture auto »).\n3. 🛂 Après chaque pays terminé, un tampon arrive dans le passeport : de quoi motiver les explorateurs !\n\n🎁 Envie d'aller plus loin ? La Formule Famille débloque tout (histoires et jeux illimités, 5 enfants), avec 3 jours d'essai gratuit : ${SITE}\n\nBonne exploration !\nWalid, papa et créateur de Mokalibo` },
    de: { s: 'Willkommen bei Mokalibo 🌍 3 Ideen für den Start', b: `Hallo und herzlich willkommen!\n\n3 Ideen, damit deine Kinder das Beste aus Mokalibo machen:\n\n1. 🗺️ Wählt gemeinsam ein Land: das der Familie, des Urlaubs oder eines Schulfreunds. Kinder lieben „ihr“ Land.\n2. 🔊 Für die Kleinen: auf den Lautsprecher tippen, jede Karte wird vorgelesen (oder „Automatisch vorlesen“ einschalten).\n3. 🛂 Für jedes fertige Land gibt es einen Stempel im Reisepass – das motiviert!\n\n🎁 Mehr entdecken? Das Familien-Abo schaltet alles frei (unbegrenzte Geschichten und Spiele, 5 Kinder), mit 3 Tagen gratis: ${SITE}\n\nViel Spaß beim Entdecken!\nWalid, Papa und Gründer von Mokalibo` },
    en: { s: 'Welcome to Mokalibo 🌍 3 ideas to get started', b: `Hello and welcome!\n\n3 ideas to help your children get the most out of Mokalibo:\n\n1. 🗺️ Pick a country together: your family's, your holiday destination or a classmate's. Kids love finding "their" country.\n2. 🔊 For little ones, tap the speaker: every card is read aloud (or switch on "Auto-read").\n3. 🛂 Each finished country earns a stamp in the passport – great motivation!\n\n🎁 Want more? The Family Plan unlocks everything (unlimited stories and games, 5 children), with a 3-day free trial: ${SITE}\n\nHappy exploring!\nWalid, dad and creator of Mokalibo` },
  }
  const t = T[lang] || T.fr
  return { subject: t.s, text: t.b + (FOOT[lang] || FOOT.fr)(unsubLink(uid)) }
}

export function day3Mail({ lang, uid, kids }) {
  const who = join(names(kids), lang)
  const T = {
    fr: { s: who ? `${who} a commencé son tour du monde 🌍` : 'Votre tour du monde a commencé 🌍', b: `Bonjour,\n\n${who ? `${who} a déjà commencé à explorer Mokalibo. ` : ''}Bravo !\n\nAvec la version gratuite, chaque enfant découvre 2 nouvelles histoires et 3 jeux par jour. Avec la Formule Famille, c'est illimité : les 195 pays, les 3 niveaux de lecture, et jusqu'à 5 enfants.\n\n🎁 Essayez-la 3 jours gratuitement (résiliable en 2 clics) : ${SITE}\nDès 1,25 € par mois avec la formule annuelle.` },
    de: { s: who ? `${who} hat die Weltreise begonnen 🌍` : 'Eure Weltreise hat begonnen 🌍', b: `Hallo,\n\n${who ? `${who} hat schon angefangen, Mokalibo zu entdecken. ` : ''}Super!\n\nIn der Gratis-Version entdeckt jedes Kind täglich 2 neue Geschichten und 3 Spiele. Mit dem Familien-Abo ist alles unbegrenzt: 195 Länder, 3 Lesestufen, bis zu 5 Kinder.\n\n🎁 3 Tage kostenlos testen (mit 2 Klicks kündbar): ${SITE}\nAb 1,25 € pro Monat im Jahresabo.` },
    en: { s: who ? `${who} has started a trip around the world 🌍` : 'Your trip around the world has begun 🌍', b: `Hello,\n\n${who ? `${who} has already started exploring Mokalibo. ` : ''}Well done!\n\nWith the free version, each child discovers 2 new stories and 3 games a day. The Family Plan makes it unlimited: all 195 countries, 3 reading levels, up to 5 children.\n\n🎁 Try it free for 3 days (cancel in 2 clicks): ${SITE}\nFrom €1.25 a month with the yearly plan.` },
  }
  const t = T[lang] || T.fr
  return { subject: t.s, text: t.b + (FOOT[lang] || FOOT.fr)(unsubLink(uid)) }
}

// Bilan de la semaine pour les parents. rows = [{ name, minutes, chapters, xp, countries: [codes] }]
const SUGGEST = ['JP', 'MA', 'BR', 'EG', 'IS', 'MN', 'PE', 'KE', 'NO', 'IN', 'MX', 'AU', 'SN', 'CA', 'GR', 'VN']
export function weeklyMail({ lang, uid, rows, premium }) {
  const tip = SUGGEST[Math.floor(Date.now() / 604800000) % SUGGEST.length]
  const L = {
    fr: { s: '📊 La semaine de vos explorateurs sur Mokalibo', h: 'Voici la semaine de vos explorateurs :', min: 'min', ch: 'chapitre(s) terminé(s)', xp: 'XP', visited: 'Pays visités', none: 'pas encore joué cette semaine', idea: `💡 Idée pour ce week-end : partir ensemble à la découverte de ce pays : ${countryName(tip, 'fr')} !`, free: `🎁 Pour des histoires et des jeux illimités : la Formule Famille, 3 jours gratuits → ${SITE}`, bye: 'Bonne semaine !' },
    de: { s: '📊 Die Woche eurer Entdecker bei Mokalibo', h: 'So war die Woche eurer Entdecker:', min: 'Min.', ch: 'Kapitel abgeschlossen', xp: 'XP', visited: 'Besuchte Länder', none: 'diese Woche noch nicht gespielt', idea: `💡 Idee fürs Wochenende: gemeinsam dieses Land entdecken: ${countryName(tip, 'de')}!`, free: `🎁 Unbegrenzte Geschichten und Spiele: das Familien-Abo, 3 Tage gratis → ${SITE}`, bye: 'Eine schöne Woche!' },
    en: { s: '📊 Your explorers’ week on Mokalibo', h: 'Here is your explorers’ week:', min: 'min', ch: 'chapter(s) finished', xp: 'XP', visited: 'Countries visited', none: 'not played yet this week', idea: `💡 Idea for the weekend: discover this country together: ${countryName(tip, 'en')}!`, free: `🎁 For unlimited stories and games: the Family Plan, 3 days free → ${SITE}`, bye: 'Have a great week!' },
  }
  const T = L[lang] || L.fr
  const lines = rows.map((r) => {
    if (!r.minutes && !r.chapters) return `• ${r.name} : ${T.none}`
    const c = r.countries.length ? `\n   ${T.visited} : ${r.countries.slice(0, 6).map((k) => countryName(k, lang)).join(', ')}` : ''
    return `• ${r.name} : ⏱️ ${r.minutes} ${T.min} · 📚 ${r.chapters} ${T.ch} · ⭐ +${r.xp} ${T.xp}${c}`
  })
  const text = `${T.h}\n\n${lines.join('\n')}\n\n${T.idea}\n${premium ? '' : `\n${T.free}\n`}\n${T.bye}`
  return { subject: T.s, text: text + (FOOT[lang] || FOOT.fr)(unsubLink(uid)) }
}

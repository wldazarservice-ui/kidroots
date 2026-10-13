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


// ── Mise en page HTML (aux couleurs de Mokalibo) ──
// Le texte simple reste envoye a cote (clients mail sans HTML). Paragraphes = lignes vides, liens rendus cliquables.
const esc = (x) => String(x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
// Lien cliquable, sans avaler la ponctuation finale (« …/kuendigen. » → lien vers …/kuendigen)
const linkify = (x) => x.replace(/(https?:\/\/[^\s<]*[^\s<.,;:!?)])/g, '<a href="$1" style="color:#1E88E5;font-weight:700">$1</a>')
export function renderHtml({ heading, text, cta, emoji = '🌍' }) {
  const [body, foot = ''] = text.split('\n\n—\n')
  let placed = false
  const btn = cta ? `<table role="presentation" cellspacing="0" cellpadding="0" style="margin:8px auto 22px"><tr><td style="border-radius:16px;background:#FFC400;box-shadow:0 4px 0 #E6A100"><a href="${cta.url}" style="display:inline-block;padding:15px 30px;font-size:17px;font-weight:800;color:#1A2A4F;text-decoration:none;font-family:Arial,Helvetica,sans-serif">${esc(cta.label)}</a></td></tr></table>` : ''
  const paras = body.trim().split(/\n\n+/).map((p) => {
    const lines = p.split('\n')
    if (cta && lines.includes(cta.url)) { placed = true; const rest = lines.filter((l) => l !== cta.url).join('\n'); return `<p style="margin:0 0 12px;font-size:16px;line-height:1.6;color:#37474F">${linkify(esc(rest)).replace(/\n/g, '<br>')}</p>${btn}` }
    return `<p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#37474F">${linkify(esc(p)).replace(/\n/g, '<br>')}</p>`
  }).join('')
  const footHtml = foot.trim().split('\n').map((l) => linkify(esc(l))).join('<br>')
  return `<!doctype html><html><body style="margin:0;padding:0;background:#FFF6E8">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#FFF6E8;padding:24px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border-radius:24px;overflow:hidden;font-family:Arial,Helvetica,sans-serif">
<tr><td style="background:linear-gradient(135deg,#FFB300,#FF6F00);background-color:#FF8F00;padding:26px 28px;text-align:center">
<div style="font-size:44px;line-height:1">${emoji}</div>
<div style="font-size:30px;font-weight:900;margin-top:6px"><span style="color:#ffffff">Moka</span><span style="color:#1A2A4F">libo</span></div>
</td></tr>
<tr><td style="padding:28px 28px 8px">
${heading ? `<h1 style="margin:0 0 18px;font-size:23px;line-height:1.3;color:#1A2A4F">${esc(heading)}</h1>` : ''}
${paras}${placed ? '' : btn}
</td></tr>
<tr><td style="padding:16px 28px 24px;background:#FAFBFD;font-size:12px;line-height:1.6;color:#90A4AE;text-align:center">${footHtml}</td></tr>
</table></td></tr></table></body></html>`
}
const withHtml = (mail, opts) => ({ ...mail, html: renderHtml({ ...opts, text: mail.text }) })

const FOOT = {
  fr: (u) => `\n\n—\nMokalibo · L'histoire du monde, racontée aux enfants\n💛 5 % de chaque abonnement vont à la protection de l'enfance\nNe plus recevoir ces e-mails : ${u}`,
  de: (u) => `\n\n—\nMokalibo · Die Geschichte der Welt, für Kinder erzählt\n💛 5 % jedes Abos gehen an den Kinderschutz\nKeine E-Mails mehr erhalten: ${u}`,
  en: (u) => `\n\n—\nMokalibo · The history of the world, told to children\n💛 5% of every subscription goes to child protection\nUnsubscribe: ${u}`,
}
const SERVICE_FOOT = {
  fr: '\n\n—\nMokalibo · bonjour@mokalibo.com',
  de: '\n\n—\nMokalibo · bonjour@mokalibo.com',
  en: '\n\n—\nMokalibo · bonjour@mokalibo.com',
}

export function trialEndMail({ lang, until, price }) {
  const d = fmtDate(until, lang)
  const T = {
    fr: { s: `Ton essai gratuit Mokalibo se termine le ${d}`, b: `Bonjour,\n\nTon essai gratuit de la Formule Famille se termine le ${d}.\n\n➡️ Si tu ne fais rien, l'abonnement continue automatiquement : ${price}. Tes enfants gardent toutes les histoires et les jeux en illimité.\n➡️ Si tu préfères arrêter, tu peux résilier en 2 clics avant cette date, sans rien payer : dans l'app, 👤 Mon compte → Mon abonnement → Résilier (ou ${SITE}/kuendigen).\n\nMerci d'avoir essayé Mokalibo !` },
    de: { s: `Dein kostenloser Mokalibo-Test endet am ${d}`, b: `Hallo,\n\ndein kostenloser Test des Familien-Abos endet am ${d}.\n\n➡️ Wenn du nichts tust, läuft das Abo automatisch weiter: ${price}. Deine Kinder behalten alle Geschichten und Spiele unbegrenzt.\n➡️ Wenn du lieber aufhören möchtest, kannst du vorher mit 2 Klicks kostenlos kündigen: in der App unter 👤 Mein Konto → Mein Abo → Kündigen (oder ${SITE}/kuendigen).\n\nDanke, dass du Mokalibo ausprobiert hast!` },
    en: { s: `Your free Mokalibo trial ends on ${d}`, b: `Hello,\n\nyour free trial of the Family Plan ends on ${d}.\n\n➡️ If you do nothing, the subscription continues automatically: ${price}. Your children keep unlimited stories and games.\n➡️ If you'd rather stop, cancel in 2 clicks before that date and pay nothing: in the app, 👤 My account → My subscription → Cancel (or ${SITE}/kuendigen).\n\nThank you for trying Mokalibo!` },
  }[lang] || null
  const t = T || trialEndMail({ lang: 'fr', until, price })
  return T ? withHtml({ subject: t.s, text: t.b + SERVICE_FOOT[lang] }, { heading: t.s, emoji: '⏰', cta: { label: { fr: 'Ouvrir Mokalibo', de: 'Mokalibo öffnen', en: 'Open Mokalibo' }[lang], url: SITE } }) : t
}

export function welcomeMail({ lang, uid }) {
  const T = {
    fr: { s: 'Bienvenue sur Mokalibo 🌍 3 idées pour bien commencer', b: `Bonjour et bienvenue !\n\nVoici 3 idées pour que vos enfants profitent au mieux de Mokalibo :\n\n1. 🗺️ Choisissez un pays ensemble : celui de la famille, des vacances ou d'un copain de classe. Les enfants adorent retrouver « leur » pays.\n2. 🔊 Pour les plus petits, touchez le haut-parleur : chaque carte est lue à voix haute (ou activez « Lecture auto »).\n3. 🛂 Après chaque pays terminé, un tampon arrive dans le passeport : de quoi motiver les explorateurs !\n\n🎁 Envie d'aller plus loin ? La Formule Famille débloque tout (histoires et jeux illimités, 5 enfants), avec 3 jours d'essai gratuit : ${SITE}\n\nBonne exploration !\nWalid, papa et créateur de Mokalibo` },
    de: { s: 'Willkommen bei Mokalibo 🌍 3 Ideen für den Start', b: `Hallo und herzlich willkommen!\n\n3 Ideen, damit deine Kinder das Beste aus Mokalibo machen:\n\n1. 🗺️ Wählt gemeinsam ein Land: das der Familie, des Urlaubs oder eines Schulfreunds. Kinder lieben „ihr“ Land.\n2. 🔊 Für die Kleinen: auf den Lautsprecher tippen, jede Karte wird vorgelesen (oder „Automatisch vorlesen“ einschalten).\n3. 🛂 Für jedes fertige Land gibt es einen Stempel im Reisepass – das motiviert!\n\n🎁 Mehr entdecken? Das Familien-Abo schaltet alles frei (unbegrenzte Geschichten und Spiele, 5 Kinder), mit 3 Tagen gratis: ${SITE}\n\nViel Spaß beim Entdecken!\nWalid, Papa und Gründer von Mokalibo` },
    en: { s: 'Welcome to Mokalibo 🌍 3 ideas to get started', b: `Hello and welcome!\n\n3 ideas to help your children get the most out of Mokalibo:\n\n1. 🗺️ Pick a country together: your family's, your holiday destination or a classmate's. Kids love finding "their" country.\n2. 🔊 For little ones, tap the speaker: every card is read aloud (or switch on "Auto-read").\n3. 🛂 Each finished country earns a stamp in the passport – great motivation!\n\n🎁 Want more? The Family Plan unlocks everything (unlimited stories and games, 5 children), with a 3-day free trial: ${SITE}\n\nHappy exploring!\nWalid, dad and creator of Mokalibo` },
  }
  const t = T[lang] || T.fr
  return withHtml({ subject: t.s, text: t.b + (FOOT[lang] || FOOT.fr)(unsubLink(uid)) }, { heading: t.s, emoji: '👋', cta: { label: { fr: 'Commencer l’aventure 🚀', de: 'Abenteuer starten 🚀', en: 'Start the adventure 🚀' }[lang] || 'Commencer l’aventure 🚀', url: SITE } })
}

export function day3Mail({ lang, uid, kids }) {
  const who = join(names(kids), lang)
  const T = {
    fr: { s: who ? `${who} a commencé son tour du monde 🌍` : 'Votre tour du monde a commencé 🌍', b: `Bonjour,\n\n${who ? `${who} a déjà commencé à explorer Mokalibo. ` : ''}Bravo !\n\nAvec la version gratuite, chaque enfant peut lire 30 chapitres (3 par jour) et joue aux jeux sans limite. Avec la Formule Famille, c'est illimité : les 195 pays, les 3 niveaux de lecture, et jusqu'à 5 enfants.\n\n🎁 Essayez-la 3 jours gratuitement (résiliable en 2 clics) : ${SITE}\nDès 1,25 € par mois avec la formule annuelle.` },
    de: { s: who ? `${who} hat die Weltreise begonnen 🌍` : 'Eure Weltreise hat begonnen 🌍', b: `Hallo,\n\n${who ? `${who} hat schon angefangen, Mokalibo zu entdecken. ` : ''}Super!\n\nIn der Gratis-Version kann jedes Kind 30 Kapitel lesen (3 pro Tag) und spielt die Spiele unbegrenzt. Mit dem Familien-Abo ist alles unbegrenzt: 195 Länder, 3 Lesestufen, bis zu 5 Kinder.\n\n🎁 3 Tage kostenlos testen (mit 2 Klicks kündbar): ${SITE}\nAb 1,25 € pro Monat im Jahresabo.` },
    en: { s: who ? `${who} has started a trip around the world 🌍` : 'Your trip around the world has begun 🌍', b: `Hello,\n\n${who ? `${who} has already started exploring Mokalibo. ` : ''}Well done!\n\nWith the free version, each child can read 30 chapters (3 a day) and plays the games without limit. The Family Plan makes it unlimited: all 195 countries, 3 reading levels, up to 5 children.\n\n🎁 Try it free for 3 days (cancel in 2 clicks): ${SITE}\nFrom €1.25 a month with the yearly plan.` },
  }
  const t = T[lang] || T.fr
  return withHtml({ subject: t.s, text: t.b + (FOOT[lang] || FOOT.fr)(unsubLink(uid)) }, { heading: t.s, emoji: '🗺️', cta: { label: { fr: '🎁 Essayer 3 jours gratuits', de: '🎁 3 Tage gratis testen', en: '🎁 Try 3 days free' }[lang] || '🎁 Essayer 3 jours gratuits', url: SITE } })
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
  return withHtml({ subject: T.s, text: text + (FOOT[lang] || FOOT.fr)(unsubLink(uid)) }, { heading: T.s, emoji: '📊', cta: { label: { fr: 'Continuer le voyage 🌍', de: 'Weiterreisen 🌍', en: 'Keep exploring 🌍' }[lang] || 'Continuer le voyage 🌍', url: SITE } })
}

// Resiliation (abonnement ou essai) : au revoir chaleureux, ce que les enfants ont accompli,
// reprise en 1 clic, version gratuite rappelee, et une question pour s'ameliorer. E-mail de service (sans accord requis).
// stats = [{ name, chapters, countries }]
export function cancelMail({ lang, until, trial, stats = [] }) {
  const d = until ? fmtDate(until, lang) : ''
  const who = join(stats.map((s) => s.name).filter(Boolean), lang)
  const many = stats.filter((s) => s.name).length > 1
  const ch = stats.reduce((a, s) => a + (s.chapters || 0), 0)
  const co = stats.reduce((a, s) => a + (s.countries || 0), 0)
  const L = {
    fr: {
      s: who ? `Snif… ${who} ${many ? 'vont' : 'va'} nous manquer 🥲` : 'Snif… vous allez nous manquer 🥲',
      intro: `C'est bien noté : ${trial ? 'ton essai est résilié, tu ne seras pas débité' : 'ton abonnement est résilié, aucun nouveau prélèvement'}.${d ? ` L'accès illimité reste ouvert jusqu'au ${d}.` : ''}`,
      done: who && (ch || co) ? `En chemin, ${who} ${many ? 'ont' : 'a'} déjà terminé ${ch} chapitre${ch > 1 ? 's' : ''} et visité ${co} pays 🌍 Notre petit renard 🦊 range sa valise… un peu tristement.` : 'Notre petit renard 🦊 range sa valise… un peu tristement.',
      back: 'Tu as changé d’avis ? Un seul clic suffit pour garder le voyage, sans rien perdre :',
      free: 'Et sinon, pas de souci : la version gratuite reste là : les chapitres déjà lus restent ouverts et les jeux sont illimités, pour continuer le tour du monde à petits pas.',
      ask: 'Une petite faveur : réponds à cet e-mail avec un mot pour nous dire pourquoi (trop cher ? pas le temps ? pas adapté ?). On lit tout, et ça nous aide vraiment à faire mieux.',
      bye: 'À bientôt pour de nouvelles aventures ! ✈️\nWalid, papa et créateur de Mokalibo',
      cta: '💛 Je garde Mokalibo',
    },
    de: {
      s: who ? `Schnief… ${who} ${many ? 'werden' : 'wird'} uns fehlen 🥲` : 'Schnief… ihr werdet uns fehlen 🥲',
      intro: `Alles klar: ${trial ? 'dein Test ist gekündigt, es wird nichts abgebucht' : 'dein Abo ist gekündigt, es wird nichts mehr abgebucht'}.${d ? ` Der unbegrenzte Zugang bleibt bis zum ${d} offen.` : ''}`,
      done: who && (ch || co) ? `Unterwegs ${many ? 'haben' : 'hat'} ${who} schon ${ch} Kapitel abgeschlossen und ${co} Länder besucht 🌍 Unser kleiner Fuchs 🦊 packt seinen Koffer… ein bisschen traurig.` : 'Unser kleiner Fuchs 🦊 packt seinen Koffer… ein bisschen traurig.',
      back: 'Doch umentschieden? Ein Klick genügt, um die Reise weiterzumachen, ohne etwas zu verlieren:',
      free: 'Und sonst kein Problem: Die Gratis-Version bleibt: Bereits gelesene Kapitel bleiben offen und die Spiele sind unbegrenzt, für die Weltreise in kleinen Schritten.',
      ask: 'Eine kleine Bitte: Antworte auf diese E-Mail mit einem Wort, warum (zu teuer? keine Zeit? nicht passend?). Wir lesen alles, und es hilft uns sehr.',
      bye: 'Bis bald zu neuen Abenteuern! ✈️\nWalid, Papa und Gründer von Mokalibo',
      cta: '💛 Ich bleibe bei Mokalibo',
    },
    en: {
      s: who ? `Sniff… we'll miss ${who} 🥲` : "Sniff… we'll miss you 🥲",
      intro: `All done: ${trial ? 'your trial is cancelled, you won’t be charged' : 'your subscription is cancelled, no further payments'}.${d ? ` Unlimited access stays open until ${d}.` : ''}`,
      done: who && (ch || co) ? `Along the way, ${who} finished ${ch} chapter${ch > 1 ? 's' : ''} and visited ${co} countries 🌍 Our little fox 🦊 is packing its suitcase… a bit sadly.` : 'Our little fox 🦊 is packing its suitcase… a bit sadly.',
      back: 'Changed your mind? One click keeps the journey going, nothing lost:',
      free: 'And if not, no worries: the free version stays: chapters already read stay open and games are unlimited, to keep exploring step by step.',
      ask: 'A small favour: reply to this e-mail with one word on why (too expensive? no time? not a fit?). We read everything, and it really helps.',
      bye: 'See you soon for new adventures! ✈️\nWalid, dad and creator of Mokalibo',
      cta: '💛 Keep Mokalibo',
    },
  }
  const T = L[lang] || L.fr
  const url = `${SITE}/?reprendre=1`
  const text = `Bonjour,\n\n${T.intro}\n\n${T.done}\n\n${T.back}\n${url}\n\n${T.free}\n\n${T.ask}\n\n${T.bye}${SERVICE_FOOT[lang] || SERVICE_FOOT.fr}`
    .replace(/^Bonjour,/, lang === 'de' ? 'Hallo,' : lang === 'en' ? 'Hello,' : 'Bonjour,')
  return withHtml({ subject: T.s, text }, { heading: T.s, emoji: '🦊', cta: { label: T.cta, url } })
}

// Abonnement confirme (1er paiement, ou fin de l'essai) : confirmation du contrat sur support durable (§ 312f BGB)
// avec la formule, le prix, la prochaine echeance, la resiliation et les CGV. E-mail de service (sans accord requis).
export function confirmMail({ lang, plan, price, next }) {
  const d = next ? new Date(next).toLocaleDateString(lang === 'de' ? 'de-DE' : lang === 'en' ? 'en-GB' : 'fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : ''
  const year = plan === 'year'
  const L = {
    fr: {
      s: 'Merci ! Votre abonnement Mokalibo est confirmé 🎉',
      intro: 'Merci de faire confiance à Mokalibo ! Votre paiement est bien arrivé et votre Formule Famille est active.',
      details: `Ce que vous avez choisi :\n• Formule Famille, ${year ? 'abonnement annuel' : 'abonnement mensuel'} : ${price} ${year ? 'par an' : 'par mois'}\n• Histoires illimitées dans les 195 pays, jusqu'à 5 enfants et 5 appareils, sans publicité${d ? `\n• Prochain renouvellement automatique : ${d}` : ''}`,
      cancel: `Vous pouvez résilier à tout moment, en 2 clics, dans l'app (Espace parents → Mon abonnement) ou sans vous connecter sur ${SITE}/kuendigen. L'accès reste ouvert jusqu'à la fin de la période payée.`,
      legal: `Conditions générales : ${SITE}/agb.html · Mentions légales : ${SITE}/impressum.html. Votre facture se télécharge dans l'app : Espace parents → Mon abonnement → « Factures et détails ».`,
      help: 'Une question ? Répondez simplement à cet e-mail.',
      bye: "Bon voyage dans l'histoire du monde ! 🌍\nL'équipe Mokalibo",
      cta: '🌍 Ouvrir Mokalibo',
    },
    de: {
      s: 'Danke! Dein Mokalibo-Abo ist bestätigt 🎉',
      intro: 'Danke für dein Vertrauen in Mokalibo! Deine Zahlung ist angekommen und dein Familien-Abo ist aktiv.',
      details: `Deine Auswahl:\n• Familien-Abo, ${year ? 'Jahresabo' : 'Monatsabo'}: ${price} ${year ? 'pro Jahr' : 'pro Monat'}\n• Unbegrenzte Geschichten in allen 195 Ländern, bis zu 5 Kinder und 5 Geräte, ohne Werbung${d ? `\n• Nächste automatische Verlängerung: ${d}` : ''}`,
      cancel: `Du kannst jederzeit mit 2 Klicks kündigen, in der App (Elternbereich → Mein Abo) oder ohne Anmeldung unter ${SITE}/kuendigen. Der Zugang bleibt bis zum Ende des bezahlten Zeitraums offen.`,
      legal: `AGB: ${SITE}/agb.html · Impressum: ${SITE}/impressum.html. Deine Rechnung lädst du in der App herunter: Elternbereich → Mein Abo → « Rechnungen und Details ».`,
      help: 'Eine Frage? Antworte einfach auf diese E-Mail.',
      bye: 'Gute Reise durch die Weltgeschichte! 🌍\nDas Mokalibo-Team',
      cta: '🌍 Mokalibo öffnen',
    },
    en: {
      s: 'Thank you! Your Mokalibo subscription is confirmed 🎉',
      intro: 'Thank you for trusting Mokalibo! Your payment has arrived and your Family plan is active.',
      details: `What you chose:\n• Family plan, ${year ? 'yearly' : 'monthly'} subscription: ${price} ${year ? 'per year' : 'per month'}\n• Unlimited stories in all 195 countries, up to 5 children and 5 devices, no ads${d ? `\n• Next automatic renewal: ${d}` : ''}`,
      cancel: `You can cancel anytime in 2 clicks, in the app (Parent area → My subscription) or without signing in at ${SITE}/kuendigen. Access stays open until the end of the paid period.`,
      legal: `Terms: ${SITE}/agb.html · Legal notice: ${SITE}/impressum.html. You can download your invoice in the app: Parent area → My subscription → « Invoices and details ».`,
      help: 'A question? Just reply to this e-mail.',
      bye: 'Enjoy your journey through world history! 🌍\nThe Mokalibo team',
      cta: '🌍 Open Mokalibo',
    },
  }
  const T = L[lang] || L.fr
  const hello = lang === 'de' ? 'Hallo,' : lang === 'en' ? 'Hello,' : 'Bonjour,'
  const text = `${hello}\n\n${T.intro}\n\n${T.details}\n\n${T.cancel}\n\n${T.legal}\n\n${T.help}\n\n${T.bye}${SERVICE_FOOT[lang] || SERVICE_FOOT.fr}`
  return withHtml({ subject: T.s, text }, { heading: T.s, emoji: '🎉', cta: { label: T.cta, url: SITE } })
}

// Carte cadeau achetee : le code et comment l'activer
export function giftMail({ code, to }) {
  const url = `${SITE}/?cadeau=${code}`
  const text = `Merci pour votre achat ! 🎁\n\nVotre code cadeau : ${code}${to ? `\nPour : ${to}` : ''}\n\nPour l'activer (1 an de Formule Famille, jusqu'à 5 enfants) :\n1. Ouvrir ${url}\n2. Créer un compte parent gratuit (ou se connecter)\n3. L'accès illimité s'active automatiquement.\n\nLe code est valable 3 ans. Vous pouvez imprimer ou envoyer la jolie carte depuis la page de confirmation.\n\n—\nMokalibo · L'histoire du monde, racontée aux enfants\n💛 5 % de chaque achat vont à la protection de l'enfance`
  return withHtml({ subject: '🎁 Votre carte cadeau Mokalibo', text }, { heading: 'Votre carte cadeau est prête 🎉', emoji: '🎁', cta: { label: 'Activer le cadeau 🎁', url } })
}

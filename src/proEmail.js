// Formule Enseignant et Licence Ecole : adresse e-mail professionnelle obligatoire (ecole, academie, Schule…).
// Les messageries grand public (Gmail, Hotmail, GMX, Orange…) sont refusees. Partage par l'app et le serveur.
const FREE = new Set([
  'gmail.com', 'googlemail.com', 'icloud.com', 'me.com', 'mac.com', 'aol.com', 'aim.com', 'msn.com', 'msn.fr',
  'ymail.com', 'rocketmail.com', 'mail.com', 'email.com', 'inbox.com', 'zoho.com', 'hey.com', 'fastmail.com',
  'protonmail.com', 'protonmail.ch', 'proton.me', 'pm.me', 'tutanota.com', 'tutanota.de', 'tuta.io', 'tuta.com',
  'web.de', 't-online.de', 'freenet.de', 'arcor.de', 'posteo.de', 'posteo.net', 'mailbox.org', 'online.de', 'email.de', 'vodafone.de', '1und1.de', 'kabelmail.de',
  'orange.fr', 'wanadoo.fr', 'free.fr', 'sfr.fr', 'neuf.fr', 'laposte.net', 'bbox.fr', 'numericable.fr', 'club-internet.fr', 'aliceadsl.fr', 'cegetel.net', 'noos.fr',
  'skynet.be', 'telenet.be', 'bluewin.ch', 'sunrise.ch', 'libero.it', 'virgilio.it', 'tin.it', 'alice.it',
  'mail.ru', 'bk.ru', 'inbox.ru', 'list.ru', 'rambler.ru', 'qq.com', '163.com', '126.com', 'sina.com', 'naver.com',
  'seznam.cz', 'wp.pl', 'o2.pl', 'interia.pl', 'onet.pl', 'abv.bg', 'yahoo.com',
])
// Familles de domaines grand public declinees par pays : yahoo.fr, hotmail.de, outlook.com, gmx.net…
const FREE_FAMILIES = /^(yahoo|hotmail|outlook|live|windowslive|gmx|yandex|ya|terra|uol|bol|rediffmail)\.[a-z.]{2,}$/

export const emailDomain = (email) => String(email || '').trim().toLowerCase().split('@')[1] || ''

export function isProEmail(email) {
  const d = emailDomain(email)
  if (!d || !d.includes('.')) return false
  return !FREE.has(d) && !FREE_FAMILIES.test(d)
}

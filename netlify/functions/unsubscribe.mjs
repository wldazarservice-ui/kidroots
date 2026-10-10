// Lien « Ne plus recevoir ces e-mails » : coupe les e-mails de conseils et le bilan de la semaine
import { db } from '../lib/shared.mjs'
import { unsubToken } from '../lib/emails.mjs'

const page = (title, text) => new Response(`<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Mokalibo</title>
<style>body{font-family:Nunito,Arial,sans-serif;background:#F7FDF6;color:#1A2A4F;text-align:center;padding:60px 20px}h1{font-size:26px}a{color:#2E7D4F;font-weight:800}</style></head>
<body><div style="font-size:60px">📭</div><h1>${title}</h1><p>${text}</p><p><a href="/">mokalibo.com</a></p></body></html>`, { headers: { 'content-type': 'text/html; charset=utf-8' } })

export default async (req) => {
  const u = new URL(req.url)
  const uid = u.searchParams.get('u') || ''
  const t = u.searchParams.get('t') || ''
  if (!uid || t !== unsubToken(uid)) return page('Lien invalide', 'Ce lien de désinscription n’est pas valable. Vous pouvez aussi couper les e-mails dans l’app : Mon compte.')
  await db().doc(`users/${uid}`).set({ emailOptIn: false }, { merge: true })
  return page('C’est fait', 'Vous ne recevrez plus les conseils ni le bilan de la semaine. Les e-mails importants (paiement, fin d’essai) restent envoyés. / Sie erhalten keine Tipps und Wochenberichte mehr.')
}

export const config = { path: '/api/unsubscribe' }

// Verifications automatiques des regles d'argent (npm test, et avant chaque build Netlify).
// Si un prix, l'essai gratuit ou les codes cadeaux divergent entre l'app et le serveur, le build echoue.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { PLANS, TRIAL_DAYS, trialEligible, GIFT, normGiftCode, newGiftCode, EVENTS } from '../netlify/lib/shared.mjs'

const front = fs.readFileSync(new URL('../src/premium.js', import.meta.url), 'utf8')

test('les prix affiches dans l’app = les prix factures par le serveur', () => {
  for (const [id, p] of Object.entries(PLANS)) {
    const m = front.match(new RegExp(`\\b${id}: \\{ cents: (\\d+)`))
    assert.ok(m, `plan ${id} absent de src/premium.js`)
    assert.equal(Number(m[1]), p.cents, `prix different pour ${id}`)
  }
})

test('tarifs attendus', () => {
  assert.equal(PLANS.month.cents, 199)
  assert.equal(PLANS.year.cents, 1499)
  assert.equal(PLANS.teacher_month.cents, 499)
  assert.equal(PLANS.teacher_year.cents, 3900)
  assert.equal(GIFT.cents, 1499)
  assert.equal(GIFT.months, 12)
})

test('essai gratuit : 3 jours, une seule fois', () => {
  assert.equal(TRIAL_DAYS, 3)
  assert.equal(trialEligible({}), true)
  assert.equal(trialEligible({ trialUsed: true }), false)
  assert.equal(trialEligible({ premium: true }), false)
  assert.equal(trialEligible({ stripeCustomerId: 'cus_x' }), false)
  assert.equal(trialEligible({ subscriptionId: 'sub_x' }), false)
})

test('codes cadeaux : format et saisie tolerante', () => {
  for (let i = 0; i < 50; i++) assert.match(newGiftCode(), /^MOKA-[A-Z0-9]{4}-[A-Z0-9]{4}$/)
  assert.equal(normGiftCode('moka-ab12-cd34'), 'MOKA-AB12-CD34')
  assert.equal(normGiftCode(' moka ab12 cd34 '), 'MOKA-AB12-CD34')
  assert.equal(normGiftCode('AB12CD34'), 'MOKA-AB12-CD34')
})

test('les evenements suivis par l’app sont acceptes par le serveur', () => {
  const used = new Set()
  const files = [...fs.readdirSync(new URL('../src/components/', import.meta.url)).map((f) => `components/${f}`),
    ...fs.readdirSync(new URL('../src/', import.meta.url)).filter((f) => /\.jsx?$/.test(f))]
  for (const f of files) {
    const src = fs.readFileSync(new URL(`../src/${f}`, import.meta.url), 'utf8')
    for (const m of src.matchAll(/track\('([a-z_]+)'/g)) used.add(m[1])
  }
  for (const e of used) assert.ok(EVENTS.includes(e), `evenement ${e} refuse par /api/track`)
})

test('classes et ecoles : au moins une tablette par eleve', async () => {
  const { TIERS } = await import('../netlify/lib/shared.mjs')
  assert.ok(TIERS.teacher.maxDevices > TIERS.teacher.maxChildren)
  assert.ok(TIERS.school.maxDevices >= TIERS.school.maxChildren)
  assert.ok(TIERS.school.maxDevices <= 999, 'les regles Firestore acceptent d1..d999')
})

test('formule enseignant : e-mail professionnel obligatoire', async () => {
  const { isProEmail } = await import('../src/proEmail.js')
  for (const e of ['prof@gmail.com', 'a@hotmail.fr', 'b@outlook.de', 'c@gmx.net', 'd@web.de', 'e@orange.fr', 'f@yahoo.co.uk', 'g@icloud.com', 'pas-un-email'])
    assert.equal(isProEmail(e), false, e)
  for (const e of ['jean.dupont@ac-versailles.fr', 'm.mueller@grundschule-wittlich.de', 'teacher@school.org', 'x@education.lu'])
    assert.equal(isProEmail(e), true, e)
})

test('jeu « Qui habite où ? » : uniquement de vrais animaux', async () => {
  const { DISCOVER } = await import('../src/data/discover.js')
  const bad = /c[eè]dre|arbre|rose|fleur|dragonnier|plante|deux queues|bic[eé]phale|licorne|dragon\b/i
  for (const [code, d] of Object.entries(DISCOVER)) assert.ok(!bad.test(d.animal.name), `${code} : ${d.animal.name} n'est pas un vrai animal`)
})

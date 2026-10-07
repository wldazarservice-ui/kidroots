// Verifie les fichiers src/data/expert/*.js : 12 histoires + 8 questions par chapitre
import { readdirSync } from 'fs'
import { COUNTRIES } from '../src/data/countries.js'
const dir = new URL('../src/data/expert/', import.meta.url)
let ok = true
for (const f of readdirSync(dir).filter(f => /^[A-Z]{2}\.js$/.test(f)).sort()) {
  const code = f.slice(0, 2)
  const data = (await import(new URL(f, dir))).default
  const errs = []
  if (!COUNTRIES[code]) errs.push('pays inconnu')
  for (const ch of COUNTRIES[code]?.chapters || []) {
    const x = data[ch.id]
    if (!x) { errs.push(`${ch.id} manquant`); continue }
    if (x.cards?.length !== 12) errs.push(`${ch.id}: ${x.cards?.length} histoires`)
    if (x.quiz?.length !== 8) errs.push(`${ch.id}: ${x.quiz?.length} questions`)
    x.cards?.forEach((c, i) => ['emoji', 'date', 'title', 'text', 'fact'].forEach(k => { if (!c[k]) errs.push(`${ch.id} carte ${i} sans ${k}`) }))
    x.cards?.forEach((c, i) => Object.keys(c).forEach(k => { if (!['emoji', 'date', 'title', 'text', 'fact'].includes(k)) errs.push(`${ch.id} carte ${i} champ inconnu ${k}`) }))
    x.quiz?.forEach((q, i) => {
      ;['q', 'correct', 'wrong1', 'wrong2', 'emoji'].forEach(k => { if (!q[k]) errs.push(`${ch.id} q${i} sans ${k}`) })
      if (new Set([q.correct, q.wrong1, q.wrong2]).size < 3) errs.push(`${ch.id} q${i} reponses en double`)
      Object.keys(q).forEach(k => { if (!['q', 'correct', 'wrong1', 'wrong2', 'emoji'].includes(k)) errs.push(`${ch.id} q${i} champ inconnu ${k}`) })
    })
  }
  Object.keys(data).forEach(k => { if (!COUNTRIES[code]?.chapters.some(ch => ch.id === k)) errs.push(`id inconnu ${k}`) })
  const words = Object.values(data).flatMap(x => x.cards).reduce((a, c) => a + c.text.split(/\s+/).length, 0)
  console.log(`${code}: ${errs.length ? '❌ ' + errs.join(' | ') : '✅'}  (${Object.values(data).reduce((a, x) => a + x.cards.length, 0)} histoires, ~${Math.round(words / 60)} mots/histoire)`)
  if (errs.length) ok = false
}
process.exit(ok ? 0 : 1)

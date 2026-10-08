// Genere src/data/world/meta.gen.js (index leger des pays « monde ») et verifie leur contenu.
// Lancer apres chaque ajout de pays : node scripts/build-world.mjs
import { readdirSync, writeFileSync } from 'fs'

const dir = new URL('../src/data/world/', import.meta.url)
const RICH = (await import('../src/data/countries.js?rich')).RICH_CODES
const REGIONS = ['africa', 'europe', 'asia', 'americas', 'oceania']
const meta = {}
const errors = []
const ids = new Set()

for (const f of readdirSync(dir).filter((f) => /^[A-Z]{2}\.js$/.test(f)).sort()) {
  const code = f.slice(0, 2)
  const c = (await import(new URL(f, dir))).default
  const err = (m) => errors.push(`${code}: ${m}`)
  if (RICH.includes(code)) err('existe deja dans countries.js')
  for (const k of ['name', 'flag', 'region', 'color', 'bg', 'tagline', 'teaser']) if (!c[k]) err(`sans ${k}`)
  if (!REGIONS.includes(c.region)) err(`region inconnue ${c.region}`)
  if (!c.hero?.name || !c.hero?.emoji) err('sans hero')
  if (c.chapters.length !== 5) err(`${c.chapters.length} chapitres`)
  for (const ch of c.chapters) {
    if (ids.has(ch.id)) err(`id en double ${ch.id}`)
    ids.add(ch.id)
    if (!ch.intro || !ch.figure?.desc) err(`${ch.id} intro/figure`)
    if (ch.cards.length < 3) err(`${ch.id}: ${ch.cards.length} cartes`)
    if (ch.quiz.length < 2) err(`${ch.id}: ${ch.quiz.length} questions`)
    ch.cards.forEach((k, i) => ['emoji', 'title', 'text', 'fact'].forEach((f) => { if (!k[f]) err(`${ch.id} carte ${i} sans ${f}`) }))
    ch.quiz.forEach((q, i) => {
      ;['q', 'correct', 'wrong1', 'wrong2', 'emoji'].forEach((f) => { if (!q[f]) err(`${ch.id} q${i} sans ${f}`) })
      if (new Set([q.correct, q.wrong1, q.wrong2]).size < 3) err(`${ch.id} q${i} reponses en double`)
    })
  }
  meta[code] = {
    name: c.name, flag: c.flag, region: c.region, color: c.color, bg: c.bg, tagline: c.tagline, teaser: c.teaser,
    hero: c.hero,
    ch: c.chapters.map((x) => [x.id, x.era, x.title, x.subtitle, x.emoji, x.color, x.light, x.cards.length, x.quiz.length]),
  }
}

if (errors.length) { console.error(errors.join('\n')); process.exit(1) }
writeFileSync(new URL('meta.gen.js', dir), `// Genere par scripts/build-world.mjs, ne pas modifier a la main\nexport const WORLD_META = ${JSON.stringify(meta)}\n`)
console.log(`${Object.keys(meta).length} pays monde OK`)

// Genere src/data/worldmap.gen.js : carte du monde allegee (coordonnees arrondies), chargee a la demande.
// Source : @svg-maps/world (licence CC BY 4.0). Lancer : node scripts/build-map.mjs
import { writeFileSync } from 'fs'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const src = require('@svg-maps/world')
const w = src.default || src
const round = (path) => path.replace(/-?\d+\.\d+/g, (n) => String(Math.round(parseFloat(n) * 10) / 10))
const out = {}
for (const l of w.locations) out[l.id.toUpperCase()] = round(l.path)
writeFileSync(new URL('../src/data/worldmap.gen.js', import.meta.url),
  `// Genere par scripts/build-map.mjs depuis @svg-maps/world (CC BY 4.0)\nexport const VIEWBOX = ${JSON.stringify(w.viewBox)}\nexport const PATHS = ${JSON.stringify(out)}\n`)
console.log('ok', Object.keys(out).length)

// Espaces insecables francais dans les fichiers expert (« », ! ? : ;)
import { readdirSync, readFileSync, writeFileSync } from 'fs'
const dir = new URL('../src/data/expert/', import.meta.url)
for (const f of readdirSync(dir).filter(f => /^[A-Z]{2}\.js$/.test(f))) {
  const p = new URL(f, dir)
  const s = readFileSync(p, 'utf8')
  const out = s.replace(/« /g, '« ').replace(/ »/g, ' »').replace(/ ([!?;])/g, ' $1').replace(/ :(?= )/g, ' :')
  if (out !== s) { writeFileSync(p, out); console.log('fixed', f) }
}

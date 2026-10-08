// Pages publiques pour Google : une page par pays (« L'histoire du Mali expliquée aux enfants »),
// une page index /histoire/, sitemap.xml et robots.txt. Lancé après « vite build » (écrit dans dist/).
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { COUNTRIES, REGIONS, RICH_CODES } from '../src/data/countries.js'
import { DISCOVER } from '../src/data/discover.js'
import { TEASERS } from '../src/data/teasers.js'

const SITE = 'https://mokalibo.com'
const OUT = path.resolve('dist')
const today = new Date().toISOString().slice(0, 10)

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const slug = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/œ/g, 'oe').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const cut = (s, n) => (s.length <= n ? s : s.slice(0, s.lastIndexOf(' ', n - 1)) + '…')

// Données complètes : pays « riches » dans countries.js, les autres dans src/data/world/XX.js
async function fullCountry(code) {
  if (RICH_CODES.includes(code)) return COUNTRIES[code]
  const f = path.resolve('src/data/world', `${code}.js`)
  return (await import(pathToFileURL(f).href)).default
}

const codes = Object.keys(COUNTRIES).sort((a, b) => COUNTRIES[a].name.localeCompare(COUNTRIES[b].name, 'fr'))
const slugs = Object.fromEntries(codes.map((c) => [c, slug(COUNTRIES[c].name)]))

const CSS = `
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Nunito,system-ui,sans-serif;color:#1A2A4F;background:#FFFDF7;line-height:1.6}
a{color:#1565C0}
.wrap{max-width:860px;margin:0 auto;padding:0 18px}
header.top{position:sticky;top:0;background:rgba(255,253,247,.94);backdrop-filter:blur(8px);border-bottom:1px solid #EEF1F5;z-index:5}
header.top .wrap{display:flex;align-items:center;gap:12px;height:62px}
.logo{font-family:Fredoka,sans-serif;font-weight:700;font-size:26px;text-decoration:none}
.logo .a{color:#FF7A00}.logo .b{color:#1E88E5}
.top nav{margin-left:auto;display:flex;gap:14px;font-weight:800;font-size:15px}
.top nav a{text-decoration:none;color:#455A64}
.btn{display:inline-block;background:linear-gradient(180deg,#FFE04D,#FFC400);color:#1A2A4F;font-weight:900;text-decoration:none;padding:14px 24px;border-radius:18px;box-shadow:0 5px 0 #E6A100;font-size:17px}
.hero{padding:34px 0 18px;text-align:center}
.flag{font-size:84px;line-height:1}
h1{font-family:Fredoka,sans-serif;font-size:36px;line-height:1.15;margin:12px 0 8px}
h2{font-family:Fredoka,sans-serif;font-size:26px;margin:34px 0 12px}
h3{font-family:Fredoka,sans-serif;font-size:20px;margin:0 0 4px}
.lead{font-size:18px;font-weight:700;color:#455A64;max-width:680px;margin:0 auto}
.teaser{background:#FFF3D6;border-radius:20px;padding:16px 20px;margin:22px 0;font-weight:800}
.chips{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:16px 0}
.chip{background:#fff;border-radius:999px;padding:6px 14px;font-weight:900;font-size:14px;box-shadow:0 2px 8px rgba(26,42,79,.08)}
.card{background:#fff;border-radius:22px;padding:18px 20px;margin:12px 0;box-shadow:0 6px 18px rgba(26,42,79,.07)}
.era{display:inline-block;font-size:13px;font-weight:900;color:#fff;background:#1E88E5;border-radius:999px;padding:3px 10px;margin-bottom:6px}
.fig{margin-top:10px;background:#F4F7FB;border-radius:14px;padding:10px 14px;font-size:15px}
.facts li{margin:8px 0 8px 20px}
details{background:#fff;border-radius:16px;padding:12px 16px;margin:8px 0;box-shadow:0 3px 10px rgba(26,42,79,.06)}
summary{cursor:pointer;font-weight:900}
.cta{background:linear-gradient(160deg,#1E88E5,#0D47A1);color:#fff;border-radius:26px;padding:26px 22px;text-align:center;margin:34px 0}
.cta p{font-weight:700;margin:8px 0 16px;color:#E3F2FD}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px}
.grid a{display:flex;align-items:center;gap:8px;background:#fff;border-radius:14px;padding:10px 12px;text-decoration:none;color:#1A2A4F;font-weight:800;box-shadow:0 2px 8px rgba(26,42,79,.06)}
.grid a span{font-size:26px}
footer{margin:40px 0 0;padding:24px 0 40px;border-top:1px solid #EEF1F5;font-size:14px;color:#607D8B;text-align:center}
footer a{margin:0 8px;color:#607D8B}
@media(max-width:600px){h1{font-size:28px}.top nav{display:none}}
`

function layout({ title, description, canonical, body, jsonld, ogImage = `${SITE}/icon-512.png` }) {
  return `<!doctype html>
<html lang="fr"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="article"><meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ogImage}"><meta property="og:site_name" content="Mokalibo"><meta name="twitter:card" content="summary">
<link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Nunito:wght@700;800;900&display=swap" rel="stylesheet">
<style>${CSS}</style>
${jsonld.map((j) => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join('\n')}
</head><body>
<header class="top"><div class="wrap"><a class="logo" href="/"><span class="a">Moka</span><span class="b">libo</span></a>
<nav><a href="/histoire/">Tous les pays</a><a href="/#pricing">Tarifs</a><a href="/">Essayer gratuitement</a></nav></div></header>
<main class="wrap">${body}</main>
<footer class="wrap">© Mokalibo · <a href="/histoire/">L'histoire des 195 pays</a><a href="/impressum.html">Impressum</a><a href="/datenschutz.html">Confidentialité</a><a href="/agb.html">AGB</a></footer>
</body></html>`
}

function countryPage(code, c) {
  const name = COUNTRIES[code].name
  const reg = REGIONS[c.region] || REGIONS[COUNTRIES[code].region]
  const url = `${SITE}/histoire/${slugs[code]}/`
  const teaser = TEASERS[code] || c.teaser || ''
  const d = DISCOVER[code]
  const nCards = c.chapters.reduce((a, ch) => a + (ch.cards?.length || 0), 0)
  const nQuiz = c.chapters.reduce((a, ch) => a + (ch.quiz?.length || 0), 0)
  const title = `${name} : l'histoire du pays expliquée aux enfants | Mokalibo`
  const description = cut(`Découvre l'histoire de ${name} pour les enfants de 4 à 12 ans : ${c.chapters.map((ch) => ch.title).slice(0, 3).join(', ')}… Histoires vraies, quiz et jeux.`, 158)

  const chapters = c.chapters.map((ch) => `
  <section class="card">
    <span class="era">${esc(ch.era)}</span>
    <h3>${esc(ch.emoji || '')} ${esc(ch.title)}</h3>
    ${ch.subtitle ? `<div style="font-weight:800;color:#607D8B">${esc(ch.subtitle)}</div>` : ''}
    <p style="margin-top:8px">${esc(ch.intro)}</p>
    ${ch.figure?.name ? `<div class="fig"><b>${esc(ch.figure.emoji || '⭐')} ${esc(ch.figure.name)}</b> — ${esc(ch.figure.desc)}</div>` : ''}
  </section>`).join('')

  // Quelques anecdotes (une par chapitre) : le reste se découvre dans l'app
  const facts = c.chapters.map((ch) => ch.cards?.[0]).filter((x) => x && x.fact).slice(0, 5)
  const quiz = c.chapters.map((ch) => ch.quiz?.[0]).filter(Boolean).slice(0, 3)
  const neighbours = (reg?.countries || []).filter((x) => x !== code && slugs[x]).slice(0, 12)

  const body = `
  <div class="hero">
    <div class="flag">${c.flag}</div>
    <h1>${esc(name)} : l'histoire du pays expliquée aux enfants</h1>
    <p class="lead">${esc(c.tagline || '')}</p>
    <div class="chips"><span class="chip">📖 ${c.chapters.length} chapitres</span><span class="chip">🃏 ${nCards} histoires</span><span class="chip">🎯 ${nQuiz} questions</span><span class="chip">👧 4 à 12 ans</span></div>
    <a class="btn" href="/">▶ Découvrir ${esc(name)} en jouant — gratuit</a>
  </div>
  ${teaser ? `<div class="teaser">💡 Le savais-tu ? ${esc(teaser)}</div>` : ''}
  <h2>🗺️ L'histoire de ${esc(name)} en ${c.chapters.length} chapitres</h2>
  ${chapters}
  ${facts.length ? `<h2>✨ Anecdotes à raconter aux enfants</h2><ul class="facts">${facts.map((f) => `<li><b>${esc(f.title)}</b> : ${esc(f.fact)}</li>`).join('')}</ul>` : ''}
  ${d ? `<h2>🦁 L'animal et le monument</h2>
  <div class="card"><h3>${esc(d.animal.emoji)} ${esc(d.animal.name)}</h3><p>${esc(d.animal.fact)}</p><p style="margin-top:6px"><b>Comment le protéger ?</b> ${esc(d.animal.protect)}</p></div>
  <div class="card"><h3>${esc(d.monument.emoji)} ${esc(d.monument.name)}</h3><p>${esc(d.monument.riddle || '')}</p></div>` : ''}
  ${quiz.length ? `<h2>🎯 Petit quiz</h2>${quiz.map((q) => `<details><summary>${esc(q.q)}</summary><p style="margin-top:6px">✅ ${esc(q.correct)}</p></details>`).join('')}` : ''}
  <div class="cta"><div style="font-size:44px">🌍</div><h2 style="margin:6px 0 0;color:#fff">Ton enfant va adorer ${esc(name)}</h2>
  <p>Histoires lues à voix haute, quiz, passeport à tamponner et jeux. 2 histoires offertes chaque jour, sans compte et sans publicité.</p>
  <a class="btn" href="/">Essayer Mokalibo gratuitement</a></div>
  ${neighbours.length ? `<h2>${esc(reg.mascot || '🌍')} Autres pays à découvrir</h2><div class="grid">${neighbours.map((x) => `<a href="/histoire/${slugs[x]}/"><span>${COUNTRIES[x].flag}</span>${esc(COUNTRIES[x].name)}</a>`).join('')}</div>` : ''}
  <p style="margin-top:22px"><a href="/histoire/">← L'histoire des 195 pays du monde</a></p>`

  const jsonld = [
    { '@context': 'https://schema.org', '@type': 'Article', headline: `${name} : l'histoire du pays expliquée aux enfants`, description, inLanguage: 'fr', url,
      author: { '@type': 'Organization', name: 'Mokalibo' }, publisher: { '@type': 'Organization', name: 'Mokalibo', logo: { '@type': 'ImageObject', url: `${SITE}/icon-512.png` } },
      dateModified: today, audience: { '@type': 'EducationalAudience', educationalRole: 'student' }, educationalLevel: '4-12 ans', about: name },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Mokalibo', item: SITE + '/' },
      { '@type': 'ListItem', position: 2, name: 'Histoire des pays', item: SITE + '/histoire/' },
      { '@type': 'ListItem', position: 3, name, item: url }] },
  ]
  return layout({ title, description, canonical: url, body, jsonld })
}

function indexPage() {
  const url = `${SITE}/histoire/`
  const sections = Object.entries(REGIONS).filter(([, r]) => r.countries.length).map(([, r]) => {
    const list = codes.filter((c) => r.countries.includes(c))
    return `<h2>${esc(r.mascot)} ${esc(r.name)} · ${list.length} pays</h2><div class="grid">${list.map((c) => `<a href="/histoire/${slugs[c]}/"><span>${COUNTRIES[c].flag}</span>${esc(COUNTRIES[c].name)}</a>`).join('')}</div>`
  }).join('')
  const body = `<div class="hero"><div class="flag">🌍</div><h1>L'histoire des ${codes.length} pays du monde expliquée aux enfants</h1>
  <p class="lead">Pour chaque pays : ses grandes périodes, ses héros, des anecdotes et un petit quiz. Idéal pour un exposé, les devoirs ou simplement la curiosité.</p>
  <div style="margin-top:18px"><a class="btn" href="/">▶ Essayer l'app gratuitement</a></div></div>${sections}`
  return layout({
    title: `L'histoire des ${codes.length} pays du monde expliquée aux enfants | Mokalibo`,
    description: `Découvre l'histoire de tous les pays du monde, racontée pour les enfants de 4 à 12 ans : périodes, héros, anecdotes et quiz. ${codes.length} pays.`,
    canonical: url, body,
    jsonld: [{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Histoire des pays du monde pour les enfants', url, inLanguage: 'fr' }],
  })
}

fs.mkdirSync(path.join(OUT, 'histoire'), { recursive: true })
for (const code of codes) {
  const c = await fullCountry(code)
  const dir = path.join(OUT, 'histoire', slugs[code])
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'index.html'), countryPage(code, c))
}
fs.writeFileSync(path.join(OUT, 'histoire', 'index.html'), indexPage())

const urls = [`${SITE}/`, `${SITE}/histoire/`, ...codes.map((c) => `${SITE}/histoire/${slugs[c]}/`), `${SITE}/impressum.html`, `${SITE}/datenschutz.html`, `${SITE}/agb.html`]
fs.writeFileSync(path.join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`)
fs.writeFileSync(path.join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE}/sitemap.xml\n`)
console.log(`SEO : ${codes.length} pages pays + index + sitemap (${urls.length} URL)`)

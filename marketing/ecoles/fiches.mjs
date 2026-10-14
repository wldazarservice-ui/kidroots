// Fiches pedagogiques « Mokalibo en classe » (A4, PDF) : node marketing/ecoles/fiches.mjs
// Sortie : public/ecoles/fiche-*.pdf (telechargeables depuis la page #ecoles)
import puppeteer from '../video/node_modules/puppeteer-core/lib/esm/puppeteer/puppeteer-core.js'
import path from 'node:path'
import fs from 'node:fs'

const dir = path.dirname(new URL(import.meta.url).pathname)
const OUT = path.join(dir, '../../public/ecoles')

const FICHES = [
  {
    slug: 'gaulois', flag: '🇫🇷', color: '#0D47A1', title: 'La Gaule et les Gaulois', niveau: 'CM1 · Cycle 3',
    programme: 'Histoire CM1, thème 1 : « Et avant la France ? » — Celtes, Gaulois, Grecs et Romains.',
    chemin: 'France → chapitre 1 « La Gaule et les Gaulois »',
    objectifs: ['Situer la Gaule dans le temps et sur une carte.', 'Connaître le mode de vie des Gaulois (villages, druides, artisans).', 'Comprendre la conquête romaine et le rôle de Vercingétorix.'],
    histoires: ['La grotte de Lascaux', 'Marseille, la plus vieille ville', 'Les Gaulois et les druides', 'Vercingétorix et Alésia', 'La Gaule romaine'],
    questions: ['Quel peuple a fondé Marseille ?', 'Qu\'ont inventé les Gaulois ?', 'Pourquoi Vercingétorix a-t-il dû se rendre à Alésia ?', 'D\'où vient le nom de Paris ?'],
    activite: 'Frise chronologique collective : placer Lascaux (−17 000), Carnac (−4 500), Marseille (−600), Alésia (−52) et Lutèce romaine.',
    trace: 'Les Gaulois étaient des peuples celtes qui vivaient en tribus. Ils étaient d\'excellents artisans. En 52 av. J.-C., Jules César bat Vercingétorix à Alésia : la Gaule devient romaine. Les Gallo-Romains adoptent le latin, l\'ancêtre du français.',
  },
  {
    slug: 'moyen-age', flag: '🇫🇷', color: '#6A1B9A', title: 'Rois, châteaux et cathédrales', niveau: 'CM1 · Cycle 3',
    programme: 'Histoire CM1, thème 1 : « Et avant la France ? » (Clovis et Charlemagne) et thème 2 : « Le temps des rois ».',
    chemin: 'France → chapitre 2 « Le Moyen Âge »',
    objectifs: ['Connaître Clovis et Charlemagne.', 'Décrire un château fort et son rôle.', 'Comprendre la construction des cathédrales.'],
    histoires: ['Le baptême de Clovis', 'Charlemagne, empereur', 'Les châteaux forts', 'Notre-Dame de Paris', 'Le Mont-Saint-Michel'],
    questions: ['Où Clovis s\'est-il fait baptiser ?', 'En quelle année Charlemagne devient-il empereur ?', 'À quoi servait le donjon ?', 'Que se passe-t-il au Mont-Saint-Michel à marée haute ?'],
    activite: 'Dessiner et légender un château fort : donjon, douves, pont-levis, créneaux, chemin de ronde.',
    trace: 'Au Moyen Âge, les rois gouvernent avec l\'aide des seigneurs. Charlemagne est couronné empereur en 800. Les seigneurs construisent des châteaux forts pour se protéger, et les habitants bâtissent de grandes cathédrales, comme Notre-Dame de Paris.',
  },
  {
    slug: 'revolution', flag: '🇫🇷', color: '#C62828', title: 'La Révolution française', niveau: 'CM1 · Cycle 3',
    programme: 'Histoire CM1, thème 3 : « Le temps de la Révolution et de l\'Empire ».',
    chemin: 'France → chapitre 4 « La Révolution »',
    objectifs: ['Connaître les grandes dates : 14 juillet et 26 août 1789.', 'Comprendre la Déclaration des droits de l\'homme.', 'Connaître l\'origine de la Marseillaise et de la devise.'],
    histoires: ['La prise de la Bastille', 'Les droits de l\'homme', 'La Marseillaise', 'Le mètre et le système métrique', 'Napoléon Bonaparte'],
    questions: ['Pourquoi la Bastille était-elle un symbole ?', 'Que dit l\'article 1 de la Déclaration ?', 'Pourquoi l\'hymne s\'appelle-t-il « la Marseillaise » ?', 'Qui était Olympe de Gouges ?'],
    activite: 'Débat en classe : « Libres et égaux en droits », qu\'est-ce que cela veut dire aujourd\'hui à l\'école ?',
    trace: 'En 1789, les Français se révoltent contre le pouvoir absolu du roi. Le 14 juillet, le peuple prend la Bastille. Le 26 août, la Déclaration des droits de l\'homme et du citoyen affirme que les hommes naissent libres et égaux en droits.',
  },
  {
    slug: 'mali', flag: '🇲🇱', color: '#C8600A', title: 'L\'empire du Mali et Mansa Moussa', niveau: 'CM1 – collège',
    programme: 'Ouverture sur l\'histoire de l\'Afrique et des grands empires médiévaux : utile en CM1, au collège et dans les écoles d\'Afrique francophone.',
    chemin: 'Mali → chapitre 3 « L\'Empire du Mali »',
    objectifs: ['Situer l\'empire du Mali sur une carte de l\'Afrique.', 'Connaître Soundiata Keïta et Mansa Moussa.', 'Comprendre le rôle de l\'or, du sel et des griots.'],
    histoires: ['L\'enfant qui ne marchait pas', 'La bataille de Kirina', 'La charte du Manden', 'Le voyage en or de Mansa Moussa', 'Les griots, mémoire du peuple'],
    questions: ['Qui a fondé l\'empire du Mali ?', 'Pourquoi le sel était-il aussi précieux que l\'or ?', 'Qu\'a fait Mansa Moussa en passant au Caire ?', 'Quel est le rôle d\'un griot ?'],
    activite: 'Carte des routes du sel et de l\'or : relier Taoudéni, Tombouctou, Niani et Le Caire avec deux couleurs.',
    trace: 'Vers 1235, Soundiata Keïta fonde l\'empire du Mali. Grâce au commerce de l\'or et du sel, il devient l\'un des plus riches du monde. En 1324, Mansa Moussa part en pèlerinage à La Mecque avec tant d\'or que son nom devient célèbre jusqu\'en Europe.',
  },
  {
    slug: 'egypte', flag: '🇪🇬', color: '#B8860B', title: 'L\'Égypte des pharaons', niveau: '6e · Cycle 3',
    programme: 'Histoire 6e, thème 1 : « Premiers États, premières écritures ».',
    chemin: 'Égypte → chapitre 1 « L\'Égypte des Pharaons »',
    objectifs: ['Comprendre le rôle du Nil.', 'Connaître le pharaon et les pyramides.', 'Découvrir les hiéroglyphes, une des premières écritures.'],
    histoires: ['Le don du Nil', 'Narmer unit les Deux Terres', 'Les hiéroglyphes', 'La première pyramide', 'La grande pyramide de Khéops'],
    questions: ['Pourquoi dit-on que l\'Égypte est « un don du Nil » ?', 'Qui a construit la première pyramide ?', 'Sur quoi écrivaient les scribes ?', 'Comment les ouvriers déplaçaient-ils les blocs ?'],
    activite: 'Écrire son prénom en hiéroglyphes (alphabet simplifié) et le comparer avec celui de ses camarades.',
    trace: 'L\'Égypte ancienne est née le long du Nil, dont les crues rendaient la terre fertile. Le pharaon gouvernait le pays. Les Égyptiens ont inventé les hiéroglyphes et construit les pyramides, comme celle de Khéops, vers 2560 av. J.-C.',
  },
]

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
const page = (f) => `<!doctype html><html lang="fr"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Nunito:wght@600;800;900&display=block" rel="stylesheet">
<style>
@page { size: A4; margin: 0 }
* { box-sizing: border-box; margin: 0; padding: 0 }
html, body { background: #fff }
body { font-family: Nunito, sans-serif; color: #1A2A4F; width: 210mm; height: 297mm; padding: 10mm 13mm; position: relative; --c: ${f.color} }
.top { display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid var(--c); padding-bottom: 4mm }
.logo { font-family: Fredoka; font-weight: 700; font-size: 22pt } .logo .a { color: #FF7A00 } .logo .b { color: #1E88E5 }
.tag { font-size: 9pt; font-weight: 900; color: #fff; background: var(--c); border-radius: 99px; padding: 4px 12px }
h1 { font-family: Fredoka; font-size: 22pt; margin: 4mm 0 1.5mm; color: var(--c) }
.meta { font-size: 9.8pt; font-weight: 800; color: #455A64; line-height: 1.5 }
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4mm; margin-top: 4mm }
.box { border: 2px solid #E3EAF2; border-radius: 12px; padding: 3mm 4.5mm }
.box h2 { font-family: Fredoka; font-size: 12.5pt; margin-bottom: 2mm; color: var(--c) }
.box li { font-size: 9.6pt; font-weight: 700; line-height: 1.45; margin-left: 4mm }
.box p { font-size: 9.6pt; font-weight: 700; line-height: 1.5 }
.steps { margin-top: 5mm } .step { display: flex; gap: 4mm; align-items: flex-start; margin-bottom: 1.8mm; font-size: 9.6pt; font-weight: 700; line-height: 1.45 }
.step b { background: var(--c); color: #fff; border-radius: 8px; padding: 1px 7px; font-size: 9.5pt; white-space: nowrap }
.trace { margin-top: 4mm; background: #FFF8E1; border: 2px dashed #FFB300; border-radius: 12px; padding: 4mm 5mm }
.trace h2 { font-family: Fredoka; font-size: 12.5pt; color: #E65100; margin-bottom: 2mm } .trace p { font-size: 10.3pt; font-weight: 800; line-height: 1.55 }
.lines { margin-top: 4mm } .lines div { border-bottom: 1px solid #CFD8DC; height: 7mm }
.foot { position: absolute; left: 14mm; right: 14mm; bottom: 7mm; display: flex; justify-content: space-between; font-size: 8.5pt; font-weight: 800; color: #90A4AE }
</style></head><body>
<div class="top"><div class="logo"><span class="a">Moka</span><span class="b">libo</span> <span style="font-size:12pt;color:#455A64">en classe</span></div><div class="tag">${esc(f.niveau)} · 45 min</div></div>
<h1>${f.flag} ${esc(f.title)}</h1>
<div class="meta">📚 ${esc(f.programme)}<br>📱 Dans l'app : ${esc(f.chemin)}</div>
<div class="grid">
  <div class="box"><h2>🎯 Objectifs</h2><ul>${f.objectifs.map((o) => `<li>${esc(o)}</li>`).join('')}</ul></div>
  <div class="box"><h2>📖 Les histoires à écouter</h2><ul>${f.histoires.map((o) => `<li>${esc(o)}</li>`).join('')}</ul></div>
</div>
<div class="steps box" style="margin-top:4mm"><h2>🗺️ Déroulé de la séance</h2>
  <div class="step"><b>5 min</b><span>Découverte : afficher la carte du monde de Mokalibo au tableau, situer le pays et lancer une question d'accroche.</span></div>
  <div class="step"><b>15 min</b><span>Écoute : projeter le chapitre et écouter les histoires avec la voix off. Faire découvrir les « Le savais-tu ? » à tour de rôle.</span></div>
  <div class="step"><b>10 min</b><span>Quiz collectif du chapitre : la classe vote, un élève valide la réponse au tableau.</span></div>
  <div class="step"><b>10 min</b><span>Activité : ${esc(f.activite)}</span></div>
  <div class="step"><b>5 min</b><span>Trace écrite (ci-dessous), à recopier ou à coller dans le cahier.</span></div>
</div>
<div class="grid">
  <div class="box"><h2>❓ Questions pour la classe</h2><ul>${f.questions.map((o) => `<li>${esc(o)}</li>`).join('')}</ul></div>
  <div class="box"><h2>💡 Astuces</h2><p>Les élèves non-lecteurs suivent grâce à la voix off. Choisissez le niveau « Petit explorateur » pour les plus jeunes et « Grand explorateur » pour approfondir. Chaque élève peut ensuite rejouer le chapitre sur sa tablette.</p></div>
</div>
<div class="trace"><h2>✏️ Trace écrite</h2><p>${esc(f.trace)}</p><div class="lines"><div></div><div></div></div></div>
<div class="foot"><span>mokalibo.com/#ecoles · bonjour@mokalibo.com</span><span>Fiche libre de reproduction pour la classe</span></div>
</body></html>`

const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true })
for (const f of FICHES) {
  const p = await b.newPage()
  await p.setContent(page(f), { waitUntil: 'load', timeout: 60000 })
  await p.evaluate(async () => { await document.fonts.ready })
  await p.pdf({ path: path.join(OUT, `fiche-${f.slug}.pdf`), format: 'A4', printBackground: true })
  console.log('ok', f.slug)
  await p.close()
}
await b.close()
fs.writeFileSync(path.join(dir, 'fiches.json'), JSON.stringify(FICHES.map(({ slug, flag, title, niveau }) => ({ slug, flag, title, niveau })), null, 1))

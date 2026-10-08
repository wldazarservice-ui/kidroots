// Capture de vrais écrans de l'app (téléphone 390x844 @3x) pour la vidéo pub.
// Les emojis sont remplacés par Noto Color Emoji (licence libre, usage commercial OK).
// Usage : node capture.mjs fr   (serveur de dev sans paywall sur http://localhost:5180)
import puppeteer from 'puppeteer-core'
import fs from 'node:fs'
import path from 'node:path'

const lang = process.argv[2] || 'fr'
const BASE = 'http://localhost:5180/'
const dir = path.dirname(new URL(import.meta.url).pathname)
const outDir = path.join(dir, 'shots', lang)
fs.mkdirSync(outDir, { recursive: true })

// Police emoji libre, greffée sur les familles de l'app (sans toucher aux chiffres/lettres)
let noto = fs.readFileSync(path.join(dir, 'noto-emoji.css'), 'utf8')
noto = noto.replace(/unicode-range:([^;]+);/g, (m, ranges) => {
  const keep = ranges.split(',').map((r) => r.trim()).filter((r) => {
    const end = parseInt((r.split('-')[1] || r.slice(2)).replace('U+', ''), 16)
    return end >= 0x2000
  })
  return keep.length ? `unicode-range: ${keep.join(', ')};` : 'unicode-range: U+10FFFF;'
})
const emojiCss = ['Nunito', 'Fredoka', 'sans-serif-emoji']
  .map((fam) => noto.replaceAll("font-family: 'Noto Color Emoji'", `font-family: '${fam}'`))
  .join('\n')

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
  args: ['--hide-scrollbars', '--force-color-profile=srgb', '--autoplay-policy=no-user-gesture-required', '--mute-audio'],
})
const page = await browser.newPage()
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true })
await page.evaluateOnNewDocument((css) => {
  const add = () => { const s = document.createElement('style'); s.textContent = css + '\n*{scrollbar-width:none} .drift,.spin-slow{animation:none!important}'; document.head.appendChild(s) }
  if (document.head) add(); else document.addEventListener('DOMContentLoaded', add)
  // Pas de voix pendant la capture
  window.speechSynthesis && (window.speechSynthesis.speak = () => {})
}, emojiCss)

// Profil d'essai avec un peu de progression (pour le passeport et la carte)
await page.goto(BASE, { waitUntil: 'networkidle0' })
const guestNames = { fr: 'Lina', en: 'Lily', de: 'Lena' }
await page.evaluate(async (lang, name) => {
  const { COUNTRIES } = await import('/src/data/countries.js')
  const done = {}
  for (const code of ['JP', 'EG', 'BR', 'FR', 'MA', 'SN', 'IN', 'KE', 'MX', 'IT', 'AU', 'CN']) {
    for (const ch of COUNTRIES[code]?.chapters || []) done[ch.id] = true
  }
  localStorage.clear()
  localStorage.setItem('kidroots_lang', lang)
  localStorage.setItem('kidroots_tts_enabled', '0')
  localStorage.setItem('kidroots_guest', JSON.stringify({ name, age: 7, avatar: '🦁', difficulty: 'explorer', xp: 1240, level: 5, done, games: { stars: 18 } }))
}, lang, guestNames[lang])

const T = async (key) => page.evaluate(async (key, lang) => (await import('/src/i18n.js')).t(lang, key), key, lang)
async function clickText(txt, { last = false } = {}) {
  const ok = await page.evaluate((txt, last) => {
    const els = [...document.querySelectorAll('button')].filter((b) => !b.disabled && b.innerText.includes(txt) && b.offsetParent)
    const el = last ? els[els.length - 1] : els[0]
    if (!el) return false
    el.scrollIntoView({ block: 'center' }); el.click(); return true
  }, txt, last)
  if (!ok) throw new Error(`bouton introuvable : ${txt}`)
  await sleep(900)
}
async function settle(ms = 1800) {
  try { await page.waitForNetworkIdle({ idleTime: 600, timeout: 8000 }) } catch {}
  await sleep(ms)
  await page.evaluate(() => window.scrollTo(0, 0))
  await sleep(200)
}
async function shot(name, full = false) {
  await page.screenshot({ path: path.join(outDir, `${name}.png`), fullPage: full })
  console.log(lang, name)
}

await page.reload({ waitUntil: 'networkidle0' })
await sleep(800)
await clickText(guestNames[lang])
await settle()
await shot('home')
await shot('home_full', true)

// Choix du niveau
await clickText(await T('lvl_change'))
await sleep(900)
await shot('levels')
await page.evaluate(() => document.querySelector('.sheet-backdrop')?.click())
await sleep(600)

// Continents -> Afrique
await page.evaluate(() => document.querySelectorAll('.bottom-nav button')[1].click())
await settle()
await shot('regions_full', true)
await shot('regions')

// Pays : Mali
await page.evaluate(() => {
  const el = [...document.querySelectorAll('button')].find((b) => b.innerText.includes('Mali'))
  el.click()
})
await settle(2500)
await shot('country')
await shot('country_full', true)

// Premier chapitre
await page.evaluate(() => {
  const els = [...document.querySelectorAll('button')].filter((b) => !b.disabled && /XP/.test(b.innerText))
  els[0].scrollIntoView({ block: 'center' }); els[0].click()
})
await settle(2500)
await shot('intro')
await clickText(await T('start_explore'))
await settle(2200)
await shot('card1')
await page.evaluate(() => document.querySelector('.card-flip-wrapper').click())
await sleep(1500)
await shot('card1_open')
const nextDoc = await T('next_doc')
await clickText(nextDoc)
await settle(1800)
await page.evaluate(() => document.querySelector('.card-flip-wrapper').click())
await sleep(1500)
await shot('card2_open')
// Fin des cartes
for (let i = 0; i < 12; i++) {
  const has = await page.evaluate(() => !!document.querySelector('.card-flip-wrapper'))
  if (!has) break
  await page.evaluate(() => document.querySelector('.card-flip-wrapper').click())
  await sleep(500)
  await page.evaluate((a, b) => {
    const el = [...document.querySelectorAll('button')].find((x) => x.innerText.includes(a) || x.innerText.includes(b))
    el && el.click()
  }, nextDoc, await T('finish_doc'))
  await sleep(700)
}
// Quiz : bonne réponse en 1re position (ordre non mélangé)
await page.evaluate(() => { window.__rnd = Math.random; Math.random = () => 0.5 })
await clickText(await T('start_quiz'))
await settle(2200)
await shot('quiz')
await page.evaluate(() => {
  const b = [...document.querySelectorAll('button.btn-kid')].filter((x) => /🅰️|🅱️|🅲️/.test(x.innerText))
  b[0].click()
})
await sleep(700)
await shot('quiz_ok')
for (let i = 0; i < 10; i++) {
  await sleep(1300)
  const clicked = await page.evaluate(() => {
    const b = [...document.querySelectorAll('button.btn-kid')].filter((x) => /🅰️|🅱️|🅲️/.test(x.innerText))
    if (!b.length) return false
    b[0].click(); return true
  })
  if (!clicked) break
}
await page.evaluate(() => { Math.random = window.__rnd })
await settle(3000)
await shot('result')

// Carte, passeport, jeux
await page.reload({ waitUntil: 'networkidle0' })
await sleep(800)
await clickText(guestNames[lang])
await settle(1000)
await page.evaluate(() => document.querySelectorAll('.bottom-nav button')[2].click())
await settle(2500)
await shot('map')
await page.evaluate(() => document.querySelectorAll('.bottom-nav button')[3].click())
await settle(2000)
await shot('passport')
await shot('passport_full', true)
await page.evaluate(() => document.querySelectorAll('.bottom-nav button')[4].click())
await settle(1500)
await shot('games')

await browser.close()
console.log('OK', outDir)

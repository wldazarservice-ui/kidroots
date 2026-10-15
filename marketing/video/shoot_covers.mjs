// Couvertures des Reels (covers.html) -> marketing/instagram/couvertures_reels/
// quiz_01..10 = Reels « Devine ! » (reels2), fact_01..10 = Reels « Le savais-tu ? » (reels)
import puppeteer from 'puppeteer-core'
import path from 'node:path'
import fs from 'node:fs'
const dir = path.dirname(new URL(import.meta.url).pathname)
const out = path.join(dir, '..', 'instagram', 'couvertures_reels'); fs.mkdirSync(out, { recursive: true })
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--force-color-profile=srgb'] })
const p = await b.newPage()
await p.setViewport({ width: 1080, height: 1920 })
for (const k of ['quiz', 'fact']) {
  for (let i = 0; i < 10; i++) {
    await p.goto(`file://${dir}/covers.html?k=${k}&i=${i}`, { waitUntil: 'load' })
    await p.evaluate(async () => { await document.fonts.ready; await document.fonts.load('60px "Noto Color Emoji"', document.body.innerText) })
    await new Promise((r) => setTimeout(r, 300))
    await p.screenshot({ path: path.join(out, `${k}_${String(i + 1).padStart(2, '0')}.jpg`), type: 'jpeg', quality: 92 })
  }
}
await b.close()

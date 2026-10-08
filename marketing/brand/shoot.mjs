import puppeteer from 'puppeteer-core'
import path from 'node:path'
const dir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'brand')
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true })
const p = await b.newPage()
await p.setViewport({ width: 1080, height: 1080 })
for (const v of ['orange', 'bleu']) {
  await p.goto(`file://${dir}/avatar.html?v=${v}`, { waitUntil: 'networkidle0' })
  await p.evaluate(async () => { await document.fonts.ready; await document.fonts.load('100px "Noto Color Emoji"', '🌍✨⭐') })
  await new Promise(r => setTimeout(r, 400))
  await p.screenshot({ path: path.join(dir, `mokalibo_profil_${v}.png`) })
}
await b.close()
